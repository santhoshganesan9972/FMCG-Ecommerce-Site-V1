// ── Delivery Management Hooks ────────────────────────────
// Architecture: UI → Component → Hook → Service → API Adapter → Backend
// Now backed by TanStack Query for caching, retry, and invalidation.
//
// Each hook manages its own loading/error/data states and exposes
// a clean interface for page components. No API logic lives in components.

"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deliveryService } from "@/services/delivery.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidateDeliveryQueries } from "@/lib/react-query/invalidation";
import type {
  DeliveryPartner,
  PartnerProfile,
  LiveDelivery,
  DeliveryRoute,
  DeliveryStatusEntry,
  PerformanceOverview,
  DeliveryAnalytics,
  SLADashboard,
  DeliveryQueryParams,
  AnalyticsQueryParams,
  AssignDeliveryFormData,
  UpdateDeliveryStatusFormData,
} from "@/types/delivery";

// ── Shared Helpers ────────────────────────────────────────

function useDeliveryPagination(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback((p: number) => setPage(p), []);
  const changePageSize = useCallback((s: number) => {
    setPageSize(s);
    setPage(1);
  }, []);

  return { page, pageSize, goToPage, changePageSize, setPage: goToPage, setPageSize: changePageSize };
}

// ── Delivery Partners Hook ────────────────────────────────

export function useDeliveryPartners(initialParams?: Partial<DeliveryQueryParams>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useDeliveryPagination(10);
  const [search, setSearch] = useState(initialParams?.search || "");
  const [statusFilter, setStatusFilter] = useState(initialParams?.status || "all");
  const [zoneFilter, setZoneFilter] = useState(initialParams?.zone || "");

  const listQuery = useQuery({
    queryKey: [...queryKeys.delivery.partners.list(), { search, status: statusFilter, zone: zoneFilter, page, pageSize }],
    queryFn: () => deliveryService.getPartners({
      search: search || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      zone: zoneFilter || undefined,
      page,
      pageSize,
    }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const partners = listQuery.data?.data?.items ?? [];
  const pagination = useMemo(() => listQuery.data?.data?.pagination ?? { page, pageSize, total: 0 }, [listQuery.data, page, pageSize]);

  const onlineCount = useMemo(() => partners.filter((p) => p.status === "online").length, [partners]);
  const busyCount = useMemo(() => partners.filter((p) => p.status === "busy").length, [partners]);
  const zones = useMemo(() => [...new Set(partners.map((p) => p.zone).filter(Boolean))] as string[], [partners]);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.delivery.partners.all });
  }, [queryClient]);

  return {
    partners,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    search, setSearch,
    statusFilter, setStatusFilter,
    zoneFilter, setZoneFilter,
    pagination, setPage: goToPage, setPageSize: changePageSize,
    onlineCount, busyCount, zones,
    refresh,
  };
}

// ── Partner Profile Hook ──────────────────────────────────

export function usePartnerProfile(partnerId: string | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.delivery.all, "partnerProfile", partnerId],
    queryFn: () => deliveryService.getPartnerProfile(partnerId!),
    enabled: !!partnerId,
    staleTime: 30_000,
  });

  return {
    profile: data?.data ?? null,
    loading: isLoading,
    error: error?.message ?? (data && !data.success ? (data.error ?? "Failed to load profile") : null),
  };
}

// ── Live Deliveries Hook ─────────────────────────────────

export function useLiveDeliveries(initialParams?: Partial<DeliveryQueryParams>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useDeliveryPagination(10);
  const [statusFilter, setStatusFilter] = useState(initialParams?.status || "all");
  const [zoneFilter, setZoneFilter] = useState(initialParams?.zone || "");

  const listQuery = useQuery({
    queryKey: [...queryKeys.delivery.all, "live", { status: statusFilter, zone: zoneFilter, page, pageSize }],
    queryFn: () => deliveryService.getLiveDeliveries({
      status: statusFilter !== "all" ? statusFilter : undefined,
      zone: zoneFilter || undefined,
      page,
      pageSize,
    }),
    placeholderData: (prev) => prev,
    staleTime: 15_000,
    refetchInterval: 15_000,
  });

  const deliveries = listQuery.data?.data?.items ?? [];
  const pagination = useMemo(() => listQuery.data?.data?.pagination ?? { page, pageSize, total: 0 }, [listQuery.data, page, pageSize]);

  const activeCount = useMemo(
    () => deliveries.filter((d) => !["delivered", "failed", "returned", "cancelled"].includes(d.status)).length,
    [deliveries]
  );

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.delivery.all });
  }, [queryClient]);

  return {
    deliveries,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    statusFilter, setStatusFilter,
    zoneFilter, setZoneFilter,
    pagination, setPage: goToPage, setPageSize: changePageSize,
    activeCount,
    refresh,
  };
}

