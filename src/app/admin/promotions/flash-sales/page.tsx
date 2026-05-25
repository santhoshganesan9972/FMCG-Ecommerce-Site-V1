"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { useFlashSales } from "@/hooks/use-promotions";
import { Zap, Plus, Edit3, Clock } from "lucide-react";
import { toast } from "sonner";

export default function FlashSalesPage() {
  const { flashSales, summary, pagination, loading, error, fetchFlashSales, setPage, setPageSize } = useFlashSales();
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = flashSales.filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Promotions</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Flash Sales</h1>
              <p className="mt-2 text-sm text-[#666]">Time-bound flash sales with countdown timers and limited inventory.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> Create Flash Sale
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Live Now" value={summary.live} icon={<Zap className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={summary.scheduled} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Completed" value={summary.completed} icon={<Clock className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Budget" value={summary.totalBudget} icon={<Zap className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search flash sales..." />

        {error && (
          <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-sm font-bold text-[#dc2626] flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => fetchFlashSales()} className="text-xs underline">Retry</button>
          </div>
        )}

        <ReusableTable
          data={filtered}
          keyExtractor={(f) => f.id}
          isLoading={loading}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          columns={[
            { key: "name", header: "Sale Name", sortable: true, render: (f) => (
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-[#d97706]" /><span className="font-bold text-[#1a1a1a]">{f.name}</span></div>
            )},
            { key: "discount", header: "Discount", width: "100px" },
            { key: "productCount", header: "Products", width: "80px", align: "center" },
            { key: "startDate", header: "Start", width: "160px", hideOnMobile: true, render: (f) => <span className="text-xs">{f.startDate}</span> },
            { key: "endDate", header: "End", width: "160px", hideOnMobile: true, render: (f) => <span className="text-xs">{f.endDate}</span> },
            { key: "status", header: "Status", width: "110px", render: (f) => <StatusBadge status={f.status} /> },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (f) => toast.info(`Editing ${f.name}`) },
          ]}
        />
      </div>

      {/* Create Flash Sale Modal */}
      <ReusableModal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Flash Sale" subtitle="Set up a time-bound flash sale event" size="md">
        <div className="space-y-4">
          {[
            { label: "Sale Name", placeholder: "Enter sale name" },
            { label: "Discount Type", type: "select", options: ["percentage", "fixed"] },
            { label: "Discount Value", type: "number", placeholder: "0" },
            { label: "Product Count", type: "number", placeholder: "Number of products" },
            { label: "Start Date", type: "datetime-local" },
            { label: "End Date", type: "datetime-local" },
            { label: "Budget (₹)", type: "number", placeholder: "0" },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  {(field.options as string[])?.map((opt) => <option key={opt} value={opt}>{opt.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>)}
                </select>
              ) : (
                <input type={field.type || "text"} placeholder={field.placeholder} className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
          <button onClick={() => setShowCreateModal(false)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={() => { toast.success("Flash sale created!"); setShowCreateModal(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Create Flash Sale</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
