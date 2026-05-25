"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Zap, Plus, Eye, Edit3, Clock } from "lucide-react";
import { toast } from "sonner";

const flashSales = [
  { id: "FS-001", name: "Dairy Flash Sale", discount: "30% Off", products: 12, startDate: "2026-06-01 10:00", endDate: "2026-06-02 23:59", status: "scheduled", budget: "₹50,000", used: "₹0" },
  { id: "FS-002", name: "Summer Drinks Sale", discount: "25% Off", products: 8, startDate: "2026-05-15 12:00", endDate: "2026-05-15 14:00", status: "completed", budget: "₹25,000", used: "₹18,450" },
  { id: "FS-003", name: "Midnight Snacks", discount: "Flat ₹50", products: 20, startDate: "2026-05-20 00:00", endDate: "2026-05-20 06:00", status: "completed", budget: "₹30,000", used: "₹22,800" },
  { id: "FS-004", name: "Weekend Special", discount: "25% Off", products: 15, startDate: "2026-05-25 09:00", endDate: "2026-05-25 21:00", status: "live", budget: "₹40,000", used: "₹12,350" },
  { id: "FS-005", name: "Organic Festival", discount: "35% Off", products: 25, startDate: "2026-06-05 00:00", endDate: "2026-06-07 23:59", status: "scheduled", budget: "₹75,000", used: "₹0" },
];

export default function FlashSalesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = flashSales.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()));

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
          <ReusableCard title="Live Now" value={flashSales.filter(f => f.status === "live").length} icon={<Zap className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={flashSales.filter(f => f.status === "scheduled").length} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Completed" value={flashSales.filter(f => f.status === "completed").length} icon={<Clock className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Budget" value="₹2.2L" icon={<Zap className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search flash sales..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(f) => f.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "name", header: "Sale Name", sortable: true, render: (f) => (
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-[#d97706]" /><span className="font-bold text-[#1a1a1a]">{f.name}</span></div>
            )},
            { key: "discount", header: "Discount", width: "100px" },
            { key: "products", header: "Products", width: "80px", align: "center" },
            { key: "startDate", header: "Start", width: "150px", hideOnMobile: true },
            { key: "endDate", header: "End", width: "150px", hideOnMobile: true },
            { key: "status", header: "Status", width: "110px", render: (f) => <StatusBadge status={f.status} /> },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (f) => toast.info(`Editing ${f.name}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
