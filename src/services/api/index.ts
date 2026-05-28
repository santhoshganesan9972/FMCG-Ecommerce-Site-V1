// ── API Adapters Barrel Export ───────────────────────────────
// Centralised export for all API adapter functions.
// Services import from here instead of directly from mock data.
// Swapping to a real backend: replace adapter implementations,
// this barrel stays the same.

export * as productsApi from "./products.api";
export * as ordersApi from "./orders.api";
export * as customersApi from "./customers.api";
export * as dashboardApi from "./dashboard.api";
export * as inventoryApi from "./inventory.api";
export * as deliveryApi from "./delivery.api";
export * as promotionsApi from "./promotions.api";
export * as vendorsApi from "./vendors.api";
export * as reportsApi from "./reports.api";
export * as settingsApi from "./settings.api";
export * as notificationsApi from "./notifications.api";
export * as profileApi from "./profile.api";
export * as authApi from "./auth.api";
export * as cartApi from "./cart.api";
export * as wishlistApi from "./wishlist.api";
export * as addressApi from "./address.api";
export * as uploadApi from "./upload.api";
