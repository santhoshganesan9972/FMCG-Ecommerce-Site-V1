// ── Enterprise API Client ────────────────────────────────────
// Single Axios instance configured with base URL, timeouts,
// credentials, and all interceptors (auth, error, refresh).
//
// Usage:
//   import { apiClient } from "@/lib/api/api-client";
//   const res = await apiClient.get("/v1/products");
//
// Architecture:
//   Component → Hook → Service → apiClient → Backend
//
// For direct API adapter usage, prefer the dedicated adapter
// functions in @/services/api/ which wrap this client.

import axios from "axios";
import { env } from "@/lib/env";
import { authInterceptor } from "./auth-interceptor";
import { errorInterceptor } from "./interceptors/error-interceptor";
import { refreshInterceptor } from "./interceptors/refresh-interceptor";

// ── Axios Instance ─────────────────────────────────────────

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30_000, // 30s default timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // required for future HTTP‑only cookies
});

// ── Request Interceptors ───────────────────────────────────
// Order matters: auth runs first so refresh can rely on it.

apiClient.interceptors.request.use(authInterceptor.onFulfilled, authInterceptor.onRejected);

// ── Response Interceptors ──────────────────────────────────
// Error interceptor runs first to normalize errors,
// then refresh interceptor can retry on 401.

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Normalize the error first
    const normalized = errorInterceptor.onRejected(error);

    // 2. If it's a 401 that could be recovered by refresh, try it
    if (normalized?.status === 401) {
      return refreshInterceptor.onRejected(error);
    }

    return Promise.reject(normalized);
  },
);

// ── Helper to cancel stale requests ────────────────────────
// Useful in TanStack Query's queryFn when the query key changes.
// Usage:
//   const { signal } = new AbortController();
//   apiClient.get("/products", { signal });

export function createCancellableSignal(): AbortSignal {
  return new AbortController().signal;
}

export default apiClient;
