"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import SubscriptionKpi from "@/components/ui/admin/subscription-kpi";
import SubscriptionTable from "@/components/ui/admin/subscription-table";
import { useSubscriptionStore } from "@/store/subscription-store";
import { toast } from "sonner";
import {
  CreditCard,
  RotateCcw,
  Plus,
  RefreshCw,
  Users,
  DollarSign,
  FileText,
  Truck,
  Calendar,
  Percent,
  TrendingUp,
  Activity,
  X,
  Pause,
} from "lucide-react";

export default function SubscriptionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Subscription Engine
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Subscription Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Create and manage subscription plans. Pause, resume, or cancel
                active subscriptions. Track recurring orders, billing cycles, and
                revenue in real time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/subscription/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <Plus className="w-4 h-4" />
                  Create Plan
                </button>
              </Link>
              <Link href="/admin/subscription/recurring">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <Truck className="w-4 h-4" />
                  Recurring Orders
                </button>
              </Link>
              <button
                onClick={() => {
                  useSubscriptionStore.getState().refresh();
                  toast.success("Subscriptions refreshed");
                }}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <SubscriptionKpi
            title="Total Subscribers"
            value="8"
            growth="+2"
            subtitle="vs last month"
            icon={<Users className="h-4 w-4" />}
          />
          <SubscriptionKpi
            title="Active Subscriptions"
            value="5"
            growth="+1"
            subtitle="vs last month"
            icon={<Activity className="h-4 w-4" />}
            accent="text-[#0c831f]"
          />
          <SubscriptionKpi
            title="Monthly Revenue"
            value="₹3.26K"
            growth="+12%"
            subtitle="vs last month"
            icon={<DollarSign className="h-4 w-4" />}
            accent="text-[#0c831f]"
          />
          <SubscriptionKpi
            title="Paused"
            value="2"
            subtitle="need attention"
            icon={<RotateCcw className="h-4 w-4" />}
            accent="text-[#d97706]"
          />
          <SubscriptionKpi
            title="Cancelled"
            value="1"
            subtitle="this month"
            icon={<X className="h-4 w-4" />}
            accent="text-[#b91c1c]"
          />
          <SubscriptionKpi
            title="Recurring Orders"
            value="7"
            growth="+3"
            subtitle="completed"
            icon={<Truck className="h-4 w-4" />}
            accent="text-[#0c831f]"
          />
        </div>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Quick Actions
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Manage Plans & Subscriptions</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                icon: <CreditCard className="h-5 w-5" />,
                label: "Create Plan",
                desc: "Add a new subscription plan",
                href: "/admin/subscription/create",
                bg: "bg-[#e8f5e9]",
                text: "text-[#0c831f]",
              },
              {
                icon: <RotateCcw className="h-5 w-5" />,
                label: "Resume Paused",
                desc: "Restart active subscriptions",
                href: "#",
                bg: "bg-[#f0fdf4]",
                text: "text-[#0c831f]",
              },
              {
                icon: <Pause className="h-5 w-5" />,
                label: "Bulk Pause",
                desc: "Temporarily pause multiple",
                href: "#",
                bg: "bg-[#fffbeb]",
                text: "text-[#d97706]",
              },
              {
                icon: <X className="h-5 w-5" />,
                label: "Cancel Subscriptions",
                desc: "End subscriptions early",
                href: "#",
                bg: "bg-[#fef2f2]",
                text: "text-[#b91c1c]",
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

        {/* Main Table */}
        <SubscriptionTable />
      </div>
    </DashboardLayout>
  );
}
