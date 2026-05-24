"use client";

import DashboardLayout from "../dashboard-layout";
import { Download, Trash2, Shield, Check, FileText, UserX } from "lucide-react";
import { toast } from "sonner";

export default function DataPrivacyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Data Privacy</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Privacy Management</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage user data privacy requests including data exports, account deletion, and consent settings.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#e8e8e8] p-5">
              <div className="rounded-xl bg-[#eff7ff] p-3 w-fit"><Download className="w-6 h-6 text-[#0369a1]" /></div>
              <h3 className="mt-3 font-black text-[#1a1a1a]">User Data Export</h3>
              <p className="mt-2 text-sm text-[#666]">Export all user data including profile, orders, and activity logs in compliance with data protection regulations.</p>
              <button onClick={() => toast.success("Data export initiated")} className="mt-4 rounded-xl bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">Request Export</button>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] p-5">
              <div className="rounded-xl bg-[#fef2f2] p-3 w-fit"><UserX className="w-6 h-6 text-red-500" /></div>
              <h3 className="mt-3 font-black text-[#1a1a1a]">Delete Requests</h3>
              <p className="mt-2 text-sm text-[#666]">Process user account deletion requests. Data will be permanently removed after the retention period.</p>
              <button onClick={() => toast.info("Showing delete requests")} className="mt-4 rounded-xl border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa]">View Requests</button>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] p-5">
              <div className="rounded-xl bg-[#e8f5e9] p-3 w-fit"><Shield className="w-6 h-6 text-[#0c831f]" /></div>
              <h3 className="mt-3 font-black text-[#1a1a1a]">Consent Settings</h3>
              <p className="mt-2 text-sm text-[#666]">Configure user consent preferences for data collection, marketing communications, and cookie usage.</p>
              <button onClick={() => toast.info("Opening consent settings")} className="mt-4 rounded-xl border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa]">Configure</button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#f6f7f6] p-5">
            <h3 className="font-black text-[#1a1a1a] mb-3">Recent Privacy Requests</h3>
            <div className="space-y-3">
              {[
                { type: "Data Export", user: "John Doe", status: "Completed", date: "2026-05-21" },
                { type: "Account Deletion", user: "Jane Smith", status: "Pending Review", date: "2026-05-20" },
                { type: "Consent Update", user: "Bob Johnson", status: "Approved", date: "2026-05-19" },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-white border border-[#e8e8e8] p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#0c831f]" />
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a]">{r.type}</p>
                      <p className="text-xs text-[#666]">{r.user} · {r.date}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.status === "Completed" ? "bg-[#e8f5e9] text-[#0c831f]" : r.status === "Approved" ? "bg-[#eff7ff] text-[#0369a1]" : "bg-[#fffbeb] text-[#d97706]"}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
