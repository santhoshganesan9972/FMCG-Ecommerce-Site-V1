// ── Promotions Service Tests ────────────────────────────────
// Tests the service layer for promotions, coupons, flash sales,
// campaigns, push notifications, A/B tests, and campaign analytics.

import { describe, it, expect, beforeEach } from "vitest";
import { mockPromotionsApi, resetMocks } from "./setup";
import { promotionService } from "../promotions.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };
const mockSummary = { total: 1, active: 1, scheduled: 0, expired: 0, totalDiscount: 500 };
const mockPromotion = { id: "1", name: "Summer Sale", type: "percentage" as const, discountValue: 20, status: "active" as const };

// ── Promotions CRUD ─────────────────────────────────────────

describe("getPromotions", () => {
  it("unwraps paginated promotions with summary on success", async () => {
    mockPromotionsApi.getPromotions.mockResolvedValue({
      success: true,
      data: [mockPromotion],
      meta: mockMeta,
      summary: mockSummary,
    });

    const result = await promotionService.getPromotions({ status: "active" }, { page: 1, pageSize: 10 });

    expect(result.promotions).toEqual([mockPromotion]);
    expect(result.pagination).toEqual({ page: 1, pageSize: 10, total: 1 });
    expect(result.summary.active).toBe(1);
    expect(mockPromotionsApi.getPromotions).toHaveBeenCalledWith({ status: "active" }, { page: 1, pageSize: 10 });
  });

  it("uses defaults when no args provided", async () => {
    mockPromotionsApi.getPromotions.mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      summary: { total: 0, active: 0, scheduled: 0, expired: 0, totalDiscount: 0 },
    });

    const result = await promotionService.getPromotions();

    expect(result.promotions).toEqual([]);
    expect(result.pagination.total).toBe(0);
  });
});

describe("getPromotionById", () => {
  it("returns promotion on success", async () => {
    mockPromotionsApi.getPromotionById.mockResolvedValue({ success: true, data: mockPromotion });

    const result = await promotionService.getPromotionById("1");

    expect(result).toEqual(mockPromotion);
  });

  it("returns undefined on failure", async () => {
    mockPromotionsApi.getPromotionById.mockResolvedValue({ success: false, data: undefined, error: "Not found" });

    const result = await promotionService.getPromotionById("999");

    expect(result).toBeUndefined();
  });
});

describe("createPromotion", () => {
  it("returns created promotion on success", async () => {
    const created = { ...mockPromotion, id: "2", name: "New Sale" };
    mockPromotionsApi.createPromotion.mockResolvedValue({ success: true, data: created });

    const result = await promotionService.createPromotion({ name: "New Sale", discountValue: 15 });

    expect(result.name).toBe("New Sale");
    expect(mockPromotionsApi.createPromotion).toHaveBeenCalledWith({ name: "New Sale", discountValue: 15 });
  });
});

describe("updatePromotion", () => {
  it("returns updated promotion on success", async () => {
    const updated = { ...mockPromotion, name: "Updated Sale" };
    mockPromotionsApi.updatePromotion.mockResolvedValue({ success: true, data: updated });

    const result = await promotionService.updatePromotion("1", { name: "Updated Sale" });

    expect(result?.name).toBe("Updated Sale");
  });
});

describe("deletePromotion", () => {
  it("returns true on success", async () => {
    mockPromotionsApi.deletePromotion.mockResolvedValue({ success: true, data: true });

    expect(await promotionService.deletePromotion("1")).toBe(true);
  });

  it("returns false on failure", async () => {
    mockPromotionsApi.deletePromotion.mockResolvedValue({ success: false, data: false, error: "Failed" });

    expect(await promotionService.deletePromotion("1")).toBe(false);
  });
});

// ── Coupons ─────────────────────────────────────────────────

