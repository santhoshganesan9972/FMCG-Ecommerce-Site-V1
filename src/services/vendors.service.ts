// ── Vendor Service Layer ──────────────────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  Vendor,
  VendorOnboarding,
  VendorProduct,
  VendorSettlement,
  VendorAnalyticsEntry,
  VendorFilters,
  VendorPageMeta,
  VendorSummary,
  SettlementSummary,
  OnboardingSummary,
  VendorAnalyticsSummary,
} from "@/types/vendors";
import { vendorsApi } from "@/services/api";

export const vendorsService = {
  // ── Vendors CRUD ─────────────────────────────────────

  async getVendors(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: Vendor[]; meta: VendorPageMeta }> {
    const res = await vendorsApi.getVendors(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getVendorById(id: string): Promise<Vendor | null> {
    const res = await vendorsApi.getVendorById(id);
    return res.data;
  },

  async getVendorSummary(): Promise<VendorSummary> {
    const res = await vendorsApi.getVendorSummary();
    return res.data;
  },

  async createVendor(data: Partial<Vendor>): Promise<Vendor> {
    const res = await vendorsApi.createVendor(data);
    return res.data;
  },

  async updateVendorStatus(id: string, status: Vendor["status"]): Promise<void> {
    const res = await vendorsApi.updateVendorStatus(id, status);
    if (!res.success) throw new Error(res.error || "Failed to update vendor status");
  },

  // ── Onboarding ────────────────────────────────────────

  async getOnboardingApplications(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorOnboarding[]; meta: VendorPageMeta }> {
    const res = await vendorsApi.getOnboardingApplications(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getOnboardingSummary(): Promise<OnboardingSummary> {
    const res = await vendorsApi.getOnboardingSummary();
    return res.data;
  },

  async approveVendor(id: string): Promise<void> {
    const res = await vendorsApi.approveVendor(id);
    if (!res.success) throw new Error(res.error || "Failed to approve vendor");
  },

  async rejectVendor(id: string, reason: string): Promise<void> {
    const res = await vendorsApi.rejectVendor(id, reason);
    if (!res.success) throw new Error(res.error || "Failed to reject vendor");
  },

  // ── Products ──────────────────────────────────────────

  async getVendorProducts(
    filters?: Partial<VendorFilters> & { vendorId?: string },
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorProduct[]; meta: VendorPageMeta }> {
    const res = await vendorsApi.getVendorProducts(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getProductSummary(): Promise<{
    totalProducts: number;
    activeProducts: number;
    outOfStockCount: number;
    inactiveCount: number;
    avgMargin: number;
    totalStockValue: number;
  }> {
    const res = await vendorsApi.getProductSummary();
    return res.data;
  },

  // ── Settlements ───────────────────────────────────────

  async getSettlements(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorSettlement[]; meta: VendorPageMeta }> {
    const res = await vendorsApi.getSettlements(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getSettlementSummary(): Promise<SettlementSummary> {
    const res = await vendorsApi.getSettlementSummary();
    return res.data;
  },

  async processSettlement(id: string): Promise<void> {
    const res = await vendorsApi.processSettlement(id);
    if (!res.success) throw new Error(res.error || "Failed to process settlement");
  },

  // ── Analytics ─────────────────────────────────────────

  async getVendorAnalytics(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorAnalyticsEntry[]; meta: VendorPageMeta }> {
    const res = await vendorsApi.getVendorAnalytics(filters, page, pageSize);
    return { data: res.data, meta: res.meta! };
  },

  async getAnalyticsSummary(): Promise<VendorAnalyticsSummary> {
    const res = await vendorsApi.getAnalyticsSummary();
    return res.data;
  },

  async exportVendors(format: "csv" | "xlsx" | "pdf"): Promise<{ success: boolean; downloadUrl: string }> {
    const res = await vendorsApi.exportVendors(format);
    return { success: res.success, downloadUrl: res.data.downloadUrl };
  },
};
