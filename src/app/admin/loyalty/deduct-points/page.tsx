"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { ChevronLeft, MinusCircle, Search } from "lucide-react";

const customers = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", totalPoints: 1250, tier: "Gold" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", totalPoints: 890, tier: "Silver" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", totalPoints: 2340, tier: "Platinum" },
];

export default function DeductPointsPage() {
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${points} points deducted from ${selectedCustomer?.name || "customer"} successfully! (Demo)`);
    setPoints(""); setReason(""); setNote(""); setSelectedCustomer(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/loyalty" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Loyalty Management</p>
            <h1 className="text-xl font-black text-[#1a1a1a]">Deduct Points</h1>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MinusCircle className="h-4 w-4 text-[#ff4f8b]" />
                <h2 className="text-sm font-black text-[#1a1a1a]">Deduct Points from Customer</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#666]">Search Customer</label>
                  <div className="mt-1 relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                    <input type="text" placeholder="Search by name, email, or phone..." value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-10 pr-3 text-sm focus:border-[#0c831f] focus:outline-none" />
                  </div>
                  {customerSearch && (
                    <div className="mt-2 space-y-1">
                      {customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase())).map(c => (
                        <button key={c.id} type="button" onClick={() => { setSelectedCustomer(c); setCustomerSearch(""); }}
                          className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition hover:border-[#ff4f8b] ${selectedCustomer?.id === c.id ? 'border-[#ff4f8b] bg-[#fff0f6]' : 'border-[#e8e8e8]'}`}>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4f8b] text-sm font-bold text-white">{c.name.charAt(0)}</div>
                          <div className="flex-1"><p className="text-sm font-bold text-[#1a1a1a]">{c.name}</p><p className="text-xs text-[#666]">{c.email}</p></div>
                          <div className="text-right"><p className="text-sm font-black text-[#ff4f8b]">{c.totalPoints} pts</p><p className="text-[10px] font-semibold text-[#666]">{c.tier}</p></div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {selectedCustomer && (
                  <div className="rounded-xl border border-[#ff4f8b] bg-[#fff0f6] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4f8b] text-lg font-bold text-white">{selectedCustomer.name.charAt(0)}</div>
                      <div><p className="text-sm font-bold text-[#1a1a1a]">{selectedCustomer.name}</p><p className="text-xs text-[#666]">{selectedCustomer.email}</p></div>
                    </div>
                    <div className="text-right"><p className="text-xs font-bold text-[#666]">Current Balance</p><p className="text-lg font-black text-[#ff4f8b]">{selectedCustomer.totalPoints} pts</p></div>
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-[#666]">Points to Deduct *</label>
                  <input type="number" required min={1} value={points} onChange={(e) => setPoints(e.target.value)} placeholder="e.g., 50"
                    className="mt-1 h-10 w-full max-w-xs rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm focus:border-[#0c831f] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Reason *</label>
                  <select required value={reason} onChange={(e) => setReason(e.target.value)}
                    className="mt-1 h-10 w-full max-w-md rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm focus:border-[#0c831f] focus:outline-none">
                    <option value="">Select reason...</option>
                    <option value="return">Order Return / Refund</option>
                    <option value="expired">Points Expired</option>
                    <option value="fraud">Fraudulent Activity</option>
                    <option value="manual">Manual Adjustment</option>
                    <option value="promotion">Promotion Reversal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div><label className="text-xs font-bold text-[#666]">Note (Optional)</label>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Internal note..." rows={3}
                    className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={!selectedCustomer || !points || !reason}
                    className="flex items-center gap-2 rounded-lg bg-[#ff4f8b] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#e63975] disabled:opacity-50">
                    <MinusCircle className="h-4 w-4" /> Deduct Points
                  </button>
                  <Link href="/admin/loyalty" className="flex items-center rounded-lg border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</Link>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
