"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockCustomerInsights, mockProductInsights, mockPredictiveAnalytics } from "@/data/admin/misc";
import { BarChart3, TrendingUp, Users, Package, BrainCircuit, Lightbulb, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

type BITab = "insights" | "products" | "predictive";

export default function BusinessIntelligencePage() {
  const [tab, setTab] = useState<BITab>("insights");

  const tabs: { key: BITab; label: string; icon: React.ReactNode }[] = [
    { key: "insights", label: "Customer Insights", icon: <Users className="w-4 h-4" /> },
    { key: "products", label: "Product Insights", icon: <Package className="w-4 h-4" /> },
    { key: "predictive", label: "Predictive Analytics", icon: <BrainCircuit className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Business Intelligence</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">BI & Analytics</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Customer insights, product performance, and predictive analytics powered by AI.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#e8e8e8] pb-2">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${tab === t.key ? "bg-[#0c831f] text-white shadow-sm" : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"}`}>{t.icon}{t.label}</button>
            ))}
          </div>
        </section>

        {tab === "insights" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mockCustomerInsights.map((insight) => (
              <div key={insight.metric} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#666]">{insight.metric}</p>
                  <span className={`rounded-full p-1.5 ${insight.trend === "up" ? "bg-[#e8f5e9]" : "bg-[#fef2f2]"}`}>
                    {insight.trend === "up" ? <ArrowUp className="w-3.5 h-3.5 text-[#0c831f]" /> : <ArrowDown className="w-3.5 h-3.5 text-red-500" />}
                  </span>
                </div>
                <p className="mt-3 text-3xl font-black text-[#1a1a1a]">{insight.value}</p>
                <p className="mt-1 text-sm font-semibold text-[#0c831f]">{insight.change}</p>
                <p className="mt-2 text-xs text-[#666]">{insight.description}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "products" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e8e8e8]">
              <h2 className="font-black text-[#1a1a1a]">Top Performing Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Product", "Category", "Revenue", "Units Sold", "Growth", "Top Category"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockProductInsights.map((p) => (
                    <tr key={p.productId} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{p.productName}</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs text-[#666]">{p.category}</span></td>
                      <td className="px-4 py-3 font-semibold">₹{p.revenue.toLocaleString()}</td>
                      <td className="px-4 py-3">{p.unitsSold}</td>
                      <td className="px-4 py-3 text-[#0c831f] font-semibold">{p.growth}</td>
                      <td className="px-4 py-3">{p.topCategory ? <span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#0c831f]">Top Seller</span> : <span className="text-[#999]">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "predictive" && (
          <div className="grid gap-4 lg:grid-cols-3">
            {Object.entries(mockPredictiveAnalytics).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit className="w-5 h-5 text-[#0c831f]" />
                  <h3 className="font-black text-[#1a1a1a] capitalize">{key} Forecast</h3>
                </div>
                <div className="rounded-xl bg-[#f6f7f6] p-4">
                  <p className="font-semibold text-[#1a1a1a]">{value.forecast}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-[#e8e8e8] overflow-hidden">
                      <div className="h-full rounded-full bg-[#0c831f]" style={{ width: `${value.confidence}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#666]">{value.confidence}% confidence</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-bold text-[#666]">Key Factors:</p>
                  {value.factors.map((f, i) => (
                    <p key={i} className="text-xs text-[#666] flex items-start gap-1.5">
                      <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-[#0c831f] flex-shrink-0" />
                      {f}
                    </p>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-[#e8e8e8] bg-[#fffbeb] p-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#d97706]" />
                    <span className="text-xs font-bold text-[#d97706]">Recommendation</span>
                  </div>
                  <p className="mt-1 text-sm text-[#1a1a1a] font-semibold">{value.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
