// ── Auth Service ──────────────────────────────────────────
// Layer: Hooks → Service → API Adapter → Backend
// Orchestrates auth operations, unwraps API responses,
// and provides clean error handling for hooks.
//
// This service is consumed by auth hooks, not by components directly.

import { authApi } from "@/services/api/auth.api";
import { unwrapResponse } from "@/lib/api/api-response";
import { ApiError } from "@/lib/api/api-error";
import type { AuthUser, LoginRequest, RegisterRequest, LoginResponse } from "@/services/api/auth.api";

export const authService = {
  /**
   * Login with email and password.
   * Returns user + tokens on success.
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authApi.login(data);
      return unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Register a new user account.
   * Returns user + tokens on success.
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    try {
      const response = await authApi.register(data);
      return unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Send OTP to phone number.
   */
  sendOtp: async (phone: string): Promise<void> => {
    try {
      const response = await authApi.sendOtp({ phone });
      unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Verify OTP code.
   */
  verifyOtp: async (phone: string, otp: string): Promise<{ valid: boolean; token?: string }> => {
    try {
      const response = await authApi.verifyOtp({ phone, otp });
      return unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Refresh the access token.
   */
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> => {
    try {
      const response = await authApi.refresh(refreshToken);
      return unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Logout the current user session.
   */
  logout: async (): Promise<void> => {
    try {
      const response = await authApi.logout();
      unwrapResponse(response);
    } catch (error) {
      // Even if the API call fails, we should still clear local state
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Get the currently authenticated user's profile.
   */
  getProfile: async (): Promise<AuthUser> => {
    try {
      const response = await authApi.getProfile();
      return unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },

  /**
   * Update the user's profile.
   */
  updateProfile: async (data: Partial<AuthUser>): Promise<AuthUser> => {
    try {
      const response = await authApi.updateProfile(data);
      return unwrapResponse(response);
    } catch (error) {
      throw ApiError.fromUnknown(error);
    }
  },
};
