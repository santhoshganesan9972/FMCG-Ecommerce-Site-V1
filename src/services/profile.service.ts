// ── Admin Profile Service ─────────────────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

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
import { profileApi } from "@/services/api";

export const profileService = {
  async getProfile(): Promise<AdminProfile> {
    const res = await profileApi.getProfile();
    return res.data;
  },

  async updateProfile(payload: ProfileUpdatePayload): Promise<AdminProfile> {
    const res = await profileApi.updateProfile(payload);
    return res.data;
  },

  async changePassword(payload: PasswordChangePayload): Promise<{ success: boolean }> {
    const res = await profileApi.changePassword(payload);
    return { success: res.success };
  },

  async getSessions(): Promise<LoginSession[]> {
    const res = await profileApi.getSessions();
    return res.data;
  },

  async terminateSession(sessionId: string): Promise<void> {
    await profileApi.terminateSession(sessionId);
  },

  async terminateOtherSessions(): Promise<void> {
    await profileApi.terminateOtherSessions();
  },

  async getActivityLog(
    page = 1,
    pageSize = 10
  ): Promise<{ entries: ActivityLogEntry[]; total: number; page: number; pageSize: number }> {
    const res = await profileApi.getActivityLog(page, pageSize);
    return res.data;
  },

  async getSecuritySettings(): Promise<AdminSecuritySettings> {
    const res = await profileApi.getSecuritySettings();
    return res.data;
  },

  async updateMFA(payload: MFASetupPayload): Promise<AdminSecuritySettings> {
    const res = await profileApi.updateMFA(payload);
    return res.data;
  },

  async rotateApiKey(): Promise<string> {
    const res = await profileApi.rotateApiKey();
    return res.data;
  },

  async getNotificationPrefs(): Promise<AdminNotificationPrefs> {
    const res = await profileApi.getNotificationPrefs();
    return res.data;
  },

  async updateNotificationPrefs(
    prefs: Partial<AdminNotificationPrefs>
  ): Promise<AdminNotificationPrefs> {
    const res = await profileApi.updateNotificationPrefs(prefs);
    return res.data;
  },

  async getProfileStats(): Promise<ProfileStats> {
    const res = await profileApi.getProfileStats();
    return res.data;
  },
};
