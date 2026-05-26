"use client";

import { Phone, Star, MapPin, Truck, Bike, Gauge, Navigation } from "lucide-react";
import type { DeliveryPartner } from "@/types/delivery";
import type { ReactNode } from "react";

interface PartnerCardProps {
  partner: DeliveryPartner;
  onTrack?: (partner: DeliveryPartner) => void;
  onCall?: (partner: DeliveryPartner) => void;
  onViewProfile?: (partner: DeliveryPartner) => void;
  className?: string;
  compact?: boolean;
}

const vehicleIcons: Record<string, ReactNode> = {
  bike: <Bike className="h-4 w-4" />,
  scooter: <Gauge className="h-4 w-4" />,
  cycle: <Bike className="h-4 w-4" />,
  van: <Truck className="h-4 w-4" />,
  ev_scooter: <Gauge className="h-4 w-4" />,
};

const statusStyles: Record<string, string> = {
  online: "bg-[#0c831f]",
  available: "bg-[#2563eb]",
  busy: "bg-[#d97706]",
  offline: "bg-[#999]",
};

export function PartnerCard({
  partner,
  onTrack,
  onCall,
  onViewProfile,
  className = "",
  compact = false,
}: PartnerCardProps) {
  return (
    <div
      className={`rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-sm font-black text-[#0c831f]">
            {partner.name.charAt(0)}
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${statusStyles[partner.status] || "bg-[#999]"}`}
            />
          </div>
          <div className="min-w-0">
            <p
              className={`font-bold text-[#1a1a1a] truncate ${compact ? "text-sm" : "text-sm"}`}
            >
              {partner.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {vehicleIcons[partner.vehicleType || "bike"] || <Truck className="h-3 w-3" />}
              <span className="text-[10px] text-[#666] capitalize">
                {partner.vehicleType?.replace("_", " ") || "bike"}
              </span>
            </div>
          </div>
        </div>
        {!compact && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${
              partner.status === "online" || partner.status === "available"
                ? "bg-[#e8f5e9] text-[#0c831f]"
                : partner.status === "busy"
                ? "bg-[#fffbeb] text-[#d97706]"
                : "bg-[#f6f7f6] text-[#666]"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusStyles[partner.status] || "bg-[#999]"}`} />
            {partner.status}
          </span>
        )}
      </div>

      <div className={`mt-3 space-y-1.5 ${compact ? "hidden" : ""}`}>
        <p className="flex items-center gap-1.5 text-xs text-[#666]">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#2563eb]" />
          {partner.zone || "N/A"}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-[#666]">
          <Star className="h-3.5 w-3.5 flex-shrink-0 text-[#d97706] fill-current" />
          {partner.rating.toFixed(1)} · {partner.totalDeliveries.toLocaleString()} deliveries
        </p>
        <p className="flex items-center gap-1.5 text-xs text-[#666]">
          <Navigation className="h-3.5 w-3.5 flex-shrink-0 text-[#0c831f]" />
          {partner.currentOrders} active orders
        </p>
      </div>

      {(onTrack || onCall || onViewProfile) && (
        <div className="mt-3 flex items-center gap-2 border-t border-[#e8e8e8] pt-3">
          {onViewProfile && (
            <button
              onClick={() => onViewProfile(partner)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#f6f7f6] py-1.5 text-[10px] font-bold text-[#666] hover:bg-[#e8e8e8] transition-colors"
            >
              <Navigation className="h-3 w-3" /> Profile
            </button>
          )}
          {onTrack && (
            <button
              onClick={() => onTrack(partner)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#e8f5e9] py-1.5 text-[10px] font-bold text-[#0c831f] hover:bg-[#d0edd4] transition-colors"
            >
              <MapPin className="h-3 w-3" /> Track
            </button>
          )}
          {onCall && partner.phone && (
            <button
              onClick={() => onCall(partner)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#eff6ff] py-1.5 text-[10px] font-bold text-[#2563eb] hover:bg-[#dbeafe] transition-colors"
            >
              <Phone className="h-3 w-3" /> Call
            </button>
          )}
        </div>
      )}
    </div>
  );
}
