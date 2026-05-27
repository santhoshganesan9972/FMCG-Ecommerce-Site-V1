// ── Customer Card & Profile Overview ────────────────────
// Reusable components for displaying customer profiles

"use client";

import StatusBadge from "../../admin/reusable-status-badge";
import { ShoppingCart, Calendar, Edit3, Mail } from "lucide-react";
import type { Customer } from "@/types/customers";

// ── Customer Card ────────────────────────────────────────

interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  compact?: boolean;
}

export function CustomerCard({ customer, onClick, onEdit, compact }: CustomerCardProps) {
  return (
    <div
      onClick={() => onClick?.(customer)}
      className={`cursor-pointer rounded-xl border border-[#e8e8e8] bg-white transition-all hover:shadow-md hover:-translate-y-0.5 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5e9] text-sm font-black text-[#0c831f]">
            {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className={`font-bold text-[#1a1a1a] ${compact ? "text-sm" : ""}`}>{customer.name}</p>
            <p className="text-xs text-[#999]">{customer.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusBadge status={customer.segment} />
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(customer); }}
              className="rounded-lg p-1.5 text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className={`grid gap-2 ${compact ? "mt-2 grid-cols-2" : "mt-3 grid-cols-3"} text-xs`}>
        <div className="rounded-lg bg-[#f9fafb] p-2">
          <p className="text-[#999]">Orders</p>
          <p className="font-bold text-[#1a1a1a]">{customer.totalOrders}</p>
        </div>
        <div className="rounded-lg bg-[#f9fafb] p-2">
          <p className="text-[#999]">Spent</p>
          <p className="font-bold text-[#1a1a1a]">₹{customer.totalSpent.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-[#f9fafb] p-2">
          <p className="text-[#999]">AOV</p>
          <p className="font-bold text-[#1a1a1a]">₹{customer.avgOrderValue}</p>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 flex flex-wrap gap-2">
          {customer.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-bold text-[#666]">
              #{tag}
            </span>
          ))}
          {customer.status !== "active" && (
            <StatusBadge status={customer.status} />
          )}
        </div>
      )}

      {!compact && (
        <div className="mt-2 flex items-center gap-3 text-[10px] text-[#999]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {customer.registeredAt}
          </span>
          {customer.lastOrderDate && (
            <span className="flex items-center gap-1">
              <ShoppingCart className="h-3 w-3" /> Last: {customer.lastOrderDate}
            </span>
          )}
        </div>
      )}

      {customer.lifetimeValue && !compact && (
        <div className="mt-2 rounded-lg bg-[#f0fdf4] px-2.5 py-1.5 text-xs">
          <span className="text-[#666]">LTV: </span>
          <span className="font-bold text-[#0c831f]">{customer.lifetimeValue}</span>
          {customer.acquisitionChannel && (
            <span className="ml-2 text-[#999]">via {customer.acquisitionChannel}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Customer Timeline ────────────────────────────────────

interface CustomerTimelineProps {
  items: { id: string; action: string; description: string; timestamp: string; performedBy?: string }[];
  compact?: boolean;
}

const actionIcons: Record<string, React.ReactNode> = {
  created: <div className="h-6 w-6 rounded-full bg-[#e8f5e9] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#0c831f]" /></div>,
  updated: <div className="h-6 w-6 rounded-full bg-[#eff6ff] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#2563eb]" /></div>,
  blocked: <div className="h-6 w-6 rounded-full bg-[#fef2f2] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#dc2626]" /></div>,
  suspended: <div className="h-6 w-6 rounded-full bg-[#fffbeb] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#d97706]" /></div>,
  note_added: <div className="h-6 w-6 rounded-full bg-[#f3e8ff] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#9333ea]" /></div>,
  segment_changed: <div className="h-6 w-6 rounded-full bg-[#fff0f6] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#ff4f8b]" /></div>,
  login: <div className="h-6 w-6 rounded-full bg-[#f6f7f6] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#666]" /></div>,
  order_placed: <div className="h-6 w-6 rounded-full bg-[#f0fdf4] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#0c831f]" /></div>,
  email_sent: <div className="h-6 w-6 rounded-full bg-[#e0f2fe] flex items-center justify-center"><Mail className="h-3 w-3 text-[#0284c7]" /></div>,
};

export function CustomerTimeline({ items, compact }: CustomerTimelineProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-[#f9fafb] p-6 text-center text-sm text-[#999]">
        No activity recorded yet.
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {items.map((item, idx) => {
        const Icon = actionIcons[item.action] || actionIcons.updated;

        // Calculate time grouping
        const date = item.timestamp.split("T")[0] || item.timestamp.split(" ")[0];
        const prevDate = idx > 0 ? (items[idx - 1].timestamp.split("T")[0] || items[idx - 1].timestamp.split(" ")[0]) : null;
        const showDate = date !== prevDate;

        return (
          <div key={item.id}>
            {showDate && (
              <p className="sticky top-0 mb-2 mt-4 bg-white text-[10px] font-bold uppercase tracking-wide text-[#999] first:mt-0">
                {new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </p>
            )}
            <div className="group flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                {Icon}
                <div className="mt-1 h-full w-px bg-[#e8e8e8] group-last:hidden" />
              </div>
              <div className={`flex-1 ${compact ? "pb-0" : "pb-0"}`}>
                <p className="text-sm font-bold text-[#1a1a1a]">{item.description}</p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#999]">
                  <span>{item.timestamp.includes("T") ? item.timestamp.split("T")[1]?.split(":").slice(0, 2).join(":") : item.timestamp.split(" ")[1]}</span>
                  {item.performedBy && <span>by {item.performedBy}</span>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Segment Builder Card ─────────────────────────────────

interface SegmentBuilderProps {
  segment: { name: string; customerCount: number; avgOrderValue: number; totalRevenue: number; retentionRate: number; color: string };
  maxCount: number;
}

export function SegmentBuilderCard({ segment, maxCount }: SegmentBuilderProps) {
  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
          <span className="text-sm font-bold text-[#1a1a1a]">{segment.name}</span>
        </div>
        <span className="text-xs font-bold text-[#666]">{segment.customerCount} customers</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
        <div className="h-full rounded-full transition-all" style={{ width: `${(segment.customerCount / maxCount) * 100}%`, backgroundColor: segment.color }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-[#f9fafb] p-2 text-center">
          <p className="text-[#999]">AOV</p>
          <p className="font-bold text-[#1a1a1a]">₹{segment.avgOrderValue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-[#f9fafb] p-2 text-center">
          <p className="text-[#999]">Revenue</p>
          <p className="font-bold text-[#1a1a1a]">₹{segment.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-[#f9fafb] p-2 text-center">
          <p className="text-[#999]">Retention</p>
          <p className="font-bold text-[#1a1a1a]">{segment.retentionRate}%</p>
        </div>
      </div>
    </div>
  );
}
