// @vitest-environment jsdom
// ── usePromotions Hook Tests ─────────────────────────────────

import { vi } from "vitest";

const mockPromotionService = vi.hoisted(() => ({
  getPromotions: vi.fn(),
  getPromotionById: vi.fn(),
  createPromotion: vi.fn(),
  updatePromotion: vi.fn(),
  deletePromotion: vi.fn(),
  getCoupons: vi.fn(),
  generateCoupon: vi.fn(),
  updateCoupon: vi.fn(),
  deleteCoupon: vi.fn(),
  getFlashSales: vi.fn(),
  createFlashSale: vi.fn(),
  updateFlashSale: vi.fn(),
  deleteFlashSale: vi.fn(),
  getCampaigns: vi.fn(),
  createCampaign: vi.fn(),
  updateCampaign: vi.fn(),
  deleteCampaign: vi.fn(),
  getPushNotifications: vi.fn(),
  createPushNotification: vi.fn(),
  updatePushNotification: vi.fn(),
  deletePushNotification: vi.fn(),
  getABTests: vi.fn(),
  createABTest: vi.fn(),
  updateABTest: vi.fn(),
  deleteABTest: vi.fn(),
  getCampaignAnalytics: vi.fn(),
}));

vi.mock("@/services/promotions.service", () => ({
  promotionService: mockPromotionService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import {
  usePromotions, usePromotionForm, useCoupons,
  useFlashSales, useCampaigns, usePushNotifications,
  useABTests, useCampaignAnalytics,
} from "@/hooks/use-promotions";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

const mockPromotionsPage = {
  promotions: [
    { id: "pr-1", name: "Summer Sale", type: "percentage", value: 20, status: "active", startDate: "2025-06-01", endDate: "2025-06-30", usageCount: 500, budget: 50000, spent: 12000 },
    { id: "pr-2", name: "Clearance", type: "flat", value: 100, status: "active", startDate: "2025-06-15", endDate: "2025-07-15", usageCount: 200, budget: 30000, spent: 8000 },
  ],
  summary: { total: 2, active: 2, scheduled: 0, expired: 0, totalBudget: 80000, totalSpent: 20000 },
  pagination: { page: 1, pageSize: 10, total: 2 },
};

describe("usePromotions", () => {
  it("returns promotions on success", async () => {
    mockPromotionService.getPromotions.mockResolvedValue(mockPromotionsPage);
    const { result } = renderWithQuery(() => usePromotions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.promotions).toHaveLength(2);
    expect(result.current.pagination.total).toBe(2);
  });

  it("returns error on failure", async () => {
    mockPromotionService.getPromotions.mockRejectedValue(new Error("Promotions API error"));
    const { result } = renderWithQuery(() => usePromotions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Promotions API error");
    expect(result.current.promotions).toEqual([]);
  });
});

describe("usePromotionForm", () => {
  it("create succeeds", async () => {
    mockPromotionService.createPromotion.mockResolvedValue({ id: "pr-new", name: "New Sale" });
    const { result } = renderWithQuery(() => usePromotionForm());

    const promo = await result.current.createPromotion({ name: "New Sale", type: "percentage", value: 10 } as never);
    expect(promo?.name).toBe("New Sale");
  });

  it("deletePromotion succeeds", async () => {
    mockPromotionService.deletePromotion.mockResolvedValue(true);
    const { result } = renderWithQuery(() => usePromotionForm());

    const success = await result.current.deletePromotion("pr-1");
    expect(success).toBe(true);
  });

  it("deletePromotion returns false on failure", async () => {
    mockPromotionService.deletePromotion.mockRejectedValue(new Error("Delete failed"));
    const { result } = renderWithQuery(() => usePromotionForm());

    const success = await result.current.deletePromotion("pr-1");
    expect(success).toBe(false);
  });
});

describe("useCoupons", () => {
  it("returns coupons with pagination", async () => {
    mockPromotionService.getCoupons.mockResolvedValue({
      coupons: [{ id: "c-1", code: "SAVE10", discount: 10, type: "percentage", status: "active", usageCount: 50, maxUsage: 100, expiresAt: "2025-07-01" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useCoupons());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.coupons).toHaveLength(1);
    expect(result.current.pagination.total).toBe(1);
  });

  it("generateCoupon calls mutation", async () => {
    mockPromotionService.generateCoupon.mockResolvedValue({ id: "c-new", code: "NEW10" });
    const { result } = renderWithQuery(() => useCoupons());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const coupon = await result.current.generateCoupon({ discount: 10, type: "percentage" } as never);
    expect(coupon?.code).toBe("NEW10");
  });
});

describe("useFlashSales", () => {
  it("returns flash sales", async () => {
    mockPromotionService.getFlashSales.mockResolvedValue({
      sales: [{ id: "fs-1", name: "Flash Deal", discount: 30, status: "active", startTime: "2025-06-01T10:00:00Z", endTime: "2025-06-01T14:00:00Z" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useFlashSales());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.sales).toHaveLength(1);
  });
});

describe("useCampaigns", () => {
  it("returns campaigns", async () => {
    mockPromotionService.getCampaigns.mockResolvedValue({
      campaigns: [{ id: "camp-1", name: "Summer Campaign", status: "active", budget: 100000, spent: 45000, startDate: "2025-06-01", endDate: "2025-07-01" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useCampaigns());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.campaigns).toHaveLength(1);
  });
});

describe("usePushNotifications", () => {
  it("returns notifications", async () => {
    mockPromotionService.getPushNotifications.mockResolvedValue({
      notifications: [{ id: "pn-1", title: "Sale Alert", status: "sent", sentAt: "2025-05-28T10:00:00Z" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => usePushNotifications());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.notifications).toHaveLength(1);
  });
});

describe("useABTests", () => {
  it("returns A/B tests", async () => {
    mockPromotionService.getABTests.mockResolvedValue({
      tests: [{ id: "ab-1", name: "Homepage Banner", status: "running", variantA: "Old", variantB: "New", conversionsA: 100, conversionsB: 120 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useABTests());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.tests).toHaveLength(1);
  });
});

describe("useCampaignAnalytics", () => {
  it("returns analytics", async () => {
    mockPromotionService.getCampaignAnalytics.mockResolvedValue({
      totalCampaigns: 5, activeCampaigns: 3, totalBudget: 500000, totalSpent: 200000,
      roi: 150, impressions: 100000, clicks: 5000, conversions: 250,
    });
    const { result } = renderWithQuery(() => useCampaignAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.analytics).toBeTruthy();
  });
});
