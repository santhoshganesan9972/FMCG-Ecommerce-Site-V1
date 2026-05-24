"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, FlaskConical, ToggleLeft, Beaker, TestTube } from "lucide-react";

export default function FeatureFlagsPage() {
  const [modules, setModules] = useState({
    expressDelivery: true,
    loyaltyProgram: true,
    referralSystem: true,
    cashback: true,
    multiStore: false,
    subscription: false,
    giftCards: true,
    preOrder: false,
  });

  const experimentalFeatures = [
    { id: "ai", label: "AI Recommendations", desc: "ML-based product suggestions", status: "beta" },
    { id: "dark", label: "Dark Mode", desc: "System-wide dark theme toggle", status: "beta" },
    { id: "voice", label: "Voice Search", desc: "Search products using voice", status: "alpha" },
    { id: "ar", label: "AR Product View", desc: "Augmented reality product preview", status: "alpha" },
    { id: "reorder", label: "Smart Reorder", desc: "AI-powered auto reordering", status: "beta" },
  ];

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Feature Flags</h1>
          </div>
        </div>

        {/* Module Toggles */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ToggleLeft className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Enable / Disable Modules</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(Object.entries(modules) as [keyof typeof modules, boolean][]).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <button onClick={() => toggleModule(key)} className={`relative h-6 w-11 rounded-full transition-colors ${val ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Experimental / Beta Features */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Experimental & Beta Features</h2>
          </div>
          <div className="space-y-2">
            {experimentalFeatures.map(({ id, label, desc, status }) => (
              <div key={id} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${status === "beta" ? "bg-[#fff0f6] text-[#ff4f8b]" : "bg-[#f0f0f0] text-[#999]"}`}>
                    <Beaker className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                    <p className="text-xs text-[#666]">{desc}</p>
                  </div>
                </div>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${status === "beta" ? "bg-[#fff0f6] text-[#ff4f8b]" : "bg-[#f0f0f0] text-[#999]"}`}>{status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* A/B Testing */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TestTube className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">A/B Testing Flags</h2>
          </div>
          <div className="space-y-2">
            {[
              { test: "New Checkout Flow", variant: "Variant B", traffic: "50%", status: "Active" },
              { test: "Homepage Hero Layout", variant: "Variant A", traffic: "30%", status: "Active" },
              { test: "Cart Redesign", variant: "Variant B", traffic: "25%", status: "Active" },
            ].map(({ test, variant, traffic, status }) => (
              <div key={test} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{test}</p>
                  <p className="text-xs text-[#666]">{variant} · {traffic} traffic</p>
                </div>
                <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">{status}</span>
              </div>
            ))}
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
