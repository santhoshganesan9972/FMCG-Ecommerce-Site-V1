"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye,
  UserPlus,
  Shield,
  Users,
  Lock,
} from "lucide-react";
import { useRolesStore } from "@/store/roles-store";
import { toast } from "sonner";

type TabType = "all" | "builtin" | "custom";

const tabs: { key: TabType; label: string }[] = [
  { key: "all", label: "All Roles" },
  { key: "builtin", label: "Built-in" },
  { key: "custom", label: "Custom" },
];

export default function RolesTable() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { roles, permissions, openMenuId, toggleMenu, updatePermissions, deleteRole } =
    useRolesStore();

  const builtinIds = ["role-001", "role-008"];
  const filtered =
    activeTab === "all"
      ? roles
      : activeTab === "builtin"
      ? roles.filter((r) => builtinIds.includes(r.id))
      : roles.filter((r) => !builtinIds.includes(r.id));

  const activePermissionsCount = (perms: string[]) =>
    perms.filter((pid) => {
      const p = permissions.find((perm) => perm.id === pid);
      return !!p;
    }).length;

  const handleDelete = (roleId: string, roleName: string) => {
    toast.success(`Role "${roleName}" deleted`);
    deleteRole(roleId);
    toggleMenu("x");
  };

  return (
    <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Tabs header */}
      <div className="flex flex-col gap-3 border-b border-[#e8e8e8] px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === tab.key
                    ? "text-[#0c831f]"
                    : "text-[#999] hover:text-[#1a1a1a]"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#0c831f]" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/settings/roles/create">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <UserPlus className="w-4 h-4" />
                Create Role
              </button>
            </Link>
            <button
              onClick={() => toast.success("Roles exported")}
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-[#666] hover:bg-[#f8f9fa]"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="rounded-full bg-[#e8f5e9] text-[#0c831f] px-2.5 py-0.5 text-[10px] font-bold">
            {roles.length} Total
          </span>
          <span className="rounded-full bg-[#fffbeb] text-[#d97706] px-2.5 py-0.5 text-[10px] font-bold">
            {roles.filter((r) => r.isDeletable).length} Custom
          </span>
          <span className="rounded-full bg-[#f0f9ff] text-[#0369a1] px-2.5 py-0.5 text-[10px] font-bold">
            {roles.filter((r) => !r.isDeletable).length} Built-in
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3 w-10">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Permissions</th>
              <th className="px-4 py-3">Users</th>
              <th className="px-4 py-3">Last Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((role) => (
              <tr
                key={role.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded border border-[#e8e8e8] hover:border-[#0c831f] hover:bg-[#e8f5e9] cursor-pointer" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-black ${role.bgColor} ${role.color}`}
                    >
                      {role.isDeletable ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Shield className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-black text-[#1a1a1a]">{role.name}</p>
                      <p className="text-[10px] font-semibold text-[#999]">
                        {role.isDeletable ? "Custom" : "Built-in"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs font-medium text-[#666] max-w-[260px] leading-relaxed">
                    {role.description}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-black text-[#0c831f]">
                      {activePermissionsCount(role.permissions)}
                    </span>
                    <span className="text-[10px] font-semibold text-[#999]">
                      of {permissions.length} available
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1 max-w-[360px]">
                    {role.permissions.slice(0, 5).map((pid) => {
                      const perm = permissions.find((p) => p.id === pid);
                      return (
                        <span
                          key={pid}
                          className="inline-block rounded-md bg-[#f6f7f6] px-1.5 py-0 text-[9px] font-semibold text-[#666]"
                          title={perm?.description}
                        >
                          {perm?.icon}
                          {perm?.label}
                        </span>
                      );
                    })}
                    {role.permissions.length > 5 && (
                      <span className="inline-block rounded-md bg-[#f6f7f6] px-1.5 py-0 text-[9px] font-semibold text-[#999]">
                        +{role.permissions.length - 5} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center rounded-lg bg-[#f6f7f6] px-2.5 py-1 text-xs font-black text-[#1a1a1a]">
                    <UserPlus className="w-3 h-3 mr-1 text-[#999]" />
                    {role.userCount}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-medium text-[#666]">
                    {role.updatedAt}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="relative flex justify-end">
                    <button
                      onClick={() => toggleMenu(role.id)}
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                    >
                      <MoreHorizontal className="h-4 w-4 text-[#666]" />
                    </button>
                    {openMenuId === role.id && (
                      <div className="absolute right-0 top-8 z-10 min-w-[200px] rounded-xl border border-[#e8e8e8] bg-white shadow-lg">
                        <div className="p-1">
                          <Link
                            href={`/admin/settings/roles/edit/${role.id}`}
                          >
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#666] hover:bg-[#f6f7f6]">
                              <Edit3 className="w-4 h-4" />
                              Edit Permissions
                            </button>
                          </Link>
                          <Link
                            href={`/admin/settings/roles/assign/${role.id}`}
                          >
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#666] hover:bg-[#f6f7f6]">
                              <Eye className="w-4 h-4" />
                              View Users
                            </button>
                          </Link>
                          <Link
                            href={`/admin/settings/roles/new?base=${role.id}`}
                          >
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#666] hover:bg-[#f6f7f6]">
                              <UserPlus className="w-4 h-4" />
                              Clone Role
                            </button>
                          </Link>
                          {role.isDeletable && (
                            <button
                              onClick={() => handleDelete(role.id, role.name)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b91c1c] hover:bg-[#fef2f2]"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Role
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm font-semibold text-[#999]"
                >
                  No roles found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
