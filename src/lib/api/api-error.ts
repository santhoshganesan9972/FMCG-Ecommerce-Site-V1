// ── API Error Classes ───────────────────────────────────────
// Normalized error objects that the rest of the app can rely on,
// regardless of how the backend reports errors.

export type ApiErrorCategory =
  | "network"
  | "auth"
  | "validation"
  | "server"
  | "not-found"
  | "rate-limit"
  | "timeout"
  | "unknown";

export interface NormalizedError {
  category: ApiErrorCategory;
  status: number;
  message: string;
  details?: Record<string, string[]>;
  raw?: unknown;
}

/**
 * Categorise an HTTP status code into a logical error category.
 */
export function categorizeStatus(status: number): ApiErrorCategory {
  if (status === 0) return "network";
  if (status === 401 || status === 403) return "auth";
  if (status === 404) return "not-found";
  if (status === 408 || status === 499) return "timeout";
  if (status === 422) return "validation";
  if (status === 429) return "rate-limit";
  if (status >= 500) return "server";
  return "unknown";
}

/**
 * Application-level API Error.
 * Wraps an Axios/HTP error into a predictable shape so that
 * hooks and UI components never have to parse raw errors.
 */
export class ApiError extends Error {
  public readonly category: ApiErrorCategory;
  public readonly status: number;
  public readonly details?: Record<string, string[]>;
  public readonly raw?: unknown;

  constructor(
    message: string,
    status: number,
    details?: Record<string, string[]>,
    raw?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.category = categorizeStatus(status);
    this.status = status;
    this.details = details;
    this.raw = raw;
  }

  /** True if the error is a network / connection issue. */
  get isNetworkError(): boolean {
    return this.category === "network";
  }

  /** True if the error requires re-authentication. */
  get isAuthError(): boolean {
    return this.category === "auth";
  }

  /** True if the error is a client-side validation failure. */
  get isValidationError(): boolean {
    return this.category === "validation";
  }

  /** True if the backend had an internal failure. */
  get isServerError(): boolean {
    return this.category === "server";
  }

  /**
   * Create an ApiError from any unknown error (e.g. caught in a catch block).
   * Preserves ApiError instances, normalises everything else.
   */
  static fromUnknown(error: unknown): ApiError {
    if (error instanceof ApiError) return error;

    if (error instanceof Error) {
      // Network errors (e.g., fetch fails, timeout)
      if (error.name === "AbortError") {
        return new ApiError("Request was cancelled", 499);
      }
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch") ||
        error.message.includes("ENOTFOUND")
      ) {
        return new ApiError("No response from server — check your connection", 0);
      }
      return new ApiError(error.message, 0);
    }

    return new ApiError("An unknown error occurred", 0);
  }
}
