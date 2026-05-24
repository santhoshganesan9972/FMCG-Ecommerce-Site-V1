"use client";

import Link from "next/link";
import ProductCard from "./product-card";
import { products } from "@/data/products";
import { categorySections } from "@/data/categories";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

export default function ProductGrid() {
  // Memoize filtered products to avoid recalculations
  const filteredCategories = useMemo(() => {
    return categorySections
      .map(({ label, slug, emoji, filter }) => {
        const items = products.filter((p) => filter(p.category));
        return items.length > 0 ? { label, slug, emoji, items } : null;
      })
      .filter(Boolean) as Array<{ label: string; slug: string; emoji: string; items: typeof products }>;
  }, []);

  return (
    <div
      className="max-w-[1400px] mx-auto space-y-6 py-4 sm:py-6"
      itemScope
      itemType="https://schema.org/ItemList"
      itemProp="mainEntity"
    >
      {filteredCategories.map(({ label, slug, emoji, items }) => (
        <section key={slug} aria-label={`${label} products`}>
          {/* Section header */}
          <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#0c831f] rounded-full" />
              <span className="text-lg leading-none" aria-hidden="true">{emoji}</span>
              <h2
                className="text-base sm:text-lg font-black text-[#1a1a1a] font-royal"
                itemProp="name"
              >
                {label}
              </h2>
              <meta itemProp="numberOfItems" content={String(items.length)} />
            </div>
            <Link
              href={`/category/${slug}`}
              className="flex items-center gap-0.5 text-xs sm:text-sm font-semibold text-[#0c831f] hover-text-pink hover:underline"
              aria-label={`Browse all ${label} products`}
            >
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal scroll row */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar px-3 sm:px-4 md:px-6 pb-1">
            {items.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[150px] sm:w-[170px] md:w-[185px]"
                itemScope
                itemType="https://schema.org/Product"
                itemProp="itemListElement"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <ProductCard product={product} />
              </div>
            ))}

            {/* "View all" card at the end */}
            <div className="flex-shrink-0 w-[130px] sm:w-[150px] flex items-center justify-center">
              <Link
                href={`/category/${slug}`}
                className="flex flex-col items-center justify-center gap-2 w-full h-full min-h-[180px] rounded-xl border-2 border-dashed border-[#ff4f8b]/40 bg-[#fff0f6]/70 hover-bg-pink-light transition-colors group"
                aria-label={`View all ${label} products`}
              >
                <div className="w-10 h-10 rounded-full bg-[#ff4f8b] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold text-[#ff4f8b] text-center px-2">
                  View all {label}
                </span>
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
