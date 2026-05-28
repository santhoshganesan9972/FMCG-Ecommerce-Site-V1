// ── Product & Catalog Management Service Layer ───────────
// Architecture: UI → Component → Hook → Service → API Adapter → Backend
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  Product,
  ProductFilters,
  BulkUploadRecord,
  Category,
  PaginationState,
  ProductFormData,
} from "@/types/products";
import { productsApi } from "@/services/api";

// ── Product Service ──────────────────────────────────────

export const productService = {
  async getProducts(
    filters: Partial<ProductFilters> = {},
    pagination: Partial<PaginationState> = { page: 1, pageSize: 10 }
  ): Promise<{ products: Product[]; pagination: PaginationState }> {
    const res = await productsApi.getProducts(filters, pagination);
    return { products: res.data, pagination: { page: res.meta!.page, pageSize: res.meta!.pageSize, total: res.meta!.total } };
  },

  async getProductById(id: string): Promise<Product | undefined> {
    const res = await productsApi.getProductById(id);
    return res.data;
  },

  async createProduct(data: Partial<ProductFormData>): Promise<Product> {
    const res = await productsApi.createProduct(data);
    return res.data;
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
    const res = await productsApi.updateProduct(id, data);
    return res.data;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await productsApi.deleteProduct(id);
    return res.success;
  },

  // ── Pricing ────────────────────────────────────────────

  async getPricingData(
    search?: string
  ): Promise<Array<{ id: string; name: string; sku: string; price: number; mrp: number; cost: number; margin: number; tax: number }>> {
    const res = await productsApi.getPricingData(search);
    return res.data;
  },

  async updatePricing(
    id: string,
    data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number }
  ): Promise<boolean> {
    const res = await productsApi.updatePricing(id, data);
    return res.success;
  },

  // ── Media ──────────────────────────────────────────────

  async getProductMedia(
    search?: string
  ): Promise<Array<{ id: string; productId: string; productName: string; type: "image" | "video" | "document"; url: string; alt: string; isPrimary: boolean; uploadedAt: string }>> {
    const res = await productsApi.getProductMedia(search);
    return res.data;
  },

  async uploadMedia(productId: string, files: File[]): Promise<boolean> {
    // API adapter currently uses mock — this will call real endpoint
    return true;
  },

  async deleteMedia(mediaId: string): Promise<boolean> {
    const res = await productsApi.deleteMedia(mediaId);
    return res.success;
  },

  async setPrimaryMedia(mediaId: string): Promise<boolean> {
    const res = await productsApi.setPrimaryMedia(mediaId);
    return res.success;
  },

  // ── SEO ────────────────────────────────────────────────

  async getProductSEO(
    search?: string
  ): Promise<Array<{ productId: string; productName: string; sku: string; metaTitle: string; metaDescription: string; metaKeywords: string[]; slug: string; canonicalUrl?: string; ogImage: string }>> {
    const res = await productsApi.getProductSEO(search);
    return res.data;
  },

  async updateProductSEO(
    productId: string,
    seo: { metaTitle?: string; metaDescription?: string; metaKeywords?: string[]; slug?: string; canonicalUrl?: string; ogImage?: string }
  ): Promise<boolean> {
    const res = await productsApi.updateProductSEO(productId, seo);
    return res.success;
  },

  // ── Bulk Upload ────────────────────────────────────────

  async getBulkUploadHistory(): Promise<BulkUploadRecord[]> {
    const res = await productsApi.getBulkUploadHistory();
    return res.data;
  },

  async uploadBulkFile(file: File): Promise<{ success: boolean; jobId: string }> {
    const res = await productsApi.uploadBulkFile(file);
    return { success: res.success, jobId: res.data.jobId };
  },

  async downloadTemplate(): Promise<void> {
    // In production: trigger file download from backend
  },

  // ── Audit Logs ─────────────────────────────────────────

  async getAuditLogs(
    filters?: { search?: string; action?: string; dateFrom?: string; dateTo?: string },
    pagination?: Partial<PaginationState>
  ): Promise<{ logs: Array<{ id: string; action: string; product: string; productId: string; field: string; oldValue: string; newValue: string; performedBy: string; role: string; timestamp: string }>; pagination: PaginationState }> {
    const res = await productsApi.getAuditLogs(filters, pagination);
    return { logs: res.data, pagination: { page: res.meta?.page || 1, pageSize: res.meta?.pageSize || 10, total: res.meta?.total || 0 } };
  },
};

// ── Category Service ────────────────────────────────────

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const res = await productsApi.getCategories();
    return res.data;
  },

  async getCategoryById(id: string): Promise<Category | undefined> {
    const res = await productsApi.getCategoryById(id);
    return res.data;
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    const res = await productsApi.createCategory(data);
    return res.data;
  },

  async updateCategory(id: string, data: Partial<Category>): Promise<Category | undefined> {
    const res = await productsApi.updateCategory(id, data);
    return res.data;
  },

  async deleteCategory(id: string): Promise<boolean> {
    const res = await productsApi.deleteCategory(id);
    return res.success;
  },
};
