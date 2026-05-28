// ── Admin Profile Service ─────────────────────────────────
// Mock data layer — swap with Axios calls to API Gateway later

import type {
  AdminProfile,
  LoginSession,
  ActivityLogEntry,
  AdminSecuritySettings,
  AdminNotificationPrefs,
  ProfileStats,
  ProfileUpdatePayload,
  PasswordChangePayload,
  MFASetupPayload,
} from "@/types/admin-profile";

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

// ── Mock Profile Data ─────────────────────────────────────

const MOCK_PROFILE: AdminProfile = {
  id: "USR-001",
  name: "Admin User",
  email: "admin@fmcg.com",
  phone: "+91 98765 43210",
  role: "super_admin",
  roleLabel: "Super Admin",
  team: "Management",
  avatar: null,
  avatarInitials: "AU",
  status: "active",
  department: "Operations",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  bio: "Platform administrator managing day-to-day FMCG commerce operations. Passionate about streamlining supply chain and delivering exceptional customer experiences.",
  joinedAt: "2024-01-01",
  lastLoginAt: "2026-05-25T09:15:00Z",
  lastLoginIp: "103.95.42.18",
  mfaEnabled: true,
  mfaMethod: "app",
  emailVerified: true,
  phoneVerified: true,
};

const MOCK_SESSIONS: LoginSession[] = [
  {
    id: "SESS-001",
    deviceName: "Windows Desktop",
    deviceType: "desktop",
    browser: "Chrome 125",
    os: "Windows 11",
    ip: "103.95.42.18",
    location: "Mumbai, MH, India",
    isCurrent: true,
    lastActiveAt: "2026-05-25T09:15:00Z",
    createdAt: "2026-05-25T07:00:00Z",
  },
  {
    id: "SESS-002",
    deviceName: "iPhone 15 Pro",
    deviceType: "mobile",
    browser: "Safari",
    os: "iOS 18.4",
    ip: "203.0.113.45",
    location: "Mumbai, MH, India",
    isCurrent: false,
    lastActiveAt: "2026-05-24T22:30:00Z",
    createdAt: "2026-05-20T14:00:00Z",
  },
  {
    id: "SESS-003",
    deviceName: "MacBook Pro",
    deviceType: "desktop",
    browser: "Firefox 127",
    os: "macOS 14.5",
    ip: "198.51.100.23",
    location: "Bangalore, KA, India",
    isCurrent: false,
    lastActiveAt: "2026-05-23T18:15:00Z",
    createdAt: "2026-05-15T09:00:00Z",
  },
  {
    id: "SESS-004",
    deviceName: "iPad Air",
    deviceType: "tablet",
    browser: "Chrome 125",
    os: "iPadOS 18.4",
    ip: "192.0.2.88",
    location: "Delhi, DL, India",
    isCurrent: false,
    lastActiveAt: "2026-05-22T14:45:00Z",
    createdAt: "2026-05-10T11:00:00Z",
  },
];

const MOCK_ACTIVITY_LOG: ActivityLogEntry[] = [
  {
    id: "ACT-001",
    action: "Logged in",
    description: "Authenticated via SSO (Google Workspace)",
    resource: "Session",
    resourceId: "SESS-001",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-25T09:15:00Z",
  },
  {
    id: "ACT-002",
    action: "Updated inventory",
    description: "Adjusted stock levels for PRD-004 (Full Cream Milk 1L)",
    resource: "Product",
    resourceId: "PRD-004",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-25T09:00:00Z",
  },
  {
    id: "ACT-003",
    action: "Approved vendor",
    description: "Approved vendor registration for Snack World Distributors",
    resource: "Vendor",
    resourceId: "VEND-004",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-24T16:30:00Z",
  },
  {
    id: "ACT-004",
    action: "Changed user role",
    description: "Updated Neha Singh's role from Viewer to Operator",
    resource: "User",
    resourceId: "USR-005",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-24T14:00:00Z",
  },
  {
    id: "ACT-005",
    action: "Created promotion",
    description: "Created flash sale 'Monsoon Essentials — 25% Off'",
    resource: "Promotion",
    resourceId: "PROMO-005",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-24T11:00:00Z",
  },
  {
    id: "ACT-006",
    action: "Exported report",
    description: "Exported Monthly Sales Report — May 2026 (XLSX)",
    resource: "Report",
    resourceId: "RPT-001",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-23T15:00:00Z",
  },
  {
    id: "ACT-007",
    action: "Password change",
    description: "Changed account password",
    resource: "Security",
    resourceId: "USR-001",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-22T10:00:00Z",
  },
  {
    id: "ACT-008",
    action: "Failed login attempt",
    description: "Incorrect password attempt from IP 198.51.100.23",
    resource: "Security",
    resourceId: "USR-001",
    ip: "203.0.113.42",
    userAgent: "Firefox 127 / macOS",
    status: "failure",
    createdAt: "2026-05-24T22:10:00Z",
  },
  {
    id: "ACT-009",
    action: "Updated settings",
    description: "Modified GST configuration — updated tax rate to 5%",
    resource: "Settings",
    resourceId: "GST-CONFIG",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-21T12:00:00Z",
  },
  {
    id: "ACT-010",
    action: "Deleted product",
    description: "Archived product PRD-011 (Discontinued Snack Mix)",
    resource: "Product",
    resourceId: "PRD-011",
    ip: "103.95.42.18",
    userAgent: "Chrome 125 / Windows 11",
    status: "success",
    createdAt: "2026-05-20T09:00:00Z",
  },
];

