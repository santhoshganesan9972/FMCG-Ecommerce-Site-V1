"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  MapPin,
  Package,
  Eye,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface DashboardData {
  revenue: { total: number; growth: number; chart: { label: string; value: number }[] };
  orders: { total: number; growth: number; pending: number; chart: { label: string; value: number }[] };
  customers: { total: number; growth: number; active: number };
  topProducts: { id: string; name: string; sales: number; revenue: number; image: string }[];
  lowStockAlerts: { id: string; name: string; stock: number; threshold: number; warehouse: string }[];
  vendorPayments: { id: string; vendor: string; amount: number; dueDate: string; status: string }[];
  liveOrders: { id: string; customer: string; items: number; total: number; status: string; time: string }[];
}

const mockData: DashboardData = {
  revenue: { total: 12456890, growth: 12.5, chart: [
    { label: "Jan", value: 850000 }, { label: "Feb", value: 920000 },
    { label: "Mar", value: 1050000 }, { label: "Apr", value: 1150000 },
    { label: "May", value: 1280000 }, { label: "Jun", value: 1420000 },
  ]},
  orders: { total: 245678, growth: 8.3, pending: 345, chart: [
    { label: "Mon", value: 420 }, { label: "Tue", value: 380 }, { label: "Wed", value: 510 },
    { label: "Thu", value: 490 }, { label: "Fri", value: 580 }, { label: "Sat", value: 620 }, { label: "Sun", value: 450 },
  ]},
  customers: { total: 38452, growth: 15.3, active: 12450 },
  topProducts: [
    { id: "PRD-001", name: "Organic Basmati Rice", sales: 117, revenue: 58400, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop" },
    { id: "PRD-002", name: "Fresh Red Apples", sales: 210, revenue: 41800, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=80&h=80&fit=crop" },
    { id: "PRD-004", name: "Full Cream Milk 1L", sales: 1400, revenue: 95200, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&h=80&fit=crop" },
    { id: "PRD-008", name: "Cold Brew Coffee", sales: 150, revenue: 37400, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=80&h=80&fit=crop" },
  ],
  lowStockAlerts: [
    { id: "PRD-003", name: "Natural Honey 500g", stock: 0, threshold: 20, warehouse: "Delhi Central" },
    { id: "PRD-007", name: "Salted Butter 100g", stock: 5, threshold: 15, warehouse: "Mumbai Hub" },
    { id: "PRD-010", name: "Green Tea Pack", stock: 8, threshold: 20, warehouse: "Bangalore" },
  ],
  vendorPayments: [
    { id: "PO-001", vendor: "Fortune Foods Ltd", amount: 245000, dueDate: "2026-05-28", status: "pending" },
    { id: "PO-002", vendor: "Amul Dairy", amount: 136000, dueDate: "2026-05-25", status: "overdue" },
    { id: "PO-003", vendor: "Happilo International", amount: 78000, dueDate: "2026-06-05", status: "pending" },
  ],
  liveOrders: [
    { id: "ORD-001", customer: "Ravi Kumar", items: 5, total: 1240, status: "preparing", time: "5 min ago" },
    { id: "ORD-002", customer: "Anita Singh", items: 3, total: 680, status: "out_for_delivery", time: "12 min ago" },
    { id: "ORD-003", customer: "Vikram Patel", items: 8, total: 2150, status: "confirmed", time: "18 min ago" },
    { id: "ORD-004", customer: "Priya Sharma", items: 2, total: 450, status: "preparing", time: "22 min ago" },
  ],
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setData(mockData); setLoading(false); }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Dashboard</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Operations Overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Real-time metrics across revenue, orders, customers, inventory, and vendor payments.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </section>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-28 rounded-xl border border-[#e8e8e8] bg-white p-4 skeleton-shimmer" />
            ))}
          </div>
        ) : data ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <ReusableCard
                title="Revenue"
                value={`₹${(data.revenue.total / 10000000).toFixed(2)}Cr`}
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: `${data.revenue.growth}%`, direction: "up", label: "vs last month" }}
                color="text-[#0c831f]"
                bgColor="bg-[#e8f5e9]"
              />
              <ReusableCard
                title="Orders"
                value={data.orders.total.toLocaleString()}
                icon={<ShoppingCart className="h-4 w-4" />}
                trend={{ value: `${data.orders.growth}%`, direction: "up", label: "vs last month" }}
                color="text-[#2563eb]"
                bgColor="bg-[#eff6ff]"
              />
              <ReusableCard
                title="Customers"
                value={data.customers.total.toLocaleString()}
                icon={<Users className="h-4 w-4" />}
                trend={{ value: `${data.customers.growth}%`, direction: "up", label: "vs last month" }}
                color="text-[#ff4f8b]"
                bgColor="bg-[#fff0f6]"
              >
                <p className="mt-1 text-[10px] text-[#999]">{data.customers.active.toLocaleString()} active</p>
              </ReusableCard>
              <ReusableCard
                title="Pending Orders"
                value={data.orders.pending}
                icon={<Clock className="h-4 w-4" />}
                trend={{ value: "Needs attention", direction: "down", label: "" }}
                color="text-[#d97706]"
                bgColor="bg-[#fffbeb]"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Revenue</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Monthly Trend</h3>
                  </div>
                  <TrendingUp className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div className="flex h-48 items-end gap-2">
                  {data.revenue.chart.map((point) => {
                    const max = Math.max(...data.revenue.chart.map(p => p.value));
                    const height = (point.value / max) * 100;
                    return (
                      <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[9px] font-bold text-[#0c831f]">₹{(point.value / 100000).toFixed(1)}L</span>
                        <div
                          className="w-full rounded-t-lg bg-[#0c831f]/20 transition-all hover:bg-[#0c831f]/40"
                          style={{ height: `${height}%`, minHeight: 16 }}
                        />
                        <span className="text-[9px] text-[#999]">{point.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">This Week</h3>
                  </div>
                  <ShoppingCart className="h-4 w-4 text-[#2563eb]" />
                </div>
                <div className="flex h-48 items-end gap-2">
                  {data.orders.chart.map((point) => {
                    const max = Math.max(...data.orders.chart.map(p => p.value));
                    const height = (point.value / max) * 100;
                    return (
                      <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
                        <span className="text-[9px] font-bold text-[#2563eb]">{point.value}</span>
                        <div
                          className="w-full rounded-t-lg bg-[#2563eb]/20 transition-all hover:bg-[#2563eb]/40"
                          style={{ height: `${height}%`, minHeight: 16 }}
                        />
                        <span className="text-[9px] text-[#999]">{point.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Two column grid */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {/* Top Products */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Top Selling</h3>
                  </div>
                  <Package className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div className="space-y-3">
                  {data.topProducts.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-3 transition-all hover:shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#1a1a1a]">{p.name}</p>
                        <p className="text-xs text-[#999]">{p.sales} units sold</p>
                      </div>
                      <p className="text-sm font-black text-[#0c831f]">₹{p.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">Inventory</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Low Stock Alerts</h3>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-[#ff4f8b]" />
                </div>
                {data.lowStockAlerts.length === 0 ? (
                  <p className="py-8 text-center text-sm text-[#999]">No low stock alerts</p>
                ) : (
                  <div className="space-y-2">
                    {data.lowStockAlerts.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[#e8e8e8] p-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          item.stock === 0 ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#fffbeb] text-[#d97706]"
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#1a1a1a]">{item.name}</p>
                          <p className="text-xs text-[#999]">{item.warehouse} · Threshold: {item.threshold}</p>
                        </div>
                        <span className={`text-sm font-black ${item.stock === 0 ? "text-[#dc2626]" : "text-[#d97706]"}`}>
                          {item.stock}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Live Orders & Vendor Payments */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {/* Live Orders */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#0c831f]" />
                    <h3 className="text-sm font-black text-[#1a1a1a]">Live Orders</h3>
                    <span className="flex h-2 w-2 rounded-full bg-[#0c831f] animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-[#0c831f]">{data.liveOrders.length} active</span>
                </div>
                <div className="divide-y divide-[#e8e8e8]">
                  {data.liveOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#f9fafb]">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1a1a1a]">{order.customer}</span>
                          <span className="text-[10px] text-[#999]">{order.id}</span>
                        </div>
                        <p className="text-xs text-[#999]">{order.items} items · ₹{order.total}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={order.status} size="sm" />
                        <span className="text-[10px] text-[#999]">{order.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendor Payments */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#d97706]" />
                    <h3 className="text-sm font-black text-[#1a1a1a]">Vendor Payments Queue</h3>
                  </div>
                  <span className="text-xs font-bold text-[#d97706]">{data.vendorPayments.length} pending</span>
                </div>
                <div className="divide-y divide-[#e8e8e8]">
                  {data.vendorPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#f9fafb]">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#1a1a1a]">{payment.vendor}</p>
                        <p className="text-xs text-[#999]">Due {payment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#1a1a1a]">₹{payment.amount.toLocaleString()}</p>
                        <StatusBadge status={payment.status} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Metrics */}
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Customers</p>
                  <h3 className="text-sm font-black text-[#1a1a1a]">Key Metrics</h3>
                </div>
                <Users className="h-4 w-4 text-[#ff4f8b]" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Total Customers", value: "38,452", icon: Users, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                  { label: "Active (30d)", value: "12,450", icon: TrendingUp, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
                  { label: "New (7d)", value: "1,234", icon: TrendingUp, color: "text-[#9333ea]", bg: "bg-[#f3e8ff]" },
                  { label: "Avg Order Value", value: "₹847", icon: Eye, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${metric.bg}`}>
                        <metric.icon className={`h-3.5 w-3.5 ${metric.color}`} />
                      </div>
                      <span className="text-xs text-[#666]">{metric.label}</span>
                    </div>
                    <p className="mt-2 text-lg font-black text-[#1a1a1a]">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
