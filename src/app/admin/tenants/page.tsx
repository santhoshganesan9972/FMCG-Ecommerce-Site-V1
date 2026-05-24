"use client";

import DashboardLayout from "../dashboard-layout";
import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  RefreshCw,
  Globe,
  Palette,
  ToggleLeft,
  ToggleRight,
  CreditCard,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Settings,
  ExternalLink,
  Eye,
  Save,
  Shield,
  Zap,
  Layout,
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

const statusConfig: Record<
  TenantStatus,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  active: {
    label: "Active",
    bg: "bg-[#e8f5e9]",
    text: "text-[#0c831f]",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  trial: {
    label: "Trial",
    bg: "bg-[#fffbeb]",
    text: "text-[#d97706]",
    icon: <Clock className="h-3 w-3" />,
  },
  suspended: {
    label: "Suspended",
    bg: "bg-[#fef2f2]",
    text: "text-[#dc2626]",
    icon: <XCircle className="h-3 w-3" />,
  },
  past_due: {
    label: "Past Due",
    bg: "bg-[#fff0f6]",
    text: "text-[#ff4f8b]",
    icon: <XCircle className="h-3 w-3" />,
  },
};

const tierConfig: Record<
  SubscriptionTier,
  { label: string; price: number; desc: string }
> = {
  starter: { label: "Starter", price: 4999, desc: "Up to 10 users, basic features" },
  growth: { label: "Growth", price: 9999, desc: "Up to 50 users, premium features" },
  enterprise: { label: "Enterprise", price: 24999, desc: "Unlimited users, all features" },
};

