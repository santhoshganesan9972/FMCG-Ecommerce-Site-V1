"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Gift, Award, TrendingUp, Users, Wallet } from "lucide-react";

export default function LoyaltySettingsPage() {
  const [loyaltyEnabled, setLoyaltyEnabled] = useState(true);
  const [referralEnabled, setReferralEnabled] = useState(true);
  const [cashbackEnabled, setCashbackEnabled] = useState(true);
  const [pointPerRupee, setPointPerRupee] = useState("1");
  const [pointValue, setPointValue] = useState("0.25");
  const [pointExpiry, setPointExpiry] = useState("365");

  return (
    <DashboardLayout>
      <SettingsErrorBoundary>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Settings</p>
            <h1 className="text-xl font-black text-[#1a1a1a]">Loyalty Settings</h1>
          </div>
        </div>

        {/* Points Configuration */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Points Configuration</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Points per ₹1 Spent</label>
              <input type="text" value={pointPerRupee} onChange={(e) => setPointPerRupee(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Point Value (₹)</label>
              <input type="text" value={pointValue} onChange={(e) => setPointValue(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Point Expiry (days)</label>
              <input type="text" value={pointExpiry} onChange={(e) => setPointExpiry(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Tier Rules */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Tier Rules</h2>
          </div>
          <div className="space-y-2">
            {[
              { tier: "Silver", points: "0 — 1,000", multiplier: "1x", color: "text-[#666]" },
              { tier: "Gold", points: "1,001 — 5,000", multiplier: "1.5x", color: "text-[#b8860b]" },
              { tier: "Platinum", points: "5,001 — 15,000", multiplier: "2x", color: "text-[#0c831f]" },
              { tier: "Diamond", points: "15,000+", multiplier: "3x", color: "text-[#ff4f8b]" },
            ].map(({ tier, points, multiplier, color }) => (
              <div key={tier} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div className="flex items-center gap-3">
                  <Award className={`h-5 w-5 ${color}`} />
                  <span className="text-sm font-black text-[#1a1a1a]">{tier}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#666]">{points} pts</span>
                  <span className="rounded bg-[#fff0f6] px-2 py-0.5 text-xs font-black text-[#ff4f8b]">{multiplier}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Referral & Cashback */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Referral Settings</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Referral Program</p>
                <p className="text-xs text-[#666]">Reward users for inviting friends</p>
              </div>
              <button onClick={() => setReferralEnabled(!referralEnabled)} className={`relative h-6 w-11 rounded-full ${referralEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${referralEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {referralEnabled && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#666]">Referrer Reward</label>
                  <input type="text" defaultValue="₹50" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Referee Reward</label>
                  <input type="text" defaultValue="₹25" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none" />
                </div>
              </div>
            )}
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Cashback Settings</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Cashback Program</p>
                <p className="text-xs text-[#666]">Auto cashback on eligible orders</p>
              </div>
              <button onClick={() => setCashbackEnabled(!cashbackEnabled)} className={`relative h-6 w-11 rounded-full ${cashbackEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${cashbackEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {cashbackEnabled && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#666]">Cashback %</label>
                  <input type="text" defaultValue="5%" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Max Cashback (₹)</label>
                  <input type="text" defaultValue="100" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none" />
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]">Cancel</Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">Save Changes</button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
