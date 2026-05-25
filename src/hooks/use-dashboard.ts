"use client";

// ── useDashboard Hook ────────────────────────────────────
// Manages all data fetching for the Executive Dashboard.
// Provides granular loading/error per section and aggregate states.
//
// Usage:
//   const { data, loading, error, refresh } = useDashboard();
//   const { data, loading, error } = useDashboard({ period: "7d" });

import { useState, useEffect, useCallback, useRef } from "react";
import { dashboardService } from "@/services/dashboard.service";
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

// ── Per-section loading / error tracking ─────────────────

interface SectionState {
  loading: boolean;
  error: string | null;
}

interface DashboardState {
  // Data
  overview: DashboardOverview | null;
  revenue: RevenueKpi | null;
  orders: OrdersKpi | null;
  customers: CustomersKpi | null;
  liveOrders: LiveOrder[] | null;
  lowStockAlerts: StockAlert[] | null;
  vendorPayments: VendorPayment[] | null;
  topProducts: TopProduct[] | null;
  acquisitionMetrics: AcquisitionMetric[] | null;

  // Aggregate loading states
  loading: boolean;
  error: string | null;

  // Per-section granular loading
  sections: Record<string, SectionState>;

  // Timestamp of last successful fetch
  lastUpdated: string | null;
}

interface DashboardActions {
  refresh: () => Promise<void>;
  refreshSection: (section: string) => Promise<void>;
}

const initialSectionState: SectionState = { loading: false, error: null };

function createInitialState(): DashboardState {
  return {
    overview: null,
    revenue: null,
    orders: null,
    customers: null,
    liveOrders: null,
    lowStockAlerts: null,
    vendorPayments: null,
    topProducts: null,
    acquisitionMetrics: null,
    loading: true,
    error: null,
    sections: {},
    lastUpdated: null,
  };
}

export type UseDashboardReturn = DashboardState & DashboardActions;

export function useDashboard(params?: Partial<DashboardQueryParams>): UseDashboardReturn {
  const [state, setState] = useState<DashboardState>(createInitialState);
  const abortRef = useRef<AbortController | null>(null);

  const fetchAll = useCallback(async () => {
    // Cancel any in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      sections: {
        ...prev.sections,
        revenue: { loading: true, error: null },
        orders: { loading: true, error: null },
        customers: { loading: true, error: null },
        liveOrders: { loading: true, error: null },
        lowStockAlerts: { loading: true, error: null },
        vendorPayments: { loading: true, error: null },
        topProducts: { loading: true, error: null },
        acquisitionMetrics: { loading: true, error: null },
      },
    }));

    try {
      const response = await dashboardService.getOverview(params);

      if (!response.success) {
        throw new Error(response.error || "Failed to load dashboard data");
      }

      setState({
        overview: response.data,
        revenue: response.data.revenue,
        orders: response.data.orders,
        customers: response.data.customers,
        liveOrders: response.data.liveOrders,
        lowStockAlerts: response.data.lowStockAlerts,
        vendorPayments: response.data.vendorPayments,
        topProducts: response.data.topProducts,
        acquisitionMetrics: response.data.acquisitionMetrics,
        loading: false,
        error: null,
        sections: {},
        lastUpdated: response.meta?.cachedAt || new Date().toISOString(),
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: message,
        sections: {},
      }));
    }
  }, [params?.period, params?.warehouse, params?.region]);

  // Fetch on mount and when params change
  useEffect(() => {
    fetchAll();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [fetchAll]);

  // Manual refresh
  const refresh = useCallback(async () => {
    await fetchAll();
  }, [fetchAll]);

  // Refresh a single section (for granular loading)
  const refreshSection = useCallback(
    async (section: string) => {
      setState((prev) => ({
        ...prev,
        sections: {
          ...prev.sections,
          [section]: { loading: true, error: null },
        },
      }));

      try {
        let data: unknown;
        switch (section) {
          case "revenue":
            data = (await dashboardService.getRevenue(params)).data;
            break;
          case "orders":
            data = (await dashboardService.getOrders(params)).data;
            break;
          case "customers":
            data = (await dashboardService.getCustomers(params)).data;
            break;
          case "liveOrders":
            data = (await dashboardService.getLiveOrders(params)).data;
            break;
          case "lowStockAlerts":
            data = (await dashboardService.getLowStockAlerts(params)).data;
            break;
          case "vendorPayments":
            data = (await dashboardService.getVendorPayments(params)).data;
            break;
          case "topProducts":
            data = (await dashboardService.getTopProducts(params)).data;
            break;
          case "acquisitionMetrics":
            data = (await dashboardService.getAcquisitionMetrics(params)).data;
            break;
          default:
            throw new Error(`Unknown section: ${section}`);
        }

        setState((prev) => ({
          ...prev,
          [section]: data,
          sections: { ...prev.sections, [section]: { loading: false, error: null } },
        }));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load section";
        setState((prev) => ({
          ...prev,
          sections: { ...prev.sections, [section]: { loading: false, error: message } },
        }));
      }
    },
    [params],
  );

  return { ...state, refresh, refreshSection };
}
