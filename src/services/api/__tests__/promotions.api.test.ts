// ── Promotions API Adapter Tests ────────────────────────────
// Tests promotions, coupons, flash sales, campaigns,
// push notifications, A/B tests, and campaign analytics.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockDelete,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as promotionsApi from "../promotions.api";

beforeEach(() => resetMocks());

// ── Promotions CRUD ────────────────────────────────────────

describe("getPromotions", () => {
  it("returns promotions on success", async () => {
    const data = {
      items: [{ id: "1", name: "Summer Sale", status: "active" }],
      total: 1,
      summary: { total: 1, active: 1, scheduled: 0, expired: 0, totalUsage: 50, totalBudget: "$5000" },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await promotionsApi.getPromotions({ status: "active" }, { page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(result.data.items).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions", {
      params: { status: "active", page: 1, size: 10 },
    });
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load promotions"));

    const result = await promotionsApi.getPromotions();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load promotions");
  });
});

describe("getPromotionById", () => {
  it("returns a promotion on success", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", name: "Sale" } }));

    const result = await promotionsApi.getPromotionById("1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions/1");
  });
});

describe("createPromotion", () => {
  it("creates a promotion on success", async () => {
    const created = { id: "2", name: "New Sale", status: "draft" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: created }));

    const result = await promotionsApi.createPromotion({ name: "New Sale" });

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/promotions", { name: "New Sale" });
  });
});

describe("updatePromotion", () => {
  it("updates a promotion on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", name: "Updated" } }));

    const result = await promotionsApi.updatePromotion("1", { name: "Updated" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/promotions/1", { name: "Updated" });
  });
});

describe("deletePromotion", () => {
  it("deletes a promotion on success", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await promotionsApi.deletePromotion("1");

    expect(result.success).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith("/v1/admin/promotions/1");
  });
});

// ── Coupons ────────────────────────────────────────────────

describe("coupons", () => {
  it("getCoupons returns coupons", async () => {
    const data = {
      items: [{ id: "c1", code: "SAVE10", discountType: "percentage", discountValue: 10 }],
      total: 1,
      summary: { total: 1, active: 1 },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await promotionsApi.getCoupons();
    expect(result.success).toBe(true);
    expect(result.data.items).toHaveLength(1);
  });

  it("generateCoupon creates a coupon", async () => {
    const coupon = { id: "c2", code: "NEW20", discountType: "percentage", discountValue: 20 };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: coupon }));

    const result = await promotionsApi.generateCoupon({ code: "NEW20" });
    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/promotions/coupons", { code: "NEW20" });
  });

  it("updateCoupon updates coupon", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "c1", discountValue: 15 } }));
    const result = await promotionsApi.updateCoupon("c1", { discountValue: 15 });
    expect(result.success).toBe(true);
  });

  it("deleteCoupon deletes coupon", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));
    const result = await promotionsApi.deleteCoupon("c1");
    expect(result.success).toBe(true);
  });
});

// ── Flash Sales ────────────────────────────────────────────

describe("flash sales", () => {
  it("getFlashSales returns flash sales", async () => {
    const data = {
      items: [{ id: "fs1", name: "Flash Deal", status: "live" }],
      total: 1,
      summary: { live: 1, scheduled: 0, completed: 0, totalBudget: "$2000" },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await promotionsApi.getFlashSales();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions/flash-sales", {
      params: { page: 1, size: 10 },
    });
  });

  it("createFlashSale creates a flash sale", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "fs2", name: "New Deal" } }));
    const result = await promotionsApi.createFlashSale({ name: "New Deal" });
    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/promotions/flash-sales", { name: "New Deal" });
  });

  it("updateFlashSale updates a flash sale", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "fs1", name: "Updated" } }));
    const result = await promotionsApi.updateFlashSale("fs1", { name: "Updated" });
    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/promotions/flash-sales/fs1", { name: "Updated" });
  });

  it("deleteFlashSale deletes flash sale", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));
    const result = await promotionsApi.deleteFlashSale("fs1");
    expect(result.success).toBe(true);
  });
});

// ── Campaigns ──────────────────────────────────────────────

describe("campaigns", () => {
  it("getCampaigns returns campaigns", async () => {
    const data = {
      items: [{ id: "cmp1", name: "Holiday Campaign", status: "active" }],
      total: 1,
      summary: { active: 1, scheduled: 0, drafts: 0, totalReach: "50000" },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await promotionsApi.getCampaigns();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions/campaigns", {
      params: { page: 1, size: 10 },
    });
  });

  it("createCampaign creates a campaign", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "cmp2", name: "New Campaign" } }));
    const result = await promotionsApi.createCampaign({ name: "New Campaign" });
    expect(result.success).toBe(true);
  });

  it("deleteCampaign deletes campaign", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));
    const result = await promotionsApi.deleteCampaign("cmp1");
    expect(result.success).toBe(true);
  });
});

// ── Push Notifications ─────────────────────────────────────

describe("getPushNotifications", () => {
  it("returns push notifications on success", async () => {
    const data = {
      items: [{ id: "pn1", title: "Flash Sale!", status: "sent" }],
      total: 1,
      summary: { sent: 1, scheduled: 0, drafts: 0, avgOpenRate: "25%" },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await promotionsApi.getPushNotifications();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions/push-notifications", {
      params: { page: 1, size: 10 },
    });
  });
});

// ── A/B Tests ──────────────────────────────────────────────

describe("A/B tests", () => {
  it("getABTests returns tests", async () => {
    const data = {
      items: [{ id: "ab1", name: "Test A", variantA: "Control", variantB: "Variant" }],
      total: 1,
      summary: { total: 1, running: 1, completed: 0 },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await promotionsApi.getABTests();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions/ab-tests", {
      params: expect.objectContaining({ page: 1, size: 10 }),
    });
  });
});

// ── Campaign Analytics ─────────────────────────────────────

describe("getCampaignAnalytics", () => {
  it("returns campaign analytics on success", async () => {
    const analytics = {
      totalCampaigns: 10,
      totalReach: 100000,
      avgConversionRate: 3.5,
      totalRevenueAttributed: 50000,
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: analytics }));

    const result = await promotionsApi.getCampaignAnalytics();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/promotions/analytics");
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load campaign analytics"));

    const result = await promotionsApi.getCampaignAnalytics();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load campaign analytics");
  });
});
