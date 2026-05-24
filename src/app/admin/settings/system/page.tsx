"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Terminal, Database, ScrollText, Timer, HeartPulse } from "lucide-react";

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function SystemSettingsPage() {
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [queueEnabled, setQueueEnabled] = useState(true);

  const systemHealth = [
    { label: "Server Status", value: "Operational", status: "good" },
    { label: "Database", value: "Connected (2.3s avg query)", status: "good" },
    { label: "Redis Cache", value: "Connected (0.4ms latency)", status: "good" },
    { label: "Queue Worker", value: "Running (8 processes)", status: "good" },
    { label: "Storage", value: "42% used (28.5 GB / 68 GB)", status: "good" },
    { label: "Memory", value: "64% used (3.2 GB / 5 GB)", status: "good" },
  ];

  return (
    <DashboardLayout>
      <SettingsErrorBoundary>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Settings</p>
            <h1 className="text-xl font-black text-[#1a1a1a]">System Settings</h1>
          </div>
        </div>

        {/* System Health */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">System Health</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {systemHealth.map(({ label, value, status }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <span className={`h-2.5 w-2.5 rounded-full ${status === "good" ? "bg-[#0c831f] stock-pulse" : "bg-[#ff4f8b]"}`} />
                <div>
                  <p className="text-xs font-bold text-[#666]">{label}</p>
                  <p className="text-sm font-black text-[#1a1a1a]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cache & Queue */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Cache Settings</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">Redis Cache</p>
                  <p className="text-xs text-[#666]">In-memory caching for fast page loads</p>
                </div>
                <button onClick={() => setCacheEnabled(!cacheEnabled)} className={`relative h-6 w-11 rounded-full ${cacheEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${cacheEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Cache TTL (seconds)</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>300 (5 min)</option>
                  <option>600 (10 min)</option>
                  <option selected>3600 (1 hour)</option>
                </select>
              </div>
              <button className="w-full rounded-lg bg-[#fff0f6] py-2 text-sm font-bold text-[#ff4f8b] transition hover:bg-[#ff4f8b] hover:text-white">Clear Cache Now</button>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ScrollText className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Queue Settings</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">Queue Worker</p>
                  <p className="text-xs text-[#666]">Background job processing for emails, SMS & tasks</p>
                </div>
                <button onClick={() => setQueueEnabled(!queueEnabled)} className={`relative h-6 w-11 rounded-full ${queueEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${queueEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Queue Driver</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option selected>Redis</option>
                  <option>Database</option>
                  <option>SQS (AWS)</option>
                  <option>Beanstalkd</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2">
                <span className="text-xs font-bold text-[#666]">Pending Jobs</span>
                <span className="text-xs font-black text-[#0c831f]">23</span>
              </div>
            </div>
          </section>
        </div>

        {/* Log Settings & Cron Jobs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ScrollText className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Log Settings</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#666]">Log Level</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>Debug</option>
                  <option selected>Info</option>
                  <option>Warning</option>
                  <option>Error</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Log Retention</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                  <option>7 days</option>
                  <option selected>30 days</option>
                  <option>90 days</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2">
                <span className="text-xs font-bold text-[#666]">Logs Size</span>
                <span className="text-xs font-black text-[#1a1a1a]">1.2 GB</span>
              </div>
              <button className="w-full rounded-lg border-2 border-dashed border-[#e8e8e8] py-2 text-sm font-bold text-[#ff4f8b] hover:border-[#ff4f8b]">Clear Logs</button>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Timer className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Cron Jobs</h2>
            </div>
            <div className="space-y-2">
              {[
                { job: "Daily Backup", schedule: "0 3 * * *", last: "Today 03:00 AM", status: "Success" },
                { job: "Sitemap Generate", schedule: "0 4 * * *", last: "Today 04:00 AM", status: "Success" },
                { job: "Cache Warmup", schedule: "*/30 * * * *", last: "12:30 PM", status: "Success" },
                { job: "Analytics Sync", schedule: "0 */2 * * *", last: "11:00 AM", status: "Success" },
                { job: "Expire Sessions", schedule: "0 */6 * * *", last: "12:00 PM", status: "Success" },
                { job: "Send Reminders", schedule: "0 9 * * *", last: "Today 09:00 AM", status: "Success" },
              ].map(({ job, schedule, last, status }) => (
                <div key={job} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2">
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">{job}</p>
                    <code className="text-[10px] font-mono text-[#999]">{schedule}</code>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#666]">{last}</p>
                    <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-bold text-[#0c831f]">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]">Cancel</Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">Save Changes</button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
