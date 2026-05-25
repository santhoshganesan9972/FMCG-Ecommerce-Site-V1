"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { BarChart3, FileText, Download, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  type: string;
  dateRange: string;
  format: string;
  size: string;
  status: string;
  generatedAt: string;
}

const mockReports: Report[] = [
  { id: "RPT-001", title: "Monthly Sales Report - May 2026", type: "sales", dateRange: "May 2026", format: "xlsx", size: "2.4 MB", status: "ready", generatedAt: "2026-05-21" },
  { id: "RPT-002", title: "Inventory Summary - Q2 2026", type: "inventory", dateRange: "Apr-Jun 2026", format: "xlsx", size: "1.8 MB", status: "ready", generatedAt: "2026-05-20" },
  { id: "RPT-003", title: "Vendor Payout Report - April", type: "vendor", dateRange: "Apr 2026", format: "pdf", size: "856 KB", status: "ready", generatedAt: "2026-05-15" },
  { id: "RPT-004", title: "GST Filing Data - April 2026", type: "tax", dateRange: "Apr 2026", format: "xlsx", size: "3.2 MB", status: "ready", generatedAt: "2026-05-10" },
  { id: "RPT-005", title: "Weekly Sales Snapshot (May 18-24)", type: "sales", dateRange: "May 18-24 2026", format: "pdf", size: "412 KB", status: "generating", generatedAt: "2026-05-24" },
  { id: "RPT-006", title: "Q1 2026 Financial Summary", type: "tax", dateRange: "Jan-Mar 2026", format: "pdf", size: "1.2 MB", status: "ready", generatedAt: "2026-04-05" },
];

const salesSummary = [
  { label: "Total Sales (MTD)", value: "₹1.24Cr", change: "+12.5%", trend: "up" },
  { label: "Avg Daily Sales", value: "₹4.15L", change: "+8.3%", trend: "up" },
  { label: "Total Orders (MTD)", value: "32,450", change: "+10.1%", trend: "up" },
  { label: "Avg Order Value", value: "₹847", change: "+6.8%", trend: "up" },
  { label: "Return Rate", value: "2.3%", change: "-0.5%", trend: "down" },
  { label: "Cancel Rate", value: "1.8%", change: "-0.3%", trend: "down" },
];

export default function ReportsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = typeFilter === "all" ? mockReports : mockReports.filter((r) => r.type === typeFilter);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Reports</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Analytics & Reports</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Generate and download sales, inventory, vendor, and tax reports for your business.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Reports</option>
                <option value="sales">Sales</option>
                <option value="inventory">Inventory</option>
                <option value="vendor">Vendor</option>
                <option value="tax">Tax</option>
              </select>
              <button className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
                <BarChart3 className="h-4 w-4" />
                Generate Report
              </button>
            </div>
          </div>
        </section>

        {/* Sales Summary */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {salesSummary.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wide text-[#666]">{s.label}</span>
                {s.trend === "up" ? <TrendingUp className="h-3.5 w-3.5 text-[#0c831f]" /> : <TrendingDown className="h-3.5 w-3.5 text-[#ff4f8b]" />}
              </div>
              <p className="mt-1.5 text-lg font-black text-[#1a1a1a]">{s.value}</p>
              <span className={`text-[10px] font-bold ${s.trend === "up" ? "text-[#0c831f]" : "text-[#ff4f8b]"}`}>{s.change}</span>
            </div>
          ))}
        </div>

        {/* Report Table */}
        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(r) => r.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "title", header: "Report", sortable: true, render: (r) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eff6ff]">
                  <FileText className="h-4 w-4 text-[#2563eb]" />
                </div>
                <div><span className="font-bold text-[#1a1a1a]">{r.title}</span><span className="block text-[10px] text-[#999]">{r.id}</span></div>
              </div>
            )},
            { key: "type", header: "Type", width: "100px", render: (r) => <StatusBadge status={r.type} /> },
            { key: "dateRange", header: "Period", width: "140px", hideOnMobile: true },
            { key: "format", header: "Format", width: "80px", render: (r) => <span className="font-bold uppercase text-[#666]">{r.format}</span> },
            { key: "size", header: "Size", width: "80px", align: "right", hideOnMobile: true },
            { key: "status", header: "Status", width: "110px", render: (r) => <StatusBadge status={r.status} /> },
            { key: "generatedAt", header: "Generated", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Download", icon: <Download className="h-3.5 w-3.5" />, onClick: (r) => toast.success(`Downloading ${r.title}`), variant: "success" },
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (r) => toast.info(`Viewing ${r.title}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
