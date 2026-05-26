// ── Notification Trigger Utility ──────────────────────────
// Centralized notification creation for admin actions.
// Every mutation across the app should call the relevant trigger.
// This ensures consistent notification creation regardless of
// whether the action originated from products, orders, or any module.
//
// Usage:
//   import { notify } from "@/lib/notifications";
//   await notify.orderCreated(orderId, customerName, total);
//   await notify.orderStatusChanged(orderId, newStatus);
//   await notify.lowStock(productName, quantity);

import { notificationService } from "@/services/notifications.service";
import type { NotificationCategory, NotificationPriority } from "@/types/admin-notifications";

// ── Minimal helper to add an admin notification ──────────
// Injects a notification into the mock array so it appears in the feed.
// The NotificationService's mock array is module-scoped, so we need
// to access it through the addNotification method we'll add.

let nextId = 100;

function generateId(): string {
  return `N-${String(++nextId).padStart(3, "0")}`;
}

function nowISO(): string {
  return new Date().toISOString();
}

// Track the last notification ID added
export let lastNotificationId: string | null = null;

/**
 * Add an admin notification directly to the notification service.
 * This is used internally by the trigger functions below.
 */
export async function addAdminNotification(
  type: NotificationCategory,
  priority: NotificationPriority,
  title: string,
  message: string,
  actionUrl?: string,
  actionLabel?: string,
): Promise<string> {
  const id = generateId();
  lastNotificationId = id;

  const notification = {
    id,
    type,
    priority,
    title,
    message,
    channel: "in_app" as const,
    read: false,
    archived: false,
    actionUrl: actionUrl || null,
    actionLabel: actionLabel || null,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  };

  await notificationService.addNotification(notification);
  return id;
}

// ── Order Notifications ──────────────────────────────────
// Triggers: new order, status change, cancellation, delivery exception

export const notifyOrder = {
  async created(orderId: string, customerName: string, total: string) {
    return addAdminNotification(
      "order",
      "normal",
      `New Order #${orderId}`,
      `${customerName} placed an order worth ₹${total}`,
      `/admin/orders/${orderId}`,
      "View Order",
    );
  },

  async statusChanged(orderId: string, newStatus: string) {
    const priority = newStatus === "cancelled" ? "high" : "normal";
    const label = newStatus.replace(/_/g, " ");
    return addAdminNotification(
      "order",
      priority,
      `Order #${orderId} ${label}`,
      `Order #${orderId} status updated to ${label}`,
      `/admin/orders/${orderId}`,
      "View Order",
    );
  },

  async delivered(orderId: string) {
    return addAdminNotification(
      "order",
      "normal",
      `Order #${orderId} Delivered`,
      `Order #${orderId} delivered successfully`,
      `/admin/orders/${orderId}`,
      "View Order",
    );
  },

  async deliveryException(orderId: string, reason: string) {
    return addAdminNotification(
      "delivery",
      "high",
      `Delivery Exception: ${orderId}`,
      reason,
      `/admin/orders/${orderId}`,
      "Resolve",
    );
  },
};

// ── Inventory Notifications ──────────────────────────────
// Triggers: low stock, out of stock, FEFO expiry

export const notifyInventory = {
  async lowStock(productName: string, sku: string, quantity: number, warehouse?: string) {
    const location = warehouse ? ` at ${warehouse}` : "";
    return addAdminNotification(
      "inventory",
      quantity === 0 ? "critical" : "high",
      `Stock Alert: ${productName}`,
      `${productName} (${sku}) is ${quantity === 0 ? "out of stock" : `low on stock (${quantity} units)`}${location}`,
      "/admin/inventory",
      "Check Inventory",
    );
  },

  async fefoExpiry(productName: string, batchId: string, daysRemaining: number, units: number) {
    return addAdminNotification(
      "inventory",
      daysRemaining <= 1 ? "critical" : "high",
      `FEFO Alert: Batch ${batchId} Expiring`,
      `Batch of ${productName} expiring in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}. ${units} units at risk.`,
      "/admin/inventory/fefo",
      "View FEFO",
    );
  },
};

// ── Product Notifications ────────────────────────────────
// Triggers: product created, updated, deleted

export const notifyProduct = {
  async created(productName: string) {
    return addAdminNotification(
      "inventory",
      "low",
      `New Product Added`,
      `${productName} has been added to the catalog`,
      "/admin/products",
      "View Products",
    );
  },

  async updated(productName: string, changes: string) {
    return addAdminNotification(
      "inventory",
      "low",
      `Product Updated: ${productName}`,
      `${productName} — ${changes}`,
      "/admin/products",
      "View Products",
    );
  },

  async deleted(productName: string) {
    return addAdminNotification(
      "inventory",
      "normal",
      `Product Removed`,
      `${productName} has been removed from the catalog`,
    );
  },
};

// ── Customer Notifications ───────────────────────────────
// Triggers: new registration, status change

export const notifyCustomer = {
  async registered(customerName: string) {
    return addAdminNotification(
      "customer",
      "low",
      `New Customer Registration`,
      `${customerName} has created an account`,
      "/admin/customers",
      "View Customers",
    );
  },

  async supportTicketOpened(customerName: string, priority: string) {
    return addAdminNotification(
      "customer",
      priority === "high" || priority === "critical" ? "high" : "normal",
      `${priority === "high" || priority === "critical" ? "VIP " : ""}Support Ticket Opened`,
      `${customerName} opened a ${priority}-priority support ticket`,
      "/admin/customers/support-tickets",
      "View Ticket",
    );
  },
};

// ── Vendor Notifications ─────────────────────────────────
// Triggers: new registration, payout due

export const notifyVendor = {
  async registered(vendorName: string) {
    return addAdminNotification(
      "vendor",
      "normal",
      `New Vendor Registration`,
      `${vendorName} has completed onboarding. Review and approve.`,
      "/admin/vendors/onboarding",
      "Review Vendor",
    );
  },

  async payoutDue(vendorName: string, amount: string, dueDate: string) {
    return addAdminNotification(
      "billing",
      "high",
      `Vendor Payout Due ${dueDate}`,
      `${vendorName} — ${amount} payout scheduled for ${dueDate}. Ensure sufficient balance.`,
      "/admin/vendors/settlements",
      "Review Payouts",
    );
  },
};

// ── Promotion Notifications ──────────────────────────────
// Triggers: flash sale ended, campaign performance

export const notifyPromotion = {
  async flashSaleEnded(name: string, unitsSold: number, revenue: string) {
    return addAdminNotification(
      "promotion",
      "normal",
      `Flash Sale Ended: ${name}`,
      `${unitsSold} units sold, ₹${revenue} revenue generated.`,
      "/admin/promotions",
      "View Results",
    );
  },

  async couponExpiring(name: string, daysRemaining: number, remainingCodes: number) {
    return addAdminNotification(
      "promotion",
      "normal",
      `Coupon Expiry Reminder`,
      `${name} coupon expires in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}. ${remainingCodes} unused codes remaining.`,
      "/admin/promotions/coupons",
      "Manage Coupons",
    );
  },
};
