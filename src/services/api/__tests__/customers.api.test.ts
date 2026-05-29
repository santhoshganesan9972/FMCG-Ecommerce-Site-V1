// ── Customers API Adapter Tests ─────────────────────────────
// Tests customers CRUD, activities, segments, analytics,
// support tickets, fraud detection, and export requests.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as customersApi from "../customers.api";

beforeEach(() => resetMocks());

// ── Customers CRUD ─────────────────────────────────────────

describe("getCustomers", () => {
  it("returns paginated customers on success", async () => {
    const customers = [{ id: "1", name: "John Doe", email: "john@test.com" }];
    const response = { success: true, data: customers, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await customersApi.getCustomers({ segment: "vip" }, { page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers", {
      params: { segment: "vip", page: 1, size: 10 },
    });
  });

  it("returns paginated error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load customers"));

    const result = await customersApi.getCustomers();

    expect(result.success).toBe(false);
    expect(result.data).toEqual([]);
    expect(result.meta).toBeDefined();
  });
});

describe("getCustomerById", () => {
  it("returns a customer on success", async () => {
    const customer = { id: "1", name: "John Doe" };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: customer }));

    const result = await customersApi.getCustomerById("1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers/1");
  });
});

describe("updateCustomerStatus", () => {
  it("updates status on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", status: "active" } }));

    const result = await customersApi.updateCustomerStatus("1", "active");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/customers/1/status", { status: "active" });
  });
});

describe("updateCustomer", () => {
  it("updates customer on success", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", name: "Updated" } }));

    const result = await customersApi.updateCustomer("1", { name: "Updated" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/customers/1", { name: "Updated" });
  });
});

describe("addCustomerNote", () => {
  it("adds note on success", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await customersApi.addCustomerNote("1", "VIP customer", "Admin");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/customers/1/notes", {
      content: "VIP customer",
      performedBy: "Admin",
    });
  });
});

// ── Activities ─────────────────────────────────────────────

describe("customer activities", () => {
  it("getCustomerActivities returns activities", async () => {
    const activities = [{ id: "a1", action: "LOGIN", description: "User logged in", timestamp: "2024-01-01" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: activities }));

    const result = await customersApi.getCustomerActivities("1");

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers/1/activities");
  });

  it("addCustomerActivity adds activity", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await customersApi.addCustomerActivity("1", "NOTE", "Added note", "Admin");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/customers/1/activities", {
      action: "NOTE",
      description: "Added note",
      performedBy: "Admin",
    });
  });
});

// ── Segments & Analytics ───────────────────────────────────

describe("segments", () => {
  it("getSegments returns segments", async () => {
    const segments = [{ id: "s1", name: "VIP", customerCount: 100 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: segments }));

    const result = await customersApi.getSegments();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers/segments");
  });
});

describe("analytics", () => {
  it("getAnalyticsMetrics returns metrics", async () => {
    const metrics = [{ metric: "totalCustomers", value: 5000 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: metrics }));

    const result = await customersApi.getAnalyticsMetrics();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers/analytics/metrics");
  });

  it("getCohortData returns cohort data", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: [] }));
    const result = await customersApi.getCohortData();
    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers/analytics/cohort");
  });

  it("getAcquisitionChannels returns channels", async () => {
    const channels = [{ channel: "organic", count: 2000, percentage: 40, revenue: 50000 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: channels }));

    const result = await customersApi.getAcquisitionChannels();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/customers/analytics/channels");
  });
});

// ── Support Tickets ────────────────────────────────────────

describe("support tickets", () => {
  it("getTickets returns paginated tickets", async () => {
    const tickets = [{ id: "t1", subject: "Help", status: "open" }];
    const response = { success: true, data: tickets, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await customersApi.getTickets({ status: "open" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("getTicketById returns ticket", async () => {
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "t1" } }));
    const result = await customersApi.getTicketById("t1");
    expect(result.success).toBe(true);
  });

  it("updateTicketStatus updates status", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "t1", status: "resolved" } }));
    const result = await customersApi.updateTicketStatus("t1", "resolved", "agent1");
    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/customers/tickets/t1", {
      status: "resolved",
      assignedTo: "agent1",
    });
  });

  it("addTicketMessage adds message", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));
    const message = { sender: "Agent", senderRole: "agent" as const, content: "We will help" };
    const result = await customersApi.addTicketMessage("t1", message);
    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/customers/tickets/t1/messages", message);
  });
});

// ── Fraud Detection ────────────────────────────────────────

describe("fraud detection", () => {
  it("getFraudAlerts returns paginated alerts", async () => {
    const alerts = [{ id: "f1", alertType: "suspicious_login", riskLevel: "high" }];
    const response = { success: true, data: alerts, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await customersApi.getFraudAlerts({ riskLevel: "high" });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("updateFraudAlertStatus updates status", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "f1", status: "blocked" } }));
    const result = await customersApi.updateFraudAlertStatus("f1", "blocked");
    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/customers/fraud/f1", { status: "blocked" });
  });

  it("getFraudAnalytics returns analytics", async () => {
    const analytics = { alertsByLevel: { high: 10 }, trendLast7Days: -5, topReasons: [{ reason: "Suspicious IP", count: 20 }] };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: analytics }));

    const result = await customersApi.getFraudAnalytics();

    expect(result.success).toBe(true);
    expect(result.data.topReasons).toHaveLength(1);
  });
});

// ── Export Requests ────────────────────────────────────────

describe("export requests", () => {
  it("getExportRequests returns paginated exports", async () => {
    const exports = [{ id: "e1", customerId: "1", type: "orders", status: "completed" }];
    const response = { success: true, data: exports, meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 } };
    mockGet.mockResolvedValue(mockSuccessResponse(response));

    const result = await customersApi.getExportRequests("1", { page: 1, pageSize: 10 });

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
  });

  it("requestDataExport creates export request", async () => {
    const exportReq = { id: "e2", customerId: "1", type: "orders", status: "pending" };
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: exportReq }));

    const result = await customersApi.requestDataExport("1", "John Doe", "orders");

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/customers/exports", {
      customerId: "1",
      customerName: "John Doe",
      type: "orders",
    });
  });
});
