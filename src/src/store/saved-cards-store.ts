"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CardType = "Visa" | "Mastercard" | "RuPay" | "UPI";
export type CardCategory = "credit" | "debit" | "upi";

export interface SavedCard {
  id: string;
  type: CardType;
  category: CardCategory;
  /** Last 4 digits of card number, or UPI handle */
  last4: string;
  /** Masked number e.g. "**** 4242" */
  maskedNumber: string;
  expiry: string;
  holderName: string;
  provider: string; // e.g. "HDFC Bank", "Google Pay"
  isDefault: boolean;
  createdAt: string;
}

interface SavedCardsStore {
  cards: SavedCard[];
  addCard: (card: Omit<SavedCard, "id" | "createdAt">) => void;
  updateCard: (id: string, updates: Partial<SavedCard>) => void;
  deleteCard: (id: string) => void;
  setDefaultCard: (id: string) => void;
  getDefaultCard: () => SavedCard | undefined;
  /** Generate a masked display number from raw card number */
  maskCardNumber: (raw: string) => string;
}

export const useSavedCardsStore = create<SavedCardsStore>()(
  persist(
    (set, get) => ({
      cards: [
        {
          id: "card_1",
          type: "Visa",
          category: "credit",
          last4: "4242",
          maskedNumber: "**** 4242",
          expiry: "08/27",
          holderName: "John Doe",
          provider: "HDFC Bank",
          isDefault: true,
          createdAt: "2026-01-15",
        },
        {
          id: "card_2",
          type: "Mastercard",
          category: "debit",
          last4: "5555",
          maskedNumber: "**** 5555",
          expiry: "12/26",
          holderName: "John Doe",
          provider: "ICICI Bank",
          isDefault: false,
          createdAt: "2026-03-10",
        },
        {
          id: "card_3",
          type: "UPI",
          category: "upi",
          last4: "john@oksbi",
          maskedNumber: "john@oksbi",
          expiry: "",
          holderName: "John Doe",
          provider: "Google Pay",
          isDefault: false,
          createdAt: "2026-04-20",
        },
      ],

      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards.map((c) =>
              card.isDefault ? { ...c, isDefault: false } : c
            ),
            { ...card, id: `card_${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] },
          ],
        })),

      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id
              ? { ...c, ...updates }
              : updates.isDefault
                ? { ...c, isDefault: false }
                : c
          ),
        })),

      deleteCard: (id) =>
        set((state) => {
          const filtered = state.cards.filter((c) => c.id !== id);
          const deleted = state.cards.find((c) => c.id === id);
          if (deleted?.isDefault && filtered.length > 0) {
            filtered[0].isDefault = true;
          }
          return { cards: filtered };
        }),

      setDefaultCard: (id) =>
        set((state) => ({
          cards: state.cards.map((c) => ({
            ...c,
            isDefault: c.id === id,
          })),
        })),

      getDefaultCard: () => get().cards.find((c) => c.isDefault),

      maskCardNumber: (raw: string) => {
        const cleaned = raw.replace(/\s/g, "");
        if (cleaned.length <= 4) return cleaned;
        const last4 = cleaned.slice(-4);
        return `**** ${last4}`;
      },
    }),
    { name: "fmcg-saved-cards" }
  )
);
