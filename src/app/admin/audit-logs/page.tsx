"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  CalendarDays,
  Eye,
  ChevronDown,
  ChevronUp,
  XCircle,
  RefreshCw,
  Clock,
  Globe,
  User,
  ShieldCheck,
  ArrowUpDown,
  FileSpreadsheet,
  Printer,
  Settings,
} from "lucide-react";

type AuditAction =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "export"
  | "view"
  | "permission_change"
  | "settings_change"
  | "password_reset";

interface AuditLog {
  id: number;
  user: string;
  userRole: string;
  action: AuditAction;
  actionLabel: string;
  module: string;
  detail: string;
  timestamp: string;
  ipAddress: string;
  changes?: { field: string; from: string; to: string }[];
}

const auditLogs: AuditLog[] = [
  {
    id: 1,
    user: "Super Admin",
    userRole: "Administrator",
    action: "login",
    actionLabel: "Login",
    module: "Authentication",
    detail: "Successful login from admin panel",
    timestamp: "2026-05-21 09:15:23",
    ipAddress: "192.168.1.100",
  },
  {
    id: 2,
    user: "Priya Sharma",
    userRole: "Support Agent",
    action: "update",
    actionLabel: "Update",
    module: "Orders",
    detail: "Updated order status from 'Processing' to 'Shipped' — Order #ORD-2024-3421",
    timestamp: "2026-05-21 09:12:45",
    ipAddress: "192.168.1.102",
    changes: [
      { field: "Status", from: "Processing", to: "Shipped" },
      { field: "Assigned To", from: "Warehouse", to: "Delivery Partner" },
    ],
  },
  {
    id: 3,
    user: "Rahul Verma",
    userRole: "Inventory Manager",
    action: "create",
    actionLabel: "Create",
    module: "Products",
    detail: "Created new product — 'Organic Amla Juice 500ml' (SKU: ORG-AML-001)",
    timestamp: "2026-05-21 08:58:12",
    ipAddress: "192.168.1.105",
  },
  {
    id: 4,
    user: "Neha Kapoor",
    userRole: "Senior Agent",
    action: "permission_change",
    actionLabel: "Permission Change",
    module: "Roles & Permissions",
    detail: "Modified permissions for role 'Support Agent' — added 'Refund Approval' access",
    timestamp: "2026-05-21 08:45:33",
    ipAddress: "192.168.1.103",
    changes: [
      { field: "Permission", from: "No Access", to: "Full Access" },
      { field: "Module", from: "-", to: "Refund Approval" },
    ],
  },
  {
    id: 5,
    user: "System",
    userRole: "Automated",
    action: "settings_change",
    actionLabel: "Settings Change",
    module: "System Settings",
    detail: "Cache TTL updated from 3600s to 7200s via scheduled optimization",
    timestamp: "2026-05-21 08:30:00",
    ipAddress: "10.0.0.1",
    changes: [
      { field: "Cache TTL", from: "3600s", to: "7200s" },
    ],
  },
  {
    id: 6,
    user: "Amit Singh",
    userRole: "Support Agent",
    action: "view",
    actionLabel: "View",
    module: "Customers",
    detail: "Viewed customer profile — Rajesh Kumar (CUST-8921)",
    timestamp: "2026-05-21 08:22:18",
    ipAddress: "192.168.1.102",
  },
  {
    id: 7,
    user: "Suresh Rao",
    userRole: "Finance Manager",
    action: "export",
    actionLabel: "Export",
    module: "Finance",
    detail: "Exported GST report — period: April 2026",
    timestamp: "2026-05-21 08:10:55",
    ipAddress: "192.168.1.106",
  },
  {
    id: 8,
    user: "Super Admin",
    userRole: "Administrator",
    action: "password_reset",
    actionLabel: "Password Reset",
    module: "Users",
    detail: "Password reset for user 'Vikram Mehta' — triggered via admin panel",
    timestamp: "2026-05-20 23:45:10",
    ipAddress: "192.168.1.100",
  },
  {
    id: 9,
    user: "Neha Kapoor",
    userRole: "Senior Agent",
    action: "delete",
    actionLabel: "Delete",
    module: "CMS",
    detail: "Deleted expired banner — 'Summer Sale 2026' (ID: BNR-023)",
    timestamp: "2026-05-20 22:30:00",
    ipAddress: "192.168.1.103",
  },
  {
    id: 10,
    user: "Priya Sharma",
    userRole: "Support Agent",
    action: "logout",
    actionLabel: "Logout",
    module: "Authentication",
    detail: "User logged out from support panel",
    timestamp: "2026-05-20 21:15:30",
    ipAddress: "192.168.1.102",
  },
  {
    id: 11,
    user: "Rahul Verma",
    userRole: "Inventory Manager",
    action: "update",
    actionLabel: "Update",
    module: "Inventory",
    detail: "Bulk stock update — adjusted quantities for 15 SKUs (Category: Beverages)",
    timestamp: "2026-05-20 20:05:22",
    ipAddress: "192.168.1.105",
    changes: [
      { field: "Stock Level", from: "1,250 units", to: "980 units" },
      { field: "Low Stock Alert", from: "50 units", to: "75 units" },
    ],
  },
  {
    id: 12,
    user: "Suresh Rao",
    userRole: "Finance Manager",
    action: "create",
    actionLabel: "Create",
    module: "Finance",
    detail: "Created vendor settlement payout — FreshFarm Dairy (₹1,24,500)",
    timestamp: "2026-05-20 19:30:45",
    ipAddress: "192.168.1.106",
  },
];

