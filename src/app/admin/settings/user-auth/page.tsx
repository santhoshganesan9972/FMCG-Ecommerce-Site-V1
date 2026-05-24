"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Users, LogIn, MessageSquare, Globe, ShieldCheck, Ban } from "lucide-react";

export default function UserAuthSettingsPage() {
  const [regEnabled, setRegEnabled] = useState(true);
  const [otpLogin, setOtpLogin] = useState(true);
  const [socialLogin, setSocialLogin] = useState(true);
  const [verification, setVerification] = useState(true);

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
            <h1 className="text-xl font-black text-[#1a1a1a]">User & Authentication</h1>
          </div>
        </div>

        {/* Registration */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Registration Settings</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Allow New Registration</p>
                <p className="text-xs text-[#666]">Enable user self-registration on platform</p>
              </div>
              <button onClick={() => setRegEnabled(!regEnabled)} className={`relative h-6 w-11 rounded-full ${regEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${regEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-[#666]">Registration Fields</label>
                <div className="mt-1 space-y-1.5">
                  {["Full Name", "Email", "Phone", "Password", "Address"].map((f) => (
                    <label key={f} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#e8e8e8] text-[#ff4f8b] accent-[#ff4f8b]" />
                      <span className="text-xs text-[#666]">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">User Restrictions</label>
                <div className="mt-1 space-y-1.5">
                  {["Min age (18+)", "Email verification required", "Phone OTP verification", "Admin approval required", "Captcha verification"].map((r) => (
                    <label key={r} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#e8e8e8] text-[#ff4f8b] accent-[#ff4f8b]" />
                      <span className="text-xs text-[#666]">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login Methods */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <LogIn className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Login Methods</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: "otp", label: "OTP Login", desc: "One-Time Password via SMS", icon: MessageSquare, enabled: otpLogin, set: setOtpLogin },
              { id: "social", label: "Social Login", desc: "Google, Facebook, Apple ID", icon: Globe, enabled: socialLogin, set: setSocialLogin },
              { id: "verify", label: "Account Verification", desc: "Verify email/phone before first order", icon: ShieldCheck, enabled: verification, set: setVerification },
            ].map(({ id, label, desc, icon: Icon, enabled, set }) => (
              <div key={id} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${enabled ? "bg-[#fff0f6] text-[#ff4f8b]" : "bg-[#f0f0f0] text-[#ccc]"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                    <p className="text-xs text-[#666]">{desc}</p>
                  </div>
                </div>
                <button onClick={() => set(!enabled)} className={`relative h-6 w-11 rounded-full ${enabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
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
