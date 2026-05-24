"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockFraudScores, mockSuspiciousActivities } from "@/data/admin/operations";
import { Shield, AlertTriangle, Ban, Eye, Search, Filter, UserX, Check } from "lucide-react";
import { toast } from "sonner";

type FraudTab = "scores" | "activity" | "blacklist";

export default function FraudRiskPage() {
  const [tab, setTab] = useState<FraudTab>("scores");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Fraud & Risk</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Risk Management Center</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Monitor fraud scores, review suspicious activities, and manage blacklisted users.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toast.info("Review all flagged items")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Shield className="w-4 h-4" />Review All</button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Critical Risk", value: "1", color: "text-red-600", bg: "bg-[#fef2f2]" },
              { label: "High Risk", value: "2", color: "text-orange-600", bg: "bg-[#fff7ed]" },
              { label: "Medium Risk", value: "1", color: "text-amber-600", bg: "bg-[#fffbeb]" },
              { label: "Blocked Users", value: "1", color: "text-[#666]", bg: "bg-[#f6f7f6]" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-3xl p-4`}>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">{s.label}</p>
                <p className={`mt-2 text-2xl font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#e8e8e8] pb-2">
            {[
              { key: "scores" as FraudTab, label: "Fraud Scores" },
              { key: "activity" as FraudTab, label: "Suspicious Activity" },
              { key: "blacklist" as FraudTab, label: "Blacklist" },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${tab === t.key ? "bg-[#0c831f] text-white" : "text-[#666] hover:bg-[#f6f7f6]"}`}>{t.label}</button>
            ))}
          </div>
        </section>

        {tab === "scores" && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                    {["Customer", "Risk Score", "Level", "Flags", "Reason", "Status", "Last Flagged", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockFraudScores.map((f) => (
                    <tr key={f.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                      <td className="px-4 py-3 font-semibold text-[#1a1a1a]">{f.customerName}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-[#e8e8e8] overflow-hidden">
                            <div className={`h-full rounded-full ${f.riskScore >= 80 ? "bg-red-500" : f.riskScore >= 50 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${f.riskScore}%` }} />
                          </div>
                          <span className="font-bold">{f.riskScore}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${f.riskLevel === "critical" ? "bg-red-100 text-red-700" : f.riskLevel === "high" ? "bg-orange-100 text-orange-700" : f.riskLevel === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{f.riskLevel}</span>
                      </td>
                      <td className="px-4 py-3">{f.totalFlags}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate text-xs text-[#666]">{f.reason}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${f.status === "blocked" ? "bg-red-100 text-red-700" : f.status === "review" ? "bg-orange-100 text-orange-700" : f.status === "monitoring" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{f.status}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#666]">{f.lastFlagged}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => toast.info("Reviewing risk profile")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => toast.success("User blocked")} className="rounded-lg p-1.5 text-red-500 hover:bg-[#fef2f2]"><Ban className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "activity" && (
          <div className="space-y-3">
            {mockSuspiciousActivities.map((a) => (
              <div key={a.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${a.severity === "high" ? "text-red-500" : a.severity === "medium" ? "text-amber-500" : "text-yellow-500"}`} />
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">{a.activity}</h3>
                      <p className="text-sm text-[#666] mt-1">{a.details}</p>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#666]">
                        <span className="font-semibold">{a.customerName}</span>·<span>{a.timestamp}</span>·<span>{a.ipAddress}</span>·<span>{a.device}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.severity === "high" ? "bg-red-100 text-red-700" : a.severity === "medium" ? "bg-amber-100 text-amber-700" : "bg-yellow-100 text-yellow-700"}`}>{a.severity}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.status === "new" ? "bg-blue-100 text-blue-700" : a.status === "investigating" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>{a.status}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-[#e8e8e8] pt-3">
                  <button onClick={() => toast.info("Investigating activity")} className="text-xs font-semibold text-[#0c831f]"><Eye className="w-3 h-3 inline mr-1" />Investigate</button>
                  <button onClick={() => toast.success("User blocked")} className="text-xs font-semibold text-red-500"><UserX className="w-3 h-3 inline mr-1" />Block User</button>
                  <button onClick={() => toast.success("Marked as resolved")} className="text-xs font-semibold text-[#666]"><Check className="w-3 h-3 inline mr-1" />Resolve</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "blacklist" && (
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-12 shadow-sm text-center">
            <Ban className="mx-auto w-12 h-12 text-[#ccc]" />
            <h3 className="mt-4 text-lg font-black text-[#1a1a1a]">Blacklist Management</h3>
            <p className="mt-2 max-w-md mx-auto text-sm text-[#666]">View and manage blacklisted users. Blocked users cannot place orders or access their accounts.</p>
            <button onClick={() => toast.info("Showing blocked users")} className="mt-4 rounded-xl bg-[#0c831f] px-6 py-2.5 text-sm font-bold text-white">View Blacklisted Users</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
