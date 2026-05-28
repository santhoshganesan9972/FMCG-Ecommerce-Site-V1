// ── Customers Service Tests ─────────────────────────────────
// Tests the service layer for customers CRUD, activities,
// segments, analytics, support tickets, fraud detection, and exports.

import { describe, it, expect, beforeEach } from "vitest";
import { mockCustomersApi, resetMocks } from "./setup";
import { customerService } from "../customers.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };
const mockCustomer = { id: "1", name: "John Doe", email: "john@test.com", status: "active" as const, segment: "vip" as const };

// ── getCustomers ────────────────────────────────────────────

describe("getCustomers", () => {
  it("unwraps paginated customers with summary on success", async () => {
    const summary = { total: 1, active: 1, vip: 1, new: 0, atRisk: 0, churned: 0, totalRevenue: 5000, avgOrderValue: 100 };
    mockCustomersApi.getCustomers.mockResolvedValue({
      success: true,
      data: [mockCustomer],
      meta: mockMeta,
      summary,
    });

    const result = await customerService.getCustomers({ status: "active" }, { page: 1, pageSize: 10 });

    expect(result.customers).toEqual([mockCustomer]);
    expect(result.pagination).toEqual({ page: 1, pageSize: 10, total: 1 });
    expect(result.summary.active).toBe(1);
    expect(mockCustomersApi.getCustomers).toHaveBeenCalledWith(
      { status: "active" },
      { page: 1, pageSize: 10 },
    );
  });

  it("uses defaults when no args provided", async () => {
    mockCustomersApi.getCustomers.mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      summary: { total: 0, active: 0, vip: 0, new: 0, atRisk: 0, churned: 0, totalRevenue: 0, avgOrderValue: 0 },
    });

    const result = await customerService.getCustomers();

    expect(result.customers).toEqual([]);
    expect(result.pagination.total).toBe(0);
  });
});

// ── getCustomerById ────────────────────────────────────────

describe("getCustomerById", () => {
  it("returns customer on success", async () => {
    mockCustomersApi.getCustomerById.mockResolvedValue({ success: true, data: mockCustomer });

    const result = await customerService.getCustomerById("1");

    expect(result).toEqual(mockCustomer);
  });

  it("returns undefined on failure", async () => {
    mockCustomersApi.getCustomerById.mockResolvedValue({ success: false, data: undefined, error: "Not found" });

    const result = await customerService.getCustomerById("999");

    expect(result).toBeUndefined();
  });
});

// ── updateCustomerStatus ───────────────────────────────────

describe("updateCustomerStatus", () => {
  it("returns updated customer on success", async () => {
    const updated = { ...mockCustomer, status: "blocked" as const };
    mockCustomersApi.updateCustomerStatus.mockResolvedValue({ success: true, data: updated });

    const result = await customerService.updateCustomerStatus("1", "blocked");

    expect(result?.status).toBe("blocked");
    expect(mockCustomersApi.updateCustomerStatus).toHaveBeenCalledWith("1", "blocked");
  });
});

// ── updateCustomer ──────────────────────────────────────────

describe("updateCustomer", () => {
  it("returns updated customer on success", async () => {
    const updated = { ...mockCustomer, name: "Jane Doe" };
    mockCustomersApi.updateCustomer.mockResolvedValue({ success: true, data: updated });

    const result = await customerService.updateCustomer("1", { name: "Jane Doe" });

    expect(result?.name).toBe("Jane Doe");
  });
});

// ── addCustomerNote ────────────────────────────────────────

describe("addCustomerNote", () => {
  it("returns true on success", async () => {
    mockCustomersApi.addCustomerNote.mockResolvedValue({ success: true, data: true });

    const result = await customerService.addCustomerNote("1", "VIP customer", "Admin");

    expect(result).toBe(true);
    expect(mockCustomersApi.addCustomerNote).toHaveBeenCalledWith("1", "VIP customer", "Admin");
  });

  it("returns false on failure", async () => {
    mockCustomersApi.addCustomerNote.mockResolvedValue({ success: false, data: false, error: "Failed" });

    const result = await customerService.addCustomerNote("1", "Note", "Admin");

    expect(result).toBe(false);
  });
});

// ── Customer Activities ─────────────────────────────────────

describe("customer activities", () => {
  it("getCustomerActivities returns activities", async () => {
    const activities = [{ id: "a1", customerId: "1", action: "login" as const, description: "User logged in", timestamp: "2024-01-01" }];
    mockCustomersApi.getCustomerActivities.mockResolvedValue({ success: true, data: activities });

    const result = await customerService.getCustomerActivities("1");

    expect(result).toHaveLength(1);
    expect(result[0].action).toBe("login");
  });

  it("addCustomerActivity returns true on success", async () => {
    mockCustomersApi.addCustomerActivity.mockResolvedValue({ success: true, data: true });

    const result = await customerService.addCustomerActivity("1", "login", "User logged in", "System");

    expect(result).toBe(true);
    expect(mockCustomersApi.addCustomerActivity).toHaveBeenCalledWith("1", "login", "User logged in", "System");
  });
});

// ── Segments ────────────────────────────────────────────────

describe("getSegments", () => {
  it("returns segments on success", async () => {
    const segments = [{ id: "s1", name: "VIP", customerCount: 50, avgOrderValue: 200 }];
    mockCustomersApi.getSegments.mockResolvedValue({ success: true, data: segments });

    const result = await customerService.getSegments();

    expect(result).toEqual(segments);
  });
});

// ── Customer Analytics ──────────────────────────────────────

