"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import {
  Boxes,
  Warehouse,
  RefreshCw,
  ArrowRightLeft,
  AlertTriangle,
  TrendingUp,
  Building2,
  Plus,
  Eye,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";

const inventoryItems = [
  { id: "INV-001", product: "Organic Basmati Rice", sku: "RICE-BAS-001", warehouse: "Mumbai Hub", stock: 120, reserved: 14, available: 106, threshold: 10, batch: "BATCH-001", expiryDate: "2027-01-15", lastUpdated: "2026-05-21" },
  { id: "INV-002", product: "Fresh Red Apples", sku: "FRUIT-APL-001", warehouse: "Pune Cold Storage", stock: 85, reserved: 6, available: 79, threshold: 15, batch: "BATCH-002", expiryDate: "2026-06-10", lastUpdated: "2026-05-21" },
  { id: "INV-003", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", warehouse: "Mumbai Hub", stock: 320, reserved: 28, available: 292, threshold: 100, batch: "BATCH-003", expiryDate: "2026-05-28", lastUpdated: "2026-05-21" },
  { id: "INV-004", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", warehouse: "Delhi Central", stock: 0, reserved: 0, available: 0, threshold: 20, batch: "BATCH-004", expiryDate: "2027-12-31", lastUpdated: "2026-05-18" },
  { id: "INV-005", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", warehouse: "Pune Cold Storage", stock: 56, reserved: 8, available: 48, threshold: 20, batch: "BATCH-005", expiryDate: "2026-05-26", lastUpdated: "2026-05-21" },
  { id: "INV-006", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", warehouse: "Mumbai Hub", stock: 5, reserved: 2, available: 3, threshold: 15, batch: "BATCH-006", expiryDate: "2026-06-15", lastUpdated: "2026-05-21" },
  { id: "INV-007", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", warehouse: "Bangalore Cold Room", stock: 42, reserved: 5, available: 37, threshold: 15, batch: "BATCH-007", expiryDate: "2026-08-20", lastUpdated: "2026-05-21" },
];

const warehouses = [
  { id: "WH-001", name: "Mumbai Hub", location: "Mumbai, MH", capacity: 50000, used: 38000, status: "active", utilization: 76 },
  { id: "WH-002", name: "Pune Cold Storage", location: "Pune, MH", capacity: 20000, used: 14500, status: "active", utilization: 72.5 },
  { id: "WH-003", name: "Delhi Central", location: "Delhi", capacity: 60000, used: 42000, status: "active", utilization: 70 },
  { id: "WH-004", name: "Bangalore Cold Room", location: "Bangalore, KA", capacity: 15000, used: 8200, status: "active", utilization: 54.7 },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const filtered = inventoryItems.filter((i) =>
    !search || i.product.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = inventoryItems.reduce((s, i) => s + i.stock, 0);
  const totalAvailable = inventoryItems.reduce((s, i) => s + i.available, 0);
  const lowStockCount = inventoryItems.filter((i) => i.available <= i.threshold).length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Stock & Warehouse Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Monitor stock levels, manage warehouses, process transfers, and track FEFO across all locations.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setShowTransferModal(true)} className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
                <ArrowRightLeft className="h-4 w-4" />
                Transfer
              </button>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
                <RefreshCw className="h-4 w-4" />
                Sync All
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Stock" value={totalStock} icon={<Boxes className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Available" value={totalAvailable} icon={<TrendingUp className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Warehouses" value={warehouses.length} icon={<Building2 className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Low Stock Items" value={lowStockCount} icon={<AlertTriangle className="h-4 w-4" />} trend={{ value: "Needs restock", direction: "down", label: "" }} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        {/* Warehouses */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Warehouses</p>
              <h3 className="text-sm font-black text-[#1a1a1a]">Storage Facilities</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {warehouses.map((wh) => {
              const pct = (wh.used / wh.capacity) * 100;
              const barColor = pct > 90 ? "bg-[#dc2626]" : pct > 75 ? "bg-[#d97706]" : "bg-[#0c831f]";
              return (
                <div key={wh.id} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4 transition-all hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#1a1a1a]">{wh.name}</p>
                    <StatusBadge status={wh.status} size="sm" />
                  </div>
                  <p className="mt-0.5 text-xs text-[#999]">{wh.location}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#666]">{pct.toFixed(0)}% used</span>
                      <span className="text-[#999]">{wh.used.toLocaleString()} / {wh.capacity.toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Search */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search inventory by product name or SKU..." />
        </section>

        {/* Table */}
        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(i) => i.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "product", header: "Product", sortable: true, render: (i) => (
              <div><span className="font-bold text-[#1a1a1a]">{i.product}</span><span className="block text-[10px] text-[#999]">{i.sku}</span></div>
            )},
            { key: "warehouse", header: "Warehouse", width: "140px", hideOnMobile: true },
            { key: "stock", header: "Stock", width: "80px", align: "right", sortable: true, render: (i) => (
              <span className="font-bold">{i.stock}</span>
            )},
            { key: "reserved", header: "Reserved", width: "90px", align: "right", hideOnMobile: true },
            { key: "available", header: "Available", width: "90px", align: "right", sortable: true, render: (i) => (
              <span className={`font-bold ${i.available <= i.threshold ? "text-[#dc2626]" : "text-[#0c831f]"}`}>{i.available}</span>
            )},
            { key: "threshold", header: "Threshold", width: "90px", align: "right", hideOnMobile: true, render: (i) => (
              <span className="text-[#999]">{i.threshold}</span>
            )},
            { key: "expiryDate", header: "Expiry", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (i) => toast.info(`Viewing ${i.product}`) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (i) => toast.info(`Editing ${i.product}`) },
          ]}
        />
      </div>

      {/* Transfer Modal */}
      <ReusableModal open={showTransferModal} onClose={() => setShowTransferModal(false)} title="Stock Transfer" subtitle="Transfer stock between warehouses" size="md">
        <div className="space-y-4">
          {[
            { label: "Product", placeholder: "Search product...", type: "select", options: inventoryItems.map(i => i.product) },
            { label: "From Warehouse", type: "select", options: warehouses.map(w => w.name) },
            { label: "To Warehouse", type: "select", options: warehouses.map(w => w.name) },
            { label: "Quantity", type: "number", placeholder: "0" },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="">Select {field.label}</option>
                  {(field.options as string[])?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input type={field.type} placeholder={field.placeholder} className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
          <button onClick={() => setShowTransferModal(false)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={() => { toast.success("Stock transfer initiated"); setShowTransferModal(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Transfer</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
