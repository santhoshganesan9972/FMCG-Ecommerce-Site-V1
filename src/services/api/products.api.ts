// ── Products API Adapter ─────────────────────────────────────
// Connects admin product management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { PRODUCTS, CATEGORIES, ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse, paginatedErrorResponse } from "@/types/api";
import type { ApiResponse, PaginatedResponse, MutationResult } from "@/types/api";
import type {
  Product,
  ProductFilters,
  BulkUploadRecord,
  Category,
  PaginationState,
  ProductFormData,
} from "@/types/products";

// ── Products ────────────────────────────────────────────────

export async function getProducts(
  filters: Partial<ProductFilters> = {},
  pagination: Partial<PaginationState> = { page: 1, pageSize: 10 },
): Promise<PaginatedResponse<Product>> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination.page,
      size: pagination.pageSize,
    };
    const response = await apiClient.get(ADMIN.PRODUCTS, { params });
    return response.data;
  } catch (error) {
    return paginatedErrorResponse<Product>(
      error instanceof Error ? error.message : "Failed to load products",
    );
  }
}

export async function getProductById(id: string): Promise<ApiResponse<Product | undefined>> {
  try {
    const response = await apiClient.get(PRODUCTS.DETAIL(id));
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Product not found",
    );
  }
}

export async function createProduct(data: Partial<ProductFormData>): Promise<ApiResponse<Product>> {
  try {
    const response = await apiClient.post(PRODUCTS.ADMIN_CREATE, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create product",
    );
  }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<ApiResponse<Product | undefined>> {
  try {
    const response = await apiClient.put(PRODUCTS.ADMIN_UPDATE(id), data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update product",
    );
  }
}

export async function deleteProduct(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(PRODUCTS.ADMIN_DELETE(id));
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete product" };
  }
}

// ── Pricing ─────────────────────────────────────────────────

export async function getPricingData(
  search?: string,
): Promise<ApiResponse<Array<{
  id: string; name: string; sku: string; price: number; mrp: number;
  cost: number; margin: number; tax: number;
}>>> {
  try {
    const response = await apiClient.get(`${ADMIN.PRODUCTS}/pricing`, {
      params: search ? { search } : undefined,
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load pricing data",
    );
  }
}

export async function updatePricing(
  id: string,
  data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number },
): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(`${PRODUCTS.ADMIN_UPDATE(id)}/pricing`, data);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to update pricing" };
  }
}

// ── Media ───────────────────────────────────────────────────

export async function getProductMedia(
  search?: string,
): Promise<ApiResponse<Array<{
  id: string; productId: string; productName: string;
  type: "image" | "video" | "document"; url: string; alt: string;
  isPrimary: boolean; uploadedAt: string;
}>>> {
  try {
    const response = await apiClient.get(`${ADMIN.PRODUCTS}/media`, {
      params: search ? { search } : undefined,
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load product media",
    );
  }
}

export async function deleteMedia(mediaId: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(`${ADMIN.PRODUCTS}/media/${mediaId}`);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete media" };
  }
}

export async function setPrimaryMedia(mediaId: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(`${ADMIN.PRODUCTS}/media/${mediaId}/primary`);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to set primary media" };
  }
}

// ── SEO ─────────────────────────────────────────────────────

export async function getProductSEO(
  search?: string,
): Promise<ApiResponse<Array<{
  productId: string; productName: string; sku: string;
  metaTitle: string; metaDescription: string; metaKeywords: string[];
  slug: string; canonicalUrl?: string; ogImage: string;
}>>> {
  try {
    const response = await apiClient.get(`${ADMIN.PRODUCTS}/seo`, {
      params: search ? { search } : undefined,
    });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load SEO data",
    );
  }
}

export async function updateProductSEO(
  productId: string,
  seo: {
    metaTitle?: string; metaDescription?: string; metaKeywords?: string[];
    slug?: string; canonicalUrl?: string; ogImage?: string;
  },
): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(PRODUCTS.ADMIN_UPDATE_SEO(productId), seo);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to update SEO" };
  }
}

// ── Bulk Upload ─────────────────────────────────────────────

export async function getBulkUploadHistory(): Promise<ApiResponse<BulkUploadRecord[]>> {
  try {
    const response = await apiClient.get(`${ADMIN.PRODUCTS}/bulk-uploads`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load upload history",
    );
  }
}

export async function uploadBulkFile(file: File): Promise<MutationResult<{ jobId: string }>> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post(PRODUCTS.ADMIN_IMPORT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return { success: false, data: { jobId: "" }, error: error instanceof Error ? error.message : "Failed to upload file" };
  }
}

// ── Audit Logs ──────────────────────────────────────────────

export async function getAuditLogs(
  filters?: { search?: string; action?: string; dateFrom?: string; dateTo?: string },
  pagination?: Partial<PaginationState>,
): Promise<ApiResponse<Array<{
  id: string; action: string; product: string; productId: string;
  field: string; oldValue: string; newValue: string;
  performedBy: string; role: string; timestamp: string;
}>>> {
  try {
    const params: Record<string, unknown> = {
      ...filters,
      page: pagination?.page || 1,
      size: pagination?.pageSize || 10,
    };
    const response = await apiClient.get(`${ADMIN.PRODUCTS}/audit-logs`, { params });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load audit logs",
    );
  }
}

// ── Categories ──────────────────────────────────────────────

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  try {
    const response = await apiClient.get(CATEGORIES.BASE);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load categories",
    );
  }
}

export async function getCategoryById(id: string): Promise<ApiResponse<Category | undefined>> {
  try {
    const response = await apiClient.get(`${CATEGORIES.BASE}/${id}`);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Category not found",
    );
  }
}

export async function createCategory(data: Partial<Category>): Promise<ApiResponse<Category>> {
  try {
    const response = await apiClient.post(CATEGORIES.ADMIN_CREATE, data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create category",
    );
  }
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<ApiResponse<Category | undefined>> {
  try {
    const response = await apiClient.put(CATEGORIES.ADMIN_UPDATE(id), data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update category",
    );
  }
}

export async function deleteCategory(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(CATEGORIES.ADMIN_DELETE(id));
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete category" };
  }
}
