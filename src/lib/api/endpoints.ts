// ── API Endpoint Constants ──────────────────────────────────
// Single source of truth for all API endpoint paths.
// Grouped by domain feature for scalability.
// All paths are relative to the API base URL (e.g., /api/v1).

// ── Authentication ────────────────────────────────────────
export const AUTH = {
  LOGIN: "/v1/auth/login",
  REGISTER: "/v1/auth/register",
  SEND_OTP: "/v1/auth/send-otp",
  VERIFY_OTP: "/v1/auth/verify-otp",
  REFRESH: "/v1/auth/refresh",
  LOGOUT: "/v1/auth/logout",
} as const;

// ── Products & Catalog ────────────────────────────────────
export const PRODUCTS = {
  BASE: "/v1/products",
  DETAIL: (id: number | string) => `/v1/products/${id}`,
  SEARCH: "/v1/products/search",
  COMPARE: "/v1/products/compare",
  BARCODE: (code: string) => `/v1/products/barcode/${code}`,
  // Admin
  ADMIN_CREATE: "/v1/admin/products",
  ADMIN_UPDATE: (id: number | string) => `/v1/admin/products/${id}`,
  ADMIN_DELETE: (id: number | string) => `/v1/admin/products/${id}`,
  ADMIN_IMPORT: "/v1/admin/products/import",
  ADMIN_UPDATE_SEO: (id: number | string) => `/v1/admin/products/${id}/seo`,
} as const;

// ── Categories ────────────────────────────────────────────
export const CATEGORIES = {
  BASE: "/v1/categories",
  ADMIN_CREATE: "/v1/admin/categories",
  ADMIN_UPDATE: (id: number | string) => `/v1/admin/categories/${id}`,
  ADMIN_DELETE: (id: number | string) => `/v1/admin/categories/${id}`,
} as const;

// ── Cart ──────────────────────────────────────────────────
export const CART = {
  ITEMS: "/v1/cart/items",
  ITEM: (itemId: number | string) => `/v1/cart/items/${itemId}`,
  APPLY_COUPON: "/v1/cart/apply-coupon",
  CLEAR: "/v1/cart/clear",
} as const;

// ── Orders ────────────────────────────────────────────────
export const ORDERS = {
  BASE: "/v1/orders",
  DETAIL: (id: number | string) => `/v1/orders/${id}`,
  CANCEL: (id: number | string) => `/v1/orders/${id}/cancel`,
  REORDER: (id: number | string) => `/v1/orders/${id}/reorder`,
  // Admin
  ADMIN_UPDATE_STATUS: (id: number | string) => `/v1/admin/orders/${id}/status`,
} as const;

// ── User Profile & Account ───────────────────────────────
export const USERS = {
  ME: "/v1/users/me/profile",
  ADDRESSES: "/v1/users/me/addresses",
  ADDRESS: (id: number | string) => `/v1/users/me/addresses/${id}`,
  ADDRESS_SET_DEFAULT: (id: number | string) => `/v1/users/me/addresses/${id}/set-default`,
} as const;

// ── Notifications ─────────────────────────────────────────
export const NOTIFICATIONS = {
  BASE: "/v1/notifications",
  MARK_ALL_READ: "/v1/notifications/mark-all-read",
} as const;

// ── Promotions & Coupons ─────────────────────────────────
export const PROMOTIONS = {
  ACTIVE: "/v1/promotions",
  VALIDATE: "/v1/promotions/validate",
  // Admin
  ADMIN_BASE: "/v1/admin/promotions",
  ADMIN_DETAIL: (id: number | string) => `/v1/admin/promotions/${id}`,
  ADMIN_COUPONS: "/v1/admin/promotions/coupons",
  ADMIN_COUPON: (id: number | string) => `/v1/admin/promotions/coupons/${id}`,
} as const;

// ── Wishlist ──────────────────────────────────────────────
export const WISHLIST = {
  BASE: "/v1/wishlist",
  ITEM: (id: number | string) => `/v1/wishlist/${id}`,
} as const;

// ── Upload ────────────────────────────────────────────────
export const UPLOAD = {
  PRODUCT_IMAGE: "/v1/upload/product-image",
  AVATAR: "/v1/upload/avatar",
  BANNER: "/v1/upload/banner",
  BULK: "/v1/upload/bulk",
} as const;

