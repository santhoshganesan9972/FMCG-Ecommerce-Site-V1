"use client";

import React from "react";
import { X } from "lucide-react";

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  footer?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export default function ReusableModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = "md",
  footer,
  className = "",
}: ReusableModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${sizeClasses[size]} rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-[#1a1a1a]">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-[#666]">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-[#e8e8e8] bg-[#f9fafb] px-6 py-4 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
