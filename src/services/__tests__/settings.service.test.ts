// ── Settings Service Tests ──────────────────────────────────
// Tests the service layer for user management, roles, feature
// flags, theme, API keys, audit logs, system configs, payment
// methods, tax/GST, and notification settings.

import { describe, it, expect, beforeEach } from "vitest";
import { mockSettingsApi, resetMocks } from "./setup";
import { settingsService } from "../settings.service";

beforeEach(() => resetMocks());

const mockMeta = { page: 1, pageSize: 10, total: 1, totalPages: 1 };

// ── User Management ─────────────────────────────────────────

describe("user management", () => {
  it("getUsers returns paginated users", async () => {
    const users = [{ id: "u1", name: "Admin User", email: "admin@test.com", role: "admin" as const, status: "active" as const }];
    mockSettingsApi.getUsers.mockResolvedValue({ success: true, data: users, meta: mockMeta });

    const result = await settingsService.getUsers({ role: "admin" });

    expect(result.data).toHaveLength(1);
    expect(result.meta?.page).toBe(1);
    expect(mockSettingsApi.getUsers).toHaveBeenCalledWith({ role: "admin" });
  });

  it("getUserById returns a user", async () => {
    const user = { id: "u1", name: "Admin User", email: "admin@test.com", role: "admin" as const, status: "active" as const };
    mockSettingsApi.getUserById.mockResolvedValue({ success: true, data: user });

    const result = await settingsService.getUserById("u1");

    expect(result.data?.name).toBe("Admin User");
    expect(mockSettingsApi.getUserById).toHaveBeenCalledWith("u1");
  });

  it("createUser returns created user", async () => {
    const created = { id: "u2", name: "New User", email: "new@test.com", role: "manager" as const, status: "active" as const };
    mockSettingsApi.createUser.mockResolvedValue({ success: true, data: created });

    const result = await settingsService.createUser({ name: "New User", email: "new@test.com", role: "manager" });

    expect(result.data.id).toBe("u2");
    expect(mockSettingsApi.createUser).toHaveBeenCalledWith({ name: "New User", email: "new@test.com", role: "manager" });
  });

  it("updateUserStatus returns success boolean", async () => {
    mockSettingsApi.updateUserStatus.mockResolvedValue({ success: true, data: true });

    const result = await settingsService.updateUserStatus("u1", "suspended");

    expect(result.data).toBe(true);
    expect(mockSettingsApi.updateUserStatus).toHaveBeenCalledWith("u1", "suspended");
  });
});

// ── Roles & Permissions ─────────────────────────────────────

describe("roles & permissions", () => {
  it("getRoles returns paginated roles", async () => {
    const roles = [{ id: "r1", name: "Admin", permissions: ["all"], description: "Full access" }];
    mockSettingsApi.getRoles.mockResolvedValue({ success: true, data: roles, meta: mockMeta });

    const result = await settingsService.getRoles();

    expect(result.data).toHaveLength(1);
    expect(result.meta?.total).toBe(1);
  });

  it("createRole returns created role", async () => {
    const created = { id: "r2", name: "Manager", permissions: ["read", "write"], description: "Manager role" };
    mockSettingsApi.createRole.mockResolvedValue({ success: true, data: created });

    const result = await settingsService.createRole({ name: "Manager", permissions: ["read", "write"] });

    expect(result.data.name).toBe("Manager");
  });
});

// ── Feature Flags ───────────────────────────────────────────

describe("feature flags", () => {
  it("getFeatureFlags returns paginated flags", async () => {
    const flags = [{ id: "f1", key: "new_checkout", enabled: true, description: "New checkout flow" }];
    mockSettingsApi.getFeatureFlags.mockResolvedValue({ success: true, data: flags, meta: mockMeta });

    const result = await settingsService.getFeatureFlags({ search: "checkout" });

    expect(result.data).toHaveLength(1);
    expect(mockSettingsApi.getFeatureFlags).toHaveBeenCalledWith({ search: "checkout" });
  });

  it("toggleFeatureFlag returns success boolean", async () => {
    mockSettingsApi.toggleFeatureFlag.mockResolvedValue({ success: true, data: true });

    const result = await settingsService.toggleFeatureFlag("f1", true);

    expect(result.data).toBe(true);
    expect(mockSettingsApi.toggleFeatureFlag).toHaveBeenCalledWith("f1", true);
  });
});

