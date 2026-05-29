// ── Orders Service Tests ────────────────────────────────────
// Tests the service layer for orders, delivery partners,
// substitutions, bulk jobs, and order notes.

import { describe, it, expect, beforeEach } from "vitest";
import { mockOrdersApi, resetMocks } from "./setup";
import { orderService } from "../orders.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };
const mockOrder = { id: "1", orderNumber: "ORD-001", status: "pending", customer: { name: "John" }, items: [], total: 100 };
const mockSummary = { total: 1, pending: 1, confirmed: 0, preparing: 0, outForDelivery: 0, delivered: 0, cancelled: 0, returned: 0, revenue: 100 };

// ── getOrders ───────────────────────────────────────────────

describe("getOrders", () => {
  it("unwraps paginated orders with summary on success", async () => {
    mockOrdersApi.getOrders.mockResolvedValue({
      success: true,
      data: [mockOrder],
      meta: mockMeta,
      summary: mockSummary,
    });

    const result = await orderService.getOrders({ status: "pending" }, { page: 1, pageSize: 10 });

    expect(result.orders).toEqual([mockOrder]);
    expect(result.pagination).toEqual({ page: 1, pageSize: 10, total: 1 });
    expect(result.summary.pending).toBe(1);
    expect(mockOrdersApi.getOrders).toHaveBeenCalledWith(
      { status: "pending" },
      { page: 1, pageSize: 10 },
    );
  });

  it("uses defaults when no args provided", async () => {
    mockOrdersApi.getOrders.mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      summary: mockSummary,
    });

    const result = await orderService.getOrders();

    expect(result.orders).toEqual([]);
    expect(result.pagination.total).toBe(0);
  });
});

// ── getOrderById ────────────────────────────────────────────

describe("getOrderById", () => {
  it("returns order on success", async () => {
    mockOrdersApi.getOrderById.mockResolvedValue({ success: true, data: mockOrder });

    const result = await orderService.getOrderById("1");

    expect(result).toEqual(mockOrder);
  });

  it("returns undefined on failure", async () => {
    mockOrdersApi.getOrderById.mockResolvedValue({ success: false, data: undefined, error: "Order not found" });

    const result = await orderService.getOrderById("999");

    expect(result).toBeUndefined();
  });
});

// ── updateOrderStatus ──────────────────────────────────────

describe("updateOrderStatus", () => {
  it("returns updated order on success", async () => {
    const updated = { ...mockOrder, status: "confirmed" };
    mockOrdersApi.updateOrderStatus.mockResolvedValue({ success: true, data: updated });

    const result = await orderService.updateOrderStatus("1", "confirmed", "Payment received");

    expect(result?.status).toBe("confirmed");
    expect(mockOrdersApi.updateOrderStatus).toHaveBeenCalledWith("1", "confirmed", "Payment received");
  });
});

// ── assignPartner ──────────────────────────────────────────

describe("assignPartner", () => {
  it("returns order with partner assigned on success", async () => {
    const formData = { orderId: "1", partnerId: "p1" };
    mockOrdersApi.assignPartner.mockResolvedValue({ success: true, data: mockOrder });

    const result = await orderService.assignPartner(formData);

    expect(result).toEqual(mockOrder);
    expect(mockOrdersApi.assignPartner).toHaveBeenCalledWith(formData);
  });
});

// ── getDeliveryPartners ─────────────────────────────────────

describe("getDeliveryPartners", () => {
  it("returns partners list with count on success", async () => {
    const partners = [{ id: "p1", name: "Partner A", status: "active" as const, zone: "North" }];
    mockOrdersApi.getDeliveryPartners.mockResolvedValue({ success: true, data: partners });

    const result = await orderService.getDeliveryPartners("search-term");

    expect(result.partners).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(mockOrdersApi.getDeliveryPartners).toHaveBeenCalledWith("search-term");
  });

  it("returns empty partners when data is empty", async () => {
    mockOrdersApi.getDeliveryPartners.mockResolvedValue({ success: true, data: [] });

    const result = await orderService.getDeliveryPartners();

    expect(result.partners).toEqual([]);
    expect(result.total).toBe(0);
  });
});

// ── getPartnersByZone ───────────────────────────────────────

describe("getPartnersByZone", () => {
  it("returns partners filtered by zone", async () => {
    const partners = [{ id: "p1", name: "Partner A", zone: "North" }];
    mockOrdersApi.getPartnersByZone.mockResolvedValue({ success: true, data: partners });

    const result = await orderService.getPartnersByZone("North");

    expect(result).toHaveLength(1);
    expect(mockOrdersApi.getPartnersByZone).toHaveBeenCalledWith("North");
  });
});

// ── getSubstitutions ────────────────────────────────────────

describe("getSubstitutions", () => {
  it("unwraps paginated substitutions on success", async () => {
    const subs = [{ id: "s1", orderId: "1", productId: "p1", status: "pending" as const }];
    mockOrdersApi.getSubstitutions.mockResolvedValue({ success: true, data: subs, meta: mockMeta });

    const result = await orderService.getSubstitutions({ status: "pending" }, { page: 1, pageSize: 10 });

    expect(result.substitutions).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
    expect(mockOrdersApi.getSubstitutions).toHaveBeenCalledWith({ status: "pending" }, { page: 1, pageSize: 10 });
  });
});

// ── decideSubstitution ──────────────────────────────────────

describe("decideSubstitution", () => {
  it("returns true on success", async () => {
    mockOrdersApi.decideSubstitution.mockResolvedValue({ success: true, data: true });

    const result = await orderService.decideSubstitution({ substitutionId: "s1", action: "approve" });

    expect(result).toBe(true);
  });
});

// ── getBulkJobs ─────────────────────────────────────────────

describe("getBulkJobs", () => {
  it("unwraps paginated bulk jobs on success", async () => {
    const jobs = [{ id: "b1", actionType: "update_status", status: "completed" as const, orderIds: ["1"], createdAt: "2024-01-01" }];
    mockOrdersApi.getBulkJobs.mockResolvedValue({ success: true, data: jobs, meta: mockMeta });

    const result = await orderService.getBulkJobs("", { page: 1, pageSize: 10 });

    expect(result.jobs).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
  });
});

// ── createBulkAction ────────────────────────────────────────

describe("createBulkAction", () => {
  it("returns created bulk job on success", async () => {
    const job = { id: "b2", actionType: "update_status", status: "pending" as const, orderIds: ["1", "2"], createdAt: "2024-01-01" };
    mockOrdersApi.createBulkAction.mockResolvedValue({ success: true, data: job });

    const result = await orderService.createBulkAction({ actionType: "update_status", orderIds: ["1", "2"] });

    expect(result.id).toBe("b2");
  });
});

// ── addOrderNote ────────────────────────────────────────────

describe("addOrderNote", () => {
  it("returns true on success", async () => {
    mockOrdersApi.addOrderNote.mockResolvedValue({ success: true, data: true });

    const result = await orderService.addOrderNote("1", "Customer requested express", "Admin");

    expect(result).toBe(true);
    expect(mockOrdersApi.addOrderNote).toHaveBeenCalledWith("1", "Customer requested express", "Admin");
  });

  it("returns false on failure", async () => {
    mockOrdersApi.addOrderNote.mockResolvedValue({ success: false, data: false, error: "Failed to add note" });

    const result = await orderService.addOrderNote("1", "Note", "Admin");

    expect(result).toBe(false);
  });
});
