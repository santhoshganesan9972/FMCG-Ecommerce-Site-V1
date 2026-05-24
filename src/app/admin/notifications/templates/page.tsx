"use client";

import DashboardLayout from "../../dashboard-layout";
import { useState } from "react";
import { Plus, Search, Edit, Copy, Trash2, MoreHorizontal, Mail, MessageSquare, Phone, Bell, Zap, Filter } from "lucide-react";

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

const templates = [
  { id: "T-01", name: "Flash Sale Notification", channel: "Email", subject: "Flash Sale — 50% Off Starts Now!", usage: 48, lastUsed: "Today" },
  { id: "T-02", name: "Order Confirmed", channel: "SMS", subject: "Your order #{orderId} has been confirmed.", usage: 120, lastUsed: "Today" },
  { id: "T-03", name: "Delivery OTP", channel: "WhatsApp", subject: "Your OTP is {otp}. Valid for 10 min.", usage: 310, lastUsed: "Today" },
  { id: "T-04", name: "Password Reset", channel: "Email", subject: "Reset your FMCG Commerce password", usage: 24, lastUsed: "Yesterday" },
  { id: "T-05", name: "Win-Back Offer", channel: "Push notification", subject: "We miss you! 20% off your next order", usage: 15, lastUsed: "2 days ago" },
  { id: "T-06", name: "Cart Abandoned", channel: "In-app notification", subject: "You left items in your cart 🛒", usage: 87, lastUsed: "Today" },
  { id: "T-07", name: "Welcome Gift", channel: "Email", subject: "Welcome to FMCG Commerce! Enjoy 10% off", usage: 56, lastUsed: "1 day ago" },
  { id: "T-08", name: "Delivery Status Update", channel: "SMS", subject: "Your order is out for delivery! Track: {trackUrl}", usage: 210, lastUsed: "Today" },
];

export default function TemplatesPage() {
  const [filterChannel, setFilterChannel] = useState("All");
  const channels = ["All", ...Object.keys(channelIcons)];

  const filtered = templates.filter((t) => filterChannel === "All" || t.channel === filterChannel);

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
              <h1 className="text-2xl font-black text-[#1a1a1a]">Templates</h1>
              <p className="text-sm text-[#666]">
                Create, edit, and manage reusable notification templates across all communication channels.
              </p>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl bg-[#ff4f8b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e63872]">
              <Plus className="h-4 w-4" />
              New Template
            </button>
          </div>
        </section>

        {/* Channel Filter */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#666]">
              <Filter className="h-3.5 w-3.5" />
              Channel:
            </div>
            <div className="flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button
                  key={ch}
                  onClick={() => setFilterChannel(ch)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    filterChannel === ch ? "bg-[#ff4f8b] text-white" : "bg-[#f6f7f6] text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b]"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
            <div className="relative ml-auto">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search templates…"
                className="rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] pl-8 pr-3 py-1.5 text-xs outline-none placeholder:text-[#999] focus:border-[#ff4f8b]"
              />
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tpl) => {
            const Icon = channelIcons[tpl.channel];
            return (
              <div
                key={tpl.id}
                className="group rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm transition hover:border-[#ff4f8b] hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f8f9fa] border border-[#e8e8e8] px-2 py-1 text-xs font-semibold text-[#666]">
                      <Icon className={`h-3.5 w-3.5 ${channelColors[tpl.channel]}`} />
                      {tpl.channel}
                    </span>
                    <span className="text-[10px] font-bold text-[#999]">{tpl.id}</span>
                  </div>
                  <button className="rounded-lg p-1.5 text-[#999] opacity-0 transition hover:bg-[#f8f9fa] group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="mb-1 text-sm font-black text-[#1a1a1a]">{tpl.name}</h3>
                <p className="mb-4 text-xs text-[#999] italic truncate">"{tpl.subject}"</p>

                <div className="flex items-center justify-between border-t border-[#e8e8e8] pt-3">
                  <div className="text-[10px] text-[#666]">
                    Used <span className="font-bold text-[#1a1a1a]">{tpl.usage}</span>× · {tpl.lastUsed}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-2 py-1 text-[10px] font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
                      <Edit className="h-3 w-3" />
                      Edit
                    </button>
                    <button className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-2 py-1 text-[10px] font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
                      <Copy className="h-3 w-3" />
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
