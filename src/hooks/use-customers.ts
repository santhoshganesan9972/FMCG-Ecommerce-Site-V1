// ── Customer Management Hooks ───────────────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Now powered by TanStack Query for caching, retry, and invalidation.

"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "@/services/customers.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidateCustomerQueries } from "@/lib/react-query/invalidation";
import type {
  Customer,
  CustomerFilters,
  Segment,
  AnalyticsMetric,
  CohortData,
  SupportTicket,
  TicketFilters,
  FraudAlert,
  FraudFilters,
} from "@/types/customers";
import type { PaginationState } from "@/types/products";

// ── Customers List Hook ──────────────────────────────────

export function useCustomers(initialFilters?: CustomerFilters) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>(initialFilters?.segment || "all");
  const [statusFilter, setStatusFilter] = useState<string>(initialFilters?.status || "all");
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const queryKey = queryKeys.customers.list({
    search: search || undefined,
    segment: segmentFilter !== "all" ? segmentFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    pageSize,
  });

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      customerService.getCustomers(
        { search, segment: segmentFilter, status: statusFilter },
        { page, pageSize },
      ),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const customers = data?.customers ?? [];
  const summary = data?.summary ?? {
    total: 0, active: 0, vip: 0, new: 0, atRisk: 0, churned: 0, totalRevenue: 0, avgOrderValue: 0,
  };
  const pagination: PaginationState = data?.pagination ?? { page, pageSize, total: 0 };

  const setPage = useCallback((p: number) => setPageState(p), []);
  const setPageSize = useCallback((s: number) => { setPageSizeState(s); setPageState(1); }, []);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) =>
      customerService.updateCustomer(id, data),
    onSuccess: () => invalidateCustomerQueries(queryClient),
  });

  const updateCustomer = useCallback(
    async (id: string, data: Partial<Customer>): Promise<Customer | null> => {
      try {
        return (await updateMutation.mutateAsync({ id, data })) ?? null;
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const fetchCustomers = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.customers.lists() });
  }, [queryClient]);

  return {
    customers,
    loading: isLoading,
    error: error?.message ?? null,
    search, setSearch,
    segmentFilter, setSegmentFilter,
    statusFilter, setStatusFilter,
    pagination, summary,
    setPage, setPageSize,
    fetchCustomers,
    updateCustomer,
  };
}

// ── Single Customer Hook ─────────────────────────────────

export function useCustomer(id: string) {
  const { data: customer, isLoading, error } = useQuery({
    queryKey: queryKeys.customers.detail(id),
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
  });

  return {
    customer: customer ?? null,
    loading: isLoading,
    error: error?.message ?? (customer === undefined && id ? "Customer not found" : null),
  };
}

// ── Customer Actions Hook ────────────────────────────────

export function useCustomerActions() {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      customerService.updateCustomerStatus(id, status),
    onSuccess: () => invalidateCustomerQueries(queryClient),
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      customerService.addCustomerNote(id, content, "Admin User"),
    onSuccess: () => invalidateCustomerQueries(queryClient),
  });

  const updateStatus = useCallback(
    async (id: string, status: string): Promise<boolean> => {
      try {
        await updateStatusMutation.mutateAsync({ id, status });
        return true;
      } catch {
        return false;
      }
    },
    [updateStatusMutation]
  );

  const addNote = useCallback(
    async (id: string, content: string): Promise<boolean> => {
      try {
        await addNoteMutation.mutateAsync({ id, content });
        return true;
      } catch {
        return false;
      }
    },
    [addNoteMutation]
  );

  return {
    updateStatus,
    addNote,
    updating: updateStatusMutation.isPending || addNoteMutation.isPending,
    error:
      updateStatusMutation.error?.message ??
      addNoteMutation.error?.message ??
      null,
  };
}

// ── Segments Hook ────────────────────────────────────────

export function useSegments() {
  const { data: segments, isLoading, error } = useQuery({
    queryKey: queryKeys.customers.segments.list(),
    queryFn: () => customerService.getSegments(),
  });

  const totalCustomers = useMemo(
    () => (segments ?? []).reduce((s, seg) => s + seg.customerCount, 0),
    [segments]
  );

  return {
    segments: segments ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    totalCustomers,
  };
}

// ── Analytics Hook ───────────────────────────────────────

