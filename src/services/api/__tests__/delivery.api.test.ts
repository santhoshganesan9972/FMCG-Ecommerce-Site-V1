// ── Delivery API Adapter Tests ──────────────────────────────
// Tests partners, live tracking, routes, status management,
// performance, analytics, and SLA dashboard.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as deliveryApi from "../delivery.api";

beforeEach(() => resetMocks());

// ── Partners ───────────────────────────────────────────────

describe("getPartners", () => {
  it("returns delivery partners on success", async () => {
    const data = {
      items: [{ id: "p1", name: "Partner A", status: "active", zone: "north" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await deliveryApi.getPartners({ zone: "north" });

    expect(result.success).toBe(true);
    expect(result.data.items).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/partners", {
      params: { zone: "north" },
    });
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load delivery partners"));

    const result = await deliveryApi.getPartners();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load delivery partners");
  });
});

describe("getPartnerProfile", () => {
  it("returns partner profile on success", async () => {
    const profile = { id: "p1", name: "Partner A", email: "partner@test.com", rating: 4.5 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: profile }));

    const result = await deliveryApi.getPartnerProfile("p1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/partners/p1");
  });
});

describe("updatePartnerStatus", () => {
  it("updates partner status on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await deliveryApi.updatePartnerStatus("p1", "inactive");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/delivery/partners/p1/status", {
      status: "inactive",
    });
  });

  it("returns error on failure", async () => {
    mockPut.mockRejectedValue(new Error("Failed to update partner status"));

    const result = await deliveryApi.updatePartnerStatus("p1", "inactive");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to update partner status");
  });
});

// ── Live Tracking ─────────────────────────────────────────

describe("getLiveDeliveries", () => {
  it("returns live deliveries on success", async () => {
    const data = {
      items: [{ id: "d1", orderId: "1", status: "in-transit", eta: "5 min" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await deliveryApi.getLiveDeliveries();

    expect(result.success).toBe(true);
    expect(result.data.items).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/live", {
      params: undefined,
    });
  });
});

// ── Routes ─────────────────────────────────────────────────

describe("routes", () => {
  it("getRoutes returns routes on success", async () => {
    const data = {
      items: [{ id: "r1", zone: "north", stops: 15, status: "active" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await deliveryApi.getRoutes();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/routes", {
      params: undefined,
    });
  });

  it("optimizeRoute optimizes a single route", async () => {
    const optimized = { id: "r1", zone: "north", stops: 12, optimizedAt: "2024-01-01" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: optimized }));

    const result = await deliveryApi.optimizeRoute("north");
    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/delivery/routes/optimize", {
      zone: "north",
    });
  });

  it("optimizeAllRoutes optimizes all routes", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: 5 }));

    const result = await deliveryApi.optimizeAllRoutes();
    expect(result.success).toBe(true);
    expect(result.data).toBe(5);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/delivery/routes/optimize-all");
  });

  it("optimizeAllRoutes returns error on failure", async () => {
    mockPost.mockRejectedValue(new Error("Failed to optimize routes"));

    const result = await deliveryApi.optimizeAllRoutes();
    expect(result.success).toBe(false);
    expect(result.data).toBe(0);
  });
});

// ── Status Management ─────────────────────────────────────

describe("status management", () => {
  it("getDeliveryStatuses returns statuses", async () => {
    const data = {
      items: [{ id: "s1", orderId: "1", status: "delivered", updatedAt: "2024-01-01" }],
      pagination: { page: 1, pageSize: 10, total: 1 },
    };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data }));

    const result = await deliveryApi.getDeliveryStatuses();
    expect(result.success).toBe(true);
    expect(result.data.items).toHaveLength(1);
  });

  it("updateDeliveryStatus updates status", async () => {
    const data = { deliveryId: "d1", status: "delivered", note: "Left at door" };
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await deliveryApi.updateDeliveryStatus(data);
    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/delivery/update-status", data);
  });

  it("assignDelivery assigns a delivery", async () => {
    const data = { deliveryId: "d1", partnerId: "p1" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await deliveryApi.assignDelivery(data);
    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/delivery/assign", data);
  });
});

// ── Performance ────────────────────────────────────────────

describe("performance", () => {
  it("getPartnerPerformance returns performance", async () => {
    const perf = { partnerId: "p1", totalDeliveries: 500, onTimeRate: 95.5, avgRating: 4.8 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: perf }));

    const result = await deliveryApi.getPartnerPerformance("p1", { period: "30d" });
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/partners/p1/performance", {
      params: { period: "30d" },
    });
  });

  it("getAllPartnerPerformance returns all performance", async () => {
    const perfs = [{ partnerId: "p1", totalDeliveries: 500 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: perfs }));

    const result = await deliveryApi.getAllPartnerPerformance();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/performance", {
      params: undefined,
    });
  });
});

// ── Analytics & SLA ────────────────────────────────────────

describe("analytics and SLA", () => {
  it("getAnalytics returns analytics", async () => {
    const analytics = { totalDeliveries: 10000, avgDeliveryTime: 45, onTimeRate: 92 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: analytics }));

    const result = await deliveryApi.getAnalytics({ period: "30d" });
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/analytics", {
      params: { period: "30d" },
    });
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load delivery analytics"));

    const result = await deliveryApi.getAnalytics();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load delivery analytics");
  });

  it("getSLADashboard returns SLA dashboard", async () => {
    const sla = { overallCompliance: 94.5, breachRate: 5.5, avgResponseTime: 30 };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: sla }));

    const result = await deliveryApi.getSLADashboard();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/delivery/sla");
  });
});
