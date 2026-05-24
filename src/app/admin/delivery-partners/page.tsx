"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockDeliveryPartners } from "@/data/admin/misc";
import { Search, Plus, Bike, Star, DollarSign, Clock, MapPin, Phone, Mail, MoreHorizontal, Shield, ToggleLeft } from "lucide-react";
import { toast } from "sonner";

export default function DeliveryPartnersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockDeliveryPartners.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.zone.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    online: "bg-[#e8f5e9] text-[#0c831f]",
    busy: "bg-[#fffbeb] text-[#d97706]",
    offline: "bg-[#f6f7f6] text-[#666]",
    suspended: "bg-[#fef2f2] text-red-500",
  };

  const vehicleIcons: Record<string, React.ReactNode> = {
    bike: <Bike className="w-4 h-4" />,
    scooter: <Bike className="w-4 h-4" />,
    ev_scooter: <Bike className="w-4 h-4" />,
    cycle: <Bike className="w-4 h-4" />,
  };

  const onlineCount = mockDeliveryPartners.filter((p) => p.status === "online").length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Delivery Partner Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Delivery Riders</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage rider profiles, shifts, track earnings, and monitor delivery partner performance.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-bold text-[#0c831f]">{onlineCount} Online</span>
              <button onClick={() => toast.info("Opening add rider form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Add Rider</button>
            </div>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search by name, zone, or ID..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((partner) => (
            <div key={partner.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0c831f] text-lg font-black text-white">
                    {partner.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-black text-[#1a1a1a]">{partner.name}</h3>
                    <p className="text-xs text-[#999]">{partner.id}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[partner.status]}`}>{partner.status}</span>
              </div>

              <div className="mt-3 flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-[#d97706] fill-[#d97706]" />
                <span className="font-bold text-[#1a1a1a]">{partner.rating}</span>
                <span className="text-[#999]">· {partner.totalDeliveries.toLocaleString()} deliveries</span>
              </div>

              <div className="mt-3 space-y-1.5 text-sm text-[#666]">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{partner.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{partner.zone}</div>
                <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" />Earnings: <span className="font-semibold text-[#0c831f]">{partner.earnings}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />Shift: {partner.shift}</div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs text-[#666] flex items-center gap-1">{vehicleIcons[partner.vehicleType]}{partner.vehicleType.replace("_", " ")}</span>
                <span className="text-xs text-[#999]">Joined {partner.joinedAt}</span>
              </div>

              <div className="mt-3 flex gap-2 border-t border-[#e8e8e8] pt-3">
                <button onClick={() => toast.info(`Viewing ${partner.name}'s profile`)} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><Phone className="w-3.5 h-3.5" />Contact</button>
                {partner.status === "online" || partner.status === "busy" ? (
                  <button onClick={() => toast.info(`${partner.name} marked offline`)} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0]"><ToggleLeft className="w-3.5 h-3.5" />Offline</button>
                ) : null}
                {partner.status !== "suspended" && (
                  <button onClick={() => toast.warning(`${partner.name} suspended`)} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-[#fef2f2]"><Shield className="w-3.5 h-3.5" />Suspend</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
