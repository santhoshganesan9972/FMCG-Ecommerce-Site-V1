"use client";

import DashboardLayout from "../../dashboard-layout";
import {
  Settings,
  Check,
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Bell,
  AlertTriangle,
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

const channels = [
  { name: "Email", icon: Mail, color: "text-[#2563eb]", bg: "bg-[#eff6ff]", badge: "Healthy", badgeColor: "text-[#0c831f] bg-[#e8f5e9]", detail: "SendGrid · API Key sg_***4d1f · avg latency 320ms · 3 retries" },
  { name: "SMS", icon: MessageSquare, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]", badge: "Healthy", badgeColor: "text-[#0c831f] bg-[#e8f5e9]", detail: "Twilio · SID AC***b29e · avg latency 580ms · 2 retries" },
  { name: "WhatsApp", icon: Phone, color: "text-[#25d366]", bg: "bg-[#e8f5e9]", badge: "Healthy", badgeColor: "text-[#0c831f] bg-[#e8f5e9]", detail: "Meta Cloud API · Token WA***88c1 · avg latency 1.2s · 2 retries" },
  { name: "Push notification", icon: Bell, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]", badge: "Healthy", badgeColor: "text-[#0c831f] bg-[#e8f5e9]", detail: "Firebase FCM · Key AI***f47d · avg latency 180ms · 0 retries" },
  { name: "In-app notification", icon: Zap, color: "text-[#d97706]", bg: "bg-[#fef9e7]", badge: "Healthy", badgeColor: "text-[#0c831f] bg-[#e8f5e9]", detail: "Internal WebSocket Cluster · node-01 · avg latency 12ms · 1 retry" },
];

export default function ChannelsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Notification Center
            </p>
            <h1 className="text-2xl font-black text-[#1a1a1a]">Channel Configuration</h1>
            <p className="text-sm text-[#666]">
              Enable, mute, refresh credentials, and monitor delivery health across all 5 notification channels.
            </p>
          </div>
        </section>

        {/* Channel Cards */}
        <div className="grid gap-5 xl:grid-cols-2">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.name}
                className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm transition hover:border-[#ff4f8b] hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8e8e8] ${ch.bg}`}>
                      <Icon className={`h-5 w-5 ${ch.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#1a1a1a]">{ch.name}</h3>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black ${ch.badgeColor}`}>
                        <Check className="mr-1 h-3 w-3" />{ch.badge}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] px-3 py-1.5 text-xs font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
                    <Settings className="h-3.5 w-3.5" />
                    Configure
                  </button>
                </div>

                {/* Detail row */}
                <div className="rounded-xl bg-[#f8f9fa] border border-[#e8e8e8] px-3 py-2.5 mb-3">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#999]">Connection Details</p>
                  <p className="mt-0.5 text-xs text-[#666] font-mono truncate">{ch.detail}</p>
                </div>

                {/* Toggle row */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[#1a1a1a]">Enabled</span>
                  <button className="relative h-6 w-11 rounded-full bg-[#0c831f] transition-colors">
                    <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Settings */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-black text-[#1a1a1a]">Global Notification Settings</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Default Retry Count", value: "3 retries", desc: "Max retry attempts on delivery failure" },
              { label: "Retry Delay (exponential)", value: "1m · 5m · 15m", desc: "Back-off schedule after each retry" },
              { label: "Default Sender Name", value: "FMCG Commerce", desc: "Displayed as sender in all outbound messages" },
              { label: "Unsubscribe Link", value: "Enabled", desc: "Append unsubscribe footer to promotional emails" },
              { label: "Rate Limit (per user)", value: "5 / hour", desc: "Max notifications a single user can receive" },
              { label: "Time Zone for Scheduling", value: "Asia / Kolkata (UTC+5:30)", desc: "Used for scheduling and timestamping" },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-3">
                <div>
                  <p className="text-xs font-bold text-[#1a1a1a]">{setting.label}</p>
                  <p className="text-[10px] text-[#999]">{setting.desc}</p>
                </div>
                <span className="text-xs font-black text-[#0c831f]">{setting.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
