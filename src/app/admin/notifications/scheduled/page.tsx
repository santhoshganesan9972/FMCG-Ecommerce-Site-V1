"use client";

import DashboardLayout from "../../dashboard-layout";
import { useState } from "react";
import { Plus, Search, Edit, Send, X, Play, Pause, Mail, MessageSquare, Phone, Bell, Zap, ChevronDown, Filter } from "lucide-react";

const channelIcons: Record<string, typeof Mail> = {
  Email: Mail,
  SMS: MessageSquare,
  WhatsApp: Phone,
  "Push notification": Bell,
  "In-app notification": Zap,
};

const channelColors: Record<string, string> = {
  Email: "text-[#2563eb]",
  SMS: "text-[#0c831f]",
  WhatsApp: "text-[#25d366]",
  "Push notification": "text-[#ff4f8b]",
  "In-app notification": "text-[#d97706]",
};

const campaigns = [
  { id: "SC-01", title: "Weekend Mega Sale", channel: "Email", scheduledAt: "May 23, 08:00 AM", recipients: "32,000", status: "Active", statusColor: "text-[#0c831f] bg-[#e8f5e9]" },
  { id: "SC-02", title: "Cart Recovery Push", channel: "Push notification", scheduledAt: "May 23, 06:00 PM", recipients: "5,210", status: "Active", statusColor: "text-[#0c831f] bg-[#e8f5e9]" },
  { id: "SC-03", title: "Diwali Wishes", channel: "WhatsApp", scheduledAt: "May 25, 12:00 AM", recipients: "48,000", status: "Pending", statusColor: "text-[#d97706] bg-[#fef3c7]" },
  { id: "SC-04", title: "Member Anniversary", channel: "SMS", scheduledAt: "May 26, 09:00 AM", recipients: "7,540", status: "Pending", statusColor: "text-[#d97706] bg-[#fef3c7]" },
  { id: "SC-05", title: "Fresh Arrival Alert", channel: "Email", scheduledAt: "May 27, 07:00 AM", recipients: "22,100", status: "Pending", statusColor: "text-[#d97706] bg-[#fef3c7]" },
  { id: "SC-06", title: "Daily Combo Offers", channel: "In-app notification", scheduledAt: "May 22, 10:00 PM", recipients: "31,000", status: "Expired", statusColor: "text-[#666] bg-[#f6f7f6]" },
];

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}

export default function ScheduledPage() {
  const [filterChannel, setFilterChannel] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const channels = ["All", "Email", "SMS", "WhatsApp", "Push notification", "In-app notification"];
  const statusOptions = ["All", "Active", "Pending", "Expired"];

  const filtered = campaigns.filter((c) => {
    const chan = filterChannel === "All" || c.channel === filterChannel;
    const stat = filterStatus === "All" || c.status === filterStatus;
    return chan && stat;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Notification Center
              </p>
              <h1 className="text-2xl font-black text-[#1a1a1a]">Scheduled Campaigns</h1>
              <p className="text-sm text-[#666]">
                View and manage upcoming scheduled notifications. Pause, edit, reschedule, or fire early.
              </p>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl bg-[#ff4f8b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e63872]">
              <Plus className="h-4 w-4" />
              Schedule Campaign
            </button>
          </div>
        </section>

        {/* Filters */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#666]">
              <Filter className="h-3.5 w-3.5" />
              Filter:
            </div>
            <select
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] px-3 py-1.5 text-xs font-bold text-[#666] outline-none focus:border-[#ff4f8b]"
            >
              {channels.map((ch) => (<option key={ch}>{ch}</option>))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] px-3 py-1.5 text-xs font-bold text-[#666] outline-none focus:border-[#ff4f8b]"
            >
              {statusOptions.map((s) => (<option key={s}>{s}</option>))}
            </select>
            <div className="relative ml-auto">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search campaigns…"
                className="rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] pl-8 pr-3 py-1.5 text-xs outline-none placeholder:text-[#999] focus:border-[#ff4f8b]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f8f9fa]">
                  {["ID", "Campaign", "Channel", "Scheduled At", "Recipients", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-black uppercase tracking-wide text-[#999]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const Icon = channelIcons[row.channel];
                  return (
                    <tr key={row.id} className="border-b border-[#e8e8e8] hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-6 py-3.5 font-bold text-xs text-[#ff4f8b]">{row.id}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#1a1a1a]">{row.title}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f8f9fa] border border-[#e8e8e8] px-2.5 py-1 text-xs font-semibold text-[#666]">
                          <Icon className={`h-3.5 w-3.5 ${channelColors[row.channel]}`} />
                          {row.channel}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-[#666]">{row.scheduledAt}</td>
                      <td className="px-6 py-3.5 text-[#1a1a1a] font-semibold">{row.recipients}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${row.statusColor}`}>{row.status}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="rounded-lg p-1.5 text-[#999] transition hover:bg-[#eef2ff] hover:text-[#2563eb]" title="Edit">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          {row.status === "Active" ? (
                            <button className="rounded-lg p-1.5 text-[#999] transition hover:bg-[#f6f7f6] hover:text-[#666]" title="Pause">
                              <PauseIcon className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <button className="rounded-lg p-1.5 text-[#999] transition hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Resume">
                              <PlayIcon className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button className="rounded-lg p-1.5 text-[#999] transition hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Send Now">
                            <Send className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded-lg p-1.5 text-[#999] transition hover:bg-[#fef2f2] hover:text-[#dc2626]" title="Cancel">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
