/**
 * Shared validation helpers for forms and inputs.
 */

/** Email validation (simple but robust). */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Phone number validation for Indian mobile numbers. */
export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ""));
}

/** GSTIN (India) basic format validation. */
export function isValidGSTIN(gstin: string): boolean {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin.toUpperCase());
}

/** PAN card validation. */
export function isValidPAN(pan: string): boolean {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());
}

/** Pincode validation (Indian 6-digit). */
export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode);
}

/** URL validation. */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** Check if a string is non-empty after trimming. */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/** Minimum length check. */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/** Numeric string check. */
export function isNumeric(value: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(value);
}

/** Generate a user-friendly error message from an unknown error. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred";
}
