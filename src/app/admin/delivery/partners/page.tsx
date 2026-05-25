"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Truck, Phone, MapPin, Star, UserPlus, Eye } from "lucide-react";

const partners = [
  { id: "DP-001", name: "Rahul Verma", phone: "+91-98765-43201", vehicle: "Honda Activa - RJ14 AB 1234", zone: "North Zone", rating: 4.8, deliveries: 1245, status: "online" },
  { id: "DP-002", name: "Priya Mehta", phone: "+91-98765-43202", vehicle: "TVS iQube - RJ14 CD 5678", zone: "East Zone", rating: 4.9, deliveries: 980, status: "online" },
  { id: "DP-003", name: "Amit Singh", phone: "+91-98765-43203", vehicle: "Hero Splendor - RJ14 EF 9012", zone: "West Zone", rating: 4.6, deliveries: 2100, status: "busy" },
  { id: "DP-004", name: "Sunita Yadav", phone: "+91-98765-43204", vehicle: "Ola Electric - RJ14 GH 3456", zone: "South Zone", rating: 4.7, deliveries: 1560, status: "online" },
  { id: "DP-005", name: "Vikram Joshi", phone: "+91-98765-43205", vehicle: "Bajaj CT 100 - RJ14 IJ 7890", zone: "Central Zone", rating: 4.4, deliveries: 890, status: "offline" },
  { id: "DP-006", name: "Neha Kapoor", phone: "+91-98765-43206", vehicle: "Honda Activa - RJ14 KL 1234", zone: "North Zone", rating: 4.8, deliveries: 1780, status: "online" },
];

export default function DeliveryPartnersPage() {
  const [search, setSearch] = useState("");
  const filtered = partners.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.zone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Delivery</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Delivery Partners</h1>
              <p className="mt-2 text-sm text-[#666]">Manage and monitor all delivery partners on the platform.</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <UserPlus className="h-4 w-4" /> Add Partner
            </button>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search by name or zone..." />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-sm hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5e9]">
                    <Truck className="h-5 w-5 text-[#0c831f]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{p.name}</p>
                    <p className="flex items-center gap-1 text-xs text-[#999]">
                      <Phone className="h-3 w-3" /> {p.phone}
                    </p>
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-[#666]">
                <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#2563eb]" /> {p.zone} - {p.vehicle}</p>
                <p className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[#d97706]" /> {p.rating} rating · {p.deliveries} deliveries</p>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#e8e8e8] pt-3">
                <span className="text-[10px] font-mono text-[#999]">{p.id}</span>
                <button className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8]">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
