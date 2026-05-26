"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { productService, categoryService } from "@/services/products.service";
import type {
  Product,
  ProductFilters,
  PaginationState,
  Category,
  BulkUploadRecord,
  ProductFormData,
  Column,
} from "@/types/products";

// ── Product List Hook ────────────────────────────────────

export function useProducts(initialFilters?: Partial<ProductFilters>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    try {
      const result = await productService.getProducts(filters, pagination);
      setProducts(result.products);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.search,
    filters.category,
    filters.status,
    filters.brand,
    filters.minPrice,
    filters.maxPrice,
    filters.stockStatus,
    filters.sortBy,
    filters.sortOrder,
    pagination.page,
    pagination.pageSize,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
    error,
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

// ── Single Product Hook ──────────────────────────────────

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    productService
      .getProductById(id)
      .then((p) => {
        setProduct(p || null);
        if (!p) setError("Product not found");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}

// ── Product Form Hook ────────────────────────────────────

export function useProductForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = useCallback(async (data: ProductFormData): Promise<Product | null> => {
    setSubmitting(true);
    setError(null);
    try {
      const product = await productService.createProduct(data);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
      return null;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const updateProduct = useCallback(
    async (id: string, data: Partial<Product>): Promise<Product | null> => {
      setSubmitting(true);
      setError(null);
      try {
        const product = await productService.updateProduct(id, data);
        return product || null;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update product");
        return null;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setSubmitting(true);
    setError(null);
    try {
      return await productService.deleteProduct(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { createProduct, updateProduct, deleteProduct, submitting, error };
}

// ── Categories Hook ──────────────────────────────────────

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(async (data: Partial<Category>) => {
    try {
      const category = await categoryService.createCategory(data);
      setCategories((prev) => [...prev, category]);
      return category;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
      return null;
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: Partial<Category>) => {
    try {
      const updated = await categoryService.updateCategory(id, data);
      if (updated) {
        setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
      }
      return updated || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update category");
      return null;
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category");
      return false;
    }
  }, []);

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.name, label: c.name })),
    [categories]
  );

  return {
    categories,
    loading,
    error,
    categoryOptions,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

// ── Pricing Hook ──────────────────────────────────────────

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPricing = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getPricingData(search);
      setPricingData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load pricing data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  const updatePricing = useCallback(
    async (
      id: string,
      data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number }
    ) => {
      setError(null);
      try {
        await productService.updatePricing(id, data);
        setPricingData((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...data,
                  margin: data.mrp
                    ? Math.round(
                        (((data.mrp - (data.costPrice ?? p.cost)) / data.mrp) * 100) * 10
                      ) / 10
                    : p.margin,
                }
              : p
          )
        );
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update pricing");
        return false;
      }
    },
    []
  );

  return { pricingData, loading, error, fetchPricing, updatePricing };
}

// ── Media Hook ───────────────────────────────────────────

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductMedia(search);
      setMediaItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const deleteMedia = useCallback(async (id: string) => {
    try {
      await productService.deleteMedia(id);
      setMediaItems((prev) => prev.filter((m) => m.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete media");
      return false;
    }
  }, []);

  const setPrimaryMedia = useCallback(async (id: string) => {
    try {
      await productService.setPrimaryMedia(id);
      setMediaItems((prev) =>
        prev.map((m) => ({ ...m, isPrimary: m.id === id }))
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set primary media");
      return false;
    }
  }, []);

  return { mediaItems, loading, error, fetchMedia, deleteMedia, setPrimaryMedia };
}

// ── SEO Hook ─────────────────────────────────────────────

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSEO = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductSEO(search);
      setSeoItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load SEO data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSEO();
  }, [fetchSEO]);

  const updateSEO = useCallback(
    async (
      productId: string,
      seo: {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string[];
        slug?: string;
        canonicalUrl?: string;
        ogImage?: string;
      }
    ) => {
      try {
        await productService.updateProductSEO(productId, seo);
        setSeoItems((prev) =>
          prev.map((s) => (s.productId === productId ? { ...s, ...seo } : s))
        );
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update SEO");
        return false;
      }
    },
    []
  );

  return { seoItems, loading, error, fetchSEO, updateSEO };
}

// ── Bulk Upload Hook ─────────────────────────────────────

export function useBulkUpload() {
  const [records, setRecords] = useState<BulkUploadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getBulkUploadHistory();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load upload history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const uploadFile = useCallback(async (file: File) => {
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

  return { records, loading, uploading, error, fetchHistory, uploadFile };
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
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.getAuditLogs(
        { search, action: actionFilter || undefined },
        { page: pagination.page, pageSize: pagination.pageSize }
      );
      setLogs(result.logs);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, actionFilter, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

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
