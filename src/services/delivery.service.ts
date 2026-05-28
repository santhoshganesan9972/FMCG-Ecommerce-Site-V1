// ── Delivery Management Service Layer ───────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  DeliveryPartner,
  PartnerProfile,
  LiveDelivery,
  DeliveryRoute,
  DeliveryStatusEntry,
  PerformanceOverview,
  DeliveryAnalytics,
  SLADashboard,
  DeliveryApiResponse,
  DeliveryQueryParams,
  AnalyticsQueryParams,
  AssignDeliveryFormData,
  UpdateDeliveryStatusFormData,
} from "@/types/delivery";
import { deliveryApi } from "@/services/api";

// ── Delivery Service ──────────────────────────────────────

export const deliveryService = {
  // ── Partner Management ─────────────────────────────────

  async getPartners(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<{ items: DeliveryPartner[]; pagination: { page: number; pageSize: number; total: number } }>> {
    const res = await deliveryApi.getPartners(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async getPartnerProfile(
    partnerId: string
  ): Promise<DeliveryApiResponse<PartnerProfile | null>> {
    const res = await deliveryApi.getPartnerProfile(partnerId);
    return { success: res.success, data: res.data, error: res.error };
  },

  async updatePartnerStatus(
    partnerId: string,
    status: string
  ): Promise<DeliveryApiResponse<boolean>> {
    const res = await deliveryApi.updatePartnerStatus(partnerId, status);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Live Tracking ──────────────────────────────────────

  async getLiveDeliveries(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<{ items: LiveDelivery[]; pagination: { page: number; pageSize: number; total: number } }>> {
    const res = await deliveryApi.getLiveDeliveries(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async updateDeliveryLocation(
    deliveryId: string,
    lat: number,
    lng: number
  ): Promise<DeliveryApiResponse<boolean>> {
    const res = await deliveryApi.updateDeliveryLocation(deliveryId, lat, lng);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Route Management ───────────────────────────────────

  async getRoutes(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<{ items: DeliveryRoute[]; pagination: { page: number; pageSize: number; total: number } }>> {
    const res = await deliveryApi.getRoutes(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async optimizeRoute(
    zone: string
  ): Promise<DeliveryApiResponse<DeliveryRoute | null>> {
    const res = await deliveryApi.optimizeRoute(zone);
    return { success: res.success, data: res.data, error: res.error };
  },

  async optimizeAllRoutes(): Promise<DeliveryApiResponse<number>> {
    const res = await deliveryApi.optimizeAllRoutes();
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Delivery Status ────────────────────────────────────

  async getDeliveryStatuses(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<{ items: DeliveryStatusEntry[]; pagination: { page: number; pageSize: number; total: number } }>> {
    const res = await deliveryApi.getDeliveryStatuses(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async updateDeliveryStatus(
    data: UpdateDeliveryStatusFormData
  ): Promise<DeliveryApiResponse<boolean>> {
    const res = await deliveryApi.updateDeliveryStatus(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  async assignDelivery(
    data: AssignDeliveryFormData
  ): Promise<DeliveryApiResponse<boolean>> {
    const res = await deliveryApi.assignDelivery(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Partner Performance ────────────────────────────────

  async getPartnerPerformance(
    partnerId: string,
    params?: Partial<AnalyticsQueryParams>
  ): Promise<DeliveryApiResponse<PerformanceOverview | null>> {
    const res = await deliveryApi.getPartnerPerformance(partnerId, params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getAllPartnerPerformance(
    params?: Partial<AnalyticsQueryParams>
  ): Promise<DeliveryApiResponse<PerformanceOverview[]>> {
    const res = await deliveryApi.getAllPartnerPerformance(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Delivery Analytics ─────────────────────────────────

  async getAnalytics(
    params?: Partial<AnalyticsQueryParams>
  ): Promise<DeliveryApiResponse<DeliveryAnalytics>> {
    const res = await deliveryApi.getAnalytics(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── SLA Dashboard ──────────────────────────────────────

  async getSLADashboard(): Promise<DeliveryApiResponse<SLADashboard>> {
    const res = await deliveryApi.getSLADashboard();
    return { success: res.success, data: res.data, error: res.error };
  },
};

export type DeliveryService = typeof deliveryService;
