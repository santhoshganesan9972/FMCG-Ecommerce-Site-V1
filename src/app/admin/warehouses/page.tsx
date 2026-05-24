"use client";

import DashboardLayout from "../dashboard-layout";
import { mockWarehouses } from "@/data/admin/operations";
import { Plus, Building2, MapPin, Package, Users, Clock, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function WarehousesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Warehouse Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Warehouses & Store Locations</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage warehouses, cold storage facilities, and depots across all service regions.</p>
            </div>
            <button onClick={() => toast.info("Opening add warehouse form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Add Warehouse</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {[
              { label: "Total Warehouses", value: mockWarehouses.length.toString(), accent: "bg-[#e8f5e9]" },
              { label: "Total Capacity", value: "1,85,000", accent: "bg-[#f5f9e9]" },
              { label: "Used Capacity", value: "1,34,700", accent: "bg-[#fff4f6]" },
              { label: "Total SKUs", value: "4,280", accent: "bg-[#eff7ff]" },
              { label: "Total Staff", value: "108", accent: "bg-[#f5f0ff]" },
            ].map((s) => (
              <div key={s.label} className={`${s.accent} rounded-3xl p-4`}>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">{s.label}</p>
                <p className="mt-3 text-2xl font-black text-[#1a1a1a]">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          {mockWarehouses.map((w) => (
            <div key={w.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${w.type === "cold_storage" ? "bg-[#eff7ff]" : w.type === "hub" ? "bg-[#e8f5e9]" : "bg-[#fffbeb]"}`}>
                    <Building2 className={`w-5 h-5 ${w.type === "cold_storage" ? "text-[#0369a1]" : w.type === "hub" ? "text-[#0c831f]" : "text-[#d97706]"}`} />
                  </div>
                  <div>
                    <h3 className="font-black text-[#1a1a1a]">{w.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${w.type === "hub" ? "bg-[#e8f5e9] text-[#0c831f]" : w.type === "cold_storage" ? "bg-[#eff7ff] text-[#0369a1]" : "bg-[#fffbeb] text-[#d97706]"}`}>{w.type.replace("_", " ")}</span>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${w.isActive ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fef2f2] text-red-500"}`}>{w.isActive ? "Active" : "Inactive"}</span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-[#666]"><MapPin className="w-4 h-4" />{w.address}, {w.city}, {w.state} - {w.pincode}</div>
                <div className="flex items-center gap-2 text-[#666]"><Package className="w-4 h-4" />{w.totalSkus} SKUs · {w.usedCapacity}/{w.totalCapacity} units used ({Math.round(w.usedCapacity / w.totalCapacity * 100)}%)</div>
                <div className="flex items-center gap-2 text-[#666]"><Users className="w-4 h-4" />{w.staffCount} staff</div>
                <div className="flex items-center gap-2 text-[#666]"><Clock className="w-4 h-4" />{w.operatingHours}</div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-[#e8e8e8] overflow-hidden">
                    <div className="h-full rounded-full bg-[#0c831f]" style={{ width: `${Math.round(w.usedCapacity / w.totalCapacity * 100)}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-[#666]">{Math.round(w.usedCapacity / w.totalCapacity * 100)}%</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2 border-t border-[#e8e8e8] pt-3">
                <button onClick={() => toast.info("Editing warehouse")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" />Edit</button>
                <button onClick={() => toast.info("Opening transfer stock")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Package className="w-4 h-4" />Transfer Stock</button>
                <button onClick={() => toast.info("Warehouse deleted")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-[#fef2f2]"><Trash2 className="w-4 h-4" />Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
