"use client";

import type { ReactNode } from "react";
import { TEXT_PRIMARY, TEXT_MUTED, TEXT_DISABLED } from "@/lib/shared-classes";

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

interface ReusableTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const timelineVariants: Record<string, string> = {
  success: "bg-[#0c831f]",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-[#ccc]",
};

/**
 * A vertical timeline component for displaying ordered events.
 *
 * @example
 * <ReusableTimeline events={[
 *   { id: "1", title: "Order placed", timestamp: "2 min ago", variant: "success" },
 *   { id: "2", title: "Processing", timestamp: "5 min ago" },
 * ]} />
 */
export function ReusableTimeline({ events, className = "" }: ReusableTimelineProps) {
  return (
    <div className={`space-y-0 ${className}`}>
      {events.map((event, i) => (
        <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
          {i < events.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-[#e8e8e8]" />
          )}
          <div className={`relative z-10 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
            event.icon ? timelineVariants[event.variant || "neutral"] : "border-2 border-[#e8e8e8] bg-white"
          }`}>
            {event.icon || (
              <div className={`h-2 w-2 rounded-full ${timelineVariants[event.variant || "neutral"]}`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-bold ${TEXT_PRIMARY}`}>{event.title}</p>
            {event.description && (
              <p className={`mt-0.5 text-xs ${TEXT_MUTED}`}>{event.description}</p>
            )}
            <p className={`mt-1 text-[10px] ${TEXT_DISABLED}`}>{event.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
