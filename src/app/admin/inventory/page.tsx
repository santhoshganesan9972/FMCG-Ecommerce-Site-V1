"use client";

import { useState, useMemo, useCallback } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { RefreshCw, ArrowRightLeft, Eye, Edit3, Package } from "lucide-react";
import { toast } from "sonner";
import { useInventoryItems, useWarehouses } from "@/hooks/use-inventory";
import { inventoryService } from "@/services/inventory.service";
import { InventoryOverviewCards, WarehouseCards } from "@/components/ui/inventory";
import StockTransferForm from "@/components/ui/inventory/stock-transfer-form";
import type { InventoryItem, StockTransfer } from "@/types/inventory";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showTransferModal, setShowTransferModal] = useState(false);

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
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Warehouses</p>
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
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (i: InventoryItem) => toast.info(`Viewing ${i.productName}`) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (i: InventoryItem) => toast.info(`Editing ${i.productName}`) },
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
    </DashboardLayout>
  );
}
