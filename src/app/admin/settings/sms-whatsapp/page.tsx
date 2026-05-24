"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, MessageSquare, Phone, FileText, Send, Fingerprint } from "lucide-react";

export default function SmsWhatsAppPage() {
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

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
            <h1 className="text-xl font-black text-[#1a1a1a]">SMS & WhatsApp Settings</h1>
          </div>
        </div>

        {/* SMS Provider */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">SMS Provider</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#0c831f]" />
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">SMS Service</p>
                  <p className="text-xs text-[#666]">MSG91, Twilio, or custom SMS gateway</p>
                </div>
              </div>
              <button onClick={() => setSmsEnabled(!smsEnabled)} className={`relative h-6 w-11 rounded-full transition-colors ${smsEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${smsEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {smsEnabled && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-[#666]">SMS Provider</label>
                  <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                    <option>MSG91</option>
                    <option>Twilio</option>
                    <option>Fast2SMS</option>
                    <option>Custom API</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">API Key / Auth Token</label>
                  <input type="password" placeholder="••••••••••••••••" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Sender ID</label>
                  <input type="text" placeholder="FMCGCO" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">SMS Route</label>
                  <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                    <option>Transactional</option>
                    <option>Promotional</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* WhatsApp API */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Send className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">WhatsApp API</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-[#ff4f8b]" />
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">WhatsApp Business API</p>
                  <p className="text-xs text-[#666]">Send order updates, OTPs & promotions via WhatsApp</p>
                </div>
              </div>
              <button onClick={() => setWhatsappEnabled(!whatsappEnabled)} className={`relative h-6 w-11 rounded-full transition-colors ${whatsappEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${whatsappEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {whatsappEnabled && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-[#666]">WhatsApp Provider</label>
                  <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                    <option>Twilio WhatsApp</option>
                    <option>WATI</option>
                    <option>Interakt</option>
                    <option>GreenAPI</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">API Token</label>
                  <input type="password" placeholder="••••••••••••••••" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Phone Number ID</label>
                  <input type="text" placeholder="918123456789" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#666]">Business Account ID</label>
                  <input type="text" placeholder="108459267383926" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Templates */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Message Templates</h2>
          </div>
          <div className="space-y-2">
            {[
              { type: "OTP Verification", channel: "SMS & WhatsApp", status: "Approved" },
              { type: "Order Confirmation", channel: "SMS & WhatsApp", status: "Approved" },
              { type: "Delivery Update", channel: "WhatsApp Only", status: "Approved" },
              { type: "Promotional Offer", channel: "SMS & WhatsApp", status: "Pending" },
              { type: "Cart Reminder", channel: "WhatsApp Only", status: "Approved" },
            ].map(({ type, channel, status }) => (
              <div key={type} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{type}</p>
                  <p className="text-[10px] text-[#999]">{channel}</p>
                </div>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${status === "Approved" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fff0f6] text-[#ff4f8b]"}`}>{status}</span>
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
