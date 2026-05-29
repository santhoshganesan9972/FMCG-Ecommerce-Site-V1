// ── Auth Interceptor ────────────────────────────────────────
// Injects the Bearer token from the auth store into every request.
// If no token is available the request proceeds without one —
// protected endpoints will return 401 which the error/refresh
// interceptors handle downstream.
//
// Architecture:
//   apiClient → authInterceptor (inject token)
//            → request → backend
//
// Future: read token from Zustand store instead of synchronous
// store access, or from a secure cookie for SSR scenarios.

import type { InternalAxiosRequestConfig } from "axios";

// ── Interceptor Handlers ───────────────────────────────────

function onFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // Skip auth header for auth endpoints (login, register, refresh, OTP)
  const authPaths = ["/auth/login", "/auth/register", "/auth/send-otp", "/auth/verify-otp", "/auth/refresh"];
  const isAuthEndpoint = authPaths.some((path) => config.url?.includes(path));

  if (isAuthEndpoint) {
    return config;
  }

  // Attempt to read token — we lazy-import the store to avoid
  // circular dependencies and to keep this interceptor tree-shakable.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useAuthStore } = require("@/store/auth-store");
    // Prefer top-level accessToken (newer pattern), fall back to user.token (legacy)
    const state = useAuthStore.getState();
    const token = state.accessToken ?? state.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Store not available (SSR, test environment) — proceed without token.
    // The request may fail with 401, which downstream interceptors
    // will handle gracefully.
  }

  return config;
}

function onRejected(error: unknown): Promise<never> {
  return Promise.reject(error);
}

// ── Singleton Export ───────────────────────────────────────

export const authInterceptor = {
  onFulfilled,
  onRejected,
};

export default authInterceptor;
