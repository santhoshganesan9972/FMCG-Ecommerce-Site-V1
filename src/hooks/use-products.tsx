import { useState, useCallback, useMemo } from "react";
import type {
  Product,
  ProductFilters,
  ProductCategory,
  ProductStatus,
  PaginationState,
  Column,
  TableAction,
} from "@/types/products";
import { productService } from "@/services/products.service";

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
