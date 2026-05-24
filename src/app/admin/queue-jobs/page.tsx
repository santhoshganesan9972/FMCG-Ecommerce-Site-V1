"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockQueueJobs } from "@/data/admin/misc";
import { Search, Filter, RotateCcw, XCircle, Layers3, BarChart3, Zap, AlertTriangle, CheckCircle2, Clock, Ban } from "lucide-react";
import { toast } from "sonner";

export default function QueueJobsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = mockQueueJobs.filter((j) => {
    const matchesSearch = j.id.toLowerCase().includes(search.toLowerCase()) || j.queue.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || j.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Pending", value: mockQueueJobs.filter((j) => j.status === "pending").length, color: "text-[#0369a1]" },
    { label: "Processing", value: mockQueueJobs.filter((j) => j.status === "processing").length, color: "text-[#d97706]" },
    { label: "Failed", value: mockQueueJobs.filter((j) => j.status === "failed").length, color: "text-red-500" },
    { label: "Completed", value: mockQueueJobs.filter((j) => j.status === "completed").length, color: "text-[#0c831f]" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-[#eff7ff] text-[#0369a1]",
    processing: "bg-[#fffbeb] text-[#d97706]",
    completed: "bg-[#e8f5e9] text-[#0c831f]",
    failed: "bg-[#fef2f2] text-red-500",
    cancelled: "bg-[#f6f7f6] text-[#666]",
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Queue & Job Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Job Queues</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Monitor and manage notification queues, order processing, report generation, and billing jobs.</p>
            </div>
            <button onClick={() => toast.success("All failed jobs queued for retry")} className="flex items-center gap-2 rounded-lg bg-[#d97706] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b45309]"><RotateCcw className="w-4 h-4" />Retry All Failed</button>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-[#e8e8e8] bg-white p-3 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-[#666]">{s.label}</p>
                <p className={`mt-1 text-2xl font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input type="text" placeholder="Search jobs by ID or queue..." className="w-full rounded-xl border border-[#e8e8e8] py-2 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1.5">
              {["all", "pending", "processing", "completed", "failed"].map((s) => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filterStatus === s ? "bg-[#0c831f] text-white" : "bg-[#f6f7f6] text-[#666] hover:bg-[#e8e8e8]"}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["Job ID", "Queue", "Type", "Priority", "Status", "Attempts", "Created", "Error", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((job) => (
                  <tr key={job.id} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1a1a1a]">{job.id}</td>
                    <td className="px-4 py-3 text-[#666]">{job.queue}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs text-[#666]">{job.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${job.priority === "critical" ? "bg-red-50 text-red-600" : job.priority === "high" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#f6f7f6] text-[#666]"}`}>{job.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[job.status] || ""}`}>{job.status}</span>
                    </td>
                    <td className="px-4 py-3">{job.attempts}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{job.createdAt}</td>
                    <td className="px-4 py-3 max-w-[150px]">
                      {job.error ? (
                        <span className="text-xs text-red-500 truncate block" title={job.error}>{job.error}</span>
                      ) : (
                        <span className="text-xs text-[#999]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {(job.status === "failed" || job.status === "pending") && (
                          <button onClick={() => toast.success(`Job ${job.id} queued for retry`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#d97706]" title="Retry Job"><RotateCcw className="w-4 h-4" /></button>
                        )}
                        {(job.status === "pending" || job.status === "processing") && (
                          <button onClick={() => toast.success(`Job ${job.id} cancelled`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-red-500" title="Cancel Job"><XCircle className="w-4 h-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
