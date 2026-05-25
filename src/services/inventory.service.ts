// ── Inventory Service ──────────────────────────────
// Service layer for all Inventory Management API calls.
// Currently returns mock data — swap to real API by uncommenting axios calls.

// import { apiClient } from "@/lib/api-client";
import {
  mockInventoryItems,
  mockWarehouses,
  mockStockTransfers,
  mockSafetyStockRules,
  mockFEFOBatches,
  mockDemandForecasts,
  mockLowStockAlerts,
} from "@/data/admin/inventory";
import type { InventoryItem, Warehouse, StockTransfer, SafetyStockRule, FEFOBatch, DemandForecast, LowStockAlert, InventoryQueryParams, TransferQueryParams } from "@/types/inventory";

// Helper: simulate network delay
const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: filter & paginate
function applyPaginationAndSearch<T extends Record<string, unknown>>(
  items: T[],
  params: { page?: number; pageSize?: number; search?: string; status?: string },
  searchFields: (keyof T)[],
): { data: T[]; pagination: { page: number; pageSize: number; total: number; totalPages: number } } {
  let filtered = [...items];

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((item) =>
      searchFields.some((field) => String(item[field] ?? "").toLowerCase().includes(q)),
    );
  }

  if (params.status && params.status !== "all") {
    filtered = filtered.filter((item) => String(item.status ?? "") === params.status);
  }

  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const data = filtered.slice((page - 1) * pageSize, page * pageSize);

  return { data, pagination: { page, pageSize, total, totalPages } };
}

export const inventoryService = {
  // ── Inventory Items ──────────────────────────────
  async getInventory(params?: InventoryQueryParams) {
    await delay();
    // const res = await apiClient.get<ApiResponse>("/inventory", { params });
    const filtered = applyPaginationAndSearch(
      mockInventoryItems as unknown as Record<string, unknown>[],
      { page: params?.page, pageSize: params?.pageSize, search: params?.search, status: params?.status },
      ["productName", "sku", "warehouse"],
    );
    return { success: true, data: filtered.data as InventoryItem[], pagination: filtered.pagination };
  },

  async getInventoryItem(id: string): Promise<{ success: boolean; data: InventoryItem }> {
    await delay();
    // const res = await apiClient.get(`/inventory/${id}`);
    const item = mockInventoryItems.find((i) => i.id === id);
    if (!item) throw new Error(`Inventory item ${id} not found`);
    return { success: true, data: item };
  },

  async updateStock(id: string, updates: Partial<InventoryItem>): Promise<{ success: boolean; data: InventoryItem }> {
    await delay(300);
    // const res = await apiClient.patch(`/inventory/${id}`, updates);
    const idx = mockInventoryItems.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error(`Inventory item ${id} not found`);
    const updated = { ...mockInventoryItems[idx], ...updates, lastUpdated: new Date().toISOString().split("T")[0] };
    mockInventoryItems[idx] = updated;
    return { success: true, data: updated };
  },

  // ── Warehouses ───────────────────────────────────
  async getWarehouses(): Promise<{ success: boolean; data: Warehouse[] }> {
    await delay();
    // const res = await apiClient.get("/inventory/warehouses");
    return { success: true, data: mockWarehouses };
  },

  async getWarehouse(id: string): Promise<{ success: boolean; data: Warehouse }> {
    await delay();
    const wh = mockWarehouses.find((w) => w.id === id);
    if (!wh) throw new Error(`Warehouse ${id} not found`);
    return { success: true, data: wh };
  },

  async updateWarehouse(id: string, updates: Partial<Warehouse>): Promise<{ success: boolean; data: Warehouse }> {
    await delay(300);
    const idx = mockWarehouses.findIndex((w) => w.id === id);
    if (idx === -1) throw new Error(`Warehouse ${id} not found`);
    const updated = { ...mockWarehouses[idx], ...updates };
    mockWarehouses[idx] = updated;
    return { success: true, data: updated };
  },

  // ── Stock Transfers ──────────────────────────────
  async getTransfers(params?: TransferQueryParams) {
    await delay();
    // const res = await apiClient.get("/inventory/transfers", { params });
    const filtered = applyPaginationAndSearch(
      mockStockTransfers as unknown as Record<string, unknown>[],
      { page: params?.page, pageSize: params?.pageSize, search: params?.search, status: params?.status },
      ["product", "id", "sku"],
    );
    return { success: true, data: filtered.data as StockTransfer[], pagination: filtered.pagination };
  },

  async createTransfer(transfer: Omit<StockTransfer, "id" | "status" | "createdAt">): Promise<{ success: boolean; data: StockTransfer }> {
    await delay(400);
    // const res = await apiClient.post("/inventory/transfers", transfer);
    const newTransfer: StockTransfer = {
      ...transfer,
      id: `ST-${String(mockStockTransfers.length + 1).padStart(3, "0")}`,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    mockStockTransfers.unshift(newTransfer);
    return { success: true, data: newTransfer };
  },

  async updateTransferStatus(id: string, status: StockTransfer["status"]): Promise<{ success: boolean; data: StockTransfer }> {
    await delay(300);
    const idx = mockStockTransfers.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Transfer ${id} not found`);
    mockStockTransfers[idx] = {
      ...mockStockTransfers[idx],
      status,
      completedAt: status === "completed" ? new Date().toISOString() : mockStockTransfers[idx].completedAt,
    };
    return { success: true, data: mockStockTransfers[idx] };
  },

  // ── Safety Stock ─────────────────────────────────
  async getSafetyStockRules(params?: { status?: string; search?: string }) {
    await delay();
    // const res = await apiClient.get("/inventory/safety-stock", { params });
    const filtered = applyPaginationAndSearch(
      mockSafetyStockRules as unknown as Record<string, unknown>[],
      { ...params },
      ["product", "sku"],
    );
    return { success: true, data: filtered.data as SafetyStockRule[], pagination: filtered.pagination };
  },

  async updateSafetyStockRule(id: string, updates: Partial<SafetyStockRule>): Promise<{ success: boolean; data: SafetyStockRule }> {
    await delay(300);
    const idx = mockSafetyStockRules.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Safety stock rule ${id} not found`);
    mockSafetyStockRules[idx] = { ...mockSafetyStockRules[idx], ...updates };
    return { success: true, data: mockSafetyStockRules[idx] };
  },

  // ── FEFO ─────────────────────────────────────────
  async getFEFOBatches(params?: { search?: string; status?: string }) {
    await delay();
    // const res = await apiClient.get("/inventory/fefo", { params });
    const filtered = applyPaginationAndSearch(
      mockFEFOBatches as unknown as Record<string, unknown>[],
      { ...params },
      ["product", "batch", "warehouse"],
    );
    return { success: true, data: filtered.data as FEFOBatch[], pagination: filtered.pagination };
  },

  // ── Demand Forecasts ─────────────────────────────
  async getDemandForecasts(): Promise<{ success: boolean; data: DemandForecast[] }> {
    await delay();
    // const res = await apiClient.get("/inventory/forecasts");
    return { success: true, data: mockDemandForecasts };
  },

  // ── Low Stock Alerts ─────────────────────────────
  async getLowStockAlerts(): Promise<{ success: boolean; data: LowStockAlert[] }> {
    await delay();
    // const res = await apiClient.get("/inventory/low-stock-alerts");
    return { success: true, data: mockLowStockAlerts };
  },
};
