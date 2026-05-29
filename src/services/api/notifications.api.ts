// ── Notifications API Adapter ──────────────────────────────
// Wraps mock notification data in standardized ApiResponse envelopes.

import type { ApiResponse, MutationResult } from "@/types/api";
import { successResponse } from "@/types/api";

// Types for notification data in the store
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "system" | "promotion" | "inventory" | "delivery";
  read: boolean;
  createdAt: string;
}

interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
}

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

// ── Notifications ─────────────────────────────────────────

export async function getNotifications(filters?: { read?: boolean; type?: string }): Promise<ApiResponse<Notification[]>> {
  await delay(200);
  // Delegate to Zustand store for stateful notifications
  if (typeof window !== "undefined") {
    try {
      const store = await import("@/store/notification-store");
      const state = store.useNotificationStore.getState();
      let notifications = state.notifications;
      if (filters?.read !== undefined) {
        notifications = notifications.filter((n) => n.read === filters.read);
      }
      if (filters?.type) {
        notifications = notifications.filter((n) => n.type === filters.type);
      }
      return successResponse(notifications);
    } catch {
      return successResponse([]);
    }
  }
  return successResponse([]);
}

export async function getNotificationStats(): Promise<ApiResponse<NotificationStats>> {
  await delay(150);
  if (typeof window !== "undefined") {
    try {
      const store = await import("@/store/notification-store");
      const state = store.useNotificationStore.getState();
      const stats: NotificationStats = {
        total: state.notifications.length,
        unread: state.notifications.filter((n) => !n.read).length,
        byType: {},
      };
      state.notifications.forEach((n) => {
        stats.byType[n.type] = (stats.byType[n.type] || 0) + 1;
      });
      return successResponse(stats);
    } catch {
      return successResponse({ total: 0, unread: 0, byType: {} });
    }
  }
  return successResponse({ total: 0, unread: 0, byType: {} });
}

export async function markNotificationRead(id: string): Promise<MutationResult<boolean>> {
  await delay(100);
  if (typeof window !== "undefined") {
    try {
      const store = await import("@/store/notification-store");
      store.useNotificationStore.getState().markAsRead(id);
    } catch {
      // Silently fail
    }
  }
  return { success: true, data: true };
}

export async function markAllNotificationsRead(): Promise<MutationResult<boolean>> {
  await delay(150);
  if (typeof window !== "undefined") {
    try {
      const store = await import("@/store/notification-store");
      store.useNotificationStore.getState().markAllAsRead();
    } catch {
      // Silently fail
    }
  }
  return { success: true, data: true };
}

export async function dismissNotification(id: string): Promise<MutationResult<boolean>> {
  await delay(100);
  if (typeof window !== "undefined") {
    try {
      const store = await import("@/store/notification-store");
      store.useNotificationStore.getState().dismissNotification(id);
    } catch {
      // Silently fail
    }
  }
  return { success: true, data: true };
}
