// ── Reusable Query & Mutation Defaults ──────────────────────
// Pre-configured options that enforce consistent behaviour
// across all queries/mutations in the app.
//
// Usage:
//   const { data } = useQuery({
//     ...defaultQueryOptions,
//     queryKey: queryKeys.products.list(filters),
//     queryFn: () => productsService.getProducts(filters),
//   })

import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import type { ApiResponse, NormalizedApiError } from "@/types/api";

// ── Default Query Options ──────────────────────────────────

export const defaultQueryOptions: Partial<UseQueryOptions> = {
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
};

// ── Default Mutation Options ───────────────────────────────

export const defaultMutationOptions: Partial<UseMutationOptions> = {
  retry: 0,
};

// ── Safe mutation error handler ────────────────────────────
// Use in onError to categorise errors without crashing.

export function handleMutationError(
  error: unknown,
): NormalizedApiError {
  if (error instanceof Error && "status" in error) {
    const apiErr = error as { status: number; message: string };
    return {
      category: categorizeStatus(apiErr.status),
      status: apiErr.status,
      message: apiErr.message,
    };
  }
  return {
    category: "unknown",
    status: 0,
    message: error instanceof Error ? error.message : "Unknown error",
  };
}

function categorizeStatus(status: number): NormalizedApiError["category"] {
  if (status === 0) return "network";
  if (status === 401 || status === 403) return "auth";
  if (status === 404) return "not-found";
  if (status === 422) return "validation";
  if (status === 429) return "rate-limit";
  if (status >= 500) return "server";
  return "unknown";
}

// ── Select helpers (for memoised data extraction) ──────────

/**
 * Extracts the `data` field from an ApiResponse.
 * Use with `select` to avoid unnecessary re-renders.
 *
 * Example:
 *   useQuery({
 *     queryKey: [...],
 *     queryFn: ...,
 *     select: selectApiData,
 *   })
 */
export function selectApiData<T>(response: ApiResponse<T>): T {
  return response.data;
}

/**
 * Extracts pagination meta from an ApiResponse array.
 */
export function selectPaginationMeta<T>(
  response: ApiResponse<T[]>,
) {
  return { data: response.data, meta: response.meta };
}
