"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Mail, Settings as SettingsIcon, FileText, ShieldCheck } from "lucide-react";

export default function EmailSettingsPage() {
  const [smtpHost, setSmtpHost] = useState("smtp.sendgrid.net");
  const [smtpPort, setSmtpPort] = useState("587");
  const [senderEmail, setSenderEmail] = useState("noreply@fmcgcommerce.com");
  const [senderName, setSenderName] = useState("FMCG Commerce");

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Email Settings</h1>
          </div>
        </div>

        {/* SMTP Configuration */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <SettingsIcon className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">SMTP Configuration</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">SMTP Host</label>
              <input type="text" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">SMTP Port</label>
              <select value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option value="25">25 (Standard)</option>
                <option value="587" selected>587 (TLS)</option>
                <option value="465">465 (SSL)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">SMTP Username</label>
              <input type="text" placeholder="apikey" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">SMTP Password</label>
              <input type="password" placeholder="••••••••••••" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#e8f5e9] px-3 py-2">
            <ShieldCheck className="h-4 w-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#0c831f]">Connection secured via TLS encryption</span>
          </div>
        </section>

        {/* Sender Info */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Sender Information</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Sender Email</label>
              <input type="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Sender Name</label>
              <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Email Templates */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Email Templates</h2>
          </div>
          <div className="space-y-2">
            {[
              { name: "Order Confirmation", vars: "{{order_id}}, {{items}}, {{total}}" },
              { name: "Shipping Update", vars: "{{order_id}}, {{tracking_url}}, {{eta}}" },
              { name: "Welcome Email", vars: "{{name}}, {{email}}, {{verify_link}}" },
              { name: "Password Reset", vars: "{{reset_link}}, {{expiry_hours}}" },
              { name: "Promotional Blast", vars: "{{name}}, {{offer}}, {{coupon_code}}" },
              { name: "Abandoned Cart", vars: "{{name}}, {{cart_items}}, {{recover_link}}" },
            ].map(({ name, vars }) => (
              <div key={name} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{name}</p>
                  <p className="text-[10px] text-[#999]">Variables: {vars}</p>
                </div>
                <button className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] transition hover:border-[#ff4f8b] hover:text-[#ff4f8b]">Edit</button>
              </div>
            ))}
          </div>
        </section>

        {/* Verification */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Email Verification</h2>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Require Email Verification</p>
              <p className="text-xs text-[#666]">New users must verify their email before placing orders</p>
            </div>
            <button className="relative h-7 w-12 rounded-full bg-[#0c831f]">
              <span className="absolute top-0.5 right-0.5 block h-6 w-6 rounded-full bg-white shadow" />
            </button>
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
