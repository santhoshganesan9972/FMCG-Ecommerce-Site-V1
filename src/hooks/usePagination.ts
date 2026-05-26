"use client";

import { useMemo, useState } from "react";

interface UsePaginationOptions {
  total: number;
  defaultPageSize?: number;
  defaultPage?: number;
}

interface UsePaginationReturn {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  pageNumbers: number[];
}

export function usePagination({
  total,
  defaultPageSize = 25,
  defaultPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 3) return [1, 2, 3, 4, 5];
    if (safePage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }
    return Array.from({ length: 5 }, (_, i) => safePage - 2 + i);
  }, [safePage, totalPages]);

  return {
    page: safePage,
    pageSize,
    total,
    totalPages,
    setPage: (p) => setPage(Math.min(Math.max(1, p), totalPages)),
    setPageSize: (size) => {
      setPageSize(size);
      setPage(1);
    },
    nextPage: () => setPage((p) => Math.min(p + 1, totalPages)),
    prevPage: () => setPage((p) => Math.max(p - 1, 1)),
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
    pageNumbers,
  };
}
