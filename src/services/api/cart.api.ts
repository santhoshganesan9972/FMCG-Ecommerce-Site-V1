// ── Cart API Adapter ──────────────────────────────────────
// Layer: Services → API Adapter → apiClient → Backend
// Handles all cart-related API operations.

import { apiClient, createCancellableSignal } from "@/lib/api/api-client";
import { CART } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";

// ── Types ─────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
  weight?: string;
  stockStatus?: "in_stock" | "low_stock" | "out_of_stock";
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export interface CartResponse {
  items: CartItem[];
  summary: CartSummary;
  appliedCoupon?: {
    code: string;
    discount: number;
  };
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  variantId?: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface ApplyCouponRequest {
  code: string;
}

// ── Cart API Adapter ──────────────────────────────────────

export const cartApi = {
  /**
   * Fetch the current user's cart with items and summary.
   */
  getCart: async (): Promise<ApiResponse<CartResponse>> => {
    const { data: response } = await apiClient.get<ApiResponse<CartResponse>>(
      CART.ITEMS,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Add a product to the cart.
   */
  addItem: async (item: AddToCartRequest): Promise<ApiResponse<CartResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<CartResponse>>(
      CART.ITEMS,
      item,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Update the quantity of a cart item.
   */
  updateItem: async (itemId: string, data: UpdateCartItemRequest): Promise<ApiResponse<CartResponse>> => {
    const { data: response } = await apiClient.put<ApiResponse<CartResponse>>(
      CART.ITEM(itemId),
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Remove an item from the cart.
   */
  removeItem: async (itemId: string): Promise<ApiResponse<CartResponse>> => {
    const { data: response } = await apiClient.delete<ApiResponse<CartResponse>>(
      CART.ITEM(itemId),
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Apply a coupon code to the cart.
   */
  applyCoupon: async (data: ApplyCouponRequest): Promise<ApiResponse<CartResponse>> => {
    const { data: response } = await apiClient.post<ApiResponse<CartResponse>>(
      CART.APPLY_COUPON,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Clear all items from the cart.
   */
  clearCart: async (): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.delete<ApiResponse<null>>(
      CART.CLEAR,
      { signal: createCancellableSignal() },
    );
    return response;
  },
};
