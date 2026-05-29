// ── Orders API Adapter Tests ────────────────────────────────
// Tests orders CRUD, delivery partners, substitutions,
// bulk jobs, and order notes.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as ordersApi from "../orders.api";

beforeEach(() => resetMocks());

// ── Orders ─────────────────────────────────────────────────

describe("getOrders", () => {
  it("returns paginated orders on success", async () => {
    const orders = [{ id: "1", orderNumber: "ORD-001", status: "pending" }];
    const response = { success: true, data: orders, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await ordersApi.getOrders({ status: "pending" }, { page: 1, pageSize: 10, total: 0 });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/orders", {
      params: { status: "pending", page: 1, size: 10 },
    });
  });

  it("returns paginated error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load orders"));

    const result = await ordersApi.getOrders();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.meta).toBeDefined();
  });
});

describe("getOrderById", () => {
  it("returns an order on success", async () => {
    const order = { id: "1", orderNumber: "ORD-001" };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: order }));

    const result = await ordersApi.getOrderById("1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/orders/1");
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Order not found"));

    const result = await ordersApi.getOrderById("999");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Order not found");
  });
});

describe("updateOrderStatus", () => {
  it("updates order status on success", async () => {
    const updated = { id: "1", status: "shipped" };
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: updated }));

    const result = await ordersApi.updateOrderStatus("1", "shipped", "Dispatched");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/orders/1/status", {
      status: "shipped",
      note: "Dispatched",
    });
  });
});

describe("assignPartner", () => {
  it("assigns delivery partner on success", async () => {
    const data = { orderId: "1", partnerId: "p1" };
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", partnerId: "p1" } }));

    const result = await ordersApi.assignPartner(data);

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/orders/1/assign-partner", {
      partnerId: "p1",
    });
  });
});

// ── Delivery Partners ──────────────────────────────────────

describe("getDeliveryPartners", () => {
  it("returns partners on success", async () => {
    const partners = [{ id: "p1", name: "Partner A" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: partners }));

    const result = await ordersApi.getDeliveryPartners("search-term");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/orders/delivery-partners", {
      params: { search: "search-term" },
    });
  });
});

describe("getPartnersByZone", () => {
  it("returns partners filtered by zone", async () => {
    const partners = [{ id: "p1", name: "Partner A", zone: "north" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: partners }));

    const result = await ordersApi.getPartnersByZone("north");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/orders/delivery-partners/by-zone", {
      params: { zone: "north" },
    });
  });
});

// ── Substitutions ───────────────────────────────────────────

describe("getSubstitutions", () => {
  it("returns paginated substitutions on success", async () => {
    const subs = [{ id: "s1", orderId: "1", status: "pending" }];
    const response = { success: true, data: subs, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await ordersApi.getSubstitutions({ status: "pending" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load substitutions"));

    const result = await ordersApi.getSubstitutions();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
  });
});

describe("decideSubstitution", () => {
  it("decides substitution on success", async () => {
    const data = { id: "s1", action: "approve" as const, replacementSku: "SKU002" };
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await ordersApi.decideSubstitution(data);

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/orders/substitutions/s1/decide", data);
  });
});

// ── Bulk Jobs ──────────────────────────────────────────────

describe("bulk jobs", () => {
  it("getBulkJobs returns paginated jobs", async () => {
    const jobs = [{ id: "b1", actionType: "UPDATE_STATUS", status: "completed" }];
    const response = { success: true, data: jobs, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await ordersApi.getBulkJobs("search", { page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/orders/bulk-jobs", {
      params: { search: "search", page: 1, size: 10 },
    });
  });

  it("createBulkAction creates a bulk job", async () => {
    const data = { actionType: "UPDATE_STATUS", orderIds: ["1", "2"], targetStatus: "cancelled" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "b1", actionType: "UPDATE_STATUS", status: "pending" } }));

    const result = await ordersApi.createBulkAction(data);

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/orders/bulk-action", data);
  });
});

// ── Order Notes ─────────────────────────────────────────────

describe("addOrderNote", () => {
  it("adds note on success", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await ordersApi.addOrderNote("1", "Customer requested rush", "Admin User");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/orders/1/notes", {
      note: "Customer requested rush",
      performedBy: "Admin User",
    });
  });

  it("returns error on failure", async () => {
    mockPost.mockRejectedValue(new Error("Failed to add order note"));

    const result = await ordersApi.addOrderNote("1", "Note", "Admin");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to add order note");
  });
});
