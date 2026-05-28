import { create } from "zustand";
import { mockSubscriptions } from "@/data/subscription";

export type SubscriptionStatus = "active" | "paused" | "cancelled";

interface SubscriptionState {
  subscriptions: typeof mockSubscriptions;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  toggleMenu: (id: string) => void;
  updateStatus: (id: string, status: SubscriptionStatus) => void;
  refresh: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: mockSubscriptions,
  openMenuId: null,
  setOpenMenuId: (id) => set({ openMenuId: id }),
  toggleMenu: (id) =>
    set((state) => ({
      openMenuId: state.openMenuId === id ? null : id,
    })),
  updateStatus: (id, status) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((s) =>
        s.id === id ? { ...s, status } : s
      ),
    })),
  refresh: () => set({ subscriptions: [...mockSubscriptions] }),
}));
