// ── Inventory API Adapter Tests ─────────────────────────────
// Tests inventory items, warehouses, stock transfers,
// safety stock, FEFO batches, demand forecasts, and alerts.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as inventoryApi from "../inventory.api";

beforeEach(() => resetMocks());

// ── Inventory Items ────────────────────────────────────────

describe("getInventory", () => {
  it("returns paginated inventory on success", async () => {
    const items = [{ id: "1", sku: "SKU001", productName: "Product A", quantity: 100 }];
    const response = { success: true, data: items, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await inventoryApi.getInventory({ search: "Product A", page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory", {
      params: { search: "Product A", page: 1, size: 10, status: undefined },
    });
  });

  it("returns paginated error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load inventory"));

    const result = await inventoryApi.getInventory();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.meta).toBeDefined();
  });
});

describe("getInventoryItem", () => {
  it("returns inventory item on success", async () => {
    const item = { id: "1", sku: "SKU001", quantity: 100 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: item }));

    const result = await inventoryApi.getInventoryItem("1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/1");
  });
});

describe("updateStock", () => {
  it("updates stock on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", quantity: 150 } }));

    const result = await inventoryApi.updateStock("1", { quantity: 150 });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/inventory/1", { quantity: 150 });
  });
});

// ── Warehouses ─────────────────────────────────────────────

describe("warehouses", () => {
  it("getWarehouses returns warehouses", async () => {
    const warehouses = [{ id: "w1", name: "Main Warehouse", location: "Zone A" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: warehouses }));

    const result = await inventoryApi.getWarehouses();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/warehouses");
  });

  it("getWarehouse returns single warehouse", async () => {
    const warehouse = { id: "w1", name: "Main Warehouse" };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: warehouse }));

    const result = await inventoryApi.getWarehouse("w1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/warehouses/w1");
  });

  it("updateWarehouse updates warehouse", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "w1", name: "Updated" } }));

    const result = await inventoryApi.updateWarehouse("w1", { name: "Updated" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/inventory/warehouses/w1", { name: "Updated" });
  });
});

// ── Stock Transfers ────────────────────────────────────────

describe("stock transfers", () => {
  it("getTransfers returns paginated transfers", async () => {
    const transfers = [{ id: "t1", fromWarehouse: "w1", toWarehouse: "w2", status: "in-transit" }];
    const response = { success: true, data: transfers, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await inventoryApi.getTransfers({ status: "in-transit" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/transfers", {
      params: { page: 1, size: 10, search: undefined, status: "in-transit" },
    });
  });

  it("createTransfer creates a transfer", async () => {
    const transferData = { fromWarehouseId: "w1", toWarehouseId: "w2", productId: "p1", quantity: 50 };
    const created = { id: "t1", ...transferData, status: "pending", createdAt: "2024-01-01" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: created }));

    const result = await inventoryApi.createTransfer(transferData);

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/inventory/transfers", transferData);
  });

  it("updateTransferStatus updates status", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "t1", status: "completed" } }));

    const result = await inventoryApi.updateTransferStatus("t1", "completed");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/inventory/transfers/t1", { status: "completed" });
  });
});

// ── Safety Stock ───────────────────────────────────────────

describe("safety stock", () => {
  it("getSafetyStockRules returns paginated rules", async () => {
    const rules = [{ id: "r1", productId: "p1", minStock: 10, maxStock: 100 }];
    const response = { success: true, data: rules, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await inventoryApi.getSafetyStockRules({ status: "active" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/safety-stock", {
      params: { status: "active" },
    });
  });

  it("updateSafetyStockRule updates rule", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "r1", minStock: 20 } }));

    const result = await inventoryApi.updateSafetyStockRule("r1", { minStock: 20 });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/inventory/safety-stock/r1", { minStock: 20 });
  });
});

// ── FEFO Batches ───────────────────────────────────────────

describe("getFEFOBatches", () => {
  it("returns paginated FEFO batches on success", async () => {
    const batches = [{ id: "f1", batchNumber: "B001", expiryDate: "2024-12-31", quantity: 500 }];
    const response = { success: true, data: batches, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await inventoryApi.getFEFOBatches({ search: "B001" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load FEFO batches"));

    const result = await inventoryApi.getFEFOBatches();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
  });
});

// ── Demand Forecasts ───────────────────────────────────────

describe("getDemandForecasts", () => {
  it("returns forecasts on success", async () => {
    const forecasts = [{ productId: "p1", forecastedDemand: 500, confidence: 0.85 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: forecasts }));

    const result = await inventoryApi.getDemandForecasts();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/forecasts");
  });
});

// ── Low Stock Alerts ───────────────────────────────────────

describe("getLowStockAlertsData", () => {
  it("returns low stock alerts on success", async () => {
    const alerts = [{ productId: "p1", productName: "Product A", currentStock: 5, reorderPoint: 10 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: alerts }));

    const result = await inventoryApi.getLowStockAlertsData();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/inventory/low-stock-alerts");
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load low stock alerts"));

    const result = await inventoryApi.getLowStockAlertsData();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load low stock alerts");
  });
});
