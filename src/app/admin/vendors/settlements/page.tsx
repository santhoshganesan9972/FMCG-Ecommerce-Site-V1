"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { DollarSign, Download, Send, Eye, IndianRupee, Calendar } from "lucide-react";
import { toast } from "sonner";

const settlements = [
  { id: "STL-001", vendor: "Fresh Farms Ltd.", period: "May 1-15, 2026", totalSales: 45800, commission: 6870, netPayable: 38930, status: "pending", dueDate: "2026-05-25" },
  { id: "STL-002", vendor: "Daily Dairy Co.", period: "May 1-15, 2026", totalSales: 76200, commission: 11430, netPayable: 64770, status: "processing", dueDate: "2026-05-26" },
  { id: "STL-003", vendor: "Spice World", period: "April 16-30, 2026", totalSales: 28400, commission: 4260, netPayable: 24140, status: "completed", dueDate: "2026-05-10", paidOn: "2026-05-12" },
  { id: "STL-004", vendor: "Organic Harvest", period: "May 1-15, 2026", totalSales: 12300, commission: 1845, netPayable: 10455, status: "pending", dueDate: "2026-05-28" },
  { id: "STL-005", vendor: "Baker's Delight", period: "April 16-30, 2026", totalSales: 18900, commission: 2835, netPayable: 16065, status: "completed", dueDate: "2026-05-10", paidOn: "2026-05-11" },
];

export default function VendorSettlementsPage() {
  const [search, setSearch] = useState("");
  const [showPayModal, setShowPayModal] = useState<{ id: string; vendor: string; amount: number } | null>(null);

  const filtered = settlements.filter(s => !search || s.vendor.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

  const handlePay = (id: string) => {
    toast.success(`Payment initiated for settlement ${id}`);
    setShowPayModal(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Vendors</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Settlements</h1>
              <p className="mt-2 text-sm text-[#666]">Process vendor payouts and view settlement history.</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search by vendor or settlement ID..." />

        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Settlement ID</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Total Sales</th>
                <th className="px-4 py-3">Commission</th>
                <th className="px-4 py-3">Net Payable</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e8e8]">
              {filtered.map((s) => (
                <tr key={s.id} className="text-sm hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-bold text-[#0c831f]">{s.id}</td>
                  <td className="px-4 py-3 font-bold text-[#1a1a1a]">{s.vendor}</td>
                  <td className="px-4 py-3 text-xs text-[#999]">{s.period}</td>
                  <td className="px-4 py-3 font-bold">₹{s.totalSales.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#ff4f8b]">-₹{s.commission.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-[#0c831f]">₹{s.netPayable.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-xs text-[#999]">{s.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {s.status === "pending" && (
                        <button onClick={() => setShowPayModal({ id: s.id, vendor: s.vendor, amount: s.netPayable })} className="rounded-lg bg-[#0c831f] p-1.5 text-white hover:bg-[#0a6a18]">
                          <Send className="h-4 w-4" />
                        </button>
                      )}
                      <button className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8]"><Eye className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPayModal && (
          <ReusableModal open={true} onClose={() => setShowPayModal(null)} title="Confirm Payout" size="sm">
            <div className="space-y-4">
              <div className="rounded-xl bg-[#f9fafb] p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#666]">Settlement:</span>
                  <span className="font-bold">{showPayModal.id}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-[#666]">Vendor:</span>
                  <span className="font-bold">{showPayModal.vendor}</span>
                </div>
                <div className="mt-2 flex justify-between text-lg">
                  <span className="text-[#666]">Amount:</span>
                  <span className="font-black text-[#0c831f]">₹{showPayModal.amount.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-[#999]">Amount will be transferred via the vendor's registered payment method.</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowPayModal(null)} className="rounded-lg border border-[#e8e8e8] px-4 py-2 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
                <button onClick={() => handlePay(showPayModal.id)} className="rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]">
                  <Send className="mr-1.5 inline h-4 w-4" /> Initiate Payment
                </button>
              </div>
            </div>
          </ReusableModal>
        )}
      </div>
    </DashboardLayout>
  );
}
