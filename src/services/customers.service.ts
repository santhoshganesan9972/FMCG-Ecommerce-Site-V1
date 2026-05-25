// ── Customer Management Service Layer ───────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Currently uses mock data.
// To connect to real backend:
// 1. Uncomment the axios calls below
// 2. Set NEXT_PUBLIC_API_BASE_URL
// 3. Remove mock data imports and delay helper

import type {
  Customer,
  CustomerActivity,
  CustomerFilters,
  CustomersListResponse,
  Segment,
  AnalyticsMetric,
  CohortData,
  SupportTicket,
  TicketFilters,
  TicketsListResponse,
  FraudAlert,
  SuspiciousActivity,
  FraudFilters,
  FraudListResponse,
  ExportRequest,
} from "@/types/customers";
import type { PaginationState } from "@/types/products";

import {
  mockCustomers,
  mockCustomerActivities,
  mockSegments,
  mockAnalyticsMetrics,
  mockCohortData,
  mockAcquisitionChannels,
  mockSupportTickets,
  mockFraudAlerts,
  mockSuspiciousActivities,
  mockExportRequests,
} from "@/data/admin/customers";

// ── Helpers ──────────────────────────────────────────────

const delay = (ms = 250) => new Promise((res) => setTimeout(res, ms));

function computeCustomersSummary(customers: Customer[]) {
  return {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    vip: customers.filter((c) => c.segment === "vip").length,
    new: customers.filter((c) => c.segment === "new").length,
    atRisk: customers.filter((c) => c.segment === "at_risk").length,
    churned: customers.filter((c) => c.segment === "churned").length,
    totalRevenue: customers.reduce((s, c) => s + c.totalSpent, 0),
    avgOrderValue: customers.length > 0
      ? Math.round(customers.reduce((s, c) => s + c.avgOrderValue, 0) / customers.filter((c) => c.totalOrders > 0).length)
      : 0,
  };
}

function computeTicketsSummary(tickets: SupportTicket[]) {
  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved" || t.status === "closed").length,
    urgent: tickets.filter((t) => t.priority === "urgent").length,
  };
}

function computeFraudSummary(alerts: FraudAlert[]) {
  return {
    total: alerts.length,
    blocked: alerts.filter((a) => a.status === "blocked").length,
    flagged: alerts.filter((a) => a.status === "flagged").length,
    monitoring: alerts.filter((a) => a.status === "monitoring").length,
    critical: alerts.filter((a) => a.riskLevel === "critical").length,
    high: alerts.filter((a) => a.riskLevel === "high").length,
  };
}

// ── Customer Service ─────────────────────────────────────

