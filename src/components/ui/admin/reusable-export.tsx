"use client";

import { Download, FileSpreadsheet, FileText, FileArchive } from "lucide-react";
import { useState } from "react";

interface ReusableExportButtonProps {
  onExport: (format: "csv" | "xlsx" | "pdf") => void;
  fileName?: string;
}

export default function ReusableExportButton({
  onExport,
  fileName = "export",
}: ReusableExportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-bold text-[#1a1a1a] transition-all hover:bg-[#f6f7f6]"
      >
        <Download className="h-4 w-4" />
        Export
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 w-40 rounded-xl border border-[#e8e8e8] bg-white py-1 shadow-lg animate-fade-down">
            {[
              { format: "csv" as const, icon: <FileText className="h-4 w-4" />, label: "Export as CSV" },
              { format: "xlsx" as const, icon: <FileSpreadsheet className="h-4 w-4" />, label: "Export as Excel" },
              { format: "pdf" as const, icon: <FileArchive className="h-4 w-4" />, label: "Export as PDF" },
            ].map((opt) => (
              <button
                key={opt.format}
                onClick={() => { onExport(opt.format); setOpen(false); }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a]"
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
