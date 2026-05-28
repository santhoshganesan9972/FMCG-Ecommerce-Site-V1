// ── API-Specific Type Utilities ─────────────────────────────
// Helper types for creating typed API functions.

import type { ApiResponse, PaginatedResponse } from "@/types/api";

/**
 * Type for an API function that returns a single item.
 */
export type ApiGetFn<T> = (...args: unknown[]) => Promise<ApiResponse<T>>;

/**
 * Type for an API function that returns a paginated list.
 */
export type ApiListFn<T> = (
  ...args: unknown[]
) => Promise<PaginatedResponse<T>>;

/**
 * Type for an API mutation function.
 */
export type ApiMutateFn<TInput, TOutput> = (
  input: TInput,
) => Promise<ApiResponse<TOutput>>;

/**
 * Extract the unwrapped data type from an ApiResponse.
 */
export type Unwrapped<T> = T extends ApiResponse<infer D> ? D : never;

/**
 * Extract the unwrapped item type from a PaginatedResponse.
 */
export type PaginatedItem<T> = T extends PaginatedResponse<infer I> ? I : never;

/**
 * Backend paginated response shape (Spring Page).
 */
export interface BackendPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // 0-based page index
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * Convert a Spring Page to the app's PaginatedResponse.
 */
export function fromSpringPage<T>(
  page: BackendPage<T>,
): PaginatedResponse<T> {
  return {
    success: true,
    data: page.content,
    meta: {
      page: page.number + 1,
      pageSize: page.size,
      total: page.totalElements,
      totalPages: page.totalPages,
    },
  };
}
