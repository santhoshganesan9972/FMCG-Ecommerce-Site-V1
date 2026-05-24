"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  addedAt: string;
}

interface SavedItemsStore {
  items: SavedItem[];
  addItem: (item: Omit<SavedItem, "id" | "addedAt">) => void;
  removeItem: (productId: string) => void;
  clearAll: () => void;
  moveToCart: (productId: string) => SavedItem | undefined;
  getItemCount: () => number;
}

export const useSavedItemsStore = create<SavedItemsStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          if (state.items.find((i) => i.productId === item.productId)) return state;
          return {
            items: [
              {
                ...item,
                id: `SAVED-${Date.now()}`,
                addedAt: new Date().toISOString(),
              },
              ...state.items,
            ],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      clearAll: () => set({ items: [] }),

      moveToCart: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (item) {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));
          return item;
        }
        return undefined;
      },

      getItemCount: () => get().items.length,
    }),
    { name: "fmcg-saved-items" }
  )
);
