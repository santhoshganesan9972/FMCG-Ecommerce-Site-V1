// ── Vendor Service Layer ──────────────────────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Currently uses mock data. To connect to real backend:
// 1. Uncomment axios calls below
// 2. Set NEXT_PUBLIC_API_BASE_URL
// 3. Remove mock data imports and delay helper

import { apiClient } from "@/lib/api-client";
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
import {
  mockVendors,
  mockVendorOnboarding,
  mockVendorProducts,
  mockVendorSettlements,
  mockVendorAnalytics,
} from "@/data/admin/vendors";

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

function applyPagination<T>(
  data: T[],
  page = 1,
  pageSize = 10
): { data: T[]; meta: VendorPageMeta } {
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
    fields.some((field) => String(item[field] ?? "").toLowerCase().includes(q))
  );
}

export const vendorsService = {
  // ── Vendors CRUD ─────────────────────────────────────

  async getVendors(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: Vendor[]; meta: VendorPageMeta }> {
    await delay(250);
    // Real API: return apiClient.get(`/vendors?page=${page}&pageSize=${pageSize}&...`)
    let filtered = [...mockVendors];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, [
        "name", "email", "vendorId", "category", "city",
      ] as (keyof Vendor)[]);
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((v) => v.status === filters.status);
    }
    if (filters?.category && filters.category !== "all") {
      filtered = filtered.filter((v) => v.category === filters.category);
    }
    if (filters?.performance && filters.performance !== "all") {
      filtered = filtered.filter((v) => v.performance === filters.performance);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof Vendor;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? "")) * dir);
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getVendorById(id: string): Promise<Vendor | null> {
    await delay(150);
    // Real API: return apiClient.get(`/vendors/${id}`)
    return mockVendors.find((v) => v.id === id) ?? null;
  },

  async getVendorSummary(): Promise<VendorSummary> {
    await delay(150);
    const vendors = mockVendors;
    return {
      totalVendors: vendors.length,
      activeVendors: vendors.filter((v) => v.status === "active").length,
      pendingVendors: vendors.filter((v) => v.status === "pending").length,
      suspendedVendors: vendors.filter((v) => v.status === "suspended").length,
      totalProducts: vendors.reduce((s, v) => s + v.totalProducts, 0),
      totalSales: vendors.reduce((s, v) => s + v.totalSales, 0),
      totalCommission: vendors.reduce((s, v) => s + v.totalCommission, 0),
      pendingPayouts: vendors.reduce((s, v) => s + v.pendingPayout, 0),
      avgRating: Math.round((vendors.reduce((s, v) => s + v.rating, 0) / vendors.length) * 10) / 10,
      excellentCount: vendors.filter((v) => v.performance === "excellent").length,
      poorCount: vendors.filter((v) => v.performance === "poor").length,
    };
  },

  async createVendor(data: Partial<Vendor>): Promise<Vendor> {
    await delay(400);
    // Real API: return apiClient.post("/vendors", data)
    const newVendor: Vendor = {
      id: `VND-${String(mockVendors.length + 1).padStart(3, "0")}`,
      vendorId: `VEND${String(mockVendors.length + 1).padStart(3, "0")}`,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      category: data.category ?? "",
      subCategories: data.subCategories ?? [],
      status: "pending",
      performance: "average",
      rating: 0,
      totalProducts: 0,
      activeProducts: 0,
      totalOrders: 0,
      totalSales: 0,
      commissionRate: data.commissionRate ?? 10,
      totalCommission: 0,
      netPayout: 0,
      pendingPayout: 0,
      onTimeDeliveryRate: 0,
      returnRate: 0,
      city: data.city ?? "",
      state: data.state ?? "",
      pincode: data.pincode ?? "",
      address: data.address ?? "",
      gstin: data.gstin ?? "",
      pan: data.pan ?? "",
      bankAccount: data.bankAccount ?? "",
      ifsc: data.ifsc ?? "",
      bankName: data.bankName ?? "",
      contactPerson: data.contactPerson ?? "",
      joinedDate: new Date().toISOString().split("T")[0],
      lastActiveDate: new Date().toISOString().split("T")[0],
      tags: [],
    };
    return newVendor;
  },

  async updateVendorStatus(id: string, status: Vendor["status"]): Promise<void> {
    await delay(300);
    // Real API: return apiClient.patch(`/vendors/${id}/status`, { status })
  },

  // ── Onboarding ────────────────────────────────────────

  async getOnboardingApplications(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorOnboarding[]; meta: VendorPageMeta }> {
    await delay(250);
    let filtered = [...mockVendorOnboarding];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, [
        "company", "owner", "email", "id",
      ] as (keyof VendorOnboarding)[]);
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((v) => v.status === filters.status);
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getOnboardingSummary(): Promise<OnboardingSummary> {
    await delay(150);
    const apps = mockVendorOnboarding;
    return {
      total: apps.length,
      pendingReview: apps.filter((a) => a.status === "pending_review").length,
      pendingDocuments: apps.filter((a) => a.status === "pending_documents").length,
      approved: apps.filter((a) => a.status === "approved").length,
      rejected: apps.filter((a) => a.status === "rejected").length,
    };
  },

  async approveVendor(id: string): Promise<void> {
    await delay(400);
    // Real API: return apiClient.post(`/vendors/onboarding/${id}/approve`)
  },

  async rejectVendor(id: string, reason: string): Promise<void> {
    await delay(400);
    // Real API: return apiClient.post(`/vendors/onboarding/${id}/reject`, { reason })
  },

  // ── Products ──────────────────────────────────────────

  async getVendorProducts(
    filters?: Partial<VendorFilters> & { vendorId?: string },
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorProduct[]; meta: VendorPageMeta }> {
    await delay(250);
    let filtered = [...mockVendorProducts];
    if (filters?.vendorId) {
      filtered = filtered.filter((p) => p.vendorId === filters.vendorId);
    }
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, [
        "productName", "sku", "vendorName", "category",
      ] as (keyof VendorProduct)[]);
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof VendorProduct;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? "")) * dir);
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getProductSummary(): Promise<{
    totalProducts: number;
    activeProducts: number;
    outOfStockCount: number;
    inactiveCount: number;
    avgMargin: number;
    totalStockValue: number;
  }> {
    await delay(150);
    const products = mockVendorProducts;
    return {
      totalProducts: products.length,
      activeProducts: products.filter((p) => p.status === "active").length,
      outOfStockCount: products.filter((p) => p.status === "out_of_stock").length,
      inactiveCount: products.filter((p) => p.status === "inactive" || p.status === "discontinued").length,
      avgMargin: Math.round(products.reduce((s, p) => s + p.margin, 0) / products.length * 10) / 10,
      totalStockValue: products.reduce((s, p) => s + p.stock * p.costPrice, 0),
    };
  },

  // ── Settlements ───────────────────────────────────────

  async getSettlements(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorSettlement[]; meta: VendorPageMeta }> {
    await delay(250);
    let filtered = [...mockVendorSettlements];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, [
        "vendorName", "id", "vendorId",
      ] as (keyof VendorSettlement)[]);
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((s) => s.status === filters.status);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof VendorSettlement;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? "")) * dir);
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getSettlementSummary(): Promise<SettlementSummary> {
    await delay(150);
    const settlements = mockVendorSettlements;
    return {
      totalSettlements: settlements.length,
      pendingCount: settlements.filter((s) => s.status === "pending").length,
      processingCount: settlements.filter((s) => s.status === "processing").length,
      completedCount: settlements.filter((s) => s.status === "completed").length,
      totalGrossSales: settlements.reduce((s, st) => s + st.grossSales, 0),
      totalCommission: settlements.reduce((s, st) => s + st.commission, 0),
      totalNetPayable: settlements.reduce((s, st) => s + st.netPayable, 0),
      pendingAmount: settlements
        .filter((s) => s.status === "pending")
        .reduce((s, st) => s + st.netPayable, 0),
    };
  },

  async processSettlement(id: string): Promise<void> {
    await delay(500);
    // Real API: return apiClient.post(`/vendors/settlements/${id}/process`)
  },

  // ── Analytics ─────────────────────────────────────────

  async getVendorAnalytics(
    filters?: Partial<VendorFilters>,
    page = 1,
    pageSize = 10
  ): Promise<{ data: VendorAnalyticsEntry[]; meta: VendorPageMeta }> {
    await delay(250);
    let filtered = [...mockVendorAnalytics];
    if (filters?.search) {
      filtered = applySearch(filtered, filters.search, [
        "vendorName", "category",
      ] as (keyof VendorAnalyticsEntry)[]);
    }
    if (filters?.sortBy) {
      const key = filters.sortBy as keyof VendorAnalyticsEntry;
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? "")) * dir);
    }
    return applyPagination(filtered, page, pageSize);
  },

  async getAnalyticsSummary(): Promise<VendorAnalyticsSummary> {
    await delay(150);
    const analytics = mockVendorAnalytics;
    const top = analytics.reduce((best, curr) => (curr.totalSales > best.totalSales ? curr : best), analytics[0]);
    return {
      totalVendors: analytics.length,
      activeVendors: analytics.filter((a) => a.growth >= 0).length,
      totalSales: analytics.reduce((s, a) => s + a.totalSales, 0),
      totalOrders: analytics.reduce((s, a) => s + a.totalOrders, 0),
      avgRating: Math.round(analytics.reduce((s, a) => s + a.rating, 0) / analytics.length * 10) / 10,
      avgOnTimeDelivery: Math.round(analytics.reduce((s, a) => s + a.onTimeDelivery, 0) / analytics.length * 10) / 10,
      topVendor: top?.vendorName ?? "",
      totalCommission: 0,
    };
  },

  async exportVendors(format: "csv" | "xlsx" | "pdf"): Promise<{ success: boolean; downloadUrl: string }> {
    await delay(500);
    return { success: true, downloadUrl: `/api/vendors/export?format=${format}` };
  },
};
