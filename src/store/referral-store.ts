"use client";

import { create } from "zustand";

interface ReferralEntry {
  id: string;
  referredEmail: string;
  status: "invited" | "joined" | "purchased";
  reward: number;
  date: string;
}

interface ReferralStore {
  referralCode: string;
  referrals: ReferralEntry[];
  totalEarned: number;
  addReferral: (email: string) => void;
  updateReferralStatus: (id: string, status: ReferralEntry["status"]) => void;
}

export const useReferralStore = create<ReferralStore>((set) => ({
  referralCode: "FMCG-SUMIT-25",
  totalEarned: 450,
  referrals: [
    { id: "REF-001", referredEmail: "priya@example.com", status: "purchased", reward: 100, date: "2026-05-10" },
    { id: "REF-002", referredEmail: "amit@example.com", status: "joined", reward: 50, date: "2026-05-12" },
    { id: "REF-003", referredEmail: "neha@example.com", status: "invited", reward: 0, date: "2026-05-15" },
    { id: "REF-004", referredEmail: "rahul@example.com", status: "purchased", reward: 200, date: "2026-05-08" },
    { id: "REF-005", referredEmail: "kavita@example.com", status: "joined", reward: 100, date: "2026-05-14" },
  ],

  addReferral: (email) =>
    set((state) => ({
      referrals: [
        {
          id: `REF-${String(state.referrals.length + 1).padStart(3, "0")}`,
          referredEmail: email,
          status: "invited",
          reward: 0,
          date: new Date().toISOString().split("T")[0],
        },
        ...state.referrals,
      ],
    })),

  updateReferralStatus: (id, status) =>
    set((state) => ({
      referrals: state.referrals.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              reward: status === "purchased" ? 200 : status === "joined" ? 50 : 0,
            }
          : r
      ),
    })),
}));
