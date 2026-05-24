"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Globe, Sun, Clock, Languages, Wrench } from "lucide-react";

export default function GeneralSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");
  const [siteName, setSiteName] = useState("FMCG Commerce");

  return (
    <DashboardLayout>
      <SettingsErrorBoundary>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Settings</p>
            <h1 className="text-xl font-black text-[#1a1a1a]">General Settings</h1>
          </div>
        </div>

        {/* Site Identity */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Site Identity</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Website / App Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Default Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="INR">₹ INR — Indian Rupee</option>
                <option value="USD">$ USD — US Dollar</option>
                <option value="EUR">€ EUR — Euro</option>
                <option value="GBP">£ GBP — British Pound</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Company Logo</label>
              <div className="mt-1 flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-[#e8e8e8] bg-[#fafafa] cursor-pointer hover:border-[#ff4f8b] transition-colors">
                <div className="text-center">
                  <p className="text-xs font-bold text-[#ff4f8b]">Upload Logo</p>
                  <p className="text-[10px] text-[#999]">PNG, JPG, SVG • Max 2MB</p>
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Favicon</label>
              <div className="mt-1 flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-[#e8e8e8] bg-[#fafafa] cursor-pointer hover:border-[#ff4f8b] transition-colors">
                <div className="text-center">
                  <p className="text-xs font-bold text-[#ff4f8b]">Upload Favicon</p>
                  <p className="text-[10px] text-[#999]">ICO, PNG • 16×16 or 32×32</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Theme & Appearance */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Theme & Appearance</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Theme Mode</label>
              <div className="mt-1 flex gap-2">
                {["light", "dark", "system"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={`flex-1 h-10 rounded-lg border text-sm font-bold capitalize transition ${
                      theme === mode
                        ? "border-[#ff4f8b] bg-[#fff0f6] text-[#ff4f8b]"
                        : "border-[#e8e8e8] bg-[#fafafa] text-[#666] hover:border-[#ccc]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
                <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                <option value="America/New_York">America/New_York (EST, UTC-5)</option>
                <option value="Europe/London">Europe/London (GMT, UTC+0)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Date Format</label>
              <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </section>

        {/* Language & Regional */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Language & Regional</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Default Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Marathi">मराठी (Marathi)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Clock Format</label>
              <div className="mt-1 flex gap-2">
                {["12h", "24h"].map((fmt) => (
                  <button key={fmt} className={`flex-1 h-10 rounded-lg border text-sm font-bold transition ${
                    fmt === "12h"
                      ? "border-[#ff4f8b] bg-[#fff0f6] text-[#ff4f8b]"
                      : "border-[#e8e8e8] bg-[#fafafa] text-[#666] hover:border-[#ccc]"
                  }`}>
                    {fmt === "12h" ? "12 Hour" : "24 Hour"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Mode */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Maintenance Mode</h2>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Enable Maintenance Mode</p>
              <p className="text-xs text-[#666]">When enabled, only admins can access the storefront</p>
            </div>
            <button
              onClick={() => setMaintenance(!maintenance)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                maintenance ? "bg-[#ff4f8b]" : "bg-[#ccc]"
              }`}
            >
              <span className={`absolute top-0.5 block h-6 w-6 rounded-full bg-white shadow transition-transform ${
                maintenance ? "translate-x-5.5" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="h-10 rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6] flex items-center">
            Cancel
          </Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">
            Save Changes
          </button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
