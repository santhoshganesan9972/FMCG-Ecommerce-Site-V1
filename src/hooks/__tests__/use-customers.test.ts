// @vitest-environment jsdom
// ── useCustomers Hook Tests ──────────────────────────────────

import { vi } from "vitest";

const mockCustomerService = vi.hoisted(() => ({
  getCustomers: vi.fn(),
  getCustomerById: vi.fn(),
  updateCustomer: vi.fn(),
  updateCustomerStatus: vi.fn(),
  addCustomerNote: vi.fn(),
  getCustomerActivities: vi.fn(),
  addCustomerActivity: vi.fn(),
  getSegments: vi.fn(),
  getAnalyticsMetrics: vi.fn(),
  getCohortData: vi.fn(),
  getAcquisitionChannels: vi.fn(),
  getTickets: vi.fn(),
  getTicketById: vi.fn(),
  updateTicketStatus: vi.fn(),
  addTicketMessage: vi.fn(),
  getFraudAlerts: vi.fn(),
  updateFraudAlertStatus: vi.fn(),
  getFraudAnalytics: vi.fn(),
  getExportRequests: vi.fn(),
  requestDataExport: vi.fn(),
}));

vi.mock("@/services/customers.service", () => ({
  customerService: mockCustomerService,
}));

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import {
  useCustomers, useCustomer, useCustomerActions,
  useSegments, useCustomerAnalytics, useSupportTickets, useFraudAlerts,
} from "@/hooks/use-customers";
import { renderWithQuery } from "./setup";

beforeEach(() => {
  vi.resetAllMocks();
});

const mockCustomersPage = {
  customers: [
    { id: "c1", name: "Alice", email: "alice@test.com", phone: "1111111111", status: "active", segment: "vip", totalOrders: 25, totalSpent: 50000, createdAt: "2024-01-01" },
    { id: "c2", name: "Bob", email: "bob@test.com", phone: "2222222222", status: "active", segment: "regular", totalOrders: 5, totalSpent: 5000, createdAt: "2024-06-01" },
  ],
  summary: { total: 2, active: 2, vip: 1, new: 0, atRisk: 0, churned: 0, totalRevenue: 55000, avgOrderValue: 1833 },
  pagination: { page: 1, pageSize: 10, total: 2 },
};

