"use client";

import DashboardLayout from "../../dashboard-layout";
import {
  Send,
  Plus,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  Bell,
  Zap,
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

const sendLog = [
  { id: "SN-1047", title: "Flash Sale Reminder", channel: "Email", sentAt: "Today, 09:14 AM", recipients: "12,450", status: "Delivered", statusColor: "text-[#0c831f] bg-[#e8f5e9]" },
  { id: "SN-1046", title: "Order Delivered", channel: "SMS", sentAt: "Today, 08:30 AM", recipients: "8,920", status: "Delivered", statusColor: "text-[#0c831f] bg-[#e8f5e9]" },
  { id: "SN-1045", title: "New Arrival Alert", channel: "Push notification", sentAt: "Today, 07:45 AM", recipients: "24,100", status: "Delivered", statusColor: "text-[#0c831f] bg-[#e8f5e9]" },
  { id: "SN-1044", title: "Cart Abandoned", channel: "WhatsApp", sentAt: "Yesterday, 06:20 PM", recipients: "3,210", status: "Pending", statusColor: "text-[#d97706] bg-[#fef3c7]" },
  { id: "SN-1043", title: "Weekly Offers", channel: "In-app notification", sentAt: "Yesterday, 04:00 PM", recipients: "31,000", status: "Sent", statusColor: "text-[#2563eb] bg-[#eff6ff]" },
  { id: "SN-1042", title: "Password Reset", channel: "Email", sentAt: "Yesterday, 01:15 PM", recipients: "215", status: "Bounced", statusColor: "text-[#dc2626] bg-[#fee2e2]" },
];

export default function SendNotificationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Notification Center
            </p>
            <h1 className="text-2xl font-black text-[#1a1a1a]">Send Notification</h1>
            <p className="text-sm text-[#666]">
              Dispatch campaigns across Email, SMS, WhatsApp, Push, or In-app channels to targeted user segments.
            </p>
          </div>
        </section>

        {/* Compose Card */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm space-y-5">
          <h2 className="text-base font-black text-[#1a1a1a]">Compose Notification</h2>

          {/* Channel Selection */}
          <div>
            <p className="mb-2.5 text-sm font-bold text-[#1a1a1a]">Channel</p>
            <div className="flex flex-wrap gap-3">
              {(["Email", "SMS", "WhatsApp", "Push notification", "In-app notification"] as const).map((ch) => {
                const Icon = channelIcons[ch];
                return (
                  <button
                    key={ch}
                    className="flex items-center gap-2 rounded-xl border-2 border-[#e8e8e8] px-4 py-2.5 text-sm font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]"
                  >
                    <Icon className={`h-4 w-4 ${channelColors[ch]}`} />
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <p className="mb-2.5 text-sm font-bold text-[#1a1a1a]">Recipients</p>
            <div className="flex flex-wrap gap-2">
              {["All Users", "Active Users", "Premium Users", "Inactive Users", "Custom Segment"].map((seg, idx) => (
                <button
                  key={seg}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition ${
                    idx === 0
                      ? "bg-[#ff4f8b] text-white"
                      : "bg-[#f6f7f6] text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b]"
                  }`}
                >
                  {idx === 0 && <Send className="h-3.5 w-3.5" />}
                  {seg}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <p className="mb-2 text-sm font-bold text-[#1a1a1a]">Subject / Title</p>
            <input
              type="text"
              placeholder="Enter subject or title…"
              className="w-full rounded-xl border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#999] focus:border-[#ff4f8b]"
            />
          </div>

          {/* Message Body */}
          <div>
            <p className="mb-2 text-sm font-bold text-[#1a1a1a]">Message</p>
            <textarea
              rows={5}
              placeholder="Write your message…"
              className="w-full resize-none rounded-xl border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#999] focus:border-[#ff4f8b]"
            />
          </div>

          {/* Template Selector */}
          <div>
            <p className="mb-2 text-sm font-bold text-[#1a1a1a]">
              Use Template <span className="text-[#999] font-normal">(optional)</span>
            </p>
            <button className="flex w-full items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-3 text-sm text-[#999] hover:border-[#ff4f8b]">
              <span>Browse templates…</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="flex items-center gap-2 rounded-xl bg-[#ff4f8b] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#e63872]">
              <Send className="h-4 w-4" />
              Send Now
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-6 py-2.5 text-sm font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
              <Bell className="h-4 w-4" />
              Schedule
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-6 py-2.5 text-sm font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">
              <Plus className="h-4 w-4" />
              Save as Template
            </button>
          </div>
        </div>

        {/* Send Log */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#e8e8e8] px-6 py-4">
            <h2 className="text-base font-black text-[#1a1a1a]">Recent Sends</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f8f9fa]">
                  {["ID", "Title", "Channel", "Sent At", "Recipients", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-black uppercase tracking-wide text-[#999]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sendLog.map((row) => {
                  const Icon = channelIcons[row.channel];
                  return (
                    <tr key={row.id} className="border-b border-[#e8e8e8] last:border-b-0 hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-6 py-3.5 font-bold text-xs text-[#ff4f8b]">{row.id}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#1a1a1a]">{row.title}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f8f9fa] border border-[#e8e8e8] px-2.5 py-1 text-xs font-semibold text-[#666]">
                          <Icon className={`h-3.5 w-3.5 ${channelColors[row.channel]}`} />
                          {row.channel}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-[#666]">{row.sentAt}</td>
                      <td className="px-6 py-3.5 text-[#1a1a1a] font-semibold">{row.recipients}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${row.statusColor}`}>
                          {row.status}
                        </span>
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