describe("coupons", () => {
  it("getCoupons unwraps paginated coupons with summary", async () => {
    const coupons = [{ id: "c1", code: "SAVE20", discountValue: 20, status: "active" as const }];
    mockPromotionsApi.getCoupons.mockResolvedValue({ success: true, data: coupons, meta: mockMeta, summary: { total: 1, active: 1, expired: 0, used: 0, totalDiscount: 0 } });

    const result = await promotionService.getCoupons({ status: "active" }, { page: 1, pageSize: 10 });

    expect(result.coupons).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
  });

  it("generateCoupon returns created coupon", async () => {
    const coupon = { id: "c2", code: "NEW10", discountValue: 10, status: "active" as const };
    mockPromotionsApi.generateCoupon.mockResolvedValue({ success: true, data: coupon });

    const result = await promotionService.generateCoupon({ discountValue: 10 });

    expect(result.code).toBe("NEW10");
    expect(mockPromotionsApi.generateCoupon).toHaveBeenCalledWith({ discountValue: 10 });
  });

  it("updateCoupon returns updated coupon", async () => {
    mockPromotionsApi.updateCoupon.mockResolvedValue({ success: true, data: { id: "c1", discountValue: 25 } });

    const result = await promotionService.updateCoupon("c1", { discountValue: 25 });

    expect(result?.discountValue).toBe(25);
  });

  it("deleteCoupon returns boolean", async () => {
    mockPromotionsApi.deleteCoupon.mockResolvedValue({ success: true, data: true });

    expect(await promotionService.deleteCoupon("c1")).toBe(true);
  });
});

// ── Flash Sales ─────────────────────────────────────────────

describe("flash sales", () => {
  it("getFlashSales unwraps paginated flash sales with summary", async () => {
    const sales = [{ id: "f1", name: "Flash Deal", status: "active" as const, startTime: "2024-01-01T00:00:00Z", endTime: "2024-01-02T00:00:00Z" }];
    mockPromotionsApi.getFlashSales.mockResolvedValue({ success: true, data: sales, meta: mockMeta, summary: { total: 1, active: 1, scheduled: 0, ended: 0 } });

    const result = await promotionService.getFlashSales({ page: 1, pageSize: 10 });

    expect(result.flashSales).toHaveLength(1);
    expect(result.summary.active).toBe(1);
  });

  it("createFlashSale returns created sale", async () => {
    const sale = { id: "f2", name: "New Flash", status: "scheduled" as const };
    mockPromotionsApi.createFlashSale.mockResolvedValue({ success: true, data: sale });

    const result = await promotionService.createFlashSale({ name: "New Flash" });

    expect(result.id).toBe("f2");
  });

  it("updateFlashSale returns updated sale", async () => {
    mockPromotionsApi.updateFlashSale.mockResolvedValue({ success: true, data: { id: "f1", name: "Updated Flash" } });

    const result = await promotionService.updateFlashSale("f1", { name: "Updated Flash" });

    expect(result?.name).toBe("Updated Flash");
  });

  it("deleteFlashSale returns boolean", async () => {
    mockPromotionsApi.deleteFlashSale.mockResolvedValue({ success: true, data: true });

    expect(await promotionService.deleteFlashSale("f1")).toBe(true);
  });
});

// ── Campaigns ───────────────────────────────────────────────

describe("campaigns", () => {
  it("getCampaigns unwraps paginated campaigns with summary", async () => {
    const campaigns = [{ id: "cmp1", name: "Holiday Campaign", status: "active" as const }];
    mockPromotionsApi.getCampaigns.mockResolvedValue({ success: true, data: campaigns, meta: mockMeta, summary: { total: 1, active: 1, scheduled: 0, ended: 0 } });

    const result = await promotionService.getCampaigns({ page: 1, pageSize: 10 });

    expect(result.campaigns).toHaveLength(1);
  });

  it("createCampaign returns created campaign", async () => {
    mockPromotionsApi.createCampaign.mockResolvedValue({ success: true, data: { id: "cmp2", name: "New Campaign" } });

    const result = await promotionService.createCampaign({ name: "New Campaign" });

    expect(result.name).toBe("New Campaign");
  });

  it("updateCampaign returns updated campaign", async () => {
    mockPromotionsApi.updateCampaign.mockResolvedValue({ success: true, data: { id: "cmp1", name: "Updated" } });

    const result = await promotionService.updateCampaign("cmp1", { name: "Updated" });

    expect(result?.name).toBe("Updated");
  });

  it("deleteCampaign returns boolean", async () => {
    mockPromotionsApi.deleteCampaign.mockResolvedValue({ success: true, data: true });

    expect(await promotionService.deleteCampaign("cmp1")).toBe(true);
  });
});

