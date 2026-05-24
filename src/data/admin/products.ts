// Mock data for Product Management

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  weight: string;
  isDefault: boolean;
}

export interface ProductMedia {
  id: string;
  productId: string;
  type: "image" | "video" | "document";
  url: string;
  alt: string;
  isPrimary: boolean;
  uploadedAt: string;
}

export interface SEOField {
  productId: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  slug: string;
  canonicalUrl: string;
  ogImage: string;
}

export interface ProductHistoryEntry {
  id: string;
  productId: string;
  action: "created" | "updated" | "price_changed" | "stock_updated" | "status_changed" | "deleted";
  field?: string;
  oldValue?: string;
  newValue?: string;
  performedBy: string;
  timestamp: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  price: number;
  costPrice: number;
  mrp: number;
  taxRate: number;
  unit: string;
  weight: string;
  stock: number;
  lowStockThreshold: number;
  status: "active" | "inactive" | "draft" | "archived";
  description: string;
  shortDescription: string;
  tags: string[];
  warehouse: string;
  supplier: string;
  variants: ProductVariant[];
  media: ProductMedia[];
  seo: SEOField;
  history: ProductHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export const mockAdminProducts: AdminProduct[] = [
  {
    id: "PRD-001",
    name: "Organic Basmati Rice",
    sku: "RICE-BAS-001",
    barcode: "8901234567890",
    category: "Groceries",
    brand: "Fortune",
    price: 499,
    costPrice: 380,
    mrp: 699,
    taxRate: 5,
    unit: "kg",
    weight: "5 kg",
    stock: 120,
    lowStockThreshold: 10,
    status: "active",
    description: "Premium quality organic basmati rice sourced from the foothills of Himalayas. Long grain, aromatic, and perfect for biryani and pulao.",
    shortDescription: "Premium organic basmati rice, 5kg pack",
    tags: ["organic", "basmati", "rice", "premium", "grain"],
    warehouse: "Mumbai Hub",
    supplier: "Fortune Foods Ltd",
    variants: [
      { id: "VAR-001", productId: "PRD-001", name: "1 kg", sku: "RICE-BAS-001A", price: 109, stock: 200, weight: "1 kg", isDefault: false },
      { id: "VAR-002", productId: "PRD-001", name: "5 kg", sku: "RICE-BAS-001B", price: 499, stock: 120, weight: "5 kg", isDefault: true },
      { id: "VAR-003", productId: "PRD-001", name: "10 kg", sku: "RICE-BAS-001C", price: 949, stock: 50, weight: "10 kg", isDefault: false },
    ],
    media: [
      { id: "MED-001", productId: "PRD-001", type: "image", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c", alt: "Organic Basmati Rice Pack", isPrimary: true, uploadedAt: "2024-01-15" },
      { id: "MED-002", productId: "PRD-001", type: "image", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c", alt: "Rice Grain Closeup", isPrimary: false, uploadedAt: "2024-01-15" },
    ],
    seo: {
      productId: "PRD-001",
      metaTitle: "Buy Organic Basmati Rice Online | Fortune | 5kg Pack",
      metaDescription: "Shop premium organic basmati rice from Fortune. Long grain aromatic rice perfect for biryani. Free delivery on first order.",
      metaKeywords: ["organic basmati rice", "fortune rice", "basmati rice online", "premium rice"],
      slug: "organic-basmati-rice-fortune-5kg",
      canonicalUrl: "https://fmcg.com/products/organic-basmati-rice-fortune-5kg",
      ogImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    },
    history: [
      { id: "HIST-001", productId: "PRD-001", action: "created", performedBy: "Admin User", timestamp: "2024-01-10 10:00:00" },
      { id: "HIST-002", productId: "PRD-001", action: "price_changed", field: "price", oldValue: "549", newValue: "499", performedBy: "Admin User", timestamp: "2024-03-15 14:30:00" },
      { id: "HIST-003", productId: "PRD-001", action: "stock_updated", field: "stock", oldValue: "80", newValue: "120", performedBy: "System", timestamp: "2024-05-01 09:00:00" },
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-05-20",
  },
  {
    id: "PRD-002",
    name: "Fresh Red Apples",
    sku: "FRUIT-APL-001",
    barcode: "8901234567891",
    category: "Fruits",
    brand: "Local Farm",
    price: 199,
    costPrice: 140,
    mrp: 249,
    taxRate: 0,
    unit: "kg",
    weight: "1 kg",
    stock: 85,
    lowStockThreshold: 15,
    status: "active",
    description: "Fresh, juicy red apples sourced directly from local farms in Kashmir. Rich in antioxidants and naturally sweet.",
    shortDescription: "Fresh red apples, 1kg",
    tags: ["fresh", "apple", "fruit", "kashmiri"],
    warehouse: "Pune Cold Storage",
    supplier: "Kashmir Fruit Co.",
    variants: [
      { id: "VAR-004", productId: "PRD-002", name: "500 g", sku: "FRUIT-APL-001A", price: 109, stock: 150, weight: "500 g", isDefault: false },
      { id: "VAR-005", productId: "PRD-002", name: "1 kg", sku: "FRUIT-APL-001B", price: 199, stock: 85, weight: "1 kg", isDefault: true },
    ],
    media: [
      { id: "MED-003", productId: "PRD-002", type: "image", url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", alt: "Fresh Red Apples", isPrimary: true, uploadedAt: "2024-02-10" },
    ],
    seo: {
      productId: "PRD-002",
      metaTitle: "Buy Fresh Red Apples Online | 1kg | Local Farm",
      metaDescription: "Order fresh Kashmiri red apples online. Crisp, juicy & naturally sweet. Free delivery on first order.",
      metaKeywords: ["red apples", "fresh apples", "kashmiri apples", "buy apples online"],
      slug: "fresh-red-apples-1kg",
      canonicalUrl: "https://fmcg.com/products/fresh-red-apples-1kg",
      ogImage: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    },
    history: [
      { id: "HIST-004", productId: "PRD-002", action: "created", performedBy: "Admin User", timestamp: "2024-02-10 11:00:00" },
    ],
    createdAt: "2024-02-10",
    updatedAt: "2024-05-21",
  },
  {
    id: "PRD-003",
    name: "Natural Honey 500g",
    sku: "HEALTH-HNY-001",
    barcode: "8901234567892",
    category: "Health",
    brand: "Dabur",
    price: 349,
    costPrice: 230,
    mrp: 449,
    taxRate: 5,
    unit: "bottle",
    weight: "500 ml",
    stock: 0,
    lowStockThreshold: 20,
    status: "inactive",
    description: "Pure natural honey from Dabur. Sourced from wild forest regions. Unprocessed and free from adulteration.",
    shortDescription: "Pure natural honey, 500ml bottle",
    tags: ["honey", "natural", "dabur", "health", "organic"],
    warehouse: "Delhi Central",
    supplier: "Dabur India Ltd",
    variants: [
      { id: "VAR-006", productId: "PRD-003", name: "250 ml", sku: "HEALTH-HNY-001A", price: 199, stock: 45, weight: "250 ml", isDefault: false },
      { id: "VAR-007", productId: "PRD-003", name: "500 ml", sku: "HEALTH-HNY-001B", price: 349, stock: 0, weight: "500 ml", isDefault: true },
    ],
    media: [
      { id: "MED-004", productId: "PRD-003", type: "image", url: "https://images.unsplash.com/photo-1587049352851-8d4e89133924", alt: "Natural Honey Bottle", isPrimary: true, uploadedAt: "2024-01-05" },
      { id: "MED-005", productId: "PRD-003", type: "video", url: "https://example.com/honey-promo.mp4", alt: "Honey Promo Video", isPrimary: false, uploadedAt: "2024-01-10" },
    ],
    seo: {
      productId: "PRD-003",
      metaTitle: "Buy Dabur Natural Honey 500ml Online | Pure & Unprocessed",
      metaDescription: "Shop Dabur pure natural honey. Sourced from wild forests. 100% pure with no added sugar.",
      metaKeywords: ["dabur honey", "natural honey", "pure honey", "buy honey online"],
      slug: "dabur-natural-honey-500ml",
      canonicalUrl: "https://fmcg.com/products/dabur-natural-honey-500ml",
      ogImage: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
    },
    history: [
      { id: "HIST-005", productId: "PRD-003", action: "created", performedBy: "Admin User", timestamp: "2024-01-05 09:30:00" },
      { id: "HIST-006", productId: "PRD-003", action: "status_changed", field: "status", oldValue: "active", newValue: "inactive", performedBy: "Admin User", timestamp: "2024-05-18 16:00:00" },
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-05-18",
  },
];

export const mockBulkUploadHistory = [
  { id: "BULK-001", fileName: "products-may-2024.csv", rows: 145, success: 142, failed: 3, status: "completed", uploadedBy: "Admin User", uploadedAt: "2024-05-15 14:00:00" },
  { id: "BULK-002", fileName: "inventory-update.csv", rows: 89, success: 89, failed: 0, status: "completed", uploadedBy: "Store Manager", uploadedAt: "2024-05-10 10:30:00" },
  { id: "BULK-003", fileName: "new-arrivals.csv", rows: 210, success: 198, failed: 12, status: "processing", uploadedBy: "Admin User", uploadedAt: "2024-05-21 09:00:00" },
];
