// ── Delivery API Adapter ────────────────────────────────────
// Connects admin delivery management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse } from "@/types/api";
import type { ApiResponse, MutationResult } from "@/types/api";
import type {
  DeliveryPartner,
  PartnerProfile,
  LiveDelivery,
  DeliveryRoute,
  DeliveryStatusEntry,
  PerformanceOverview,
  DeliveryAnalytics,
  SLADashboard,
  DeliveryQueryParams,
  AssignDeliveryFormData,
  UpdateDeliveryStatusFormData,
} from "@/types/delivery";

const D = ADMIN;

// ── Partners ───────────────────────────────────────────────

export async function getPartners(params?: Partial<DeliveryQueryParams>): Promise<ApiResponse<{
  items: DeliveryPartner[];
  pagination: { page: number; pageSize: number; total: number };
}>> {
  try {
    const response = await apiClient.get(D.DELIVERY_PARTNERS, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load delivery partners",
    );
  }
}

export async function getPartnerProfile(partnerId: string): Promise<ApiResponse<PartnerProfile | null>> {
  try {
    const response = await apiClient.get(D.DELIVERY_PARTNER(partnerId));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load partner profile",
    );
  }
}

export async function updatePartnerStatus(partnerId: string, status: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(D.DELIVERY_PARTNER_STATUS(partnerId), { status });
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to update partner status" };
  }
}

// ── Live Tracking ─────────────────────────────────────────

export async function getLiveDeliveries(params?: Partial<DeliveryQueryParams>): Promise<ApiResponse<{
  items: LiveDelivery[];
  pagination: { page: number; pageSize: number; total: number };
}>> {
  try {
    const response = await apiClient.get(D.DELIVERY_LIVE, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load live deliveries",
    );
  }
}

// ── Routes ─────────────────────────────────────────────────

export async function getRoutes(params?: Partial<DeliveryQueryParams>): Promise<ApiResponse<{
  items: DeliveryRoute[];
  pagination: { page: number; pageSize: number; total: number };
}>> {
  try {
    const response = await apiClient.get(D.DELIVERY_ROUTES, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load delivery routes",
    );
  }
}

export async function optimizeRoute(zone: string): Promise<ApiResponse<DeliveryRoute | null>> {
  try {
    const response = await apiClient.post(D.DELIVERY_ROUTE_OPTIMIZE, { zone });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to optimize route",
    );
  }
}

export async function optimizeAllRoutes(): Promise<MutationResult<number>> {
  try {
    const response = await apiClient.post(D.DELIVERY_ROUTE_OPTIMIZE_ALL);
    return response.data;
  } catch (error) {
    return { success: false, data: 0, error: error instanceof Error ? error.message : "Failed to optimize routes" };
  }
}

// ── Status ─────────────────────────────────────────────────

export async function getDeliveryStatuses(params?: Partial<DeliveryQueryParams>): Promise<ApiResponse<{
  items: DeliveryStatusEntry[];
  pagination: { page: number; pageSize: number; total: number };
}>> {
  try {
    const response = await apiClient.get(D.DELIVERY_STATUSES, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load delivery statuses",
    );
  }
}

export async function updateDeliveryStatus(data: UpdateDeliveryStatusFormData): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(D.DELIVERY_UPDATE_STATUS, data);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to update delivery status" };
  }
}

export async function assignDelivery(data: AssignDeliveryFormData): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.post(D.DELIVERY_ASSIGN, data);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to assign delivery" };
  }
}

// ── Performance ────────────────────────────────────────────

export async function getPartnerPerformance(partnerId: string, params?: Record<string, unknown>): Promise<ApiResponse<PerformanceOverview | null>> {
  try {
    const response = await apiClient.get(D.DELIVERY_PERFORMANCE(partnerId), { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load partner performance",
    );
  }
}

export async function getAllPartnerPerformance(params?: Record<string, unknown>): Promise<ApiResponse<PerformanceOverview[]>> {
  try {
    const response = await apiClient.get(D.DELIVERY_PERFORMANCE_ALL, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load partner performance data",
    );
  }
}

// ── Analytics & SLA ────────────────────────────────────────

export async function getAnalytics(params?: Record<string, unknown>): Promise<ApiResponse<DeliveryAnalytics>> {
  try {
    const response = await apiClient.get(D.DELIVERY_ANALYTICS, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load delivery analytics",
    );
  }
}

export async function getSLADashboard(): Promise<ApiResponse<SLADashboard>> {
  try {
    const response = await apiClient.get(D.DELIVERY_SLA);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load SLA dashboard",
    );
  }
}
