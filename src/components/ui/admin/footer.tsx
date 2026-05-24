"use client";

import Link from "next/link";
import {
  Zap, Headphones, BookOpen, ShieldCheck, LayoutDashboard,
  List, Boxes, Store, MapPin, Users, Wallet, Tag, Bell,
  Award, RotateCcw, Settings,  BarChart3, ChevronUp,
  CreditCard, FileText, User, Activity, TrendingUp, ShoppingCart
} from "lucide-react";

const footerGroups = [
  {
    title: "Operations",
    links: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Orders", href: "/admin/orders", icon: List },
      { label: "Inventory", href: "/admin/inventory", icon: Boxes },
      { label: "Categories", href: "/admin/categories", icon: Store },
      { label: "Delivery", href: "/admin/delivery", icon: MapPin },
    ],
  },
  {
    title: "Financial",
    links: [
      { label: "Payments", href: "/admin/finance/payments", icon: CreditCard },
      { label: "Transactions", href: "/admin/finance/transactions", icon: FileText },
      { label: "Refunds", href: "/admin/finance/refunds", icon: RotateCcw },
      { label: "Wallet", href: "/admin/finance/wallet", icon: Wallet },
      { label: "GST Reports", href: "/admin/finance/reports/gst", icon: BarChart3 },
    ],
  },
  {
    title: "Marketing & Support",
    links: [
      { label: "Promotions", href: "/admin/promotions", icon: Tag },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      { label: "Loyalty", href: "/admin/loyalty", icon: Award },
      { label: "Support Center", href: "/admin/support", icon: Headphones },
      { label: "Returns", href: "/admin/returns", icon: RotateCcw },
    ],
  },
  {
    title: "System",
    links: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Customers", href: "/admin/customers", icon: User },
      { label: "Vendors", href: "/admin/vendors", icon: Store },
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Activity Log", href: "/admin/dashboard", icon: Activity },
    ],
  },
];

const systemStats = [
  { label: "Orders Today", value: "847", icon: ShoppingCart, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
  { label: "Revenue", value: "₹1.2L", icon: TrendingUp, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  { label: "Active Users", value: "1.4k", icon: Users, color: "text-[#1565c0]", bg: "bg-[#e3f2fd]" },
  { label: "Avg. Response", value: "1.2s", icon: Activity, color: "text-[#e65100]", bg: "bg-[#fff3e0]" },
];

export default function AdminFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-8 border-t border-[#e8e8e8] bg-white">
      {/* ── Back to Top ── */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#f8f9fa] hover:bg-[#f0f1f3] transition-colors py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-[#666] border-b border-[#e8e8e8]"
      >
        <ChevronUp className="w-3.5 h-3.5" />
        Back to top
      </button>

      {/* ── Quick Stats Row ── */}
      <div className="bg-[#fafafa] border-b border-[#e8e8e8]">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {systemStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-[#e8e8e8] p-3 flex items-center gap-3 hover:shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-[#999] font-medium">{stat.label}</p>
                  <p className="text-base font-black text-[#1a1a1a]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Link Columns ── */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#999] mb-3 pb-2 border-b border-[#e8e8e8]">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-xs font-bold text-[#666] hover:text-[#ff4f8b] transition-colors group"
                    >
                      <link.icon className="w-3.5 h-3.5 text-[#bbb] group-hover:text-[#ff4f8b] transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-[#e8e8e8]" />

      {/* ── Bottom Bar ── */}
      <div className="mx-auto w-full max-w-[1200px] px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Brand + Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#ff4f8b] flex items-center justify-center">
                <span className="text-white font-black text-[11px]">F</span>
              </div>
              <div>
                <span className="font-bold text-sm text-[#1a1a1a]">Admin Panel</span>
                <span className="text-[10px] text-[#999] ml-2">v3.2.1</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#0c831f] bg-[#e8f5e9] px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c831f] stock-pulse" />
              All systems operational
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-[#0c831f] hover:text-[#ff4f8b] transition-colors border-r border-[#e8e8e8] pr-4">
              <Zap className="w-3.5 h-3.5" />
              Storefront
            </Link>
            <Link href="/admin/support/tickets" className="flex items-center gap-1.5 text-xs font-bold text-[#666] hover:text-[#ff4f8b] transition-colors">
              <Headphones className="w-3.5 h-3.5" />
              Support
            </Link>
            <Link href="/docs" className="flex items-center gap-1.5 text-xs font-bold text-[#666] hover:text-[#ff4f8b] transition-colors">
              <BookOpen className="w-3.5 h-3.5" />
              Docs
            </Link>
          </div>
        </div>

        {/* ── System Meta ── */}
        <div className="mt-3 pt-3 border-t border-dashed border-[#e8e8e8] flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#bbb]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c831f]" />
              Node v20.11.0
            </span>
            <span>Next.js 15.x</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1565c0]" />
              DB Connected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e65100]" />
              Redis Active
            </span>
            <span>Uptime 99.97%</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#999]">
            <ShieldCheck className="w-3 h-3 text-[#0c831f]" />
            <span>SSL Secured</span>
            <span className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
            <span>&copy; 2026 FMCG Commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
