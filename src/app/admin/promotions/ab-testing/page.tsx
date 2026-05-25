"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { ABTestBuilder } from "@/components/ui/promotions/admin";
import { useABTests } from "@/hooks/use-promotions";
import { BarChart3, Plus, TrendingUp, Users, Target } from "lucide-react";
import { toast } from "sonner";

export default function ABTestingPage() {
  const { tests, summary, loading, error, filters, updateFilters, fetchTests, createTest } = useABTests();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Promotions</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">A/B Testing</h1>
              <p className="mt-2 text-sm text-[#666]">Run A/B tests on promotions, notifications, pricing, and checkout flows.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> New Test
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Tests" value={summary.total} icon={<BarChart3 className="h-5 w-5" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Running" value={summary.running} icon={<Target className="h-5 w-5" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Completed" value={summary.completed} icon={<TrendingUp className="h-5 w-5" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Impressions" value={summary.totalImpressions.toLocaleString()} icon={<Users className="h-5 w-5" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        {error && (
          <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-sm font-bold text-[#dc2626] flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => fetchTests()} className="text-xs underline">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map((i) => (
              <div key={i} className="h-32 skeleton-shimmer rounded-2xl" />
            ))}
          </div>
        ) : tests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f7f6]">
              <BarChart3 className="h-6 w-6 text-[#999]" />
            </div>
            <p className="text-sm font-bold text-[#666]">No A/B tests found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tests.map((test) => (
              <div key={test.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3e8ff]"><BarChart3 className="h-4 w-4 text-[#9333ea]" /></div>
                    <div>
                      <p className="text-sm font-bold text-[#1a1a1a]">{test.name}</p>
                      <p className="text-xs text-[#999]">{test.audience} · {test.totalImpressions.toLocaleString()} impressions</p>
                    </div>
                  </div>
                  <StatusBadge status={test.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-xl bg-[#f9fafb] p-3">
                    <p className="text-[10px] font-bold uppercase text-[#999]">Variant A</p>
                    <p className="text-sm font-bold text-[#1a1a1a]">{test.variantA.label}</p>
                    <p className="text-xs text-[#0c831f]">{test.variantA.conversionRate}</p>
                  </div>
                  <div className="rounded-xl bg-[#f9fafb] p-3">
                    <p className="text-[10px] font-bold uppercase text-[#999]">Variant B</p>
                    <p className="text-sm font-bold text-[#1a1a1a]">{test.variantB.label}</p>
                    <p className="text-xs text-[#0c831f]">{test.variantB.conversionRate}</p>
                  </div>
                  <div className="rounded-xl bg-[#f9fafb] p-3">
                    <p className="text-[10px] font-bold uppercase text-[#999]">Winner</p>
                    <p className="text-sm font-bold">{test.winner ? `Variant ${test.winner}` : "In progress"}</p>
                  </div>
                  <div className="rounded-xl bg-[#f9fafb] p-3">
                    <p className="text-[10px] font-bold uppercase text-[#999]">Period</p>
                    <p className="text-xs font-bold text-[#666]">{test.startedAt} — {test.endedAt || "Ongoing"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Test Modal */}
      <ReusableModal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="New A/B Test" subtitle="Set up a new split test" size="lg">
        <ABTestBuilder
          onSubmit={async (data) => {
            const result = await createTest(data);
            if (result) {
              toast.success(`A/B test "${result.name}" created!`);
              setShowCreateModal(false);
            } else {
              toast.error("Failed to create A/B test");
            }
          }}
          onCancel={() => setShowCreateModal(false)}
        />
      </ReusableModal>
    </DashboardLayout>
  );
}
