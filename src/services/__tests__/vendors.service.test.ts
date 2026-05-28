// ── Vendors Service Tests ───────────────────────────────────
// Tests the service layer for vendors CRUD, onboarding,
// vendor products, settlements, analytics, and export.

import { describe, it, expect, beforeEach } from "vitest";
import { mockVendorsApi, resetMocks } from "./setup";
import { vendorsService } from "../vendors.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };
const mockVendor = { id: "1", name: "Acme Corp", email: "acme@test.com", status: "active" as const, rating: 4.5 };

// ── getVendors ──────────────────────────────────────────────

describe("getVendors", () => {
  it("returns paginated vendors on success", async () => {
    mockVendorsApi.getVendors.mockResolvedValue({ success: true, data: [mockVendor], meta: mockMeta });

    const result = await vendorsService.getVendors({ status: "active" }, 1, 10);

    expect(result.data).toEqual([mockVendor]);
    expect(result.meta).toEqual(mockMeta);
    expect(mockVendorsApi.getVendors).toHaveBeenCalledWith({ status: "active" }, 1, 10);
  });

  it("uses default pagination when not provided", async () => {
    mockVendorsApi.getVendors.mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    });

    const result = await vendorsService.getVendors();

    expect(result.data).toEqual([]);
    expect(mockVendorsApi.getVendors).toHaveBeenCalledWith(undefined, 1, 10);
  });
});

// ── getVendorById ──────────────────────────────────────────

describe("getVendorById", () => {
  it("returns vendor on success", async () => {
    mockVendorsApi.getVendorById.mockResolvedValue({ success: true, data: mockVendor });

    const result = await vendorsService.getVendorById("1");

    expect(result).toEqual(mockVendor);
  });

  it("returns null on failure", async () => {
    mockVendorsApi.getVendorById.mockResolvedValue({ success: false, data: null, error: "Not found" });

    const result = await vendorsService.getVendorById("999");

    expect(result).toBeNull();
  });
});

// ── getVendorSummary ────────────────────────────────────────

describe("getVendorSummary", () => {
  it("returns summary data on success", async () => {
    const summary = { totalVendors: 100, active: 80, pending: 10, suspended: 5, inactive: 5, totalRevenue: 500000, avgRating: 4.2 };
    mockVendorsApi.getVendorSummary.mockResolvedValue({ success: true, data: summary });

    const result = await vendorsService.getVendorSummary();

    expect(result.totalVendors).toBe(100);
  });
});

// ── createVendor ────────────────────────────────────────────

describe("createVendor", () => {
  it("returns created vendor on success", async () => {
    const created = { ...mockVendor, id: "2", name: "New Vendor" };
    mockVendorsApi.createVendor.mockResolvedValue({ success: true, data: created });

    const result = await vendorsService.createVendor({ name: "New Vendor" });

    expect(result.name).toBe("New Vendor");
    expect(mockVendorsApi.createVendor).toHaveBeenCalledWith({ name: "New Vendor" });
  });
});

// ── updateVendorStatus ──────────────────────────────────────

describe("updateVendorStatus", () => {
  it("throws on failure", async () => {
    mockVendorsApi.updateVendorStatus.mockResolvedValue({
      success: false,
      data: undefined,
      error: "Vendor not found",
    });

    await expect(vendorsService.updateVendorStatus("999", "active")).rejects.toThrow("Vendor not found");
  });

  it("succeeds without error", async () => {
    mockVendorsApi.updateVendorStatus.mockResolvedValue({ success: true, data: undefined });

    await expect(vendorsService.updateVendorStatus("1", "suspended")).resolves.not.toThrow();
    expect(mockVendorsApi.updateVendorStatus).toHaveBeenCalledWith("1", "suspended");
  });
});

// ── Onboarding ──────────────────────────────────────────────

describe("onboarding", () => {
  it("getOnboardingApplications returns paginated results", async () => {
    const apps = [{ id: "o1", vendorName: "New Vendor", status: "pending" as const }];
    mockVendorsApi.getOnboardingApplications.mockResolvedValue({ success: true, data: apps, meta: mockMeta });

    const result = await vendorsService.getOnboardingApplications({ status: "pending" }, 1, 10);

    expect(result.data).toHaveLength(1);
    expect(result.meta.page).toBe(1);
  });

  it("getOnboardingSummary returns summary", async () => {
    const summary = { total: 10, pending: 5, approved: 3, rejected: 2, avgProcessingTime: 48 };
    mockVendorsApi.getOnboardingSummary.mockResolvedValue({ success: true, data: summary });

    const result = await vendorsService.getOnboardingSummary();

    expect(result.total).toBe(10);
  });

  it("approveVendor throws on failure", async () => {
    mockVendorsApi.approveVendor.mockResolvedValue({ success: false, data: undefined, error: "Cannot approve" });

    await expect(vendorsService.approveVendor("1")).rejects.toThrow("Cannot approve");
  });

  it("approveVendor succeeds on success", async () => {
    mockVendorsApi.approveVendor.mockResolvedValue({ success: true, data: undefined });

    await expect(vendorsService.approveVendor("1")).resolves.not.toThrow();
  });

  it("rejectVendor throws on failure", async () => {
    mockVendorsApi.rejectVendor.mockResolvedValue({ success: false, data: undefined, error: "Already approved" });

    await expect(vendorsService.rejectVendor("1", "Duplicate")).rejects.toThrow("Already approved");
    expect(mockVendorsApi.rejectVendor).toHaveBeenCalledWith("1", "Duplicate");
  });
});

