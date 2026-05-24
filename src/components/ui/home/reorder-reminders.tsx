"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { RotateCcw, ChevronRight } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { SafeProductImage } from "@/components/ui/safe-image";
import { toast } from "sonner";

export default function ReorderReminders() {
  const orders = useOrderStore((s) => s.orders);
  const addToCart = useCartStore((s) => s.addToCart);
  const cart = useCartStore((s) => s.cart);
  const scrollRef = useRef<HTMLDivElement>(null);

  const reorderItems = useMemo(() => {
    const delivered = orders.filter((o) => o.status === "Delivered");
    const seen = new Set<number>();
    const items: { id: number; name: string; image: string; price: number; quantity: number }[] = [];

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
          });
        }
      }
    }

    return items.slice(0, 10);
  }, [orders]);

  function reorderAll() {
    let count = 0;
    for (const item of reorderItems) {
      const existing = cart.find((c) => c.id === item.id);
      if (!existing || existing.quantity === 0) {
        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity });
        count++;
      }
    }
    if (count > 0) {
      toast.success(`Added ${count} item${count > 1 ? "s" : ""} to cart 🔄`);
    } else {
      toast("Items already in cart");
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
        <button
          type="button"
          onClick={reorderAll}
          className="flex items-center gap-1 text-xs font-bold text-[#0c831f] hover:text-[#ff4f8b] transition-colors"
          aria-label="Reorder all items"
        >
          <RotateCcw className="w-3 h-3" />
          Reorder All
        </button>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x pb-1"
        >
          {reorderItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[130px] sm:w-[150px] snap-start"
            >
              <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
                <Link href={`/product/${item.id}`} className="block">
                  <div className="relative aspect-square bg-[#f2f2f2]">
                    <SafeProductImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="130px"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-1 left-1 bg-[#0c831f]/90 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                      x{item.quantity}
                    </div>
                  </div>
                </Link>
                <div className="p-2">
                  <Link href={`/product/${item.id}`}>
                    <p className="text-xs font-semibold text-[#1a1a1a] leading-tight line-clamp-2 min-h-[2rem]">
                      {item.name}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-sm font-black text-[#1a1a1a]">₹{item.price}</span>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: item.quantity });
                        toast.success("Added to cart 🛒");
                      }}
                      className="text-[10px] font-bold text-[#ff4f8b] border border-[#ff4f8b] rounded-lg px-2 py-1 hover:bg-[#ff4f8b] hover:text-white transition-colors"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
