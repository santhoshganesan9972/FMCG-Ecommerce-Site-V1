"use client";

import { BORDER, BORDER_FOCUS, TEXT_PRIMARY, TEXT_MUTED, TRANSITION } from "@/lib/shared-classes";

interface ReusableDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  min?: string;
  max?: string;
}

/**
 * A date input with optional label.
 *
 * @example
 * <ReusableDatePicker
 *   value={dateFrom}
 *   onChange={setDateFrom}
 *   label="From"
 * />
 */
export function ReusableDatePicker({
  value,
  onChange,
  label,
  className = "",
  min,
  max,
}: ReusableDatePickerProps) {
  return (
    <div className={className}>
      {label && <label className={`mb-1.5 block text-xs font-bold ${TEXT_MUTED}`}>{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className={`w-full rounded-xl ${BORDER} px-4 py-2.5 text-sm ${TEXT_PRIMARY} ${BORDER_FOCUS} ${TRANSITION}`}
      />
    </div>
  );
}
