"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Package,
  RefreshCw,
  BarChart3,
  CreditCard,
  Zap,
  Truck,
  CheckCircle,
  XCircle,
  Activity,
  Percent,
  Target,
  Gift,
  Bell,
  UserPlus,
  Star,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────

interface ChartPoint {
  label: string;
  value: number;
}

interface CategorySales {
  category: string;
  sales: number;
  revenue: number;
  color: string;
}

interface DashboardData {
  revenue: { total: number; growth: number; chart: ChartPoint[] };
  orders: { total: number; growth: number; pending: number; chart: ChartPoint[] };
  customers: { total: number; growth: number; active: number; newWeekly: number };
  categorySales: CategorySales[];
  orderStatusBreakdown: { status: string; count: number; color: string }[];
  hourlyActivity: ChartPoint[];
  deliveryPerformance: { onTime: number; delayed: number; total: number; avgTime: string };
  systemHealth: { uptime: string; apiLatency: string; errorRate: string; activeUsers: number };
  paymentMethods: { method: string; percentage: number; count: number; color: string }[];
  conversionFunnel: { stage: string; count: number; percentage: number }[];
  topCategories: { name: string; revenue: number; growth: string; color: string }[];
  topProducts: { id: string; name: string; sales: number; revenue: number; image: string }[];
  lowStockAlerts: { id: string; name: string; stock: number; threshold: number; warehouse: string }[];
  vendorPayments: { id: string; vendor: string; amount: number; dueDate: string; status: string }[];
  liveOrders: { id: string; customer: string; items: number; total: number; status: string; time: string }[];
  returnRate: { total: number; returned: number; rate: number; refundAmount: number };
  promotionMetrics: { active: number; redeemed: number; revenue: number; conversion: string };
  recentActivity: { id: string; type: string; message: string; time: string; icon: LucideIcon }[];
}

// ── Mock Data ─────────────────────────────────────────────

