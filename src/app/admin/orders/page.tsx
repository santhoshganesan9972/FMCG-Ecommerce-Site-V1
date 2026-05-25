"use client";

import DashboardLayout from "../dashboard-layout";
import OrderKanban from "@/components/ui/admin/order-kanban";
import { useState, useMemo } from "react";
import {
  ShoppingCart,
  Timer,
  CheckCircle,
  XCircle,
  TrendingUp,
  Truck,
  RefreshCw,
  Download,
  Filter,
  Plus,
  CalendarDays,
  ChevronDown,
  Clock,
  AlertTriangle,
  IndianRupee,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const orderStats = [
  {
    label: "Total Orders",
    value: "1,284",
    change: "+18%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "Pending",
    value: "42",
    change: "-12%",
    trend: "down",
    icon: Clock,
    color: "text-[#d97706]",
    bg: "bg-[#fffbeb]",
  },
  {
    label: "Processing",
    value: "128",
    change: "+8%",
    trend: "up",
    icon: Package,
    color: "text-[#2563eb]",
    bg: "bg-[#eff6ff]",
  },
  {
    label: "Out for Delivery",
    value: "56",
    change: "+22%",
    trend: "up",
    icon: Truck,
    color: "text-[#7c3aed]",
    bg: "bg-[#f5f3ff]",
  },
  {
    label: "Delivered Today",
    value: "1,142",
    change: "+22%",
    trend: "up",
    icon: CheckCircle,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "Cancelled",
    value: "18",
    change: "-8%",
    trend: "down",
    icon: XCircle,
    color: "text-[#ff4f8b]",
    bg: "bg-[#fff0f6]",
  },
  {
    label: "Revenue Today",
    value: "₹3.2L",
    change: "+24%",
    trend: "up",
    icon: IndianRupee,
    color: "text-[#059669]",
    bg: "bg-[#ecfdf5]",
  },
  {
    label: "Avg Delivery Time",
    value: "24 min",
    change: "-2 min",
    trend: "down",
    icon: Timer,
    color: "text-[#0891b2]",
    bg: "bg-[#ecfeff]",
  },
];

type ViewMode = "kanban" | "list";

const statusTabs = [
  { id: "all", label: "All Orders", count: 1284 },
  { id: "new", label: "New", count: 18 },
  { id: "processing", label: "Processing", count: 128 },
  { id: "out-for-delivery", label: "Out for Delivery", count: 56 },
  { id: "delivered", label: "Delivered", count: 1042 },
  { id: "cancelled", label: "Cancelled", count: 18 },
  { id: "returned", label: "Returns", count: 22 },
];

export default function OrdersPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [activeStatus, setActiveStatus] = useState("all");

  const activeTab = statusTabs.find((t) => t.id === activeStatus) ?? statusTabs[0];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Enterprise Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0c831f]">
                  Order Management
                </span>
                <span className="rounded-full bg-[#fff0f6] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#ff4f8b]">
                  {activeTab.count} Active
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Order Management
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666]">
                Track, manage, and fulfill customer orders from placement to delivery with real-time status updates.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-[#e8e8e8] p-0.5">
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                    viewMode === "kanban"
                      ? "bg-[#0c831f] text-white"
                      : "text-[#666] hover:text-[#1a1a1a]"
                  }`}
                >
                  Kanban
                </button>
                <button
                  onClick={() => { setViewMode("list"); toast.info("List view — coming soon"); }}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                    viewMode === "list"
                      ? "bg-[#0c831f] text-white"
                      : "text-[#666] hover:text-[#1a1a1a]"
                  }`}
                >
                  List
                </button>
              </div>
              <button
                onClick={() => toast.success("Orders refreshed")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
              <button
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {orderStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#e8e8e8] bg-white p-3 transition-all hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[10px] font-bold uppercase tracking-wide text-[#999]">
                      {stat.label}
                    </p>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${stat.bg}`}>
                      <Icon className={`h-3 w-3 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="mt-1.5 text-lg font-black text-[#1a1a1a]">{stat.value}</p>
                  <div className="mt-0.5 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-[#0c831f]" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-[#ff4f8b]" />
                    )}
                    <span
                      className={`text-[10px] font-bold ${
                        stat.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-[10px] text-[#ccc]">vs yesterday</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-[#e8e8e8] bg-white p-1.5 shadow-sm">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatus(tab.id)}
              className={`relative flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold transition-all ${
                activeStatus === tab.id
                  ? "bg-[#e8f5e9] text-[#0c831f]"
                  : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeStatus === tab.id
                    ? "bg-[#0c831f] text-white"
                    : "bg-[#f0f0f0] text-[#999]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Bulk Status Update", desc: "Update multiple orders", icon: RefreshCw, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
            { label: "Assign Delivery Partner", desc: "Auto-assign to nearest", icon: Truck, color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]" },
            { label: "Process Returns", desc: "Handle return requests", icon: AlertTriangle, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
            { label: "Generate Invoice", desc: "Bulk invoice download", icon: IndianRupee, color: "text-[#059669]", bg: "bg-[#ecfdf5]" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => toast.info(`${action.label} action triggered`)}
              className="flex items-center gap-3 rounded-xl border border-[#e8e8e8] bg-white p-4 text-left transition-all hover:border-[#0c831f]/30 hover:shadow-sm"
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${action.bg}`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1a1a1a]">{action.label}</p>
                <p className="mt-0.5 text-xs text-[#999]">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Order Kanban Board */}
        <OrderKanban />
      </div>
    </DashboardLayout>
  );
}
