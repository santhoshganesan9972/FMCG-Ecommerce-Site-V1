// ── Dashboard API Adapter Tests ─────────────────────────────
// Tests all 9 dashboard API adapter functions for success and
// error handling.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as dashboardApi from "../dashboard.api";

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

// ── Success Paths ───────────────────────────────────────────

describe("getOverview", () => {
  it("returns dashboard overview on success", async () => {
    const response = { success: true, data: mockOverview };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getOverview({ period: "30d" });

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockOverview);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/dashboard", {
      params: { period: "30d" },
    });
  });

  it("returns error response on failure", async () => {
    mockGet.mockRejectedValue(new Error("Network error"));

    const result = await dashboardApi.getOverview();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Network error");
  });

  it("returns generic error when error has no message", async () => {
    mockGet.mockRejectedValue("Unknown");

    const result = await dashboardApi.getOverview();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load dashboard overview");
  });
});

// ── Revenue ─────────────────────────────────────────────────

describe("getRevenue", () => {
  it("returns revenue KPIs on success", async () => {
    const response = { success: true, data: mockKpi };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getRevenue({ period: "7d" });

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockKpi);
    expect(mockGet).toHaveBeenCalledWith(
      "/v1/admin/dashboard/revenue",
      { params: { period: "7d" } },
    );
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("API unavailable"));

    const result = await dashboardApi.getRevenue();

    expect(result.success).toBe(false);
    expect(result.error).toBe("API unavailable");
  });
});

// ── Orders Metrics ──────────────────────────────────────────

describe("getOrdersMetrics", () => {
  it("returns orders KPIs on success", async () => {
    const ordersKpi = { total: 1500, pending: 200, delivered: 1200, cancelled: 50 };
    const response = { success: true, data: ordersKpi };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getOrdersMetrics();

    expect(result.success).toBe(true);
    expect(result.data.total).toBe(1500);
    expect(mockGet).toHaveBeenCalledWith(
      "/v1/admin/dashboard/orders",
      expect.any(Object),
    );
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load orders KPIs"));
    const result = await dashboardApi.getOrdersMetrics();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load orders KPIs");
  });

  it("handles non-Error thrown values", async () => {
    mockGet.mockRejectedValue("raw string error");
    const result = await dashboardApi.getOrdersMetrics();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load orders KPIs");
  });
});

// ── Customers Metrics ───────────────────────────────────────

describe("getCustomersMetrics", () => {
  it("returns customer KPIs on success", async () => {
    const customersKpi = { total: 5000, active: 3500, new: 300, churned: 100 };
    const response = { success: true, data: customersKpi };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getCustomersMetrics();

    expect(result.success).toBe(true);
    expect(result.data.active).toBe(3500);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load customer KPIs"));
    const result = await dashboardApi.getCustomersMetrics();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load customer KPIs");
  });
});

// ── Live Orders ─────────────────────────────────────────────

describe("getLiveOrders", () => {
  it("returns live orders on success", async () => {
    const liveOrders = [{ id: "1", status: "processing" }];
    const response = { success: true, data: liveOrders };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getLiveOrders();

    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load live orders"));
    const result = await dashboardApi.getLiveOrders();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load live orders");
  });
});

// ── Low Stock Alerts ────────────────────────────────────────

describe("getLowStockAlerts", () => {
  it("returns low stock alerts on success", async () => {
    const alerts = [{ productId: "100", stock: 5 }];
    const response = { success: true, data: alerts };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getLowStockAlerts();

    expect(result.success).toBe(true);
    expect(result.data[0].stock).toBe(5);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load low stock alerts"));
    const result = await dashboardApi.getLowStockAlerts();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load low stock alerts");
  });
});

// ── Vendor Payments ─────────────────────────────────────────

describe("getVendorPayments", () => {
  it("returns vendor payments on success", async () => {
    const payments = [{ vendorId: "v1", amount: 5000 }];
    const response = { success: true, data: payments };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getVendorPayments();

    expect(result.success).toBe(true);
    expect(result.data[0].amount).toBe(5000);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load vendor payments"));
    const result = await dashboardApi.getVendorPayments();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load vendor payments");
  });
});

// ── Top Products ────────────────────────────────────────────

describe("getTopProducts", () => {
  it("returns top products on success", async () => {
    const products = [{ id: "p1", revenue: 25000 }];
    const response = { success: true, data: products };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getTopProducts();

    expect(result.success).toBe(true);
    expect(result.data[0].revenue).toBe(25000);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load top products"));
    const result = await dashboardApi.getTopProducts();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load top products");
  });
});

// ── Acquisition Metrics ─────────────────────────────────────

describe("getAcquisitionMetrics", () => {
  it("returns acquisition metrics on success", async () => {
    const metrics = [{ channel: "organic", count: 2000 }];
    const response = { success: true, data: metrics };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await dashboardApi.getAcquisitionMetrics();

    expect(result.success).toBe(true);
    expect(result.data[0].channel).toBe("organic");
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load acquisition metrics"));

    const result = await dashboardApi.getAcquisitionMetrics();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load acquisition metrics");
  });
});
