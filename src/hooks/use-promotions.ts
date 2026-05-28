// ── Promotions & Campaign Hooks ──────────────────────────
// Architecture: UI → Component → Hook → Service → API Adapter → Backend
// Now backed by TanStack Query for caching, retry, and invalidation.

"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { promotionService } from "@/services/promotions.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidatePromotionQueries } from "@/lib/react-query/invalidation";
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

// ── Shared helpers ────────────────────────────────────────

function usePromoPagination(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const setPageCb = useCallback((p: number) => setPage(p), []);
  const setPageSizeCb = useCallback((s: number) => { setPageSize(s); setPage(1); }, []);

  return { page, pageSize, setPage: setPageCb, setPageSize: setPageSizeCb };
}

// ── Promotions Hook ──────────────────────────────────────

export function usePromotions(initialFilters?: Partial<PromotionFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePromoPagination(10);
  const [filters, setFilters] = useState<PromotionFilters>({
    search: "", type: "", status: "", ...initialFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.list({ ...filters, page, pageSize }),
    queryFn: () => promotionService.getPromotions(filters, { page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const promotions = data?.promotions ?? [];
  const summary = data?.summary ?? {
    total: 0, active: 0, scheduled: 0, expired: 0, totalUsage: 0, totalBudget: "₹0",
  };
  const pagination = data?.pagination ?? { page, pageSize, total: 0 };

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<Promotion> }) =>
      promotionService.updatePromotion(id, updateData),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => promotionService.deletePromotion(id),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const updatePromotion = useCallback(
    async (id: string, data: Partial<Promotion>): Promise<Promotion | undefined | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deletePromotion = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        return await deleteMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const updateFilters = useCallback((update: Partial<PromotionFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPage(1);
  }, [setPage]);

  const fetchPromotions = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.promotions.all });
  }, [queryClient]);

  return {
    promotions, summary, pagination,
    loading: isLoading,
    error: error?.message ?? null,
    filters, updateFilters, fetchPromotions,
    updatePromotion, deletePromotion,
    setPage, setPageSize,
  };
}

// ── Coupons Hook ─────────────────────────────────────────

