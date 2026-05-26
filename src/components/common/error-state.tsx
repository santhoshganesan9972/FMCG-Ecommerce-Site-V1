"use client";

import { TriangleAlert, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  /** Primary error message */
  title?: string;
  /** Detailed description */
  description?: string;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Compact mode for inline use (e.g., table rows) */
  compact?: boolean;
}

/**
 * Inline error state component for consistent error display.
 * Use in admin pages, data sections, and API-fetching components.
 *
 * @example
 * ```tsx
 * {error && <ErrorState title="Failed to load orders" onRetry={() => refetch()} />}
 * ```
 */
export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  compact = false,
}: ErrorStateProps) {
  if (compact) {
    return (
      <div
        className="flex items-center gap-3 rounded-lg border border-[#ffcdd2] bg-[#ffebee] px-4 py-3"
        role="alert"
        aria-live="assertive"
      >
        <TriangleAlert className="h-4 w-4 shrink-0 text-[#c62828]" />
        <p className="text-xs font-medium text-[#c62828]">{title}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto flex items-center gap-1 rounded bg-[#c62828] px-2.5 py-1 text-[10px] font-bold text-white transition hover:bg-[#b71c1c]"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[200px] w-full items-center justify-center p-6"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-sm rounded-2xl border border-[#ffcdd2] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffebee]">
          <TriangleAlert className="h-7 w-7 text-[#c62828]" />
        </div>

        <h3 className="mt-4 text-base font-black text-[#1a1a1a]">{title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-[#666]">{description}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#c62828] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#b71c1c]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
