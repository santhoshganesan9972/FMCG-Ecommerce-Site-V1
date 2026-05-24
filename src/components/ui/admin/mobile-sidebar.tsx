"use client";

/* eslint-disable @typescript-eslint/no-explicit-any -- Optional submenu fields live outside the base MenuItem type */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Boxes,
  Folder,
  LayoutDashboard,
  List,
  Settings,
  Store,
  Tag,
  Truck,
  Users,
  User,
  MapPin,
  Percent,
  FlaskConical,
  Copy,
  Timer,
  Clock,
  PlusCircle,
  MinusCircle,
  Bell,
  Mail,
  MessageSquare,
  Send,
  Headphones,
  Ticket,
  History,
  UserCheck,
  Globe,
  Shield,
  Gift,
  Award,
  TrendingUp,
  ScrollText,
  Menu,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  ArrowLeftRight,
  Zap,
  Wallet,
  CreditCard,
  FileText,
  BrainCircuit,
  Building2,
  TrendingUp as TrendingUpIcon,
  Search,
  DollarSign,
  ShoppingCart,
  Layout,
  Link2,
  Lock,
  Newspaper,
  HelpCircle,
  Image,
  FileSpreadsheet,
  ShieldCheck,
  CalendarClock,
  Activity,
  Cpu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function getSectionKey(item: { label: string }): string {
  return item.label.toLowerCase().replace(/[^a-z]/g, "_");
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
    caption: "Live control room",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/users",
    caption: "Admin & customers",
  },
  {
    icon: Boxes,
    label: "Inventory",
    href: "/admin/inventory",
    caption: "Stock and catalog",
  },
  {
    icon: List,
    label: "Orders",
    href: "/admin/orders",
    caption: "Order management",
  },
  {
    icon: User,
    label: "Customers",
    href: "/admin/customers",
    caption: "Customer profiles",
  },
  {
    icon: Folder,
    label: "Categories",
    href: "/admin/categories",
    caption: "Product classification",
  },
  {
    icon: Store,
    label: "Vendors",
    href: "/admin/vendors",
    caption: "Partner network",
  },
  {
    icon: MapPin,
    label: "Delivery",
    href: "/admin/delivery",
    caption: "Delivery partner management",
  },
  {
    icon: Tag,
    label: "Promotions",
    href: "/admin/promotions",
    caption: "Campaigns, coupons & offers",
  },
  {
    icon: CreditCard,
    label: "Subscription Management",
    href: "/admin/subscription",
    caption: "Plans, recurring billing & management",
  },
  {
    icon: Building2,
    label: "Tenants",
    href: "/admin/tenants",
    caption: "Multi-tenant SaaS management",
  },
  {
    icon: Wallet,
    label: "Finance & Payments",
    href: "/admin/finance",
    caption: "Transactions, settlements & reports",
    hasSubmenu: true,
    submenu: [
      { icon: CreditCard, label: "Payments", href: "/admin/finance/payments" },
      { icon: FileText, label: "Transactions", href: "/admin/finance/transactions" },
      { icon: Zap, label: "Failed Payments", href: "/admin/finance/failed-payments" },
      { icon: Wallet, label: "Wallet", href: "/admin/finance/wallet" },
      { icon: CreditCard, label: "Refunds", href: "/admin/finance/refunds" },
      { icon: Store, label: "Vendor Settlements", href: "/admin/finance/vendor-settlements" },
    ],
    reportsSubmenu: [
      { icon: FileText, label: "GST Reports", href: "/admin/finance/reports/gst" },
      { icon: FileText, label: "Tax Reports", href: "/admin/finance/reports/tax" },
      { icon: FileText, label: "Revenue Reports", href: "/admin/finance/reports/revenue" },
    ],
  },
  {
    icon: RotateCcw,
    label: "Returns & Refunds",
    href: "/admin/returns",
    caption: "Returns, pickups & refunds",
    hasSubmenu: true,
    submenu: [
      { icon: ArrowLeftRight, label: "Return Requests", href: "/admin/returns" },
      { icon: FileText, label: "Analytics", href: "/admin/returns/analytics" },
    ],
  },
  {
    icon: Award,
    label: "Loyalty Management",
    href: "/admin/loyalty",
    caption: "Points, tiers & rewards",
    hasSubmenu: true,
    submenu: [
      { icon: Award, label: "Overview", href: "/admin/loyalty" },
      { icon: PlusCircle, label: "Add Points", href: "/admin/loyalty/add-points" },
      { icon: MinusCircle, label: "Deduct Points", href: "/admin/loyalty/deduct-points" },
      { icon: Gift, label: "Tiers", href: "/admin/loyalty/tiers" },
      { icon: Settings, label: "Rules", href: "/admin/loyalty/rules" },
      { icon: FileText, label: "Transactions", href: "/admin/loyalty/transactions" },
      { icon: Clock, label: "Expirations", href: "/admin/loyalty/expirations" },
    ],
  },
  {
    icon: Bell,
    label: "Notification Center",
    href: "/admin/notifications",
    caption: "Campaigns, templates & analytics",
    hasSubmenu: true,
    submenu: [
      { icon: Bell, label: "Overview", href: "/admin/notifications" },
      { icon: Send, label: "Send Notification", href: "/admin/notifications/send" },
      { icon: Clock, label: "Scheduled", href: "/admin/notifications/scheduled" },
      { icon: FileText, label: "Templates", href: "/admin/notifications/templates" },
      { icon: Settings, label: "Channels", href: "/admin/notifications/channels" },
      { icon: BarChart3, label: "Analytics", href: "/admin/notifications/analytics" },
      { icon: RotateCcw, label: "Retry Failed", href: "/admin/notifications/retry" },
    ],
  },
  {
    icon: BrainCircuit,
    label: "AI Management",
    href: "/admin/ai",
    caption: "ML models & automation",
    hasSubmenu: true,
    submenu: [
      { icon: TrendingUpIcon, label: "Recommendation Tuning", href: "/admin/ai/recommendation-tuning" },
      { icon: Search, label: "Search Ranking", href: "/admin/ai/search-ranking" },
      { icon: DollarSign, label: "Dynamic Pricing", href: "/admin/ai/dynamic-pricing" },
      { icon: BarChart3, label: "Demand Forecast", href: "/admin/ai/demand-forecast" },
      { icon: ShoppingCart, label: "Reorder Prediction", href: "/admin/ai/reorder-prediction" },
      { icon: Cpu, label: "Model Health", href: "/admin/ai/model-health" },
    ],
  },
  {
    icon: ScrollText,
    label: "CMS Management",
    href: "/admin/cms",
    caption: "Content & pages",
    hasSubmenu: true,
    submenu: [
      { icon: Image, label: "Homepage Banners", href: "/admin/cms/banners" },
      { icon: Image, label: "Hero Slider", href: "/admin/cms/hero-slider" },
      { icon: Layout, label: "Landing Pages", href: "/admin/cms/landing-pages" },
      { icon: Link2, label: "Footer Links", href: "/admin/cms/footer-links" },
      { icon: Newspaper, label: "Blogs", href: "/admin/cms/blogs" },
      { icon: HelpCircle, label: "FAQ", href: "/admin/cms/faq" },
      { icon: FileSpreadsheet, label: "Terms & Conditions", href: "/admin/cms/terms" },
      { icon: ShieldCheck, label: "Privacy Policy", href: "/admin/cms/privacy-policy" },
    ],
    scheduleSubmenu: [
      { icon: CalendarClock, label: "Schedule Publish", href: "/admin/cms/schedule" },
    ],
  },
  {
    icon: Headphones,
    label: "Support Center",
    href: "/admin/support",
    caption: "Tickets, agents & live chat",
    hasSubmenu: true,
    submenu: [
      { icon: Headphones, label: "Overview", href: "/admin/support" },
      { icon: Ticket, label: "All Tickets", href: "/admin/support/tickets" },
      { icon: PlusCircle, label: "Create Ticket", href: "/admin/support/tickets/create" },
      { icon: UserCheck, label: "Agents", href: "/admin/support/agents" },
      { icon: History, label: "History", href: "/admin/support/history" },
    ],
  },
  {
    icon: ScrollText,
    label: "Audit Logs",
    href: "/admin/audit-logs",
    caption: "Security event tracking",
    hasSubmenu: true,
    submenu: [
      { icon: ScrollText, label: "Log List", href: "/admin/audit-logs" },
      { icon: Settings, label: "Settings", href: "/admin/audit-logs/settings" },
    ],
  },
  {
    icon: Activity,
    label: "System Monitoring",
    href: "/admin/monitoring",
    caption: "API, servers, database, queues & alerts",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    caption: "Full platform configuration",
    hasSubmenu: true,
    submenu: [
      { icon: Settings, label: "General", href: "/admin/settings/general" },
      { icon: Store, label: "Store", href: "/admin/settings/store" },
      { icon: Globe, label: "Localization", href: "/admin/settings/localization" },
      { icon: TrendingUp, label: "SEO", href: "/admin/settings/seo" },
    ],
    paymentsSubmenu: [
      { icon: CreditCard, label: "Payment", href: "/admin/settings/payment" },
      { icon: Percent, label: "Tax", href: "/admin/settings/tax" },
      { icon: MapPin, label: "Delivery", href: "/admin/settings/delivery" },
      { icon: Bell, label: "Notifications", href: "/admin/settings/notification" },
    ],
    communicationSubmenu: [
      { icon: Mail, label: "Email", href: "/admin/settings/email" },
      { icon: MessageSquare, label: "SMS & WhatsApp", href: "/admin/settings/sms-whatsapp" },
    ],
    securitySubmenu: [
      { icon: Shield, label: "Security", href: "/admin/settings/security" },
      { icon: Users, label: "User & Auth", href: "/admin/settings/user-auth" },
      { icon: Lock, label: "Roles & Permissions", href: "/admin/settings/roles" },
    ],
    advancedSubmenu: [
      { icon: Gift, label: "Loyalty", href: "/admin/settings/loyalty" },
      { icon: Folder, label: "Storage", href: "/admin/settings/storage" },
      { icon: Zap, label: "API & Integration", href: "/admin/settings/api-integration" },
    ],
    systemSubmenu: [
      { icon: FlaskConical, label: "Feature Flags", href: "/admin/settings/feature-flags" },
      { icon: Copy, label: "Backup & Restore", href: "/admin/settings/backup" },
      { icon: FileText, label: "System", href: "/admin/settings/system" },
    ],
  },
];

