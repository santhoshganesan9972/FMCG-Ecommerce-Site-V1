"use client";

import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader, ReusableSearchBar, ReusableStatusBadge } from "@/components/reusable/reusable-components";
import { mockAdminProducts } from "@/data/admin/products";
import { Edit3, Search, Hash, Globe, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function SEOManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = mockAdminProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.seo.metaTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="SEO Management"
          subtitle="Optimize product meta titles, descriptions, slugs, and social sharing settings for search engines."
          breadcrumb="PRODUCT MANAGEMENT"
        />

        <ReusableSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products by name or meta title..."
          className="w-full max-w-md"
        />

        <div className="space-y-4">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl border border-[#e8e8e8] bg-white p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-[#1a1a1a]">{p.name}</h3>
                  <p className="text-xs text-[#999] mt-0.5">{p.sku}</p>
                </div>
                <button
                  onClick={() => toast.info(`Editing SEO for ${p.name}`)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f6f7f6] transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit SEO
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-[10px] font-bold text-[#666] uppercase tracking-wide mb-1">Meta Title</p>
                  <p className="text-sm text-[#1a1a1a] truncate">{p.seo.metaTitle}</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{p.seo.metaTitle.length} characters</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#666] uppercase tracking-wide mb-1">Meta Description</p>
                  <p className="text-sm text-[#666] truncate">{p.seo.metaDescription}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#666] uppercase tracking-wide mb-1">URL Slug</p>
                  <div className="flex items-center gap-1 text-sm text-[#0c831f]">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="truncate">/{p.seo.slug}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#666] uppercase tracking-wide mb-1">Keywords</p>
                  <div className="flex flex-wrap gap-1">
                    {p.seo.metaKeywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-semibold text-[#666]">{kw}</span>
                    ))}
                    {p.seo.metaKeywords.length > 3 && (
                      <span className="text-[10px] text-[#999]">+{p.seo.metaKeywords.length - 3}</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#666] uppercase tracking-wide mb-1">Canonical URL</p>
                  <p className="text-sm text-[#666] truncate flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {p.seo.canonicalUrl}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#666] uppercase tracking-wide mb-1">OG Image</p>
                  {p.seo.ogImage ? (
                    <p className="text-sm text-[#0c831f] truncate">Configured ✓</p>
                  ) : (
                    <p className="text-sm text-[#999]">Not set</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
