"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { AlertTriangle, Shield, TrendingUp, Edit3, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useSafetyStock } from "@/hooks/use-inventory";
import type { SafetyStockRule } from "@/types/inventory";

export default function SafetyStockPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { rules, loading, refresh } = useSafetyStock(statusFilter !== "all" ? statusFilter : undefined);

  const filtered = useMemo(
    () =>
      rules.filter((i) => {
        const matchesSearch =
          !search ||
          i.product.toLowerCase().includes(search.toLowerCase()) ||
          i.sku.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
      }),
    [rules, search],
  );

  const kpis = useMemo(() => {
    return {
      safe: rules.filter((r) => r.status === "safe").length,
      warning: rules.filter((r) => r.status === "warning").length,
      critical: rules.filter((r) => r.status === "critical").length,
      avgLeadTime: rules.length > 0
        ? Math.round(rules.reduce((s, r) => s + r.leadTime, 0) / rules.length)
        : 0,
    };
  }, [rules]);

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
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Safety Stock</h1>
              <p className="mt-2 text-sm text-[#666]">Configure safety stock levels and reorder points to prevent stockouts.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => refresh()} className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#1a1a1a] hover:bg-[#f6f7f6]">
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Items</option>
                <option value="safe">Safe</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Safe Items" value={kpis.safe} icon={<Shield className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Warning" value={kpis.warning} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Critical" value={kpis.critical} icon={<AlertTriangle className="h-4 w-4" />} color="text-[#dc2626]" bgColor="bg-[#fef2f2]" />
          <ReusableCard title="Avg Lead Time" value={`${kpis.avgLeadTime} days`} icon={<TrendingUp className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
        </div>

        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search products..." />

        <ReusableTable
          data={pageData}
          isLoading={loading}
          keyExtractor={(i: SafetyStockRule) => i.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "product", header: "Product", sortable: true, render: (i: SafetyStockRule) => (
              <div><span className="font-bold text-[#1a1a1a]">{i.product}</span><span className="block text-[10px] text-[#999]">{i.sku}</span></div>
            )},
            { key: "currentStock", header: "Stock", width: "80px", align: "right", sortable: true },
            { key: "safetyLevel", header: "Safety Level", width: "110px", align: "right" },
            { key: "reorderPoint", header: "Reorder At", width: "100px", align: "right" },
            { key: "leadTime", header: "Lead Time", width: "90px", align: "right", hideOnMobile: true, render: (i: SafetyStockRule) => <span>{i.leadTime} days</span> },
            { key: "status", header: "Status", width: "100px", render: (i: SafetyStockRule) => <StatusBadge status={i.status} /> },
          ]}
          actions={[
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (i: SafetyStockRule) => toast.info(`Editing safety stock for ${i.product}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
