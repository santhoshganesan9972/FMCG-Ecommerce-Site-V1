// ── Dashboard Service Layer ──────────────────────────────
// Architecture: UI → Component → Hook → Service → Axios → API Gateway → Backend
//
// This service is the single source of truth for dashboard data.
// Currently returns mock data. To connect to a real backend:
//   1. Uncomment the apiClient import
//   2. Set NEXT_PUBLIC_API_BASE_URL
//   3. Replace mock returns with apiClient calls
//   4. No UI / hook changes needed — types are shared.

import type {
  DashboardOverview,
  DashboardQueryParams,
  ApiResponse,
} from "@/types/dashboard";
import { mockDashboardOverview, delay } from "@/data/admin/dashboard";

// Uncomment when API is ready:
// import { apiClient } from "@/lib/api-client";

const DEFAULT_PARAMS: DashboardQueryParams = {
  period: "30d",
};

// ── Dashboard Service ────────────────────────────────────

export const dashboardService = {
  /**
   * Fetch the full executive dashboard overview.
   * Currently returns mock data. Backend-ready shape matches ApiResponse<DashboardOverview>.
   */
  async getOverview(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview>> {
    const merged = { ...DEFAULT_PARAMS, ...params };

    // ── MOCK IMPLEMENTATION ──────────────────────────
    // Replace the block below with real API call when backend is ready.
    await delay(400);

    return {
      success: true,
      data: mockDashboardOverview,
      meta: {
        cachedAt: new Date().toISOString(),
      },
    };
    // ── END MOCK ─────────────────────────────────────

    // ── REAL API (uncomment when backend is ready) ────
    // return apiClient.get<ApiResponse<DashboardOverview>>(
    //   `/dashboard/overview?period=${merged.period}${merged.warehouse ? `&warehouse=${merged.warehouse}` : ""}${merged.region ? `&region=${merged.region}` : ""}`
    // );
  },

  /**
   * Fetch only revenue data.
   */
  async getRevenue(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["revenue"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.revenue };
  },

  /**
   * Fetch only orders data.
   */
  async getOrders(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["orders"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.orders };
  },

  /**
   * Fetch only customers data.
   */
  async getCustomers(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["customers"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.customers };
  },

  /**
   * Fetch live orders for the real-time map / list.
   */
  async getLiveOrders(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["liveOrders"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.liveOrders };
  },

  /**
   * Fetch low stock alerts.
   */
  async getLowStockAlerts(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["lowStockAlerts"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.lowStockAlerts };
  },

  /**
   * Fetch vendor payment queue.
   */
  async getVendorPayments(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["vendorPayments"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.vendorPayments };
  },

  /**
   * Fetch top selling products.
   */
  async getTopProducts(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["topProducts"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.topProducts };
  },

  /**
   * Fetch customer acquisition metrics.
   */
  async getAcquisitionMetrics(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview["acquisitionMetrics"]>> {
    await delay(200);
    return { success: true, data: mockDashboardOverview.acquisitionMetrics };
  },
};

export type DashboardService = typeof dashboardService;
