"use client";

// ── Reusable Chart Primitives ─────────────────────────────
// Extracted from inline dashboard code. Use across any admin section.
// All follow the same design language: rounded corners, soft colors, clean typography.

import { type ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

// ── Section Header ────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
  color?: string;
}

export function SectionHeader({ title, subtitle, action, icon, color = "text-[#0c831f]" }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon && <div className={color}>{icon}</div>}
        <div>
          <p className={`text-xs font-black uppercase tracking-wide ${color}`}>{title}</p>
          {subtitle && <h3 className="text-sm font-black text-[#1a1a1a]">{subtitle}</h3>}
        </div>
      </div>
      {action}
    </div>
  );
}

// ── Bar Chart ─────────────────────────────────────────────

export interface ChartPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: ChartPoint[];
  color?: string;
  barColor?: string;
  barHover?: string;
  formatValue?: (v: number) => string;
  height?: number;
}

export const BarChart = memo(function BarChart({
  data,
  color = "text-[#0c831f]",
  barColor = "bg-[#0c831f]/20",
  barHover = "hover:bg-[#0c831f]/40",
  formatValue,
  height = 192,
}: BarChartProps) {
  const max = Math.max(...data.map((p) => p.value), 1);
  return (
    <div className="flex items-end gap-1.5 sm:gap-2" style={{ height }}>
      {data.map((point) => (
        <div key={point.label} className="flex flex-1 flex-col items-center gap-1 h-full justify-end">
          <span className={`text-[9px] font-bold ${color}`}>
            {formatValue ? formatValue(point.value) : point.value.toLocaleString()}
          </span>
          <div
            className={`w-full rounded-t-lg transition-all cursor-pointer ${barColor} ${barHover} relative group`}
            style={{ height: `${Math.max((point.value / max) * 100, 5)}%`, minHeight: 12 }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 hidden group-hover:block rounded-lg bg-[#1a1a1a] px-2 py-1 text-[10px] font-bold text-white whitespace-nowrap">
              {formatValue ? formatValue(point.value) : point.value.toLocaleString()}
            </div>
          </div>
          <span className="text-[9px] text-[#999]">{point.label}</span>
        </div>
      ))}
    </div>
  );
});

// ── Donut Chart ───────────────────────────────────────────

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  strokeWidth?: number;
}

export const DonutChart = memo(function DonutChart({ data, size = 120, strokeWidth = 20 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 absolute inset-0">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e8e8e8"
            strokeWidth={strokeWidth}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-lg font-black text-[#999]">0</span>
          <span className="text-[9px] text-[#999]">Total</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        {(() => {
          let offset = 0;
          return data.map((d) => {
            const segment = circumference * (d.value / total);
            const segOffset = offset;
            offset += segment;
            return (
              <circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segment} ${circumference - segment}`}
                strokeDashoffset={-segOffset}
                className="transition-all duration-500"
              />
            );
          });
        })()}
        <circle cx={size / 2} cy={size / 2} r={radius - strokeWidth / 2} fill="white" />
      </svg>
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-lg font-black text-[#1a1a1a]">{total.toLocaleString()}</span>
        <span className="text-[9px] text-[#999]">Total</span>
      </div>
    </div>
  );
});

// ── Legend Row (for use below donut charts) ───────────────

interface LegendRowProps {
  label: string;
  value: string;
  color: string;
}

export function LegendRow({ label, value, color }: LegendRowProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="flex-1 text-xs text-[#666] truncate">{label}</span>
      <span className="text-xs font-bold text-[#1a1a1a]">{value}</span>
    </div>
  );
}

export function LegendRows({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  return (
    <div className="mt-4 space-y-2">
      {data.map((d) => (
        <LegendRow key={d.label} label={d.label} value={total > 0 ? `${((d.value / total) * 100).toFixed(0)}%` : "0%"} color={d.color} />
      ))}
    </div>
  );
}

// ── Mini Progress Bar ─────────────────────────────────────

interface MiniProgressBarProps {
  value: number;
  max: number;
  color?: string;
  label?: string;
}

export const MiniProgressBar = memo(function MiniProgressBar({ value, max, color = "#0c831f", label }: MiniProgressBarProps) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      {label && <span className="w-20 text-[10px] text-[#666] truncate">{label}</span>}
      <div className="flex-1 h-1.5 rounded-full bg-[#e8e8e8]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-12 text-right text-[10px] font-bold text-[#666]">{value.toLocaleString()}</span>
    </div>
  );
});

// ── Chart Card Wrapper ────────────────────────────────────

interface ChartCardProps {
  children: ReactNode;
  className?: string;
}

export function ChartCard({ children, className }: ChartCardProps) {
  return (
    <div className={cn("rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}
