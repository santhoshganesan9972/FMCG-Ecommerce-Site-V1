export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

/** All product categories available in the system. */
export const PRODUCT_CATEGORIES = [
  "Groceries",
  "Vegetables",
  "Fruits",
  "Snacks",
  "Health",
  "Dairy",
  "Beverages",
  "Personal Care",
  "Home Care",
  "Baby Care",
  "Bakery",
  "Frozen",
  "Cleaning",
] as const satisfies readonly string[];

import { resolveProductImage } from "@/lib/image-utils";
import { mockAdminProducts } from "./admin/products";
import type { Product as AdminProduct } from "@/types/products";

/** Valid product category string type. */
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly category: ProductCategory;
  readonly price: number;
  readonly oldPrice: number;
  readonly rating: number;
  readonly image: string;
  readonly stock: StockStatus;
  readonly weight?: string;
  /** Whether this product is featured on the homepage */
  readonly isFeatured?: boolean;
  /** Whether this product is part of a flash sale */
  readonly isFlashSale?: boolean;
  /** Explicit discount percentage override (0-100) */
  readonly discountPercent?: number;
}

// ── Seed products (static frontend data with curated ratings / images) ──

const SEED_PRODUCTS: Product[] = [

  // ── Groceries ──────────────────────────────────────────────
  { id: 1,  name: "Organic Basmati Rice",         category: "Groceries",  price: 499,  oldPrice: 699,  rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1586201375761-83865001e31c", isFeatured: true, isFlashSale: true, weight: "1 kg" },
  { id: 11, name: "Toor Dal (Split Pigeon Peas)",  category: "Groceries",  price: 189,  oldPrice: 229,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1586201375761-83865001e31c", isFlashSale: true, weight: "500 g" },
  { id: 12, name: "Cold-Pressed Sunflower Oil",    category: "Groceries",  price: 299,  oldPrice: 349,  rating: 4.5, stock: "low_stock",      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5", weight: "1 L" },
  { id: 13, name: "Whole Wheat Atta (5 kg)",       category: "Groceries",  price: 259,  oldPrice: 310,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1509440159596-0249088772ff", isFeatured: true, weight: "5 kg" },
  { id: 14, name: "Iodised Rock Salt",             category: "Groceries",  price: 39,   oldPrice: 55,   rating: 4.4, stock: "in_stock",       image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c", weight: "1 kg" },
  { id: 15, name: "Turmeric Powder (200 g)",       category: "Groceries",  price: 79,   oldPrice: 99,   rating: 4.6, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7", weight: "200 g" },

  // ── Fruits ─────────────────────────────────────────────────
  { id: 2,  name: "Fresh Red Apples",              category: "Fruits",     price: 199,  oldPrice: 249,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", isFeatured: true, isFlashSale: true, weight: "1 kg" },
  { id: 16, name: "Alphonso Mangoes (6 pcs)",      category: "Fruits",     price: 349,  oldPrice: 429,  rating: 4.9, stock: "low_stock",      image: "https://images.unsplash.com/photo-1553279768-865429fa0078", isFeatured: true, weight: "6 pcs" },
  { id: 17, name: "Seedless Green Grapes",         category: "Fruits",     price: 149,  oldPrice: 189,  rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f", isFlashSale: true, weight: "500 g" },
  { id: 18, name: "Ripe Bananas (Dozen)",          category: "Fruits",     price: 59,   oldPrice: 79,   rating: 4.4, stock: "in_stock",       image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e", isFlashSale: true, weight: "12 pcs" },
  { id: 19, name: "Watermelon (Whole)",            category: "Fruits",     price: 129,  oldPrice: 159,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38", weight: "1 pc" },
  { id: 20, name: "Strawberries (250 g)",          category: "Fruits",     price: 179,  oldPrice: 219,  rating: 4.8, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6", weight: "250 g" },

  // ── Vegetables ────────────────────────────────────────────
  { id: 37, name: "Fresh Tomatoes (1 kg)",             category: "Vegetables", price: 49,   oldPrice: 69,   rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea", isFlashSale: true, weight: "1 kg" },
  { id: 38, name: "Potatoes (1 kg)",                   category: "Vegetables", price: 39,   oldPrice: 55,   rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1518977676601-b53f82eda655", isFlashSale: true, weight: "1 kg" },
  { id: 39, name: "Onions (1 kg)",                     category: "Vegetables", price: 45,   oldPrice: 60,   rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb", weight: "1 kg" },
  { id: 40, name: "Fresh Spinach (250 g)",             category: "Vegetables", price: 29,   oldPrice: 39,   rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb", weight: "250 g" },
  { id: 41, name: "Carrots (500 g)",                   category: "Vegetables", price: 35,   oldPrice: 49,   rating: 4.6, stock: "low_stock",      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37", weight: "500 g" },
  { id: 42, name: "Broccoli (1 head)",                 category: "Vegetables", price: 79,   oldPrice: 99,   rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc", weight: "1 pc" },

  // ── Snacks ─────────────────────────────────────────────────
  { id: 3,  name: "Premium Almonds",               category: "Snacks",     price: 799,  oldPrice: 999,  rating: 4.9, stock: "in_stock",       image: "https://images.unsplash.com/photo-1508747703725-719777637510", isFeatured: true, weight: "500 g" },
  { id: 21, name: "Baked Multigrain Chips",        category: "Snacks",     price: 99,   oldPrice: 120,  rating: 4.3, stock: "in_stock",       image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b", weight: "150 g" },
  { id: 22, name: "Dark Chocolate Bar (70%)",      category: "Snacks",     price: 149,  oldPrice: 179,  rating: 4.7, stock: "low_stock",      image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9", weight: "100 g" },
  { id: 23, name: "Roasted Cashews (200 g)",       category: "Snacks",     price: 349,  oldPrice: 429,  rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1508747703725-719777637510", isFeatured: true, weight: "200 g" },
  { id: 24, name: "Popcorn — Butter & Salt",       category: "Snacks",     price: 79,   oldPrice: 99,   rating: 4.2, stock: "in_stock",       image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff", weight: "80 g" },
  { id: 25, name: "Trail Mix (Nuts & Berries)",    category: "Snacks",     price: 249,  oldPrice: 299,  rating: 4.6, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32", weight: "200 g" },

  // ── Health ─────────────────────────────────────────────────
  { id: 4,  name: "Natural Honey",                 category: "Health",     price: 349,  oldPrice: 449,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924", isFeatured: true, weight: "500 g" },
  { id: 26, name: "Whey Protein Powder (1 kg)",    category: "Health",     price: 1299, oldPrice: 1599, rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d", isFeatured: true, weight: "1 kg" },
  { id: 27, name: "Apple Cider Vinegar (500 ml)",  category: "Health",     price: 299,  oldPrice: 369,  rating: 4.6, stock: "low_stock",      image: "https://images.unsplash.com/photo-1576671081837-49000212a370", weight: "500 ml" },
  { id: 28, name: "Chia Seeds (250 g)",            category: "Health",     price: 199,  oldPrice: 249,  rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1514733670139-4d660d9d1a5b", weight: "250 g" },
  { id: 29, name: "Multivitamin Gummies (60 pcs)", category: "Health",     price: 449,  oldPrice: 549,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1550572017-edd951b55104", weight: "60 pcs" },
  { id: 30, name: "Flaxseed Oil Capsules",         category: "Health",     price: 379,  oldPrice: 459,  rating: 4.4, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae", weight: "90 pcs" },

  // ── Dairy ──────────────────────────────────────────────────
  { id: 5,  name: "Full Cream Milk (1 L)",         category: "Dairy",      price: 68,   oldPrice: 75,   rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1550583724-b2692b85b150", isFeatured: true, weight: "1 L" },
  { id: 6,  name: "Greek Yogurt (400 g)",          category: "Dairy",      price: 129,  oldPrice: 159,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1488477181946-6428a0291777", isFlashSale: true, weight: "400 g" },
  { id: 7,  name: "Salted Butter (100 g)",         category: "Dairy",      price: 55,   oldPrice: 65,   rating: 4.4, stock: "low_stock",      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d", weight: "100 g" },
  { id: 31, name: "Paneer (200 g)",                category: "Dairy",      price: 89,   oldPrice: 109,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7", weight: "200 g" },
  { id: 32, name: "Cheddar Cheese Slices",         category: "Dairy",      price: 149,  oldPrice: 179,  rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d", weight: "200 g" },
  { id: 33, name: "Flavoured Lassi (250 ml)",      category: "Dairy",      price: 45,   oldPrice: 55,   rating: 4.6, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add", weight: "250 ml" },

  // ── Beverages ──────────────────────────────────────────────
  { id: 8,  name: "Cold Brew Coffee (250 ml)",     category: "Beverages",  price: 249,  oldPrice: 299,  rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", isFeatured: true, weight: "250 ml" },
  { id: 9,  name: "Fresh Orange Juice (1 L)",      category: "Beverages",  price: 149,  oldPrice: 179,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b", isFlashSale: true, weight: "1 L" },
  { id: 10, name: "Green Tea Pack (25 bags)",      category: "Beverages",  price: 199,  oldPrice: 249,  rating: 4.5, stock: "low_stock",      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc", weight: "25 bags" },
  { id: 34, name: "Sparkling Water (500 ml)",      category: "Beverages",  price: 59,   oldPrice: 75,   rating: 4.3, stock: "in_stock",       image: "https://images.unsplash.com/photo-1523362628745-0c100150b504", weight: "500 ml" },
  { id: 35, name: "Mango Smoothie (300 ml)",       category: "Beverages",  price: 129,  oldPrice: 159,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888", weight: "300 ml" },
  { id: 36, name: "Masala Chai Concentrate",       category: "Beverages",  price: 179,  oldPrice: 219,  rating: 4.7, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f", weight: "500 ml" },
];

// ── Admin ↔ Frontend Bridge ──
// Merges admin products (from src/data/admin/products.ts) with seed data so
// admin CRUD operations are reflected in frontend product views.

let _products: Product[] = [...SEED_PRODUCTS];            // mutable backing store
let _adminToFrontendId = new Map<string, number>();       // admin PRD-XXX → SEED id
let _nextCustomId = 10000;                                 // IDs for admin-only products

/** Strip punctuation, whitespace, and trailing quantity specifiers for fuzzy name matching.
 *  This ensures "Natural Honey 500g" and "Natural Honey" match as the same product. */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")       // strip punctuation
    .replace(/\s+/g, " ")               // collapse whitespace
    .replace(/(\d+)\s*(kg|g|l|ml|pc|pcs|count|pack|bags?|tub|bottle|bar)\b\s*/gi, "") // strip quantity units
    .replace(/\s+/g, " ")
    .trim();
}

/** Convert an admin stock number to a frontend StockStatus. */
function toStockStatus(stock: number, threshold: number): StockStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock <= threshold) return "low_stock";
  return "in_stock";
}

/** Map any admin category string to a valid ProductCategory (fallback to Groceries). */
function mapCategory(cat: string): ProductCategory {
  return PRODUCT_CATEGORIES.includes(cat as ProductCategory)
    ? (cat as ProductCategory)
    : "Groceries";
}

/** Convert an admin Product to the frontend Product shape. */
function adminToFrontend(adminP: AdminProduct, frontendId: number, seedImage?: string): Product {
  const image = adminP.media?.[0]?.url
    ?? seedImage
    ?? "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=400&q=80";

  return {
    id: frontendId,
    name: adminP.name,
    category: mapCategory(adminP.category),
    price: adminP.price,
    oldPrice: adminP.mrp || adminP.price,
    rating: 4.5,       // default; admin doesn't store ratings
    image,
    stock: toStockStatus(adminP.stock, adminP.lowStockThreshold),
    isFeatured: adminP.isFeatured ?? false,
    isFlashSale: adminP.isFlashSale ?? false,
    discountPercent: adminP.discountPercent ?? 0,
  };
}

/**
 * Rebuild the `products` array by merging seed data with current
 * admin products from `mockAdminProducts`.
 *
 * Call this after any admin CRUD operation (create / update / delete)
 * so that frontend pages reflect the change on their next render.
 */
export function refreshProductBridge(): void {
  // ── Build ID mapping (lazy, one-time) ──
  if (_adminToFrontendId.size === 0) {
    // Index admin products by normalised name
    const adminByName = new Map<string, AdminProduct>();
    for (const ap of mockAdminProducts) {
      adminByName.set(normalizeName(ap.name), ap);
    }

    // Match seed products → admin products
    for (const sp of SEED_PRODUCTS) {
      const match = adminByName.get(normalizeName(sp.name));
      if (match) {
        _adminToFrontendId.set(match.id, sp.id);
      }
    }
  }

  const seenIds = new Set<number>();
  const merged: Product[] = [];

  // 1. Transform every admin product to frontend format
  for (const adminP of mockAdminProducts) {
    let frontendId = _adminToFrontendId.get(adminP.id);
    if (!frontendId) {
      // New admin product with no seed match → assign a unique ID
      frontendId = _nextCustomId++;
      _adminToFrontendId.set(adminP.id, frontendId);
    }
    seenIds.add(frontendId);

    // Keep the seed image for matched products (curated ratings/images are nicer)
    const seedMatch = SEED_PRODUCTS.find((sp) => sp.id === frontendId);
    const fp = adminToFrontend(adminP, frontendId, seedMatch?.image);
    merged.push(fp);
  }

  // 2. Add seed-only products (no matching admin product)
  for (const sp of SEED_PRODUCTS) {
    if (!seenIds.has(sp.id)) {
      merged.push(sp);
    }
  }

  // 3. Mutate in-place so the exported `products` reference stays valid
  _products.length = 0;
  _products.push(...merged);
}

// Initialise on module load
refreshProductBridge();

/** The live product list (seed + admin-derived). Updates after `refreshProductBridge()`. */
export const products: readonly Product[] = _products;

// ── Helper functions (all read from the live `products` array) ──

/**
 * Get a product with guaranteed visible image
 * If the original image fails to load, uses a working fallback
 */
export function getProductWithVisibleImage(product: Product): Product {
   return {
     ...product,
     image: resolveProductImage(product.image),
   };
 }

/**
 * Get all products with guaranteed visible images
 * Ensures every product has an accessible image URL
 */
export function getProductsWithVisibleImages(): (Product & { originalImage?: string })[] {
   return products.map((product) => ({
     ...product,
     originalImage: product.image,
     image: resolveProductImage(product.image),
   }));
 }

/**
 * Find product by ID and return with guaranteed visible image
 */
export function getProductById(id: number): (Product & { originalImage?: string }) | undefined {
   const product = products.find((p) => p.id === id);
   if (!product) return undefined;
   return {
     ...product,
     originalImage: product.image,
     image: resolveProductImage(product.image),
   };
 }

/**
 * Get products by category with visible images
 */
export function getProductsByCategory(category: ProductCategory): (Product & { originalImage?: string })[] {
   return products
     .filter((p) => p.category === category)
     .map((product) => ({
       ...product,
       originalImage: product.image,
       image: resolveProductImage(product.image),
     }));
 }
