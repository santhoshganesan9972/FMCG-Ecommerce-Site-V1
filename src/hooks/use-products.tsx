import { useState, useCallback, useMemo } from "react";
import type {
  Product,
  ProductFilters,
  ProductCategory,
  ProductStatus,
  PaginationState,
  Column,
  TableAction,
  Category,
} from "@/types/products";
import { productService, categoryService } from "@/services/products.service";

// ── Product List Hook ─────────────────────────────────────

export function useProducts(initialFilters?: Partial<ProductFilters>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    status: "",
    brand: "",
    minPrice: undefined,
    maxPrice: undefined,
    stockStatus: "",
    sortBy: "",
    sortOrder: "asc",
    ...initialFilters,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await productService.getProducts(filters, pagination);
      setProducts(result.products);
      setPagination(result.pagination);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  const updateFilters = useCallback((update: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...update }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      status: "",
      brand: "",
      minPrice: undefined,
      maxPrice: undefined,
      stockStatus: "",
      sortBy: "",
      sortOrder: "asc",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, page: 1, pageSize }));
  }, []);

  const activeFilterCount = useMemo(
    () =>
      Object.entries(filters).filter(
        ([key, val]) =>
          val !== "" &&
          val !== undefined &&
          key !== "sortBy" &&
          key !== "sortOrder"
      ).length,
    [filters]
  );

  return {
    products,
    loading,
    filters,
    pagination,
    activeFilterCount,
    fetchProducts,
    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
  };
}

// ── Category Hook ───────────────────────────────────────

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (data: Partial<Category>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.createCategory(data);
      await fetchCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const updateCategory = useCallback(async (id: string, data: Partial<Category>): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.updateCategory(id, data);
      await fetchCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update category");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const deleteCategory = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.deleteCategory(id);
      await fetchCategories();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

// ── Audit Logs Hook ─────────────────────────────────────

export function useAuditLogs() {
  const [logs, setLogs] = useState<
    Array<{
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
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.getAuditLogs(
        { search, action: actionFilter },
        pagination
      );
      setLogs(result.logs);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  }, [search, actionFilter, pagination.page, pagination.pageSize]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, page: 1, pageSize }));
  }, []);

  return {
    logs,
    pagination,
    loading,
    error,
    search,
    setSearch,
    actionFilter,
    setActionFilter,
    fetchLogs,
    setPage,
    setPageSize,
  };
}

// ── Bulk Upload Hook ──────────────────────────────────────

import type { BulkUploadRecord } from "@/types/products";

export function useBulkUpload() {
  const [records, setRecords] = useState<BulkUploadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getBulkUploadHistory();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFile = useCallback(async (file: File): Promise<{ success: boolean; jobId: string } | null> => {
    setUploading(true);
    setError(null);
    try {
      const result = await productService.uploadBulkFile(file);
      await fetchHistory();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
      return null;
    } finally {
      setUploading(false);
    }
  }, [fetchHistory]);

  return {
    records,
    loading,
    uploading,
    error,
    fetchHistory,
    uploadFile,
  };
}

// ── Pricing Hook ───────────────────────────────────────────

export function usePricing() {
  const [pricingData, setPricingData] = useState<
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
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPricing = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getPricingData();
      setPricingData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pricing data");
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePricing = useCallback(async (id: string, data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await productService.updatePricing(id, data);
      await fetchPricing();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update pricing");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchPricing]);

  return {
    pricingData,
    loading,
    error,
    fetchPricing,
    updatePricing,
  };
}

// ── Product Media Hook ────────────────────────────────────

export function useProductMedia() {
  const [mediaItems, setMediaItems] = useState<
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
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductMedia(search);
      setMediaItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch media");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMedia = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await productService.deleteMedia(id);
      await fetchMedia();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete media");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchMedia]);

  const setPrimaryMedia = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await productService.setPrimaryMedia(id);
      await fetchMedia();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set primary media");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchMedia]);

  return {
    mediaItems,
    loading,
    error,
    fetchMedia,
    deleteMedia,
    setPrimaryMedia,
  };
}

// ── Product SEO Hook ───────────────────────────────────────

export function useProductSEO() {
  const [seoItems, setSeoItems] = useState<
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
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSEO = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductSEO(search);
      setSeoItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch SEO data");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSEO = useCallback(async (
    productId: string,
    seo: { metaTitle?: string; metaDescription?: string; metaKeywords?: string[]; slug?: string; canonicalUrl?: string; ogImage?: string }
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await productService.updateProductSEO(productId, seo);
      await fetchSEO();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update SEO");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchSEO]);

  return {
    seoItems,
    loading,
    error,
    fetchSEO,
    updateSEO,
  };
}

// ── Product Columns ───────────────────────────────────────

export function useProductColumns(
  onEdit?: (product: Product) => void,
  onDelete?: (product: Product) => void
): Column<Product>[] {
  return useMemo<Column<Product>[]>(
    () => [
      {
        key: "name",
        header: "Product",
        sortable: true,
        render: (p) => (
          <div>
            <p className="font-semibold text-[#1a1a1a]">{p.name}</p>
            <p className="text-xs text-[#999]">{p.sku}</p>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        sortable: true,
        render: (p) => (
          <span className="inline-flex rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#0c831f]">
            {p.category}
          </span>
        ),
      },
      {
        key: "price",
        header: "Price",
        sortable: true,
        align: "right",
        render: (p) => (
          <div className="text-right">
            <p className="font-semibold text-[#1a1a1a]">₹{p.price}</p>
            <p className="text-xs text-[#999] line-through">₹{p.mrp}</p>
          </div>
        ),
      },
      {
        key: "stock",
        header: "Stock",
        sortable: true,
        align: "right",
        render: (p) => (
          <span
            className={`font-semibold ${
              p.stock === 0
                ? "text-red-500"
                : p.stock <= p.lowStockThreshold
                ? "text-amber-500"
                : "text-[#0c831f]"
            }`}
          >
            {p.stock}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (p) => (
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              p.status === "active"
                ? "bg-[#e8f5e9] text-[#0c831f]"
                : p.status === "inactive"
                ? "bg-[#fef2f2] text-red-600"
                : p.status === "draft"
                ? "bg-[#fffbeb] text-amber-600"
                : "bg-[#f6f7f6] text-[#666]"
            }`}
          >
            {p.status}
          </span>
        ),
        hideOnMobile: true,
      },
      {
        key: "actions",
        header: "",
        width: "120px",
        align: "right",
        render: (p) => (
          <div className="flex items-center justify-end gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(p)}
                className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f] transition-colors"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(p)}
                className="rounded-lg p-1.5 text-[#666] hover:bg-[#fff0f6] hover:text-red-500 transition-colors"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );
}

// ── Product Form / Mutation Hook ──────────────────────────
// Wraps all product CRUD operations (create, update, delete).
// Pages import this instead of calling productService directly.

import type { ProductFormData } from "@/types/products";

export function useProductForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = useCallback(async (data: ProductFormData): Promise<boolean> => {
    setSubmitting(true);
    setError(null);
    try {
      await productService.createProduct(data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, data: Partial<ProductFormData>): Promise<boolean> => {
    setSubmitting(true);
    setError(null);
    try {
      await productService.updateProduct(id, data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setSubmitting(true);
    setError(null);
    try {
      const success = await productService.deleteProduct(id);
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { createProduct, updateProduct, deleteProduct, submitting, error };
}
