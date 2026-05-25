"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { Truck, MapPin, Eye, Star, Phone, Gauge, Users, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Partner {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  status: string;
  currentOrders: number;
  totalDeliveries: number;
  rating: number;
  zone: string;
  earnings: string;
  joinedAt: string;
}

const mockPartners: Partner[] = [
  { id: "DP-001", name: "Rahul Sharma", phone: "+91 98765 43201", vehicleType: "bike", status: "online", currentOrders: 2, totalDeliveries: 3420, rating: 4.9, zone: "Mumbai Metro", earnings: "₹1.82L", joinedAt: "2024-01-10" },
  { id: "DP-002", name: "Suresh Reddy", phone: "+91 98765 43202", vehicleType: "scooter", status: "busy", currentOrders: 1, totalDeliveries: 2150, rating: 4.7, zone: "Mumbai Metro", earnings: "₹1.20L", joinedAt: "2024-03-15" },
  { id: "DP-003", name: "Amit Kumar", phone: "+91 98765 43203", vehicleType: "bike", status: "online", currentOrders: 0, totalDeliveries: 1890, rating: 4.8, zone: "Delhi NCR", earnings: "₹98K", joinedAt: "2024-04-01" },
  { id: "DP-004", name: "Vijay Singh", phone: "+91 98765 43204", vehicleType: "cycle", status: "offline", currentOrders: 0, totalDeliveries: 890, rating: 4.5, zone: "Delhi NCR", earnings: "₹45K", joinedAt: "2024-06-01" },
  { id: "DP-005", name: "Manoj Patil", phone: "+91 98765 43205", vehicleType: "bike", status: "online", currentOrders: 3, totalDeliveries: 1560, rating: 4.6, zone: "Pune City", earnings: "₹78K", joinedAt: "2024-05-15" },
  { id: "DP-006", name: "Sneha Kulkarni", phone: "+91 98765 43206", vehicleType: "scooter", status: "online", currentOrders: 1, totalDeliveries: 980, rating: 4.9, zone: "Pune City", earnings: "₹52K", joinedAt: "2024-08-01" },
  { id: "DP-007", name: "Rajesh Gupta", phone: "+91 98765 43207", vehicleType: "bike", status: "offline", currentOrders: 0, totalDeliveries: 2340, rating: 4.7, zone: "Bangalore Central", earnings: "₹1.15L", joinedAt: "2024-02-01" },
  { id: "DP-008", name: "Kiran Patel", phone: "+91 98765 43208", vehicleType: "ev_scooter", status: "busy", currentOrders: 2, totalDeliveries: 450, rating: 4.4, zone: "Bangalore Central", earnings: "₹28K", joinedAt: "2026-01-10" },
];

export default function DeliveryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = mockPartners.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.zone.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const online = mockPartners.filter(p => p.status === "online").length;
  const busy = mockPartners.filter(p => p.status === "busy").length;
  const totalDeliveries = mockPartners.reduce((s, p) => s + p.totalDeliveries, 0);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Delivery</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Logistics & Fleet Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage delivery partners, track live orders, view fleet analytics, and optimize routes.
              </p>
            </div>
            <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Delivery Partners" value={mockPartners.length} icon={<Users className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Online Now" value={online} icon={<Truck className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="On Delivery" value={busy} icon={<MapPin className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Total Deliveries" value={totalDeliveries.toLocaleString()} icon={<Gauge className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
        </div>

        {/* Fleet Status Overview */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Fleet</p>
            <h3 className="text-sm font-black text-[#1a1a1a]">Real-time Fleet Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Available", count: online, color: "bg-[#0c831f]", icon: Truck },
              { label: "Busy", count: busy, color: "bg-[#d97706]", icon: MapPin },
              { label: "Offline", count: mockPartners.filter(p => p.status === "offline").length, color: "bg-[#999]", icon: Phone },
              { label: "Total", count: mockPartners.length, color: "bg-[#2563eb]", icon: Gauge },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4 text-center">
                <item.icon className={`mx-auto h-5 w-5 ${item.color.replace("bg-", "text-")}`} />
                <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{item.count}</p>
                <p className="text-xs font-bold text-[#666]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zones */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Zones</p>
            <h3 className="text-sm font-black text-[#1a1a1a]">Delivery Zones</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Mumbai Metro", "Delhi NCR", "Pune City", "Bangalore Central"].map((zone) => {
              const zonePartners = mockPartners.filter(p => p.zone === zone);
              const zoneOnline = zonePartners.filter(p => p.status === "online").length;
              return (
                <div key={zone} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
                  <p className="text-sm font-bold text-[#1a1a1a]">{zone}</p>
                  <p className="text-xs text-[#999]">{zonePartners.length} partners · {zoneOnline} online</p>
                  <div className="mt-2 flex -space-x-1.5">
                    {zonePartners.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#0c831f]/10 text-[8px] font-black text-[#0c831f]">
                        {p.name[0]}
                      </div>
                    ))}
                    {zonePartners.length > 4 && <span className="ml-1 text-[10px] text-[#999]">+{zonePartners.length - 4}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search partners by name or zone..." />
          <div className="mt-3 flex items-center gap-2">
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </section>

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(p) => p.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "name", header: "Partner", sortable: true, render: (p) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">{p.name.split(" ").map((n: string) => n[0]).join("")}</div>
                <div><span className="font-bold text-[#1a1a1a]">{p.name}</span><span className="block text-[10px] text-[#999]">{p.id}</span></div>
              </div>
            )},
            { key: "vehicleType", header: "Vehicle", width: "100px", render: (p) => (
              <span className="font-bold capitalize text-[#666]">{p.vehicleType.replace("_", " ")}</span>
            )},
            { key: "status", header: "Status", width: "100px", render: (p) => <StatusBadge status={p.status} /> },
            { key: "currentOrders", header: "Active Orders", width: "120px", align: "center" },
            { key: "totalDeliveries", header: "Total Delivered", width: "130px", align: "right", sortable: true, render: (p) => <span className="font-bold">{p.totalDeliveries.toLocaleString()}</span> },
            { key: "rating", header: "Rating", width: "80px", render: (p) => (
              <div className="flex items-center gap-1"><Star className="h-3 w-3 text-[#d97706] fill-current" /><span className="font-bold">{p.rating}</span></div>
            )},
            { key: "zone", header: "Zone", width: "130px", hideOnMobile: true },
            { key: "earnings", header: "Earnings", width: "100px", align: "right", render: (p) => <span className="font-bold text-[#0c831f]">{p.earnings}</span> },
          ]}
          actions={[
            { label: "Track", icon: <MapPin className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Tracking ${p.name}`), variant: "success" },
            { label: "Call", icon: <Phone className="h-3.5 w-3.5" />, onClick: (p) => toast.success(`Calling ${p.phone}`) },
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Viewing ${p.name}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
