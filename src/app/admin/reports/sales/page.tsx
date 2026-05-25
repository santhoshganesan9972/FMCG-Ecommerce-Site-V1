"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { BarChart3, Download, Eye, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const salesReports = [
  { id: "SR-001", title: "Daily Sales Summary", period: "2026-05-21", orders: 1245, revenue: "₹10,45,800", returns: 28, status: "ready", generatedAt: "2026-05-21 23:59", format: "xlsx" },
  { id: "SR-002", title: "Weekly Sales Report (May 15-21)", period: "May 15-21", orders: 8450, revenue: "₹71,23,500", returns: 195, status: "ready", generatedAt: "2026-05-22 06:00", format: "xlsx" },
  { id: "SR-003", title: "Monthly Sales - May 2026 (MTD)", period: "May 2026", orders: 32450, revenue: "₹1.24Cr", returns: 745, status: "ready", generatedAt: "2026-05-22 06:00", format: "xlsx" },
  { id: "SR-004", title: "Sales by Category - May 2026", period: "May 2026", orders: 32450, revenue: "₹1.24Cr", returns: 745, status: "ready", generatedAt: "2026-05-22 06:00", format: "pdf" },
  { id: "SR-005", title: "Hourly Sales Trend", period: "2026-05-21", orders: 1245, revenue: "₹10,45,800", returns: 28, status: "generating", generatedAt: "—", format: "pdf" },
];

export default function SalesReportsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Reports</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Sales Reports</h1>
              <p className="mt-2 text-sm text-[#666]">Daily, weekly, and monthly sales performance reports with revenue breakdowns.</p>
            </div>
            <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Revenue (MTD)" value="₹1.24Cr" icon={<TrendingUp className="h-5 w-5" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Total Orders (MTD)" value="32,450" icon={<BarChart3 className="h-5 w-5" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Avg Order Value" value="₹847" icon={<TrendingUp className="h-5 w-5" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Reports Available" value={salesReports.length} icon={<BarChart3 className="h-5 w-5" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableTable
          data={salesReports.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(r) => r.id}
          page={page}
          pageSize={pageSize}
          total={salesReports.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "title", header: "Report", sortable: true, render: (r) => <span className="font-bold text-[#1a1a1a]">{r.title}</span> },
            { key: "period", header: "Period", width: "120px" },
            { key: "orders", header: "Orders", width: "80px", align: "right" },
            { key: "revenue", header: "Revenue", width: "100px", align: "right", render: (r) => <span className="font-bold">{r.revenue}</span> },
            { key: "format", header: "Format", width: "80px", render: (r) => <span className="font-bold uppercase">{r.format}</span> },
            { key: "status", header: "Status", width: "100px", render: (r) => <StatusBadge status={r.status} /> },
          ]}
          actions={[
            { label: "Download", icon: <Download className="h-3.5 w-3.5" />, onClick: (r) => toast.success(`Downloading ${r.title}`) },
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (r) => toast.info(`Viewing ${r.title}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
