"use client";

import React from "react";
import { Eye, Edit3, Shield, UserCheck, UserX, Phone, Mail, MoreHorizontal } from "lucide-react";
import type { SettingsUser } from "@/types/settings";

interface UserManagementTableProps {
  users: SettingsUser[];
  loading?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  roleFilter?: string;
  onRoleFilterChange?: (value: string) => void;
  onViewUser?: (user: SettingsUser) => void;
  onEditUser?: (user: SettingsUser) => void;
  onToggleStatus?: (user: SettingsUser) => void;
  className?: string;
}

const roleColors: Record<string, string> = {
  super_admin: "bg-purple-100 text-purple-700",
  admin: "bg-blue-100 text-blue-700",
  manager: "bg-green-100 text-green-700",
  operator: "bg-amber-100 text-amber-700",
  viewer: "bg-gray-100 text-gray-700",
  finance: "bg-rose-100 text-rose-700",
};

const statusStyles: Record<string, string> = {
  active: "bg-[#e8f5e9] text-[#0c831f]",
  inactive: "bg-[#f6f7f6] text-[#999]",
  suspended: "bg-[#fef2f2] text-red-600",
};

export function UserManagementTable({
  users,
  loading = false,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  roleFilter,
  onRoleFilterChange,
  onViewUser,
  onEditUser,
  onToggleStatus,
  className = "",
}: UserManagementTableProps) {
  if (loading) {
    return (
      <div className={`rounded-2xl border border-[#e8e8e8] bg-white ${className}`}>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-[#f0f0f0]" />
              <div className="h-4 flex-1 rounded bg-[#f0f0f0]" />
              <div className="h-4 w-24 rounded bg-[#f0f0f0]" />
              <div className="h-6 w-20 rounded-full bg-[#f0f0f0]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm ${className}`}>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#e8e8e8] p-4">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={search || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search by name, email, or ID..."
            className="w-full rounded-xl border border-[#e8e8e8] px-4 py-2 pl-10 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none"
          />
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={statusFilter || "all"}
          onChange={(e) => onStatusFilterChange?.(e.target.value)}
          className="rounded-xl border border-[#e8e8e8] px-3 py-2 text-xs font-semibold text-[#666] focus:border-[#0c831f] focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        <select
          value={roleFilter || "all"}
          onChange={(e) => onRoleFilterChange?.(e.target.value)}
          className="rounded-xl border border-[#e8e8e8] px-3 py-2 text-xs font-semibold text-[#666] focus:border-[#0c831f] focus:outline-none"
        >
          <option value="all">All Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="operator">Operator</option>
          <option value="viewer">Viewer</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email / Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">MFA</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Login</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e8e8]">
            {users.map((user) => (
              <tr key={user.id} className="text-sm hover:bg-[#f9fafb] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">
                      {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1a1a]">{user.name}</p>
                      <p className="text-[10px] text-[#0c831f] font-mono">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1 text-xs text-[#666]">
                      <Mail className="h-3 w-3" /> {user.email}
                    </span>
                    {user.phone && (
                      <span className="flex items-center gap-1 text-xs text-[#999]">
                        <Phone className="h-3 w-3" /> {user.phone}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${roleColors[user.role] || "bg-gray-100 text-gray-700"}`}>
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[#666]">{user.team || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold ${user.mfaEnabled ? "text-[#0c831f]" : "text-[#999]"}`}>
                    {user.mfaEnabled ? "Enabled" : "Off"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusStyles[user.status] || "bg-[#f6f7f6] text-[#666]"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      user.status === "active" ? "bg-[#0c831f]" :
                      user.status === "suspended" ? "bg-red-500" : "bg-[#999]"
                    }`} />
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[#999]">{user.lastLogin || "Never"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onViewUser?.(user)}
                      className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8] transition-colors"
                      title="View details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onEditUser?.(user)}
                      className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8] transition-colors"
                      title="Edit user"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleStatus?.(user)}
                      className={`rounded-lg p-1.5 transition-colors ${
                        user.status === "active"
                          ? "bg-[#fef2f2] text-red-500 hover:bg-[#fee2e2]"
                          : "bg-[#e8f5e9] text-[#0c831f] hover:bg-[#d0edd4]"
                      }`}
                      title={user.status === "active" ? "Suspend user" : "Activate user"}
                    >
                      {user.status === "active" ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f7f6]">
            <Shield className="h-6 w-6 text-[#ccc]" />
          </div>
          <p className="text-sm font-bold text-[#1a1a1a]">No users found</p>
          <p className="mt-1 text-xs text-[#999]">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
