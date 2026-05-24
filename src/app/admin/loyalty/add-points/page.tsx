"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { ChevronLeft, PlusCircle, Search } from "lucide-react";

const customers = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91-9876543210", totalPoints: 1250, tier: "Gold" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", phone: "+91-9876543211", totalPoints: 890, tier: "Silver" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", phone: "+91-9876543212", totalPoints: 2340, tier: "Platinum" },
];

export default function AddPointsPage() {
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${points} points awarded to ${selectedCustomer?.name || "customer"} successfully! (Demo)`);
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
            <h1 className="text-xl font-black text-[#1a1a1a]">Add Points</h1>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <PlusCircle className="h-4 w-4 text-[#0c831f]" />
                <h2 className="text-sm font-black text-[#1a1a1a]">Award Points to Customer</h2>
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
                          className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left transition hover:border-[#0c831f] ${selectedCustomer?.id === c.id ? 'border-[#0c831f] bg-[#e8f5e9]' : 'border-[#e8e8e8]'}`}>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c831f] text-sm font-bold text-white">{c.name.charAt(0)}</div>
                          <div className="flex-1"><p className="text-sm font-bold text-[#1a1a1a]">{c.name}</p><p className="text-xs text-[#666]">{c.email} &#8226; {c.phone}</p></div>
                          <div className="text-right"><p className="text-sm font-black text-[#0c831f]">{c.totalPoints} pts</p><p className="text-[10px] font-semibold text-[#666]">{c.tier}</p></div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {selectedCustomer && (
                  <div className="rounded-xl border border-[#0c831f] bg-[#e8f5e9] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c831f] text-lg font-bold text-white">{selectedCustomer.name.charAt(0)}</div>
                      <div><p className="text-sm font-bold text-[#1a1a1a]">{selectedCustomer.name}</p><p className="text-xs text-[#666]">{selectedCustomer.email}</p></div>
                    </div>
                    <div className="text-right"><p className="text-xs font-bold text-[#666]">Current Balance</p><p className="text-lg font-black text-[#0c831f]">{selectedCustomer.totalPoints} pts</p></div>
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-[#666]">Points to Add *</label>
                  <input type="number" required min={1} value={points} onChange={(e) => setPoints(e.target.value)} placeholder="e.g., 100"
                    className="mt-1 h-10 w-full max-w-xs rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm focus:border-[#0c831f] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Reason *</label>
                  <select required value={reason} onChange={(e) => setReason(e.target.value)}
                    className="mt-1 h-10 w-full max-w-md rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm focus:border-[#0c831f] focus:outline-none">
                    <option value="">Select reason...</option>
                    <option value="order">Order Completion</option>
                    <option value="signup">New Account Bonus</option>
                    <option value="referral">Referral Reward</option>
                    <option value="birthday">Birthday Bonus</option>
                    <option value="anniversary">Anniversary Reward</option>
                    <option value="feedback">Feedback & Review</option>
                    <option value="compensation">Compensation / Goodwill</option>
                    <option value="promotion">Promotional Campaign</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Note (Optional)</label>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Internal note about this adjustment..." rows={3}
                    className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={!selectedCustomer || !points || !reason}
                    className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50">
                    <PlusCircle className="h-4 w-4" /> Award Points
                  </button>
                  <Link href="/admin/loyalty" className="flex items-center rounded-lg border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</Link>
                </div>
              </form>
            </section>
          </div>
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Quick Stats</h3>
              <div className="mt-3 space-y-3">
                {[{ label: "Points Issued Today", value: "2,450" }, { label: "Avg. Points Per Customer", value: "54" }, { label: "Active Members", value: "45,231" }, { label: "Reward Pool Balance", value: "\u20B912.5L" }].map(s => (
                  <div key={s.label} className="flex items-center justify-between rounded-lg bg-[#f9fafb] px-3 py-2">
                    <span className="text-xs text-[#666]">{s.label}</span><span className="text-xs font-bold text-[#1a1a1a]">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
