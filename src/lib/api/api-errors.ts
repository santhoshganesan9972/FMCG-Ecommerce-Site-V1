// ── API Error Utilities — Barrel Export ─────────────────────
// Convenience re-export so consumers can import from a single
// path rather than reaching into interceptors/ subdirectories.
//
// Usage:
//   import { ApiError, getUserFacingErrorMessage, categoriseAxiosError } from "@/lib/api/api-errors";

export {
  ApiError,
  categorizeStatus,
  type ApiErrorCategory,
  type NormalizedError,
} from "./api-error";

export {
  errorInterceptor,
  categoriseAxiosError,
  getUserFacingErrorMessage,
  toNormalizedError,
  type ErrorCategory,
} from "./interceptors/error-interceptor";
