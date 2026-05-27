"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryProductCard from "@/components/ui/products/category-product-card";
import type { Product } from "@/data/products";

interface CategoryClientProps {
  items: Product[];
  categoryEmoji: string;
  categoryLabel: string;
}

type SortOption = "default" | "price-asc" | "price-desc" | "name" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name", label: "Name: A → Z" },
  { value: "rating", label: "Rating" },
];

const PAGE_SIZE = 24;

export default function CategoryClient({
  items,
  categoryEmoji,
  categoryLabel,
}: CategoryClientProps) {
  const [sort, setSort] = useState<SortOption>("default");
  const [page, setPage] = useState(1);
  const [showSort, setShowSort] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...items];
    switch (sort) {
      case "price-asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return copy.sort((a, b) => b.price - a.price);
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
      default:
        return copy;
    }
  }, [items, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    setShowSort(false);
    setPage(1);
  };

  return (
    <>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#666]">
          {sorted.length} {sorted.length === 1 ? "product" : "products"}
        </p>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSort(!showSort)}
            aria-expanded={showSort}
            aria-haspopup="listbox"
            className="flex items-center gap-1.5 min-h-[44px] h-8 px-3 rounded-lg bg-white border border-[#e8e8e8] text-xs font-semibold text-[#1a1a1a] hover:border-[#ccc] transition-colors"
          >
            {sortOptions.find((o) => o.value === sort)?.label ?? "Sort"}
            <ChevronDown className="w-3.5 h-3.5 text-[#999]" />
          </button>

          {showSort && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSort(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-[#e8e8e8] rounded-lg shadow-lg py-1 min-w-[180px]" role="listbox" aria-label="Sort options">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={sort === option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${
                      sort === option.value
                        ? "text-[#ff4f8b] bg-[#fff0f6]"
                        : "text-[#1a1a1a] hover:bg-[#f9f9f9]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product grid */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">{categoryEmoji}</span>
          <p className="text-base font-bold text-[#1a1a1a]">No products yet</p>
          <p className="text-sm text-[#999] mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
          {paginated.map((product) => (
            <CategoryProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 mb-4">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage(safePage - 1)}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] w-9 h-9 rounded-lg bg-white border border-[#e8e8e8] disabled:opacity-40 hover:bg-[#f9f9f9] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
          </button>

          {getPageNumbers(safePage, totalPages).map((p, i) =>
            p === null ? (
              <span key={`ellipsis-${i}`} className="px-1 text-[#999] text-xs">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`min-w-[44px] min-h-[44px] w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  p === safePage
                    ? "bg-[#ff4f8b] text-white shadow-sm"
                    : "bg-white border border-[#e8e8e8] text-[#1a1a1a] hover:bg-[#f9f9f9]"
                }`}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage(safePage + 1)}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] w-9 h-9 rounded-lg bg-white border border-[#e8e8e8] disabled:opacity-40 hover:bg-[#f9f9f9] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 text-[#1a1a1a]" />
          </button>
        </div>
      )}
    </>
  );
}

/** Generate page numbers with ellipsis for large ranges */
function getPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];

  pages.push(1);

  if (current > 3) {
    pages.push(null);
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push(null);
  }

  pages.push(total);

  return pages;
}
