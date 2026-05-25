"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Building2, Plus, Eye, Edit3, MapPin, Package, TrendingUp, Gauge } from "lucide-react";
import { toast } from "sonner";

const warehouses = [
  { id: "WH-001", name: "Mumbai Hub", location: "Mumbai, MH", capacity: 50000, used: 38000, status: "active", manager: "Rohit Sharma", contact: "+91 98765 43201", products: 1240, utilization: 76 },
  { id: "WH-002", name: "Pune Cold Storage", location: "Pune, MH", capacity: 20000, used: 14500, status: "active", manager: "Sneha Joshi", contact: "+91 98765 43202", products: 580, utilization: 72.5 },
  { id: "WH-003", name: "Delhi Central", location: "Delhi", capacity: 60000, used: 42000, status: "active", manager: "Amit Verma", contact: "+91 98765 43203", products: 2100, utilization: 70 },
  { id: "WH-004", name: "Bangalore Cold Room", location: "Bangalore, KA", capacity: 15000, used: 8200, status: "active", manager: "Priya Kumar", contact: "+91 98765 43204", products: 340, utilization: 54.7 },
  { id: "WH-005", name: "Kolkata Distribution", location: "Kolkata, WB", capacity: 25000, used: 18000, status: "maintenance", manager: "Suman Das", contact: "+91 98765 43205", products: 780, utilization: 72 },
  { id: "WH-006", name: "Chennai Hub", location: "Chennai, TN", capacity: 30000, used: 12000, status: "active", manager: "Rajesh Iyer", contact: "+91 98765 43206", products: 520, utilization: 40 },
];

export default function WarehousesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = warehouses.filter(w => !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.location.toLowerCase().includes(search.toLowerCase()));

  const totalCapacity = warehouses.reduce((s, w) => s + w.capacity, 0);
  const totalUsed = warehouses.reduce((s, w) => s + w.used, 0);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Warehouses</h1>
              <p className="mt-2 text-sm text-[#666]">Manage warehouse facilities, capacities, and utilization across locations.</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> Add Warehouse
            </button>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Warehouses" value={warehouses.length} icon={<Building2 className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Total Capacity" value={`${(totalCapacity / 1000).toFixed(0)}K`} icon={<Gauge className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Utilized" value={`${((totalUsed / totalCapacity) * 100).toFixed(0)}%`} icon={<TrendingUp className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Products" value={warehouses.reduce((s, w) => s + w.products, 0).toLocaleString()} icon={<Package className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search warehouses by name or location..." />

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(w) => w.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "name", header: "Warehouse", sortable: true, render: (w) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f5e9]"><Building2 className="h-4 w-4 text-[#0c831f]" /></div>
                <div><span className="font-bold text-[#1a1a1a]">{w.name}</span><span className="block text-[10px] text-[#999]">{w.id}</span></div>
              </div>
            )},
            { key: "location", header: "Location", width: "130px", hideOnMobile: true, render: (w) => (
              <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#999]" /><span>{w.location}</span></div>
            )},
            { key: "status", header: "Status", width: "110px", render: (w) => <StatusBadge status={w.status} /> },
            { key: "capacity", header: "Capacity", width: "100px", align: "right", sortable: true, render: (w) => <span className="font-bold">{w.capacity.toLocaleString()}</span> },
            { key: "utilization", header: "Utilization", width: "120px", render: (w) => {
              const barColor = w.utilization > 90 ? "bg-[#dc2626]" : w.utilization > 75 ? "bg-[#d97706]" : "bg-[#0c831f]";
              return (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 overflow-hidden rounded-full bg-[#e8e8e8]">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${w.utilization}%` }} />
                  </div>
                  <span className="text-xs font-bold">{w.utilization.toFixed(0)}%</span>
                </div>
              );
            }},
            { key: "manager", header: "Manager", width: "130px", hideOnMobile: true },
            { key: "products", header: "Products", width: "90px", align: "right" },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (w) => toast.info(`Viewing ${w.name}`) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (w) => toast.info(`Editing ${w.name}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
