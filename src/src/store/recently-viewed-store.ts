"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RecentlyViewedItem {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  viewedAt: number;
}

interface RecentlyViewedStore {
  items: RecentlyViewedItem[];
  addRecentlyViewed: (item: Omit<RecentlyViewedItem, "viewedAt">) => void;
  clearRecentlyViewed: () => void;
}

const MAX_ITEMS = 20;

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],

      addRecentlyViewed: (item) =>
        set((state) => {
          const filtered = state.items.filter((i) => i.id !== item.id);
          return {
            items: [{ ...item, viewedAt: Date.now() }, ...filtered].slice(
              0,
              MAX_ITEMS
            ),
          };
        }),

      clearRecentlyViewed: () => set({ items: [] }),
    }),
    { name: "recently-viewed-storage" }
  )
);
