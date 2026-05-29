// ── Reports & Analytics Service Layer ─────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

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
import { reportsApi } from "@/services/api";

export const reportsService = {
  // ── GST Reports ─────────────────────────────────────────

  async getGSTReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: GSTReportEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getGSTReports(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getGSTSummary(): Promise<{
    totalLiability: number;
    totalInputCredit: number;
    netPayable: number;
    pendingReturns: number;
    overdueReturns: number;
  }> {
    const res = await reportsApi.getGSTSummary();
    return res.data;
  },

  // ── Customer Reports ────────────────────────────────────

  async getCustomerReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: CustomerReportEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getCustomerReports(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getCustomerSummary(): Promise<{
    totalCustomers: number;
    totalRevenue: number;
    avgRetentionRate: number;
    platinumCount: number;
    atRiskCount: number;
  }> {
    const res = await reportsApi.getCustomerSummary();
    return res.data;
  },

  // ── Cohort Data ─────────────────────────────────────────

  async getCohortData(
    page = 1,
    pageSize = 12
  ): Promise<{ data: CohortEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getCohortData(page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getCohortSummary(): Promise<{
    totalCohorts: number;
    totalUsers: number;
    avgRetentionWeek1: number;
    avgRetentionWeek4: number;
    avgRetentionWeek12: number;
  }> {
    const res = await reportsApi.getCohortSummary();
    return res.data;
  },

  // ── Abandoned Cart ─────────────────────────────────────

  async getAbandonedCartData(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: AbandonedCartEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getAbandonedCartData(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getAbandonedCartSummary(): Promise<{
    totalAbandoned: number;
    totalRecovered: number;
    recoveryRate: number;
    lostRevenue: number;
    recoveredRevenue: number;
    avgCartValue: number;
  }> {
    const res = await reportsApi.getAbandonedCartSummary();
    return res.data;
  },

  // ── Revenue Analytics ──────────────────────────────────

  async getRevenueAnalytics(
    page = 1,
    pageSize = 12
  ): Promise<{ data: RevenueAnalyticsEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getRevenueAnalytics(page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getRevenueSummary(): Promise<{
    totalRevenue: number;
    totalCOGS: number;
    totalGrossProfit: number;
    avgGrossMargin: number;
    totalNetProfit: number;
    revenueGrowth: number;
  }> {
    const res = await reportsApi.getRevenueSummary();
    return res.data;
  },

  // ── Promotion ROI ─────────────────────────────────────

  async getPromotionROIData(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: PromotionROIEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getPromotionROIData(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
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
    const res = await reportsApi.getPromotionROISummary();
    return res.data;
  },

  // ── Sales Reports ─────────────────────────────────────

  async getSalesReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: SalesReportEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getSalesReports(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
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
    const res = await reportsApi.getSalesSummary();
    return res.data;
  },

  // ── Inventory Reports ─────────────────────────────────

  async getInventoryReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: InventoryReportEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getInventoryReports(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
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
    const res = await reportsApi.getInventorySummary();
    return res.data;
  },

  // ── Vendor Reports ────────────────────────────────────

  async getVendorReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorReportEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getVendorReports(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
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
    const res = await reportsApi.getVendorSummary();
    return res.data;
  },

  // ── Tax Reports ───────────────────────────────────────

  async getTaxReports(
    filters?: Partial<ReportFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: TaxReportEntry[]; meta: ReportPageMeta }> {
    const res = await reportsApi.getTaxReports(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getTaxSummary(): Promise<{
    totalTaxCollected: number;
    totalTaxPaid: number;
    pendingFilings: number;
    overdueFilings: number;
    nextDueDate: string;
    totalITCClaimed: number;
  }> {
    const res = await reportsApi.getTaxSummary();
    return res.data;
  },

  // ── Export ────────────────────────────────────────────

  async exportReport(reportType: string, format: "csv" | "xlsx" | "pdf", filters?: Partial<ReportFilters>): Promise<{ success: boolean; downloadUrl: string }> {
    const res = await reportsApi.exportReport(reportType, format, filters);
    return { success: res.success, downloadUrl: res.data.downloadUrl };
  },
};
