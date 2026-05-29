"use client";

// ── Product & Catalog Hooks ──────────────────────────────
// Architecture: UI → Component → Hook → Service → API Adapter → Backend
// Now backed by TanStack Query for caching, retry, and invalidation.

import { useMemo, useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, categoryService } from "@/services/products.service";
import { notifyProduct } from "@/lib/notifications";
import { queryKeys } from "@/lib/react-query/query-keys";
import {
  invalidateProductQueries,
  invalidateSingleProduct,
} from "@/lib/react-query/invalidation";
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
  const queryClient = useQueryClient();
  const [filters, setFiltersState] = useState<ProductFilters>({
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
  const [pagination, setPagination] = React.useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const queryKey = queryKeys.products.list(filters as unknown as Record<string, unknown>);

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => productService.getProducts(filters, pagination),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });

  const updateFilters = useCallback((update: Partial<ProductFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...update }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({
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
    products: data?.products ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    filters,
    pagination: data?.pagination ?? pagination,
    activeFilterCount,
    fetchProducts: () => queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() }),
    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
  };
}

// ── Single Product Hook ──────────────────────────────────

export function useProduct(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });

  return {
    product: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

// ── Product Form Hook ────────────────────────────────────

export function useProductForm() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: Partial<ProductFormData>) =>
      productService.createProduct(data),
    onSuccess: (product) => {
      if (product) {
        notifyProduct.created(product.name).catch(() => {});
      }
      invalidateProductQueries(queryClient);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.updateProduct(id, data),
    onSuccess: (product, { id }) => {
      if (product) {
        notifyProduct.updated(product.name, "Details updated").catch(() => {});
      }
      invalidateSingleProduct(queryClient, id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: (_, id) => {
      notifyProduct.deleted(`Product (ID: ${id})`).catch(() => {});
      invalidateProductQueries(queryClient);
    },
  });

  const createProduct = useCallback(
    async (data: Partial<ProductFormData>): Promise<Product | null> => {
      try {
        return await createMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    [createMutation]
  );

  const updateProduct = useCallback(
    async (id: string, data: Partial<Product>): Promise<Product | null> => {
      try {
        return await updateMutation.mutateAsync({ id, data });
      } catch {
        return null;
      }
    },
    [updateMutation]
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
    [deleteMutation]
  );

  const error =
    createMutation.error?.message ??
    updateMutation.error?.message ??
    deleteMutation.error?.message ??
    null;

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    submitting:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    error,
  };
}

// ── Categories Hook ──────────────────────────────────────

export function useCategories() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.categories.list(),
    queryFn: () => categoryService.getCategories(),
  });

  const createMutation = useMutation({
    mutationFn: (data: Partial<Category>) => categoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.categories.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
      categoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.categories.all });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.categories.all });
    },
  });

  const categories = data ?? [];

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.name, label: c.name })),
    [categories]
  );

  return {
    categories,
    loading: isLoading,
    error: error?.message ?? null,
    categoryOptions,
    fetchCategories: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.products.categories.all }),
    createCategory: async (data: Partial<Category>) => {
      try {
        return await createMutation.mutateAsync(data);
      } catch {
        return null;
      }
    },
    updateCategory: async (id: string, data: Partial<Category>) => {
      try {
        return (await updateMutation.mutateAsync({ id, data })) ?? null;
      } catch {
        return null;
      }
    },
    deleteCategory: async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
  };
}

// ── Pricing Hook ──────────────────────────────────────────

export function usePricing() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.pricing.list(),
    queryFn: () => productService.getPricingData(),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number };
    }) => productService.updatePricing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.pricing.all });
    },
  });

  return {
    pricingData: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    fetchPricing: (search?: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.pricing.list(search),
      }),
    updatePricing: async (
      id: string,
      data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number }
    ): Promise<boolean> => {
      try {
        await updateMutation.mutateAsync({ id, data });
        return true;
      } catch {
        return false;
      }
    },
  };
}

// ── Media Hook ───────────────────────────────────────────

export function useProductMedia() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.media.list(),
    queryFn: () => productService.getProductMedia(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productService.deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.media.all });
    },
  });

  const setPrimaryMutation = useMutation({
    mutationFn: (id: string) => productService.setPrimaryMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.media.all });
    },
  });

  return {
    mediaItems: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    fetchMedia: (search?: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.media.list(search),
      }),
    deleteMedia: async (id: string): Promise<boolean> => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
    setPrimaryMedia: async (id: string): Promise<boolean> => {
      try {
        await setPrimaryMutation.mutateAsync(id);
        return true;
      } catch {
        return false;
      }
    },
  };
}

// ── SEO Hook ─────────────────────────────────────────────

export function useProductSEO() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.seo.list(),
    queryFn: () => productService.getProductSEO(),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      productId,
      seo,
    }: {
      productId: string;
      seo: {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string[];
        slug?: string;
        canonicalUrl?: string;
        ogImage?: string;
      };
    }) => productService.updateProductSEO(productId, seo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.seo.all });
    },
  });

  return {
    seoItems: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    fetchSEO: (search?: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.seo.list(search),
      }),
    updateSEO: async (
      productId: string,
      seo: {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string[];
        slug?: string;
        canonicalUrl?: string;
        ogImage?: string;
      }
    ): Promise<boolean> => {
      try {
        await updateMutation.mutateAsync({ productId, seo });
        return true;
      } catch {
        return false;
      }
    },
  };
}

// ── Bulk Upload Hook ─────────────────────────────────────

export function useBulkUpload() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.bulkUpload.list(),
    queryFn: () => productService.getBulkUploadHistory(),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => productService.uploadBulkFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.bulkUpload.all });
    },
  });

  return {
    records: data ?? [],
    loading: isLoading,
    uploading: uploadMutation.isPending,
    error: error?.message ?? null,
    fetchHistory: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.bulkUpload.all,
      }),
    uploadFile: async (file: File) => {
      try {
        return await uploadMutation.mutateAsync(file);
      } catch {
        return null;
      }
    },
  };
}

// ── Audit Logs Hook ─────────────────────────────────────

export function useAuditLogs() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products.auditLogs.list({
      search,
      action: actionFilter || undefined,
      page: pagination.page,
      pageSize: pagination.pageSize,
    }),
    queryFn: () =>
      productService.getAuditLogs(
        { search, action: actionFilter || undefined },
        { page: pagination.page, pageSize: pagination.pageSize }
      ),
    placeholderData: (prev) => prev,
  });

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => ({ ...prev, page: 1, pageSize }));
  }, []);

  return {
    logs: data?.logs ?? [],
    pagination: data?.pagination ?? pagination,
    loading: isLoading,
    error: error?.message ?? null,
    search,
    setSearch,
    actionFilter,
    setActionFilter,
    fetchLogs: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.auditLogs.all,
      }),
    setPage,
    setPageSize,
  };
}

// Needed for useAuditLogs queryClient
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