describe("useCustomers", () => {
  it("returns customers on success", async () => {
    mockCustomerService.getCustomers.mockResolvedValue(mockCustomersPage);
    const { result } = renderWithQuery(() => useCustomers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.customers).toHaveLength(2);
    expect(result.current.summary.total).toBe(2);
    expect(result.current.summary.vip).toBe(1);
    expect(result.current.pagination.total).toBe(2);
  });

  it("returns error on failure", async () => {
    mockCustomerService.getCustomers.mockRejectedValue(new Error("Customers API error"));
    const { result } = renderWithQuery(() => useCustomers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Customers API error");
    expect(result.current.customers).toEqual([]);
  });

  it("updateCustomer calls mutation and returns data", async () => {
    mockCustomerService.getCustomers.mockResolvedValue(mockCustomersPage);
    mockCustomerService.updateCustomer.mockResolvedValue({ ...mockCustomersPage.customers[0], segment: "platinum" });

    const { result } = renderWithQuery(() => useCustomers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = await result.current.updateCustomer("c1", { segment: "platinum" });
    expect(updated?.segment).toBe("platinum");
    expect(mockCustomerService.updateCustomer).toHaveBeenCalledWith("c1", { segment: "platinum" });
  });

  it("updateCustomer returns null on failure", async () => {
    mockCustomerService.getCustomers.mockResolvedValue(mockCustomersPage);
    mockCustomerService.updateCustomer.mockRejectedValue(new Error("Update failed"));

    const { result } = renderWithQuery(() => useCustomers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = await result.current.updateCustomer("c1", { segment: "platinum" });
    expect(updated).toBeNull();
  });

  it("setPage and setPageSize work", async () => {
    mockCustomerService.getCustomers.mockResolvedValue(mockCustomersPage);
    const { result } = renderWithQuery(() => useCustomers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.setPage(2));
    expect(result.current.pagination.page).toBe(2);

    act(() => result.current.setPageSize(25));
    expect(result.current.pagination.pageSize).toBe(25);
    expect(result.current.pagination.page).toBe(1);
  });
});

describe("useCustomer", () => {
  it("returns single customer", async () => {
    mockCustomerService.getCustomerById.mockResolvedValue(mockCustomersPage.customers[0]);
    const { result } = renderWithQuery(() => useCustomer("c1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.customer?.name).toBe("Alice");
    expect(result.current.error).toBeNull();
  });

  it("handles not-found gracefully", async () => {
    mockCustomerService.getCustomerById.mockResolvedValue(null);
    const { result } = renderWithQuery(() => useCustomer("c1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.customer).toBeNull();
    expect(result.current.error).toBe("Customer not found");
  });
});

describe("useCustomerActions", () => {
  it("updateStatus succeeds", async () => {
    mockCustomerService.updateCustomerStatus.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useCustomerActions());

    const ok = await result.current.updateStatus("c1", "active");
    expect(ok).toBe(true);
  });

  it("addNote succeeds", async () => {
    mockCustomerService.addCustomerNote.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useCustomerActions());

    const ok = await result.current.addNote("c1", "Follow-up call made");
    expect(ok).toBe(true);
  });

  it("updateStatus returns false on failure", async () => {
    mockCustomerService.updateCustomerStatus.mockRejectedValue(new Error("Failed"));
    const { result } = renderWithQuery(() => useCustomerActions());

    const ok = await result.current.updateStatus("c1", "active");
    expect(ok).toBe(false);
  });
});

describe("useSegments", () => {
  it("returns segments and computed total", async () => {
    mockCustomerService.getSegments.mockResolvedValue([
      { id: "s1", name: "VIP", customerCount: 50, avgOrderValue: 3000 },
      { id: "s2", name: "Regular", customerCount: 200, avgOrderValue: 800 },
    ]);
    const { result } = renderWithQuery(() => useSegments());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.segments).toHaveLength(2);
    expect(result.current.totalCustomers).toBe(250);
  });
});

describe("useCustomerAnalytics", () => {
  it("returns metrics, cohort, and channels", async () => {
    mockCustomerService.getAnalyticsMetrics.mockResolvedValue([
      { label: "New Customers", value: 120, change: 15 },
    ]);
    mockCustomerService.getCohortData.mockResolvedValue([
      { cohort: "2025-Q1", customers: 100, retention: [100, 80, 60] },
    ]);
    mockCustomerService.getAcquisitionChannels.mockResolvedValue([
      { channel: "Instagram", count: 200, percentage: 40, revenue: 50000 },
    ]);

    const { result } = renderWithQuery(() => useCustomerAnalytics());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.metrics).toHaveLength(1);
    expect(result.current.cohortData).toHaveLength(1);
    expect(result.current.acquisitionChannels).toHaveLength(1);
  });
});

describe("useSupportTickets", () => {
  it("returns tickets with pagination", async () => {
    mockCustomerService.getTickets.mockResolvedValue({
      tickets: [{ id: "t1", subject: "Order issue", status: "open", priority: "high", customer: "Alice", createdAt: "2025-05-28T10:00:00Z" }],
      summary: { total: 1, open: 1, inProgress: 0, resolved: 0, urgent: 0 },
      pagination: { page: 1, pageSize: 10, total: 1 },
    });

    const { result } = renderWithQuery(() => useSupportTickets());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.tickets).toHaveLength(1);
    expect(result.current.summary.total).toBe(1);
    expect(result.current.pagination.total).toBe(1);
  });

  it("updateTicketStatus succeeds", async () => {
    mockCustomerService.updateTicketStatus.mockResolvedValue({ success: true });
    const { result } = renderWithQuery(() => useSupportTickets());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const ok = await result.current.updateTicketStatus("t1", "resolved", "agent-1");
    expect(ok).toBe(true);
  });
});

describe("useFraudAlerts", () => {
  it("returns alerts and analytics", async () => {
    mockCustomerService.getFraudAlerts.mockResolvedValue({
      alerts: [{ id: "f1", customerId: "c1", riskLevel: "high", status: "flagged", reason: "Multiple failed logins" }],
      summary: { total: 1, blocked: 0, flagged: 1, monitoring: 0, critical: 0, high: 1 },
      pagination: { page: 1, pageSize: 10, total: 1 },
    });
    mockCustomerService.getFraudAnalytics.mockResolvedValue({
      alertsByLevel: { high: 1, medium: 0, low: 0 },
      trendLast7Days: -5,
      topReasons: [{ reason: "Multiple failed logins", count: 1 }],
    });

    const { result } = renderWithQuery(() => useFraudAlerts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.alerts).toHaveLength(1);
    expect(result.current.analytics?.trendLast7Days).toBe(-5);
  });
});
