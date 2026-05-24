"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Search, Plus, Send, Mail, Image, BarChart3, Copy, Eye, Edit3, Trash2, Target, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

interface Campaign {
  id: string;
  name: string;
  type: "push" | "email" | "banner";
  status: "active" | "scheduled" | "paused" | "completed" | "draft";
  audience: string;
  reach: number;
  clicks: number;
  conversions: number;
  budget: string;
  startDate: string;
  endDate: string;
}

const mockCampaigns: Campaign[] = [
  { id: "CAMP-001", name: "Summer Sale 2026", type: "push", status: "active", audience: "All Users", reach: 45000, clicks: 8200, conversions: 1250, budget: "₹50,000", startDate: "2026-05-01", endDate: "2026-05-31" },
  { id: "CAMP-002", name: "Weekend Flash Deal", type: "email", status: "scheduled", audience: "Premium Users", reach: 12000, clicks: 0, conversions: 0, budget: "₹15,000", startDate: "2026-05-25", endDate: "2026-05-26" },
  { id: "CAMP-003", name: "New Arrivals Banner", type: "banner", status: "active", audience: "All Visitors", reach: 88000, clicks: 3400, conversions: 890, budget: "₹30,000", startDate: "2026-05-10", endDate: "2026-06-10" },
  { id: "CAMP-004", name: "Referral Bonus Campaign", type: "email", status: "paused", audience: "Existing Customers", reach: 25000, clicks: 1200, conversions: 340, budget: "₹25,000", startDate: "2026-04-15", endDate: "2026-05-15" },
  { id: "CAMP-005", name: "Monsoon Essentials", type: "push", status: "draft", audience: "Targeted Segments", reach: 0, clicks: 0, conversions: 0, budget: "₹40,000", startDate: "2026-06-01", endDate: "2026-06-30" },
  { id: "CAMP-006", name: "Weekend Happy Hours", type: "banner", status: "completed", audience: "All Users", reach: 65000, clicks: 5600, conversions: 2100, budget: "₹20,000", startDate: "2026-04-01", endDate: "2026-04-30" },
];

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = mockCampaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || c.type === filterType;
    return matchesSearch && matchesType;
  });

  const typeIcons: Record<string, React.ReactNode> = {
    push: <Send className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    banner: <Image className="w-4 h-4" />,
  };

  const statusColors: Record<string, string> = {
    active: "bg-[#e8f5e9] text-[#0c831f]",
    scheduled: "bg-[#eff7ff] text-[#0369a1]",
    paused: "bg-[#fffbeb] text-[#d97706]",
    completed: "bg-[#f6f7f6] text-[#666]",
    draft: "bg-[#fef2f2] text-red-500",
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Campaign Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Marketing Campaigns</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Create and manage push notifications, email campaigns, and banner advertisements.</p>
            </div>
            <button onClick={() => toast.info("Opening campaign creator")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />New Campaign</button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input type="text" placeholder="Search campaigns..." className="w-full rounded-xl border border-[#e8e8e8] py-2 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1.5">
              {["all", "push", "email", "banner"].map((t) => (
                <button key={t} onClick={() => setFilterType(t)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filterType === t ? "bg-[#0c831f] text-white" : "bg-[#f6f7f6] text-[#666] hover:bg-[#e8e8e8]"}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((campaign) => (
            <div key={campaign.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${campaign.type === "push" ? "bg-[#eff7ff]" : campaign.type === "email" ? "bg-[#fffbeb]" : "bg-[#e8f5e9]"}`}>
                    {typeIcons[campaign.type]}
                  </div>
                  <div>
                    <h3 className="font-black text-[#1a1a1a]">{campaign.name}</h3>
                    <p className="text-xs text-[#666] mt-0.5">{campaign.id} · {campaign.startDate} to {campaign.endDate}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[campaign.status]}`}>{campaign.status}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#666]">Reach</p>
                  <p className="mt-1 text-lg font-black text-[#1a1a1a]">{campaign.reach.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#666]">Clicks</p>
                  <p className="mt-1 text-lg font-black text-[#1a1a1a]">{campaign.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#666]">Conversions</p>
                  <p className="mt-1 text-lg font-black text-[#1a1a1a]">{campaign.conversions.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#999]" />
                <span className="text-sm text-[#666]">Audience: <span className="font-semibold text-[#1a1a1a]">{campaign.audience}</span></span>
                <span className="ml-auto text-sm font-semibold text-[#ff4f8b]">{campaign.budget}</span>
              </div>

              <div className="mt-4 flex gap-2 border-t border-[#e8e8e8] pt-3">
                <button onClick={() => toast.info("Viewing campaign details")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Eye className="w-4 h-4" />View</button>
                <button onClick={() => toast.info("Editing campaign")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" />Edit</button>
                <button onClick={() => toast.success("Campaign cloned")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Copy className="w-4 h-4" />Clone</button>
                <button onClick={() => toast.success("Campaign deleted")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-[#fef2f2]"><Trash2 className="w-4 h-4" />Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
