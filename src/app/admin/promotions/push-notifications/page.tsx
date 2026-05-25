"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Bell, Plus, Eye, Send, Clock, CheckCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";

const pushNotifs = [
  { id: "PN-001", title: "Flash Sale - 40% Off!", audience: "All Users", status: "sent", sent: "22,450", opened: "8,920", clicked: "3,450", scheduledAt: "2026-05-21 10:00", sentAt: "2026-05-21 10:00" },
  { id: "PN-002", title: "Your Order Is Out for Delivery!", audience: "Today's Orders", status: "sent", sent: "1,234", opened: "1,180", clicked: "980", scheduledAt: "2026-05-21 14:00", sentAt: "2026-05-21 14:00" },
  { id: "PN-003", title: "Weekend Special: Extra 10% Off", audience: "Active Users", status: "scheduled", sent: "—", opened: "—", clicked: "—", scheduledAt: "2026-05-25 09:00", sentAt: "—" },
  { id: "PN-004", title: "New Feature: Wallet Payments", audience: "All Users", status: "draft", sent: "—", opened: "—", clicked: "—", scheduledAt: "—", sentAt: "—" },
  { id: "PN-005", title: "Don't Miss Out! Cart Waiting", audience: "Abandoned Carts", status: "sent", sent: "5,678", opened: "1,245", clicked: "567", scheduledAt: "2026-05-20 18:00", sentAt: "2026-05-20 18:00" },
];

export default function PushNotificationsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showComposeModal, setShowComposeModal] = useState(false);

  const filtered = pushNotifs.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Promotions</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Push Notifications</h1>
              <p className="mt-2 text-sm text-[#666]">Send and schedule push notifications to engage users with timely updates.</p>
            </div>
            <button onClick={() => setShowComposeModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> Compose
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Sent" value={pushNotifs.filter(p => p.status === "sent").length} icon={<Send className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={pushNotifs.filter(p => p.status === "scheduled").length} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Drafts" value={pushNotifs.filter(p => p.status === "draft").length} icon={<Bell className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Avg Open Rate" value="42.5%" icon={<Smartphone className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search notifications..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(p) => p.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "title", header: "Notification", sortable: true, render: (p) => (
              <div className="flex items-center gap-2"><Bell className="h-3.5 w-3.5 text-[#0c831f]" /><span className="font-bold text-[#1a1a1a]">{p.title}</span></div>
            )},
            { key: "audience", header: "Audience", width: "130px" },
            { key: "sent", header: "Sent", width: "80px", align: "right" },
            { key: "opened", header: "Opened", width: "80px", align: "right", hideOnMobile: true },
            { key: "clicked", header: "Clicked", width: "80px", align: "right", hideOnMobile: true },
            { key: "status", header: "Status", width: "100px", render: (p) => <StatusBadge status={p.status} /> },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Viewing ${p.title}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
