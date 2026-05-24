"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockRevenueReports, mockCustomerReports, mockVendorReports, mockInventoryReports, mockOrderReports } from "@/data/admin/reports";
import { Download, FileText, Filter, BarChart3, TrendingUp, Users, Store, Package, ShoppingCart, CalendarDays } from "lucide-react";
import { toast } from "sonner";

type ReportTab = "revenue" | "customers" | "vendors" | "inventory" | "orders";

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("revenue");

  const tabs: { key: ReportTab; label: string; icon: React.ReactNode }[] = [
    { key: "revenue", label: "Revenue", icon: <TrendingUp className="w-4 h-4" /> },
    { key: "customers", label: "Customers", icon: <Users className="w-4 h-4" /> },
    { key: "vendors", label: "Vendors", icon: <Store className="w-4 h-4" /> },
    { key: "inventory", label: "Inventory", icon: <Package className="w-4 h-4" /> },
    { key: "orders", label: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Reports & Analytics</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Business Reports</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Comprehensive business reports across revenue, customers, vendors, inventory, and orders.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toast.success("PDF report generated")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Download className="w-4 h-4" />Export PDF</button>
              <button onClick={() => toast.success("Excel report generated")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><FileText className="w-4 h-4" />Export Excel</button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#e8e8e8] pb-2">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${tab === t.key ? "bg-[#0c831f] text-white shadow-sm" : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"}`}>{t.icon}{t.label}</button>
            ))}
          </div>
        </section>

        {tab === "revenue" && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Total Revenue (30d)", value: "₹38.2L", change: "+12.4%" },
                { label: "Net Revenue", value: "₹34.0L", change: "+11.8%" },
                { label: "Avg Order Value", value: "₹812", change: "+3.2%" },
                { label: "Total Orders", value: "4,812", change: "+8.5%" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#666]">{k.label}</p>
                  <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{k.value}</p>
                  <p className="mt-1 text-sm font-semibold text-[#0c831f]">{k.change}</p>
                </div>
              ))}
            </div>
            <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e8e8e8] flex items-center justify-between">
                <h2 className="font-black text-[#1a1a1a]">Daily Revenue (May 2026)</h2>
                <button className="flex items-center gap-2 text-sm text-[#0c831f] font-semibold"><CalendarDays className="w-4 h-4" />Change Period</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                      {["Date", "Gross Revenue", "Net Revenue", "Orders", "AOV", "Refunds", "Discounts"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockRevenueReports.slice(0, 15).map((r) => (
                      <tr key={r.date} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                        <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{r.date}</td>
                        <td className="px-4 py-3">₹{r.grossRevenue.toLocaleString()}</td>
                        <td className="px-4 py-3 text-[#0c831f] font-semibold">₹{r.netRevenue.toLocaleString()}</td>
                        <td className="px-4 py-3">{r.orders}</td>
                        <td className="px-4 py-3">₹{r.avgOrderValue}</td>
                        <td className="px-4 py-3 text-red-500">₹{r.refunds.toLocaleString()}</td>
                        <td className="px-4 py-3 text-amber-500">₹{r.discounts.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {tab === "customers" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e8e8e8]">
              <h2 className="font-black text-[#1a1a1a]">Customer Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Customer", "Email", "Orders", "Total Spent", "AOV", "LTV", "Segment", "Channel", "Retention"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockCustomerReports.map((c) => (
                    <tr key={c.customerId} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{c.name}</td>
                      <td className="px-4 py-3 text-xs text-[#666]">{c.email}</td>
                      <td className="px-4 py-3">{c.totalOrders}</td>
                      <td className="px-4 py-3 font-semibold">₹{c.totalSpent.toLocaleString()}</td>
                      <td className="px-4 py-3">₹{c.avgOrderValue}</td>
                      <td className="px-4 py-3 text-[#0c831f] font-semibold">{c.lifetimeValue}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.segment === "high" ? "bg-[#e8f5e9] text-[#0c831f]" : c.segment === "medium" ? "bg-[#fffbeb] text-[#d97706]" : c.segment === "new" ? "bg-[#eff7ff] text-[#0369a1]" : "bg-[#f6f7f6] text-[#666]"}`}>{c.segment}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#666]">{c.acquisitionChannel}</td>
                      <td className="px-4 py-3 font-semibold">{c.retentionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "vendors" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e8e8e8]">
              <h2 className="font-black text-[#1a1a1a]">Vendor Performance Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Vendor", "Category", "Orders", "Gross Sales", "Commission", "Net Payout", "Rating", "Performance"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockVendorReports.map((v) => (
                    <tr key={v.vendorId} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{v.vendorName}</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs text-[#666]">{v.category}</span></td>
                      <td className="px-4 py-3">{v.totalOrders}</td>
                      <td className="px-4 py-3 font-semibold">₹{v.grossSales.toLocaleString()}</td>
                      <td className="px-4 py-3 text-[#ff4f8b]">₹{v.commission.toLocaleString()}</td>
                      <td className="px-4 py-3 text-[#0c831f] font-semibold">₹{v.netPayout.toLocaleString()}</td>
                      <td className="px-4 py-3">{v.rating}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${v.performance === "excellent" ? "bg-[#e8f5e9] text-[#0c831f]" : v.performance === "good" ? "bg-[#eff7ff] text-[#0369a1]" : "bg-[#fffbeb] text-[#d97706]"}`}>{v.performance}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "inventory" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e8e8e8]">
              <h2 className="font-black text-[#1a1a1a]">Inventory Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Product", "Category", "Total", "Available", "Reserved", "Damaged", "Reorder", "Velocity", "Turnover"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockInventoryReports.map((i) => (
                    <tr key={i.sku} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{i.productName}</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs text-[#666]">{i.category}</span></td>
                      <td className="px-4 py-3">{i.totalStock}</td>
                      <td className="px-4 py-3 text-[#0c831f] font-semibold">{i.available}</td>
                      <td className="px-4 py-3">{i.reserved}</td>
                      <td className="px-4 py-3 text-red-500">{i.damaged}</td>
                      <td className="px-4 py-3">{i.reorderPoint}</td>
                      <td className="px-4 py-3">{i.monthlyVelocity}</td>
                      <td className="px-4 py-3">{i.turnoverRate}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "orders" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e8e8e8] flex items-center justify-between">
              <h2 className="font-black text-[#1a1a1a]">Order Reports (May 2026)</h2>
              <button onClick={() => toast.info("Filter options shown")} className="flex items-center gap-2 text-sm text-[#0c831f] font-semibold"><Filter className="w-4 h-4" />Filter</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Date", "Total", "Completed", "Cancelled", "Returned", "On-Time", "Delayed", "Avg Delivery", "Revenue"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrderReports.slice(0, 15).map((o) => (
                    <tr key={o.date} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{o.date}</td>
                      <td className="px-4 py-3">{o.totalOrders}</td>
                      <td className="px-4 py-3 text-[#0c831f]">{o.completed}</td>
                      <td className="px-4 py-3 text-red-500">{o.cancelled}</td>
                      <td className="px-4 py-3 text-amber-500">{o.returned}</td>
                      <td className="px-4 py-3">{o.onTime}</td>
                      <td className="px-4 py-3 text-red-400">{o.delayed}</td>
                      <td className="px-4 py-3 font-semibold">{o.avgDeliveryTime}</td>
                      <td className="px-4 py-3">₹{o.totalRevenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
