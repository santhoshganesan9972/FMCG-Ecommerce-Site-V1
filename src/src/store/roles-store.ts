import { create } from "zustand";
import { mockRoles, allPermissions } from "@/data/roles";

interface RoleState {
  roles: typeof mockRoles;
  permissions: typeof allPermissions;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  toggleMenu: (id: string) => void;
  updatePermissions: (id: string, permissions: string[]) => void;
  addRole: (role: typeof mockRoles[0]) => void;
  deleteRole: (id: string) => void;
}

export const useRolesStore = create<RoleState>((set) => ({
  roles: mockRoles,
  permissions: allPermissions,
  openMenuId: null,
  setOpenMenuId: (id) => set({ openMenuId: id }),
  toggleMenu: (id) =>
    set((state) => ({
      openMenuId: state.openMenuId === id ? null : id,
    })),
  updatePermissions: (id, permissions) =>
    set((state) => ({
      roles: state.roles.map((r) =>
        r.id === id
          ? { ...r, permissions, updatedAt: new Date().toISOString().split("T")[0] }
          : r
      ),
    })),
  addRole: (role) =>
    set((state) => ({
      roles: [...state.roles, role],
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((r) => r.id !== id),
    })),
}));
