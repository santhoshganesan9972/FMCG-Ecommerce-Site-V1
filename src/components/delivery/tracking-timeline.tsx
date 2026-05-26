"use client";

import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
  XCircle,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

interface TimelineEvent {
  status: string;
  timestamp: string;
  note?: string;
  location?: { lat: number; lng: number };
}

interface TrackingTimelineProps {
  events: TimelineEvent[];
  currentStatus: string;
  className?: string;
  compact?: boolean;
}

const statusIcons: Record<string, LucideIcon> = {
  assigned: Clock,
  picked_up: Package,
  in_transit: Truck,
  out_for_delivery: Truck,
  delivered: CheckCircle2,
  failed: XCircle,
  returned: AlertCircle,
  cancelled: XCircle,
  pending: Clock,
};

const statusColors: Record<string, string> = {
  assigned: "bg-[#2563eb]",
  picked_up: "bg-[#d97706]",
  in_transit: "bg-[#9333ea]",
  out_for_delivery: "bg-[#0c831f]",
  delivered: "bg-[#0c831f]",
  failed: "bg-[#dc2626]",
  returned: "bg-[#dc2626]",
  cancelled: "bg-[#999]",
  pending: "bg-[#999]",
};

export function TrackingTimeline({
  events,
  currentStatus,
  className = "",
  compact = false,
}: TrackingTimelineProps) {
  const statusOrder = ["assigned", "picked_up", "in_transit", "out_for_delivery", "delivered"];
  const currentIdx = statusOrder.indexOf(currentStatus);

  if (events.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-8 text-center ${className}`}>
        <Clock className="h-8 w-8 text-[#ccc]" />
        <p className="mt-2 text-sm font-bold text-[#999]">No timeline events yet</p>
      </div>
    );
  }

  return (
    <div className={`space-y-0 ${className}`}>
      {events.map((event, i) => {
        const Icon = statusIcons[event.status] || Clock;
        const color = statusColors[event.status] || "bg-[#999]";
        const isLast = i === events.length - 1;
        const isActive = event.status === currentStatus;

        return (
          <div key={i} className="relative flex gap-3 pb-5 last:pb-0">
            {/* Line connector */}
            {!isLast && (
              <div
                className={`absolute left-[13px] top-6 bottom-0 w-0.5 ${
                  isActive ? "bg-[#0c831f]/30" : "bg-[#e8e8e8]"
                }`}
              />
            )}

            {/* Dot / Icon */}
            <div
              className={`relative z-10 mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                isActive ? `${color} shadow-md` : color
              } ${compact ? "h-5 w-5" : "h-7 w-7"}`}
            >
              <Icon className={`text-white ${compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2">
                <p
                  className={`font-bold text-[#1a1a1a] capitalize ${
                    compact ? "text-xs" : "text-sm"
                  }`}
                >
                  {event.status.replace(/_/g, " ")}
                </p>
                {isActive && (
                  <span className="inline-flex h-5 items-center rounded-full bg-[#0c831f]/10 px-2 text-[9px] font-bold text-[#0c831f]">
                    Current
                  </span>
                )}
              </div>
              {event.note && (
                <p className={`mt-0.5 text-[#666] ${compact ? "text-[10px]" : "text-xs"}`}>
                  {event.note}
                </p>
              )}
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[#999]">
                  {new Date(event.timestamp).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1 text-[10px] text-[#2563eb]">
                    <MapPin className="h-2.5 w-2.5" />
                    {event.location.lat.toFixed(4)}, {event.location.lng.toFixed(4)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
