// ── Dashboard API Adapter ───────────────────────────────────
// Connects dashboard KPIs, analytics, and charts to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse } from "@/types/api";
import type { ApiResponse } from "@/types/api";
import type {
  DashboardOverview,
  DashboardQueryParams,
} from "@/types/dashboard";

const DASHBOARD = ADMIN.DASHBOARD;

/** Fetch the full dashboard overview (all KPIs in one call). */
export async function getOverview(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview>> {
  try {
    const response = await apiClient.get(DASHBOARD, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load dashboard overview",
    );
  }
}

/** Revenue KPIs (total, growth, monthly breakdown). */
export async function getRevenue(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["revenue"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/revenue`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load revenue KPIs",
    );
  }
}

/** Orders KPIs (total, pending, delivered, cancelled, returns). */
export async function getOrdersMetrics(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["orders"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/orders`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load orders KPIs",
    );
  }
}

/** Customers KPIs (total, active, new, churned). */
export async function getCustomersMetrics(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["customers"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/customers`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load customer KPIs",
    );
  }
}

/** Live orders currently being processed. */
export async function getLiveOrders(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["liveOrders"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/live-orders`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load live orders",
    );
  }
}

/** Low stock alerts for inventory management. */
export async function getLowStockAlerts(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["lowStockAlerts"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/low-stock`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load low stock alerts",
    );
  }
}

/** Vendor payment summaries. */
export async function getVendorPayments(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["vendorPayments"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/vendor-payments`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load vendor payments",
    );
  }
}

/** Top selling products by revenue and quantity. */
export async function getTopProducts(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["topProducts"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/top-products`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load top products",
    );
  }
}

/** Customer acquisition channel metrics. */
export async function getAcquisitionMetrics(
  params?: Partial<DashboardQueryParams>,
): Promise<ApiResponse<DashboardOverview["acquisitionMetrics"]>> {
  try {
    const response = await apiClient.get(`${DASHBOARD}/acquisition`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load acquisition metrics",
    );
  }
}