// ── Theme Settings ──────────────────────────────────────────

describe("theme settings", () => {
  it("getThemeSettings returns theme", async () => {
    const theme = { primaryColor: "#1a73e8", logo: "/logo.png", favicon: "/favicon.ico" };
    mockSettingsApi.getThemeSettings.mockResolvedValue({ success: true, data: theme });

    const result = await settingsService.getThemeSettings();

    expect(result.data?.primaryColor).toBe("#1a73e8");
  });

  it("updateThemeSettings returns updated theme", async () => {
    const updated = { primaryColor: "#ff5722", logo: "/new-logo.png", favicon: "/favicon.ico" };
    mockSettingsApi.updateThemeSettings.mockResolvedValue({ success: true, data: updated });

    const result = await settingsService.updateThemeSettings({ primaryColor: "#ff5722" });

    expect(result.data?.primaryColor).toBe("#ff5722");
    expect(mockSettingsApi.updateThemeSettings).toHaveBeenCalledWith({ primaryColor: "#ff5722" });
  });
});

// ── API Keys ────────────────────────────────────────────────

describe("API keys", () => {
  it("getApiKeys returns paginated keys", async () => {
    const keys = [{ id: "k1", name: "Production Key", key: "sk_live_***", status: "active" as const, createdAt: "2024-01-01" }];
    mockSettingsApi.getApiKeys.mockResolvedValue({ success: true, data: keys, meta: mockMeta });

    const result = await settingsService.getApiKeys();

    expect(result.data).toHaveLength(1);
  });

  it("createApiKey returns created key", async () => {
    const created = { id: "k2", name: "Dev Key", key: "sk_test_***", status: "active" as const, createdAt: "2024-02-01" };
    mockSettingsApi.createApiKey.mockResolvedValue({ success: true, data: created });

    const result = await settingsService.createApiKey({ name: "Dev Key" });

    expect(result.data.id).toBe("k2");
  });

  it("revokeApiKey returns success boolean", async () => {
    mockSettingsApi.revokeApiKey.mockResolvedValue({ success: true, data: true });

    const result = await settingsService.revokeApiKey("k1");

    expect(result.data).toBe(true);
    expect(mockSettingsApi.revokeApiKey).toHaveBeenCalledWith("k1");
  });
});

// ── Audit Logs ───────────────────────────────────────────────

describe("audit logs (settings)", () => {
  it("getAuditLogs returns paginated logs", async () => {
    const logs = [{ id: "al1", action: "UPDATE_USER", performedBy: "Admin", target: "User 123", timestamp: "2024-01-01" }];
    mockSettingsApi.getAuditLogs.mockResolvedValue({ success: true, data: logs, meta: mockMeta });

    const result = await settingsService.getAuditLogs({ action: "UPDATE_USER" });

    expect(result.data).toHaveLength(1);
    expect(mockSettingsApi.getAuditLogs).toHaveBeenCalledWith({ action: "UPDATE_USER" });
  });
});

// ── System Configurations ───────────────────────────────────

describe("system configurations", () => {
  it("getSystemConfigs returns paginated configs", async () => {
    const configs = [{ key: "app_name", value: "FMCG Commerce", description: "Application name" }];
    mockSettingsApi.getSystemConfigs.mockResolvedValue({ success: true, data: configs, meta: mockMeta });

    const result = await settingsService.getSystemConfigs({ key: "app_name" });

    expect(result.data).toHaveLength(1);
  });

  it("updateSystemConfig returns success boolean", async () => {
    mockSettingsApi.updateSystemConfig.mockResolvedValue({ success: true, data: true });

    const result = await settingsService.updateSystemConfig({ key: "app_name", value: "FMCG Shop" });

    expect(result.data).toBe(true);
    expect(mockSettingsApi.updateSystemConfig).toHaveBeenCalledWith({ key: "app_name", value: "FMCG Shop" });
  });
});

