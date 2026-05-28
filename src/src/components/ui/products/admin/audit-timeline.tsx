"use client";

import { History, Plus, Edit3, DollarSign, Package, Activity, Trash2, Image, Hash, Tag, Upload } from "lucide-react";

interface AuditEntry {
  id: string;
  action: string;
  product: string;
  productId: string;
  field: string;
  oldValue: string;
  newValue: string;
  performedBy: string;
  role: string;
  timestamp: string;
}

interface AuditTimelineProps {
  entries: AuditEntry[];
  isLoading?: boolean;
}

const actionIcons: Record<string, React.ReactNode> = {
  "Product Created": <Plus className="h-4 w-4" />,
  "Price Updated": <DollarSign className="h-4 w-4" />,
  "Stock Adjusted": <Package className="h-4 w-4" />,
  "Status Changed": <Activity className="h-4 w-4" />,
  "Product Deleted": <Trash2 className="h-4 w-4" />,
  "Category Changed": <Tag className="h-4 w-4" />,
  "Variant Added": <Plus className="h-4 w-4" />,
  "Bulk Import Completed": <Upload className="h-4 w-4" />,
  "SEO Updated": <Hash className="h-4 w-4" />,
  "Media Added": <Image className="h-4 w-4" />,
};

const actionColors: Record<string, string> = {
  "Product Created": "bg-[#e8f5e9] text-[#0c831f]",
  "Price Updated": "bg-[#eff6ff] text-[#2563eb]",
  "Stock Adjusted": "bg-[#fffbeb] text-[#d97706]",
  "Status Changed": "bg-[#f3e8ff] text-[#9333ea]",
  "Product Deleted": "bg-[#fef2f2] text-[#dc2626]",
  "Category Changed": "bg-[#f0fdf4] text-[#16a34a]",
  "Variant Added": "bg-[#f6f7f6] text-[#666]",
  "Bulk Import Completed": "bg-[#fff0f6] text-[#ff4f8b]",
  "SEO Updated": "bg-[#fefce8] text-[#ca8a04]",
  "Media Added": "bg-[#f0f9ff] text-[#0284c7]",
};

const roleColors: Record<string, string> = {
  "super admin": "bg-[#f3e8ff] text-[#9333ea]",
  "operations admin": "bg-[#eff6ff] text-[#2563eb]",
  "store manager": "bg-[#fffbeb] text-[#d97706]",
  "admin": "bg-[#e8f5e9] text-[#0c831f]",
};

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return timestamp;
  }
}

export default function AuditTimeline({ entries, isLoading }: AuditTimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-8 w-8 skeleton-shimmer rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 skeleton-shimmer rounded-lg" />
              <div className="h-3 w-32 skeleton-shimmer rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f7f6]">
          <History className="h-6 w-6 text-[#999]" />
        </div>
        <p className="text-sm font-bold text-[#666]">No audit logs found</p>
        <p className="mt-1 text-xs text-[#999]">Changes to products will appear here</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-0 h-full w-0.5 bg-[#e8e8e8]" />

      <div className="space-y-4">
        {entries.map((entry) => {
          const icon = actionIcons[entry.action] || <Activity className="h-4 w-4" />;
          const color = actionColors[entry.action] || "bg-[#f6f7f6] text-[#666]";
          const roleColor = roleColors[entry.role.toLowerCase()] || "bg-[#f6f7f6] text-[#666]";

          return (
            <div key={entry.id} className="relative flex gap-4">
              {/* Icon */}
              <div
                className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-sm ${color}`}
              >
                {icon}
              </div>

              {/* Content */}
              <div className="flex-1 rounded-xl border border-[#e8e8e8] bg-white p-3 transition-all hover:shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{entry.action}</p>
                    <p className="mt-0.5 text-xs text-[#666]">
                      <span className="font-medium">{entry.product}</span>
                      {entry.field !== "All" && entry.field !== "—" && (
                        <span> — field: <span className="font-medium">{entry.field}</span></span>
                      )}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${roleColor}`}>
                    {entry.role}
                  </span>
                </div>

                {/* Old → New values */}
                {entry.oldValue !== "—" && entry.newValue !== "—" && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#f9fafb] px-3 py-1.5">
                    <span className="text-xs text-[#dc2626] line-through">{entry.oldValue}</span>
                    <span className="text-[#999]">→</span>
                    <span className="text-xs font-semibold text-[#0c831f]">{entry.newValue}</span>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-[#999]">
                    by <span className="font-medium text-[#666]">{entry.performedBy}</span>
                  </span>
                  <span className="text-[10px] text-[#999]">{formatTimestamp(entry.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
