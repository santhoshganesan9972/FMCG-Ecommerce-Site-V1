// ── User Behavior Analytics Tracker ────────────────────
// Tracks key user interactions for growth analysis and
// conversion funnel optimization. Reports to console in
// dev and can be wired to GA4 / PostHog / custom API.
//
// Usage:
//   import { analyticsTracker } from "@/monitoring/analyticsTracker";
//   analyticsTracker.track("product_view", { productId: "42", price: 299 });
//   analyticsTracker.track("checkout_started", { cartValue: 1299 });

import { logger } from "@/utils/logger";
import { isProd } from "@/lib/env";

// ── Event Names (enforced with TypeScript union) ──────

export const AnalyticsEvent = {
  HOMEPAGE_VISIT: "homepage_visit",
  PRODUCT_VIEW: "product_view",
  PRODUCT_CLICK: "product_click",
  SEARCH_QUERIED: "search_queried",
  SEARCH_RESULT_CLICK: "search_result_click",
  CATEGORY_VIEW: "category_view",
  CART_ADD: "cart_add",
  CART_REMOVE: "cart_remove",
  CART_UPDATE_QUANTITY: "cart_update_quantity",
  CART_VIEW: "cart_view",
  CHECKOUT_STARTED: "checkout_started",
  CHECKOUT_STEP_VIEW: "checkout_step_view",
  CHECKOUT_COMPLETED: "checkout_completed",
  WISHLIST_ADD: "wishlist_add",
  WISHLIST_REMOVE: "wishlist_remove",
  ORDER_PLACED: "order_placed",
  ORDER_CANCELLED: "order_cancelled",
  LOGIN: "login",
  SIGNUP: "signup",
  LOGOUT: "logout",
  OFFER_VIEW: "offer_view",
  OFFER_CLICK: "offer_click",
  NAVIGATION_CLICK: "navigation_click",
  ERROR_PAGE_VIEW: "error_page_view",
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

// ── Event Shape ────────────────────────────────────────

export interface AnalyticsEventPayload {
  /** Unique event ID (deduplication / ordering). */
  eventId: string;
  /** Event name. */
  event: AnalyticsEventName;
  /** ISO-8601 timestamp. */
  timestamp: string;
  /** Page path where the event occurred. */
  pagePath: string;
  /** Arbitrary properties (product ID, cart value, etc.). */
  properties: Record<string, unknown>;
  /** User identifier (anonymous or logged-in). */
  userId?: string;
  /** Session identifier. */
  sessionId?: string;
}

// ── Remote Reporter Interface ─────────────────────────

export interface AnalyticsReporter {
  sendEvent(payload: AnalyticsEventPayload): void | Promise<void>;
}

let remoteReporter: AnalyticsReporter | null = null;
let sessionId: string | null = null;
let userId: string | null = null;

// ── Helpers ───────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function getPagePath(): string {
  if (typeof window === "undefined") return "server";
  return window.location.pathname + window.location.search;
}

// ── Public API ─────────────────────────────────────────

export const analyticsTracker = {
  /** Configure a remote analytics reporter (GA4, PostHog, custom API). */
  setReporter(reporter: AnalyticsReporter): void {
    remoteReporter = reporter;
  },

  /** Set the current user identifier (call on login / session restore). */
  setUserId(id: string): void {
    userId = id;
  },

  /** Clear the user identifier (call on logout). */
  clearUserId(): void {
    userId = null;
  },

  /** Get or create a session identifier. */
  getSessionId(): string {
    if (!sessionId) {
      sessionId = generateId();
    }
    return sessionId;
  },

  /** Track an analytics event. */
  track(
    event: AnalyticsEventName,
    properties: Record<string, unknown> = {},
  ): void {
    const payload: AnalyticsEventPayload = {
      eventId: generateId(),
      event,
      timestamp: new Date().toISOString(),
      pagePath: getPagePath(),
      properties,
      userId: userId ?? undefined,
      sessionId: this.getSessionId(),
    };

    // Console logging in dev for debugging
    if (!isProd) {
      logger.info(`[Analytics] ${event}`, {
        ...payload,
        // Omit verbose fields for dev readability
        eventId: undefined,
        timestamp: undefined,
      });
    }

    // Send to remote reporter if configured
    if (remoteReporter) {
      try {
        void remoteReporter.sendEvent(payload);
      } catch {
        logger.warn("[Analytics] Remote reporter failed to send event", {
          event,
        });
      }
    }
  },

  // ── Convenience Methods ─────────────────────────────

  /** Track a product view (detail page). */
  trackProductView(productId: string, productName: string, price: number, category?: string): void {
    this.track(AnalyticsEvent.PRODUCT_VIEW, { productId, productName, price, category });
  },

  /** Track a product click (from listing / search results). */
  trackProductClick(productId: string, position?: number, source?: string): void {
    this.track(AnalyticsEvent.PRODUCT_CLICK, { productId, position, source });
  },

  /** Track a search query. */
  trackSearch(query: string, resultCount: number): void {
    this.track(AnalyticsEvent.SEARCH_QUERIED, { query, resultCount });
  },

  /** Track add-to-cart. */
  trackCartAdd(productId: string, quantity: number, price: number): void {
    this.track(AnalyticsEvent.CART_ADD, { productId, quantity, price });
  },

  /** Track checkout initiation. */
  trackCheckoutStarted(cartValue: number, itemCount: number): void {
    this.track(AnalyticsEvent.CHECKOUT_STARTED, { cartValue, itemCount });
  },

  /** Track successful order placement. */
  trackOrderPlaced(orderId: string, total: number, itemCount: number): void {
    this.track(AnalyticsEvent.ORDER_PLACED, { orderId, total, itemCount });
  },

  /** Track wishlist additions. */
  trackWishlistAdd(productId: string, productName: string): void {
    this.track(AnalyticsEvent.WISHLIST_ADD, { productId, productName });
  },

  /** Track homepage visit with referrer info. */
  trackHomepageVisit(): void {
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    this.track(AnalyticsEvent.HOMEPAGE_VISIT, {
      referrer,
      isFirstVisit: !sessionId,
    });
  },
};
