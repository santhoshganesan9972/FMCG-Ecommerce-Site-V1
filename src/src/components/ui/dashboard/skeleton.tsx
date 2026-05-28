"use client";

// ── Dashboard Loading Skeleton ────────────────────────────
// Mirrors the layout of the dashboard for a smooth loading experience.
//
// IMPORTANT: This component must never use Math.random() or any other
// non-deterministic value in JSX — it causes SSR/client hydration mismatches.
// All bar heights are static constants defined below.

import { useEffect, useState } from "react";
import { RefreshCw, AlertCircle, BarChart3 } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

// ── Static bar heights — never use Math.random() here ────
const CHART_1_HEIGHTS = [55, 80, 45, 90, 65, 75] as const;
const CHART_2_HEIGHTS = [40, 70, 55, 85, 50, 65, 80] as const;

function ShimmerBlock({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`rounded-xl bg-[#f0f0f0] animate-pulse ${className || ""}`}
      style={style}
    />
  );
}

function SkeletonContent() {
  return (
    <div className="space-y-4">
      {/* Skeleton header */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 sm:p-6">
        <ShimmerBlock className="h-3 w-24 mb-3" />
        <ShimmerBlock className="h-7 w-64 mb-2" />
        <ShimmerBlock className="h-4 w-96" />
      </div>

      {/* Skeleton KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <ShimmerBlock className="h-3 w-20 mb-3" />
            <ShimmerBlock className="h-7 w-24 mb-3" />
            <ShimmerBlock className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Skeleton charts */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
          <ShimmerBlock className="h-3 w-16 mb-1" />
          <ShimmerBlock className="h-4 w-28 mb-6" />
          <div className="flex items-end gap-2 h-48">
            {CHART_1_HEIGHTS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <ShimmerBlock className="h-3 w-10" />
                <ShimmerBlock className="w-full rounded-t-lg" style={{ height: `${h}%` }} />
                <ShimmerBlock className="h-3 w-8" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
          <ShimmerBlock className="h-3 w-16 mb-1" />
          <ShimmerBlock className="h-4 w-28 mb-6" />
          <div className="flex items-end gap-2 h-48">
            {CHART_2_HEIGHTS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <ShimmerBlock className="h-3 w-10" />
                <ShimmerBlock className="w-full rounded-t-lg" style={{ height: `${h}%` }} />
                <ShimmerBlock className="h-3 w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton 3-column */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
            <ShimmerBlock className="h-3 w-20 mb-1" />
            <ShimmerBlock className="h-4 w-28 mb-4" />
            <div className="flex justify-center mb-4">
              <ShimmerBlock className="rounded-full" style={{ width: 140, height: 140 }} />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex items-center gap-2">
                  <ShimmerBlock className="h-2.5 w-2.5 rounded-full" />
                  <ShimmerBlock className="h-3 flex-1" />
                  <ShimmerBlock className="h-3 w-8" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton 4-column panels */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-[#e8e8e8] bg-white">
            <div className="border-b border-[#e8e8e8] px-5 py-4">
              <ShimmerBlock className="h-4 w-24" />
            </div>
            <div className="divide-y divide-[#e8e8e8]">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-3 px-5 py-3">
                  <ShimmerBlock className="h-8 w-8 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <ShimmerBlock className="h-3 w-32" />
                    <ShimmerBlock className="h-2.5 w-24" />
                  </div>
                  <ShimmerBlock className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DashboardSkeleton ─────────────────────────────────────
// Rendered only after hydration to guarantee server and client
// produce identical HTML. The server emits a lightweight placeholder;
// the real skeleton mounts on the client after the first paint.

export function DashboardSkeleton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Server render + first client render: plain placeholder with no
    // dynamic values — guarantees a perfect SSR/hydration match.
    return (
      <div className="space-y-4" aria-hidden="true">
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 sm:p-6 h-28 animate-pulse bg-[#f9fafb]" />
        <div className="h-32 rounded-xl border border-[#e8e8e8] bg-[#f9fafb] animate-pulse" />
        <div className="h-64 rounded-2xl border border-[#e8e8e8] bg-[#f9fafb] animate-pulse" />
        <div className="h-48 rounded-2xl border border-[#e8e8e8] bg-[#f9fafb] animate-pulse" />
      </div>
    );
  }

  return <SkeletonContent />;
}

// ── Dashboard Error State ─────────────────────────────────

interface DashboardErrorProps {
  error: string;
  onRetry: () => void;
}

export function DashboardError({ error, onRetry }: DashboardErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2] mb-4">
        <AlertCircle className="h-8 w-8 text-[#dc2626]" />
      </div>
      <h3 className="text-lg font-black text-[#1a1a1a] mb-2">Failed to Load Dashboard</h3>
      <p className="text-sm text-[#666] mb-6 max-w-md text-center">{error}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
        <Link href="/admin">
          <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f6f7f6] transition-colors">
            Go to Admin
          </button>
        </Link>
      </div>
    </div>
  );
}
