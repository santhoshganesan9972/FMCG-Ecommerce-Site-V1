"use client";

import { create } from "zustand";

interface SharedCart {
  id: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  createdAt: string;
  sharedBy: string;
}

interface ShareCartStore {
  sharedCarts: SharedCart[];
  shareCart: (items: Array<{ name: string; quantity: number; price: number }>) => string;
  getSharedCart: (id: string) => SharedCart | undefined;
}

export const useShareCartStore = create<ShareCartStore>((set, get) => ({
  sharedCarts: [],

  shareCart: (items) => {
    const id = `SHARE-${Date.now().toString(36).toUpperCase()}`;
    const sharedCart: SharedCart = {
      id,
      items,
      createdAt: new Date().toISOString(),
      sharedBy: "You",
    };
    set((state) => ({ sharedCarts: [...state.sharedCarts, sharedCart] }));
    return id;
  },

  getSharedCart: (id) => get().sharedCarts.find((c) => c.id === id),
}));
