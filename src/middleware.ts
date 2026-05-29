/**
 * Middleware — Server-side Route Protection.
 *
 * Handles:
 * - Redirecting unauthenticated users away from protected routes
 * - Redirecting non-admin users away from admin routes
 * - Redirecting logged-in users away from login/register
 * - Preventing unauthorized content flash
 *
 * Token is read from cookies (set by auth-store on login).
 * Lightweight — no API calls, no DB operations, no heavy computation.
 *
 * Supports both real JWT and mock tokens via validateToken.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRouteAuth, createRedirectResponse } from "@/lib/auth/auth-helpers";
import { getAuthFromCookies } from "@/lib/auth/token-utils";

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/checkout/:path*",
    "/login",
    "/register",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Auth pages: redirect to home if already logged in ──
  const authPages = ["/login", "/register"];

  // Check auth from cookies
  const cookieString = request.headers.get("cookie") ?? "";
  const authData = getAuthFromCookies(cookieString);

  // If user is authenticated and trying to access auth pages, redirect home
  if (authData && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ── Protected routes: check authorization ──
  const { authorized, redirectUrl } = checkRouteAuth(request);

  if (!authorized && redirectUrl) {
    return createRedirectResponse(request, redirectUrl);
  }

  return NextResponse.next();
}
