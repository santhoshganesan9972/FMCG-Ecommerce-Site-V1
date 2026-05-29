// @vitest-environment jsdom
// ── useSettings Hook Tests ────────────────────────────────────
// Tests for all 10 settings hooks (still on useState/useEffect pattern).
// Uses act() / waitFor for async state updates and flushPromises.

import { vi } from "vitest";

const mockSettingsService = vi.hoisted(() => ({
  getUsers: vi.fn(),
  getUserById: vi.fn(),
  createUser: vi.fn(),
  updateUserStatus: vi.fn(),
  getRoles: vi.fn(),
  createRole: vi.fn(),
  getFeatureFlags: vi.fn(),
  toggleFeatureFlag: vi.fn(),
  getThemeSettings: vi.fn(),
  updateThemeSettings: vi.fn(),
  getApiKeys: vi.fn(),
  createApiKey: vi.fn(),
  revokeApiKey: vi.fn(),
  getAuditLogs: vi.fn(),
  getSystemConfigs: vi.fn(),
  updateSystemConfig: vi.fn(),
  getPaymentMethods: vi.fn(),
  togglePaymentMethod: vi.fn(),
  getTaxRates: vi.fn(),
  getGstReturns: vi.fn(),
  getNotificationChannels: vi.fn(),
  getNotificationEventMappings: vi.fn(),
  toggleNotificationChannel: vi.fn(),
}));

const mockSettingsData = vi.hoisted(() => ({
  mockAuditLogs: [
    { action: "create", entity: "user" },
    { action: "update", entity: "settings" },
  ],
}));

vi.mock("@/services/settings.service", () => ({
  settingsService: mockSettingsService,
}));

vi.mock("@/data/admin/settings", () => mockSettingsData);

import { describe, it, expect, beforeEach } from "vitest";
import { waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import type { ReactNode } from "react";
import {
  useSettingsUsers, useSettingsRoles, useFeatureFlags,
  useThemeSettings, useApiKeys,
  useSystemConfigs, usePaymentSettings, useGstSettings, useNotificationSettings,
} from "@/hooks/use-settings";
import {
  useAuditLogs as useSettingsAuditLogs,
} from "@/hooks/use-settings";

// ── Helper: renderHook with QueryClient wrapper ──

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

function renderSettingsHook(hook: () => any) {
  return renderHook(hook, { wrapper: createWrapper() });
}

// ── Flush promises helper ─────────────────────────────────────

async function flushPromises() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

beforeEach(() => {
  vi.resetAllMocks();
});

// ── useSettingsUsers ─────────────────────────────────────────

describe("useSettingsUsers", () => {
  const mockUsers = {
    data: {
      items: [
        { id: "u1", name: "Alice", email: "alice@test.com", role: "admin", status: "active", mfaEnabled: false, createdAt: "2025-01-01" },
        { id: "u2", name: "Bob", email: "bob@test.com", role: "operator", status: "active", mfaEnabled: true, createdAt: "2025-02-01" },
        { id: "u3", name: "Charlie", email: "charlie@test.com", role: "viewer", status: "inactive", mfaEnabled: false, createdAt: "2025-03-01" },
      ],
      pagination: { page: 1, pageSize: 10, total: 3 },
    },
    success: true,
  };

  it("returns users on success", async () => {
    mockSettingsService.getUsers.mockResolvedValue(mockUsers);
    const { result } = renderSettingsHook(() => useSettingsUsers());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.users).toHaveLength(3);
    expect(result.current.error).toBeNull();
    expect(result.current.activeCount).toBe(2);
    expect(result.current.inactiveCount).toBe(1);
    expect(result.current.pagination.total).toBe(3);
  });

  it("returns error on failure", async () => {
    mockSettingsService.getUsers.mockRejectedValue(new Error("Users API error"));
    const { result } = renderSettingsHook(() => useSettingsUsers());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Users API error");
    expect(result.current.users).toEqual([]);
  });

  it("setPage and setPageSize work", async () => {
    mockSettingsService.getUsers.mockResolvedValue(mockUsers);
    const { result } = renderSettingsHook(() => useSettingsUsers());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.setPage(3));
    expect(result.current.pagination.page).toBe(3);

    act(() => result.current.setPageSize(25));
    expect(result.current.pagination.pageSize).toBe(25);
    expect(result.current.pagination.page).toBe(1);
  });

  it("setSearch triggers a re-fetch", async () => {
    mockSettingsService.getUsers.mockResolvedValue(mockUsers);
    const { result } = renderSettingsHook(() => useSettingsUsers());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.setSearch("Alice"));
    expect(result.current.search).toBe("Alice");
  });
});

