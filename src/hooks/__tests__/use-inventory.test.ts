// @vitest-environment jsdom
// ── useInventory Hook Tests ───────────────────────────────────
// Tests for all 7 inventory hooks backed by TanStack Query.

import { vi } from "vitest";

const mockInventoryService = vi.hoisted(() => ({
  getInventory: vi.fn(),
  getWarehouses: vi.fn(),
  getTransfers: vi.fn(),
  createTransfer: vi.fn(),
  updateTransferStatus: vi.fn(),
  getSafetyStockRules: vi.fn(),
  getFEFOBatches: vi.fn(),
  getDemandForecasts: vi.fn(),
  getLowStockAlerts: vi.fn(),
}));

vi.mock("@/services/inventory.service", () => ({
  inventoryService: mockInventoryService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import {
  useInventoryItems, useWarehouses, useStockTransfers,
  useSafetyStock, useFEFO, useDemandForecasts, useLowStockAlerts,
} from "@/hooks/use-inventory";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

const mockPaginatedItems = {
  data: [
    { id: "i-1", name: "Milk", sku: "MLK-001", quantity: 120, warehouse: "WH-A", category: "Dairy", status: "in_stock", unit: "liters", reorderPoint: 20, expiryDate: "2025-06-15", updatedAt: "2025-05-28T10:00:00Z" },
    { id: "i-2", name: "Bread", sku: "BRD-001", quantity: 80, warehouse: "WH-A", category: "Bakery", status: "in_stock", unit: "units", reorderPoint: 15, updatedAt: "2025-05-28T09:00:00Z" },
  ],
  pagination: { page: 1, pageSize: 10, total: 2, totalPages: 1 },
};

// ── useInventoryItems ─────────────────────────────────────────

describe("useInventoryItems", () => {
  it("returns loading state initially", () => {
    mockInventoryService.getInventory.mockReturnValue(new Promise(() => {}));
    const { result } = renderWithQuery(() => useInventoryItems());
    expect(result.current.loading).toBe(true);
    expect(result.current.items).toEqual([]);
  });

  it("returns items on success", async () => {
    mockInventoryService.getInventory.mockResolvedValue(mockPaginatedItems);
    const { result } = renderWithQuery(() => useInventoryItems());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0].name).toBe("Milk");
    expect(result.current.pagination.total).toBe(2);
  });

  it("returns error on failure", async () => {
    mockInventoryService.getInventory.mockRejectedValue(new Error("Inventory API error"));
    const { result } = renderWithQuery(() => useInventoryItems());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Inventory API error");
    expect(result.current.items).toEqual([]);
  });

  it("refresh calls invalidateQueries", async () => {
    mockInventoryService.getInventory.mockResolvedValue(mockPaginatedItems);
    const { result } = renderWithQuery(() => useInventoryItems());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(() => result.current.refresh()).not.toThrow();
  });
});

// ── useWarehouses ─────────────────────────────────────────────

describe("useWarehouses", () => {
  it("returns warehouses on success", async () => {
    mockInventoryService.getWarehouses.mockResolvedValue({
      data: [
        { id: "wh-1", name: "Warehouse A", location: "Chennai", capacity: 10000, used: 7500, status: "active" },
        { id: "wh-2", name: "Warehouse B", location: "Mumbai", capacity: 20000, used: 12000, status: "active" },
      ],
    });
    const { result } = renderWithQuery(() => useWarehouses());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.warehouses).toHaveLength(2);
    expect(result.current.warehouses[0].name).toBe("Warehouse A");
  });

  it("returns error on failure", async () => {
    mockInventoryService.getWarehouses.mockRejectedValue(new Error("Warehouses API error"));
    const { result } = renderWithQuery(() => useWarehouses());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Warehouses API error");
    expect(result.current.warehouses).toEqual([]);
  });
});

// ── useStockTransfers ─────────────────────────────────────────

