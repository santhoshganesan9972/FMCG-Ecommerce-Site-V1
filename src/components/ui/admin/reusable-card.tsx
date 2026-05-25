"use client";

import type { ReactNode } from "react";

interface ReusableCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: string; direction: "up" | "down"; label?: string };
  subtitle?: string;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function ReusableCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  color = "text-[#0c831f]",
  bgColor = "bg-[#e8f5e9]",
  onClick,
  children,
}: ReusableCardProps) {
  return (
    <div
      className={`rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all ${
        onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-wide text-[#666]">
          {title}
        </span>
        {icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bgColor}`}>
            <div className={color}>{icon}</div>
          </div>
        )}
      </div>
      <p className="mt-1.5 text-xl font-black text-[#1a1a1a] sm:text-2xl">{value}</p>
      {trend && (
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              trend.direction === "up"
                ? "bg-[#e8f5e9] text-[#0c831f]"
                : "bg-[#fff0f6] text-[#ff4f8b]"
            }`}
          >
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}
          </span>
          {trend.label && <span className="text-[10px] text-[#999]">{trend.label}</span>}
        </div>
      )}
      {subtitle && <p className="mt-1 text-xs text-[#999]">{subtitle}</p>}
      {children}
    </div>
  );
}
