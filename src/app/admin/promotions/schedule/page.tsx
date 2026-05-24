"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  CalendarDays,
  Clock,
  ArrowRight,
  Copy,
  Play,
  Pause,
  Zap,
  Gift,
  CopyIcon,
  Percent,
  Filter,
  MoreVertical,
  Trash2,
  ChevronDown,
  Bell,
  Check,
} from "lucide-react";
import { scheduledCampaigns } from "@/data/promotions";

const statusConfig: Record<string, { label: string; className: string }> = {
  scheduled: { label: "Scheduled", className: "bg-[#eff6ff] text-[#2563eb]" },
  active: { label: "Active", className: "bg-[#e8f5e9] text-[#0c831f]" },
};

const typeIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  "Flash Sale": { icon: <Zap className="h-4 w-4" />, color: "text-[#ff4f8b]" },
  "BOGO": { icon: <Gift className="h-4 w-4" />, color: "text-[#0c831f]" },
  "Combo Offer": { icon: <CopyIcon className="h-4 w-4" />, color: "text-[#2563eb]" },
  "Coupon": { icon: <Percent className="h-4 w-4" />, color: "text-[#d97706]" },
};

export default function ScheduleCampaignPage() {
  const [campaigns] = useState(scheduledCampaigns);
  const [filterType, setFilterType] = useState("all");

  const filteredCampaigns =
    filterType === "all" ? campaigns : campaigns.filter((c) => c.type === filterType);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Operations Calendar
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Schedule Campaign
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                View, manage, and create scheduled promotions. Set start/end dates in advance
                so campaigns go live automatically at the right time.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <CalendarDays className="w-4 h-4" />
                Calendar View
              </button>
              <Link href="/admin/promotions/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <Plus className="w-4 h-4" />
                  Schedule New
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Total Scheduled</p>
            <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">{campaigns.length}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Upcoming (7 days)</p>
            <h2 className="mt-2 text-3xl font-black text-[#2563eb]">2</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Running</p>
            <h2 className="mt-2 text-3xl font-black text-[#0c831f]">{campaigns.filter((c) => c.status === "active").length || 1}</h2>
          </div>
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-bold text-[#666]">Total Budget</p>
            <h2 className="mt-2 text-xl font-black text-[#1a1a1a]">
              ₹{(campaigns.reduce((sum, c) => sum + parseInt(c.budget.replace(/[^0-9]/g, "")), 0) / 100000).toFixed(1)}L
            </h2>
          </div>
        </div>

        {/* Campaign List */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Upcoming & Scheduled</p>
                <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">Campaign Schedule</h2>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-[#e8e8e8] rounded-lg text-xs font-bold text-[#666] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                >
                  <option value="all">All Types</option>
                  <option value="Flash Sale">Flash Sale</option>
                  <option value="BOGO">BOGO</option>
                  <option value="Combo Offer">Combo Offer</option>
                  <option value="Coupon">Coupon</option>
                </select>
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] px-3 py-2 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                  <Clock className="h-3.5 w-3.5" />
                  Sort by Date
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#f0f0f0]">
            {filteredCampaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              const typeInfo = typeIcons[campaign.type];
              const startDate = new Date(campaign.startDate);
              const endDate = new Date(campaign.endDate);
              const now = new Date();
              const daysUntil = Math.ceil((startDate.getTime() - now.getTime()) / 86400000);
              const isPast = now > endDate;

              return (
                <div key={campaign.id} className="flex flex-col gap-3 p-4 sm:p-5 hover:bg-[#fafffe] transition-colors">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${typeInfo.color === "text-[#ff4f8b]" ? "bg-[#fff0f6]" : typeInfo.color === "text-[#0c831f]" ? "bg-[#e8f5e9]" : typeInfo.color === "text-[#2563eb]" ? "bg-[#eff6ff]" : "bg-[#fffbeb]"}`}>
                        {typeInfo.icon}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-black text-[#1a1a1a]">{campaign.name}</h3>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${status.className}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${campaign.status === "active" ? "bg-[#0c831f] animate-pulse" : "bg-[#2563eb]"}`} />
                            {status.label}
                          </span>
                        </div>
                        <p className="mt-1 flex items-center gap-2 text-xs text-[#666]">
                          <CalendarDays className="h-3 w-3" />
                          {startDate.toLocaleDateString("en-IN", { dateStyle: "long" })}
                          {!isPast && (
                            <>
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-bold text-[#2563eb]">
                                starts in {daysUntil} day{daysUntil !== 1 ? "s" : ""}
                              </span>
                            </>
                          )}
                          {isPast && (
                            <>
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-bold text-[#0c831f]">Running</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto">
                      <button className="flex items-center gap-1.5 rounded-lg border border-[#0c831f] bg-[#e8f5e9] px-3 py-1.5 text-xs font-semibold text-[#0c831f] hover:bg-[#d4edd8]">
                        <Play className="h-3 w-3" /> Activate Now
                      </button>
                      <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                        <CalendarDays className="h-3 w-3" />
                        Edit Schedule
                      </button>
                      <Link href={`/admin/promotions/campaigns/${campaign.id}`}>
                        <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                          View Details <ArrowRight className="h-3 w-3" />
                        </button>
                      </Link>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#fef2f2] hover:text-[#b91c1c]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4 sm:ml-10 text-xs font-bold text-[#666]">
                    <span>
                      Discount: <span className="text-[#ff4f8b]">{campaign.discount}</span>
                    </span>
                    <span>
                      Budget: <span className="text-[#1a1a1a]">{campaign.budget}</span>
                    </span>
                    <span>
                      Products: <span className="text-[#1a1a1a]">{campaign.targetProducts}</span>
                    </span>
                    <span>
                      Type: <span className={typeInfo.color}>{campaign.type}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
