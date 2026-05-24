"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PushSubscriptionState {
  isSubscribed: boolean;
  subscription: PushSubscriptionJSON | null;
  permission: NotificationPermission | "default";
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  updatePermission: () => void;
}

export const usePushNotificationStore = create<PushSubscriptionState>()(
  persist(
    (set, get) => ({
      isSubscribed: false,
      subscription: null,
      permission: typeof Notification !== "undefined" ? Notification.permission : "default",

      updatePermission: () => {
        if (typeof Notification !== "undefined") {
          set({ permission: Notification.permission });
        }
      },

      subscribe: async () => {
        try {
          // Check for notification permission
          if (typeof Notification === "undefined") {
            console.warn("[Push] Notifications not supported");
            return;
          }

          let perm = Notification.permission;
          if (perm === "default") {
            perm = await Notification.requestPermission();
            set({ permission: perm });
          }

          if (perm !== "granted") {
            console.warn("[Push] Notification permission denied");
            return;
          }

          // Check for service worker
          if (!("serviceWorker" in navigator)) {
            console.warn("[Push] Service workers not supported");
            return;
          }

          const registration = await navigator.serviceWorker.ready;

          // Check for push manager
          if (!("pushManager" in registration)) {
            console.warn("[Push] Push manager not supported");
            return;
          }

          // Get existing subscription
          let sub = await registration.pushManager.getSubscription();

          if (!sub) {
            // In production, this would use a real VAPID key from the server
            // For demo purposes, we simulate subscription
            const vapidPublicKey = "BEl62iUYgUvdBHTGNsamFvGJoXKQixP2yFpVvnzP7hD-S_F_9XUJ7qQVFUjNqFvq0KJwKjvLqZvJmBxYz9Kx5w";
            sub = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: vapidPublicKey,
            });
          }

          set({
            isSubscribed: true,
            subscription: sub.toJSON(),
          });

          // Send a test notification to confirm
          if (Notification.permission === "granted") {
            new Notification("🔔 Notifications Enabled", {
              body: "You'll now receive order updates and offers!",
              icon: "/favicon.ico",
            });
          }
        } catch (err) {
          console.error("[Push] Subscription failed:", err);
          set({ isSubscribed: false });
        }
      },

      unsubscribe: async () => {
        try {
          if (!("serviceWorker" in navigator)) return;
          const registration = await navigator.serviceWorker.ready;
          const sub = await registration.pushManager.getSubscription();
          if (sub) {
            await sub.unsubscribe();
          }
          set({ isSubscribed: false, subscription: null });
        } catch (err) {
          console.error("[Push] Unsubscribe failed:", err);
        }
      },
    }),
    {
      name: "push-notification-storage",
      partialize: (state) => ({
        isSubscribed: state.isSubscribed,
        permission: state.permission,
      }),
    }
  )
);