// ── Add Tenant Modal ─────────────────────────────────────────
function AddTenantModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    domain: "",
    email: "",
    tier: "growth" as SubscriptionTier,
    billingCycle: "monthly" as "monthly" | "yearly",
    users: "10",
    storage: "5",
  });

  if (!open) return null;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert(`Tenant "${form.name}" created successfully! (Demo)`);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-[#e8e8e8] bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
              Multi Tenant
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Add New Tenant</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 px-6 pt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  step >= s
                    ? "bg-[#0c831f] text-white"
                    : "bg-[#f3f4f6] text-[#999]"
                }`}
              >
                {s}
              </div>
              <span
                className={`text-[10px] font-bold ${
                  step >= s ? "text-[#1a1a1a]" : "text-[#999]"
                }`}
              >
                {s === 1
                  ? "Basic Info"
                  : s === 2
                    ? "Configuration"
                    : "Billing"}
              </span>
              {s < 3 && (
                <div className="h-px w-6 bg-[#e8e8e8]" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4 px-6 py-4">
            <div>
              <label className="text-xs font-bold text-[#666]">
                Store Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. FreshMart"
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Subdomain
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={form.domain}
                  onChange={(e) => handleChange("domain", e.target.value)}
                  placeholder="yourstore"
                  className="h-10 flex-1 rounded-l-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                />
                <span className="flex h-10 items-center rounded-r-lg border border-l-0 border-[#e8e8e8] bg-[#f3f4f6] px-3 text-xs text-[#666]">
                  .fmcg.com
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Admin Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="admin@freshmart.com"
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  setStep(1);
                }}
                className="h-9 rounded-lg border border-[#e8e8e8] bg-white px-4 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="h-9 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="space-y-4 px-6 py-4">
            <div>
              <label className="text-xs font-bold text-[#666]">
                Subscription Tier
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {(["starter", "growth", "enterprise"] as const).map(
                  (t) => {
                    const cfg = tierConfig[t];
                    return (
                      <button
                        key={t}
                        onClick={() => handleChange("tier", t)}
                        className={`rounded-lg border p-3 text-left transition ${
                          form.tier === t
                            ? "border-[#0c831f] bg-[#e8f5e9]"
                            : "border-[#e8e8e8] bg-[#fafafa] hover:bg-[#f6f7f6]"
                        }`}
                      >
                        <p className="text-xs font-bold text-[#1a1a1a]">
                          {cfg.label}
                        </p>
                        <p className="text-sm font-black text-[#0c831f]">
                          ₹{cfg.price.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#999]">
                          {cfg.desc}
                        </p>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#666]">
                  Max Users
                </label>
                <select
                  value={form.users}
                  onChange={(e) => handleChange("users", e.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                >
                  <option value="5">5 users</option>
                  <option value="10">10 users</option>
                  <option value="25">25 users</option>
                  <option value="50">50 users</option>
                  <option value="100">100 users</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">
                  Storage (GB)
                </label>
                <select
                  value={form.storage}
                  onChange={(e) => handleChange("storage", e.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                >
                  <option value="5">5 GB</option>
                  <option value="10">10 GB</option>
                  <option value="25">25 GB</option>
                  <option value="50">50 GB</option>
                  <option value="100">100 GB</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="h-9 rounded-lg border border-[#e8e8e8] bg-white px-4 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="h-9 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Billing */}
        {step === 3 && (
          <div className="space-y-4 px-6 py-4">
            <div>
              <label className="text-xs font-bold text-[#666]">
                Billing Cycle
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleChange("billingCycle", "monthly")}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-bold transition ${
                    form.billingCycle === "monthly"
                      ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
                      : "border-[#e8e8e8] bg-[#fafafa] text-[#666] hover:bg-[#f6f7f6]"
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  Monthly
                </button>
                <button
                  onClick={() => handleChange("billingCycle", "yearly")}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-bold transition ${
                    form.billingCycle === "yearly"
                      ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
                      : "border-[#e8e8e8] bg-[#fafafa] text-[#666] hover:bg-[#f6f7f6]"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Yearly{" "}
                  <span className="rounded bg-[#fffbeb] px-1.5 py-0.5 text-[10px] text-[#d97706]">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">
                Order Summary
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Plan</span>
                  <span className="font-bold text-[#1a1a1a]">
                    {tierConfig[form.tier].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Billing</span>
                  <span className="font-bold text-[#1a1a1a]">
                    {form.billingCycle === "yearly" ? "Yearly" : "Monthly"}
                  </span>
                </div>
                <div className="border-t border-[#e8e8e8] pt-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#1a1a1a]">Total</span>
                    <span className="font-black text-[#0c831f]">
                      ₹
                      {(
                        tierConfig[form.tier].price *
                        (form.billingCycle === "yearly" ? 10 : 1)
                      ).toLocaleString("en-IN")}
                      <span className="text-xs font-bold text-[#999]">
                        /{form.billingCycle === "yearly" ? "yr" : "mo"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="h-9 rounded-lg border border-[#e8e8e8] bg-white px-4 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="h-9 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18]"
              >
                Create Tenant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Enable/Disable Features Modal ────────────────────────────
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
    setFeatures((prev) =>
      prev ? { ...prev, [key]: !prev[key] } : prev
    );
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
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
              Feature Management
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">
              {tenant.name} — Features
            </h2>
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
            {
              key: "aiForecast" as keyof typeof features,
              label: "AI Demand Forecast",
              desc: "ML-powered demand prediction and inventory optimization",
              icon: Zap,
              color: "text-[#9333ea]",
            },
            {
              key: "multiWarehouse" as keyof typeof features,
              label: "Multi-Warehouse",
              desc: "Manage inventory across multiple warehouse locations",
              icon: Building2,
              color: "text-[#2563eb]",
            },
            {
              key: "customBranding" as keyof typeof features,
              label: "Custom Branding",
              desc: "White-label storefront with custom colors and logo",
              icon: Palette,
              color: "text-[#ff4f8b]",
            },
            {
              key: "apiAccess" as keyof typeof features,
              label: "API Access",
              desc: "REST API and webhook access for integrations",
              icon: Settings,
              color: "text-[#d97706]",
            },
            {
              key: "advancedAnalytics" as keyof typeof features,
              label: "Advanced Analytics",
              desc: "Detailed reports, charts, and custom dashboards",
              icon: Layout,
              color: "text-[#0c831f]",
            },
            {
              key: "whiteLabel" as keyof typeof features,
              label: "White Label",
              desc: "Remove all FMCG branding — use your own",
              icon: Eye,
              color: "text-[#dc2626]",
            },
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

// ── Branding Modal ───────────────────────────────────────────
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
    setBranding((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
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
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
              Tenant Branding
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">
              {tenant.name} — Branding
            </h2>
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
              <label className="text-xs font-bold text-[#666]">
                Store Name
              </label>
              <input
                type="text"
                value={branding.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Tagline
              </label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-[#666]">
                Primary Color
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) =>
                    handleChange("primaryColor", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer rounded-lg border border-[#e8e8e8] bg-white"
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) =>
                    handleChange("primaryColor", e.target.value)
                  }
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Secondary Color
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={branding.secondaryColor}
                  onChange={(e) =>
                    handleChange("secondaryColor", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer rounded-lg border border-[#e8e8e8] bg-white"
                />
                <input
                  type="text"
                  value={branding.secondaryColor}
                  onChange={(e) =>
                    handleChange("secondaryColor", e.target.value)
                  }
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">
                Accent Color
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={branding.accentColor}
                  onChange={(e) =>
                    handleChange("accentColor", e.target.value)
                  }
                  className="h-10 w-10 cursor-pointer rounded-lg border border-[#e8e8e8] bg-white"
                />
                <input
                  type="text"
                  value={branding.accentColor}
                  onChange={(e) =>
                    handleChange("accentColor", e.target.value)
                  }
                  className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm font-mono text-[#1a1a1a] outline-none focus:border-[#0c831f]"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="rounded-xl border border-[#e8e8e8] p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">
              Color Preview
            </p>
            <div className="flex gap-2">
              <div
                className="h-8 flex-1 rounded-lg"
                style={{ backgroundColor: branding.primaryColor }}
              />
              <div
                className="h-8 flex-1 rounded-lg"
                style={{ backgroundColor: branding.secondaryColor }}
              />
              <div
                className="h-8 flex-1 rounded-lg"
                style={{ backgroundColor: branding.accentColor }}
              />
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

// ── Domain Modal ─────────────────────────────────────────────
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
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
              Domain Settings
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">
              {tenant.name} — Domains
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-4">
          {/* Current Domain */}
          <div>
            <p className="mb-1 text-xs font-bold text-[#666]">
              FMCG Subdomain
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-[#f0fdf4] px-3 py-2">
              <Globe className="h-4 w-4 text-[#0c831f]" />
              <span className="text-sm font-bold text-[#1a1a1a]">
                {tenant.domain}
              </span>
              <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-bold text-[#0c831f]">
                Active
              </span>
            </div>
          </div>

          {/* Add Custom Domain */}
          <div>
            <label className="text-xs font-bold text-[#666]">
              Custom Domain
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="store.yourbrand.com"
                className="h-10 flex-1 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
              />
              <button
                onClick={handleAddDomain}
                disabled={!customDomain}
                className="flex h-10 items-center gap-1.5 rounded-lg bg-[#0c831f] px-4 text-xs font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* DNS Instructions */}
          <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">
              DNS Configuration
            </p>
            <div className="space-y-1.5 text-xs text-[#666]">
              <p>
                Add a CNAME record in your DNS provider pointing to:
              </p>
              <code className="block rounded bg-[#f3f4f6] px-3 py-2 text-sm font-mono text-[#1a1a1a]">
                {tenant.domain}
              </code>
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

          {/* SSL Status */}
          <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#0c831f]" />
              <span className="text-xs font-bold text-[#1a1a1a]">
                SSL Certificate
              </span>
            </div>
            <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">
              Auto-Renew
            </span>
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

// ── Subscription Billing Modal ───────────────────────────────
function BillingModal({
  tenant,
  open,
  onClose,
}: {
  tenant: Tenant | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !tenant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-[#e8e8e8] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-[#0c831f]">
              Subscription & Billing
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">
              {tenant.name} — Billing
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-6 py-4">
          {/* Plan Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <p className="text-[10px] font-bold text-[#666]">Current Plan</p>
              <p className="mt-1 text-lg font-black text-[#1a1a1a]">
                {tierConfig[tenant.tier].label}
              </p>
            </div>
            <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <p className="text-[10px] font-bold text-[#666]">Amount</p>
              <p className="mt-1 text-lg font-black text-[#0c831f]">
                ₹{tenant.planPrice.toLocaleString("en-IN")}
                <span className="text-xs font-bold text-[#999]">
                  /{tenant.billingCycle === "yearly" ? "yr" : "mo"}
                </span>
              </p>
            </div>
          </div>

          {/* Billing Details */}
          <div className="space-y-1.5 rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Billing Cycle</span>
              <span className="font-bold capitalize text-[#1a1a1a]">
                {tenant.billingCycle}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Users</span>
              <span className="font-bold text-[#1a1a1a]">
                {tenant.usersCount} /{" "}
                {tenant.tier === "starter"
                  ? "10"
                  : tenant.tier === "growth"
                    ? "50"
                    : "∞"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Storage Used</span>
              <span className="font-bold text-[#1a1a1a]">
                {tenant.storageUsed}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Created</span>
              <span className="font-bold text-[#1a1a1a]">
                {tenant.created}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Expires</span>
              <span
                className={`font-bold ${
                  tenant.status === "past_due"
                    ? "text-[#ff4f8b]"
                    : "text-[#1a1a1a]"
                }`}
              >
                {tenant.expiresAt}
              </span>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">
              Recent Payments
            </p>
            <div className="space-y-1">
              {[
                {
                  date: "May 01, 2026",
                  amount: tenant.planPrice,
                  method: "Razorpay",
                  status: "success",
                },
                {
                  date: "Apr 01, 2026",
                  amount: tenant.planPrice,
                  method: "Razorpay",
                  status: "success",
                },
                {
                  date: "Mar 01, 2026",
                  amount: tenant.planPrice,
                  method: "Razorpay",
                  status: "success",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-[#0c831f]" />
                    <span className="font-bold text-[#1a1a1a]">{p.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#999]">{p.method}</span>
                    <span className="font-bold text-[#1a1a1a]">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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

// ── Main Page ────────────────────────────────────────────────
export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  // Modal states
  const [addOpen, setAddOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [brandingOpen, setBrandingOpen] = useState(false);
  const [domainOpen, setDomainOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "features">("list");

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || t.status === statusFilter;
    const matchesTier =
      tierFilter === "all" || t.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const totalMonthlyRevenue = tenants
    .filter((t) => t.status === "active")
    .reduce(
      (sum, t) =>
        sum +
        (t.billingCycle === "yearly"
          ? t.planPrice / 10
          : t.planPrice),
      0
    );

  const openAction = (
    action: "features" | "branding" | "domain" | "billing",
    tenant: Tenant
  ) => {
    setSelectedTenant(tenant);
    setTimeout(() => {
      switch (action) {
        case "features":
          setFeaturesOpen(true);
          break;
        case "branding":
          setBrandingOpen(true);
          break;
        case "domain":
          setDomainOpen(true);
          break;
        case "billing":
          setBillingOpen(true);
          break;
      }
    }, 0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* ── Header ───────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                SaaS Platform
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Multi Tenant Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage all your supermarket chains from one dashboard. Add
                tenants, configure branding, custom domains, enable/disable
                features, and handle subscription billing — all in one place.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setAddOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
              >
                <Plus className="h-4 w-4" />
                Add Tenant
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* ── KPI Strip ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {[
            {
              title: "Total Tenants",
              value: tenants.length.toString(),
              subtitle: "all chains",
              icon: <Building2 className="h-4 w-4" />,
              color: "text-[#0c831f]",
            },
            {
              title: "Active",
              value: tenants.filter((t) => t.status === "active").length.toString(),
              subtitle: "operational",
              icon: <CheckCircle className="h-4 w-4" />,
              color: "text-[#0c831f]",
            },
            {
              title: "Trial",
              value: tenants.filter((t) => t.status === "trial").length.toString(),
              subtitle: "evaluating",
              icon: <Clock className="h-4 w-4" />,
              color: "text-[#d97706]",
            },
            {
              title: "Suspended",
              value: tenants.filter((t) => t.status === "suspended" || t.status === "past_due").length.toString(),
              subtitle: "needs attention",
              icon: <XCircle className="h-4 w-4" />,
              color: "text-[#dc2626]",
            },
            {
              title: "Monthly Revenue",
              value: `₹${(totalMonthlyRevenue / 1000).toFixed(1)}K`,
              subtitle: "from subscriptions",
              icon: <DollarSign className="h-4 w-4" />,
              color: "text-[#2563eb]",
            },
            {
              title: "Total Users",
              value: tenants
                .reduce((sum, t) => sum + t.usersCount, 0)
                .toString(),
              subtitle: "across all tenants",
              icon: <Users className="h-4 w-4" />,
              color: "text-[#ff4f8b]",
            },
          ].map((kp, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#666]">
                  {kp.title}
                </span>
                <span className={kp.color}>{kp.icon}</span>
              </div>
              <p className="text-xl font-black text-[#1a1a1a]">{kp.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold text-[#999]">
                {kp.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* ── Quick Actions ────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-5 w-1 rounded-full bg-[#ff4f8b]" />
            <h2 className="text-sm font-black uppercase tracking-wide text-[#666]">
              Tenant Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                icon: <Plus className="h-5 w-5" />,
                label: "Add Tenant",
                desc: "Create new supermarket chain",
                onClick: () => setAddOpen(true),
                bg: "bg-[#e8f5e9]",
                text: "text-[#0c831f]",
              },
              {
                icon: <Palette className="h-5 w-5" />,
                label: "Configure Branding",
                desc: "Colors, logo & store name",
                onClick: () => {
                  const t = tenants.find((x) => x.status === "active");
                  if (t) openAction("branding", t);
                  else alert("No active tenant available for demo");
                },
                bg: "bg-[#fff0f6]",
                text: "text-[#ff4f8b]",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                label: "Configure Domains",
                desc: "Custom domain & SSL setup",
                onClick: () => {
                  const t = tenants.find((x) => x.status === "active");
                  if (t) openAction("domain", t);
                  else alert("No active tenant available for demo");
                },
                bg: "bg-[#eff6ff]",
                text: "text-[#2563eb]",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                label: "Enable/Disable Features",
                desc: "Toggle AI, analytics, APIs",
                onClick: () => {
                  const t = tenants.find((x) => x.status === "active");
                  if (t) openAction("features", t);
                  else alert("No active tenant available for demo");
                },
                bg: "bg-[#faf5ff]",
                text: "text-[#9333ea]",
              },
              {
                icon: <CreditCard className="h-5 w-5" />,
                label: "Subscription Billing",
                desc: "Plans, invoices & payments",
                onClick: () => {
                  const t = tenants.find((x) => x.status === "active");
                  if (t) openAction("billing", t);
                  else alert("No active tenant available for demo");
                },
                bg: "bg-[#fef2f2]",
                text: "text-[#b91c1c]",
              },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="cursor-pointer rounded-xl border border-[#e8e8e8] p-4 text-left transition-all hover:border-[#0c831f]/30 hover:shadow-md"
              >
                <div
                  className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl ${action.bg} ${action.text}`}
                >
                  {action.icon}
                </div>
                <p className="text-sm font-black text-[#1a1a1a]">
                  {action.label}
                </p>
                <p className="mt-0.5 text-xs font-medium text-[#999]">
                  {action.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* ── Filters ──────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search by tenant name, domain or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#666]">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="suspended">Suspended</option>
                <option value="past_due">Past Due</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#666]">Tier:</span>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
              >
                <option value="all">All Tiers</option>
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm text-[#666]">
              <span className="font-semibold">{filteredTenants.length}</span>
              <span>entries</span>
            </div>
          </div>
        </section>

        {/* ── Tenant List ──────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-[#e8e8e8] bg-[#f9fafb]">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                activeTab === "list"
                  ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              <Building2 className="mr-1.5 inline h-3.5 w-3.5" />
              All Tenants
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-5 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                activeTab === "features"
                  ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              <Zap className="mr-1.5 inline h-3.5 w-3.5" />
              Feature Overview
            </button>
          </div>

          {/* Tab: Tenant List */}
          {activeTab === "list" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Tenant
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Tier
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Domain
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Users
                    </th>
                    <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e8e8]">
                  {filteredTenants.map((tenant) => {
                    const statusCfg = statusConfig[tenant.status];
                    return (
                      <tr
                        key={tenant.id}
                        className="group transition-colors hover:bg-[#fafafa]"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#0c831f] text-xs font-black text-white">
                              {tenant.logo}
                            </div>
                            <div>
                              <Link
                                href={`/admin/tenants/${tenant.id}`}
                                className="text-sm font-bold text-[#1a1a1a] hover:text-[#0c831f] transition-colors"
                              >
                                {tenant.name}
                              </Link>
                              <p className="text-[10px] font-medium text-[#999]">
                                {tenant.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${statusCfg.bg} ${statusCfg.text}`}
                          >
                            {statusCfg.icon}
                            <span className="text-[10px] font-black">
                              {statusCfg.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold capitalize text-[#1a1a1a]">
                              {tenant.tier}
                            </span>
                            <span className="text-[10px] font-medium text-[#999]">
                              ₹{tenant.planPrice.toLocaleString("en-IN")}/{tenant.billingCycle === "yearly" ? "yr" : "mo"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://${tenant.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:underline"
                          >
                            {tenant.domain}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-[#666]">
                            {tenant.usersCount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openAction("branding", tenant)}
                              className="rounded-lg border border-[#e8e8e8] p-1.5 text-[#666] transition-colors hover:bg-[#f6f7f6]"
                              title="Configure Branding"
                            >
                              <Palette className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => openAction("domain", tenant)}
                              className="rounded-lg border border-[#e8e8e8] p-1.5 text-[#666] transition-colors hover:bg-[#f6f7f6]"
                              title="Configure Domain"
                            >
                              <Globe className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => openAction("features", tenant)}
                              className="rounded-lg border border-[#e8e8e8] p-1.5 text-[#666] transition-colors hover:bg-[#f6f7f6]"
                              title="Manage Features"
                            >
                              <Zap className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => openAction("billing", tenant)}
                              className="rounded-lg border border-[#e8e8e8] p-1.5 text-[#666] transition-colors hover:bg-[#f6f7f6]"
                              title="Subscription Billing"
                            >
                              <CreditCard className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredTenants.length === 0 && (
                <div className="px-4 py-12 text-center">
                  <Building2 className="mx-auto h-8 w-8 text-[#ccc]" />
                  <p className="mt-2 text-sm font-semibold text-[#666]">
                    No tenants match your filters
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab: Feature Overview */}
          {activeTab === "features" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                      Feature
                    </th>
                    {tenants.map((t) => (
                      <th
                        key={t.id}
                        className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-wide text-[#666]"
                      >
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e8e8]">
                  {[
                    { key: "aiForecast" as const, label: "AI Demand Forecast" },
                    { key: "multiWarehouse" as const, label: "Multi-Warehouse" },
                    { key: "customBranding" as const, label: "Custom Branding" },
                    { key: "apiAccess" as const, label: "API Access" },
                    { key: "advancedAnalytics" as const, label: "Advanced Analytics" },
                    { key: "whiteLabel" as const, label: "White Label" },
                  ].map(({ key, label }) => (
                    <tr key={key} className="hover:bg-[#fafafa]">
                      <td className="px-4 py-3 text-sm font-bold text-[#1a1a1a]">
                        {label}
                      </td>
                      {tenants.map((t) => (
                        <td key={t.id} className="px-4 py-3 text-center">
                          {t.features[key] ? (
                            <span className="inline-flex items-center gap-1 rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">
                              <ToggleRight className="h-3 w-3" />
                              Enabled
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-[#f3f4f6] px-2 py-0.5 text-[10px] font-bold text-[#999]">
                              <ToggleLeft className="h-3 w-3" />
                              Disabled
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── Summary Footer ────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total Tenants", val: tenants.length.toString(), color: "text-[#0c831f]" },
              { label: "Active Subscriptions", val: tenants.filter((t) => t.status === "active").length.toString(), color: "text-[#2563eb]" },
              { label: "Monthly Revenue", val: `₹${(totalMonthlyRevenue / 1000).toFixed(1)}K`, color: "text-[#ff4f8b]" },
              { label: "Avg. Users/Tenant", val: Math.round(tenants.reduce((s, t) => s + t.usersCount, 0) / tenants.length).toString(), color: "text-[#d97706]" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-[#f6f7f6] px-3 py-2 text-center"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">
                  {stat.label}
                </p>
                <p className={`text-xs font-black ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Modals ──────────────────────────────────────────── */}
      <AddTenantModal open={addOpen} onClose={() => setAddOpen(false)} />
      <FeaturesModal
        tenant={selectedTenant}
        open={featuresOpen}
        onClose={() => {
          setFeaturesOpen(false);
          setSelectedTenant(null);
        }}
      />
      <BrandingModal
        tenant={selectedTenant}
        open={brandingOpen}
        onClose={() => {
          setBrandingOpen(false);
          setSelectedTenant(null);
        }}
      />
      <DomainModal
        tenant={selectedTenant}
        open={domainOpen}
        onClose={() => {
          setDomainOpen(false);
          setSelectedTenant(null);
        }}
      />
      <BillingModal
        tenant={selectedTenant}
        open={billingOpen}
        onClose={() => {
          setBillingOpen(false);
          setSelectedTenant(null);
        }}
      />
    </DashboardLayout>
  );
}
