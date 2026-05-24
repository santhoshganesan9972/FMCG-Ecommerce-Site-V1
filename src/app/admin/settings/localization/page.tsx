"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Globe, Languages, Wallet, MapPin } from "lucide-react";

export default function LocalizationSettingsPage() {
  const [defaultLang, setDefaultLang] = useState("English");

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Localization Settings</h1>
          </div>
        </div>

        {/* Languages */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Languages</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Default Language</label>
              <select value={defaultLang} onChange={(e) => setDefaultLang(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Bengali</option>
                <option>Marathi</option>
                <option>Kannada</option>
                <option>Malayalam</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Available Languages</label>
              <div className="mt-1 space-y-1">
                {[
                  { lang: "English (en)", checked: true },
                  { lang: "Hindi (hi)", checked: true },
                  { lang: "Tamil (ta)", checked: true },
                  { lang: "Telugu (te)", checked: false },
                  { lang: "Bengali (bn)", checked: true },
                  { lang: "Kannada (kn)", checked: false },
                ].map(({ lang, checked }) => (
                  <label key={lang} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={checked} className="h-4 w-4 rounded border-[#e8e8e8] accent-[#ff4f8b]" />
                    <span className="text-xs text-[#666]">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Currency & Regional */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Currency Formats</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">INR — Indian Rupee</p>
                  <p className="text-xs text-[#666]">Primary currency</p>
                </div>
                <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Default</span>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Currency Format</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>₹ 1,234.56 (Symbol before, comma after thousand)</option>
                  <option>₹ 1,234 (No decimals)</option>
                  <option>₹ 1,23,456.78 (Indian numbering)</option>
                </select>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Regional Settings</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#666]">Country</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>India</option>
                  <option>United Arab Emirates</option>
                  <option>United States</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Measurement Units</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>Metric (kg, g, L, ml)</option>
                  <option>Imperial (lb, oz, gal)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">First Day of Week</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>Monday</option>
                  <option>Sunday</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Translation */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Translation Management</h2>
          </div>
          <div className="space-y-2">
            {[
              { key: "home.hero.title", en: "Fresh Groceries in Minutes", hi: "मिनटों में ताज़ा किराना" },
              { key: "cart.checkout", en: "Proceed to Checkout", hi: "चेकआउट करें" },
              { key: "order.placed", en: "Order Placed Successfully", hi: "ऑर्डर सफलतापूर्वक रखा गया" },
              { key: "search.placeholder", en: "Search for groceries...", hi: "किराना खोजें..." },
            ].map(({ key, en, hi }) => (
              <div key={key} className="rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <p className="text-[10px] font-mono text-[#999] mb-1">{key}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input type="text" value={en} readOnly className="h-8 rounded-md border border-[#e8e8e8] bg-white px-2 text-xs text-[#1a1a1a] outline-none" />
                  <input type="text" value={hi} className="h-8 rounded-md border border-[#e8e8e8] bg-white px-2 text-xs text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
                </div>
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
