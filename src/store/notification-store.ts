"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
  id: string;
  type: "order" | "offer" | "reminder" | "system" | "referral" | "price_drop";
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  actionUrl?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: "notif_1",
          type: "order",
          title: "Order Delivered",
          message: "Your order #12345 has been delivered successfully!",
          read: false,
          createdAt: Date.now() - 3600000,
          actionUrl: "/account/orders",
        },
        {
          id: "notif_2",
          type: "offer",
          title: "Flash Sale Live!",
          message: "Extra 20% off on all snacks & beverages. Limited time!",
          read: false,
          createdAt: Date.now() - 7200000,
          actionUrl: "/offers",
        },
        {
          id: "notif_3",
          type: "reminder",
          title: "Reorder Reminder",
          message: "Your favorite items from last order are back in stock!",
          read: true,
          createdAt: Date.now() - 86400000,
          actionUrl: "/cart",
        },
      ],

      get unreadCount() {
        return get().notifications.filter((n) => !n.read).length;
      },

      addNotification: (n) =>
        set((state) => ({
          notifications: [
            {
              ...n,
              id: `notif_${Date.now()}`,
              read: false,
              createdAt: Date.now(),
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearAll: () => set({ notifications: [] }),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    { name: "notification-storage" }
  )
);
