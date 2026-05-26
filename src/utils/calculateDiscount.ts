/**
 * Calculate the discount percentage and amount for a product.
 *
 * @example
 * calculateDiscount(150, 200)   // { amount: 50, percentage: 25 }
 * calculateDiscount(100, 100)   // { amount: 0, percentage: 0 }
 */
export function calculateDiscount(price: number, oldPrice: number) {
  if (!oldPrice || oldPrice <= 0 || price >= oldPrice) {
    return { amount: 0, percentage: 0 };
  }
  const amount = oldPrice - price;
  const percentage = Math.round((amount / oldPrice) * 100);
  return { amount, percentage };
}

/**
 * Format a discount percentage for display.
 *
 * @example
 * formatDiscount(25)    // "25% OFF"
 * formatDiscount(0)     // undefined (no discount)
 */
export function formatDiscount(percentage: number): string | undefined {
  if (percentage <= 0) return undefined;
  return `${percentage}% OFF`;
}

/**
 * Check if a discount is considered a "deal" (≥ 30% off).
 */
export function isDeal(percentage: number): boolean {
  return percentage >= 30;
}
