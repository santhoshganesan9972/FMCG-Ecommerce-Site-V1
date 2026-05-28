"use client";

import { useState, useMemo } from "react";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusablePagination from "@/components/ui/admin/reusable-pagination";
import type { AuditLog, AuditAction, AuditEntity } from "@/types/settings";
import {
  Search,
  Filter,
  X,
  History,
  User,
  Settings,
  Shield,
  CreditCard,
  Landmark,
  Bell,
  Flag,
  Key,
  Palette,
  Sliders,
  FileText,
  LogIn,
  LogOut,
  Download,
  Upload,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

interface AuditLogTableProps {
  logs: AuditLog[];
  loading?: boolean;
  error?: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  actionFilter: string;
  onActionFilterChange: (value: string) => void;
  entityFilter: string;
  onEntityFilterChange: (value: string) => void;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  uniqueActions: string[];
  uniqueEntities: string[];
}

const entityIcons: Record<string, React.ReactNode> = {
  user: <User className="h-3.5 w-3.5" />,
  role: <Shield className="h-3.5 w-3.5" />,
  settings: <Settings className="h-3.5 w-3.5" />,
  payment: <CreditCard className="h-3.5 w-3.5" />,
  tax: <Landmark className="h-3.5 w-3.5" />,
  feature_flag: <Flag className="h-3.5 w-3.5" />,
  api_key: <Key className="h-3.5 w-3.5" />,
  theme: <Palette className="h-3.5 w-3.5" />,
  system_config: <Sliders className="h-3.5 w-3.5" />,
  notification_config: <Bell className="h-3.5 w-3.5" />,
};

const actionIcons: Record<string, React.ReactNode> = {
  create: <Plus className="h-3 w-3" />,
  update: <Pencil className="h-3 w-3" />,
  delete: <Trash2 className="h-3 w-3" />,
  login: <LogIn className="h-3 w-3" />,
  logout: <LogOut className="h-3 w-3" />,
  export: <Download className="h-3 w-3" />,
  import: <Upload className="h-3 w-3" />,
  config_change: <Settings className="h-3 w-3" />,
};

const actionBadgeVariants: Record<string, string> = {
  create: "bg-[#e8f5e9] text-[#0c831f]",
  update: "bg-[#eff7ff] text-blue-600",
  delete: "bg-[#fef2f2] text-red-600",
  login: "bg-[#f3f0ff] text-purple-600",
  logout: "bg-[#f6f7f6] text-[#666]",
  export: "bg-[#fffbeb] text-amber-600",
  import: "bg-[#e8f5e9] text-[#0c831f]",
  config_change: "bg-[#eff7ff] text-blue-600",
};

export default function AuditLogTable({
  logs,
  loading,
  error,
  search,
  onSearchChange,
  actionFilter,
  onActionFilterChange,
  entityFilter,
  onEntityFilterChange,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  uniqueActions,
  uniqueEntities,
}: AuditLogTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  const hasFilters = actionFilter !== "all" || entityFilter !== "all" || !!search;

  // Determine if there are active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (actionFilter !== "all") count++;
    if (entityFilter !== "all") count++;
    if (search) count++;
    return count;
  }, [actionFilter, entityFilter, search]);

  const clearFilters = () => {
    onActionFilterChange("all");
    onEntityFilterChange("all");
    onSearchChange("");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <History className="h-6 w-6 text-red-500" />
        </div>
        <p className="text-sm font-bold text-red-600">Failed to load audit logs</p>
        <p className="mt-1 text-xs text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <ReusableSearchBar
            value={search}
            onChange={onSearchChange}
            placeholder="Search by user, details, or entity..."
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
            hasFilters
              ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
              : "border-[#e8e8e8] text-[#666] hover:bg-[#f6f7f6]"
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0c831f] text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
          <div className="min-w-[160px] flex-1">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#666]">
              Action
            </label>
            <select
              value={actionFilter}
              onChange={(e) => { onActionFilterChange(e.target.value); onPageChange(1); }}
              className="w-full rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>
                  {action.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[160px] flex-1">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-[#666]">
              Entity
            </label>
            <select
              value={entityFilter}
              onChange={(e) => { onEntityFilterChange(e.target.value); onPageChange(1); }}
              className="w-full rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="all">All Entities</option>
              {uniqueEntities.map((entity) => (
                <option key={entity} value={entity}>
                  {entity.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          {hasFilters && (
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-xs font-semibold text-[#666] hover:bg-[#f6f7f6]"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#0c831f] border-t-transparent" />
            <p className="mt-2 text-sm text-[#666]">Loading audit logs...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f7f6]">
              <History className="h-6 w-6 text-[#ccc]" />
            </div>
            <p className="text-sm font-bold text-[#666]">No audit logs found</p>
            <p className="mt-1 text-xs text-[#999]">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Performed By</th>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {logs.map((log) => (
                  <tr key={log.id} className="text-sm hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          actionBadgeVariants[log.action] || "bg-[#f6f7f6] text-[#666]"
                        }`}
                      >
                        {actionIcons[log.action]}
                        {log.action.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#666]">
                          {entityIcons[log.entity]}
                        </span>
                        <span className="text-xs font-medium text-[#666] capitalize">
                          {log.entity.replace("_", " ")}
                        </span>
                        {log.entityName && (
                          <span className="text-[10px] text-[#999]">({log.entityName})</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-[280px]">
                        <p className="text-xs text-[#1a1a1a] line-clamp-2">{log.details || "—"}</p>
                        {log.changes && log.changes.length > 0 && (
                          <div className="mt-1 space-y-0.5">
                            {log.changes.slice(0, 2).map((change, i) => (
                              <p key={i} className="text-[10px] font-mono text-[#999]">
                                {change.field}: {change.oldValue || "—"} → {change.newValue || "—"}
                              </p>
                            ))}
                            {log.changes.length > 2 && (
                              <p className="text-[10px] text-[#0c831f]">+{log.changes.length - 2} more</p>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0c831f]/10 text-[9px] font-bold text-[#0c831f]">
                          {log.performedBy.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-[#1a1a1a]">{log.performedBy}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[10px] font-mono text-[#999]">{log.ipAddress || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-[10px] text-[#999]">
                        {new Date(log.timestamp).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ReusablePagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
