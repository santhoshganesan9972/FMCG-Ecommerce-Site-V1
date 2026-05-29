// ── Error Interceptor ───────────────────────────────────────
// Axios response error interceptor that normalises all HTTP
// errors into the app's ApiError shape.
//
// Responsibilities:
//   - Parse Axios error objects into ApiError instances
//   - Categorise errors by status code (auth, validation, server, …)
//   - Attach server-side validation error details
//   - Log errors in development for debugging
//   - Silence expected errors (e.g. cancelled requests)
//   - Prevent raw backend error messages leaking to the UI
//
// Integration:
//   Attached in api-client.ts — fires before the refresh interceptor
//   so normalised errors are available for retry decisions.

import axios, { AxiosError, type AxiosResponse } from "axios";
import { ApiError, type NormalizedError } from "@/lib/api/api-error";
import { isDev } from "@/lib/env";

// ── Helpers ────────────────────────────────────────────────

/**
 * Safely extract a human-readable message from an Axios error,
 * preferring the backend's error detail over generic messages.
 */
function extractMessage(error: AxiosError<{ message?: string; error?: string; detail?: string }>): string {
  // Prefer the most specific backend message available
  const data = error.response?.data;
  if (data?.detail) return data.detail;
  if (data?.message) return data.message;
  if (data?.error) return data.error;

  // Fall back to Axios-level messages
  if (error.code === "ECONNABORTED") return "Request timed out — please try again";
  if (error.code === "ERR_NETWORK") return "Network error — check your internet connection";
  if (!error.response) return "No response from server — check your connection";

  // Last resort: status-text-based fallback
  const statusText: Record<number, string> = {
    400: "Bad request — please check your input",
    401: "Session expired — please log in again",
    403: "You don't have permission to perform this action",
    404: "The requested resource was not found",
    409: "Conflict — the resource may have been modified",
    422: "Validation failed — please check your input",
    429: "Too many requests — please slow down",
    500: "Server error — please try again later",
    502: "Bad gateway — the server is temporarily unavailable",
    503: "Service unavailable — please try again later",
  };

  return statusText[error.response.status] ?? `Request failed (${error.response.status})`;
}

/**
 * Extract validation error details from a 422 response.
 * Supports both standard formats:
 *   { errors: { field: ["msg1", "msg2"] } }   (Laravel / custom)
 *   { field: "message" }                       (simplified)
 *   { errors: [{ field, message }] }           (array format)
 */
function extractValidationDetails(
  data: Record<string, unknown> | undefined,
): Record<string, string[]> | undefined {
  if (!data || typeof data !== "object") return undefined;

  const errors = data.errors;

  if (!errors) return undefined;

  if (Array.isArray(errors)) {
    // Array format:  [{ field: "email", message: "is required" }]
    const details: Record<string, string[]> = {};
    for (const err of errors) {
      if (err && typeof err === "object" && "field" in err && "message" in err) {
        const field = String((err as { field: string }).field);
        const message = String((err as { message: string }).message);
        if (!details[field]) details[field] = [];
        details[field].push(message);
      }
    }
    return Object.keys(details).length > 0 ? details : undefined;
  }

  if (typeof errors === "object" && !Array.isArray(errors)) {
    // Object format: { email: ["is required"], name: ["too short"] }
    // or simplified: { email: "is required" }
    const details: Record<string, string[]> = {};
    for (const [field, msgs] of Object.entries(errors as Record<string, unknown>)) {
      if (Array.isArray(msgs)) {
        details[field] = msgs.map(String);
      } else if (typeof msgs === "string") {
        details[field] = [msgs];
      }
    }
    return Object.keys(details).length > 0 ? details : undefined;
  }

  return undefined;
}

/**
 * Determine whether an error should be silently swallowed
 * (e.g. cancelled requests, background refresh conflicts).
 */
function shouldSuppress(error: AxiosError): boolean {
  if (axios.isCancel(error)) return true;
  if (error.name === "CanceledError") return true;
  if (error.code === "ERR_CANCELED") return true;
  return false;
}

// ── Error Categorisation Helpers ───────────────────────────

export type ErrorCategory =
  | "network"
  | "auth"
  | "validation"
  | "server"
  | "not-found"
  | "rate-limit"
  | "timeout"
  | "cancelled"
  | "unknown";

/**
 * Categorise an Axios error without throwing — useful for
 * components that need to branch on error type.
 */
export function categoriseAxiosError(error: unknown): ErrorCategory {
  if (!error || typeof error !== "object") return "unknown";

  const axiosErr = error as Partial<AxiosError & { category?: string; status?: number }>;

  // Already-normalised ApiError
  if (axiosErr.category) return axiosErr.category as ErrorCategory;

  const status = axiosErr.status ?? axiosErr.response?.status;
  const code = axiosErr.code;

  if (!status && (code === "ERR_NETWORK" || code === "ENOTFOUND")) return "network";
  if (code === "ECONNABORTED" || code === "ETIMEDOUT") return "timeout";
  if (code === "ERR_CANCELED") return "cancelled";
  if (status === 401 || status === 403) return "auth";
  if (status === 404) return "not-found";
  if (status === 408 || status === 499) return "timeout";
  if (status === 422) return "validation";
  if (status === 429) return "rate-limit";
  if (status && status >= 500) return "server";

  return "unknown";
}

// ── Interceptor Handlers ───────────────────────────────────

function onFulfilled(response: AxiosResponse): AxiosResponse {
  // Pass through successful responses unchanged
  return response;
}

async function onRejected(error: AxiosError<{ message?: string; error?: string; detail?: string }>): Promise<never> {
  // 1. Suppress cancelled requests silently
  if (shouldSuppress(error)) {
    return Promise.reject(error);
  }

  // 2. Build the normalized ApiError
  const status = error.response?.status ?? 0;
  const message = extractMessage(error);
  const details = status === 422 ? extractValidationDetails(error.response?.data) : undefined;

  const normalized = new ApiError(message, status, details, error);

  // 3. Log in development for debugging
  if (isDev) {
    const tag = `[API ${normalized.category}]`.padEnd(16);
    console.warn(`${tag} ${status} — ${message}`, {
      url: error.config?.url,
      method: error.config?.method,
      details: normalized.details,
    });
  }

  // 4. Reject with the normalized error
  return Promise.reject(normalized);
}

/**
 * Extract a user-friendly message from any unknown error.
 * Safe for displaying in toast notifications or error states.
 */
export function getUserFacingErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred";
}

/**
 * Safely convert any error to a NormalizedError shape.
 */
export function toNormalizedError(error: unknown): NormalizedError {
  if (error instanceof ApiError) {
    return {
      category: error.category,
      status: error.status,
      message: error.message,
      details: error.details,
      raw: error.raw,
    };
  }
  return {
    category: "unknown",
    status: 0,
    message: getUserFacingErrorMessage(error),
  };
}

// ── Singleton Export ───────────────────────────────────────

export const errorInterceptor = {
  onFulfilled,
  onRejected,
};

export default errorInterceptor;
