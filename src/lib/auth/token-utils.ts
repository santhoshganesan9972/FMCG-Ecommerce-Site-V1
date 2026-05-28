/**
 * Token utilities for authentication.
 *
 * Handles token validation, expiry checking, and cookie management.
 * Designed to work both server-side (middleware) and client-side.
 *
 * Future: Replace with JWT verification library when backend is integrated.
 */

import { COOKIE_NAMES } from "@/config/routes";

// ── Token Types ─────────────────────────────────────────

export interface TokenPayload {
  userId: string;
  role: "admin" | "user" | "vendor" | "guest";
  expiresAt: string; // ISO date string
}

// ── Token Validation ────────────────────────────────────

/**
 * Check if a token expiry date has passed.
 */
export function isTokenExpired(expiresAt: string): boolean {
  try {
    return new Date(expiresAt).getTime() < Date.now();
  } catch {
    return true;
  }
}

/**
 * Parse and validate a token string.
 * Returns the payload if valid, null otherwise.
 *
 * Currently uses a simple mock format: "mock_jwt_<timestamp>_<random>"
 * Future: Replace with actual JWT verification.
 */
export function validateToken(token: string): TokenPayload | null {
  if (!token || typeof token !== "string") return null;
  if (!token.startsWith("mock_jwt_")) return null;

  // In mock mode, token validity is checked via the auth-store cookies.
  // The middleware reads dedicated cookies instead of parsing the token.
  // This function serves as a placeholder for future JWT verification.
  return null;
}

// ── Cookie Helpers (Server-side) ────────────────────────

/**
 * Extract auth cookies from a cookie string (e.g. from NextRequest headers).
 * Returns the token payload if cookies are present and valid.
 */
export function getAuthFromCookies(
  cookieString: string | null
): TokenPayload | null {
  if (!cookieString) return null;

  const getCookie = (name: string): string | undefined => {
    const match = cookieString
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=")[1]) : undefined;
  };

  const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
  const role = getCookie(COOKIE_NAMES.AUTH_ROLE);
  const expires = getCookie(COOKIE_NAMES.AUTH_EXPIRES);

  if (!token || !role || !expires) return null;
  if (isTokenExpired(expires)) return null;

  return {
    userId: token.split("_").pop() || "",
    role: role as TokenPayload["role"],
    expiresAt: expires,
  };
}

// ── Cookie Helpers (Client-side) ────────────────────────

/**
 * Set auth cookies on the client-side.
 * Called when the auth store state changes (login/logout).
 */
export function setAuthCookies(
  token: string,
  role: string,
  expiresAt: string
): void {
  if (typeof document === "undefined") return;

  const expires = new Date(expiresAt).toUTCString();

  document.cookie = `${COOKIE_NAMES.AUTH_TOKEN}=${encodeURIComponent(
    token
  )}; path=/; expires=${expires}; SameSite=Lax; Secure`;
  document.cookie = `${COOKIE_NAMES.AUTH_ROLE}=${encodeURIComponent(
    role
  )}; path=/; expires=${expires}; SameSite=Lax; Secure`;
  document.cookie = `${COOKIE_NAMES.AUTH_EXPIRES}=${encodeURIComponent(
    expiresAt
  )}; path=/; expires=${expires}; SameSite=Lax; Secure`;
}

/**
 * Clear auth cookies on the client-side.
 * Called when the user logs out.
 */
export function clearAuthCookies(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_NAMES.AUTH_TOKEN}=; path=/; max-age=0; SameSite=Lax; Secure`;
  document.cookie = `${COOKIE_NAMES.AUTH_ROLE}=; path=/; max-age=0; SameSite=Lax; Secure`;
  document.cookie = `${COOKIE_NAMES.AUTH_EXPIRES}=; path=/; max-age=0; SameSite=Lax; Secure`;
}
