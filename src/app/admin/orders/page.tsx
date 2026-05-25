"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { KanbanColumn, OrderTimeline, AssignPartnerModal } from "@/components/ui/orders/admin";
import { ShoppingCart, Clock, CheckCircle, XCircle, LayoutDashboard, List, RefreshCw, Eye, Truck } from "lucide-react";
import { toast } from "sonner";
import { useOrders } from "@/hooks/use-orders";
import type { Order } from "@/types/orders";

export default function OrdersPage() {
  const {
    orders, loading, error, search, setSearch,
    statusFilter, setStatusFilter,
    viewMode, setViewMode,
    pagination, summary, kanbanGroups,
    setPage, setPageSize, fetchOrders,
  } = useOrders();
  const [showDetailModal, setShowDetailModal] = useState<Order | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<Order | null>(null);

  const statusButtons = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"] as const;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Order Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Track, manage, and fulfill orders. View order timelines, assign delivery partners, and process substitutions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchOrders} className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]">
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              <div className="flex rounded-xl border border-[#e8e8e8] bg-white p-0.5">
                <button onClick={() => setViewMode("table")} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "table" ? "bg-[#0c831f] text-white" : "text-[#666] hover:text-[#1a1a1a]"}`}><List className="h-3.5 w-3.5" />Table</button>
                <button onClick={() => setViewMode("kanban")} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${viewMode === "kanban" ? "bg-[#0c831f] text-white" : "text-[#666] hover:text-[#1a1a1a]"}`}><LayoutDashboard className="h-3.5 w-3.5" />Kanban</button>
              </div>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Orders" value={summary.total} icon={<ShoppingCart className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Pending" value={summary.pending + summary.confirmed} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Delivered" value={summary.delivered} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Revenue" value={`₹${summary.revenue.toLocaleString()}`} icon={<ShoppingCart className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        {/* Status Quick View */}
        <div className="flex flex-wrap gap-2">
          {statusButtons.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                statusFilter === s
                  ? "bg-[#0c831f] text-white"
                  : "border border-[#e8e8e8] bg-white text-[#666] hover:border-[#0c831f]/30"
              }`}
            >
              {s === "cancelled" ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} ({summary[s as keyof typeof summary] || 0})
            </button>
          ))}
          {statusFilter !== "all" && (
            <button onClick={() => setStatusFilter("all")} className="rounded-xl px-3 py-2 text-xs font-bold text-[#999] hover:text-[#666]">Clear</button>
          )}
        </div>

        {/* Search */}
        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer name..." />

        {viewMode === "table" ? (
          <ReusableTable
            data={orders}
            keyExtractor={(o: Order) => o.id}
            isLoading={loading}
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onRowClick={(o: Order) => setShowDetailModal(o)}
            columns={[
              { key: "id", header: "Order ID", width: "110px", render: (o) => <span className="font-bold text-[#0c831f]">{(o as Order).id}</span> },
              { key: "customer", header: "Customer", sortable: true, render: (o) => {
                const ord = o as Order;
                return (
                  <div>
                    <span className="font-bold text-[#1a1a1a]">{ord.customer}</span>
                    <span className="block text-[10px] text-[#999]">{ord.email}</span>
                  </div>
                );
              }},
              { key: "items", header: "Items", width: "60px", align: "center", render: (o) => String((o as Order).items.reduce((s, i) => s + i.quantity, 0)) },
              { key: "total", header: "Total", width: "90px", align: "right", sortable: true, render: (o) => <span className="font-bold">₹{(o as Order).total}</span> },
              { key: "status", header: "Status", width: "140px", render: (o) => <StatusBadge status={(o as Order).status} /> },
              { key: "paymentStatus", header: "Payment", width: "100px", hideOnMobile: true, render: (o) => <StatusBadge status={(o as Order).paymentStatus} /> },
              { key: "createdAt", header: "Date", width: "140px", hideOnMobile: true },
            ]}
          />
        ) : (
          /* Kanban Board */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {["pending", "confirmed", "preparing", "out_for_delivery", "delivered"].map((status) => (
              <KanbanColumn
                key={status}
                title={status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                status={status}
                orders={kanbanGroups[status] || []}
                onOrderClick={(o) => setShowDetailModal(o)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <ReusableModal open={!!showDetailModal} onClose={() => setShowDetailModal(null)} title={`Order ${showDetailModal?.id}`} subtitle="Order details and timeline" size="lg">
        {showDetailModal && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Customer", value: showDetailModal.customer },
                { label: "Email", value: showDetailModal.email },
                { label: "Items", value: `${showDetailModal.items.reduce((s, i) => s + i.quantity, 0)} items` },
                { label: "Total", value: `₹${showDetailModal.total}` },
                { label: "Status", value: <StatusBadge status={showDetailModal.status} /> },
                { label: "Payment", value: <StatusBadge status={showDetailModal.paymentStatus} /> },
                { label: "Method", value: showDetailModal.paymentMethod || "—" },
                { label: "Delivery", value: showDetailModal.deliveryAddress || "—" },
              ].map((f) => (
                <div key={f.label} className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{f.label}</p>
                  <div className="mt-1 text-sm font-bold text-[#1a1a1a]">{f.value as React.ReactNode}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#666]">Order Timeline</p>
              <OrderTimeline timeline={showDetailModal.timeline} currentStatus={showDetailModal.status} />
            </div>

            {/* Items */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#666]">Items</p>
              <div className="divide-y divide-[#e8e8e8] rounded-xl border border-[#e8e8e8]">
                {showDetailModal.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span className="text-[#1a1a1a]">{item.product} <span className="text-[#999]">x{item.quantity}</span></span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
              <button
                onClick={() => { setShowDetailModal(null); setShowAssignModal(showDetailModal); }}
                className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]"
              >
                <Truck className="h-4 w-4" /> Assign Partner
              </button>
              <button
                onClick={() => { toast.success(`Status update page for ${showDetailModal.id}`); }}
                className="rounded-xl bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]"
              >
                Update Status
              </button>
            </div>
          </div>
        )}
      </ReusableModal>

      {/* Assign Partner Modal */}
      <AssignPartnerModal
        open={!!showAssignModal}
        onClose={() => setShowAssignModal(null)}
        order={showAssignModal}
        onAssigned={fetchOrders}
      />
    </DashboardLayout>
  );
}
