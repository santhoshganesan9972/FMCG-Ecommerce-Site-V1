"use client";

import React from "react";
import { Flag, Power, CheckCircle, XCircle } from "lucide-react";
import type { FeatureFlag } from "@/types/settings";

interface FeatureToggleProps {
  flags: FeatureFlag[];
  loading?: boolean;
  onToggle?: (flagId: string, enabled: boolean) => void;
  onViewHistory?: (flag: FeatureFlag) => void;
  className?: string;
}

const envColors: Record<string, string> = {
  production: "bg-[#fef2f2] text-red-600",
  staging: "bg-[#fffbeb] text-amber-600",
  development: "bg-[#f6f7f6] text-[#666]",
};

export function FeatureToggle({
  flags,
  loading = false,
  onToggle,
  onViewHistory,
  className = "",
}: FeatureToggleProps) {
  if (loading) {
    return (
      <div className={`rounded-2xl border border-[#e8e8e8] bg-white ${className}`}>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#f0f0f0]" />
                <div>
                  <div className="h-4 w-40 rounded bg-[#f0f0f0]" />
                  <div className="mt-1 h-3 w-60 rounded bg-[#f0f0f0]" />
                </div>
              </div>
              <div className="h-6 w-12 rounded-full bg-[#f0f0f0]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {flags.map((flag) => (
        <div
          key={flag.id}
          className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
            flag.enabled
              ? "border-[#0c831f]/20 bg-white hover:shadow-sm"
              : "border-[#e8e8e8] bg-white hover:shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                flag.enabled ? "bg-[#e8f5e9]" : "bg-[#f6f7f6]"
              }`}
            >
              <Flag
                className={`h-4 w-4 ${flag.enabled ? "text-[#0c831f]" : "text-[#999]"}`}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#1a1a1a]">{flag.name}</span>
                <code className="rounded bg-[#f6f7f6] px-1.5 py-0.5 text-[10px] font-mono text-[#666]">
                  {flag.key}
                </code>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    envColors[flag.environment] || "bg-[#f6f7f6] text-[#666]"
                  }`}
                >
                  {flag.environment}
                </span>
                {flag.rolloutPercentage < 100 && (
                  <span className="text-[10px] font-bold text-[#666]">
                    {flag.rolloutPercentage}% rollout
                  </span>
                )}
              </div>
              {flag.description && (
                <p className="mt-0.5 text-xs text-[#999] truncate max-w-md">
                  {flag.description}
                </p>
              )}
              <div className="mt-1 flex items-center gap-3 text-[10px] text-[#999]">
                <span>Owner: <span className="font-semibold text-[#666]">{flag.owner || "—"}</span></span>
                {flag.lastToggledBy && (
                  <span>
                    Last toggled by <span className="font-semibold text-[#666]">{flag.lastToggledBy}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onToggle?.(flag.id, !flag.enabled)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                flag.enabled
                  ? "bg-[#fef2f2] text-red-500 hover:bg-[#fee2e2]"
                  : "bg-[#e8f5e9] text-[#0c831f] hover:bg-[#d0edd4]"
              }`}
            >
              <Power className="h-3 w-3" />
              {flag.enabled ? "Disable" : "Enable"}
            </button>
            {onViewHistory && (
              <button
                onClick={() => onViewHistory(flag)}
                className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8] transition-colors"
                title="View toggle history"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}

      {flags.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f7f6]">
            <Flag className="h-6 w-6 text-[#ccc]" />
          </div>
          <p className="text-sm font-bold text-[#1a1a1a]">No feature flags found</p>
          <p className="mt-1 text-xs text-[#999]">Create a new flag to get started</p>
        </div>
      )}
    </div>
  );
}
