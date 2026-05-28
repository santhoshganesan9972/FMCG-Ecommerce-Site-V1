"use client";

import { Navigation, Clock, Fuel, MapPin, TrendingDown, CheckCircle2, Loader2 } from "lucide-react";
import type { DeliveryRoute } from "@/types/delivery";

interface RouteTableProps {
  routes: DeliveryRoute[];
  loading?: boolean;
  onOptimizeAll?: () => void;
  optimizing?: boolean;
  className?: string;
}

const statusBadgeStyles: Record<string, string> = {
  optimized: "bg-[#e8f5e9] text-[#0c831f]",
  pending: "bg-[#fffbeb] text-amber-600",
  in_progress: "bg-[#eff7ff] text-blue-600",
  completed: "bg-[#f6f7f6] text-[#666]",
};

export function RouteTable({
  routes,
  loading = false,
  onOptimizeAll,
  optimizing = false,
  className = "",
}: RouteTableProps) {
  if (loading) {
    return (
      <div className={`space-y-3 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="h-4 w-1/3 rounded bg-[#f0f0f0]" />
            <div className="mt-3 grid grid-cols-3 gap-4">
              <div className="h-8 rounded-lg bg-[#f0f0f0]" />
              <div className="h-8 rounded-lg bg-[#f0f0f0]" />
              <div className="h-8 rounded-lg bg-[#f0f0f0]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 rounded-xl border border-[#e8e8e8] bg-white ${className}`}>
        <Navigation className="h-10 w-10 text-[#ccc]" />
        <p className="mt-2 text-sm font-bold text-[#999]">No routes found</p>
        <p className="text-xs text-[#ccc]">Routes will appear here when created</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {onOptimizeAll && (
        <div className="flex justify-end">
          <button
            onClick={onOptimizeAll}
            disabled={optimizing}
            className="flex items-center gap-1.5 rounded-xl bg-[#0c831f] px-4 py-2 text-xs font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50 transition-colors"
          >
            {optimizing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {optimizing ? "Optimizing..." : "Optimize All"}
          </button>
        </div>
      )}

      {routes.map((route) => (
        <div
          key={route.id}
          className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5e9]">
                <Navigation className="h-4 w-4 text-[#0c831f]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">{route.zone}</p>
                <p className="text-xs text-[#666]">
                  {route.deliveries} deliveries · {route.totalDistance}
                  {route.partnerName && ` · ${route.partnerName}`}
                </p>
              </div>
            </div>
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                statusBadgeStyles[route.status] || "bg-[#f6f7f6] text-[#666]"
              }`}
            >
              {route.status.replace("_", " ")}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3 rounded-xl bg-[#f9fafb] p-3">
            <div>
              <p className="flex items-center gap-1 text-[10px] text-[#999]">
                <Clock className="h-3 w-3" /> Est. Time
              </p>
              <p className="text-xs font-bold text-[#1a1a1a]">{route.estimatedTime}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[10px] text-[#999]">
                <Fuel className="h-3 w-3" /> Fuel Est.
              </p>
              <p className="text-xs font-bold text-[#1a1a1a]">{route.fuelEstimate}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[10px] text-[#999]">
                <TrendingDown className="h-3 w-3" /> Savings
              </p>
              <p
                className={`text-xs font-bold ${
                  route.savings ? "text-[#0c831f]" : "text-[#999]"
                }`}
              >
                {route.savings || "—"}
              </p>
            </div>
          </div>

          {/* Waypoints */}
          {route.waypoints.length > 0 && (
            <div className="mt-3 space-y-1.5 border-t border-[#e8e8e8] pt-3">
              {route.waypoints.slice(0, 3).map((wp, i) => (
                <div key={wp.orderId} className="flex items-center gap-2 text-xs text-[#666]">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f6f7f6] text-[9px] font-bold text-[#999]">
                    {i + 1}
                  </span>
                  <span className="font-bold text-[#0c831f]">{wp.orderId}</span>
                  <span className="truncate">{wp.address}</span>
                  {wp.estimatedArrival && (
                    <span className="ml-auto text-[10px] text-[#999]">{wp.estimatedArrival}</span>
                  )}
                </div>
              ))}
              {route.waypoints.length > 3 && (
                <p className="text-[10px] text-[#999] pl-7">+{route.waypoints.length - 3} more stops</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
