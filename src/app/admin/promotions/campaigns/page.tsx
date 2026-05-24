"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Copy,
  Pause,
  Play,
  Trash2,
  Calendar,
  BarChart3,
  Clock,
  DollarSign,
  ShoppingCart,
  Zap,
  Gift,
  Copy as CopyIcon,
  Percent,
  TrendingUp,
  Users,
  ExternalLink,
  Check,
  X,
  Loader,
} from "lucide-react";
import { promotions } from "@/data/promotions";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-[#e8f5e9] text-[#0c831f]" },
  paused: { label: "Paused", className: "bg-[#fffbeb] text-[#d97706]" },
  scheduled: { label: "Scheduled", className: "bg-[#eff6ff] text-[#2563eb]" },
  expired: { label: "Expired", className: "bg-[#fef2f2] text-[#b91c1c]" },
};

const typeIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  "Flash Sale": { icon: <Zap className="h-4 w-4" />, color: "text-[#ff4f8b]" },
  "BOGO": { icon: <Gift className="h-4 w-4" />, color: "text-[#0c831f]" },
  "Combo Offer": { icon: <CopyIcon className="h-4 w-4" />, color: "text-[#2563eb]" },
  "Coupon": { icon: <Percent className="h-4 w-4" />, color: "text-[#d97706]" },
};

function LoaderIcon() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  );
}

