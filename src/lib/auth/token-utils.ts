/**
 * Token utilities for authentication.
 *
 * Handles token validation, expiry checking, and cookie management.
 * Designed to work both server-side (middleware) and client-side.
 *
 * Now supports real JWT tokens from the backend while maintaining
 * backward compatibility with mock tokens during development.
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
 * Parse a JWT token without verifying the signature (client-side only).
 * Extracts the payload for display/role purposes.
 * Actual verification happens on the server.
 */
export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Extract the expiration timestamp from a JWT token.
 */
export function getJwtExpiry(token: string): string | null {
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") return null;
  return new Date(payload.exp * 1000).toISOString();
}

/**
 * Extract the user role from a JWT token.
 */
export function getJwtRole(token: string): string | null {
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.role !== "string") return null;
  return payload.role;
}

/**
 * Parse and validate a token string.
 * Returns the payload if valid, null otherwise.
 *
 * Supports both:
 * - Real JWT tokens (3-part base64-encoded)
 * - Mock tokens for development
 */
export function validateToken(token: string): TokenPayload | null {
  if (!token || typeof token !== "string") return null;

  // Try JWT format first
  const jwtPayload = parseJwtPayload(token);
  if (jwtPayload) {
    const exp = getJwtExpiry(token);
    if (!exp || isTokenExpired(exp)) return null;
    return {
      userId: String(jwtPayload.sub ?? jwtPayload.id ?? ""),
      role: (jwtPayload.role as TokenPayload["role"]) ?? "user",
      expiresAt: exp,
    };
  }

  // Fallback: check mock format
  if (token.startsWith("mock_jwt_")) {
    // Use cookie-based expiry check instead
    return null;
  }

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
