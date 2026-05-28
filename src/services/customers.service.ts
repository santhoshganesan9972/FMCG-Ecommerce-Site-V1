// ── Customer Management Service Layer ───────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  Customer,
  CustomerActivity,
  CustomerAction,
  CustomerFilters,
  Segment,
  AnalyticsMetric,
  CohortData,
  SupportTicket,
  TicketFilters,
  FraudAlert,
  FraudFilters,
  ExportRequest,
} from "@/types/customers";
import type { PaginationState } from "@/types/products";
import { customersApi } from "@/services/api";

export const customerService = {
  // ── Customers ─────────────────────────────────────────

  async getCustomers(
    filters?: Partial<CustomerFilters>,
    pagination?: Partial<PaginationState>,
  ): Promise<{
    customers: Customer[];
    pagination: PaginationState;
    summary: { total: number; active: number; vip: number; new: number; atRisk: number; churned: number; totalRevenue: number; avgOrderValue: number };
  }> {
    const res = await customersApi.getCustomers(filters, pagination);
    const meta = res.meta!;
    return {
      customers: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async getCustomerById(id: string): Promise<Customer | undefined> {
    const res = await customersApi.getCustomerById(id);
    return res.data;
  },

  async updateCustomerStatus(id: string, status: string): Promise<Customer | undefined> {
    const res = await customersApi.updateCustomerStatus(id, status);
    return res.data;
  },

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer | undefined> {
    const res = await customersApi.updateCustomer(id, data);
    return res.data;
  },

  async addCustomerNote(id: string, content: string, performedBy: string): Promise<boolean> {
    const res = await customersApi.addCustomerNote(id, content, performedBy);
    return res.success;
  },

  // ── Activities ────────────────────────────────────────

  async getCustomerActivities(customerId: string): Promise<CustomerActivity[]> {
    const res = await customersApi.getCustomerActivities(customerId);
    return res.data;
  },

  async addCustomerActivity(customerId: string, action: CustomerAction, description: string, performedBy?: string): Promise<boolean> {
    const res = await customersApi.addCustomerActivity(customerId, action, description, performedBy);
    return res.success;
  },

  // ── Segments ──────────────────────────────────────────

  async getSegments(): Promise<Segment[]> {
    const res = await customersApi.getSegments();
    return res.data;
  },

  // ── Analytics ─────────────────────────────────────────

  async getAnalyticsMetrics(): Promise<AnalyticsMetric[]> {
    const res = await customersApi.getAnalyticsMetrics();
    return res.data;
  },

  async getCohortData(): Promise<CohortData[]> {
    const res = await customersApi.getCohortData();
    return res.data;
  },

  async getAcquisitionChannels(): Promise<{ channel: string; count: number; percentage: number; revenue: number }[]> {
    const res = await customersApi.getAcquisitionChannels();
    return res.data;
  },

  // ── Support Tickets ───────────────────────────────────

  async getTickets(
    filters?: Partial<TicketFilters>,
    pagination?: Partial<PaginationState>,
  ): Promise<{
    tickets: SupportTicket[];
    pagination: PaginationState;
    summary: { total: number; open: number; inProgress: number; resolved: number; urgent: number };
  }> {
    const res = await customersApi.getTickets(filters, pagination);
    const meta = res.meta!;
    return {
      tickets: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async getTicketById(id: string): Promise<SupportTicket | undefined> {
    const res = await customersApi.getTicketById(id);
    return res.data;
  },

  async updateTicketStatus(id: string, status: string, assignedTo?: string): Promise<SupportTicket | undefined> {
    const res = await customersApi.updateTicketStatus(id, status, assignedTo);
    return res.data;
  },

  async addTicketMessage(
    id: string, message: { sender: string; senderRole: "customer" | "agent" | "system"; content: string }
  ): Promise<boolean> {
    const res = await customersApi.addTicketMessage(id, message);
    return res.success;
  },

  // ── Fraud Detection ───────────────────────────────────

  async getFraudAlerts(
    filters?: Partial<FraudFilters>,
    pagination?: Partial<PaginationState>,
  ): Promise<{
    alerts: FraudAlert[];
    pagination: PaginationState;
    summary: { total: number; blocked: number; flagged: number; monitoring: number; critical: number; high: number };
  }> {
    const res = await customersApi.getFraudAlerts(filters, pagination);
    const meta = res.meta!;
    return {
      alerts: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async updateFraudAlertStatus(id: string, status: string): Promise<FraudAlert | undefined> {
    const res = await customersApi.updateFraudAlertStatus(id, status);
    return res.data;
  },

  async getFraudAnalytics(): Promise<{ alertsByLevel: Record<string, number>; trendLast7Days: number; topReasons: { reason: string; count: number }[] }> {
    const res = await customersApi.getFraudAnalytics();
    return res.data;
  },

  // ── Export / GDPR Requests ────────────────────────────

  async getExportRequests(
    customerId?: string,
    pagination?: Partial<PaginationState>,
  ): Promise<{ requests: ExportRequest[]; pagination: PaginationState }> {
    const res = await customersApi.getExportRequests(customerId, pagination);
    return { requests: res.data, pagination: { page: res.meta!.page, pageSize: res.meta!.pageSize, total: res.meta!.total } };
  },

  async requestDataExport(customerId: string, customerName: string, type: string): Promise<ExportRequest> {
    const res = await customersApi.requestDataExport(customerId, customerName, type);
    return res.data;
  },
};

export default customerService;