// ── Payment Settings ────────────────────────────────────────

describe("payment settings", () => {
  it("getPaymentMethods returns payment methods", async () => {
    const methods = [{ id: "pm1", name: "Credit Card", enabled: true, provider: "Stripe" }];
    mockSettingsApi.getPaymentMethods.mockResolvedValue({ success: true, data: methods });

    const result = await settingsService.getPaymentMethods();

    expect(result.data).toHaveLength(1);
    expect(result.data[0].provider).toBe("Stripe");
  });

  it("togglePaymentMethod returns success boolean", async () => {
    mockSettingsApi.togglePaymentMethod.mockResolvedValue({ success: true, data: true });

    const result = await settingsService.togglePaymentMethod("pm1", false);

    expect(result.data).toBe(true);
    expect(mockSettingsApi.togglePaymentMethod).toHaveBeenCalledWith("pm1", false);
  });
});

// ── GST / Tax Settings ──────────────────────────────────────

describe("tax settings", () => {
  it("getTaxRates returns tax rates", async () => {
    const rates = [{ id: "tr1", name: "GST 18%", rate: 18, category: "standard" as const }];
    mockSettingsApi.getTaxRates.mockResolvedValue({ success: true, data: rates });

    const result = await settingsService.getTaxRates();

    expect(result.data).toHaveLength(1);
    expect(result.data[0].rate).toBe(18);
  });

  it("getGstReturns returns GST returns", async () => {
    const returns = [{ id: "gr1", period: "2024-01", status: "filed" as const, dueDate: "2024-02-20" }];
    mockSettingsApi.getGstReturns.mockResolvedValue({ success: true, data: returns });

    const result = await settingsService.getGstReturns();

    expect(result.data).toHaveLength(1);
    expect(result.data[0].status).toBe("filed");
  });
});

// ── Notification Settings ───────────────────────────────────

describe("notification settings", () => {
  it("getNotificationChannels returns channels", async () => {
    const channels = [{ name: "email", enabled: true, provider: "SendGrid" }];
    mockSettingsApi.getNotificationChannels.mockResolvedValue({ success: true, data: channels });

    const result = await settingsService.getNotificationChannels();

    expect(result.data).toHaveLength(1);
  });

  it("getNotificationEventMappings returns mappings", async () => {
    const mappings = [{ event: "order_confirmed", channels: ["email", "sms"], enabled: true }];
    mockSettingsApi.getNotificationEventMappings.mockResolvedValue({ success: true, data: mappings });

    const result = await settingsService.getNotificationEventMappings();

    expect(result.data).toHaveLength(1);
    expect(result.data[0].event).toBe("order_confirmed");
  });

  it("toggleNotificationChannel returns success boolean", async () => {
    mockSettingsApi.toggleNotificationChannel.mockResolvedValue({ success: true, data: true });

    const result = await settingsService.toggleNotificationChannel("sms", false);

    expect(result.data).toBe(true);
    expect(mockSettingsApi.toggleNotificationChannel).toHaveBeenCalledWith("sms", false);
  });
});

// ── Error Propagation ───────────────────────────────────────

describe("error propagation (settings)", () => {
  it("propagates error from getUsers", async () => {
    mockSettingsApi.getUsers.mockResolvedValue({
      success: false,
      data: [],
      error: "Failed to load users",
    });

    const result = await settingsService.getUsers();

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to load users");
  });

  it("propagates error from getUserById", async () => {
    mockSettingsApi.getUserById.mockResolvedValue({
      success: false,
      data: null,
      error: "User not found",
    });

    const result = await settingsService.getUserById("999");

    expect(result.success).toBe(false);
    expect(result.error).toBe("User not found");
  });

  it("propagates error from createRole", async () => {
    mockSettingsApi.createRole.mockResolvedValue({
      success: false,
      data: {} as any,
      error: "Role already exists",
    });

    const result = await settingsService.createRole({ name: "Existing Role", permissions: [] });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Role already exists");
  });
});
