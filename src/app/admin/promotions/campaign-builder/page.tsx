"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { CampaignForm } from "@/components/ui/promotions/admin";
import { useCampaigns } from "@/hooks/use-promotions";
import { Megaphone, Plus, Edit3, Users, CalendarDays } from "lucide-react";
import { toast } from "sonner";

export default function CampaignBuilderPage() {
  const { campaigns, summary, loading, error, createCampaign } = useCampaigns();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Promotions</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Campaign Builder</h1>
              <p className="mt-2 text-sm text-[#666]">Create multi-channel marketing campaigns with targeting, scheduling, and budget management.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> New Campaign
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Active Campaigns" value={summary.active} icon={<Megaphone className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={summary.scheduled} icon={<CalendarDays className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Drafts" value={summary.drafts} icon={<Edit3 className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Reach" value={summary.totalReach} icon={<Users className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        {error && (
          <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-sm font-bold text-[#dc2626]">{error}</div>
        )}

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4"><p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Campaigns</p><h3 className="text-sm font-black text-[#1a1a1a]">All Campaigns</h3></div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => (
                <div key={i} className="h-24 skeleton-shimmer rounded-xl" />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#999]">No campaigns found</div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div key={camp.id} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4 transition-all hover:shadow-sm cursor-pointer" onClick={() => toast.info(`Editing ${camp.name}`)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff0f6]"><Megaphone className="h-4 w-4 text-[#ff4f8b]" /></div>
                      <div>
                        <p className="text-sm font-bold text-[#1a1a1a]">{camp.name}</p>
                        <p className="text-xs text-[#999]">{camp.audience} · Budget: {camp.budget}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={camp.status} />
                      <p className="text-xs text-[#999] mt-1">{camp.startDate} — {camp.endDate}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {camp.channels.map((ch) => (
                      <span key={ch} className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#666] border border-[#e8e8e8]">{ch}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Campaign Modal */}
      <ReusableModal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="New Campaign" subtitle="Create a multi-channel marketing campaign" size="lg">
        <CampaignForm
          onSubmit={async (data) => {
            const result = await createCampaign(data);
            if (result) {
              toast.success(`Campaign "${result.name}" created!`);
              setShowCreateModal(false);
            } else {
              toast.error("Failed to create campaign");
            }
          }}
          onCancel={() => setShowCreateModal(false)}
        />
      </ReusableModal>
    </DashboardLayout>
  );
}
