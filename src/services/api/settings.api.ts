// ── Settings API Adapter ─────────────────────────────────────
// Connects admin settings management to real backend APIs.
// Architecture: Hook → Service → API Adapter → apiClient → Backend

import { apiClient } from "@/lib/api/api-client";
import { ADMIN } from "@/lib/api/endpoints";
import { errorResponse, successResponse } from "@/types/api";
import type { ApiResponse, MutationResult } from "@/types/api";
import type {
  SettingsUser,
  Role,
  FeatureFlag,
  ThemeSettings,
  ApiKey,
  AuditLog,
  SystemConfig,
  PaymentMethodConfig,
  TaxRate,
  GstReturn,
  NotificationChannel,
  NotificationEventMapping,
} from "@/types/settings";

const S = ADMIN;

// ── Users ─────────────────────────────────────────────────

export async function getSettingsUsers(): Promise<ApiResponse<SettingsUser[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_USERS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load users",
    );
  }
}

export async function updateUser(id: string, data: Partial<SettingsUser>): Promise<ApiResponse<SettingsUser | undefined>> {
  try {
    const response = await apiClient.put(S.SETTINGS_USER(id), data);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update user",
    );
  }
}

export async function deleteUser(id: string): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.delete(S.SETTINGS_USER(id));
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to delete user" };
  }
}

// ── Roles ─────────────────────────────────────────────────

export async function getRoles(): Promise<ApiResponse<Role[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_ROLES);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load roles",
    );
  }
}

export async function updateRoles(roles: Role[]): Promise<ApiResponse<Role[]>> {
  try {
    const response = await apiClient.put(S.SETTINGS_ROLES, roles);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update roles",
    );
  }
}

// ── Feature Flags ─────────────────────────────────────────

export async function getFeatureFlags(): Promise<ApiResponse<FeatureFlag[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_FEATURE_FLAGS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load feature flags",
    );
  }
}

export async function toggleFeature(key: string, enabled: boolean): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.post(S.SETTINGS_FEATURE_FLAG_TOGGLE(key), { enabled });
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to toggle feature" };
  }
}

// ── Theme ─────────────────────────────────────────────────

export async function getThemeSettings(): Promise<ApiResponse<ThemeSettings>> {
  try {
    const response = await apiClient.get(S.SETTINGS_THEME);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load theme settings",
    );
  }
}

// ── API Keys ───────────────────────────────────────────────

export async function getApiKeys(): Promise<ApiResponse<ApiKey[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_API_KEYS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load API keys",
    );
  }
}

export async function regenerateApiKey(id: string): Promise<MutationResult<{ newKey: string }>> {
  try {
    const response = await apiClient.post(S.SETTINGS_API_KEY_REGENERATE(id));
    return response.data;
  } catch (error) {
    return { success: false, data: { newKey: "" }, error: error instanceof Error ? error.message : "Failed to regenerate API key" };
  }
}

// ── Audit Logs ─────────────────────────────────────────────

export async function getSettingsAuditLogs(filters?: { search?: string; action?: string }): Promise<ApiResponse<AuditLog[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_AUDIT_LOGS, { params: filters });
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load audit logs",
    );
  }
}

// ── System Configs ─────────────────────────────────────────

export async function getSystemConfigs(): Promise<ApiResponse<SystemConfig[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_SYSTEM_CONFIGS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load system configs",
    );
  }
}

export async function updateConfig(key: string, value: unknown): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(S.SETTINGS_SYSTEM_CONFIG(key), { value });
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to update config" };
  }
}

// ── Payment Methods ────────────────────────────────────────

export async function getPaymentMethods(): Promise<ApiResponse<PaymentMethodConfig[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_PAYMENT_METHODS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load payment methods",
    );
  }
}

// ── Tax Rates ─────────────────────────────────────────────

export async function getTaxRates(): Promise<ApiResponse<TaxRate[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_TAX_RATES);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load tax rates",
    );
  }
}

// ── GST Returns ────────────────────────────────────────────

export async function getGstReturns(): Promise<ApiResponse<GstReturn[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_GST_RETURNS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load GST returns",
    );
  }
}

// ── Notification Config ────────────────────────────────────

export async function getNotificationChannels(): Promise<ApiResponse<NotificationChannel[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_NOTIFICATION_CHANNELS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load notification channels",
    );
  }
}

export async function getNotificationEventMappings(): Promise<ApiResponse<NotificationEventMapping[]>> {
  try {
    const response = await apiClient.get(S.SETTINGS_NOTIFICATION_EVENT_MAPPINGS);
    return response.data;
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to load notification event mappings",
    );
  }
}

export async function updateNotifications(data: NotificationEventMapping[]): Promise<MutationResult<boolean>> {
  try {
    const response = await apiClient.put(S.SETTINGS_NOTIFICATION_UPDATE, data);
    return response.data;
  } catch (error) {
    return { success: false, data: false, error: error instanceof Error ? error.message : "Failed to update notification settings" };
  }
}
