"use client";

import { Minus, Plus, ShoppingCart, Bell } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import type { StockStatus } from "@/data/products";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: StockStatus;
}

export default function ProductDetailActions({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const cart = useCartStore((state) => state.cart);

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const isOutOfStock = product.stock === "out_of_stock";

  if (isOutOfStock) {
    return (
      <div className="flex flex-col w-full">
        <button
          onClick={() => {
            toast("Price alert feature coming soon!");
          }}
          className="w-full h-14 rounded-xl bg-[#fff0f6] text-[#ff4f8b] text-base sm:text-sm font-black flex items-center justify-center gap-2.5 px-4"
        >
          <Bell className="w-5 h-5 sm:w-4 sm:h-4" />
          Notify Me
        </button>
        <p className="text-xs text-[#999] mt-2 text-center">
          This item is currently out of stock. We'll notify you when it's back.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
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
          className="w-full h-14 rounded-xl bg-[#ff4f8b] hover:bg-[#e63872] active:bg-[#e63872] transition text-white text-base sm:text-sm font-black flex items-center justify-center gap-2.5 px-4"
        >
          <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
          Add to Cart
        </button>
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center rounded-xl bg-[#ff4f8b] overflow-hidden h-12 shadow-sm">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="w-12 h-full flex items-center justify-center text-white hover:bg-[#e63872] active:bg-[#e63872] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-10 text-center text-base font-black text-white">
                {quantity}
              </span>
              <button
                onClick={() => increaseQuantity(product.id)}
                className="w-12 h-full flex items-center justify-center text-white hover:bg-[#e63872] active:bg-[#e63872] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <span className="text-sm font-semibold text-[#ff4f8b]">
              {quantity} in cart
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
