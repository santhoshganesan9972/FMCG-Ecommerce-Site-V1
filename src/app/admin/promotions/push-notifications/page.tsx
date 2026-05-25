"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { usePushNotifications } from "@/hooks/use-promotions";
import { Bell, Plus, Eye, Send, Clock, Smartphone } from "lucide-react";
import { toast } from "sonner";

export default function PushNotificationsPage() {
  const { notifications, summary, pagination, loading, error, fetchNotifications, setPage, setPageSize } = usePushNotifications();
  const [search, setSearch] = useState("");
  const [showComposeModal, setShowComposeModal] = useState(false);

  const filtered = notifications.filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()));

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
          <ReusableCard title="Sent" value={summary.sent} icon={<Send className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Scheduled" value={summary.scheduled} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Drafts" value={summary.drafts} icon={<Bell className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Avg Open Rate" value={summary.avgOpenRate} icon={<Smartphone className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search notifications..." />

        {error && (
          <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-3 text-sm font-bold text-[#dc2626] flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => fetchNotifications()} className="text-xs underline">Retry</button>
          </div>
        )}

        <ReusableTable
          data={filtered}
          keyExtractor={(p) => p.id}
          isLoading={loading}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
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

      {/* Compose Notification Modal */}
      <ReusableModal open={showComposeModal} onClose={() => setShowComposeModal(false)} title="Compose Notification" subtitle="Create a new push notification" size="md">
        <div className="space-y-4">
          {[
            { label: "Title", placeholder: "Notification title" },
            { label: "Body", type: "textarea", placeholder: "Notification body text" },
            { label: "Audience", type: "select", options: ["All Users", "Active Users", "New Users", "VIP Members", "Abandoned Carts"] },
            { label: "Deep Link (optional)", placeholder: "e.g., /promotions/summer-sale" },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  {(field.options as string[])?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : field.type === "textarea" ? (
                <textarea rows={3} placeholder={field.placeholder} className="w-full rounded-xl border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]" />
              ) : (
                <input type="text" placeholder={field.placeholder} className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
          <button onClick={() => setShowComposeModal(false)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={() => { toast.success("Notification sent!"); setShowComposeModal(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Send Notification</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
