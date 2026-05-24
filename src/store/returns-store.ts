"use client";

import { create } from "zustand";

export type ReturnReason =
  | "defective"
  | "wrong_item"
  | "not_as_described"
  | "size_issue"
  | "damaged"
  | "expired"
  | "other";

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  reason: ReturnReason;
  details: string;
  status: "pending" | "approved" | "rejected" | "picked_up" | "refunded";
  createdAt: string;
  updatedAt: string;
  refundAmount: number;
  tracking?: string;
}

interface ReturnsStore {
  returns: ReturnRequest[];
  createReturn: (request: Omit<ReturnRequest, "id" | "status" | "createdAt" | "updatedAt">) => void;
  updateReturnStatus: (id: string, status: ReturnRequest["status"]) => void;
  getReturnsByOrder: (orderId: string) => ReturnRequest[];
}

export const useReturnsStore = create<ReturnsStore>((set, get) => ({
  returns: [
    {
      id: "RET-001",
      orderId: "ORD-1004",
      productId: "PROD-009",
      productName: "Organic Whole Wheat Atta",
      productImage: "/placeholder.svg?text=Atta",
      quantity: 1,
      reason: "defective",
      details: "Package was torn on arrival",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      refundAmount: 349,
    },
  ],

  createReturn: (request) =>
    set((state) => ({
      returns: [
        {
          ...request,
          id: `RET-${String(state.returns.length + 1).padStart(3, "0")}`,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.returns,
      ],
    })),

  updateReturnStatus: (id, status) =>
    set((state) => ({
      returns: state.returns.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
      ),
    })),

  getReturnsByOrder: (orderId) => get().returns.filter((r) => r.orderId === orderId),
}));
