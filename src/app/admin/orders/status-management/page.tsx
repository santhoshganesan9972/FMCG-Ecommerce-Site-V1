"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { ArrowUpDown, Eye, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const orders = [
  { id: "ORD-001", customer: "Ravi Kumar", status: "pending", payment: "paid", items: 5, total: 1240 },
  { id: "ORD-002", customer: "Anita Singh", status: "confirmed", payment: "paid", items: 3, total: 680 },
  { id: "ORD-003", customer: "Vikram Patel", status: "preparing", payment: "paid", items: 8, total: 2150 },
  { id: "ORD-004", customer: "Deepak Joshi", status: "out_for_delivery", payment: "paid", items: 12, total: 3800 },
  { id: "ORD-005", customer: "Priya Sharma", status: "pending", payment: "pending", items: 4, total: 890 },
  { id: "ORD-006", customer: "Amit Gupta", status: "preparing", payment: "paid", items: 6, total: 1570 },
];

const statusFlow = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"];

export default function StatusManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showStatusModal, setShowStatusModal] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter(o => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Status Management</h1>
          <p className="mt-2 text-sm text-[#666]">Update order statuses across the fulfillment workflow.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Pending" value={orders.filter(o => o.status === "pending").length} icon={<Clock className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Confirmed" value={orders.filter(o => o.status === "confirmed").length} icon={<CheckCircle className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Preparing" value={orders.filter(o => o.status === "preparing").length} icon={<RefreshCw className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Out for Delivery" value={orders.filter(o => o.status === "out_for_delivery").length} icon={<ArrowUpDown className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(o) => o.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          onRowClick={(o) => setShowStatusModal(o)}
          columns={[
            { key: "id", header: "Order ID", width: "110px", render: (o) => <span className="font-bold text-[#0c831f]">{o.id}</span> },
            { key: "customer", header: "Customer", sortable: true, render: (o) => <span className="font-bold text-[#1a1a1a]">{o.customer}</span> },
            { key: "items", header: "Items", width: "60px", align: "center" },
            { key: "total", header: "Total", width: "90px", align: "right", render: (o) => <span className="font-bold">₹{o.total}</span> },
            { key: "status", header: "Status", width: "140px", render: (o) => <StatusBadge status={o.status} /> },
            { key: "payment", header: "Payment", width: "100px", render: (o) => <StatusBadge status={o.payment} /> },
          ]}
          actions={[
            { label: "Update Status", icon: <ArrowUpDown className="h-3.5 w-3.5" />, onClick: (o) => setShowStatusModal(o) },
          ]}
        />
      </div>

      <ReusableModal open={!!showStatusModal} onClose={() => setShowStatusModal(null)} title={`Update Status — ${showStatusModal?.id}`} subtitle={`Customer: ${showStatusModal?.customer}`} size="md">
        {showStatusModal && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#666]">Current Status: <StatusBadge status={showStatusModal.status} /></p>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#666]">New Status</label>
              <div className="grid grid-cols-2 gap-2">
                {statusFlow.map((s) => (
                  <button
                    key={s}
                    onClick={() => { toast.success(`Order ${showStatusModal.id} updated to ${s.replace(/_/g, " ")}`); setShowStatusModal(null); }}
                    className={`rounded-xl border p-3 text-left text-sm font-bold transition-all hover:border-[#0c831f] ${
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
