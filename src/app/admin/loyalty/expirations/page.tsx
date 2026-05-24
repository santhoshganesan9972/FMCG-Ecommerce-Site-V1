"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { ChevronLeft, Clock, AlertTriangle, Bell, Users, Gift, Calendar, Download, Send } from "lucide-react";

const expiringPoints = [
  { id: 1, user: "Rajesh Kumar", points: 250, expiryDate: "2026-05-28", daysLeft: 7, tier: "Gold", notifyStatus: "sent" },
  { id: 2, user: "Priya Sharma", points: 500, expiryDate: "2026-06-01", daysLeft: 11, tier: "Silver", notifyStatus: "pending" },
  { id: 3, user: "Amit Patel", points: 120, expiryDate: "2026-06-05", daysLeft: 15, tier: "Platinum", notifyStatus: "pending" },
  { id: 4, user: "Sneha Singh", points: 750, expiryDate: "2026-06-10", daysLeft: 20, tier: "Gold", notifyStatus: "sent" },
  { id: 5, user: "Vikram Mehta", points: 180, expiryDate: "2026-06-15", daysLeft: 25, tier: "Bronze", notifyStatus: "none" },
  { id: 6, user: "Ananya Gupta", points: 300, expiryDate: "2026-06-18", daysLeft: 28, tier: "Silver", notifyStatus: "none" },
];

export default function ExpirationsPage() {
  const [dateRange, setDateRange] = useState("30");
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/loyalty" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]"><ChevronLeft className="h-4 w-4 text-[#666]" /></Link>
          <div className="flex-1"><p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Loyalty Management</p><h1 className="text-xl font-black text-[#1a1a1a]">Point Expirations</h1></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Bell className="h-4 w-4" /> Notify All</button>
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Download className="h-4 w-4" /> Export</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[{ label: "Expiring This Month", value: "12,450 pts", icon: Clock, color: "text-[#d97706]" }, { label: "Users Affected", value: "1,245", icon: Users, color: "text-[#2563eb]" }, { label: "Avg. Points/User", value: "85 pts", icon: Gift, color: "text-[#0c831f]" }, { label: "Notified Today", value: "342", icon: Bell, color: "text-[#ff4f8b]" }].map(s => (
            <div key={s.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2"><s.icon className={`h-4 w-4 ${s.color}`} /><span className="text-[10px] font-bold text-[#666]">{s.label}</span></div>
              <p className={`mt-1 text-xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-[#999]" />
            <span className="text-xs font-bold text-[#666]">Expiring Within:</span>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none">
              <option value="7">7 Days</option><option value="15">15 Days</option><option value="30">30 Days</option><option value="60">60 Days</option><option value="90">90 Days</option>
            </select>
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">User</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Points</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Expiry Date</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Days Left</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Tier</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Notify Status</th>
                <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#666]">Actions</th>
              </tr></thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {expiringPoints.map(ep => (
                  <tr key={ep.id} className="hover:bg-[#fafafa]">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fffbeb] text-[10px] font-bold text-[#d97706]">{ep.user.charAt(0)}</div><span className="text-sm font-bold text-[#1a1a1a]">{ep.user}</span></div></td>
                    <td className="px-4 py-3 text-sm font-black text-[#d97706]">{ep.points}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{ep.expiryDate}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${ep.daysLeft <= 7 ? "bg-[#fef2f2] text-[#b91c1c]" : ep.daysLeft <= 14 ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#e8f5e9] text-[#0c831f]"}`}>{ep.daysLeft <= 7 && <AlertTriangle className="h-3 w-3" />}{ep.daysLeft} days</span></td>
                    <td className="px-4 py-3 text-sm text-[#666]">{ep.tier}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${ep.notifyStatus === "sent" ? "bg-[#e8f5e9] text-[#0c831f]" : ep.notifyStatus === "pending" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#f3f4f6] text-[#666]"}`}>{ep.notifyStatus === "sent" ? <Bell className="h-3 w-3" /> : ep.notifyStatus === "pending" ? <Clock className="h-3 w-3" /> : null}{ep.notifyStatus === "sent" ? "Sent" : ep.notifyStatus === "pending" ? "Pending" : "None"}</span></td>
                    <td className="px-4 py-3 text-right"><button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#0c831f] hover:bg-[#e8f5e9]"><Send className="h-3 w-3" /> Notify</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
