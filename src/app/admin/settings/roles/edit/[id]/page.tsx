"use client";

import { useState } from "react";
import DashboardLayout from "../../../../dashboard-layout";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Shield,
  Lock,
  Users,
  Settings,
  CreditCard,
  Tag,
  Store,
  Boxes,
  List,
  Trash2,
} from "lucide-react";

interface Permission {
  module: string;
  icon: typeof Shield;
  permissions: { key: string; label: string; enabled: boolean }[];
}

const permissionGroups: Permission[] = [
  {
    module: "Dashboard",
    icon: Shield,
    permissions: [
      { key: "dashboard.view", label: "View Dashboard", enabled: true },
      { key: "dashboard.export", label: "Export Reports", enabled: true },
    ],
  },
  {
    module: "Orders",
    icon: List,
    permissions: [
      { key: "orders.view", label: "View Orders", enabled: true },
      { key: "orders.create", label: "Create Orders", enabled: true },
      { key: "orders.edit", label: "Edit Orders", enabled: false },
      { key: "orders.cancel", label: "Cancel Orders", enabled: false },
      { key: "orders.refund", label: "Process Refunds", enabled: false },
    ],
  },
  {
    module: "Inventory",
    icon: Boxes,
    permissions: [
      { key: "inventory.view", label: "View Inventory", enabled: true },
      { key: "inventory.edit", label: "Edit Stock", enabled: true },
      { key: "inventory.import", label: "Import/Export", enabled: false },
    ],
  },
  {
    module: "Products",
    icon: Tag,
    permissions: [
      { key: "products.view", label: "View Products", enabled: true },
      { key: "products.create", label: "Create Products", enabled: true },
      { key: "products.edit", label: "Edit Products", enabled: true },
      { key: "products.delete", label: "Delete Products", enabled: false },
    ],
  },
  {
    module: "Customers",
    icon: Users,
    permissions: [
      { key: "customers.view", label: "View Customers", enabled: true },
      { key: "customers.edit", label: "Edit Customers", enabled: false },
      { key: "customers.delete", label: "Delete Customers", enabled: false },
    ],
  },
  {
    module: "Vendors",
    icon: Store,
    permissions: [
      { key: "vendors.view", label: "View Vendors", enabled: false },
      { key: "vendors.create", label: "Add Vendors", enabled: false },
      { key: "vendors.edit", label: "Edit Vendors", enabled: false },
    ],
  },
  {
    module: "Finance",
    icon: CreditCard,
    permissions: [
      { key: "finance.view", label: "View Transactions", enabled: true },
      { key: "finance.refund", label: "Process Refunds", enabled: false },
      { key: "finance.reports", label: "View Reports", enabled: true },
    ],
  },
  {
    module: "Promotions",
    icon: Tag,
    permissions: [
      { key: "promotions.view", label: "View Promotions", enabled: true },
      { key: "promotions.create", label: "Create Promotions", enabled: false },
    ],
  },
  {
    module: "Settings",
    icon: Settings,
    permissions: [
      { key: "settings.view", label: "View Settings", enabled: false },
      { key: "settings.edit", label: "Edit Settings", enabled: false },
    ],
  },
  {
    module: "Users & Roles",
    icon: Lock,
    permissions: [
      { key: "users.view", label: "View Users", enabled: false },
      { key: "roles.manage", label: "Manage Roles", enabled: false },
    ],
  },
];

