<<<<<<< HEAD
"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
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

// -- Icon Map (for recent activity icons stored as strings) -

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

// -- Page Component ----------------------------------------

export default function AdminDashboardPage() {
  const {
    overview,
    loading,
    error,
    refresh,
  } = useDashboard();

  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  const sections = useMemo(() => {
    if (!overview) return null;

    return {
      kpiData: {
        revenue: overview.revenue,
        orders: overview.orders,
        customers: overview.customers,
        avgDeliveryTime: overview.deliveryPerformance?.avgTime ?? "25 min",
        returnRate: overview.returnRate?.rate ?? 2.1,
        promoConversion: overview.promotionMetrics?.conversion ?? "18.5%",
        systemUptime: overview.systemHealth?.uptime ?? "99.9%",
      },
      chartsData: {
        revenueChart: overview.revenue.chart,
        hourlyActivity: overview.hourlyActivity ?? [],
        revenueTotal: overview.revenue.total,
        hourlyPeak: Math.max(...(overview.hourlyActivity ?? []).map((h: any) => h.value), 0),
      },
      donutData: {
        categorySales: (overview.categorySales ?? []).map((c: any) => ({ label: c.category, value: c.sales, color: c.color })),
        categoryTotal: (overview.categorySales ?? []).reduce((s: number, c: any) => s + c.sales, 0),
        orderStatusBreakdown: (overview.orderStatusBreakdown ?? []).map((s: any) => ({ label: s.status, value: s.count, color: s.color })),
        orderStatusTotal: (overview.orderStatusBreakdown ?? []).reduce((s: number, os: any) => s + os.count, 0),
        paymentMethods: (overview.paymentMethods ?? []).map((p: any) => ({ label: p.method, value: p.percentage, color: p.color })),
        paymentTotal: (overview.paymentMethods ?? []).reduce((s: number, p: any) => s + p.percentage, 0),
      },
      deliveryData: {
        onTime: overview.deliveryPerformance?.onTime ?? 0,
        delayed: overview.deliveryPerformance?.delayed ?? 0,
        total: overview.deliveryPerformance?.total ?? 1,
        avgTime: overview.deliveryPerformance?.avgTime ?? "0 min",
        uptime: overview.systemHealth?.uptime ?? "99.9%",
        apiLatency: overview.systemHealth?.apiLatency ?? "<50ms",
        errorRate: overview.systemHealth?.errorRate ?? "<0.1%",
        activeUsers: overview.systemHealth?.activeUsers ?? 12,
      },
      sidePanelData: {
        liveOrders: overview.liveOrders ?? [],
        stockAlerts: overview.lowStockAlerts ?? [],
        vendorPayments: overview.vendorPayments ?? [],
        activityFeed: (overview.recentActivity ?? []).map((a: any) => ({
          ...a,
          icon: resolveIcon(a.icon),
        })),
        vendorPaymentTotal: (overview.vendorPayments ?? []).reduce((s: number, p: any) => s + p.amount, 0),
      },
      custData: {
        total: overview.customers.total,
        active: overview.customers.active,
        newWeekly: overview.customers.newThisWeek,
        returnRate: overview.returnRate?.rate ?? 2.1,
      },
      invData: {
        inStock: overview.lowStockAlerts ? Math.max(1500 - overview.lowStockAlerts.length, 0) : 1200,
        lowStock: overview.lowStockAlerts?.length ?? 0,
        outOfStock: overview.lowStockAlerts?.filter((a: any) => a.stock === 0).length ?? 0,
        discontinued: 0,
        fillRate: "92%",
      },
      topProdCatData: {
        topProducts: overview.topProducts ?? [],
        topCategories: (overview.topCategories ?? []).map((c: any) => ({
          name: c.name,
          revenue: c.revenue,
          growth: c.growth,
          color: c.color,
        })),
      },
      funnelData: {
        stages: overview.conversionFunnel ?? [],
      },
    };
  }, [overview]);

  if (!isHydrated || loading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  // -- Error state ----------------------------------------

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

  // -- Empty state ----------------------------------------

  if (!sections) return null;

  // -- Render ----------------------------------------------

  const { kpiData, chartsData, donutData, deliveryData, sidePanelData, custData, invData, topProdCatData, funnelData } =
    sections;

  return (
    <DashboardLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* --- Header --- */}
        <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        {/* --- KPI Cards --- */}
        <KpiGrid {...kpiData} />

        {/* --- Quick Actions --- */}
        <QuickActions />

        {/* --- Charts Row --- */}
        <ChartsSection {...chartsData} />

        {/* --- 3 Donut Analytics --- */}
        <DonutSection {...donutData} />

        {/* --- Conversion Funnel --- */}
        {funnelData.stages.length > 0 && (
          <ConversionFunnel stages={funnelData.stages} />
        )}

        {/* --- Top Products + Categories --- */}
        <TopProductsCategories {...topProdCatData} />

        {/* --- Delivery + System Health --- */}
        <DeliverySystemHealth {...deliveryData} />

        {/* --- 4 Side Panels --- */}
        <SidePanels {...sidePanelData} />

        {/* --- Customer Metrics --- */}
        <CustomerMetrics {...custData} />

        {/* --- Inventory Health --- */}
        <InventoryHealth {...invData} />
      </div>
    </DashboardLayout>
  );
}

