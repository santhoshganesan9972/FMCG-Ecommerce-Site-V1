// ── Admin Notification Service ────────────────────────────
// Mock data layer — swap with Axios calls to API Gateway later

import type {
  AdminNotification,
  NotificationCategory,
  NotificationPriority,
  NotificationFeed,
  NotificationQueryParams,
  NotificationStats,
  NotificationPreferences,
} from "@/types/admin-notifications";

// ── Utility ───────────────────────────────────────────────

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

// ── Mock Notifications ────────────────────────────────────

const MOCK_NOTIFICATIONS: AdminNotification[] = [
  // ── Today ──────────────────────────────────────
  {
    id: "N-001",
    type: "order",
    priority: "high",
    title: "New Order #ORD-2026-102",
    message: "Ravi Kumar placed an order for 5 items worth ₹1,240",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/orders/ORD-2026-102",
    actionLabel: "View Order",
    createdAt: new Date().toISOString().replace(/T.*/, "T10:32:00Z"),
    updatedAt: new Date().toISOString().replace(/T.*/, "T10:32:00Z"),
  },
  {
    id: "N-002",
    type: "inventory",
    priority: "critical",
    title: "Stock Alert: Natural Honey",
    message: "Natural Honey 500g (PRD-003) is out of stock at Delhi Central warehouse",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/inventory",
    actionLabel: "Check Inventory",
    createdAt: new Date().toISOString().replace(/T.*/, "T09:15:00Z"),
    updatedAt: new Date().toISOString().replace(/T.*/, "T09:15:00Z"),
  },
  {
    id: "N-003",
    type: "delivery",
    priority: "high",
    title: "Delivery Exception: ORD-2026-099",
    message: "Delivery partner reported customer unavailable at delivery location",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/orders/ORD-2026-099",
    actionLabel: "Resolve",
    createdAt: new Date().toISOString().replace(/T.*/, "T08:45:00Z"),
    updatedAt: new Date().toISOString().replace(/T.*/, "T08:45:00Z"),
  },
  {
    id: "N-004",
    type: "system",
    priority: "low",
    title: "Daily Report Ready",
    message: "Yesterday's sales report is ready for review",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/reports/sales",
    actionLabel: "View Report",
    createdAt: new Date().toISOString().replace(/T.*/, "T07:00:00Z"),
    updatedAt: new Date().toISOString().replace(/T.*/, "T07:00:00Z"),
  },
  // ── Yesterday ──────────────────────────────────
  {
    id: "N-005",
    type: "vendor",
    priority: "normal",
    title: "New Vendor Registration",
    message: "Snack World Distributors has completed onboarding. Review and approve.",
    channel: "in_app",
    read: true,
    archived: false,
    actionUrl: "/admin/vendors/onboarding",
    actionLabel: "Review Vendor",
    createdAt: "2026-05-24T16:20:00Z",
    updatedAt: "2026-05-24T16:20:00Z",
  },
  {
    id: "N-006",
    type: "promotion",
    priority: "normal",
    title: "Flash Sale Ended",
    message: "Dairy Products Flash Sale ended. 890 units sold, ₹2.67L revenue generated.",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/promotions",
    actionLabel: "View Results",
    createdAt: "2026-05-24T23:59:00Z",
    updatedAt: "2026-05-24T23:59:00Z",
  },
  {
    id: "N-007",
    type: "security",
    priority: "critical",
    title: "Failed Login Attempt",
    message: "5 failed login attempts detected from IP 203.0.113.42 for account 'amit@fmcg.com'",
    channel: "in_app",
    read: true,
    archived: false,
    actionUrl: "/admin/settings/users",
    actionLabel: "Review Activity",
    createdAt: "2026-05-24T22:15:00Z",
    updatedAt: "2026-05-24T22:15:00Z",
  },
  {
    id: "N-008",
    type: "customer",
    priority: "normal",
    title: "VIP Customer Support Request",
    message: "Vikram Patel (VIP) opened a high-priority support ticket regarding delayed delivery",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/customers/support-tickets",
    actionLabel: "View Ticket",
    createdAt: "2026-05-24T18:30:00Z",
    updatedAt: "2026-05-24T18:30:00Z",
  },
  {
    id: "N-009",
    type: "order",
    priority: "normal",
    title: "Order #ORD-2026-095 Delivered",
    message: "Order for Sunita Verma — 2 items, ₹450 — delivered successfully",
    channel: "in_app",
    read: true,
    archived: false,
    createdAt: "2026-05-24T17:00:00Z",
    updatedAt: "2026-05-24T17:00:00Z",
  },
  {
    id: "N-010",
    type: "billing",
    priority: "high",
    title: "Vendor Payout Due Tomorrow",
    message: "Fortune Foods Ltd — ₹2,45,000 payout scheduled for May 28. Ensure sufficient balance.",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/vendors/settlements",
    actionLabel: "Review Payouts",
    createdAt: "2026-05-24T10:00:00Z",
    updatedAt: "2026-05-24T10:00:00Z",
  },
  {
    id: "N-011",
    type: "inventory",
    priority: "high",
    title: "FEFO Alert: Batch BATCH-045 Expiring",
    message: "Batch of Full Cream Milk 1L expiring in 3 days. 240 units at Mumbai Hub.",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/inventory/fefo",
    actionLabel: "View FEFO",
    createdAt: "2026-05-24T08:00:00Z",
    updatedAt: "2026-05-24T08:00:00Z",
  },
  // ── This Week ──────────────────────────────────
  {
    id: "N-012",
    type: "system",
    priority: "normal",
    title: "AI Forecast Updated",
    message: "Demand forecast for next 30 days: +12.4% increase predicted. Inventory recommendations available.",
    channel: "in_app",
    read: true,
    archived: false,
    actionUrl: "/admin/inventory/forecast",
    actionLabel: "View Forecast",
    createdAt: "2026-05-23T14:00:00Z",
    updatedAt: "2026-05-23T14:00:00Z",
  },
  {
    id: "N-013",
    type: "security",
    priority: "high",
    title: "New Device Login",
    message: "New login from Chrome on Windows — IP 198.51.100.23, Bangalore. If this wasn't you, secure your account.",
    channel: "in_app",
    read: true,
    archived: false,
    createdAt: "2026-05-23T09:30:00Z",
    updatedAt: "2026-05-23T09:30:00Z",
  },
  {
    id: "N-014",
    type: "vendor",
    priority: "normal",
    title: "Vendor Performance Updated",
    message: "Amul Dairy achieved 4.9 rating this month. Top performing vendor.",
    channel: "in_app",
    read: true,
    archived: false,
    createdAt: "2026-05-22T12:00:00Z",
    updatedAt: "2026-05-22T12:00:00Z",
  },
  {
    id: "N-015",
    type: "promotion",
    priority: "normal",
    title: "Coupon Expiry Reminder",
    message: "Summer Sale 40% Off coupon expires in 7 days. 3,755 unused codes remaining.",
    channel: "in_app",
    read: false,
    archived: false,
    actionUrl: "/admin/promotions/coupons",
    actionLabel: "Manage Coupons",
    createdAt: "2026-05-22T10:00:00Z",
    updatedAt: "2026-05-22T10:00:00Z",
  },
  {
    id: "N-016",
    type: "billing",
    priority: "normal",
    title: "Payment Gateway Report",
    message: "Monthly gateway charges: ₹24,580. Transaction success rate: 98.7%.",
    channel: "in_app",
    read: true,
    archived: false,
    createdAt: "2026-05-21T11:00:00Z",
    updatedAt: "2026-05-21T11:00:00Z",
  },
  {
    id: "N-017",
    type: "delivery",
    priority: "low",
    title: "Fleet Utilization Report",
    message: "Fleet utilization at 72% this week. Mumbai Metro zone at 89% — consider adding 2 more riders.",
    channel: "in_app",
    read: true,
    archived: false,
    actionUrl: "/admin/delivery/fleet",
    actionLabel: "View Fleet",
    createdAt: "2026-05-21T09:00:00Z",
    updatedAt: "2026-05-21T09:00:00Z",
  },
  // ── Earlier ────────────────────────────────────
  {
    id: "N-018",
    type: "system",
    priority: "critical",
    title: "Server CPU Threshold Exceeded",
    message: "Production server CPU usage at 92% for 5+ minutes. Auto-scaling initiated.",
    channel: "in_app",
    read: true,
    archived: true,
    createdAt: "2026-05-19T15:30:00Z",
    updatedAt: "2026-05-19T15:35:00Z",
  },
  {
    id: "N-019",
    type: "order",
    priority: "normal",
    title: "Bulk Order #ORD-2026-088 Processed",
    message: "Bulk order of 50 units for Corporate Client processed successfully.",
    channel: "in_app",
    read: true,
    archived: true,
    createdAt: "2026-05-18T14:00:00Z",
    updatedAt: "2026-05-18T14:00:00Z",
  },
  {
    id: "N-020",
    type: "promotion",
    priority: "normal",
    title: "Campaign Performance: Summer Sale",
    message: "Summer Sale campaign delivered 24% conversion rate. ₹12.4L revenue attributed.",
    channel: "in_app",
    read: true,
    archived: false,
    createdAt: "2026-05-17T10:00:00Z",
    updatedAt: "2026-05-17T10:00:00Z",
  },
];

