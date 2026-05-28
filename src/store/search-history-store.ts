"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchHistoryStore {
  queries: string[];
  suggestions: string[];
  addQuery: (q: string) => void;
  clearHistory: () => void;
  removeQuery: (q: string) => void;
}

const MAX_HISTORY = 20;
const PRESET_SUGGESTIONS = [
  "Fresh milk",
  "Whole wheat bread",
  "Banana",
  "Brown eggs",
  "Basmati rice",
  "Sunflower oil",
  "Tomato ketchup",
  "Washing powder",
  "Green tea",
  "Mixed nuts",
];

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      queries: ["Fresh milk", "Brown bread", "Organic vegetables", "Basmati rice"],
      suggestions: PRESET_SUGGESTIONS,

      addQuery: (q) =>
        set((state) => {
          const filtered = state.queries.filter((h) => h !== q);
          return { queries: [q, ...filtered].slice(0, MAX_HISTORY) };
        }),

      clearHistory: () => set({ queries: [] }),

      removeQuery: (q) =>
        set((state) => ({
          queries: state.queries.filter((h) => h !== q),
        })),
    }),
    { name: "search-history-storage" }
  )
);
