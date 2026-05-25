"use client";

import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader, ReusableStatusBadge } from "@/components/reusable/reusable-components";
import { Upload, Download, FileText, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { mockBulkUploadHistory } from "@/data/admin/products";

export default function BulkImportPage() {
  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="Bulk Import"
          subtitle="Import products in bulk using CSV or Excel files. Download the template to get started."
          breadcrumb="PRODUCT MANAGEMENT"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2 rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-[#1a1a1a] mb-4">Upload File</h3>

            <div className="rounded-2xl border-2 border-dashed border-[#e8e8e8] bg-[#f9fafb] p-10 text-center hover:border-[#0c831f] transition-colors cursor-pointer group">
              <Upload className="mx-auto w-12 h-12 text-[#ccc] group-hover:text-[#0c831f] transition-colors" />
              <p className="mt-4 font-bold text-[#1a1a1a]">Drop your file here</p>
              <p className="mt-1 text-sm text-[#666]">or click to browse (supported: CSV, XLSX, XLS)</p>
              <button
                onClick={() => toast.info("File browser opened")}
                className="mt-4 rounded-xl bg-[#0c831f] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors"
              >
                Browse Files
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#999]">
                <span>Max file size: 10MB</span>
                <span>·</span>
                <span>Max rows: 10,000</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-5 rounded-xl bg-[#f0fdf4] border border-[#0c831f]/20 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#0c831f] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#0c831f]">Import Guidelines</p>
                  <ul className="mt-1.5 text-xs text-[#666] space-y-1">
                    <li>• Download the template to ensure correct column formatting</li>
                    <li>• First row must contain column headers matching the template</li>
                    <li>• Required columns: name, sku, category, price, stock</li>
                    <li>• Duplicate SKUs will be flagged as errors</li>
                    <li>• Processing time depends on file size (avg 2-5 min for 1,000 rows)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Template & Tips */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <h4 className="text-sm font-black text-[#1a1a1a] mb-3">Download Template</h4>
              <div className="space-y-2">
                <button
                  onClick={() => toast.success("Template downloaded")}
                  className="flex w-full items-center gap-3 rounded-xl border border-[#e8e8e8] p-3 hover:bg-[#f6f7f6] transition-colors"
                >
                  <FileText className="w-5 h-5 text-[#0c831f]" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#1a1a1a]">Product Import Template</p>
                    <p className="text-[10px] text-[#999]">CSV · 15 columns</p>
                  </div>
                  <Download className="w-4 h-4 text-[#999] ml-auto" />
                </button>
                <button
                  onClick={() => toast.success("Sample data downloaded")}
                  className="flex w-full items-center gap-3 rounded-xl border border-[#e8e8e8] p-3 hover:bg-[#f6f7f6] transition-colors"
                >
                  <FileText className="w-5 h-5 text-[#ff4f8b]" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#1a1a1a]">Sample Data</p>
                    <p className="text-[10px] text-[#999]">XLSX · 50 sample rows</p>
                  </div>
                  <Download className="w-4 h-4 text-[#999] ml-auto" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <h4 className="text-sm font-black text-[#1a1a1a] mb-3">Supported Columns</h4>
              <div className="space-y-1.5">
                {[
                  { name: "name", required: true },
                  { name: "sku", required: true },
                  { name: "category", required: true },
                  { name: "price", required: true },
                  { name: "stock", required: true },
                  { name: "description", required: false },
                  { name: "brand", required: false },
                  { name: "mrp", required: false },
                  { name: "tax_rate", required: false },
                  { name: "weight", required: false },
                  { name: "tags", required: false },
                  { name: "status", required: false },
                ].map((col) => (
                  <div key={col.name} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#666]">{col.name}</span>
                    {col.required ? (
                      <span className="text-red-500 font-bold">*</span>
                    ) : (
                      <span className="text-[#999]">optional</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upload History */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e8e8e8]">
            <h3 className="text-lg font-black text-[#1a1a1a]">Upload History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["File", "Rows", "Success", "Failed", "Status", "Uploaded By", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockBulkUploadHistory.map((b) => (
                  <tr key={b.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3 font-semibold text-sm text-[#1a1a1a]">{b.fileName}</td>
                    <td className="px-4 py-3 text-sm">{b.rows}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm text-[#0c831f]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {b.success}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {b.failed > 0 ? (
                        <span className="flex items-center gap-1 text-sm text-red-500">
                          <XCircle className="w-3.5 h-3.5" />
                          {b.failed}
                        </span>
                      ) : (
                        <span className="text-sm text-[#999]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <ReusableStatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#666]">{b.uploadedBy}</td>
                    <td className="px-4 py-3 text-sm text-[#999]">{b.uploadedAt}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toast.info("Viewing upload details")} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0c831f] hover:bg-[#e8f5e9] transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
