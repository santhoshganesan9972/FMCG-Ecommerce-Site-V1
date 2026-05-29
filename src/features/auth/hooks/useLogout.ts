// ── useLogout Hook ────────────────────────────────────────
// Layer: Component → Hook → Service → API Adapter → Backend
// Handles logout with full cleanup of auth state and cache.

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { clearAuthCookies } from "@/lib/auth/token-utils";
import { queryKeys } from "@/lib/query-keys";

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout: clearAuthState } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),

    onSettled: () => {
      // Always clear state — even if the API call fails
      clearAuthState();
      clearAuthCookies();

      // Clear all React Query cache to remove stale user data
      queryClient.clear();
    },

    onError: () => {
      // Logout always succeeds from the user's perspective
      // because we clear local state regardless of API response
    },
  });
}
