// ── Auth API Adapter ──────────────────────────────────────
// Layer: Services → API Adapter → apiClient → Backend
// Transforms backend API calls into typed ApiResponse<T>.
// Intended to be consumed by auth.service.ts, never by hooks directly.

import { apiClient, createCancellableSignal } from "@/lib/api/api-client";
import { AUTH, USERS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";

// ── Types ─────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin" | "vendor";
  avatar?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  valid: boolean;
  token?: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
}

// ── Auth API Adapter ──────────────────────────────────────

export const authApi = {
  /**
   * Login with email and password.
   */
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<LoginResponse>>(
      AUTH.LOGIN,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Register a new user account.
   */
  register: async (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<LoginResponse>>(
      AUTH.REGISTER,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Send OTP to phone number for verification.
   */
  sendOtp: async (data: SendOtpRequest): Promise<ApiResponse<{ message: string }>> => {
    const { data: response } = await apiClient.post<ApiResponse<{ message: string }>>(
      AUTH.SEND_OTP,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Verify OTP code.
   */
  verifyOtp: async (data: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<VerifyOtpResponse>>(
      AUTH.VERIFY_OTP,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Refresh the access token using the refresh token.
   */
  refresh: async (refreshToken: string): Promise<ApiResponse<RefreshResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<RefreshResponse>>(
      AUTH.REFRESH,
      { refreshToken },
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Logout the current user session.
   */
  logout: async (): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.post<ApiResponse<null>>(
      AUTH.LOGOUT,
      {},
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Get the currently authenticated user's profile.
   */
  getProfile: async (): Promise<ApiResponse<AuthUser>> => {
    const { data: response } = await apiClient.get<ApiResponse<AuthUser>>(
      USERS.ME,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Update the currently authenticated user's profile.
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<AuthUser>> => {
    const { data: response } = await apiClient.put<ApiResponse<AuthUser>>(
      USERS.ME,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },
};
