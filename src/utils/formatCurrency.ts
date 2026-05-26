/**
 * Format a numeric amount as Indian Rupees (INR).
 *
 * @example
 * formatCurrency(1250)      // "₹1,250"
 * formatCurrency(99.5)      // "₹99.50"
 * formatCurrency(0)         // "₹0"
 */
export function formatCurrency(amount: number, options?: {
  compact?: boolean;
  decimals?: number;
}): string {
  const { compact = false, decimals } = options ?? {};

  if (compact && amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    const thousands = amount / 1000;
    return `₹${thousands.toFixed(1)}K`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals ?? (Number.isInteger(amount) ? 0 : 2),
    maximumFractionDigits: decimals ?? 2,
  }).format(amount);
}
