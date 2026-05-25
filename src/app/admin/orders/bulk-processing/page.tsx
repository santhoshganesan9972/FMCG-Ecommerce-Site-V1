"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Layers, CheckCircle, XCircle, Clock, Eye, Download } from "lucide-react";
import { toast } from "sonner";

const bulkOrders = [
  { id: "BULK-001", date: "2026-05-21", type: "Status Update", count: 12, success: 10, failed: 2, status: "completed", processedBy: "Super Admin" },
  { id: "BULK-002", date: "2026-05-20", type: "Assign Partners", count: 8, success: 8, failed: 0, status: "completed", processedBy: "Rohit Sharma" },
  { id: "BULK-003", date: "2026-05-19", type: "Bulk Cancel", count: 5, success: 3, failed: 2, status: "partial", processedBy: "Priya Patel" },
  { id: "BULK-004", date: "2026-05-18", type: "Bulk Status Update", count: 25, success: 25, failed: 0, status: "completed", processedBy: "Super Admin" },
  { id: "BULK-005", date: "2026-05-21", type: "Bulk Assign", count: 15, status: "processing", processedBy: "System" },
];

export default function BulkProcessingPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showProcessModal, setShowProcessModal] = useState(false);

  const filtered = bulkOrders.filter(b => !search || b.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Bulk Processing</h1>
              <p className="mt-2 text-sm text-[#666]">Process multiple orders at once — status updates, partner assignments, and cancellations.</p>
            </div>
            <button onClick={() => setShowProcessModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Layers className="h-4 w-4" /> New Bulk Action
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Batches" value={bulkOrders.length} icon={<Layers className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Completed" value={bulkOrders.filter(b => b.status === "completed").length} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Processing" value={bulkOrders.filter(b => b.status === "processing").length} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Total Orders Processed" value={bulkOrders.reduce((s, b) => s + (b.count || 0), 0)} icon={<Download className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search bulk actions..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(b) => b.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "id", header: "Batch ID", width: "100px", render: (b) => <span className="font-bold text-[#0c831f]">{b.id}</span> },
            { key: "type", header: "Action", sortable: true },
            { key: "count", header: "Orders", width: "80px", align: "center" },
            { key: "success", header: "Success", width: "80px", align: "center", render: (b) => <span className="text-[#0c831f] font-bold">{b.success ?? "—"}</span> },
            { key: "failed", header: "Failed", width: "70px", align: "center", render: (b) => <span className="text-[#dc2626] font-bold">{b.failed ?? "—"}</span> },
            { key: "status", header: "Status", width: "110px", render: (b) => <StatusBadge status={b.status} /> },
            { key: "date", header: "Date", width: "110px", hideOnMobile: true },
            { key: "processedBy", header: "By", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View Details", icon: <Eye className="h-3.5 w-3.5" />, onClick: (b) => toast.info(`Viewing batch ${b.id}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
