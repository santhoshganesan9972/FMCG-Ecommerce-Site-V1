// ── Refresh Interceptor ─────────────────────────────────────
// Axios response error interceptor that transparently refreshes
// expired access tokens when a 401 is received.
//
// Behaviour:
//   1. On a 401, check if the errored request is retryable
//   2. If a refresh is already in-flight, queue the request
//   3. Otherwise, acquire the refresh lock and call the
//      refresh endpoint (or trigger the store's refresh flow)
//   4. On success, retry all queued requests with the new token
//   5. On failure, force logout and redirect to login
//   6. Avoid infinite retry loops with a max-retry counter
//
// Integration:
//   Called from api-client.ts AFTER the error interceptor has
//   normalised the error.  The error interceptor runs first so
//   this interceptor receives an ApiError instance.
//
// Future:
//   - Replace store-based token read with HTTP-only cookie
//   - Add refresh token rotation support

import axios, { AxiosError, AxiosResponse, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { AUTH } from "@/lib/api/endpoints";
import { env, isDev } from "@/lib/env";

// ── Constants ──────────────────────────────────────────────

/** Maximum number of consecutive 401 retries before giving up. */
const MAX_RETRIES = 1;

/** Header used to mark a request as already-retried. */
const RETRY_HEADER = "X-Retry-Attempt";

// ── Shared State ───────────────────────────────────────────

/**
 * Promise for the currently in-flight refresh operation.
 * null means no refresh is currently happening.
 */
let refreshPromise: Promise<boolean> | null = null;

/**
 * Queue of requests that arrived while a refresh was in-flight.
 * Each entry holds the original config and resolve/reject callbacks.
 */
interface QueuedRequest {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
}

let failedQueue: QueuedRequest[] = [];

// ── Helpers ────────────────────────────────────────────────

/**
 * Attempt to refresh the access token.
 *
 * Delegates to the auth store's refresh mechanism.  In the current
 * architecture the store reads tokens from memory/cookies and
 * calls the /auth/refresh endpoint.
 *
 * Returns true if the refresh succeeded, false otherwise.
 */
async function attemptTokenRefresh(): Promise<boolean> {
  try {
    // 1. Read current token from the auth store
    let currentToken: string | undefined;

    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useAuthStore } = require("@/store/auth-store");
      currentToken = useAuthStore.getState()?.user?.token;
    } catch {
      // Store not available (SSR, tests) — can't refresh
      return false;
    }

    if (!currentToken) return false;

    // 2. Call the backend refresh endpoint using full URL
    const refreshUrl = `${env.apiBaseUrl}${AUTH.REFRESH}`;
    const response = await fetch(
      refreshUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        credentials: "include",
      },
    );

    if (!response.ok) return false;

    const data = await response.json();

    // 3. Update the auth store with the new token
    if (data?.token || data?.data?.token) {
      const newToken = data.token ?? data.data.token;
      const expiresAt = data.expiresAt ?? data.data?.expiresAt ?? data.expires ?? data.data?.expires;

      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useAuthStore } = require("@/store/auth-store");
        const currentUser = useAuthStore.getState()?.user;
        if (currentUser) {
          useAuthStore.getState().setUser({
            ...currentUser,
            token: newToken,
            expiresAt: expiresAt ?? currentUser.expiresAt,
          });
        }
      } catch {
        return false;
      }

      return true;
    }

    return false;
  } catch {
    // Refresh endpoint unreachable — network error, etc.
    return false;
  }
}

/**
 * Process the queue of requests that accumulated while refresh
 * was in-flight, retrying each with the new auth token.
 */
function processQueue(error: unknown, newToken?: string): void {
  const queue = [...failedQueue];
  failedQueue = [];

  for (const { config, resolve, reject } of queue) {
    if (error || !newToken) {
      reject(error);
    } else {
      // Clone the config and update the auth header
      const retryConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };

      // Use axios directly to retry — avoids circular dependency
      // since we only import axios lib, not the configured apiClient.
      axios(retryConfig).then(resolve).catch(reject);
    }
  }
}

// ── Interceptor Handlers ───────────────────────────────────

function onFulfilled(response: AxiosResponse): AxiosResponse {
  // Pass through successful responses unchanged
  return response;
}

async function onRejected(error: AxiosError): Promise<unknown> {
  const originalConfig = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

  // 1. Only handle 401 errors with a config
  if (error.response?.status !== 401 || !originalConfig) {
    return Promise.reject(error);
  }

  // 2. Don't retry auth endpoints (login, register, refresh itself)
  const url = originalConfig.url ?? "";
  const isAuthEndpoint = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"].some(
    (path) => url.includes(path),
  );
  if (isAuthEndpoint) {
    return Promise.reject(error);
  }

  // 3. Check retry count to avoid infinite loops
  const retryCount = originalConfig._retryCount ?? 0;
  if (retryCount >= MAX_RETRIES) {
    // Max retries exceeded — force logout
    forceLogout("Session expired — please log in again");
    return Promise.reject(error);
  }

  // 4. Mark this config so we can detect retries
  originalConfig._retryCount = retryCount + 1;
  (originalConfig.headers as Record<string, string>)[RETRY_HEADER] = String(originalConfig._retryCount);

  // 5. If a refresh is already in-flight, queue this request
  if (refreshPromise) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: originalConfig });
    });
  }

  // 6. Acquire the refresh lock and attempt refresh
  refreshPromise = attemptTokenRefresh();

  try {
    const success = await refreshPromise;

    if (success) {
      // Read the new token
      let newToken: string | undefined;
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useAuthStore } = require("@/store/auth-store");
        newToken = useAuthStore.getState()?.user?.token;
      } catch {
        // ignore
      }

      // 7. Process queued requests with the new token
      processQueue(null, newToken);

      // 8. Retry the original request with the new token
      if (newToken) {
        originalConfig.headers.Authorization = `Bearer ${newToken}`;
      }

      // Use axios directly to retry, bypassing interceptors
      const { default: axios } = await import("axios");
      return axios(originalConfig);
    }

    // Refresh failed — reject everything
    const errorMessage = "Session expired — please log in again";
    processQueue(new Error(errorMessage));
    forceLogout(errorMessage);

    return Promise.reject(error);
  } catch (refreshError) {
    processQueue(refreshError);
    forceLogout("Session expired — please log in again");
    return Promise.reject(refreshError);
  } finally {
    refreshPromise = null;
  }
}

/**
 * Force the user to log out and redirect to the login page.
 * Called when token refresh fails irrecoverably.
 */
function forceLogout(message: string): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require("@/store/auth-store");
    useAuthStore.getState().logout();
  } catch {
    // Store not available — nothing to clean up
  }

  if (isDev) {
    console.info("[Auth] Token refresh failed —", message);
  }

  // Redirect to login page if we're in the browser
  if (typeof window !== "undefined") {
    // Small delay to let the store propagate before redirect
    setTimeout(() => {
      window.location.href = `/login?expired=1`;
    }, 100);
  }
}

// ── Singleton Export ───────────────────────────────────────

export const refreshInterceptor = {
  onFulfilled,
  onRejected,
};

export default refreshInterceptor;
