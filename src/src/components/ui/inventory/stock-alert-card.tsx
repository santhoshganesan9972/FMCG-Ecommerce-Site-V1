"use client";

import { AlertTriangle, AlertCircle, Package, RefreshCw } from "lucide-react";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import type { LowStockAlert } from "@/types/inventory";
import { cn } from "@/lib/utils";

interface StockAlertCardProps {
  alert: LowStockAlert;
  onReorder?: (alert: LowStockAlert) => void;
}

export default function StockAlertCard({ alert, onReorder }: StockAlertCardProps) {
  const isCritical = alert.status === "critical";

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all hover:shadow-sm",
        isCritical
          ? "border-[#fecaca] bg-[#fef2f2]"
          : "border-[#fde68a] bg-[#fffbeb]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              isCritical ? "bg-[#fecaca] text-[#dc2626]" : "bg-[#fde68a] text-[#d97706]",
            )}
          >
            {isCritical ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1a1a]">{alert.product}</p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-[#666]">
              {alert.sku && <span className="font-mono">{alert.sku}</span>}
              <span>Warehouse: {alert.warehouse}</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Package className="h-3.5 w-3.5 text-[#666]" />
                <span className="text-sm font-bold text-[#1a1a1a]">{alert.stock}</span>
                <span className="text-xs text-[#666]">/ {alert.threshold} threshold</span>
              </div>
              <StatusBadge status={alert.status === "critical" ? "critical" : "warning"} size="sm" />
            </div>
          </div>
        </div>

        {onReorder && alert.suggestedOrder && (
          <button
            onClick={() => onReorder(alert)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#0c831f] shadow-sm border border-[#e8e8e8] hover:bg-[#e8f5e9] transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reorder {alert.suggestedOrder}
          </button>
        )}
      </div>

      {/* Stock bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-[#999]">
          <span>Current stock</span>
          <span>Threshold: {alert.threshold}</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isCritical ? "bg-[#dc2626]" : "bg-[#d97706]",
            )}
            style={{ width: `${Math.min((alert.stock / alert.threshold) * 100, 100)}%` }}
          />
        </div>
      </div>

      {alert.lastRestocked && (
        <p className="mt-2 text-[10px] text-[#999]">
          Last restocked: {alert.lastRestocked}
        </p>
      )}
    </div>
  );
}
