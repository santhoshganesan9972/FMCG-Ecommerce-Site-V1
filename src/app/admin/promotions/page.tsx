"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { Percent, Plus, Eye, Edit3, Copy, Trash2, Gift, Zap, Clock, Megaphone } from "lucide-react";
import { toast } from "sonner";

interface Promotion {
  id: string;
  name: string;
  type: string;
  discountType: string;
  discountValue: number;
  minOrder?: number;
  startDate: string;
  endDate: string;
  status: string;
  usageCount: number;
  maxUses: number;
}

const mockPromotions: Promotion[] = [
  { id: "PROMO-001", name: "Summer Sale 40% Off", type: "discount", discountType: "percentage", discountValue: 40, startDate: "2026-05-01", endDate: "2026-06-15", status: "active", usageCount: 1245, maxUses: 5000 },
  { id: "PROMO-002", name: "New User ₹100 Off", type: "coupon", discountType: "fixed", discountValue: 100, minOrder: 499, startDate: "2026-04-01", endDate: "2026-12-31", status: "active", usageCount: 3420, maxUses: 10000 },
  { id: "PROMO-003", name: "Buy 2 Get 1 Free - Chips", type: "buy_x_get_y", discountType: "percentage", discountValue: 100, startDate: "2026-05-15", endDate: "2026-06-01", status: "active", usageCount: 890, maxUses: 2000 },
  { id: "PROMO-004", name: "Flash Sale - Dairy Products", type: "flash_sale", discountType: "percentage", discountValue: 30, startDate: "2026-06-01", endDate: "2026-06-02", status: "scheduled", usageCount: 0, maxUses: 1000 },
  { id: "PROMO-005", name: "Monsoon Discount - Beverages", type: "discount", discountType: "percentage", discountValue: 20, startDate: "2026-06-01", endDate: "2026-07-31", status: "scheduled", usageCount: 0, maxUses: 5000 },
  { id: "PROMO-006", name: "Weekend Special ₹50 Off", type: "coupon", discountType: "fixed", discountValue: 50, minOrder: 299, startDate: "2026-04-01", endDate: "2026-05-31", status: "expired", usageCount: 5800, maxUses: 5000 },
];

export default function PromotionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = mockPromotions.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Promotions</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Offers & Coupons</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage coupons, flash sales, campaigns, and A/B testing for promotions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
                <Plus className="h-4 w-4" />
                Create Promotion
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Active Promotions" value={mockPromotions.filter(p => p.status === "active").length} icon={<Percent className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={mockPromotions.filter(p => p.status === "scheduled").length} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Total Uses" value={mockPromotions.reduce((s, p) => s + p.usageCount, 0).toLocaleString()} icon={<Zap className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Expired" value={mockPromotions.filter(p => p.status === "expired").length} icon={<Clock className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search promotions..." />
            </div>
            <div className="flex items-center gap-2">
              <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Types</option>
                <option value="coupon">Coupon</option>
                <option value="discount">Discount</option>
                <option value="flash_sale">Flash Sale</option>
                <option value="buy_x_get_y">Buy X Get Y</option>
              </select>
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>
        </section>

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(p) => p.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          enableSelection
          columns={[
            { key: "name", header: "Promotion", sortable: true, render: (p) => (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff0f6]">
                  {p.type === "coupon" ? <Gift className="h-4 w-4 text-[#ff4f8b]" /> : p.type === "flash_sale" ? <Zap className="h-4 w-4 text-[#d97706]" /> : <Percent className="h-4 w-4 text-[#0c831f]" />}
                </div>
                <div><span className="font-bold text-[#1a1a1a]">{p.name}</span><span className="block text-[10px] text-[#999]">{p.id}</span></div>
              </div>
            )},
            { key: "type", header: "Type", width: "110px", render: (p) => <StatusBadge status={p.type} /> },
            { key: "discountValue", header: "Discount", width: "100px", render: (p) => (
              <span className="font-bold">{p.discountType === "percentage" ? `${p.discountValue}%` : `₹${p.discountValue}`}</span>
            )},
            { key: "status", header: "Status", width: "110px", render: (p) => <StatusBadge status={p.status} /> },
            { key: "usageCount", header: "Used", width: "80px", align: "right", render: (p) => (
              <span>{p.usageCount.toLocaleString()} / {p.maxUses.toLocaleString()}</span>
            )},
            { key: "startDate", header: "Start", width: "110px", hideOnMobile: true },
            { key: "endDate", header: "End", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Editing ${p.name}`) },
            { label: "Duplicate", icon: <Copy className="h-3.5 w-3.5" />, onClick: (p) => toast.success(`Duplicated ${p.name}`) },
            { label: "Delete", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: (p) => toast.error(`Deleted ${p.name}`), variant: "danger" },
          ]}
        />
      </div>

      {/* Create Promotion Modal */}
      <ReusableModal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Promotion" subtitle="Configure a new promotion, coupon, or flash sale" size="md">
        <div className="space-y-4">
          {[
            { label: "Promotion Name", placeholder: "Enter promotion name" },
            { label: "Type", type: "select", options: ["coupon", "discount", "flash_sale", "buy_x_get_y"] },
            { label: "Discount Type", type: "select", options: ["percentage", "fixed"] },
            { label: "Discount Value", type: "number", placeholder: "0" },
            { label: "Min Order (₹)", type: "number", placeholder: "0 (optional)" },
            { label: "Max Uses", type: "number", placeholder: "Unlimited" },
            { label: "Start Date", type: "date" },
            { label: "End Date", type: "date" },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="">Select {field.label}</option>
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
          <button onClick={() => { toast.success("Promotion created!"); setShowCreateModal(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Create Promotion</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
