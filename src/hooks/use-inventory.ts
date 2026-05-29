// ── Inventory Hooks ────────────────────────────────
// Data-fetching hooks for all inventory subsections.
// Now backed by TanStack Query for caching, retry, and invalidation.

"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory.service";
import { queryKeys } from "@/lib/react-query/query-keys";
import { invalidateInventoryQueries } from "@/lib/react-query/invalidation";
import type {
  InventoryItem,
  Warehouse,
  StockTransfer,
  SafetyStockRule,
  FEFOBatch,
  DemandForecast,
  LowStockAlert,
  InventoryQueryParams,
  TransferQueryParams,
} from "@/types/inventory";

// ── useInventoryItems ─────────────────────────────────────
export function useInventoryItems(initialParams?: InventoryQueryParams) {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<InventoryQueryParams | undefined>(initialParams);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.list(params as Record<string, unknown> | undefined),
    queryFn: () => inventoryService.getInventory(params),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const items = data?.data ?? [];
  const pagination = data?.pagination ?? { page: 1, pageSize: 10, total: 0, totalPages: 0 };

  const refresh = useCallback(
    (p?: InventoryQueryParams) => {
      if (p) setParams(p);
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.list((p || params) as Record<string, unknown> | undefined) });
    },
    [queryClient, params],
  );

  return { items, loading: isLoading, error: error?.message ?? null, pagination, refresh };
}

// ── useWarehouses ─────────────────────────────────────────
export function useWarehouses() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.warehouses.list(),
    queryFn: () => inventoryService.getWarehouses(),
    staleTime: 60_000,
  });

  return { warehouses: data?.data ?? [], loading: isLoading, error: error?.message ?? null };
}

// ── useStockTransfers ─────────────────────────────────────
export function useStockTransfers(initialParams?: TransferQueryParams) {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<TransferQueryParams | undefined>(initialParams);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.transfers.list(params as Record<string, unknown> | undefined),
    queryFn: () => inventoryService.getTransfers(params),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const transfers = data?.data ?? [];
  const pagination = data?.pagination ?? { page: 1, pageSize: 10, total: 0, totalPages: 0 };

  const createTransferMutation = useMutation({
    mutationFn: (transferData: Omit<StockTransfer, "id" | "status" | "createdAt">) =>
      inventoryService.createTransfer(transferData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.transfers.all });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: StockTransfer["status"] }) =>
      inventoryService.updateTransferStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.transfers.all });
    },
  });

  const createTransfer = useCallback(
    async (transferData: Omit<StockTransfer, "id" | "status" | "createdAt">) => {
      try {
        return await createTransferMutation.mutateAsync(transferData);
      } catch {
        return null;
      }
    },
    [createTransferMutation],
  );

  const updateStatus = useCallback(
    async (id: string, status: StockTransfer["status"]) => {
      try {
        return await updateStatusMutation.mutateAsync({ id, status });
      } catch {
        return null;
      }
    },
    [updateStatusMutation],
  );

  const refresh = useCallback(
    (p?: TransferQueryParams) => {
      if (p) setParams(p);
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.transfers.all });
    },
    [queryClient],
  );

  return { transfers, loading: isLoading, error: error?.message ?? null, pagination, refresh, createTransfer, updateStatus };
}

// ── useSafetyStock ────────────────────────────────────────
export function useSafetyStock(initialStatus?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.safetyStock.list(initialStatus),
    queryFn: () => inventoryService.getSafetyStockRules({ status: initialStatus }),
    staleTime: 30_000,
  });

  return { rules: data?.data ?? [], loading: isLoading, error: error?.message ?? null };
}

// ── useFEFO ───────────────────────────────────────────────
export function useFEFO(initialSearch?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.fefo.list(initialSearch),
    queryFn: () => inventoryService.getFEFOBatches({ search: initialSearch }),
    staleTime: 30_000,
  });

  return { batches: data?.data ?? [], loading: isLoading, error: error?.message ?? null };
}

// ── useDemandForecasts ────────────────────────────────────
export function useDemandForecasts() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.forecasts.list(),
    queryFn: () => inventoryService.getDemandForecasts(),
    staleTime: 60_000,
  });

  return { forecasts: data?.data ?? [], loading: isLoading, error: error?.message ?? null };
}

// ── useLowStockAlerts ─────────────────────────────────────
export function useLowStockAlerts() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.inventory.lowStock.list(),
    queryFn: () => inventoryService.getLowStockAlerts(),
    staleTime: 60_000,
  });

  return { alerts: data?.data ?? [], loading: isLoading, error: error?.message ?? null };
}
