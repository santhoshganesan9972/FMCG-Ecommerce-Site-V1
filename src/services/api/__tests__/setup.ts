// ── Test Setup for Admin API Adapters ────────────────────────
// Provides a shared mocked apiClient instance that all adapter
// tests can import. Each test overrides the mock return values
// as needed via mockResolvedValue / mockRejectedValue.

import { vi } from "vitest";

// ── Mock Axios-style response shape ─────────────────────────
// apiClient.get/post/put/delete return { data: ApiResponse<T> }

export function mockSuccessResponse<T>(data: T) {
  return { data };
}

// ── Mock module: @/lib/api/api-client ──────────────────────
// We create mock functions for each HTTP method so tests can
// call e.g. mockGet.mockResolvedValue({ data: ... })

export const mockGet = vi.fn();
export const mockPost = vi.fn();
export const mockPut = vi.fn();
export const mockDelete = vi.fn();

vi.mock("@/lib/api/api-client", () => ({
  apiClient: {
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
  },
  createCancellableSignal: () => new AbortController().signal,
  default: {
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
  },
}));

// ── Reset all mocks between tests ───────────────────────────
// Call this in beforeEach in every test file.

export function resetMocks(): void {
  mockGet.mockReset();
  mockPost.mockReset();
  mockPut.mockReset();
  mockDelete.mockReset();
}
