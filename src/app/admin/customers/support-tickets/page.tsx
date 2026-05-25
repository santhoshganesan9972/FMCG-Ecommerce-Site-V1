"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { MessageSquare, Eye, Reply, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const tickets = [
  { id: "TKT-001", customer: "Ravi Kumar", email: "ravi.k@example.com", subject: "Order not delivered", priority: "high", status: "open", createdAt: "2026-05-21 14:30", assignedTo: "Neha Singh" },
  { id: "TKT-002", customer: "Anita Singh", email: "anita.s@example.com", subject: "Wrong item received", priority: "medium", status: "in_progress", createdAt: "2026-05-21 10:00", assignedTo: "Neha Singh" },
  { id: "TKT-003", customer: "Deepak Joshi", email: "deepak.j@example.com", subject: "Refund not processed", priority: "high", status: "open", createdAt: "2026-05-20 18:30", assignedTo: null },
  { id: "TKT-004", customer: "Priya Sharma", email: "priya.s@example.com", subject: "Delivery partner rude", priority: "low", status: "resolved", createdAt: "2026-05-19 09:00", assignedTo: "Support Team" },
  { id: "TKT-005", customer: "Amit Gupta", email: "amit.g@example.com", subject: "Subscription cancellation", priority: "medium", status: "in_progress", createdAt: "2026-05-18 16:45", assignedTo: "Neha Singh" },
];

export default function SupportTicketsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState<typeof tickets[0] | null>(null);

  const filtered = tickets.filter(t => !search || t.customer.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Customers</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Support Tickets</h1>
          <p className="mt-2 text-sm text-[#666]">Manage customer support requests, assign agents, and track resolution.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Open" value={tickets.filter(t => t.status === "open").length} icon={<MessageSquare className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="In Progress" value={tickets.filter(t => t.status === "in_progress").length} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Resolved" value={tickets.filter(t => t.status === "resolved").length} icon={<CheckCircle className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="High Priority" value={tickets.filter(t => t.priority === "high").length} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search tickets by customer or subject..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(t) => t.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "id", header: "Ticket", width: "100px", render: (t) => <span className="font-bold text-[#0c831f]">{t.id}</span> },
            { key: "customer", header: "Customer", render: (t) => <span className="font-bold text-[#1a1a1a]">{t.customer}</span> },
            { key: "subject", header: "Subject", sortable: true, hideOnMobile: true },
            { key: "priority", header: "Priority", width: "90px", render: (t) => <StatusBadge status={t.priority} /> },
            { key: "status", header: "Status", width: "110px", render: (t) => <StatusBadge status={t.status} /> },
            { key: "assignedTo", header: "Assigned To", width: "120px", hideOnMobile: true, render: (t) => t.assignedTo ?? <span className="text-[#999]">—</span> },
            { key: "createdAt", header: "Created", width: "130px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (t) => setShowDetailModal(t) },
            { label: "Reply", icon: <Reply className="h-3.5 w-3.5" />, onClick: (t) => toast.success(`Opening reply for ${t.id}`) },
          ]}
        />
      </div>

      <ReusableModal open={!!showDetailModal} onClose={() => setShowDetailModal(null)} title={`Ticket ${showDetailModal?.id}`} subtitle={showDetailModal?.subject} size="md">
        {showDetailModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f9fafb] p-3">
                <p className="text-[10px] font-bold uppercase text-[#999]">Customer</p>
                <p className="text-sm font-bold">{showDetailModal.customer}</p>
                <p className="text-xs text-[#999]">{showDetailModal.email}</p>
              </div>
              <div className="rounded-xl bg-[#f9fafb] p-3">
                <p className="text-[10px] font-bold uppercase text-[#999]">Priority</p>
                <StatusBadge status={showDetailModal.priority} />
              </div>
            </div>
            <div><p className="text-xs font-bold text-[#666]">Created</p><p className="text-sm">{showDetailModal.createdAt}</p></div>
            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e8e8]">
              <button onClick={() => { toast.success(`Assigned to Neha Singh`); setShowDetailModal(null); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
                Assign & Reply
              </button>
            </div>
          </div>
        )}
      </ReusableModal>
    </DashboardLayout>
  );
}
