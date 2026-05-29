// ── Standardized API Response Types ──────────────────────────
// All API responses conform to these envelopes, making the
// data layer predictable, type-safe, and backend-ready.
//
// Migration path:
//   Current:  Services return raw data (arrays/objects)
//   Phase 1:  Wrapped in ApiResponse<T> (current – mock adapters)
//   Phase 2:  Real backend returns ApiResponse<T> natively
//   Phase 3:  Add cursor-based pagination via CursorResponse

// ── Pagination Metadata ─────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Cursor-based pagination (for future use with infinite queries). */
export interface CursorMeta {
  nextCursor: string | null;
  hasMore: boolean;
}

// ── Sort Metadata ───────────────────────────────────────────

export interface SortMeta {
  field: string;
  order: "asc" | "desc";
}

// ── Filter Metadata ─────────────────────────────────────────

export interface FilterMeta {
  field: string;
  value: unknown;
  operator?: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
}

// ── Main API Envelope ───────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

/** Paginated variant – a convenience alias. */
export type PaginatedResponse<T> = Required<Pick<ApiResponse<T[]>, "meta">> &
  ApiResponse<T[]>;

/** Cursor-based variant – for infinite-scroll UIs. */
export interface CursorResponse<T> {
  success: boolean;
  data: T[];
  meta: CursorMeta;
  message?: string;
  error?: string;
}

// ── Mutation Result ─────────────────────────────────────────

export interface MutationResult<T = void> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// ── Error Types ─────────────────────────────────────────────

export type ApiErrorCategory =
  | "network"
  | "auth"
  | "validation"
  | "server"
  | "not-found"
  | "rate-limit"
  | "unknown";

export interface NormalizedApiError {
  category: ApiErrorCategory;
  status: number;
  message: string;
  details?: Record<string, string[]>;
}

// ── Request Types ───────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  search?: string;
}

export type ListParams = PaginationParams & SearchParams;

// ── Helper: Build a successful response ─────────────────────

export function successResponse<T>(
  data: T,
  meta?: PaginationMeta,
  message?: string,
): ApiResponse<T> {
  return { success: true, data, meta, message };
}

// ── Helper: Build an error response ─────────────────────────

export function errorResponse<T>(
  error: string,
  data?: T,
): ApiResponse<T> {
  return { success: false, data: data as T, error };
}

// ── Helper: Build paginated response ────────────────────────

export function paginatedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number,
  message?: string,
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
    message,
  };
}

// ── Helper: Build a typed paginated error response ──────────
// Use this in catch blocks of paginated API adapters instead of
// `errorResponse(...) as unknown as PaginatedResponse<T>`.
//
// This ensures the return type includes a valid `meta` object
// so consumers never access undefined meta on error paths.

export function paginatedErrorResponse<T>(
  error: string,
): PaginatedResponse<T> {
  return {
    success: false,
    data: [],
    error,
    meta: { page: 0, pageSize: 0, total: 0, totalPages: 0 },
  };
}

// ── Helper: Compute pagination meta ─────────────────────────

export function computePaginationMeta(
  total: number,
  page: number,
  pageSize: number,
): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
