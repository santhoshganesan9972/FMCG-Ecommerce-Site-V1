"use client";

import { useState } from "react";
import { BORDER, CARD, TEXT_PRIMARY, TEXT_MUTED, BG_ROW_HOVER, TRANSITION } from "@/lib/shared-classes";

interface ReusableExportButtonProps {
  onExport: (format: "csv" | "xlsx" | "pdf") => void;
  className?: string;
  formats?: ("csv" | "xlsx" | "pdf")[];
}

const formatLabels: Record<string, string> = {
  csv: "CSV",
  xlsx: "Excel",
  pdf: "PDF",
};

/**
 * A dropdown button for exporting data in various formats.
 *
 * @example
 * <ReusableExportButton onExport={(format) => handleExport(format)} />
 */
export function ReusableExportButton({
  onExport,
  className = "",
  formats = ["csv", "xlsx", "pdf"],
}: ReusableExportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 ${BORDER} px-4 py-2.5 text-sm font-semibold ${TEXT_PRIMARY} hover:bg-[#f8f9fa] ${TRANSITION}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export
      </button>
      {open && (
        <div className={`absolute right-0 top-full mt-2 z-20 w-36 ${CARD} p-1.5 shadow-lg animate-in fade-in zoom-in-95`}>
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => { onExport(fmt); setOpen(false); }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${TEXT_MUTED} hover:${BG_ROW_HOVER} hover:${TEXT_PRIMARY} ${TRANSITION}`}
            >
              {formatLabels[fmt]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
