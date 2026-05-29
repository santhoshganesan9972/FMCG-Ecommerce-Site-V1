// ── Admin Notification Service ────────────────────────────
// Now delegates to the standardized API adapters.
// Swap to real backend: update the API adapters, this layer stays the same.

import type {
  AdminNotification,
  NotificationCategory,
  NotificationPriority,
  NotificationFeed,
  NotificationQueryParams,
  NotificationStats,
  NotificationPreferences,
} from "@/types/admin-notifications";
import { notificationsApi } from "@/services/api";

export const notificationService = {
  async getNotifications(
    params: NotificationQueryParams = {}
  ): Promise<NotificationFeed> {
    const res = await notificationsApi.getNotifications(params);
    return res.data;
  },

  async getNotificationStats(): Promise<NotificationStats> {
    const res = await notificationsApi.getNotificationStats();
    return res.data;
  },

  async markAsRead(id: string): Promise<void> {
    await notificationsApi.markAsRead(id);
  },

  async markAllAsRead(): Promise<void> {
    await notificationsApi.markAllAsRead();
  },

  async archive(id: string): Promise<void> {
    await notificationsApi.archive(id);
  },

  async bulkArchive(ids: string[]): Promise<void> {
    await notificationsApi.bulkArchive(ids);
  },

  async delete(id: string): Promise<void> {
    await notificationsApi.delete(id);
  },

  async addNotification(
    notification: Omit<AdminNotification, "read" | "archived">
  ): Promise<void> {
    await notificationsApi.addNotification(notification);
  },

  async getPreferences(): Promise<NotificationPreferences> {
    const res = await notificationsApi.getPreferences();
    return res.data;
  },

  async updatePreferences(
    prefs: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    const res = await notificationsApi.updatePreferences(prefs);
    return res.data;
  },
};
