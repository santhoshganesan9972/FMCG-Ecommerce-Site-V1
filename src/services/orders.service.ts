// ── Order Management Service Layer ──────────────────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Currently uses mock data.
// To connect to real backend:
// 1. Uncomment the axios.get/post/put/delete calls
// 2. Set NEXT_PUBLIC_API_BASE_URL
// 3. Remove mock data imports and delay helper

import type {
  Order,
  DeliveryPartner,
  Substitution,
  BulkJob,
  OrderFilters,
  AssignPartnerFormData,
  OrdersListResponse,
  PartnersListResponse,
  SubstitutionDecisionData,
} from "@/types/orders";
import {
  mockOrders,
  mockDeliveryPartners,
  mockSubstitutions,
  mockBulkJobs,
} from "@/data/admin/orders";
import type { PaginationState } from "@/types/products";

// ── Helpers ──────────────────────────────────────────────

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const storage = localStorage.getItem("order-storage");
    if (!storage) return [];
    const parsed = JSON.parse(storage);
    const orders = parsed.state?.orders || [];
    
    // Map user orders to admin order format
    return orders.map((o: any) => ({
      id: o.id,
      customer: o.deliveryAddress.name,
      email: "user@example.com", // Mock email for local orders
      phone: o.deliveryAddress.phone,
      items: o.items.map((item: any) => ({
        product: item.name,
        productId: String(item.id),
        quantity: item.quantity,
        price: item.price,
      })),
      total: o.total,
      status: mapUserStatusToAdminStatus(o.status),
      paymentMethod: o.paymentMethod,
      paymentStatus: o.paymentMethod === "cod" ? "pending" : "paid",
      deliveryAddress: `${o.deliveryAddress.address}, ${o.deliveryAddress.city} - ${o.deliveryAddress.pincode}`,
      timeline: o.trackingSteps.map((s: any) => ({
        status: s.id,
        timestamp: new Date().toISOString(), // Mock timestamp
        note: s.label,
      })),
      createdAt: new Date(o.date).toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  } catch (e) {
    console.error("Failed to load local orders", e);
    return [];
  }
}

function mapUserStatusToAdminStatus(status: string): Order["status"] {
  switch (status) {
    case "Processing": return "preparing";
    case "Out for Delivery": return "out_for_delivery";
    case "Delivered": return "delivered";
    case "Cancelled": return "cancelled";
    default: return "pending";
  }
}

// ... (computeOrdersSummary same as before)
function computeOrdersSummary(orders: Order[]) {
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    outForDelivery: orders.filter((o) => o.status === "out_for_delivery").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    returned: orders.filter((o) => o.status === "returned").length,
    revenue: orders.reduce((s, o) => s + (o.paymentStatus === "paid" ? o.total : 0), 0),
  };
}

// ── Order Service ────────────────────────────────────────

export const orderService = {
  // ── Orders ────────────────────────────────────────────

  async getOrders(
    filters?: Partial<OrderFilters>,
    pagination?: Partial<PaginationState>
  ): Promise<OrdersListResponse> {
    await delay(250);

    const localOrders = getLocalOrders();
    let filtered = [...localOrders, ...mockOrders];

    if (filters?.search) {
// ...
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.customer.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q)
      );
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((o) => o.status === filters.status);
    }
    if (filters?.zone) {
      filtered = filtered.filter((o) => o.zone === filters.zone);
    }
    if (filters?.paymentStatus) {
      filtered = filtered.filter((o) => o.paymentStatus === filters.paymentStatus);
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      orders: paged,
      pagination: { page, pageSize, total },
      summary: computeOrdersSummary(filtered),
    };
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    await delay(150);
    const localOrders = getLocalOrders();
    const order = localOrders.find((o) => o.id === id) || mockOrders.find((o) => o.id === id);
    return order;
  },

  async updateOrderStatus(id: string, newStatus: string, note?: string): Promise<Order | undefined> {
    await delay(300);
    const order = mockOrders.find((o) => o.id === id);
    if (!order) return undefined;
    return {
      ...order,
      status: newStatus as Order["status"],
      updatedAt: new Date().toISOString(),
      timeline: [
        ...order.timeline,
        { status: newStatus, timestamp: new Date().toISOString(), note },
      ],
    };
  },

  async assignPartner(data: AssignPartnerFormData): Promise<Order | undefined> {
    await delay(300);
    const order = mockOrders.find((o) => o.id === data.orderId);
    const partner = mockDeliveryPartners.find((p) => p.id === data.partnerId);
    if (!order || !partner) return undefined;
    return {
      ...order,
      deliveryPartner: partner.name,
      updatedAt: new Date().toISOString(),
      timeline: [
        ...order.timeline,
        { status: order.status, timestamp: new Date().toISOString(), note: `Assigned to ${partner.name}` },
      ],
    };
  },

  // ── Delivery Partners ─────────────────────────────────

  async getDeliveryPartners(search?: string): Promise<PartnersListResponse> {
    await delay(200);
    let partners = [...mockDeliveryPartners];
    if (search) {
      const q = search.toLowerCase();
      partners = partners.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.zone?.toLowerCase().includes(q)
      );
    }
    return { partners, total: partners.length };
  },

  async getPartnersByZone(zone: string): Promise<DeliveryPartner[]> {
    await delay(150);
    return mockDeliveryPartners.filter(
      (p) => p.zone === zone && p.status !== "offline"
    );
  },

  async updatePartnerStatus(id: string, status: string): Promise<boolean> {
    await delay(200);
    return true;
  },

  // ── Substitutions ────────────────────────────────────

  async getSubstitutions(
    filters?: { search?: string; status?: string },
    pagination?: Partial<PaginationState>
  ): Promise<{ substitutions: Substitution[]; pagination: PaginationState }> {
    await delay(200);
    let filtered = [...mockSubstitutions];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.original.toLowerCase().includes(q) ||
          s.substitute.toLowerCase().includes(q) ||
          s.orderId.toLowerCase().includes(q) ||
          s.customer?.toLowerCase().includes(q)
      );
    }
    if (filters?.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return { substitutions: paged, pagination: { page, pageSize, total } };
  },

  async decideSubstitution(data: SubstitutionDecisionData): Promise<boolean> {
    await delay(250);
    return true;
  },

  // ── Bulk Jobs ─────────────────────────────────────────

  async getBulkJobs(
    search?: string,
    pagination?: Partial<PaginationState>
  ): Promise<{ jobs: BulkJob[]; pagination: PaginationState }> {
    await delay(200);
    let filtered = [...mockBulkJobs];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.type.toLowerCase().includes(q) ||
          j.processedBy?.toLowerCase().includes(q)
      );
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return { jobs: paged, pagination: { page, pageSize, total } };
  },

  async createBulkAction(data: {
    actionType: string;
    orderIds: string[];
    targetStatus?: string;
  }): Promise<BulkJob> {
    await delay(800);
    const successCount = data.orderIds.length;
    return {
      id: `BULK-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      type: data.actionType,
      count: data.orderIds.length,
      success: successCount,
      failed: 0,
      status: "completed",
      processedBy: "Super Admin",
    };
  },

  // ── Order Notes ───────────────────────────────────────

  async addOrderNote(
    orderId: string,
    note: string,
    performedBy: string
  ): Promise<boolean> {
    await delay(200);
    // TODO: Append note to mockOrders timeline when dedicated notes field is added
    return true;
  },
};
