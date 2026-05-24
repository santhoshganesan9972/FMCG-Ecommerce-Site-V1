"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Copy, Database, RefreshCcw, Download, Upload, Clock } from "lucide-react";

export default function BackupRestorePage() {
  const [autoBackup, setAutoBackup] = useState(true);

  const backups = [
    { date: "May 21, 2026 03:00 AM", size: "2.4 GB", type: "Full", status: "success" },
    { date: "May 20, 2026 03:00 AM", size: "2.3 GB", type: "Full", status: "success" },
    { date: "May 19, 2026 03:00 AM", size: "2.3 GB", type: "Full", status: "success" },
    { date: "May 18, 2026 03:00 AM", size: "2.2 GB", type: "Full", status: "success" },
    { date: "May 17, 2026 12:00 PM", size: "450 MB", type: "Incremental", status: "success" },
    { date: "May 17, 2026 03:00 AM", size: "2.2 GB", type: "Full", status: "success" },
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
            <h1 className="text-xl font-black text-[#1a1a1a]">Backup & Restore</h1>
          </div>
        </div>

        {/* Backup Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Backups", value: "48", icon: Copy, color: "text-[#0c831f]" },
            { label: "Storage Used", value: "28.5 GB", icon: Database, color: "text-[#ff4f8b]" },
            { label: "Last Backup", value: "3 hours ago", icon: RefreshCcw, color: "text-[#0c831f]" },
            { label: "Next Backup", value: "03:00 AM", icon: Clock, color: "text-[#ff4f8b]" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${color}`} />
                <p className="text-[10px] font-bold text-[#666]">{label}</p>
              </div>
              <p className={`mt-1 text-lg font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Backup Schedule */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCcw className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Backup Schedule</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Auto Backup</p>
                <p className="text-xs text-[#666]">Daily automated backups</p>
              </div>
              <button onClick={() => setAutoBackup(!autoBackup)} className={`relative h-6 w-11 rounded-full ${autoBackup ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${autoBackup ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Backup Time</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                <option>12:00 AM (Midnight)</option>
                <option selected>03:00 AM</option>
                <option>06:00 AM</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Retention Period</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none">
                <option>7 days</option>
                <option selected>30 days</option>
                <option>90 days</option>
              </select>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Upload className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Manual Backup</h2>
            </div>
            <p className="text-xs text-[#666] mb-4">Create a full backup of the database and all assets immediately.</p>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0c831f] py-3 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">
              <Database className="h-4 w-4" />
              Create Backup Now
            </button>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Download className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Export Database</h2>
            </div>
            <p className="text-xs text-[#666] mb-4">Download a SQL dump or JSON export of your platform data.</p>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#ff4f8b] py-3 text-sm font-bold text-[#ff4f8b] transition hover:bg-[#fff0f6]">
              <Download className="h-4 w-4" />
              Export as SQL
            </button>
          </section>
        </div>

        {/* Backup History */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Copy className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Recent Backups</h2>
          </div>
          <div className="space-y-1">
            {backups.map(({ date, size, type, status }) => (
              <div key={date} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-2.5 text-sm">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${status === "success" ? "bg-[#0c831f]" : "bg-[#ff4f8b]"}`} />
                  <span className="font-bold text-[#1a1a1a]">{date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#999]">{size}</span>
                  <span className="rounded bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-bold text-[#666]">{type}</span>
                  <button className="text-xs font-bold text-[#ff4f8b] hover:underline">Restore</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]">Cancel</Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">Save Changes</button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
