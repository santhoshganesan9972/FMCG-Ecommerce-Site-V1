"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Folder, HardDrive, Globe, Image } from "lucide-react";

export default function StorageSettingsPage() {
  const [uploadSize, setUploadSize] = useState("10");
  const [provider, setProvider] = useState("aws");

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Storage Settings</h1>
          </div>
        </div>

        {/* Storage Provider */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Storage Provider</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { id: "aws", label: "AWS S3", desc: "Amazon Simple Storage Service", icon: "AWS" },
              { id: "gcp", label: "Google Cloud", desc: "Cloud Storage by Google", icon: "GCP" },
              { id: "local", label: "Local Server", desc: "On-premise file storage", icon: "Local" },
            ].map(({ id, label, desc, icon }) => (
              <button
                key={id}
                onClick={() => setProvider(id)}
                className={`rounded-xl border p-4 text-left transition ${
                  provider === id
                    ? "border-[#ff4f8b] bg-[#fff0f6]"
                    : "border-[#e8e8e8] bg-[#fafafa] hover:border-[#ccc]"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f5e9] text-sm font-black text-[#0c831f]">{icon}</div>
                <p className="mt-2 text-sm font-bold text-[#1a1a1a]">{label}</p>
                <p className="mt-0.5 text-xs text-[#666]">{desc}</p>
              </button>
            ))}
          </div>
          {provider === "aws" && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-[#666]">S3 Bucket Name</label>
                <input type="text" placeholder="fmcg-commerce-assets" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">AWS Region</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                  <option>ap-south-1 (Mumbai)</option>
                  <option>us-east-1 (N. Virginia)</option>
                  <option>eu-west-1 (Ireland)</option>
                </select>
              </div>
            </div>
          )}
        </section>

        {/* File Upload & Image Optimization */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Folder className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">File Upload</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#666]">Max Upload Size (MB)</label>
                <input type="text" value={uploadSize} onChange={(e) => setUploadSize(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Allowed File Types</label>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {["jpg", "png", "gif", "webp", "pdf", "csv", "xlsx"].map((ext) => (
                    <span key={ext} className="rounded-md bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">.{ext}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Image className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Image Optimization</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <span className="text-sm font-bold text-[#1a1a1a]">Auto-optimize Uploads</span>
                <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Enabled</span>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Image Quality (%)</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>90% (High quality)</option>
                  <option>80% (Balanced)</option>
                  <option>60% (Small file)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">WebP Conversion</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>Convert to WebP with fallback</option>
                  <option>Keep original format</option>
                  <option>Convert all to WebP</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* CDN */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">CDN Configuration</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">CDN Provider</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                <option>CloudFront (AWS)</option>
                <option>Cloudflare</option>
                <option>Fastly</option>
                <option>Akamai</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">CDN URL</label>
              <input type="text" placeholder="https://cdn.fmcgcommerce.com" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
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
