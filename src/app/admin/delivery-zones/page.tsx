"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockDeliveryZones } from "@/data/admin/operations";
import { Search, Plus, MapPin, Edit3, Trash2, ToggleLeft, DollarSign, Clock, Bike } from "lucide-react";
import { toast } from "sonner";

export default function DeliveryZonesPage() {
  const [search, setSearch] = useState("");

  const filtered = mockDeliveryZones.filter((z) =>
    z.name.toLowerCase().includes(search.toLowerCase()) ||
    z.cities.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Delivery Zones</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Zone Management</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage delivery zones, set radius limits, and configure delivery fees for each service area.</p>
            </div>
            <button onClick={() => toast.info("Opening add zone form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Add Zone</button>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search zones or cities..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((zone) => (
            <div key={zone.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0c831f]" />
                  <h3 className="font-black text-[#1a1a1a]">{zone.name}</h3>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${zone.isActive ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fef2f2] text-red-500"}`}>{zone.isActive ? "Active" : "Inactive"}</span>
              </div>
              <p className="text-sm text-[#666]">{zone.cities.join(", ")}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-[#666]"><DollarSign className="w-4 h-4" />Base: ₹{zone.baseFee}</div>
                <div className="flex items-center gap-2 text-[#666]"><MapPin className="w-4 h-4" />Radius: {zone.radiusKm} km</div>
                <div className="flex items-center gap-2 text-[#666]"><Bike className="w-4 h-4" />{zone.riders} riders</div>
                <div className="flex items-center gap-2 text-[#666]"><Clock className="w-4 h-4" />{zone.estimatedDelivery}</div>
              </div>
              <div className="mt-3 text-sm text-[#0c831f] font-semibold">Free delivery above ₹{zone.minOrderForFree}</div>
              <div className="mt-4 flex gap-2 border-t border-[#e8e8e8] pt-3">
                <button onClick={() => toast.info("Editing zone")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" />Edit</button>
                <button onClick={() => toast.info("Zone toggled")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><ToggleLeft className="w-4 h-4" />{zone.isActive ? "Deactivate" : "Activate"}</button>
                <button onClick={() => toast.info("Zone deleted")} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-[#fef2f2]"><Trash2 className="w-4 h-4" />Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
