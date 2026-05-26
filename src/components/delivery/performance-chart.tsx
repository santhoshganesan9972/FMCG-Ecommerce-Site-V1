"use client";

import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";

interface ChartData {
  label: string;
  deliveries: number;
  onTime: number;
}

interface PerformanceChartProps {
  data: ChartData[];
  period?: string;
  className?: string;
  height?: number;
  showLegend?: boolean;
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: "text-[#0c831f]",
  down: "text-[#dc2626]",
  stable: "text-[#666]",
};

export function PerformanceChart({
  data,
  period = "30d",
  className = "",
  height = 200,
  showLegend = true,
}: PerformanceChartProps) {
  if (data.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border border-[#e8e8e8] bg-white ${className}`}
        style={{ height }}
      >
        <BarChart3 className="h-8 w-8 text-[#ccc]" />
        <p className="mt-2 text-sm font-bold text-[#999]">No data available</p>
        <p className="text-xs text-[#ccc]">Performance data will appear here</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => Math.max(d.deliveries, d.onTime)), 1);

  return (
    <div className={`${className}`}>
      {/* Legend */}
      {showLegend && (
        <div className="mb-3 flex items-center gap-4 text-[10px] font-bold text-[#666]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#0c831f]" />
            <span>On Time</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#e8e8e8]" />
            <span>Total</span>
          </div>
          <span className="ml-auto text-[#999]">
            Period: {period === "7d" ? "7 days" : period === "30d" ? "30 days" : period === "90d" ? "90 days" : period}
          </span>
        </div>
      )}

      {/* Chart */}
      <div className="relative" style={{ height }}>
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
            <div
              key={fraction}
              className="border-t border-dashed border-[#f0f0f0]"
              style={{ height: 0 }}
            />
          ))}
        </div>

        {/* Bars */}
        <div className="relative z-10 flex h-full items-end gap-2 sm:gap-3">
          {data.map((item) => {
            const deliveriesHeight = (item.deliveries / maxValue) * 100;
            const onTimeHeight = (item.onTime / maxValue) * 100;
            const onTimePercent =
              item.deliveries > 0
                ? Math.round((item.onTime / item.deliveries) * 100)
                : 0;

            return (
              <div
                key={item.label}
                className="group relative flex flex-1 flex-col items-center justify-end h-full"
              >
                {/* Bar group */}
                <div className="relative flex w-full items-end justify-center gap-0.5">
                  {/* Total bar */}
                  <div
                    className="w-2.5 sm:w-3 rounded-t-sm bg-[#e8e8e8] transition-all group-hover:bg-[#d0d0d0]"
                    style={{ height: `${deliveriesHeight}%` }}
                  />
                  {/* On-time bar */}
                  <div
                    className="w-2.5 sm:w-3 rounded-t-sm bg-[#0c831f] transition-all group-hover:bg-[#0a6a18]"
                    style={{ height: `${onTimeHeight}%` }}
                  />
                </div>

                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block z-20">
                  <div className="whitespace-nowrap rounded-lg bg-[#1a1a1a] px-2 py-1 text-[10px] text-white shadow-lg">
                    <span className="font-bold">{item.label}</span>
                    <br />
                    <span className="text-[#0c831f]">{item.onTime}</span> on time ·{" "}
                    <span>{item.deliveries}</span> total
                    <br />
                    <span>{onTimePercent}% on-time rate</span>
                  </div>
                </div>

                {/* Label */}
                <span className="mt-1.5 text-[9px] font-bold text-[#999]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {data.length > 0 && (
        <div className="mt-3 flex items-center gap-3 text-[10px] text-[#666]">
          <span className="font-bold text-[#1a1a1a]">
            Avg:{" "}
            {Math.round(
              data.reduce((s, d) => s + d.deliveries, 0) / data.length
            )}{" "}
            deliveries/week
          </span>
          <span className="font-bold text-[#0c831f]">
            {Math.round(
              data.reduce((s, d) => s + d.onTime, 0) /
                Math.max(data.reduce((s, d) => s + d.deliveries, 0), 1) *
                100
            )}
            % on-time
          </span>
        </div>
      )}
    </div>
  );
}
