"use client";

import DashboardLayout from "../dashboard-layout";
import { mockPurchaseOrders } from "@/data/admin/misc";
import { Plus, Search, FileText, CheckCircle, Clock, XCircle, Send, Eye } from "lucide-react";
import { toast } from "sonner";

export default function PurchaseOrdersPage() {
  const statusColors: Record<string, string> = {
    draft: "bg-[#f6f7f6] text-[#666]",
    pending_approval: "bg-[#fffbeb] text-[#d97706]",
    approved: "bg-[#eff7ff] text-[#0369a1]",
    sent: "bg-[#e8f5e9] text-[#0c831f]",
    partially_received: "bg-purple-100 text-purple-700",
    completed: "bg-[#e8f5e9] text-[#0c831f]",
    cancelled: "bg-[#fef2f2] text-red-500",
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Purchase Orders</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Purchase Order Management</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Create and manage purchase orders, approval workflows, and track supplier deliveries.</p>
            </div>
            <button onClick={() => toast.info("Opening create PO form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Create Purchase Order</button>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search by PO ID or supplier..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" />
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["PO ID", "Supplier", "Items", "Qty", "Total", "Status", "Expected", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockPurchaseOrders.map((po) => (
                  <tr key={po.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#1a1a1a]">{po.id}</td>
                    <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{po.supplier}</td>
                    <td className="px-4 py-3">{po.items}</td>
                    <td className="px-4 py-3">{po.totalQty}</td>
                    <td className="px-4 py-3 font-semibold">₹{po.totalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[po.status] || ""}`}>{po.status.replace(/_/g, " ")}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{po.expectedDelivery}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => toast.info("Viewing PO details")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Eye className="w-4 h-4" /></button>
                        {po.status === "pending_approval" && <button onClick={() => toast.success("PO approved")} className="rounded-lg p-1.5 text-[#0c831f] hover:bg-[#e8f5e9]"><CheckCircle className="w-4 h-4" /></button>}
                        {po.status === "approved" && <button onClick={() => toast.success("PO sent to supplier")} className="rounded-lg p-1.5 text-[#0c831f] hover:bg-[#e8f5e9]"><Send className="w-4 h-4" /></button>}
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
