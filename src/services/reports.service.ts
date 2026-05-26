// ── Reports & Analytics Service Layer ─────────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Currently uses mock data. To connect to real backend:
// 1. Uncomment axios calls below
// 2. Set NEXT_PUBLIC_API_BASE_URL
// 3. Remove mock data imports and delay helper

import { apiClient } from "@/lib/api-client";
import type {
  GSTReportEntry,
  CustomerReportEntry,
  CohortEntry,
  AbandonedCartEntry,
  RevenueAnalyticsEntry,
  PromotionROIEntry,
  InventoryReportEntry,
  VendorReportEntry,
  TaxReportEntry,
  SalesReportEntry,
  ReportPageMeta,
  ReportFilters,
} from "@/types/reports";
import {
  mockGSTReports,
  mockCustomerReportEntries,
  mockCohortData,
  mockAbandonedCartData,
  mockRevenueAnalytics,
  mockPromotionROIData,
  mockInventoryReportEntries,
  mockVendorReportEntries,
  mockTaxReportEntries,
  mockSalesReportEntries,
} from "@/data/admin/reports";

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

function applyPagination<T>(data: T[], page = 1, pageSize = 10): { data: T[]; meta: ReportPageMeta } {
  const total = data.length;
  const start = (page - 1) * pageSize;
  return {
    data: data.slice(start, start + pageSize),
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  };
}

function applySearch<T>(data: T[], query: string, fields: (keyof T)[]): T[] {
  if (!query) return data;
  const q = query.toLowerCase();
  return data.filter((item) =>
    fields.some((field) => String(item[field]).toLowerCase().includes(q))
  );
}