// ── Admin ─────────────────────────────────────────────────
export const ADMIN = {
  // Products
  PRODUCTS: "/v1/admin/products",
  PRODUCT: (id: number | string) => `/v1/admin/products/${id}`,
  // Dashboard
  DASHBOARD: "/v1/admin/dashboard",
  // Customers
  CUSTOMERS: "/v1/admin/customers",
  CUSTOMER: (id: number | string) => `/v1/admin/customers/${id}`,
  CUSTOMER_NOTES: (id: number | string) => `/v1/admin/customers/${id}/notes`,
  CUSTOMER_STATUS: (id: number | string) => `/v1/admin/customers/${id}/status`,
  CUSTOMER_SEGMENTS: "/v1/admin/customers/segments",
  CUSTOMER_ANALYTICS_METRICS: "/v1/admin/customers/analytics/metrics",
  CUSTOMER_ANALYTICS_COHORT: "/v1/admin/customers/analytics/cohort",
  CUSTOMER_ANALYTICS_CHANNELS: "/v1/admin/customers/analytics/channels",
  CUSTOMER_TICKETS: "/v1/admin/customers/tickets",
  CUSTOMER_TICKET: (id: number | string) => `/v1/admin/customers/tickets/${id}`,
  CUSTOMER_FRAUD: "/v1/admin/customers/fraud",
  CUSTOMER_FRAUD_ANALYTICS: "/v1/admin/customers/fraud/analytics",
  CUSTOMER_EXPORTS: "/v1/admin/customers/exports",
  // Inventory
  INVENTORY: "/v1/admin/inventory",
  INVENTORY_ITEM: (id: number | string) => `/v1/admin/inventory/${id}`,
  INVENTORY_ADJUST: "/v1/admin/inventory/adjust",
  INVENTORY_WAREHOUSES: "/v1/admin/inventory/warehouses",
  INVENTORY_WAREHOUSE: (id: number | string) => `/v1/admin/inventory/warehouses/${id}`,
  INVENTORY_TRANSFERS: "/v1/admin/inventory/transfers",
  INVENTORY_TRANSFER: (id: number | string) => `/v1/admin/inventory/transfers/${id}`,
  INVENTORY_SAFETY_STOCK: "/v1/admin/inventory/safety-stock",
  INVENTORY_SAFETY_STOCK_RULE: (id: number | string) => `/v1/admin/inventory/safety-stock/${id}`,
  INVENTORY_FEFO: "/v1/admin/inventory/fefo",
  INVENTORY_FORECASTS: "/v1/admin/inventory/forecasts",
  INVENTORY_LOW_STOCK_ALERTS: "/v1/admin/inventory/low-stock-alerts",
  // Vendors
  VENDORS: "/v1/admin/vendors",
  VENDOR: (id: number | string) => `/v1/admin/vendors/${id}`,
  VENDOR_ONBOARDING: "/v1/admin/vendors/onboarding",
  VENDOR_ONBOARDING_APPROVE: (id: number | string) => `/v1/admin/vendors/onboarding/${id}/approve`,
  VENDOR_ONBOARDING_REJECT: (id: number | string) => `/v1/admin/vendors/onboarding/${id}/reject`,
  VENDOR_PRODUCTS: "/v1/admin/vendors/products",
  VENDOR_SETTLEMENTS: "/v1/admin/vendors/settlements",
  VENDOR_SETTLEMENT_PROCESS: (id: number | string) => `/v1/admin/vendors/settlements/${id}/process`,
  VENDOR_ANALYTICS: "/v1/admin/vendors/analytics",
  VENDOR_EXPORT: "/v1/admin/vendors/export",
  // Orders
  ORDERS: "/v1/admin/orders",
  ORDER: (id: number | string) => `/v1/admin/orders/${id}`,
  ORDER_UPDATE_STATUS: (id: number | string) => `/v1/admin/orders/${id}/status`,
  ORDER_ASSIGN_PARTNER: (id: number | string) => `/v1/admin/orders/${id}/assign-partner`,
  ORDER_PARTNERS: "/v1/admin/orders/delivery-partners",
  ORDER_PARTNERS_BY_ZONE: "/v1/admin/orders/delivery-partners/by-zone",
  ORDER_SUBSTITUTIONS: "/v1/admin/orders/substitutions",
  ORDER_SUBSTITUTION_DECIDE: (id: number | string) => `/v1/admin/orders/substitutions/${id}/decide`,
  ORDER_BULK_JOBS: "/v1/admin/orders/bulk-jobs",
  ORDER_BULK_ACTION: "/v1/admin/orders/bulk-action",
  ORDER_NOTES: (id: number | string) => `/v1/admin/orders/${id}/notes`,
  // Reports
  REPORTS: "/v1/admin/reports",
  REPORTS_REVENUE: "/v1/admin/reports/revenue",
  REPORTS_CUSTOMER: "/v1/admin/reports/customer",
  REPORTS_VENDOR: "/v1/admin/reports/vendor",
  REPORTS_INVENTORY: "/v1/admin/reports/inventory",
  REPORTS_ORDER: "/v1/admin/reports/order",
  REPORTS_SALES: "/v1/admin/reports/sales",
  REPORTS_GST: "/v1/admin/reports/gst",
  REPORTS_COHORT: "/v1/admin/reports/cohort",
  REPORTS_REVENUE_ANALYTICS: "/v1/admin/reports/revenue-analytics",
  REPORTS_ABANDONED_CART: "/v1/admin/reports/abandoned-cart",
  REPORTS_PROMOTION_ROI: "/v1/admin/reports/promotion-roi",
  REPORTS_TAX: "/v1/admin/reports/tax",
  REPORTS_EXPORT: "/v1/admin/reports/export",
  // Delivery
  DELIVERY_PARTNERS: "/v1/admin/delivery/partners",
  DELIVERY_PARTNER: (id: number | string) => `/v1/admin/delivery/partners/${id}`,
  DELIVERY_PARTNER_STATUS: (id: number | string) => `/v1/admin/delivery/partners/${id}/status`,
  DELIVERY_LIVE: "/v1/admin/delivery/live",
  DELIVERY_ROUTES: "/v1/admin/delivery/routes",
  DELIVERY_ROUTE_OPTIMIZE: "/v1/admin/delivery/routes/optimize",
  DELIVERY_ROUTE_OPTIMIZE_ALL: "/v1/admin/delivery/routes/optimize-all",
  DELIVERY_STATUSES: "/v1/admin/delivery/statuses",
  DELIVERY_UPDATE_STATUS: "/v1/admin/delivery/update-status",
  DELIVERY_ASSIGN: "/v1/admin/delivery/assign",
  DELIVERY_PERFORMANCE: (id: number | string) => `/v1/admin/delivery/partners/${id}/performance`,
  DELIVERY_PERFORMANCE_ALL: "/v1/admin/delivery/performance",
  DELIVERY_ANALYTICS: "/v1/admin/delivery/analytics",
  DELIVERY_SLA: "/v1/admin/delivery/sla",
  // Settings
  SETTINGS_USERS: "/v1/admin/settings/users",
  SETTINGS_USER: (id: number | string) => `/v1/admin/settings/users/${id}`,
  SETTINGS_ROLES: "/v1/admin/settings/roles",
  SETTINGS_FEATURE_FLAGS: "/v1/admin/settings/feature-flags",
  SETTINGS_FEATURE_FLAG_TOGGLE: (key: string) => `/v1/admin/settings/feature-flags/${key}/toggle`,
  SETTINGS_THEME: "/v1/admin/settings/theme",
  SETTINGS_API_KEYS: "/v1/admin/settings/api-keys",
  SETTINGS_API_KEY_REGENERATE: (id: number | string) => `/v1/admin/settings/api-keys/${id}/regenerate`,
  SETTINGS_AUDIT_LOGS: "/v1/admin/settings/audit-logs",
  SETTINGS_SYSTEM_CONFIGS: "/v1/admin/settings/system-configs",
  SETTINGS_SYSTEM_CONFIG: (key: string) => `/v1/admin/settings/system-configs/${key}`,
  SETTINGS_PAYMENT_METHODS: "/v1/admin/settings/payment-methods",
  SETTINGS_TAX_RATES: "/v1/admin/settings/tax-rates",
  SETTINGS_GST_RETURNS: "/v1/admin/settings/gst-returns",
  SETTINGS_NOTIFICATION_CHANNELS: "/v1/admin/settings/notifications/channels",
  SETTINGS_NOTIFICATION_EVENT_MAPPINGS: "/v1/admin/settings/notifications/event-mappings",
  SETTINGS_NOTIFICATION_UPDATE: "/v1/admin/settings/notifications/update",
} as const;

