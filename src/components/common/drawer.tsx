"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { BORDER, TEXT_PRIMARY, TEXT_MUTED, TEXT_DISABLED, BG_ROW_HOVER, TRANSITION } from "@/lib/shared-classes";

interface ReusableDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const drawerWidths: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

/**
 * A slide-in drawer panel from the right side.
 *
 * @example
 * <ReusableDrawer open={isOpen} onClose={() => setIsOpen(false)} title="Details">
 *   <p>Drawer content</p>
 * </ReusableDrawer>
 */
export function ReusableDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "md",
  className = "",
}: ReusableDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${drawerWidths[width]} bg-white shadow-2xl animate-in slide-in-from-right h-full flex flex-col ${className}`}
      >
        <div className={`flex items-start justify-between ${BORDER} px-5 py-4`}>
          <div>
            <h2 className={`text-lg font-black ${TEXT_PRIMARY}`}>{title}</h2>
            {subtitle && <p className={`mt-1 text-sm ${TEXT_MUTED}`}>{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${TEXT_DISABLED} hover:${BG_ROW_HOVER} hover:${TEXT_PRIMARY} ${TRANSITION}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto px-5 py-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}
        >
          {children}
        </div>
        {footer && (
          <div className={`flex items-center justify-end gap-3 ${BORDER} bg-[#f9fafb] px-5 py-4`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
