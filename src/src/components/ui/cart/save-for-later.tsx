"use client";

import { Bookmark, Clock, ShoppingBag, Trash2 } from "lucide-react";
import { useSavedItemsStore } from "@/store/saved-items-store";
import { useCartStore } from "@/store/cart-store";
import { SafeProductImage } from "@/components/ui/safe-image";
import { toast } from "sonner";
import Link from "next/link";

export default function SaveForLater() {
  const { items, removeItem, clearAll, moveToCart } = useSavedItemsStore();
  const { addToCart } = useCartStore();

  if (items.length === 0) return null;

  function handleMoveToCart(productId: string, name: string, price: number, image: string) {
    const saved = moveToCart(productId);
    if (saved) {
      addToCart({ id: Number(productId), name, price, image, quantity: saved.quantity || 1 });
      toast.success(`${name} moved to cart`);
    }
  }

  return (
    <section aria-label="Saved for later items">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-[#ff4f8b]" />
          <h2 className="text-sm font-black text-[#1a1a1a]">Saved for Later</h2>
          <span className="text-[10px] font-semibold text-[#999] bg-[#f2f2f2] px-1.5 py-0.5 rounded">
            {items.length}
          </span>
        </div>
        <button
          onClick={() => { clearAll(); toast.success("Cleared saved items"); }}
          className="text-[10px] font-semibold text-[#999] hover:text-[#ff4f8b] transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="divide-y divide-[#f0f0f0]">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 p-3 sm:gap-4 sm:p-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#f2f2f2]">
              <SafeProductImage
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <div className="min-w-0">
                <Link href={`/product/${item.productId}`}>
                  <h3 className="text-sm font-bold text-[#1a1a1a] truncate">{item.name}</h3>
                </Link>
                <p className="text-xs text-[#999] mt-0.5">₹{item.price} each</p>
                <p className="text-[10px] text-[#999] flex items-center gap-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  Saved {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleMoveToCart(item.productId, item.name, item.price, item.image)}
                  className="flex min-h-[44px] min-w-[44px] h-8 w-8 items-center justify-center rounded-lg text-[#0c831f] hover:bg-[#e8f5e9] transition-colors"
                  aria-label={`Move ${item.name} to cart`}
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { removeItem(item.productId); toast.success(`${item.name} removed`); }}
                  className="flex min-h-[44px] min-w-[44px] h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
