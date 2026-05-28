"use client";

import { memo, type ReactNode } from "react";
import { CARD_HOVER, TEXT_PRIMARY, TEXT_DISABLED } from "@/lib/shared-classes";

interface ReusableAnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
  onClick?: () => void;
}

const trendColors: Record<string, string> = {
  up: "text-[#0c831f]",
  down: "text-red-500",
  neutral: "text-[#999]",
};

/**
 * A compact analytics metric card with value, trend indicator, and optional icon.
 *
 * @example
 * <ReusableAnalyticsCard
 *   title="Total Revenue"
 *   value="₹12.5L"
 *   change="+12.3%"
 *   trend="up"
 * />
 */
export const ReusableAnalyticsCard = memo(function ReusableAnalyticsCard({
  title,
  value,
  change,
  subtitle,
  icon,
  trend = "neutral",
  className = "",
  onClick,
}: ReusableAnalyticsCardProps) {
  return (
    <div
      className={`${CARD_HOVER} p-4 ${
        onClick ? "cursor-pointer hover:-translate-y-0.5" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <p className={`text-[10px] font-bold ${TEXT_DISABLED} uppercase tracking-wide`}>{title}</p>
        {icon && <div className="text-[#0c831f]/80">{icon}</div>}
      </div>
      <h3 className={`text-xl sm:text-2xl font-black ${TEXT_PRIMARY} mt-1`}>{value}</h3>
      <div className="flex items-center gap-2 mt-1.5">
        {change && (
          <span className={`text-[10px] sm:text-xs font-black ${trendColors[trend]}`}>
            {change}
          </span>
        )}
        {subtitle && <span className={`text-[10px] ${TEXT_DISABLED}`}>{subtitle}</span>}
      </div>
    </div>
  );
});
