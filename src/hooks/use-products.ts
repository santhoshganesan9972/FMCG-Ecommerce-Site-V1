"use client";

import { useState, useEffect, useCallback } from "react";
import { productService, categoryService } from "@/services/products.service";
import type {
  Product,
  ProductFilters,
  PaginationState,
  Category,
  BulkUploadRecord,
} from "@/types/products";

export function useProducts(initialFilters?: Partial<ProductFilters>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<Partial<ProductFilters>>(
    initialFilters || {}
  );
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(
    async (f: Partial<ProductFilters>, p: Partial<PaginationState>) => {
      setLoading(true);
      try {
        const result = await productService.getProducts(f, p);
        setProducts(result.products);
        setPagination(result.pagination);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts(filters, {
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts, filters]);

  return { products, pagination, loading, filters, setFilters };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProductById(id).then((p) => {
      setProduct(p || null);
      setLoading(false);
    });
  }, [id]);

  return { product, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategories().then((c) => {
      setCategories(c);
      setLoading(false);
    });
  }, []);

  return { categories, loading };
}

export function useBulkUploadHistory() {
  const [records, setRecords] = useState<BulkUploadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getBulkUploadHistory().then((r) => {
      setRecords(r);
      setLoading(false);
    });
  }, []);

  return { records, loading };
}
