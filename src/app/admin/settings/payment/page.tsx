"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, CreditCard, Smartphone, Wallet, Banknote, Key, RefreshCcw } from "lucide-react";

export default function PaymentSettingsPage() {
  const [upi, setUpi] = useState(true);
  const [razorpay, setRazorpay] = useState(true);
  const [card, setCard] = useState(true);
  const [wallet, setWallet] = useState(true);
  const [cod, setCod] = useState(true);

  const gatewayMethods = [
    { id: "upi", label: "UPI Payments", desc: "GPay, PhonePe, Paytm & all UPI apps", icon: Smartphone, enabled: upi, set: setUpi },
    { id: "razorpay", label: "Razorpay", desc: "Full-stack payment gateway with auto-settlement", icon: CreditCard, enabled: razorpay, set: setRazorpay },
    { id: "card", label: "Card Payments", desc: "Credit & debit cards via Visa, Mastercard, RuPay", icon: CreditCard, enabled: card, set: setCard },
    { id: "wallet", label: "Wallet", desc: "FMCG wallet, Paytm wallet & Amazon Pay", icon: Wallet, enabled: wallet, set: setWallet },
    { id: "cod", label: "Cash on Delivery", desc: "COD with order value limit & verification", icon: Banknote, enabled: cod, set: setCod },
  ];

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Payment Settings</h1>
          </div>
        </div>

        {/* Payment Gateways */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Payment Gateways</h2>
          </div>
          <div className="space-y-3">
            {gatewayMethods.map(({ id, label, desc, icon: Icon, enabled, set }) => (
              <div key={id} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${enabled ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f0f0f0] text-[#ccc]"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                    <p className="text-xs text-[#666]">{desc}</p>
                  </div>
                </div>
                <button onClick={() => set(!enabled)} className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Gateway Keys */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Key className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">API Keys & Credentials</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Razorpay Key ID</label>
              <input type="text" placeholder="rzp_live_xxxxxxxxxxxx" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Razorpay Key Secret</label>
              <input type="password" placeholder="••••••••••••••••" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Stripe Publishable Key</label>
              <input type="text" placeholder="pk_live_xxxxxxxxxxxx" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Stripe Secret Key</label>
              <input type="password" placeholder="••••••••••••••••" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Refund Settings */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCcw className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Refund Settings</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Refund Window (Days)</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="7">7 Days</option>
                <option value="15">15 Days</option>
                <option value="30" selected>30 Days</option>
                <option value="45">45 Days</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Auto-Refund Threshold</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="500">Below ₹500</option>
                <option value="1000" selected>Below ₹1,000</option>
                <option value="2000">Below ₹2,000</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Refund Method</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>Original Payment Method</option>
                <option>Store Wallet</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]">Cancel</Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">Save Changes</button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
