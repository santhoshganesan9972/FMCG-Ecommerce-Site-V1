// ── Wishlist API Adapter ──────────────────────────────────
// Layer: Services → API Adapter → apiClient → Backend
// Handles all wishlist-related API operations.

import { apiClient, createCancellableSignal } from "@/lib/api/api-client";
import { WISHLIST } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";

// ── Types ─────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image?: string;
  price: number;
  mrp?: number;
  addedAt: string;
  inStock: boolean;
}

export interface WishlistResponse {
  items: WishlistItem[];
  totalCount: number;
}

export interface AddToWishlistRequest {
  productId: string;
}

// ── Wishlist API Adapter ──────────────────────────────────

export const wishlistApi = {
  /**
   * Fetch the current user's wishlist.
   */
  getWishlist: async (): Promise<ApiResponse<WishlistResponse>> => {
    const { data: response } = await apiClient.get<ApiResponse<WishlistResponse>>(
      WISHLIST.BASE,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Add a product to the wishlist.
   */
  addItem: async (data: AddToWishlistRequest): Promise<ApiResponse<WishlistResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<WishlistResponse>>(
      WISHLIST.BASE,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Remove a product from the wishlist.
   */
  removeItem: async (productId: string): Promise<ApiResponse<WishlistResponse>> => {
    const { data: response } = await apiClient.delete<ApiResponse<WishlistResponse>>(
      WISHLIST.ITEM(productId),
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Check if a product is in the wishlist.
   */
  checkItem: async (productId: string): Promise<ApiResponse<{ inWishlist: boolean }>> => {
    const { data: response } = await apiClient.get<ApiResponse<{ inWishlist: boolean }>>(
      WISHLIST.ITEM(productId),
      { signal: createCancellableSignal() },
    );
    return response;
  },
};
