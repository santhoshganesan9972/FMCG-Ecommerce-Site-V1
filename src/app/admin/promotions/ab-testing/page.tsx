"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { BarChart3, Plus, Eye, TrendingUp, Users, Percent, Target } from "lucide-react";
import { toast } from "sonner";

const tests = [
  { id: "AB-001", name: "Homepage Banner CTA Test", variantA: "Shop Now", variantB: "Explore Deals", audience: "50% each", impressions: "12,450", winner: "B", conversionA: "3.2%", conversionB: "4.8%", status: "completed", startedAt: "2026-05-10", endedAt: "2026-05-17" },
  { id: "AB-002", name: "Discount Percentage Test", variantA: "20% Off", variantB: "Flat ₹50 Off", audience: "50% each", impressions: "8,320", winner: "A", conversionA: "5.1%", conversionB: "3.9%", status: "completed", startedAt: "2026-05-05", endedAt: "2026-05-12" },
  { id: "AB-003", name: "Push Notification Copy", variantA: "Hurry! Limited Stock", variantB: "Back in Stock!", audience: "50% each", impressions: "22,450", winner: null, conversionA: "—", conversionB: "—", status: "running", startedAt: "2026-05-21", endedAt: "—" },
  { id: "AB-004", name: "Checkout Flow Test", variantA: "Single Page", variantB: "Multi Step", audience: "25% each", impressions: "5,670", winner: "A", conversionA: "72%", conversionB: "65%", status: "completed", startedAt: "2026-04-20", endedAt: "2026-05-01" },
  { id: "AB-005", name: "Email Subject Line Test", variantA: "Don't Miss These Deals", variantB: "Your Weekly Picks", audience: "50% each", impressions: "45,230", winner: "B", conversionA: "18.2%", conversionB: "24.7%", status: "completed", startedAt: "2026-05-15", endedAt: "2026-05-20" },
];

export default function ABTestingPage() {
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
          <ReusableCard title="Total Tests" value={tests.length} icon={<BarChart3 className="h-5 w-5" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Running" value={tests.filter(t => t.status === "running").length} icon={<Target className="h-5 w-5" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Completed" value={tests.filter(t => t.status === "completed").length} icon={<TrendingUp className="h-5 w-5" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Impressions" value={tests.reduce((s, t) => s + parseInt(t.impressions.replace(/,/g, "")), 0).toLocaleString()} icon={<Users className="h-5 w-5" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <div className="space-y-3">
          {tests.map((test) => (
            <div key={test.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3e8ff]"><BarChart3 className="h-4 w-4 text-[#9333ea]" /></div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{test.name}</p>
                    <p className="text-xs text-[#999]">{test.audience} · {test.impressions} impressions</p>
                  </div>
                </div>
                <StatusBadge status={test.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#999]">Variant A</p>
                  <p className="text-sm font-bold text-[#1a1a1a]">{test.variantA}</p>
                  <p className="text-xs text-[#0c831f]">{test.conversionA}</p>
                </div>
                <div className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase text-[#999]">Variant B</p>
                  <p className="text-sm font-bold text-[#1a1a1a]">{test.variantB}</p>
                  <p className="text-xs text-[#0c831f]">{test.conversionB}</p>
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
      </div>
    </DashboardLayout>
  );
}
