// ── Settings Management Service Layer ────────────────────
// Architecture: UI → Component → Hook → Service → Axios → API Gateway → Backend
//
// This service is the single source of truth for all settings-related data.
// Currently returns mock data. To connect to a real backend:
//   1. Import apiClient from "@/lib/api-client"
//   2. Set NEXT_PUBLIC_API_BASE_URL
//   3. Replace mock returns with apiClient calls
//   4. No UI / hook changes needed — types are shared.

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
import {
  mockSettingsUsers,
  mockRoles,
  mockFeatureFlags,
  mockThemeSettings,
  mockApiKeys,
  mockAuditLogs,
  mockSystemConfigs,
  mockPaymentMethods,
  mockTaxRates,
  mockGstReturns,
  mockNotificationChannels,
  mockNotificationEventMappings,
  delay,
} from "@/data/admin/settings";

// ── Settings Service ──────────────────────────────────────

export const settingsService = {
  // ═══════════════════════════════════════════════════════
  // USER MANAGEMENT
  // ═══════════════════════════════════════════════════════

  async getUsers(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<SettingsUser>>> {
    await delay(300);

    let filtered = [...mockSettingsUsers];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
      );
    }
    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((u) => u.status === params.status);
    }
    if (params?.role && params.role !== "all") {
      filtered = filtered.filter((u) => u.role === params.role);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      success: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        pagination: { page, pageSize, total },
      },
      meta: { cachedAt: new Date().toISOString() },
    };
  },

  async getUserById(userId: string): Promise<SettingsApiResponse<SettingsUser | null>> {
    await delay(200);
    const user = mockSettingsUsers.find((u) => u.id === userId) || null;
    return { success: true, data: user };
  },

  async createUser(data: CreateUserFormData): Promise<SettingsApiResponse<SettingsUser>> {
    await delay(400);
    const newUser: SettingsUser = {
      id: `USR-${String(mockSettingsUsers.length + 1).padStart(3, "0")}`,
      name: data.name,
      email: data.email,
      role: data.role as SettingsUser["role"],
      team: data.team,
      status: "active",
      mfaEnabled: data.mfaRequired || false,
      lastLogin: undefined,
      createdAt: new Date().toISOString().split("T")[0],
      permissions: [],
    };
    return { success: true, data: newUser };
  },

  async updateUserStatus(userId: string, status: string): Promise<SettingsApiResponse<boolean>> {
    await delay(250);
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // ROLES & PERMISSIONS
  // ═══════════════════════════════════════════════════════

  async getRoles(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<Role>>> {
    await delay(300);
    let filtered = [...mockRoles];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((r) => r.name.toLowerCase().includes(q));
    }

    return {
      success: true,
      data: {
        items: filtered,
        pagination: { page: 1, pageSize: filtered.length, total: filtered.length },
      },
    };
  },

  async createRole(data: CreateRoleFormData): Promise<SettingsApiResponse<Role>> {
    await delay(400);
    const newRole: Role = {
      id: `ROL-${String(mockRoles.length + 1).padStart(3, "0")}`,
      name: data.name,
      level: "manager",
      description: data.description,
      usersCount: 0,
      isProtected: false,
      isDefault: false,
      permissions: data.permissions,
      createdAt: new Date().toISOString(),
    };
    return { success: true, data: newRole };
  },

  // ═══════════════════════════════════════════════════════
  // FEATURE FLAGS
  // ═══════════════════════════════════════════════════════

  async getFeatureFlags(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<FeatureFlag>>> {
    await delay(300);
    let filtered = [...mockFeatureFlags];

    if (params?.environment && params.environment !== "all") {
      filtered = filtered.filter((f) => f.environment === params.environment);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(q) || f.key.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      data: {
        items: filtered,
        pagination: { page: 1, pageSize: filtered.length, total: filtered.length },
      },
    };
  },

  async toggleFeatureFlag(flagId: string, enabled: boolean): Promise<SettingsApiResponse<boolean>> {
    await delay(200);
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // THEME SETTINGS
  // ═══════════════════════════════════════════════════════

  async getThemeSettings(): Promise<SettingsApiResponse<ThemeSettings>> {
    await delay(200);
    return { success: true, data: { ...mockThemeSettings } };
  },

  async updateThemeSettings(
    data: Partial<ThemeSettings>
  ): Promise<SettingsApiResponse<ThemeSettings>> {
    await delay(250);
    return { success: true, data: { ...mockThemeSettings, ...data, updatedAt: new Date().toISOString() } };
  },

  // ═══════════════════════════════════════════════════════
  // API KEYS
  // ═══════════════════════════════════════════════════════

  async getApiKeys(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<ApiKey>>> {
    await delay(300);
    let filtered = [...mockApiKeys];

    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((k) => k.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (k) =>
          k.name.toLowerCase().includes(q) || k.prefix?.toLowerCase().includes(q)
      );
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      success: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        pagination: { page, pageSize, total },
      },
    };
  },

  async createApiKey(data: CreateApiKeyFormData): Promise<SettingsApiResponse<ApiKey>> {
    await delay(400);
    const newKey: ApiKey = {
      id: `API-${String(mockApiKeys.length + 1).padStart(3, "0")}`,
      name: data.name,
      key: `fmcg_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 14)}`,
      prefix: `fmcg_${data.name.toLowerCase().replace(/\s+/g, "_").substring(0, 8)}`,
      status: "active",
      permissions: data.permissions,
      rateLimit: data.rateLimit || 1000,
      allowedIPs: data.allowedIPs || [],
      createdBy: "Current User",
      createdAt: new Date().toISOString(),
      expiresAt: data.expiresAt,
      usageCount: 0,
    };
    return { success: true, data: newKey };
  },

  async revokeApiKey(keyId: string): Promise<SettingsApiResponse<boolean>> {
    await delay(250);
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // AUDIT LOGS
  // ═══════════════════════════════════════════════════════

  async getAuditLogs(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<AuditLog>>> {
    await delay(350);
    let filtered = [...mockAuditLogs];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.performedBy.toLowerCase().includes(q) ||
          l.details?.toLowerCase().includes(q) ||
          l.entityName?.toLowerCase().includes(q)
      );
    }
    if (params?.action && params.action !== "all") {
      filtered = filtered.filter((l) => l.action === params.action);
    }
    if (params?.entity && params.entity !== "all") {
      filtered = filtered.filter((l) => l.entity === params.entity);
    }

    // Sort by timestamp descending (most recent first)
    filtered.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 15;
    const total = filtered.length;
    const start = (page - 1) * pageSize;

    return {
      success: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        pagination: { page, pageSize, total },
      },
    };
  },

  // ═══════════════════════════════════════════════════════
  // SYSTEM CONFIGURATIONS
  // ═══════════════════════════════════════════════════════

  async getSystemConfigs(
    params?: Partial<SettingsQueryParams>
  ): Promise<SettingsApiResponse<PaginatedResponse<SystemConfig>>> {
    await delay(300);
    let filtered = [...mockSystemConfigs];

    if (params?.category && params.category !== "all") {
      filtered = filtered.filter((c) => c.category === params.category);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.key.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      data: {
        items: filtered,
        pagination: { page: 1, pageSize: filtered.length, total: filtered.length },
      },
    };
  },

  async updateSystemConfig(
    data: UpdateConfigFormData
  ): Promise<SettingsApiResponse<boolean>> {
    await delay(250);
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // PAYMENT SETTINGS
  // ═══════════════════════════════════════════════════════

  async getPaymentMethods(): Promise<SettingsApiResponse<PaymentMethodConfig[]>> {
    await delay(200);
    return { success: true, data: mockPaymentMethods };
  },

  async togglePaymentMethod(methodId: string, enabled: boolean): Promise<SettingsApiResponse<boolean>> {
    await delay(200);
    return { success: true, data: true };
  },

  // ═══════════════════════════════════════════════════════
  // GST / TAX SETTINGS
  // ═══════════════════════════════════════════════════════

  async getTaxRates(): Promise<SettingsApiResponse<TaxRate[]>> {
    await delay(200);
    return { success: true, data: mockTaxRates };
  },

  async getGstReturns(): Promise<SettingsApiResponse<GstReturn[]>> {
    await delay(200);
    return { success: true, data: mockGstReturns };
  },

  // ═══════════════════════════════════════════════════════
  // NOTIFICATION SETTINGS
  // ═══════════════════════════════════════════════════════

  async getNotificationChannels(): Promise<SettingsApiResponse<NotificationChannel[]>> {
    await delay(200);
    return { success: true, data: mockNotificationChannels };
  },

  async getNotificationEventMappings(): Promise<SettingsApiResponse<NotificationEventMapping[]>> {
    await delay(200);
    return { success: true, data: mockNotificationEventMappings };
  },

  async toggleNotificationChannel(
    channelName: string,
    enabled: boolean
  ): Promise<SettingsApiResponse<boolean>> {
    await delay(200);
    return { success: true, data: true };
  },
};

export type SettingsService = typeof settingsService;
