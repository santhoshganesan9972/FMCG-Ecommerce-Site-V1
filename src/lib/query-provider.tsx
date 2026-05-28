"use client";

// ── React Query Provider ──────────────────────────────────
// Provides a pre-configured QueryClient to the entire app.
// Optimized defaults for production:
//   - staleTime: 30s (avoid redundant refetches on re-mount)
//   - gcTime: 5min
//   - retry: 1 (only retry once on failure)
//   - refetchOnWindowFocus: false (opt-in for performance)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,          // 30 seconds
        gcTime: 5 * 60 * 1000,          // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,    // opt-in via explicit calls
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always create a new client
    return makeQueryClient();
  }
  // Browser: reuse the same client across renders
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
