"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  Search,
  RefreshCw,
  Sliders,
  Play,
  ToggleRight,
  ToggleLeft,
  Zap,
  TrendingUp,
  Users,
  FlaskConical,
} from "lucide-react";

interface RankingModel {
  id: string;
  name: string;
  algorithm: string;
  status: "Active" | "Paused" | "A/B Testing";
  ndcg: number;
  mrr: number;
  map: number;
  zeroResultRate: number;
  avgClickRank: number;
  lastTrained: string;
  searchVolume: number;
}

const mockModels: RankingModel[] = [
  {
    id: "1",
    name: "Primary Search Ranker",
    algorithm: "LambdaMART (GBDT)",
    status: "Active",
    ndcg: 0.76,
    mrr: 0.82,
    map: 0.71,
    zeroResultRate: 3.2,
    avgClickRank: 2.4,
    lastTrained: "1 hour ago",
    searchVolume: 845000,
  },
  {
    id: "2",
    name: "Neural Semantic Ranker",
    algorithm: "BERT Cross-Encoder",
    status: "Active",
    ndcg: 0.79,
    mrr: 0.85,
    map: 0.74,
    zeroResultRate: 2.1,
    avgClickRank: 2.1,
    lastTrained: "3 hours ago",
    searchVolume: 845000,
  },
  {
    id: "3",
    name: "Personalized Search",
    algorithm: "Two-Tower DNN + User Embeddings",
    status: "A/B Testing",
    ndcg: 0.81,
    mrr: 0.87,
    map: 0.76,
    zeroResultRate: 1.8,
    avgClickRank: 1.9,
    lastTrained: "30 min ago",
    searchVolume: 125000,
  },
  {
    id: "4",
    name: "Autocomplete Suggester",
    algorithm: "Prefix Tree + Neural LM",
    status: "Active",
    ndcg: 0.72,
    mrr: 0.78,
    map: 0.65,
    zeroResultRate: 4.5,
    avgClickRank: 1.5,
    lastTrained: "6 hours ago",
    searchVolume: 520000,
  },
];

const topQueries = [
  { query: "fresh vegetables", volume: 45200, clicks: 38420, ctr: "85%", rank: 1.2 },
  { query: "organic fruits", volume: 32100, clicks: 25680, ctr: "80%", rank: 1.5 },
  { query: "dairy products", volume: 28900, clicks: 23120, ctr: "80%", rank: 1.3 },
  { query: "beverages", volume: 25400, clicks: 20320, ctr: "80%", rank: 1.8 },
  { query: "snacks", volume: 22100, clicks: 17680, ctr: "80%", rank: 2.1 },
];

export default function SearchRankingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                AI / Search
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Search Ranking
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Optimize search result rankings using LambdaMART, neural semantic search, and personalized embeddings. Monitor zero-result rates and click-through metrics.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Sliders className="w-4 h-4" />
                Tune Ranking
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
              <span className="text-xs font-black uppercase tracking-wide">NDCG@10</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">0.77</p>
            <p className="text-xs text-[#0c831f] font-bold">+2.1% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-1">
              <Search className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Zero-Result Rate</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">2.9%</p>
            <p className="text-xs text-[#0c831f] font-bold">-0.4% vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f] mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg. Click Rank</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">2.0</p>
            <p className="text-xs text-[#0c831f] font-bold">-0.3 vs last week</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Search Volume</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">845K</p>
            <p className="text-xs text-[#0c831f] font-bold">+12% vs last week</p>
          </div>
        </div>

        {/* Ranking Models */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#e8e8e8] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Ranking Models</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Search Ranker Configurations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Model</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">NDCG</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">MRR</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">MAP</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Zero-Result</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Search Volume</th>
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
                        model.status === "A/B Testing" ? "bg-[#fff0f6] text-[#ff4f8b]" :
                        "bg-[#fef3c7] text-[#d97706]"
                      }`}>
                        {model.status === "Active" ? <ToggleRight className="w-3 h-3" /> :
                         model.status === "A/B Testing" ? <FlaskConical className="w-3 h-3" /> :
                         <ToggleLeft className="w-3 h-3" />}
                        {model.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-[#1a1a1a]">{model.ndcg.toFixed(2)}</td>
                    <td className="px-5 py-4 text-sm font-bold text-[#1a1a1a]">{model.mrr.toFixed(2)}</td>
                    <td className="px-5 py-4 text-sm font-bold text-[#1a1a1a]">{model.map.toFixed(2)}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${model.zeroResultRate <= 2.5 ? "text-[#0c831f]" : model.zeroResultRate <= 3.5 ? "text-[#d97706]" : "text-[#ff4f8b]"}`}>
                        {model.zeroResultRate}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#666]">{model.searchVolume.toLocaleString("en-US")}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb]" title="Configure">
                          <Sliders className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Train">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b]" title="A/B Test">
                          <FlaskConical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Search Queries */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Queries</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Top Search Queries by Volume</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Query</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Volume</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Clicks</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">CTR</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Avg. Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {topQueries.map((q, idx) => (
                  <tr key={idx} className="hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 text-sm font-bold text-[#1a1a1a]">{q.query}</td>
                    <td className="px-4 py-3 text-sm text-[#1a1a1a]">{q.volume.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3 text-sm text-[#1a1a1a]">{q.clicks.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-[#0c831f]">{q.ctr}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#1a1a1a]">{q.rank.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Feature Weights */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Features</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Ranking Feature Weights</h2>
          </div>
          <div className="space-y-3">
            {[
              { feature: "Text Relevance", weight: 0.32, range: "0-0.5" },
              { feature: "Popularity Score", weight: 0.18, range: "0-0.3" },
              { feature: "User Preferences", weight: 0.15, range: "0-0.25" },
              { feature: "Recency", weight: 0.12, range: "0-0.2" },
              { feature: "Price Affinity", weight: 0.10, range: "0-0.15" },
              { feature: "Location Proximity", weight: 0.08, range: "0-0.12" },
              { feature: "Inventory Status", weight: 0.05, range: "0-0.1" },
            ].map((feat) => (
              <div key={feat.feature} className="flex items-center gap-4">
                <span className="w-36 text-sm font-bold text-[#1a1a1a]">{feat.feature}</span>
                <div className="flex-1 h-2 rounded-full bg-[#f0f0f0]">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#0c831f] to-[#ff4f8b]"
                    style={{ width: `${feat.weight / 0.5 * 100}%` }}
                  />
                </div>
                <span className="w-16 text-sm font-bold text-[#1a1a1a] text-right">{(feat.weight * 100).toFixed(0)}%</span>
                <span className="w-20 text-xs text-[#999]">Range: {feat.range}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
