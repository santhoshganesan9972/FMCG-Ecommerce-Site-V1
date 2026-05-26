// ── Centralized Validation — Barrel Export ───────────────
// Import from here to access all validation schemas.
//
// @example
//   import { productSchema, userSchema, validators } from "@/validation";

export { productSchema } from "./product";
export { userSchema } from "./user";
export { orderSchema, orderItemSchema } from "./order";

export type { ProductInput } from "./product";
export type { UserInput } from "./user";
export type { OrderInput, OrderItemInput } from "./order";

// ── Common Field Validators ──────────────────────────────

import { z } from "zod";

export const validators = {
  /** Validates that a string is a non-empty trimmed value */
  required: (field: string) =>
    z.string().min(1, `${field} is required`).max(500),

  /** Validates a URL string (image, link, etc.) */
  url: z.string().url("Invalid URL").max(2000).optional(),

  /** Validates a percentage value (0-100) */
  percentage: z
    .number()
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must be at most 100"),

  /** Validates a monetary amount */
  amount: z
    .number()
    .nonnegative("Amount cannot be negative")
    .max(9999999, "Amount exceeds maximum allowed"),

  /** Validates a date string in ISO format */
  isoDate: z.string().datetime("Invalid date format"),

  /** Validates pagination params */
  pagination: z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(20),
  }),
};
