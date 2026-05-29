"use client";

import { useState, useMemo } from "react";

import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Building2, Plus, Eye, Edit3, MapPin, RefreshCw, X, Save } from "lucide-react";
import { toast } from "sonner";
import { useWarehouses } from "@/hooks/use-inventory";
import { WarehouseOverviewCards } from "@/components/ui/inventory";
import type { Warehouse } from "@/types/inventory";
import ReusableModal from "@/components/ui/admin/reusable-modal";

export default function WarehousesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewWarehouse, setViewWarehouse] = useState<Warehouse | null>(null);
  const [editWarehouse, setEditWarehouse] = useState<Warehouse | null>(null);
  const [editForm, setEditForm] = useState<Partial<Warehouse>>({});

  const openEditDrawer = (w: Warehouse) => {
    setEditWarehouse(w);
    setEditForm({ ...w });
  };

  const closeEditDrawer = () => {
    setEditWarehouse(null);
    setEditForm({});
  };

  const handleEditSave = () => {
    toast.success(`Warehouse "${editForm.name}" updated successfully`);
    closeEditDrawer();
  };

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
       <>      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Warehouses</h1>
              <p className="mt-1.5 text-xs text-[#666]">Manage warehouse facilities, capacities, and utilization across locations.</p>
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
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (w: Warehouse) => setViewWarehouse(w) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (w: Warehouse) => openEditDrawer(w) },
          ]}
        />
      </div>

      {/* View Modal */}
      <ReusableModal
        open={!!viewWarehouse}
        onClose={() => setViewWarehouse(null)}
        title="Warehouse Details"
        subtitle={`Information for ${viewWarehouse?.name || ""}`}
        size="md"
      >
        {viewWarehouse && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#f9fafb] p-4">
              <div>
                <p className="text-[10px] text-[#999] font-bold uppercase">Warehouse ID</p>
                <p className="text-sm font-bold text-[#1a1a1a]">{viewWarehouse.id}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#999] font-bold uppercase">Location</p>
                <p className="text-sm font-bold text-[#1a1a1a]">{viewWarehouse.location}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#e8e8e8] p-3 text-center">
                <p className="text-[10px] text-[#666]">Capacity</p>
                <p className="mt-1 text-base font-black text-[#1a1a1a]">{viewWarehouse.capacity.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-[#e8e8e8] p-3 text-center">
                <p className="text-[10px] text-[#666]">Utilization</p>
                <p className="mt-1 text-base font-black text-[#1a1a1a]">{viewWarehouse.utilization.toFixed(1)}%</p>
              </div>
              <div className="rounded-xl border border-[#e8e8e8] p-3 text-center">
                <p className="text-[10px] text-[#666]">Total Products</p>
                <p className="mt-1 text-base font-black text-[#1a1a1a]">{viewWarehouse.products}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#e8e8e8] p-3">
              <p className="text-[10px] text-[#666]">Warehouse Manager</p>
              <p className="mt-0.5 text-xs font-bold text-[#1a1a1a]">{viewWarehouse.manager}</p>
            </div>
          </div>
        )}
      </ReusableModal>

      {/* Edit Drawer */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${editWarehouse ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeEditDrawer}
      />

      {/* Slide-in panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${editWarehouse ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
              Edit Warehouse
            </p>
            <h2 className="mt-0.5 text-base font-black text-[#1a1a1a] truncate max-w-xs">
              {editWarehouse?.name}
            </h2>
            <p className="text-[10px] text-[#999] mt-0.5">
              ID: {editWarehouse?.id} · {editWarehouse?.location}
            </p>
          </div>
          <button
            onClick={closeEditDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e8e8e8] text-[#666] hover:bg-[#f6f7f6] transition-all"
            aria-label="Close edit panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable fields */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Warehouse Name</label>
            <input
              type="text"
              value={editForm.name ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Location</label>
            <input
              type="text"
              value={editForm.location ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Capacity</label>
            <input
              type="number"
              value={editForm.capacity ?? 0}
              onChange={(e) => setEditForm((f) => ({ ...f, capacity: Number(e.target.value) }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Manager</label>
            <input
              type="text"
              value={editForm.manager ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, manager: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>
        </div>

        {/* Drawer footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#e8e8e8] bg-white px-6 py-4">
          <button
            onClick={closeEditDrawer}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-all"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </aside>
       </>


  );
}
