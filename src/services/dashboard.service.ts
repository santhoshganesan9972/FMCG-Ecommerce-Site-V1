// ── Dashboard Service Layer ──────────────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type { DashboardOverview, DashboardQueryParams } from "@/types/dashboard";
import { dashboardApi } from "@/services/api";

// ── Dashboard Service ────────────────────────────────────

export const dashboardService = {
  async getOverview(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview; meta?: Record<string, unknown> }> {
    const res = await dashboardApi.getOverview(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async getRevenue(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["revenue"] }> {
    const res = await dashboardApi.getRevenue(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getOrders(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["orders"] }> {
    const res = await dashboardApi.getOrdersMetrics(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getCustomers(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["customers"] }> {
    const res = await dashboardApi.getCustomersMetrics(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getLiveOrders(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["liveOrders"] }> {
    const res = await dashboardApi.getLiveOrders(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getLowStockAlerts(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["lowStockAlerts"] }> {
    const res = await dashboardApi.getLowStockAlerts(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getVendorPayments(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["vendorPayments"] }> {
    const res = await dashboardApi.getVendorPayments(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getTopProducts(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["topProducts"] }> {
    const res = await dashboardApi.getTopProducts(params);
    return { success: res.success, data: res.data, error: res.error };
  },

  async getAcquisitionMetrics(params?: Partial<DashboardQueryParams>): Promise<{ success: boolean; data: DashboardOverview["acquisitionMetrics"] }> {
    const res = await dashboardApi.getAcquisitionMetrics(params);
    return { success: res.success, data: res.data, error: res.error };
  },
};

export type DashboardService = typeof dashboardService;
