"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Gift, Plus, Copy, Edit3, Eye, Zap } from "lucide-react";
import { toast } from "sonner";

const coupons = [
  { id: "CPN-001", code: "NEW100", discount: "₹100 Off", minOrder: 499, uses: 3420, maxUses: 10000, status: "active", expires: "2026-12-31", type: "fixed" },
  { id: "CPN-002", code: "SUMMER40", discount: "40% Off", minOrder: 999, uses: 1245, maxUses: 5000, status: "active", expires: "2026-06-15", type: "percentage" },
  { id: "CPN-003", code: "WEEKEND50", discount: "₹50 Off", minOrder: 299, uses: 5800, maxUses: 5000, status: "expired", expires: "2026-05-31", type: "fixed" },
  { id: "CPN-004", code: "FLASHSALE", discount: "30% Off", minOrder: 0, uses: 0, maxUses: 1000, status: "scheduled", expires: "2026-06-02", type: "percentage" },
  { id: "CPN-005", code: "B2G1FREE", discount: "Buy 2 Get 1", minOrder: 0, uses: 890, maxUses: 2000, status: "active", expires: "2026-06-01", type: "bogo" },
];

export default function CouponsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = coupons.filter(c => !search || c.code.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Promotions</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Coupons</h1>
              <p className="mt-2 text-sm text-[#666]">Create and manage discount coupons, promo codes, and special offers.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> Generate Coupon
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Active Coupons" value={coupons.filter(c => c.status === "active").length} icon={<Gift className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={coupons.filter(c => c.status === "scheduled").length} icon={<Zap className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Total Uses" value={coupons.reduce((s, c) => s + c.uses, 0).toLocaleString()} icon={<Copy className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Expired" value={coupons.filter(c => c.status === "expired").length} icon={<Gift className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by coupon code or ID..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(c) => c.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "code", header: "Code", sortable: true, render: (c) => (
              <div className="flex items-center gap-2"><span className="rounded-lg bg-[#e8f5e9] px-2.5 py-1 font-mono text-sm font-bold text-[#0c831f]">{c.code}</span></div>
            )},
            { key: "discount", header: "Discount", width: "120px", render: (c) => <span className="font-bold">{c.discount}</span> },
            { key: "minOrder", header: "Min Order", width: "100px", align: "right", render: (c) => c.minOrder ? `₹${c.minOrder}` : "—" },
            { key: "uses", header: "Uses", width: "90px", align: "right", render: (c) => <span>{c.uses.toLocaleString()} / {c.maxUses.toLocaleString()}</span> },
            { key: "status", header: "Status", width: "100px", render: (c) => <StatusBadge status={c.status} /> },
            { key: "expires", header: "Expires", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (c) => toast.info(`Editing coupon ${c.code}`) },
            { label: "Copy Code", icon: <Copy className="h-3.5 w-3.5" />, onClick: (c) => toast.success(`Copied ${c.code}!`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
