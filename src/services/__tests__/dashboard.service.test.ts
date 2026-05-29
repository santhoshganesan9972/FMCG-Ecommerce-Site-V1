// ── Dashboard Service Tests ─────────────────────────────────
// Tests the service layer that wraps dashboard API adapter
// responses, verifying correct unwrapping and error propagation.

import { describe, it, expect, beforeEach } from "vitest";
import { mockDashboardApi, resetMocks } from "./setup";
import { dashboardService } from "../dashboard.service";

beforeEach(() => resetMocks());

// ── Mock Data ───────────────────────────────────────────────

const mockOverview = {
  revenue: { total: 100000, growth: 12.5 },
  orders: { total: 1500, pending: 200, delivered: 1200 },
  customers: { total: 5000, active: 3500, new: 300 },
  liveOrders: [{ id: "1", status: "processing" }],
  lowStockAlerts: [{ productId: "100", stock: 5 }],
  vendorPayments: [{ vendorId: "v1", amount: 5000 }],
  topProducts: [{ id: "p1", revenue: 25000 }],
  acquisitionMetrics: [{ channel: "organic", count: 2000 }],
};

const mockKpi = { total: 100000, growth: 12.5, monthly: [] };

// ── getOverview ──────────────────────────────────────────────

describe("getOverview", () => {
  it("returns overview with success, data, and meta on success", async () => {
    mockDashboardApi.getOverview.mockResolvedValue({
      success: true,
      data: mockOverview,
      meta: { cachedAt: "2024-01-01" },
    });

    const result = await dashboardService.getOverview({ period: "30d" });

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockOverview);
    expect(result.meta).toEqual({ cachedAt: "2024-01-01" });
    expect(mockDashboardApi.getOverview).toHaveBeenCalledWith({ period: "30d" });
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getOverview.mockResolvedValue({
      success: false,
      data: {} as typeof mockOverview,
      error: "Failed to load dashboard",
    });

    const result = await dashboardService.getOverview();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load dashboard");
  });
});

// ── getRevenue ───────────────────────────────────────────────

describe("getRevenue", () => {
  it("returns revenue data on success", async () => {
    mockDashboardApi.getRevenue.mockResolvedValue({
      success: true,
      data: mockKpi,
    });

    const result = await dashboardService.getRevenue({ period: "7d" });

    expect(result.success).toBe(true);
    expect(result.data.total).toBe(100000);
    expect(mockDashboardApi.getRevenue).toHaveBeenCalledWith({ period: "7d" });
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getRevenue.mockResolvedValue({
      success: false,
      data: {} as typeof mockKpi,
      error: "API unavailable",
    });

    const result = await dashboardService.getRevenue();

    expect(result.success).toBe(false);
    expect(result.error).toBe("API unavailable");
  });
});

// ── getOrders ────────────────────────────────────────────────

describe("getOrders", () => {
  it("returns orders KPIs on success", async () => {
    const ordersKpi = { total: 1500, pending: 200, delivered: 1200, cancelled: 50 };
    mockDashboardApi.getOrdersMetrics.mockResolvedValue({
      success: true,
      data: ordersKpi,
    });

    const result = await dashboardService.getOrders({ period: "30d" });

    expect(result.success).toBe(true);
    expect(result.data.total).toBe(1500);
    expect(mockDashboardApi.getOrdersMetrics).toHaveBeenCalledWith({ period: "30d" });
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getOrdersMetrics.mockResolvedValue({
      success: false,
      data: {} as any,
      error: "Failed to load orders KPIs",
    });

    const result = await dashboardService.getOrders();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load orders KPIs");
  });
});

// ── getCustomers ─────────────────────────────────────────────

