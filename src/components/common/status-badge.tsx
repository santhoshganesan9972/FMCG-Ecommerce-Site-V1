"use client";

import { memo } from "react";
import { BADGE_BASE, TEXT_MUTED } from "@/lib/shared-classes";

const badgeVariants: Record<string, string> = {
  success: "bg-[#e8f5e9] text-[#0c831f]",
  warning: "bg-[#fffbeb] text-amber-600",
  danger: "bg-[#fef2f2] text-red-600",
  info: "bg-[#eff7ff] text-blue-600",
  neutral: `bg-[#f6f7f6] ${TEXT_MUTED}`,
  draft: "bg-[#f3f0ff] text-purple-600",
};

const statusVariantMap: Record<string, string> = {
  active: "success",
  completed: "success",
  delivered: "success",
  paid: "success",
  confirmed: "success",
  online: "success",
  in_stock: "success",
  pending: "warning",
  processing: "warning",
  reminded: "warning",
  in_progress: "warning",
  busy: "warning",
  inactive: "danger",
  cancelled: "danger",
  failed: "danger",
  blocked: "danger",
  out_of_stock: "danger",
  suspended: "danger",
  lost: "danger",
  offline: "danger",
  draft: "draft",
  new: "draft",
};

/**
 * A color-coded badge for displaying status values.
 * Automatically picks a variant based on common status keywords.
 *
 * @example
 * <ReusableStatusBadge status="Active" />
 * <ReusableStatusBadge status="Pending" variant="warning" />
 */
interface ReusableStatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "draft";
  className?: string;
}

export const ReusableStatusBadge = memo(function ReusableStatusBadge({ status, variant, className = "" }: ReusableStatusBadgeProps) {
  const resolvedVariant = variant || statusVariantMap[status.toLowerCase().replace(/\s+/g, "_")] || "neutral";
  return (
    <span className={`${BADGE_BASE} ${badgeVariants[resolvedVariant]} ${className}`}>
      {status}
    </span>
  );
});
