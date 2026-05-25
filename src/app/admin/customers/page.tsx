"use client";

import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { CustomerTimeline } from "@/components/ui/customers/admin";
import { Users, Eye, Mail, AlertTriangle, Star, TrendingUp, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useCustomers } from "@/hooks/use-customers";
import { useState } from "react";
import type { Customer } from "@/types/customers";

export default function CustomersPage() {
  const {
    customers, loading, error, search, setSearch,
    segmentFilter, setSegmentFilter, statusFilter, setStatusFilter,
    pagination, summary, setPage, setPageSize, fetchCustomers,
  } = useCustomers();
  const [showDetailModal, setShowDetailModal] = useState<Customer | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Customers</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Customer Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                View customer profiles, track spending, manage segments, and review support tickets.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchCustomers} className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Customers" value={summary.total} icon={<Users className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Total Revenue" value={`₹${summary.totalRevenue.toLocaleString()}`} icon={<TrendingUp className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="VIP Customers" value={summary.vip} icon={<Star className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="At Risk" value={summary.atRisk} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search customers by name or email..." />
            </div>
            <div className="flex items-center gap-2">
              <select value={segmentFilter} onChange={(e) => { setSegmentFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Segments</option>
                <option value="vip">VIP</option>
                <option value="premium">Premium</option>
                <option value="regular">Regular</option>
                <option value="new">New</option>
                <option value="at_risk">At Risk</option>
                <option value="churned">Churned</option>
              </select>
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </section>

        {/* Customer Table */}
        <ReusableTable
          data={customers}
          keyExtractor={(c) => c.id}
          isLoading={loading}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); }}
          enableSelection
          columns={[
            { key: "name", header: "Customer", sortable: true, render: (c: Customer) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">
                  {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <span className="font-bold text-[#1a1a1a]">{c.name}</span>
                  <span className="block text-[10px] text-[#999]">{c.email}</span>
                </div>
              </div>
            )},
            { key: "phone", header: "Phone", width: "130px", hideOnMobile: true },
            { key: "segment", header: "Segment", width: "100px", render: (c: Customer) => <StatusBadge status={c.segment} /> },
            { key: "status", header: "Status", width: "100px", render: (c: Customer) => <StatusBadge status={c.status} /> },
            { key: "totalOrders", header: "Orders", width: "80px", align: "right", sortable: true },
            { key: "totalSpent", header: "Spent", width: "100px", align: "right", sortable: true, render: (c: Customer) => <span className="font-bold">₹{c.totalSpent.toLocaleString()}</span> },
            { key: "city", header: "City", width: "100px", hideOnMobile: true },
            { key: "lastOrderDate", header: "Last Order", width: "110px", hideOnMobile: true, render: (c: Customer) => c.lastOrderDate || <span className="text-[#999]">—</span> },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (c: Customer) => setShowDetailModal(c) },
            { label: "Email", icon: <Mail className="h-3.5 w-3.5" />, onClick: (c: Customer) => toast.success(`Emailing ${c.name}`) },
          ]}
        />

        {/* Segmentation Breakdown */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Analytics</p>
            <h3 className="text-sm font-black text-[#1a1a1a]">Segmentation Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "VIP", count: summary.vip, pct: summary.total > 0 ? (summary.vip / Math.max(summary.total, 1)) * 100 : 0, color: "bg-[#9333ea]" },
              { label: "Premium", count: customers.filter(c => c.segment === "premium").length, pct: 0, color: "bg-[#2563eb]" },
              { label: "Regular", count: customers.filter(c => c.segment === "regular").length, pct: 0, color: "bg-[#0c831f]" },
              { label: "At Risk / Churned", count: summary.atRisk + summary.churned, pct: summary.total > 0 ? ((summary.atRisk + summary.churned) / Math.max(summary.total, 1)) * 100 : 0, color: "bg-[#dc2626]" },
            ].map((seg) => (
              <div key={seg.label} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#666]">{seg.label}</span>
                  <span className="text-xs font-black text-[#1a1a1a]">{seg.count} users</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                  <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${Math.max(seg.pct, 2)}%` }} />
                </div>
                <p className="mt-1.5 text-sm font-black text-[#1a1a1a]">{Math.round(seg.pct)}%</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Customer Detail Modal */}
      <ReusableModal open={!!showDetailModal} onClose={() => setShowDetailModal(null)} title={showDetailModal?.name || ""} subtitle={showDetailModal?.email} size="lg">
        {showDetailModal && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Phone", value: showDetailModal.phone },
                { label: "City", value: `${showDetailModal.city}, ${showDetailModal.state}` },
                { label: "Segment", value: <StatusBadge status={showDetailModal.segment} /> },
                { label: "Status", value: <StatusBadge status={showDetailModal.status} /> },
                { label: "Total Orders", value: showDetailModal.totalOrders },
                { label: "Total Spent", value: `₹${showDetailModal.totalSpent.toLocaleString()}` },
                { label: "Avg Order Value", value: `₹${showDetailModal.avgOrderValue}` },
                { label: "LTV", value: showDetailModal.lifetimeValue || "—" },
              ].map((f) => (
                <div key={f.label} className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{f.label}</p>
                  <div className="mt-1 text-sm font-bold text-[#1a1a1a]">{f.value as React.ReactNode}</div>
                </div>
              ))}
            </div>

            {showDetailModal.tags.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#666]">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {showDetailModal.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f6f7f6] px-2.5 py-1 text-[10px] font-bold text-[#666]">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {showDetailModal.acquisitionChannel && (
              <div className="rounded-xl bg-[#fffbeb] border border-[#fde68a] p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#d97706]">Acquisition Channel</p>
                <p className="mt-1 text-sm font-bold text-[#1a1a1a]">{showDetailModal.acquisitionChannel}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
              <button onClick={() => { toast.success(`Email sent to ${showDetailModal.name}`); }} className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">
                <Mail className="h-4 w-4" /> Send Email
              </button>
              <button onClick={() => { toast.success(`${showDetailModal.name}'s profile updated`); setShowDetailModal(null); }} className="rounded-xl bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </ReusableModal>
    </DashboardLayout>
  );
}
