"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader } from "@/components/reusable/reusable-components";
import { Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const tabs = [
  { id: "basic", label: "Basic Info" },
  { id: "variants", label: "Variants" },
  { id: "media", label: "Media" },
  { id: "seo", label: "SEO & Tags" },
];

const fieldClass =
  "h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none transition focus:border-[#0c831f] placeholder:text-[#999]";

export default function NewProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("basic");

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="Add New Product"
          subtitle="Create a new product in your catalog with all details, variants, media, and SEO metadata."
          breadcrumb="PRODUCT MANAGEMENT"
          actions={
            <>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={() => { toast.success("Product created successfully!"); }}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Product
              </button>
            </>
          }
        />

        {/* Tab Navigation */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="flex border-b border-[#e8e8e8] bg-[#f9fafb]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#0c831f] text-[#0c831f] bg-white"
                    : "text-[#666] hover:text-[#1a1a1a] hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-6">
            {/* Basic Info */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FormField label="Product Name *" placeholder="Enter product name" />
                  <FormField label="SKU *" placeholder="Auto-generated or custom" />
                  <FormField label="Barcode" placeholder="Enter barcode" />
                  <FormSelect label="Category *" options={["Groceries", "Fruits", "Dairy", "Beverages", "Snacks", "Health", "Personal Care"]} />
                  <FormField label="Brand *" placeholder="Enter brand name" />
                  <FormField label="Supplier" placeholder="Enter supplier name" />
                  <FormField label="MRP (₹) *" type="number" placeholder="0.00" />
                  <FormField label="Selling Price (₹) *" type="number" placeholder="0.00" />
                  <FormField label="Cost Price (₹)" type="number" placeholder="0.00" />
                  <FormField label="Tax Rate (%)" type="number" placeholder="5" />
                  <FormSelect label="Unit" options={["piece", "kg", "g", "L", "ml", "pack", "box"]} />
                  <FormField label="Weight" placeholder="e.g., 500g, 1L" />
                  <FormField label="Stock Quantity *" type="number" placeholder="0" />
                  <FormField label="Low Stock Threshold" type="number" placeholder="10" />
                  <FormSelect label="Warehouse" options={["Mumbai Hub", "Pune Cold Storage", "Bangalore Cold Room", "Delhi Central", "Hyderabad Depot"]} />
                  <FormSelect label="Status" options={["active", "draft", "inactive"]} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Short Description</label>
                  <input placeholder="Brief product description" className={fieldClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Full Description</label>
                  <textarea rows={4} placeholder="Detailed product description" className="w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#0c831f] placeholder:text-[#999]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Tags</label>
                  <input placeholder="Add tags separated by commas (e.g., organic, premium, bestseller)" className={fieldClass} />
                </div>
              </div>
            )}

            {/* Variants */}
            {activeTab === "variants" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <FormField label="Variant Name" placeholder="e.g., 500g, 1L" />
                    <FormField label="SKU" placeholder="Auto-generated" />
                    <FormField label="Price (₹)" type="number" placeholder="0" />
                    <FormField label="Stock" type="number" placeholder="0" />
                    <FormField label="Weight" placeholder="e.g., 500g" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="checkbox" id="isDefault" className="h-4 w-4 rounded border-[#d0d0d0] text-[#0c831f]" />
                    <label htmlFor="isDefault" className="text-sm text-[#666]">Set as default variant</label>
                  </div>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#0c831f] hover:bg-[#e8f5e9] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Variant
                </button>
              </div>
            )}

            {/* Media */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-bold text-[#666]">Product Images (Max 5)</label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="group relative aspect-square rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6] flex items-center justify-center cursor-pointer hover:border-[#0c831f] transition-colors">
                        <div className="text-center">
                          <svg className="mx-auto w-6 h-6 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-1 text-[10px] text-[#999]">Click to upload</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-[#666]">Product Video (Optional)</label>
                  <div className="rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6] flex items-center justify-center h-32 cursor-pointer hover:border-[#0c831f] transition-colors">
                    <div className="text-center">
                      <svg className="mx-auto w-8 h-8 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-sm text-[#999]">Upload product video</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEO */}
            {activeTab === "seo" && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Meta Title</label>
                  <input placeholder="Enter SEO title (50-60 characters recommended)" className={fieldClass} />
                  <p className="mt-1 text-[10px] text-[#999]">0/60 characters</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Meta Description</label>
                  <textarea rows={3} placeholder="Enter SEO meta description (150-160 characters recommended)" className="w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#0c831f] placeholder:text-[#999]" />
                  <p className="mt-1 text-[10px] text-[#999]">0/160 characters</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">URL Slug</label>
                  <div className="flex items-center rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] overflow-hidden focus-within:border-[#0c831f]">
                    <span className="px-3 text-xs text-[#999] bg-[#f0f0f0] py-2.5">/products/</span>
                    <input placeholder="product-url-slug" className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999]" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Meta Keywords</label>
                  <input placeholder="Comma-separated keywords (e.g., organic, basmati, rice)" className={fieldClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">Canonical URL</label>
                  <input placeholder="https://fmcg.com/products/your-product" className={fieldClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">OG Image URL</label>
                  <input placeholder="https://example.com/og-image.jpg" className={fieldClass} />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#e8e8e8] bg-[#f9fafb] px-5 py-4">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { toast.success("Product saved as draft!"); }}
                className="rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={() => { toast.success("Product published!"); }}
                className="rounded-lg bg-[#0c831f] px-5 py-2 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── Helper Components ─────────────────────────────────────

function FormField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-[#666]">{label}</label>
      <input type={type} placeholder={placeholder} className={fieldClass} />
    </div>
  );
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-[#666]">{label}</label>
      <select className={fieldClass}>
        <option value="">Select {label.replace(" *", "")}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
