"use client";

// ── React Query Provider ──────────────────────────────────
// Delegates client creation to the centralized factory in
// @/lib/react-query/query-client so all settings are shared.

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { getQueryClient } from "@/lib/react-query/query-client";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
