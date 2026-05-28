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

const DEFAULT_PARAMS: Partial<DashboardQueryParams> = {
  period: "30d",
};

// Helper to get live data from localStorage
function getLiveDashboardStats(base: DashboardOverview): DashboardOverview {
  if (typeof window === "undefined") return base;

  try {
    const orderStorage = localStorage.getItem("order-storage");
    const productStorage = localStorage.getItem("inventory-storage"); // Assuming product changes are here
    
    let liveOrders = [];
    if (orderStorage) {
      const parsed = JSON.parse(orderStorage);
      liveOrders = parsed.state?.orders || [];
    }

    if (liveOrders.length === 0) return base;

    // Merge live orders into metrics
    const liveRevenue = liveOrders.reduce((s: number, o: any) => s + o.total, 0);
    const liveOrderCount = liveOrders.length;

    const updatedRevenue = {
      ...base.revenue,
      total: base.revenue.total + liveRevenue,
      formatted: `₹${((base.revenue.total + liveRevenue) / 10000000).toFixed(2)}Cr`,
    };

    const updatedOrders = {
      ...base.orders,
      total: base.orders.total + liveOrderCount,
      pending: base.orders.pending + liveOrders.filter((o: any) => o.status === "Processing").length,
    };

    // Add live orders to recent activity
    const liveActivity = liveOrders.slice(0, 5).map((o: any) => ({
      id: `live-${o.id}`,
      type: "order",
      message: `New order ${o.id} placed by ${o.deliveryAddress.name}`,
      time: "Just now",
      icon: "ShoppingCart",
    }));

    return {
      ...base,
      revenue: updatedRevenue,
      orders: updatedOrders,
      recentActivity: [...liveActivity, ...(base.recentActivity ?? [])].slice(0, 10),
      liveOrders: [
        ...liveOrders.map((o: any) => ({
          id: o.id,
          customer: o.deliveryAddress.name,
          items: o.items.length,
          total: o.total,
          status: o.status === "Processing" ? "preparing" : "confirmed",
          time: "Just now",
          area: o.deliveryAddress.city,
        })),
        ...base.liveOrders,
      ].slice(0, 15),
    };
  } catch (e) {
    console.error("Failed to merge live dashboard stats", e);
    return base;
  }
}

// ── Dashboard Service ────────────────────────────────────

export const dashboardService = {
  /**
   * Fetch the full executive dashboard overview.
   */
  async getOverview(params?: Partial<DashboardQueryParams>): Promise<ApiResponse<DashboardOverview>> {
    const merged = { ...DEFAULT_PARAMS, ...params };
    await delay(400);

    const data = getLiveDashboardStats(mockDashboardOverview);

    return {
      success: true,
      data,
      meta: {
        cachedAt: new Date().toISOString(),
      },
    };
  },
// ...

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
