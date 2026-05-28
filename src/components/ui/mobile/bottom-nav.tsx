"use client";

import { House, Search, ShoppingCart, User, Tag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function BottomNav() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const items = [
    { icon: House, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Tag, label: "Offers", href: "/offers" },
    { icon: User, label: "Account", href: "/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-[#e8e8e8] flex items-center justify-around md:hidden z-50 safe-area-bottom shadow-[0_-2px_16px_rgba(0,0,0,0.06)]">
      {items.map(({ icon: Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 flex-1 text-[#666] hover-text-pink transition-all duration-200 active:scale-90 active:bg-[#f2f2f2] min-h-[56px] select-none touch-manipulation"
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-semibold">{label}</span>
        </Link>
      ))}

       {/* Cart with badge */}
       <Link href="/cart" className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 flex-1 relative text-[#0c831f] min-h-[56px] select-none touch-manipulation">
         <div className="relative">
           <ShoppingCart className="w-5 h-5" />
           {totalItems > 0 && (
             <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#ff4f8b] text-white text-[9px] font-black flex items-center justify-center leading-none">
               {totalItems}
             </span>
           )}
         </div>
         <span className="text-[10px] font-semibold">Cart</span>
       </Link>
    </div>
  );
}
