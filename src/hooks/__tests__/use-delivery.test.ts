// @vitest-environment jsdom
// ── useDelivery Hook Tests ───────────────────────────────────

import { vi } from "vitest";

const mockDeliveryService = vi.hoisted(() => ({
  getPartners: vi.fn(),
  getPartnerProfile: vi.fn(),
  getLiveDeliveries: vi.fn(),
  getRoutes: vi.fn(),
  optimizeAllRoutes: vi.fn(),
  getDeliveryStatuses: vi.fn(),
  updateDeliveryStatus: vi.fn(),
  assignDelivery: vi.fn(),
  getPartnerPerformance: vi.fn(),
  getAllPartnerPerformance: vi.fn(),
  getAnalytics: vi.fn(),
  getSLADashboard: vi.fn(),
}));

vi.mock("@/services/delivery.service", () => ({
  deliveryService: mockDeliveryService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
import {
  useDeliveryPartners, usePartnerProfile, useLiveDeliveries,
  useDeliveryRoutes, useDeliveryStatuses, usePartnerPerformance,
  useDeliveryAnalytics, useSLADashboard, useDeliveryActions,
} from "@/hooks/use-delivery";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

const mockPaginatedResponse = (items: unknown[]) => ({
  success: true,
  data: { items, pagination: { page: 1, pageSize: 10, total: items.length } },
});

describe("useDeliveryPartners", () => {
  it("returns partners with computed values", async () => {
    mockDeliveryService.getPartners.mockResolvedValue(mockPaginatedResponse([
      { id: "dp-1", name: "Raju", status: "online", zone: "Zone A", phone: "1111111111" },
      { id: "dp-2", name: "Sam", status: "busy", zone: "Zone A", phone: "2222222222" },
      { id: "dp-3", name: "Kiran", status: "offline", zone: "Zone B", phone: "3333333333" },
    ]));
    const { result } = renderWithQuery(() => useDeliveryPartners());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.partners).toHaveLength(3);
    expect(result.current.onlineCount).toBe(1);
    expect(result.current.busyCount).toBe(1);
    expect(result.current.zones).toEqual(["Zone A", "Zone B"]);
  });

  it("returns error on failure", async () => {
    mockDeliveryService.getPartners.mockRejectedValue(new Error("Delivery API error"));
    const { result } = renderWithQuery(() => useDeliveryPartners());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Delivery API error");
    expect(result.current.partners).toEqual([]);
  });
});

describe("usePartnerProfile", () => {
  it("returns profile on success", async () => {
    mockDeliveryService.getPartnerProfile.mockResolvedValue({
      success: true,
      data: { id: "dp-1", name: "Raju", status: "online", zone: "Zone A", phone: "1111111111", rating: 4.5 },
    });
    const { result } = renderWithQuery(() => usePartnerProfile("dp-1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.profile?.name).toBe("Raju");
    expect(result.current.profile?.rating).toBe(4.5);
    expect(result.current.error).toBeNull();
  });

  it("does not fetch when partnerId is null", () => {
    renderWithQuery(() => usePartnerProfile(null));
    expect(mockDeliveryService.getPartnerProfile).not.toHaveBeenCalled();
  });

  it("returns error when partner not found", async () => {
    mockDeliveryService.getPartnerProfile.mockResolvedValue({
      success: false,
      error: "Partner not found",
      data: null,
    });
    const { result } = renderWithQuery(() => usePartnerProfile("dp-99"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.profile).toBeNull();
    expect(result.current.error).toBe("Partner not found");
  });
});

describe("useLiveDeliveries", () => {
  it("returns live deliveries with active count", async () => {
    mockDeliveryService.getLiveDeliveries.mockResolvedValue(mockPaginatedResponse([
      { id: "d-1", orderId: "ord-1", status: "in_transit", partner: "Raju", customer: "Alice", address: "123 St" },
      { id: "d-2", orderId: "ord-2", status: "delivered", partner: "Sam", customer: "Bob", address: "456 St" },
    ]));
    const { result } = renderWithQuery(() => useLiveDeliveries());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.deliveries).toHaveLength(2);
    expect(result.current.activeCount).toBe(1); // only in_transit is active
  });
});

describe("useDeliveryRoutes", () => {
  it("returns routes", async () => {
    mockDeliveryService.getRoutes.mockResolvedValue(mockPaginatedResponse([
      { id: "r-1", partner: "Raju", zone: "Zone A", status: "active", stops: 5, estimatedDuration: 60 },
    ]));
    const { result } = renderWithQuery(() => useDeliveryRoutes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.routes).toHaveLength(1);
  });

  it("optimizeAllRoutes calls mutation", async () => {
    mockDeliveryService.getRoutes.mockResolvedValue(mockPaginatedResponse([]));
    mockDeliveryService.optimizeAllRoutes.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useDeliveryRoutes());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await result.current.optimizeAllRoutes();
    expect(mockDeliveryService.optimizeAllRoutes).toHaveBeenCalled();
  });
});

describe("useDeliveryStatuses", () => {
  it("returns entries with summary", async () => {
    mockDeliveryService.getDeliveryStatuses.mockResolvedValue(mockPaginatedResponse([
      { id: "s-1", orderId: "ord-1", status: "assigned", slaStatus: "on_time", partner: "Raju", updatedAt: "2025-05-28T10:00:00Z" },
      { id: "s-2", orderId: "ord-2", status: "delivered", slaStatus: "on_time", partner: "Sam", updatedAt: "2025-05-28T11:00:00Z" },
      { id: "s-3", orderId: "ord-3", status: "in_transit", slaStatus: "delayed", partner: "Kiran", updatedAt: "2025-05-28T12:00:00Z" },
    ]));
    const { result } = renderWithQuery(() => useDeliveryStatuses());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.entries).toHaveLength(3);
    expect(result.current.summary.total).toBe(3);
    expect(result.current.summary.assigned).toBe(1);
    expect(result.current.summary.delivered).toBe(1);
    expect(result.current.summary.delayed).toBe(1);
  });

  it("updateStatus succeeds", async () => {
    mockDeliveryService.getDeliveryStatuses.mockResolvedValue(mockPaginatedResponse([]));
    mockDeliveryService.updateDeliveryStatus.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useDeliveryStatuses());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const ok = await result.current.updateStatus({ deliveryId: "d-1", status: "delivered" });
    expect(ok).toBe(true);
  });

  it("assignDelivery succeeds", async () => {
    mockDeliveryService.getDeliveryStatuses.mockResolvedValue(mockPaginatedResponse([]));
    mockDeliveryService.assignDelivery.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useDeliveryStatuses());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const ok = await result.current.assignDelivery({ deliveryId: "d-1", partnerId: "dp-1" });
    expect(ok).toBe(true);
  });
});

