"use client";

import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader } from "@/components/reusable/reusable-components";
import { mockAdminProducts } from "@/data/admin/products";
import { Image, Trash2, Eye, Upload } from "lucide-react";
import { toast } from "sonner";

export default function ProductMediaPage() {
  const allMedia = mockAdminProducts.flatMap((p) =>
    p.media.map((m) => ({ ...m, productName: p.name }))
  );

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="Product Media"
          subtitle="Manage images, videos, and documents for all your products."
          breadcrumb="PRODUCT MANAGEMENT"
          actions={
            <button className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors">
              <Upload className="w-4 h-4" />
              Upload Media
            </button>
          }
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {allMedia.map((m) => (
            <div key={m.id} className="group relative rounded-xl border border-[#e8e8e8] bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-square bg-[#f6f7f6] flex items-center justify-center">
                <Image className="w-10 h-10 text-[#ddd]" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => toast.info("Viewing media")} className="rounded-lg bg-white p-2 hover:bg-[#f0f0f0] transition-colors">
                  <Eye className="w-4 h-4 text-[#1a1a1a]" />
                </button>
                <button onClick={() => toast.info("Media deleted")} className="rounded-lg bg-white p-2 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              {m.isPrimary && (
                <div className="absolute top-2 left-2 rounded-full bg-[#0c831f] px-2 py-0.5 text-[10px] font-bold text-white">
                  Primary
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2.5">
                <p className="text-xs text-white font-semibold truncate">{m.alt}</p>
                <p className="text-[10px] text-white/70 truncate">{m.productName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
