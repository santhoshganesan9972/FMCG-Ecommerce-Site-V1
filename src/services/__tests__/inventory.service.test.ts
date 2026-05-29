// ── Inventory Service Tests ─────────────────────────────────
// Tests the service layer for inventory items, warehouses,
// stock transfers, safety stock rules, FEFO batches,
// demand forecasts, and low stock alerts.

import { describe, it, expect, beforeEach } from "vitest";
import { mockInventoryApi, resetMocks } from "./setup";
import { inventoryService } from "../inventory.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };
const mockItem = { id: "1", sku: "SKU001", productName: "Milk", category: "Dairy", stock: 100, warehouse: "WH-01", status: "in_stock" as const };

// ── getInventory ────────────────────────────────────────────

describe("getInventory", () => {
  it("returns paginated inventory items on success", async () => {
    mockInventoryApi.getInventory.mockResolvedValue({
      success: true,
      data: [mockItem],
      meta: mockMeta,
    });

    const result = await inventoryService.getInventory({ category: "Dairy", page: 1, pageSize: 10 });

    expect(result.data).toEqual([mockItem]);
    expect(result.pagination).toEqual({ page: 1, pageSize: 10, total: 1, totalPages: 1 });
    expect(mockInventoryApi.getInventory).toHaveBeenCalledWith({ category: "Dairy", page: 1, pageSize: 10 });
  });

  it("provides fallback pagination when meta is missing", async () => {
    mockInventoryApi.getInventory.mockResolvedValue({ success: true, data: [] });

    const result = await inventoryService.getInventory();

    expect(result.data).toEqual([]);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.total).toBe(0);
  });
});

// ── getInventoryItem ────────────────────────────────────────

describe("getInventoryItem", () => {
  it("returns inventory item on success", async () => {
    mockInventoryApi.getInventoryItem.mockResolvedValue({ success: true, data: mockItem });

    const result = await inventoryService.getInventoryItem("1");

    expect(result.success).toBe(true);
    expect(result.data.sku).toBe("SKU001");
    expect(mockInventoryApi.getInventoryItem).toHaveBeenCalledWith("1");
  });

  it("propagates error on failure", async () => {
    mockInventoryApi.getInventoryItem.mockResolvedValue({
      success: false,
      data: {} as any,
      error: "Item not found",
    });

    const result = await inventoryService.getInventoryItem("999");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Item not found");
  });
});

// ── updateStock ─────────────────────────────────────────────

describe("updateStock", () => {
  it("returns updated item on success", async () => {
    const updated = { ...mockItem, stock: 150 };
    mockInventoryApi.updateStock.mockResolvedValue({ success: true, data: updated });

    const result = await inventoryService.updateStock("1", { stock: 150 });

    expect(result.data.stock).toBe(150);
    expect(mockInventoryApi.updateStock).toHaveBeenCalledWith("1", { stock: 150 });
  });
});

// ── Warehouses ──────────────────────────────────────────────

describe("warehouses", () => {
  it("getWarehouses returns warehouse list", async () => {
    const warehouses = [{ id: "wh1", name: "Main Warehouse", location: "City Center", status: "active" as const, capacity: 5000, usedCapacity: 3500 }];
    mockInventoryApi.getWarehouses.mockResolvedValue({ success: true, data: warehouses });

    const result = await inventoryService.getWarehouses();

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe("Main Warehouse");
  });

  it("getWarehouse returns single warehouse", async () => {
    const warehouse = { id: "wh1", name: "Main Warehouse", location: "City Center", status: "active" as const, capacity: 5000, usedCapacity: 3500 };
    mockInventoryApi.getWarehouse.mockResolvedValue({ success: true, data: warehouse });

    const result = await inventoryService.getWarehouse("wh1");

    expect(result.data.name).toBe("Main Warehouse");
    expect(mockInventoryApi.getWarehouse).toHaveBeenCalledWith("wh1");
  });

  it("updateWarehouse returns updated warehouse", async () => {
    const updated = { id: "wh1", name: "Updated Warehouse", status: "active" as const };
    mockInventoryApi.updateWarehouse.mockResolvedValue({ success: true, data: updated });

    const result = await inventoryService.updateWarehouse("wh1", { name: "Updated Warehouse" });

    expect(result.data.name).toBe("Updated Warehouse");
    expect(mockInventoryApi.updateWarehouse).toHaveBeenCalledWith("wh1", { name: "Updated Warehouse" });
  });
});

// ── Stock Transfers ─────────────────────────────────────────

