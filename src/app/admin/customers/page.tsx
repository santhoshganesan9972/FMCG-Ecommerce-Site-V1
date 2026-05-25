"use client";

import DashboardLayout from "../dashboard-layout";
import CustomerTable from "@/components/ui/admin/customer-table";
import { useState } from "react";
import {
  Users,
  UserPlus,
  TrendingUp,
  UserCheck,
  UserX,
  DollarSign,
  RefreshCw,
  Download,
  Filter,
  Upload,
  Star,
  ShoppingBag,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Shield,
  Gift,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const customerStats = [
  {
    label: "Total Customers",
    value: "42.8K",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "Active Users",
    value: "8.2K",
    change: "+15%",
    trend: "up",
    icon: UserCheck,
    color: "text-[#2563eb]",
    bg: "bg-[#eff6ff]",
  },
  {
    label: "New This Month",
    value: "1,842",
    change: "+28%",
    trend: "up",
    icon: UserPlus,
    color: "text-[#7c3aed]",
    bg: "bg-[#f5f3ff]",
  },
  {
    label: "Churned",
    value: "126",
    change: "-5%",
    trend: "down",
    icon: UserX,
    color: "text-[#ff4f8b]",
    bg: "bg-[#fff0f6]",
  },
  {
    label: "Avg Order Value",
    value: "₹342",
    change: "+6%",
    trend: "up",
    icon: DollarSign,
    color: "text-[#059669]",
    bg: "bg-[#ecfdf5]",
  },
  {
    label: "Repeat Rate",
    value: "68%",
    change: "+4%",
    trend: "up",
    icon: ShoppingBag,
    color: "text-[#0891b2]",
    bg: "bg-[#ecfeff]",
  },
  {
    label: "Loyalty Members",
    value: "12.4K",
    change: "+22%",
    trend: "up",
    icon: Star,
    color: "text-[#d97706]",
    bg: "bg-[#fffbeb]",
  },
  {
    label: "Lifetime Value",
    value: "₹4,280",
    change: "+14%",
    trend: "up",
    icon: TrendingUp,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
];

const segments = [
  { label: "High Value", count: "4,280", pct: "10%", color: "bg-[#e8f5e9] text-[#0c831f]" },
  { label: "Regular", count: "18,420", pct: "43%", color: "bg-[#eff6ff] text-[#2563eb]" },
  { label: "Occasional", count: "14,980", pct: "35%", color: "bg-[#fffbeb] text-[#d97706]" },
  { label: "At Risk", count: "4,280", pct: "10%", color: "bg-[#fff0f6] text-[#ff4f8b]" },
  { label: "New", count: "840", pct: "2%", color: "bg-[#f5f3ff] text-[#7c3aed]" },
];

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Enterprise Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0c831f]">
                  Customer Intelligence
                </span>
                <span className="rounded-full bg-[#eff6ff] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#2563eb]">
                  42.8K Total
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Customer Management
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666]">
                Manage customer profiles, view order history, analyze segments, and handle support tickets.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
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
                <Upload className="h-4 w-4" />
                Import
              </button>
              <button
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
              >
                <UserPlus className="h-4 w-4" />
                Add Customer
              </button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {customerStats.map((stat) => {
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
                    <span className="text-[10px] text-[#ccc]">vs last month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Segments + Quick Actions */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[#0c831f]" />
              <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                Quick Actions
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Send Bulk Email", desc: "Newsletter & offers", icon: Activity, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                { label: "Export Segment", desc: "CSV with filters", icon: Download, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
                { label: "Merge Duplicates", desc: "Clean customer data", icon: UserPlus, color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]" },
                { label: "Fraud Review", desc: "High-risk profiles", icon: Shield, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
                { label: "Loyalty Points", desc: "Bulk adjustment", icon: Gift, color: "text-[#059669]", bg: "bg-[#ecfdf5]" },
                { label: "Segment Builder", desc: "Custom audience", icon: Zap, color: "text-[#0891b2]", bg: "bg-[#ecfeff]" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => toast.info(`${action.label} action triggered`)}
                  className="flex items-center gap-3 rounded-xl border border-[#e8e8e8] bg-white p-3 text-left transition-all hover:border-[#0c831f]/30 hover:shadow-sm"
                >
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${action.bg}`}>
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#1a1a1a]">{action.label}</p>
                    <p className="mt-0.5 text-xs text-[#999]">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Segments */}
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[#ff4f8b]" />
              <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                Customer Segments
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              {segments.map((seg) => (
                <div key={seg.label} className="rounded-xl border border-[#e8e8e8] bg-white p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1a1a1a]">{seg.label}</span>
                    <span className="text-xs font-semibold text-[#666]">{seg.count}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0f0f0]">
                      <div
                        className={`h-full rounded-full ${seg.color.split(" ")[0]}`}
                        style={{ width: seg.pct }}
                      />
                    </div>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${seg.color}`}>
                      {seg.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <CustomerTable />
      </div>
    </DashboardLayout>
  );
}
