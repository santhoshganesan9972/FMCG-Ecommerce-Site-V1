import { create } from "zustand";
import { toast } from "sonner";

export interface ComparisonItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  category: string;
  stock: "in_stock" | "low_stock" | "out_of_stock";
}

interface ComparisonStore {
  comparison: ComparisonItem[];
  addToComparison: (item: ComparisonItem) => void;
  removeFromComparison: (id: number) => void;
  clearComparison: () => void;
  isInComparison: (id: number) => boolean;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  comparison: [],

  addToComparison: (item) => {
    const state = get();
    if (state.comparison.length >= 4) {
      toast.error("Maximum 4 products can be compared at once");
      return;
    }
    if (state.comparison.some((i) => i.id === item.id)) {
      toast("Already in comparison");
      return;
    }
    set((state) => ({
      comparison: [...state.comparison, item],
    }));
    toast.success("Added to comparison ✓");
  },

  removeFromComparison: (id) =>
    set((state) => ({
      comparison: state.comparison.filter((item) => item.id !== id),
    })),

  clearComparison: () => set({ comparison: [] }),

  isInComparison: (id) => get().comparison.some((item) => item.id === id),
}));
