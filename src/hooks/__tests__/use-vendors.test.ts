// @vitest-environment jsdom
// ── useVendors Hook Tests ────────────────────────────────────

import { vi } from "vitest";

const mockVendorService = vi.hoisted(() => ({
  getVendors: vi.fn(),
  getVendorSummary: vi.fn(),
  getOnboardingApplications: vi.fn(),
  getOnboardingSummary: vi.fn(),
  approveVendor: vi.fn(),
  rejectVendor: vi.fn(),
  getVendorProducts: vi.fn(),
  getProductSummary: vi.fn(),
  getSettlements: vi.fn(),
  getSettlementSummary: vi.fn(),
  processSettlement: vi.fn(),
  getVendorAnalytics: vi.fn(),
  getAnalyticsSummary: vi.fn(),
  exportVendors: vi.fn(),
}));

vi.mock("@/services/vendors.service", () => ({
  vendorsService: mockVendorService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import {
  useVendors, useVendorOnboarding, useVendorProducts,
  useVendorSettlements, useVendorAnalytics,
} from "@/hooks/use-vendors";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

// ── useVendors ────────────────────────────────────────────

const mockVendorsPage = {
  success: true,
  data: [
    { id: "v1", name: "Dairy Farm", contact: "Raju", email: "raju@dairy.com", phone: "1111111111", status: "active", category: "Dairy", rating: 4.5, totalOrders: 200, totalRevenue: 500000, joinedAt: "2024-01-01" },
    { id: "v2", name: "Bakery Hub", contact: "Sam", email: "sam@bakery.com", phone: "2222222222", status: "active", category: "Bakery", rating: 4.2, totalOrders: 150, totalRevenue: 300000, joinedAt: "2024-03-01" },
  ],
  meta: { page: 1, pageSize: 10, total: 2, totalPages: 1 },
};

const mockVendorsSummary = { total: 2, active: 2, pending: 0, suspended: 0, totalRevenue: 800000 };

describe("useVendors", () => {
  it("returns vendors on success", async () => {
    mockVendorService.getVendors.mockResolvedValue(mockVendorsPage);
    mockVendorService.getVendorSummary.mockResolvedValue(mockVendorsSummary);
    const { result } = renderWithQuery(() => useVendors());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toHaveLength(2);
    expect(result.current.summary?.totalRevenue).toBe(800000);
    expect(result.current.meta.total).toBe(2);
  });

  it("returns error on failure", async () => {
    mockVendorService.getVendors.mockRejectedValue(new Error("Vendors API error"));
    const { result } = renderWithQuery(() => useVendors());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Vendors API error");
    expect(result.current.data).toEqual([]);
  });

  it("goToPage works", async () => {
    mockVendorService.getVendors.mockResolvedValue(mockVendorsPage);
    mockVendorService.getVendorSummary.mockResolvedValue(mockVendorsSummary);
    const { result } = renderWithQuery(() => useVendors());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.goToPage(2));
    expect(result.current.meta.page).toBe(2);
  });

  it("activeFilterCount computes correctly", async () => {
    mockVendorService.getVendors.mockResolvedValue(mockVendorsPage);
    mockVendorService.getVendorSummary.mockResolvedValue(mockVendorsSummary);
    const { result } = renderWithQuery(() => useVendors());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.activeFilterCount).toBe(0);
    act(() => result.current.updateFilters({ status: "active" }));
    expect(result.current.activeFilterCount).toBeGreaterThan(0);
  });

  it("fetchData invalidates queries", async () => {
    mockVendorService.getVendors.mockResolvedValue(mockVendorsPage);
    mockVendorService.getVendorSummary.mockResolvedValue(mockVendorsSummary);
    const { result } = renderWithQuery(() => useVendors());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(() => result.current.fetchData()).not.toThrow();
  });
});

// ── useVendorOnboarding ─────────────────────────────────

describe("useVendorOnboarding", () => {
  it("returns applications and summary", async () => {
    mockVendorService.getOnboardingApplications.mockResolvedValue({
      success: true,
      data: [{ id: "app-1", vendorName: "New Vendor", status: "pending", submittedAt: "2025-05-28" }],
      meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
    });
    mockVendorService.getOnboardingSummary.mockResolvedValue({ total: 1, pending: 1, approved: 0, rejected: 0 });

    const { result } = renderWithQuery(() => useVendorOnboarding());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.summary?.total).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it("updateFilters updates filters", async () => {
    mockVendorService.getOnboardingApplications.mockResolvedValue({
      success: true, data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    });
    mockVendorService.getOnboardingSummary.mockResolvedValue({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const { result } = renderWithQuery(() => useVendorOnboarding());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.updateFilters({ search: "New" }));
    expect(result.current.filters.search).toBe("New");
  });
});

// ── useVendorProducts ─────────────────────────────────────

describe("useVendorProducts", () => {
  it("returns products and summary", async () => {
    mockVendorService.getVendorProducts.mockResolvedValue({
      success: true,
      data: [{ id: "p-1", name: "Farm Milk", price: 50, status: "active" }],
      meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
    });
    mockVendorService.getProductSummary.mockResolvedValue({ total: 1, active: 1, inactive: 0, outOfStock: 0 });

    const { result } = renderWithQuery(() => useVendorProducts({ vendorId: "v1" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.summary?.total).toBe(1);
  });

  it("returns error on failure", async () => {
    mockVendorService.getVendorProducts.mockRejectedValue(new Error("Products API error"));
    const { result } = renderWithQuery(() => useVendorProducts({ vendorId: "v1" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Products API error");
    expect(result.current.data).toEqual([]);
  });
});

// ── useVendorSettlements ─────────────────────────────────

describe("useVendorSettlements", () => {
  it("returns settlements and summary", async () => {
    mockVendorService.getSettlements.mockResolvedValue({
      success: true,
      data: [{ id: "st-1", vendorId: "v1", amount: 50000, status: "pending", dueDate: "2025-06-01" }],
      meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
    });
    mockVendorService.getSettlementSummary.mockResolvedValue({ total: 1, pending: 1, paid: 0, overdue: 0, totalAmount: 50000 });

    const { result } = renderWithQuery(() => useVendorSettlements());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.summary?.total).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it("processSettlement calls mutation", async () => {
    mockVendorService.getSettlements.mockResolvedValue({
      success: true, data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    });
    mockVendorService.getSettlementSummary.mockResolvedValue({ total: 0, pending: 0, paid: 0, overdue: 0, totalAmount: 0 });
    mockVendorService.processSettlement.mockResolvedValue({ id: "st-1", status: "paid" } as never);
    const { result } = renderWithQuery(() => useVendorSettlements());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await result.current.processSettlement("st-1");
    expect(mockVendorService.processSettlement).toHaveBeenCalledWith("st-1");
  });
});

// ── useVendorAnalytics ────────────────────────────────────

describe("useVendorAnalytics", () => {
  it("returns analytics and summary", async () => {
    mockVendorService.getVendorAnalytics.mockResolvedValue({
      success: true,
      data: [{ label: "Total Orders", value: 200 }],
      meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
    });
    mockVendorService.getAnalyticsSummary.mockResolvedValue({
      totalVendors: 50, activeVendors: 45, avgRating: 4.3, totalPayouts: 1000000,
    });

    const { result } = renderWithQuery(() => useVendorAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.summary?.totalVendors).toBe(50);
  });

  it("returns error on failure", async () => {
    mockVendorService.getVendorAnalytics.mockRejectedValue(new Error("Analytics API error"));
    const { result } = renderWithQuery(() => useVendorAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Analytics API error");
    expect(result.current.data).toEqual([]);
  });

  it("updateFilters filters correctly", async () => {
    mockVendorService.getVendorAnalytics.mockResolvedValue({
      success: true, data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    });
    mockVendorService.getAnalyticsSummary.mockResolvedValue({ totalVendors: 0, activeVendors: 0, avgRating: 0, totalPayouts: 0 });
    const { result } = renderWithQuery(() => useVendorAnalytics());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.updateFilters({ sortBy: "revenue" }));
    expect(result.current.filters.sortBy).toBe("revenue");
  });
});
