"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { ArrowUpDown, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useOrders, useOrderActions } from "@/hooks/use-orders";
import type { Order } from "@/types/orders";

const statusFlow = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"];

export default function StatusManagementPage() {
  const {
    orders, loading, search, setSearch,
    pagination, summary,
    setPage, setPageSize, fetchOrders,
  } = useOrders();
  const { updateStatus, updating } = useOrderActions();
  const [showStatusModal, setShowStatusModal] = useState<Order | null>(null);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!showStatusModal) return;
    const success = await updateStatus({
      orderId: showStatusModal.id,
      newStatus: newStatus as Order["status"],
    });
    if (success) {
      toast.success(`Order ${showStatusModal.id} updated to ${newStatus.replace(/_/g, " ")}`);
      setShowStatusModal(null);
      fetchOrders();
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Status Management</h1>
              <p className="mt-2 text-sm text-[#666]">Update order statuses across the fulfillment workflow.</p>
            </div>
            <button onClick={fetchOrders} className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Pending" value={summary.pending} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Confirmed" value={summary.confirmed} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Preparing" value={summary.preparing} icon={<RefreshCw className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Out for Delivery" value={summary.outForDelivery} icon={<ArrowUpDown className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer..." />

        <ReusableTable
          data={orders}
          keyExtractor={(o: Order) => o.id}
          isLoading={loading}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onRowClick={(o: Order) => setShowStatusModal(o)}
          columns={[
            { key: "id", header: "Order ID", width: "110px", render: (o) => <span className="font-bold text-[#0c831f]">{(o as Order).id}</span> },
            { key: "customer", header: "Customer", sortable: true, render: (o) => <span className="font-bold text-[#1a1a1a]">{(o as Order).customer}</span> },
            { key: "items", header: "Items", width: "60px", align: "center", render: (o) => String((o as Order).items.reduce((s, i) => s + i.quantity, 0)) },
            { key: "total", header: "Total", width: "90px", align: "right", render: (o) => <span className="font-bold">₹{(o as Order).total}</span> },
            { key: "status", header: "Status", width: "140px", render: (o) => <StatusBadge status={(o as Order).status} /> },
            { key: "paymentStatus", header: "Payment", width: "100px", render: (o) => <StatusBadge status={(o as Order).paymentStatus} /> },
          ]}
          actions={[
            { label: "Update Status", icon: <ArrowUpDown className="h-3.5 w-3.5" />, onClick: (o: Order) => setShowStatusModal(o) },
          ]}
        />
      </div>

      <ReusableModal open={!!showStatusModal} onClose={() => setShowStatusModal(null)} title={`Update Status — ${showStatusModal?.id}`} subtitle={`Customer: ${showStatusModal?.customer}`} size="md">
        {showStatusModal && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#666]">
              Current Status: <StatusBadge status={showStatusModal.status} />
            </p>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#666]">New Status</label>
              <div className="grid grid-cols-2 gap-2">
                {statusFlow.map((s) => (
                  <button
                    key={s}
                    disabled={updating[showStatusModal.id]}
                    onClick={() => handleStatusUpdate(s)}
                    className={`rounded-xl border p-3 text-left text-sm font-bold transition-all hover:border-[#0c831f] disabled:opacity-50 ${
                      showStatusModal.status === s ? "border-[#0c831f] bg-[#e8f5e9]" : "border-[#e8e8e8]"
                    }`}
                  >
                    {s.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e8e8]">
              <button onClick={() => setShowStatusModal(null)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
            </div>
          </div>
        )}
      </ReusableModal>
    </DashboardLayout>
  );
}
