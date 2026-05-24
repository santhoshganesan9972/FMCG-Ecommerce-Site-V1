"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  TrendingUp,
  RefreshCw,
  Search,
  Play,
  Pause,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  Zap,
  Clock,
  Sliders,
  Target,
  Users,
} from "lucide-react";

interface RecommendationModel {
  id: string;
  name: string;
  algorithm: string;
  status: "Active" | "Paused" | "Training";
  recall: number;
  precision: number;
  ndcg: number;
  coverate: number;
  lastTrained: string;
  avgClicksPerSession: number;
  revenueLift: string;
  segments: string[];
}

const mockModels: RecommendationModel[] = [
  {
    id: "1",
    name: "Homepage Personalization",
    algorithm: "Collaborative Filtering + Neural CF",
    status: "Active",
    recall: 0.84,
    precision: 0.72,
    ndcg: 0.76,
    coverate: 92,
    lastTrained: "2 hours ago",
    avgClicksPerSession: 4.2,
    revenueLift: "+18.5%",
    segments: ["All Users", "New Visitors", "Returning"],
  },
  {
    id: "2",
    name: "Frequently Bought Together",
    algorithm: "Market Basket Analysis (Apriori)",
    status: "Active",
    recall: 0.78,
    precision: 0.81,
    ndcg: 0.69,
    coverate: 68,
    lastTrained: "6 hours ago",
    avgClicksPerSession: 2.8,
    revenueLift: "+12.3%",
    segments: ["All Users"],
  },
  {
    id: "3",
    name: "Similar Products",
    algorithm: "Content-Based Embeddings (BERT)",
    status: "Active",
    recall: 0.82,
    precision: 0.75,
    ndcg: 0.72,
    coverate: 85,
    lastTrained: "4 hours ago",
    avgClicksPerSession: 3.1,
    revenueLift: "+9.8%",
    segments: ["Product Page", "Search Results"],
  },
  {
    id: "4",
    name: "Personalized Offers",
    algorithm: "XGBoost + Contextual Bandit",
    status: "Training",
    recall: 0.71,
    precision: 0.68,
    ndcg: 0.63,
    coverate: 45,
    lastTrained: "In progress...",
    avgClicksPerSession: 1.9,
    revenueLift: "+6.2%",
    segments: ["Premium", "Loyalty Members"],
  },
];

const hyperparams = [
  { name: "Embedding Dimension", value: 128, range: "32-256", recommended: 128 },
  { name: "Learning Rate", value: 0.001, range: "0.0001-0.01", recommended: 0.001 },
  { name: "Num. Epochs", value: 50, range: "10-100", recommended: 50 },
  { name: "Batch Size", value: 256, range: "64-512", recommended: 256 },
  { name: "Negative Samples", value: 5, range: "1-20", recommended: 5 },
  { name: "Regularization λ", value: 0.0001, range: "0.00001-0.001", recommended: 0.0001 },
];

export default function RecommendationTuningPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                AI / Recommendations
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Recommendation Tuning
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Fine-tune recommendation models — personalize the user experience with collaborative filtering, content-based embeddings, and contextual bandits.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Play className="w-4 h-4" />
                Train All Models
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
            <div className="flex items-center gap-2 text-[#ff4f8b] mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg. Recall@10</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">78.8%</p>
            <p className="text-xs text-[#0c831f] font-bold">+2.4% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">NDCG@10</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">0.72</p>
            <p className="text-xs text-[#0c831f] font-bold">+0.03 vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f] mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Revenue Lift</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">+14.2%</p>
            <p className="text-xs text-[#0c831f] font-bold">+1.8% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Training Frequency</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">4 hrs</p>
            <p className="text-xs text-[#999]">Auto-scheduled pipeline</p>
          </div>
        </div>

        {/* Models Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#e8e8e8] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                <input
                  type="text"
                  placeholder="Search recommendation models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Model</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Recall</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Precision</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">NDCG</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Revenue Lift</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Last Trained</th>
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
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        model.status === "Active" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        model.status === "Training" ? "bg-[#eff6ff] text-[#2563eb]" :
                        "bg-[#fef3c7] text-[#d97706]"
                      }`}>
                        {model.status === "Active" ? <ToggleRight className="w-3 h-3" /> :
                         model.status === "Training" ? <RefreshCw className="w-3 h-3 animate-spin" /> :
                         <ToggleLeft className="w-3 h-3" />}
                        {model.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#1a1a1a]">{(model.recall * 100).toFixed(1)}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#1a1a1a]">{(model.precision * 100).toFixed(1)}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#1a1a1a]">{model.ndcg.toFixed(2)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[#0c831f]">{model.revenueLift}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#666]">{model.lastTrained}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb]" title="Configure">
                          <Sliders className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Train">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#fef3c7] hover:text-[#d97706]" title="Pause">
                          <Pause className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hyperparameter Tuning */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Hyperparameters</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Global Model Configuration</h2>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-[#ff4f8b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e0457a]">
              <RefreshCw className="w-4 h-4" />
              Auto-Tune
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {hyperparams.map((param) => (
              <div key={param.name} className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#666] mb-1">{param.name}</p>
                <p className="text-lg font-black text-[#1a1a1a]">{param.value}</p>
                <p className="text-[10px] text-[#999]">Range: {param.range}</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className={`text-[10px] font-bold ${param.value === param.recommended ? "text-[#0c831f]" : "text-[#d97706]"}`}>
                    {param.value === param.recommended ? "Optimal ✓" : "Tune recommended"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Segment Coverage */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-[#0c831f]" />
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Segments</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">User Segment Coverage</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {["All Users", "New Visitors", "Returning", "Premium", "Loyalty Members", "High-Value", "Inactive", "Seasonal"].map((segment) => (
              <div key={segment} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] p-3">
                <CheckCircle2 className="w-4 h-4 text-[#0c831f]" />
                <span className="text-sm font-bold text-[#1a1a1a]">{segment}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
