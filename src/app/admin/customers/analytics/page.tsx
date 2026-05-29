"use client";


import ReusableCard from "@/components/ui/admin/reusable-card";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Clock } from "lucide-react";

const metrics = [
  { label: "Customer Lifetime Value", value: "₹12,450", change: "+15.3%", trend: "up", icon: DollarSign, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  { label: "Avg Orders Per Customer", value: "18.2", change: "+8.7%", trend: "up", icon: ShoppingCart, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
  { label: "Repeat Purchase Rate", value: "62.4%", change: "+5.2%", trend: "up", icon: TrendingUp, color: "text-[#9333ea]", bg: "bg-[#f3e8ff]" },
  { label: "Avg Days Between Orders", value: "14", change: "-2 days", trend: "down", icon: Clock, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
  { label: "Customer Churn Rate", value: "8.3%", change: "-1.2%", trend: "down", icon: TrendingDown, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
  { label: "New Customers (MTD)", value: "890", change: "+22.1%", trend: "up", icon: Users, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
];

export default function CustomerAnalyticsPage() {
  return (      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Customers</p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Customer Analytics</h1>
          <p className="mt-1.5 text-xs text-[#666]">Deep-dive analytics on customer behavior, lifetime value, and engagement metrics.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {metrics.map((m) => {
            const TrendIcon = m.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <div key={m.label} className={`rounded-xl ${m.bg} p-4 transition-all hover:shadow-md`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wide text-[#666]">{m.label}</span>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <p className="mt-2 text-xl font-bold text-[#1a1a1a]">{m.value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <TrendIcon className={`h-3 w-3 ${m.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"}`} />
                  <span className={`text-xs font-bold ${m.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>{m.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Cohorts</p>
            <h3 className="text-sm font-black text-[#1a1a1a]">Customer Acquisition by Month</h3>
            <div className="mt-4 space-y-4">
              {["May 2026", "Apr 2026", "Mar 2026", "Feb 2026", "Jan 2026"].map((month, i) => {
                const count = [890, 720, 650, 580, 620][i];
                const max = 890;
                return (
                  <div key={month} className="flex items-center gap-3">
                    <span className="w-20 text-xs font-bold text-[#666]">{month}</span>
                    <div className="flex-1 h-5 overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div className="h-full rounded-full bg-[#0c831f]" style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                    <span className="w-12 text-right text-xs font-bold text-[#1a1a1a]">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Retention</p>
            <h3 className="text-sm font-black text-[#1a1a1a]">Cohort Retention Rates</h3>
            <div className="mt-4 space-y-4">
              {["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"].map((m, i) => {
                const rate = [100, 68, 52, 41, 35][i];
                return (
                  <div key={m} className="flex items-center gap-3">
                    <span className="w-16 text-xs font-bold text-[#666]">{m}</span>
                    <div className="flex-1 h-5 overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${rate}%` }} />
                    </div>
                    <span className="w-12 text-right text-xs font-bold text-[#1a1a1a]">{rate}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>  );
}