describe("stock transfers", () => {
  it("getTransfers returns paginated transfers", async () => {
    const transfers = [{ id: "t1", fromWarehouse: "WH-01", toWarehouse: "WH-02", sku: "SKU001", quantity: 50, status: "pending" as const, createdAt: "2024-01-01" }];
    mockInventoryApi.getTransfers.mockResolvedValue({ success: true, data: transfers, meta: mockMeta });

    const result = await inventoryService.getTransfers({ status: "pending" });

    expect(result.data).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
    expect(mockInventoryApi.getTransfers).toHaveBeenCalledWith({ status: "pending" });
  });

  it("createTransfer returns created transfer", async () => {
    const transfer = { id: "t2", fromWarehouse: "WH-01", toWarehouse: "WH-02", sku: "SKU002", quantity: 30, status: "pending" as const, createdAt: "2024-01-01" };
    mockInventoryApi.createTransfer.mockResolvedValue({ success: true, data: transfer });

    const result = await inventoryService.createTransfer({ fromWarehouse: "WH-01", toWarehouse: "WH-02", sku: "SKU002", quantity: 30 });

    expect(result.data.id).toBe("t2");
    expect(mockInventoryApi.createTransfer).toHaveBeenCalledWith({ fromWarehouse: "WH-01", toWarehouse: "WH-02", sku: "SKU002", quantity: 30 });
  });

  it("updateTransferStatus returns updated transfer", async () => {
    const updated = { id: "t1", fromWarehouse: "WH-01", toWarehouse: "WH-02", sku: "SKU001", quantity: 50, status: "completed" as const, createdAt: "2024-01-01" };
    mockInventoryApi.updateTransferStatus.mockResolvedValue({ success: true, data: updated });

    const result = await inventoryService.updateTransferStatus("t1", "completed");

    expect(result.data.status).toBe("completed");
    expect(mockInventoryApi.updateTransferStatus).toHaveBeenCalledWith("t1", "completed");
  });
});

// ── Safety Stock ────────────────────────────────────────────

describe("safety stock", () => {
  it("getSafetyStockRules returns paginated rules", async () => {
    const rules = [{ id: "ss1", sku: "SKU001", minStock: 20, maxStock: 100, leadTimeDays: 3 }];
    mockInventoryApi.getSafetyStockRules.mockResolvedValue({ success: true, data: rules, meta: mockMeta });

    const result = await inventoryService.getSafetyStockRules({ status: "active" });

    expect(result.data).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
    expect(mockInventoryApi.getSafetyStockRules).toHaveBeenCalledWith({ status: "active" });
  });

  it("updateSafetyStockRule returns updated rule", async () => {
    const updated = { id: "ss1", sku: "SKU001", minStock: 30, maxStock: 120, leadTimeDays: 3 };
    mockInventoryApi.updateSafetyStockRule.mockResolvedValue({ success: true, data: updated });

    const result = await inventoryService.updateSafetyStockRule("ss1", { minStock: 30 });

    expect(result.data.minStock).toBe(30);
  });
});

// ── FEFO Batches ────────────────────────────────────────────

describe("FEFO batches", () => {
  it("getFEFOBatches returns paginated batches", async () => {
    const batches = [{ id: "fb1", sku: "SKU001", batchNumber: "B2024-001", quantity: 50, expiryDate: "2024-06-01", status: "fresh" as const }];
    mockInventoryApi.getFEFOBatches.mockResolvedValue({ success: true, data: batches, meta: mockMeta });

    const result = await inventoryService.getFEFOBatches({ status: "fresh" });

    expect(result.data).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
    expect(mockInventoryApi.getFEFOBatches).toHaveBeenCalledWith({ status: "fresh" });
  });
});

// ── Demand Forecasts ────────────────────────────────────────

describe("getDemandForecasts", () => {
  it("returns demand forecasts on success", async () => {
    const forecasts = [{ sku: "SKU001", productName: "Milk", forecastedDemand: 500, confidence: 0.85, period: "2024-02" }];
    mockInventoryApi.getDemandForecasts.mockResolvedValue({ success: true, data: forecasts });

    const result = await inventoryService.getDemandForecasts();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].forecastedDemand).toBe(500);
  });
});

// ── Low Stock Alerts ────────────────────────────────────────

describe("getLowStockAlerts", () => {
  it("returns low stock alerts on success", async () => {
    const alerts = [{ sku: "SKU001", productName: "Milk", currentStock: 5, threshold: 20 }];
    mockInventoryApi.getLowStockAlerts.mockResolvedValue({ success: true, data: alerts });

    const result = await inventoryService.getLowStockAlerts();

    expect(result.success).toBe(true);
    expect(result.data[0].currentStock).toBe(5);
  });

  it("propagates error on failure", async () => {
    mockInventoryApi.getLowStockAlerts.mockResolvedValue({ success: false, data: [], error: "Failed to load alerts" });

    const result = await inventoryService.getLowStockAlerts();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load alerts");
  });
});
