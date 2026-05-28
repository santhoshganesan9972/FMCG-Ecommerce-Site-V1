// ── Reports Service Tests ───────────────────────────────────
// Tests the service layer for all report types (GST, customers,
// cohort, abandoned cart, revenue, promotion ROI, sales,
// inventory, vendor, tax) and export.

import { describe, it, expect, beforeEach } from "vitest";
import { mockReportsApi, resetMocks } from "./setup";
import { reportsService } from "../reports.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };

// ── GST Reports ─────────────────────────────────────────────

describe("GST reports", () => {
  it("getGSTReports returns paginated entries", async () => {
    const entries = [{ id: "g1", gstin: "22AAAAA0000A1Z5", period: "2024-01", totalSales: 100000, totalTax: 18000, status: "filed" as const }];
    mockReportsApi.getGSTReports.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getGSTReports({ period: "2024-01" }, 1, 10);

    expect(result.data).toHaveLength(1);
    expect(result.meta.page).toBe(1);
    expect(mockReportsApi.getGSTReports).toHaveBeenCalledWith({ period: "2024-01" }, 1, 10);
  });

  it("getGSTSummary returns summary", async () => {
    const summary = { totalLiability: 50000, totalInputCredit: 20000, netPayable: 30000, pendingReturns: 2, overdueReturns: 1 };
    mockReportsApi.getGSTSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getGSTSummary();

    expect(result.netPayable).toBe(30000);
  });
});

// ── Customer Reports ────────────────────────────────────────

describe("customer reports", () => {
  it("getCustomerReports returns paginated entries", async () => {
    const entries = [{ customerId: "c1", customerName: "John", totalOrders: 10, totalSpent: 5000, segment: "vip" as const }];
    mockReportsApi.getCustomerReports.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getCustomerReports({ segment: "vip" });

    expect(result.data).toHaveLength(1);
  });

  it("getCustomerSummary returns summary", async () => {
    const summary = { totalCustomers: 5000, totalRevenue: 500000, avgRetentionRate: 75, platinumCount: 100, atRiskCount: 50 };
    mockReportsApi.getCustomerSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getCustomerSummary();

    expect(result.totalCustomers).toBe(5000);
  });
});

// ── Cohort Data ─────────────────────────────────────────────

describe("cohort data", () => {
  it("getCohortData returns paginated entries", async () => {
    const entries = [{ cohort: "2024-Q1", period: "2024-01", users: 100, retention: 0.8 }];
    mockReportsApi.getCohortData.mockResolvedValue({ success: true, data: entries, meta: { page: 1, pageSize: 12, total: 1, totalPages: 1 } });

    const result = await reportsService.getCohortData(1, 12);

    expect(result.data).toHaveLength(1);
    expect(mockReportsApi.getCohortData).toHaveBeenCalledWith(1, 12);
  });

  it("getCohortSummary returns summary", async () => {
    const summary = { totalCohorts: 12, totalUsers: 5000, avgRetentionWeek1: 80, avgRetentionWeek4: 60, avgRetentionWeek12: 40 };
    mockReportsApi.getCohortSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getCohortSummary();

    expect(result.totalCohorts).toBe(12);
  });
});

// ── Abandoned Cart ──────────────────────────────────────────

describe("abandoned cart", () => {
  it("getAbandonedCartData returns paginated entries", async () => {
    const entries = [{ id: "ac1", customerName: "John", cartValue: 500, status: "abandoned" as const, abandonedAt: "2024-01-01" }];
    mockReportsApi.getAbandonedCartData.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getAbandonedCartData({ status: "abandoned" });

    expect(result.data).toHaveLength(1);
  });

  it("getAbandonedCartSummary returns summary", async () => {
    const summary = { totalAbandoned: 200, totalRecovered: 50, recoveryRate: 25, lostRevenue: 50000, recoveredRevenue: 12500, avgCartValue: 250 };
    mockReportsApi.getAbandonedCartSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getAbandonedCartSummary();

    expect(result.recoveryRate).toBe(25);
  });
});

// ── Revenue Analytics ───────────────────────────────────────

describe("revenue analytics", () => {
  it("getRevenueAnalytics returns paginated entries", async () => {
    const entries = [{ period: "2024-01", revenue: 100000, cogs: 60000, grossProfit: 40000, grossMargin: 40 }];
    mockReportsApi.getRevenueAnalytics.mockResolvedValue({ success: true, data: entries, meta: { page: 1, pageSize: 12, total: 1, totalPages: 1 } });

    const result = await reportsService.getRevenueAnalytics(1, 12);

    expect(result.data[0].revenue).toBe(100000);
  });

  it("getRevenueSummary returns summary", async () => {
    const summary = { totalRevenue: 1000000, totalCOGS: 600000, totalGrossProfit: 400000, avgGrossMargin: 40, totalNetProfit: 300000, revenueGrowth: 15 };
    mockReportsApi.getRevenueSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getRevenueSummary();

    expect(result.totalRevenue).toBe(1000000);
  });
});

