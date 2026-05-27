"use client";

import { Boxes, TrendingUp, Building2, AlertTriangle, Gauge, Package } from "lucide-react";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import type { Warehouse } from "@/types/inventory";

interface InventoryOverviewCardsProps {
  totalStock: number;
  totalAvailable: number;
  warehouseCount: number;
  lowStockCount: number;
}

export function InventoryOverviewCards({
  totalStock,
  totalAvailable,
  warehouseCount,
  lowStockCount,
}: InventoryOverviewCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <ReusableCard title="Total Stock" value={totalStock} icon={<Boxes className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
      <ReusableCard title="Available" value={totalAvailable} icon={<TrendingUp className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
      <ReusableCard title="Warehouses" value={warehouseCount} icon={<Building2 className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
      <ReusableCard title="Low Stock Items" value={lowStockCount} icon={<AlertTriangle className="h-4 w-4" />} trend={{ value: "Needs restock", direction: "down", label: "" }} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
    </div>
  );
}

interface WarehouseCardsProps {
  warehouses: Warehouse[];
  isLoading?: boolean;
}

export function WarehouseCards({ warehouses, isLoading }: WarehouseCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-3">
            <div className="skeleton-shimmer h-4 w-24 rounded-lg" />
            <div className="mt-1.5 skeleton-shimmer h-3 w-32 rounded-lg" />
            <div className="mt-2.5 skeleton-shimmer h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (warehouses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Building2 className="h-8 w-8 text-[#999] mb-2" />
        <p className="text-sm font-bold text-[#666]">No warehouses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {warehouses.map((wh) => {
        const pct = wh.utilization;
        const barColor = pct > 90 ? "bg-[#dc2626]" : pct > 75 ? "bg-[#d97706]" : "bg-[#0c831f]";
        return (
          <div key={wh.id} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-3 transition-all hover:shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#1a1a1a]">{wh.name}</p>
              <StatusBadge status={wh.status} size="sm" />
            </div>
            <p className="text-[10px] text-[#999]">{wh.location}</p>
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#666]">
              <Package className="h-3 w-3" />
              <span>{(wh.totalSkus || 0).toLocaleString()} SKUs</span>
              {wh.manager && (
                <>
                  <span className="text-[#e8e8e8]">|</span>
                  <span>{wh.manager}</span>
                </>
              )}
            </div>
            <div className="mt-2.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-[#666]">{pct.toFixed(0)}% used</span>
                <span className="text-[#999]">
                  {wh.used.toLocaleString()} / {wh.capacity.toLocaleString()}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface WarehouseOverviewCardsProps {
  totalWarehouses: number;
  totalCapacity: number;
  totalUsed: number;
  totalProducts: number;
}

export function WarehouseOverviewCards({
  totalWarehouses,
  totalCapacity,
  totalUsed,
  totalProducts,
}: WarehouseOverviewCardsProps) {
  const utilization = totalCapacity > 0 ? ((totalUsed / totalCapacity) * 100).toFixed(0) : "0";

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <ReusableCard title="Total Warehouses" value={totalWarehouses} icon={<Building2 className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
      <ReusableCard title="Total Capacity" value={`${(totalCapacity / 1000).toFixed(0)}K`} icon={<Gauge className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
      <ReusableCard title="Utilized" value={`${utilization}%`} icon={<TrendingUp className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
      <ReusableCard title="Total Products" value={totalProducts.toLocaleString()} icon={<Package className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
    </div>
  );
}
