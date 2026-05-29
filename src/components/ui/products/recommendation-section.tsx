"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { products } from "@/data/products";
import { SafeProductImage } from "@/components/ui/safe-image";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export default function RecommendationSection() {
  const addToCart = useCartStore((s) => s.addToCart);
  const increaseQty = useCartStore((s) => s.increaseQuantity);
  const decreaseQty = useCartStore((s) => s.decreaseQuantity);
  const cart = useCartStore((s) => s.cart);
  const scrollRef = useRef<HTMLDivElement>(null);

  const aiRecommendedProducts = useMemo(() => {
    return [...products]
      .filter((p) => p.stock !== "out_of_stock")
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12);
  }, []);

  function scroll(dir: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <section
      className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-2"
      aria-label="AI powered personalized recommendations"
    >
      <div className="rounded-xl bg-gradient-to-r from-[#0c831f] to-[#ff4f8b] p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div>
          <span
            className="inline-block text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full mb-2"
          >
            AI PICKS
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Personalized For You
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md">
            Smart product recommendations powered by AI based on your shopping habits and preferences.
          </p>
        </div>

        <Link
          href="/recommendations"
          className="flex-shrink-0 inline-flex items-center justify-center h-8 sm:h-9 px-4 rounded-lg bg-white text-[#0c831f] font-bold text-xs sm:text-sm hover:bg-white/90 transition shadow-sm"
        >
          View All
        </Link>
      </div>

      {aiRecommendedProducts.length > 0 && (
        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-[#e8e8e8] shadow-md hover:shadow-lg transition-shadow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x"
          >
            {aiRecommendedProducts.map((product) => {
              const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
              const cartItem = cart.find((item) => item.id === product.id);
              const quantity = cartItem?.quantity ?? 0;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[130px] sm:w-[150px] snap-start"
                >
                  <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative aspect-square bg-[#f2f2f2]">
                        <SafeProductImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {discount > 0 && (
                          <span className="absolute top-2 left-2 bg-[#0c831f] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="p-2.5 sm:p-3">
                      <Link href={`/product/${product.id}`} className="block">
                        <p className="text-xs font-semibold text-[#1a1a1a] truncate">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-[#666] line-through">
                            ₹{product.oldPrice}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-[#1a1a1a]">
                            ₹{product.price}
                          </span>
                        </div>
                      </Link>

                      <div className="mt-2.5">
                        {quantity === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1,
                              });
                              toast.success("Added to cart 🛒");
                            }}
                            className="w-full h-8 sm:h-9 rounded-lg text-xs font-black text-white bg-[#ff4f8b] hover:bg-[#e63872] active:scale-95 transition-all shadow-sm"
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="flex items-center justify-between w-full h-8 sm:h-9 rounded-lg bg-[#ff4f8b] overflow-hidden shadow-sm">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                decreaseQty(product.id);
                              }}
                              className="flex-1 h-full flex items-center justify-center text-white hover:bg-[#e63872] transition-colors"
                            >
                              <span className="text-sm font-black">-</span>
                            </button>
                            <span className="w-8 text-center text-sm font-black text-white">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                increaseQty(product.id);
                                toast.success("Added to cart 🛒");
                              }}
                              className="flex-1 h-full flex items-center justify-center text-white hover:bg-[#e63872] transition-colors"
                            >
                              <span className="text-sm font-black">+</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll(1)}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-[#e8e8e8] shadow-md hover:shadow-lg transition-shadow"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-4 h-4 text-[#1a1a1a]" />
          </button>
        </div>
      )}
    </section>
  );
}
