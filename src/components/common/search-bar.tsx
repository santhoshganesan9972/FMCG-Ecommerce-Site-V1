"use client";

import { Search, X } from "lucide-react";
import { BORDER, BORDER_FOCUS, TEXT_PRIMARY, TEXT_DISABLED, TRANSITION } from "@/lib/shared-classes";

interface ReusableSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
}

/**
 * A search input with icon and clear button.
 *
 * @example
 * <ReusableSearchBar
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Search vendors..."
 * />
 */
export function ReusableSearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  onClear,
}: ReusableSearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${TEXT_DISABLED}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl ${BORDER} py-2.5 pl-10 pr-10 text-sm ${TEXT_PRIMARY} placeholder:${TEXT_DISABLED} ${BORDER_FOCUS} ${TRANSITION}`}
      />
      {value && (
        <button
          onClick={() => { onChange(""); onClear?.(); }}
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${TEXT_DISABLED} hover:${TEXT_PRIMARY} ${TRANSITION}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
