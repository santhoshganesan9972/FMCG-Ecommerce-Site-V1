// ── Customers API Adapter ───────────────────────────────────
// Connects admin customer management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse, paginatedErrorResponse } from "@/types/api";
import type { ApiResponse, PaginatedResponse, MutationResult } from "@/types/api";
import type { PaginationState } from "@/types/products";
import type {
  Customer,
  CustomerFilters,
  CustomerActivity,
  CustomerAction,
  Segment,
  AnalyticsMetric,
  CohortData,
  SupportTicket,
  TicketFilters,
  FraudAlert,
  FraudFilters,
  ExportRequest,
} from "@/types/customers";

const C = ADMIN;

// ── Customers ──────────────────────────────────────────────

export async function getCustomers(
  filters?: Partial<CustomerFilters>,
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<Customer> & { summary?: Record<string, number | string> }> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination?.page || 1,
      size: pagination?.pageSize || 10,
    };
    const response = await apiClient.get(C.CUSTOMERS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<Customer>(
      error instanceof Error ? error.message : "Failed to load customers",
    ) as PaginatedResponse<Customer> & { summary?: Record<string, number | string> };
  }
}

export async function getCustomerById(id: string): Promise<ApiResponse<Customer | undefined>> {
  try {
    const response = await apiClient.get(C.CUSTOMER(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Customer not found",
    );
  }
}

export async function updateCustomerStatus(id: string, status: string): Promise<ApiResponse<Customer | undefined>> {
  try {
    const response = await apiClient.put(C.CUSTOMER_STATUS(id), { status });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update customer status",
    );
  }
}

export async function updateCustomer(id: string, data: Partial<Customer>): Promise<ApiResponse<Customer | undefined>> {
  try {
    const response = await apiClient.put(C.CUSTOMER(id), data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update customer",
    );
  }
}

export async function addCustomerNote(id: string, content: string, performedBy: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.post(C.CUSTOMER_NOTES(id), { content, performedBy });
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to add customer note" };
  }
}

// ── Activities ─────────────────────────────────────────────

export async function getCustomerActivities(customerId: string): Promise<ApiResponse<CustomerActivity[]>> {
  try {
    const response = await apiClient.get(`${C.CUSTOMER(customerId)}/activities`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load customer activities",
    );
  }
}

export async function addCustomerActivity(
  customerId: string, action: CustomerAction, description: string, performedBy?: string,
): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.post(`${C.CUSTOMER(customerId)}/activities`, {
      action, description, performedBy,
    });
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to add activity" };
  }
}

// ── Segments ───────────────────────────────────────────────

export async function getSegments(): Promise<ApiResponse<Segment[]>> {
  try {
    const response = await apiClient.get(C.CUSTOMER_SEGMENTS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load segments",
    );
  }
}

// ── Analytics ──────────────────────────────────────────────

export async function getAnalyticsMetrics(): Promise<ApiResponse<AnalyticsMetric[]>> {
  try {
    const response = await apiClient.get(C.CUSTOMER_ANALYTICS_METRICS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load analytics metrics",
    );
  }
}

export async function getCohortData(): Promise<ApiResponse<CohortData[]>> {
  try {
    const response = await apiClient.get(C.CUSTOMER_ANALYTICS_COHORT);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load cohort data",
    );
  }
}

export async function getAcquisitionChannels(): Promise<ApiResponse<{ channel: string; count: number; percentage: number; revenue: number }[]>> {
  try {
    const response = await apiClient.get(C.CUSTOMER_ANALYTICS_CHANNELS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load acquisition channels",
    );
  }
}

// ── Support Tickets ────────────────────────────────────────

export async function getTickets(
  filters?: Partial<TicketFilters>,
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<SupportTicket> & { summary?: Record<string, number | string> }> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination?.page || 1,
      size: pagination?.pageSize || 10,
    };
    const response = await apiClient.get(C.CUSTOMER_TICKETS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<SupportTicket>(
      error instanceof Error ? error.message : "Failed to load support tickets",
    ) as PaginatedResponse<SupportTicket> & { summary?: Record<string, number | string> };
  }
}

export async function getTicketById(id: string): Promise<ApiResponse<SupportTicket | undefined>> {
  try {
    const response = await apiClient.get(C.CUSTOMER_TICKET(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Ticket not found",
    );
  }
}

export async function updateTicketStatus(id: string, status: string, assignedTo?: string): Promise<ApiResponse<SupportTicket | undefined>> {
  try {
    const response = await apiClient.put(C.CUSTOMER_TICKET(id), { status, assignedTo });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update ticket status",
    );
  }
}

export async function addTicketMessage(
  id: string, message: { sender: string; senderRole: "customer" | "agent" | "system"; content: string },
): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.post(`${C.CUSTOMER_TICKET(id)}/messages`, message);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to add message" };
  }
}

// ── Fraud Detection ────────────────────────────────────────

export async function getFraudAlerts(
  filters?: Partial<FraudFilters>,
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<FraudAlert> & { summary?: Record<string, number | string> }> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination?.page || 1,
      size: pagination?.pageSize || 10,
    };
    const response = await apiClient.get(C.CUSTOMER_FRAUD, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<FraudAlert>(
      error instanceof Error ? error.message : "Failed to load fraud alerts",
    ) as PaginatedResponse<FraudAlert> & { summary?: Record<string, number | string> };
  }
}

export async function updateFraudAlertStatus(id: string, status: string): Promise<ApiResponse<FraudAlert | undefined>> {
  try {
    const response = await apiClient.put(`${C.CUSTOMER_FRAUD}/${id}`, { status });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update fraud alert",
    );
  }
}

export async function getFraudAnalytics(): Promise<ApiResponse<{
  alertsByLevel: Record<string, number>;
  trendLast7Days: number;
  topReasons: { reason: string; count: number }[];
}>> {
  try {
    const response = await apiClient.get(C.CUSTOMER_FRAUD_ANALYTICS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load fraud analytics",
    );
  }
}

// ── Export Requests ────────────────────────────────────────

export async function getExportRequests(
  customerId?: string,
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<ExportRequest>> {
  try {
    const params: Record<string, unknown> = {};
    if (customerId) params.customerId = customerId;
    if (pagination) {
      params.page = pagination.page || 1;
      params.size = pagination.pageSize || 10;
    }
    const response = await apiClient.get(C.CUSTOMER_EXPORTS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<ExportRequest>(
      error instanceof Error ? error.message : "Failed to load export requests",
    );
  }
}

export async function requestDataExport(customerId: string, customerName: string, type: string): Promise<ApiResponse<ExportRequest>> {
  try {
    const response = await apiClient.post(C.CUSTOMER_EXPORTS, { customerId, customerName, type });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to request data export",
    );
  }
}
