"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { RefreshCw, Download, Filter, CalendarDays, ChevronRight } from "lucide-react";
import KpiCard from "../kpi-card";

const RevenueChart = dynamic(() => import("../revenue-chart"), { ssr: false });
const SalesTrendChart = dynamic(() => import("../charts/sales-trend-chart"), { ssr: false });
const OrdersTrendChart = dynamic(() => import("../charts/orders-trend-chart"), { ssr: false });
const CustomerGrowthChart = dynamic(() => import("../charts/customer-growth-chart"), { ssr: false });
const CategorySalesChart = dynamic(() => import("../charts/category-sales-chart"), { ssr: false });

const kpiData = [
  { title: "Total Revenue", value: "₹42.8L", growth: "+24%", subtitle: "Last 30 days" },
  { title: "Orders Today", value: "1,284", growth: "+18%", subtitle: "42 pending" },
  { title: "Active Users", value: "8.2K", growth: "+15%", subtitle: "Online now: 246" },
  { title: "Total Customers", value: "42.8K", growth: "+12%", subtitle: "Lifetime" },
  { title: "New Customers", value: "1,842", growth: "+28%", subtitle: "This month" },
  { title: "Conversion Rate", value: "4.8%", growth: "+0.6%", subtitle: "Avg: 3.2%" },
  { title: "Pending Orders", value: "42", growth: "-12%", subtitle: "Awaiting dispatch" },
  { title: "Delivered Orders", value: "1,142", growth: "+22%", subtitle: "Today" },
  { title: "Cancelled Orders", value: "42", growth: "-8%", subtitle: "Rate: 3.2%" },
  { title: "Refund Requests", value: "18", growth: "+5%", subtitle: "Pending: 7" },
  { title: "Active Vendors", value: "156", growth: "+4%", subtitle: "Online: 142" },
  { title: "Delivery Partners", value: "842", growth: "+15%", subtitle: "Active now: 296" },
  { title: "Inventory Value", value: "₹12.4L", growth: "+8%", subtitle: "Stock value" },
  { title: "Low Stock Count", value: "28", growth: "-3%", subtitle: "Items below threshold" },
  { title: "Avg Order Value", value: "₹342", growth: "+6%", subtitle: "Per order" },
  { title: "Profit Margin", value: "24.8%", growth: "+2.1%", subtitle: "Gross margin" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c831f]">
              Executive Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">
              Business Intelligence Center
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#666]">
              Comprehensive analytics and operational metrics for your quick-commerce platform
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {kpiData.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            growth={kpi.growth}
            subtitle={kpi.subtitle}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h2 className="mb-4 text-lg font-black text-[#1a1a1a]">Revenue Trend</h2>
          <RevenueChart />
        </div>
        
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h2 className="mb-4 text-lg font-black text-[#1a1a1a]">Sales Performance</h2>
          <SalesTrendChart />
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h2 className="mb-4 text-lg font-black text-[#1a1a1a]">Orders Trend</h2>
          <OrdersTrendChart />
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h2 className="mb-4 text-lg font-black text-[#1a1a1a]">Customer Growth</h2>
          <CustomerGrowthChart />
        </div>
      </div>

      {/* Category Sales */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#1a1a1a]">Category Sales Distribution</h2>
          <Link href="/admin/analytics" className="flex items-center gap-1 text-sm font-semibold text-[#0c831f]">
            View Details
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <CategorySalesChart />
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
        <h2 className="mb-4 text-lg font-black text-[#1a1a1a]">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">            <button className="flex flex-col items-center gap-2 rounded-xl border border-[#e8e8e8] p-4 transition-all duration-200 btn-press hover:bg-[#f8f9fa] hover:shadow-sm">
            <div className="rounded-full bg-[#0c831f]/10 p-3">
              <RefreshCw className="w-6 h-6 text-[#0c831f]" />
            </div>
            <span className="text-sm font-semibold">Refresh Data</span>
          </button>            <button className="flex flex-col items-center gap-2 rounded-xl border border-[#e8e8e8] p-4 transition-all duration-200 btn-press hover:bg-[#f8f9fa] hover:shadow-sm">
            <div className="rounded-full bg-[#ff4f8b]/10 p-3">
              <Download className="w-6 h-6 text-[#ff4f8b]" />
            </div>
            <span className="text-sm font-semibold">Export Report</span>
          </button>            <button className="flex flex-col items-center gap-2 rounded-xl border border-[#e8e8e8] p-4 transition-all duration-200 btn-press hover:bg-[#f8f9fa] hover:shadow-sm">
            <div className="rounded-full bg-[#6366f1]/10 p-3">
              <CalendarDays className="w-6 h-6 text-[#6366f1]" />
            </div>
            <span className="text-sm font-semibold">Date Range</span>
          </button>            <button className="flex flex-col items-center gap-2 rounded-xl border border-[#e8e8e8] p-4 transition-all duration-200 btn-press hover:bg-[#f8f9fa] hover:shadow-sm">
            <div className="rounded-full bg-[#f59e0b]/10 p-3">
              <Filter className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <span className="text-sm font-semibold">Custom Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