const moduleIcons: Record<string, typeof Shield> = {
  Dashboard: Shield,
  Orders: List,
  Inventory: Boxes,
  Products: Tag,
  Customers: Users,
  Vendors: Store,
  Finance: CreditCard,
  Promotions: Tag,
  Settings: Settings,
  "Users & Roles": Lock,
};

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const [roleName, setRoleName] = useState("Inventory Manager");
  const [roleDescription, setRoleDescription] = useState(
    "Manages product catalog, stock levels, and vendor relationships. Read-only access to orders and finance."
  );
  const [permissions, setPermissions] = useState(permissionGroups);
  const [saving, setSaving] = useState(false);

  const togglePermission = (moduleIndex: number, permIndex: number) => {
    setPermissions(
      permissions.map((group, mi) =>
        mi === moduleIndex
          ? {
              ...group,
              permissions: group.permissions.map((p, pi) =>
                pi === permIndex ? { ...p, enabled: !p.enabled } : p
              ),
            }
          : group
      )
    );
  };

  const toggleModule = (moduleIndex: number, enabled: boolean) => {
    setPermissions(
      permissions.map((group, mi) =>
        mi === moduleIndex
          ? {
              ...group,
              permissions: group.permissions.map((p) => ({ ...p, enabled })),
            }
          : group
      )
    );
  };

  const selectAll = () => {
    setPermissions(
      permissions.map((group) => ({
        ...group,
        permissions: group.permissions.map((p) => ({ ...p, enabled: true })),
      }))
    );
  };

  const deselectAll = () => {
    setPermissions(
      permissions.map((group) => ({
        ...group,
        permissions: group.permissions.map((p) => ({ ...p, enabled: false })),
      }))
    );
  };

  const enabledCount = permissions.reduce(
    (sum, g) => sum + g.permissions.filter((p) => p.enabled).length,
    0
  );
  const totalCount = permissions.reduce(
    (sum, g) => sum + g.permissions.length,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/admin/settings/roles");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <Link
              href="/admin/settings/roles"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa]"
            >
              <ArrowLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Link>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Security Center
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Edit Role
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Modify role details and permissions. Role ID: <span className="font-mono font-bold text-[#1a1a1a]">{params?.id || "role-123"}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#b91c1c] hover:bg-[#fef2f2]">
                <Trash2 className="w-4 h-4" />
                Delete Role
              </button>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit}>
          {/* Role Details */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Details
              </p>
              <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
                Role Information
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Role Name <span className="text-[#b91c1c]">*</span>
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#999] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Description
                </label>
                <textarea
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#999] focus:border-[#0c831f]"
                />
              </div>
              <div className="rounded-xl bg-[#f6f7f6] p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-[#666]">Role ID</span>
                    <p className="font-bold text-[#1a1a1a]">{params?.id || "role-123"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#666]">Created</span>
                    <p className="font-bold text-[#1a1a1a]">May 15, 2026</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#666]">Users Assigned</span>
                    <p className="font-bold text-[#1a1a1a]">12 users</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#666]">Last Modified</span>
                    <p className="font-bold text-[#1a1a1a]">May 20, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Permissions */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
            <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Permissions
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">
                  Granular Permissions
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#666]">
                  {enabledCount} / {totalCount} selected
                </span>
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs font-bold text-[#0c831f] hover:text-[#0a6a18]"
                >
                  Select All
                </button>
                <span className="text-xs text-[#e8e8e8]">|</span>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="text-xs font-bold text-[#666] hover:text-[#1a1a1a]"
                >
                  Deselect All
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#e8e8e8]">
              {permissions.map((group, mi) => {
                const groupEnabled = group.permissions.every((p) => p.enabled);
                const partEnabled = group.permissions.some((p) => p.enabled);
                const Icon = moduleIcons[group.module] || Shield;
                return (
                  <div key={group.module} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#0c831f]" />
                        <span className="text-sm font-black text-[#1a1a1a]">
                          {group.module}
                        </span>
                        <span className="text-[10px] font-semibold text-[#999]">
                          {group.permissions.filter((p) => p.enabled).length} / {group.permissions.length}
                        </span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-xs font-semibold text-[#666]">
                          {groupEnabled ? "All enabled" : partEnabled ? "Partial" : "None"}
                        </span>
                        <input
                          type="checkbox"
                          checked={groupEnabled}
                          onChange={() => toggleModule(mi, !groupEnabled)}
                          className="h-4 w-4 rounded border-[#e8e8e8] text-[#0c831f] focus:ring-[#0c831f]"
                        />
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.permissions.map((perm, pi) => (
                        <button
                          key={perm.key}
                          type="button"
                          onClick={() => togglePermission(mi, pi)}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                            perm.enabled
                              ? "bg-[#e8f5e9] border-[#0c831f]/30 text-[#0c831f]"
                              : "bg-white border-[#e8e8e8] text-[#666] hover:border-[#0c831f]/30 hover:text-[#0c831f]"
                          }`}
                        >
                          {perm.enabled ? (
                            <span className="h-3 w-3 rounded-full bg-[#0c831f]" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border border-[#ccc]" />
                          )}
                          {perm.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/settings/roles"
              className="rounded-xl border border-[#e8e8e8] bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!roleName.trim() || saving}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-colors ${
                !roleName.trim() || saving
                  ? "bg-[#ccc] cursor-not-allowed"
                  : "bg-[#0c831f] hover:bg-[#0a6a18]"
              }`}
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
