"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PriceAlert {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  currentPrice: number;
  targetPrice: number;
  createdAt: string;
  triggered: boolean;
}

interface PriceAlertStore {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, "id" | "createdAt" | "triggered">) => void;
  removeAlert: (id: string) => void;
  checkAlerts: (products: { id: number; price: number }[]) => void;
}

export const usePriceAlertStore = create<PriceAlertStore>()(
  persist(
    (set, get) => ({
      alerts: [
        {
          id: "PA-001",
          productId: 3,
          productName: "Fortune Sunflower Oil",
          productImage: "/placeholder.svg?text=Oil",
          currentPrice: 195,
          targetPrice: 170,
          createdAt: "2026-05-10",
          triggered: false,
        },
        {
          id: "PA-002",
          productId: 8,
          productName: "Britannia Milk Bread",
          productImage: "/placeholder.svg?text=Bread",
          currentPrice: 35,
          targetPrice: 30,
          createdAt: "2026-05-12",
          triggered: false,
        },
      ],

      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            {
              ...alert,
              id: `PA-${String(state.alerts.length + 1).padStart(3, "0")}`,
              createdAt: new Date().toISOString().split("T")[0],
              triggered: false,
            },
            ...state.alerts,
          ],
        })),

      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        })),

      checkAlerts: (products) =>
        set((state) => ({
          alerts: state.alerts.map((alert) => {
            const product = products.find((p) => p.id === alert.productId);
            if (product && product.price <= alert.targetPrice && !alert.triggered) {
              return { ...alert, triggered: true, currentPrice: product.price };
            }
            return alert;
          }),
        })),
    }),
    { name: "fmcg-price-alerts" }
  )
);
