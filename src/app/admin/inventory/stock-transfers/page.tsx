"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { ArrowRightLeft, Plus, Eye, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const transfers = [
  { id: "ST-001", product: "Organic Basmati Rice", sku: "RICE-BAS-001", from: "Mumbai Hub", to: "Pune Cold Storage", qty: 200, status: "completed", initiatedBy: "Rohit Sharma", date: "2026-05-21", eta: "2026-05-21" },
  { id: "ST-002", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", from: "Mumbai Hub", to: "Pune Cold Storage", qty: 500, status: "in_transit", initiatedBy: "Sneha Joshi", date: "2026-05-21", eta: "2026-05-22" },
  { id: "ST-003", product: "Fresh Red Apples", sku: "FRUIT-APL-001", from: "Pune Cold Storage", to: "Bangalore Cold Room", qty: 100, status: "pending", initiatedBy: "Amit Verma", date: "2026-05-21", eta: "2026-05-23" },
  { id: "ST-004", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", from: "Pune Cold Storage", to: "Mumbai Hub", qty: 80, status: "completed", initiatedBy: "Rohit Sharma", date: "2026-05-20", eta: "2026-05-20" },
  { id: "ST-005", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", from: "Mumbai Hub", to: "Delhi Central", qty: 300, status: "cancelled", initiatedBy: "Priya Kumar", date: "2026-05-19", eta: "—" },
  { id: "ST-006", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", from: "Bangalore Cold Room", to: "Mumbai Hub", qty: 150, status: "in_transit", initiatedBy: "Rajesh Iyer", date: "2026-05-21", eta: "2026-05-22" },
];

export default function StockTransfersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = transfers.filter(t => !search || t.product.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Stock Transfers</h1>
              <p className="mt-2 text-sm text-[#666]">Transfer stock between warehouses, track in-transit shipments, and manage inter-warehouse logistics.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> New Transfer
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Transfers" value={transfers.length} icon={<ArrowRightLeft className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="In Transit" value={transfers.filter(t => t.status === "in_transit").length} icon={<Truck className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Completed" value={transfers.filter(t => t.status === "completed").length} icon={<CheckCircle className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Pending" value={transfers.filter(t => t.status === "pending").length} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by product or transfer ID..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(t) => t.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "product", header: "Product", sortable: true, render: (t) => (
              <div><span className="font-bold text-[#1a1a1a]">{t.product}</span><span className="block text-[10px] text-[#999]">{t.sku}</span></div>
            )},
            { key: "from", header: "From", width: "130px", hideOnMobile: true, render: (t) => <span className="text-[#666]">{t.from}</span> },
            { key: "to", header: "To", width: "150px", render: (t) => <span className="text-[#0c831f] font-semibold">{t.to}</span> },
            { key: "qty", header: "Qty", width: "70px", align: "right", sortable: true },
            { key: "status", header: "Status", width: "110px", render: (t) => <StatusBadge status={t.status} /> },
            { key: "date", header: "Date", width: "110px", hideOnMobile: true },
            { key: "eta", header: "ETA", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Track", icon: <Truck className="h-3.5 w-3.5" />, onClick: (t) => toast.info(`Tracking transfer ${t.id}`), variant: "success" },
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (t) => toast.info(`Viewing transfer ${t.id}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