export const reportsService = {
  async getGSTReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: GSTReportEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockGSTReports];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["businessName", "gstin", "period"] as (keyof GSTReportEntry)[]);
    }
    if (filters?.dateFrom) {
      filtered = filtered.filter((r) => r.dueDate >= filters.dateFrom!);
    }
    if (filters?.dateTo) {
      filtered = filtered.filter((r) => r.dueDate <= filters.dateTo!);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof GSTReportEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getGSTSummary(): Promise<{
    totalLiability: number;
    totalInputCredit: number;
    netPayable: number;
    pendingReturns: number;
    overdueReturns: number;
  }> {
    await delay(150);
    const total = mockGSTReports.reduce(
      (acc, r) => ({
        totalLiability: acc.totalLiability + r.totalTaxLiability,
        totalInputCredit: acc.totalInputCredit + r.inputCredit,
        netPayable: acc.netPayable + r.netPayable,
      }),
      { totalLiability: 0, totalInputCredit: 0, netPayable: 0 }
    );
    return {
      ...total,
      pendingReturns: mockGSTReports.filter((r) => r.status === "pending").length,
      overdueReturns: mockGSTReports.filter((r) => r.status === "overdue").length,
    };
  },

  async getCustomerReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: CustomerReportEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockCustomerReportEntries];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["name", "email", "city", "preferredCategory"] as (keyof CustomerReportEntry)[]);
    }
    if (filters?.dateFrom) {
      filtered = filtered.filter((r) => r.lastOrderDate >= filters.dateFrom!);
    }
    if (filters?.dateTo) {
      filtered = filtered.filter((r) => r.lastOrderDate <= filters.dateTo!);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof CustomerReportEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getCustomerSummary(): Promise<{
    totalCustomers: number;
    totalRevenue: number;
    avgRetentionRate: number;
    platinumCount: number;
    atRiskCount: number;
  }> {
    await delay(150);
    const customers = mockCustomerReportEntries;
    return {
      totalCustomers: customers.length,
      totalRevenue: customers.reduce((s, c) => s + c.totalSpent, 0),
      avgRetentionRate: Math.round(customers.reduce((s, c) => s + c.retentionRate, 0) / customers.length),
      platinumCount: customers.filter((c) => c.segment === "platinum").length,
      atRiskCount: customers.filter((c) => c.retentionRate < 50).length,
    };
  },

  async getCohortData(
    page = 1,
    pageSize = 12
  ): Promise<{ data: CohortEntry[]; meta: ReportPageMeta }> {
    await delay(300);
    return applyPagination(mockCohortData, page, pageSize);
  },

  async getCohortSummary(): Promise<{
    totalCohorts: number;
    totalUsers: number;
    avgRetentionWeek1: number;
    avgRetentionWeek4: number;
    avgRetentionWeek12: number;
  }> {
    await delay(150);
    const cohorts = mockCohortData;
    const week1Values = cohorts.filter((c) => c.week1 > 0).map((c) => c.week1);
    const week4Values = cohorts.filter((c) => c.week4 > 0).map((c) => c.week4);
    const week12Values = cohorts.filter((c) => c.week11 > 0).map((c) => c.week11);
    return {
      totalCohorts: cohorts.length,
      totalUsers: cohorts.reduce((s, c) => s + c.users, 0),
      avgRetentionWeek1: Math.round(week1Values.reduce((s, v) => s + v, 0) / week1Values.length * 10) / 10,
      avgRetentionWeek4: Math.round(week4Values.reduce((s, v) => s + v, 0) / week4Values.length * 10) / 10,
      avgRetentionWeek12: week12Values.length > 0 ? Math.round(week12Values.reduce((s, v) => s + v, 0) / week12Values.length * 10) / 10 : 0,
    };
  },

  async getAbandonedCartData(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: AbandonedCartEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockAbandonedCartData];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["customerName", "customerEmail"] as (keyof AbandonedCartEntry)[]);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof AbandonedCartEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getAbandonedCartSummary(): Promise<{
    totalAbandoned: number;
    totalRecovered: number;
    recoveryRate: number;
    lostRevenue: number;
    recoveredRevenue: number;
    avgCartValue: number;
  }> {
    await delay(150);
    const carts = mockAbandonedCartData;
    const recovered = carts.filter((c) => c.status === "recovered");
    const lost = carts.filter((c) => c.status === "lost" || c.status === "abandoned");
    return {
      totalAbandoned: carts.length,
      totalRecovered: recovered.length,
      recoveryRate: Math.round((recovered.length / carts.length) * 100),
      lostRevenue: lost.reduce((s, c) => s + c.cartValue, 0),
      recoveredRevenue: recovered.reduce((s, c) => s + c.cartValue, 0),
      avgCartValue: Math.round(carts.reduce((s, c) => s + c.cartValue, 0) / carts.length),
    };
  },

  async getRevenueAnalytics(
    page = 1,
    pageSize = 12
  ): Promise<{ data: RevenueAnalyticsEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    return applyPagination(mockRevenueAnalytics, page, pageSize);
  },

  async getRevenueSummary(): Promise<{
    totalRevenue: number;
    totalCOGS: number;
    totalGrossProfit: number;
    avgGrossMargin: number;
    totalNetProfit: number;
    revenueGrowth: number;
  }> {
    await delay(150);
    const data = mockRevenueAnalytics;
    const first = data[0];
    const last = data[data.length - 1];
    const revenueGrowth = first ? Math.round(((last.revenue - first.revenue) / first.revenue) * 100 * 10) / 10 : 0;
    return {
      totalRevenue: data.reduce((s, r) => s + r.revenue, 0),
      totalCOGS: data.reduce((s, r) => s + r.cogs, 0),
      totalGrossProfit: data.reduce((s, r) => s + r.grossProfit, 0),
      avgGrossMargin: Math.round(data.reduce((s, r) => s + r.grossMargin, 0) / data.length * 10) / 10,
      totalNetProfit: data.reduce((s, r) => s + r.netProfit, 0),
      revenueGrowth,
    };
  },

  async getPromotionROIData(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: PromotionROIEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockPromotionROIData];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["promotionName", "type"] as (keyof PromotionROIEntry)[]);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof PromotionROIEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getPromotionROISummary(): Promise<{
    totalPromotions: number;
    totalCost: number;
    totalRevenue: number;
    avgROI: number;
    highestROI: number;
    bestPromotion: string;
    totalRedemptions: number;
  }> {
    await delay(150);
    const data = mockPromotionROIData;
    const best = data.reduce((best, curr) => (curr.roi > best.roi ? curr : best), data[0]);
    return {
      totalPromotions: data.length,
      totalCost: data.reduce((s, p) => s + p.cost, 0),
      totalRevenue: data.reduce((s, p) => s + p.revenueGenerated, 0),
      avgROI: Math.round(data.reduce((s, p) => s + p.roi, 0) / data.length),
      highestROI: best.roi,
      bestPromotion: best.promotionName,
      totalRedemptions: data.reduce((s, p) => s + p.redemptionCount, 0),
    };
  },

  async exportReport(reportType: string, format: "csv" | "xlsx" | "pdf", filters?: Partial<ReportFilters>): Promise<{ success: boolean; downloadUrl: string }> {
    await delay(500);
    return {
      success: true,
      downloadUrl: `/api/reports/export/${reportType}?format=${format}`,
    };
  },

  // ── Sales Reports ─────────────────────────────────────

  async getSalesReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: SalesReportEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockSalesReportEntries];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["date", "topCategory"] as (keyof SalesReportEntry)[]);
    }
    if (filters?.dateFrom) {
      filtered = filtered.filter((r) => r.date >= filters.dateFrom!);
    }
    if (filters?.dateTo) {
      filtered = filtered.filter((r) => r.date <= filters.dateTo!);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof SalesReportEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    } else {
      filtered.sort((a, b) => b.date.localeCompare(a.date));
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getSalesSummary(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    totalRefunds: number;
    totalDiscounts: number;
    revenueGrowth: number;
    ordersGrowth: number;
    topCategory: string;
  }> {
    await delay(150);
    const data = mockSalesReportEntries;
    const totalRevenue = data.reduce((s, r) => s + r.grossRevenue, 0);
    const totalOrders = data.reduce((s, r) => s + r.orders, 0);
    const categoryCount: Record<string, number> = {};
    data.forEach((r) => { categoryCount[r.topCategory] = (categoryCount[r.topCategory] || 0) + 1; });
    const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Groceries";
    return {
      totalRevenue,
      totalOrders,
      avgOrderValue: Math.round(totalRevenue / totalOrders),
      totalRefunds: data.reduce((s, r) => s + r.refunds, 0),
      totalDiscounts: data.reduce((s, r) => s + r.discounts, 0),
      revenueGrowth: 12.5,
      ordersGrowth: 10.1,
      topCategory,
    };
  },

  // ── Inventory Reports ─────────────────────────────────

  async getInventoryReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: InventoryReportEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockInventoryReportEntries];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["productName", "sku", "category", "warehouse"] as (keyof InventoryReportEntry)[]);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof InventoryReportEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getInventorySummary(): Promise<{
    totalSKUs: number;
    totalStockValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    overstockedCount: number;
    avgTurnoverRate: number;
    totalDamagedValue: number;
  }> {
    await delay(150);
    const data = mockInventoryReportEntries;
    return {
      totalSKUs: data.length,
      totalStockValue: data.reduce((s, r) => s + r.stockValue, 0),
      lowStockCount: data.filter((r) => r.stockStatus === "low" || r.stockStatus === "critical").length,
      outOfStockCount: data.filter((r) => r.stockStatus === "out_of_stock").length,
      overstockedCount: data.filter((r) => r.stockStatus === "overstocked").length,
      avgTurnoverRate: Math.round(data.reduce((s, r) => s + r.turnoverRate, 0) / data.length * 10) / 10,
      totalDamagedValue: data.reduce((s, r) => s + r.damaged * r.unitCost, 0),
    };
  },

  // ── Vendor Reports ────────────────────────────────────

  async getVendorReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorReportEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockVendorReportEntries];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["vendorName", "category"] as (keyof VendorReportEntry)[]);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof VendorReportEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getVendorSummary(): Promise<{
    totalVendors: number;
    totalGrossSales: number;
    totalCommission: number;
    totalNetPayout: number;
    totalPendingPayout: number;
    avgRating: number;
    excellentCount: number;
    poorCount: number;
  }> {
    await delay(150);
    const data = mockVendorReportEntries;
    return {
      totalVendors: data.length,
      totalGrossSales: data.reduce((s, v) => s + v.grossSales, 0),
      totalCommission: data.reduce((s, v) => s + v.commission, 0),
      totalNetPayout: data.reduce((s, v) => s + v.netPayout, 0),
      totalPendingPayout: data.reduce((s, v) => s + v.pendingPayout, 0),
      avgRating: Math.round(data.reduce((s, v) => s + v.rating, 0) / data.length * 10) / 10,
      excellentCount: data.filter((v) => v.performance === "excellent").length,
      poorCount: data.filter((v) => v.performance === "poor").length,
    };
  },

  // ── Tax Reports ───────────────────────────────────────

  async getTaxReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: TaxReportEntry[]; meta: ReportPageMeta }> {
    await delay(250);
    let filtered = [...mockTaxReportEntries];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, ["reportTitle", "period", "type"] as (keyof TaxReportEntry)[]);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof TaxReportEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[key] ?? "";
        const bVal = b[key] ?? "";
        return String(aVal).localeCompare(String(bVal)) * dir;
      });
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getTaxSummary(): Promise<{
    totalTaxCollected: number;
    totalTaxPaid: number;
    pendingFilings: number;
    overdueFilings: number;
    nextDueDate: string;
    totalITCClaimed: number;
  }> {
    await delay(150);
    const data = mockTaxReportEntries;
    const filed = data.filter((r) => r.status === "filed");
    const itcEntry = data.find((r) => r.type === "ITC");
    const pending = data.filter((r) => r.status === "pending");
    const nextDue = pending
      .filter((r) => r.dueDate !== "—")
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
    return {
      totalTaxCollected: filed.reduce((s, r) => s + r.totalTaxAmount, 0),
      totalTaxPaid: filed.reduce((s, r) => s + r.totalTaxAmount, 0),
      pendingFilings: pending.length,
      overdueFilings: data.filter((r) => r.status === "overdue").length,
      nextDueDate: nextDue?.dueDate ?? "—",
      totalITCClaimed: itcEntry?.totalTaxAmount ?? 0,
    };
  },
};
