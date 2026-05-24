"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  RefreshCw,
  Download,
  Search,
  Play,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  Repeat,
  Target,
  CheckCircle2,
} from "lucide-react";

interface ReorderModel {
  id: string;
  product: string;
  category: string;
  reorderProbability: number;
  avgReorderDays: number;
  nextPredictedOrder: string;
  confidence: string;
  trend: "up" | "down" | "stable";
  status: "Active" | "Learning";
  customersAtRisk: number;
  lastOrdered: string;
}

const mockProducts: ReorderModel[] = [
  {
    id: "1",
    product: "Fresh Whole Milk 1L",
    category: "Dairy",
    reorderProbability: 0.92,
    avgReorderDays: 4,
    nextPredictedOrder: "Tomorrow",
    confidence: "High",
    trend: "up",
    status: "Active",
    customersAtRisk: 128,
    lastOrdered: "1 hour ago",
  },
  {
    id: "2",
    product: "Brown Eggs 12pcs",
    category: "Dairy",
    reorderProbability: 0.88,
    avgReorderDays: 7,
    nextPredictedOrder: "In 3 days",
    confidence: "High",
    trend: "up",
    status: "Active",
    customersAtRisk: 234,
    lastOrdered: "2 hours ago",
  },
  {
    id: "3",
    product: "Banana Robusta 1kg",
    category: "Fruits",
    reorderProbability: 0.85,
    avgReorderDays: 3,
    nextPredictedOrder: "Tomorrow",
    confidence: "High",
    trend: "stable",
    status: "Active",
    customersAtRisk: 456,
    lastOrdered: "30 min ago",
  },
  {
    id: "4",
    product: "Wheat Bread 400g",
    category: "Bakery",
    reorderProbability: 0.81,
    avgReorderDays: 5,
    nextPredictedOrder: "In 2 days",
    confidence: "High",
    trend: "up",
    status: "Active",
    customersAtRisk: 189,
    lastOrdered: "3 hours ago",
  },
  {
    id: "5",
    product: "Paneer 200g",
    category: "Dairy",
    reorderProbability: 0.76,
    avgReorderDays: 6,
    nextPredictedOrder: "In 4 days",
    confidence: "Medium",
    trend: "stable",
    status: "Active",
    customersAtRisk: 98,
    lastOrdered: "1 day ago",
  },
  {
    id: "6",
    product: "Basmati Rice 5kg",
    category: "Staples",
    reorderProbability: 0.45,
    avgReorderDays: 21,
    nextPredictedOrder: "In 12 days",
    confidence: "Medium",
    trend: "down",
    status: "Active",
    customersAtRisk: 567,
    lastOrdered: "5 days ago",
  },
  {
    id: "7",
    product: "Organic Honey 500g",
    category: "Pantry",
    reorderProbability: 0.32,
    avgReorderDays: 30,
    nextPredictedOrder: "In 18 days",
    confidence: "Low",
    trend: "down",
    status: "Learning",
    customersAtRisk: 234,
    lastOrdered: "2 weeks ago",
  },
  {
    id: "8",
    product: "Toothpaste 100g",
    category: "Personal Care",
    reorderProbability: 0.28,
    avgReorderDays: 35,
    nextPredictedOrder: "In 22 days",
    confidence: "Low",
    trend: "stable",
    status: "Active",
    customersAtRisk: 789,
    lastOrdered: "1 week ago",
  },
];

const segmentData = [
  { segment: "High Reorder Probability (>80%)", customers: 12450, pct: 38, reorderRate: "92%", avgValue: "₹456" },
  { segment: "Medium Reorder Probability (50-80%)", customers: 9870, pct: 30, reorderRate: "64%", avgValue: "₹312" },
  { segment: "Low Reorder Probability (<50%)", customers: 10680, pct: 32, reorderRate: "22%", avgValue: "₹189" },
];

