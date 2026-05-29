// ── Delivery Service Tests ──────────────────────────────────
// Tests the service layer for delivery partner management,
// live tracking, routes, status updates, performance, analytics, and SLA.

import { describe, it, expect, beforeEach } from "vitest";
import { mockDeliveryApi, resetMocks } from "./setup";
import { deliveryService } from "../delivery.service";

beforeEach(() => resetMocks());

// ── getPartners ─────────────────────────────────────────────

describe("getPartners", () => {
  it("returns paginated partners on success", async () => {
    const partners = [{ id: "p1", name: "Partner A", status: "active" as const, zone: "North" }];
    mockDeliveryApi.getPartners.mockResolvedValue({
      success: true,
      data: { items: partners, pagination: { page: 1, pageSize: 10, total: 1 } },
      meta: { page: 1, pageSize: 10, total: 1 },
    });

    const result = await deliveryService.getPartners({ search: "Partner", page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(result.data.items).toHaveLength(1);
    expect(mockDeliveryApi.getPartners).toHaveBeenCalledWith({ search: "Partner", page: 1, pageSize: 10 });
  });

  it("uses defaults when no params provided", async () => {
    mockDeliveryApi.getPartners.mockResolvedValue({
      success: true,
      data: { items: [], pagination: { page: 1, pageSize: 10, total: 0 } },
    });

    const result = await deliveryService.getPartners();

    expect(result.data.items).toEqual([]);
  });
});

// ── getPartnerProfile ───────────────────────────────────────

describe("getPartnerProfile", () => {
  it("returns partner profile on success", async () => {
    const profile = { id: "p1", name: "Partner A", status: "active" as const, zone: "North", rating: 4.5, completedDeliveries: 100 };
    mockDeliveryApi.getPartnerProfile.mockResolvedValue({ success: true, data: profile });

    const result = await deliveryService.getPartnerProfile("p1");

    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Partner A");
    expect(mockDeliveryApi.getPartnerProfile).toHaveBeenCalledWith("p1");
  });
});

// ── updatePartnerStatus ────────────────────────────────────

describe("updatePartnerStatus", () => {
  it("returns success boolean on success", async () => {
    mockDeliveryApi.updatePartnerStatus.mockResolvedValue({ success: true, data: true });

    const result = await deliveryService.updatePartnerStatus("p1", "active");

    expect(result.success).toBe(true);
    expect(result.data).toBe(true);
    expect(mockDeliveryApi.updatePartnerStatus).toHaveBeenCalledWith("p1", "active");
  });
});

// ── getLiveDeliveries ───────────────────────────────────────

describe("getLiveDeliveries", () => {
  it("returns paginated live deliveries on success", async () => {
    const deliveries = [{ id: "d1", orderId: "o1", status: "in_transit" as const, driverName: "John", eta: "10 min" }];
    mockDeliveryApi.getLiveDeliveries.mockResolvedValue({
      success: true,
      data: { items: deliveries, pagination: { page: 1, pageSize: 10, total: 1 } },
    });

    const result = await deliveryService.getLiveDeliveries({ status: "in_transit" });

    expect(result.data.items).toHaveLength(1);
    expect(result.data.items[0].eta).toBe("10 min");
    expect(mockDeliveryApi.getLiveDeliveries).toHaveBeenCalledWith({ status: "in_transit" });
  });
});

// ── updateDeliveryLocation ─────────────────────────────────

describe("updateDeliveryLocation", () => {
  it("returns success boolean", async () => {
    mockDeliveryApi.updateDeliveryLocation.mockResolvedValue({ success: true, data: true });

    const result = await deliveryService.updateDeliveryLocation("d1", 12.9716, 77.5946);

    expect(result.success).toBe(true);
    expect(mockDeliveryApi.updateDeliveryLocation).toHaveBeenCalledWith("d1", 12.9716, 77.5946);
  });
});

// ── getRoutes ───────────────────────────────────────────────

describe("getRoutes", () => {
  it("returns paginated routes on success", async () => {
    const routes = [{ id: "r1", zone: "North", status: "active" as const, totalStops: 10 }];
    mockDeliveryApi.getRoutes.mockResolvedValue({
      success: true,
      data: { items: routes, pagination: { page: 1, pageSize: 10, total: 1 } },
    });

    const result = await deliveryService.getRoutes({ zone: "North" });

    expect(result.data.items).toHaveLength(1);
    expect(mockDeliveryApi.getRoutes).toHaveBeenCalledWith({ zone: "North" });
  });
});

// ── optimizeRoute ───────────────────────────────────────────

describe("optimizeRoute", () => {
  it("returns optimized route on success", async () => {
    const route = { id: "r1", zone: "North", status: "optimized" as const, totalStops: 10, optimizedAt: "2024-01-01" };
    mockDeliveryApi.optimizeRoute.mockResolvedValue({ success: true, data: route });

    const result = await deliveryService.optimizeRoute("North");

    expect(result.data?.status).toBe("optimized");
    expect(mockDeliveryApi.optimizeRoute).toHaveBeenCalledWith("North");
  });
});

// ── optimizeAllRoutes ──────────────────────────────────────

describe("optimizeAllRoutes", () => {
  it("returns count of optimized routes", async () => {
    mockDeliveryApi.optimizeAllRoutes.mockResolvedValue({ success: true, data: 5 });

    const result = await deliveryService.optimizeAllRoutes();

    expect(result.success).toBe(true);
    expect(result.data).toBe(5);
  });
});

// ── getDeliveryStatuses ─────────────────────────────────────

describe("getDeliveryStatuses", () => {
  it("returns paginated statuses on success", async () => {
    const entries = [{ id: "ds1", orderId: "o1", status: "delivered" as const, updatedAt: "2024-01-01" }];
    mockDeliveryApi.getDeliveryStatuses.mockResolvedValue({
      success: true,
      data: { items: entries, pagination: { page: 1, pageSize: 10, total: 1 } },
    });

    const result = await deliveryService.getDeliveryStatuses({ status: "delivered" });

    expect(result.data.items).toHaveLength(1);
    expect(mockDeliveryApi.getDeliveryStatuses).toHaveBeenCalledWith({ status: "delivered" });
  });
});

// ── updateDeliveryStatus ───────────────────────────────────

describe("updateDeliveryStatus", () => {
  it("returns success boolean", async () => {
    const formData = { deliveryId: "d1", status: "delivered" as const, notes: "Delivered on time" };
    mockDeliveryApi.updateDeliveryStatus.mockResolvedValue({ success: true, data: true });

    const result = await deliveryService.updateDeliveryStatus(formData);

    expect(result.data).toBe(true);
    expect(mockDeliveryApi.updateDeliveryStatus).toHaveBeenCalledWith(formData);
  });
});

// ── assignDelivery ───────────────────────────────────────────

describe("assignDelivery", () => {
  it("returns success boolean", async () => {
    const formData = { deliveryId: "d1", partnerId: "p1" };
    mockDeliveryApi.assignDelivery.mockResolvedValue({ success: true, data: true });

    const result = await deliveryService.assignDelivery(formData);

    expect(result.data).toBe(true);
    expect(mockDeliveryApi.assignDelivery).toHaveBeenCalledWith(formData);
  });
});

// ── getPartnerPerformance ──────────────────────────────────

describe("getPartnerPerformance", () => {
  it("returns performance overview on success", async () => {
    const perf = { partnerId: "p1", onTimeRate: 95, avgDeliveryTime: 25, rating: 4.8, completedDeliveries: 200 };
    mockDeliveryApi.getPartnerPerformance.mockResolvedValue({ success: true, data: perf });

    const result = await deliveryService.getPartnerPerformance("p1", { period: "7d" });

    expect(result.data?.onTimeRate).toBe(95);
    expect(mockDeliveryApi.getPartnerPerformance).toHaveBeenCalledWith("p1", { period: "7d" });
  });
});

// ── getAllPartnerPerformance ───────────────────────────────

describe("getAllPartnerPerformance", () => {
  it("returns performance array on success", async () => {
    const perf = [{ partnerId: "p1", onTimeRate: 95, avgDeliveryTime: 25 }];
    mockDeliveryApi.getAllPartnerPerformance.mockResolvedValue({ success: true, data: perf });

    const result = await deliveryService.getAllPartnerPerformance({ period: "30d" });

    expect(result.data).toHaveLength(1);
    expect(mockDeliveryApi.getAllPartnerPerformance).toHaveBeenCalledWith({ period: "30d" });
  });
});

// ── getAnalytics ──────────────────────────────────────────

describe("getAnalytics", () => {
  it("returns delivery analytics on success", async () => {
    const analytics = { totalDeliveries: 5000, onTimeRate: 92, avgDeliveryTime: 30, totalRevenue: 100000 };
    mockDeliveryApi.getAnalytics.mockResolvedValue({ success: true, data: analytics });

    const result = await deliveryService.getAnalytics({ period: "30d" });

    expect(result.data?.onTimeRate).toBe(92);
    expect(mockDeliveryApi.getAnalytics).toHaveBeenCalledWith({ period: "30d" });
  });
});

// ── getSLADashboard ────────────────────────────────────────

describe("getSLADashboard", () => {
  it("returns SLA dashboard on success", async () => {
    const sla = { complianceRate: 95, breaches: 10, totalOrders: 5000, avgResolutionTime: 45 };
    mockDeliveryApi.getSLADashboard.mockResolvedValue({ success: true, data: sla });

    const result = await deliveryService.getSLADashboard();

    expect(result.data?.complianceRate).toBe(95);
  });
});

// ── Error Propagation ───────────────────────────────────────

describe("error propagation", () => {
  it("propagates error from getPartners", async () => {
    mockDeliveryApi.getPartners.mockResolvedValue({
      success: false,
      data: { items: [], pagination: { page: 0, pageSize: 0, total: 0 } },
      error: "Failed to load partners",
    });

    const result = await deliveryService.getPartners();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load partners");
  });

  it("propagates error from getPartnerProfile", async () => {
    mockDeliveryApi.getPartnerProfile.mockResolvedValue({
      success: false,
      data: null,
      error: "Partner not found",
    });

    const result = await deliveryService.getPartnerProfile("999");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Partner not found");
  });
});