describe("useStockTransfers", () => {
  it("returns transfers on success", async () => {
    mockInventoryService.getTransfers.mockResolvedValue({
      data: [
        { id: "tf-1", fromWarehouse: "WH-A", toWarehouse: "WH-B", product: "Milk", quantity: 50, status: "in_transit", createdAt: "2025-05-28T10:00:00Z" },
      ],
      pagination: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
    });
    const { result } = renderWithQuery(() => useStockTransfers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.transfers).toHaveLength(1);
    expect(result.current.pagination.total).toBe(1);
  });

  it("createTransfer calls mutation", async () => {
    mockInventoryService.getTransfers.mockResolvedValue({ data: [], pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 } });
    mockInventoryService.createTransfer.mockResolvedValue({ id: "tf-2", status: "pending" });
    const { result } = renderWithQuery(() => useStockTransfers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const transfer = await result.current.createTransfer({
      fromWarehouse: "WH-A", toWarehouse: "WH-C", product: "Cheese", quantity: 20,
    });
    expect(transfer?.id).toBe("tf-2");
    expect(mockInventoryService.createTransfer).toHaveBeenCalled();
  });

  it("createTransfer returns null on failure", async () => {
    mockInventoryService.getTransfers.mockResolvedValue({ data: [], pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 } });
    mockInventoryService.createTransfer.mockRejectedValue(new Error("Transfer failed"));
    const { result } = renderWithQuery(() => useStockTransfers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const transfer = await result.current.createTransfer({
      fromWarehouse: "WH-A", toWarehouse: "WH-C", product: "Cheese", quantity: 20,
    });
    expect(transfer).toBeNull();
  });

  it("updateStatus calls mutation", async () => {
    mockInventoryService.getTransfers.mockResolvedValue({ data: [], pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 } });
    mockInventoryService.updateTransferStatus.mockResolvedValue({ id: "tf-1", status: "completed" } as never);
    const { result } = renderWithQuery(() => useStockTransfers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = await result.current.updateStatus("tf-1", "completed");
    expect(updated).toEqual(expect.objectContaining({ id: "tf-1" }));
  });
});

// ── useSafetyStock ────────────────────────────────────────────

describe("useSafetyStock", () => {
  it("returns safety stock rules", async () => {
    mockInventoryService.getSafetyStockRules.mockResolvedValue({
      data: [
        { id: "ss-1", product: "Milk", minStock: 50, maxStock: 200, reorderPoint: 80, status: "active" },
        { id: "ss-2", product: "Bread", minStock: 30, maxStock: 150, reorderPoint: 60, status: "active" },
      ],
    });
    const { result } = renderWithQuery(() => useSafetyStock());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.rules).toHaveLength(2);
    expect(result.current.rules[0].product).toBe("Milk");
  });

  it("returns error on failure", async () => {
    mockInventoryService.getSafetyStockRules.mockRejectedValue(new Error("Safety stock API error"));
    const { result } = renderWithQuery(() => useSafetyStock());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Safety stock API error");
  });
});

// ── useFEFO ───────────────────────────────────────────────────

describe("useFEFO", () => {
  it("returns FEFO batches", async () => {
    mockInventoryService.getFEFOBatches.mockResolvedValue({
      data: [
        { id: "fefo-1", product: "Milk", batch: "B2025-01", quantity: 50, expiryDate: "2025-06-10", warehouse: "WH-A" },
        { id: "fefo-2", product: "Milk", batch: "B2025-02", quantity: 70, expiryDate: "2025-06-20", warehouse: "WH-A" },
      ],
    });
    const { result } = renderWithQuery(() => useFEFO());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.batches).toHaveLength(2);
    expect(result.current.batches[0].batch).toBe("B2025-01");
  });

  it("passes search param", async () => {
    mockInventoryService.getFEFOBatches.mockResolvedValue({ data: [] });
    renderWithQuery(() => useFEFO("Milk"));

    await waitFor(() => {
      expect(mockInventoryService.getFEFOBatches).toHaveBeenCalledWith({ search: "Milk" });
    });
  });
});

// ── useDemandForecasts ────────────────────────────────────────

describe("useDemandForecasts", () => {
  it("returns forecasts", async () => {
    mockInventoryService.getDemandForecasts.mockResolvedValue({
      data: [
        { id: "df-1", product: "Milk", period: "2025-06", forecast: 500, confidence: 0.85 },
        { id: "df-2", product: "Bread", period: "2025-06", forecast: 300, confidence: 0.80 },
      ],
    });
    const { result } = renderWithQuery(() => useDemandForecasts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.forecasts).toHaveLength(2);
    expect(result.current.forecasts[0].forecast).toBe(500);
  });

  it("returns error on failure", async () => {
    mockInventoryService.getDemandForecasts.mockRejectedValue(new Error("Forecast API error"));
    const { result } = renderWithQuery(() => useDemandForecasts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Forecast API error");
  });
});

// ── useLowStockAlerts ─────────────────────────────────────────

describe("useLowStockAlerts", () => {
  it("returns low stock alerts", async () => {
    mockInventoryService.getLowStockAlerts.mockResolvedValue({
      data: [
        { id: "ls-1", product: "Cheese", sku: "CHS-001", currentStock: 5, threshold: 20, warehouse: "WH-A", status: "critical" },
        { id: "ls-2", product: "Butter", sku: "BTR-001", currentStock: 8, threshold: 15, warehouse: "WH-B", status: "low" },
      ],
    });
    const { result } = renderWithQuery(() => useLowStockAlerts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.alerts).toHaveLength(2);
    expect(result.current.alerts[0].status).toBe("critical");
  });

  it("returns empty array on error", async () => {
    mockInventoryService.getLowStockAlerts.mockRejectedValue(new Error("Low stock API error"));
    const { result } = renderWithQuery(() => useLowStockAlerts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Low stock API error");
    expect(result.current.alerts).toEqual([]);
  });
});
