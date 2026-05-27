// ── Promotions & Campaign Management Service Layer ──────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Currently uses mock data. To connect to real backend:
// 1. Uncomment the axios.get/post/put/delete calls
// 2. Set NEXT_PUBLIC_API_BASE_URL
// 3. Remove mock data import and delay helper

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
import {
  mockPromotions,
  mockCoupons,
  mockFlashSales,
  mockCampaigns,
  mockPushNotifications,
  mockABTests,
} from "@/data/admin/promotions";

// ── Helpers ──────────────────────────────────────────────

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function filterBySearch<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  const q = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => String(item[field] ?? "").toLowerCase().includes(q))
  );
}

function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

// ── Promotion Service ────────────────────────────────────

export const promotionService = {
  // ── Promotions ─────────────────────────────────────────

  async getPromotions(
    filters: Partial<PromotionFilters> = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ): Promise<PromotionsListResponse> {
    await delay(200);

    let filtered = [...mockPromotions];

    if (filters.search) {
      filtered = filterBySearch(filtered, filters.search, ["name", "id"]);
    }
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((p) => p.type === filters.type);
    }
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    const total = filtered.length;
    const paged = paginate(filtered, pagination.page, pagination.pageSize);

    const active = mockPromotions.filter((p) => p.status === "active").length;
    const scheduled = mockPromotions.filter((p) => p.status === "scheduled").length;
    const expired = mockPromotions.filter((p) => p.status === "expired").length;
    const totalUsage = mockPromotions.reduce((s, p) => s + p.usageCount, 0);

    return {
      promotions: paged,
      pagination: { page: pagination.page, pageSize: pagination.pageSize, total },
      summary: { total, active, scheduled, expired, totalUsage, totalBudget: "₹18.70L" },
    };
  },

  async getPromotionById(id: string): Promise<Promotion | undefined> {
    await delay(150);
    return mockPromotions.find((p) => p.id === id);
  },

  async createPromotion(data: Partial<Promotion>): Promise<Promotion> {
    await delay(400);
    const now = new Date().toISOString().split("T")[0];
    const newPromotion: Promotion = {
      id: `PROMO-${String(mockPromotions.length + 1).padStart(3, "0")}`,
      name: data.name || "",
      description: data.description || "",
      type: data.type || "discount",
      discountType: data.discountType || "percentage",
      discountValue: data.discountValue ?? 0,
      minOrder: data.minOrder,
      maxDiscount: data.maxDiscount,
      usageLimit: data.usageLimit ?? 0,
      usageCount: 0,
      startDate: data.startDate || now,
      endDate: data.endDate || now,
      status: data.status || "draft",
      applicableCategories: data.applicableCategories || [],
      applicableProducts: data.applicableProducts || [],
      budget: data.budget || "₹0",
      spent: "₹0",
      createdBy: "Admin",
      createdAt: now,
      updatedAt: now,
    };
    return newPromotion;
  },

  async updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion | undefined> {
    await delay(300);
    const idx = mockPromotions.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    mockPromotions[idx] = {
      ...mockPromotions[idx],
      ...data,
      updatedAt: new Date().toISOString().split("T")[0],
    };
    return mockPromotions[idx];
  },

  async deletePromotion(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockPromotions.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    mockPromotions.splice(idx, 1);
    return true;
  },

  // ── Coupons ────────────────────────────────────────────

  async getCoupons(
    filters: Partial<CouponFilters> = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ): Promise<CouponsListResponse> {
    await delay(200);

    let filtered = [...mockCoupons];

    if (filters.search) {
      filtered = filterBySearch(filtered, filters.search, ["code", "id"]);
    }
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((c) => c.type === filters.type);
    }
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    const total = filtered.length;
    const paged = paginate(filtered, pagination.page, pagination.pageSize);

    return {
      coupons: paged,
      pagination: { page: pagination.page, pageSize: pagination.pageSize, total },
      summary: {
        total,
        active: mockCoupons.filter((c) => c.status === "active").length,
        scheduled: mockCoupons.filter((c) => c.status === "scheduled").length,
        expired: mockCoupons.filter((c) => c.status === "expired").length,
        totalUsed: mockCoupons.reduce((s, c) => s + c.totalUsed, 0),
        totalIssued: mockCoupons.reduce((s, c) => s + c.totalIssued, 0),
      },
    };
  },

  async generateCoupon(data: Partial<Coupon>): Promise<Coupon> {
    await delay(500);
    const now = new Date().toISOString().split("T")[0];
    const code = data.code || `PROMO${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newCoupon: Coupon = {
      id: `CPN-${String(mockCoupons.length + 1).padStart(3, "0")}`,
      code,
      type: data.type || "public",
      discount: data.discount || "",
      discountType: data.discountType || "percentage",
      discountValue: data.discountValue ?? 0,
      minOrder: data.minOrder ?? 0,
      maxDiscount: data.maxDiscount,
      totalIssued: data.totalIssued ?? 1000,
      totalUsed: 0,
      perUserLimit: data.perUserLimit ?? 1,
      status: data.status || "active",
      startDate: data.startDate || now,
      endDate: data.endDate || now,
      createdBy: "Admin",
      createdAt: now,
    };
    mockCoupons.unshift(newCoupon);
    return newCoupon;
  },

  async updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon | undefined> {
    await delay(300);
    const idx = mockCoupons.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    mockCoupons[idx] = { ...mockCoupons[idx], ...data };
    return mockCoupons[idx];
  },

  async deleteCoupon(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockCoupons.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    mockCoupons.splice(idx, 1);
    return true;
  },

  // ── Flash Sales ────────────────────────────────────────

  async getFlashSales(pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }) {
    await delay(200);
    const filtered = [...mockFlashSales];
    const total = filtered.length;
    const paged = paginate(filtered, pagination.page, pagination.pageSize);
    return {
      flashSales: paged,
      pagination: { page: pagination.page, pageSize: pagination.pageSize, total },
      summary: {
        live: filtered.filter((f) => f.status === "live").length,
        scheduled: filtered.filter((f) => f.status === "scheduled").length,
        completed: filtered.filter((f) => f.status === "completed").length,
        totalBudget: "₹2.20L",
      },
    };
  },

  async createFlashSale(data: Partial<FlashSale>): Promise<FlashSale> {
    await delay(400);
    const now = new Date().toISOString().replace("T", " ").slice(0, 16);
    const newFs: FlashSale = {
      id: `FS-${String(mockFlashSales.length + 1).padStart(3, "0")}`,
      name: data.name || "",
      description: data.description || "",
      discount: data.discount || `${data.discountValue}% Off`,
      discountType: data.discountType || "percentage",
      discountValue: data.discountValue ?? 0,
      productCount: data.productCount ?? 0,
      products: data.products || [],
      startDate: data.startDate || now,
      endDate: data.endDate || now,
      status: data.status || "scheduled",
      budget: data.budget || "₹0",
      spent: "₹0",
      createdBy: "Admin",
      createdAt: now,
    };
    mockFlashSales.unshift(newFs);
    return newFs;
  },

  async updateFlashSale(id: string, data: Partial<FlashSale>): Promise<FlashSale | undefined> {
    await delay(300);
    const idx = mockFlashSales.findIndex((f) => f.id === id);
    if (idx === -1) return undefined;
    mockFlashSales[idx] = { ...mockFlashSales[idx], ...data };
    return mockFlashSales[idx];
  },

  async deleteFlashSale(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockFlashSales.findIndex((f) => f.id === id);
    if (idx === -1) return false;
    mockFlashSales.splice(idx, 1);
    return true;
  },

  // ── Campaigns ──────────────────────────────────────────

  async getCampaigns(pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }) {
    await delay(200);
    const total = mockCampaigns.length;
    const paged = paginate(mockCampaigns, pagination.page, pagination.pageSize);
    const summary = {
      active: mockCampaigns.filter((c) => c.status === "active").length,
      scheduled: mockCampaigns.filter((c) => c.status === "scheduled").length,
      drafts: mockCampaigns.filter((c) => c.status === "draft").length,
      totalReach: mockCampaigns.reduce((s, c) => {
        const num = parseInt(c.sent.replace(/,/g, ""));
        return s + (isNaN(num) ? 0 : num);
      }, 0).toLocaleString(),
    };
    return {
      campaigns: paged,
      pagination: { page: pagination.page, pageSize: pagination.pageSize, total },
      summary,
    };
  },

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    await delay(400);
    const now = new Date().toISOString().split("T")[0];
    const newCamp: Campaign = {
      id: `CAMP-${String(mockCampaigns.length + 1).padStart(3, "0")}`,
      name: data.name || "",
      description: data.description || "",
      channels: data.channels || ["push"],
      audience: data.audience || "All Users",
      audienceTarget: data.audienceTarget || "all_users",
      budget: data.budget || "₹0",
      status: data.status || "draft",
      sent: "—",
      opens: "—",
      clicks: "—",
      startDate: data.startDate || now,
      endDate: data.endDate || now,
      createdBy: "Admin",
      createdAt: now,
    };
    mockCampaigns.unshift(newCamp);
    return newCamp;
  },

  async updateCampaign(id: string, data: Partial<Campaign>): Promise<Campaign | undefined> {
    await delay(300);
    const idx = mockCampaigns.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    mockCampaigns[idx] = { ...mockCampaigns[idx], ...data };
    return mockCampaigns[idx];
  },

  async deleteCampaign(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockCampaigns.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    mockCampaigns.splice(idx, 1);
    return true;
  },

  // ── Push Notifications ─────────────────────────────────

  async getPushNotifications(pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }) {
    await delay(200);
    const total = mockPushNotifications.length;
    const paged = paginate(mockPushNotifications, pagination.page, pagination.pageSize);
    return {
      notifications: paged,
      pagination: { page: pagination.page, pageSize: pagination.pageSize, total },
      summary: {
        sent: mockPushNotifications.filter((n) => n.status === "sent").length,
        scheduled: mockPushNotifications.filter((n) => n.status === "scheduled").length,
        drafts: mockPushNotifications.filter((n) => n.status === "draft").length,
        avgOpenRate: "42.5%",
      },
    };
  },

  async createPushNotification(data: Partial<PushNotification>): Promise<PushNotification> {
    await delay(400);
    const now = new Date().toISOString().split("T")[0];
    const newNotif: PushNotification = {
      id: `PN-${String(mockPushNotifications.length + 1).padStart(3, "0")}`,
      title: data.title || "",
      body: data.body || "",
      audience: data.audience || "All Users",
      audienceTarget: data.audienceTarget || "all_users",
      imageUrl: data.imageUrl,
      deepLink: data.deepLink,
      status: data.status || "draft",
      sent: "—",
      opened: "—",
      clicked: "—",
      scheduledAt: data.scheduledAt || "—",
      sentAt: data.sentAt || "—",
      createdBy: "Admin",
      createdAt: now,
    };
    mockPushNotifications.unshift(newNotif);
    return newNotif;
  },

  async updatePushNotification(id: string, data: Partial<PushNotification>): Promise<PushNotification | undefined> {
    await delay(300);
    const idx = mockPushNotifications.findIndex((n) => n.id === id);
    if (idx === -1) return undefined;
    mockPushNotifications[idx] = { ...mockPushNotifications[idx], ...data };
    return mockPushNotifications[idx];
  },

  async deletePushNotification(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockPushNotifications.findIndex((n) => n.id === id);
    if (idx === -1) return false;
    mockPushNotifications.splice(idx, 1);
    return true;
  },

  // ── A/B Tests ──────────────────────────────────────────

  async getABTests(
    filters: Partial<ABTestFilters> = {},
    pagination: { page: number; pageSize: number } = { page: 1, pageSize: 10 }
  ) {
    await delay(200);

    let filtered = [...mockABTests];

    if (filters.search) {
      filtered = filterBySearch(filtered, filters.search, ["name", "id"]);
    }
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((t) => t.status === filters.status);
    }

    const total = filtered.length;
    const paged = paginate(filtered, pagination.page, pagination.pageSize);

    return {
      tests: paged,
      pagination: { page: pagination.page, pageSize: pagination.pageSize, total },
      summary: {
        total: mockABTests.length,
        running: mockABTests.filter((t) => t.status === "running").length,
        completed: mockABTests.filter((t) => t.status === "completed").length,
        totalImpressions: mockABTests.reduce((s, t) => s + t.totalImpressions, 0),
      },
    };
  },

  async createABTest(data: Partial<ABTest>): Promise<ABTest> {
    await delay(400);
    const now = new Date().toISOString().split("T")[0];
    const newTest: ABTest = {
      id: `AB-${String(mockABTests.length + 1).padStart(3, "0")}`,
      name: data.name || "",
      description: data.description || "",
      variantA: { label: data.variantA?.label || "Variant A", impressions: 0, conversions: 0, revenue: "₹0", conversionRate: "—" },
      variantB: { label: data.variantB?.label || "Variant B", impressions: 0, conversions: 0, revenue: "₹0", conversionRate: "—" },
      audience: data.audience || "50% each",
      totalImpressions: 0,
      winner: null,
      confidence: 0,
      status: data.status || "draft",
      startedAt: now,
      endedAt: null,
      createdBy: "Admin",
      createdAt: now,
    };
    mockABTests.unshift(newTest);
    return newTest;
  },

  async updateABTest(id: string, data: Partial<ABTest>): Promise<ABTest | undefined> {
    await delay(300);
    const idx = mockABTests.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    mockABTests[idx] = { ...mockABTests[idx], ...data };
    return mockABTests[idx];
  },

  async deleteABTest(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockABTests.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    mockABTests.splice(idx, 1);
    return true;
  },

  // ── Campaign Analytics ─────────────────────────────────

  async getCampaignAnalytics(): Promise<CampaignAnalytics> {
    await delay(200);
    const totalRevenue = mockPromotions.reduce((s, p) => {
      const spentNum = parseInt(p.spent.replace(/[₹,K]/g, "")) * (p.spent.includes("K") ? 1000 : 1);
      return s + spentNum;
    }, 0);
    const activePromos = mockPromotions.filter((p) => p.status === "active").length;
    const scheduledPromos = mockPromotions.filter((p) => p.status === "scheduled").length;
    const totalUsage = mockPromotions.reduce((s, p) => s + p.usageCount, 0);

    const promotionsByType: Record<string, number> = {};
    mockPromotions.forEach((p) => {
      promotionsByType[p.type] = (promotionsByType[p.type] || 0) + 1;
    });

    const promotionsByStatus: Record<string, number> = {};
    mockPromotions.forEach((p) => {
      promotionsByStatus[p.status] = (promotionsByStatus[p.status] || 0) + 1;
    });

    return {
      totalPromotions: mockPromotions.length,
      activePromotions: activePromos,
      scheduledPromotions: scheduledPromos,
      totalUsage,
      totalRevenue: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      avgConversionRate: "24.7%",
      totalReach: "142,680",
      promotionsByType,
      promotionsByStatus,
      topPromotions: [...mockPromotions]
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 5)
        .map((p) => ({
          id: p.id,
          name: p.name,
          usageCount: p.usageCount,
          revenue: p.spent,
        })),
      recentActivity: [
        { date: "2026-05-25", action: "Created", description: "Monsoon Discount - Beverages" },
        { date: "2026-05-22", action: "Started", description: "Weekend Special flash sale" },
        { date: "2026-05-21", action: "Updated", description: "Summer Sale 40% Off budget increased" },
        { date: "2026-05-20", action: "Scheduled", description: "Flash Sale - Dairy Products" },
        { date: "2026-05-18", action: "Completed", description: "Midnight Snacks flash sale ended" },
      ],
    };
  },
};
