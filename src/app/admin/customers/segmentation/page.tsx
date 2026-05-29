<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6add8aa3ad16dc0ccdd21331266d398ef045c42e
"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableCard from "@/components/ui/admin/reusable-card";
import { Users, Star, Shield, Zap, TrendingUp } from "lucide-react";

const segments = [
  { name: "VIP Customers", count: 156, avgSpent: "?78,500", orders: 92, color: "bg-[#9333ea]", icon: Star, desc: "High-value customers with >50 orders" },
  { name: "Regular Buyers", count: 2340, avgSpent: "?18,200", orders: 24, color: "bg-[#2563eb]", icon: Users, desc: "Consistent monthly purchasers" },
  { name: "New Users", count: 890, avgSpent: "?4,500", orders: 3, color: "bg-[#0c831f]", icon: Zap, desc: "Registered within last 30 days" },
  { name: "At Risk", count: 312, avgSpent: "?12,400", orders: 8, color: "bg-[#d97706]", icon: Shield, desc: "No purchase in last 60 days" },
  { name: "Churned", count: 156, avgSpent: "?8,900", orders: 0, color: "bg-[#dc2626]", icon: TrendingUp, desc: "Inactive >90 days, likely lost" },
];

export default function SegmentationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Customers</p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Segmentation</h1>
          <p className="mt-1.5 text-xs text-[#666]">Customer segments based on buying behavior, order frequency, and lifetime value.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {segments.map((seg) => {
            const totalCustomers = segments.reduce((s, x) => s + x.count, 0);
            return (
              <div key={seg.name} className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${seg.color} bg-opacity-10`}>
                  <seg.icon className={`h-5 w-5 ${seg.color.replace("bg-", "text-")}`} />
                </div>
                <p className="mt-3 text-center text-lg font-black text-[#1a1a1a]">{seg.count}</p>
                <p className="text-center text-xs font-bold text-[#666]">{seg.name}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                  <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${(seg.count / totalCustomers) * 100}%` }} />
                </div>
                <div className="mt-2 text-center text-[10px] text-[#999]">{seg.desc}</div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Analytics</p><h3 className="text-sm font-black text-[#1a1a1a]">Segment Breakdown</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Segment</th>
                  <th className="px-4 py-3">Customers</th>
                  <th className="px-4 py-3">Avg. Spent</th>
                  <th className="px-4 py-3">Avg Orders</th>
                  <th className="px-4 py-3">% of Total</th>
                  <th className="px-4 py-3">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {segments.map((seg) => {
                  const totalCustomers = segments.reduce((s, x) => s + x.count, 0);
                  return (
                    <tr key={seg.name} className="text-sm hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-bold text-[#1a1a1a]">{seg.name}</td>
                      <td className="px-4 py-3">{seg.count.toLocaleString()}</td>
                      <td className="px-4 py-3 font-semibold">{seg.avgSpent}</td>
                      <td className="px-4 py-3">{seg.orders}</td>
                      <td className="px-4 py-3">{((seg.count / totalCustomers) * 100).toFixed(1)}%</td>
                      <td className="px-4 py-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-[#e8e8e8]">
                          <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${(seg.count / totalCustomers) * 100}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
=======
"use client";

import { useState } from "react";

import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableCard from "@/components/ui/admin/reusable-card";
import { Users, Star, Shield, Zap, TrendingUp } from "lucide-react";

const segments = [
  { name: "VIP Customers", count: 156, avgSpent: "?78,500", orders: 92, color: "bg-[#9333ea]", icon: Star, desc: "High-value customers with >50 orders" },
  { name: "Regular Buyers", count: 2340, avgSpent: "?18,200", orders: 24, color: "bg-[#2563eb]", icon: Users, desc: "Consistent monthly purchasers" },
  { name: "New Users", count: 890, avgSpent: "?4,500", orders: 3, color: "bg-[#0c831f]", icon: Zap, desc: "Registered within last 30 days" },
  { name: "At Risk", count: 312, avgSpent: "?12,400", orders: 8, color: "bg-[#d97706]", icon: Shield, desc: "No purchase in last 60 days" },
  { name: "Churned", count: 156, avgSpent: "?8,900", orders: 0, color: "bg-[#dc2626]", icon: TrendingUp, desc: "Inactive >90 days, likely lost" },
];

export default function SegmentationPage() {
  return (      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Customers</p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Segmentation</h1>
          <p className="mt-1.5 text-xs text-[#666]">Customer segments based on buying behavior, order frequency, and lifetime value.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {segments.map((seg) => {
            const totalCustomers = segments.reduce((s, x) => s + x.count, 0);
            return (
              <div key={seg.name} className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${seg.color} bg-opacity-10`}>
                  <seg.icon className={`h-5 w-5 ${seg.color.replace("bg-", "text-")}`} />
                </div>
                <p className="mt-3 text-center text-lg font-black text-[#1a1a1a]">{seg.count}</p>
                <p className="text-center text-xs font-bold text-[#666]">{seg.name}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                  <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${(seg.count / totalCustomers) * 100}%` }} />
                </div>
                <div className="mt-2 text-center text-[10px] text-[#999]">{seg.desc}</div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4"><p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Analytics</p><h3 className="text-sm font-black text-[#1a1a1a]">Segment Breakdown</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Segment</th>
                  <th className="px-4 py-3">Customers</th>
                  <th className="px-4 py-3">Avg. Spent</th>
                  <th className="px-4 py-3">Avg Orders</th>
                  <th className="px-4 py-3">% of Total</th>
                  <th className="px-4 py-3">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {segments.map((seg) => {
                  const totalCustomers = segments.reduce((s, x) => s + x.count, 0);
                  return (
                    <tr key={seg.name} className="text-sm hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-bold text-[#1a1a1a]">{seg.name}</td>
                      <td className="px-4 py-3">{seg.count.toLocaleString()}</td>
                      <td className="px-4 py-3 font-semibold">{seg.avgSpent}</td>
                      <td className="px-4 py-3">{seg.orders}</td>
                      <td className="px-4 py-3">{((seg.count / totalCustomers) * 100).toFixed(1)}%</td>
                      <td className="px-4 py-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-[#e8e8e8]">
                          <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${(seg.count / totalCustomers) * 100}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>  );
}
>>>>>>> 2ac58d4c4af2a3758793e33358d3e0b04f36e85b
