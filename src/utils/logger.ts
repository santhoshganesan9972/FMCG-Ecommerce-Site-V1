// ── Centralized Logger ───────────────────────────────────
// Provides structured logging with environment-aware output.
// In production, only warn+error are visible by default.
// Extend with remote logging adapters as needed.

type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/** Cached minimum log level — computed once on load. */
let cachedMinLevel: number | null = null;

function getMinLevel(): number {
  if (cachedMinLevel !== null) return cachedMinLevel;

  if (typeof window === "undefined") {
    cachedMinLevel = LOG_LEVELS.info;
    return cachedMinLevel;
  }

  try {
    const stored = localStorage.getItem("log_level");
    if (stored && stored in LOG_LEVELS) {
      cachedMinLevel = LOG_LEVELS[stored as LogLevel];
      return cachedMinLevel;
    }
  } catch {
    // localStorage unavailable
  }

  cachedMinLevel =
    process.env.NODE_ENV === "production" ? LOG_LEVELS.warn : LOG_LEVELS.info;
  return cachedMinLevel;
}

function formatMessage(level: LogLevel, message: string, meta?: unknown): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  return meta !== undefined ? `${prefix} ${message} ${JSON.stringify(meta)}` : `${prefix} ${message}`;
}

/** Call this in tests to reset the cached log level. */
export function __resetLogLevel(): void {
  cachedMinLevel = null;
}

export const logger = {
  debug(message: string, meta?: unknown) {
    if (getMinLevel() <= LOG_LEVELS.debug) {
      console.debug(formatMessage("debug", message, meta));
    }
  },

  info(message: string, meta?: unknown) {
    if (getMinLevel() <= LOG_LEVELS.info) {
      console.info(formatMessage("info", message, meta));
    }
  },

  warn(message: string, meta?: unknown) {
    if (getMinLevel() <= LOG_LEVELS.warn) {
      console.warn(formatMessage("warn", message, meta));
    }
  },

  error(message: string, meta?: unknown) {
    if (getMinLevel() <= LOG_LEVELS.error) {
      console.error(formatMessage("error", message, meta));
    }
    // Future: send to remote logging service (e.g., Sentry, Datadog)
  },

  /** Create a child logger scoped to a specific module. */
  scope(module: string) {
    return {
      debug: (message: string, meta?: unknown) =>
        this.debug(`[${module}] ${message}`, meta),
      info: (message: string, meta?: unknown) =>
        this.info(`[${module}] ${message}`, meta),
      warn: (message: string, meta?: unknown) =>
        this.warn(`[${module}] ${message}`, meta),
      error: (message: string, meta?: unknown) =>
        this.error(`[${module}] ${message}`, meta),
    };
  },
};