const actionConfig: Record<
  AuditAction,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  login: {
    label: "Login",
    bg: "bg-[#e8f5e9]",
    text: "text-[#0c831f]",
    icon: <ShieldCheck className="h-3 w-3" />,
  },
  logout: {
    label: "Logout",
    bg: "bg-[#f3f4f6]",
    text: "text-[#6b7280]",
    icon: <XCircle className="h-3 w-3" />,
  },
  create: {
    label: "Create",
    bg: "bg-[#e8f5e9]",
    text: "text-[#0c831f]",
    icon: <ShieldCheck className="h-3 w-3" />,
  },
  update: {
    label: "Update",
    bg: "bg-[#fffbeb]",
    text: "text-[#d97706]",
    icon: <RefreshCw className="h-3 w-3" />,
  },
  delete: {
    label: "Delete",
    bg: "bg-[#fef2f2]",
    text: "text-[#dc2626]",
    icon: <XCircle className="h-3 w-3" />,
  },
  export: {
    label: "Export",
    bg: "bg-[#eff6ff]",
    text: "text-[#2563eb]",
    icon: <Download className="h-3 w-3" />,
  },
  view: {
    label: "View",
    bg: "bg-[#f0fdf4]",
    text: "text-[#16a34a]",
    icon: <Eye className="h-3 w-3" />,
  },
  permission_change: {
    label: "Permission Change",
    bg: "bg-[#fff0f6]",
    text: "text-[#ff4f8b]",
    icon: <ShieldCheck className="h-3 w-3" />,
  },
  settings_change: {
    label: "Settings Change",
    bg: "bg-[#faf5ff]",
    text: "text-[#9333ea]",
    icon: <RefreshCw className="h-3 w-3" />,
  },
  password_reset: {
    label: "Password Reset",
    bg: "bg-[#fef2f2]",
    text: "text-[#b91c1c]",
    icon: <ShieldCheck className="h-3 w-3" />,
  },
};

const modules = [
  "All Modules",
  "Authentication",
  "Orders",
  "Products",
  "Inventory",
  "Customers",
  "Finance",
  "CMS",
  "Roles & Permissions",
  "System Settings",
  "Users",
];

