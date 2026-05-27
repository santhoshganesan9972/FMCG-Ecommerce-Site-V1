// ── Delivery Management Service Layer ───────────────────
// Architecture: UI → Component → Hook → Service → Axios → API Gateway → Backend
//
// This service is the single source of truth for all delivery-related data.
// Currently returns mock data. To connect to a real backend:
//   1. Import apiClient from "@/lib/api-client"
//   2. Set NEXT_PUBLIC_API_BASE_URL
//   3. Replace mock returns with apiClient calls
//   4. No UI / hook changes needed — types are shared.

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
  PaginatedResponse,
  DeliveryQueryParams,
  AnalyticsQueryParams,
  AssignDeliveryFormData,
  UpdateDeliveryStatusFormData,
} from "@/types/delivery";
import {
  mockDeliveryPartners,
  mockPartnerProfiles,
  mockLiveDeliveries,
  mockDeliveryRoutes,
  mockDeliveryStatusEntries,
  mockPartnerPerformance,
  mockDeliveryAnalytics,
  mockSLADashboard,
  delay,
} from "@/data/admin/delivery";

// ── Delivery Service ──────────────────────────────────────

export const deliveryService = {
  // ═══════════════════════════════════════════════════════
  // PARTNER MANAGEMENT
  // ═══════════════════════════════════════════════════════

  /**
   * Get paginated list of delivery partners with search/filter.
   */
  async getPartners(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<PaginatedResponse<DeliveryPartner>>> {
    await delay(300);

    let filtered = [...mockDeliveryPartners];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.zone?.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }
    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((p) => p.status === params.status);
    }
    if (params?.zone) {
      filtered = filtered.filter((p) => p.zone === params.zone);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      success: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        pagination: { page, pageSize, total },
      },
      meta: { cachedAt: new Date().toISOString() },
    };
  },

  /**
   * Get full partner profile by ID.
   */
  async getPartnerProfile(
    partnerId: string
  ): Promise<DeliveryApiResponse<PartnerProfile | null>> {
    await delay(200);
    const profile = mockPartnerProfiles.find((p) => p.id === partnerId) || null;
    return { success: true, data: profile };
  },

  /**
   * Update partner status (online/offline/busy/available).
   */
  /**
   * Update partner status (online/offline/busy/available).
   */
  async updatePartnerStatus(
    partnerId: string,
    status: string
  ): Promise<DeliveryApiResponse<boolean>> {
    await delay(250);
    const partner = mockDeliveryPartners.find((p) => p.id === partnerId);
    if (partner) {
      partner.status = status as any;
    }
    const profile = mockPartnerProfiles.find((p) => p.id === partnerId);
    if (profile) {
      profile.status = status as any;
    }
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // LIVE TRACKING
  // ═══════════════════════════════════════════════════════

  /**
   * Get active deliveries with real-time tracking info.
   */
  async getLiveDeliveries(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<PaginatedResponse<LiveDelivery>>> {
    await delay(300);

    let filtered = [...mockLiveDeliveries];

    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((d) => d.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.customer.toLowerCase().includes(q) ||
          d.orderId.toLowerCase().includes(q) ||
          d.partner.toLowerCase().includes(q)
      );
    }
    if (params?.zone) {
      filtered = filtered.filter((d) => d.zone === params.zone);
    }

    // Sort: active first, delivered last
    const priority: Record<string, number> = {
      assigned: 0,
      picked_up: 1,
      in_transit: 2,
      out_for_delivery: 3,
      delivered: 4,
      failed: 5,
      returned: 5,
      cancelled: 5,
    };
    filtered.sort((a, b) => (priority[a.status] ?? 5) - (priority[b.status] ?? 5));

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      success: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        pagination: { page, pageSize, total },
      },
      meta: { cachedAt: new Date().toISOString() },
    };
  },

  /**
   * Simulate a real-time location update from socket.
   */
  async updateDeliveryLocation(
    deliveryId: string,
    lat: number,
    lng: number
  ): Promise<DeliveryApiResponse<boolean>> {
    await delay(50);
    // In real implementation, this would emit via Socket.IO
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // ROUTE MANAGEMENT
  // ═══════════════════════════════════════════════════════

  /**
   * Get delivery routes with optimization status.
   */
  async getRoutes(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<PaginatedResponse<DeliveryRoute>>> {
    await delay(300);

    let filtered = [...mockDeliveryRoutes];

    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((r) => r.status === params.status);
    }
    if (params?.zone) {
      filtered = filtered.filter((r) => r.zone.toLowerCase().includes(params.zone!.toLowerCase()));
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;

    return {
      success: true,
      data: {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        pagination: { page, pageSize, total: filtered.length },
      },
    };
  },

  /**
   * Trigger route optimization for a zone.
   */
  async optimizeRoute(
    zone: string
  ): Promise<DeliveryApiResponse<DeliveryRoute | null>> {
    await delay(1500);
    const route = mockDeliveryRoutes.find((r) => r.zone === zone) || null;
    return { success: true, data: route ? { ...route, status: "optimized", optimizedAt: new Date().toISOString() } : null };
  },

  /**
   * Optimize all pending routes.
   */
  async optimizeAllRoutes(): Promise<DeliveryApiResponse<number>> {
    await delay(2000);
    const count = mockDeliveryRoutes.filter((r) => r.status === "pending").length;
    return { success: true, data: count };
  },

  // ═══════════════════════════════════════════════════════
  // DELIVERY STATUS
  // ═══════════════════════════════════════════════════════

  /**
   * Get all delivery status entries with filtering.
   */
  async getDeliveryStatuses(
    params?: Partial<DeliveryQueryParams>
  ): Promise<DeliveryApiResponse<PaginatedResponse<DeliveryStatusEntry>>> {
    await delay(300);

    let filtered = [...mockDeliveryStatusEntries];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.orderId.toLowerCase().includes(q) ||
          d.customer.toLowerCase().includes(q) ||
          d.partner?.toLowerCase().includes(q)
      );
    }
    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((d) => d.status === params.status);
    }
    if (params?.zone) {
      filtered = filtered.filter((d) => d.zone === params.zone);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      success: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        pagination: { page, pageSize, total },
      },
    };
  },

  /**
   * Update delivery status (e.g. assign, picked_up, delivered, failed).
   */
  async updateDeliveryStatus(
    data: UpdateDeliveryStatusFormData
  ): Promise<DeliveryApiResponse<boolean>> {
    await delay(300);
    const idx = mockDeliveryStatusEntries.findIndex(
      (e) => e.id === data.deliveryId || e.orderId === data.deliveryId
    );
    if (idx !== -1) {
      mockDeliveryStatusEntries[idx] = {
        ...mockDeliveryStatusEntries[idx],
        status: data.status,
        note: data.note || mockDeliveryStatusEntries[idx].note,
      };
      return { success: true, data: true };
    }
    return { success: false, data: false, error: "Delivery entry not found" };
  },

  /**
   * Assign delivery to a partner.
   */
  async assignDelivery(
    data: AssignDeliveryFormData
  ): Promise<DeliveryApiResponse<boolean>> {
    await delay(350);
    const idx = mockDeliveryStatusEntries.findIndex((e) => e.orderId === data.orderId);
    const partner = mockDeliveryPartners.find((p) => p.id === data.partnerId);
    if (idx !== -1 && partner) {
      mockDeliveryStatusEntries[idx] = {
        ...mockDeliveryStatusEntries[idx],
        partner: partner.name,
        status: "assigned",
      };
      return { success: true, data: true };
    }
    return { success: false, data: false, error: "Order not found" };
  },

  // ═══════════════════════════════════════════════════════
  // PARTNER PERFORMANCE
  // ═══════════════════════════════════════════════════════

  /**
   * Get performance overview for a specific partner.
   */
  async getPartnerPerformance(
    partnerId: string,
    params?: Partial<AnalyticsQueryParams>
  ): Promise<DeliveryApiResponse<PerformanceOverview | null>> {
    await delay(250);
    const perf = mockPartnerPerformance.find((p) => p.partnerId === partnerId) || null;
    return { success: true, data: perf };
  },

  /**
   * Get performance overview for all partners.
   */
  async getAllPartnerPerformance(
    params?: Partial<AnalyticsQueryParams>
  ): Promise<DeliveryApiResponse<PerformanceOverview[]>> {
    await delay(300);
    return { success: true, data: mockPartnerPerformance };
  },

  // ═══════════════════════════════════════════════════════
  // DELIVERY ANALYTICS
  // ═══════════════════════════════════════════════════════

  /**
   * Get comprehensive delivery analytics.
   */
  async getAnalytics(
    params?: Partial<AnalyticsQueryParams>
  ): Promise<DeliveryApiResponse<DeliveryAnalytics>> {
    await delay(400);
    return { success: true, data: mockDeliveryAnalytics };
  },

  // ═══════════════════════════════════════════════════════
  // SLA DASHBOARD
  // ═══════════════════════════════════════════════════════

  /**
   * Get SLA compliance dashboard data.
   */
  async getSLADashboard(): Promise<DeliveryApiResponse<SLADashboard>> {
    await delay(350);
    return { success: true, data: mockSLADashboard };
  },
};

export type DeliveryService = typeof deliveryService;
