"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockSearchKeywords, mockSearchSynonyms, mockTrendingSearches } from "@/data/admin/operations";
import { Search as SearchIcon, Plus, TrendingUp, ArrowUp, ArrowDown, Minus, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";

type SearchTab = "keywords" | "synonyms" | "trending";

export default function SearchPage() {
  const [tab, setTab] = useState<SearchTab>("keywords");

  const tabs = [
    { key: "keywords" as SearchTab, label: "Keywords", count: mockSearchKeywords.length },
    { key: "synonyms" as SearchTab, label: "Synonyms", count: mockSearchSynonyms.length },
    { key: "trending" as SearchTab, label: "Trending", count: mockTrendingSearches.length },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Search Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Search Intelligence</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage search keywords, synonyms, and track trending searches to optimize discoverability.</p>
            </div>
            <button onClick={() => toast.info("Opening add keyword form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Add Keyword</button>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#e8e8e8] pb-2">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${tab === t.key ? "bg-[#0c831f] text-white shadow-sm" : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"}`}>
                {t.label}<span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{t.count}</span>
              </button>
            ))}
          </div>
        </section>

        {tab === "keywords" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Keyword", "Searches", "Results", "Conversion", "Trend", "Last Searched", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockSearchKeywords.map((k) => (
                    <tr key={k.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{k.keyword}</td>
                      <td className="px-4 py-3">{k.searchCount.toLocaleString()}</td>
                      <td className="px-4 py-3">{k.resultCount}</td>
                      <td className="px-4 py-3 text-[#0c831f] font-semibold">{k.conversionRate}</td>
                      <td className="px-4 py-3">
                        {k.trend === "up" ? <ArrowUp className="w-4 h-4 text-[#0c831f]" /> : k.trend === "down" ? <ArrowDown className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4 text-[#999]" />}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#666]">{k.lastSearched}</td>
                      <td className="px-4 py-3"><button onClick={() => toast.info("Editing keyword")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "synonyms" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {mockSearchSynonyms.map((s) => (
              <div key={s.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-[#1a1a1a]">{s.term}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.isActive ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f6f7f6] text-[#999]"}`}>{s.isActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.synonyms.map((syn) => (
                    <span key={syn} className="rounded-lg bg-[#f6f7f6] px-2.5 py-1 text-xs text-[#666]">{syn}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2 border-t border-[#e8e8e8] pt-3">
                  <button onClick={() => toast.info("Editing synonym group")} className="text-xs font-semibold text-[#666] hover:text-[#0c831f]"><Edit3 className="w-4 h-4 inline mr-1" />Edit</button>
                  <button onClick={() => toast.info("Synonym group deleted")} className="text-xs font-semibold text-red-500"><Trash2 className="w-4 h-4 inline mr-1" />Delete</button>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border-2 border-dashed border-[#e8e8e8] p-8 flex flex-col items-center justify-center text-center hover:border-[#0c831f] transition-colors">
              <Plus className="w-8 h-8 text-[#ccc] mb-2" />
              <p className="font-semibold text-[#1a1a1a]">Add Synonym Group</p>
              <p className="text-xs text-[#666] mt-1">Map related search terms</p>
            </div>
          </div>
        )}

        {tab === "trending" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#e8e8e8] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#ff4f8b]" />
              <h2 className="font-black text-[#1a1a1a]">Trending Searches</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["#", "Keyword", "Volume", "Change", "Period", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockTrendingSearches.map((t) => (
                    <tr key={t.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3">
                        <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${t.position <= 3 ? "bg-[#ff4f8b] text-white" : "bg-[#f0f0f0] text-[#666]"}`}>{t.position}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{t.keyword}</td>
                      <td className="px-4 py-3">{t.volume.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        {t.change === "New" ? (
                          <span className="rounded-full bg-[#eff7ff] px-2.5 py-0.5 text-xs font-semibold text-[#0369a1]">New</span>
                        ) : (
                          <span className="text-[#0c831f] font-semibold">{t.change}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#666]">{t.period}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => toast.info("Viewing trend details")} className="text-xs font-semibold text-[#0c831f]">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