describe("usePartnerPerformance", () => {
  it("returns single partner performance", async () => {
    mockDeliveryService.getPartnerPerformance.mockResolvedValue({
      success: true,
      data: { partnerId: "dp-1", onTimeRate: 95, avgDeliveryTime: 25, totalDeliveries: 200, rating: 4.5 },
    });
    const { result } = renderWithQuery(() => usePartnerPerformance("dp-1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.performances).toHaveLength(1);
    expect(result.current.selectedPerformance?.onTimeRate).toBe(95);
  });

  it("returns all partner performance when no ID given", async () => {
    mockDeliveryService.getAllPartnerPerformance.mockResolvedValue({
      success: true,
      data: [
        { partnerId: "dp-1", onTimeRate: 95, avgDeliveryTime: 25, totalDeliveries: 200, rating: 4.5 },
        { partnerId: "dp-2", onTimeRate: 88, avgDeliveryTime: 30, totalDeliveries: 150, rating: 4.0 },
      ],
    });
    const { result } = renderWithQuery(() => usePartnerPerformance());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.performances).toHaveLength(2);
    expect(result.current.topPerformers).toHaveLength(2);
  });
});

describe("useDeliveryAnalytics", () => {
  it("returns analytics data", async () => {
    mockDeliveryService.getAnalytics.mockResolvedValue({
      success: true,
      data: { totalDeliveries: 1500, onTimeRate: 92, avgDeliveryTime: 28, revenue: 750000 },
    });
    const { result } = renderWithQuery(() => useDeliveryAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.analytics?.totalDeliveries).toBe(1500);
    expect(result.current.analytics?.onTimeRate).toBe(92);
  });
});

describe("useSLADashboard", () => {
  it("returns SLA data", async () => {
    mockDeliveryService.getSLADashboard.mockResolvedValue({
      success: true,
      data: { overallCompliance: 94, breaches: 5, byZone: [{ zone: "Zone A", compliance: 96 }] },
    });
    const { result } = renderWithQuery(() => useSLADashboard());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.slaData?.overallCompliance).toBe(94);
  });
});

describe("useDeliveryActions", () => {
  it("assignPartner succeeds", async () => {
    mockDeliveryService.assignDelivery.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useDeliveryActions());

    const ok = await result.current.assignPartner({ deliveryId: "d-1", partnerId: "dp-1" });
    expect(ok).toBe(true);
  });

  it("updateStatus succeeds", async () => {
    mockDeliveryService.updateDeliveryStatus.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useDeliveryActions());

    const ok = await result.current.updateStatus({ deliveryId: "d-1", status: "delivered" });
    expect(ok).toBe(true);
  });

  it("returns error on failure", async () => {
    mockDeliveryService.assignDelivery.mockRejectedValue(new Error("Assign failed"));
    const { result } = renderWithQuery(() => useDeliveryActions());

    const ok = await result.current.assignPartner({ deliveryId: "d-1", partnerId: "dp-1" });
    expect(ok).toBe(false);
  });
});
