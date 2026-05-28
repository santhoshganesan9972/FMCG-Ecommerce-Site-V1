"use client";

import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import type { SLAMetric } from "@/types/delivery";

interface SLACardProps {
  metric: SLAMetric;
  className?: string;
}

const statusIcons: Record<string, LucideIcon> = {
  on_track: CheckCircle2,
  at_risk: AlertTriangle,
  breached: XCircle,
};

const statusColors: Record<string, string> = {
  on_track: "text-[#0c831f]",
  at_risk: "text-[#d97706]",
  breached: "text-[#dc2626]",
};

const statusBg: Record<string, string> = {
  on_track: "bg-[#e8f5e9]",
  at_risk: "bg-[#fffbeb]",
  breached: "bg-[#fef2f2]",
};

const trendIcons: Record<string, LucideIcon> = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors: Record<string, string> = {
  up: "text-[#0c831f]",
  down: "text-[#dc2626]",
  stable: "text-[#666]",
};

export function SLACard({ metric, className = "" }: SLACardProps) {
  const Icon = statusIcons[metric.status] || CheckCircle2;
  const TrendIcon = trendIcons[metric.trend] || Minus;

  return (
    <div
      className={`rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${statusBg[metric.status] || "bg-[#f6f7f6]"}`}>
            <Icon className={`h-4 w-4 ${statusColors[metric.status] || "text-[#666]"}`} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#1a1a1a]">{metric.metric}</p>
            <p className="text-[10px] text-[#666]">
              {metric.zone}{metric.owner ? ` · ${metric.owner}` : ""}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${trendColors[metric.trend]} ${metric.trend === "up" ? "bg-[#e8f5e9]" : metric.trend === "down" ? "bg-[#fef2f2]" : "bg-[#f6f7f6]"} text-[10px] font-bold`}>
          <TrendIcon className="h-3 w-3" />
          {metric.trend === "up" ? "Improving" : metric.trend === "down" ? "Declining" : "Stable"}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-[#f9fafb] p-3">
        <div>
          <p className="text-[10px] text-[#999]">Target</p>
          <p className="text-xs font-bold text-[#1a1a1a]">{metric.target}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#999]">Actual</p>
          <p className={`text-xs font-bold ${statusColors[metric.status] || "text-[#666]"}`}>
            {metric.actual}
          </p>
        </div>
      </div>

      {/* Mini progress bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-[#999] mb-1">
          <span>Compliance</span>
          <span>{metric.actual}</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#f0f0f0] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              metric.status === "on_track"
                ? "bg-[#0c831f]"
                : metric.status === "at_risk"
                ? "bg-[#d97706]"
                : "bg-[#dc2626]"
            }`}
            style={{
              width: `${Math.min(
                100,
                parseFloat(metric.actual) || 0
              )}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-2 text-[10px] text-[#999]">
        Last updated: {new Date(metric.lastUpdated).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