// ── Promotion ROI ───────────────────────────────────────────

describe("promotion ROI", () => {
  it("getPromotionROIData returns paginated entries", async () => {
    const entries = [{ promotionId: "p1", promotionName: "Sale", cost: 1000, revenue: 5000, roi: 400 }];
    mockReportsApi.getPromotionROIData.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getPromotionROIData({}, 1, 10);

    expect(result.data[0].roi).toBe(400);
  });

  it("getPromotionROISummary returns summary", async () => {
    const summary = { totalPromotions: 10, totalCost: 10000, totalRevenue: 50000, avgROI: 400, highestROI: 800, bestPromotion: "Summer Sale", totalRedemptions: 5000 };
    mockReportsApi.getPromotionROISummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getPromotionROISummary();

    expect(result.avgROI).toBe(400);
  });
});

// ── Sales Reports ───────────────────────────────────────────

describe("sales reports", () => {
  it("getSalesReports returns paginated entries", async () => {
    const entries = [{ period: "2024-01", revenue: 100000, orders: 500, avgOrderValue: 200 }];
    mockReportsApi.getSalesReports.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getSalesReports({ period: "2024-01" });

    expect(result.data[0].orders).toBe(500);
  });

  it("getSalesSummary returns summary", async () => {
    const summary = { totalRevenue: 1000000, totalOrders: 5000, avgOrderValue: 200, totalRefunds: 5000, totalDiscounts: 20000, revenueGrowth: 15, ordersGrowth: 10, topCategory: "Beverages" };
    mockReportsApi.getSalesSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getSalesSummary();

    expect(result.topCategory).toBe("Beverages");
  });
});

// ── Inventory Reports ───────────────────────────────────────

describe("inventory reports", () => {
  it("getInventoryReports returns paginated entries", async () => {
    const entries = [{ sku: "SKU001", productName: "Milk", category: "Dairy", stock: 100, stockValue: 5000 }];
    mockReportsApi.getInventoryReports.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getInventoryReports({ category: "Dairy" });

    expect(result.data[0].sku).toBe("SKU001");
  });

  it("getInventorySummary returns summary", async () => {
    const summary = { totalSKUs: 1000, totalStockValue: 500000, lowStockCount: 50, outOfStockCount: 20, overstockedCount: 30, avgTurnoverRate: 4.5, totalDamagedValue: 5000 };
    mockReportsApi.getInventorySummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getInventorySummary();

    expect(result.totalSKUs).toBe(1000);
  });
});

// ── Vendor Reports ──────────────────────────────────────────

describe("vendor reports", () => {
  it("getVendorReports returns paginated entries", async () => {
    const entries = [{ vendorId: "v1", vendorName: "Acme", grossSales: 50000, commission: 5000, netPayout: 45000 }];
    mockReportsApi.getVendorReports.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getVendorReports({ status: "active" });

    expect(result.data[0].vendorName).toBe("Acme");
  });

  it("getVendorSummary returns summary", async () => {
    const summary = { totalVendors: 100, totalGrossSales: 500000, totalCommission: 50000, totalNetPayout: 450000, totalPendingPayout: 50000, avgRating: 4.2, excellentCount: 40, poorCount: 5 };
    mockReportsApi.getVendorSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getVendorSummary();

    expect(result.totalVendors).toBe(100);
  });
});

// ── Tax Reports ─────────────────────────────────────────────

describe("tax reports", () => {
  it("getTaxReports returns paginated entries", async () => {
    const entries = [{ period: "2024-01", taxCollected: 18000, taxPaid: 10000, status: "filed" as const }];
    mockReportsApi.getTaxReports.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await reportsService.getTaxReports({ period: "2024-01" });

    expect(result.data[0].taxCollected).toBe(18000);
  });

  it("getTaxSummary returns summary", async () => {
    const summary = { totalTaxCollected: 200000, totalTaxPaid: 150000, pendingFilings: 2, overdueFilings: 1, nextDueDate: "2024-03-20", totalITCClaimed: 50000 };
    mockReportsApi.getTaxSummary.mockResolvedValue({ success: true, data: summary });

    const result = await reportsService.getTaxSummary();

    expect(result.pendingFilings).toBe(2);
  });
});

// ── Export ──────────────────────────────────────────────────

describe("exportReport", () => {
  it("returns download URL on success", async () => {
    mockReportsApi.exportReport.mockResolvedValue({ success: true, data: { downloadUrl: "/exports/sales.csv" } });

    const result = await reportsService.exportReport("sales", "csv", { period: "2024-01" });

    expect(result.success).toBe(true);
    expect(result.downloadUrl).toBe("/exports/sales.csv");
    expect(mockReportsApi.exportReport).toHaveBeenCalledWith("sales", "csv", { period: "2024-01" });
  });

  it("propagates failure", async () => {
    mockReportsApi.exportReport.mockResolvedValue({ success: false, data: { downloadUrl: "" }, error: "Export failed" });

    const result = await reportsService.exportReport("sales", "pdf");

    expect(result.success).toBe(false);
  });
});
