// ── Order Timeline ──────────────────────────────────────
// Reusable timeline component for order event history

"use client";

import { CheckCircle, ShoppingCart, CreditCard, Package, Truck, XCircle, Undo2 } from "lucide-react";
import StatusBadge from "../../admin/reusable-status-badge";
import type { Order } from "@/types/orders";

const statusIcons: Record<string, React.ReactNode> = {
  pending: <ShoppingCart className="h-3.5 w-3.5" />,
  confirmed: <CreditCard className="h-3.5 w-3.5" />,
  preparing: <Package className="h-3.5 w-3.5" />,
  out_for_delivery: <Truck className="h-3.5 w-3.5" />,
  delivered: <CheckCircle className="h-3.5 w-3.5" />,
  cancelled: <XCircle className="h-3.5 w-3.5" />,
  returned: <Undo2 className="h-3.5 w-3.5" />,
};

const statusColors: Record<string, string> = {
  pending: "bg-[#fffbeb] text-[#d97706]",
  confirmed: "bg-[#eff6ff] text-[#2563eb]",
  preparing: "bg-[#f3e8ff] text-[#9333ea]",
  out_for_delivery: "bg-[#fff0f6] text-[#ff4f8b]",
  delivered: "bg-[#e8f5e9] text-[#0c831f]",
  cancelled: "bg-[#fef2f2] text-[#dc2626]",
  returned: "bg-[#fef2f2] text-[#dc2626]",
};

function formatTimestamp(ts: string): string {
  try {
    const d = new Date(ts);
    return d.toLocaleString("en-IN", {
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return ts;
  }
}

// ── Timeline for detail view (vertical timeline) ───────

interface TimelineProps {
  timeline: Order["timeline"];
  currentStatus?: string;
}

export function OrderTimeline({ timeline }: TimelineProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="rounded-xl bg-[#f9fafb] p-6 text-center">
        <p className="text-xs text-[#999]">No timeline events recorded</p>
      </div>
    );
  }

  // Deduplicate: show only unique status transitions
  const seen = new Set<string>();
  const uniqueTimeline = timeline.filter((e) => {
    const key = e.status + e.timestamp;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className="space-y-0">
      {uniqueTimeline.map((event, i) => {
        const icon = statusIcons[event.status] || <CheckCircle className="h-3.5 w-3.5" />;
        const color = statusColors[event.status] || "bg-[#f6f7f6] text-[#666]";
        const isLast = i === uniqueTimeline.length - 1;

        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${color}`}>
                {icon}
              </div>
              {!isLast && <div className="w-0.5 flex-1 bg-[#e8e8e8]" />}
            </div>
            <div className={`pb-5 ${isLast ? "" : ""}`}>
              <p className="text-sm font-bold text-[#1a1a1a]">
                {event.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <p className="text-xs text-[#999]">{formatTimestamp(event.timestamp)}</p>
              {event.note && (
                <p className="mt-0.5 text-xs text-[#666] bg-[#f6f7f6] rounded-lg px-2.5 py-1.5 inline-block">
                  {event.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Timeline Card (for page view) ──────────────────────

interface TimelineCardProps {
  order: Order;
}

export function OrderTimelineCard({ order }: TimelineCardProps) {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#0c831f]">{order.id}</span>
          <span className="text-sm font-bold text-[#1a1a1a]">{order.customer}</span>
          <StatusBadge status={order.status} />
        </div>
        <span className="text-sm font-bold">₹{order.total}</span>
      </div>
      <div className="relative ml-1">
        <OrderTimeline timeline={order.timeline} currentStatus={order.status} />
      </div>
      {order.notes && (
        <div className="mt-3 rounded-xl bg-[#fffbeb] border border-[#fde68a] p-3">
          <p className="text-xs font-bold text-[#d97706]">📝 Note</p>
          <p className="mt-0.5 text-xs text-[#666]">{order.notes}</p>
        </div>
      )}
    </div>
  );
}
