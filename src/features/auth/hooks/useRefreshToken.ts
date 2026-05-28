// ── useRefreshToken Hook ─────────────────────────────────
// Layer: Component → Hook → Service → API Adapter → Backend
// Handles silent token refresh for session maintenance.

"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { setAuthCookies } from "@/lib/auth/token-utils";
import { useAuthStore } from "@/store/auth-store";

export function useRefreshToken() {
  const store = useAuthStore;

  return useMutation({
    mutationFn: (refreshToken: string) =>
      authService.refreshToken(refreshToken),

    onSuccess: (response) => {
      const state = store.getState();
      const user = state.user;

      // Update cookies with new tokens
      const expiresAt = new Date(
        Date.now() + response.expiresIn * 1000,
      ).toISOString();
      setAuthCookies(
        response.accessToken,
        user?.role ?? "user",
        expiresAt,
      );

      // Auth interceptor will pick up the new token from the store
      // The store's token is managed by the auth interceptor lifecycle
    },

    onError: () => {
      // If refresh fails, force logout
      const { logout } = store.getState();
      logout();
      // Clear cookies will be handled by the refresh interceptor
    },
  });
}
