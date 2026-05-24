"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Zap, Key, Globe, Webhook, BarChart3 } from "lucide-react";

export default function ApiIntegrationPage() {
  const [mapsEnabled, setMapsEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

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
            <h1 className="text-xl font-black text-[#1a1a1a]">API & Integration</h1>
          </div>
        </div>

        {/* API Keys */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Key className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">API Keys</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Public API Key", key: "pk_fmcg_live_abc123xyz456", env: "Production" },
              { label: "Secret API Key", key: "sk_fmcg_live_def789uvw012", env: "Production" },
              { label: "Test Public Key", key: "pk_fmcg_test_ghi345rst678", env: "Test" },
              { label: "Test Secret Key", key: "sk_fmcg_test_jkl901mno234", env: "Test" },
            ].map(({ label, key, env }) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                  <code className="text-[11px] font-mono text-[#666]">{key.slice(0, 20)}••••••••</code>
                </div>
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${env === "Production" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fff0f6] text-[#ff4f8b]"}`}>{env}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Third-party Integrations */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Third-Party Integrations</h2>
          </div>
          <div className="space-y-2">
            {[
              { name: "Google Maps API", icon: "🗺️", status: "Connected", key: "maps" },
              { name: "Google Analytics 4", icon: "📊", status: "Connected", key: "analytics" },
              { name: "Razorpay", icon: "💳", status: "Connected", key: "razorpay" },
              { name: "Twilio SMS", icon: "📱", status: "Connected", key: "twilio" },
              { name: "SendGrid Email", icon: "✉️", status: "Connected", key: "sendgrid" },
              { name: "Cloudflare CDN", icon: "☁️", status: "Connected", key: "cloudflare" },
            ].map(({ name, icon, status, key }) => (
              <div key={key} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm font-bold text-[#1a1a1a]">{name}</span>
                </div>
                <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">{status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Webhooks */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Webhook className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Webhooks</h2>
          </div>
          <div className="space-y-2">
            {[
              { event: "order.created", url: "https://api.fmcgcommerce.com/webhooks/order-created", last: "2 min ago" },
              { event: "payment.completed", url: "https://api.fmcgcommerce.com/webhooks/payment", last: "5 min ago" },
              { event: "delivery.delivered", url: "https://api.fmcgcommerce.com/webhooks/delivery", last: "1 hour ago" },
            ].map(({ event, url, last }) => (
              <div key={event} className="rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <div className="flex items-center justify-between">
                  <code className="text-xs font-bold text-[#ff4f8b]">{event}</code>
                  <span className="text-[10px] text-[#999]">{last}</span>
                </div>
                <p className="mt-0.5 text-xs font-mono text-[#666]">{url}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Maps & Analytics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Maps API</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Google Maps</p>
                <p className="text-xs text-[#666]">For delivery route optimization & store locator</p>
              </div>
              <button onClick={() => setMapsEnabled(!mapsEnabled)} className={`relative h-6 w-11 rounded-full ${mapsEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${mapsEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {mapsEnabled && (
              <input type="text" placeholder="AIzaSy..." className="mt-2 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            )}
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Analytics API</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Google Analytics 4</p>
                <p className="text-xs text-[#666]">Track user behavior & conversion metrics</p>
              </div>
              <button onClick={() => setAnalyticsEnabled(!analyticsEnabled)} className={`relative h-6 w-11 rounded-full ${analyticsEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${analyticsEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {analyticsEnabled && (
              <input type="text" placeholder="G-XXXXXXXXXX" className="mt-2 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
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
