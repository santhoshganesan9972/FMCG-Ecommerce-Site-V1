"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Boxes,
  Package,
  ShoppingCart,
  Users,
  Percent,
  BarChart3,
  Store,
  Truck,
  Settings,
  ChevronDown,
  Image,
  Hash,
  History,
  Upload,
  Tags,
  DollarSign,
  PanelLeftClose,
  PanelLeft,
  Warehouse,
  RefreshCw,
  Clock,
  TrendingUp,
  UserCheck,
  Headphones,
  ShieldAlert,
  Ticket,
  Zap,
  Megaphone,
  Bell,
  FlaskConical,
  FileText,
  FileSearch,
  Banknote,
  MapPin,
  Navigation,
  CreditCard,
  Landmark,
  Flag,
  Layers,
  MoveHorizontal,
  Activity,
  UserPlus,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────

interface SubMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  caption?: string;
  submenu?: SubMenuItem[];
}

// ── Menu Configuration ───────────────────────────────────

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
    caption: "Overview & KPIs",
  },
  {
    icon: Package,
    label: "Products",
    href: "/admin/products",
    caption: "Catalog & inventory",
    submenu: [
      { icon: Package, label: "Product Management", href: "/admin/products" },
      { icon: Tags, label: "Category Management", href: "/admin/products/categories" },
      { icon: DollarSign, label: "Pricing Management", href: "/admin/products/pricing" },
      { icon: Image, label: "Product Media", href: "/admin/products/media" },
      { icon: Hash, label: "SEO Management", href: "/admin/products/seo" },
      { icon: Upload, label: "Bulk Import", href: "/admin/products/bulk-import" },
      { icon: History, label: "Audit Logs", href: "/admin/products/audit-logs" },
    ],
  },
  {
    icon: Boxes,
    label: "Inventory",
    href: "/admin/inventory",
    caption: "Stock & warehouses",
    submenu: [
      { icon: Boxes, label: "Stock Management", href: "/admin/inventory" },
      { icon: Warehouse, label: "Warehouses", href: "/admin/inventory/warehouses" },
      { icon: MoveHorizontal, label: "Stock Transfers", href: "/admin/inventory/stock-transfers" },
      { icon: ShieldAlert, label: "Safety Stock", href: "/admin/inventory/safety-stock" },
      { icon: Clock, label: "FEFO Dashboard", href: "/admin/inventory/fefo" },
      { icon: TrendingUp, label: "Forecast Dashboard", href: "/admin/inventory/forecast" },
    ],
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    href: "/admin/orders",
    caption: "Order management",
    submenu: [
      { icon: ShoppingCart, label: "Order Management", href: "/admin/orders" },
      { icon: Clock, label: "Timeline", href: "/admin/orders/timeline" },
      { icon: Activity, label: "Status Management", href: "/admin/orders/status-management" },
      { icon: UserPlus, label: "Assign Partner", href: "/admin/orders/assign-partner" },
      { icon: RefreshCw, label: "Substitutions", href: "/admin/orders/substitutions" },
      { icon: Layers, label: "Bulk Processing", href: "/admin/orders/bulk-processing" },
    ],
  },
  {
    icon: Users,
    label: "Customers",
    href: "/admin/customers",
    caption: "Customer profiles",
    submenu: [
      { icon: Users, label: "Customer Profiles", href: "/admin/customers" },
      { icon: UserCheck, label: "Segmentation", href: "/admin/customers/segmentation" },
      { icon: TrendingUp, label: "Analytics", href: "/admin/customers/analytics" },
      { icon: Headphones, label: "Support Tickets", href: "/admin/customers/support-tickets" },
      { icon: ShieldAlert, label: "Fraud Detection", href: "/admin/customers/fraud-detection" },
    ],
  },
  {
    icon: Percent,
    label: "Promotions",
    href: "/admin/promotions",
    caption: "Offers & coupons",
    submenu: [
      { icon: Percent, label: "Promotions", href: "/admin/promotions" },
      { icon: Ticket, label: "Coupons", href: "/admin/promotions/coupons" },
      { icon: Zap, label: "Flash Sales", href: "/admin/promotions/flash-sales" },
      { icon: Megaphone, label: "Campaign Builder", href: "/admin/promotions/campaign-builder" },
      { icon: Bell, label: "Push Notifications", href: "/admin/promotions/push-notifications" },
      { icon: FlaskConical, label: "A/B Testing", href: "/admin/promotions/ab-testing" },
    ],
  },
  {
    icon: BarChart3,
    label: "Reports",
    href: "/admin/reports",
    caption: "Analytics & insights",
    submenu: [
      { icon: BarChart3, label: "Reports Overview", href: "/admin/reports" },
      { icon: TrendingUp, label: "Sales Reports", href: "/admin/reports/sales" },
      { icon: Boxes, label: "Inventory Reports", href: "/admin/reports/inventory" },
      { icon: Store, label: "Vendor Reports", href: "/admin/reports/vendor" },
      { icon: FileSearch, label: "Tax Reports", href: "/admin/reports/tax" },
    ],
  },
  {
    icon: Store,
    label: "Vendors",
    href: "/admin/vendors",
    caption: "Supplier network",
    submenu: [
      { icon: Store, label: "Vendors", href: "/admin/vendors" },
      { icon: UserPlus, label: "Vendor Onboarding", href: "/admin/vendors/onboarding" },
      { icon: Package, label: "Vendor Products", href: "/admin/vendors/products" },
      { icon: Banknote, label: "Settlements", href: "/admin/vendors/settlements" },
      { icon: Activity, label: "Analytics", href: "/admin/vendors/analytics" },
    ],
  },
  {
    icon: Truck,
    label: "Delivery",
    href: "/admin/delivery",
    caption: "Logistics & zones",
    submenu: [
      { icon: Truck, label: "Delivery Dashboard", href: "/admin/delivery" },
      { icon: Users, label: "Delivery Partners", href: "/admin/delivery/partners" },
      { icon: MapPin, label: "Live Tracking", href: "/admin/delivery/live-tracking" },
      { icon: Truck, label: "Fleet Dashboard", href: "/admin/delivery/fleet" },
      { icon: Navigation, label: "Route Optimization", href: "/admin/delivery/route-optimization" },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    caption: "Configuration",
    submenu: [
      { icon: Settings, label: "Settings", href: "/admin/settings" },
      { icon: Users, label: "User Management", href: "/admin/settings/users" },
      { icon: ShieldAlert, label: "Roles & Permissions", href: "/admin/settings/roles" },
      { icon: CreditCard, label: "Payment Settings", href: "/admin/settings/payment" },
      { icon: Landmark, label: "GST Settings", href: "/admin/settings/gst" },
      { icon: Bell, label: "Notification Settings", href: "/admin/settings/notifications" },
      { icon: Flag, label: "Feature Flags", href: "/admin/settings/feature-flags" },
    ],
  },
];

