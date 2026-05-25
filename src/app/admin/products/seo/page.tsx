"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import { Search, Save } from "lucide-react";
import { toast } from "sonner";

export default function SEOPage() {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">SEO Management</h1>
          <p className="mt-2 text-sm text-[#666]">Manage meta titles, descriptions, slugs, and Open Graph data for product pages.</p>
        </section>
        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search product to edit SEO..." />
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3 pb-4 border-b border-[#e8e8e8]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0c831f]/10">
              <Search className="h-5 w-5 text-[#0c831f]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Organic Basmati Rice</p>
              <p className="text-xs text-[#999]">PRD-001 · RICE-BAS-001</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "Meta Title", value: "Organic Basmati Rice 5kg - Premium Quality | FMCG", placeholder: "Enter meta title", hint: "Recommended: 50-60 characters" },
              { label: "Meta Description", value: "Buy premium organic basmati rice online. 5kg pack, long grain, aromatic. Free delivery.", placeholder: "Enter meta description", hint: "Recommended: 150-160 characters" },
              { label: "URL Slug", value: "organic-basmati-rice-5kg", placeholder: "product-url-slug", hint: "Auto-generated from product name" },
              { label: "Canonical URL", value: "https://fmcg.com/products/organic-basmati-rice-5kg", placeholder: "https://...", hint: "Canonical URL for SEO" },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
                <input type="text" defaultValue={field.value} className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
                <p className="mt-1 text-[10px] text-[#999]">{field.hint}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Meta Keywords</label>
            <div className="flex flex-wrap gap-1.5">
              {["organic rice", "basmati rice", "premium rice", "5kg rice", "grocery online"].map((kw) => (
                <span key={kw} className="inline-flex items-center gap-1 rounded-full bg-[#f6f7f6] px-2.5 py-1 text-xs font-medium text-[#666]">
                  {kw}
                  <button className="text-[#999] hover:text-[#dc2626]">&times;</button>
                </span>
              ))}
              <input type="text" placeholder="Add keyword..." className="rounded-full border border-[#e8e8e8] bg-white px-2.5 py-1 text-xs outline-none focus:border-[#0c831f]" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => toast.success("SEO settings saved")} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Save className="h-4 w-4" /> Save SEO Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
