// ── Reports API Adapter Tests ───────────────────────────────
// Tests all report types: revenue, customer, vendor, inventory,
// order, sales, GST, cohort, analytics, abandoned cart,
// promotion ROI, tax, and export.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as reportsApi from "../reports.api";

beforeEach(() => resetMocks());

// ── Revenue Reports ─────────────────────────────────────────

describe("getRevenueReports", () => {
  it("returns revenue reports on success", async () => {
    const data = { total: 1000000, growth: 15.5, breakdown: [] };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getRevenueReports("30d");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/revenue", {
      params: { period: "30d" },
    });
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load revenue reports"));

    const result = await reportsApi.getRevenueReports();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load revenue reports");
  });
});

// ── Customer Reports ───────────────────────────────────────

describe("getCustomerReports", () => {
  it("returns customer reports on success", async () => {
    const data = { totalCustomers: 5000, acquisitionRate: 12 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getCustomerReports({ period: "90d" });

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/customer", {
      params: { period: "90d" },
    });
  });
});

// ── Vendor Reports ─────────────────────────────────────────

describe("getVendorReports", () => {
  it("returns vendor reports on success", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { totalVendors: 100, avgPerformance: 4.2 } }));

    const result = await reportsApi.getVendorReports();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/vendor", { params: undefined });
  });
});

// ── Inventory Reports ─────────────────────────────────────

describe("getInventoryReports", () => {
  it("returns inventory reports on success", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { totalItems: 5000, lowStockItems: 50 } }));

    const result = await reportsApi.getInventoryReports();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/inventory", { params: undefined });
  });
});

// ── Order Reports ───────────────────────────────────────────

describe("getOrderReports", () => {
  it("returns order reports on success", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { totalOrders: 15000, avgOrderValue: 850 } }));

    const result = await reportsApi.getOrderReports();
    expect(result.success).toBe(true);
  });
});

// ── Sales Reports ───────────────────────────────────────────

describe("getSalesReports", () => {
  it("returns sales reports on success", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { dailySales: [], weeklySales: [] } }));

    const result = await reportsApi.getSalesReports({ period: "7d" });
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/sales", { params: { period: "7d" } });
  });
});

// ── GST Reports ────────────────────────────────────────────

describe("getGSTReports", () => {
  it("returns GST reports on success", async () => {
    const data = { totalGstCollected: 180000, gstBreakdown: [] };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getGSTReports();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/gst", { params: undefined });
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load GST reports"));

    const result = await reportsApi.getGSTReports();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load GST reports");
  });
});

// ── Cohort Data ─────────────────────────────────────────────

describe("getCohortData", () => {
  it("returns cohort data on success", async () => {
    const data = [{ cohort: "Jan 2024", customers: 500, retentionRate: 35 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getCohortData();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/cohort");
  });
});

// ── Revenue Analytics ──────────────────────────────────────

describe("getRevenueAnalytics", () => {
  it("returns revenue analytics on success", async () => {
    const data = { mrr: 50000, arr: 600000, churnRate: 5.2 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getRevenueAnalytics();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/revenue-analytics");
  });
});

// ── Abandoned Cart Reports ────────────────────────────────

describe("getAbandonedCartReports", () => {
  it("returns abandoned cart reports on success", async () => {
    const data = { totalAbandoned: 500, recoveryRate: 15.2 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getAbandonedCartReports({ period: "30d" });
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/abandoned-cart", {
      params: { period: "30d" },
    });
  });
});

// ── Promotion ROI Reports ─────────────────────────────────

describe("getPromotionROIReports", () => {
  it("returns promotion ROI on success", async () => {
    const data = { totalSpend: 50000, totalRevenue: 200000, roi: 300 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getPromotionROIReports({ promotionId: "p1" });
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/promotion-roi", {
      params: { promotionId: "p1" },
    });
  });
});

// ── Tax Reports ─────────────────────────────────────────

describe("getTaxReports", () => {
  it("returns tax reports on success", async () => {
    const data = { totalTaxCollected: 250000, taxBreakdown: [] };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await reportsApi.getTaxReports();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/reports/tax", { params: undefined });
  });
});

// ── Export Report ───────────────────────────────────────────

describe("exportReport", () => {
  it("exports report on success", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: { downloadUrl: "https://cdn.example.com/report.xlsx" } }));

    const result = await reportsApi.exportReport("revenue", "xlsx");

    expect(result.success).toBe(true);
    expect(result.data.downloadUrl).toBeTruthy();
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/reports/export", {
      reportType: "revenue",
      format: "xlsx",
    });
  });

  it("returns error on failure", async () => {
    mockPost.mockRejectedValue(new Error("Failed to export report"));

    const result = await reportsApi.exportReport("orders", "pdf");

    expect(result.success).toBe(false);
    expect(result.data.downloadUrl).toBe("");
    expect(result.error).toBe("Failed to export report");
  });
});