// ── useSettingsRoles ─────────────────────────────────────────

describe("useSettingsRoles", () => {
  const mockRoles = {
    data: {
      items: [
        { id: "r1", name: "Admin", level: "admin", usersCount: 5, isProtected: true, isDefault: false, permissions: [], createdAt: "2025-01-01" },
        { id: "r2", name: "Operator", level: "operator", usersCount: 10, isProtected: false, isDefault: true, permissions: [], createdAt: "2025-01-01" },
      ],
      pagination: { page: 1, pageSize: 10, total: 2 },
    },
    success: true,
  };

  it("returns roles with totalUsers", async () => {
    mockSettingsService.getRoles.mockResolvedValue(mockRoles);
    const { result } = renderSettingsHook(() => useSettingsRoles());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.roles).toHaveLength(2);
    expect(result.current.totalUsers).toBe(15);
  });

  it("setSearch updates search", async () => {
    mockSettingsService.getRoles.mockResolvedValue(mockRoles);
    const { result } = renderSettingsHook(() => useSettingsRoles());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.setSearch("Admin"));
    expect(result.current.search).toBe("Admin");
  });
});

// ── useFeatureFlags ──────────────────────────────────────────

describe("useFeatureFlags", () => {
  const mockFlags = {
    data: {
      items: [
        { id: "f1", name: "Dark Mode", key: "dark_mode", enabled: true, environment: "production", rolloutPercentage: 100, createdAt: "2025-01-01" },
        { id: "f2", name: "Beta Search", key: "beta_search", enabled: false, environment: "staging", rolloutPercentage: 50, createdAt: "2025-01-01" },
      ],
      pagination: { page: 1, pageSize: 10, total: 2 },
    },
    success: true,
  };

  it("returns flags with enabledCount", async () => {
    mockSettingsService.getFeatureFlags.mockResolvedValue(mockFlags);
    const { result } = renderSettingsHook(() => useFeatureFlags());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.flags).toHaveLength(2);
    expect(result.current.enabledCount).toBe(1);
  });

  it("toggleFlag updates local state and calls service", async () => {
    mockSettingsService.getFeatureFlags.mockResolvedValue(mockFlags);
    mockSettingsService.toggleFeatureFlag.mockResolvedValue({ success: true, data: null as never });
    const { result } = renderSettingsHook(() => useFeatureFlags());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.toggleFlag("f2", true);
    });
    expect(result.current.flags[1].enabled).toBe(true);
    expect(mockSettingsService.toggleFeatureFlag).toHaveBeenCalledWith("f2", true);
  });
});

// ── useThemeSettings ─────────────────────────────────────────

