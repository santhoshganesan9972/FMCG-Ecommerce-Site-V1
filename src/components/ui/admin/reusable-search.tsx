"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface ReusableSearchProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onClear?: () => void;
}

export default function ReusableSearchBar({
  value = "",
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  onClear,
}: ReusableSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setLocalValue(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(val), debounceMs);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    onClear?.();
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white pl-9 pr-9 text-sm text-[#1a1a1a] outline-none transition-all placeholder:text-[#999] focus:border-[#0c831f] focus:ring-1 focus:ring-[#0c831f]/20"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
