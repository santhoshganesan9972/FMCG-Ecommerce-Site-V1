"use client";

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
  Lock,
  Gift,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  ArrowLeftRight,
  Zap,
  Wallet,
  CreditCard,
  FileText,
  X,
  Image,
  Layout,
  Link2,
  Newspaper,
  HelpCircle,
  FileSpreadsheet,
  ShieldCheck,
  CalendarClock,
  ScrollText,
  BrainCircuit,
  Search,
  Building2,
  DollarSign,
  TrendingUp as TrendingUpIcon,
  ShoppingCart,
  Activity,
  Cpu,
  GitBranch,
  QrCode,
  ClipboardList,
  Megaphone,
  Bike,
  Smartphone,
  Terminal,
} from "lucide-react";

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
  // ── NEW ADMIN SECTIONS ──
  {
    icon: FileText,
    label: "Product Management",
    href: "/admin/products",
    caption: "Catalog, variants, SEO & bulk upload",
  },
  {
    icon: BarChart3,
    label: "Reports & Analytics",
    href: "/admin/reports",
    caption: "Revenue, customers, vendors & orders",
  },
  {
    icon: MapPin,
    label: "Delivery Zones",
    href: "/admin/delivery-zones",
    caption: "Radius, fees & zone management",
  },
  {
    icon: Building2,
    label: "Warehouses",
    href: "/admin/warehouses",
    caption: "Hubs, cold storage & depots",
  },
  {
    icon: Search,
    label: "Search Management",
    href: "/admin/search",
    caption: "Keywords, synonyms & trending",
  },
  {
    icon: Shield,
    label: "Fraud & Risk",
    href: "/admin/fraud-risk",
    caption: "Scores, flags & blacklist",
  },
  {
    icon: Image,
    label: "Media Library",
    href: "/admin/media",
    caption: "Images, videos & documents",
  },
  {
    icon: Smartphone,
    label: "Device Management",
    href: "/admin/devices",
    caption: "Active sessions & devices",
  },
  {
    icon: Store,
    label: "Pickup Stores",
    href: "/admin/pickup-stores",
    caption: "Store locations & timing",
  },
  {
    icon: Lock,
    label: "Data Privacy",
    href: "/admin/data-privacy",
    caption: "Consent, export & deletion",
  },
  {
    icon: FileSpreadsheet,
    label: "Templates",
    href: "/admin/templates",
    caption: "Email, SMS & WhatsApp templates",
  },
  {
    icon: QrCode,
    label: "Barcode Management",
    href: "/admin/barcodes",
    caption: "Scan, map & generate barcodes",
  },
  {
    icon: ClipboardList,
    label: "Purchase Orders",
    href: "/admin/purchase-orders",
    caption: "Supplier orders & approvals",
  },
  {
    icon: ArrowLeftRight,
    label: "Stock Transfers",
    href: "/admin/stock-transfers",
    caption: "Transfer requests & history",
  },
  {
    icon: ShoppingCart,
    label: "Abandoned Carts",
    href: "/admin/abandoned-carts",
    caption: "Recovery campaigns & reminders",
  },
  {
    icon: BrainCircuit,
    label: "Business Intelligence",
    href: "/admin/bi",
    caption: "Insights, predictions & analytics",
  },
  {
    icon: Activity,
    label: "Queue & Jobs",
    href: "/admin/queue-jobs",
    caption: "Notification, order & report queues",
  },
  {
    icon: Megaphone,
    label: "Campaigns",
    href: "/admin/campaigns",
    caption: "Push, email & banner campaigns",
  },
  {
    icon: Bike,
    label: "Delivery Partners",
    href: "/admin/delivery-partners",
    caption: "Riders, shifts & earnings",
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
    developerSubmenu: [
      { icon: GitBranch, label: "Git Integration", href: "/admin/developer/git" },
      { icon: Terminal, label: "Logs", href: "/admin/developer/logs" },
      { icon: Globe, label: "Environment Variables", href: "/admin/developer/env" },
      { icon: Activity, label: "Health Checks", href: "/admin/developer/health" },
    ],
  },
];

function getSectionKey(item: { label: string }): string {
  return item.label.toLowerCase().replace(/[^a-z]/g, "_");
}

/**
 * Build the initial expanded-state object using getSectionKey().
 *
 * getSectionKey strips everything below a-zA-Z with a single RegExp, so label
 * "Finance & Payments" → "finance___payments" (ampersand + two spaces → 3×"_"),
 * "Loyalty Management"       → "loyalty___management", etc.
 *
 * Computing the keys from the SAME helper the toggle uses guarantees the keys
 * the initial state populates are identical to the keys the click handler will
 * later flip — eliminating any mismatch between hard-coded and computed keys.
 */
