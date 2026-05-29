// ── Order Management Hooks ──────────────────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Now powered by TanStack Query for caching, retry, and invalidation.

"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/orders.service";
import { notifyOrder } from "@/lib/notifications";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidateOrderQueries, invalidateSingleOrder } from "@/lib/react-query/invalidation";
import type {
  Order,
  DeliveryPartner,
  Substitution,
  BulkJob,
  OrderFilters,
  AssignPartnerFormData,
  StatusUpdateFormData,
  SubstitutionDecisionData,
} from "@/types/orders";
import type { PaginationState } from "@/types/products";

// ── Orders List Hook ─────────────────────────────────────

export function useOrders(initialStatus?: string) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatus || "all");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const queryKey = queryKeys.orders.list({
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    pageSize,
  });

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      orderService.getOrders(
        { search, status: statusFilter },
        { page, pageSize }
      ),
    placeholderData: (prev) => prev,
    staleTime: 15_000,
  });

  const orders = data?.orders ?? [];
  const summary = data?.summary ?? {
    total: 0, pending: 0, confirmed: 0, preparing: 0,
    outForDelivery: 0, delivered: 0, cancelled: 0, returned: 0,
    revenue: 0,
  };
  const pagination: PaginationState = data?.pagination ?? { page, pageSize, total: 0 };

  const setPage = useCallback((p: number) => { setPageState(p); }, []);
  const setPageSize = useCallback((s: number) => { setPageSizeState(s); setPageState(1); }, []);

  const kanbanGroups = useMemo(() => {
    const groups: Record<string, Order[]> = {
      pending: [], confirmed: [], preparing: [],
      out_for_delivery: [], delivered: [], cancelled: [], returned: [],
    };
    orders.forEach((o) => {
      if (groups[o.status]) groups[o.status].push(o);
    });
    return groups;
  }, [orders]);

  const fetchOrders = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
  }, [queryClient]);

  return {
    orders, loading: isLoading, error: error?.message ?? null,
    search, setSearch,
    statusFilter, setStatusFilter,
    viewMode, setViewMode,
    pagination, summary, kanbanGroups,
    setPage, setPageSize,
    fetchOrders,
  };
}

// ── Single Order Hook ────────────────────────────────────

export function useOrder(id: string) {
  const queryClient = useQueryClient();

  const { data: order, isLoading, error } = useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ newStatus, note }: { newStatus: string; note?: string }) =>
      orderService.updateOrderStatus(id, newStatus, note),
    onSuccess: () => {
      invalidateSingleOrder(queryClient, id);
      notifyOrder.statusChanged(id, "").catch(() => {});
    },
  });

  const updateStatus = useCallback(
    async (newStatus: string, note?: string): Promise<boolean> => {
      try {
        await updateStatusMutation.mutateAsync({ newStatus, note });
        return true;
      } catch {
        return false;
      }
    },
    [updateStatusMutation]
  );

  return {
    order: order ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    updateStatus,
    updating: updateStatusMutation.isPending,
  };
}

// ── Order Actions Hook ───────────────────────────────────

export function useOrderActions() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const updateStatusMutation = useMutation({
    mutationFn: (data: StatusUpdateFormData) =>
      orderService.updateOrderStatus(data.orderId, data.newStatus, data.note),
    onSuccess: (_, data) => {
      invalidateOrderQueries(queryClient);
      notifyOrder.statusChanged(data.orderId, data.newStatus).catch(() => {});
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to update status");
    },
  });

  const assignPartnerMutation = useMutation({
    mutationFn: (data: AssignPartnerFormData) => orderService.assignPartner(data),
    onSuccess: () => {
      invalidateOrderQueries(queryClient);
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to assign partner");
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ orderId, note }: { orderId: string; note: string }) =>
      orderService.addOrderNote(orderId, note, "Super Admin"),
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to add note");
    },
  });

  const updateStatus = useCallback(
    async (data: StatusUpdateFormData): Promise<boolean> => {
      setError(null);
      try {
        await updateStatusMutation.mutateAsync(data);
        return true;
      } catch {
        return false;
      }
    },
    [updateStatusMutation]
  );

  const assignPartner = useCallback(
    async (data: AssignPartnerFormData): Promise<boolean> => {
      setError(null);
      try {
        await assignPartnerMutation.mutateAsync(data);
        return true;
      } catch {
        return false;
      }
    },
    [assignPartnerMutation]
  );

  const addNote = useCallback(
    async (orderId: string, note: string): Promise<boolean> => {
      setError(null);
      try {
        await addNoteMutation.mutateAsync({ orderId, note });
        return true;
      } catch {
        return false;
      }
    },
    [addNoteMutation]
  );

  return {
    updateStatus,
    assignPartner,
    addNote,
    updating:
      updateStatusMutation.isPending ||
      assignPartnerMutation.isPending ||
      addNoteMutation.isPending,
    error,
  };
}

