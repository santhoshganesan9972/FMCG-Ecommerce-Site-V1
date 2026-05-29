/**
 * Centralized route constants for the FMCG Commerce application.
 *
 * Single source of truth for all route paths, route permissions,
 * and matcher configuration used by middleware and components.
 */

// ── Route Paths ──────────────────────────────────────────

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORBIDDEN: "/403",
  NOT_FOUND: "/404",

  // Public
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  OFFERS: "/offers",
  SEARCH: "/search",

  // Protected — Account
  ACCOUNT: "/account",
  ACCOUNT_ORDERS: "/account/orders",
  ACCOUNT_PROFILE: "/account/profile",
  ACCOUNT_ADDRESSES: "/account/addresses",
  ACCOUNT_WISHLIST: "/account/wishlist",
  ACCOUNT_PAYMENT: "/account/payment",
  ACCOUNT_SETTINGS: "/account/settings",

  // Protected — Checkout
  CHECKOUT: "/checkout",

  // Protected — Admin
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_INVENTORY: "/admin/inventory",
  ADMIN_PROMOTIONS: "/admin/promotions",
  ADMIN_DELIVERY: "/admin/delivery",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
} as const;

// ── Route Groups ─────────────────────────────────────────

/** Routes that require authentication */
export const PROTECTED_ROUTES = [
  ROUTES.ACCOUNT,
  ROUTES.CHECKOUT,
  ROUTES.ADMIN,
] as const;

/** Routes that require admin role */
export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
] as const;

/** Routes accessible without authentication */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.PRODUCTS,
  ROUTES.OFFERS,
  ROUTES.SEARCH,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const;

/** Auth routes (login/register) — redirect authenticated users away */
export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
] as const;

// ── Middleware Matcher Config ────────────────────────────

/**
 * Next.js middleware matcher configuration.
 * Protects admin, account, checkout routes, and handles auth redirects.
 */
export const MIDDLEWARE_MATCHER = [
  "/admin/:path*",
  "/account/:path*",
  "/checkout/:path*",
  "/login",
];

// ── Cookie Names ─────────────────────────────────────────

export const COOKIE_NAMES = {
  AUTH_TOKEN: "auth-token",
  AUTH_ROLE: "auth-role",
  AUTH_EXPIRES: "auth-expires",
} as const;