const initialExpanded: Record<string, boolean> = {};
(
  [
    "Finance & Payments",
    "Returns & Refunds",
    "Notification Center",
    "Support Center",
    "Settings",
    "Loyalty Management",
    "CMS Management",
    "AI Management",
    "Audit Logs",
  ] as const
).forEach((label) => {
  initialExpanded[getSectionKey({ label })] = true;
});
const DEFAULT_EXPANDED_SECTIONS: Record<string, boolean> = initialExpanded;

const quickStats = [
  { icon: Truck, label: "Riders online", value: "42" },
  { icon: BarChart3, label: "SLA today", value: "96%" },
];

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    DEFAULT_EXPANDED_SECTIONS,
  );

  const pathname = usePathname();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-[#e8e8e8] bg-white p-4 md:flex">
      <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#ff4f8b]">
          <span className="text-sm font-black text-white">F</span>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
            Admin Panel
          </p>
          <h1 className="mt-0.5 text-sm font-black leading-tight text-[#1a1a1a]">
            FMCG Commerce
          </h1>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const sectionKey = getSectionKey(item);
          const isExpanded = !!expandedSections[sectionKey];

          if (item.hasSubmenu) {
            return (
              <div key={item.href} className="overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 btn-press ${
                    isActive
                      ? "bg-[#e8f5e9] text-[#0c831f] shadow-sm"
                      : "text-[#666] hover:bg-[#fff0f6] hover:text-[#1a1a1a]"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="min-w-0 flex-1">
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

                {/* Submenu Items – hidden when collapsed, shown when expanded */}
                <div
                  style={{
                    display: isExpanded ? "block" : "none",
                  }}
                  className="sidebar-submenu ml-4 mt-1 space-y-1"
                >
                  {/* ── Main submenu ─────────────────────────────── */}
                  <div className="space-y-1">
                    {item.submenu?.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
                            isSubActive
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

                  {/* ── Schedule submenu ─────────────────────────── */}
                  {item.scheduleSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                        Publishing
                      </p>
                      <div className="space-y-1">
                        {item.scheduleSubmenu.map((scheduleItem) => {
                          const isScheduleActive = pathname === scheduleItem.href;
                          return (
                            <Link
                              key={scheduleItem.href}
                              href={scheduleItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isScheduleActive
                                  ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                  : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                              }`}
                            >
                              <scheduleItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="text-sm">{scheduleItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* ── Reports submenu ─────────────────────────── */}
                  {item.reportsSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">
                        Reports
                      </p>
                      <div className="space-y-1">
                        {item.reportsSubmenu.map((reportItem) => {
                          const isReportActive = pathname === reportItem.href;
                          return (
                            <Link
                              key={reportItem.href}
                              href={reportItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isReportActive
                                  ? "bg-[#e8f5e9] text-[#0c831f] font-bold"
                                  : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
                              }`}
                            >
                              <reportItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                              <span className="text-sm">{reportItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* ── Settings grouped submenus (all at same level) ── */}
                  {item.paymentsSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">Payments &amp; Ops</p>
                      <div className="space-y-1">
                        {item.paymentsSubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isSubActive
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
                    </>
                  )}

                  {item.communicationSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">Communication</p>
                      <div className="space-y-1">
                        {item.communicationSubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isSubActive
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
                    </>
                  )}

                  {item.securitySubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">Security &amp; Users</p>
                      <div className="space-y-1">
                        {item.securitySubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isSubActive
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
                    </>
                  )}

                  {item.advancedSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">Advanced</p>
                      <div className="space-y-1">
                        {item.advancedSubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isSubActive
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
                    </>
                  )}

                  {item.systemSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">System</p>
                      <div className="space-y-1">
                        {item.systemSubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isSubActive
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
                    </>
                  )}

                  {item.developerSubmenu && (
                    <>
                      <div className="border-t border-[#e8e8e8] my-2" />
                      <p className="px-3 text-[10px] font-black uppercase tracking-wide text-[#666]">Developer Tools</p>
                      <div className="space-y-1">
                        {item.developerSubmenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                                isSubActive
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
                    </>
                  )}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 btn-press ${
                isActive
                  ? "bg-[#e8f5e9] text-[#0c831f] shadow-sm"
                  : "text-[#666] hover:bg-[#fff0f6] hover:text-[#1a1a1a]"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="min-w-0">
                <span className="block text-sm font-black leading-tight">
                  {item.label}
                </span>
                <span className="block truncate text-[10px] font-semibold opacity-70">
                  {item.caption}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-[#e8e8e8] pt-4">
        {quickStats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl bg-[#f6f7f6] px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#0c831f]" />
              <span className="text-xs font-bold text-[#666]">{label}</span>
            </div>
            <span className="text-xs font-black text-[#1a1a1a]">{value}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 px-2 pt-2">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0c831f] text-sm font-black text-white">
            S
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-[#1a1a1a]">
              Super Admin
            </p>
            <p className="truncate text-[10px] text-[#999]">admin@fmcg.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