const MOCK_SECURITY: AdminSecuritySettings = {
  mfaEnabled: true,
  mfaMethod: "app",
  passwordLastChanged: "2026-05-22T10:00:00Z",
  passwordExpiresAt: "2026-08-22T10:00:00Z",
  sessionTimeout: 60,
  ipWhitelist: ["103.95.42.0/24"],
  loginNotifications: true,
  apiKey: "fmcg_sk_live_xxxx…xxxx",
  apiKeyLastRotated: "2026-04-01T00:00:00Z",
};

const MOCK_NOTIF_PREFS: AdminNotificationPrefs = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  orderAlerts: true,
  inventoryAlerts: true,
  systemAlerts: true,
  marketingEmails: false,
  digestFrequency: "daily",
};

// ── Service ───────────────────────────────────────────────

export const profileService = {
  /**
   * Fetch admin profile.
   */
  async getProfile(): Promise<AdminProfile> {
    await delay(200);
    return { ...MOCK_PROFILE };
  },

  /**
   * Update profile fields.
   */
  async updateProfile(payload: ProfileUpdatePayload): Promise<AdminProfile> {
    await delay(300);
    Object.assign(MOCK_PROFILE, payload);
    return { ...MOCK_PROFILE };
  },

  /**
   * Change password.
   */
  async changePassword(payload: PasswordChangePayload): Promise<{ success: boolean }> {
    await delay(400);
    if (payload.newPassword !== payload.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (payload.newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    return { success: true };
  },

  /**
   * Get login sessions.
   */
  async getSessions(): Promise<LoginSession[]> {
    await delay(200);
    return [...MOCK_SESSIONS];
  },

  /**
   * Terminate a session.
   */
  async terminateSession(sessionId: string): Promise<void> {
    await delay(150);
    const idx = MOCK_SESSIONS.findIndex((s) => s.id === sessionId);
    if (idx !== -1) MOCK_SESSIONS.splice(idx, 1);
  },

  /**
   * Terminate all other sessions.
   */
  async terminateOtherSessions(): Promise<void> {
    await delay(250);
    const current = MOCK_SESSIONS.filter((s) => s.isCurrent);
    MOCK_SESSIONS.length = 0;
    MOCK_SESSIONS.push(...current);
  },

  /**
   * Get activity log (paginated).
   */
  async getActivityLog(
    page = 1,
    pageSize = 10
  ): Promise<{ entries: ActivityLogEntry[]; total: number; page: number; pageSize: number }> {
    await delay(250);
    const sorted = [...MOCK_ACTIVITY_LOG].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const start = (page - 1) * pageSize;
    return {
      entries: sorted.slice(start, start + pageSize),
      total: sorted.length,
      page,
      pageSize,
    };
  },

  /**
   * Get security settings.
   */
  async getSecuritySettings(): Promise<AdminSecuritySettings> {
    await delay(150);
    return { ...MOCK_SECURITY };
  },

  /**
   * Update MFA settings.
   */
  async updateMFA(payload: MFASetupPayload): Promise<AdminSecuritySettings> {
    await delay(300);
    MOCK_SECURITY.mfaEnabled = payload.enabled;
    MOCK_SECURITY.mfaMethod = payload.method;
    return { ...MOCK_SECURITY };
  },

  /**
   * Rotate API key.
   */
  async rotateApiKey(): Promise<string> {
    await delay(500);
    const newKey = `fmcg_sk_live_${Math.random().toString(36).substring(2, 15)}…${Math.random().toString(36).substring(2, 8)}`;
    MOCK_SECURITY.apiKey = newKey;
    MOCK_SECURITY.apiKeyLastRotated = new Date().toISOString();
    return newKey;
  },

  /**
   * Get notification preferences.
   */
  async getNotificationPrefs(): Promise<AdminNotificationPrefs> {
    await delay(100);
    return { ...MOCK_NOTIF_PREFS };
  },

  /**
   * Update notification preferences.
   */
  async updateNotificationPrefs(
    prefs: Partial<AdminNotificationPrefs>
  ): Promise<AdminNotificationPrefs> {
    await delay(200);
    Object.assign(MOCK_NOTIF_PREFS, prefs);
    return { ...MOCK_NOTIF_PREFS };
  },

  /**
   * Get profile stats.
   */
  async getProfileStats(): Promise<ProfileStats> {
    await delay(150);
    return {
      totalOrdersProcessed: 1284,
      totalRevenueManaged: 42500000,
      activeSessions: MOCK_SESSIONS.filter((s) => s.isCurrent || new Date(s.lastActiveAt) > new Date(Date.now() - 15 * 60 * 1000)).length,
      daysSinceJoined: Math.floor(
        (Date.now() - new Date(MOCK_PROFILE.joinedAt).getTime()) / (1000 * 60 * 60 * 24)
      ),
      loginStreak: 12,
      actionsToday: 24,
    };
  },
};
