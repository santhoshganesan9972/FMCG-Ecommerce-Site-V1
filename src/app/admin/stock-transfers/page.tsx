"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ArrowLeftRight, Plus, Search, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

const mockTransferRequests = [
  { id: "TR-001", from: "Mumbai Hub", to: "Pune Cold Storage", product: "Fresh Red Apples", qty: 50, status: "pending", requestedBy: "Store Manager", date: "2026-05-21", priority: "high" },
  { id: "TR-002", from: "Delhi Central Hub", to: "Bangalore Cold Room", product: "Full Cream Milk 1L", qty: 200, status: "approved", requestedBy: "Admin User", date: "2026-05-20", priority: "normal" },
  { id: "TR-003", from: "Hyderabad Depot", to: "Mumbai Hub", product: "Cold Brew Coffee", qty: 30, status: "in_transit", requestedBy: "Store Manager", date: "2026-05-19", priority: "normal" },
  { id: "TR-004", from: "Mumbai Hub", to: "Delhi Central Hub", product: "Organic Basmati Rice", qty: 100, status: "completed", requestedBy: "Admin User", date: "2026-05-18", priority: "low" },
  { id: "TR-005", from: "Pune Cold Storage", to: "Mumbai Hub", product: "Fresh Red Apples", qty: 25, status: "cancelled", requestedBy: "Store Manager", date: "2026-05-17", priority: "high" },
];

export default function StockTransfersPage() {
  const [tab, setTab] = useState<"requests" | "history">("requests");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Stock Transfers</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Inter-Warehouse Transfers</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Request and manage stock transfers between warehouses to balance inventory levels.</p>
            </div>
            <button onClick={() => toast.info("Opening transfer form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />New Transfer</button>
          </div>

          <div className="mt-5 flex gap-1.5 border-b border-[#e8e8e8] pb-2">
            {["requests", "history"].map((t) => (
              <button key={t} onClick={() => setTab(t as typeof tab)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === t ? "bg-[#0c831f] text-white" : "text-[#666] hover:bg-[#f6f7f6]"}`}>{t === "requests" ? "Transfer Requests" : "Transfer History"}</button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["ID", "From", "To", "Product", "Qty", "Priority", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockTransferRequests.map((t) => (
                  <tr key={t.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-mono text-xs font-bold">{t.id}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{t.from}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{t.to}</td>
                    <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{t.product}</td>
                    <td className="px-4 py-3">{t.qty}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.priority === "high" ? "bg-red-100 text-red-700" : t.priority === "normal" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{t.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.status === "completed" ? "bg-[#e8f5e9] text-[#0c831f]" : t.status === "approved" || t.status === "in_transit" ? "bg-[#eff7ff] text-[#0369a1]" : t.status === "cancelled" ? "bg-[#fef2f2] text-red-500" : "bg-[#fffbeb] text-[#d97706]"}`}>{t.status.replace(/_/g, " ")}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{t.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => toast.info("Viewing transfer details")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Eye className="w-4 h-4" /></button>
                        {t.status === "pending" && <button onClick={() => toast.success("Transfer approved")} className="rounded-lg p-1.5 text-[#0c831f] hover:bg-[#e8f5e9]"><CheckCircle className="w-4 h-4" /></button>}
                        {t.status === "pending" && <button onClick={() => toast.info("Transfer rejected")} className="rounded-lg p-1.5 text-red-500 hover:bg-[#fef2f2]"><XCircle className="w-4 h-4" /></button>}
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
