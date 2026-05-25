// ── Product Types ─────────────────────────────────────────

export type ProductStatus = "active" | "inactive" | "draft" | "archived";
export type ProductCategory = "Groceries" | "Fruits" | "Vegetables" | "Dairy" | "Beverages" | "Snacks" | "Health" | "Personal Care" | "Home Care" | "Baby Care";

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

export interface ProductSEO {
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

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: ProductCategory;
  brand: string;
  price: number;
  costPrice: number;
  mrp: number;
  taxRate: number;
  unit: string;
  weight: string;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  description: string;
  shortDescription: string;
  tags: string[];
  warehouse: string;
  supplier: string;
  variants: ProductVariant[];
  media: ProductMedia[];
  seo: ProductSEO;
  history: ProductHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search: string;
  category: ProductCategory | "";
  status: ProductStatus | "";
  brand: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock" | "";
  sortBy: "name" | "price" | "stock" | "createdAt" | "";
  sortOrder: "asc" | "desc";
}

export interface BulkUploadRecord {
  id: string;
  fileName: string;
  rows: number;
  success: number;
  failed: number;
  status: "completed" | "processing" | "failed";
  uploadedBy: string;
  uploadedAt: string;
  errors?: string[];
}

// ── Category Types ────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  image: string;
  isActive: boolean;
  productCount: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ── Table Types ───────────────────────────────────────────

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  hideOnMobile?: boolean;
}

export interface TableAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  variant?: "default" | "danger" | "success" | "warning";
  show?: (item: T) => boolean;
}

export interface TableBulkAction {
  label: string;
  icon: React.ReactNode;
  onClick: (selectedIds: string[]) => void;
  variant?: "default" | "danger" | "success";
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
