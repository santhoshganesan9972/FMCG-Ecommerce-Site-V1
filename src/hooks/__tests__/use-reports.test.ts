// @vitest-environment jsdom
// ── useReports Hook Tests ────────────────────────────────────

import { vi } from "vitest";

const mockReportService = vi.hoisted(() => ({
  getGSTReports: vi.fn(),
  getGSTSummary: vi.fn(),
  getCustomerReports: vi.fn(),
  getCustomerSummary: vi.fn(),
  getCohortData: vi.fn(),
  getCohortSummary: vi.fn(),
  getAbandonedCartData: vi.fn(),
  getAbandonedCartSummary: vi.fn(),
  getRevenueAnalytics: vi.fn(),
  getRevenueSummary: vi.fn(),
  getPromotionROIData: vi.fn(),
  getPromotionROISummary: vi.fn(),
  getSalesReports: vi.fn(),
  getSalesSummary: vi.fn(),
  getInventoryReports: vi.fn(),
  getInventorySummary: vi.fn(),
  getVendorReports: vi.fn(),
  getVendorSummary: vi.fn(),
  getTaxReports: vi.fn(),
  getTaxSummary: vi.fn(),
  exportReport: vi.fn(),
}));

vi.mock("@/services/reports.service", () => ({
  reportsService: mockReportService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import {
  useGSTReports, useCustomerReports, useCohortData,
  useAbandonedCart, useRevenueAnalytics, usePromotionROI,
  useSalesReports, useInventoryReports, useVendorReports,
  useTaxReports, useReportExport,
} from "@/hooks/use-reports";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("useGSTReports", () => {
  it("returns GST reports and summary", async () => {
    mockReportService.getGSTReports.mockResolvedValue({
      items: [{ id: "gst-1", period: "2025-Q1", totalTax: 50000, filed: true, dueDate: "2025-04-20", filedDate: "2025-04-15" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    mockReportService.getGSTSummary.mockResolvedValue({ totalFilers: 12, totalTax: 50000, pending: 3, overdue: 1 });

    const { result } = renderWithQuery(() => useGSTReports());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.reports).toHaveLength(1);
    expect(result.current.summary?.totalTax).toBe(50000);
  });
});

describe("useCustomerReports", () => {
  it("returns customer reports and summary", async () => {
    mockReportService.getCustomerReports.mockResolvedValue({
      items: [{ id: "cr-1", name: "Alice", email: "alice@test.com", totalOrders: 25, totalSpent: 50000, lastOrderDate: "2025-05-28" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    mockReportService.getCustomerSummary.mockResolvedValue({ totalCustomers: 500, activeCustomers: 300, newCustomers: 50, churned: 20 });

    const { result } = renderWithQuery(() => useCustomerReports());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.reports).toHaveLength(1);
  });
});

describe("useCohortData", () => {
  it("returns cohort data and summary", async () => {
    mockReportService.getCohortData.mockResolvedValue({
      items: [{ cohort: "2025-Q1", customers: 100, retention: [100, 80, 60] }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    mockReportService.getCohortSummary.mockResolvedValue({ totalCohorts: 4, avgRetention: 70, bestCohort: "2025-Q1" });

    const { result } = renderWithQuery(() => useCohortData());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useAbandonedCart", () => {
  it("returns cart data and summary", async () => {
    mockReportService.getAbandonedCartData.mockResolvedValue({
      items: [{ id: "ac-1", customer: "Alice", email: "alice@test.com", items: 3, total: 450, abandonedAt: "2025-05-28T10:00:00Z", status: "recovered" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    mockReportService.getAbandonedCartSummary.mockResolvedValue({ total: 100, abandoned: 70, recovered: 30, totalValue: 45000, recoveredValue: 15000 });

    const { result } = renderWithQuery(() => useAbandonedCart());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useRevenueAnalytics", () => {
  it("returns revenue data and summary", async () => {
    mockReportService.getRevenueAnalytics.mockResolvedValue({
      items: [{ period: "2025-05", revenue: 500000, orders: 200, averageOrderValue: 2500 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    mockReportService.getRevenueSummary.mockResolvedValue({ totalRevenue: 5000000, avgMonthlyRevenue: 400000, growth: 12.5 });

    const { result } = renderWithQuery(() => useRevenueAnalytics());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("usePromotionROI", () => {
  it("returns promotion ROI data", async () => {
    mockReportService.getPromotionROIData.mockResolvedValue({
      items: [{ name: "Summer Sale", spend: 50000, revenue: 150000, roi: 200 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });

    const { result } = renderWithQuery(() => usePromotionROI());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useSalesReports", () => {
  it("returns sales reports", async () => {
    mockReportService.getSalesReports.mockResolvedValue({
      items: [{ period: "2025-05", revenue: 500000, orders: 200, cost: 350000, profit: 150000 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });

    const { result } = renderWithQuery(() => useSalesReports());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useInventoryReports", () => {
  it("returns inventory reports", async () => {
    mockReportService.getInventoryReports.mockResolvedValue({
      items: [{ id: "ir-1", product: "Milk", sku: "MLK-001", currentStock: 100, reorderPoint: 20, turnover: 5.2 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });

    const { result } = renderWithQuery(() => useInventoryReports());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useVendorReports", () => {
  it("returns vendor reports", async () => {
    mockReportService.getVendorReports.mockResolvedValue({
      items: [{ id: "vr-1", vendor: "Dairy Farm", category: "Dairy", totalOrders: 200, totalRevenue: 500000, avgRating: 4.5 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });

    const { result } = renderWithQuery(() => useVendorReports());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useTaxReports", () => {
  it("returns tax reports", async () => {
    mockReportService.getTaxReports.mockResolvedValue({
      items: [{ id: "tx-1", period: "2025-Q1", totalSales: 500000, totalTax: 90000, filed: true }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });

    const { result } = renderWithQuery(() => useTaxReports());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toHaveLength(1);
  });
});

describe("useReportExport", () => {
  it("calls exportReport", async () => {
    const { result } = renderWithQuery(() => useReportExport());

    result.current.exportReport("gst", "pdf", { period: "2025-Q1" });
    expect(mockReportService.exportReport).toHaveBeenCalledWith("gst", "pdf", { period: "2025-Q1" });
  });
});
