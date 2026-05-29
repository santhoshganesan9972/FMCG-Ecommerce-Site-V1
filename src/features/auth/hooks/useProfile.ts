// ── useProfile Hook ───────────────────────────────────────
// Layer: Component → Hook → Service → API Adapter → Backend
// Provides both fetching and updating the user profile.

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { queryKeys } from "@/lib/query-keys";
import { useAuthStore } from "@/store/auth-store";
import type { AuthUser, UpdateProfileRequest } from "@/services/api/auth.api";

/**
 * Fetch the currently authenticated user's profile.
 * Only enabled when the user is logged in.
 */
export function useProfile() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => authService.getProfile(),
    enabled: isLoggedIn,
    staleTime: 5 * 60 * 1000, // 5 minutes — profile rarely changes
    retry: 1,
  });
}

/**
 * Update the user's profile.
 * Invalidates the profile cache on success.
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authService.updateProfile(data),

    onSuccess: (updatedUser) => {
      // Update React Query cache — store state is already synced via login flow.
      // Note: we intentionally skip setUser() here because the store's UserProfile
      // requires `token` and `expiresAt` fields not present in the API's AuthUser type.
      queryClient.setQueryData(queryKeys.profile, updatedUser);
    },
  });
}
