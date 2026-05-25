// ── Admin Panel Enterprise Types ─────────────────────────

import type { ReactNode } from "react";

// ── Dashboard Types ──────────────────────────────────────

export interface DashboardStats {
  revenue: { total: number; growth: number; chart: { label: string; value: number }[] };
  orders: { total: number; growth: number; pending: number; chart: { label: string; value: number }[] };
  customers: { total: number; growth: number; active: number };
  topProducts: { id: string; name: string; sales: number; revenue: number; image: string }[];
  lowStockAlerts: { id: string; name: string; stock: number; threshold: number; warehouse: string }[];
  vendorPayments: { id: string; vendor: string; amount: number; dueDate: string; status: "pending" | "paid" | "overdue" }[];
  liveOrders: { id: string; customer: string; items: number; total: number; status: string; time: string }[];
}

// ── Product Types ────────────────────────────────────────

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
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  slug: string;
  canonicalUrl: string;
  ogImage: string;
}

export interface ProductHistoryEntry {
  id: string;
  action: string;
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

// ── Inventory Types ──────────────────────────────────────

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  used: number;
  status: "active" | "maintenance" | "full";
}

export interface StockTransfer {
  id: string;
  product: string;
  sku: string;
  fromWarehouse: string;
  toWarehouse: string;
  quantity: number;
  status: "pending" | "in_transit" | "completed" | "cancelled";
  initiatedBy: string;
  createdAt: string;
  completedAt?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  warehouse: string;
  stock: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  safetyStock: number;
  expiryDate?: string;
  batch: string;
  lastUpdated: string;
}

// ── Order Types ──────────────────────────────────────────

export type OrderStatus = "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled" | "returned";

export interface Order {
  id: string;
  customer: string;
  customerId: string;
  email: string;
  phone: string;
  items: { product: string; quantity: number; price: number }[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  deliveryPartner?: string;
  deliveryAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: { status: string; timestamp: string; note?: string }[];
}

// ── Customer Types ───────────────────────────────────────

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  segment: "new" | "regular" | "vip" | "churned";
  status: "active" | "inactive" | "blocked";
  lastOrderDate?: string;
  registeredAt: string;
  tags: string[];
  address: string;
  city: string;
}

// ── Promotion Types ──────────────────────────────────────

export interface Promotion {
  id: string;
  name: string;
  type: "coupon" | "flash_sale" | "buy_x_get_y" | "discount";
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrder?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired" | "paused";
  applicableProducts: string[];
  applicableCategories: string[];
}

// ── Report Types ─────────────────────────────────────────

export interface Report {
  id: string;
  title: string;
  type: "sales" | "inventory" | "vendor" | "tax";
  generatedAt: string;
  dateRange: { from: string; to: string };
  format: "pdf" | "csv" | "xlsx";
  size: string;
  status: "ready" | "generating" | "failed";
}

// ── Vendor Types ─────────────────────────────────────────

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: ProductCategory;
  status: "active" | "pending" | "suspended" | "inactive";
  totalProducts: number;
  totalSales: number;
  commission: number;
  paymentTerms: string;
  bankAccount: string;
  address: string;
  city: string;
  rating: number;
  joinedAt: string;
}

// ── Delivery Types ───────────────────────────────────────

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  vehicleType: "bike" | "scooter" | "cycle" | "van";
  status: "available" | "busy" | "offline";
  currentOrders: number;
  totalDeliveries: number;
  rating: number;
  earnings: number;
  zone: string;
  joinedAt: string;
}

// ── Table Types ──────────────────────────────────────────

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  hideOnMobile?: boolean;
}

export interface TableAction<T> {
  label: string;
  icon: ReactNode;
  onClick: (item: T) => void;
  variant?: "default" | "danger" | "success" | "warning";
  show?: (item: T) => boolean;
}

export interface BulkAction {
  label: string;
  icon: ReactNode;
  onClick: (selectedIds: string[]) => void;
  variant?: "default" | "danger" | "success";
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// ── Settings Types ───────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  environment: "all" | "production" | "staging" | "development";
}
