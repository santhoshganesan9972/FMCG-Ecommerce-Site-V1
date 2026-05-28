// ── Test Utilities for Admin Hooks ────────────────────────────
// Shared testing utilities — but NOT vi.mock() calls.
// Due to vitest's hoisting behavior, vi.mock() must be in
// each test file. This file provides helper functions only.
//
// Usage in test files:
//   import { vi } from "vitest";
//   const mockService = vi.hoisted(() => ({ fn: vi.fn() }));
//   vi.mock("@/services/foo.service", () => ({ fooService: mockService }));
//   import { renderWithQuery } from "./setup";
//   beforeEach(() => { vi.resetAllMocks(); });

import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import type { ReactNode } from "react";

// ── Query Client Wrapper ──────────────────────────────────

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function renderWithQuery<THookResult>(
  hook: () => THookResult,
  queryClient?: QueryClient,
) {
  const client = queryClient ?? createTestQueryClient();
  return renderHook(hook, {
    wrapper: ({ children }: { children: ReactNode }) =>
      React.createElement(QueryClientProvider, { client }, children),
  });
}
