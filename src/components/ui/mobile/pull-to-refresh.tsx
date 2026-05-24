"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  /** Minimum pull distance in px to trigger refresh */
  threshold?: number;
  /** Maximum pull distance in px */
  maxPull?: number;
  /** Pull resistance factor (higher = harder to pull) */
  resistance?: number;
  disabled?: boolean;
}

export default function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  maxPull = 150,
  resistance = 2.5,
  disabled = false,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || refreshing) return;
      // Only trigger when at the top of the scroll container
      const scrollTop = containerRef.current?.scrollTop ?? 0;
      if (scrollTop > 0) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    },
    [disabled, refreshing]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling.current || disabled || refreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      if (diff <= 0) {
        setPullDistance(0);
        return;
      }
      // Apply resistance
      const resisted = Math.min(diff / resistance, maxPull);
      setPullDistance(resisted);
    },
    [disabled, refreshing, maxPull, resistance]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!pulling.current || disabled || refreshing) return;
    pulling.current = false;

    if (pullDistance >= threshold) {
      setRefreshing(true);
      setPullDistance(threshold); // Hold at threshold visual
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setPullDistance(0);
        // Haptic feedback on refresh
        if (navigator.vibrate) navigator.vibrate(20);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, threshold, disabled, refreshing, onRefresh]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center transition-all duration-200 ease-out z-10 pointer-events-none"
        style={{
          top: pullDistance > 0 ? `${pullDistance - 60}px` : "-60px",
          opacity: pullDistance > 0 ? Math.min(pullDistance / threshold, 1) : 0,
        }}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-[#e8e8e8] transition-transform duration-300 ${
            pullDistance >= threshold ? "scale-110 bg-[#fff0f6] border-[#ff4f8b]" : ""
          }`}
        >
          {refreshing ? (
            <RefreshCw className="w-5 h-5 text-[#ff4f8b] animate-spin" />
          ) : (
            <RefreshCw
              className={`w-5 h-5 text-[#666] transition-transform duration-200 ${
                pullDistance >= threshold ? "text-[#ff4f8b] rotate-180" : ""
              }`}
              style={{ transform: `rotate(${pullDistance * 1.5}deg)` }}
            />
          )}
        </div>
        {pullDistance >= threshold && !refreshing && (
          <span className="ml-2 text-xs font-bold text-[#ff4f8b] animate-fade-in">
            Release to refresh
          </span>
        )}
      </div>

      {/* Content with pull offset */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : "translateY(0)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
