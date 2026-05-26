"use client";

import React, { useState } from "react";
import { Shield, CheckCircle, XCircle, Eye, Edit3 } from "lucide-react";
import type { Role, PermissionModule, PermissionAction } from "@/types/settings";
import { ALL_PERMISSION_MODULES, ALL_PERMISSION_ACTIONS } from "@/types/settings";

interface RolePermissionMatrixProps {
  roles: Role[];
  loading?: boolean;
  onEditRole?: (role: Role) => void;
  onViewRole?: (role: Role) => void;
  className?: string;
}

const roleColors: Record<string, string> = {
  super_admin: "bg-purple-100 text-purple-700 border-purple-200",
  admin: "bg-blue-100 text-blue-700 border-blue-200",
  manager: "bg-green-100 text-green-700 border-green-200",
  operator: "bg-amber-100 text-amber-700 border-amber-200",
  viewer: "bg-gray-100 text-gray-700 border-gray-200",
  finance: "bg-rose-100 text-rose-700 border-rose-200",
};

export function RolePermissionMatrix({
  roles,
  loading = false,
  onEditRole,
  onViewRole,
  className = "",
}: RolePermissionMatrixProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  if (loading) {
    return (
      <div className={`rounded-2xl border border-[#e8e8e8] bg-white ${className}`}>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="h-10 w-10 rounded-lg bg-[#f0f0f0]" />
              <div className="h-5 flex-1 rounded bg-[#f0f0f0]" />
              <div className="h-6 w-20 rounded-full bg-[#f0f0f0]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {roles.map((role) => {
        const isExpanded = expandedRole === role.id;
        const allModules = role.permissions[0]?.module === "*" ? ALL_PERMISSION_MODULES : role.permissions.map((p) => p.module);

        return (
          <div
            key={role.id}
            className="rounded-xl border border-[#e8e8e8] bg-white overflow-hidden transition-all hover:shadow-sm"
          >
            {/* Role Header */}
            <div
              className="flex cursor-pointer items-center justify-between p-4"
              onClick={() => setExpandedRole(isExpanded ? null : role.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  roleColors[role.level]?.split(" ")[0] || "bg-gray-100"
                }`}>
                  <Shield className={`h-5 w-5 ${
                    roleColors[role.level]?.split(" ")[1] || "text-gray-700"
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#1a1a1a]">{role.name}</span>
                    {role.isProtected && (
                      <span className="rounded bg-[#fffbeb] px-1.5 py-0.5 text-[10px] font-bold text-[#d97706]">Protected</span>
                    )}
                    {role.isDefault && (
                      <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-bold text-[#0c831f]">Default</span>
                    )}
                  </div>
                  <p className="text-xs text-[#999]">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#666]">{role.usersCount} users</span>
                <svg
                  className={`h-4 w-4 text-[#999] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Expanded Permission Matrix */}
            {isExpanded && (
              <div className="border-t border-[#e8e8e8] px-4 py-3">
                <div className="overflow-x-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-wide text-[#666]">
                        <th className="py-2 pr-4 text-left">Module</th>
                        {ALL_PERMISSION_ACTIONS.map((action) => (
                          <th key={action} className="px-2 py-2 text-center">{action}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ALL_PERMISSION_MODULES.map((module) => {
                        const perm = role.permissions.find((p) => p.module === module || p.module === "*");
                        const hasAccess = !!perm;
                        const actions = perm?.actions || [];
                        const allAccess = perm?.module === "*";

                        return (
                          <tr key={module} className="border-t border-[#e8e8e8] text-xs">
                            <td className="py-2 pr-4 font-semibold text-[#1a1a1a]">{module}</td>
                            {ALL_PERMISSION_ACTIONS.map((action) => {
                              const granted = allAccess || actions.includes(action);
                              return (
                                <td key={action} className="px-2 py-2 text-center">
                                  {granted ? (
                                    <CheckCircle className="mx-auto h-3.5 w-3.5 text-[#0c831f]" />
                                  ) : (
                                    <XCircle className="mx-auto h-3.5 w-3.5 text-[#ccc]" />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="mt-3 flex justify-end gap-2 border-t border-[#e8e8e8] pt-3">
                  <button
                    onClick={() => onViewRole?.(role)}
                    className="flex items-center gap-1.5 rounded-lg bg-[#f6f7f6] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#e8e8e8] transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </button>
                  {!role.isProtected && (
                    <button
                      onClick={() => onEditRole?.(role)}
                      className="flex items-center gap-1.5 rounded-lg bg-[#e8f5e9] px-3 py-1.5 text-xs font-semibold text-[#0c831f] hover:bg-[#d0edd4] transition-colors"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit Permissions
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
