// ── Admin Profile Types ───────────────────────────────────
// Zod schemas + TypeScript interfaces for the admin profile

import { z } from "zod/v4";

// ── Entity Schemas ────────────────────────────────────────

export const AdminProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional().nullable(),
  role: z.string().min(1),
  roleLabel: z.string().min(1),
  team: z.string().optional().nullable(),
  avatar: z.string().url().optional().nullable(),
  avatarInitials: z.string().max(4),
  status: z.enum(["active", "inactive", "suspended"]),
  department: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  timezone: z.string().default("Asia/Kolkata"),
  bio: z.string().max(300).optional().nullable(),
  joinedAt: z.string(),
  lastLoginAt: z.string(),
  lastLoginIp: z.string().optional().nullable(),
  mfaEnabled: z.boolean().default(false),
  mfaMethod: z.enum(["app", "sms", "email"]).optional().nullable(),
  emailVerified: z.boolean().default(true),
  phoneVerified: z.boolean().default(false),
});

export const LoginSessionSchema = z.object({
  id: z.string().min(1),
  deviceName: z.string(),
  deviceType: z.enum(["desktop", "mobile", "tablet", "unknown"]),
  browser: z.string(),
  os: z.string(),
  ip: z.string(),
  location: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  lastActiveAt: z.string(),
  createdAt: z.string(),
});

export const ActivityLogEntrySchema = z.object({
  id: z.string().min(1),
  action: z.string(),
  description: z.string(),
  resource: z.string().optional().nullable(),
  resourceId: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  status: z.enum(["success", "failure", "pending"]).default("success"),
  createdAt: z.string(),
});

export const AdminSecuritySettingsSchema = z.object({
  mfaEnabled: z.boolean().default(false),
  mfaMethod: z.enum(["app", "sms", "email"]).nullable().default(null),
  passwordLastChanged: z.string().optional().nullable(),
  passwordExpiresAt: z.string().optional().nullable(),
  sessionTimeout: z.number().int().positive().default(60),
  ipWhitelist: z.array(z.string()).default([]),
  loginNotifications: z.boolean().default(true),
  apiKey: z.string().optional().nullable(),
  apiKeyLastRotated: z.string().optional().nullable(),
});

export const AdminNotificationPrefsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  orderAlerts: z.boolean().default(true),
  inventoryAlerts: z.boolean().default(true),
  systemAlerts: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  digestFrequency: z.enum(["never", "daily", "weekly"]).default("daily"),
});

// ── Inferred Types ────────────────────────────────────────

export type AdminProfile = z.infer<typeof AdminProfileSchema>;
export type LoginSession = z.infer<typeof LoginSessionSchema>;
export type ActivityLogEntry = z.infer<typeof ActivityLogEntrySchema>;
export type AdminSecuritySettings = z.infer<typeof AdminSecuritySettingsSchema>;
export type AdminNotificationPrefs = z.infer<typeof AdminNotificationPrefsSchema>;

// ── Update Payloads ───────────────────────────────────────

export interface ProfileUpdatePayload {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  timezone?: string;
}

export interface PasswordChangePayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface MFASetupPayload {
  enabled: boolean;
  method: "app" | "sms" | "email" | null;
}

export interface ProfileStats {
  totalOrdersProcessed: number;
  totalRevenueManaged: number;
  activeSessions: number;
  daysSinceJoined: number;
  loginStreak: number;
  actionsToday: number;
}
