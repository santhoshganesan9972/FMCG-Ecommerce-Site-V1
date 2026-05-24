"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { RotateCcw, ChevronRight } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { SafeProductImage } from "@/components/ui/safe-image";
import { toast } from "sonner";
import type { StockStatus } from "@/data/products";

export default function ReorderReminders() {
  const orders = useOrderStore((s) => s.orders);
  const addToCart = useCartStore((s) => s.addToCart);
  const cart = useCartStore((s) => s.cart);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reorderItems = useMemo(() => {
    const delivered = orders.filter((o) => o.status === "Delivered");
    const seen = new Set<number>();
    const items: { id: number; name: string; image: string; price: number; quantity: number; stock: StockStatus }[] = [];

    for (const order of delivered) {
      for (const item of order.items) {
        const prod = products.find((p) => p.id === item.id);
        if (prod && !seen.has(item.id)) {
          seen.add(item.id);
          items.push({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            stock: prod.stock,
          });
        }
      }
    }

    return items.slice(0, 10);
  }, [orders]);

  const inStockItems = reorderItems.filter((item) => item.stock !== "out_of_stock");

  function reorderAll() {
    let count = 0;
    for (const item of inStockItems) {
      const existing = cart.find((c) => c.id === item.id);
      if (!existing || existing.quantity === 0) {
        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity });
        count++;
      }
    }
    if (count > 0) {
      toast.success(`Added ${count} item${count > 1 ? "s" : ""} to cart 🔄`);
    } else {
      toast("Items already in cart or unavailable");
    }
  }

  function scroll(dir: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  if (reorderItems.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-2" aria-label="Reorder reminders">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#0c831f]" />
          <h2 className="text-base sm:text-lg font-black text-[#1a1a1a]">Buy Again</h2>
          <span className="text-[10px] font-semibold text-[#999]">From past orders</span>
        </div>
        {inStockItems.length > 0 && (
          <button
            type="button"
            onClick={reorderAll}
            className="flex items-center gap-1 text-xs font-bold text-[#0c831f] hover:text-[#ff4f8b] transition-colors"
            aria-label="Reorder all available items"
          >
            <RotateCcw className="w-3 h-3" />
            Reorder All
          </button>
        )}
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x pb-1"
        >
          {reorderItems.map((item) => {
            const isOOS = item.stock === "out_of_stock";
            return (
              <div
                key={item.id}
                className={`flex-shrink-0 w-[130px] sm:w-[150px] snap-start ${isOOS ? "opacity-60" : ""}`}
              >
                <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
                  <Link href={`/product/${item.id}`} className="block">
                    <div className={`relative aspect-square bg-[#f2f2f2] ${isOOS ? "grayscale" : ""}`}>
                      <SafeProductImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="130px"
                        className="object-cover"
                        loading="lazy"
                      />
                      {!isOOS && (
                        <div className="absolute top-1 left-1 bg-[#0c831f]/90 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                          x{item.quantity}
                        </div>
                      )}
                      {isOOS && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                          <span className="text-[9px] font-black text-white bg-[#ff4f8b] px-2 py-0.5 rounded shadow-lg">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-2">
                    <Link href={`/product/${item.id}`}>
                      <p className={`text-xs font-semibold leading-tight line-clamp-2 min-h-[2rem] ${isOOS ? "text-[#666]" : "text-[#1a1a1a]"}`}>
                        {item.name}
                      </p>
                    </Link>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex-1">
                        <span className={`text-sm font-black ${isOOS ? "text-[#999] line-through" : "text-[#1a1a1a]"}`}>₹{item.price}</span>
                      </div>
                      {isOOS ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toast("Price alert feature coming soon!");
                          }}
                          className="text-[10px] font-bold bg-[#fff0f6] text-[#ff4f8b] rounded-lg px-2.5 py-1 border border-[#ff4f8b]/30"
                        >
                          NOTIFY
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity });
                            toast.success("Added to cart 🛒");
                          }}
                          className="text-[10px] font-bold text-white bg-[#ff4f8b] rounded-lg px-2.5 py-1 hover:bg-[#e63872] active:scale-95 transition-all shadow-sm"
                        >
                          ADD
                        </button>
                      )}
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