export function useCustomerAnalytics() {
  const metricsQuery = useQuery({
    queryKey: queryKeys.customers.analytics.list(),
    queryFn: () => customerService.getAnalyticsMetrics(),
  });

  const cohortQuery = useQuery({
    queryKey: [...queryKeys.customers.analytics.list(), "cohort"],
    queryFn: () => customerService.getCohortData(),
  });

  const channelsQuery = useQuery({
    queryKey: [...queryKeys.customers.analytics.list(), "channels"],
    queryFn: () => customerService.getAcquisitionChannels(),
  });

  const loading = metricsQuery.isLoading || cohortQuery.isLoading || channelsQuery.isLoading;
  const error =
    metricsQuery.error?.message ??
    cohortQuery.error?.message ??
    channelsQuery.error?.message ??
    null;

  return {
    metrics: metricsQuery.data ?? [],
    cohortData: cohortQuery.data ?? [],
    acquisitionChannels: channelsQuery.data ?? [],
    loading,
    error,
  };
}

// ── Support Tickets Hook ─────────────────────────────────

export function useSupportTickets(initialFilters?: TicketFilters) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(initialFilters?.status || "all");
  const [priorityFilter, setPriorityFilter] = useState<string>(initialFilters?.priority || "all");
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const queryKey = queryKeys.customers.supportTickets.list({
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
    page,
    pageSize,
  });

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      customerService.getTickets(
        { search, status: statusFilter, priority: priorityFilter },
        { page, pageSize },
      ),
    placeholderData: (prev) => prev,
  });

  const tickets = data?.tickets ?? [];
  const summary = data?.summary ?? {
    total: 0, open: 0, inProgress: 0, resolved: 0, urgent: 0,
  };
  const pagination: PaginationState = data?.pagination ?? { page, pageSize, total: 0 };

  const setPage = useCallback((p: number) => setPageState(p), []);
  const setPageSize = useCallback((s: number) => { setPageSizeState(s); setPageState(1); }, []);

  const updateTicketMutation = useMutation({
    mutationFn: ({
      id, status, assignedTo,
    }: {
      id: string;
      status: string;
      assignedTo?: string;
    }) => customerService.updateTicketStatus(id, status, assignedTo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.supportTickets.all });
    },
  });

  const updateTicketStatus = useCallback(
    async (id: string, status: string, assignedTo?: string): Promise<boolean> => {
      try {
        await updateTicketMutation.mutateAsync({ id, status, assignedTo });
        return true;
      } catch {
        return false;
      }
    },
    [updateTicketMutation]
  );

  return {
    tickets,
    loading: isLoading,
    error: error?.message ?? null,
    search, setSearch,
    statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter,
    pagination, summary,
    setPage, setPageSize,
    fetchTickets: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.supportTickets.all }),
    updateTicketStatus,
  };
}

// ── Fraud Detection Hook ─────────────────────────────────

export function useFraudAlerts(initialFilters?: FraudFilters) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(initialFilters?.status || "all");
  const [riskLevelFilter, setRiskLevelFilter] = useState<string>(initialFilters?.riskLevel || "all");
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const alertsQueryKey = queryKeys.customers.fraudAlerts.list({
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    riskLevel: riskLevelFilter !== "all" ? riskLevelFilter : undefined,
    page,
    pageSize,
  });

  const alertsQuery = useQuery({
    queryKey: alertsQueryKey,
    queryFn: () =>
      customerService.getFraudAlerts(
        { search, status: statusFilter, riskLevel: riskLevelFilter },
        { page, pageSize },
      ),
    placeholderData: (prev) => prev,
  });

  const analyticsQuery = useQuery({
    queryKey: [...queryKeys.customers.fraudAlerts.all, "analytics"],
    queryFn: () => customerService.getFraudAnalytics(),
  });

  const alerts = alertsQuery.data?.alerts ?? [];
  const summary = alertsQuery.data?.summary ?? {
    total: 0, blocked: 0, flagged: 0, monitoring: 0, critical: 0, high: 0,
  };
  const pagination: PaginationState = alertsQuery.data?.pagination ?? { page, pageSize, total: 0 };
  const analytics = analyticsQuery.data ?? null;

  const setPage = useCallback((p: number) => setPageState(p), []);
  const setPageSize = useCallback((s: number) => { setPageSizeState(s); setPageState(1); }, []);

  const updateAlertMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      customerService.updateFraudAlertStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.fraudAlerts.all });
    },
  });

  const updateAlertStatus = useCallback(
    async (id: string, status: string): Promise<boolean> => {
      try {
        await updateAlertMutation.mutateAsync({ id, status });
        return true;
      } catch {
        return false;
      }
    },
    [updateAlertMutation]
  );

  return {
    alerts,
    loading: alertsQuery.isLoading,
    error: alertsQuery.error?.message ?? null,
    search, setSearch,
    statusFilter, setStatusFilter,
    riskLevelFilter, setRiskLevelFilter,
    pagination, summary,
    analytics,
    setPage, setPageSize,
    fetchAlerts: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.customers.fraudAlerts.all }),
    updateAlertStatus,
  };
}
