// ── Inventory API Adapter ───────────────────────────────────
// Connects admin inventory management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse, paginatedErrorResponse } from "@/types/api";
import type { ApiResponse, PaginatedResponse, MutationResult } from "@/types/api";
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

const I = ADMIN;

// ── Inventory Items ────────────────────────────────────────

export async function getInventory(params?: InventoryQueryParams): Promise<PaginatedResponse<InventoryItem>> {
  try {
    const response = await apiClient.get(I.INVENTORY, {
      params: {
        page: params?.page || 1,
        size: params?.pageSize || 10,
        search: params?.search,
        status: params?.status,
      },
    });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<InventoryItem>(
      error instanceof Error ? error.message : "Failed to load inventory",
    );
  }
}

export async function getInventoryItem(id: string): Promise<ApiResponse<InventoryItem>> {
  try {
    const response = await apiClient.get(I.INVENTORY_ITEM(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Inventory item not found",
    );
  }
}

export async function updateStock(id: string, updates: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> {
  try {
    const response = await apiClient.put(I.INVENTORY_ITEM(id), updates);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update stock",
    );
  }
}

// ── Warehouses ─────────────────────────────────────────────

export async function getWarehouses(): Promise<ApiResponse<Warehouse[]>> {
  try {
    const response = await apiClient.get(I.INVENTORY_WAREHOUSES);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load warehouses",
    );
  }
}

export async function getWarehouse(id: string): Promise<ApiResponse<Warehouse>> {
  try {
    const response = await apiClient.get(I.INVENTORY_WAREHOUSE(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Warehouse not found",
    );
  }
}

export async function updateWarehouse(id: string, updates: Partial<Warehouse>): Promise<ApiResponse<Warehouse>> {
  try {
    const response = await apiClient.put(I.INVENTORY_WAREHOUSE(id), updates);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update warehouse",
    );
  }
}

// ── Stock Transfers ────────────────────────────────────────

export async function getTransfers(params?: TransferQueryParams): Promise<PaginatedResponse<StockTransfer>> {
  try {
    const response = await apiClient.get(I.INVENTORY_TRANSFERS, {
      params: {
        page: params?.page || 1,
        size: params?.pageSize || 10,
        search: params?.search,
        status: params?.status,
      },
    });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<StockTransfer>(
      error instanceof Error ? error.message : "Failed to load stock transfers",
    );
  }
}

export async function createTransfer(transfer: Omit<StockTransfer, "id" | "status" | "createdAt">): Promise<ApiResponse<StockTransfer>> {
  try {
    const response = await apiClient.post(I.INVENTORY_TRANSFERS, transfer);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create transfer",
    );
  }
}

export async function updateTransferStatus(id: string, status: StockTransfer["status"]): Promise<ApiResponse<StockTransfer>> {
  try {
    const response = await apiClient.put(I.INVENTORY_TRANSFER(id), { status });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update transfer status",
    );
  }
}

// ── Safety Stock ───────────────────────────────────────────

export async function getSafetyStockRules(params?: { status?: string; search?: string }): Promise<PaginatedResponse<SafetyStockRule>> {
  try {
    const response = await apiClient.get(I.INVENTORY_SAFETY_STOCK, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<SafetyStockRule>(
      error instanceof Error ? error.message : "Failed to load safety stock rules",
    );
  }
}

export async function updateSafetyStockRule(id: string, updates: Partial<SafetyStockRule>): Promise<ApiResponse<SafetyStockRule>> {
  try {
    const response = await apiClient.put(I.INVENTORY_SAFETY_STOCK_RULE(id), updates);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update safety stock rule",
    );
  }
}

// ── FEFO ───────────────────────────────────────────────────

export async function getFEFOBatches(params?: { search?: string; status?: string }): Promise<PaginatedResponse<FEFOBatch>> {
  try {
    const response = await apiClient.get(I.INVENTORY_FEFO, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<FEFOBatch>(
      error instanceof Error ? error.message : "Failed to load FEFO batches",
    );
  }
}

// ── Demand Forecasts ───────────────────────────────────────

export async function getDemandForecasts(): Promise<ApiResponse<DemandForecast[]>> {
  try {
    const response = await apiClient.get(I.INVENTORY_FORECASTS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load demand forecasts",
    );
  }
}

// ── Low Stock Alerts ───────────────────────────────────────

export async function getLowStockAlertsData(): Promise<ApiResponse<LowStockAlert[]>> {
  try {
    const response = await apiClient.get(I.INVENTORY_LOW_STOCK_ALERTS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load low stock alerts",
    );
  }
}
