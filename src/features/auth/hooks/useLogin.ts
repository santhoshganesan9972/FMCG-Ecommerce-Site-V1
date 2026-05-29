// ── useLogin Hook ─────────────────────────────────────────
// Layer: Component → Hook → Service → API Adapter → Backend
// Uses TanStack Query useMutation for login with
// automatic auth state updates on success.

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { setAuthCookies } from "@/lib/auth/token-utils";
import { queryKeys } from "@/lib/query-keys";
import type { LoginRequest } from "@/services/api/auth.api";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),

    onSuccess: (response) => {
      // Update Zustand auth state using the real-API setAuth method
      // setAuth internally syncs cookies via storeAuth().
      // We pass the refresh token for potential future use (e.g., silent refresh).
      setAuth(response.user, response.tokens.accessToken, response.tokens.refreshToken);

      // Sync auth cookies for middleware — uses server-reported expiresIn for accuracy.
      const expiresAt = new Date(
        Date.now() + response.tokens.expiresIn * 1000,
      ).toISOString();
      setAuthCookies(
        response.tokens.accessToken,
        response.user.role,
        expiresAt,
      );

      // Invalidate any profile queries to refetch with new token
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile,
      });
    },

    onError: () => {
      // Ensure auth state is clean on failure
      // (error is surfaced via the mutation result)
    },
  });
}