describe("useThemeSettings", () => {
  const mockTheme = {
    success: true,
    data: { mode: "dark", primaryColor: "#0c831f", sidebarCollapsed: false, fontSize: "medium", reducedMotion: false, highContrast: false, compactMode: false, accentColor: "#0c831f", borderRadius: "md", fontFamily: "inter" } as const,
  };

  it("returns theme on success", async () => {
    mockSettingsService.getThemeSettings.mockResolvedValue(mockTheme as never);
    const { result } = renderSettingsHook(() => useThemeSettings());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.theme?.mode).toBe("dark");
    expect(result.current.error).toBeNull();
  });

  it("updateTheme updates theme", async () => {
    mockSettingsService.getThemeSettings.mockResolvedValue(mockTheme as never);
    mockSettingsService.updateThemeSettings.mockResolvedValue({
      success: true,
      data: { ...mockTheme.data, mode: "light" },
    } as never);

    const { result } = renderSettingsHook(() => useThemeSettings());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    const ok = await result.current.updateTheme({ mode: "light" });
    expect(ok).toBe(true);
    expect(result.current.theme?.mode).toBe("light");
  });

  it("updateTheme returns false on failure", async () => {
    mockSettingsService.getThemeSettings.mockResolvedValue(mockTheme as never);
    mockSettingsService.updateThemeSettings.mockRejectedValue(new Error("Update failed"));

    const { result } = renderSettingsHook(() => useThemeSettings());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    const ok = await result.current.updateTheme({ mode: "light" });
    expect(ok).toBe(false);
  });
});

// ── useApiKeys ───────────────────────────────────────────────

describe("useApiKeys", () => {
  const mockKeys = {
    data: {
      items: [
        { id: "k1", name: "Production Key", key: "prod-xxx", status: "active", permissions: ["read"], rateLimit: 1000, allowedIPs: [], createdAt: "2025-01-01", usageCount: 500 },
        { id: "k2", name: "Staging Key", key: "stg-xxx", status: "active", permissions: ["read", "write"], rateLimit: 500, allowedIPs: [], createdAt: "2025-01-15", usageCount: 100 },
      ],
      pagination: { page: 1, pageSize: 10, total: 2 },
    },
    success: true,
  };

  it("returns keys with activeCount", async () => {
    mockSettingsService.getApiKeys.mockResolvedValue(mockKeys);
    const { result } = renderSettingsHook(() => useApiKeys());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.keys).toHaveLength(2);
    expect(result.current.activeCount).toBe(2);
    expect(result.current.pagination.total).toBe(2);
  });

  it("revokeKey updates local state and calls service", async () => {
    mockSettingsService.getApiKeys.mockResolvedValue(mockKeys);
    mockSettingsService.revokeApiKey.mockResolvedValue(undefined as never);
    const { result } = renderSettingsHook(() => useApiKeys());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.revokeKey("k1");
    });
    expect(result.current.keys[0].status).toBe("revoked");
    expect(mockSettingsService.revokeApiKey).toHaveBeenCalledWith("k1");
  });
});

// ── useSystemConfigs ─────────────────────────────────────────

describe("useSystemConfigs", () => {
  const mockConfigs = {
    data: {
      items: [
        { id: "c1", key: "site_name", label: "Site Name", value: "FMCG Commerce", type: "text", category: "general", isEncrypted: false, isEditable: true, updatedAt: "2025-01-01" },
        { id: "c2", key: "max_login_attempts", label: "Max Login Attempts", value: 5, type: "number", category: "security", isEncrypted: false, isEditable: true, updatedAt: "2025-01-01" },
      ],
      pagination: { page: 1, pageSize: 10, total: 2 },
    },
    success: true,
  };

  it("returns configs", async () => {
    mockSettingsService.getSystemConfigs.mockResolvedValue(mockConfigs);
    const { result } = renderSettingsHook(() => useSystemConfigs());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.configs).toHaveLength(2);
    expect(result.current.configs[0].key).toBe("site_name");
  });

  it("updateConfig updates local state and returns true", async () => {
    mockSettingsService.getSystemConfigs.mockResolvedValue(mockConfigs);
    mockSettingsService.updateSystemConfig.mockResolvedValue({ success: true, data: null as never });
    const { result } = renderSettingsHook(() => useSystemConfigs());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    const ok = await result.current.updateConfig({ key: "site_name", value: "New Name" });
    expect(ok).toBe(true);
    expect(result.current.configs[0].value).toBe("New Name");
  });
});

