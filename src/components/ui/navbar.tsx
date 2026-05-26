"use client";

import { ShoppingCart, Search } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { env } from "@/lib/env";
import dynamic from "next/dynamic";
import NotificationPanel from "./notification-panel";
import Link from "next/link";
import LocationPicker from "./location-picker";

const AuthModal = dynamic(() => import("./auth/auth-modal"), { ssr: false });


export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className="w-full bg-white/70 backdrop-blur-md border-b border-white/20 fixed top-0 z-50 shadow-lg"
      aria-label="Primary navigation"
      itemScope
      itemType="https://schema.org/WebSite"
    >
      <meta itemProp="name" content="FMCG Commerce" />
      <meta itemProp="url" content={env.siteUrl} />
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 h-16 flex items-center gap-2 sm:gap-3 md:gap-4">

        {/* LOGO */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff4f8b] flex items-center justify-center">
              <span className="text-white font-black text-sm">F</span>
            </div>
            <span className="font-black text-[#1a1a1a] text-base sm:text-lg hidden sm:block leading-none">
              FMCG
            </span>
          </div>
        </Link>

        {/* LOCATION PICKER */}
        <LocationPicker />

        {/* SEARCH BAR — grows to fill space */}
        <Link href="/search" className="flex-1 min-w-0">
          <div className="h-10 rounded-lg bg-[#f2f2f2] border border-[#e8e8e8] flex items-center px-3 gap-2 hover-border-pink transition-all duration-200 cursor-pointer hover:shadow-sm">
            <Search className="w-4 h-4 text-[#999] flex-shrink-0" />
            <span className="text-sm text-[#999] truncate">
              Search for groceries, snacks...
            </span>
          </div>
        </Link>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">

          {/* Notifications */}
          <NotificationPanel />

          {/* Cart */}
          <div className="relative">
           <Link href="/cart" className="min-w-[44px] min-h-[44px] w-10 h-10 rounded-lg bg-[#f2f2f2] border border-[#e8e8e8] flex items-center justify-center hover-border-pink transition-all duration-200 btn-press hover:scale-105">
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="bg-[#ff4f8b] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none absolute -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <AuthModal />

        </div>
      </div>
    </nav>
  );
}
