"use client";

import { MapPin, Navigation, Truck } from "lucide-react";
import type { LiveDelivery, DeliveryPartner } from "@/types/delivery";

interface DeliveryMapProps {
  deliveries?: LiveDelivery[];
  partners?: DeliveryPartner[];
  className?: string;
  height?: number;
}

export function DeliveryMap({
  deliveries,
  partners,
  className = "",
  height = 400,
}: DeliveryMapProps) {
  const activeDeliveries = deliveries?.filter(
    (d) => d.status !== "delivered" && d.status !== "cancelled"
  );

  const onlinePartners = partners?.filter((p) => p.status === "online" || p.status === "busy");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#e8e8e8] bg-gradient-to-br from-[#f0f7f1] to-[#e8f5e9] ${className}`}
      style={{ height }}
    >
      {/* Map Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6">
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm px-6 py-4 shadow-sm border border-[#e8e8e8] text-center max-w-md">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-[#0c831f]" />
            <Navigation className="h-5 w-5 text-[#2563eb]" />
            <Truck className="h-5 w-5 text-[#d97706]" />
          </div>
          <p className="text-sm font-black text-[#1a1a1a]">Live Delivery Map</p>
          <p className="mt-1 text-xs text-[#666]">
            {activeDeliveries && activeDeliveries.length > 0
              ? `${activeDeliveries.length} active deliveries · ${onlinePartners?.length || 0} partners online`
              : "Real-time delivery tracking map with partner locations"}
          </p>
          {activeDeliveries && activeDeliveries.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {activeDeliveries.slice(0, 5).map((d) => (
                <span
                  key={d.id}
                  className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2.5 py-1 text-[10px] font-bold text-[#0c831f]"
                >
                  <MapPin className="h-3 w-3" />
                  {d.orderId}
                </span>
              ))}
              {activeDeliveries.length > 5 && (
                <span className="inline-flex items-center rounded-full bg-[#f6f7f6] px-2.5 py-1 text-[10px] font-bold text-[#666]">
                  +{activeDeliveries.length - 5} more
                </span>
              )}
            </div>
          )}
          {/* Simulated route lines */}
          <div className="mt-3 flex items-center gap-1 text-[10px] text-[#999]">
            <span className="h-0.5 w-4 rounded-full bg-[#0c831f]" />
            <span>Active route</span>
            <span className="ml-2 h-0.5 w-4 rounded-full bg-[#d97706]" />
            <span>Optimized route</span>
          </div>
        </div>

        {/* Partner markers */}
        {onlinePartners && onlinePartners.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {onlinePartners.slice(0, 8).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-1.5 rounded-full bg-white border border-[#e8e8e8] px-2.5 py-1 shadow-sm"
              >
                <span className={`h-2 w-2 rounded-full ${p.status === "online" ? "bg-[#0c831f]" : "bg-[#d97706]"}`} />
                <span className="text-[10px] font-bold text-[#1a1a1a]">{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom-right info */}
      <div className="absolute bottom-3 right-3 z-10 rounded-lg bg-white/80 backdrop-blur-sm px-3 py-1.5 text-[10px] text-[#999] border border-[#e8e8e8]">
        Map integration ready — connect Google Maps / Mapbox
      </div>
    </div>
  );
}
