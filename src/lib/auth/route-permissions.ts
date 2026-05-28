/**
 * Route permission configuration.
 *
 * Defines which roles have access to which routes.
 * Used by middleware and components for route protection.
 */

import { ROUTES } from "@/config/routes";
import type { TokenPayload } from "./token-utils";

// ── Role Hierarchy ──────────────────────────────────────

export type UserRole = "admin" | "user" | "vendor" | "guest";

/**
 * Role hierarchy for permission inheritance.
 * Higher index = more privileges.
 */
const ROLE_HIERARCHY: UserRole[] = ["guest", "user", "vendor", "admin"];

/**
 * Check if a role has sufficient privileges.
 */
export function hasMinimumRole(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole);
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}

// ── Route Permissions ───────────────────────────────────

export interface RoutePermission {
  /** Routes matching this pattern */
  pattern: string;
  /** Required role to access */
  requiredRole: UserRole;
  /** Redirect target when access denied */
  redirectTo: string;
}

/**
 * Route-level permission definitions.
 * Order matters — first match wins.
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  // Admin routes — require admin role
  {
    pattern: "/admin",
    requiredRole: "admin",
    redirectTo: ROUTES.HOME,
  },
  // Account routes — require authenticated user
  {
    pattern: "/account",
    requiredRole: "user",
    redirectTo: ROUTES.LOGIN,
  },
  // Checkout routes — require authenticated user
  {
    pattern: "/checkout",
    requiredRole: "user",
    redirectTo: ROUTES.LOGIN,
  },
];

// ── Route Matching ──────────────────────────────────────

/**
 * Check if a pathname matches a route pattern.
 * Supports prefix matching (e.g., "/admin" matches "/admin/dashboard").
 */
export function matchesRoutePattern(
  pathname: string,
  pattern: string
): boolean {
  if (pattern === pathname) return true;
  if (pathname.startsWith(pattern + "/")) return true;
  if (pathname.startsWith(pattern + "?")) return true;
  return false;
}

/**
 * Find the first matching route permission for a given pathname.
 */
export function findRoutePermission(
  pathname: string
): RoutePermission | null {
  for (const permission of ROUTE_PERMISSIONS) {
    if (matchesRoutePattern(pathname, permission.pattern)) {
      return permission;
    }
  }
  return null;
}

/**
 * Check if a user is authorized for a given pathname.
 * Returns true if authorized, false if should redirect.
 */
export function isAuthorizedForRoute(
  pathname: string,
  user: TokenPayload | null
): boolean {
  // Public routes — always authorized
  if (pathname === "/" || pathname.startsWith("/products") || pathname.startsWith("/offers") || pathname.startsWith("/search") || pathname === "/login" || pathname === "/register") {
    return true;
  }

  // Find matching permission
  const permission = findRoutePermission(pathname);

  // No permission found — allow access
  if (!permission) return true;

  // Not authenticated — deny
  if (!user) return false;

  // Check role requirement
  return hasMinimumRole(user.role, permission.requiredRole);
}

/**
 * Get the redirect target for an unauthorized route access.
 */
export function getUnauthorizedRedirect(
  pathname: string,
  user: TokenPayload | null
): string {
  // Not authenticated — redirect to login
  if (!user) {
    return ROUTES.LOGIN;
  }

  // Authenticated but wrong role — redirect appropriately
  const permission = findRoutePermission(pathname);
  if (permission) {
    return permission.redirectTo;
  }

  return ROUTES.HOME;
}