export function useCoupons(initialFilters?: Partial<CouponFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePromoPagination(10);
  const [filters, setFilters] = useState<CouponFilters>({
    search: "", type: "", status: "", ...initialFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.coupons.list({ ...filters, page, pageSize }),
    queryFn: () => promotionService.getCoupons(filters, { page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const coupons = data?.coupons ?? [];
  const summary = data?.summary ?? {
    total: 0, active: 0, scheduled: 0, expired: 0, totalUsed: 0, totalIssued: 0,
  };
  const pagination = data?.pagination ?? { page, pageSize, total: 0 };

  const generateMutation = useMutation({
    mutationFn: (data: Partial<Coupon>) => promotionService.generateCoupon(data),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<Coupon> }) =>
      promotionService.updateCoupon(id, updateData),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => promotionService.deleteCoupon(id),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const generateCoupon = useCallback(
    async (data: Partial<Coupon>): Promise<Coupon | null> => {
      try {
        return await generateMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    [generateMutation]
  );

  const updateCoupon = useCallback(
    async (id: string, data: Partial<Coupon>): Promise<Coupon | undefined | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deleteCoupon = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        return await deleteMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const updateFilters = useCallback((update: Partial<CouponFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPage(1);
  }, [setPage]);

  const fetchCoupons = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.promotions.coupons.all });
  }, [queryClient]);

  return {
    coupons, summary, pagination,
    loading: isLoading,
    error: error?.message ?? null,
    filters, updateFilters, fetchCoupons,
    generateCoupon, updateCoupon, deleteCoupon,
    setPage, setPageSize,
  };
}

// ── Flash Sales Hook ─────────────────────────────────────

export function useFlashSales() {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePromoPagination(10);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.flashSales.list({ page, pageSize }),
    queryFn: () => promotionService.getFlashSales({ page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const flashSales = data?.flashSales ?? [];
  const summary = data?.summary ?? { live: 0, scheduled: 0, completed: 0, totalBudget: "₹0" };
  const pagination = data?.pagination ?? { page, pageSize, total: 0 };

  const createMutation = useMutation({
    mutationFn: (data: Partial<FlashSale>) => promotionService.createFlashSale(data),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<FlashSale> }) =>
      promotionService.updateFlashSale(id, updateData),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => promotionService.deleteFlashSale(id),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const createFlashSale = useCallback(
    async (data: Partial<FlashSale>): Promise<FlashSale | null> => {
      try {
        return await createMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    [createMutation]
  );

  const updateFlashSale = useCallback(
    async (id: string, data: Partial<FlashSale>): Promise<FlashSale | undefined | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deleteFlashSale = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        return await deleteMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const fetchFlashSales = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.promotions.flashSales.all });
  }, [queryClient]);

  return {
    flashSales, summary, pagination,
    loading: isLoading,
    error: error?.message ?? null,
    fetchFlashSales, createFlashSale, updateFlashSale, deleteFlashSale,
    setPage, setPageSize,
  };
}

// ── Campaigns Hook ───────────────────────────────────────

export function useCampaigns() {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePromoPagination(10);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.campaigns.list({ page, pageSize }),
    queryFn: () => promotionService.getCampaigns({ page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const campaigns = data?.campaigns ?? [];
  const summary = data?.summary ?? { active: 0, scheduled: 0, drafts: 0, totalReach: "0" };
  const pagination = data?.pagination ?? { page, pageSize, total: 0 };

  const createMutation = useMutation({
    mutationFn: (data: Partial<Campaign>) => promotionService.createCampaign(data),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<Campaign> }) =>
      promotionService.updateCampaign(id, updateData),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => promotionService.deleteCampaign(id),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const createCampaign = useCallback(
    async (data: Partial<Campaign>): Promise<Campaign | null> => {
      try {
        return await createMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    [createMutation]
  );

  const updateCampaign = useCallback(
    async (id: string, data: Partial<Campaign>): Promise<Campaign | undefined | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deleteCampaign = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        return await deleteMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const fetchCampaigns = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.promotions.campaigns.all });
  }, [queryClient]);

  return {
    campaigns, summary, pagination,
    loading: isLoading,
    error: error?.message ?? null,
    fetchCampaigns, createCampaign, updateCampaign, deleteCampaign,
    setPage, setPageSize,
  };
}

// ── Push Notifications Hook ──────────────────────────────

export function usePushNotifications() {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePromoPagination(10);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.pushNotifications.list({ page, pageSize }),
    queryFn: () => promotionService.getPushNotifications({ page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const notifications = data?.notifications ?? [];
  const summary = data?.summary ?? { sent: 0, scheduled: 0, drafts: 0, avgOpenRate: "0%" };
  const pagination = data?.pagination ?? { page, pageSize, total: 0 };

  const createMutation = useMutation({
    mutationFn: (data: Partial<PushNotification>) =>
      promotionService.createPushNotification(data),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<PushNotification> }) =>
      promotionService.updatePushNotification(id, updateData),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => promotionService.deletePushNotification(id),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const createNotification = useCallback(
    async (data: Partial<PushNotification>): Promise<PushNotification | null> => {
      try {
        return await createMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    [createMutation]
  );

  const updateNotification = useCallback(
    async (id: string, data: Partial<PushNotification>): Promise<PushNotification | undefined | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deleteNotification = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        return await deleteMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const fetchNotifications = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.promotions.pushNotifications.all });
  }, [queryClient]);

  return {
    notifications, summary, pagination,
    loading: isLoading,
    error: error?.message ?? null,
    fetchNotifications, createNotification, updateNotification, deleteNotification,
    setPage, setPageSize,
  };
}

// ── A/B Tests Hook ───────────────────────────────────────

export function useABTests(initialFilters?: Partial<ABTestFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePromoPagination(10);
  const [filters, setFilters] = useState<ABTestFilters>({
    search: "", status: "", ...initialFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.abTests.list({ ...filters, page, pageSize }),
    queryFn: () => promotionService.getABTests(filters, { page, pageSize }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const tests = data?.tests ?? [];
  const summary = data?.summary ?? { total: 0, running: 0, completed: 0, totalImpressions: 0 };
  const pagination = data?.pagination ?? { page, pageSize, total: 0 };

  const createMutation = useMutation({
    mutationFn: (data: Partial<ABTest>) => promotionService.createABTest(data),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data: updateData }: { id: string; data: Partial<ABTest> }) =>
      promotionService.updateABTest(id, updateData),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => promotionService.deleteABTest(id),
    onSuccess: () => invalidatePromotionQueries(queryClient),
  });

  const createTest = useCallback(
    async (data: Partial<ABTest>): Promise<ABTest | null> => {
      try {
        return await createMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    [createMutation]
  );

  const updateTest = useCallback(
    async (id: string, data: Partial<ABTest>): Promise<ABTest | undefined | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deleteTest = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        return await deleteMutation.mutateAsync(id);
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const updateFilters = useCallback((update: Partial<ABTestFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPage(1);
  }, [setPage]);

  const fetchTests = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.promotions.abTests.all });
  }, [queryClient]);

  return {
    tests, summary, pagination,
    loading: isLoading,
    error: error?.message ?? null,
    filters, updateFilters, fetchTests,
    createTest, updateTest, deleteTest,
    setPage, setPageSize,
  };
}

// ── Campaign Analytics Hook ──────────────────────────────

export function useCampaignAnalytics() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.promotions.campaignAnalytics.list(),
    queryFn: () => promotionService.getCampaignAnalytics(),
    staleTime: 60_000,
  });

  return {
    analytics: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    fetchAnalytics: () => {}, // auto-fetched via query
  };
}
