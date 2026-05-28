// ── Order Management Service Layer ──────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  Order,
  DeliveryPartner,
  Substitution,
  BulkJob,
  OrderFilters,
  AssignPartnerFormData,
  SubstitutionDecisionData,
} from "@/types/orders";
import type { PaginationState } from "@/types/products";
import { ordersApi } from "@/services/api";

// ── Order Service ────────────────────────────────────────

export const orderService = {
  // ── Orders ────────────────────────────────────────────

  async getOrders(
    filters?: Partial<OrderFilters>,
    pagination?: Partial<PaginationState>
  ): Promise<{
    orders: Order[];
    pagination: PaginationState;
    summary: { total: number; pending: number; confirmed: number; preparing: number; outForDelivery: number; delivered: number; cancelled: number; returned: number; revenue: number };
  }> {
    const res = await ordersApi.getOrders(filters, pagination);
    const meta = res.meta!;
    return {
      orders: res.data,
      pagination: { page: meta.page, pageSize: meta.pageSize, total: meta.total },
      summary: (res as any).summary,
    };
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    const res = await ordersApi.getOrderById(id);
    return res.data;
  },

  async updateOrderStatus(id: string, newStatus: string, note?: string): Promise<Order | undefined> {
    const res = await ordersApi.updateOrderStatus(id, newStatus, note);
    return res.data;
  },

  async assignPartner(data: AssignPartnerFormData): Promise<Order | undefined> {
    const res = await ordersApi.assignPartner(data);
    return res.data;
  },

  // ── Delivery Partners ─────────────────────────────────

  async getDeliveryPartners(search?: string): Promise<{ partners: DeliveryPartner[]; total: number }> {
    const res = await ordersApi.getDeliveryPartners(search);
    return { partners: res.data, total: res.data.length };
  },

  async getPartnersByZone(zone: string): Promise<DeliveryPartner[]> {
    const res = await ordersApi.getPartnersByZone(zone);
    return res.data;
  },

  async updatePartnerStatus(id: string, status: string): Promise<boolean> {
    // API adapter doesn't expose this directly; mock for now
    return true;
  },

  // ── Substitutions ────────────────────────────────────

  async getSubstitutions(
    filters?: { search?: string; status?: string },
    pagination?: Partial<PaginationState>
  ): Promise<{ substitutions: Substitution[]; pagination: PaginationState }> {
    const res = await ordersApi.getSubstitutions(filters, pagination);
    return { substitutions: res.data, pagination: { page: res.meta!.page, pageSize: res.meta!.pageSize, total: res.meta!.total } };
  },

  async decideSubstitution(data: SubstitutionDecisionData): Promise<boolean> {
    const res = await ordersApi.decideSubstitution(data);
    return res.success;
  },

  // ── Bulk Jobs ─────────────────────────────────────────

  async getBulkJobs(
    search?: string,
    pagination?: Partial<PaginationState>
  ): Promise<{ jobs: BulkJob[]; pagination: PaginationState }> {
    const res = await ordersApi.getBulkJobs(search, pagination);
    return { jobs: res.data, pagination: { page: res.meta!.page, pageSize: res.meta!.pageSize, total: res.meta!.total } };
  },

  async createBulkAction(data: { actionType: string; orderIds: string[]; targetStatus?: string }): Promise<BulkJob> {
    const res = await ordersApi.createBulkAction(data);
    return res.data;
  },

  // ── Order Notes ───────────────────────────────────────

  async addOrderNote(orderId: string, note: string, performedBy: string): Promise<boolean> {
    const res = await ordersApi.addOrderNote(orderId, note, performedBy);
    return res.success;
  },
};