// ── Vendor Products ─────────────────────────────────────────

describe("vendor products", () => {
  it("getVendorProducts returns paginated results", async () => {
    const products = [{ id: "p1", name: "Product A", vendorId: "1", price: 100, status: "active" as const }];
    mockVendorsApi.getVendorProducts.mockResolvedValue({ success: true, data: products, meta: mockMeta });

    const result = await vendorsService.getVendorProducts({ vendorId: "1" }, 1, 10);

    expect(result.data).toHaveLength(1);
    expect(mockVendorsApi.getVendorProducts).toHaveBeenCalledWith({ vendorId: "1" }, 1, 10);
  });

  it("getProductSummary returns summary", async () => {
    const summary = { totalProducts: 500, activeProducts: 400, outOfStockCount: 20, inactiveCount: 80, avgMargin: 25, totalStockValue: 100000 };
    mockVendorsApi.getProductSummary.mockResolvedValue({ success: true, data: summary });

    const result = await vendorsService.getProductSummary();

    expect(result.totalProducts).toBe(500);
  });
});

// ── Settlements ─────────────────────────────────────────────

describe("settlements", () => {
  it("getSettlements returns paginated results", async () => {
    const settlements = [{ id: "st1", vendorId: "1", amount: 5000, status: "pending" as const, period: "2024-01" }];
    mockVendorsApi.getSettlements.mockResolvedValue({ success: true, data: settlements, meta: mockMeta });

    const result = await vendorsService.getSettlements({ status: "pending" }, 1, 10);

    expect(result.data).toHaveLength(1);
  });

  it("getSettlementSummary returns summary", async () => {
    const summary = { totalPending: 50000, totalPaid: 200000, pendingCount: 10, paidCount: 40 };
    mockVendorsApi.getSettlementSummary.mockResolvedValue({ success: true, data: summary });

    const result = await vendorsService.getSettlementSummary();

    expect(result.totalPending).toBe(50000);
  });

  it("processSettlement throws on failure", async () => {
    mockVendorsApi.processSettlement.mockResolvedValue({ success: false, data: undefined, error: "Insufficient balance" });

    await expect(vendorsService.processSettlement("st1")).rejects.toThrow("Insufficient balance");
  });
});

// ── Vendor Analytics ────────────────────────────────────────

describe("vendor analytics", () => {
  it("getVendorAnalytics returns paginated results", async () => {
    const entries = [{ vendorId: "1", vendorName: "Acme", revenue: 50000, period: "2024-01" }];
    mockVendorsApi.getVendorAnalytics.mockResolvedValue({ success: true, data: entries, meta: mockMeta });

    const result = await vendorsService.getVendorAnalytics({ period: "2024-01" }, 1, 10);

    expect(result.data).toHaveLength(1);
  });

  it("getAnalyticsSummary returns summary", async () => {
    const summary = { totalRevenue: 500000, totalCommission: 50000, avgRating: 4.2, topVendor: "Acme" };
    mockVendorsApi.getAnalyticsSummary.mockResolvedValue({ success: true, data: summary });

    const result = await vendorsService.getAnalyticsSummary();

    expect(result.totalRevenue).toBe(500000);
  });
});

// ── Export ──────────────────────────────────────────────────

describe("exportVendors", () => {
  it("returns download URL on success", async () => {
    mockVendorsApi.exportVendors.mockResolvedValue({ success: true, data: { downloadUrl: "/exports/vendors.csv" } });

    const result = await vendorsService.exportVendors("csv");

    expect(result.success).toBe(true);
    expect(result.downloadUrl).toBe("/exports/vendors.csv");
    expect(mockVendorsApi.exportVendors).toHaveBeenCalledWith("csv");
  });

  it("propagates failure", async () => {
    mockVendorsApi.exportVendors.mockResolvedValue({ success: false, data: { downloadUrl: "" }, error: "Export failed" });

    const result = await vendorsService.exportVendors("pdf");

    expect(result.success).toBe(false);
  });
});
