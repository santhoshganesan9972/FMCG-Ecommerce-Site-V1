// ── Address API Adapter ──────────────────────────────────
// Layer: Services → API Adapter → apiClient → Backend
// Handles all user address-related API operations.

import { apiClient, createCancellableSignal } from "@/lib/api/api-client";
import { USERS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api";

// ── Types ─────────────────────────────────────────────────

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

export interface CreateAddressRequest {
  label: string;
  fullName: string;
  phone: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
  type: "home" | "work" | "other";
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}

// ── Address API Adapter ──────────────────────────────────

export const addressApi = {
  /**
   * Fetch all addresses for the current user.
   */
  getAddresses: async (): Promise<ApiResponse<Address[]>> => {
    const { data: response } = await apiClient.get<ApiResponse<Address[]>>(
      USERS.ADDRESSES,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Create a new address.
   */
  createAddress: async (data: CreateAddressRequest): Promise<ApiResponse<Address>> => {
    const { data: response } = await apiClient.post<ApiResponse<Address>>(
      USERS.ADDRESSES,
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Update an existing address.
   */
  updateAddress: async (id: string, data: UpdateAddressRequest): Promise<ApiResponse<Address>> => {
    const { data: response } = await apiClient.put<ApiResponse<Address>>(
      USERS.ADDRESS(id),
      data,
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Delete an address.
   */
  deleteAddress: async (id: string): Promise<ApiResponse<null>> => {
    const { data: response } = await apiClient.delete<ApiResponse<null>>(
      USERS.ADDRESS(id),
      { signal: createCancellableSignal() },
    );
    return response;
  },

  /**
   * Set an address as the default delivery address.
   */
  setDefaultAddress: async (id: string): Promise<ApiResponse<Address>> => {
    const { data: response } = await apiClient.post<ApiResponse<Address>>(
      USERS.ADDRESS_SET_DEFAULT(id),
      {},
      { signal: createCancellableSignal() },
    );
    return response;
  },
};
