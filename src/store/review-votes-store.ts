"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VoteEntry {
  /** Namespaced key like "review-123" or "qa-456" */
  key: string;
  votedAt: number;
}

interface ReviewVotesStore {
  votes: VoteEntry[];
  hasVoted: (key: string) => boolean;
  addVote: (key: string) => void;
  removeVote: (key: string) => void;
}

export const useReviewVotesStore = create<ReviewVotesStore>()(
  persist(
    (set, get) => ({
      votes: [],

      hasVoted: (key) => get().votes.some((v) => v.key === key),

      addVote: (key) =>
        set((state) => ({
          votes: [...state.votes, { key, votedAt: Date.now() }],
        })),

      removeVote: (key) =>
        set((state) => ({
          votes: state.votes.filter((v) => v.key !== key),
        })),
    }),
    { name: "review-votes-storage" }
  )
);