const mockData: DashboardData = {
  revenue: { total: 12456890, growth: 12.5, chart: [
    { label: "Jan", value: 850000 }, { label: "Feb", value: 920000 },
    { label: "Mar", value: 1050000 }, { label: "Apr", value: 1150000 },
    { label: "May", value: 1280000 }, { label: "Jun", value: 1420000 },
  ]},
  orders: { total: 245678, growth: 8.3, pending: 345, chart: [
    { label: "Mon", value: 420 }, { label: "Tue", value: 380 }, { label: "Wed", value: 510 },
    { label: "Thu", value: 490 }, { label: "Fri", value: 580 }, { label: "Sat", value: 620 },
    { label: "Sun", value: 450 },
  ]},
  customers: { total: 38452, growth: 15.3, active: 12450, newWeekly: 1234 },
  categorySales: [
    { category: "Fruits & Veggies", sales: 12500, revenue: 2450000, color: "#0c831f" },
    { category: "Dairy & Eggs", sales: 9800, revenue: 1890000, color: "#2563eb" },
    { category: "Beverages", sales: 7200, revenue: 1450000, color: "#ff4f8b" },
    { category: "Snacks", sales: 6500, revenue: 980000, color: "#9333ea" },
    { category: "Household", sales: 4200, revenue: 720000, color: "#d97706" },
  ],
  orderStatusBreakdown: [
    { status: "delivered", count: 184250, color: "#0c831f" },
    { status: "in_transit", count: 28900, color: "#2563eb" },
    { status: "processing", count: 18920, color: "#d97706" },
    { status: "pending", count: 8560, color: "#9333ea" },
    { status: "cancelled", count: 5048, color: "#dc2626" },
  ],
  hourlyActivity: [
    { label: "6AM", value: 45 }, { label: "8AM", value: 180 }, { label: "10AM", value: 320 },
    { label: "12PM", value: 410 }, { label: "2PM", value: 380 }, { label: "4PM", value: 490 },
    { label: "6PM", value: 520 }, { label: "8PM", value: 440 }, { label: "10PM", value: 280 },
  ],
  deliveryPerformance: { onTime: 22800, delayed: 1875, total: 24675, avgTime: "28 min" },
  systemHealth: { uptime: "99.97%", apiLatency: "124ms", errorRate: "0.02%", activeUsers: 142 },
  paymentMethods: [
    { method: "UPI", percentage: 58, count: 142500, color: "#0c831f" },
    { method: "Cards", percentage: 22, count: 54000, color: "#2563eb" },
    { method: "Wallets", percentage: 12, count: 29500, color: "#9333ea" },
    { method: "Net Banking", percentage: 5, count: 12300, color: "#d97706" },
    { method: "COD", percentage: 3, count: 7378, color: "#ff4f8b" },
  ],
  conversionFunnel: [
    { stage: "Visitors", count: 245000, percentage: 100 },
    { stage: "Added to Cart", count: 89200, percentage: 36.4 },
    { stage: "Checkout Started", count: 52400, percentage: 21.4 },
    { stage: "Orders Placed", count: 38400, percentage: 15.7 },
    { stage: "Delivered", count: 36200, percentage: 14.8 },
  ],
  topCategories: [
    { name: "Fruits & Vegetables", revenue: 2450000, growth: "+18.2%", color: "#0c831f" },
    { name: "Dairy & Eggs", revenue: 1890000, growth: "+12.4%", color: "#2563eb" },
    { name: "Beverages", revenue: 1450000, growth: "+8.7%", color: "#ff4f8b" },
    { name: "Snacks & Packaged", revenue: 980000, growth: "+22.1%", color: "#9333ea" },
    { name: "Household Essentials", revenue: 720000, growth: "-2.3%", color: "#d97706" },
  ],
  returnRate: { total: 245678, returned: 8560, rate: 3.48, refundAmount: 1234500 },
  promotionMetrics: { active: 12, redeemed: 24500, revenue: 3420000, conversion: "18.5%" },
  topProducts: [
    { id: "PRD-001", name: "Organic Basmati Rice", sales: 117, revenue: 58400, image: "" },
    { id: "PRD-002", name: "Fresh Red Apples", sales: 210, revenue: 41800, image: "" },
    { id: "PRD-004", name: "Full Cream Milk 1L", sales: 1400, revenue: 95200, image: "" },
    { id: "PRD-008", name: "Cold Brew Coffee", sales: 150, revenue: 37400, image: "" },
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
  recentActivity: [
    { id: "A1", type: "order", message: "New order #ORD-1245 placed by Ravi Kumar", time: "2 min ago", icon: ShoppingCart },
    { id: "A2", type: "payment", message: "Payment of ₹1,240 confirmed via UPI", time: "3 min ago", icon: CreditCard },
    { id: "A3", type: "delivery", message: "Order #ORD-1242 delivered to Anita Singh", time: "5 min ago", icon: Truck },
    { id: "A4", type: "alert", message: "Low stock alert: Natural Honey (0 units)", time: "8 min ago", icon: AlertTriangle },
    { id: "A5", type: "vendor", message: "Vendor payout processed for Fortune Foods", time: "12 min ago", icon: DollarSign },
    { id: "A6", type: "customer", message: "New customer signup: Meera Joshi", time: "15 min ago", icon: UserPlus },
  ],
};

// ── Helper Components ─────────────────────────────────────

function BarChart({ data, color = "text-[#0c831f]", barColor = "bg-[#0c831f]/20", barHover = "hover:bg-[#0c831f]/40", formatValue }: {
  data: ChartPoint[];
  color?: string;
  barColor?: string;
  barHover?: string;
  formatValue?: (v: number) => string;
}) {
  const max = Math.max(...data.map(p => p.value));
  return (
    <div className="flex h-48 items-end gap-1.5 sm:gap-2">
      {data.map((point) => (
        <div key={point.label} className="flex flex-1 flex-col items-center gap-1">
          <span className={`text-[9px] font-bold ${color}`}>
            {formatValue ? formatValue(point.value) : point.value.toLocaleString()}
          </span>
          <div
            className={`w-full rounded-t-lg transition-all cursor-pointer ${barColor} ${barHover} relative group`}
            style={{ height: `${(point.value / max) * 100}%`, minHeight: 12 }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block rounded-lg bg-[#1a1a1a] px-2 py-1 text-[10px] font-bold text-white whitespace-nowrap">
              {formatValue ? formatValue(point.value) : point.value.toLocaleString()}
            </div>
          </div>
          <span className="text-[9px] text-[#999]">{point.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data, size = 120, strokeWidth = 20 }: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {data.map((d) => {
          const segment = circumference * (d.value / total);
          const segOffset = offset;
          offset += segment;
          return (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segment} ${circumference - segment}`}
              strokeDashoffset={-segOffset}
              className="transition-all duration-500"
            />
          );
        })}
        {/* Center hole */}
        <circle cx={size / 2} cy={size / 2} r={radius - strokeWidth / 2} fill="white" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-black text-[#1a1a1a]">{total.toLocaleString()}</span>
        <span className="text-[9px] text-[#999]">Total</span>
      </div>
    </div>
  );
}

function MiniProgressBar({ value, max, color = "#0c831f", label }: { value: number; max: number; color?: string; label?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      {label && <span className="w-20 text-[10px] text-[#666] truncate">{label}</span>}
      <div className="flex-1 h-1.5 rounded-full bg-[#e8e8e8]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-12 text-right text-[10px] font-bold text-[#666]">{value.toLocaleString()}</span>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setData(mockData); setLoading(false); }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); toast.success("Dashboard refreshed"); }, 800);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* ═══ Header Section ═══ */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Dashboard</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Operations Overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Real-time metrics across revenue, orders, customers, inventory, delivery, and system health.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/reports">
                <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
                  <BarChart3 className="h-4 w-4" />
                  View Reports
                </button>
              </Link>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6] disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="h-28 rounded-xl border border-[#e8e8e8] bg-white p-4 skeleton-shimmer" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="h-72 rounded-2xl border border-[#e8e8e8] bg-white skeleton-shimmer" />
              <div className="h-72 rounded-2xl border border-[#e8e8e8] bg-white skeleton-shimmer" />
            </div>
          </div>
        ) : data ? (
          <>
            {/* ═══ KPI Cards Row (8 cards) ═══ */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-8">
              <ReusableCard
                title="Revenue (MTD)"
                value={`₹${(data.revenue.total / 10000000).toFixed(2)}Cr`}
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: `${data.revenue.growth}%`, direction: "up", label: "vs last month" }}
                color="text-[#0c831f]" bgColor="bg-[#e8f5e9]"
              />
              <ReusableCard
                title="Orders (MTD)"
                value={data.orders.total.toLocaleString()}
                icon={<ShoppingCart className="h-4 w-4" />}
                trend={{ value: `${data.orders.growth}%`, direction: "up", label: "vs last month" }}
                color="text-[#2563eb]" bgColor="bg-[#eff6ff]"
              />
              <ReusableCard
                title="Customers"
                value={data.customers.total.toLocaleString()}
                icon={<Users className="h-4 w-4" />}
                trend={{ value: `${data.customers.growth}%`, direction: "up", label: "vs last month" }}
                color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]"
              />
              <ReusableCard
                title="Pending Orders"
                value={data.orders.pending}
                icon={<Clock className="h-4 w-4" />}
                trend={{ value: "Needs attention", direction: "down", label: "" }}
                color="text-[#d97706]" bgColor="bg-[#fffbeb]"
              />
              <ReusableCard
                title="Avg Delivery"
                value={data.deliveryPerformance.avgTime}
                icon={<Truck className="h-4 w-4" />}
                trend={{ value: "2 min faster", direction: "up", label: "vs last week" }}
                color="text-[#0c831f]" bgColor="bg-[#e8f5e9]"
              />
              <ReusableCard
                title="Return Rate"
                value={`${data.returnRate.rate}%`}
                icon={<Percent className="h-4 w-4" />}
                trend={{ value: "-0.3%", direction: "down", label: "improved" }}
                color="text-[#9333ea]" bgColor="bg-[#f3e8ff]"
              />
              <ReusableCard
                title="Promo Redemption"
                value={data.promotionMetrics.redeemed.toLocaleString()}
                icon={<Gift className="h-4 w-4" />}
                trend={{ value: data.promotionMetrics.conversion, direction: "up", label: "conversion" }}
                color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]"
              />
              <ReusableCard
                title="System Uptime"
                value={data.systemHealth.uptime}
                icon={<Activity className="h-4 w-4" />}
                trend={{ value: "99.9%+", direction: "up", label: "30-day avg" }}
                color="text-[#0c831f]" bgColor="bg-[#e8f5e9]"
              />
            </div>

            {/* ═══ Quick Actions Bar ═══ */}
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wide text-[#0c831f] mr-2">Quick Actions</span>
                {[
                  { icon: <ShoppingCart className="h-3.5 w-3.5" />, label: "New Order", href: "/admin/orders" },
                  { icon: <Package className="h-3.5 w-3.5" />, label: "Add Product", href: "/admin/products" },
                  { icon: <Users className="h-3.5 w-3.5" />, label: "View Customers", href: "/admin/customers" },
                  { icon: <Bell className="h-3.5 w-3.5" />, label: "Send Notification", href: "/admin/promotions/push-notifications" },
                  { icon: <BarChart3 className="h-3.5 w-3.5" />, label: "Generate Report", href: "/admin/reports" },
                  { icon: <Percent className="h-3.5 w-3.5" />, label: "Create Coupon", href: "/admin/promotions/coupons" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-all">
                      {action.icon}
                      {action.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* ═══ Charts Row (2 columns) ═══ */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
              {/* Revenue Monthly Trend */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Revenue</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Monthly Trend</h3>
                  </div>
                  <span className="text-xs font-bold text-[#0c831f]">₹{data.revenue.chart.reduce((s, p) => s + p.value, 0).toLocaleString()}</span>
                </div>
                <BarChart data={data.revenue.chart} color="text-[#0c831f]" barColor="bg-[#0c831f]/20" barHover="hover:bg-[#0c831f]/40" formatValue={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              </div>

              {/* Hourly Order Activity */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#2563eb]">Orders</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Hourly Activity (Today)</h3>
                  </div>
                  <span className="text-xs font-bold text-[#2563eb]">Peak: {Math.max(...data.hourlyActivity.map(p => p.value))} orders</span>
                </div>
                <BarChart data={data.hourlyActivity} color="text-[#2563eb]" barColor="bg-[#2563eb]/20" barHover="hover:bg-[#2563eb]/40" />
              </div>
            </div>

            {/* ═══ 3-Column Analytics Row ═══ */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              {/* Category Sales Distribution */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Categories</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Sales Distribution</h3>
                  </div>
                  <Package className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div className="relative flex justify-center">
                  <div className="relative">
                    <DonutChart data={data.categorySales.map(c => ({ label: c.category, value: c.sales, color: c.color }))} size={140} strokeWidth={22} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {data.categorySales.map((cat) => (
                    <div key={cat.category} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="flex-1 text-xs text-[#666]">{cat.category}</span>
                      <span className="text-xs font-bold text-[#1a1a1a]">{((cat.sales / data.categorySales.reduce((s, c) => s + c.sales, 0)) * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Status Breakdown */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#9333ea]">Orders</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Status Breakdown</h3>
                  </div>
                  <BarChart3 className="h-4 w-4 text-[#9333ea]" />
                </div>
                <div className="relative flex justify-center">
                  <div className="relative">
                    <DonutChart data={data.orderStatusBreakdown.map(s => ({ label: s.status, value: s.count, color: s.color }))} size={140} strokeWidth={22} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {data.orderStatusBreakdown.map((s) => (
                    <div key={s.status} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="flex-1 text-xs text-[#666] capitalize">{s.status.replace("_", " ")}</span>
                      <span className="text-xs font-bold text-[#1a1a1a]">{((s.count / data.orderStatusBreakdown.reduce((t, st) => t + st.count, 0)) * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method Distribution */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#d97706]">Payments</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Payment Methods</h3>
                  </div>
                  <CreditCard className="h-4 w-4 text-[#d97706]" />
                </div>
                <div className="relative flex justify-center">
                  <div className="relative">
                    <DonutChart data={data.paymentMethods.map(p => ({ label: p.method, value: p.count, color: p.color }))} size={140} strokeWidth={22} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {data.paymentMethods.map((pm) => (
                    <div key={pm.method} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: pm.color }} />
                      <span className="flex-1 text-xs text-[#666]">{pm.method}</span>
                      <span className="text-xs font-bold text-[#1a1a1a]">{pm.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ Conversion Funnel ═══ */}
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Analytics</p>
                  <h3 className="text-sm font-black text-[#1a1a1a]">Conversion Funnel</h3>
                  <p className="text-xs text-[#999]">Visitor to delivery conversion tracking</p>
                </div>
                <Target className="h-4 w-4 text-[#0c831f]" />
              </div>
              <div className="space-y-2">
                {data.conversionFunnel.map((stage, i) => {
                  const barWidth = stage.percentage;
                  const prevPct = i > 0 ? data.conversionFunnel[i - 1].percentage : 100;
                  const dropRate = prevPct - stage.percentage;
                  return (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center gap-3">
                        <div className="w-28 text-right">
                          <span className="text-xs font-bold text-[#1a1a1a]">{stage.stage}</span>
                        </div>
                        <div className="flex-1">
                          <div className="relative h-8 rounded-lg bg-[#f6f7f6] overflow-hidden">
                            <div
                              className="h-full rounded-lg transition-all duration-700"
                              style={{
                                width: `${barWidth}%`,
                                background: `linear-gradient(90deg, #0c831f, ${i === 4 ? '#0c831f' : i === 3 ? '#16a34a' : i === 2 ? '#22c55e' : i === 1 ? '#4ade80' : '#86efac'})`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center px-3">
                              <span className="text-xs font-bold text-white drop-shadow-sm">{stage.count.toLocaleString()}</span>
                            </div>
                          </div>
                          {dropRate > 0 && i > 0 && (
                            <div className="mt-0.5 flex items-center gap-1">
                              <TrendingDown className="h-2.5 w-2.5 text-[#ff4f8b]" />
                              <span className="text-[9px] text-[#ff4f8b]">{dropRate.toFixed(1)}% drop</span>
                            </div>
                          )}
                        </div>
                        <div className="w-16 text-right">
                          <span className="text-xs font-bold text-[#0c831f]">{stage.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═══ Two Column: Products + Top Categories ═══ */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
              {/* Top Selling Products */}
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

              {/* Top Categories by Revenue */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Categories</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Top by Revenue</h3>
                  </div>
                  <BarChart3 className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div className="space-y-3">
                  {data.topCategories.map((cat) => {
                    const maxRev = Math.max(...data.topCategories.map(c => c.revenue));
                    const barPct = (cat.revenue / maxRev) * 100;
                    return (
                      <div key={cat.name} className="flex items-center gap-3">
                        <div className="w-28 text-right">
                          <span className="text-xs font-medium text-[#666] truncate block">{cat.name}</span>
                        </div>
                        <div className="flex-1 h-7 rounded-lg bg-[#f6f7f6] overflow-hidden">
                          <div
                            className="h-full rounded-lg flex items-center px-2 transition-all duration-500"
                            style={{ width: `${barPct}%`, backgroundColor: cat.color }}
                          >
                            <span className="text-[10px] font-bold text-white">₹{(cat.revenue / 100000).toFixed(1)}L</span>
                          </div>
                        </div>
                        <span className={`w-14 text-right text-[10px] font-bold ${cat.growth.startsWith("+") ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>
                          {cat.growth}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ═══ Delivery + Inventory Health ═══ */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
              {/* Delivery Performance */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Delivery</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">Delivery Performance</h3>
                  </div>
                  <Truck className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#e8f5e9] p-4 text-center">
                    <CheckCircle className="mx-auto h-6 w-6 text-[#0c831f]" />
                    <p className="mt-1 text-xl font-black text-[#0c831f]">{((data.deliveryPerformance.onTime / data.deliveryPerformance.total) * 100).toFixed(1)}%</p>
                    <p className="text-[10px] font-bold text-[#0c831f]">On Time</p>
                    <p className="text-[10px] text-[#0c831f]/70">{data.deliveryPerformance.onTime.toLocaleString()} deliveries</p>
                  </div>
                  <div className="rounded-xl bg-[#fef2f2] p-4 text-center">
                    <XCircle className="mx-auto h-6 w-6 text-[#dc2626]" />
                    <p className="mt-1 text-xl font-black text-[#dc2626]">{((data.deliveryPerformance.delayed / data.deliveryPerformance.total) * 100).toFixed(1)}%</p>
                    <p className="text-[10px] font-bold text-[#dc2626]">Delayed</p>
                    <p className="text-[10px] text-[#dc2626]/70">{data.deliveryPerformance.delayed.toLocaleString()} deliveries</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-2.5">
                  <span className="text-xs text-[#666]">Average Delivery Time</span>
                  <span className="text-sm font-black text-[#1a1a1a]">{data.deliveryPerformance.avgTime}</span>
                </div>
              </div>

              {/* System Health */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">System</p>
                    <h3 className="text-sm font-black text-[#1a1a1a]">System Health</h3>
                  </div>
                  <Activity className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#e8e8e8] p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#0c831f] animate-pulse" />
                      <span className="text-xs font-bold text-[#0c831f]">Uptime</span>
                    </div>
                    <p className="mt-1 text-xl font-black text-[#1a1a1a]">{data.systemHealth.uptime}</p>
                    <p className="text-[10px] text-[#999]">30-day rolling</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-[#2563eb]" />
                      <span className="text-xs font-bold text-[#2563eb]">API Latency</span>
                    </div>
                    <p className="mt-1 text-xl font-black text-[#1a1a1a]">{data.systemHealth.apiLatency}</p>
                    <p className="text-[10px] text-[#999]">Avg response time</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-3.5 w-3.5 text-[#d97706]" />
                      <span className="text-xs font-bold text-[#d97706]">Error Rate</span>
                    </div>
                    <p className="mt-1 text-xl font-black text-[#1a1a1a]">{data.systemHealth.errorRate}</p>
                    <p className="text-[10px] text-[#999]">Last 24 hours</p>
                  </div>
                  <div className="rounded-xl border border-[#e8e8e8] p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-[#9333ea]" />
                      <span className="text-xs font-bold text-[#9333ea]">Active Admins</span>
                    </div>
                    <p className="mt-1 text-xl font-black text-[#1a1a1a]">{data.systemHealth.activeUsers}</p>
                    <p className="text-[10px] text-[#999]">Currently online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ Live Orders + Low Stock + Vendor Payments + Activity Feed (4 columns) ═══ */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-4">
              {/* Live Orders */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-[#2563eb]" />
                    <h3 className="text-sm font-black text-[#1a1a1a]">Live Orders</h3>
                    <span className="flex h-2 w-2 rounded-full bg-[#2563eb] animate-pulse" />
                  </div>
                  <Link href="/admin/orders" className="text-xs font-bold text-[#2563eb] hover:underline">View all</Link>
                </div>
                <div className="divide-y divide-[#e8e8e8]">
                  {data.liveOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#f9fafb]">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1a1a1a]">{order.id}</span>
                          <StatusBadge status={order.status} size="sm" />
                        </div>
                        <p className="text-xs text-[#999]">{order.customer} · {order.items} items · ₹{order.total}</p>
                      </div>
                      <span className="text-[10px] text-[#999]">{order.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[#ff4f8b]" />
                    <h3 className="text-sm font-black text-[#1a1a1a]">Low Stock Alerts</h3>
                  </div>
                  <span className="text-xs font-bold text-[#ff4f8b]">{data.lowStockAlerts.length} items</span>
                </div>
                <div className="divide-y divide-[#e8e8e8]">
                  {data.lowStockAlerts.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 px-5 py-3 transition-all hover:bg-[#f9fafb]">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        item.stock === 0 ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#fffbeb] text-[#d97706]"
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#1a1a1a]">{item.name}</p>
                        <p className="text-xs text-[#999]">{item.warehouse} · Threshold: {item.threshold}</p>
                      </div>
                      <span className={`text-lg font-black ${item.stock === 0 ? "text-[#dc2626]" : "text-[#d97706]"}`}>
                        {item.stock}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vendor Payments Queue */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#d97706]" />
                    <h3 className="text-sm font-black text-[#1a1a1a]">Vendor Payments</h3>
                  </div>
                  <span className="text-xs font-bold text-[#d97706]">₹{data.vendorPayments.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
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

              {/* Real-time Activity Feed */}
              <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[#0c831f]" />
                    <h3 className="text-sm font-black text-[#1a1a1a]">Recent Activity</h3>
                    <span className="flex h-2 w-2 rounded-full bg-[#0c831f] animate-pulse" />
                  </div>
                </div>
                <div className="divide-y divide-[#e8e8e8] max-h-[340px] overflow-y-auto">
                  {data.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 px-5 py-3 transition-all hover:bg-[#f9fafb]">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f5e9]">
                        <activity.icon className="h-4 w-4 text-[#0c831f]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[#1a1a1a]">{activity.message}</p>
                        <p className="text-[10px] text-[#999]">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═══ Customer Metrics Row ═══ */}
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Customers</p>
                  <h3 className="text-sm font-black text-[#1a1a1a]">Customer Metrics</h3>
                </div>
                <Users className="h-4 w-4 text-[#ff4f8b]" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 lg:grid-cols-6">
                {[
                  { label: "Total Customers", value: data.customers.total.toLocaleString(), icon: Users, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                  { label: "Active (30d)", value: data.customers.active.toLocaleString(), icon: TrendingUp, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
                  { label: "New (7d)", value: data.customers.newWeekly.toLocaleString(), icon: UserPlus, color: "text-[#9333ea]", bg: "bg-[#f3e8ff]" },
                  { label: "Avg Order Value", value: "₹847", icon: ShoppingBag, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
                  { label: "Return Rate", value: `${data.returnRate.rate}%`, icon: Percent, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
                  { label: "Loyalty Members", value: "8,450", icon: Star, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
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

            {/* ═══ Inventory Health Summary ═══ */}
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
                  <h3 className="text-sm font-black text-[#1a1a1a]">Inventory Health Summary</h3>
                </div>
                <Package className="h-4 w-4 text-[#0c831f]" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <MiniProgressBar label="In Stock" value={3420} max={4000} color="#0c831f" />
                  <MiniProgressBar label="Low Stock" value={245} max={4000} color="#d97706" />
                  <MiniProgressBar label="Out of Stock" value={34} max={4000} color="#dc2626" />
                  <MiniProgressBar label="Discontinued" value={18} max={4000} color="#999" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#e8f5e9] p-3 text-center">
                    <p className="text-lg font-black text-[#0c831f]">3,420</p>
                    <p className="text-[10px] text-[#0c831f]">SKUs In Stock</p>
                  </div>
                  <div className="rounded-xl bg-[#fffbeb] p-3 text-center">
                    <p className="text-lg font-black text-[#d97706]">245</p>
                    <p className="text-[10px] text-[#d97706]">Low Stock</p>
                  </div>
                  <div className="rounded-xl bg-[#fef2f2] p-3 text-center">
                    <p className="text-lg font-black text-[#dc2626]">34</p>
                    <p className="text-[10px] text-[#dc2626]">Out of Stock</p>
                  </div>
                  <div className="rounded-xl bg-[#f3e8ff] p-3 text-center">
                    <p className="text-lg font-black text-[#9333ea]">92%</p>
                    <p className="text-[10px] text-[#9333ea]">Fill Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
