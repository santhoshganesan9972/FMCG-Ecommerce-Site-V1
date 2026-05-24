"use client";

import DashboardLayout from "../../dashboard-layout";
import { useState } from "react";
import { Mail, MessageSquare, Phone, Bell, Zap, Download, BarChart3 } from "lucide-react";

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

const channelBars: Record<string, string> = {
  Email: "bg-[#2563eb]",
  SMS: "bg-[#0c831f]",
  WhatsApp: "bg-[#25d366]",
  "Push notification": "bg-[#ff4f8b]",
  "In-app notification": "bg-[#d97706]",
};

const channelStats = [
  { channel: "Email", sent: 45210, delivered: 42100, opened: 29280, clicked: 11240, bounceRate: "6.8%", deliveredPct: 93.1 },
  { channel: "SMS", sent: 38100, delivered: 37640, opened: 33790, clicked: 10920, bounceRate: "1.2%", deliveredPct: 98.8 },
  { channel: "WhatsApp", sent: 12400, delivered: 11980, opened: 11020, clicked: 6780, bounceRate: "3.4%", deliveredPct: 96.6 },
  { channel: "Push notification", sent: 21600, delivered: 20944, opened: 16830, clicked: 11260, bounceRate: "3.0%", deliveredPct: 96.9 },
  { channel: "In-app notification", sent: 7520, delivered: 7512, opened: 7490, clicked: 6840, bounceRate: "0.1%", deliveredPct: 99.8 },
];

const topTemplates = [
  { rank: 1, name: "Delivery OTP", channel: "WhatsApp", sends: 310, openRate: "98%" },
  { rank: 2, name: "Order Confirmed", channel: "SMS", sends: 120, openRate: "94%" },
  { rank: 3, name: "Flash Sale Notification", channel: "Email", sends: 48, openRate: "72%" },
  { rank: 4, name: "Cart Abandoned", channel: "In-app", sends: 87, openRate: "61%" },
  { rank: 5, name: "Win-Back Offer", channel: "Push", sends: 15, openRate: "58%" },
];

const timeRanges = ["Today", "Last 7 Days", "Last 30 Days", "This Quarter"];

export default function AnalyticsPage() {
  const [range, setRange] = useState("Last 30 Days");

  const totalSent = channelStats.reduce((s, c) => s + c.sent, 0);
  const totalDelivered = channelStats.reduce((s, c) => s + c.delivered, 0);
  const avgOpenRate = (channelStats.reduce((s, c) => s + c.opened, 0) / totalDelivered * 100).toFixed(1);
  const avgClickRate = (channelStats.reduce((s, c) => s + c.clicked, 0) / totalDelivered * 100).toFixed(1);

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
              <h1 className="text-2xl font-black text-[#1a1a1a]">Analytics</h1>
              <p className="text-sm text-[#666]">
                Delivery rates, open rates, and top-performing templates across all channels.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] px-3 py-2 text-xs font-bold text-[#666] outline-none focus:border-[#ff4f8b]"
              >
                {timeRanges.map((r) => (<option key={r}>{r}</option>))}
              </select>
              <button className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-3 py-2 text-xs font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* Summary / KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Sent", value: totalSent.toLocaleString("en-US"), change: "+6.2%", up: true },
            { label: "Delivery Rate", value: ((totalDelivered / totalSent) * 100).toFixed(1) + "%", change: "+0.4%", up: true },
            { label: "Avg Open Rate", value: avgOpenRate + "%", change: "+2.1%", up: true },
            { label: "Avg Click Rate", value: avgClickRate + "%", change: "-0.8%", up: false },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#666]">{stat.label}</p>
              <p className="mt-2 text-3xl font-black text-[#1a1a1a]">{stat.value}</p>
              <p className={`mt-1 text-xs font-bold ${stat.up ? "text-[#0c831f]" : "text-[#dc2626]"}`}>
                {stat.change} vs prior period
              </p>
            </div>
          ))}
        </div>

        {/* Main Grid: Channel Breakdown + Top Templates */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Channel Delivery Breakdown */}
          <div className="lg:col-span-2 rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-black text-[#1a1a1a]">
              <BarChart3 className="inline mr-2 h-4 w-4 text-[#ff4f8b]" />
              Delivery & Engagement by Channel
            </h2>
            <div className="space-y-4">
              {channelStats.map((ch) => {
                const Icon = channelIcons[ch.channel];
                return (
                  <div key={ch.channel} className="rounded-xl bg-[#f8f9fa] p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${channelColors[ch.channel]}`} />
                        <span className="text-sm font-bold text-[#1a1a1a]">{ch.channel}</span>
                        <span className="text-[10px] font-bold text-[#999]">{ch.delivered.toLocaleString("en-US")} / {ch.sent.toLocaleString("en-US")}</span>
                      </div>
                      <span className="text-xs font-black text-[#1a1a1a]">{ch.deliveredPct}% delivered</span>
                    </div>

                    {/* Sent → Delivered → Opened → Clicked */}
                    <div className="mb-2 h-2.5 flex overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div className={`${channelBars[ch.channel]}`} style={{ width: `${(ch.delivered / ch.sent) * 100}%` }} />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="rounded-lg bg-white border border-[#e8e8e8] py-2">
                        <p className="text-[10px] font-black uppercase text-[#999]">Sent</p>
                        <p className="text-sm font-black text-[#1a1a1a]">{ch.sent.toLocaleString("en-US")}</p>
                      </div>
                      <div className="rounded-lg bg-white border border-[#e8e8e8] py-2">
                        <p className="text-[10px] font-black uppercase text-[#999]">Delivered</p>
                        <p className="text-sm font-black text-[#0c831f]">{ch.delivered.toLocaleString("en-US")}</p>
                      </div>
                      <div className="rounded-lg bg-white border border-[#e8e8e8] py-2">
                        <p className="text-[10px] font-black uppercase text-[#999]">Opened</p>
                        <p className="text-sm font-black text-[#2563eb]">{ch.opened.toLocaleString("en-US")}</p>
                      </div>
                      <div className="rounded-lg bg-white border border-[#e8e8e8] py-2">
                        <p className="text-[10px] font-black uppercase text-[#999]">Clicked</p>
                        <p className="text-sm font-black text-[#ff4f8b]">{ch.clicked.toLocaleString("en-US")}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Templates Sidebar */}
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-black text-[#1a1a1a]">Top Templates</h2>
            <div className="space-y-3">
              {topTemplates.map((tpl) => (
                <div key={tpl.name} className="flex items-center gap-3 rounded-lg bg-[#f8f9fa] p-3">
                  <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                    tpl.rank <= 2 ? "bg-[#ff4f8b] text-white" : "bg-[#e8e8e8] text-[#666]"
                  }`}>
                    {tpl.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#1a1a1a]">{tpl.name}</p>
                    <p className="text-[10px] text-[#999]">{tpl.channel} · {tpl.sends} sends</p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-black text-[#0c831f]">{tpl.openRate}</span>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded-xl border border-[#e8e8e8] py-2.5 text-xs font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
              View All Templates →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
