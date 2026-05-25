export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

/** All product categories available in the system. */
export const PRODUCT_CATEGORIES = [
  "Groceries",
  "Fruits",
  "Snacks",
  "Health",
  "Dairy",
  "Beverages",
] as const satisfies readonly string[];

import { resolveProductImage } from "@/lib/image-utils";

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
}

export const products: readonly Product[] = [

  // ── Groceries ──────────────────────────────────────────────
  { id: 1,  name: "Organic Basmati Rice",         category: "Groceries",  price: 499,  oldPrice: 699,  rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { id: 11, name: "Toor Dal (Split Pigeon Peas)",  category: "Groceries",  price: 189,  oldPrice: 229,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1586201375761-83865001e31c" },
  { id: 12, name: "Cold-Pressed Sunflower Oil",    category: "Groceries",  price: 299,  oldPrice: 349,  rating: 4.5, stock: "low_stock",      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5" },
  { id: 13, name: "Whole Wheat Atta (5 kg)",       category: "Groceries",  price: 259,  oldPrice: 310,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
  { id: 14, name: "Iodised Rock Salt",             category: "Groceries",  price: 39,   oldPrice: 55,   rating: 4.4, stock: "in_stock",       image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c" },
  { id: 15, name: "Turmeric Powder (200 g)",       category: "Groceries",  price: 79,   oldPrice: 99,   rating: 4.6, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7" },

  // ── Fruits ─────────────────────────────────────────────────
  { id: 2,  name: "Fresh Red Apples",              category: "Fruits",     price: 199,  oldPrice: 249,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
  { id: 16, name: "Alphonso Mangoes (6 pcs)",      category: "Fruits",     price: 349,  oldPrice: 429,  rating: 4.9, stock: "low_stock",      image: "https://images.unsplash.com/photo-1553279768-865429fa0078" },
  { id: 17, name: "Seedless Green Grapes",         category: "Fruits",     price: 149,  oldPrice: 189,  rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f" },
  { id: 18, name: "Ripe Bananas (Dozen)",          category: "Fruits",     price: 59,   oldPrice: 79,   rating: 4.4, stock: "in_stock",       image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e" },
  { id: 19, name: "Watermelon (Whole)",            category: "Fruits",     price: 129,  oldPrice: 159,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38" },
  { id: 20, name: "Strawberries (250 g)",          category: "Fruits",     price: 179,  oldPrice: 219,  rating: 4.8, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6" },

  // ── Snacks ─────────────────────────────────────────────────
  { id: 3,  name: "Premium Almonds",               category: "Snacks",     price: 799,  oldPrice: 999,  rating: 4.9, stock: "in_stock",       image: "https://images.unsplash.com/photo-1508747703725-719777637510" },
  { id: 21, name: "Baked Multigrain Chips",        category: "Snacks",     price: 99,   oldPrice: 120,  rating: 4.3, stock: "in_stock",       image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b" },
  { id: 22, name: "Dark Chocolate Bar (70%)",      category: "Snacks",     price: 149,  oldPrice: 179,  rating: 4.7, stock: "low_stock",      image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9" },
  { id: 23, name: "Roasted Cashews (200 g)",       category: "Snacks",     price: 349,  oldPrice: 429,  rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1508747703725-719777637510" },
  { id: 24, name: "Popcorn — Butter & Salt",       category: "Snacks",     price: 79,   oldPrice: 99,   rating: 4.2, stock: "in_stock",       image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff" },
  { id: 25, name: "Trail Mix (Nuts & Berries)",    category: "Snacks",     price: 249,  oldPrice: 299,  rating: 4.6, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32" },

  // ── Health ─────────────────────────────────────────────────
  { id: 4,  name: "Natural Honey",                 category: "Health",     price: 349,  oldPrice: 449,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924" },
  { id: 26, name: "Whey Protein Powder (1 kg)",    category: "Health",     price: 1299, oldPrice: 1599, rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d" },
  { id: 27, name: "Apple Cider Vinegar (500 ml)",  category: "Health",     price: 299,  oldPrice: 369,  rating: 4.6, stock: "low_stock",      image: "https://images.unsplash.com/photo-1576671081837-49000212a370" },
  { id: 28, name: "Chia Seeds (250 g)",            category: "Health",     price: 199,  oldPrice: 249,  rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1514733670139-4d660d9d1a5b" },
  { id: 29, name: "Multivitamin Gummies (60 pcs)", category: "Health",     price: 449,  oldPrice: 549,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1550572017-edd951b55104" },
  { id: 30, name: "Flaxseed Oil Capsules",         category: "Health",     price: 379,  oldPrice: 459,  rating: 4.4, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae" },

  // ── Dairy ──────────────────────────────────────────────────
  { id: 5,  name: "Full Cream Milk (1 L)",         category: "Dairy",      price: 68,   oldPrice: 75,   rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" },
  { id: 6,  name: "Greek Yogurt (400 g)",          category: "Dairy",      price: 129,  oldPrice: 159,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1488477181946-6428a0291777" },
  { id: 7,  name: "Salted Butter (100 g)",         category: "Dairy",      price: 55,   oldPrice: 65,   rating: 4.4, stock: "low_stock",      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d" },
  { id: 31, name: "Paneer (200 g)",                category: "Dairy",      price: 89,   oldPrice: 109,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7" },
  { id: 32, name: "Cheddar Cheese Slices",         category: "Dairy",      price: 149,  oldPrice: 179,  rating: 4.5, stock: "in_stock",       image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d" },
  { id: 33, name: "Flavoured Lassi (250 ml)",      category: "Dairy",      price: 45,   oldPrice: 55,   rating: 4.6, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add" },

  // ── Beverages ──────────────────────────────────────────────
  { id: 8,  name: "Cold Brew Coffee (250 ml)",     category: "Beverages",  price: 249,  oldPrice: 299,  rating: 4.8, stock: "in_stock",       image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735" },
  { id: 9,  name: "Fresh Orange Juice (1 L)",      category: "Beverages",  price: 149,  oldPrice: 179,  rating: 4.7, stock: "in_stock",       image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b" },
  { id: 10, name: "Green Tea Pack (25 bags)",      category: "Beverages",  price: 199,  oldPrice: 249,  rating: 4.5, stock: "low_stock",      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc" },
  { id: 34, name: "Sparkling Water (500 ml)",      category: "Beverages",  price: 59,   oldPrice: 75,   rating: 4.3, stock: "in_stock",       image: "https://images.unsplash.com/photo-1523362628745-0c100150b504" },
  { id: 35, name: "Mango Smoothie (300 ml)",       category: "Beverages",  price: 129,  oldPrice: 159,  rating: 4.6, stock: "in_stock",       image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888" },
  { id: 36, name: "Masala Chai Concentrate",       category: "Beverages",  price: 179,  oldPrice: 219,  rating: 4.7, stock: "out_of_stock",   image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f" },
];

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
