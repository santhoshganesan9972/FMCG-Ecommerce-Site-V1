// ── Settings Management Service Layer ────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  SettingsUser,
  Role,
  FeatureFlag,
  ThemeSettings,
  ApiKey,
  AuditLog,
  SystemConfig,
  SettingsApiResponse,
  PaginatedResponse,
  SettingsQueryParams,
  CreateUserFormData,
  CreateRoleFormData,
  CreateApiKeyFormData,
  UpdateConfigFormData,
  PaymentMethodConfig,
  TaxRate,
  GstReturn,
  NotificationChannel,
  NotificationEventMapping,
} from "@/types/settings";
import { settingsApi } from "@/services/api";

export const settingsService = {
  // ── User Management ──────────────────────────────────

  async getUsers(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<SettingsUser>>> {
    const res = await settingsApi.getUsers(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async getUserById(userId: string): Promise<SettingsApiResponse<SettingsUser | null>> {
    const res = await settingsApi.getUserById(userId);
    return { success: res.success, data: res.data, error: res.error };
  },

  async createUser(data: CreateUserFormData): Promise<SettingsApiResponse<SettingsUser>> {
    const res = await settingsApi.createUser(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  async updateUserStatus(userId: string, status: string): Promise<SettingsApiResponse<boolean>> {
    const res = await settingsApi.updateUserStatus(userId, status);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Roles & Permissions ──────────────────────────────

  async getRoles(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<Role>>> {
    const res = await settingsApi.getRoles(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async createRole(data: CreateRoleFormData): Promise<SettingsApiResponse<Role>> {
    const res = await settingsApi.createRole(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Feature Flags ─────────────────────────────────────

  async getFeatureFlags(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<FeatureFlag>>> {
    const res = await settingsApi.getFeatureFlags(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async toggleFeatureFlag(flagId: string, enabled: boolean): Promise<SettingsApiResponse<boolean>> {
    const res = await settingsApi.toggleFeatureFlag(flagId, enabled);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Theme Settings ────────────────────────────────────

  async getThemeSettings(): Promise<SettingsApiResponse<ThemeSettings>> {
    const res = await settingsApi.getThemeSettings();
    return { success: res.success, data: res.data, error: res.error };
  },

  async updateThemeSettings(
    data: Partial<ThemeSettings>
  ): Promise<SettingsApiResponse<ThemeSettings>> {
    const res = await settingsApi.updateThemeSettings(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── API Keys ─────────────────────────────────────────

  async getApiKeys(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<ApiKey>>> {
    const res = await settingsApi.getApiKeys(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async createApiKey(data: CreateApiKeyFormData): Promise<SettingsApiResponse<ApiKey>> {
    const res = await settingsApi.createApiKey(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  async revokeApiKey(keyId: string): Promise<SettingsApiResponse<boolean>> {
    const res = await settingsApi.revokeApiKey(keyId);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Audit Logs ────────────────────────────────────────

  async getAuditLogs(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<AuditLog>>> {
    const res = await settingsApi.getAuditLogs(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  // ── System Configurations ─────────────────────────────

  async getSystemConfigs(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<SystemConfig>>> {
    const res = await settingsApi.getSystemConfigs(params);
    return { success: res.success, data: res.data, meta: res.meta, error: res.error };
  },

  async updateSystemConfig(
    data: UpdateConfigFormData
  ): Promise<SettingsApiResponse<boolean>> {
    const res = await settingsApi.updateSystemConfig(data);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Payment Settings ─────────────────────────────────

  async getPaymentMethods(): Promise<SettingsApiResponse<PaymentMethodConfig[]>> {
    const res = await settingsApi.getPaymentMethods();
    return { success: res.success, data: res.data, error: res.error };
  },

  async togglePaymentMethod(methodId: string, enabled: boolean): Promise<SettingsApiResponse<boolean>> {
    const res = await settingsApi.togglePaymentMethod(methodId, enabled);
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── GST / Tax Settings ───────────────────────────────

  async getTaxRates(): Promise<SettingsApiResponse<TaxRate[]>> {
    const res = await settingsApi.getTaxRates();
    return { success: res.success, data: res.data, error: res.error };
  },

  async getGstReturns(): Promise<SettingsApiResponse<GstReturn[]>> {
    const res = await settingsApi.getGstReturns();
    return { success: res.success, data: res.data, error: res.error };
  },

  // ── Notification Settings ────────────────────────────

  async getNotificationChannels(): Promise<SettingsApiResponse<NotificationChannel[]>> {
    const res = await settingsApi.getNotificationChannels();
    return { success: res.success, data: res.data, error: res.error };
  },

  async getNotificationEventMappings(): Promise<SettingsApiResponse<NotificationEventMapping[]>> {
    const res = await settingsApi.getNotificationEventMappings();
    return { success: res.success, data: res.data, error: res.error };
  },

  async toggleNotificationChannel(
    channelName: string,
    enabled: boolean
  ): Promise<SettingsApiResponse<boolean>> {
    const res = await settingsApi.toggleNotificationChannel(channelName, enabled);
    return { success: res.success, data: res.data, error: res.error };
  },
};

export type SettingsService = typeof settingsService;
