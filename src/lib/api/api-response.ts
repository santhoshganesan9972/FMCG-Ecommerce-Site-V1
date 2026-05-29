// ── API Response Handling ───────────────────────────────────
// Utilities for normalising backend responses into the app's
// standard ApiResponse<T> envelope.
//
// The backend returns:  { success, data, message, error, meta }
// This module provides helpers to unwrap, validate, and transform.

import type { ApiResponse, PaginationMeta } from "@/types/api";

/**
 * Unwrap the data payload from an ApiResponse.
 * Throws an error if the response indicates failure — safe for
 * TanStack Query's queryFn which treats thrown errors as failures.
 */
export function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error ?? response.message ?? "Request failed");
  }
  return response.data;
}

/**
 * Unwrap paginated response data and meta.
 */
export function unwrapPaginated<T>(
  response: ApiResponse<T[]>,
): { data: T[]; meta: PaginationMeta } {
  if (!response.success) {
    throw new Error(response.error ?? response.message ?? "Request failed");
  }
  return {
    data: response.data,
    meta: response.meta ?? { page: 1, pageSize: 10, total: 0, totalPages: 0 },
  };
}

/**
 * Safely extract error details from a failed response.
 * Returns null for successful responses.
 */
export function extractError(response: ApiResponse<unknown>): string | null {
  if (response.success) return null;
  return response.error ?? response.message ?? "Unknown error";
}

/**
 * Build a pagination meta from backend response.
 * Backend uses 0-based pages, frontend uses 1-based.
 */
export function normalizePagination(
  backendMeta?: {
    page?: number;
    size?: number;
    total?: number;
    totalPages?: number;
  },
): PaginationMeta {
  return {
    page: (backendMeta?.page ?? 0) + 1, // convert 0-based → 1-based
    pageSize: backendMeta?.size ?? backendMeta?.pageSize ?? 10,
    total: backendMeta?.total ?? 0,
    totalPages: backendMeta?.totalPages ?? 0,
  };
}

/**
 * Convert frontend 1-based pagination params to backend 0-based.
 */
export function toBackendPagination(params: {
  page?: number;
  pageSize?: number;
}): { page: number; size: number } {
  return {
    page: Math.max(0, (params.page ?? 1) - 1), // convert 1-based → 0-based
    size: params.pageSize ?? 10,
  };
}
