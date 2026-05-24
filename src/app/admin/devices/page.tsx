"use client";

import DashboardLayout from "../dashboard-layout";
import { mockActiveSessions } from "@/data/admin/operations";
import { Smartphone, Laptop, Tablet, Monitor, Globe, LogOut, Ban, Search } from "lucide-react";
import { toast } from "sonner";

export default function DevicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Device & Session</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Active Sessions</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">View and manage all active user sessions across devices. Monitor login activity and enforce security.</p>
            </div>
            <button onClick={() => toast.success("All other sessions logged out")} className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"><LogOut className="w-4 h-4" />Logout All</button>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search by customer name or device..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" />
          </div>
        </section>

        <div className="space-y-3">
          {mockActiveSessions.map((s) => (
            <div key={s.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#f6f7f6] p-2.5">
                    {s.deviceType === "mobile" ? <Smartphone className="w-5 h-5 text-[#0c831f]" /> : s.deviceType === "tablet" ? <Tablet className="w-5 h-5 text-[#ff4f8b]" /> : <Monitor className="w-5 h-5 text-[#6366f1]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#1a1a1a]">{s.customerName}</h3>
                      {s.isCurrent && <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-semibold text-[#0c831f]">Current</span>}
                    </div>
                    <p className="text-sm text-[#666] mt-1">{s.browser} · {s.os}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#999]">
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{s.ipAddress}</span>
                      <span>{s.location}</span>
                      <span>Last active: {s.lastActive}</span>
                      <span>Login: {s.loginTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toast.success("Session terminated")} className="rounded-lg p-2 text-[#666] hover:bg-[#fef2f2] hover:text-red-500"><LogOut className="w-4 h-4" /></button>
                  <button onClick={() => toast.success("Device blocked")} className="rounded-lg p-2 text-[#666] hover:bg-[#fef2f2] hover:text-red-500"><Ban className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
