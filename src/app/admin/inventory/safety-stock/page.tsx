"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { AlertTriangle, Shield, TrendingUp, Package, Edit3 } from "lucide-react";
import { toast } from "sonner";

const safetyStockItems = [
  { id: "SS-001", product: "Organic Basmati Rice", sku: "RICE-BAS-001", currentStock: 120, safetyLevel: 50, reorderPoint: 80, leadTime: 3, status: "safe", dailyUsage: 18 },
  { id: "SS-002", product: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", currentStock: 320, safetyLevel: 150, reorderPoint: 200, leadTime: 1, status: "safe", dailyUsage: 95 },
  { id: "SS-003", product: "Fresh Red Apples", sku: "FRUIT-APL-001", currentStock: 85, safetyLevel: 40, reorderPoint: 60, leadTime: 2, status: "safe", dailyUsage: 22 },
  { id: "SS-004", product: "Natural Honey 500g", sku: "HEALTH-HNY-001", currentStock: 0, safetyLevel: 30, reorderPoint: 50, leadTime: 5, status: "critical", dailyUsage: 8 },
  { id: "SS-005", product: "Salted Butter 100g", sku: "DAIRY-BUT-001", currentStock: 5, safetyLevel: 20, reorderPoint: 35, leadTime: 2, status: "critical", dailyUsage: 12 },
  { id: "SS-006", product: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", currentStock: 56, safetyLevel: 30, reorderPoint: 45, leadTime: 2, status: "warning", dailyUsage: 15 },
  { id: "SS-007", product: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", currentStock: 42, safetyLevel: 25, reorderPoint: 35, leadTime: 4, status: "safe", dailyUsage: 8 },
  { id: "SS-008", product: "Green Tea 100g Pouch", sku: "BEV-TEA-001", currentStock: 18, safetyLevel: 25, reorderPoint: 40, leadTime: 3, status: "warning", dailyUsage: 9 },
];

export default function SafetyStockPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = safetyStockItems.filter(i => {
    const matchesSearch = !search || i.product.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Inventory</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Safety Stock</h1>
              <p className="mt-2 text-sm text-[#666]">Configure safety stock levels and reorder points to prevent stockouts.</p>
            </div>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
              <option value="all">All Items</option>
              <option value="safe">Safe</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Safe Items" value={safetyStockItems.filter(i => i.status === "safe").length} icon={<Shield className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Warning" value={safetyStockItems.filter(i => i.status === "warning").length} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Critical" value={safetyStockItems.filter(i => i.status === "critical").length} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
          <ReusableCard title="Avg Lead Time" value="3 days" icon={<TrendingUp className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search products..." />

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
            { key: "currentStock", header: "Stock", width: "80px", align: "right", sortable: true },
            { key: "safetyLevel", header: "Safety Level", width: "110px", align: "right" },
            { key: "reorderPoint", header: "Reorder At", width: "100px", align: "right" },
            { key: "leadTime", header: "Lead Time", width: "90px", align: "right", hideOnMobile: true, render: (i) => <span>{i.leadTime} days</span> },
            { key: "status", header: "Status", width: "100px", render: (i) => <StatusBadge status={i.status} /> },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (i) => toast.info(`Editing safety stock for ${i.product}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
