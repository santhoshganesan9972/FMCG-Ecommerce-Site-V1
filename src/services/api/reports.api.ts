// ── Reports API Adapter ─────────────────────────────────────
// Connects admin reports to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse } from "@/types/api";
import type { ApiResponse, MutationResult } from "@/types/api";

// ── Revenue Reports ─────────────────────────────────────────

export async function getRevenueReports(
  period?: string,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_REVENUE, {
      params: period ? { period } : undefined,
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load revenue reports",
    );
  }
}

// ── Customer Reports ───────────────────────────────────────

export async function getCustomerReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_CUSTOMER, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load customer reports",
    );
  }
}

// ── Vendor Reports ────────────────────────────────────────

export async function getVendorReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_VENDOR, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load vendor reports",
    );
  }
}

// ── Inventory Reports ─────────────────────────────────────

export async function getInventoryReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_INVENTORY, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load inventory reports",
    );
  }
}

// ── Order/Sales Reports ────────────────────────────────────

export async function getOrderReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_ORDER, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load order reports",
    );
  }
}

export async function getSalesReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_SALES, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load sales reports",
    );
  }
}

// ── GST Reports ───────────────────────────────────────────

export async function getGSTReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_GST, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load GST reports",
    );
  }
}

// ── Cohort Data ─────────────────────────────────────────────

export async function getCohortData(): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_COHORT);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load cohort data",
    );
  }
}

// ── Revenue Analytics ──────────────────────────────────────

export async function getRevenueAnalytics(): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_REVENUE_ANALYTICS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load revenue analytics",
    );
  }
}

// ── Abandoned Cart Reports ────────────────────────────────

export async function getAbandonedCartReports(
  filters?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_ABANDONED_CART, { params: filters });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load abandoned cart reports",
    );
  }
}

// ── Promotion ROI Reports ─────────────────────────────────

export async function getPromotionROIReports(
  filters?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_PROMOTION_ROI, { params: filters });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load promotion ROI reports",
    );
  }
}

// ── Tax Reports ─────────────────────────────────────────

export async function getTaxReports(
  params?: Record<string, unknown>,
): Promise<ApiResponse<unknown>> {
  try {
    const response = await apiClient.get(ADMIN.REPORTS_TAX, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load tax reports",
    );
  }
}

// ── Export Report (Mutation) ───────────────────────────────

export async function exportReport(
  reportType: string,
  format: "xlsx" | "pdf" | "csv",
): Promise<MutationResult<{ downloadUrl: string }>> {
  try {
    const response = await apiClient.post(ADMIN.REPORTS_EXPORT, { reportType, format });
    return response.data;
  } catch (error) {
    return { success: false, data: { downloadUrl: "" }, error: error instanceof Error ? error.message : "Failed to export report" };
  }
}
