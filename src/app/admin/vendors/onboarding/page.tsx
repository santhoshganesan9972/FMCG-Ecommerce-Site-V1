"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { UserPlus, CheckCircle, Clock, XCircle, Eye, Search } from "lucide-react";
import { toast } from "sonner";

const onboardingVendors = [
  { id: "VND-101", company: "Fresh Farms Ltd.", owner: "Rajesh Patel", email: "rajesh@freshfarms.com", phone: "+91-98765-43210", category: "Fruits & Vegetables", status: "pending_review", applied: "2026-05-18", documents: ["GST", "PAN", "Bank Details"] },
  { id: "VND-102", company: "Daily Dairy Co.", owner: "Meena Sharma", email: "meena@dailydairy.com", phone: "+91-98765-43211", category: "Dairy", status: "approved", applied: "2026-05-16", documents: ["GST", "PAN", "Bank Details", "FSSAI"] },
  { id: "VND-103", company: "Organic Harvest", owner: "Vikram Singh", email: "vikram@organicharvest.com", phone: "+91-98765-43212", category: "Organic Foods", status: "pending_documents", applied: "2026-05-15", documents: ["GST", "PAN"] },
  { id: "VND-104", company: "Spice World", owner: "Anita Gupta", email: "anita@spiceworld.com", phone: "+91-98765-43213", category: "Spices", status: "rejected", applied: "2026-05-14", documents: ["GST", "PAN", "Bank Details"], rejection_reason: "Incomplete documentation" },
  { id: "VND-105", company: "Baker's Delight", owner: "Suresh Reddy", email: "suresh@bakersdelight.com", phone: "+91-98765-43214", category: "Bakery", status: "pending_review", applied: "2026-05-13", documents: ["GST", "PAN"] },
];

export default function VendorOnboardingPage() {
  const [search, setSearch] = useState("");
  const [showApproveModal, setShowApproveModal] = useState<{ id: string; company: string } | null>(null);

  const filtered = onboardingVendors.filter(v =>
    !search || v.company.toLowerCase().includes(search.toLowerCase()) || v.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id: string) => {
    toast.success(`Vendor ${id} approved successfully`);
    setShowApproveModal(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Vendors</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Vendor Onboarding</h1>
              <p className="mt-2 text-sm text-[#666]">Review and approve new vendor applications.</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <UserPlus className="h-4 w-4" /> Invite Vendor
            </button>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search by company name or ID..." />

        {/* Onboarding Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Vendor ID</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Documents</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e8e8]">
              {filtered.map((v) => (
                <tr key={v.id} className="text-sm hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-bold text-[#0c831f]">{v.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-[#1a1a1a]">{v.company}</p>
                    <p className="text-xs text-[#999]">{v.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[#666]">{v.owner}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-lg bg-[#f6f7f6] px-2 py-1 text-xs text-[#666]">{v.category}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                  <td className="px-4 py-3 text-xs text-[#999]">{v.applied}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {v.documents.map((d) => (
                        <span key={d} className="rounded bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-semibold text-[#666]">{d}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {v.status === "pending_review" && (
                        <>
                          <button onClick={() => setShowApproveModal({ id: v.id, company: v.company })} className="rounded-lg bg-[#e8f5e9] p-1.5 text-[#0c831f] hover:bg-[#d0edd4]">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg bg-[#fef2f2] p-1.5 text-[#dc2626] hover:bg-[#fee2e2]">
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8]">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Approve Confirmation Modal */}
        {showApproveModal && (
          <ReusableModal open={true} onClose={() => setShowApproveModal(null)} title="Approve Vendor" size="sm">
            <div className="space-y-4">
              <p className="text-sm text-[#666]">
                Are you sure you want to approve <span className="font-bold text-[#1a1a1a]">{showApproveModal.company}</span> ({showApproveModal.id})?
                The vendor will gain access to the platform.
              </p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowApproveModal(null)} className="rounded-lg border border-[#e8e8e8] px-4 py-2 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
                <button onClick={() => handleApprove(showApproveModal.id)} className="rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]">Approve Vendor</button>
              </div>
            </div>
          </ReusableModal>
        )}
      </div>
    </DashboardLayout>
  );
}
