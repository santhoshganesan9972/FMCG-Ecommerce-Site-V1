"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Shield, Lock, Fingerprint, Globe, LogIn, Monitor } from "lucide-react";

export default function SecuritySettingsPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Security Settings</h1>
          </div>
        </div>

        {/* Password Policy */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Password Policy</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Min Password Length</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>6 characters</option>
                <option selected>8 characters</option>
                <option>10 characters</option>
                <option>12 characters</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Password Expiry (Days)</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>Never</option>
                <option selected>90 days</option>
                <option>180 days</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Password Complexity</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>Letters & numbers</option>
                <option selected>Upper, lower, number & special</option>
                <option>Any</option>
              </select>
            </div>
          </div>
        </section>

        {/* Session & 2FA */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <LogIn className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Session Management</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#666]">Session Timeout (minutes)</label>
                <input type="text" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <span className="text-sm font-bold text-[#1a1a1a]">Login Attempt Limit</span>
                <span className="text-sm font-black text-[#ff4f8b]">5 attempts</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <span className="text-sm font-bold text-[#1a1a1a]">Lockout Duration</span>
                <span className="text-sm font-black text-[#0c831f]">30 minutes</span>
              </div>
            </div>
          </section>
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="h-4 w-4 text-[#0c831f]" />
                <h2 className="text-sm font-black text-[#1a1a1a]">Two-Factor Auth</h2>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">Require 2FA</p>
                  <p className="text-xs text-[#666]">OTP via authenticator app or SMS</p>
                </div>
                <button onClick={() => setTwoFA(!twoFA)} className={`relative h-6 w-11 rounded-full transition-colors ${twoFA ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${twoFA ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </section>
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-4 w-4 text-[#ff4f8b]" />
                <h2 className="text-sm font-black text-[#1a1a1a]">IP Whitelist</h2>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">Enable IP Whitelist</p>
                  <p className="text-xs text-[#666]">Only allow admin access from trusted IPs</p>
                </div>
                <button onClick={() => setIpWhitelist(!ipWhitelist)} className={`relative h-6 w-11 rounded-full transition-colors ${ipWhitelist ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${ipWhitelist ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              {ipWhitelist && (
                <div className="mt-3 space-y-2">
                  {["103.45.67.89", "203.0.113.42", "192.168.1.0/24"].map((ip) => (
                    <div key={ip} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm">
                      <span className="font-mono text-xs font-bold text-[#1a1a1a]">{ip}</span>
                      <button className="text-xs text-[#ff4f8b] hover:underline">Remove</button>
                    </div>
                  ))}
                  <button className="w-full rounded-lg border-2 border-dashed border-[#e8e8e8] py-2 text-sm font-bold text-[#ff4f8b] hover:border-[#ff4f8b]">+ Add IP</button>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Device Restrictions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Device Restrictions</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Max Devices Per User", val: "3", desc: "Concurrent sessions" },
              { label: "New Device Verification", val: "Required", desc: "OTP on first login" },
              { label: "Remember Devices", val: "30 days", desc: "Trust period" },
            ].map(({ label, val, desc }) => (
              <div key={label} className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <p className="text-xs font-bold text-[#666]">{label}</p>
                <p className="mt-1 text-lg font-black text-[#1a1a1a]">{val}</p>
                <p className="text-[10px] text-[#999]">{desc}</p>
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