describe("getCustomers", () => {
  it("returns customer KPIs on success", async () => {
    const customersKpi = { total: 5000, active: 3500, new: 300, churned: 100 };
    mockDashboardApi.getCustomersMetrics.mockResolvedValue({
      success: true,
      data: customersKpi,
    });

    const result = await dashboardService.getCustomers();

    expect(result.success).toBe(true);
    expect(result.data.active).toBe(3500);
    expect(mockDashboardApi.getCustomersMetrics).toHaveBeenCalledWith(undefined);
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getCustomersMetrics.mockResolvedValue({
      success: false,
      data: {} as any,
      error: "Failed to load customer KPIs",
    });

    const result = await dashboardService.getCustomers();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load customer KPIs");
  });
});

// ── getLiveOrders ────────────────────────────────────────────

describe("getLiveOrders", () => {
  it("returns live orders array on success", async () => {
    const liveOrders = [{ id: "1", status: "processing", customer: "John" }];
    mockDashboardApi.getLiveOrders.mockResolvedValue({
      success: true,
      data: liveOrders,
    });

    const result = await dashboardService.getLiveOrders();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].status).toBe("processing");
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getLiveOrders.mockResolvedValue({
      success: false,
      data: [],
      error: "Failed to load live orders",
    });

    const result = await dashboardService.getLiveOrders();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load live orders");
  });
});

// ── getLowStockAlerts ────────────────────────────────────────

describe("getLowStockAlerts", () => {
  it("returns low stock alerts on success", async () => {
    const alerts = [{ productId: "100", productName: "Milk", stock: 5, threshold: 10 }];
    mockDashboardApi.getLowStockAlerts.mockResolvedValue({
      success: true,
      data: alerts,
    });

    const result = await dashboardService.getLowStockAlerts();

    expect(result.success).toBe(true);
    expect(result.data[0].stock).toBe(5);
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getLowStockAlerts.mockResolvedValue({
      success: false,
      data: [],
      error: "Failed to load alerts",
    });

    const result = await dashboardService.getLowStockAlerts();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load alerts");
  });
});

// ── getVendorPayments ────────────────────────────────────────

describe("getVendorPayments", () => {
  it("returns vendor payments on success", async () => {
    const payments = [{ vendorId: "v1", vendorName: "Acme", amount: 5000, dueDate: "2024-02-01" }];
    mockDashboardApi.getVendorPayments.mockResolvedValue({
      success: true,
      data: payments,
    });

    const result = await dashboardService.getVendorPayments();

    expect(result.success).toBe(true);
    expect(result.data[0].amount).toBe(5000);
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getVendorPayments.mockResolvedValue({
      success: false,
      data: [],
      error: "Failed to load vendor payments",
    });

    const result = await dashboardService.getVendorPayments();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load vendor payments");
  });
});

// ── getTopProducts ───────────────────────────────────────────

describe("getTopProducts", () => {
  it("returns top products on success", async () => {
    const products = [{ id: "p1", name: "Product A", revenue: 25000, unitsSold: 500 }];
    mockDashboardApi.getTopProducts.mockResolvedValue({
      success: true,
      data: products,
    });

    const result = await dashboardService.getTopProducts();

    expect(result.success).toBe(true);
    expect(result.data[0].revenue).toBe(25000);
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getTopProducts.mockResolvedValue({
      success: false,
      data: [],
      error: "Failed to load top products",
    });

    const result = await dashboardService.getTopProducts();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load top products");
  });
});

// ── getAcquisitionMetrics ────────────────────────────────────

describe("getAcquisitionMetrics", () => {
  it("returns acquisition metrics on success", async () => {
    const metrics = [{ channel: "organic", count: 2000, percentage: 40, revenue: 50000 }];
    mockDashboardApi.getAcquisitionMetrics.mockResolvedValue({
      success: true,
      data: metrics,
    });

    const result = await dashboardService.getAcquisitionMetrics();

    expect(result.success).toBe(true);
    expect(result.data[0].channel).toBe("organic");
  });

  it("propagates error on failure", async () => {
    mockDashboardApi.getAcquisitionMetrics.mockResolvedValue({
      success: false,
      data: [],
      error: "Failed to load acquisition metrics",
    });

    const result = await dashboardService.getAcquisitionMetrics();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load acquisition metrics");
  });
});
