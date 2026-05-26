"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { vendorsService } from "@/services/vendors.service";
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

// ── Generic pagination helper ─────────────────────────────

function usePagination(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [meta, setMeta] = useState<VendorPageMeta>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const goToPage = useCallback((p: number) => setPage(p), []);
  const changePageSize = useCallback((s: number) => {
    setPageSize(s);
    setPage(1);
  }, []);

  return { page, pageSize, meta, setMeta, goToPage, changePageSize };
}

// ── Vendors Hook ──────────────────────────────────────────

export function useVendors(initialFilters?: Partial<VendorFilters>) {
  const [data, setData] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<VendorSummary | null>(null);
  const { page, pageSize, meta, setMeta, goToPage, changePageSize } = usePagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
    category: "all",
    performance: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await vendorsService.getVendors(filters, page, pageSize);
      setData(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vendors");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.status, filters.category, filters.performance, filters.sortBy, filters.sortOrder, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    vendorsService.getVendorSummary().then(setSummary).catch(() => {});
  }, []);

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
    data, loading, error, summary, filters, meta,
    activeFilterCount, fetchData, updateFilters, clearFilters,
    goToPage, changePageSize,
  };
}

// ── Onboarding Hook ───────────────────────────────────────

export function useVendorOnboarding(initialFilters?: Partial<VendorFilters>) {
  const [data, setData] = useState<VendorOnboarding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<OnboardingSummary | null>(null);
  const { page, pageSize, meta, setMeta, goToPage, changePageSize } = usePagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await vendorsService.getOnboardingApplications(filters, page, pageSize);
      setData(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch onboarding applications");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.status, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    vendorsService.getOnboardingSummary().then(setSummary).catch(() => {});
  }, []);

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  const approveVendor = useCallback(async (id: string) => {
    await vendorsService.approveVendor(id);
    fetchData();
    vendorsService.getOnboardingSummary().then(setSummary).catch(() => {});
  }, [fetchData]);

  const rejectVendor = useCallback(async (id: string, reason: string) => {
    await vendorsService.rejectVendor(id, reason);
    fetchData();
    vendorsService.getOnboardingSummary().then(setSummary).catch(() => {});
  }, [fetchData]);

  return {
    data, loading, error, summary, filters, meta,
    fetchData, updateFilters, approveVendor, rejectVendor,
    goToPage, changePageSize,
  };
}

// ── Vendor Products Hook ──────────────────────────────────

export function useVendorProducts(initialFilters?: Partial<VendorFilters> & { vendorId?: string }) {
  const [data, setData] = useState<VendorProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    totalProducts: number;
    activeProducts: number;
    outOfStockCount: number;
    inactiveCount: number;
    avgMargin: number;
    totalStockValue: number;
  } | null>(null);
  const { page, pageSize, meta, setMeta, goToPage, changePageSize } = usePagination(10);
  const [filters, setFilters] = useState<VendorFilters & { vendorId?: string }>({
    search: "",
    status: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await vendorsService.getVendorProducts(filters, page, pageSize);
      setData(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vendor products");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.status, filters.vendorId, filters.sortBy, filters.sortOrder, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    vendorsService.getProductSummary().then(setSummary).catch(() => {});
  }, []);

  const updateFilters = useCallback((update: Partial<VendorFilters & { vendorId?: string }>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  return {
    data, loading, error, summary, filters, meta,
    fetchData, updateFilters, goToPage, changePageSize,
  };
}

// ── Settlements Hook ──────────────────────────────────────

export function useVendorSettlements(initialFilters?: Partial<VendorFilters>) {
  const [data, setData] = useState<VendorSettlement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SettlementSummary | null>(null);
  const { page, pageSize, meta, setMeta, goToPage, changePageSize } = usePagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    status: "all",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await vendorsService.getSettlements(filters, page, pageSize);
      setData(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch settlements");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.status, filters.sortBy, filters.sortOrder, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    vendorsService.getSettlementSummary().then(setSummary).catch(() => {});
  }, []);

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  const processSettlement = useCallback(async (id: string) => {
    await vendorsService.processSettlement(id);
    fetchData();
    vendorsService.getSettlementSummary().then(setSummary).catch(() => {});
  }, [fetchData]);

  return {
    data, loading, error, summary, filters, meta,
    fetchData, updateFilters, processSettlement,
    goToPage, changePageSize,
  };
}

// ── Analytics Hook ────────────────────────────────────────

export function useVendorAnalytics(initialFilters?: Partial<VendorFilters>) {
  const [data, setData] = useState<VendorAnalyticsEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<VendorAnalyticsSummary | null>(null);
  const { page, pageSize, meta, setMeta, goToPage, changePageSize } = usePagination(10);
  const [filters, setFilters] = useState<VendorFilters>({
    search: "",
    sortBy: "",
    sortOrder: "desc",
    ...initialFilters,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await vendorsService.getVendorAnalytics(filters, page, pageSize);
      setData(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vendor analytics");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.sortBy, filters.sortOrder, page, pageSize]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    vendorsService.getAnalyticsSummary().then(setSummary).catch(() => {});
  }, []);

  const updateFilters = useCallback((update: Partial<VendorFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    goToPage(1);
  }, [goToPage]);

  return {
    data, loading, error, summary, filters, meta,
    fetchData, updateFilters, goToPage, changePageSize,
  };
}
