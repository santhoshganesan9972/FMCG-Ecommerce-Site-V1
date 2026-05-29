// ── Orders API Adapter ──────────────────────────────────────
// Connects admin order management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse, paginatedErrorResponse } from "@/types/api";
import type { ApiResponse, PaginatedResponse, MutationResult } from "@/types/api";
import type { PaginationState } from "@/types/products";
import type {
  Order,
  DeliveryPartner,
  Substitution,
  BulkJob,
  OrderFilters,
  AssignPartnerFormData,
  SubstitutionDecisionData,
} from "@/types/orders";

const ORDERS = ADMIN;

// ── Orders ─────────────────────────────────────────────────

export async function getOrders(
  filters?: Partial<OrderFilters>,
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<Order> & { summary?: Record<string, number | string> }> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination?.page || 1,
      size: pagination?.pageSize || 10,
    };
    const response = await apiClient.get(ORDERS.ORDERS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<Order>(
      error instanceof Error ? error.message : "Failed to load orders",
    ) as PaginatedResponse<Order> & { summary?: Record<string, number | string> };
  }
}

export async function getOrderById(id: string): Promise<ApiResponse<Order | undefined>> {
  try {
    const response = await apiClient.get(ORDERS.ORDER(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Order not found",
    );
  }
}

export async function updateOrderStatus(id: string, newStatus: string, note?: string): Promise<ApiResponse<Order | undefined>> {
  try {
    const response = await apiClient.put(ORDERS.ORDER_UPDATE_STATUS(id), { status: newStatus, note });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update order status",
    );
  }
}

export async function assignPartner(data: AssignPartnerFormData): Promise<ApiResponse<Order | undefined>> {
  try {
    const response = await apiClient.put(ORDERS.ORDER_ASSIGN_PARTNER(data.orderId), {
      partnerId: data.partnerId,
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to assign partner",
    );
  }
}

// ── Delivery Partners ──────────────────────────────────────

export async function getDeliveryPartners(search?: string): Promise<ApiResponse<DeliveryPartner[]>> {
  try {
    const response = await apiClient.get(ORDERS.ORDER_PARTNERS, {
      params: search ? { search } : undefined,
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load delivery partners",
    );
  }
}

export async function getPartnersByZone(zone: string): Promise<ApiResponse<DeliveryPartner[]>> {
  try {
    const response = await apiClient.get(ORDERS.ORDER_PARTNERS_BY_ZONE, {
      params: { zone },
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load partners by zone",
    );
  }
}

// ── Substitutions ───────────────────────────────────────────

export async function getSubstitutions(
  filters?: { search?: string; status?: string },
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<Substitution>> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination?.page || 1,
      size: pagination?.pageSize || 10,
    };
    const response = await apiClient.get(ORDERS.ORDER_SUBSTITUTIONS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<Substitution>(
      error instanceof Error ? error.message : "Failed to load substitutions",
    );
  }
}

export async function decideSubstitution(data: SubstitutionDecisionData): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(ORDERS.ORDER_SUBSTITUTION_DECIDE(data.id), data);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to decide substitution" };
  }
}

// ── Bulk Jobs ──────────────────────────────────────────────

export async function getBulkJobs(
  search?: string,
  pagination?: Partial<PaginationState>,
): Promise<PaginatedResponse<BulkJob>> {
  try {
    const params: Record<string, unknown> = {};
    if (search) params.search = search;
    if (pagination) {
      params.page = pagination.page || 1;
      params.size = pagination.pageSize || 10;
    }
    const response = await apiClient.get(ORDERS.ORDER_BULK_JOBS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<BulkJob>(
      error instanceof Error ? error.message : "Failed to load bulk jobs",
    );
  }
}

export async function createBulkAction(data: {
  actionType: string;
  orderIds: string[];
  targetStatus?: string;
}): Promise<ApiResponse<BulkJob>> {
  try {
    const response = await apiClient.post(ORDERS.ORDER_BULK_ACTION, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to execute bulk action",
    );
  }
}

// ── Order Notes ─────────────────────────────────────────────

export async function addOrderNote(orderId: string, note: string, performedBy: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.post(ORDERS.ORDER_NOTES(orderId), { note, performedBy });
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to add order note" };
  }
}