// -- Header Section ---------------------------------------

function DashboardHeader({ onRefresh, isRefreshing }: { onRefresh: () => void; isRefreshing?: boolean }) {
  return (
    <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
            Dashboard
          </p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">
            Operations Overview
          </h1>
          <p className="mt-1.5 max-w-2xl text-xs text-[#666]">
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
=======
"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
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

// -- Icon Map (for recent activity icons stored as strings) -

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

// -- Page Component ----------------------------------------

export default function AdminDashboardPage() {
  const {
    overview,
    loading,
    error,
    refresh,
  } = useDashboard();

  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  const sections = useMemo(() => {
    if (!overview) return null;

    return {
      kpiData: {
        revenue: overview.revenue,
        orders: overview.orders,
        customers: overview.customers,
        avgDeliveryTime: overview.deliveryPerformance?.avgTime ?? "25 min",
        returnRate: overview.returnRate?.rate ?? 2.1,
        promoConversion: overview.promotionMetrics?.conversion ?? "18.5%",
        systemUptime: overview.systemHealth?.uptime ?? "99.9%",
      },
      chartsData: {
        revenueChart: overview.revenue.chart,
        hourlyActivity: overview.hourlyActivity ?? [],
        revenueTotal: overview.revenue.total,
        hourlyPeak: Math.max(...(overview.hourlyActivity ?? []).map((h: any) => h.value), 0),
      },
      donutData: {
        categorySales: (overview.categorySales ?? []).map((c: any) => ({ label: c.category, value: c.sales, color: c.color })),
        categoryTotal: (overview.categorySales ?? []).reduce((s: number, c: any) => s + c.sales, 0),
        orderStatusBreakdown: (overview.orderStatusBreakdown ?? []).map((s: any) => ({ label: s.status, value: s.count, color: s.color })),
        orderStatusTotal: (overview.orderStatusBreakdown ?? []).reduce((s: number, os: any) => s + os.count, 0),
        paymentMethods: (overview.paymentMethods ?? []).map((p: any) => ({ label: p.method, value: p.percentage, color: p.color })),
        paymentTotal: (overview.paymentMethods ?? []).reduce((s: number, p: any) => s + p.percentage, 0),
      },
      deliveryData: {
        onTime: overview.deliveryPerformance?.onTime ?? 0,
        delayed: overview.deliveryPerformance?.delayed ?? 0,
        total: overview.deliveryPerformance?.total ?? 1,
        avgTime: overview.deliveryPerformance?.avgTime ?? "0 min",
        uptime: overview.systemHealth?.uptime ?? "99.9%",
        apiLatency: overview.systemHealth?.apiLatency ?? "<50ms",
        errorRate: overview.systemHealth?.errorRate ?? "<0.1%",
        activeUsers: overview.systemHealth?.activeUsers ?? 12,
      },
      sidePanelData: {
        liveOrders: overview.liveOrders ?? [],
        stockAlerts: overview.lowStockAlerts ?? [],
        vendorPayments: overview.vendorPayments ?? [],
        activityFeed: (overview.recentActivity ?? []).map((a: any) => ({
          ...a,
          icon: resolveIcon(a.icon),
        })),
        vendorPaymentTotal: (overview.vendorPayments ?? []).reduce((s: number, p: any) => s + p.amount, 0),
      },
      custData: {
        total: overview.customers.total,
        active: overview.customers.active,
        newWeekly: overview.customers.newThisWeek,
        returnRate: overview.returnRate?.rate ?? 2.1,
      },
      invData: {
        inStock: overview.lowStockAlerts ? Math.max(1500 - overview.lowStockAlerts.length, 0) : 1200,
        lowStock: overview.lowStockAlerts?.length ?? 0,
        outOfStock: overview.lowStockAlerts?.filter((a: any) => a.stock === 0).length ?? 0,
        discontinued: 0,
        fillRate: "92%",
      },
      topProdCatData: {
        topProducts: overview.topProducts ?? [],
        topCategories: (overview.topCategories ?? []).map((c: any) => ({
          name: c.name,
          revenue: c.revenue,
          growth: c.growth,
          color: c.color,
        })),
      },
      funnelData: {
        stages: overview.conversionFunnel ?? [],
      },
    };
  }, [overview]);

  if (!isHydrated || loading) {
    return (        <DashboardSkeleton />    );
  }

  // -- Error state ----------------------------------------

  if (error) {
    return (        <div className="space-y-5 sm:space-y-6">
          {/* Header */}
          <DashboardHeader onRefresh={handleRefresh} />
          <DashboardError error={error} onRetry={handleRefresh} />
        </div>    );
  }

  // -- Empty state ----------------------------------------

  if (!sections) return null;

  // -- Render ----------------------------------------------

  const { kpiData, chartsData, donutData, deliveryData, sidePanelData, custData, invData, topProdCatData, funnelData } =
    sections;

  return (      <div className="space-y-5 sm:space-y-6">
        {/* --- Header --- */}
        <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

        {/* --- KPI Cards --- */}
        <KpiGrid {...kpiData} />

        {/* --- Quick Actions --- */}
        <QuickActions />

        {/* --- Charts Row --- */}
        <ChartsSection {...chartsData} />

        {/* --- 3 Donut Analytics --- */}
        <DonutSection {...donutData} />

        {/* --- Conversion Funnel --- */}
        {funnelData.stages.length > 0 && (
          <ConversionFunnel stages={funnelData.stages} />
        )}

        {/* --- Top Products + Categories --- */}
        <TopProductsCategories {...topProdCatData} />

        {/* --- Delivery + System Health --- */}
        <DeliverySystemHealth {...deliveryData} />

        {/* --- 4 Side Panels --- */}
        <SidePanels {...sidePanelData} />

        {/* --- Customer Metrics --- */}
        <CustomerMetrics {...custData} />

        {/* --- Inventory Health --- */}
        <InventoryHealth {...invData} />
      </div>  );
}

// -- Header Section ---------------------------------------

function DashboardHeader({ onRefresh, isRefreshing }: { onRefresh: () => void; isRefreshing?: boolean }) {
  return (
    <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
            Dashboard
          </p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">
            Operations Overview
          </h1>
          <p className="mt-1.5 max-w-2xl text-xs text-[#666]">
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
>>>>>>> 2ac58d4c4af2a3758793e33358d3e0b04f36e85b
