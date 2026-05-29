// ── Vendors API Adapter ────────────────────────────────────
// Connects admin vendor management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse, paginatedErrorResponse } from "@/types/api";
import type { ApiResponse, PaginatedResponse, MutationResult } from "@/types/api";
import type {
  Vendor,
  VendorOnboarding,
  VendorProduct,
  VendorSettlement,
  VendorAnalyticsEntry,
  VendorFilters,
  VendorSummary,
  SettlementSummary,
  OnboardingSummary,
  VendorAnalyticsSummary,
} from "@/types/vendors";

const V = ADMIN;

// ── Vendors ────────────────────────────────────────────────

export async function getVendors(
  filters?: Partial<VendorFilters>,
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<Vendor>> {
  try {
    const params: Record<string, unknown> = { ...filters, page, size: pageSize };
    const response = await apiClient.get(V.VENDORS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<Vendor>(
      error instanceof Error ? error.message : "Failed to load vendors",
    );
  }
}

export async function getVendorById(id: string): Promise<ApiResponse<Vendor | null>> {
  try {
    const response = await apiClient.get(V.VENDOR(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Vendor not found",
    );
  }
}

export async function getVendorSummary(): Promise<ApiResponse<VendorSummary>> {
  try {
    const response = await apiClient.get(`${V.VENDORS}/summary`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load vendor summary",
    );
  }
}

export async function createVendor(data: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
  try {
    const response = await apiClient.post(V.VENDORS, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create vendor",
    );
  }
}

export async function updateVendorStatus(id: string, status: Vendor["status"]): Promise<MutationResult<void>> {
  try {
    const response = await apiClient.put(V.VENDOR(id), { status });
    return response.data;
  } catch (error) {
    return { success: false, data: undefined, error: error instanceof Error ? error.message : "Failed to update vendor status" };
  }
}

// ── Onboarding ─────────────────────────────────────────────

export async function getOnboardingApplications(
  filters?: Partial<VendorFilters>,
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<VendorOnboarding>> {
  try {
    const params: Record<string, unknown> = { ...filters, page, size: pageSize };
    const response = await apiClient.get(V.VENDOR_ONBOARDING, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<VendorOnboarding>(
      error instanceof Error ? error.message : "Failed to load onboarding applications",
    );
  }
}

export async function getOnboardingSummary(): Promise<ApiResponse<OnboardingSummary>> {
  try {
    const response = await apiClient.get(`${V.VENDOR_ONBOARDING}/summary`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load onboarding summary",
    );
  }
}

export async function approveVendor(id: string): Promise<MutationResult<void>> {
  try {
    const response = await apiClient.post(V.VENDOR_ONBOARDING_APPROVE(id));
    return response.data;
  } catch (error) {
    return { success: false, data: undefined, error: error instanceof Error ? error.message : "Failed to approve vendor" };
  }
}

export async function rejectVendor(id: string, reason: string): Promise<MutationResult<void>> {
  try {
    const response = await apiClient.post(V.VENDOR_ONBOARDING_REJECT(id), { reason });
    return response.data;
  } catch (error) {
    return { success: false, data: undefined, error: error instanceof Error ? error.message : "Failed to reject vendor" };
  }
}

// ── Vendor Products ────────────────────────────────────────

export async function getVendorProducts(
  filters?: Partial<VendorFilters> & { vendorId?: string },
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<VendorProduct>> {
  try {
    const params: Record<string, unknown> = { ...filters, page, size: pageSize };
    const response = await apiClient.get(V.VENDOR_PRODUCTS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<VendorProduct>(
      error instanceof Error ? error.message : "Failed to load vendor products",
    );
  }
}

export async function getVendorProductSummary(): Promise<ApiResponse<{
  totalProducts: number; activeProducts: number; outOfStockCount: number;
  inactiveCount: number; avgMargin: number; totalStockValue: number;
}>> {
  try {
    const response = await apiClient.get(`${V.VENDOR_PRODUCTS}/summary`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load vendor product summary",
    );
  }
}

// ── Settlements ────────────────────────────────────────────

export async function getSettlements(
  filters?: Partial<VendorFilters>,
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<VendorSettlement>> {
  try {
    const params: Record<string, unknown> = { ...filters, page, size: pageSize };
    const response = await apiClient.get(V.VENDOR_SETTLEMENTS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<VendorSettlement>(
      error instanceof Error ? error.message : "Failed to load settlements",
    );
  }
}

export async function getSettlementSummary(): Promise<ApiResponse<SettlementSummary>> {
  try {
    const response = await apiClient.get(`${V.VENDOR_SETTLEMENTS}/summary`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load settlement summary",
    );
  }
}

export async function processSettlement(id: string): Promise<MutationResult<void>> {
  try {
    const response = await apiClient.post(V.VENDOR_SETTLEMENT_PROCESS(id));
    return response.data;
  } catch (error) {
    return { success: false, data: undefined, error: error instanceof Error ? error.message : "Failed to process settlement" };
  }
}

// ── Analytics ──────────────────────────────────────────────

export async function getVendorAnalytics(
  filters?: Partial<VendorFilters>,
  page = 1,
  pageSize = 10,
): Promise<PaginatedResponse<VendorAnalyticsEntry>> {
  try {
    const params: Record<string, unknown> = { ...filters, page, size: pageSize };
    const response = await apiClient.get(V.VENDOR_ANALYTICS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<VendorAnalyticsEntry>(
      error instanceof Error ? error.message : "Failed to load vendor analytics",
    );
  }
}

export async function getVendorAnalyticsSummary(): Promise<ApiResponse<VendorAnalyticsSummary>> {
  try {
    const response = await apiClient.get(`${V.VENDOR_ANALYTICS}/summary`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load analytics summary",
    );
  }
}

export async function exportVendors(format: "csv" | "xlsx" | "pdf"): Promise<MutationResult<{ downloadUrl: string }>> {
  try {
    const response = await apiClient.get(V.VENDOR_EXPORT, { params: { format } });
    return response.data;
  } catch (error) {
    return { success: false, data: { downloadUrl: "" }, error: error instanceof Error ? error.message : "Failed to export vendors" };
  }
}
