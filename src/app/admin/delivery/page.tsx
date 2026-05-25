"use client";

import DashboardLayout from "../dashboard-layout";
import DeliveryTable from "@/components/ui/admin/delivery-table";
import { useState } from "react";
import {
  UserPlus,
  RefreshCw,
  Download,
  Filter,
  Truck,
  MapPin,
  Star,
  DollarSign,
  Clock,
  Activity,
  Shield,
  Navigation,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Warehouse,
  Gauge,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const deliveryStats = [
  {
    label: "Active Partners",
    value: "296",
    change: "+15% vs last month",
    icon: Truck,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "Total Partners",
    value: "842",
    change: "Registered fleet",
    icon: Truck,
    color: "text-[#2563eb]",
    bg: "bg-[#eff6ff]",
  },
  {
    label: "Deliveries Today",
    value: "1,284",
    change: "+18% vs yesterday",
    icon: CheckCircle,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "On-Time Rate",
    value: "94%",
    change: "+2% improvement",
    icon: Clock,
    color: "text-[#059669]",
    bg: "bg-[#ecfdf5]",
  },
  {
    label: "Avg Delivery Time",
    value: "18 min",
    change: "-2 min vs last week",
    icon: Gauge,
    color: "text-[#7c3aed]",
    bg: "bg-[#f5f3ff]",
  },
  {
    label: "Avg Rating",
    value: "4.8",
    change: "Customer satisfaction",
    icon: Star,
    color: "text-[#d97706]",
    bg: "bg-[#fffbeb]",
  },
  {
    label: "Earnings Today",
    value: "₹8.4K",
    change: "Partner payouts",
    icon: DollarSign,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "Delayed Orders",
    value: "18",
    change: "Needs attention",
    icon: AlertTriangle,
    color: "text-[#ff4f8b]",
    bg: "bg-[#fff0f6]",
  },
];

const deliveryZones = [
  { name: "Zone A — Central", partners: "48", orders: "320", coverage: "95%", status: "optimal" },
  { name: "Zone B — North", partners: "36", orders: "285", coverage: "88%", status: "good" },
  { name: "Zone C — South", partners: "42", orders: "298", coverage: "92%", status: "optimal" },
  { name: "Zone D — East", partners: "28", orders: "196", coverage: "76%", status: "needs-staffing" },
  { name: "Zone E — West", partners: "52", orders: "410", coverage: "98%", status: "optimal" },
  { name: "Zone F — Suburbs", partners: "18", orders: "112", coverage: "62%", status: "needs-staffing" },
];

export default function DeliveryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Enterprise Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0c831f]">
                  Delivery Operations
                </span>
                <span className="rounded-full bg-[#eff6ff] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#2563eb]">
                  296 Active Now
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Delivery Partner Console
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666]">
                Manage delivery partners, track shipments, optimize routes, and monitor fleet performance in real-time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#666]">
                <span className="h-2 w-2 rounded-full bg-[#0c831f] animate-pulse" />
                Live
              </div>
              <button
                onClick={() => toast.info("Opening add partner form")}
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
              >
                <UserPlus className="h-4 w-4" />
                Add Partner
              </button>
              <button
                onClick={() => toast.success("Delivery partners refreshed")}
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
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {deliveryStats.map((stat) => {
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
                  <p className="mt-0.5 text-[10px] font-medium text-[#999]">{stat.change}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Delivery Table */}
        <DeliveryTable />

        {/* Delivery Zones + Live Tracking */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_0.6fr]">
          {/* Delivery Zones */}
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[#0c831f]" />
              <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                Delivery Zones & Coverage
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {deliveryZones.map((zone) => (
                <div
                  key={zone.name}
                  className={`rounded-xl border p-3 ${
                    zone.status === "optimal"
                      ? "border-[#e8e8e8] bg-white"
                      : zone.status === "good"
                      ? "border-[#e8e8e8] bg-white"
                      : "border-[#f59e0b] bg-[#fffbeb]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#1a1a1a]">{zone.name}</p>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        zone.status === "optimal"
                          ? "bg-[#0c831f]"
                          : zone.status === "good"
                          ? "bg-[#2563eb]"
                          : "bg-[#f59e0b]"
                      }`}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#999]">Partners</span>
                      <p className="font-bold text-[#1a1a1a]">{zone.partners}</p>
                    </div>
                    <div>
                      <span className="text-[#999]">Orders</span>
                      <p className="font-bold text-[#1a1a1a]">{zone.orders}</p>
                    </div>
                    <div>
                      <span className="text-[#999]">Coverage</span>
                      <p className="font-bold text-[#0c831f]">{zone.coverage}</p>
                    </div>
                    <div>
                      <span className="text-[#999]">Status</span>
                      <p
                        className={`font-bold ${
                          zone.status === "optimal"
                            ? "text-[#0c831f]"
                            : zone.status === "good"
                            ? "text-[#2563eb]"
                            : "text-[#f59e0b]"
                        }`}
                      >
                        {zone.status === "optimal"
                          ? "Optimal"
                          : zone.status === "good"
                          ? "Good"
                          : "Needs Staffing"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Tracking + Performance */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-[#ff4f8b]" />
                <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                  Live Tracking
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Out for Delivery</span>
                  <span className="text-lg font-black text-[#0c831f]">56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Delivered Today</span>
                  <span className="text-lg font-black text-[#1a1a1a]">1,142</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">In Progress</span>
                  <span className="text-lg font-black text-[#2563eb]">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Average ETA</span>
                  <span className="text-lg font-black text-[#7c3aed]">18 min</span>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-[#f6f7f6] p-3">
                <p className="text-xs text-[#666]">
                  Live GPS tracking of all active delivery partners displayed on map.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-[#0c831f]" />
                <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                  Fleet Health
                </h2>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "On-Time", value: "94%", color: "text-[#0c831f]" },
                  { label: "Avg Rating", value: "4.8", color: "text-[#d97706]" },
                  { label: "Earnings", value: "₹8.4K", color: "text-[#0c831f]" },
                  { label: "Shifts", value: "156", color: "text-[#1a1a1a]" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-[#e8e8e8] bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{metric.label}</p>
                    <p className={`mt-1 text-lg font-black ${metric.color}`}>{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
