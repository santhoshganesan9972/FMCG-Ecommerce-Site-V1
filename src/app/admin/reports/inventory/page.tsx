"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Download, Eye, Boxes, Package, AlertTriangle, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const invReports = [
  { id: "IR-001", title: "Inventory Summary - All Warehouses", period: "Q2 2026", totalItems: 4580, lowStock: 12, outOfStock: 2, status: "ready", format: "xlsx", size: "1.8 MB" },
  { id: "IR-002", title: "Stock Movement Report", period: "May 2026", totalItems: 3200, lowStock: 8, outOfStock: 1, status: "ready", format: "xlsx", size: "2.1 MB" },
  { id: "IR-003", title: "Slow Moving Inventory", period: "Q1-Q2 2026", totalItems: 1240, lowStock: 45, outOfStock: 0, status: "ready", format: "pdf", size: "856 KB" },
  { id: "IR-004", title: "Warehouse Stock Reconciliation", period: "May 2026", totalItems: 4580, lowStock: 12, outOfStock: 2, status: "generating", format: "xlsx", size: "—" },
  { id: "IR-005", title: "Expiring Stock Report (Next 30 Days)", period: "May-Jun 2026", totalItems: 240, lowStock: 0, outOfStock: 0, status: "ready", format: "pdf", size: "412 KB" },
];

export default function InventoryReportsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Reports</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Inventory Reports</h1>
          <p className="mt-2 text-sm text-[#666]">Stock summaries, movement reports, and inventory health analysis.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Reports" value={invReports.length} icon={<Boxes className="h-5 w-5" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Low Stock Items" value={invReports.reduce((s, r) => s + r.lowStock, 0)} icon={<AlertTriangle className="h-5 w-5" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Out of Stock" value={invReports.reduce((s, r) => s + r.outOfStock, 0)} icon={<Package className="h-5 w-5" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
          <ReusableCard title="Total SKUs Tracked" value={invReports[0]?.totalItems.toLocaleString()} icon={<Boxes className="h-5 w-5" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
        </div>

        <ReusableTable
          data={invReports.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(r) => r.id}
          page={page}
          pageSize={pageSize}
          total={invReports.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "title", header: "Report", sortable: true, render: (r) => <span className="font-bold text-[#1a1a1a]">{r.title}</span> },
            { key: "period", header: "Period", width: "100px" },
            { key: "totalItems", header: "SKUs", width: "70px", align: "right" },
            { key: "format", header: "Format", width: "70px", render: (r) => <span className="font-bold uppercase">{r.format}</span> },
            { key: "size", header: "Size", width: "80px", align: "right" },
            { key: "status", header: "Status", width: "100px", render: (r) => <StatusBadge status={r.status} /> },
          ]}
          actions={[
            { label: "Download", icon: <Download className="h-3.5 w-3.5" />, onClick: (r) => toast.success(`Downloading ${r.title}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
