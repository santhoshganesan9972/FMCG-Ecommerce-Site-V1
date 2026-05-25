"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Layers, CheckCircle, XCircle, Clock, Eye, RefreshCw, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useBulkJobs } from "@/hooks/use-orders";
import type { BulkJob } from "@/types/orders";

export default function BulkProcessingPage() {
  const {
    jobs, loading, error, search, setSearch,
    processing, pagination,
    setPage, setPageSize, fetchJobs, createBulkAction,
  } = useBulkJobs();
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [actionType, setActionType] = useState("status_update");

  const totalCompleted = jobs.filter((j) => j.status === "completed").length;
  const totalProcessing = jobs.filter((j) => j.status === "processing" || j.status === "pending").length;
  const totalOrdersProcessed = jobs.reduce((s, j) => s + (j.count || 0), 0);

  const handleCreateAction = async () => {
    // In real usage, user would select order IDs from a multi-select
    const mockOrderIds = ["ORD-001", "ORD-002", "ORD-005", "ORD-009", "ORD-010"];
    const success = await createBulkAction(actionType, mockOrderIds, "preparing");
    if (success) {
      toast.success(`Bulk action "${actionType.replace(/_/g, " ")}" created`);
      setShowProcessModal(false);
    } else {
      toast.error("Failed to create bulk action");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Bulk Processing</h1>
              <p className="mt-2 text-sm text-[#666]">
                Process multiple orders at once — status updates, partner assignments, and cancellations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchJobs} className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              <button
                onClick={() => setShowProcessModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]"
              >
                <Layers className="h-4 w-4" /> New Bulk Action
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Batches" value={jobs.length} icon={<Layers className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Completed" value={totalCompleted} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Processing" value={totalProcessing} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Total Orders Processed" value={totalOrdersProcessed} icon={<Upload className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search bulk actions..." />

        <ReusableTable
          data={jobs}
          keyExtractor={(b: BulkJob) => b.id}
          isLoading={loading}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          columns={[
            { key: "id", header: "Batch ID", width: "100px", render: (b) => <span className="font-bold text-[#0c831f]">{(b as BulkJob).id}</span> },
            { key: "type", header: "Action", sortable: true },
            { key: "count", header: "Orders", width: "80px", align: "center" },
            { key: "success", header: "Success", width: "80px", align: "center", render: (b) => <span className="text-[#0c831f] font-bold">{(b as BulkJob).success ?? "—"}</span> },
            { key: "failed", header: "Failed", width: "70px", align: "center", render: (b) => <span className="text-[#dc2626] font-bold">{(b as BulkJob).failed ?? "—"}</span> },
            { key: "status", header: "Status", width: "110px", render: (b) => <StatusBadge status={(b as BulkJob).status} /> },
            { key: "date", header: "Date", width: "110px", hideOnMobile: true },
            { key: "processedBy", header: "By", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View Details", icon: <Eye className="h-3.5 w-3.5" />, onClick: (b: BulkJob) => toast.info(`Viewing batch ${b.id}`) },
          ]}
        />

        {error && (
          <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-4">
            <p className="text-sm font-bold text-[#dc2626]">{error}</p>
          </div>
        )}
      </div>

      {/* New Bulk Action Modal */}
      <ReusableModal open={showProcessModal} onClose={() => setShowProcessModal(false)} title="New Bulk Action" subtitle="Process multiple orders at once" size="md">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#666]">Action Type</label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] outline-none focus:border-[#0c831f]/50"
            >
              <option value="status_update">Status Update → Preparing</option>
              <option value="assign_partners">Assign Partners (Auto)</option>
              <option value="bulk_cancel">Bulk Cancel</option>
            </select>
          </div>

          <div className="rounded-xl bg-[#f9fafb] p-3">
            <p className="text-xs font-bold text-[#666]">Sample Selection</p>
            <p className="mt-1 text-xs text-[#999]">
              In production, select orders from the table above. For now, 5 sample orders will be processed.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e8e8]">
            <button
              onClick={() => setShowProcessModal(false)}
              className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAction}
              disabled={processing}
              className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50"
            >
              {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layers className="h-4 w-4" />}
              {processing ? "Processing..." : "Execute Action"}
            </button>
          </div>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
