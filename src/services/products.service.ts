// ── Product & Catalog Management Service Layer ───────────
// Architecture: UI → Component → Hook → Service → API Gateway → Backend
// Currently uses mock data. To connect to real backend:
// 1. Uncomment the axios.get/post/put/delete calls
// 2. Set VITE_API_BASE_URL (or NEXT_PUBLIC_API_BASE_URL)
// 3. Remove mock data import and delay helper

import type {
  Product,
  ProductFilters,
  ProductStatus,
  BulkUploadRecord,
  Category,
  PaginationState,
  ProductFormData,
} from "@/types/products";
import {
  mockAdminProducts,
  mockCategories,
  mockBulkUploadHistory,
  mockAuditLogs,
} from "@/data/admin/products";

// ── Helpers ──────────────────────────────────────────────

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function filterByStock(product: Product, stockStatus: string): boolean {
  if (stockStatus === "in_stock") return product.stock > product.lowStockThreshold;
  if (stockStatus === "low_stock") return product.stock > 0 && product.stock <= product.lowStockThreshold;
  if (stockStatus === "out_of_stock") return product.stock === 0;
  return true;
}

// ── Product Service ──────────────────────────────────────

export const productService = {
  async getProducts(
    filters: Partial<ProductFilters> = {},
    pagination: Partial<PaginationState> = { page: 1, pageSize: 10 }
  ): Promise<{ products: Product[]; pagination: PaginationState }> {
    await delay(200);

    let filtered = [...mockAdminProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.toLowerCase().includes(q)
      );
    }
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters.stockStatus) {
      filtered = filtered.filter((p) => filterByStock(p, filters.stockStatus!));
    }
    if (filters.brand) {
      filtered = filtered.filter((p) =>
        p.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[filters.sortBy as keyof Product] as string | number;
        const bVal = b[filters.sortBy as keyof Product] as string | number;
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return filters.sortOrder === "desc" ? -cmp : cmp;
      });
    }

    const total = filtered.length;
    const page = pagination.page || 1;
    const pageSize = pagination.pageSize || 10;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return { products: paged, pagination: { page, pageSize, total } };
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay(150);
    return mockAdminProducts.find((p) => p.id === id);
  },

  async createProduct(data: ProductFormData): Promise<Product> {
    await delay(400);
    const now = new Date().toISOString().split("T")[0];
    const newProduct: Product = {
      id: `PRD-${String(mockAdminProducts.length + 1).padStart(3, "0")}`,
      ...data,
      name: data.name || "",
      sku: data.sku || "",
      barcode: data.barcode || "",
      category: data.category || "Groceries",
      brand: data.brand || "",
      price: data.price || 0,
      costPrice: data.costPrice || 0,
      mrp: data.mrp || 0,
      taxRate: data.taxRate ?? 5,
      unit: data.unit || "piece",
      weight: data.weight || "",
      stock: data.stock ?? 0,
      lowStockThreshold: data.lowStockThreshold ?? 10,
      status: (data.status || "draft") as ProductStatus,
      description: data.description || "",
      shortDescription: data.shortDescription || "",
      tags: data.tags || [],
      warehouse: data.warehouse || "",
      supplier: data.supplier || "",
      variants: data.variants || [],
      media: data.media || [],
      seo: data.seo || undefined,
      history: [],
      createdAt: now,
      updatedAt: now,
    };
    return newProduct;
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | undefined> {
    await delay(300);
    const product = mockAdminProducts.find((p) => p.id === id);
    if (!product) return undefined;
    return {
      ...product,
      ...data,
      updatedAt: new Date().toISOString().split("T")[0],
    };
  },

  async deleteProduct(id: string): Promise<boolean> {
    await delay(200);
    return true;
  },

  // ── Pricing ────────────────────────────────────────────

  async getPricingData(
    search?: string
  ): Promise<
    Array<{
      id: string;
      name: string;
      sku: string;
      price: number;
      mrp: number;
      cost: number;
      margin: number;
      tax: number;
    }>
  > {
    await delay(200);
    let products = [...mockAdminProducts];
    if (search) {
      const q = search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(q));
    }
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: p.price,
      mrp: p.mrp,
      cost: p.costPrice,
      margin: p.mrp > 0 ? Math.round(((p.mrp - p.costPrice) / p.mrp) * 100 * 10) / 10 : 0,
      tax: p.taxRate,
    }));
  },

  async updatePricing(
    id: string,
    data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number }
  ): Promise<boolean> {
    await delay(300);
    return true;
  },

  // ── Media ──────────────────────────────────────────────

  async getProductMedia(
    search?: string
  ): Promise<
    Array<{
      id: string;
      productId: string;
      productName: string;
      type: "image" | "video" | "document";
      url: string;
      alt: string;
      isPrimary: boolean;
      uploadedAt: string;
    }>
  > {
    await delay(200);
    const mediaItems: Array<{
      id: string;
      productId: string;
      productName: string;
      type: "image" | "video" | "document";
      url: string;
      alt: string;
      isPrimary: boolean;
      uploadedAt: string;
    }> = [];

    mockAdminProducts.forEach((product) => {
      if (!search || product.name.toLowerCase().includes(search.toLowerCase())) {
        product.media.forEach((m) => {
          mediaItems.push({
            ...m,
            productName: product.name,
          });
        });
      }
    });

    return mediaItems;
  },

  async uploadMedia(
    productId: string,
    files: File[]
  ): Promise<boolean> {
    await delay(500);
    return true;
  },

  async deleteMedia(mediaId: string): Promise<boolean> {
    await delay(200);
    return true;
  },

  async setPrimaryMedia(mediaId: string): Promise<boolean> {
    await delay(200);
    return true;
  },

  // ── SEO ────────────────────────────────────────────────

  async getProductSEO(
    search?: string
  ): Promise<
    Array<{
      productId: string;
      productName: string;
      sku: string;
      metaTitle: string;
      metaDescription: string;
      metaKeywords: string[];
      slug: string;
      canonicalUrl?: string;
      ogImage: string;
    }>
  > {
    await delay(200);
    const results: Array<{
      productId: string;
      productName: string;
      sku: string;
      metaTitle: string;
      metaDescription: string;
      metaKeywords: string[];
      slug: string;
      canonicalUrl?: string;
      ogImage: string;
    }> = [];

    mockAdminProducts.forEach((product) => {
      if (product.seo && (!search || product.name.toLowerCase().includes(search.toLowerCase()))) {
        const { productId: _seoProductId, ...seoRest } = product.seo;
        results.push({
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          ...seoRest,
        });
      }
    });

    return results;
  },

  async updateProductSEO(
    productId: string,
    seo: {
      metaTitle?: string;
      metaDescription?: string;
      metaKeywords?: string[];
      slug?: string;
      canonicalUrl?: string;
      ogImage?: string;
    }
  ): Promise<boolean> {
    await delay(300);
    return true;
  },

  // ── Bulk Upload ────────────────────────────────────────

  async getBulkUploadHistory(): Promise<BulkUploadRecord[]> {
    await delay(200);
    return mockBulkUploadHistory;
  },

  async uploadBulkFile(file: File): Promise<{ success: boolean; jobId: string }> {
    await delay(800);
    return { success: true, jobId: `BULK-${Date.now()}` };
  },

  async downloadTemplate(): Promise<void> {
    await delay(100);
    // In production: trigger file download from backend
  },

  // ── Audit Logs ─────────────────────────────────────────

  async getAuditLogs(
    filters?: { search?: string; action?: string; dateFrom?: string; dateTo?: string },
    pagination?: Partial<PaginationState>
  ): Promise<{
    logs: Array<{
      id: string;
      action: string;
      product: string;
      productId: string;
      field: string;
      oldValue: string;
      newValue: string;
      performedBy: string;
      role: string;
      timestamp: string;
    }>;
    pagination: PaginationState;
  }> {
    await delay(200);
    let filtered = [...mockAuditLogs];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.product.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.performedBy.toLowerCase().includes(q)
      );
    }
    if (filters?.action) {
      filtered = filtered.filter((l) => l.action.toLowerCase().includes(filters.action!.toLowerCase()));
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);

    return {
      logs: paged,
      pagination: { page, pageSize, total },
    };
  },
};

// ── Category Service ────────────────────────────────────

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },

  async getCategoryById(id: string): Promise<Category | undefined> {
    await delay(150);
    return mockCategories.find((c) => c.id === id);
  },

  async createCategory(
    data: Partial<Category>
  ): Promise<Category> {
    await delay(300);
    const now = new Date().toISOString().split("T")[0];
    return {
      id: `CAT-${String(mockCategories.length + 1).padStart(3, "0")}`,
      name: data.name || "",
      slug: data.slug || "",
      description: data.description || "",
      parentId: data.parentId || null,
      image: data.image || "",
      isActive: data.isActive ?? true,
      productCount: 0,
      sortOrder: data.sortOrder || 0,
      createdAt: now,
      updatedAt: now,
    };
  },

  async updateCategory(
    id: string,
    data: Partial<Category>
  ): Promise<Category | undefined> {
    await delay(300);
    const cat = mockCategories.find((c) => c.id === id);
    if (!cat) return undefined;
    return {
      ...cat,
      ...data,
      updatedAt: new Date().toISOString().split("T")[0],
    };
  },

  async deleteCategory(id: string): Promise<boolean> {
    await delay(200);
    return true;
  },
};
