"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  RefreshCw,
  Sliders,
  Play,
  Pause,
  TrendingUp,
  Clock,
  Target,
  ShoppingCart,
} from "lucide-react";

interface PricingModel {
  id: string;
  name: string;
  strategy: string;
  status: "Active" | "Paused" | "Simulation";
  revenueLift: string;
  marginImpact: string;
  conversionImpact: string;
  productsOptimized: number;
  avgPriceChange: string;
  lastRun: string;
}

const mockModels: PricingModel[] = [
  {
    id: "1",
    name: "Competitor-Based Pricing",
    strategy: "Real-time competitor price matching with margin floors",
    status: "Active",
    revenueLift: "+15.2%",
    marginImpact: "-2.1%",
    conversionImpact: "+8.4%",
    productsOptimized: 12450,
    avgPriceChange: "-3.8%",
    lastRun: "15 min ago",
  },
  {
    id: "2",
    name: "Demand Elasticity Pricing",
    strategy: "Dynamic pricing based on demand elasticity curves",
    status: "Active",
    revenueLift: "+12.8%",
    marginImpact: "+1.5%",
    conversionImpact: "+5.2%",
    productsOptimized: 8920,
    avgPriceChange: "+2.4%",
    lastRun: "22 min ago",
  },
  {
    id: "3",
    name: "Time-Based Discounting",
    strategy: "Hourly discounts on expiring inventory (near-expiry)",
    status: "Active",
    revenueLift: "+8.5%",
    marginImpact: "-4.2%",
    conversionImpact: "+22.1%",
    productsOptimized: 3450,
    avgPriceChange: "-12.5%",
    lastRun: "5 min ago",
  },
  {
    id: "4",
    name: "Subscription Bundle Pricing",
    strategy: "Optimal bundle pricing for subscription plans",
    status: "Simulation",
    revenueLift: "+6.3%*",
    marginImpact: "+3.8%*",
    conversionImpact: "+4.1%*",
    productsOptimized: 280,
    avgPriceChange: "-5.2%",
    lastRun: "1 hour ago",
  },
  {
    id: "5",
    name: "Flash Sale Optimizer",
    strategy: "Time-limited price reduction with surge recovery",
    status: "Paused",
    revenueLift: "+18.5%",
    marginImpact: "-6.8%",
    conversionImpact: "+35.2%",
    productsOptimized: 2100,
    avgPriceChange: "-18.0%",
    lastRun: "2 days ago",
  },
];

const pricingRules = [
  { rule: "Min Margin Floor", value: "12%", description: "Never price below 12% margin" },
  { rule: "Max Discount Cap", value: "50%", description: "Maximum discount on any product" },
  { rule: "Competitor Lag", value: "30 min", description: "Delay before matching competitor price changes" },
  { rule: "Price Change Limit", value: "5% / day", description: "Maximum single-day price movement" },
  { rule: "Elasticity Threshold", value: "1.2", description: "Min elasticity for demand-based pricing" },
];

export default function DynamicPricingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                AI / Pricing
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Dynamic Pricing Engine
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                AI-powered dynamic pricing across all product categories. Optimize prices in real-time based on demand, competition, inventory levels, and customer segments.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Play className="w-4 h-4" />
                Run All Models
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Sliders className="w-4 h-4" />
                Configure Rules
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
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Total Revenue Lift</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">+14.2%</p>
            <p className="text-xs text-[#0c831f] font-bold">+2.1% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#ff4f8b] mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Products Optimized</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">27,200</p>
            <p className="text-xs text-[#0c831f] font-bold">+1,850 today</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Conversion Impact</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">+8.4%</p>
            <p className="text-xs text-[#0c831f] font-bold">+1.2% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg. Recalc Cycle</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">15 min</p>
            <p className="text-xs text-[#999]">Real-time pricing pipeline</p>
          </div>
        </div>

        {/* Pricing Models Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#e8e8e8] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Models</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Pricing Strategy Models</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Strategy</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Revenue Lift</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Margin Impact</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Conversion</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Products</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Avg. Price Δ</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {mockModels.map((model) => (
                  <tr key={model.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-[#1a1a1a]">{model.name}</p>
                        <p className="text-xs text-[#666]">{model.strategy.substring(0, 50)}...</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        model.status === "Active" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        model.status === "Simulation" ? "bg-[#eff6ff] text-[#2563eb]" :
                        "bg-[#fef3c7] text-[#d97706]"
                      }`}>
                        {model.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#0c831f]">{model.revenueLift}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${model.marginImpact.startsWith("+") ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>
                        {model.marginImpact}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#0c831f]">{model.conversionImpact}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#1a1a1a]">{model.productsOptimized.toLocaleString("en-US")}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${model.avgPriceChange.startsWith("-") ? "text-[#ff4f8b]" : "text-[#0c831f]"}`}>
                        {model.avgPriceChange}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb]" title="Configure">
                          <Sliders className="w-4 h-4" />
                        </button>
                        {model.status === "Paused" ? (
                          <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Resume">
                            <Play className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#fef3c7] hover:text-[#d97706]" title="Pause">
                            <Pause className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Rules & Guards */}
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Guardrails</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Pricing Rules & Constraints</h2>
            </div>
            <div className="space-y-3">
              {pricingRules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] p-3">
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{rule.rule}</p>
                    <p className="text-xs text-[#666]">{rule.description}</p>
                  </div>
                  <span className="text-sm font-black text-[#ff4f8b]">{rule.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Segments</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Price Elasticity by Segment</h2>
            </div>
            <div className="space-y-3">
              {[
                { segment: "Premium Customers", elasticity: 0.4, description: "Less price-sensitive, higher margin tolerance" },
                { segment: "Value Shoppers", elasticity: 1.8, description: "Highly price-sensitive, frequent price comparisons" },
                { segment: "Bulk Buyers", elasticity: 0.9, description: "Moderate sensitivity, volume-driven" },
                { segment: "New Users", elasticity: 1.2, description: "Price-sensitive, promotional responsive" },
                { segment: "Subscribers", elasticity: 0.6, description: "Lower sensitivity, locked-in value" },
              ].map((seg, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] p-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1a1a1a]">{seg.segment}</p>
                    <p className="text-xs text-[#666]">{seg.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#1a1a1a]">E = {seg.elasticity.toFixed(1)}</p>
                    <div className="h-1.5 w-20 rounded-full bg-[#f0f0f0] mt-1 ml-auto">
                      <div
                        className={`h-1.5 rounded-full ${seg.elasticity >= 1.2 ? "bg-[#ff4f8b]" : seg.elasticity >= 0.7 ? "bg-[#d97706]" : "bg-[#0c831f]"}`}
                        style={{ width: `${(seg.elasticity / 2) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
