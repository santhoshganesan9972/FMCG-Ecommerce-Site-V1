"use client";

import DashboardLayout from "../dashboard-layout";
import InventorySearch from "@/components/ui/admin/inventory-search";
import ProductForm from "@/components/ui/admin/product-form";
import InventoryTable from "@/components/ui/admin/inventory-table";
import { useState } from "react";
import { toast } from "sonner";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Download,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Warehouse,
  AlertCircle,
  Clock,
  Boxes,
  BarChart3,
  Truck,
  Scale,
  Zap,
  RefreshCcw,
  ClipboardList,
  FileWarning,
  Activity,
} from "lucide-react";

const inventoryStats = [
  {
    label: "Total SKUs",
    value: "5",
    change: "Active items",
    icon: Package,
    color: "text-[#0c831f]",
    bg: "bg-[#e8f5e9]",
  },
  {
    label: "Available Stock",
    value: "285",
    change: "Sellable units",
    icon: Boxes,
    color: "text-[#2563eb]",
    bg: "bg-[#eff6ff]",
  },
  {
    label: "Reserved",
    value: "37",
    change: "Held for orders",
    icon: ClipboardList,
    color: "text-[#d97706]",
    bg: "bg-[#fffbeb]",
  },
  {
    label: "Damaged",
    value: "8",
    change: "Needs review",
    icon: FileWarning,
    color: "text-[#ff4f8b]",
    bg: "bg-[#fff0f6]",
  },
  {
    label: "Expiry Alerts",
    value: "3",
    change: "Near expiry",
    icon: AlertTriangle,
    color: "text-[#dc2626]",
    bg: "bg-[#fef2f2]",
  },
  {
    label: "Total Value",
    value: "₹12.4L",
    change: "+8% vs last month",
    icon: TrendingUp,
    color: "text-[#059669]",
    bg: "bg-[#ecfdf5]",
  },
  {
    label: "Reorder Needed",
    value: "14",
    change: "Below threshold",
    icon: AlertCircle,
    color: "text-[#dc2626]",
    bg: "bg-[#fef2f2]",
  },
  {
    label: "Turnover Rate",
    value: "4.2x",
    change: "Monthly avg",
    icon: Activity,
    color: "text-[#7c3aed]",
    bg: "bg-[#f5f3ff]",
  },
];

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Enterprise Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0c831f]">
                  Inventory Intelligence
                </span>
                <span className="rounded-full bg-[#fff0f6] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#ff4f8b]">
                  3 Low Stock Alerts
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Inventory Management
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#666]">
                Track warehouse balances, available stock, reserved stock, damaged goods, expiry dates, and reorder forecasts all in one centralized control panel.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <InventorySearch />
              <button
                onClick={() => toast.success("Inventory refreshed")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {inventoryStats.map((stat) => {
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

        {/* Stock Controls + Warehouse Overview */}
        <section className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-[#0c831f]" />
              <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                Warehouse Stock Actions
              </h2>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Add Stock", icon: Plus, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                { label: "Remove Stock", icon: MinusIcon, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
                { label: "Transfer Stock", icon: Truck, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
                { label: "Reserve Stock", icon: ClipboardList, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
                { label: "Release Stock", icon: RefreshCcw, color: "text-[#059669]", bg: "bg-[#ecfdf5]" },
                { label: "Stock Adjustment", icon: Scale, color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]" },
                { label: "Mark Damaged", icon: FileWarning, color: "text-[#dc2626]", bg: "bg-[#fef2f2]" },
                { label: "Write Off Expired", icon: Clock, color: "text-[#0891b2]", bg: "bg-[#ecfeff]" },
                { label: "Auto Reorder", icon: Zap, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                { label: "Forecast Stock", icon: BarChart3, color: "text-[#7c3aed]", bg: "bg-[#f5f3ff]" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => toast.info(action.label + " — feature coming soon")}
                  className="flex items-center gap-3 rounded-xl border border-[#e8e8e8] bg-white p-3 text-left transition-all hover:border-[#0c831f]/30 hover:shadow-sm"
                >
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${action.bg}`}>
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <span className="text-sm font-bold text-[#1a1a1a]">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-[#ff4f8b]" />
                <h2 className="text-sm font-black uppercase tracking-wide text-[#1a1a1a]">
                  Stock by Location
                </h2>
              </div>
              <span className="inline-flex rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-xs font-black text-[#0c831f]">
                4 Warehouses
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { label: "Mumbai Hub", value: "120", total: "285", caption: "Reserved 14, Damaged 2" },
                { label: "Pune Cold Storage", value: "18", total: "285", caption: "Reserved 6, Damaged 1" },
                { label: "Bangalore Cold Room", value: "85", total: "285", caption: "Reserved 9, Damaged 4" },
                { label: "Hyderabad Depot", value: "42", total: "285", caption: "Reserved 8, Damaged 1" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-[#e8e8e8] bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-3.5 w-3.5 text-[#666]" />
                      <p className="text-sm font-bold text-[#1a1a1a]">{item.label}</p>
                    </div>
                    <span className="text-sm font-bold text-[#0c831f]">{item.value} units</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
                    <div
                      className="h-full rounded-full bg-[#0c831f]"
                      style={{ width: `${(parseInt(item.value) / parseInt(item.total)) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#999]">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Low Stock Alerts */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fef2f2]">
                <AlertTriangle className="h-4 w-4 text-[#dc2626]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#1a1a1a]">Low Stock & Expiry Alerts</h2>
                <p className="text-xs text-[#999]">Items requiring immediate attention</p>
              </div>
            </div>
            <button
              onClick={() => toast.success("All alerts reviewed")}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f8f9fa]"
            >
              Dismiss All
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Cold-Pressed Sunflower Oil", sku: "SKU-0012", issue: "Low Stock", level: "12 units", severity: "high" },
              { name: "Alphonso Mangoes (6 pcs)", sku: "SKU-0016", issue: "Low Stock", level: "8 units", severity: "high" },
              { name: "Dark Chocolate Bar (70%)", sku: "SKU-0022", issue: "Low Stock", level: "5 units", severity: "critical" },
              { name: "Apple Cider Vinegar", sku: "SKU-0027", issue: "Low Stock", level: "10 units", severity: "medium" },
              { name: "Paneer (200 g)", sku: "SKU-0031", issue: "Expiring Soon", level: "2 days", severity: "critical" },
              { name: "Full Cream Milk (1 L)", sku: "SKU-0005", issue: "Expiring Soon", level: "3 days", severity: "high" },
            ].map((alert) => (
              <div
                key={alert.sku}
                className={`rounded-xl border p-3 ${
                  alert.severity === "critical"
                    ? "border-[#ff4f8b] bg-[#fff0f6]"
                    : alert.severity === "high"
                    ? "border-[#f59e0b] bg-[#fffbeb]"
                    : "border-[#e8e8e8] bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#1a1a1a] truncate">{alert.name}</p>
                    <p className="text-xs text-[#999]">{alert.sku}</p>
                  </div>
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      alert.severity === "critical"
                        ? "bg-[#ff4f8b] text-white"
                        : alert.severity === "high"
                        ? "bg-[#f59e0b] text-white"
                        : "bg-[#f0f0f0] text-[#666]"
                    }`}
                  >
                    {alert.issue}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-[#666]">Level:</span>
                  <span className="text-sm font-bold text-[#1a1a1a]">{alert.level}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ProductForm />

        <InventoryTable />
      </div>
    </DashboardLayout>
  );
}

// Inline component to avoid import issues
function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
    </svg>
  );
}
