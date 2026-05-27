"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { products } from "@/data/products";
import { SafeProductImage } from "@/components/ui/safe-image";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export default function FeaturedProducts() {
  const addToCart = useCartStore((s) => s.addToCart);
  const increaseQty = useCartStore((s) => s.increaseQuantity);
  const decreaseQty = useCartStore((s) => s.decreaseQuantity);
  const cart = useCartStore((s) => s.cart);
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isFeatured && p.stock !== "out_of_stock");
  }, []);

  function scroll(dir: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  if (featuredProducts.length === 0) return null;

  return (
    <section
      className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-2"
      aria-label="Featured products"
    >
      <div className="rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 shadow-lg">
        <div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full mb-2">
            <Award className="w-3 h-3" />
            CURATED PICKS
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-white leading-tight flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            Featured Products
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md">
            Our hand-picked selection of premium-quality products, chosen for exceptional value and taste.
          </p>
        </div>

        <Link
          href="/recommendations"
          className="flex-shrink-0 inline-flex items-center justify-center min-h-[44px] h-9 sm:h-10 px-4 sm:px-5 rounded-lg bg-white text-[#7c3aed] font-bold text-xs sm:text-sm hover:bg-white/90 transition"
        >
          View All
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="hidden sm:flex absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-[#e8e8e8] shadow-md hover:shadow-lg transition-shadow"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x pb-1"
        >
          {featuredProducts.map((product) => {
            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            const cartItem = cart.find((item) => item.id === product.id);
            const quantity = cartItem?.quantity ?? 0;

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-[140px] sm:w-[160px] snap-start"
              >
                <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
                  {/* Premium badge */}
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white text-[8px] font-black px-2 py-1 rounded-bl-lg flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
                      PICK
                    </div>
                  </div>

                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-square bg-[#faf5ff]">
                      <SafeProductImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-[#7c3aed] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded">
                          {discount}% OFF
                        </span>
                      )}
                      {/* Rating badge */}
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
                        {product.rating}
                      </div>
                    </div>
                  </Link>

                  <div className="p-2.5 sm:p-3">
                    <Link href={`/product/${product.id}`} className="block">
                      <p className="text-xs font-semibold text-[#1a1a1a] truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-[#999] line-through">
                          ₹{product.oldPrice}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-[#7c3aed]">
                          ₹{product.price}
                        </span>
                      </div>
                    </Link>

                    <div className="mt-2">
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
                          className="min-h-[44px] w-full h-7 px-2.5 rounded-md text-[11px] font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 active:scale-95 transition-all shadow-sm"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center justify-center w-full h-7 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#ec4899] overflow-hidden shadow-sm">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              decreaseQty(product.id);
                            }}
                            className="flex-1 h-full flex items-center justify-center text-white hover:opacity-80 transition-colors"
                          >
                            <span className="text-sm font-bold">-</span>
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-white">
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
                            className="flex-1 h-full flex items-center justify-center text-white hover:opacity-80 transition-colors"
                          >
                            <span className="text-sm font-bold">+</span>
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
          className="hidden sm:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-[#e8e8e8] shadow-md hover:shadow-lg transition-shadow"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-[#1a1a1a]" />
        </button>
      </div>
    </section>
  );
}
