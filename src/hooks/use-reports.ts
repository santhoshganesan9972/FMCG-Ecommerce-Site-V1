"use client";

// ── Report Hooks ─────────────────────────────────────
// Now backed by TanStack Query for caching, retry, and invalidation.

import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reportsService } from "@/services/reports.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import type { ReportFilters, ReportPageMeta } from "@/types/reports";

// ── Reusable pagination hook ──────────────────────────────

function usePaginationState(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback((p: number) => setPage(p), []);
  const changePageSize = useCallback((s: number) => {
    setPageSize(s);
    setPage(1);
  }, []);

  return { page, pageSize, goToPage, changePageSize, setPage };
}

// ── Filter utilities ──────────────────────────────────────

function useReportFilters(initialFilters?: Partial<ReportFilters>) {
  const [filters, setFilters] = useState<ReportFilters>({
    dateFrom: "",
    dateTo: "",
    period: "30d",
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const updateFilters = useCallback((update: Partial<ReportFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ dateFrom: "", dateTo: "", period: "30d", search: "", sortBy: "", sortOrder: "desc" });
  }, []);

  const activeFilterCount = useMemo(
    () =>
      Object.entries(filters).filter(
        ([k, v]) => v !== "" && v !== undefined && k !== "period" && k !== "sortOrder" && k !== "sortBy",
      ).length,
    [filters],
  );

  return { filters, updateFilters, clearFilters, activeFilterCount, setFilters };
}

// ── Generic report hook factory ───────────────────────────

function useListReport<T>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<{ data: T[]; meta: ReportPageMeta }>,
  initialPageSize = 10,
) {
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(initialPageSize);

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    placeholderData: (prev) => prev,
  });

  return {
    data: data?.data ?? ([] as T[]),
    loading: isLoading,
    error: error?.message ?? null,
    meta: data?.meta ?? ({ page: 1, pageSize: initialPageSize, total: 0, totalPages: 0 } as ReportPageMeta),
    goToPage,
    changePageSize,
  };
}

// ── GST Reports Hook ─────────────────────────────────────

export function useGSTReports(initialFilters?: Partial<ReportFilters>) {
  const { filters, updateFilters, clearFilters, activeFilterCount, setFilters } = useReportFilters(initialFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.gst.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getGSTReports(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.gst.all, "summary"],
    queryFn: () => reportsService.getGSTSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      updateFilters(update);
      goToPage(1);
    },
    clearFilters: () => {
      clearFilters();
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Customer Reports Hook ────────────────────────────────

export function useCustomerReports(initialFilters?: Partial<ReportFilters>) {
  const { filters, updateFilters, clearFilters, activeFilterCount, setFilters } = useReportFilters(initialFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.customer.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getCustomerReports(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.customer.all, "summary"],
    queryFn: () => reportsService.getCustomerSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      updateFilters(update);
      goToPage(1);
    },
    clearFilters: () => {
      clearFilters();
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Cohort Analysis Hook ─────────────────────────────────

export function useCohortData() {
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(12);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.cohort.list(),
    queryFn: () => reportsService.getCohortData(page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.cohort.all, "summary"],
    queryFn: () => reportsService.getCohortSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 12, total: 0, totalPages: 0 } as ReportPageMeta),
    goToPage,
    changePageSize,
  };
}

// ── Abandoned Cart Hook ──────────────────────────────────

export function useAbandonedCart(initialFilters?: Partial<ReportFilters>) {
  const [filters, setFilters] = useState<ReportFilters>({
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  } as ReportFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.abandonedCart.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getAbandonedCartData(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.abandonedCart.all, "summary"],
    queryFn: () => reportsService.getAbandonedCartSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => v !== "" && v !== undefined && k !== "sortOrder" && k !== "sortBy").length,
    [filters],
  );

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      setFilters((prev) => ({ ...prev, ...update } as ReportFilters));
      goToPage(1);
    },
    clearFilters: () => {
      setFilters({ search: "", sortBy: "", sortOrder: "desc" } as ReportFilters);
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Revenue Analytics Hook ───────────────────────────────

export function useRevenueAnalytics() {
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(12);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.revenueAnalytics.list(),
    queryFn: () => reportsService.getRevenueAnalytics(page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.revenueAnalytics.all, "summary"],
    queryFn: () => reportsService.getRevenueSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 12, total: 0, totalPages: 0 } as ReportPageMeta),
    goToPage,
    changePageSize,
  };
}

