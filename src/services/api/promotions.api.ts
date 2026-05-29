// ── Promotions API Adapter ─────────────────────────────────
// Connects admin promotions management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { PROMOTIONS } from "@/lib/api/endpoints";
import { errorResponse, successResponse } from "@/types/api";
import type { ApiResponse, PaginatedResponse, MutationResult } from "@/types/api";
import type {
  Promotion,
  Coupon,
  FlashSale,
  Campaign,
  PushNotification,
  ABTest,
  PromotionFilters,
  CouponFilters,
  ABTestFilters,
  CampaignAnalytics,
} from "@/types/promotions";

const P = PROMOTIONS;

// ── Promotions ─────────────────────────────────────────────

export async function getPromotions(
  filters: Partial<PromotionFilters> = {},
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 },
): Promise<ApiResponse<{
  items: Promotion[];
  total: number;
  summary: { total: number; active: number; scheduled: number; expired: number; totalUsage: number; totalBudget: string };
}>> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination.page,
      size: pagination.pageSize,
    };
    const response = await apiClient.get(P.ADMIN_BASE, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load promotions",
    );
  }
}

export async function getPromotionById(id: string): Promise<ApiResponse<Promotion | undefined>> {
  try {
    const response = await apiClient.get(P.ADMIN_DETAIL(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Promotion not found",
    );
  }
}

export async function createPromotion(data: Partial<Promotion>): Promise<ApiResponse<Promotion>> {
  try {
    const response = await apiClient.post(P.ADMIN_BASE, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create promotion",
    );
  }
}

export async function updatePromotion(id: string, data: Partial<Promotion>): Promise<ApiResponse<Promotion | undefined>> {
  try {
    const response = await apiClient.put(P.ADMIN_DETAIL(id), data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update promotion",
    );
  }
}

export async function deletePromotion(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(P.ADMIN_DETAIL(id));
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete promotion" };
  }
}

// ── Coupons ────────────────────────────────────────────────

export async function getCoupons(
  filters: Partial<CouponFilters> = {},
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 },
): Promise<ApiResponse<{ items: Coupon[]; total: number; summary: Record<string, number | string> }>> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination.page,
      size: pagination.pageSize,
    };
    const response = await apiClient.get(P.ADMIN_COUPONS, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load coupons",
    );
  }
}

export async function generateCoupon(data: Partial<Coupon>): Promise<ApiResponse<Coupon>> {
  try {
    const response = await apiClient.post(P.ADMIN_COUPONS, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to generate coupon",
    );
  }
}

export async function updateCoupon(id: string, data: Partial<Coupon>): Promise<ApiResponse<Coupon | undefined>> {
  try {
    const response = await apiClient.put(P.ADMIN_COUPON(id), data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update coupon",
    );
  }
}

export async function deleteCoupon(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(P.ADMIN_COUPON(id));
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete coupon" };
  }
}

// ── Flash Sales ────────────────────────────────────────────

export async function getFlashSales(
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 },
): Promise<ApiResponse<{
  items: FlashSale[]; total: number; summary: { live: number; scheduled: number; completed: number; totalBudget: string };
}>> {
  try {
    const response = await apiClient.get(`${P.ADMIN_BASE}/flash-sales`, {
      params: { page: pagination.page, size: pagination.pageSize },
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load flash sales",
    );
  }
}

export async function createFlashSale(data: Partial<FlashSale>): Promise<ApiResponse<FlashSale>> {
  try {
    const response = await apiClient.post(`${P.ADMIN_BASE}/flash-sales`, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create flash sale",
    );
  }
}

export async function updateFlashSale(id: string, data: Partial<FlashSale>): Promise<ApiResponse<FlashSale | undefined>> {
  try {
    const response = await apiClient.put(`${P.ADMIN_BASE}/flash-sales/${id}`, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update flash sale",
    );
  }
}

export async function deleteFlashSale(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(`${P.ADMIN_BASE}/flash-sales/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete flash sale" };
  }
}

// ── Campaigns ──────────────────────────────────────────────

export async function getCampaigns(
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 },
): Promise<ApiResponse<{
  items: Campaign[]; total: number; summary: { active: number; scheduled: number; drafts: number; totalReach: string };
}>> {
  try {
    const response = await apiClient.get(`${P.ADMIN_BASE}/campaigns`, {
      params: { page: pagination.page, size: pagination.pageSize },
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load campaigns",
    );
  }
}

export async function createCampaign(data: Partial<Campaign>): Promise<ApiResponse<Campaign>> {
  try {
    const response = await apiClient.post(`${P.ADMIN_BASE}/campaigns`, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create campaign",
    );
  }
}

export async function updateCampaign(id: string, data: Partial<Campaign>): Promise<ApiResponse<Campaign | undefined>> {
  try {
    const response = await apiClient.put(`${P.ADMIN_BASE}/campaigns/${id}`, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update campaign",
    );
  }
}

export async function deleteCampaign(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(`${P.ADMIN_BASE}/campaigns/${id}`);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete campaign" };
  }
}

// ── Push Notifications ─────────────────────────────────────

export async function getPushNotifications(
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 },
): Promise<ApiResponse<{
  items: PushNotification[]; total: number; summary: { sent: number; scheduled: number; drafts: number; avgOpenRate: string };
}>> {
  try {
    const response = await apiClient.get(`${P.ADMIN_BASE}/push-notifications`, {
      params: { page: pagination.page, size: pagination.pageSize },
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load push notifications",
    );
  }
}

// ── A/B Tests ──────────────────────────────────────────────

export async function getABTests(
  filters: Partial<ABTestFilters> = {},
  pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 },
): Promise<ApiResponse<{ items: ABTest[]; total: number; summary: Record<string, number> }>> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination.page,
      size: pagination.pageSize,
    };
    const response = await apiClient.get(`${P.ADMIN_BASE}/ab-tests`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load A/B tests",
    );
  }
}

// ── Campaign Analytics ─────────────────────────────────────

export async function getCampaignAnalytics(): Promise<ApiResponse<CampaignAnalytics>> {
  try {
    const response = await apiClient.get(`${P.ADMIN_BASE}/analytics`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load campaign analytics",
    );
  }
}
