"use client";

import { create } from "zustand";
import type {
  GitStatus,
  GitCommit,
  GitBranch,
  GitDiff,
  GitOperation,
} from "@/lib/git";

interface GitState {
  /** Current Git status */
  status: GitStatus | null;
  /** Recent commit history */
  commits: GitCommit[];
  /** Available branches */
  branches: GitBranch[];
  /** Diffs for selected files */
  diffs: GitDiff[];
  /** Currently selected file path for diff view */
  selectedFilePath: string | null;
  /** Loading state */
  loading: boolean;
  /** Error message */
  error: string | null;
  /** Whether Git is initialized in this repo */
  isInitialized: boolean;

  // Actions
  fetchStatus: () => Promise<void>;
  fetchLog: (count?: number) => Promise<void>;
  fetchBranches: () => Promise<void>;
  fetchDiff: (filePath?: string, staged?: boolean) => Promise<void>;
  stageFiles: (paths: string[]) => Promise<boolean>;
  unstageFiles: (paths: string[]) => Promise<boolean>;
  commit: (message: string, description?: string) => Promise<boolean>;
  checkoutBranch: (name: string, createNew?: boolean) => Promise<boolean>;
  pull: (remote?: string, branch?: string) => Promise<boolean>;
  push: (remote?: string, branch?: string, setUpstream?: boolean) => Promise<boolean>;
  fetch: (remote?: string) => Promise<boolean>;
  selectFile: (path: string | null) => void;
  refreshAll: () => Promise<void>;
  clearError: () => void;
}

async function gitApi<T>(operation: GitOperation, params?: Record<string, unknown>): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const res = await fetch("/api/git", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation, params }),
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error — unable to reach Git API" };
  }
}

export const useGitStore = create<GitState>()((set, get) => ({
  status: null,
  commits: [],
  branches: [],
  diffs: [],
  selectedFilePath: null,
  loading: false,
  error: null,
  isInitialized: true,

  fetchStatus: async () => {
    set({ loading: true, error: null });
    const res = await gitApi<GitStatus>("status");
    if (res.success && res.data) {
      set({ status: res.data, loading: false, isInitialized: true });
    } else {
      set({ error: res.error || "Failed to fetch Git status", loading: false });
    }
  },

  fetchLog: async (count = 20) => {
    const res = await gitApi<GitCommit[]>("log", { count });
    if (res.success && res.data) {
      set({ commits: res.data });
    }
  },

  fetchBranches: async () => {
    const res = await gitApi<GitBranch[]>("branches");
    if (res.success && res.data) {
      set({ branches: res.data });
    }
  },

  fetchDiff: async (filePath?: string, staged = false) => {
    set({ selectedFilePath: filePath || null });
    const res = await gitApi<GitDiff[]>("diff", {
      filePath: filePath || undefined,
      staged,
    });
    if (res.success && res.data) {
      set({ diffs: res.data });
    } else {
      set({ diffs: [] });
    }
  },

  stageFiles: async (paths) => {
    const res = await gitApi<void>("stage", { paths });
    if (res.success) {
      await get().fetchStatus();
      return true;
    }
    set({ error: res.error || "Failed to stage files" });
    return false;
  },

  unstageFiles: async (paths) => {
    const res = await gitApi<void>("unstage", { paths });
    if (res.success) {
      await get().fetchStatus();
      return true;
    }
    set({ error: res.error || "Failed to unstage files" });
    return false;
  },

  commit: async (message, description) => {
    set({ loading: true, error: null });
    const res = await gitApi<{ hash: string }>("commit", { message, description });
    if (res.success) {
      await get().fetchStatus();
      await get().fetchLog();
      set({ loading: false });
      return true;
    }
    set({ error: res.error || "Failed to create commit", loading: false });
    return false;
  },

  checkoutBranch: async (name, createNew = false) => {
    set({ loading: true, error: null });
    const res = await gitApi<void>("checkout", { branch: name, createNew });
    if (res.success) {
      await get().refreshAll();
      return true;
    }
    set({ error: res.error || "Failed to checkout branch", loading: false });
    return false;
  },

  pull: async (remote = "origin", branch) => {
    set({ loading: true, error: null });
    const res = await gitApi<void>("pull", { remote, branch });
    if (res.success) {
      await get().refreshAll();
      return true;
    }
    set({ error: res.error || "Failed to pull", loading: false });
    return false;
  },

  push: async (remote = "origin", branch, setUpstream = false) => {
    set({ loading: true, error: null });
    const res = await gitApi<void>("push", { remote, branch, setUpstream });
    if (res.success) {
      await get().fetchStatus();
      set({ loading: false });
      return true;
    }
    set({ error: res.error || "Failed to push", loading: false });
    return false;
  },

  fetch: async (remote = "origin") => {
    set({ loading: true, error: null });
    const res = await gitApi<void>("fetch", { remote });
    if (res.success) {
      await get().fetchBranches();
      set({ loading: false });
      return true;
    }
    set({ error: res.error || "Failed to fetch", loading: false });
    return false;
  },

  selectFile: (path) => {
    set({ selectedFilePath: path });
    if (path) {
      get().fetchDiff(path);
    } else {
      set({ diffs: [] });
    }
  },

  refreshAll: async () => {
    set({ loading: true, error: null });
    await Promise.all([
      get().fetchStatus(),
      get().fetchLog(),
      get().fetchBranches(),
    ]);
    set({ loading: false });
  },

  clearError: () => set({ error: null }),
}));
