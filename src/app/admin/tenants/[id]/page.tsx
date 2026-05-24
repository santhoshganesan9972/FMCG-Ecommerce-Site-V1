"use client";

import Link from "next/link";
import DashboardLayout from "../../dashboard-layout";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  Trash2,
  UserPlus,
  Minus,
  Globe,
  Palette,
  Zap,
  CreditCard,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ExternalLink,
  Eye,
  Layout,
  Settings,
  Save,
  Filter,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type TenantStatus = "active" | "trial" | "suspended" | "past_due";
type SubscriptionTier = "starter" | "growth" | "enterprise";

interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo: string;
  status: TenantStatus;
  tier: SubscriptionTier;
  planPrice: number;
  billingCycle: "monthly" | "yearly";
  usersCount: number;
  storageUsed: string;
  created: string;
  expiresAt: string;
  features: {
    aiForecast: boolean;
    multiWarehouse: boolean;
    customBranding: boolean;
    apiAccess: boolean;
    advancedAnalytics: boolean;
    whiteLabel: boolean;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    favicon: string;
    storeName: string;
    tagline: string;
  };
}

interface ActivityEvent {
  id: string;
  type: "order" | "user" | "payment" | "feature" | "domain" | "branding" | "settings" | "alert";
  description: string;
  detail: string;
  timestamp: string;
  user: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

interface AnalyticsMetric {
  label: string;
  value: string;
  change: number;
  period: string;
  icon: React.ReactNode;
  color: string;
}

// ── Mock Data ────────────────────────────────────────────────
const tenants: Tenant[] = [
  {
    id: "TNT-001",
    name: "FreshMart",
    domain: "freshmart.fmcg.com",
    logo: "FM",
    status: "active",
    tier: "enterprise",
    planPrice: 24999,
    billingCycle: "yearly",
    usersCount: 45,
    storageUsed: "12.4 GB",
    created: "Jan 15, 2025",
    expiresAt: "Jan 15, 2027",
    features: {
      aiForecast: true,
      multiWarehouse: true,
      customBranding: true,
      apiAccess: true,
      advancedAnalytics: true,
      whiteLabel: true,
    },
    branding: {
      primaryColor: "#0c831f",
      secondaryColor: "#ff4f8b",
      accentColor: "#2563eb",
      favicon: "/favicon-fm.ico",
      storeName: "FreshMart",
      tagline: "Fresh groceries, delivered fast",
    },
  },
  {
    id: "TNT-002",
    name: "QuickShop",
    domain: "quickshop.fmcg.com",
    logo: "QS",
    status: "active",
    tier: "growth",
    planPrice: 9999,
    billingCycle: "monthly",
    usersCount: 18,
    storageUsed: "5.2 GB",
    created: "Mar 22, 2025",
    expiresAt: "Mar 22, 2026",
    features: {
      aiForecast: true,
      multiWarehouse: false,
      customBranding: true,
      apiAccess: true,
      advancedAnalytics: false,
      whiteLabel: false,
    },
    branding: {
      primaryColor: "#2563eb",
      secondaryColor: "#d97706",
      accentColor: "#0c831f",
      favicon: "/favicon-qs.ico",
      storeName: "QuickShop",
      tagline: "Your daily needs, instantly",
    },
  },
  {
    id: "TNT-003",
    name: "DailyCart",
    domain: "dailycart.fmcg.com",
    logo: "DC",
    status: "trial",
    tier: "starter",
    planPrice: 4999,
    billingCycle: "monthly",
    usersCount: 5,
    storageUsed: "1.8 GB",
    created: "May 01, 2026",
    expiresAt: "Jun 01, 2026",
    features: {
      aiForecast: false,
      multiWarehouse: false,
      customBranding: false,
      apiAccess: false,
      advancedAnalytics: false,
      whiteLabel: false,
    },
    branding: {
      primaryColor: "#9333ea",
      secondaryColor: "#0891b2",
      accentColor: "#0c831f",
      favicon: "/favicon-dc.ico",
      storeName: "DailyCart",
      tagline: "Cart full of happiness",
    },
  },
  {
    id: "TNT-004",
    name: "GreenBasket",
    domain: "greenbasket.fmcg.com",
    logo: "GB",
    status: "active",
    tier: "growth",
    planPrice: 9999,
    billingCycle: "yearly",
    usersCount: 22,
    storageUsed: "7.6 GB",
    created: "Feb 10, 2025",
    expiresAt: "Feb 10, 2026",
    features: {
      aiForecast: true,
      multiWarehouse: false,
      customBranding: true,
      apiAccess: true,
      advancedAnalytics: false,
      whiteLabel: false,
    },
    branding: {
      primaryColor: "#16a34a",
      secondaryColor: "#dc2626",
      accentColor: "#ca8a04",
      favicon: "/favicon-gb.ico",
      storeName: "GreenBasket",
      tagline: "Eco-friendly groceries",
    },
  },
  {
    id: "TNT-005",
    name: "SuperSave",
    domain: "supersave.fmcg.com",
    logo: "SS",
    status: "suspended",
    tier: "starter",
    planPrice: 4999,
    billingCycle: "monthly",
    usersCount: 8,
    storageUsed: "3.1 GB",
    created: "Aug 05, 2025",
    expiresAt: "Aug 05, 2026",
    features: {
      aiForecast: false,
      multiWarehouse: false,
      customBranding: false,
      apiAccess: false,
      advancedAnalytics: false,
      whiteLabel: false,
    },
    branding: {
      primaryColor: "#dc2626",
      secondaryColor: "#2563eb",
      accentColor: "#16a34a",
      favicon: "/favicon-ss.ico",
      storeName: "SuperSave",
      tagline: "More savings, every day",
    },
  },
  {
    id: "TNT-006",
    name: "MetroGrocer",
    domain: "metrogrocer.fmcg.com",
    logo: "MG",
    status: "past_due",
    tier: "growth",
    planPrice: 9999,
    billingCycle: "monthly",
    usersCount: 15,
    storageUsed: "4.3 GB",
    created: "Apr 18, 2025",
    expiresAt: "Apr 18, 2026",
    features: {
      aiForecast: true,
      multiWarehouse: false,
      customBranding: true,
      apiAccess: true,
      advancedAnalytics: false,
      whiteLabel: false,
    },
    branding: {
      primaryColor: "#0891b2",
      secondaryColor: "#0c831f",
      accentColor: "#ff4f8b",
      favicon: "/favicon-mg.ico",
      storeName: "MetroGrocer",
      tagline: "Big city, big savings",
    },
  },
];

const statusConfig: Record<TenantStatus, { label: string; bg: string; text: string }> = {
  active: { label: "Active", bg: "bg-[#e8f5e9]", text: "text-[#0c831f]" },
  trial: { label: "Trial", bg: "bg-[#fffbeb]", text: "text-[#d97706]" },
  suspended: { label: "Suspended", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
  past_due: { label: "Past Due", bg: "bg-[#fff0f6]", text: "text-[#ff4f8b]" },
};

const tierConfig: Record<SubscriptionTier, { label: string; price: number; desc: string }> = {
  starter: { label: "Starter", price: 4999, desc: "Up to 10 users, basic features" },
  growth: { label: "Growth", price: 9999, desc: "Up to 50 users, premium features" },
  enterprise: { label: "Enterprise", price: 24999, desc: "Unlimited users, all features" },
};

// ── Generate Mock Activity Data ──────────────────────────────
const generateActivity = (tenantName: string): ActivityEvent[] => {
  const day = new Date();
  const events: ActivityEvent[] = [
    {
      id: "ACT-001",
      type: "payment",
      description: "Subscription payment received",
      detail: ` ₹${(24999).toLocaleString("en-IN")} — Razorpay`,
      timestamp: formatAgo(day, 0, 2),
      user: "System",
      icon: <DollarSign className="h-3.5 w-3.5" />,
      color: "text-[#0c831f]",
      bg: "bg-[#e8f5e9]",
    },
    {
      id: "ACT-002",
      type: "user",
      description: "New user account created",
      detail: "5 new staff accounts added",
      timestamp: formatAgo(day, 0, 5),
      user: "Admin",
      icon: <Users className="h-3.5 w-3.5" />,
      color: "text-[#2563eb]",
      bg: "bg-[#eff6ff]",
    },
    {
      id: "ACT-003",
      type: "feature",
      description: "AI Forecast feature enabled",
      detail: "ML model activated for demand prediction",
      timestamp: formatAgo(day, 0, 8),
      user: "Super Admin",
      icon: <Zap className="h-3.5 w-3.5" />,
      color: "text-[#9333ea]",
      bg: "bg-[#faf5ff]",
    },
    {
      id: "ACT-004",
      type: "order",
      description: "High order volume detected",
      detail: "342 orders processed today (+12% vs yesterday)",
      timestamp: formatAgo(day, 0, 12),
      user: "System",
      icon: <Activity className="h-3.5 w-3.5" />,
      color: "text-[#d97706]",
      bg: "bg-[#fffbeb]",
    },
    {
      id: "ACT-005",
      type: "domain",
      description: "SSL certificate renewed",
      detail: `${tenantName.toLowerCase().replace(/\s/g, "")}.fmcg.com — Auto-renewed`,
      timestamp: formatAgo(day, 1, 0),
      user: "System",
      icon: <Shield className="h-3.5 w-3.5" />,
      color: "text-[#0c831f]",
      bg: "bg-[#e8f5e9]",
    },
    {
      id: "ACT-006",
      type: "branding",
      description: "Branding colors updated",
      detail: "Primary color changed to match new brand guidelines",
      timestamp: formatAgo(day, 1, 3),
      user: "Admin",
      icon: <Palette className="h-3.5 w-3.5" />,
      color: "text-[#ff4f8b]",
      bg: "bg-[#fff0f6]",
    },
    {
      id: "ACT-007",
      type: "settings",
      description: "API rate limits adjusted",
      detail: "Increased from 1000 to 5000 requests/hour",
      timestamp: formatAgo(day, 1, 6),
      user: "Super Admin",
      icon: <Settings className="h-3.5 w-3.5" />,
      color: "text-[#666]",
      bg: "bg-[#f3f4f6]",
    },
    {
      id: "ACT-008",
      type: "payment",
      description: "Invoice generated",
      detail: "INV-2026-05-001 for ₹24,999",
      timestamp: formatAgo(day, 2, 0),
      user: "System",
      icon: <DollarSign className="h-3.5 w-3.5" />,
      color: "text-[#0c831f]",
      bg: "bg-[#e8f5e9]",
    },
    {
      id: "ACT-009",
      type: "user",
      description: "User role updated",
      detail: "3 users promoted to Manager role",
      timestamp: formatAgo(day, 2, 5),
      user: "Admin",
      icon: <Users className="h-3.5 w-3.5" />,
      color: "text-[#2563eb]",
      bg: "bg-[#eff6ff]",
    },
    {
      id: "ACT-010",
      type: "alert",
      description: "Storage threshold warning",
      detail: `Storage at 82% (${"12.4 GB"} / 15 GB allocated)`,
      timestamp: formatAgo(day, 3, 0),
      user: "System",
      icon: <Activity className="h-3.5 w-3.5" />,
      color: "text-[#dc2626]",
      bg: "bg-[#fef2f2]",
    },
    {
      id: "ACT-011",
      type: "feature",
      description: "Multi-Warehouse feature requested",
      detail: "Tenant requested activation — pending review",
      timestamp: formatAgo(day, 3, 8),
      user: `${tenantName} Admin`,
      icon: <Building2 className="h-3.5 w-3.5" />,
      color: "text-[#2563eb]",
      bg: "bg-[#eff6ff]",
    },
    {
      id: "ACT-012",
      type: "order",
      description: "Peak hour traffic spike",
      detail: "89 concurrent users at 7 PM — normal operation",
      timestamp: formatAgo(day, 4, 0),
      user: "System",
      icon: <TrendingUp className="h-3.5 w-3.5" />,
      color: "text-[#d97706]",
      bg: "bg-[#fffbeb]",
    },
  ];
  return events;
};

function formatAgo(base: Date, daysAgo: number, hoursAgo: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursAgo);

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// ── Analytics Metrics Generator ──────────────────────────────
function getAnalytics(tenant: Tenant): AnalyticsMetric[] {
  return [
    {
      label: "Monthly Revenue",
      value: `₹${(tenant.planPrice / 1000).toFixed(1)}K`,
      change: 12.5,
      period: "vs last month",
      icon: <DollarSign className="h-4 w-4" />,
      color: "text-[#0c831f]",
    },
    {
      label: "Total Orders (MTD)",
      value: "3,420",
      change: 8.3,
      period: "vs last month",
      icon: <Activity className="h-4 w-4" />,
      color: "text-[#2563eb]",
    },
    {
      label: "Active Users",
      value: tenant.usersCount.toString(),
      change: 15.0,
      period: "vs last month",
      icon: <Users className="h-4 w-4" />,
      color: "text-[#ff4f8b]",
    },
    {
      label: "Avg. Order Value",
      value: "₹486",
      change: -3.2,
      period: "vs last month",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-[#d97706]",
    },
    {
      label: "Storage Used",
      value: tenant.storageUsed,
      change: 5.1,
      period: "vs last month",
      icon: <Save className="h-4 w-4" />,
      color: "text-[#9333ea]",
    },
    {
      label: "SLA Compliance",
      value: "99.2%",
      change: 0.4,
      period: "vs last month",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-[#0c831f]",
    },
  ];
}

// ── Features Modal ─────────────────────────────────────────────
function FeaturesModal({
  tenant,
  open,
  onClose,
}: {
  tenant: Tenant | null;
  open: boolean;
  onClose: () => void;
}) {
  const [features, setFeatures] = useState(tenant?.features || null);
  if (!open || !tenant || !features) return null;

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => (prev ? { ...prev, [key]: !prev[key] } : prev));
  };

  const handleSave = () => {
    alert(`Features updated for "${tenant.name}"! (Demo)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-[#e8e8e8] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">Feature Management</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">{tenant.name} — Features</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2 px-6 py-4">
          {[
            { key: "aiForecast" as keyof typeof features, label: "AI Demand Forecast", desc: "ML-powered demand prediction and inventory optimization", icon: Zap, color: "text-[#9333ea]" },
            { key: "multiWarehouse" as keyof typeof features, label: "Multi-Warehouse", desc: "Manage inventory across multiple warehouse locations", icon: Building2, color: "text-[#2563eb]" },
            { key: "customBranding" as keyof typeof features, label: "Custom Branding", desc: "White-label storefront with custom colors and logo", icon: Palette, color: "text-[#ff4f8b]" },
            { key: "apiAccess" as keyof typeof features, label: "API Access", desc: "REST API and webhook access for integrations", icon: Settings, color: "text-[#d97706]" },
            { key: "advancedAnalytics" as keyof typeof features, label: "Advanced Analytics", desc: "Detailed reports, charts, and custom dashboards", icon: Layout, color: "text-[#0c831f]" },
            { key: "whiteLabel" as keyof typeof features, label: "White Label", desc: "Remove all FMCG branding — use your own", icon: Eye, color: "text-[#dc2626]" },
          ].map(({ key, label, desc, icon: Icon, color }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3"
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${color}`} />
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                  <p className="text-xs text-[#999]">{desc}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFeature(key)}
                className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                  features[key] ? "bg-[#0c831f]" : "bg-[#ccc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    features[key] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 border-t border-[#e8e8e8] px-6 py-4">
          <button
            onClick={onClose}
            className="h-9 rounded-lg border border-[#e8e8e8] bg-white px-4 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 h-9 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18]"
          >
            <Save className="h-3.5 w-3.5" />
            Save Features
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Branding Modal ─────────────────────────────────────────────
function BrandingModal({
  tenant,
  open,
  onClose,
}: {
  tenant: Tenant | null;
  open: boolean;
  onClose: () => void;
}) {
  const [branding, setBranding] = useState(tenant?.branding || null);
  if (!open || !tenant || !branding) return null;

  const handleChange = (field: string, value: string) => {
    setBranding((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = () => {
    alert(`Branding updated for "${tenant.name}"! (Demo)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-[#e8e8e8] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">Tenant Branding</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">{tenant.name} — Branding</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Store Name</label>
              <input type="text" value={branding.storeName} onChange={(e) => handleChange("storeName", e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Tagline</label>
              <input type="text" value={branding.tagline} onChange={(e) => handleChange("tagline", e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Primary Color</label>
              <div className="mt-1 flex items-center gap-2">
                <input type="color" value={branding.primaryColor} onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-[#e8e8e8] bg-white" />
                <input type="text" value={branding.primaryColor} onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Secondary Color</label>
              <div className="mt-1 flex items-center gap-2">
                <input type="color" value={branding.secondaryColor} onChange={(e) => handleChange("secondaryColor", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-[#e8e8e8] bg-white" />
                <input type="text" value={branding.secondaryColor} onChange={(e) => handleChange("secondaryColor", e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Accent Color</label>
              <div className="mt-1 flex items-center gap-2">
                <input type="color" value={branding.accentColor} onChange={(e) => handleChange("accentColor", e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-[#e8e8e8] bg-white" />
                <input type="text" value={branding.accentColor} onChange={(e) => handleChange("accentColor", e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">Color Preview</p>
            <div className="flex gap-2">
              <div className="h-8 flex-1 rounded-lg" style={{ backgroundColor: branding.primaryColor }} />
              <div className="h-8 flex-1 rounded-lg" style={{ backgroundColor: branding.secondaryColor }} />
              <div className="h-8 flex-1 rounded-lg" style={{ backgroundColor: branding.accentColor }} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#e8e8e8] px-6 py-4">
          <button
            onClick={onClose}
            className="h-9 rounded-lg border border-[#e8e8e8] bg-white px-4 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 h-9 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18]"
          >
            <Save className="h-3.5 w-3.5" />
            Save Branding
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Domain Modal ───────────────────────────────────────────────
function DomainModal({
  tenant,
  open,
  onClose,
}: {
  tenant: Tenant | null;
  open: boolean;
  onClose: () => void;
}) {
  const [customDomain, setCustomDomain] = useState("");
  if (!open || !tenant) return null;

  const handleAddDomain = () => {
    if (!customDomain) return;
    alert(`Custom domain "${customDomain}" configured for "${tenant.name}"! (Demo)\n\nDNS settings:\n- Type: CNAME\n- Name: @\n- Value: ${tenant.domain}\n- TTL: 3600`);
    setCustomDomain("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-[#e8e8e8] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">Domain Settings</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">{tenant.name} — Domains</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-4">
          <div>
            <p className="mb-1 text-xs font-bold text-[#666]">FMCG Subdomain</p>
            <div className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-[#f0fdf4] px-3 py-2">
              <Globe className="h-4 w-4 text-[#0c831f]" />
              <span className="text-sm font-bold text-[#1a1a1a]">{tenant.domain}</span>
              <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-bold text-[#0c831f]">Active</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#666]">Custom Domain</label>
            <div className="mt-1 flex items-center gap-2">
              <input type="text" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="store.yourbrand.com"
                className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              <button onClick={handleAddDomain} disabled={!customDomain}
                className="flex h-10 items-center gap-1.5 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50">
                <Building2 className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">DNS Configuration</p>
            <div className="space-y-1.5 text-xs text-[#666]">
              <p>Add a CNAME record in your DNS provider pointing to:</p>
              <code className="block rounded bg-[#f3f4f6] px-3 py-2 text-sm font-mono text-[#1a1a1a]">{tenant.domain}</code>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded bg-white px-2 py-1.5">
                  <span className="font-bold text-[#666]">Type</span>
                  <p className="font-mono text-sm text-[#1a1a1a]">CNAME</p>
                </div>
                <div className="rounded bg-white px-2 py-1.5">
                  <span className="font-bold text-[#666]">TTL</span>
                  <p className="font-mono text-sm text-[#1a1a1a]">3600</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#0c831f]" />
              <span className="text-xs font-bold text-[#1a1a1a]">SSL Certificate</span>
            </div>
            <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Auto-Renew</span>
          </div>
        </div>
        <div className="flex justify-end border-t border-[#e8e8e8] px-6 py-4">
          <button
            onClick={onClose}
            className="h-9 rounded-lg border border-[#e8e8e8] bg-white px-4 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Detail Page ─────────────────────────────────────────
export default function TenantDetailPage() {
  const { id } = useParams();
  const tenantId = typeof id === "string" ? id : "";
  const tenant = tenants.find((t) => t.id === tenantId);

  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "features">("overview");
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [domainOpen, setDomainOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const openAction = (action: "features" | "branding" | "domain") => {
    if (!tenant) return;
    setSelectedTenant(tenant);
    setTimeout(() => {
      switch (action) {
        case "features": setFeaturesOpen(true); break;
        case "branding": setBrandingOpen(true); break;
        case "domain": setDomainOpen(true); break;
      }
    }, 0);
  };

  if (!tenant) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">Error 404</p>
            <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Tenant Not Found</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
              The tenant with ID &quot;{tenantId}&quot; does not exist or has been removed.
            </p>
            <Link
              href="/admin/tenants"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
            >
              <Building2 className="h-4 w-4" />
              Back to Tenants
            </Link>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  const statusCfg = statusConfig[tenant.status];
  const activityEvents = generateActivity(tenant.name);
  const analyticsMetrics = getAnalytics(tenant);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* ── Breadcrumb ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#999]">
          <Link href="/admin/tenants" className="hover:text-[#0c831f] transition-colors">
            Tenants
          </Link>
          <span>/</span>
          <span className="text-[#1a1a1a]">{tenant.name}</span>
        </div>

        {/* ── Header ──────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0c831f] text-lg font-black text-white shadow-sm">
                {tenant.logo}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  SaaS Tenant
                </p>
                <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                  {tenant.name}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-black ${statusCfg.bg} ${statusCfg.text}`}>
                    {statusCfg.label}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-black capitalize text-[#666]">
                    {tenant.tier}
                  </span>
                  <span className="text-xs text-[#999]">{tenant.id}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => openAction("domain")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]"
              >
                <Globe className="h-4 w-4" />
                Domains
              </button>
              <button
                onClick={() => openAction("branding")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]"
              >
                <Palette className="h-4 w-4" />
                Branding
              </button>
              <button
                onClick={() => openAction("features")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]"
              >
                <Zap className="h-4 w-4" />
                Features
              </button>
              <button
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-all ${
                  tenant.status === "suspended" || tenant.status === "past_due"
                    ? "border-[#0c831f] text-[#0c831f] bg-white hover:bg-[#e8f5e9]"
                    : "border-[#fecaca] text-[#b91c1c] bg-white hover:bg-[#fef2f2]"
                }`}
              >
                {tenant.status === "suspended" || tenant.status === "past_due" ? (
                  <><UserPlus className="h-4 w-4" /> Activate</>
                ) : (
                  <><Minus className="h-4 w-4" /> Suspend</>
                )}
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-[#ff4f8b] px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-[#e63975]">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* ── Analytics Metrics Strip ─────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {analyticsMetrics.map((metric, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#666]">{metric.label}</span>
                <span className={metric.color}>{metric.icon}</span>
              </div>
              <p className="text-xl font-black text-[#1a1a1a]">{metric.value}</p>
              <div className="mt-1 flex items-center gap-1">
                {metric.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-[#0c831f]" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-[#dc2626]" />
                )}
                <span className={`text-[10px] font-bold ${metric.change >= 0 ? "text-[#0c831f]" : "text-[#dc2626]"}`}>
                  {metric.change >= 0 ? "+" : ""}{metric.change}%
                </span>
                <span className="text-[10px] text-[#999]">{metric.period}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tab Navigation ──────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="flex border-b border-[#e8e8e8] bg-[#f9fafb]">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                activeTab === "overview"
                  ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Profile &amp; Overview
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex items-center gap-1.5 px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                activeTab === "activity"
                  ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              Activity Timeline
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`flex items-center gap-1.5 px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                activeTab === "features"
                  ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              Feature Status
            </button>
          </div>

          {/* ── Tab: Profile & Overview ────────────────────────── */}
          {activeTab === "overview" && (
            <div className="p-5 sm:p-6 space-y-6">
              {/* Store Info */}
              <div>
                <h3 className="mb-3 text-sm font-black text-[#1a1a1a]">Store Information</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Store Name</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">{tenant.branding.storeName}</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Tagline</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">{tenant.branding.tagline}</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Domain</p>
                    <a
                      href={`https://${tenant.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-[#2563eb] hover:underline"
                    >
                      {tenant.domain}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Branding Preview */}
              <div>
                <h3 className="mb-3 text-sm font-black text-[#1a1a1a]">Branding Colors</h3>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-xl border border-[#e8e8e8] p-3">
                    <div className="h-8 rounded-lg" style={{ backgroundColor: tenant.branding.primaryColor }} />
                    <p className="mt-1 text-[10px] font-mono font-bold text-[#666]">{tenant.branding.primaryColor}</p>
                    <p className="text-[9px] font-semibold text-[#999]">Primary</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-[#e8e8e8] p-3">
                    <div className="h-8 rounded-lg" style={{ backgroundColor: tenant.branding.secondaryColor }} />
                    <p className="mt-1 text-[10px] font-mono font-bold text-[#666]">{tenant.branding.secondaryColor}</p>
                    <p className="text-[9px] font-semibold text-[#999]">Secondary</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-[#e8e8e8] p-3">
                    <div className="h-8 rounded-lg" style={{ backgroundColor: tenant.branding.accentColor }} />
                    <p className="mt-1 text-[10px] font-mono font-bold text-[#666]">{tenant.branding.accentColor}</p>
                    <p className="text-[9px] font-semibold text-[#999]">Accent</p>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div>
                <h3 className="mb-3 text-sm font-black text-[#1a1a1a]">Subscription Details</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Plan</p>
                    <p className="mt-0.5 text-sm font-black text-[#0c831f]">{tierConfig[tenant.tier].label}</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Amount</p>
                    <p className="mt-0.5 text-sm font-black text-[#1a1a1a]">
                      ₹{tenant.planPrice.toLocaleString("en-IN")}
                      <span className="text-[10px] font-bold text-[#999]">/{tenant.billingCycle === "yearly" ? "yr" : "mo"}</span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Billing Cycle</p>
                    <p className="mt-0.5 text-sm font-bold capitalize text-[#1a1a1a]">{tenant.billingCycle}</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Users / Limit</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">
                      {tenant.usersCount} / {tenant.tier === "starter" ? "10" : tenant.tier === "growth" ? "50" : "∞"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Storage</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">{tenant.storageUsed}</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Created</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">{tenant.created}</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">Expires</p>
                    <p className={`mt-0.5 text-sm font-bold ${tenant.status === "past_due" ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                      {tenant.expiresAt}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                    <p className="text-[10px] font-bold text-[#666]">SSL</p>
                    <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-[#0c831f]">
                      <Shield className="h-3.5 w-3.5" />
                      Active — Auto-Renew
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Activity Timeline ─────────────────────────── */}
          {activeTab === "activity" && (
            <div className="p-5 sm:p-6">
              {/* Activity filters */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1a1a1a]">Recent Activity</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-[10px] font-bold text-[#666] hover:bg-[#f6f7f6]">
                    <Filter className="h-3 w-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-[10px] font-bold text-[#666] hover:bg-[#f6f7f6]">
                    <Download className="h-3 w-3" />
                    Export
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative space-y-0">
                {activityEvents.map((event, i) => (
                  <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
                    {/* Timeline line + dot */}
                    <div className="relative flex flex-col items-center">
                      <div className={`z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${event.bg} ${event.color} shadow-sm ring-2 ring-white`}>
                        {event.icon}
                      </div>
                      {i < activityEvents.length - 1 && (
                        <div className="absolute top-7 h-full w-px bg-[#e8e8e8]" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{event.description}</p>
                          <p className="text-xs text-[#666]">{event.detail}</p>
                        </div>
                        <span className="flex-shrink-0 text-[10px] font-semibold text-[#999]">{event.timestamp}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-[#999]">by {event.user}</span>
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold capitalize ${event.bg} ${event.color}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: Feature Status ────────────────────────────── */}
          {activeTab === "features" && (
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-black text-[#1a1a1a]">Enabled Features</h3>
                <button
                  onClick={() => openAction("features")}
                  className="flex items-center gap-1.5 rounded-lg bg-[#0c831f] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#0a6a18]"
                >
                  <Settings className="h-3 w-3" />
                  Manage Features
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { key: "aiForecast" as keyof typeof tenant.features, label: "AI Demand Forecast", desc: "ML-powered demand prediction and inventory optimization", icon: Zap, color: "text-[#9333ea]", bg: "bg-[#faf5ff]" },
                  { key: "multiWarehouse" as keyof typeof tenant.features, label: "Multi-Warehouse", desc: "Manage inventory across multiple warehouse locations", icon: Building2, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
                  { key: "customBranding" as keyof typeof tenant.features, label: "Custom Branding", desc: "White-label storefront with custom colors and logo", icon: Palette, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
                  { key: "apiAccess" as keyof typeof tenant.features, label: "API Access", desc: "REST API and webhook access for integrations", icon: Settings, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
                  { key: "advancedAnalytics" as keyof typeof tenant.features, label: "Advanced Analytics", desc: "Detailed reports, charts, and custom dashboards", icon: Layout, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                  { key: "whiteLabel" as keyof typeof tenant.features, label: "White Label", desc: "Remove all FMCG branding — use your own", icon: Eye, color: "text-[#dc2626]", bg: "bg-[#fef2f2]" },
                ].map(({ key, label, desc, icon: Icon, color, bg }) => (
                  <div
                    key={key}
                    className={`rounded-xl border p-4 transition-all ${
                      tenant.features[key]
                        ? "border-[#0c831f]/20 bg-[#fafafa]"
                        : "border-[#e8e8e8] bg-[#fafafa] opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg} ${color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {tenant.features[key] ? (
                        <span className="flex items-center gap-1 rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-bold text-[#0c831f]">
                          <ToggleRight className="h-3 w-3" />
                          Enabled
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] font-bold text-[#999]">
                          <ToggleLeft className="h-3 w-3" />
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#1a1a1a]">{label}</p>
                    <p className="mt-0.5 text-xs text-[#999]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── Modals ──────────────────────────────────────────── */}
      <FeaturesModal tenant={selectedTenant} open={featuresOpen} onClose={() => { setFeaturesOpen(false); setSelectedTenant(null); }} />
      <BrandingModal tenant={selectedTenant} open={brandingOpen} onClose={() => { setBrandingOpen(false); setSelectedTenant(null); }} />
      <DomainModal tenant={selectedTenant} open={domainOpen} onClose={() => { setDomainOpen(false); setSelectedTenant(null); }} />
    </DashboardLayout>
  );
}
