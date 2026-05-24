"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, TrendingUp, Search, FileText, Code, Globe } from "lucide-react";

export default function SEOSettingsPage() {
  const [metaTitle, setMetaTitle] = useState("FMCG Commerce — Fresh Groceries Delivered in Minutes");
  const [metaDesc, setMetaDesc] = useState("Order fresh groceries, dairy, snacks and daily essentials online. Free delivery in 10 minutes. Best prices guaranteed.");

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
            <h1 className="text-xl font-black text-[#1a1a1a]">SEO Settings</h1>
          </div>
        </div>

        {/* Meta Tags */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Meta Tags</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#666]">Meta Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
              <p className="mt-1 text-[10px] text-[#999]">{metaTitle.length}/60 characters</p>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Meta Description</label>
              <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
              <p className="mt-1 text-[10px] text-[#999]">{metaDesc.length}/160 characters</p>
            </div>
          </div>
        </section>

        {/* Open Graph */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Open Graph Tags</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">OG Title</label>
              <input type="text" defaultValue="FMCG Commerce" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">OG Image URL</label>
              <input type="text" placeholder="https://fmcgcommerce.com/og-image.jpg" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Sitemap & Robots */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Sitemap</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <span className="text-sm font-bold text-[#1a1a1a]">Auto-generate Sitemap</span>
                <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Enabled</span>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Update Frequency</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <p className="text-xs text-[#666]">Sitemap URL: <code className="rounded bg-[#f6f7f6] px-1.5 text-[#ff4f8b]">/sitemap.xml</code></p>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Robots.txt</h2>
            </div>
            <div className="rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-4">
              <pre className="text-xs font-mono leading-relaxed text-[#666]">
{`User-agent: *
Allow: /
Disallow: /admin/*
Disallow: /api/*
Disallow: /cart/*
Disallow: /checkout/*

Sitemap: https://fmcgcommerce.com/sitemap.xml`}
              </pre>
            </div>
            <button className="mt-2 w-full rounded-lg border-2 border-dashed border-[#e8e8e8] py-2 text-sm font-bold text-[#ff4f8b] hover:border-[#ff4f8b]">Edit robots.txt</button>
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
