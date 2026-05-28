// @vitest-environment jsdom
// ── useOrders Hook Tests ─────────────────────────────────────

import { vi } from "vitest";

const mockOrderService = vi.hoisted(() => ({
  getOrders: vi.fn(),
  getOrderById: vi.fn(),
  updateOrderStatus: vi.fn(),
  assignPartner: vi.fn(),
  getDeliveryPartners: vi.fn(),
  getSubstitutions: vi.fn(),
  decideSubstitution: vi.fn(),
  getBulkJobs: vi.fn(),
  createBulkAction: vi.fn(),
  addOrderNote: vi.fn(),
}));

vi.mock("@/services/orders.service", () => ({
  orderService: mockOrderService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import { useOrders, useOrder, useOrderActions, useDeliveryPartners, useSubstitutions, useBulkJobs } from "@/hooks/use-orders";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

const mockOrdersPage = {
  orders: [
    { id: "ord-1", orderNumber: "ORD-001", customer: { name: "John", phone: "9999999999" }, status: "pending", total: 450, items: 3, createdAt: "2025-05-28T10:00:00Z" },
    { id: "ord-2", orderNumber: "ORD-002", customer: { name: "Jane", phone: "8888888888" }, status: "confirmed", total: 780, items: 5, createdAt: "2025-05-28T10:30:00Z" },
  ],
  summary: { total: 2, pending: 1, confirmed: 1, preparing: 0, outForDelivery: 0, delivered: 0, cancelled: 0, returned: 0, revenue: 1230 },
  pagination: { page: 1, pageSize: 10, total: 2 },
};

describe("useOrders", () => {
  it("returns loading state initially", () => {
    mockOrderService.getOrders.mockReturnValue(new Promise(() => {}));
    const { result } = renderWithQuery(() => useOrders());
    expect(result.current.loading).toBe(true);
  });

  it("returns orders on success", async () => {
    mockOrderService.getOrders.mockResolvedValue(mockOrdersPage);
    const { result } = renderWithQuery(() => useOrders());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.orders).toHaveLength(2);
    expect(result.current.summary.total).toBe(2);
    expect(result.current.summary.revenue).toBe(1230);
    expect(result.current.pagination.total).toBe(2);
  });

  it("returns error on failure", async () => {
    mockOrderService.getOrders.mockRejectedValue(new Error("Orders API error"));
    const { result } = renderWithQuery(() => useOrders());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Orders API error");
    expect(result.current.orders).toEqual([]);
  });

  it("kanbanGroups groups orders by status", async () => {
    mockOrderService.getOrders.mockResolvedValue(mockOrdersPage);
    const { result } = renderWithQuery(() => useOrders());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.kanbanGroups.pending).toHaveLength(1);
    expect(result.current.kanbanGroups.confirmed).toHaveLength(1);
    expect(result.current.kanbanGroups.delivered).toHaveLength(0);
  });

  it("setPage and setPageSize work", async () => {
    mockOrderService.getOrders.mockResolvedValue(mockOrdersPage);
    const { result } = renderWithQuery(() => useOrders());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.setPage(2));
    expect(result.current.pagination.page).toBe(2);

    act(() => result.current.setPageSize(25));
    expect(result.current.pagination.pageSize).toBe(25);
    expect(result.current.pagination.page).toBe(1);
  });

  it("viewMode can be toggled", async () => {
    mockOrderService.getOrders.mockResolvedValue(mockOrdersPage);
    const { result } = renderWithQuery(() => useOrders());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.viewMode).toBe("table");
    act(() => result.current.setViewMode("kanban"));
    expect(result.current.viewMode).toBe("kanban");
  });

  it("fetchOrders invalidates the orders list query", async () => {
    mockOrderService.getOrders.mockResolvedValue(mockOrdersPage);
    const { result } = renderWithQuery(() => useOrders());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(() => result.current.fetchOrders()).not.toThrow();
  });
});

describe("useOrder", () => {
  const mockOrder = mockOrdersPage.orders[0];

  it("returns order on success", async () => {
    mockOrderService.getOrderById.mockResolvedValue(mockOrder);
    const { result } = renderWithQuery(() => useOrder("ord-1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.order?.orderNumber).toBe("ORD-001");
    expect(result.current.error).toBeNull();
  });

  it("updateStatus calls mutation", async () => {
    mockOrderService.getOrderById.mockResolvedValue(mockOrder);
    mockOrderService.updateOrderStatus.mockResolvedValue({ success: true, data: { ...mockOrder, status: "confirmed" } });

    const { result } = renderWithQuery(() => useOrder("ord-1"));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.updateStatus("confirmed");
    expect(success).toBe(true);
    expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith("ord-1", "confirmed", undefined);
  });

  it("updateStatus returns false on failure", async () => {
    mockOrderService.getOrderById.mockResolvedValue(mockOrder);
    mockOrderService.updateOrderStatus.mockRejectedValue(new Error("Update failed"));

    const { result } = renderWithQuery(() => useOrder("ord-1"));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.updateStatus("confirmed");
    expect(success).toBe(false);
  });
});

describe("useOrderActions", () => {
  it("updateStatus succeeds", async () => {
    mockOrderService.updateOrderStatus.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useOrderActions());

    const success = await result.current.updateStatus({ orderId: "ord-1", newStatus: "delivered" });
    expect(success).toBe(true);
  });

  it("assignPartner succeeds", async () => {
    mockOrderService.assignPartner.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useOrderActions());

    const success = await result.current.assignPartner({ orderId: "ord-1", partnerId: "dp-1" });
    expect(success).toBe(true);
  });

  it("addNote succeeds", async () => {
    mockOrderService.addOrderNote.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useOrderActions());

    const success = await result.current.addNote("ord-1", "Customer called");
    expect(success).toBe(true);
  });
});

describe("useDeliveryPartners", () => {
  it("returns partners on success", async () => {
    mockOrderService.getDeliveryPartners.mockResolvedValue({
      partners: [
        { id: "dp-1", name: "Raju", status: "online", zone: "Zone A" },
        { id: "dp-2", name: "Sam", status: "offline", zone: "Zone B" },
      ],
    });
    const { result } = renderWithQuery(() => useDeliveryPartners());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.partners).toHaveLength(2);
    expect(result.current.onlineCount).toBe(1);
    expect(result.current.zones).toEqual(["Zone A", "Zone B"]);
  });
});

describe("useSubstitutions", () => {
  it("returns substitutions with pagination", async () => {
    mockOrderService.getSubstitutions.mockResolvedValue({
      substitutions: [{ id: "sub-1", orderId: "ord-1", fromProduct: "Milk", toProduct: "Soy Milk", status: "pending" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useSubstitutions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.substitutions).toHaveLength(1);
    expect(result.current.pagination.total).toBe(1);
  });

  it("decideSubstitution succeeds", async () => {
    mockOrderService.decideSubstitution.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useSubstitutions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const success = await result.current.decideSubstitution({ substitutionId: "sub-1", decision: "approve" });
    expect(success).toBe(true);
  });
});

describe("useBulkJobs", () => {
  it("returns jobs with pagination", async () => {
    mockOrderService.getBulkJobs.mockResolvedValue({
      jobs: [{ id: "job-1", type: "status_update", status: "completed", total: 10, processed: 10 }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    const { result } = renderWithQuery(() => useBulkJobs());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.jobs).toHaveLength(1);
    expect(result.current.pagination.total).toBe(1);
  });
});
