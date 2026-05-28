// ── Inventory Service ──────────────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type { InventoryItem, Warehouse, StockTransfer, SafetyStockRule, FEFOBatch, DemandForecast, LowStockAlert, InventoryQueryParams, TransferQueryParams } from "@/types/inventory";
import { inventoryApi } from "@/services/api";

export const inventoryService = {
  // ── Inventory Items ──────────────────────────────
  async getInventory(params?: InventoryQueryParams) {
    // API adapter returns ApiResponse<InventoryItem[]> with meta
    const res = await inventoryApi.getInventory(params);
    return {
      success: res.success,
      data: res.data,
      error: res.error,
      pagination: {
        page: res.meta?.page || 1,
        pageSize: res.meta?.pageSize || 10,
        total: res.meta?.total || 0,
        totalPages: res.meta?.totalPages || 0,
      },
    };
  },

  async getInventoryItem(id: string): Promise<{ success: boolean; data: InventoryItem }> {
    const res = await inventoryApi.getInventoryItem(id);
    return { success: res.success, data: res.data, error: res.error };
  },

  async updateStock(id: string, updates: Partial<InventoryItem>): Promise<{ success: boolean; data: InventoryItem }> {
    const res = await inventoryApi.updateStock(id, updates);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Warehouses ───────────────────────────────────
  async getWarehouses(): Promise<{ success: boolean; data: Warehouse[] }> {
    const res = await inventoryApi.getWarehouses();
    return { success: res.success, data: res.data, error: res.error };
  },

  async getWarehouse(id: string): Promise<{ success: boolean; data: Warehouse }> {
    const res = await inventoryApi.getWarehouse(id);
    return { success: res.success, data: res.data, error: res.error };
  },

  async updateWarehouse(id: string, updates: Partial<Warehouse>): Promise<{ success: boolean; data: Warehouse }> {
    const res = await inventoryApi.updateWarehouse(id, updates);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Stock Transfers ──────────────────────────────
  async getTransfers(params?: TransferQueryParams) {
    const res = await inventoryApi.getTransfers(params);
    return {
      success: res.success,
      data: res.data,
      error: res.error,
      pagination: {
        page: res.meta?.page || 1,
        pageSize: res.meta?.pageSize || 10,
        total: res.meta?.total || 0,
        totalPages: res.meta?.totalPages || 0,
      },
    };
  },

  async createTransfer(transfer: Omit<StockTransfer, "id" | "status" | "createdAt">): Promise<{ success: boolean; data: StockTransfer }> {
    const res = await inventoryApi.createTransfer(transfer);
    return { success: res.success, data: res.data, error: res.error };
  },

  async updateTransferStatus(id: string, status: StockTransfer["status"]): Promise<{ success: boolean; data: StockTransfer }> {
    const res = await inventoryApi.updateTransferStatus(id, status);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Safety Stock ─────────────────────────────────
  async getSafetyStockRules(params?: { status?: string; search?: string }) {
    const res = await inventoryApi.getSafetyStockRules(params);
    return {
      success: res.success,
      data: res.data,
      error: res.error,
      pagination: {
        page: res.meta?.page || 1,
        pageSize: res.meta?.pageSize || 10,
        total: res.meta?.total || 0,
        totalPages: res.meta?.totalPages || 0,
      },
    };
  },

  async updateSafetyStockRule(id: string, updates: Partial<SafetyStockRule>): Promise<{ success: boolean; data: SafetyStockRule }> {
    const res = await inventoryApi.updateSafetyStockRule(id, updates);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── FEFO ─────────────────────────────────────────
  async getFEFOBatches(params?: { search?: string; status?: string }) {
    const res = await inventoryApi.getFEFOBatches(params);
    return {
      success: res.success,
      data: res.data,
      error: res.error,
      pagination: {
        page: res.meta?.page || 1,
        pageSize: res.meta?.pageSize || 10,
        total: res.meta?.total || 0,
        totalPages: res.meta?.totalPages || 0,
      },
    };
  },

  // ── Demand Forecasts ─────────────────────────────
  async getDemandForecasts(): Promise<{ success: boolean; data: DemandForecast[] }> {
    const res = await inventoryApi.getDemandForecasts();
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Low Stock Alerts ─────────────────────────────
  async getLowStockAlerts(): Promise<{ success: boolean; data: LowStockAlert[] }> {
    const res = await inventoryApi.getLowStockAlerts();
    return { success: res.success, data: res.data, error: res.error };
  },
};
