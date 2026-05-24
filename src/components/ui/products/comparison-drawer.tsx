"use client";

import { X, BarChart3, Star, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { useComparisonStore } from "@/store/comparison-store";
import { useEscapeKey } from "@/lib/hooks/useKeyboardNavigation";
import { SafeProductImage } from "@/components/ui/safe-image";

interface ComparisonDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ComparisonDrawer({
  open,
  onClose,
}: ComparisonDrawerProps) {
  const { comparison, removeFromComparison, clearComparison } =
    useComparisonStore();

  useEscapeKey(open, onClose);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[#e8e8e8] flex-shrink-0">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#ff4f8b]" />
            <h2 className="text-lg font-bold text-[#1a1a1a]">Compare</h2>
            {comparison.length > 0 && (
              <span className="text-xs font-semibold text-[#ff4f8b] bg-[#ff4f8b]/10 px-2 py-0.5 rounded-full">
                {comparison.length} / 4
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {comparison.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs font-semibold text-[#999] hover:text-[#ff4f8b] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#ff4f8b]/5 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#f2f2f2] rounded-full transition-colors"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5 text-[#666]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {comparison.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#f2f2f2] flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-[#ccc]" />
              </div>
              <p className="text-sm font-semibold text-[#1a1a1a]">
                No products to compare
              </p>
              <p className="text-xs text-[#999] mt-1">
                Tap the compare icon on products to add them here
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 mt-4 h-10 px-4 rounded-xl bg-[#ff4f8b] text-white text-xs font-semibold hover:bg-[#e63872] transition-colors"
                onClick={onClose}
              >
                <Plus className="w-3.5 h-3.5" />
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="min-w-[600px]">
                {/* Product headers */}
                <div className="grid gap-3" style={{ gridTemplateColumns: `120px repeat(${comparison.length}, 1fr)` }}>
                  {/* Labels column */}
                  <div className="space-y-4 pt-16">
                    {["Price", "Old Price", "Discount", "Rating", "Category", "Stock"].map(
                      (label) => (
                        <div
                          key={label}
                          className="h-9 flex items-center text-xs font-bold text-[#999] uppercase tracking-wide"
                        >
                          {label}
                        </div>
                      )
                    )}
                  </div>

                  {/* Product columns */}
                  {comparison.map((item) => {
                    const discount = Math.round(
                      ((item.oldPrice - item.price) / item.oldPrice) * 100
                    );
                    const stockColors: Record<string, string> = {
                      in_stock: "text-[#0c831f] bg-[#e8f5e9]",
                      low_stock: "text-[#f59e0b] bg-[#fef3c7]",
                      out_of_stock: "text-[#ff4f8b] bg-[#fff0f6]",
                    };

                    return (
                      <div key={item.id} className="text-center space-y-4">
                        {/* Image + Name */}
                        <div className="relative">
                          <div className="w-full aspect-square rounded-xl bg-[#f2f2f2] flex items-center justify-center mb-2 overflow-hidden">
                            <SafeProductImage
                              src={item.image}
                              alt={item.name}
                              className="rounded-xl"
                              loading="lazy"
                              fill
                            />
                          </div>
                          <button
                            onClick={() => removeFromComparison(item.id)}
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-sm border border-[#e8e8e8] flex items-center justify-center hover:bg-[#fff0f6] hover:border-[#ff4f8b] transition-colors"
                            aria-label={`Remove ${item.name} from comparison`}
                          >
                            <X className="w-3 h-3 text-[#666]" />
                          </button>
                          <p className="text-xs font-bold text-[#1a1a1a] leading-tight line-clamp-2 min-h-[2rem]">
                            {item.name}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="h-9 flex items-center justify-center text-sm font-black text-[#1a1a1a]">
                          ₹{item.price}
                        </div>

                        {/* Old Price */}
                        <div className="h-9 flex items-center justify-center text-xs text-[#999] line-through">
                          ₹{item.oldPrice}
                        </div>

                        {/* Discount */}
                        <div className="h-9 flex items-center justify-center">
                          {discount > 0 ? (
                            <span className="text-xs font-bold text-[#ff4f8b] bg-[#fff0f6] px-2 py-1 rounded-full">
                              {discount}% OFF
                            </span>
                          ) : (
                            <span className="text-xs text-[#ccc]">—</span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="h-9 flex items-center justify-center">
                          <div className="flex items-center gap-1 bg-[#0c831f] text-white text-xs font-bold px-2 py-1 rounded-lg">
                            <Star className="w-3 h-3 fill-white" />
                            {item.rating}
                          </div>
                        </div>

                        {/* Category */}
                        <div className="h-9 flex items-center justify-center text-xs font-semibold text-[#666]">
                          {item.category}
                        </div>

                        {/* Stock */}
                        <div className="h-9 flex items-center justify-center">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                              stockColors[item.stock] ?? ""
                            }`}
                          >
                            {item.stock === "in_stock"
                              ? "In Stock"
                              : item.stock === "low_stock"
                              ? "Few left"
                              : "Sold Out"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {comparison.length > 0 && (
          <div className="flex-shrink-0 px-4 py-3 border-t border-[#e8e8e8] bg-white">
            <p className="text-xs text-center text-[#999]">
              Comparing {comparison.length} product{comparison.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