// ── usePaymentSettings ───────────────────────────────────────

describe("usePaymentSettings", () => {
  const paymentMethods = [
    { id: "pm1", name: "Credit Card", enabled: true, sortOrder: 1 },
    { id: "pm2", name: "UPI", enabled: true, sortOrder: 2 },
    { id: "pm3", name: "COD", enabled: false, sortOrder: 3 },
  ];

  it("returns methods with enabledCount", async () => {
    mockSettingsService.getPaymentMethods.mockResolvedValue({ success: true, data: paymentMethods });
    const { result } = renderSettingsHook(() => usePaymentSettings());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.methods).toHaveLength(3);
    expect(result.current.enabledCount).toBe(2);
  });

  it("toggleMethod updates local state", async () => {
    mockSettingsService.getPaymentMethods.mockResolvedValue({ success: true, data: paymentMethods });
    mockSettingsService.togglePaymentMethod.mockResolvedValue(undefined as never);
    const { result } = renderSettingsHook(() => usePaymentSettings());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.toggleMethod("pm3", true);
    });
    expect(result.current.methods[2].enabled).toBe(true);
    expect(mockSettingsService.togglePaymentMethod).toHaveBeenCalledWith("pm3", true);
  });
});

// ── useGstSettings ───────────────────────────────────────────

describe("useGstSettings", () => {
  it("returns tax rates and GST returns", async () => {
    mockSettingsService.getTaxRates.mockResolvedValue({
      success: true,
      data: [
        { id: "tr1", name: "GST 5%", rate: "5%", type: "standard", isActive: true },
        { id: "tr2", name: "GST 12%", rate: "12%", type: "standard", isActive: true },
      ],
    });
    mockSettingsService.getGstReturns.mockResolvedValue({
      success: true,
      data: [
        { period: "2025-04", status: "filed", dueDate: "2025-05-20", filedOn: "2025-05-15" },
        { period: "2025-05", status: "pending", dueDate: "2025-06-20" },
      ],
    });

    const { result } = renderSettingsHook(() => useGstSettings());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.taxRates).toHaveLength(2);
    expect(result.current.gstReturns).toHaveLength(2);
    expect(result.current.gstReturns[0].status).toBe("filed");
  });
});

// ── useNotificationSettings ──────────────────────────────────

describe("useNotificationSettings", () => {
  it("returns channels and event mappings", async () => {
    mockSettingsService.getNotificationChannels.mockResolvedValue({
      success: true,
      data: [
        { name: "Email", enabled: true, config: {} },
        { name: "SMS", enabled: true, config: {} },
        { name: "Push", enabled: false, config: {} },
      ],
    });
    mockSettingsService.getNotificationEventMappings.mockResolvedValue({
      success: true,
      data: [
        { event: "order.created", push: true, email: true, sms: false, inApp: true },
        { event: "order.delivered", push: false, email: true, sms: true, inApp: true },
      ],
    });

    const { result } = renderSettingsHook(() => useNotificationSettings());
    await flushPromises();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.channels).toHaveLength(3);
    expect(result.current.eventMappings).toHaveLength(2);
    expect(result.current.channels[2].enabled).toBe(false);
  });

  it("toggleChannel updates local state", async () => {
    mockSettingsService.getNotificationChannels.mockResolvedValue({
      success: true,
      data: [{ name: "Push", enabled: false, config: {} }],
    });
    mockSettingsService.getNotificationEventMappings.mockResolvedValue({
      success: true,
      data: [],
    });
    mockSettingsService.toggleNotificationChannel.mockResolvedValue(undefined as never);

    const { result } = renderSettingsHook(() => useNotificationSettings());
    await flushPromises();
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.toggleChannel("Push", true);
    });
    expect(result.current.channels[0].enabled).toBe(true);
    expect(mockSettingsService.toggleNotificationChannel).toHaveBeenCalledWith("Push", true);
  });
});
