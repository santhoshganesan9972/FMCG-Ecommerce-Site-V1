import type { ProductCategory } from "./products";

export interface CategorySection {
  readonly label: string;
  readonly slug: string;
  readonly emoji: string;
  readonly filter: (category: ProductCategory) => boolean;
}

export const categorySections: readonly CategorySection[] = [
  { label: "Groceries",          slug: "groceries",  emoji: "🛒", filter: (c: ProductCategory) => c === "Groceries" },
  { label: "Fresh Fruits",       slug: "fruits",     emoji: "🍎", filter: (c: ProductCategory) => c === "Fruits" },
  { label: "Snacks & Munchies",  slug: "snacks",     emoji: "🍿", filter: (c: ProductCategory) => c === "Snacks" },
  { label: "Health & Wellness",  slug: "health",     emoji: "💊", filter: (c: ProductCategory) => c === "Health" },
  { label: "Dairy Essentials",   slug: "dairy",      emoji: "🥛", filter: (c: ProductCategory) => c === "Dairy" },
  { label: "Drinks & Beverages", slug: "beverages",  emoji: "🥤", filter: (c: ProductCategory) => c === "Beverages" },
];
