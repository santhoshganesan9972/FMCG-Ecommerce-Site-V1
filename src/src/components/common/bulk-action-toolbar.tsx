"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { TEXT_MUTED, TRANSITION } from "@/lib/shared-classes";

interface ReusableBulkActionToolbarProps {
  selectedCount: number;
  actions: { label: string; icon: ReactNode; onClick: () => void; variant?: "default" | "danger" }[];
  onClear: () => void;
  className?: string;
}

/**
 * A floating toolbar that appears when items are selected.
 *
 * @example
 * <ReusableBulkActionToolbar
 *   selectedCount={selectedIds.length}
 *   actions={[{ label: "Delete", icon: <Trash2 />, onClick: handleBulkDelete, variant: "danger" }]}
 *   onClear={() => setSelectedIds([])}
 * />
 */
export function ReusableBulkActionToolbar({
  selectedCount,
  actions,
  onClear,
  className = "",
}: ReusableBulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={`flex items-center gap-3 rounded-xl border border-[#0c831f]/30 bg-[#f0fdf4] px-4 py-3 animate-in fade-in ${className}`}>
      <span className="text-sm font-bold text-[#0c831f]">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2 ml-auto">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              action.variant === "danger"
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-white text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f] border border-[#e8e8e8]"
            }`}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
        <button
          onClick={onClear}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${TEXT_MUTED} hover:bg-[#e8e8e8] ${TRANSITION}`}
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
    </div>
  );
}
