"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockAdminProducts, mockBulkUploadHistory } from "@/data/admin/products";
import { Search, Plus, Upload, Download, Filter, FileText, Image, Hash, History, BarChart3, Copy, Archive, Trash2, ChevronDown, ChevronRight, Edit3, Eye } from "lucide-react";
import { toast } from "sonner";

type Tab = "products" | "add" | "variants" | "media" | "seo" | "history" | "bulk";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("products");

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "products", label: "Product List", icon: <FileText className="w-4 h-4" /> },
    { key: "add", label: "Add Product", icon: <Plus className="w-4 h-4" /> },
    { key: "variants", label: "Variants", icon: <Copy className="w-4 h-4" /> },
    { key: "media", label: "Media", icon: <Image className="w-4 h-4" /> },
    { key: "seo", label: "SEO Fields", icon: <Hash className="w-4 h-4" /> },
    { key: "history", label: "History", icon: <History className="w-4 h-4" /> },
    { key: "bulk", label: "Bulk Upload", icon: <Upload className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Product Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Product Catalog</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage your entire product catalog — create, edit, clone, archive products, and bulk upload via CSV.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => { setActiveTab("add"); toast.info("Opening add product form"); }} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Add Product</button>
              <button onClick={() => { setActiveTab("bulk"); toast.info("Opening bulk upload"); }} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Upload className="w-4 h-4" />Import</button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Download className="w-4 h-4" />Export</button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#e8e8e8] pb-2">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${activeTab === t.key ? "bg-[#0c831f] text-white shadow-sm" : "text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"}`}>{t.icon}{t.label}</button>
            ))}
          </div>
        </section>

        {activeTab === "products" && (
          <>
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                  <input type="text" placeholder="Search products by name, SKU, or barcode..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none" />
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa]"><Filter className="w-4 h-4" />Filter</button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                      {["Product", "SKU", "Category", "Price", "MRP", "Stock", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockAdminProducts.map((p) => (
                      <tr key={p.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb] transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-bold text-[#1a1a1a]">{p.name}</p>
                            <p className="text-xs text-[#999]">{p.sku}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#666] font-mono text-xs">{p.sku}</td>
                        <td className="px-4 py-3"><span className="rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#0c831f]">{p.category}</span></td>
                        <td className="px-4 py-3 font-semibold text-[#1a1a1a]">₹{p.price}</td>
                        <td className="px-4 py-3 text-[#999] line-through">₹{p.mrp}</td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold ${p.stock === 0 ? "text-red-500" : p.stock < p.lowStockThreshold ? "text-amber-500" : "text-[#0c831f]"}`}>{p.stock}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.status === "active" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fef2f2] text-red-600"}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => toast.info("Viewing product details")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f]"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => toast.info("Editing product")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f]"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => toast.info("Product cloned")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#ff4f8b]"><Copy className="w-4 h-4" /></button>
                            <button onClick={() => toast.info("Product archived")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-red-500"><Archive className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between border-t border-[#e8e8e8] px-4 py-3 bg-[#f9fafb]">
                <p className="text-xs text-[#666]">Showing 3 of 1,240 products</p>
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <button key={p} className={`rounded-lg px-3 py-1 text-xs font-semibold ${p === 1 ? "bg-[#0c831f] text-white" : "text-[#666] hover:bg-[#f0f0f0]"}`}>{p}</button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "add" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-black text-[#1a1a1a] mb-4">Add New Product</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Product Name", placeholder: "Enter product name" },
                { label: "SKU", placeholder: "Auto-generated or custom" },
                { label: "Category", type: "select", options: ["Groceries", "Fruits", "Snacks", "Health", "Dairy", "Beverages"] },
                { label: "Brand", placeholder: "Brand name" },
                { label: "Price (₹)", type: "number", placeholder: "0" },
                { label: "MRP (₹)", type: "number", placeholder: "0" },
                { label: "Tax Rate (%)", type: "number", placeholder: "5" },
                { label: "Stock Quantity", type: "number", placeholder: "0" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1.5 block text-xs font-bold text-[#666]">{f.label}</label>
                  {f.type === "select" ? (
                    <select className="w-full rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none">
                      {f.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type || "text"} placeholder={f.placeholder} className="w-full rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none" />
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold text-[#666]">Description</label>
                <textarea rows={3} placeholder="Product description" className="w-full rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => toast.success("Product created!")} className="rounded-xl bg-[#0c831f] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Save Product</button>
              <button onClick={() => toast.info("Changes discarded")} className="rounded-xl border border-[#e8e8e8] px-6 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa]">Cancel</button>
            </div>
          </section>
        )}

        {activeTab === "variants" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-[#1a1a1a]">Product Variants</h2>
              <button onClick={() => toast.info("Adding variant")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa]"><Plus className="w-4 h-4" />Add Variant</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Product", "Variant", "SKU", "Price", "Stock", "Default", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockAdminProducts.flatMap((p) => p.variants.map((v) => (
                    <tr key={v.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{p.name}</td>
                      <td className="px-4 py-3 text-[#666]">{v.name}</td>
                      <td className="px-4 py-3 text-xs font-mono text-[#666]">{v.sku}</td>
                      <td className="px-4 py-3 font-semibold">₹{v.price}</td>
                      <td className="px-4 py-3">{v.stock}</td>
                      <td className="px-4 py-3">{v.isDefault ? <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-semibold text-[#0c831f]">Default</span> : <span className="text-[#999]">—</span>}</td>
                      <td className="px-4 py-3"><button onClick={() => toast.info("Editing variant")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" /></button></td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "media" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-[#1a1a1a]">Product Media</h2>
              <button onClick={() => toast.info("Upload media dialog opened")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]"><Upload className="w-4 h-4" />Upload Media</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {mockAdminProducts.flatMap((p) => p.media.map((m) => (
                <div key={m.id} className="group relative rounded-xl border border-[#e8e8e8] overflow-hidden">
                  <div className="aspect-square bg-[#f6f7f6] flex items-center justify-center">
                    <Image className="w-8 h-8 text-[#ccc]" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => toast.info("Viewing media")} className="rounded-lg bg-white p-1.5"><Eye className="w-4 h-4 text-[#1a1a1a]" /></button>
                    <button onClick={() => toast.info("Media deleted")} className="rounded-lg bg-white p-1.5"><Trash2 className="w-4 h-4 text-red-500" /></button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-xs text-white font-semibold truncate">{m.alt}</p>
                    {m.isPrimary && <span className="text-[10px] text-[#ff4f8b] font-bold">Primary</span>}
                  </div>
                </div>
              )))}
            </div>
          </section>
        )}

        {activeTab === "seo" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-black text-[#1a1a1a] mb-4">SEO Fields</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Product", "Meta Title", "Slug", "Keywords", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockAdminProducts.map((p) => (
                    <tr key={p.seo.productId} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{p.name}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate text-xs text-[#666]">{p.seo.metaTitle}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#666]">{p.seo.slug}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {p.seo.metaKeywords.slice(0, 2).map((kw) => (
                            <span key={kw} className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[10px] text-[#666]">{kw}</span>
                          ))}
                          <span className="text-[10px] text-[#999]">+{p.seo.metaKeywords.length - 2}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><button onClick={() => toast.info("Editing SEO")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "history" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-black text-[#1a1a1a] mb-4">Product History</h2>
            <div className="space-y-3">
              {mockAdminProducts.flatMap((p) => p.history.map((h) => (
                <div key={h.id} className="flex items-start gap-3 rounded-xl border border-[#e8e8e8] p-4">
                  <div className={`rounded-full p-2 ${h.action === "created" ? "bg-[#e8f5e9]" : h.action === "price_changed" ? "bg-[#fffbeb]" : h.action === "stock_updated" ? "bg-[#eff7ff]" : h.action === "status_changed" ? "bg-[#fef2f2]" : "bg-[#f6f7f6]"}`}>
                    {h.action === "created" ? <Plus className="w-4 h-4 text-[#0c831f]" /> : h.action === "price_changed" ? <BarChart3 className="w-4 h-4 text-[#d97706]" /> : h.action === "stock_updated" ? <Copy className="w-4 h-4 text-[#0369a1]" /> : <History className="w-4 h-4 text-[#ff4f8b]" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#1a1a1a]">{h.action.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                    {h.field && <p className="text-sm text-[#666] mt-0.5">{h.field}: <span className="text-[#999] line-through">{h.oldValue}</span> → <span className="text-[#0c831f]">{h.newValue}</span></p>}
                    <p className="text-xs text-[#999] mt-1">{h.performedBy} · {h.timestamp}</p>
                  </div>
                </div>
              )))}
            </div>
          </section>
        )}

        {activeTab === "bulk" && (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-black text-[#1a1a1a] mb-4">Bulk Upload</h2>
              <div className="rounded-2xl border-2 border-dashed border-[#e8e8e8] p-8 text-center hover:border-[#0c831f] transition-colors">
                <Upload className="mx-auto w-10 h-10 text-[#ccc]" />
                <p className="mt-3 font-semibold text-[#1a1a1a]">Drop CSV or Excel file here</p>
                <p className="mt-1 text-sm text-[#666]">or click to browse (max 10MB)</p>
                <button onClick={() => toast.info("Upload dialog opened")} className="mt-4 rounded-xl bg-[#0c831f] px-6 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]">Browse Files</button>
              </div>
              <div className="mt-4 rounded-xl bg-[#f6f7f6] p-4">
                <p className="text-xs font-bold text-[#666] mb-2">Supported formats:</p>
                <div className="flex flex-wrap gap-2">
                  {[".CSV", ".XLSX", ".XLS"].map((fmt) => (
                    <span key={fmt} className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-[#666] border border-[#e8e8e8]">{fmt}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-black text-[#1a1a1a] mb-4">Upload History</h2>
              <div className="space-y-3">
                {mockBulkUploadHistory.map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] p-3">
                    <div>
                      <p className="font-semibold text-sm text-[#1a1a1a]">{b.fileName}</p>
                      <p className="text-xs text-[#666]">{b.success} success, {b.failed} failed · {b.uploadedAt}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${b.status === "completed" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fffbeb] text-[#d97706]"}`}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