const initialExpanded: Record<string, boolean> = {};

export default function MobileSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(initialExpanded);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8e8e8] text-[#666] transition-colors hover:bg-[#f2f2f2] md:hidden">
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="border-[#e8e8e8] bg-white text-[#1a1a1a]">
        <div className="mt-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4f8b]">
            <span className="text-sm font-black text-white">F</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
              Admin Panel
            </p>
            <h2 className="text-sm font-black">FMCG Commerce</h2>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const sectionKey = getSectionKey(item);
            const isExpanded = !!expandedSections[sectionKey];

            if (item.hasSubmenu) {
              return (
                <div key={item.href} className="overflow-hidden space-y-1">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-[#e8f5e9] text-[#0c831f] shadow-sm"
                        : "text-[#666] hover:bg-[#fff0f6] hover:text-[#1a1a1a]"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block text-sm font-black leading-tight">
                        {item.label}
                      </span>
                      <span className="block truncate text-[10px] font-semibold opacity-70">
                        {item.caption}
                      </span>
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 flex-shrink-0 transition-transform duration-200" />
                    )}
                  </button>
                  <div
                    style={{ display: isExpanded ? "block" : "none" }}
                    className={isExpanded ? "mt-1 space-y-1" : ""}
                  >
                    <div
                      style={{
                        animation: isExpanded
                          ? "sidebarSlideDown 0.22s ease forwards"
                          : "none",
                      }}
                    >
                      <div className="ml-3 space-y-1">
                        {item.submenu?.map((subItem) => {
                          const subActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
                                subActive
                                  ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                  : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                              }`}
                            >
                              <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="text-sm">{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                      {Boolean((item as any).reportsSubmenu) && (
                        <>
                          <div className="border-t border-[#e8e8e8] my-2 ml-3" />
                          <p className="mb-1 ml-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                            Reports
                          </p>
                          <div className="ml-3 space-y-1">
                            {((item as any).reportsSubmenu as Array<{ icon: any; label: string; href: string }>).map(
                              (reportItem) => {
                                const reportActive = pathname === reportItem.href;
                                return (
                                  <Link
                                    key={reportItem.href}
                                    href={reportItem.href}
                                    className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                      reportActive
                                        ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                        : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                                    }`}
                                  >
                                    <reportItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="text-sm">{reportItem.label}</span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}
                      {Boolean((item as any).paymentsSubmenu) && (
                        <>
                          <div className="border-t border-[#e8e8e8] my-2 ml-3" />
                          <p className="mb-1 ml-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                            Payments &amp; Ops
                          </p>
                          <div className="ml-3 space-y-1">
                            {((item as any).paymentsSubmenu as Array<{ icon: any; label: string; href: string }>).map(
                              (subItem) => {
                                const subActive = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                      subActive
                                        ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                        : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                                    }`}
                                  >
                                    <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="text-sm">{subItem.label}</span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}
                      {Boolean((item as any).communicationSubmenu) && (
                        <>
                          <div className="border-t border-[#e8e8e8] my-2 ml-3" />
                          <p className="mb-1 ml-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                            Communication
                          </p>
                          <div className="ml-3 space-y-1">
                            {((item as any).communicationSubmenu as Array<{ icon: any; label: string; href: string }>).map(
                              (subItem) => {
                                const subActive = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                      subActive
                                        ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                        : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                                    }`}
                                  >
                                    <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="text-sm">{subItem.label}</span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}
                      {Boolean((item as any).securitySubmenu) && (
                        <>
                          <div className="border-t border-[#e8e8e8] my-2 ml-3" />
                          <p className="mb-1 ml-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                            Security &amp; Users
                          </p>
                          <div className="ml-3 space-y-1">
                            {((item as any).securitySubmenu as Array<{ icon: any; label: string; href: string }>).map(
                              (subItem) => {
                                const subActive = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                      subActive
                                        ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                        : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                                    }`}
                                  >
                                    <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="text-sm">{subItem.label}</span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}
                      {Boolean((item as any).advancedSubmenu) && (
                        <>
                          <div className="border-t border-[#e8e8e8] my-2 ml-3" />
                          <p className="mb-1 ml-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                            Advanced
                          </p>
                          <div className="ml-3 space-y-1">
                            {((item as any).advancedSubmenu as Array<{ icon: any; label: string; href: string }>).map(
                              (subItem) => {
                                const subActive = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                      subActive
                                        ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                        : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                                    }`}
                                  >
                                    <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="text-sm">{subItem.label}</span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}
                      {Boolean((item as any).systemSubmenu) && (
                        <>
                          <div className="border-t border-[#e8e8e8] my-2 ml-3" />
                          <p className="mb-1 ml-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                            System
                          </p>
                          <div className="ml-3 space-y-1">
                            {((item as any).systemSubmenu as Array<{ icon: any; label: string; href: string }>).map(
                              (subItem) => {
                                const subActive = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className={`flex min-h-[40px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                      subActive
                                        ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                        : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                                    }`}
                                  >
                                    <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="text-sm">{subItem.label}</span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-black ${
                  isActive
                    ? "bg-[#e8f5e9] text-[#0c831f]"
                    : "text-[#666] hover:bg-[#fff0f6]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
