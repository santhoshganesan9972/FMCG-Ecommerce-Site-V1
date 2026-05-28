"use client";

import type { ReactNode } from "react";
import { CARD, TEXT_PRIMARY, TEXT_MUTED } from "@/lib/shared-classes";

interface ReusablePageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  actions?: ReactNode;
  className?: string;
}

/**
 * A consistent page header with title, optional subtitle, breadcrumb, and action buttons.
 *
 * @example
 * <ReusablePageHeader
 *   title="Vendors"
 *   subtitle="Manage all vendor accounts"
 *   breadcrumb="Admin / Vendors"
 *   actions={<Button>Add Vendor</Button>}
 * />
 */
export function ReusablePageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  className = "",
}: ReusablePageHeaderProps) {
  return (
    <div className={`rounded-2xl ${CARD} p-5 sm:p-6 ${className}`}>
      {breadcrumb && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#0c831f] mb-1">{breadcrumb}</p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-black ${TEXT_PRIMARY}`}>{title}</h1>
          {subtitle && <p className={`mt-2 max-w-2xl text-sm ${TEXT_MUTED}`}>{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