// ── Push Notifications ──────────────────────────────────────

describe("push notifications", () => {
  it("getPushNotifications unwraps paginated results", async () => {
    const notifications = [{ id: "n1", title: "Sale Alert", status: "sent" as const }];
    mockPromotionsApi.getPushNotifications.mockResolvedValue({ success: true, data: notifications, meta: mockMeta, summary: { total: 1, sent: 1, scheduled: 0, draft: 0, failed: 0 } });

    const result = await promotionService.getPushNotifications({ page: 1, pageSize: 10 });

    expect(result.notifications).toHaveLength(1);
  });

  it("createPushNotification returns created notification", async () => {
    mockPromotionsApi.createPushNotification.mockResolvedValue({ success: true, data: { id: "n2", title: "New Alert" } });

    const result = await promotionService.createPushNotification({ title: "New Alert" });

    expect(result.title).toBe("New Alert");
  });

  it("updatePushNotification updates and returns", async () => {
    mockPromotionsApi.updatePushNotification.mockResolvedValue({ success: true, data: { id: "n1", title: "Updated" } });

    const result = await promotionService.updatePushNotification("n1", { title: "Updated" });

    expect(result?.title).toBe("Updated");
  });

  it("deletePushNotification returns boolean", async () => {
    mockPromotionsApi.deletePushNotification.mockResolvedValue({ success: true, data: true });

    expect(await promotionService.deletePushNotification("n1")).toBe(true);
  });
});

// ── A/B Tests ───────────────────────────────────────────────

describe("A/B tests", () => {
  it("getABTests unwraps paginated results with summary", async () => {
    const tests = [{ id: "ab1", name: "Banner Test", status: "running" as const }];
    mockPromotionsApi.getABTests.mockResolvedValue({ success: true, data: tests, meta: mockMeta, summary: { total: 1, running: 1, completed: 0, draft: 0 } });

    const result = await promotionService.getABTests({ status: "running" }, { page: 1, pageSize: 10 });

    expect(result.tests).toHaveLength(1);
    expect(result.summary.running).toBe(1);
  });

  it("createABTest returns created test", async () => {
    mockPromotionsApi.createABTest.mockResolvedValue({ success: true, data: { id: "ab2", name: "New Test" } });

    const result = await promotionService.createABTest({ name: "New Test" });

    expect(result.name).toBe("New Test");
  });

  it("updateABTest returns updated test", async () => {
    mockPromotionsApi.updateABTest.mockResolvedValue({ success: true, data: { id: "ab1", name: "Updated" } });

    const result = await promotionService.updateABTest("ab1", { name: "Updated" });

    expect(result?.name).toBe("Updated");
  });

  it("deleteABTest returns boolean", async () => {
    mockPromotionsApi.deleteABTest.mockResolvedValue({ success: true, data: true });

    expect(await promotionService.deleteABTest("ab1")).toBe(true);
  });
});

// ── Campaign Analytics ──────────────────────────────────────

describe("getCampaignAnalytics", () => {
  it("returns campaign analytics on success", async () => {
    const analytics = { totalCampaigns: 10, totalImpressions: 50000, totalClicks: 5000, totalConversions: 500, totalRevenue: 100000, avgROI: 2.5 };
    mockPromotionsApi.getCampaignAnalytics.mockResolvedValue({ success: true, data: analytics });

    const result = await promotionService.getCampaignAnalytics();

    expect(result.totalCampaigns).toBe(10);
    expect(result.avgROI).toBe(2.5);
  });
});
