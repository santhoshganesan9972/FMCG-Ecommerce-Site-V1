// ── QueryClient Factory ──────────────────────────────────────
// Single source of truth for QueryClient configuration.
// Import and use `getQueryClient()` anywhere you need the client.
//
// Key design decisions:
//   - staleTime: 30s   → avoids redundant re-fetches on re-mount
//   - gcTime:   5min   → keeps recently viewed data in memory
//   - retry:    1      → retries GETs once; mutations never retry
//   - refetchOnWindowFocus: false → opt-in to avoid noise
//
// Future backend readiness:
//   Swap queryClient creation to pass an Axios-like http client,
//   or configure global onError handlers for toast notifications.

import {
  QueryClient,
  defaultShouldDehydrateQuery,
  type DefaultOptions,
} from "@tanstack/react-query";

function makeQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions });
}

// ── Shared defaults (used by both server & browser clients) ─

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 30 * 1000,            // 30 seconds
    gcTime: 5 * 60 * 1000,           // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,      // opt-in via explicit calls
    refetchOnReconnect: true,
    refetchOnMount: true,
  },
  mutations: {
    retry: 0,                         // never retry mutations
  },
  dehydrate: {
    shouldDehydrateQuery: (query) =>
      defaultShouldDehydrateQuery(query) ||
      query.state.status === "pending",
  },
};

// ── Singleton management (for browser reuse) ────────────────

let browserQueryClient: QueryClient | undefined;

/**
 * Returns a singleton QueryClient.
 * - On the server: a new client is created per request.
 * - In the browser: the same client is reused across renders.
 */
export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

// ── Convenience hook for components that need the client ────
// (e.g. mutation handlers need to call invalidateQueries)

export { useQueryClient } from "@tanstack/react-query";