// ── Delivery Routes Hook ─────────────────────────────────

export function useDeliveryRoutes(initialParams?: Partial<DeliveryQueryParams>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage } = useDeliveryPagination(10);
  const [statusFilter, setStatusFilter] = useState(initialParams?.status || "all");

  const listQuery = useQuery({
    queryKey: [...queryKeys.delivery.all, "routes", { status: statusFilter, page, pageSize }],
    queryFn: () => deliveryService.getRoutes({
      status: statusFilter !== "all" ? statusFilter : undefined,
      page,
      pageSize,
    }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const routes = listQuery.data?.data?.items ?? [];
  const pagination = useMemo(() => listQuery.data?.data?.pagination ?? { page, pageSize, total: 0 }, [listQuery.data, page, pageSize]);

  const optimizeMutation = useMutation({
    mutationFn: () => deliveryService.optimizeAllRoutes(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.delivery.all, "routes"] });
    },
  });

  const optimizeAllRoutes = useCallback(async () => {
    try {
      await optimizeMutation.mutateAsync();
    } catch {
      // error handled by mutation state
    }
  }, [optimizeMutation]);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.delivery.all });
  }, [queryClient]);

  return {
    routes,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    statusFilter, setStatusFilter,
    optimizing: optimizeMutation.isPending,
    optimizeAllRoutes,
    pagination, setPage: goToPage,
    refresh,
  };
}

// ── Delivery Status Hook ────────────────────────────────

export function useDeliveryStatuses(initialParams?: Partial<DeliveryQueryParams>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useDeliveryPagination(10);
  const [search, setSearch] = useState(initialParams?.search || "");
  const [statusFilter, setStatusFilter] = useState(initialParams?.status || "all");
  const [zoneFilter, setZoneFilter] = useState(initialParams?.zone || "");

  const listQuery = useQuery({
    queryKey: [...queryKeys.delivery.all, "statuses", { search, status: statusFilter, zone: zoneFilter, page, pageSize }],
    queryFn: () => deliveryService.getDeliveryStatuses({
      search: search || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      zone: zoneFilter || undefined,
      page,
      pageSize,
    }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const entries = listQuery.data?.data?.items ?? [];
  const pagination = useMemo(() => listQuery.data?.data?.pagination ?? { page, pageSize, total: 0 }, [listQuery.data, page, pageSize]);

  const updateStatusMutation = useMutation({
    mutationFn: (data: UpdateDeliveryStatusFormData) => deliveryService.updateDeliveryStatus(data),
    onSuccess: () => invalidateDeliveryQueries(queryClient),
  });

  const assignMutation = useMutation({
    mutationFn: (data: AssignDeliveryFormData) => deliveryService.assignDelivery(data),
    onSuccess: () => invalidateDeliveryQueries(queryClient),
  });

  const updateStatus = useCallback(
    async (data: UpdateDeliveryStatusFormData): Promise<boolean> => {
      try {
        const res = await updateStatusMutation.mutateAsync(data);
        return res.success;
      } catch {
        return false;
      }
    },
    [updateStatusMutation]
  );

  const assignDelivery = useCallback(
    async (data: AssignDeliveryFormData): Promise<boolean> => {
      try {
        const res = await assignMutation.mutateAsync(data);
        return res.success;
      } catch {
        return false;
      }
    },
    [assignMutation]
  );

  const summary = useMemo(() => ({
    total: entries.length,
    assigned: entries.filter((e) => e.status === "assigned").length,
    pickedUp: entries.filter((e) => e.status === "picked_up").length,
    inTransit: entries.filter((e) => e.status === "in_transit").length,
    outForDelivery: entries.filter((e) => e.status === "out_for_delivery").length,
    delivered: entries.filter((e) => e.status === "delivered").length,
    failed: entries.filter((e) => e.status === "failed").length,
    cancelled: entries.filter((e) => ["cancelled", "returned"].includes(e.status)).length,
    delayed: entries.filter((e) => e.slaStatus === "delayed" || e.slaStatus === "critical").length,
  }), [entries]);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.delivery.all });
  }, [queryClient]);

  return {
    entries,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    search, setSearch,
    statusFilter, setStatusFilter,
    zoneFilter, setZoneFilter,
    pagination, setPage: goToPage, setPageSize: changePageSize,
    summary, updateStatus, assignDelivery,
    refresh,
  };
}