// ── Grouping Logic ────────────────────────────────────────

function getGroupLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  if (date >= today) return "Today";
  if (date >= yesterday) return "Yesterday";
  if (date >= weekAgo) return "This Week";
  return "Earlier";
}

// ── Service ───────────────────────────────────────────────

export const notificationService = {
  /**
   * Fetch notifications with filtering, search, and pagination.
   * Swap this with an Axios call to your API Gateway later.
   */
  async getNotifications(
    params: NotificationQueryParams = {}
  ): Promise<NotificationFeed> {
    await delay(300);

    let filtered = [...MOCK_NOTIFICATIONS];

    // Type filter
    if (params.type && params.type !== "all") {
      filtered = filtered.filter((n) => n.type === params.type);
    }

    // Status filter
    if (params.status === "unread") {
      filtered = filtered.filter((n) => !n.read);
    } else if (params.status === "read") {
      filtered = filtered.filter((n) => n.read);
    }

    // Priority filter
    if (params.priority && params.priority !== "all") {
      filtered = filtered.filter((n) => n.priority === params.priority);
    }

    // Search
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q)
      );
    }

    // Date range
    if (params.startDate) {
      filtered = filtered.filter((n) => n.createdAt >= params.startDate!);
    }
    if (params.endDate) {
      filtered = filtered.filter((n) => n.createdAt <= params.endDate!);
    }

    // Sort newest first
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const page = params.page || 1;
    const pageSize = params.pageSize || 20;
    const totalCount = filtered.length;
    const totalUnread = filtered.filter((n) => !n.read).length;

    // Paginate
    const start = (page - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    // Group by date
    const groupsMap = new Map<string, AdminNotification[]>();
    for (const notif of pageItems) {
      const label = getGroupLabel(notif.createdAt);
      const group = groupsMap.get(label) || [];
      group.push(notif);
      groupsMap.set(label, group);
    }

    const groups = Array.from(groupsMap.entries()).map(
      ([label, notifications]) => ({
        label,
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      })
    );

    return { groups, totalUnread, totalCount, page, pageSize };
  },

  /**
   * Fetch notification statistics.
   */
  async getNotificationStats(): Promise<NotificationStats> {
    await delay(150);
    const all = MOCK_NOTIFICATIONS;
    const unread = all.filter((n) => !n.read);
    const byType = {} as Record<NotificationCategory, number>;
    const byPriority = {} as Record<NotificationPriority, number>;

    for (const n of all) {
      byType[n.type] = (byType[n.type] || 0) + 1;
      byPriority[n.priority] = (byPriority[n.priority] || 0) + 1;
    }

    return {
      total: all.length,
      unread: unread.length,
      byType,
      byPriority,
      trend: 12.5,
    };
  },

  /**
   * Mark a single notification as read.
   */
  async markAsRead(id: string): Promise<void> {
    await delay(100);
    const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
    if (idx !== -1) {
      MOCK_NOTIFICATIONS[idx] = { ...MOCK_NOTIFICATIONS[idx], read: true };
    }
  },

  /**
   * Mark all notifications as read.
   */
  async markAllAsRead(): Promise<void> {
    await delay(200);
    for (let i = 0; i < MOCK_NOTIFICATIONS.length; i++) {
      MOCK_NOTIFICATIONS[i] = { ...MOCK_NOTIFICATIONS[i], read: true };
    }
  },

  /**
   * Archive a notification.
   */
  async archive(id: string): Promise<void> {
    await delay(100);
    const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
    if (idx !== -1) {
      MOCK_NOTIFICATIONS[idx] = {
        ...MOCK_NOTIFICATIONS[idx],
        archived: true,
      };
    }
  },

  /**
   * Bulk archive notifications.
   */
  async bulkArchive(ids: string[]): Promise<void> {
    await delay(200);
    for (const id of ids) {
      const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
      if (idx !== -1) {
        MOCK_NOTIFICATIONS[idx] = {
          ...MOCK_NOTIFICATIONS[idx],
          archived: true,
        };
      }
    }
  },

  /**
   * Delete a notification permanently.
   */
  async delete(id: string): Promise<void> {
    await delay(100);
    const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
    if (idx !== -1) {
      MOCK_NOTIFICATIONS.splice(idx, 1);
    }
  },

  /**
   * Add a new notification (used by notification triggers).
   */
  async addNotification(
    notification: Omit<AdminNotification, "read" | "archived">
  ): Promise<void> {
    MOCK_NOTIFICATIONS.unshift({
      ...notification,
      read: false,
      archived: false,
    });
  },

  /**
   * Get notification preferences.
   */
  async getPreferences(): Promise<NotificationPreferences> {
    await delay(100);
    return {
      orderUpdates: true,
      inventoryAlerts: true,
      promotionPerformance: true,
      vendorActivity: true,
      deliveryExceptions: true,
      customerActivity: false,
      systemAlerts: true,
      securityAlerts: true,
      billingAlerts: true,
      emailDigest: "daily",
      pushEnabled: true,
      smsEnabled: false,
      quietHoursEnabled: false,
      quietHoursStart: null,
      quietHoursEnd: null,
    };
  },

  /**
   * Update notification preferences.
   */
  async updatePreferences(
    prefs: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    await delay(150);
    return {
      orderUpdates: true,
      inventoryAlerts: true,
      promotionPerformance: true,
      vendorActivity: true,
      deliveryExceptions: true,
      customerActivity: false,
      systemAlerts: true,
      securityAlerts: true,
      billingAlerts: true,
      emailDigest: "daily",
      pushEnabled: true,
      smsEnabled: false,
      quietHoursEnabled: false,
      quietHoursStart: null,
      quietHoursEnd: null,
      ...prefs,
    };
  },
};
