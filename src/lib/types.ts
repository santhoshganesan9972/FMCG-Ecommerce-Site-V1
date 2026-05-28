/**
 * Shared type definitions for the FMCG Commerce application.
 * These types provide stricter, reusable, and documented type safety.
 */

// ── Utility Types ──────────────────────────────────────────────

/** Makes all properties of T readonly (deep). */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** Extracts the element type of an array. */
export type ElementOf<T> = T extends readonly (infer E)[] ? E : never;

/** Converts a string union to a human-readable label record. */
export type LabelRecord<T extends string> = Record<T, string>;

/** A value that may be loading, errored, or loaded. */
export type AsyncState<T, E = Error> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: E };

// ── Product Module Types ───────────────────────────────────────

import type { StockStatus } from "@/data/products";

/** Strict, readonly product interface for display components. */
export interface ProductDisplay {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly oldPrice: number;
  readonly rating: number;
  readonly image: string;
  readonly stock: StockStatus;
}

/** Fields that can be used to filter products. */
export interface ProductFilters {
  readonly search: string;
  readonly category: string;
  readonly priceRange: readonly [number, number] | null;
  readonly minRating: number | null;
  readonly stockStatus: StockStatus | "all";
}

/** Valid sort options for product listings. */
export type ProductSortOption =
  | "relevance"
  | "price-low"
  | "price-high"
  | "rating"
  | "name";

// ── Pagination ─────────────────────────────────────────────────

export interface PaginationState {
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
}

// ── UI State Types ─────────────────────────────────────────────

/** Generic dropdown/modal open/close state. */
export interface OpenState {
  readonly isOpen: boolean;
}

/** Standard action callbacks. */
export interface ActionCallbacks {
  readonly onClose?: () => void;
  readonly onOpen?: () => void;
  readonly onToggle?: () => void;
}
