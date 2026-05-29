<<<<<<< HEAD
"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Truck, Bike, Fuel, Wrench, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const fleet = [
  { id: "VH-001", type: "Honda Activa", regNo: "RJ14 AB 1234", partner: "Rahul Verma", status: "active", lastService: "2026-05-10", nextService: "2026-06-10", condition: "good" },
  { id: "VH-002", type: "TVS iQube", regNo: "RJ14 CD 5678", partner: "Priya Mehta", status: "active", lastService: "2026-05-05", nextService: "2026-06-05", condition: "excellent" },
  { id: "VH-003", type: "Hero Splendor", regNo: "RJ14 EF 9012", partner: "Amit Singh", status: "active", lastService: "2026-04-20", nextService: "2026-05-20", condition: "fair" },
  { id: "VH-004", type: "Ola Electric", regNo: "RJ14 GH 3456", partner: "Sunita Yadav", status: "maintenance", lastService: "2026-05-01", nextService: "2026-06-01", condition: "needs_service" },
  { id: "VH-005", type: "Bajaj CT 100", regNo: "RJ14 IJ 7890", partner: "Vikram Joshi", status: "inactive", lastService: "2026-03-15", nextService: "2026-04-15", condition: "poor" },
];

const fleetStats = [
  { label: "Total Vehicles", value: "45", icon: Truck, color: "text-[#2563eb]" },
  { label: "Active", value: "32", icon: CheckCircle, color: "text-[#0c831f]" },
  { label: "Under Maintenance", value: "8", icon: Wrench, color: "text-[#d97706]" },
  { label: "Offline", value: "5", icon: XCircle, color: "text-[#dc2626]" },
];

export default function FleetDashboardPage() {
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = fleet.filter(v => !statusFilter || v.status === statusFilter);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Delivery</p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Fleet Dashboard</h1>
          <p className="mt-1.5 text-xs text-[#666]">Manage delivery vehicle fleet, track maintenance, and monitor vehicle health.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {fleetStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
              <div className="flex items-center gap-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="text-xs text-[#666]">{s.label}</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[#1a1a1a]">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {["", "active", "maintenance", "inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                statusFilter === s ? "bg-[#0c831f] text-white" : "bg-[#f6f7f6] text-[#666] hover:bg-[#e8e8e8]"
              }`}
            >
              {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Vehicle ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Registration</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Last Service</th>
                <th className="px-4 py-3">Next Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e8e8]">
              {filtered.map((v) => (
                <tr key={v.id} className="text-sm hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-bold text-[#0c831f]">{v.id}</td>
                  <td className="px-4 py-3 font-bold text-[#1a1a1a]">{v.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#666]">{v.regNo}</td>
                  <td className="px-4 py-3 text-[#666]">{v.partner}</td>
                  <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      v.condition === "excellent" ? "bg-[#e8f5e9] text-[#0c831f]" :
                      v.condition === "good" ? "bg-[#eff6ff] text-[#2563eb]" :
                      v.condition === "fair" ? "bg-[#fffbeb] text-[#d97706]" :
                      "bg-[#fef2f2] text-[#dc2626]"
                    }`}>{v.condition.replace("_", " ")}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#999]">{v.lastService}</td>
                  <td className="px-4 py-3 text-xs text-[#999]">{v.nextService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
=======
"use client";

import { useState } from "react";

import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Truck, Bike, Fuel, Wrench, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const fleet = [
  { id: "VH-001", type: "Honda Activa", regNo: "RJ14 AB 1234", partner: "Rahul Verma", status: "active", lastService: "2026-05-10", nextService: "2026-06-10", condition: "good" },
  { id: "VH-002", type: "TVS iQube", regNo: "RJ14 CD 5678", partner: "Priya Mehta", status: "active", lastService: "2026-05-05", nextService: "2026-06-05", condition: "excellent" },
  { id: "VH-003", type: "Hero Splendor", regNo: "RJ14 EF 9012", partner: "Amit Singh", status: "active", lastService: "2026-04-20", nextService: "2026-05-20", condition: "fair" },
  { id: "VH-004", type: "Ola Electric", regNo: "RJ14 GH 3456", partner: "Sunita Yadav", status: "maintenance", lastService: "2026-05-01", nextService: "2026-06-01", condition: "needs_service" },
  { id: "VH-005", type: "Bajaj CT 100", regNo: "RJ14 IJ 7890", partner: "Vikram Joshi", status: "inactive", lastService: "2026-03-15", nextService: "2026-04-15", condition: "poor" },
];

const fleetStats = [
  { label: "Total Vehicles", value: "45", icon: Truck, color: "text-[#2563eb]" },
  { label: "Active", value: "32", icon: CheckCircle, color: "text-[#0c831f]" },
  { label: "Under Maintenance", value: "8", icon: Wrench, color: "text-[#d97706]" },
  { label: "Offline", value: "5", icon: XCircle, color: "text-[#dc2626]" },
];

export default function FleetDashboardPage() {
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = fleet.filter(v => !statusFilter || v.status === statusFilter);

  return (      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Delivery</p>
          <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Fleet Dashboard</h1>
          <p className="mt-1.5 text-xs text-[#666]">Manage delivery vehicle fleet, track maintenance, and monitor vehicle health.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {fleetStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
              <div className="flex items-center gap-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="text-xs text-[#666]">{s.label}</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[#1a1a1a]">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {["", "active", "maintenance", "inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                statusFilter === s ? "bg-[#0c831f] text-white" : "bg-[#f6f7f6] text-[#666] hover:bg-[#e8e8e8]"
              }`}
            >
              {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Vehicle ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Registration</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Last Service</th>
                <th className="px-4 py-3">Next Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e8e8]">
              {filtered.map((v) => (
                <tr key={v.id} className="text-sm hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-bold text-[#0c831f]">{v.id}</td>
                  <td className="px-4 py-3 font-bold text-[#1a1a1a]">{v.type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#666]">{v.regNo}</td>
                  <td className="px-4 py-3 text-[#666]">{v.partner}</td>
                  <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      v.condition === "excellent" ? "bg-[#e8f5e9] text-[#0c831f]" :
                      v.condition === "good" ? "bg-[#eff6ff] text-[#2563eb]" :
                      v.condition === "fair" ? "bg-[#fffbeb] text-[#d97706]" :
                      "bg-[#fef2f2] text-[#dc2626]"
                    }`}>{v.condition.replace("_", " ")}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#999]">{v.lastService}</td>
                  <td className="px-4 py-3 text-xs text-[#999]">{v.nextService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>  );
}
>>>>>>> 2ac58d4c4af2a3758793e33358d3e0b04f36e85b
