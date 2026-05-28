"use client";

import { BORDER, BG_PRIMARY, TEXT_PRIMARY, TEXT_MUTED, BTN_GHOST, FOCUS_RING, TRANSITION, BG_WHITE } from "@/lib/shared-classes";

interface ReusablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

const pageSizeOptions = [10, 25, 50, 100];

/**
 * A standalone pagination control with page size selector.
 *
 * @example
 * <ReusablePagination
 *   page={1}
 *   pageSize={10}
 *   total={100}
 *   onPageChange={setPage}
 *   onPageSizeChange={setPageSize}
 * />
 */
export function ReusablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  className = "",
}: ReusablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }
    return Array.from({ length: 5 }, (_, i) => page - 2 + i);
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 ${BORDER} bg-[#f9fafb] px-4 py-3 ${className}`}>
      <div className={`flex items-center gap-2 text-xs ${TEXT_MUTED}`}>
        <span>Show</span>
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={`rounded-lg ${BORDER} ${BG_WHITE} px-2 py-1 text-xs font-semibold ${TEXT_PRIMARY} ${FOCUS_RING}`}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        )}
        <span>of {total} items</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}            className={`${BTN_GHOST} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          Prev
        </button>
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${TRANSITION} ${
              page === pageNum
                ? `${BG_PRIMARY} text-white`
                : `${BTN_GHOST}`
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}            className={`${BTN_GHOST} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