// ── Partner Performance Hook ──────────────────────────────

export function usePartnerPerformance(partnerId?: string | null) {
  const [period, setPeriod] = useState<string>("30d");

  const singleQuery = useQuery({
    queryKey: [...queryKeys.delivery.performance.all, partnerId, period],
    queryFn: () => deliveryService.getPartnerPerformance(partnerId!, { period: period as AnalyticsQueryParams["period"] }),
    enabled: !!partnerId,
    staleTime: 30_000,
  });

  const allQuery = useQuery({
    queryKey: [...queryKeys.delivery.performance.all, "all", period],
    queryFn: () => deliveryService.getAllPartnerPerformance({ period: period as AnalyticsQueryParams["period"] }),
    enabled: !partnerId,
    staleTime: 30_000,
  });

  const loading = partnerId ? singleQuery.isLoading : allQuery.isLoading;
  const error = partnerId ? singleQuery.error?.message ?? null : allQuery.error?.message ?? null;

  const performances = useMemo(() => {
    if (partnerId) {
      return singleQuery.data?.data ? [singleQuery.data.data] : [];
    }
    return allQuery.data?.data ?? [];
  }, [partnerId, singleQuery.data, allQuery.data]);

  const selectedPerformance = partnerId ? (singleQuery.data?.data ?? null) : null;

  const topPerformers = useMemo(
    () => [...performances].sort((a, b) => b.onTimeRate - a.onTimeRate).slice(0, 5),
    [performances]
  );

  const queryClient = useQueryClient();
  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.delivery.performance.all });
  }, [queryClient]);

  return {
    performances,
    selectedPerformance,
    loading, error,
    period, setPeriod,
    topPerformers,
    refresh,
  };
}

// ── Delivery Analytics Hook ───────────────────────────────

export function useDeliveryAnalytics(initialParams?: Partial<AnalyticsQueryParams>) {
  const [period, setPeriod] = useState(initialParams?.period || "30d");

  const { data, isLoading, error } = useQuery({
    queryKey: [...queryKeys.delivery.analytics.list(), period],
    queryFn: () => deliveryService.getAnalytics({ period: period as AnalyticsQueryParams["period"] }),
    staleTime: 30_000,
  });

  return {
    analytics: data?.data ?? null,
    loading: isLoading,
    error: error?.message ?? (data && !data.success ? (data.error ?? "Failed to load analytics") : null),
    period, setPeriod,
    refresh: () => {}, // auto-fetched via query key change
  };
}

// ── SLA Dashboard Hook ────────────────────────────────────

export function useSLADashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.delivery.sla.list(),
    queryFn: () => deliveryService.getSLADashboard(),
    staleTime: 30_000,
  });

  return {
    slaData: data?.data ?? null,
    loading: isLoading,
    error: error?.message ?? (data && !data.success ? (data.error ?? "Failed to load SLA data") : null),
    refresh: () => {}, // auto-fetched via query
  };
}

// ── Delivery Actions Hook ─────────────────────────────────

export function useDeliveryActions() {
  const queryClient = useQueryClient();

  const assignMutation = useMutation({
    mutationFn: (data: AssignDeliveryFormData) => deliveryService.assignDelivery(data),
    onSuccess: () => invalidateDeliveryQueries(queryClient),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: UpdateDeliveryStatusFormData) => deliveryService.updateDeliveryStatus(data),
    onSuccess: () => invalidateDeliveryQueries(queryClient),
  });

  const assignPartner = useCallback(
    async (data: AssignDeliveryFormData): Promise<boolean> => {
      try {
        const res = await assignMutation.mutateAsync(data);
        return res.success;
      } catch {
        return false;
      }
    },
    [assignMutation]
  );

  const updateStatus = useCallback(
    async (data: UpdateDeliveryStatusFormData): Promise<boolean> => {
      try {
        const res = await updateStatusMutation.mutateAsync(data);
        return res.success;
      } catch {
        return false;
      }
    },
    [updateStatusMutation]
  );

  return {
    assignPartner,
    updateStatus,
    updating: assignMutation.isPending || updateStatusMutation.isPending,
    error: assignMutation.error?.message ?? updateStatusMutation.error?.message ?? null,
  };
}