describe("customer analytics", () => {
  it("getAnalyticsMetrics returns metrics", async () => {
    const metrics = [{ label: "New Customers", value: 300, change: 15, trend: "up" as const }];
    mockCustomersApi.getAnalyticsMetrics.mockResolvedValue({ success: true, data: metrics });

    const result = await customerService.getAnalyticsMetrics();

    expect(result).toEqual(metrics);
  });

  it("getCohortData returns cohort data", async () => {
    const cohort = [{ cohort: "2024-Q1", period: "2024-01", users: 100, retention: 0.8 }];
    mockCustomersApi.getCohortData.mockResolvedValue({ success: true, data: cohort });

    const result = await customerService.getCohortData();

    expect(result).toEqual(cohort);
  });

  it("getAcquisitionChannels returns channels", async () => {
    const channels = [{ channel: "organic", count: 2000, percentage: 40, revenue: 50000 }];
    mockCustomersApi.getAcquisitionChannels.mockResolvedValue({ success: true, data: channels });

    const result = await customerService.getAcquisitionChannels();

    expect(result).toEqual(channels);
  });
});

// ── Support Tickets ─────────────────────────────────────────

describe("support tickets", () => {
  it("getTickets unwraps paginated tickets with summary", async () => {
    const tickets = [{ id: "t1", customerId: "1", subject: "Issue", status: "open" as const, priority: "high" as const }];
    const summary = { total: 1, open: 1, inProgress: 0, resolved: 0, urgent: 0 };
    mockCustomersApi.getTickets.mockResolvedValue({
      success: true,
      data: tickets,
      meta: mockMeta,
      summary,
    });

    const result = await customerService.getTickets({ status: "open" }, { page: 1, pageSize: 10 });

    expect(result.tickets).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
    expect(result.summary.open).toBe(1);
  });

  it("getTicketById returns a ticket", async () => {
    const ticket = { id: "t1", customerId: "1", subject: "Issue", status: "open" as const, priority: "high" as const };
    mockCustomersApi.getTicketById.mockResolvedValue({ success: true, data: ticket });

    const result = await customerService.getTicketById("t1");

    expect(result?.subject).toBe("Issue");
  });

  it("updateTicketStatus returns updated ticket", async () => {
    const updated = { id: "t1", customerId: "1", subject: "Issue", status: "resolved" as const, priority: "high" as const };
    mockCustomersApi.updateTicketStatus.mockResolvedValue({ success: true, data: updated });

    const result = await customerService.updateTicketStatus("t1", "resolved", "agent1");

    expect(result?.status).toBe("resolved");
  });

  it("addTicketMessage returns true on success", async () => {
    mockCustomersApi.addTicketMessage.mockResolvedValue({ success: true, data: true });

    const result = await customerService.addTicketMessage("t1", { sender: "Agent", senderRole: "agent", content: "Working on it" });

    expect(result).toBe(true);
  });
});

// ── Fraud Detection ─────────────────────────────────────────

describe("fraud detection", () => {
  it("getFraudAlerts unwraps paginated alerts with summary", async () => {
    const alerts = [{ id: "f1", customerId: "1", riskLevel: "high" as const, status: "flagged" as const, reason: "Suspicious login" }];
    const summary = { total: 1, blocked: 0, flagged: 1, monitoring: 0, critical: 0, high: 1 };
    mockCustomersApi.getFraudAlerts.mockResolvedValue({
      success: true,
      data: alerts,
      meta: mockMeta,
      summary,
    });

    const result = await customerService.getFraudAlerts({ status: "flagged" }, { page: 1, pageSize: 10 });

    expect(result.alerts).toHaveLength(1);
    expect(result.summary.flagged).toBe(1);
  });

  it("updateFraudAlertStatus returns updated alert", async () => {
    const updated = { id: "f1", customerId: "1", riskLevel: "high" as const, status: "resolved" as const };
    mockCustomersApi.updateFraudAlertStatus.mockResolvedValue({ success: true, data: updated });

    const result = await customerService.updateFraudAlertStatus("f1", "resolved");

    expect(result?.status).toBe("resolved");
  });

  it("getFraudAnalytics returns analytics", async () => {
    const analytics = { alertsByLevel: { high: 5 }, trendLast7Days: 10, topReasons: [{ reason: "VPN detected", count: 20 }] };
    mockCustomersApi.getFraudAnalytics.mockResolvedValue({ success: true, data: analytics });

    const result = await customerService.getFraudAnalytics();

    expect(result.alertsByLevel.high).toBe(5);
    expect(result.topReasons).toHaveLength(1);
  });
});

// ── Export / GDPR Requests ─────────────────────────────────

describe("export requests", () => {
  it("getExportRequests unwraps paginated requests", async () => {
    const requests = [{ id: "e1", customerId: "1", customerName: "John", type: "GDPR", status: "pending" as const, requestedAt: "2024-01-01" }];
    mockCustomersApi.getExportRequests.mockResolvedValue({ success: true, data: requests, meta: mockMeta });

    const result = await customerService.getExportRequests("1", { page: 1, pageSize: 10 });

    expect(result.requests).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
  });

  it("requestDataExport returns created request", async () => {
    const request = { id: "e2", customerId: "1", customerName: "John", type: "GDPR", status: "pending" as const, requestedAt: "2024-01-01" };
    mockCustomersApi.requestDataExport.mockResolvedValue({ success: true, data: request });

    const result = await customerService.requestDataExport("1", "John", "GDPR");

    expect(result.id).toBe("e2");
    expect(mockCustomersApi.requestDataExport).toHaveBeenCalledWith("1", "John", "GDPR");
  });
});
