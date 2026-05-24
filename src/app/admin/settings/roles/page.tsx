"use client";

import DashboardLayout from "@/app/admin/dashboard-layout";
import Link from "next/link";
import RolesTable from "@/components/ui/admin/roles-table";
import {
  UserPlus,
  RefreshCw,
  Users,
  Shield,
  Lock,
  XCircle,
  Timer,
} from "lucide-react";

export default function RolesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Security Center
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Roles &amp; Permissions
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Create and manage roles. Assign or revoke granular permissions.
                Control exactly what each team member can access and modify.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/settings/roles/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <UserPlus className="w-4 h-4" />
                  Create Role
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {[
            {
              title: "Total Roles",
              value: "8",
              subtitle: "2 built-in, 6 custom",
              icon: <Shield className="h-4 w-4" />,
            },
            {
              title: "Active Permissions",
              value: "45",
              subtitle: "granular actions",
              icon: <Lock className="h-4 w-4" />,
            },
            {
              title: "Users with Roles",
              value: "34",
              growth: "+3",
              subtitle: "this month",
              icon: <Users className="h-4 w-4" />,
            },
            {
              title: "Pending Review",
              value: "0",
              subtitle: "permission requests",
              icon: <Timer className="h-4 w-4" />,
            },
          ].map((kp, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-[#666]">
                  {kp.title}
                </span>
                <span className="text-[#0c831f]">{kp.icon}</span>
              </div>
              <p className="text-xl font-black text-[#1a1a1a]">{kp.value}</p>
              {(kp.growth || kp.subtitle) && (
                <p className="mt-0.5 text-[10px] font-semibold text-[#0c831f]">
                  {kp.growth}
                  {kp.subtitle && <span className="text-[#999]"> {kp.subtitle}</span>}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Quick Actions
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">
              Permission Management
            </h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                icon: <UserPlus className="h-5 w-5" />,
                label: "Create Role",
                desc: "Add a new role with custom permissions",
                href: "/admin/settings/roles/create",
                bg: "bg-[#e8f5e9]",
                text: "text-[#0c831f]",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                label: "Assign Permissions",
                desc: "Grant access to specific modules",
                href: "#",
                bg: "bg-[#e8f5e9]",
                text: "text-[#0c831f]",
              },
              {
                icon: <Lock className="h-5 w-5" />,
                label: "Audit Log",
                desc: "Review permission changes & access",
                href: "#",
                bg: "bg-[#f0fdf4]",
                text: "text-[#15803d]",
              },
              {
                icon: <XCircle className="h-5 w-5" />,
                label: "Revoke Access",
                desc: "Remove permissions instantly",
                href: "#",
                bg: "bg-[#fef2f2]",
                text: "text-[#b91c1c]",
              },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md">
                  <div
                    className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl ${action.bg} ${action.text}`}
                  >
                    {action.icon}
                  </div>
                  <p className="text-sm font-black text-[#1a1a1a]">
                    {action.label}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#999]">
                    {action.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Roles Table */}
        <RolesTable />
      </div>
    </DashboardLayout>
  );
}
