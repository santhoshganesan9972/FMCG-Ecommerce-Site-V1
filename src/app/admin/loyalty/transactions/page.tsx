"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { ChevronLeft, Search, ArrowUpRight, ArrowDownRight, Clock, FileSpreadsheet, Printer } from "lucide-react";

const transactions = [
  { id: 1, user: "Rajesh Kumar", type: "earned", points: 150, reason: "Order #ORD-8921", date: "2026-05-21", time: "09:15 AM" },
  { id: 2, user: "Priya Sharma", type: "redeemed", points: 200, reason: "₹200 off on order", date: "2026-05-21", time: "08:45 AM" },
  { id: 3, user: "Amit Patel", type: "earned", points: 85, reason: "Order #ORD-8919", date: "2026-05-21", time: "08:22 AM" },
  { id: 4, user: "Sneha Singh", type: "expired", points: 500, reason: "Points expired after 365 days", date: "2026-05-20", time: "11:30 PM" },
  { id: 5, user: "Vikram Mehta", type: "adjusted", points: -50, reason: "Manual adjustment - return", date: "2026-05-20", time: "10:15 PM" },
  { id: 6, user: "Ananya Gupta", type: "earned", points: 350, reason: "Referral reward", date: "2026-05-20", time: "09:00 PM" },
  { id: 7, user: "Rahul Verma", type: "redeemed", points: 100, reason: "₹100 off on order", date: "2026-05-20", time: "08:30 PM" },
  { id: 8, user: "Neha Kapoor", type: "earned", points: 200, reason: "Order #ORD-8910", date: "2026-05-20", time: "07:45 PM" },
  { id: 9, user: "Suresh Rao", type: "earned", points: 75, reason: "Product review bonus", date: "2026-05-20", time: "06:00 PM" },
  { id: 10, user: "Deepika Patel", type: "redeemed", points: 250, reason: "₹250 off on order", date: "2026-05-20", time: "05:15 PM" },
  { id: 11, user: "Arun Singh", type: "expired", points: 150, reason: "Points expired after 365 days", date: "2026-05-20", time: "04:00 PM" },
  { id: 12, user: "Meera Joshi", type: "earned", points: 500, reason: "Birthday bonus", date: "2026-05-20", time: "12:00 PM" },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const filtered = transactions.filter(t => (t.user.toLowerCase().includes(search.toLowerCase()) || t.reason.toLowerCase().includes(search.toLowerCase())) && (typeFilter === "all" || t.type === typeFilter));

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/loyalty" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div className="flex-1"><p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Loyalty Management</p><h1 className="text-xl font-black text-[#1a1a1a]">Point Transactions</h1></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><FileSpreadsheet className="h-4 w-4 text-[#0c831f]" /> Export CSV</button>
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Printer className="h-4 w-4 text-[#ff4f8b]" /> Print</button>
          </div>
        </div>
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input type="text" placeholder="Search by user or reason..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none" />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#0c831f] focus:outline-none">
              <option value="all">All Types</option><option value="earned">Earned</option><option value="redeemed">Redeemed</option><option value="expired">Expired</option><option value="adjusted">Adjusted</option>
            </select>
            <span className="flex items-center text-xs text-[#666]">{filtered.length} results</span>
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">User</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Type</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Points</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Reason</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Date</th>
                <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">Time</th>
              </tr></thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filtered.map(t => (
                  <tr key={t.id} className="hover:bg-[#fafafa]">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f5e9] text-[10px] font-bold text-[#0c831f]">{t.user.charAt(0)}</div><span className="text-sm font-bold text-[#1a1a1a]">{t.user}</span></div></td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${t.type === "earned" ? "bg-[#e8f5e9] text-[#0c831f]" : t.type === "redeemed" ? "bg-[#fff0f6] text-[#ff4f8b]" : t.type === "expired" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#f3e8ff] text-[#9333ea]"}`}>
                      {t.type === "earned" ? <ArrowUpRight className="h-3 w-3" /> : t.type === "redeemed" ? <ArrowDownRight className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span></td>
                    <td className={`px-4 py-3 text-sm font-black ${t.type === "earned" ? "text-[#0c831f]" : t.type === "redeemed" || t.type === "adjusted" ? "text-[#ff4f8b]" : "text-[#d97706]"}`}>{t.type === "earned" ? "+" : ""}{t.points}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{t.reason}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{t.date}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{t.time}</td>
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
