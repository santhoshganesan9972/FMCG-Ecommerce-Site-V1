// ── Settings API Adapter Tests ──────────────────────────────
// Tests users, roles, feature flags, theme, API keys,
// audit logs, system configs, payment methods, tax rates,
// GST returns, and notification configuration.

import { describe, it, expect, beforeEach } from "vitest";
import {
  mockGet,
  mockPost,
  mockPut,
  mockDelete,
  mockSuccessResponse,
  resetMocks,
} from "./setup";
import * as settingsApi from "../settings.api";

beforeEach(() => resetMocks());

// ── Users ─────────────────────────────────────────────────

describe("settings users", () => {
  it("getSettingsUsers returns users on success", async () => {
    const users = [{ id: "1", name: "Admin User", email: "admin@test.com", role: "admin" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: users }));

    const result = await settingsApi.getSettingsUsers();

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/users");
  });

  it("updateUser updates a user", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: { id: "1", name: "Updated" } }));

    const result = await settingsApi.updateUser("1", { name: "Updated" });

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/settings/users/1", { name: "Updated" });
  });

  it("deleteUser deletes a user", async () => {
    mockDelete.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await settingsApi.deleteUser("1");

    expect(result.success).toBe(true);
    expect(mockDelete).toHaveBeenCalledWith("/v1/admin/settings/users/1");
  });

  it("deleteUser returns error on failure", async () => {
    mockDelete.mockRejectedValue(new Error("Failed to delete user"));

    const result = await settingsApi.deleteUser("1");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to delete user");
  });
});

// ── Roles ─────────────────────────────────────────────────

describe("roles", () => {
  it("getRoles returns roles on success", async () => {
    const roles = [{ id: "r1", name: "Admin", permissions: ["all"] }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: roles }));

    const result = await settingsApi.getRoles();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/roles");
  });

  it("updateRoles updates roles", async () => {
    const roles = [{ id: "r1", name: "Manager", permissions: ["read", "write"] }];
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: roles }));

    const result = await settingsApi.updateRoles(roles);

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/settings/roles", roles);
  });
});

// ── Feature Flags ─────────────────────────────────────────

describe("feature flags", () => {
  it("getFeatureFlags returns flags on success", async () => {
    const flags = [{ key: "new-checkout", name: "New Checkout Flow", enabled: true }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: flags }));

    const result = await settingsApi.getFeatureFlags();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/feature-flags");
  });

  it("toggleFeature toggles a flag", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await settingsApi.toggleFeature("new-checkout", true);

    expect(result.success).toBe(true);
    expect(mockPost).toHaveBeenCalledWith(
      "/v1/admin/settings/feature-flags/new-checkout/toggle",
      { enabled: true },
    );
  });

  it("toggleFeature returns error on failure", async () => {
    mockPost.mockRejectedValue(new Error("Failed to toggle feature"));

    const result = await settingsApi.toggleFeature("new-checkout", false);

    expect(result.success).toBe(false);
    expect(result.data).toBe(false);
  });
});

// ── Theme ─────────────────────────────────────────────────

describe("getThemeSettings", () => {
  it("returns theme settings on success", async () => {
    const theme = { mode: "light", primaryColor: "#3B82F6", sidebarCollapsed: false };
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: theme }));

    const result = await settingsApi.getThemeSettings();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/theme");
  });
});

// ── API Keys ───────────────────────────────────────────────

describe("API keys", () => {
  it("getApiKeys returns keys on success", async () => {
    const keys = [{ id: "k1", name: "Production Key", keyPreview: "sk_live_****" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: keys }));

    const result = await settingsApi.getApiKeys();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/api-keys");
  });

  it("regenerateApiKey regenerates key", async () => {
    mockPost.mockResolvedValue(mockSuccessResponse({ success: true, data: { newKey: "sk_live_new_key" } }));

    const result = await settingsApi.regenerateApiKey("k1");

    expect(result.success).toBe(true);
    expect(result.data.newKey).toBeTruthy();
    expect(mockPost).toHaveBeenCalledWith("/v1/admin/settings/api-keys/k1/regenerate");
  });

  it("regenerateApiKey returns error on failure", async () => {
    mockPost.mockRejectedValue(new Error("Failed to regenerate API key"));

    const result = await settingsApi.regenerateApiKey("k1");

    expect(result.success).toBe(false);
    expect(result.data.newKey).toBe("");
  });
});