export default function ReorderPredictionPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                AI / Prediction
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Reorder Prediction
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Predict when customers are likely to reorder products. Proactively engage with personalized reminders, replenishment suggestions, and subscription nudges.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Play className="w-4 h-4" />
                Run Predictions
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
                Retrain Model
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f] mb-1">
              <Repeat className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Predicted Reorders</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">32,950</p>
            <p className="text-xs text-[#0c831f] font-bold">+4.2% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#ff4f8b] mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg. Precision</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">87.3%</p>
            <p className="text-xs text-[#0c831f] font-bold">+1.8% vs last month</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Customers at Risk</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">2,695</p>
            <p className="text-xs text-[#ff4f8b] font-bold">-12% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-1">
              <Package className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Products Tracked</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">12,450</p>
            <p className="text-xs text-[#999]">Across all categories</p>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm lg:col-span-1">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Segments</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Customer Segments</h2>
            </div>
            <div className="space-y-3">
              {segmentData.map((seg, idx) => (
                <div key={idx} className="rounded-xl border border-[#e8e8e8] p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#666]">{seg.segment}</span>
                    <span className="text-xs font-black text-[#1a1a1a]">{seg.pct}%</span>
                  </div>
                  <p className="text-lg font-black text-[#1a1a1a]">{seg.customers.toLocaleString("en-US")}</p>
                  <div className="mt-1 h-2 rounded-full bg-[#f0f0f0]">
                    <div
                      className={`h-2 rounded-full ${
                        seg.pct >= 38 ? "bg-[#0c831f]" : seg.pct >= 30 ? "bg-[#d97706]" : "bg-[#ff4f8b]"
                      }`}
                      style={{ width: `${seg.pct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#666]">
                    <span>Reorder: <strong className="text-[#1a1a1a]">{seg.reorderRate}</strong></span>
                    <span>Avg: <strong className="text-[#1a1a1a]">{seg.avgValue}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product Reorder Predictions Table */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm lg:col-span-2">
            <div className="border-b border-[#e8e8e8] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Predictions</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Product Reorder Predictions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f9fafb]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Reorder Prob.</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Avg Cycle</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Next Order</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">At Risk</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Trend</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e8e8]">
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{product.product}</p>
                          <p className="text-xs text-[#666]">{product.status === "Learning" ? "Still learning patterns..." : "Confidence: " + product.confidence}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-bold text-[#666]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-black ${
                            product.reorderProbability >= 0.8 ? "text-[#0c831f]" :
                            product.reorderProbability >= 0.5 ? "text-[#d97706]" :
                            "text-[#ff4f8b]"
                          }`}>
                            {(product.reorderProbability * 100).toFixed(0)}%
                          </span>
                          <div className="h-2 w-14 rounded-full bg-[#f0f0f0]">
                            <div
                              className={`h-2 rounded-full ${
                                product.reorderProbability >= 0.8 ? "bg-[#0c831f]" :
                                product.reorderProbability >= 0.5 ? "bg-[#d97706]" :
                                "bg-[#ff4f8b]"
                              }`}
                              style={{ width: `${product.reorderProbability * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-[#1a1a1a]">
                        Every {product.avgReorderDays} days
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-bold ${
                          product.nextPredictedOrder === "Tomorrow" ? "text-[#0c831f]" :
                          product.nextPredictedOrder.includes("days") ? "text-[#666]" :
                          "text-[#d97706]"
                        }`}>
                          {product.nextPredictedOrder}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-bold ${
                          product.customersAtRisk >= 500 ? "text-[#ff4f8b]" :
                          product.customersAtRisk >= 200 ? "text-[#d97706]" :
                          "text-[#0c831f]"
                        }`}>
                          {product.customersAtRisk.toLocaleString("en-US")}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {product.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-[#0c831f]" />
                        ) : product.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 text-[#ff4f8b]" />
                        ) : (
                          <div className="w-4 h-0.5 bg-[#d97706] mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb]" title="View Details">
                            <Search className="w-4 h-4" />
                          </button>
                          <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Send Restock Reminder">
                            <UserCheck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Reorder Insights */}
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Timing</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Predicted Reorder Window</h2>
            </div>
            <div className="space-y-2">
              {[
                { window: "Within 24 hours", products: 1240, pct: 38 },
                { window: "2-3 days", products: 890, pct: 27 },
                { window: "4-7 days", products: 670, pct: 20 },
                { window: "8-14 days", products: 320, pct: 10 },
                { window: "15+ days", products: 180, pct: 5 },
              ].map((w, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-28 text-xs font-semibold text-[#666]">{w.window}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#f0f0f0]">
                    <div
                      className={`h-2 rounded-full ${
                        w.pct >= 30 ? "bg-[#0c831f]" : w.pct >= 15 ? "bg-[#d97706]" : "bg-[#ff4f8b]"
                      }`}
                      style={{ width: `${w.pct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-xs font-bold text-[#1a1a1a]">{w.products.toLocaleString("en-US")}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Triggers</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Top Reorder Triggers</h2>
            </div>
            <div className="space-y-3">
              {[
                { trigger: "Running out of stock (home)", impact: "+45%", customers: "12.4K" },
                { trigger: "Price drop alert", impact: "+28%", customers: "8.2K" },
                { trigger: "Subscription due reminder", impact: "+22%", customers: "6.1K" },
                { trigger: "Weekly habit pattern", impact: "+18%", customers: "4.9K" },
                { trigger: "Promotional bundle offer", impact: "+15%", customers: "3.7K" },
              ].map((t, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f6f7f6] text-[10px] font-black text-[#666]">{idx + 1}</span>
                    <span className="text-sm font-semibold text-[#1a1a1a]">{t.trigger}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-[#0c831f]">{t.impact}</span>
                    <span className="text-[10px] text-[#999] ml-1">{t.customers}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Accuracy</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Model Performance</h2>
            </div>
            <div className="space-y-4">
              {[
                { metric: "Precision", value: "87.3%", change: "+1.8%", trend: "up" },
                { metric: "Recall", value: "82.1%", change: "+2.4%", trend: "up" },
                { metric: "F1 Score", value: "0.85", change: "+0.02", trend: "up" },
                { metric: "AUC-ROC", value: "0.91", change: "+0.01", trend: "up" },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] p-3">
                  <span className="text-sm font-semibold text-[#666]">{m.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#1a1a1a]">{m.value}</span>
                    <span className={`flex items-center text-xs font-bold ${m.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>
                      {m.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {m.change}
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-3 rounded-lg bg-[#f0fdf4] p-3">
                <p className="text-xs font-bold text-[#0c831f] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Model is performing above baseline
                </p>
                <p className="mt-1 text-[10px] text-[#666]">Last retrained: 2 days ago • Next retrain schedule: Weekly</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
