"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import {
  BrainCircuit,
  TrendingUp,
  Search,
  DollarSign,
  BarChart3,
  ShoppingCart,
  Cpu,
  RefreshCw,
  Download,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const aiSections = [
  {
    icon: TrendingUp,
    label: "Recommendation Tuning",
    desc: "Personalize product recommendations",
    href: "/admin/ai/recommendation-tuning",
    status: "Active",
    accuracy: "94.2%",
    bg: "bg-[#fff0f6]",
    text: "text-[#ff4f8b]",
  },
  {
    icon: Search,
    label: "Search Ranking",
    desc: "Optimize search result rankings",
    href: "/admin/ai/search-ranking",
    status: "Active",
    accuracy: "91.8%",
    bg: "bg-[#e8f5e9]",
    text: "text-[#0c831f]",
  },
  {
    icon: DollarSign,
    label: "Dynamic Pricing",
    desc: "AI-driven price optimization",
    href: "/admin/ai/dynamic-pricing",
    status: "Active",
    accuracy: "88.5%",
    bg: "bg-[#eff6ff]",
    text: "text-[#2563eb]",
  },
  {
    icon: BarChart3,
    label: "Demand Forecast",
    desc: "Predict product demand patterns",
    href: "/admin/ai/demand-forecast",
    status: "Active",
    accuracy: "92.1%",
    bg: "bg-[#fffbeb]",
    text: "text-[#d97706]",
  },
  {
    icon: ShoppingCart,
    label: "Reorder Prediction",
    desc: "Predict customer reorder behavior",
    href: "/admin/ai/reorder-prediction",
    status: "Active",
    accuracy: "87.3%",
    bg: "bg-[#f3e8ff]",
    text: "text-[#9333ea]",
  },
  {
    icon: Cpu,
    label: "Model Health",
    desc: "Monitor ML model performance",
    href: "/admin/ai/model-health",
    status: "Healthy",
    accuracy: "—",
    bg: "bg-[#ecfdf5]",
    text: "text-[#059669]",
  },
];

const stats = [
  { title: "Active Models", value: "6", growth: "+1", subtitle: "All operational", icon: Cpu, color: "text-[#0c831f]" },
  { title: "Avg. Accuracy", value: "90.8%", growth: "+2.3%", subtitle: "Across all models", icon: Activity, color: "text-[#2563eb]" },
  { title: "Predictions/Day", value: "2.4M", growth: "+18%", subtitle: "Daily inference volume", icon: Zap, color: "text-[#ff4f8b]" },
  { title: "Latency (p99)", value: "42ms", growth: "-8ms", subtitle: "Avg inference time", icon: Clock, color: "text-[#d97706]" },
];

const recentAlerts = [
  { model: "Recommendation Engine", metric: "Recall@10", value: "0.84", status: "Warning", change: "-2.1% vs yesterday", time: "15 min ago" },
  { model: "Search Ranking", metric: "NDCG@10", value: "0.76", status: "Healthy", change: "+0.5% vs yesterday", time: "32 min ago" },
  { model: "Dynamic Pricing", metric: "Revenue Lift", value: "+12.4%", status: "Healthy", change: "+1.2% vs yesterday", time: "1 hour ago" },
  { model: "Demand Forecast", metric: "MAPE", value: "7.9%", status: "Healthy", change: "-0.3% vs yesterday", time: "2 hours ago" },
];

export default function AIOverviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Artificial Intelligence
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                AI Management Console
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Monitor and manage all machine learning models powering your platform — recommendations, search, pricing, forecasting, and more.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
                Retrain All
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.title} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className={`text-xs font-black uppercase tracking-wide ${stat.color}`}>
                  {stat.title}
                </span>
              </div>
              <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{stat.value}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-bold text-[#0c831f]">{stat.growth}</span>
                <span className="text-xs text-[#999]">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Models Grid */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 mb-5">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              ML Models
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">AI Model Dashboard</h2>
            <p className="text-xs text-[#666]">Click any model to view detailed configuration and tuning options</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {aiSections.map((section) => (
              <Link key={section.label} href={section.href}>
                <div className="cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md hover:-translate-y-0.5 duration-200 text-center">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${section.bg} ${section.text} mx-auto`}>
                    <section.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm font-black text-[#1a1a1a]">{section.label}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-[#999]">{section.desc}</p>
                  <div className="mt-2 flex items-center justify-center gap-1.5">
                    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      section.status === "Active" || section.status === "Healthy"
                        ? "bg-[#e8f5e9] text-[#0c831f]"
                        : "bg-[#fef3c7] text-[#d97706]"
                    }`}>
                      <CheckCircle2 className="w-2 h-2" />
                      {section.status}
                    </span>
                    {section.accuracy !== "—" && (
                      <span className="text-[10px] font-bold text-[#666]">{section.accuracy}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Model Performance Alerts */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Monitoring
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Model Performance Alerts</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Metric</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Value</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Change</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {recentAlerts.map((alert, idx) => (
                  <tr key={idx} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-[#1a1a1a]">{alert.model}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{alert.metric}</td>
                    <td className="px-4 py-3 text-sm font-bold text-[#1a1a1a]">{alert.value}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                        alert.status === "Healthy" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        alert.status === "Warning" ? "bg-[#fef3c7] text-[#d97706]" :
                        "bg-[#fff0f6] text-[#ff4f8b]"
                      }`}>
                        {alert.status === "Healthy" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold flex items-center gap-1 ${
                        alert.change.startsWith("+") ? "text-[#0c831f]" :
                        alert.change.startsWith("-") ? "text-[#ff4f8b]" : "text-[#666]"
                      }`}>
                        {alert.change.startsWith("+") ? <ArrowUpRight className="w-3 h-3" /> :
                         alert.change.startsWith("-") ? <ArrowDownRight className="w-3 h-3" /> : null}
                        {alert.change}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{alert.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