// ── Delivery Partners Hook ───────────────────────────────

export function useDeliveryPartners() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.orders.deliveryPartners.list(search || undefined),
    queryFn: () => orderService.getDeliveryPartners(search),
    placeholderData: (prev) => prev,
  });

  const partners = data?.partners ?? [];
  const onlineCount = useMemo(() => partners.filter((p) => p.status === "online").length, [partners]);
  const zones = useMemo(() => [...new Set(partners.map((p) => p.zone).filter(Boolean))] as string[], [partners]);

  return {
    partners,
    loading: isLoading,
    error: error?.message ?? null,
    search,
    setSearch,
    onlineCount,
    zones,
    fetchPartners: () => {}, // auto-fetched via query
  };
}

// ── Substitutions Hook ───────────────────────────────────

export function useSubstitutions() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const queryKey = queryKeys.orders.substitutions.list({
    search: search || undefined,
    status: statusFilter || undefined,
    page,
    pageSize,
  });

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      orderService.getSubstitutions(
        { search, status: statusFilter || undefined },
        { page, pageSize }
      ),
    placeholderData: (prev) => prev,
  });

  const substitutions = data?.substitutions ?? [];
  const pagination: PaginationState = data?.pagination ?? { page, pageSize, total: 0 };

  const decideSubstitutionMutation = useMutation({
    mutationFn: (data: SubstitutionDecisionData) => orderService.decideSubstitution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.substitutions.all });
    },
  });

  const decideSubstitution = useCallback(
    async (data: SubstitutionDecisionData): Promise<boolean> => {
      try {
        await decideSubstitutionMutation.mutateAsync(data);
        return true;
      } catch {
        return false;
      }
    },
    [decideSubstitutionMutation]
  );

  const setPage = useCallback((p: number) => { setPageState(p); }, []);
  const setPageSize = useCallback((s: number) => { setPageSizeState(s); setPageState(1); }, []);

  return {
    substitutions,
    loading: isLoading,
    error: error?.message ?? null,
    search, setSearch,
    statusFilter, setStatusFilter,
    pagination,
    decideSubstitution,
    setPage, setPageSize,
    fetchSubstitutions: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.substitutions.all }),
  };
}

// ── Bulk Jobs Hook ───────────────────────────────────────

export function useBulkJobs() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(10);

  const queryKey = queryKeys.orders.bulkJobs.list({
    search: search || undefined,
    page,
    pageSize,
  });

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => orderService.getBulkJobs(search, { page, pageSize }),
    placeholderData: (prev) => prev,
  });

  const jobs = data?.jobs ?? [];
  const pagination: PaginationState = data?.pagination ?? { page, pageSize, total: 0 };

  const createBulkActionMutation = useMutation({
    mutationFn: (params: { actionType: string; orderIds: string[]; targetStatus?: string }) =>
      orderService.createBulkAction(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.bulkJobs.all });
    },
  });

  const createBulkAction = useCallback(
    async (actionType: string, orderIds: string[], targetStatus?: string): Promise<boolean> => {
      try {
        await createBulkActionMutation.mutateAsync({ actionType, orderIds, targetStatus });
        return true;
      } catch {
        return false;
      }
    },
    [createBulkActionMutation]
  );

  const setPage = useCallback((p: number) => { setPageState(p); }, []);
  const setPageSize = useCallback((s: number) => { setPageSizeState(s); setPageState(1); }, []);

  return {
    jobs,
    loading: isLoading,
    error: error?.message ?? null,
    search, setSearch,
    processing: createBulkActionMutation.isPending,
    pagination,
    createBulkAction,
    setPage, setPageSize,
    fetchJobs: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.bulkJobs.all }),
  };
}

// ── Unassigned Orders Hook ───────────────────────────────

export function useUnassignedOrders() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.orders.list({ search: search || undefined, unassigned: true, page, pageSize }),
    queryFn: () => orderService.getOrders({ search }, { page, pageSize }),
    select: (result) => ({
      ...result,
      orders: result.orders.filter((o) => !o.deliveryPartner),
    }),
    placeholderData: (prev) => prev,
  });

  return {
    orders: data?.orders ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    search, setSearch,
    setPage,
    fetchOrders: () => {},
  };
}