// ── Promotion ROI Hook ───────────────────────────────────

export function usePromotionROI(initialFilters?: Partial<ReportFilters>) {
  const [filters, setFilters] = useState<ReportFilters>({
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  } as ReportFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.promotionROI.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getPromotionROIData(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.promotionROI.all, "summary"],
    queryFn: () => reportsService.getPromotionROISummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => v !== "" && v !== undefined && k !== "sortOrder" && k !== "sortBy").length,
    [filters],
  );

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      setFilters((prev) => ({ ...prev, ...update } as ReportFilters));
      goToPage(1);
    },
    clearFilters: () => {
      setFilters({ search: "", sortBy: "", sortOrder: "desc" } as ReportFilters);
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Export Hook ─────────────────────────────────────────

import { useMutation } from "@tanstack/react-query";

export function useReportExport() {
  const exportMutation = useMutation({
    mutationFn: ({ reportType, format, filters }: { reportType: string; format: "csv" | "xlsx" | "pdf"; filters?: Partial<ReportFilters> }) =>
      reportsService.exportReport(reportType, format, filters),
  });

  return { handleExport: exportMutation.mutate, exporting: exportMutation.isPending };
}

// ── Sales Reports Hook ───────────────────────────────────

export function useSalesReports(initialFilters?: Partial<ReportFilters>) {
  const { filters, updateFilters, clearFilters, activeFilterCount, setFilters } = useReportFilters(initialFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.sales.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getSalesReports(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.sales.all, "summary"],
    queryFn: () => reportsService.getSalesSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      updateFilters(update);
      goToPage(1);
    },
    clearFilters: () => {
      clearFilters();
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Inventory Reports Hook ───────────────────────────────

export function useInventoryReports(initialFilters?: Partial<ReportFilters>) {
  const [filters, setFilters] = useState<ReportFilters>({
    search: "",
    sortBy: "",
    sortOrder: "asc",
    ...initialFilters,
  } as ReportFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.inventory.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getInventoryReports(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.inventory.all, "summary"],
    queryFn: () => reportsService.getInventorySummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => v !== "" && v !== undefined && k !== "sortOrder" && k !== "sortBy").length,
    [filters],
  );

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      setFilters((prev) => ({ ...prev, ...update }));
      goToPage(1);
    },
    clearFilters: () => {
      setFilters({ search: "", sortBy: "", sortOrder: "asc" } as ReportFilters);
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Vendor Reports Hook ──────────────────────────────────

export function useVendorReports(initialFilters?: Partial<ReportFilters>) {
  const [filters, setFilters] = useState<ReportFilters>({
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  } as ReportFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.vendor.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getVendorReports(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.vendor.all, "summary"],
    queryFn: () => reportsService.getVendorSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => v !== "" && v !== undefined && k !== "sortOrder" && k !== "sortBy").length,
    [filters],
  );

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      setFilters((prev) => ({ ...prev, ...update }));
      goToPage(1);
    },
    clearFilters: () => {
      setFilters({ search: "", sortBy: "", sortOrder: "desc" } as ReportFilters);
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}

// ── Tax Reports Hook ─────────────────────────────────────

export function useTaxReports(initialFilters?: Partial<ReportFilters>) {
  const [filters, setFilters] = useState<ReportFilters>({
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  } as ReportFilters);
  const { page, pageSize, goToPage, changePageSize } = usePaginationState(10);

  const listQuery = useQuery({
    queryKey: queryKeys.reports.tax.list({ ...filters, page, pageSize }),
    queryFn: () => reportsService.getTaxReports(filters, page, pageSize),
    placeholderData: (prev) => prev,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.reports.tax.all, "summary"],
    queryFn: () => reportsService.getTaxSummary(),
    staleTime: 120_000,
  }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => v !== "" && v !== undefined && k !== "sortOrder" && k !== "sortBy").length,
    [filters],
  );

  return {
    data: listQuery.data?.data ?? [],
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta: listQuery.data?.meta ?? ({ page: 1, pageSize: 10, total: 0, totalPages: 0 } as ReportPageMeta),
    activeFilterCount,
    updateFilters: (update: Partial<ReportFilters>) => {
      setFilters((prev) => ({ ...prev, ...update }));
      goToPage(1);
    },
    clearFilters: () => {
      setFilters({ search: "", sortBy: "", sortOrder: "desc" } as ReportFilters);
      goToPage(1);
    },
    goToPage,
    changePageSize,
  };
}
