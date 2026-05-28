// ── Vendor Management Hooks ──────────────────────────────
// Architecture: UI → Component → Hook → Service → API Adapter → Backend
// Now backed by TanStack Query for caching, retry, and invalidation.

"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vendorsService } from "@/services/vendors.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidateVendorQueries } from "@/lib/react-query/invalidation";
import type {
  Vendor,
  VendorOnboarding,
  VendorProduct,
  VendorSettlement,
  VendorAnalyticsEntry,
  VendorFilters,
  VendorPageMeta,
  VendorSummary,
  SettlementSummary,
  OnboardingSummary,
  VendorAnalyticsSummary,
} from "@/types/vendors";

// ── Shared helpers ────────────────────────────────────────

function useVendorPagination(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback((p: number) => setPage(p), []);
  const changePageSize = useCallback((s: number) => {
    setPageSize(s);
    setPage(1);
  }, []);

  return { page, pageSize, goToPage, changePageSize };
}

// ── Vendors Hook ──────────────────────────────────────────

export function useVendors(initialFilters?: Partial<VendorFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useVendorPagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
    category: "all",
    performance: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const listQuery = useQuery({
    queryKey: queryKeys.vendors.list({ ...filters, page, pageSize }),
    queryFn: () => vendorsService.getVendors(filters, page, pageSize),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.vendors.all, "summary"],
    queryFn: () => vendorsService.getVendorSummary(),
    staleTime: 60_000,
  });

  const data = listQuery.data?.data ?? [];
  const meta: VendorPageMeta = listQuery.data?.meta ?? { page, pageSize, total: 0, totalPages: 0 };

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  const clearFilters = useCallback(() => {
    setFilters({ search: "", status: "all", category: "all", performance: "all", sortBy: "", sortOrder: "desc" });
    goToPage(1);
  }, [goToPage]);

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) =>
      v !== "" && v !== "all" && v !== undefined && k !== "sortOrder" && k !== "sortBy"
    ).length,
    [filters]
  );

  return {
    data,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta,
    activeFilterCount,
    fetchData: () => queryClient.invalidateQueries({ queryKey: queryKeys.vendors.all }),
    updateFilters,
    clearFilters,
    goToPage,
    changePageSize,
  };
}

// ── Onboarding Hook ───────────────────────────────────────

export function useVendorOnboarding(initialFilters?: Partial<VendorFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useVendorPagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const listQuery = useQuery({
    queryKey: queryKeys.vendors.onboarding.list({ ...filters, page, pageSize }),
    queryFn: () => vendorsService.getOnboardingApplications(filters, page, pageSize),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.vendors.onboarding.all, "summary"],
    queryFn: () => vendorsService.getOnboardingSummary(),
    staleTime: 60_000,
  });

  const data = listQuery.data?.data ?? [];
  const meta: VendorPageMeta = listQuery.data?.meta ?? { page, pageSize, total: 0, totalPages: 0 };

  const approveMutation = useMutation({
    mutationFn: (id: string) => vendorsService.approveVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.onboarding.all });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      vendorsService.rejectVendor(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.onboarding.all });
    },
  });

  const approveVendor = useCallback(async (id: string) => {
    try {
      await approveMutation.mutateAsync(id);
    } catch {
      // error handled by mutation state
    }
  }, [approveMutation]);

  const rejectVendor = useCallback(async (id: string, reason: string) => {
    try {
      await rejectMutation.mutateAsync({ id, reason });
    } catch {
      // error handled by mutation state
    }
  }, [rejectMutation]);

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  return {
    data,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta,
    fetchData: () => queryClient.invalidateQueries({ queryKey: queryKeys.vendors.onboarding.all }),
    updateFilters,
    approveVendor,
    rejectVendor,
    goToPage,
    changePageSize,
  };
}

// ── Vendor Products Hook ──────────────────────────────────

export function useVendorProducts(initialFilters?: Partial<VendorFilters> & { vendorId?: string }) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useVendorPagination(10);
  const [filters, setFilters] = useState<VendorFilters & { vendorId?: string }>({
    search: "",
    status: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const listQuery = useQuery({
    queryKey: queryKeys.vendors.products.list({ ...filters, page, pageSize }),
    queryFn: () => vendorsService.getVendorProducts(filters, page, pageSize),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.vendors.products.all, "summary"],
    queryFn: () => vendorsService.getProductSummary(),
    staleTime: 60_000,
  });

  const data = listQuery.data?.data ?? [];
  const meta: VendorPageMeta = listQuery.data?.meta ?? { page, pageSize, total: 0, totalPages: 0 };

  const updateFilters = useCallback((update: Partial<VendorFilters & { vendorId?: string }>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  return {
    data,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta,
    fetchData: () => queryClient.invalidateQueries({ queryKey: queryKeys.vendors.products.all }),
    updateFilters,
    goToPage,
    changePageSize,
  };
}

// ── Settlements Hook ──────────────────────────────────────

export function useVendorSettlements(initialFilters?: Partial<VendorFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useVendorPagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const listQuery = useQuery({
    queryKey: queryKeys.vendors.settlements.list({ ...filters, page, pageSize }),
    queryFn: () => vendorsService.getSettlements(filters, page, pageSize),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.vendors.settlements.all, "summary"],
    queryFn: () => vendorsService.getSettlementSummary(),
    staleTime: 60_000,
  });

  const data = listQuery.data?.data ?? [];
  const meta: VendorPageMeta = listQuery.data?.meta ?? { page, pageSize, total: 0, totalPages: 0 };

  const processMutation = useMutation({
    mutationFn: (id: string) => vendorsService.processSettlement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vendors.settlements.all });
    },
  });

  const processSettlement = useCallback(async (id: string) => {
    try {
      await processMutation.mutateAsync(id);
    } catch {
      // error handled by mutation state
    }
  }, [processMutation]);

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  return {
    data,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta,
    fetchData: () => queryClient.invalidateQueries({ queryKey: queryKeys.vendors.settlements.all }),
    updateFilters,
    processSettlement,
    goToPage,
    changePageSize,
  };
}

// ── Analytics Hook ────────────────────────────────────────

export function useVendorAnalytics(initialFilters?: Partial<VendorFilters>) {
  const queryClient = useQueryClient();
  const { page, pageSize, goToPage, changePageSize } = useVendorPagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const listQuery = useQuery({
    queryKey: queryKeys.vendors.analytics.list({ ...filters, page, pageSize }),
    queryFn: () => vendorsService.getVendorAnalytics(filters, page, pageSize),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const summaryQuery = useQuery({
    queryKey: [...queryKeys.vendors.analytics.all, "summary"],
    queryFn: () => vendorsService.getAnalyticsSummary(),
    staleTime: 60_000,
  });

  const data = listQuery.data?.data ?? [];
  const meta: VendorPageMeta = listQuery.data?.meta ?? { page, pageSize, total: 0, totalPages: 0 };

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  return {
    data,
    loading: listQuery.isLoading,
    error: listQuery.error?.message ?? null,
    summary: summaryQuery.data ?? null,
    filters,
    meta,
    fetchData: () => queryClient.invalidateQueries({ queryKey: queryKeys.vendors.analytics.all }),
    updateFilters,
    goToPage,
    changePageSize,
  };
}
