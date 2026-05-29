/**
 * Auth helper utilities for server-side route protection.
 *
 * Provides a clean API for middleware to check authentication
 * and authorization without coupling to implementation details.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAuthFromCookies } from "./token-utils";
import {
  isAuthorizedForRoute,
  getUnauthorizedRedirect,
  matchesRoutePattern,
} from "./route-permissions";
import { ROUTES, AUTH_ROUTES } from "@/config/routes";

export interface AuthCheckResult {
  /** Whether the request is authorized */
  authorized: boolean;
  /** Redirect URL if not authorized */
  redirectUrl: string | null;
  /** The authenticated user's role, if any */
  role: string | null;
}

/**
 * Perform a full auth check on a request.
 * Returns whether the request is authorized and where to redirect if not.
 */
export function checkRouteAuth(request: NextRequest): AuthCheckResult {
  const { pathname } = request.nextUrl;

  // 1. Check if the route needs protection
  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/checkout");

  // 2. Check if it's an auth route (login/register)
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    matchesRoutePattern(pathname, route)
  );

  // 3. Get auth from cookies
  const cookieString = request.headers.get("cookie");
  const user = getAuthFromCookies(cookieString);

  // 4. If user is logged in and visiting login page, redirect to home
  if (isAuthRoute && user) {
    return {
      authorized: false,
      redirectUrl: ROUTES.HOME,
      role: user.role,
    };
  }

  // 5. If route is not protected, allow access
  if (!isProtected) {
    return {
      authorized: true,
      redirectUrl: null,
      role: user?.role ?? null,
    };
  }

  // 6. Check route authorization
  const authorized = isAuthorizedForRoute(pathname, user);

  if (!authorized) {
    return {
      authorized: false,
      redirectUrl: getUnauthorizedRedirect(pathname, user),
      role: user?.role ?? null,
    };
  }

  return {
    authorized: true,
    redirectUrl: null,
    role: user?.role ?? null,
  };
}

/**
 * Create a redirect response to the given URL.
 */
export function createRedirectResponse(
  request: NextRequest,
  url: string
): NextResponse {
  const redirectUrl = new URL(url, request.url);
  // Preserve the original URL as a query param for post-login redirect
  if (url === ROUTES.LOGIN && request.nextUrl.pathname !== ROUTES.LOGIN) {
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
  }
  return NextResponse.redirect(redirectUrl);
}
