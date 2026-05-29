// ── Query Invalidation Helpers ──────────────────────────────
// Granular invalidation helpers that prevent over-invalidating
// the entire cache. Every mutation should call the appropriate
// invalidation function to keep the UI consistent.
//
// Usage:
//   import { invalidateProductQueries } from "@/lib/react-query/invalidation";
//   ...
//   onSuccess: () => invalidateProductQueries(queryClient)
//
// 💡 Design principle:
//   Invalidate ONLY what changed. Don't blast the whole cache.
//   This keeps the app responsive and avoids needless re-fetches.

import type { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";

// ── Products ───────────────────────────────────────────────

export function invalidateProductQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
  // Dashboard metrics that include product data
  queryClient.invalidateQueries({
    queryKey: queryKeys.dashboard.topProducts,
    exact: true,
  });
  queryClient.invalidateQueries({
    queryKey: queryKeys.dashboard.lowStockAlerts,
    exact: true,
  });
}

export function invalidateSingleProduct(
  queryClient: QueryClient,
  productId: string,
) {
  queryClient.invalidateQueries({
    queryKey: queryKeys.products.detail(productId),
  });
  queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
}

// ── Orders ─────────────────────────────────────────────────

export function invalidateOrderQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
  queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.orders });
}

export function invalidateSingleOrder(
  queryClient: QueryClient,
  orderId: string,
) {
  queryClient.invalidateQueries({
    queryKey: queryKeys.orders.detail(orderId),
  });
  queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
}

// ── Customers ──────────────────────────────────────────────

export function invalidateCustomerQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
  queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.customers });
}

// ── Inventory ──────────────────────────────────────────────

export function invalidateInventoryQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all });
  queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
}

// ── Promotions ─────────────────────────────────────────────

export function invalidatePromotionQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.promotions.all });
}

// ── Vendors ────────────────────────────────────────────────

export function invalidateVendorQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.vendors.all });
}

// ── Delivery ───────────────────────────────────────────────

export function invalidateDeliveryQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.delivery.all });
}

// ── Settings ───────────────────────────────────────────────

export function invalidateSettingsQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
}

// ── Notifications ──────────────────────────────────────────

export function invalidateNotificationQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
}
