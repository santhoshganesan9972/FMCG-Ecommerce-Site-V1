"use client";

import { useState, useMemo, useCallback } from "react";

import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { RefreshCw, ArrowRightLeft, Eye, Edit3, Package, X, Save } from "lucide-react";
import { toast } from "sonner";
import { useInventoryItems, useWarehouses } from "@/hooks/use-inventory";
import { inventoryService } from "@/services/inventory.service";
import { InventoryOverviewCards, WarehouseCards } from "@/components/ui/inventory";
import StockTransferForm from "@/components/ui/inventory/stock-transfer-form";
import type { InventoryItem, StockTransfer } from "@/types/inventory";
import ReusableModal from "@/components/ui/admin/reusable-modal";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [viewItem, setViewItem] = useState<InventoryItem | null>(null);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [editForm, setEditForm] = useState<Partial<InventoryItem>>({});

  const openEditDrawer = (item: InventoryItem) => {
    setEditItem(item);
    setEditForm({ ...item });
  };

  const closeEditDrawer = () => {
    setEditItem(null);
    setEditForm({});
  };

  const handleEditSave = () => {
    toast.success(`Inventory for "${editForm.productName}" updated successfully`);
    closeEditDrawer();
  };

  const { items, loading, pagination, refresh: refreshItems } = useInventoryItems({ page, pageSize, search });
  const { warehouses } = useWarehouses();
  const createTransfer = useCallback(
    async (data: Omit<StockTransfer, "id" | "status" | "createdAt">) => {
      const res = await inventoryService.createTransfer(data);
      return res.data;
    },
    [],
  );

  const allItems = useMemo(() => items, [items]);

  const totalStock = allItems.reduce((s, i) => s + i.stock, 0);
  const totalAvailable = allItems.reduce((s, i) => s + i.available, 0);
  const lowStockCount = allItems.filter(
    (i) => i.available <= i.lowStockThreshold || i.status === "low_stock" || i.status === "out_of_stock",
  ).length;

  const warehouseList = useMemo(
    () => warehouses.map((w) => ({ name: w.name, id: w.id })),
    [warehouses],
  );
  const productList = useMemo(
    () => allItems.map((i) => ({ name: i.productName, sku: i.sku })),
    [allItems],
  );

  const handleCreateTransfer = useCallback(
    async (data: Parameters<typeof createTransfer>[0]) => {
      await createTransfer(data);
      toast.success("Stock transfer initiated");
    },
    [createTransfer],
  );

  return (
       <>      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Stock & Warehouse Management</h1>
              <p className="mt-1.5 max-w-2xl text-xs text-[#666]">
                Monitor stock levels, manage warehouses, process transfers, and track FEFO across all locations.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setShowTransferModal(true)} className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
                <ArrowRightLeft className="h-4 w-4" />
                Transfer
              </button>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button
                onClick={() => refreshItems()}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <InventoryOverviewCards
          totalStock={totalStock}
          totalAvailable={totalAvailable}
          warehouseCount={warehouses.length}
          lowStockCount={lowStockCount}
        />

        {/* Warehouses */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Warehouses</p>
              <h3 className="text-sm font-black text-[#1a1a1a]">Storage Facilities</h3>
            </div>
          </div>
          <WarehouseCards warehouses={warehouses} />
        </section>

        {/* Search */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search inventory by product name or SKU..." />
        </section>

        {/* Table */}
        <ReusableTable
          data={items}
          isLoading={loading}
          keyExtractor={(i: InventoryItem) => i.id}
          page={page}
          pageSize={pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "productName", header: "Product", sortable: true, render: (i: InventoryItem) => (
              <div><span className="font-bold text-[#1a1a1a]">{i.productName}</span><span className="block text-[10px] text-[#999]">{i.sku}</span></div>
            )},
            { key: "warehouse", header: "Warehouse", width: "140px", hideOnMobile: true },
            { key: "stock", header: "Stock", width: "80px", align: "right", sortable: true, render: (i: InventoryItem) => (
              <span className="font-bold">{i.stock}</span>
            )},
            { key: "reserved", header: "Reserved", width: "90px", align: "right", hideOnMobile: true },
            { key: "available", header: "Available", width: "90px", align: "right", sortable: true, render: (i: InventoryItem) => (
              <span className={`font-bold ${i.available <= i.lowStockThreshold ? "text-[#dc2626]" : "text-[#0c831f]"}`}>{i.available}</span>
            )},
            { key: "lowStockThreshold", header: "Threshold", width: "90px", align: "right", hideOnMobile: true, render: (i: InventoryItem) => (
              <span className="text-[#999]">{i.lowStockThreshold}</span>
            )},
            { key: "expiryDate", header: "Expiry", width: "110px", hideOnMobile: true, render: (i: InventoryItem) => (
              <span>{i.expiryDate || "—"}</span>
            )},
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (i: InventoryItem) => setViewItem(i) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (i: InventoryItem) => openEditDrawer(i) },
          ]}
        />
      </div>

      {/* Transfer Modal */}
      <StockTransferForm
        open={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onSubmit={handleCreateTransfer}
        warehouses={warehouseList}
        products={productList}
      />

      {/* View Modal */}
      <ReusableModal
        open={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Inventory Item Details"
        subtitle={`Information for ${viewItem?.productName || ""}`}
        size="md"
      >
        {viewItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#f9fafb] p-4">
              <div>
                <p className="text-[10px] text-[#999] font-bold uppercase">Product SKU</p>
                <p className="text-sm font-bold text-[#1a1a1a]">{viewItem.sku}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#999] font-bold uppercase">Warehouse Location</p>
                <p className="text-sm font-bold text-[#1a1a1a]">{viewItem.warehouse}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#e8e8e8] p-3 text-center">
                <p className="text-[10px] text-[#666]">Total Stock</p>
                <p className="mt-1 text-base font-black text-[#1a1a1a]">{viewItem.stock}</p>
              </div>
              <div className="rounded-xl border border-[#e8e8e8] p-3 text-center">
                <p className="text-[10px] text-[#666]">Reserved</p>
                <p className="mt-1 text-base font-black text-[#1a1a1a]">{viewItem.reserved}</p>
              </div>
              <div className="rounded-xl border border-[#e8e8e8] p-3 text-center">
                <p className="text-[10px] text-[#666]">Available</p>
                <p className={`mt-1 text-base font-black ${viewItem.available <= viewItem.lowStockThreshold ? 'text-[#dc2626]' : 'text-[#0c831f]'}`}>
                  {viewItem.available}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#e8e8e8] p-3">
                <p className="text-[10px] text-[#666]">Low Stock Threshold</p>
                <p className="mt-0.5 text-xs font-bold text-[#1a1a1a]">{viewItem.lowStockThreshold} units</p>
              </div>
              <div className="rounded-xl border border-[#e8e8e8] p-3">
                <p className="text-[10px] text-[#666]">Expiry Date</p>
                <p className="mt-0.5 text-xs font-bold text-[#1a1a1a]">{viewItem.expiryDate || "—"}</p>
              </div>
            </div>
          </div>
        )}
      </ReusableModal>

      {/* Edit Drawer */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${editItem ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeEditDrawer}
      />

      {/* Slide-in panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${editItem ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
              Edit Inventory
            </p>
            <h2 className="mt-0.5 text-base font-black text-[#1a1a1a] truncate max-w-xs">
              {editItem?.productName}
            </h2>
            <p className="text-[10px] text-[#999] mt-0.5">
              SKU: {editItem?.sku} · {editItem?.warehouse}
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
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Product Name</label>
            <input
              type="text"
              value={editForm.productName ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, productName: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">SKU</label>
            <input
              type="text"
              value={editForm.sku ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, sku: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Total Stock</label>
              <input
                type="number"
                value={editForm.stock ?? 0}
                onChange={(e) => setEditForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Reserved Stock</label>
              <input
                type="number"
                value={editForm.reserved ?? 0}
                onChange={(e) => setEditForm((f) => ({ ...f, reserved: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Low Stock Threshold</label>
            <input
              type="number"
              value={editForm.lowStockThreshold ?? 0}
              onChange={(e) => setEditForm((f) => ({ ...f, lowStockThreshold: Number(e.target.value) }))}
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