// ── Sidebar Component ─────────────────────────────────────

export default function SidebarEnterprise() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine active parent menu item (not submenu)
  const activeParent = useMemo(() => {
    const match = menuItems.find(
      (item) =>
        pathname === item.href ||
        (item.submenu && item.submenu.some((sub) => pathname.startsWith(sub.href)))
    );
    return match?.label ?? null;
  }, [pathname]);

  // Toggle accordion: close others, open clicked
  const toggleSection = useCallback((label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  }, []);

  // Auto-open when navigating to a sub-route
  useEffect(() => {
    const parent = menuItems.find(
      (item) =>
        item.submenu && item.submenu.some((sub) => pathname.startsWith(sub.href))
    );
    if (parent && parent.label !== expandedSection) {
      setExpandedSection(parent.label);
    }
  }, [pathname, expandedSection]);

  // Hover-based expand for collapsed state
  const handleMouseEnter = useCallback(
    (label: string) => {
      if (!collapsed) return;
      expandTimerRef.current = setTimeout(() => {
        setHoveredItem(label);
      }, 200);
    },
    [collapsed]
  );

  const handleMouseLeave = useCallback(() => {
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
    }
    setHoveredItem(null);
  }, []);

  // Submenu rendering
  const renderSubmenu = useCallback(
    (submenu: SubMenuItem[], isOpen: boolean) => {
      if (!isOpen) return null;
      return (
        <div className="overflow-hidden animate-slide-down">
          <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-[#e8e8e8] pl-3">
            {submenu.map((sub) => {
              const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + "/");
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                    isSubActive
                      ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                      : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                  }`}
                >
                  <sub.icon className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${
                    isSubActive ? "text-[#0c831f]" : "text-[#999] group-hover:text-[#666]"
                  }`} />
                  <span className="text-sm">{sub.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      );
    },
    [pathname]
  );

  return (
    <>
      {/* Collapsed sidebar (floating) */}
      {collapsed && (
        <aside className="fixed left-0 top-0 z-30 flex h-screen w-16 flex-col items-center border-r border-[#e8e8e8] bg-white py-4 shadow-sm">
          {/* Logo */}
          <Link href="/admin" className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4f8b]">
            <span className="text-sm font-black text-white">F</span>
          </Link>

          {/* Menu icons */}
          <nav className="flex flex-col items-center gap-1 flex-1">
            {menuItems.map((item) => {
              const isActive = activeParent === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#e8f5e9] text-[#0c831f]"
                        : "text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                    }`}
                    title={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>

                  {/* Tooltip */}
                  {hoveredItem === item.label && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50">
                      <div className="rounded-lg bg-[#1a1a1a] px-3 py-1.5 text-xs font-bold text-white shadow-lg whitespace-nowrap">
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1a1a1a]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Expand button */}
          <button
            onClick={() => setCollapsed(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-all"
            title="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </aside>
      )}

      {/* Expanded sidebar */}
      {!collapsed && (
        <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-[#e8e8e8] bg-white md:flex">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#e8e8e8]">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#ff4f8b]">
                <span className="text-sm font-black text-white">F</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">Admin Panel</p>
                <h1 className="mt-0.5 text-sm font-black leading-tight text-[#1a1a1a]">FMCG Commerce</h1>
              </div>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-all"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
            {menuItems.map((item) => {
              const isActive = activeParent === item.label;
              const isExpanded = expandedSection === item.label;
              const hasSubmenu = item.submenu && item.submenu.length > 0;

              return (
                <div key={item.label}>
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSection(item.label)}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                        isActive
                          ? "bg-[#e8f5e9] text-[#0c831f]"
                          : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <span className="block text-sm font-bold leading-tight">{item.label}</span>
                        {item.caption && (
                          <span className="block truncate text-[10px] font-medium opacity-70">{item.caption}</span>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ${
                          isExpanded ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                        isActive
                          ? "bg-[#e8f5e9] text-[#0c831f]"
                          : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-sm font-bold leading-tight">{item.label}</span>
                        {item.caption && (
                          <span className="block truncate text-[10px] font-medium opacity-70">{item.caption}</span>
                        )}
                      </div>
                    </Link>
                  )}

                  {/* Submenu with animation */}
                  {hasSubmenu && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        isExpanded ? "max-h-96 opacity-100 mt-0.5" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-3 border-l-2 border-[#e8e8e8] pl-3 space-y-0.5">
                        {item.submenu!.map((sub) => {
                          const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + "/");
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
                                isSubActive
                                  ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                  : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                              }`}
                            >
                              <sub.icon className={`h-3.5 w-3.5 flex-shrink-0 transition-colors ${
                                isSubActive ? "text-[#0c831f]" : "text-[#999] group-hover:text-[#666]"
                              }`} />
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="border-t border-[#e8e8e8] px-4 py-3 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-[#f6f7f6] px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#0c831f] animate-pulse" />
                <span className="text-xs font-bold text-[#666]">System Online</span>
              </div>
              <span className="text-xs font-bold text-[#0c831f]">99.9%</span>
            </div>
            <div className="flex items-center gap-2.5 px-1">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0c831f] text-xs font-bold text-white">
                SA
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-[#1a1a1a]">Super Admin</p>
                <p className="truncate text-[10px] text-[#999]">admin@fmcg.com</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile sidebar */}
      <MobileSidebar
        menuItems={menuItems}
        pathname={pathname}
        activeParent={activeParent}
        expandedSection={expandedSection}
        toggleSection={toggleSection}
      />
    </>
  );
}

// ── Mobile Sidebar ────────────────────────────────────────

function MobileSidebar({
  menuItems,
  pathname,
  activeParent,
  expandedSection,
  toggleSection,
}: {
  menuItems: MenuItem[];
  pathname: string;
  activeParent: string | null;
  expandedSection: string | null;
  toggleSection: (label: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0c831f] text-white shadow-lg md:hidden"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#e8e8e8]">
              <Link href="/admin" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff4f8b]">
                  <span className="text-xs font-black text-white">F</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">Admin Panel</p>
                  <h1 className="text-xs font-black text-[#1a1a1a]">FMCG Commerce</h1>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#999] hover:bg-[#f6f7f6]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="overflow-y-auto px-3 py-3 space-y-0.5 h-[calc(100vh-60px)]" style={{ scrollbarWidth: "thin" }}>
              {menuItems.map((item) => {
                const isActive = activeParent === item.label;
                const isExpanded = expandedSection === item.label;
                const hasSubmenu = item.submenu && item.submenu.length > 0;

                return (
                  <div key={item.label}>
                    {hasSubmenu ? (
                      <button
                        onClick={() => toggleSection(item.label)}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all ${
                          isActive ? "bg-[#e8f5e9] text-[#0c831f]" : "text-[#666] hover:bg-[#f6f7f6]"
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1 text-sm font-bold">{item.label}</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "" : "-rotate-90"}`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all ${
                          isActive ? "bg-[#e8f5e9] text-[#0c831f]" : "text-[#666] hover:bg-[#f6f7f6]"
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-bold">{item.label}</span>
                      </Link>
                    )}

                    {hasSubmenu && (
                      <div className={`overflow-hidden transition-all duration-200 ${
                        isExpanded ? "max-h-96 mt-0.5" : "max-h-0"
                      }`}>
                        <div className="ml-3 border-l-2 border-[#e8e8e8] pl-3 space-y-0.5">
                          {item.submenu!.map((sub) => {
                            const isSubActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                                  isSubActive ? "bg-[#e8f5e9] text-[#0c831f] font-bold" : "text-[#666] hover:bg-[#f6f7f6]"
                                }`}
                              >
                                <sub.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                <span>{sub.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
