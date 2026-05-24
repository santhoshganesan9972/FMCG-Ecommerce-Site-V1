"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockAbandonedCarts } from "@/data/admin/misc";
import { Search, ShoppingCart, Send, Mail, MessageSquare, BarChart3, RefreshCw, Filter } from "lucide-react";
import { toast } from "sonner";

export default function AbandonedCartsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockAbandonedCarts.filter((c) =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Abandoned", value: mockAbandonedCarts.length.toString(), change: "+3 today" },
    { label: "Recovered", value: mockAbandonedCarts.filter((c) => c.status === "recovered").length.toString(), change: "16.7% rate" },
    { label: "Lost", value: mockAbandonedCarts.filter((c) => c.status === "lost").length.toString(), change: "16.7% rate" },
    { label: "Potential Revenue", value: `₹${mockAbandonedCarts.reduce((s, c) => s + c.total, 0).toLocaleString()}`, change: "Recoverable" },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-[#eff7ff] text-[#0369a1]",
    reminded: "bg-[#fffbeb] text-[#d97706]",
    recovered: "bg-[#e8f5e9] text-[#0c831f]",
    lost: "bg-[#fef2f2] text-red-500",
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Abandoned Cart Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Abandoned Carts</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Track abandoned carts, send recovery reminders via email/SMS/WhatsApp, and recover lost revenue.</p>
            </div>
            <button onClick={() => toast.success("Recovery campaign started for all active carts")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Send className="w-4 h-4" />Send Bulk Reminder</button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-[#666]">{s.label}</p>
              <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-[#0c831f]">{s.change}</p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8e8e8] p-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input type="text" placeholder="Search carts..." className="w-full rounded-xl border border-[#e8e8e8] py-2 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa]"><Filter className="w-4 h-4" />Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["Cart ID", "Customer", "Items", "Total", "Abandoned", "Status", "Attempts", "Source", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((cart) => (
                  <tr key={cart.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1a1a1a]">{cart.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1a1a1a]">{cart.customerName}</p>
                      <p className="text-xs text-[#999]">{cart.email}</p>
                    </td>
                    <td className="px-4 py-3">{cart.items}</td>
                    <td className="px-4 py-3 font-semibold text-[#0c831f]">₹{cart.total.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{cart.abandonedAt}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[cart.status] || "bg-[#f6f7f6] text-[#666]"}`}>{cart.status}</span>
                    </td>
                    <td className="px-4 py-3">{cart.recoveryAttempts}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{cart.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toast.success(`Reminder sent to ${cart.customerName}`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f]" title="Send Email"><Mail className="w-4 h-4" /></button>
                        <button onClick={() => toast.success(`SMS sent to ${cart.phone}`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f]" title="Send SMS"><MessageSquare className="w-4 h-4" /></button>
                        <button onClick={() => toast.success(`WhatsApp message sent to ${cart.customerName}`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f]" title="Send WhatsApp"><RefreshCw className="w-4 h-4" /></button>
                      </div>
                    </td>
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
