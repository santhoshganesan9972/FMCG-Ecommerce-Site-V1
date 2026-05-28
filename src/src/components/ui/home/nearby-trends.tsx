"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, MapPin, ChevronRight, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { SafeProductImage } from "@/components/ui/safe-image";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

const AREAS = [
  "Koramangala, Bengaluru",
  "Indiranagar, Bengaluru",
  "Andheri West, Mumbai",
  "Sector 62, Noida",
  "Hinjewadi, Pune",
];

export default function NearbyTrends() {
  const [areaIndex, setAreaIndex] = useState(0);
  const addToCart = useCartStore((s) => s.addToCart);
  const increaseQty = useCartStore((s) => s.increaseQuantity);
  const decreaseQty = useCartStore((s) => s.decreaseQuantity);
  const cart = useCartStore((s) => s.cart);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAreaIndex((i) => (i + 1) % AREAS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const trendingProducts = useMemo(() => {
    return [...products]
      .filter((p) => p.stock !== "out_of_stock")
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, []);

  function scroll(dir: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <section className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-2" aria-label="Nearby trending products">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#ff4f8b]" />
          <h2 className="text-base sm:text-lg font-black text-[#1a1a1a]">Nearby Trends</h2>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[#0c831f] bg-[#e8f5e9] px-2 py-0.5 rounded-full animate-fade-in">
            <MapPin className="w-2.5 h-2.5" />
            {AREAS[areaIndex]}
          </span>
        </div>
        <Link
          href="/category/all?sort=rating"
          className="flex items-center gap-0.5 text-xs font-semibold text-[#0c831f] hover:text-[#ff4f8b] transition-colors"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x pb-1"
        >
          {trendingProducts.map((product) => {
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
                        sizes="130px"
                        className="object-cover"
                        loading="lazy"
                      />
                      {discount > 0 && (
                        <span className="absolute top-1 left-1 text-[9px] font-bold text-white bg-[#ff4f8b] px-1 py-0.5 rounded">
                          {discount}% OFF
                        </span>
                      )}
                      <div className="absolute bottom-1 right-1 bg-white/90 text-[9px] font-bold text-[#1a1a1a] px-1 py-0.5 rounded flex items-center gap-0.5">
                        ★ {product.rating}
                      </div>
                    </div>
                  </Link>
                  <div className="p-2">
                    <Link href={`/product/${product.id}`}>
                      <p className="text-xs font-semibold text-[#1a1a1a] leading-tight line-clamp-2 min-h-[2rem]">
                        {product.name}
                      </p>
                    </Link>
                    <p className="text-[9px] text-[#999] mt-0.5">{product.category}</p>
                     <div className="mt-1.5">
                       <div className="flex items-center gap-1">
                         <span className="text-sm font-black text-[#1a1a1a]">₹{product.price}</span>
                         <span className="text-[9px] text-[#999] line-through">₹{product.oldPrice}</span>
                       </div>
                       <div className="mt-2">
                        {quantity === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
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
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-black text-white">{quantity}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                increaseQty(product.id);
                                toast.success("Added to cart 🛒");
                              }}
                              className="flex-1 h-full flex items-center justify-center text-white hover:bg-[#e63872] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