export default function PromotionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string, 10);
  const promo = promotions.find((p) => p.id === id);
  const [showCopyConfirm, setShowCopyConfirm] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  if (!promo) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-black text-[#1a1a1a] sm:text-3xl">Campaign Not Found</h1>
            <p className="mt-2 text-sm text-[#666]">Campaign ID {id} does not exist.</p>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  const status = statusConfig[promo.status] || statusConfig.active;
  const typeInfo = typeIcons[promo.type as string] || typeIcons["Flash Sale"];
  const usagePercent =
    "usageLimit" in promo && promo.usageLimit > 0
      ? Math.round(((promo.usageCount as number) / (promo.usageLimit as number)) * 100)
      : 0;
  const isActive = promo.status === "active";
  const isPaused = promo.status === "paused";
  const isScheduled = promo.status === "scheduled";

  const handleDuplicate = () => {
    setShowCopyConfirm(true);
    setTimeout(() => setShowCopyConfirm(false), 2000);
    router.push("/admin/promotions/create");
  };

  const handlePause = async () => {
    setIsPausing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsPausing(false);
  };

  const handleActivate = async () => {
    setIsActivating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsActivating(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3">
              <Link href="/admin/promotions">
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] hover:bg-[#f8f9fa] hover:text-[#1a1a1a]">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wide text-[#0c831f]">{promo.type} Campaign</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black ${status.className}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#0c831f] animate-pulse" : isScheduled ? "bg-[#2563eb] animate-spin" : "bg-[#d97706]"}`} />
                    {status.label}
                  </span>
                </div>
                <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">{promo.name}</h1>
                <p className="mt-1 text-xs font-bold text-[#999]">
                  Created {promo.createdAt} &middot; ID <span className="font-black text-[#666]">#{promo.id}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/promotions/campaigns/${id}/edit`}>
                <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDuplicate}
                className="relative flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                {showCopyConfirm ? (
                  <Check className="w-3.5 h-3.5 text-[#0c831f]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {showCopyConfirm ? "Copied!" : "Duplicate"}
              </button>
              {isActive && (
                <button
                  onClick={handlePause}
                  disabled={isPausing}
                  className={`flex items-center gap-1.5 rounded-lg border border-[#d97706] bg-[#fffbeb] px-3 py-2 text-sm font-semibold text-[#d97706] hover:bg-[#fef3c7] ${isPausing ? "opacity-50" : ""}`}
                >
                  {isPausing ? <LoaderIcon /> : <Pause className="w-3.5 h-3.5" />}
                  {isPausing ? "Pausing..." : "Pause"}
                </button>
              )}
              {isPaused && (
                <button
                  onClick={handleActivate}
                  disabled={isActivating}
                  className={`flex items-center gap-1.5 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] ${isActivating ? "opacity-50" : ""}`}
                >
                  {isActivating ? <LoaderIcon /> : <Play className="w-3.5 h-3.5" />}
                  {isActivating ? "Activating..." : "Activate"}
                </button>
              )}
              {isScheduled && (
                <button className="flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]">
                  <Play className="w-3.5 h-3.5" />
                  Activate Now
                </button>
              )}
              <button className="flex items-center gap-1.5 rounded-lg border border-[#b91c1c] bg-[#fef2f2] px-3 py-2 text-sm font-semibold text-[#b91c1c] hover:bg-[#fecaca]">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* Stats KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Status</p>
            <p className="mt-2 text-xs font-black text-[#0c831f] uppercase tracking-wide">{promo.status}</p>
            <p className="mt-1 text-[10px] text-[#999]">{promo.type}</p>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Discount</p>
            <h2 className="mt-2 text-2xl font-black text-[#ff4f8b]">{promo.discount}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Redemptions</p>
            <h2 className="mt-2 text-2xl font-black text-[#1a1a1a]">{promo.redemptions.toLocaleString("en-US")}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Revenue</p>
            <h2 className="mt-2 text-2xl font-black text-[#0c831f]">{promo.revenue}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Usage Limit</p>
            <h2 className="mt-2 text-2xl font-black text-[#1a1a1a]">{promo.usageLimit.toLocaleString("en-US")}</h2>
            <p className="mt-0.5 text-[10px] text-[#999]">{promo.usageCount} redeemed</p>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Budget</p>
            <h2 className="mt-2 text-lg font-black text-[#1a1a1a]">{promo.budget}</h2>
            <p className="mt-0.5 text-[10px] text-[#999]">Spent {promo.spent}</p>
          </div>
        </div>

        {/* Campaign Info + Usage */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Details</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Campaign Information</h2>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Campaign Name</span>
                <span className="font-black text-[#1a1a1a]">{promo.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Type</span>
                <span className={`inline-flex items-center gap-1 font-black ${typeInfo.color}`}>
                  {typeInfo.icon} {promo.type}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Discount</span>
                <span className="inline-flex items-center rounded-lg bg-[#fff0f6] px-2.5 py-1 text-xs font-black text-[#ff4f8b]">{promo.discount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Min Order Value</span>
                <span className="font-bold text-[#1a1a1a]">{promo.minOrderValue ?? "None"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Max Discount Cap</span>
                <span className="font-bold text-[#1a1a1a]">{promo.maxDiscount ?? "None"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Start Date</span>
                <span className="font-bold text-[#1a1a1a]">{promo.startDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">End Date</span>
                <span className="font-bold text-[#1a1a1a]">{promo.endDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Categories</span>
                <span className="font-bold text-[#2563eb]">{promo.applicableCategories.join(", ")}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Analytics</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Usage & Performance</h2>
            </div>
            <div className="mt-4 space-y-4">
              {/* Usage bar */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666] font-medium">Usage Progress</span>
                  <span className="font-black">
                    {promo.usageCount} / {promo.usageLimit}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#e8e8e8]">
                  <div
                    className={`h-full rounded-full ${
                      usagePercent >= 90 ? "bg-[#ff4f8b]" : usagePercent >= 60 ? "bg-[#d97706]" : "bg-[#0c831f]"
                    } transition-all`}
                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-[#999]">{usagePercent}% of usage limit consumed</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Redemptions</span>
                <span className="font-bold text-[#1a1a1a]">{promo.redemptions.toLocaleString("en-US")}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Revenue Generated</span>
                <span className="font-bold text-[#0c831f]">{promo.revenue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666] font-medium">Budget</span>
                <div className="text-right">
                  <span className="font-bold text-[#1a1a1a]">{promo.budget}</span>
                  <p className="text-[10px] text-[#999]">Spent: {promo.spent}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Description and Actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Description</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">About This Campaign</h2>
          </div>
          <p className="mt-3 text-sm text-[#666] leading-relaxed">{promo.description}</p>
        </section>

        {/* A/B Testing link */}
        {isActive && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">Optional</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Run an A/B Test</h2>
            </div>
            <p className="mt-2 text-sm text-[#666]">
              Test different variants of this campaign to maximise its performance before scaling.
            </p>
            <Link href="/admin/promotions/ab-testing">
              <button className="mt-4 flex items-center gap-2 rounded-lg border border-[#ff4f8b]/40 bg-[#fff0f6] px-4 py-2 text-sm font-semibold text-[#ff4f8b] hover:bg-[#ffe4ee]">
                <TrendingUp className="w-4 h-4" />
                Create A/B Test for this Campaign
              </button>
            </Link>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
