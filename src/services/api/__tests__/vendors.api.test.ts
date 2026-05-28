// ── Vendors API Adapter Tests ───────────────────────────────
// Tests vendors CRUD, onboarding, vendor products,
// settlements, analytics, and exports.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as vendorsApi from "../vendors.api";

beforeEach(() => resetMocks());

// ── Vendors CRUD ───────────────────────────────────────────

describe("getVendors", () => {
  it("returns paginated vendors on success", async () => {
    const vendors = [{ id: "1", name: "Vendor A", status: "active" }];
    const response = { success: true, data: vendors, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await vendorsApi.getVendors({ status: "active" }, 1, 10);

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/vendors", {
      params: { status: "active", page: 1, size: 10 },
    });
  });

  it("returns paginated error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load vendors"));

    const result = await vendorsApi.getVendors();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.meta).toBeDefined();
  });
});

describe("getVendorById", () => {
  it("returns a vendor on success", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", name: "Vendor A" } }));

    const result = await vendorsApi.getVendorById("1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/vendors/1");
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Vendor not found"));

    const result = await vendorsApi.getVendorById("999");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Vendor not found");
  });
});

describe("getVendorSummary", () => {
  it("returns vendor summary on success", async () => {
    const summary = { totalVendors: 50, activeVendors: 40, pendingApprovals: 5 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: summary }));

    const result = await vendorsApi.getVendorSummary();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/vendors/summary");
  });
});

describe("createVendor", () => {
  it("creates a vendor on success", async () => {
    const created = { id: "2", name: "New Vendor", status: "pending" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: created }));

    const result = await vendorsApi.createVendor({ name: "New Vendor" });

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/vendors", { name: "New Vendor" });
  });
});

describe("updateVendorStatus", () => {
  it("updates status on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: undefined }));

    const result = await vendorsApi.updateVendorStatus("1", "active");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/vendors/1", { status: "active" });
  });
});

// ── Onboarding ─────────────────────────────────────────────

describe("onboarding", () => {
  it("getOnboardingApplications returns applications", async () => {
    const apps = [{ id: "a1", vendorName: "New Vendor", status: "pending" }];
    const response = { success: true, data: apps, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await vendorsApi.getOnboardingApplications({ status: "pending" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("getOnboardingSummary returns summary", async () => {
    const summary = { total: 20, pending: 5, approved: 10, rejected: 5 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: summary }));

    const result = await vendorsApi.getOnboardingSummary();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/vendors/onboarding/summary");
  });

  it("approveVendor approves application", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: undefined }));

    const result = await vendorsApi.approveVendor("a1");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/vendors/onboarding/a1/approve");
  });

  it("rejectVendor rejects with reason", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: undefined }));

    const result = await vendorsApi.rejectVendor("a1", "Incomplete documentation");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/vendors/onboarding/a1/reject", {
      reason: "Incomplete documentation",
    });
  });
});

// ── Vendor Products ────────────────────────────────────────

describe("vendor products", () => {
  it("getVendorProducts returns products", async () => {
    const products = [{ id: "p1", vendorId: "1", name: "Product A", status: "active" }];
    const response = { success: true, data: products, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await vendorsApi.getVendorProducts({ vendorId: "1" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("getVendorProductSummary returns summary", async () => {
    const summary = { totalProducts: 100, activeProducts: 80, outOfStockCount: 5, inactiveCount: 15, avgMargin: 25, totalStockValue: 500000 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: summary }));

    const result = await vendorsApi.getVendorProductSummary();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/vendors/products/summary");
  });
});

// ── Settlements ────────────────────────────────────────────

describe("settlements", () => {
  it("getSettlements returns settlements", async () => {
    const settlements = [{ id: "s1", vendorId: "1", amount: 5000, status: "pending" }];
    const response = { success: true, data: settlements, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await vendorsApi.getSettlements({ status: "pending" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("getSettlementSummary returns summary", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { totalPending: 50000, totalProcessed: 200000 } }));
    const result = await vendorsApi.getSettlementSummary();
    expect(result.success).toBe(true);
  });

  it("processSettlement processes settlement", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: undefined }));

    const result = await vendorsApi.processSettlement("s1");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/vendors/settlements/s1/process");
  });
});

// ── Analytics & Export ─────────────────────────────────────

describe("analytics and export", () => {
  it("getVendorAnalytics returns analytics", async () => {
    const analytics = [{ vendorId: "1", vendorName: "Vendor A", totalRevenue: 100000 }];
    const response = { success: true, data: analytics, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await vendorsApi.getVendorAnalytics();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("getVendorAnalyticsSummary returns summary", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { totalRevenue: 1000000, avgRating: 4.5 } }));
    const result = await vendorsApi.getVendorAnalyticsSummary();
    expect(result.success).toBe(true);
  });

  it("exportVendors returns download URL", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { downloadUrl: "https://cdn.example.com/export.csv" } }));

    const result = await vendorsApi.exportVendors("csv");

    expect(result.success).toBe(true);
    expect(result.data.downloadUrl).toBeTruthy();
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/vendors/export", {
      params: { format: "csv" },
    });
  });

  it("exportVendors returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to export vendors"));

    const result = await vendorsApi.exportVendors("pdf");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to export vendors");
  });
});
