"use client";

import type { ReactNode } from "react";
import { CARD, TEXT_PRIMARY, TEXT_MUTED } from "@/lib/shared-classes";

interface ReusableChartProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  height?: number;
  action?: ReactNode;
}

/**
 * A wrapper for chart content with title, subtitle, and optional action.
 */
export function ReusableChart({
  title,
  subtitle,
  children,
  className = "",
  height = 300,
  action,
}: ReusableChartProps) {
  return (
    <div className={`rounded-2xl ${CARD} p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-base font-black ${TEXT_PRIMARY}`}>{title}</h3>
          {subtitle && <p className={`mt-0.5 text-xs ${TEXT_MUTED}`}>{subtitle}</p>}
        </div>
        {action}
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}
