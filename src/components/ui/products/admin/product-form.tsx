"use client";

import { useState } from "react";
import { Save, Archive, Trash2, ImagePlus, Video, Copy, X, Plus, GripVertical } from "lucide-react";
import { toast } from "sonner";

export type ProductFormTab = "basic" | "media" | "seo" | "variants";

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, required, error, children }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-[#666]">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[10px] text-red-500">{error}</p>}
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#999] focus:border-[#0c831f]";
const selectClass =
  "h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none transition focus:border-[#0c831f]";
const textareaClass =
  "w-full rounded-xl border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#999] focus:border-[#0c831f]";

interface ProductFormProps {
  initialData?: {
    name: string;
    sku: string;
    barcode: string;
    category: string;
    brand: string;
    price: number;
    costPrice: number;
    mrp: number;
    taxRate: number;
    unit: string;
    weight: string;
    stock: number;
    lowStockThreshold: number;
    status: string;
    description: string;
    shortDescription: string;
    tags: string[];
    warehouse: string;
    supplier: string;
  };
  onSave?: (data: Record<string, unknown>) => void;
  onArchive?: () => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
}

export default function ProductForm({
  initialData,
  onSave,
  onArchive,
  onDelete,
  isSubmitting,
  mode = "edit",
}: ProductFormProps) {
  const [activeTab, setActiveTab] = useState<ProductFormTab>("basic");

  const tabs: { id: ProductFormTab; label: string; count?: number }[] = [
    { id: "basic", label: "Basic Info" },
    { id: "media", label: "Media" },
    { id: "seo", label: "SEO & Tags" },
    { id: "variants", label: "Variants" },
  ];

  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-5 py-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Product Management
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          {mode === "create" ? "Add New Product" : "Edit Product"}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-[#e8e8e8]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-bold transition ${
              activeTab === tab.id
                ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                : "text-[#666] hover:text-[#1a1a1a]"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f6f7f6] text-[10px] font-bold text-[#666]">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        {activeTab === "basic" && <BasicInfoTab initialData={initialData} />}
        {activeTab === "media" && <MediaTab />}
        {activeTab === "seo" && <SEOTab />}
        {activeTab === "variants" && <VariantsTab />}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-[#e8e8e8] bg-[#f9fafb] px-5 py-4">
        <div className="flex items-center gap-2">
          {mode === "edit" && onArchive && (
            <button
              onClick={onArchive}
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#f8f9fa]"
            >
              <Archive className="h-4 w-4" />
              Archive
            </button>
          )}
          {mode === "edit" && onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-2 rounded-lg border border-[#ff4f8b] bg-white px-4 py-2 text-sm font-semibold text-[#ff4f8b] transition hover:bg-[#fff0f6]"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>
        {onSave && (
          <button
            onClick={() => onSave({})}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a6a18] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : mode === "create" ? "Create Product" : "Save Product"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Basic Info Tab ────────────────────────────────────────

function BasicInfoTab({
  initialData,
}: {
  initialData?: ProductFormProps["initialData"];
}) {
  const d = initialData;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Field label="Product Name" required>
        <input defaultValue={d?.name || ""} placeholder="Enter product name" className={inputClass} />
      </Field>
      <Field label="SKU" required>
        <input defaultValue={d?.sku || ""} placeholder="e.g. PROD-SKU-001" className={inputClass} />
      </Field>
      <Field label="Barcode">
        <input defaultValue={d?.barcode || ""} placeholder="e.g. 8901234567890" className={inputClass} />
      </Field>
      <Field label="Category" required>
        <select defaultValue={d?.category || ""} className={selectClass}>
          <option value="">Select Category</option>
          {["Groceries","Fruits","Vegetables","Dairy","Beverages","Snacks","Health","Personal Care","Home Care","Baby Care"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Brand" required>
        <input defaultValue={d?.brand || ""} placeholder="Enter brand name" className={inputClass} />
      </Field>
      <Field label="Unit">
        <select defaultValue={d?.unit || "piece"} className={selectClass}>
          {["piece","kg","g","litre","ml","bottle","pack","box","tub","bar"].map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </Field>
      <Field label="Weight / Volume">
        <input defaultValue={d?.weight || ""} placeholder="e.g. 1 kg, 500 ml" className={inputClass} />
      </Field>
      <Field label="Selling Price (₹)" required>
        <input defaultValue={d?.price || ""} type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} />
      </Field>
      <Field label="MRP (₹)">
        <input defaultValue={d?.mrp || ""} type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} />
      </Field>
      <Field label="Cost Price (₹)">
        <input defaultValue={d?.costPrice || ""} type="number" min="0" step="0.01" placeholder="0.00" className={inputClass} />
      </Field>
      <Field label="Tax Rate (%)">
        <input defaultValue={d?.taxRate ?? 5} type="number" min="0" max="100" placeholder="5" className={inputClass} />
      </Field>
      <Field label="Stock Quantity" required>
        <input defaultValue={d?.stock ?? 0} type="number" min="0" placeholder="0" className={inputClass} />
      </Field>
      <Field label="Low Stock Threshold">
        <input defaultValue={d?.lowStockThreshold ?? 10} type="number" min="0" placeholder="10" className={inputClass} />
      </Field>
      <Field label="Warehouse">
        <select defaultValue={d?.warehouse || ""} className={selectClass}>
          <option value="">Select Warehouse</option>
          {["Mumbai Hub","Delhi Central","Pune Cold Storage","Bangalore Cold Room","Hyderabad Depot"].map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </Field>
      <Field label="Supplier">
        <input defaultValue={d?.supplier || ""} placeholder="Supplier name" className={inputClass} />
      </Field>
      <Field label="Status">
        <select defaultValue={d?.status || "draft"} className={selectClass}>
          {["draft","active","inactive","archived"].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </Field>
      <div className="md:col-span-2 lg:col-span-3">
        <Field label="Short Description">
          <textarea defaultValue={d?.shortDescription || ""} rows={2} placeholder="Brief product description (max 300 chars)" className={textareaClass} maxLength={300} />
        </Field>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <Field label="Full Description">
          <textarea defaultValue={d?.description || ""} rows={4} placeholder="Detailed product description" className={textareaClass} />
        </Field>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <Field label="Tags">
          <div className="flex flex-wrap gap-1.5 rounded-xl border border-[#e8e8e8] bg-white p-2">
            {(d?.tags || []).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2.5 py-1 text-xs font-medium text-[#0c831f]">
                {tag}
                <button className="text-[#0c831f]/60 hover:text-[#dc2626]"><X className="h-3 w-3" /></button>
              </span>
            ))}
            <input placeholder="Add tag..." className="flex-1 border-0 bg-transparent px-1 py-1 text-xs outline-none placeholder:text-[#999] min-w-[80px]" />
          </div>
        </Field>
      </div>
    </div>
  );
}

// ── Media Tab ──────────────────────────────────────────────

function MediaTab() {
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-xs font-bold text-[#666]">Product Images (Max 5)</label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6] transition-all hover:border-[#0c831f]"
            >
              <div className="flex h-full items-center justify-center">
                <ImagePlus className="h-8 w-8 text-[#ccc] transition-all group-hover:scale-110 group-hover:text-[#0c831f]" />
              </div>
              {i === 1 && (
                <span className="absolute left-2 top-2 rounded-full bg-[#0c831f] px-2 py-0.5 text-[8px] font-bold text-white">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-[#999]">Supports JPG, PNG, WebP. Max 10MB each. First image is primary.</p>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-[#666]">Product Video (Optional)</label>
        <div className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6] p-8 transition-all hover:border-[#0c831f]">
          <div className="text-center">
            <Video className="mx-auto h-8 w-8 text-[#ccc]" />
            <p className="mt-2 text-xs text-[#666]">Click to upload video</p>
            <p className="text-[10px] text-[#999]">MP4, WebM. Max 50MB.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-[#666]">Documents (Spec Sheets, Manuals)</label>
        <div className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6] p-6 transition-all hover:border-[#0c831f]">
          <div className="text-center">
            <Plus className="mx-auto h-6 w-6 text-[#ccc]" />
            <p className="mt-1 text-xs text-[#666]">Upload PDF documents</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SEO Tab ────────────────────────────────────────────────

function SEOTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Meta Title" error="Recommended: 50-60 characters">
          <input placeholder="Enter SEO title" className={inputClass} maxLength={70} />
        </Field>
        <Field label="URL Slug">
          <input placeholder="product-url-slug" className={inputClass} />
        </Field>
        <Field label="Canonical URL">
          <input placeholder="https://..." className={inputClass} />
        </Field>
        <Field label="OG Image URL">
          <input placeholder="https://images.example.com/og-image.jpg" className={inputClass} />
        </Field>
      </div>
      <Field label="Meta Description" error="Recommended: 150-160 characters">
        <textarea
          rows={3}
          placeholder="Enter meta description for search engines"
          className={textareaClass}
          maxLength={160}
        />
      </Field>
      <Field label="Meta Keywords">
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-[#e8e8e8] bg-white p-2">
          {["organic", "natural", "healthy", "premium"].map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1 rounded-full bg-[#f6f7f6] px-2.5 py-1 text-xs font-medium text-[#666]">
              {kw}
              <button className="text-[#999] hover:text-[#dc2626]"><X className="h-3 w-3" /></button>
            </span>
          ))}
          <input placeholder="Add keyword..." className="flex-1 border-0 bg-transparent px-1 py-1 text-xs outline-none placeholder:text-[#999] min-w-[80px]" />
        </div>
      </Field>
    </div>
  );
}

// ── Variants Tab ─────────────────────────────────────────

function VariantsTab() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-[#e8e8e8]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
              <th className="w-8 px-3 py-3"></th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">SKU</th>
              <th className="px-3 py-3">Price (₹)</th>
              <th className="px-3 py-3">Stock</th>
              <th className="px-3 py-3">Weight</th>
              <th className="px-3 py-3">Default</th>
              <th className="w-16 px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e8e8]">
            {[
              { name: "1 kg", sku: "RICE-BAS-001A", price: 109, stock: 200, weight: "1 kg", default: false },
              { name: "5 kg", sku: "RICE-BAS-001B", price: 499, stock: 120, weight: "5 kg", default: true },
              { name: "10 kg", sku: "RICE-BAS-001C", price: 949, stock: 50, weight: "10 kg", default: false },
            ].map((v, i) => (
              <tr key={i} className="text-sm transition hover:bg-[#f9fafb]">
                <td className="px-3 py-2">
                  <GripVertical className="h-4 w-4 cursor-grab text-[#ccc]" />
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={v.name} className="h-8 w-24 rounded-lg border border-[#e8e8e8] bg-white px-2 text-xs outline-none focus:border-[#0c831f]" />
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={v.sku} className="h-8 w-28 rounded-lg border border-[#e8e8e8] bg-white px-2 text-xs outline-none focus:border-[#0c831f]" />
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={v.price} type="number" className="h-8 w-20 rounded-lg border border-[#e8e8e8] bg-white px-2 text-xs outline-none focus:border-[#0c831f]" />
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={v.stock} type="number" className="h-8 w-16 rounded-lg border border-[#e8e8e8] bg-white px-2 text-xs outline-none focus:border-[#0c831f]" />
                </td>
                <td className="px-3 py-2">
                  <input defaultValue={v.weight} className="h-8 w-20 rounded-lg border border-[#e8e8e8] bg-white px-2 text-xs outline-none focus:border-[#0c831f]" />
                </td>
                <td className="px-3 py-2 text-center">
                  <input type="radio" name="defaultVariant" defaultChecked={v.default} className="h-4 w-4 accent-[#0c831f]" />
                </td>
                <td className="px-3 py-2">
                  <button className="rounded-lg p-1 text-[#999] hover:bg-[#fef2f2] hover:text-[#dc2626]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="flex items-center gap-2 rounded-lg border border-dashed border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#666] transition-all hover:border-[#0c831f] hover:text-[#0c831f]">
        <Copy className="h-4 w-4" />
        Add Variant
      </button>
    </div>
  );
}
