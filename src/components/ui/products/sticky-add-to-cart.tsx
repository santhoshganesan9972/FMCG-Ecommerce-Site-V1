"use client";

import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface StickyAddToCartProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function StickyAddToCart({ product }: StickyAddToCartProps) {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e8e8e8] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:hidden animate-slide-up">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center gap-3">
        {/* Price info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#999]">{product.name}</p>
          <p className="text-lg font-black text-[#1a1a1a]">₹{product.price}</p>
        </div>

        {/* Quantity / Add to Cart */}
        {quantity === 0 ? (
          <button
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              });
              toast.success("Added to cart 🛒");
            }}
            className="flex items-center gap-2 h-12 px-6 rounded-xl bg-[#ff4f8b] text-white text-sm font-black hover:bg-[#e63872] active:bg-[#e63872] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add
          </button>
        ) : (
          <div className="flex items-center rounded-xl border-2 border-[#ff4f8b] overflow-hidden h-12">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="w-12 h-full flex items-center justify-center text-[#ff4f8b] hover:bg-[#fff0f6] active:bg-[#fff0f6] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center text-base font-black text-[#ff4f8b]">
              {quantity}
            </span>
            <button
              onClick={() => {
                increaseQuantity(product.id);
                toast.success("Added to cart 🛒");
              }}
              className="w-12 h-full flex items-center justify-center bg-[#ff4f8b] text-white hover:bg-[#e63872] active:bg-[#e63872] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
