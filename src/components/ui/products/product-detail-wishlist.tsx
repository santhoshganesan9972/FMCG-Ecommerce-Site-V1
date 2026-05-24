"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { toast } from "sonner";

interface ProductDetailWishlistProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

export default function ProductDetailWishlist({
  product,
}: ProductDetailWishlistProps) {
  const wishlist = useWishlistStore((s) => s.wishlist);
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (!isWishlisted) {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      });
      toast.success("Added to wishlist ❤️");
    } else {
      removeFromWishlist(product.id);
      toast("Removed from wishlist 💔");
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all duration-200 active:scale-90 ${
        isWishlisted
          ? "border-[#ff4f8b] bg-[#fff0f6] text-[#ff4f8b]"
          : "border-[#e8e8e8] text-[#999] hover:border-[#ff4f8b] hover:text-[#ff4f8b] hover:bg-[#fff0f6]"
      }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-5 h-5 ${isWishlisted ? "fill-[#ff4f8b]" : ""}`}
      />
    </button>
  );
}
