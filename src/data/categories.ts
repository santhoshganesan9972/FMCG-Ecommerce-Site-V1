import type { ProductCategory } from "./products";

export interface CategorySection {
  readonly label: string;
  readonly slug: string;
  readonly emoji: string;
  readonly filter: (category: string) => boolean;
}

/** Map of category pill label → slug for navigation */
const categorySlugMap: Record<string, string> = {
  Groceries: "groceries",
  Vegetables: "vegetables",
  Fruits: "fruits",
  Snacks: "snacks",
  Beverages: "beverages",
  Dairy: "dairy",
  "Personal Care": "personal-care",
  "Home Care": "home-care",
  "Baby Care": "baby-care",
  Bakery: "bakery",
  Frozen: "frozen",
  Cleaning: "cleaning",
};

export function getCategorySlug(label: string): string {
  return categorySlugMap[label] ?? label.toLowerCase().replace(/\s+/g, "-");
}

export const categorySections: readonly CategorySection[] = [
  { label: "Groceries",          slug: "groceries",      emoji: "🛒", filter: (c) => c === "Groceries" },
  { label: "Fresh Fruits",       slug: "fruits",         emoji: "🍎", filter: (c) => c === "Fruits" },
  { label: "Snacks & Munchies",  slug: "snacks",         emoji: "🍿", filter: (c) => c === "Snacks" },
  { label: "Health & Wellness",  slug: "health",         emoji: "💊", filter: (c) => c === "Health" },
  { label: "Dairy Essentials",   slug: "dairy",          emoji: "🥛", filter: (c) => c === "Dairy" },
  { label: "Drinks & Beverages", slug: "beverages",      emoji: "🥤", filter: (c) => c === "Beverages" },
  { label: "Fresh Vegetables",   slug: "vegetables",     emoji: "🥦", filter: (c) => c === "Vegetables" },
  { label: "Personal Care",      slug: "personal-care",  emoji: "🧴", filter: (c) => c === "Personal Care" },
  { label: "Home Care",          slug: "home-care",      emoji: "🧹", filter: (c) => c === "Home Care" },
  { label: "Baby Care",          slug: "baby-care",      emoji: "🍼", filter: (c) => c === "Baby Care" },
  { label: "Bakery & Breads",    slug: "bakery",         emoji: "🍞", filter: (c) => c === "Bakery" },
  { label: "Frozen Foods",       slug: "frozen",         emoji: "🧊", filter: (c) => c === "Frozen" },
  { label: "Cleaning Essentials",slug: "cleaning",       emoji: "🧹", filter: (c) => c === "Cleaning" },
];