const users = [
  "All Users",
  "Super Admin",
  "Priya Sharma",
  "Rahul Verma",
  "Neha Kapoor",
  "Amit Singh",
  "Suresh Rao",
  "System",
];

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [userFilter, setUserFilter] = useState("All Users");
  const [dateRange, setDateRange] = useState("all");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesModule =
      moduleFilter === "All Modules" || log.module === moduleFilter;
    const matchesUser =
      userFilter === "All Users" || log.user === userFilter;
    return matchesSearch && matchesAction && matchesModule && matchesUser;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExport = (format: "csv" | "pdf") => {
    // In a real app, this would trigger an actual export
    console.log(`Exporting as ${format}...`);
    alert(
      `Audit logs exported as ${format.toUpperCase()} successfully! (Demo)`
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setActionFilter("all");
    setModuleFilter("All Modules");
    setUserFilter("All Users");
    setDateRange("all");
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* ── Header ─────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Security &amp; Compliance
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Audit Logs
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Complete audit trail of all system activities — user actions,
                module changes, permission modifications, and security events.
                Track who did what and when.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleExport("csv")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]"
              >
                <FileSpreadsheet className="h-4 w-4 text-[#0c831f]" />
                Export CSV
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]"
              >
                <Printer className="h-4 w-4 text-[#ff4f8b]" />
                Export PDF
              </button>
              <Link
                href="/admin/audit-logs/settings"
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f6f7f6]"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-[#f8f9fa]"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* ── KPI Strip ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              title: "Total Events",
              value: "12,847",
              subtitle: "all time",
              icon: <FileSpreadsheet className="h-4 w-4" />,
              color: "text-[#0c831f]",
            },
            {
              title: "Today",
              value: "342",
              subtitle: "actions logged",
              icon: <Clock className="h-4 w-4" />,
              color: "text-[#2563eb]",
            },
            {
              title: "Unique Users",
              value: "18",
              subtitle: "active today",
              icon: <User className="h-4 w-4" />,
              color: "text-[#d97706]",
            },
            {
              title: "Security Events",
              value: "23",
              subtitle: "login attempts",
              icon: <ShieldCheck className="h-4 w-4" />,
              color: "text-[#ff4f8b]",
            },
          ].map((kp, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#666]">
                  {kp.title}
                </span>
                <span className={kp.color}>{kp.icon}</span>
              </div>
              <p className="text-xl font-black text-[#1a1a1a]">{kp.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold text-[#999]">
                {kp.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* ── Filters ────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3">
            {/* Search Row */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search by user, action, module, IP address or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 flex-shrink-0 text-[#999]" />
                <span className="text-xs font-bold text-[#666]">Action:</span>
                <select
                  value={actionFilter}
                  onChange={(e) => {
                    setActionFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
                >
                  <option value="all">All Actions</option>
                  <option value="login">Login</option>
                  <option value="logout">Logout</option>
                  <option value="create">Create</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                  <option value="export">Export</option>
                  <option value="view">View</option>
                  <option value="permission_change">Permission Change</option>
                  <option value="settings_change">Settings Change</option>
                  <option value="password_reset">Password Reset</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 flex-shrink-0 text-[#999]" />
                <span className="text-xs font-bold text-[#666]">Module:</span>
                <select
                  value={moduleFilter}
                  onChange={(e) => {
                    setModuleFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
                >
                  {modules.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 flex-shrink-0 text-[#999]" />
                <span className="text-xs font-bold text-[#666]">User:</span>
                <select
                  value={userFilter}
                  onChange={(e) => {
                    setUserFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
                >
                  {users.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 flex-shrink-0 text-[#999]" />
                <span className="text-xs font-bold text-[#666]">Date:</span>
                <select
                  value={dateRange}
                  onChange={(e) => {
                    setDateRange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            {/* Active Filters Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#666]">
                <span className="font-semibold">{filteredLogs.length}</span>
                <span>results found</span>
                {(actionFilter !== "all" ||
                  moduleFilter !== "All Modules" ||
                  userFilter !== "All Users" ||
                  dateRange !== "all" ||
                  searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="ml-2 flex items-center gap-1 rounded-md bg-[#fef2f2] px-2 py-1 text-[10px] font-semibold text-[#dc2626] transition-colors hover:bg-[#fecaca]"
                  >
                    <XCircle className="h-3 w-3" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Audit Logs Table ───────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#666]">
                      <User className="h-3 w-3" />
                      User
                      <ArrowUpDown className="h-3 w-3 cursor-pointer hover:text-[#1a1a1a]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Module
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      IP Address
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Timestamp
                      <ArrowUpDown className="h-3 w-3 cursor-pointer hover:text-[#1a1a1a]" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-[#ccc]" />
                        <p className="text-sm font-semibold text-[#666]">
                          No audit logs match your filters
                        </p>
                        <button
                          onClick={resetFilters}
                          className="rounded-lg bg-[#0c831f] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0a6a18]"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log) => {
                    const action = actionConfig[log.action];
                    const isExpanded = expandedRow === log.id;
                    return (
                      <tr
                        key={log.id}
                        className="group transition-colors hover:bg-[#fafafa]"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f5e9] text-[10px] font-bold text-[#0c831f]">
                              {log.user.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#1a1a1a]">
                                {log.user}
                              </p>
                              <p className="text-[10px] font-medium text-[#999]">
                                {log.userRole}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${action.bg} ${action.text}`}
                          >
                            {action.icon}
                            <span className="text-[10px] font-black">
                              {action.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-md bg-[#f6f7f6] px-2 py-1 text-[11px] font-semibold text-[#666]">
                            {log.module}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <code className="rounded bg-[#f3f4f6] px-2 py-0.5 text-[11px] font-mono text-[#666]">
                            {log.ipAddress}
                          </code>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="text-sm text-[#666]">
                            {log.timestamp}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleRow(log.id)}
                              className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-[10px] font-semibold text-[#666] transition-colors hover:bg-[#f8f9fa]"
                            >
                              <Eye className="h-3 w-3" />
                              View
                              {isExpanded ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Expanded Row Detail */}
          {expandedRow !== null && (
            <div className="border-t border-[#e8e8e8] bg-[#fafafa] px-4 py-4">
              {(() => {
                const log = auditLogs.find((l) => l.id === expandedRow);
                if (!log) return null;
                const action = actionConfig[log.action];
                return (
                  <div className="space-y-4">
                    {/* Detail Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.bg} ${action.text}`}
                        >
                          {action.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">
                            {log.detail}
                          </p>
                          <p className="mt-0.5 text-xs text-[#999]">
                            Event ID: #{log.id} &middot;{" "}
                            {log.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Changes (if any) */}
                    {log.changes && log.changes.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#666]">
                          Changes Made
                        </p>
                        <div className="overflow-hidden rounded-lg border border-[#e8e8e8]">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="bg-[#f3f4f6]">
                                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#666]">
                                  Field
                                </th>
                                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#666]">
                                  From
                                </th>
                                <th className="px-3 py-2 text-[10px] font-black uppercase tracking-wide text-[#666]">
                                  To
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e8e8]">
                              {log.changes.map((change, idx) => (
                                <tr key={idx}>
                                  <td className="px-3 py-2 text-xs font-semibold text-[#1a1a1a]">
                                    {change.field}
                                  </td>
                                  <td className="px-3 py-2 text-xs text-[#dc2626]">
                                    <span className="rounded bg-[#fef2f2] px-1.5 py-0.5">
                                      {change.from}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-xs text-[#0c831f]">
                                    <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5">
                                      {change.to}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-xs text-[#999]">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        IP: {log.ipAddress}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Role: {log.userRole}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {log.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── Pagination ─────────────────────────────────────── */}
          <div className="flex items-center justify-between border-t border-[#e8e8e8] px-4 py-3">
            <p className="text-xs text-[#666]">
              Showing{" "}
              <span className="font-bold">
                {(currentPage - 1) * rowsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold">
                {Math.min(
                  currentPage * rowsPerPage,
                  filteredLogs.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-bold">{filteredLogs.length}</span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] transition-all hover:bg-[#f8f9fa] disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from(
                { length: Math.min(totalPages, 5) },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    currentPage === page
                      ? "bg-[#0c831f] text-white"
                      : "border border-[#e8e8e8] text-[#666] hover:bg-[#f8f9fa]"
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 5 && (
                <span className="px-1 text-xs text-[#999]">...</span>
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] transition-all hover:bg-[#f8f9fa] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
