"use client";

import DashboardLayout from "../../dashboard-layout";
import { useState } from "react";
import {
  RotateCcw,
  X,
  Send,
  Search,
  Filter,
  AlertTriangle,
  Mail,
  MessageSquare,
  Phone,
  Bell,
  Zap,
  Check,
  Clock,
} from "lucide-react";

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

const failedSends = [
  { id: "SN-1001", title: "Stock Restock Alert", channel: "SMS", failedAt: "May 22, 07:12 AM", recipients: "4,200", reason: "Invalid phone number prefix", retryCount: 2 },
  { id: "SN-1002", title: "Payment Success Receipt", channel: "Email", failedAt: "May 22, 06:55 AM", recipients: "890", reason: "Recipient mailbox full (5xx SMTP)", retryCount: 3 },
  { id: "SN-0998", title: "Flash Sale Alert", channel: "Push notification", failedAt: "May 21, 10:02 PM", recipients: "18,400", reason: "FCM quota exceeded", retryCount: 1 },
  { id: "SN-0995", title: "Order Dispatched", channel: "WhatsApp", failedAt: "May 21, 03:45 PM", recipients: "1,250", reason: "Opt-out / unsubscribed user", retryCount: 1 },
  { id: "SN-0991", title: "Weekly Newsletter", channel: "Email", failedAt: "May 20, 08:00 AM", recipients: "6,810", reason: "SPF / DKIM failed (domain misconfigured)", retryCount: 3 },
  { id: "SN-0987", title: "Cashback Credited", channel: "SMS", failedAt: "May 19, 05:30 PM", recipients: "340", reason: "Carrier route unavailable (timeout)", retryCount: 2 },
];

const reasons = [
  "All Failures", "Invalid Recipient", "Mailbox Full (5xx)", "Quota Exceeded", "Opt-out / Unsubscribed", "SPF / DKIM Failed", "Timeout / Carrier Unavailable",
];

export default function RetryPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [filterChannel, setFilterChannel] = useState("All");
  const [filterReason, setFilterReason] = useState("All Failures");
  const [search, setSearch] = useState("");

  const failedCount = failedSends.length;

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectAll = () => {
    setSelected(failedSends.map((f) => f.id));
  };

  const filtered = failedSends.filter((f) => {
    const matchChan = filterChannel === "All" || f.channel === filterChannel;
    const matchSearch = f.title.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase());
    const matchReason = filterReason === "All Failures" || f.reason.includes(filterReason.split(" ")[0].toLowerCase())
      || (filterReason === "Mailbox Full (5xx)" && f.reason.includes("mailbox"));
    return matchChan && matchSearch && matchReason;
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
              <h1 className="text-2xl font-black text-[#1a1a1a]">Retry Failed Notifications</h1>
              <p className="text-sm text-[#666]">
                Failed deliveries are listed below. Select one or more and retry, or cancel permanently.
              </p>
            </div>
            {selected.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelected([])}
                  className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] transition hover:border-[#dc2626] hover:text-[#dc2626]"
                >
                  <X className="h-4 w-4" />
                  Cancel Selection
                </button>
                <button className="flex items-center gap-1.5 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#081f14]">
                  <RotateCcw className="h-4 w-4" />
                  Retry ({selected.length})
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Stats Strip */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Failed Sends", value: failedCount, icon: AlertTriangle, color: "text-[#dc2626]", bg: "bg-[#fee2e2]" },
            { label: "Awaiting Retry", value: 4, icon: Clock, color: "text-[#d97706]", bg: "bg-[#fef3c7]" },
            { label: "Permanent Fail", value: 2, icon: X, color: "text-[#666]", bg: "bg-[#f6f7f6]" },
            { label: "Retried Today", value: 12, icon: RotateCcw, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#999]">{s.label}</p>
                <p className="text-2xl font-black text-[#1a1a1a]">{s.value}</p>
              </div>
              {s.label === "Failed Sends" && (
                <button
                  onClick={selectAll}
                  className="ml-auto text-xs font-bold text-[#ff4f8b] hover:underline"
                >
                  Select All
                </button>
              )}
            </div>
          ))}
        </div>

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
              {["All", ...Object.keys(channelIcons)].map((c) => (<option key={c}>{c}</option>))}
            </select>
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] px-3 py-1.5 text-xs font-bold text-[#666] outline-none focus:border-[#ff4f8b]"
            >
              {reasons.map((r) => (<option key={r}>{r}</option>))}
            </select>
            <div className="relative ml-auto">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search failed sends…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selected.length === failedSends.length}
                      onChange={selectAll}
                      className="h-4 w-4 rounded border-[#ccc] accent-[#ff4f8b]"
                    />
                  </th>
                  {["ID", "Title", "Channel", "Failed At", "Recipients", "Fail Reason", "Retries", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-black uppercase tracking-wide text-[#999]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const Icon = channelIcons[row.channel];
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-[#e8e8e8] hover:bg-[#fef9f9] transition-colors ${selected.includes(row.id) ? "bg-[#fff5f5]" : ""}`}
                    >
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selected.includes(row.id)}
                          onChange={() => toggleSelect(row.id)}
                          className="h-4 w-4 rounded border-[#ccc] accent-[#ff4f8b]"
                        />
                      </td>
                      <td className="px-6 py-3.5 font-bold text-xs text-[#dc2626]">{row.id}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#1a1a1a]">{row.title}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f8f9fa] border border-[#e8e8e8] px-2.5 py-1 text-xs font-semibold text-[#666]">
                          <Icon className={`h-3.5 w-3.5 ${channelColors[row.channel]}`} />
                          {row.channel}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-[#666]">{row.failedAt}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#1a1a1a]">{row.recipients}</td>
                      <td className="px-6 py-3.5 text-xs text-[#dc2626] font-semibold">{row.reason}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-black text-[#d97706] bg-[#fef3c7]">
                          {row.retryCount}/3
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="flex items-center gap-1 rounded-lg bg-[#0c831f] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#081f14]">
                            <RotateCcw className="h-3.5 w-3.5" />
                            Retry
                          </button>
                          <button className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] transition hover:border-[#dc2626] hover:text-[#dc2626]">
                            Cancel
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
