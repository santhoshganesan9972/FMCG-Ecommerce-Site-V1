"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Upload, Download, FileSpreadsheet, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function BulkImportPage() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">Bulk Import</h1>
          <p className="mt-2 text-sm text-[#666]">Import products in bulk using CSV or Excel files. Download the template to get started.</p>
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Upload */}
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-black text-[#1a1a1a]">Upload File</h3>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); toast.success("File uploaded! Starting import..."); }}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                dragOver ? "border-[#0c831f] bg-[#e8f5e9]" : "border-[#d0d0d0] hover:border-[#0c831f]/40"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Upload className="h-6 w-6 text-[#0c831f]" />
              </div>
              <p className="mt-4 text-sm font-bold text-[#1a1a1a]">Drop your file here</p>
              <p className="mt-1 text-xs text-[#999]">or click to browse · Supports .csv, .xlsx, .xls</p>
            </div>
            <button className="mt-4 w-full rounded-xl bg-[#0c831f] py-3 text-sm font-bold text-white hover:bg-[#0a6a18]">
              Start Import
            </button>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-sm font-black text-[#1a1a1a]">Instructions</h3>
              <div className="space-y-3">
                {[
                  { icon: Download, text: "Download the template file below", color: "text-[#2563eb]" },
                  { icon: FileSpreadsheet, text: "Fill in product details (name, SKU, price, stock, etc.)", color: "text-[#0c831f]" },
                  { icon: AlertTriangle, text: "Ensure SKUs are unique and required fields are filled", color: "text-[#d97706]" },
                  { icon: CheckCircle, text: "Upload the completed file and review the preview", color: "text-[#9333ea]" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f6f7f6]">
                      <step.icon className={`h-4 w-4 ${step.color}`} />
                    </div>
                    <span className="text-sm text-[#666]">{step.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => toast.success("Downloading template...")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e8e8e8] bg-white py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
                <Download className="h-4 w-4" />
                Download Template (.xlsx)
              </button>
            </div>

            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-sm font-black text-[#1a1a1a]">Recent Imports</h3>
              <div className="space-y-2">
                {[
                  { file: "products_may2026.xlsx", status: "completed", rows: 45, date: "2026-05-20" },
                  { file: "inventory_update.csv", status: "completed", rows: 120, date: "2026-05-18" },
                  { file: "new_arrivals.xlsx", status: "failed", rows: 12, date: "2026-05-15", error: "Invalid SKU format" },
                ].map((imp) => (
                  <div key={imp.file} className="flex items-center justify-between rounded-xl bg-[#f9fafb] p-3">
                    <div>
                      <p className="text-sm font-bold text-[#1a1a1a]">{imp.file}</p>
                      <p className="text-xs text-[#999]">{imp.rows} rows · {imp.date}</p>
                    </div>
                    <span className={`text-xs font-bold ${imp.status === "completed" ? "text-[#0c831f]" : "text-[#dc2626]"}`}>
                      {imp.status === "completed" ? "✓ Completed" : "✗ Failed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
