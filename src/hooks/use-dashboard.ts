"use client";

// ── useDashboard Hook ────────────────────────────────────
// Manages all data fetching for the Executive Dashboard.
// Now backed by TanStack Query for caching, retry, and invalidation.
//
// Usage:
//   const { overview, revenue, loading, error } = useDashboard();
//   const { data, loading, error } = useDashboard({ period: "7d" });

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidateNotificationQueries } from "@/lib/react-query/invalidation";
import type {
  DashboardOverview,
  DashboardQueryParams,
  RevenueKpi,
  OrdersKpi,
  CustomersKpi,
  LiveOrder,
  StockAlert,
  VendorPayment,
  TopProduct,
  AcquisitionMetric,
} from "@/types/dashboard";

// ── Combined Dashboard Hook ──────────────────────────────

export function useDashboard(params?: Partial<DashboardQueryParams>) {
  const queryClient = useQueryClient();

  const overviewQuery = useQuery({
    queryKey: queryKeys.dashboard.overview(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getOverview(params),
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  const revenueQuery = useQuery({
    queryKey: queryKeys.dashboard.revenue(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getRevenue(params),
    staleTime: 30_000,
  });

  const ordersQuery = useQuery({
    queryKey: queryKeys.dashboard.orders(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getOrders(params),
    staleTime: 15_000,
  });

  const customersQuery = useQuery({
    queryKey: queryKeys.dashboard.customers(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getCustomers(params),
    staleTime: 30_000,
  });

  const liveOrdersQuery = useQuery({
    queryKey: queryKeys.dashboard.liveOrders(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getLiveOrders(params),
    staleTime: 15_000,
    refetchInterval: 15_000,
  });

  const lowStockQuery = useQuery({
    queryKey: queryKeys.dashboard.lowStockAlerts(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getLowStockAlerts(params),
    staleTime: 60_000,
  });

  const topProductsQuery = useQuery({
    queryKey: queryKeys.dashboard.topProducts(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getTopProducts(params),
    staleTime: 60_000,
  });

  const vendorPaymentsQuery = useQuery({
    queryKey: queryKeys.dashboard.vendorPayments(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getVendorPayments(params),
    staleTime: 60_000,
  });

  const acquisitionQuery = useQuery({
    queryKey: queryKeys.dashboard.acquisitionMetrics(params as Record<string, unknown> | undefined),
    queryFn: () => dashboardService.getAcquisitionMetrics(params),
    staleTime: 60_000,
  });

  const loading =
    overviewQuery.isLoading ||
    revenueQuery.isLoading ||
    ordersQuery.isLoading ||
    customersQuery.isLoading ||
    liveOrdersQuery.isLoading ||
    lowStockQuery.isLoading ||
    topProductsQuery.isLoading ||
    vendorPaymentsQuery.isLoading ||
    acquisitionQuery.isLoading;

  const error =
    overviewQuery.error?.message ??
    revenueQuery.error?.message ??
    ordersQuery.error?.message ??
    customersQuery.error?.message ??
    liveOrdersQuery.error?.message ??
    lowStockQuery.error?.message ??
    topProductsQuery.error?.message ??
    vendorPaymentsQuery.error?.message ??
    acquisitionQuery.error?.message ??
    null;

  const overview = overviewQuery.data ?? null;
  const lastUpdated = overviewQuery.dataUpdatedAt
    ? new Date(overviewQuery.dataUpdatedAt).toISOString()
    : null;

  // Per-section granular errors
  const sections = {
    revenue: {
      loading: revenueQuery.isLoading,
      error: revenueQuery.error?.message ?? null,
    },
    orders: {
      loading: ordersQuery.isLoading,
      error: ordersQuery.error?.message ?? null,
    },
    customers: {
      loading: customersQuery.isLoading,
      error: customersQuery.error?.message ?? null,
    },
    liveOrders: {
      loading: liveOrdersQuery.isLoading,
      error: liveOrdersQuery.error?.message ?? null,
    },
    lowStockAlerts: {
      loading: lowStockQuery.isLoading,
      error: lowStockQuery.error?.message ?? null,
    },
    topProducts: {
      loading: topProductsQuery.isLoading,
      error: topProductsQuery.error?.message ?? null,
    },
    vendorPayments: {
      loading: vendorPaymentsQuery.isLoading,
      error: vendorPaymentsQuery.error?.message ?? null,
    },
    acquisitionMetrics: {
      loading: acquisitionQuery.isLoading,
      error: acquisitionQuery.error?.message ?? null,
    },
  };

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
  }, [queryClient]);

  const refreshSection = useCallback(
    async (section: string) => {
      const keyMap: Record<string, readonly unknown[]> = {
        revenue: queryKeys.dashboard.revenue(params as Record<string, unknown> | undefined),
        orders: queryKeys.dashboard.orders(params as Record<string, unknown> | undefined),
        customers: queryKeys.dashboard.customers(params as Record<string, unknown> | undefined),
        liveOrders: queryKeys.dashboard.liveOrders(params as Record<string, unknown> | undefined),
        lowStockAlerts: queryKeys.dashboard.lowStockAlerts(params as Record<string, unknown> | undefined),
        topProducts: queryKeys.dashboard.topProducts(params as Record<string, unknown> | undefined),
        vendorPayments: queryKeys.dashboard.vendorPayments(params as Record<string, unknown> | undefined),
        acquisitionMetrics: queryKeys.dashboard.acquisitionMetrics(params as Record<string, unknown> | undefined),
      };
      const key = keyMap[section];
      if (key) {
        await queryClient.invalidateQueries({ queryKey: key });
      }
    },
    [queryClient, params],
  );

  return {
    overview,
    revenue: overview?.revenue ?? (revenueQuery.data as RevenueKpi | null) ?? null,
    orders: overview?.orders ?? (ordersQuery.data as OrdersKpi | null) ?? null,
    customers: overview?.customers ?? (customersQuery.data as CustomersKpi | null) ?? null,
    liveOrders: overview?.liveOrders ?? (liveOrdersQuery.data as LiveOrder[] | null) ?? [],
    lowStockAlerts: overview?.lowStockAlerts ?? (lowStockQuery.data as StockAlert[] | null) ?? [],
    topProducts: overview?.topProducts ?? (topProductsQuery.data as TopProduct[] | null) ?? [],
    vendorPayments: overview?.vendorPayments ?? (vendorPaymentsQuery.data as VendorPayment[] | null) ?? [],
    acquisitionMetrics: overview?.acquisitionMetrics ?? (acquisitionQuery.data as AcquisitionMetric[] | null) ?? [],
    loading,
    error,
    sections,
    lastUpdated,
    refresh,
    refreshSection,
  };
}
