"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FamilyListItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  addedBy: string;
  purchased: boolean;
}

interface FamilyList {
  id: string;
  name: string;
  description: string;
  members: string[];
  items: FamilyListItem[];
  createdAt: string;
}

interface FamilyListStore {
  lists: FamilyList[];
  createList: (name: string, description: string, members: string[]) => void;
  addItemToList: (listId: string, item: Omit<FamilyListItem, "id" | "addedBy" | "purchased">) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  togglePurchased: (listId: string, itemId: string) => void;
  deleteList: (listId: string) => void;
}

export const useFamilyListStore = create<FamilyListStore>()(
  persist(
    (set) => ({
      lists: [
        {
          id: "FL-001",
          name: "Weekly Groceries",
          description: "Shared with family — add what we need for the week",
          members: ["You", "Priya"],
          items: [
            { id: "FLI-001", productId: "1", name: "Tata Salt", price: 18, image: "/placeholder.svg?text=Salt", quantity: 2, addedBy: "You", purchased: false },
            { id: "FLI-002", productId: "5", name: "Amul Butter", price: 55, image: "/placeholder.svg?text=Butter", quantity: 1, addedBy: "Priya", purchased: true },
            { id: "FLI-003", productId: "10", name: "Fortune Oil", price: 195, image: "/placeholder.svg?text=Oil", quantity: 1, addedBy: "You", purchased: false },
          ],
          createdAt: "2026-05-01",
        },
        {
          id: "FL-002",
          name: "Party Snacks",
          description: "Snacks for this weekend's get-together",
          members: ["You", "Rahul", "Neha"],
          items: [
            { id: "FLI-004", productId: "15", name: "Lays Chips", price: 30, image: "/placeholder.svg?text=Chips", quantity: 3, addedBy: "Rahul", purchased: false },
            { id: "FLI-005", productId: "20", name: "Coca-Cola", price: 40, image: "/placeholder.svg?text=Cola", quantity: 4, addedBy: "Neha", purchased: false },
          ],
          createdAt: "2026-05-10",
        },
      ],

      createList: (name, description, members) =>
        set((state) => ({
          lists: [
            {
              id: `FL-${String(state.lists.length + 1).padStart(3, "0")}`,
              name,
              description,
              members: ["You", ...members],
              items: [],
              createdAt: new Date().toISOString().split("T")[0],
            },
            ...state.lists,
          ],
        })),

      addItemToList: (listId, item) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: [
                    ...list.items,
                    {
                      ...item,
                      id: `FLI-${Date.now()}`,
                      addedBy: "You",
                      purchased: false,
                    },
                  ],
                }
              : list
          ),
        })),

      removeItemFromList: (listId, itemId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
              : list
          ),
        })),

      togglePurchased: (listId, itemId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((i) =>
                    i.id === itemId ? { ...i, purchased: !i.purchased } : i
                  ),
                }
              : list
          ),
        })),

      deleteList: (listId) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== listId),
        })),
    }),
    { name: "fmcg-family-lists" }
  )
);
