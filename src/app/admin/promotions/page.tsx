"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import PromotionKpi from "@/components/ui/admin/promotion-kpi";
import PromotionTable from "@/components/ui/admin/promotion-table";
import { useState } from "react";
import {
  Tag,
  FlaskConical,
  Copy,
  Play,
  Plus,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  BarChart3,
  Percent,
  Gift,
  TestTube,
  Zap,
  TrendingUp,
  Users,
  ShoppingCart,
} from "lucide-react";

type TabType = "all" | "flash-sale" | "bogo" | "combo" | "coupon";

const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "All Campaigns", icon: <Tag className="h-3.5 w-3.5" /> },
  { key: "flash-sale", label: "Flash Sale", icon: <Zap className="h-3.5 w-3.5" /> },
  { key: "bogo", label: "BOGO", icon: <Gift className="h-3.5 w-3.5" /> },
  { key: "combo", label: "Combo Offer", icon: <Copy className="h-3.5 w-3.5" /> },
  { key: "coupon", label: "Coupon", icon: <Percent className="h-3.5 w-3.5" /> },
];

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Revenue Engine
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Promotions & Coupon Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Create and manage flash sales, BOGO deals, combo offers, and coupon codes.
                Track performance, schedule campaigns, and run A/B tests to maximise conversions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/promotions/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <Plus className="w-4 h-4" />
                  Create Promotion
                </button>
              </Link>
              <Link href="/admin/promotions/schedule">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
              </Link>
              <Link href="/admin/promotions/ab-testing">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <TestTube className="w-4 h-4" />
                  A/B Testing
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <PromotionKpi
            title="Active Campaigns"
            value="3"
            growth="+1"
            subtitle="vs last week"
            icon={<FlaskConical className="h-4 w-4" />}
          />
          <PromotionKpi
            title="Total Redemptions"
            value="5,093"
            growth="+18%"
            subtitle="vs last month"
            icon={<ShoppingCart className="h-4 w-4" />}
          />
          <PromotionKpi
            title="Promo Revenue"
            value="₹4.97L"
            growth="+24%"
            subtitle="this month"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <PromotionKpi
            title="Coupon Codes"
            value="12"
            growth="+3"
            subtitle="active"
            icon={<Percent className="h-4 w-4" />}
          />
          <PromotionKpi
            title="Scheduled"
            value="3"
            subtitle="upcoming"
            icon={<Calendar className="h-4 w-4" />}
          />
          <PromotionKpi
            title="A/B Tests"
            value="2"
            growth="+1"
            subtitle="running"
            icon={<TestTube className="h-4 w-4" />}
          />
        </div>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Quick Actions
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Build a Campaign in 30 Seconds</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                icon: <Zap className="h-5 w-5" />,
                label: "Flash Sale",
                desc: "Time-limited bulk discount",
                href: "/admin/promotions/create?type=flash-sale",
                bg: "bg-[#fff0f6]",
                text: "text-[#ff4f8b]",
              },
              {
                icon: <Gift className="h-5 w-5" />,
                label: "BOGO",
                desc: "Buy 1 Get 1 Free",
                href: "/admin/promotions/create?type=bogo",
                bg: "bg-[#e8f5e9]",
                text: "text-[#0c831f]",
              },
              {
                icon: <Copy className="h-5 w-5" />,
                label: "Combo Offer",
                desc: "Product bundle deal",
                href: "/admin/promotions/create?type=combo",
                bg: "bg-[#eff6ff]",
                text: "text-[#2563eb]",
              },
              {
                icon: <Percent className="h-5 w-5" />,
                label: "Coupon Code",
                desc: "Discount code for users",
                href: "/admin/promotions/create?type=coupon",
                bg: "bg-[#fffbeb]",
                text: "text-[#d97706]",
              },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md">
                  <div
                    className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl ${action.bg} ${action.text}`}
                  >
                    {action.icon}
                  </div>
                  <p className="text-sm font-black text-[#1a1a1a]">{action.label}</p>
                  <p className="mt-0.5 text-xs font-medium text-[#999]">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Type Tabs */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-4 sm:px-5">
            <div className="-mb-px flex gap-0 overflow-x-auto py-1 sm:gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-sm font-bold transition-colors ${
                    activeTab === tab.key
                      ? "text-[#0c831f]"
                      : "text-[#999] hover:text-[#1a1a1a]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#0c831f]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <PromotionTable filter={activeTab} />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
