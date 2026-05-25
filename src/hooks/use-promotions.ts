"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { promotionService } from "@/services/promotions.service";
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
  CampaignAnalytics,
} from "@/types/promotions";

// ── Promotions Hook ──────────────────────────────────────

export function usePromotions(initialFilters?: Partial<PromotionFilters>) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [summary, setSummary] = useState<{
    total: number; active: number; scheduled: number; expired: number; totalUsage: number; totalBudget: string;
  }>({ total: 0, active: 0, scheduled: 0, expired: 0, totalUsage: 0, totalBudget: "₹0" });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PromotionFilters>({
    search: "", type: "", status: "", ...initialFilters,
  });

  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await promotionService.getPromotions(filters, { page: pagination.page, pageSize: pagination.pageSize });
      setPromotions(result.promotions);
      setSummary(result.summary);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch promotions");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.type, filters.status, pagination.page, pagination.pageSize]);

  useEffect(() => { fetchPromotions(); }, [fetchPromotions]);

  const updateFilters = useCallback((update: Partial<PromotionFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => setPagination((prev) => ({ ...prev, page })), []);
  const setPageSize = useCallback((pageSize: number) => setPagination((prev) => ({ ...prev, page: 1, pageSize })), []);

  return { promotions, summary, pagination, loading, error, filters, updateFilters, fetchPromotions, setPage, setPageSize };
}

// ── Coupons Hook ─────────────────────────────────────────

export function useCoupons(initialFilters?: Partial<CouponFilters>) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [summary, setSummary] = useState({
    total: 0, active: 0, scheduled: 0, expired: 0, totalUsed: 0, totalIssued: 0,
  });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CouponFilters>({
    search: "", type: "", status: "", ...initialFilters,
  });

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await promotionService.getCoupons(filters, { page: pagination.page, pageSize: pagination.pageSize });
      setCoupons(result.coupons);
      setSummary(result.summary);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.type, filters.status, pagination.page, pagination.pageSize]);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const updateFilters = useCallback((update: Partial<CouponFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const generateCoupon = useCallback(async (data: Partial<Coupon>) => {
    try {
      const newCoupon = await promotionService.generateCoupon(data);
      await fetchCoupons();
      return newCoupon;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate coupon");
      return null;
    }
  }, [fetchCoupons]);

  const setPage = useCallback((page: number) => setPagination((prev) => ({ ...prev, page })), []);
  const setPageSize = useCallback((pageSize: number) => setPagination((prev) => ({ ...prev, page: 1, pageSize })), []);

  return { coupons, summary, pagination, loading, error, filters, updateFilters, fetchCoupons, generateCoupon, setPage, setPageSize };
}

// ── Flash Sales Hook ─────────────────────────────────────

export function useFlashSales() {
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
  const [summary, setSummary] = useState({ live: 0, scheduled: 0, completed: 0, totalBudget: "₹0" });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlashSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await promotionService.getFlashSales({ page: pagination.page, pageSize: pagination.pageSize });
      setFlashSales(result.flashSales);
      setSummary(result.summary);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch flash sales");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => { fetchFlashSales(); }, [fetchFlashSales]);

  const createFlashSale = useCallback(async (data: Partial<FlashSale>) => {
    try {
      const newFs = await promotionService.createFlashSale(data);
      await fetchFlashSales();
      return newFs;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create flash sale");
      return null;
    }
  }, [fetchFlashSales]);

  const setPage = useCallback((page: number) => setPagination((prev) => ({ ...prev, page })), []);
  const setPageSize = useCallback((pageSize: number) => setPagination((prev) => ({ ...prev, page: 1, pageSize })), []);

  return { flashSales, summary, pagination, loading, error, fetchFlashSales, createFlashSale, setPage, setPageSize };
}

// ── Campaigns Hook ───────────────────────────────────────

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [summary, setSummary] = useState({ active: 0, scheduled: 0, drafts: 0, totalReach: "0" });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await promotionService.getCampaigns({ page: pagination.page, pageSize: pagination.pageSize });
      setCampaigns(result.campaigns);
      setSummary(result.summary);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  const createCampaign = useCallback(async (data: Partial<Campaign>) => {
    try {
      const newCamp = await promotionService.createCampaign(data);
      await fetchCampaigns();
      return newCamp;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create campaign");
      return null;
    }
  }, [fetchCampaigns]);

  const updateCampaign = useCallback(async (id: string, data: Partial<Campaign>) => {
    try {
      const updated = await promotionService.updateCampaign(id, data);
      if (updated) setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
      return updated || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update campaign");
      return null;
    }
  }, []);

  const setPage = useCallback((page: number) => setPagination((prev) => ({ ...prev, page })), []);
  const setPageSize = useCallback((pageSize: number) => setPagination((prev) => ({ ...prev, page: 1, pageSize })), []);

  return { campaigns, summary, pagination, loading, error, fetchCampaigns, createCampaign, updateCampaign, setPage, setPageSize };
}

// ── Push Notifications Hook ──────────────────────────────

export function usePushNotifications() {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [summary, setSummary] = useState({ sent: 0, scheduled: 0, drafts: 0, avgOpenRate: "0%" });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await promotionService.getPushNotifications({ page: pagination.page, pageSize: pagination.pageSize });
      setNotifications(result.notifications);
      setSummary(result.summary);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const createNotification = useCallback(async (data: Partial<PushNotification>) => {
    try {
      const newNotif = await promotionService.createPushNotification(data);
      await fetchNotifications();
      return newNotif;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create notification");
      return null;
    }
  }, [fetchNotifications]);

  const setPage = useCallback((page: number) => setPagination((prev) => ({ ...prev, page })), []);
  const setPageSize = useCallback((pageSize: number) => setPagination((prev) => ({ ...prev, page: 1, pageSize })), []);

  return { notifications, summary, pagination, loading, error, fetchNotifications, createNotification, setPage, setPageSize };
}

// ── A/B Tests Hook ───────────────────────────────────────

export function useABTests(initialFilters?: Partial<ABTestFilters>) {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [summary, setSummary] = useState({ total: 0, running: 0, completed: 0, totalImpressions: 0 });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ABTestFilters>({
    search: "", status: "", ...initialFilters,
  });

  const fetchTests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await promotionService.getABTests(filters, { page: pagination.page, pageSize: pagination.pageSize });
      setTests(result.tests);
      setSummary(result.summary);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch A/B tests");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.status, pagination.page, pagination.pageSize]);

  useEffect(() => { fetchTests(); }, [fetchTests]);

  const updateFilters = useCallback((update: Partial<ABTestFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const createTest = useCallback(async (data: Partial<ABTest>) => {
    try {
      const newTest = await promotionService.createABTest(data);
      await fetchTests();
      return newTest;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create A/B test");
      return null;
    }
  }, [fetchTests]);

  const setPage = useCallback((page: number) => setPagination((prev) => ({ ...prev, page })), []);
  const setPageSize = useCallback((pageSize: number) => setPagination((prev) => ({ ...prev, page: 1, pageSize })), []);

  return { tests, summary, pagination, loading, error, filters, updateFilters, fetchTests, createTest, setPage, setPageSize };
}

// ── Campaign Analytics Hook ──────────────────────────────

export function useCampaignAnalytics() {
  const [analytics, setAnalytics] = useState<CampaignAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await promotionService.getCampaignAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch campaign analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  return { analytics, loading, error, fetchAnalytics };
}
