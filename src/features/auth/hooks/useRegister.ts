// ── useRegister Hook ──────────────────────────────────────
// Layer: Component → Hook → Service → API Adapter → Backend
// Handles user registration with automatic login on success.

"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import type { RegisterRequest } from "@/services/api/auth.api";

export function useRegister() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),

    onSuccess: (response) => {
      // Automatically log the user in after successful registration.
      // setAuth internally syncs cookies via storeAuth().
      setAuth(response.user, response.tokens.accessToken);
    },
  });
}
