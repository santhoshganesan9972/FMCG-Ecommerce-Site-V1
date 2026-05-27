"use client";

import Link from "next/link";
import { Bell, Search, Zap, PanelLeft, PanelLeftClose } from "lucide-react";
import MobileSidebar from "@/components/ui/admin/mobile-sidebar";

export default function Topbar({
  collapsed,
  onToggleSidebar,
  className,
}: {
  collapsed?: boolean;
  onToggleSidebar?: () => void;
  className?: string;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 border-b border-[#e8e8e8]/50 bg-white/70 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "md:left-16" : "md:left-64"
      } ${className || ""}`}
    >
      <div className="flex h-full items-center justify-between gap-2 px-2 sm:px-4 md:px-5">
        {/* ── Sidebar toggle — always visible on desktop ── */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition-all duration-200 hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-3.5 w-3.5" />
          ) : (
            <PanelLeftClose className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Mobile sidebar trigger */}
        <MobileSidebar />

        <div className="hidden min-w-0 sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
            FMCG Admin
          </p>
          <p className="truncate text-sm font-black text-[#1a1a1a]">
            Live commerce operations
          </p>
        </div>

        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-2.5 transition-all duration-200 focus-within:border-[#0c831f] focus-within:shadow-sm sm:max-w-sm">
          <Search className="h-3.5 w-3.5 flex-shrink-0 text-[#999]" />
          <input
            type="text"
            placeholder="Search orders, SKUs, vendors..."
            className="min-w-0 flex-1 bg-transparent text-xs text-[#1a1a1a] outline-none placeholder:text-[#999]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 text-xs font-bold text-[#0c831f] transition-all duration-200 btn-press hover:bg-[#e8f5e9] lg:flex"
          >
            <Zap className="h-3.5 w-3.5" />
            Storefront
          </Link>

          <Link
            href="/admin/notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition-all duration-200 btn-press hover:bg-[#fff0f6] hover:scale-105"
            aria-label="View notifications"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ff4f8b]" />
          </Link>

          <Link
            href="/admin/profile"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0c831f] text-xs font-bold text-white transition-all duration-200 btn-press hover:bg-[#081f14] hover:scale-105"
            aria-label="View profile"
          >
            S
          </Link>
        </div>
      </div>
    </header>
  );
}
