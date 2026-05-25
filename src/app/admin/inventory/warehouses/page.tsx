"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Building2, Plus, Eye, Edit3, MapPin, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useWarehouses } from "@/hooks/use-inventory";
import { WarehouseOverviewCards } from "@/components/ui/inventory";
import type { Warehouse } from "@/types/inventory";

export default function WarehousesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);

  const { warehouses, loading, refresh } = useWarehouses();

  const filtered = useMemo(
    () =>
      warehouses.filter(
        (w) =>
          !search ||
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.location.toLowerCase().includes(search.toLowerCase()),
      ),
    [warehouses, search],
  );

  const totalCapacity = warehouses.reduce((s, w) => s + w.capacity, 0);
  const totalUsed = warehouses.reduce((s, w) => s + w.used, 0);
  const totalProducts = warehouses.reduce((s, w) => s + w.products, 0);

  const pageData = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  );

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
            <div className="flex items-center gap-2">
              <button onClick={() => refresh()} className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
              <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
                <Plus className="h-4 w-4" /> Add Warehouse
              </button>
            </div>
          </div>
        </section>

        <WarehouseOverviewCards
          totalWarehouses={warehouses.length}
          totalCapacity={totalCapacity}
          totalUsed={totalUsed}
          totalProducts={totalProducts}
        />

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search warehouses by name or location..." />

        <ReusableTable
          data={pageData}
          isLoading={loading}
          keyExtractor={(w: Warehouse) => w.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "name", header: "Warehouse", sortable: true, render: (w: Warehouse) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f5e9]"><Building2 className="h-4 w-4 text-[#0c831f]" /></div>
                <div><span className="font-bold text-[#1a1a1a]">{w.name}</span><span className="block text-[10px] text-[#999]">{w.id}</span></div>
              </div>
            )},
            { key: "location", header: "Location", width: "130px", hideOnMobile: true, render: (w: Warehouse) => (
              <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#999]" /><span>{w.location}</span></div>
            )},
            { key: "status", header: "Status", width: "110px", render: (w: Warehouse) => <StatusBadge status={w.status} /> },
            { key: "capacity", header: "Capacity", width: "100px", align: "right", sortable: true, render: (w: Warehouse) => <span className="font-bold">{w.capacity.toLocaleString()}</span> },
            { key: "utilization", header: "Utilization", width: "120px", render: (w: Warehouse) => {
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
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (w: Warehouse) => toast.info(`Viewing ${w.name}`) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (w: Warehouse) => toast.info(`Editing ${w.name}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
