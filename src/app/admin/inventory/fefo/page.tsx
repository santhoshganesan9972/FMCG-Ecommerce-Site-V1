"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { CalendarDays, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

const fefoBatches = [
  { id: "BATCH-001", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", batch: "BATCH-003", qty: 320, manufactured: "2026-05-14", expiry: "2026-05-28", daysLeft: 4, warehouse: "Mumbai Hub", status: "expiring_soon" },
  { id: "BATCH-002", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", batch: "BATCH-005", qty: 56, manufactured: "2026-05-12", expiry: "2026-05-26", daysLeft: 2, warehouse: "Pune Cold Storage", status: "expiring_soon" },
  { id: "BATCH-003", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", batch: "BATCH-007", qty: 42, manufactured: "2026-03-20", expiry: "2026-08-20", daysLeft: 87, warehouse: "Bangalore Cold Room", status: "fresh" },
  { id: "BATCH-004", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", batch: "BATCH-006", qty: 5, manufactured: "2026-04-15", expiry: "2026-06-15", daysLeft: 22, warehouse: "Mumbai Hub", status: "fresh" },
  { id: "BATCH-005", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", batch: "BATCH-004", qty: 0, manufactured: "2025-12-31", expiry: "2027-12-31", daysLeft: 586, warehouse: "Delhi Central", status: "fresh" },
  { id: "BATCH-006", product: "Fresh Red Apples", sku: "FRUIT-APL-001", batch: "BATCH-002", qty: 85, manufactured: "2026-05-10", expiry: "2026-06-10", daysLeft: 17, warehouse: "Pune Cold Storage", status: "fresh" },
  { id: "BATCH-007", product: "Organic Basmati Rice", sku: "RICE-BAS-001", batch: "BATCH-001", qty: 120, manufactured: "2025-07-15", expiry: "2027-01-15", daysLeft: 236, warehouse: "Mumbai Hub", status: "fresh" },
];

export default function FEFOPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = fefoBatches.filter(b => !search || b.product.toLowerCase().includes(search.toLowerCase()) || b.batch.toLowerCase().includes(search.toLowerCase()));

  const expiringSoon = fefoBatches.filter(b => b.daysLeft <= 7).length;
  const freshCount = fefoBatches.filter(b => b.status === "fresh").length;

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">FEFO Dashboard</h1>
              <p className="mt-2 text-sm text-[#666]">First Expiry, First Out — track batch expirations and prioritize dispatch of near-expiry stock.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Batches" value={fefoBatches.length} icon={<CalendarDays className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Fresh" value={freshCount} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Expiring ≤7 Days" value={expiringSoon} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Expired" value={fefoBatches.filter(b => b.daysLeft <= 0).length} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by product or batch ID..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(b) => b.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "product", header: "Product", sortable: true, render: (b) => (
              <div><span className="font-bold text-[#1a1a1a]">{b.product}</span><span className="block text-[10px] text-[#999]">{b.sku}</span></div>
            )},
            { key: "batch", header: "Batch", width: "130px", render: (b) => <span className="font-mono text-xs font-bold">{b.batch}</span> },
            { key: "expiry", header: "Expiry", width: "110px", render: (b) => (
              <span className={b.daysLeft <= 7 ? "text-[#dc2626] font-bold" : "text-[#666]"}>{b.expiry}</span>
            )},
            { key: "daysLeft", header: "Days Left", width: "100px", align: "right", sortable: true, render: (b) => {
              const color = b.daysLeft <= 0 ? "text-[#dc2626]" : b.daysLeft <= 7 ? "text-[#d97706]" : "text-[#0c831f]";
              return <span className={`font-bold ${color}`}>{b.daysLeft}d</span>;
            }},
            { key: "qty", header: "Qty", width: "70px", align: "right" },
            { key: "warehouse", header: "Warehouse", width: "140px", hideOnMobile: true },
            { key: "status", header: "Status", width: "110px", render: (b) => <StatusBadge status={b.status} /> },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (b) => toast.info(`Viewing batch ${b.batch}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
