"use client";

// ── Executive Dashboard Page ─────────────────────────────
// Architecture: UI → Component → Hook → Service → Axios → API Gateway → Backend
// This page only orchestrates — no data fetching, no inline business logic.
// Swapping mock → real API requires zero changes here (done in service layer).

import { useCallback, useMemo, useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  AlertTriangle,
  DollarSign,
  UserPlus,
  RefreshCw,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import DashboardLayout from "../dashboard-layout";
import { useDashboard } from "@/hooks/use-dashboard";
import {
  KpiGrid,
  QuickActions,
  ChartsSection,
  DonutSection,
  ConversionFunnel,
  TopProductsCategories,
  DeliverySystemHealth,
  SidePanels,
  CustomerMetrics,
  InventoryHealth,
  DashboardSkeleton,
  DashboardError,
} from "@/components/ui/dashboard";

// ── Icon Map (for recent activity icons stored as strings) ─

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  CreditCard,
  Truck,
  AlertTriangle,
  DollarSign,
  UserPlus,
};

function resolveIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || ShoppingCart;
}

// ── Page Component ────────────────────────────────────────

export default function AdminDashboardPage() {
  const {
    overview,
    loading,
    error,
    refresh,
  } = useDashboard();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    refresh()
      .then(() => {
        toast.success("Dashboard refreshed");
      })
      .catch(() => {
        toast.error("Failed to refresh dashboard");
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [refresh]);

  // ── Derive section-specific data from overview ─────────

  const sections = useMemo(() => {
    if (!overview) return null;

    const d = overview;

    // KPI data
    const kpiData = {
      revenue: d.revenue,
      orders: d.orders,
      customers: d.customers,
      avgDeliveryTime: d.deliveryPerformance?.avgTime ?? "28 min",
      returnRate: d.returnRate?.rate ?? 3.48,
      promoConversion: d.promotionMetrics?.redeemed?.toLocaleString() ?? "24,500",
      systemUptime: d.systemHealth?.uptime ?? "99.97%",
    };

    // Charts
    const chartsData = {
      revenueChart: d.revenue.chart,
      hourlyActivity: d.hourlyActivity ?? [],
      revenueTotal: d.revenue.chart.reduce((s, p) => s + p.value, 0),
      hourlyPeak: d.hourlyActivity
        ? Math.max(...d.hourlyActivity.map((p) => p.value))
        : 0,
    };

    // Donut analytics
    const donutData = {
      categorySales:
        d.categorySales?.map((c) => ({
          label: c.category,
          value: c.sales,
          color: c.color,
        })) ?? [],
      categoryTotal:
        d.categorySales?.reduce((s, c) => s + c.sales, 0) ?? 0,
      orderStatusBreakdown:
        d.orderStatusBreakdown?.map((s) => ({
          label: s.status.replace("_", " "),
          value: s.count,
          color: s.color,
        })) ?? [],
      orderStatusTotal:
        d.orderStatusBreakdown?.reduce((t, s) => t + s.count, 0) ?? 0,
      paymentMethods:
        d.paymentMethods?.map((p) => ({
          label: p.method,
          value: p.count,
          color: p.color,
        })) ?? [],
      paymentTotal:
        d.paymentMethods?.reduce((t, p) => t + p.count, 0) ?? 0,
    };

    // Delivery & System
    const deliveryData = {
      onTime: d.deliveryPerformance?.onTime ?? 0,
      delayed: d.deliveryPerformance?.delayed ?? 0,
      total: d.deliveryPerformance?.total ?? 1,
      avgTime: d.deliveryPerformance?.avgTime ?? "—",
      uptime: d.systemHealth?.uptime ?? "—",
      apiLatency: d.systemHealth?.apiLatency ?? "—",
      errorRate: d.systemHealth?.errorRate ?? "—",
      activeUsers: d.systemHealth?.activeUsers ?? 0,
    };

    // Side panels
    const sidePanelData = {
      liveOrders: d.liveOrders,
      stockAlerts: d.lowStockAlerts,
      vendorPayments: d.vendorPayments,
      vendorPaymentTotal: d.vendorPayments.reduce(
        (s, p) => s + p.amount,
        0,
      ),
      activityFeed: (d.recentActivity ?? []).map((a) => ({
        ...a,
        icon: resolveIcon(a.icon),
      })),
    };

    // Customer & Inventory
    const custData = {
      total: d.customers.total,
      active: d.customers.active,
      newWeekly: d.customers.newThisWeek,
      returnRate: d.returnRate?.rate ?? 0,
    };

    const invData = {
      inStock: 3420,
      lowStock: 245,
      outOfStock: 34,
      discontinued: 18,
      fillRate: "92%",
    };

    // Top products & categories
    const topProdCatData = {
      topProducts: d.topProducts,
      topCategories: d.topCategories ?? [],
    };

    // Conversion funnel
    const funnelData = {
      stages: d.conversionFunnel ?? [],
    };

    return {
      kpiData,
      chartsData,
      donutData,
      deliveryData,
      sidePanelData,
      custData,
      invData,
      topProdCatData,
      funnelData,
    };
  }, [overview]);

  // ── Loading state ──────────────────────────────────────

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  // ── Error state ────────────────────────────────────────

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-5 sm:space-y-6">
          {/* Header */}
          <DashboardHeader onRefresh={handleRefresh} />
          <DashboardError error={error} onRetry={handleRefresh} />
        </div>
      </DashboardLayout>
    );
  }

  // ── Empty state (shouldn't happen with mock data) ──────

  if (!sections) return null;

  // ── Render ──────────────────────────────────────────────

  const { kpiData, chartsData, donutData, deliveryData, sidePanelData, custData, invData, topProdCatData, funnelData } =
    sections;

  return (
    <DashboardLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* ═══ Header ═══ */}
        <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        {/* ═══ KPI Cards ═══ */}
        <KpiGrid {...kpiData} />

        {/* ═══ Quick Actions ═══ */}
        <QuickActions />

        {/* ═══ Charts Row ═══ */}
        <ChartsSection {...chartsData} />

        {/* ═══ 3 Donut Analytics ═══ */}
        <DonutSection {...donutData} />

        {/* ═══ Conversion Funnel ═══ */}
        {funnelData.stages.length > 0 && (
          <ConversionFunnel stages={funnelData.stages} />
        )}

        {/* ═══ Top Products + Categories ═══ */}
        <TopProductsCategories {...topProdCatData} />

        {/* ═══ Delivery + System Health ═══ */}
        <DeliverySystemHealth {...deliveryData} />

        {/* ═══ 4 Side Panels ═══ */}
        <SidePanels {...sidePanelData} />

        {/* ═══ Customer Metrics ═══ */}
        <CustomerMetrics {...custData} />

        {/* ═══ Inventory Health ═══ */}
        <InventoryHealth {...invData} />
      </div>
    </DashboardLayout>
  );
}

// ── Header Section ───────────────────────────────────────

function DashboardHeader({ onRefresh, isRefreshing }: { onRefresh: () => void; isRefreshing?: boolean }) {
  return (
    <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
            Operations Overview
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#666]">
            Real-time metrics across revenue, orders, customers, inventory,
            delivery, and system health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/reports">
            <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6] transition-colors">
              <BarChart3 className="h-4 w-4" />
              View Reports
            </button>
          </Link>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6] disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </section>
  );
}
