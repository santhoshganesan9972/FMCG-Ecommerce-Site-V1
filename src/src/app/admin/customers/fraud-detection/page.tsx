"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Shield, Eye, AlertTriangle, CheckCircle, Clock, Ban } from "lucide-react";
import { toast } from "sonner";

const fraudAlerts = [
  { id: "FRD-001", customer: "Unknown User", email: "spam123@temp.com", reason: "Multiple failed attempts", score: 92, status: "blocked", detectedAt: "2026-05-21 03:15", action: "Auto-blocked", ip: "103.45.67.89" },
  { id: "FRD-002", customer: "Test User 45", email: "test45@mail.com", reason: "Suspicious payment pattern", score: 78, status: "flagged", detectedAt: "2026-05-21 01:30", action: "Pending review", ip: "45.23.12.78" },
  { id: "FRD-003", customer: "Rahul D.", email: "rahul.d@example.com", reason: "Multiple COD cancellations", score: 65, status: "flagged", detectedAt: "2026-05-20 22:00", action: "Order held", ip: "182.56.34.12" },
  { id: "FRD-004", customer: "New User 12", email: "new12@temp.com", reason: "Unusual order velocity", score: 45, status: "monitoring", detectedAt: "2026-05-20 18:45", action: "Under watch", ip: "67.89.01.23" },
  { id: "FRD-005", customer: "Fake Vendor", email: "fake@vendor.com", reason: "Fake product listings", score: 95, status: "blocked", detectedAt: "2026-05-19 14:00", action: "Account suspended", ip: "34.56.78.90" },
  { id: "FRD-006", customer: "Suspicious Buyer", email: "buyer99@mail.com", reason: "Address mismatch", score: 55, status: "monitoring", detectedAt: "2026-05-19 11:20", action: "Manual verification", ip: "12.34.56.78" },
];

export default function FraudDetectionPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState<any>(null);

  const filtered = fraudAlerts.filter(f => !search || f.customer.toLowerCase().includes(search.toLowerCase()) || f.reason.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Customers</p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Fraud Detection</h1>
          <p className="mt-1.5 text-xs text-[#666]">AI-powered fraud detection monitoring suspicious activity, payment patterns, and account behavior.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Fraud Alerts" value={fraudAlerts.length} icon={<Shield className="h-4 w-4" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
          <ReusableCard title="Blocked" value={fraudAlerts.filter(f => f.status === "blocked").length} icon={<Ban className="h-4 w-4" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
          <ReusableCard title="Flagged" value={fraudAlerts.filter(f => f.status === "flagged").length} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Monitoring" value={fraudAlerts.filter(f => f.status === "monitoring").length} icon={<Clock className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search fraud alerts..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(f) => f.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "id", header: "Alert ID", width: "100px", render: (f) => <span className="font-semibold text-[#dc2626]">{f.id}</span> },
            { key: "customer", header: "User", render: (f) => <span className="font-semibold text-[#1a1a1a]">{f.customer}</span> },
            { key: "reason", header: "Reason", sortable: true },
            { key: "score", header: "Risk Score", width: "100px", align: "right", render: (f) => {
              const color = f.score >= 80 ? "text-[#dc2626]" : f.score >= 60 ? "text-[#d97706]" : "text-[#d97706]";
              return <span className={`font-semibold ${color}`}>{f.score}%</span>;
            }},
            { key: "status", header: "Status", width: "110px", render: (f) => <StatusBadge status={f.status} /> },
            { key: "detectedAt", header: "Detected", width: "130px", hideOnMobile: true },
            { key: "action", header: "Action Taken", width: "130px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Review", icon: <Eye className="h-3.5 w-3.5" />, onClick: (f) => setShowDetailModal(f) },
            { label: "Block User", icon: <Ban className="h-3.5 w-3.5" />, onClick: (f) => toast.success(`${f.customer} blocked`) },
          ]}
        />
      </div>

      <ReusableModal open={!!showDetailModal} onClose={() => setShowDetailModal(null)} title={`Review Fraud Alert — ${showDetailModal?.id}`} subtitle={showDetailModal?.customer} size="lg">
        {showDetailModal && (
          <div className="space-y-5">
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-[#1a1a1a]">Suspicious Behavior Detected</h4>
                <p className="text-xs text-[#666] mt-0.5">This user account has triggered an automated alert for the following reason:</p>
                <p className="text-xs font-bold text-red-700 mt-1">{showDetailModal.reason}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "User / Customer", value: showDetailModal.customer },
                { label: "Email Address", value: showDetailModal.email },
                { label: "Risk Score", value: <span className={`font-bold ${showDetailModal.score >= 80 ? "text-red-600" : "text-amber-600"}`}>{showDetailModal.score}%</span> },
                { label: "Alert Status", value: <StatusBadge status={showDetailModal.status} /> },
                { label: "IP Address", value: showDetailModal.ip || "—" },
                { label: "Timestamp", value: showDetailModal.detectedAt },
                { label: "Action Taken", value: showDetailModal.action },
              ].map((f) => (
                <div key={f.label} className="rounded-xl bg-[#f9fafb] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{f.label}</p>
                  <div className="mt-1 text-xs font-bold text-[#1a1a1a]">{f.value as React.ReactNode}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
              <button
                onClick={() => {
                  toast.success(`Alert ${showDetailModal.id} marked as cleared.`);
                  setShowDetailModal(null);
                }}
                className="rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-xs font-bold text-[#0c831f] hover:bg-[#e8f5e9]"
              >
                Clear Alert
              </button>
              <button
                onClick={() => {
                  toast.success(`${showDetailModal.customer} account has been blocked`);
                  setShowDetailModal(null);
                }}
                className="rounded-xl bg-[#dc2626] px-4 py-2 text-xs font-bold text-white hover:bg-[#b91c1c]"
              >
                Confirm Block
              </button>
            </div>
          </div>
        )}
      </ReusableModal>
    </DashboardLayout>
  );
}
