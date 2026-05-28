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
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRouteAuth, createRedirectResponse } from "@/lib/auth/auth-helpers";

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*", "/login"],
};

export function middleware(request: NextRequest) {
  const { authorized, redirectUrl } = checkRouteAuth(request);

  if (!authorized && redirectUrl) {
    return createRedirectResponse(request, redirectUrl);
  }

  return NextResponse.next();
}
