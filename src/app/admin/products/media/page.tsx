"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Image, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

export default function MediaPage() {
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">Product Media</h1>
          <p className="mt-2 text-sm text-[#666]">Upload and manage product images, videos, and documents.</p>
        </section>
        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search by product name or SKU..." />
        <div className="rounded-2xl border-2 border-dashed border-[#d0d0d0] p-12 text-center hover:border-[#0c831f]/40 transition-all cursor-pointer" onClick={() => toast.success("Upload dialog opened")}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9]">
            <Plus className="h-6 w-6 text-[#0c831f]" />
          </div>
          <p className="mt-4 text-sm font-bold text-[#1a1a1a]">Upload Product Media</p>
          <p className="mt-1 text-xs text-[#999]">Drag & drop images or click to browse. Supports JPG, PNG, WebP up to 10MB each.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            { name: "Organic Basmati Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop", primary: true },
            { name: "Fresh Red Apples", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200&h=200&fit=crop", primary: false },
            { name: "Full Cream Milk 1L", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop", primary: true },
            { name: "Greek Yogurt 400g", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop", primary: false },
            { name: "Cold Brew Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop", primary: true },
            { name: "Green Tea Pack", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop", primary: false },
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl border border-[#e8e8e8] bg-white transition-all hover:shadow-sm">
              <div className="aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              {item.primary && <span className="absolute left-2 top-2 rounded-full bg-[#0c831f] px-2 py-0.5 text-[8px] font-bold text-white">Primary</span>}
              <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-[#dc2626] opacity-0 transition-all group-hover:opacity-100 hover:bg-[#fef2f2]">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <div className="p-2">
                <p className="truncate text-xs font-bold text-[#1a1a1a]">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
