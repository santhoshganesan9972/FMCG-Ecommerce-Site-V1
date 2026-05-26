// ── Performance Monitoring ───────────────────────────────
// Tracks Web Vitals (LCP, FCP, CLS, TTFB, INP), page load
// timing, and API response times. Reports to console in dev
// and can be wired to a remote analytics service in prod.
//
// Usage:
//   import { performanceTracker } from "@/monitoring/performanceTracker";
//   performanceTracker.init();               // start Web Vitals tracking
//   performanceTracker.trackApiCall("/api/orders", 245); // log API latency
//
// Web Vitals targets (Google recommended):
//   LCP:  ≤2.5s  |  FCP: ≤1.8s  |  CLS: ≤0.1  |  TTFB: ≤800ms  |  INP: ≤200ms

import { logger } from "@/utils/logger";
import { isProd } from "@/lib/env";

// ── Types ────────────────────────────────────────────────

export interface WebVitalMetric {
  name: "LCP" | "FCP" | "CLS" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: string;
}

export interface ApiTiming {
  endpoint: string;
  method: string;
  durationMs: number;
  timestamp: string;
}

export interface PerformanceReport {
  webVitals: WebVitalMetric[];
  apiTimings: ApiTiming[];
  pageLoadMs: number | null;
}

// ── Thresholds (Google Web Vitals) ───────────────────────

const THRESHOLDS: Record<string, { good: number; poor: number }> = {
  LCP:  { good: 2500, poor: 4000 },
  FCP:  { good: 1800, poor: 3000 },
  CLS:  { good: 0.1,  poor: 0.25 },
  TTFB: { good: 800,  poor: 1800 },
  INP:  { good: 200,  poor: 500 },
};

function rateMetric(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const t = THRESHOLDS[name];
  if (!t) return "needs-improvement";
  if (value <= t.good) return "good";
  if (value <= t.poor) return "needs-improvement";
  return "poor";
}

// ── State ────────────────────────────────────────────────

const collectedVitals: WebVitalMetric[] = [];
const apiTimings: ApiTiming[] = [];
let pageLoadMs: number | null = null;

// ── Remote Reporter Interface ────────────────────────────

export interface PerformanceReporter {
  sendWebVital(metric: WebVitalMetric): void | Promise<void>;
  sendApiTiming(timing: ApiTiming): void | Promise<void>;
  sendReport(report: PerformanceReport): void | Promise<void>;
}

let remoteReporter: PerformanceReporter | null = null;

// ── Public API ───────────────────────────────────────────

export const performanceTracker = {
  /** Register a remote reporter for production dashboards. */
  setReporter(reporter: PerformanceReporter): void {
    remoteReporter = reporter;
  },

  /** Initialize Web Vitals tracking. Call once on app mount. */
  init(): void {
    if (typeof window === "undefined") return;

    // Page load timing (Navigation Timing API)
    if (window.performance?.timing) {
      const { navigationStart, loadEventEnd } = window.performance.timing;
      if (navigationStart && loadEventEnd && loadEventEnd > navigationStart) {
        pageLoadMs = loadEventEnd - navigationStart;
      }
    }

    // LCP (Largest Contentful Paint)
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) {
            this.recordVital("LCP", last.startTime);
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch {
        // LCP not supported
      }

      // FCP (First Contentful Paint)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entry = list.getEntries()[0];
          if (entry) {
            this.recordVital("FCP", entry.startTime);
          }
        });
        fcpObserver.observe({ type: "paint", buffered: true });
      } catch {
        // FCP not supported
      }

      // CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
              clsValue += (entry as unknown as { value: number }).value;
            }
          }
          this.recordVital("CLS", clsValue);
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      } catch {
        // CLS not supported
      }

      // INP (Interaction to Next Paint) — experimental
      try {
        const inpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          // Take the worst (longest) interaction
          let worst = 0;
          for (const entry of entries) {
            const dur = (entry as unknown as { duration: number }).duration;
            if (dur > worst) worst = dur;
          }
          if (worst > 0) {
            this.recordVital("INP", worst);
          }
        });
        inpObserver.observe({ type: "first-input", buffered: true });
      } catch {
        // INP not supported
      }
    }

    // TTFB (Time to First Byte) — via Navigation Timing
    if (window.performance?.timing) {
      const { navigationStart, responseStart } = window.performance.timing;
      if (navigationStart && responseStart && responseStart > navigationStart) {
        this.recordVital("TTFB", responseStart - navigationStart);
      }
    }

    logger.info("[PerformanceTracker] Web Vitals tracking initialized");
  },

  /** Record a Web Vital metric. */
  recordVital(name: WebVitalMetric["name"], value: number): void {
    const metric: WebVitalMetric = {
      name,
      value: Math.round(value * 100) / 100,
      rating: rateMetric(name, value),
      timestamp: new Date().toISOString(),
    };

    // Store in-memory
    const existing = collectedVitals.findIndex((v) => v.name === name);
    if (existing >= 0) {
      collectedVitals[existing] = metric;
    } else {
      collectedVitals.push(metric);
    }

    // Report
    if (!isProd) {
      logger.info(`[Perf][${metric.rating.toUpperCase()}] ${name}: ${metric.value}`, {
        name,
        value: metric.value,
        rating: metric.rating,
      });
    }

    if (remoteReporter) {
      try {
        void remoteReporter.sendWebVital(metric);
      } catch {
        // ignore reporter errors
      }
    }
  },

  /** Track an API call duration. */
  trackApiCall(endpoint: string, durationMs: number, method: string = "GET"): void {
    const timing: ApiTiming = {
      endpoint,
      method,
      durationMs,
      timestamp: new Date().toISOString(),
    };

    apiTimings.push(timing);

    // Warn if slow
    if (durationMs > 1000 && !isProd) {
      logger.warn(`[Perf] Slow API: ${method} ${endpoint} (${durationMs}ms)`);
    }

    if (remoteReporter) {
      try {
        void remoteReporter.sendApiTiming(timing);
      } catch {
        // ignore reporter errors
      }
    }
  },

  /** Get the current performance report. */
  getReport(): PerformanceReport {
    return {
      webVitals: [...collectedVitals],
      apiTimings: [...apiTimings],
      pageLoadMs,
    };
  },

  /** Reset all collected data (useful for testing / page transitions). */
  reset(): void {
    collectedVitals.length = 0;
    apiTimings.length = 0;
    pageLoadMs = null;
  },
};
