"use client";

import DashboardLayout from "../dashboard-layout";
import { mockPickupStores } from "@/data/admin/misc";
import { Plus, MapPin, Clock, Phone, Store, Edit3, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function PickupStoresPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Pickup Stores</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Pickup Point Locations</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage pickup store locations, timing, and capacity for customer self-collection orders.</p>
            </div>
            <button onClick={() => toast.info("Opening add store form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Add Store</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Total Stores", value: mockPickupStores.length.toString() },
              { label: "Active Stores", value: mockPickupStores.filter(s => s.isActive).length.toString() },
              { label: "Total Capacity", value: mockPickupStores.reduce((a, s) => a + s.capacity, 0).toString() },
              { label: "Current Load", value: mockPickupStores.reduce((a, s) => a + s.currentLoad, 0).toString() },
            ].map((s) => (
              <div key={s.label} className="bg-[#e8f5e9] rounded-3xl p-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">{s.label}</p>
                <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mockPickupStores.map((ps) => (
            <div key={ps.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-[#0c831f]" />
                  <h3 className="font-black text-[#1a1a1a]">{ps.name}</h3>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ps.isActive ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fef2f2] text-red-500"}`}>{ps.isActive ? "Open" : "Closed"}</span>
              </div>
              <div className="space-y-2 text-sm text-[#666]">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{ps.address}, {ps.city} - {ps.pincode}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{ps.phone}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4" />{ps.timing}</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#666]">Capacity</span>
                  <span className="font-semibold">{ps.currentLoad}/{ps.capacity}</span>
                </div>
                <div className="h-2 rounded-full bg-[#e8e8e8] overflow-hidden">
                  <div className={`h-full rounded-full ${ps.currentLoad / ps.capacity > 0.5 ? "bg-amber-500" : "bg-[#0c831f]"}`} style={{ width: `${(ps.currentLoad / ps.capacity) * 100}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2 border-t border-[#e8e8e8] pt-3">
                <button onClick={() => toast.info("Editing store")} className="text-xs font-semibold text-[#666] hover:text-[#0c831f]"><Edit3 className="w-4 h-4 inline mr-1" />Edit</button>
                <button onClick={() => toast.info("Store deleted")} className="text-xs font-semibold text-red-500"><Trash2 className="w-4 h-4 inline mr-1" />Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
