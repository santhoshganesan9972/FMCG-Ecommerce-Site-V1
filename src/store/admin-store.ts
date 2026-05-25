"use client";

import { create } from "zustand";

interface ExpandedSections {
  [key: string]: boolean;
}

interface AdminState {
  // Sidebar
  sidebarCollapsed: boolean;
  sidebarExpandedSections: ExpandedSections;
  mobileSidebarOpen: boolean;

  // Theme
  darkMode: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSection: (label: string) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  sidebarCollapsed: false,
  sidebarExpandedSections: {},
  mobileSidebarOpen: false,
  darkMode: false,

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  toggleSection: (label) =>
    set((state) => ({
      sidebarExpandedSections: {
        ...state.sidebarExpandedSections,
        [label]: !state.sidebarExpandedSections[label],
      },
    })),

  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setDarkMode: (dark) => set({ darkMode: dark }),
}));
