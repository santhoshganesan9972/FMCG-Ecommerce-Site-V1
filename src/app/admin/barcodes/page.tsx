"use client";

import DashboardLayout from "../dashboard-layout";
import { mockBarcodes } from "@/data/admin/misc";
import { Barcode, Scan, Plus, Search, Edit3 } from "lucide-react";
import { toast } from "sonner";

export default function BarcodesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Barcode Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Barcode Scanner & Mapping</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Scan, map, and manage barcodes for all products. Ensure accurate inventory tracking.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toast.info("Opening barcode scanner")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Scan className="w-4 h-4" />Scan Barcode</button>
              <button onClick={() => toast.info("Opening add barcode form")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Plus className="w-4 h-4" />Add Mapping</button>
            </div>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search by barcode, product name, or SKU..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" />
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["Barcode", "Product", "SKU", "Variant", "MRP", "Status", "Last Scanned", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockBarcodes.map((b) => (
                  <tr key={b.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Barcode className="w-5 h-5 text-[#666]" />
                        <span className="font-mono text-xs text-[#1a1a1a]">{b.barcode}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{b.productName}</td>
                    <td className="px-4 py-3 text-xs font-mono text-[#666]">{b.sku}</td>
                    <td className="px-4 py-3 text-[#666]">{b.variant}</td>
                    <td className="px-4 py-3 font-semibold">₹{b.mrp}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${b.status === "active" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f6f7f6] text-[#999]"}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{b.lastScanned || "Never"}</td>
                    <td className="px-4 py-3"><button onClick={() => toast.info("Editing barcode mapping")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
