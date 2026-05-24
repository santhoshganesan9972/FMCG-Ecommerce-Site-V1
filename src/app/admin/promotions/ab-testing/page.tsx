"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  Play,
  Pause,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Plus,
  Zap,
  Gift,
  Copy as CopyIcon,
  Percent,
  Check,
  X,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { abTests } from "@/data/promotions";

const statusConfig: Record<string, { label: string; className: string }> = {
  running: { label: "Running", className: "bg-[#e8f5e9] text-[#0c831f]" },
  completed: { label: "Completed", className: "bg-[#eff6ff] text-[#2563eb]" },
  draft: { label: "Draft", className: "bg-[#f6f7f6] text-[#666]" },
};

const typeIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  "Flash Sale": { icon: <Zap className="h-4 w-4" />, color: "text-[#ff4f8b]" },
  "BOGO": { icon: <Gift className="h-4 w-4" />, color: "text-[#0c831f]" },
  "Combo Offer": { icon: <CopyIcon className="h-4 w-4" />, color: "text-[#2563eb]" },
  "Coupon": { icon: <Percent className="h-4 w-4" />, color: "text-[#d97706]" },
};

export default function ABTestingPage() {
  const [tests, setTests] = useState(abTests);
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all" ? tests : tests.filter((t) => t.status === activeFilter);
  const runningTests = tests.filter((t) => t.status === "running");
  const completedTests = tests.filter((t) => t.status === "completed");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Experimentation Lab
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                A/B Testing
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Test promotion variants — headline copy, discount value, CTA placement, or
                timings. Let the data decide which variant wins.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/promotions/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <Plus className="w-4 h-4" />
                  New Test
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <BarChart3 className="w-4 h-4" />
                Reports
              </button>
            </div>
          </div>
        </section>

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Running Tests</p>
            <h2 className="mt-2 text-3xl font-black text-[#0c831f]">{runningTests.length}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Completed</p>
            <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">{completedTests.length}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Avg Winning Lift</p>
            <h2 className="mt-2 text-3xl font-black text-[#0c831f]">+14%</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Tests This Month</p>
            <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">{tests.length}</h2>
          </div>
        </div>

        {/* Active / Completed tabs */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-4 sm:px-5">
            <div className="-mb-px flex gap-0 overflow-x-auto py-1">
              {[
                { key: "all", label: "All Tests" },
                { key: "running", label: "Running" },
                { key: "completed", label: "Completed" },
                { key: "draft", label: "Drafts" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`relative inline-flex whitespace-nowrap px-4 py-2.5 text-sm font-bold transition-colors ${
                    activeFilter === tab.key ? "text-[#0c831f]" : "text-[#999] hover:text-[#1a1a1a]"
                  }`}
                >
                  {tab.label}
                  {activeFilter === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#0c831f]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#f0f0f0]">
            {filtered.map((test) => {
              const status = statusConfig[test.status];
              const leaderIcon = test.leader === "A" ? <ArrowUpRight className="h-3.5 w-3.5 text-[#0c831f]" /> : <ArrowUpRight className="h-3.5 w-3.5 text-[#0c831f]" />;
              return (
                <div key={test.id} className="flex flex-col gap-4 p-4 sm:p-5 hover:bg-[#fafffe] transition-colors">
                  {/* Header row */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black text-[#1a1a1a]">{test.name}</h3>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${status.className}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${test.status === "running" ? "bg-[#0c831f] animate-pulse" : "bg-[#2563eb]"}`} />
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#999]">
                        Campaign:{" "}
                        <Link href={`/admin/promotions/campaigns/${test.id}`} className="font-bold text-[#2563eb] hover:underline">
                          {test.baseCampaign}
                        </Link>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {(test.status === "running" || test.status === "draft") && (
                        <button className="flex items-center gap-1.5 rounded-lg bg-[#0c831f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a6a18]">
                          <Play className="h-3 w-3" />
                          {test.status === "draft" ? "Launch Test" : "View Live"}
                        </button>
                      )}
                      {test.status === "completed" && (
                        <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                          <RotateCcw className="h-3 w-3" />
                          Reset
                        </button>
                      )}
                      <Link href={`/admin/promotions/campaigns/${test.id}`}>
                        <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                          <ExternalLink className="h-3 w-3" />
                          View Campaign
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* A/B Variants */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:ml-0">
                    {/* Variant A */}
                    <div
                      className={`rounded-xl border-2 p-4 sm:p-5 ${
                        test.leader === "A" ? "border-[#0c831f] bg-[#e8f5e9]/20" : "border-[#e8e8e8]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wide text-[#999]">
                          Variant A
                        </span>
                        {test.leader === "A" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-black text-[#0c831f]">
                            <TrendingUp className="h-3 w-3" />
                            Winner
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-black text-[#1a1a1a]">{test.variantA.label}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="font-bold text-[#999]">Conversions</p>
                          <p className="text-lg font-black text-[#1a1a1a]">{test.variantA.conversions}</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#999]">Revenue</p>
                          <p className="text-lg font-black text-[#0c831f]">{test.variantA.revenue}</p>
                        </div>
                      </div>
                    </div>

                    {/* Variant B */}
                    <div
                      className={`rounded-xl border-2 p-4 sm:p-5 ${
                        test.leader === "B" ? "border-[#0c831f] bg-[#e8f5e9]/20" : "border-[#e8e8e8]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wide text-[#999]">
                          Variant B
                        </span>
                        {test.leader === "B" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-black text-[#0c831f]">
                            <TrendingUp className="h-3 w-3" />
                            Winner
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-black text-[#1a1a1a]">{test.variantB.label}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="font-bold text-[#999]">Conversions</p>
                          <p className="text-lg font-black text-[#1a1a1a]">{test.variantB.conversions}</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#999]">Revenue</p>
                          <p className="text-lg font-black text-[#0c831f]">{test.variantB.revenue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:ml-0">
                    <div className="flex items-center gap-3 text-xs font-bold text-[#999]">
                      <span>Started {test.startDate || "—"}</span>
                      <span>&middot;</span>
                      <span>Ends {test.endDate || "—"}</span>
                      {test.confidence > 0 && (
                        <>
                          <span>&middot;</span>
                          <span className="text-[#0c831f]">
                            {test.confidence}% confidence
                          </span>
                        </>
                      )}
                    </div>
                    {test.leader && (
                      <p className="text-xs font-black text-[#0c831f]">
                        Variant {test.leader} is performing better
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6f7f6] text-2xl">
                🔬
              </div>
              <p className="mt-3 text-sm font-bold text-[#666]">No tests found</p>
              <p className="mt-1 text-xs text-[#999]">
                No A/B tests match the current filter. Start a new test to optimise your promotions.
              </p>
              <Link href="/admin/promotions/create">
                <button className="mt-4 flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <Plus className="w-4 h-4" />
                  Create Test
                </button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
