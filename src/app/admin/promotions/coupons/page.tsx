"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { CouponGenerator } from "@/components/ui/promotions/admin";
import { useCoupons } from "@/hooks/use-promotions";
import { Gift, Plus, Copy, Edit3, Zap } from "lucide-react";
import { toast } from "sonner";

export default function CouponsPage() {
  const { coupons, summary, pagination, loading, error, filters, updateFilters, generateCoupon, setPage, setPageSize } = useCoupons();
  const [showCreateModal, setShowCreateModal] = useState(false);

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
          <ReusableCard title="Active Coupons" value={summary.active} icon={<Gift className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={summary.scheduled} icon={<Zap className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Total Uses" value={summary.totalUsed.toLocaleString()} icon={<Copy className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Expired" value={summary.expired} icon={<Gift className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={filters.search || ""} onChange={(v) => updateFilters({ search: v })} placeholder="Search by coupon code or ID..." />

        {error && (
          <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-sm font-bold text-[#dc2626]">
            {error}
          </div>
        )}

        <ReusableTable
          data={coupons}
          keyExtractor={(c) => c.id}
          isLoading={loading}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          columns={[
            { key: "code", header: "Code", sortable: true, render: (c) => (
              <div className="flex items-center gap-2"><span className="rounded-lg bg-[#e8f5e9] px-2.5 py-1 font-mono text-sm font-bold text-[#0c831f]">{c.code}</span></div>
            )},
            { key: "discount", header: "Discount", width: "120px", render: (c) => <span className="font-bold">{c.discount}</span> },
            { key: "minOrder", header: "Min Order", width: "100px", align: "right", render: (c) => c.minOrder ? `₹${c.minOrder}` : "—" },
            { key: "totalUsed", header: "Uses", width: "140px", align: "right", render: (c) => <span>{c.totalUsed.toLocaleString()} / {c.totalIssued.toLocaleString()}</span> },
            { key: "status", header: "Status", width: "100px", render: (c) => <StatusBadge status={c.status} /> },
            { key: "endDate", header: "Expires", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (c) => toast.info(`Editing coupon ${c.code}`) },
            { label: "Copy Code", icon: <Copy className="h-3.5 w-3.5" />, onClick: (c) => toast.success(`Copied ${c.code}!`) },
          ]}
        />
      </div>

      {/* Generate Coupon Modal */}
      <ReusableModal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Generate Coupon" subtitle="Create a new discount coupon code" size="md">
        <CouponGenerator
          onGenerate={async (data) => {
            const result = await generateCoupon(data);
            if (result) {
              toast.success(`Coupon ${result.code} generated!`);
              setShowCreateModal(false);
            } else {
              toast.error("Failed to generate coupon");
            }
          }}
          onCancel={() => setShowCreateModal(false)}
        />
      </ReusableModal>
    </DashboardLayout>
  );
}
