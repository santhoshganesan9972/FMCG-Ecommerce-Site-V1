// ── Promotions & Campaign Management Service Layer ──────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  Promotion,
  Coupon,
  FlashSale,
  Campaign,
  PushNotification,
  ABTest,
  PromotionFilters,
  CouponFilters,
  ABTestFilters,
  PromotionsListResponse,
  CouponsListResponse,
  CampaignAnalytics,
} from "@/types/promotions";
import { promotionsApi } from "@/services/api";

// ── Promotion Service ────────────────────────────────────

export const promotionService = {
  // ── Promotions ─────────────────────────────────────────

  async getPromotions(
    filters: Partial<PromotionFilters> = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ): Promise<PromotionsListResponse> {
    const res = await promotionsApi.getPromotions(filters, pagination);
    const meta = res.meta!;
    return {
      promotions: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async getPromotionById(id: string): Promise<Promotion | undefined> {
    const res = await promotionsApi.getPromotionById(id);
    return res.data;
  },

  async createPromotion(data: Partial<Promotion>): Promise<Promotion> {
    const res = await promotionsApi.createPromotion(data);
    return res.data;
  },

  async updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion | undefined> {
    const res = await promotionsApi.updatePromotion(id, data);
    return res.data;
  },

  async deletePromotion(id: string): Promise<boolean> {
    const res = await promotionsApi.deletePromotion(id);
    return res.success;
  },

  // ── Coupons ────────────────────────────────────────────

  async getCoupons(
    filters: Partial<CouponFilters> = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ): Promise<CouponsListResponse> {
    const res = await promotionsApi.getCoupons(filters, pagination);
    const meta = res.meta!;
    return {
      coupons: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async generateCoupon(data: Partial<Coupon>): Promise<Coupon> {
    const res = await promotionsApi.generateCoupon(data);
    return res.data;
  },

  async updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon | undefined> {
    const res = await promotionsApi.updateCoupon(id, data);
    return res.data;
  },

  async deleteCoupon(id: string): Promise<boolean> {
    const res = await promotionsApi.deleteCoupon(id);
    return res.success;
  },

  // ── Flash Sales ────────────────────────────────────────

  async getFlashSales(pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }) {
    const res = await promotionsApi.getFlashSales(pagination);
    const meta = res.meta!;
    return {
      flashSales: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async createFlashSale(data: Partial<FlashSale>): Promise<FlashSale> {
    const res = await promotionsApi.createFlashSale(data);
    return res.data;
  },

  async updateFlashSale(id: string, data: Partial<FlashSale>): Promise<FlashSale | undefined> {
    const res = await promotionsApi.updateFlashSale(id, data);
    return res.data;
  },

  async deleteFlashSale(id: string): Promise<boolean> {
    const res = await promotionsApi.deleteFlashSale(id);
    return res.success;
  },

  // ── Campaigns ──────────────────────────────────────────

  async getCampaigns(pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }) {
    const res = await promotionsApi.getCampaigns(pagination);
    const meta = res.meta!;
    return {
      campaigns: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    const res = await promotionsApi.createCampaign(data);
    return res.data;
  },

  async updateCampaign(id: string, data: Partial<Campaign>): Promise<Campaign | undefined> {
    const res = await promotionsApi.updateCampaign(id, data);
    return res.data;
  },

  async deleteCampaign(id: string): Promise<boolean> {
    const res = await promotionsApi.deleteCampaign(id);
    return res.success;
  },

  // ── Push Notifications ─────────────────────────────────

  async getPushNotifications(pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }) {
    const res = await promotionsApi.getPushNotifications(pagination);
    const meta = res.meta!;
    return {
      notifications: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async createPushNotification(data: Partial<PushNotification>): Promise<PushNotification> {
    const res = await promotionsApi.createPushNotification(data);
    return res.data;
  },

  async updatePushNotification(id: string, data: Partial<PushNotification>): Promise<PushNotification | undefined> {
    const res = await promotionsApi.updatePushNotification(id, data);
    return res.data;
  },

  async deletePushNotification(id: string): Promise<boolean> {
    const res = await promotionsApi.deletePushNotification(id);
    return res.success;
  },

  // ── A/B Tests ──────────────────────────────────────────

  async getABTests(
    filters: Partial<ABTestFilters> = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ) {
    const res = await promotionsApi.getABTests(filters, pagination);
    const meta = res.meta!;
    return {
      tests: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async createABTest(data: Partial<ABTest>): Promise<ABTest> {
    const res = await promotionsApi.createABTest(data);
    return res.data;
  },

  async updateABTest(id: string, data: Partial<ABTest>): Promise<ABTest | undefined> {
    const res = await promotionsApi.updateABTest(id, data);
    return res.data;
  },

  async deleteABTest(id: string): Promise<boolean> {
    const res = await promotionsApi.deleteABTest(id);
    return res.success;
  },

  // ── Campaign Analytics ─────────────────────────────────

  async getCampaignAnalytics(): Promise<CampaignAnalytics> {
    const res = await promotionsApi.getCampaignAnalytics();
    return res.data;
  },
};
