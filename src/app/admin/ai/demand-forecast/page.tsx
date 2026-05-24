"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  RefreshCw,
  Sliders,
  Play,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  Calendar,
  ShoppingCart,
} from "lucide-react";

interface ForecastModel {
  id: string;
  name: string;
  algorithm: string;
  status: "Active" | "Training" | "Paused";
  horizon: string;
  mape: number;
  rmse: number;
  bias: number;
  accuracy: number;
  lastRun: string;
  category: string;
}

const mockModels: ForecastModel[] = [
  {
    id: "1",
    name: "Overall Demand Forecaster",
    algorithm: "Prophet + LSTM Ensemble",
    status: "Active",
    horizon: "7 days",
    mape: 7.9,
    rmse: 124.5,
    bias: 0.02,
    accuracy: 92.1,
    lastRun: "30 min ago",
    category: "All Products",
  },
  {
    id: "2",
    name: "Fresh Produce Forecast",
    algorithm: "Temporal Fusion Transformer",
    status: "Active",
    horizon: "3 days",
    mape: 9.2,
    rmse: 89.3,
    bias: -0.05,
    accuracy: 90.8,
    lastRun: "45 min ago",
    category: "Vegetables & Fruits",
  },
  {
    id: "3",
    name: "Dairy & Beverages Forecast",
    algorithm: "XGBoost + Calendar Features",
    status: "Active",
    horizon: "14 days",
    mape: 6.5,
    rmse: 67.8,
    bias: 0.01,
    accuracy: 93.5,
    lastRun: "1 hour ago",
    category: "Dairy & Beverages",
  },
  {
    id: "4",
    name: "Snacks & Packaged Forecast",
    algorithm: "ARIMA + External Regressors",
    status: "Active",
    horizon: "30 days",
    mape: 8.1,
    rmse: 156.2,
    bias: 0.03,
    accuracy: 91.9,
    lastRun: "2 hours ago",
    category: "Snacks & Packaged",
  },
  {
    id: "5",
    name: "Seasonal Events Forecast",
    algorithm: "DeepAR + Event Embeddings",
    status: "Training",
    horizon: "90 days",
    mape: 11.4,
    rmse: 234.1,
    bias: 0.08,
    accuracy: 88.6,
    lastRun: "In Progress...",
    category: "Seasonal / Events",
  },
];

export default function DemandForecastPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                AI / Forecasting
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Demand Forecast
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Predict product demand across categories using ensemble models. Optimize inventory, reduce waste, and ensure stock availability with ML-driven forecasting.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Play className="w-4 h-4" />
                Run Forecast
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Calendar className="w-4 h-4" />
                Set Horizon
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f] mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg. Accuracy</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">91.4%</p>
            <p className="text-xs text-[#0c831f] font-bold">+1.2% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#ff4f8b] mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">MAPE</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">7.9%</p>
            <p className="text-xs text-[#0c831f] font-bold">-0.3% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Stockout Prevention</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">94.2%</p>
            <p className="text-xs text-[#0c831f] font-bold">+2.5% vs last month</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Forecast Horizon</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">90 days</p>
            <p className="text-xs text-[#999]">Configurable per model</p>
          </div>
        </div>

        {/* Forecast Models */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#e8e8e8] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Models</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Forecasting Models</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Model</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Category</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Horizon</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Accuracy</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">MAPE</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Bias</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {mockModels.map((model) => (
                  <tr key={model.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-[#1a1a1a]">{model.name}</p>
                        <p className="text-xs text-[#666]">{model.algorithm}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#666]">{model.category}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        model.status === "Active" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        model.status === "Training" ? "bg-[#eff6ff] text-[#2563eb]" :
                        "bg-[#fef3c7] text-[#d97706]"
                      }`}>
                        {model.status === "Active" ? <Zap className="w-3 h-3" /> :
                         model.status === "Training" ? <RefreshCw className="w-3 h-3 animate-spin" /> :
                         <AlertTriangle className="w-3 h-3" />}
                        {model.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#1a1a1a]">{model.horizon}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1a1a1a]">{model.accuracy.toFixed(1)}%</span>
                        <div className="h-2 w-16 rounded-full bg-[#f0f0f0]">
                          <div className="h-2 rounded-full bg-[#0c831f]" style={{ width: `${model.accuracy}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${model.mape <= 8 ? "text-[#0c831f]" : model.mape <= 10 ? "text-[#d97706]" : "text-[#ff4f8b]"}`}>
                        {model.mape.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${Math.abs(model.bias) <= 0.03 ? "text-[#0c831f]" : "text-[#d97706]"}`}>
                        {model.bias >= 0 ? "+" : ""}{model.bias.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb]" title="Configure">
                          <Sliders className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Run Forecast">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Category Forecast Summary */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Categories</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Category Forecast Summary</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { category: "Vegetables", forecast: "₹12.4L", growth: "+8%", accuracy: 93, trend: "up" },
              { category: "Fruits", forecast: "₹8.9L", growth: "+12%", accuracy: 91, trend: "up" },
              { category: "Dairy", forecast: "₹15.2L", growth: "+5%", accuracy: 94, trend: "up" },
              { category: "Beverages", forecast: "₹6.8L", growth: "+18%", accuracy: 90, trend: "up" },
              { category: "Snacks", forecast: "₹9.1L", growth: "+3%", accuracy: 89, trend: "up" },
              { category: "Household", forecast: "₹4.5L", growth: "-2%", accuracy: 86, trend: "down" },
              { category: "Personal Care", forecast: "₹3.2L", growth: "+7%", accuracy: 88, trend: "up" },
              { category: "Baby Care", forecast: "₹2.1L", growth: "+15%", accuracy: 92, trend: "up" },
            ].map((cat) => (
              <div key={cat.category} className="rounded-xl border border-[#e8e8e8] p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#666]">{cat.category}</span>
                  <span className={`flex items-center text-xs font-bold ${cat.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>
                    {cat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {cat.growth}
                  </span>
                </div>
                <p className="text-lg font-black text-[#1a1a1a]">{cat.forecast}</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-[#f0f0f0]">
                    <div className="h-1.5 rounded-full bg-[#0c831f]" style={{ width: `${cat.accuracy}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-[#666]">{cat.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
