"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { CARD, TEXT_MUTED, TEXT_DISABLED, BG_PRIMARY, BTN_SECONDARY, BG_LIGHT, INPUT_SIMPLE, TRANSITION } from "@/lib/shared-classes";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  key: string;
  type: "select" | "text" | "number";
  options?: FilterOption[];
  placeholder?: string;
}

interface ReusableFilterPanelProps {
  groups: FilterGroup[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  activeCount?: number;
  className?: string;
}

/**
 * A dropdown filter panel with grouped filter fields.
 *
 * @example
 * <ReusableFilterPanel
 *   groups={[{ label: "Status", key: "status", type: "select", options: [...] }]}
 *   values={filters}
 *   onChange={setFilter}
 *   onClear={clearFilters}
 *   activeCount={activeFilterCount}
 * />
 */
export function ReusableFilterPanel({
  groups,
  values,
  onChange,
  onClear,
  activeCount = 0,
  className = "",
}: ReusableFilterPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 ${BTN_SECONDARY}`}
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className={`flex h-5 w-5 items-center justify-center rounded-full ${BG_PRIMARY} text-[10px] font-bold text-white`}>
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className={`absolute right-0 top-full mt-2 z-20 w-72 ${CARD} p-4 shadow-lg animate-in fade-in zoom-in-95`}>
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.key}>
                <label className={`mb-1.5 block text-xs font-bold ${TEXT_MUTED}`}>{group.label}</label>
                {group.type === "select" ? (
                  <select
                    value={values[group.key] || ""}
                    onChange={(e) => onChange(group.key, e.target.value)}
                    className={INPUT_SIMPLE}
                  >
                    <option value="">All</option>
                    {group.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={group.type}
                    value={values[group.key] || ""}
                    onChange={(e) => onChange(group.key, e.target.value)}
                    placeholder={group.placeholder}
                    className={`${INPUT_SIMPLE} placeholder:${TEXT_DISABLED}`}
                  />
                )}
              </div>
            ))}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className={`mt-3 w-full rounded-lg ${BG_LIGHT} px-3 py-2 text-xs font-bold ${TEXT_MUTED} hover:bg-[#e8e8e8] ${TRANSITION}`}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