export const customerService = {
  // ── Customers ─────────────────────────────────────────

  async getCustomers(
    filters?: Partial<CustomerFilters>,
    pagination?: Partial<PaginationState>,
  ): Promise<CustomersListResponse> {
    await delay(300);

    let filtered = [...mockCustomers];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.city.toLowerCase().includes(q),
      );
    }
    if (filters?.segment && filters.segment !== "all") {
      filtered = filtered.filter((c) => c.segment === filters.segment);
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((c) => c.status === filters.status);
    }
    if (filters?.city) {
      filtered = filtered.filter((c) => c.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }

    // Filter by segment/status convenience
    if (filters?.minOrders !== undefined) {
      filtered = filtered.filter((c) => c.totalOrders >= filters.minOrders!);
    }
    if (filters?.minSpent !== undefined) {
      filtered = filtered.filter((c) => c.totalSpent >= filters.minSpent!);
    }

    // Sorting
    if (filters?.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[filters.sortBy as keyof Customer] ?? "";
        const bVal = b[filters.sortBy as keyof Customer] ?? "";
        const cmp = typeof aVal === "number" && typeof bVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return filters.sortOrder === "asc" ? cmp : -cmp;
      });
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      customers: paged,
      pagination: { page, pageSize, total },
      summary: computeCustomersSummary(filtered),
    };
  },

  async getCustomerById(id: string): Promise<Customer | undefined> {
    await delay(150);
    return mockCustomers.find((c) => c.id === id);
  },

  async updateCustomerStatus(id: string, status: string): Promise<Customer | undefined> {
    await delay(200);
    const idx = mockCustomers.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    mockCustomers[idx] = { ...mockCustomers[idx], status: status as Customer["status"], updatedAt: new Date().toISOString() };
    return mockCustomers[idx];
  },

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer | undefined> {
    await delay(250);
    const idx = mockCustomers.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    mockCustomers[idx] = { ...mockCustomers[idx], ...data, updatedAt: new Date().toISOString() };
    return mockCustomers[idx];
  },

  async addCustomerNote(id: string, content: string, performedBy: string): Promise<boolean> {
    await delay(150);
    const idx = mockCustomers.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    const note = { id: `NOTE-${Date.now()}`, content, performedBy, createdAt: new Date().toISOString() };
    mockCustomers[idx].notes = [...mockCustomers[idx].notes, note];
    return true;
  },

  // ── Activities ────────────────────────────────────────

  async getCustomerActivities(customerId: string): Promise<CustomerActivity[]> {
    await delay(200);
    return mockCustomerActivities.filter((a) => a.customerId === customerId);
  },

  // ── Segments ──────────────────────────────────────────

  async getSegments(): Promise<Segment[]> {
    await delay(200);
    return [...mockSegments];
  },

  // ── Analytics ─────────────────────────────────────────

  async getAnalyticsMetrics(): Promise<AnalyticsMetric[]> {
    await delay(200);
    return [...mockAnalyticsMetrics];
  },

  async getCohortData(): Promise<CohortData[]> {
    await delay(200);
    return [...mockCohortData];
  },

  async getAcquisitionChannels(): Promise<{ channel: string; count: number; percentage: number; revenue: number }[]> {
    await delay(200);
    return [...mockAcquisitionChannels];
  },

  // ── Support Tickets ───────────────────────────────────

  async getTickets(
    filters?: Partial<TicketFilters>,
    pagination?: Partial<PaginationState>,
  ): Promise<TicketsListResponse> {
    await delay(250);

    let filtered = [...mockSupportTickets];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.customer.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q),
      );
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((t) => t.status === filters.status);
    }
    if (filters?.priority && filters.priority !== "all") {
      filtered = filtered.filter((t) => t.priority === filters.priority);
    }
    if (filters?.assignedTo) {
      filtered = filtered.filter((t) => t.assignedTo === filters.assignedTo);
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      tickets: paged,
      pagination: { page, pageSize, total },
      summary: computeTicketsSummary(filtered),
    };
  },

  async getTicketById(id: string): Promise<SupportTicket | undefined> {
    await delay(150);
    return mockSupportTickets.find((t) => t.id === id);
  },

  async updateTicketStatus(id: string, status: string, assignedTo?: string): Promise<SupportTicket | undefined> {
    await delay(200);
    const idx = mockSupportTickets.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    mockSupportTickets[idx] = {
      ...mockSupportTickets[idx],
      status: status as SupportTicket["status"],
      ...(assignedTo ? { assignedTo } : {}),
      updatedAt: new Date().toISOString(),
      ...(status === "resolved" || status === "closed" ? { resolvedAt: new Date().toISOString() } : {}),
    };
    return mockSupportTickets[idx];
  },

  async addTicketMessage(id: string, message: { sender: string; senderRole: "customer" | "agent" | "system"; content: string }): Promise<boolean> {
    await delay(200);
    const idx = mockSupportTickets.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    const msg = { id: `MSG-${Date.now()}`, ...message, attachments: [], createdAt: new Date().toISOString() };
    mockSupportTickets[idx].messages = [...mockSupportTickets[idx].messages, msg];
    mockSupportTickets[idx].updatedAt = new Date().toISOString();
    return true;
  },

  // ── Fraud Detection ───────────────────────────────────

  async getFraudAlerts(
    filters?: Partial<FraudFilters>,
    pagination?: Partial<PaginationState>,
  ): Promise<FraudListResponse> {
    await delay(250);

    let filtered = [...mockFraudAlerts];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.customerName.toLowerCase().includes(q) ||
          a.reason.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q),
      );
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((a) => a.status === filters.status);
    }
    if (filters?.riskLevel && filters.riskLevel !== "all") {
      filtered = filtered.filter((a) => a.riskLevel === filters.riskLevel);
    }
    if (filters?.minScore !== undefined) {
      filtered = filtered.filter((a) => a.riskScore >= filters.minScore!);
    }

    // Sort by risk score descending by default
    filtered.sort((a, b) => b.riskScore - a.riskScore);

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      alerts: paged,
      pagination: { page, pageSize, total },
      summary: computeFraudSummary(filtered),
    };
  },

  async updateFraudAlertStatus(id: string, status: string): Promise<FraudAlert | undefined> {
    await delay(200);
    const idx = mockFraudAlerts.findIndex((a) => a.id === id);
    if (idx === -1) return undefined;
    mockFraudAlerts[idx] = {
      ...mockFraudAlerts[idx],
      status: status as FraudAlert["status"],
      ...(status === "cleared" || status === "blocked" ? { resolvedAt: new Date().toISOString() } : {}),
    };
    return mockFraudAlerts[idx];
  },

  async getFraudAnalytics(): Promise<{ alertsByLevel: Record<string, number>; trendLast7Days: number; topReasons: { reason: string; count: number }[] }> {
    await delay(200);
    const alertsByLevel: Record<string, number> = {};
    mockFraudAlerts.forEach((a) => { alertsByLevel[a.riskLevel] = (alertsByLevel[a.riskLevel] || 0) + 1; });

    const reasonMap: Record<string, number> = {};
    mockFraudAlerts.forEach((a) => { reasonMap[a.reason] = (reasonMap[a.reason] || 0) + 1; });
    const topReasons = Object.entries(reasonMap)
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      alertsByLevel,
      trendLast7Days: 12,
      topReasons,
    };
  },

  // ── Export / GDPR Requests ────────────────────────────

  async getExportRequests(
    customerId?: string,
    pagination?: Partial<PaginationState>,
  ): Promise<{ requests: ExportRequest[]; pagination: PaginationState }> {
    await delay(200);
    let filtered = [...mockExportRequests];
    if (customerId) {
      filtered = filtered.filter((r) => r.customerId === customerId);
    }
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);
    return { requests: paged, pagination: { page, pageSize, total } };
  },

  async requestDataExport(customerId: string, customerName: string, type: string): Promise<ExportRequest> {
    await delay(500);
    const req: ExportRequest = {
      id: `EXP-${Date.now()}`,
      customerId,
      customerName,
      type: type as ExportRequest["type"],
      scope: "all",
      status: "pending",
      fileUrl: null,
      requestedBy: customerName,
      requestedAt: new Date().toISOString(),
      completedAt: null,
    };
    return req;
  },
};

// ── Export singleton ─────────────────────────────────────
export default customerService;
