"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { RefreshCw, Eye, CheckCircle, XCircle, Package } from "lucide-react";
import { toast } from "sonner";

const substitutions = [
  { id: "SUB-001", orderId: "ORD-001", original: "Fresh Red Apples 500g", substitute: "Red Delicious Apples 500g", reason: "Out of stock", status: "accepted", amount: 199, customer: "Ravi Kumar" },
  { id: "SUB-002", orderId: "ORD-001", original: "Greek Yogurt 400g", substitute: "Greek Yogurt 300g", reason: "Size unavailable", status: "accepted", amount: 99, customer: "Ravi Kumar" },
  { id: "SUB-003", orderId: "ORD-005", original: "Salted Butter 100g", substitute: "Unsalted Butter 100g", reason: "Stockout", status: "pending", amount: 59, customer: "Deepak Joshi" },
  { id: "SUB-004", orderId: "ORD-006", original: "Cold Brew Coffee 250ml", substitute: "Iced Coffee 250ml", reason: "Discontinued", status: "rejected", amount: 179, customer: "Priya Sharma" },
  { id: "SUB-005", orderId: "ORD-007", original: "Natural Honey 500g", substitute: "Organic Honey 500g", reason: "Out of stock", status: "pending", amount: 349, customer: "Amit Gupta" },
];

export default function SubstitutionsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = substitutions.filter(s => !search || s.original.toLowerCase().includes(search.toLowerCase()) || s.orderId.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Substitutions</h1>
          <p className="mt-2 text-sm text-[#666]">Manage product substitutions when ordered items are unavailable.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Substitutions" value={substitutions.length} icon={<RefreshCw className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Accepted" value={substitutions.filter(s => s.status === "accepted").length} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Pending" value={substitutions.filter(s => s.status === "pending").length} icon={<Package className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Rejected" value={substitutions.filter(s => s.status === "rejected").length} icon={<XCircle className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by product or order ID..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(s) => s.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "orderId", header: "Order", width: "100px", render: (s) => <span className="font-bold text-[#0c831f]">{s.orderId}</span> },
            { key: "original", header: "Original Item", sortable: true, render: (s) => <span className="font-bold text-[#1a1a1a]">{s.original}</span> },
            { key: "substitute", header: "Substituted With", render: (s) => <span className="text-[#0c831f] font-semibold">{s.substitute}</span> },
            { key: "reason", header: "Reason", width: "120px", hideOnMobile: true },
            { key: "status", header: "Status", width: "110px", render: (s) => <StatusBadge status={s.status} /> },
            { key: "amount", header: "Amount", width: "90px", align: "right", render: (s) => <span className="font-bold">₹{s.amount}</span> },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (s) => toast.info(`Viewing substitution ${s.id}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
