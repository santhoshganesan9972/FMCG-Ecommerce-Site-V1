"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { TrendingUp, TrendingDown, Package, BarChart3, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const forecasts = [
  { product: "Full Cream Milk 1L", current: 320, predicted: 380, trend: "up", confidence: 92, nextOrder: "2026-05-28" },
  { product: "Organic Basmati Rice", current: 120, predicted: 95, trend: "down", confidence: 85, nextOrder: "2026-06-15" },
  { product: "Fresh Red Apples", current: 85, predicted: 110, trend: "up", confidence: 78, nextOrder: "2026-06-01" },
  { product: "Greek Yogurt 400g", current: 56, predicted: 65, trend: "up", confidence: 88, nextOrder: "2026-05-26" },
  { product: "Cold Brew Coffee 250ml", current: 42, predicted: 55, trend: "up", confidence: 72, nextOrder: "2026-06-10" },
  { product: "Natural Honey 500g", current: 0, predicted: 25, trend: "up", confidence: 95, nextOrder: "2026-05-25" },
];

export default function ForecastPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Demand Forecast</h1>
          <p className="mt-2 text-sm text-[#666]">AI-powered demand forecasting for optimal stock planning and reorder scheduling.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Products Tracked" value={forecasts.length} icon={<Package className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Avg Confidence" value="85%" icon={<BarChart3 className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Upward Trend" value={forecasts.filter(f => f.trend === "up").length} icon={<TrendingUp className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Downward Trend" value={forecasts.filter(f => f.trend === "down").length} icon={<TrendingDown className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4"><p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Forecast</p><h3 className="text-sm font-black text-[#1a1a1a]">Predicted Demand vs Current Stock</h3></div>
          <div className="space-y-3">
            {forecasts.map((f) => (
              <div key={f.product} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{f.product}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-[#666]">
                      <span>Current: <span className="font-bold text-[#1a1a1a]">{f.current}</span></span>
                      <span>Predicted: <span className="font-bold text-[#0c831f]">{f.predicted}</span></span>
                      <span>Confidence: <span className="font-bold">{f.confidence}%</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {f.trend === "up" ? <TrendingUp className="h-4 w-4 text-[#0c831f]" /> : <TrendingDown className="h-4 w-4 text-[#ff4f8b]" />}
                      <span className={`text-lg font-black ${f.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>{f.trend === "up" ? "+" : ""}{f.predicted - f.current}</span>
                    </div>
                    <p className="text-[10px] text-[#999]">Next order: {f.nextOrder}</p>
                  </div>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                  <div className="h-full rounded-full bg-[#0c831f]" style={{ width: `${(f.current / f.predicted) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
