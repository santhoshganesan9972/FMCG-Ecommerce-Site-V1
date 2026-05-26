// ── Error Tracking ────────────────────────────────────────
// Classifies errors by category, provides a remote-logging
// adapter, and integrates with the existing logger utility.
//
// Usage:
//   import { errorTracker, ErrorCategory } from "@/monitoring/errorTracker";
//   errorTracker.capture(error, ErrorCategory.NETWORK, { endpoint: "/api/v1/orders" });

import { logger } from "@/utils/logger";

// ── Error Categories ─────────────────────────────────────

export const ErrorCategory = {
  NETWORK: "network" as const,
  AUTH: "auth" as const,
  VALIDATION: "validation" as const,
  RUNTIME: "runtime" as const,
  API: "api" as const,
  SECURITY: "security" as const,
  UNKNOWN: "unknown" as const,
} as const;

export type ErrorCategory = (typeof ErrorCategory)[keyof typeof ErrorCategory];

// ── Severity Levels ──────────────────────────────────────

export const ErrorSeverity = {
  LOW: "low" as const,
  MEDIUM: "medium" as const,
  HIGH: "high" as const,
  CRITICAL: "critical" as const,
} as const;

export type ErrorSeverity = (typeof ErrorSeverity)[keyof typeof ErrorSeverity];

// ── Error Event Shape ────────────────────────────────────

export interface ErrorEvent {
  /** Unique identifier for this occurrence. */
  id: string;
  /** ISO-8601 timestamp when the error occurred. */
  timestamp: string;
  /** Human-readable category. */
  category: ErrorCategory;
  /** Severity level. */
  severity: ErrorSeverity;
  /** Error message. */
  message: string;
  /** Stack trace (if available). */
  stack?: string;
  /** URL / component / module where the error happened. */
  source?: string;
  /** Arbitrary metadata (e.g., HTTP status, request payload). */
  metadata?: Record<string, unknown>;
  /** Whether this error has been acknowledged. */
  acknowledged: boolean;
}

// ── Remote Adapter Interface ─────────────────────────────

export interface RemoteLoggingAdapter {
  /** Send an error event to the remote service. */
  send(event: ErrorEvent): void | Promise<void>;
}

// ── Adapter: Console (default) ───────────────────────────

const consoleAdapter: RemoteLoggingAdapter = {
  send(event) {
    const { severity, category, message, source, metadata } = event;
    const formatted = `[${severity.toUpperCase()}][${category}] ${source ? `@${source} — ` : ""}${message}`;

    switch (severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        logger.error(formatted, metadata);
        break;
      case ErrorSeverity.MEDIUM:
        logger.warn(formatted, metadata);
        break;
      default:
        logger.info(formatted, metadata);
    }
  },
};

let remoteAdapter: RemoteLoggingAdapter | null = null;

// ── Error Severity Map ───────────────────────────────────

function classifySeverity(category: ErrorCategory, error?: Error): ErrorSeverity {
  if (!error) return ErrorSeverity.MEDIUM;

  const msg = error.message ?? "";

  // Authentication / authorization failures
  if (category === ErrorCategory.AUTH) return ErrorSeverity.HIGH;
  if (category === ErrorCategory.SECURITY) return ErrorSeverity.CRITICAL;

  // Network errors are medium unless they're from critical endpoints
  if (category === ErrorCategory.NETWORK) return ErrorSeverity.MEDIUM;

  // API 5xx errors are high
  if (category === ErrorCategory.API) {
    if (msg.includes("50") || msg.includes("500") || msg.includes("503")) {
      return ErrorSeverity.HIGH;
    }
    return ErrorSeverity.MEDIUM;
  }

  // Validation errors are low
  if (category === ErrorCategory.VALIDATION) return ErrorSeverity.LOW;

  // Runtime errors — check for common critical patterns
  if (
    msg.includes("out of memory") ||
    msg.includes("cannot read properties of undefined") ||
    msg.includes("maximum call stack")
  ) {
    return ErrorSeverity.HIGH;
  }

  return ErrorSeverity.MEDIUM;
}

// ── Public API ───────────────────────────────────────────

export const errorTracker = {
  /** Configure a remote logging adapter (Sentry, Datadog, etc.). */
  setAdapter(adapter: RemoteLoggingAdapter): void {
    remoteAdapter = adapter;
  },

  /** Capture and report an error. */
  capture(
    error: Error | string,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    metadata?: Record<string, unknown>,
  ): ErrorEvent {
    const message = typeof error === "string" ? error : error.message;
    const event: ErrorEvent = {
      id: `err_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      category,
      severity: classifySeverity(category, typeof error === "string" ? undefined : error),
      message,
      stack: typeof error === "string" ? undefined : error.stack,
      source: metadata?.source as string | undefined,
      metadata,
      acknowledged: false,
    };

    // Always log locally
    consoleAdapter.send(event);

    // Send to remote adapter if configured
    if (remoteAdapter) {
      try {
        void remoteAdapter.send(event);
      } catch (adapterError) {
        logger.error("[ErrorTracker] Remote adapter failed", {
          error: adapterError instanceof Error ? adapterError.message : String(adapterError),
          originalEvent: event.id,
        });
      }
    }

    return event;
  },

  /** Capture an error from a caught exception in a React component. */
  fromReactError(
    error: Error,
    componentStack?: string,
    metadata?: Record<string, unknown>,
  ): ErrorEvent {
    return this.capture(error, ErrorCategory.RUNTIME, {
      ...metadata,
      source: metadata?.source ?? componentStack?.split("\n")[1]?.trim() ?? "unknown",
      componentStack,
    });
  },

  /** Capture an API failure with HTTP status and endpoint info. */
  fromApiError(
    error: Error,
    endpoint: string,
    status?: number,
    responseBody?: unknown,
  ): ErrorEvent {
    return this.capture(error, ErrorCategory.API, {
      endpoint,
      status,
      responseBody,
      source: endpoint,
    });
  },

  /** Mark a previously captured error as acknowledged. */
  acknowledge(eventId: string): void {
    logger.info(`[ErrorTracker] Error ${eventId} acknowledged`);
  },
};