// ── Audit Logs ─────────────────────────────────────────────

describe("getSettingsAuditLogs", () => {
  it("returns audit logs on success", async () => {
    const logs = [{ id: "a1", action: "USER_LOGIN", user: "admin@test.com", timestamp: "2024-01-01" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: logs }));

    const result = await settingsApi.getSettingsAuditLogs({ action: "USER_LOGIN" });

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/audit-logs", {
      params: { action: "USER_LOGIN" },
    });
  });

  it("returns error on failure", async () => {
    mockGet.mockRejectedValue(new Error("Failed to load audit logs"));

    const result = await settingsApi.getSettingsAuditLogs();
    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load audit logs");
  });
});

// ── System Configs ─────────────────────────────────────────

describe("system configs", () => {
  it("getSystemConfigs returns configs on success", async () => {
    const configs = [{ key: "site_name", value: "FMCG Commerce" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: configs }));

    const result = await settingsApi.getSystemConfigs();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/system-configs");
  });

  it("updateConfig updates a config", async () => {
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await settingsApi.updateConfig("site_name", "New Name");

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/settings/system-configs/site_name", {
      value: "New Name",
    });
  });

  it("updateConfig returns error on failure", async () => {
    mockPut.mockRejectedValue(new Error("Failed to update config"));

    const result = await settingsApi.updateConfig("site_name", "New Name");
    expect(result.success).toBe(false);
    expect(result.data).toBe(false);
  });
});

// ── Payment Methods ────────────────────────────────────────

describe("getPaymentMethods", () => {
  it("returns payment methods on success", async () => {
    const methods = [{ id: "pm1", name: "Credit Card", enabled: true }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: methods }));

    const result = await settingsApi.getPaymentMethods();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/payment-methods");
  });
});

// ── Tax Rates ─────────────────────────────────────────────

describe("getTaxRates", () => {
  it("returns tax rates on success", async () => {
    const rates = [{ id: "tr1", name: "GST 18%", rate: 18, applicableRegion: "IN" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: rates }));

    const result = await settingsApi.getTaxRates();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/tax-rates");
  });
});

// ── GST Returns ────────────────────────────────────────────

describe("getGstReturns", () => {
  it("returns GST returns on success", async () => {
    const returns = [{ id: "g1", period: "Q1 2024", status: "filed", totalGst: 45000 }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: returns }));

    const result = await settingsApi.getGstReturns();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/gst-returns");
  });
});

// ── Notification Config ────────────────────────────────────

describe("notification configuration", () => {
  it("getNotificationChannels returns channels on success", async () => {
    const channels = [{ id: "ch1", name: "Email", enabled: true, provider: "SendGrid" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: channels }));

    const result = await settingsApi.getNotificationChannels();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/notifications/channels");
  });

  it("getNotificationEventMappings returns mappings", async () => {
    const mappings = [{ event: "order.confirmed", channelId: "ch1", templateId: "t1" }];
    mockGet.mockResolvedValue(mockSuccessResponse({ success: true, data: mappings }));

    const result = await settingsApi.getNotificationEventMappings();

    expect(result.success).toBe(true);
    expect(mockGet).toHaveBeenCalledWith("/v1/admin/settings/notifications/event-mappings");
  });

  it("updateNotifications updates notification settings", async () => {
    const mappings = [{ event: "order.confirmed", channelId: "ch1", templateId: "t1" }];
    mockPut.mockResolvedValue(mockSuccessResponse({ success: true, data: true }));

    const result = await settingsApi.updateNotifications(mappings);

    expect(result.success).toBe(true);
    expect(mockPut).toHaveBeenCalledWith("/v1/admin/settings/notifications/update", mappings);
  });
});
