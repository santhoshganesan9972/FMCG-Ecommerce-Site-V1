"use client";

import React, { useState } from "react";
import { X, ChevronDown, Search, Filter } from "lucide-react";

// ── Reusable Drawer ───────────────────────────────────────

interface ReusableDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const drawerWidths: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function ReusableDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "md",
  className = "",
}: ReusableDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${drawerWidths[width]} bg-white shadow-2xl animate-in slide-in-from-right h-full flex flex-col ${className}`}
      >
        <div className="flex items-start justify-between border-b border-[#e8e8e8] px-5 py-4">
          <div>
            <h2 className="text-lg font-black text-[#1a1a1a]">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-[#666]">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-[#e8e8e8] bg-[#f9fafb] px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Reusable Status Badge ─────────────────────────────────

interface ReusableStatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "draft";
  className?: string;
}

const badgeVariants: Record<string, string> = {
  success: "bg-[#e8f5e9] text-[#0c831f]",
  warning: "bg-[#fffbeb] text-amber-600",
  danger: "bg-[#fef2f2] text-red-600",
  info: "bg-[#eff7ff] text-blue-600",
  neutral: "bg-[#f6f7f6] text-[#666]",
  draft: "bg-[#f3f0ff] text-purple-600",
};

export function ReusableStatusBadge({ status, variant, className = "" }: ReusableStatusBadgeProps) {
  const resolvedVariant = variant || getStatusVariant(status);
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeVariants[resolvedVariant]} ${className}`}>
      {status}
    </span>
  );
}

function getStatusVariant(status: string): string {
  const s = status.toLowerCase().replace(/\s+/g, "_");
  if (["active", "completed", "delivered", "paid", "confirmed", "online", "in_stock"].includes(s)) return "success";
  if (["pending", "processing", "reminded", "in_progress", "busy"].includes(s)) return "warning";
  if (["inactive", "cancelled", "failed", "blocked", "out_of_stock", "suspended", "lost", "offline"].includes(s)) return "danger";
  if (["draft", "new"].includes(s)) return "draft";
  return "neutral";
}

// ── Reusable Search Bar ───────────────────────────────────

interface ReusableSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
}

export function ReusableSearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  onClear,
}: ReusableSearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-10 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none transition-colors"
      />
      {value && (
        <button
          onClick={() => { onChange(""); onClear?.(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#1a1a1a] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ── Reusable Filter Panel ─────────────────────────────────

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  key: string;
  type: "select" | "text" | "number";
  options?: FilterOption[];
  placeholder?: string;
}

interface ReusableFilterPanelProps {
  groups: FilterGroup[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  activeCount?: number;
  className?: string;
}

export function ReusableFilterPanel({
  groups,
  values,
  onChange,
  onClear,
  activeCount = 0,
  className = "",
}: ReusableFilterPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] transition-colors"
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0c831f] text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-72 rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-lg animate-in fade-in zoom-in-95">
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.key}>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">{group.label}</label>
                {group.type === "select" ? (
                  <select
                    value={values[group.key] || ""}
                    onChange={(e) => onChange(group.key, e.target.value)}
                    className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
                  >
                    <option value="">All</option>
                    {group.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={group.type}
                    value={values[group.key] || ""}
                    onChange={(e) => onChange(group.key, e.target.value)}
                    placeholder={group.placeholder}
                    className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="mt-3 w-full rounded-lg bg-[#f6f7f6] px-3 py-2 text-xs font-bold text-[#666] hover:bg-[#e8e8e8] transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Reusable Confirmation Dialog ──────────────────────────

interface ReusableConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export function ReusableConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ReusableConfirmationDialogProps) {
  if (!open) return null;

  const confirmColors = {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-amber-500 hover:bg-amber-600",
    info: "bg-[#0c831f] hover:bg-[#0a6a18]",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <div className="text-center">
          <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
            variant === "danger" ? "bg-red-100" : variant === "warning" ? "bg-amber-100" : "bg-[#e8f5e9]"
          }`}>
            {variant === "danger" ? (
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            ) : variant === "warning" ? (
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#0c831f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-black text-[#1a1a1a]">{title}</h3>
          <p className="mt-2 text-sm text-[#666]">{message}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] disabled:opacity-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-colors ${confirmColors[variant]}`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Reusable Analytics Card ───────────────────────────────

interface ReusableAnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
  onClick?: () => void;
}

export function ReusableAnalyticsCard({
  title,
  value,
  change,
  subtitle,
  icon,
  trend = "neutral",
  className = "",
  onClick,
}: ReusableAnalyticsCardProps) {
  const trendColors = {
    up: "text-[#0c831f]",
    down: "text-red-500",
    neutral: "text-[#999]",
  };

  return (
    <div
      className={`rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? "cursor-pointer hover:-translate-y-0.5" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-bold text-[#999] uppercase tracking-wide">{title}</p>
        {icon && <div className="text-[#0c831f]/80">{icon}</div>}
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-[#1a1a1a] mt-1">{value}</h3>
      <div className="flex items-center gap-2 mt-1.5">
        {change && (
          <span className={`text-[10px] sm:text-xs font-black ${trendColors[trend]}`}>
            {change}
          </span>
        )}
        {subtitle && <span className="text-[10px] text-[#999]">{subtitle}</span>}
      </div>
    </div>
  );
}

// ── Reusable Export Button ────────────────────────────────

interface ReusableExportButtonProps {
  onExport: (format: "csv" | "xlsx" | "pdf") => void;
  className?: string;
  formats?: ("csv" | "xlsx" | "pdf")[];
}

export function ReusableExportButton({
  onExport,
  className = "",
  formats = ["csv", "xlsx", "pdf"],
}: ReusableExportButtonProps) {
  const [open, setOpen] = useState(false);

  const formatLabels: Record<string, string> = {
    csv: "CSV",
    xlsx: "Excel",
    pdf: "PDF",
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-36 rounded-xl border border-[#e8e8e8] bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95">
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => { onExport(fmt); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#666] hover:bg-[#f6f7f6] hover:text-[#1a1a1a] transition-colors"
            >
              {formatLabels[fmt]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Reusable Bulk Action Toolbar ──────────────────────────

interface ReusableBulkActionToolbarProps {
  selectedCount: number;
  actions: { label: string; icon: React.ReactNode; onClick: () => void; variant?: "default" | "danger" }[];
  onClear: () => void;
  className?: string;
}

export function ReusableBulkActionToolbar({
  selectedCount,
  actions,
  onClear,
  className = "",
}: ReusableBulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={`flex items-center gap-3 rounded-xl border border-[#0c831f]/30 bg-[#f0fdf4] px-4 py-3 animate-in fade-in ${className}`}>
      <span className="text-sm font-bold text-[#0c831f]">
        {selectedCount} selected
      </span>
      <div className="flex items-center gap-2 ml-auto">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              action.variant === "danger"
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-white text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f] border border-[#e8e8e8]"
            }`}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#e8e8e8] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
    </div>
  );
}

// ── Reusable Timeline ─────────────────────────────────────

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
}

interface ReusableTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const timelineVariants: Record<string, string> = {
  success: "bg-[#0c831f]",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-[#ccc]",
};

export function ReusableTimeline({ events, className = "" }: ReusableTimelineProps) {
  return (
    <div className={`space-y-0 ${className}`}>
      {events.map((event, i) => (
        <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Line */}
          {i < events.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-[#e8e8e8]" />
          )}
          {/* Dot */}
          <div className={`relative z-10 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
            event.icon ? timelineVariants[event.variant || "neutral"] : "border-2 border-[#e8e8e8] bg-white"
          }`}>
            {event.icon || (
              <div className={`h-2 w-2 rounded-full ${timelineVariants[event.variant || "neutral"]}`} />
            )}
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1a1a1a]">{event.title}</p>
            {event.description && (
              <p className="mt-0.5 text-xs text-[#666]">{event.description}</p>
            )}
            <p className="mt-1 text-[10px] text-[#999]">{event.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Reusable Date Picker ──────────────────────────────────

interface ReusableDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  min?: string;
  max?: string;
}

export function ReusableDatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  className = "",
  min,
  max,
}: ReusableDatePickerProps) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-xs font-bold text-[#666]">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className="w-full rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none transition-colors"
      />
    </div>
  );
}

// ── Reusable Image Uploader ───────────────────────────────

interface ReusableImageUploaderProps {
  images: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxFiles?: number;
  className?: string;
}

export function ReusableImageUploader({
  images,
  onAdd,
  onRemove,
  maxFiles = 5,
  className = "",
}: ReusableImageUploaderProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-5 gap-3">
        {images.map((img, i) => (
          <div key={i} className="group relative aspect-square rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] overflow-hidden">
            <img src={img} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => onRemove(i)}
                className="rounded-lg bg-white p-1.5 text-red-500 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {images.length < maxFiles && (
          <button
            onClick={onAdd}
            className="aspect-square rounded-xl border-2 border-dashed border-[#e8e8e8] bg-[#f6f7f6] flex items-center justify-center hover:border-[#0c831f] transition-colors"
          >
            <svg className="w-6 h-6 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-[#999]">{images.length}/{maxFiles} images uploaded</p>
    </div>
  );
}

// ── Reusable Chart Wrapper ────────────────────────────────

interface ReusableChartProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  height?: number;
  action?: React.ReactNode;
}

export function ReusableChart({
  title,
  subtitle,
  children,
  className = "",
  height = 300,
  action,
}: ReusableChartProps) {
  return (
    <div className={`rounded-2xl border border-[#e8e8e8] bg-white p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-black text-[#1a1a1a]">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-[#666]">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}

// ── Reusable Form Section ─────────────────────────────────

interface ReusableFormSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ReusableFormSection({
  title,
  subtitle,
  children,
  className = "",
}: ReusableFormSectionProps) {
  return (
    <div className={`rounded-xl border border-[#e8e8e8] bg-white p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm font-black text-[#1a1a1a]">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-[#666]">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Reusable Kanban Board ─────────────────────────────────

interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  color: string;
  items: { id: string; title: string; subtitle?: string; badges?: { label: string; variant?: string }[]; }[];
}

interface ReusableKanbanBoardProps {
  columns: KanbanColumn[];
  onItemClick?: (columnId: string, itemId: string) => void;
  onDragEnd?: (columnId: string, itemId: string, fromIndex: number, toIndex: number) => void;
  className?: string;
}

export function ReusableKanbanBoard({ columns, onItemClick, className = "" }: ReusableKanbanBoardProps) {
  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`} style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
      {columns.map((col) => (
        <div key={col.id} className="min-w-[280px] max-w-[320px] flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
              <h3 className="text-sm font-black text-[#1a1a1a]">{col.title}</h3>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f0f0] text-[10px] font-bold text-[#666]">{col.count}</span>
          </div>
          <div className="space-y-2">
            {col.items.map((item) => (
              <div
                key={item.id}
                onClick={() => onItemClick?.(col.id, item.id)}
                className="cursor-pointer rounded-xl border border-[#e8e8e8] bg-white p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <p className="text-sm font-bold text-[#1a1a1a]">{item.title}</p>
                {item.subtitle && <p className="mt-1 text-xs text-[#666]">{item.subtitle}</p>}
                {item.badges && item.badges.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.badges.map((badge, i) => (
                      <span key={i} className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        badge.variant === "success" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        badge.variant === "warning" ? "bg-[#fffbeb] text-amber-600" :
                        badge.variant === "danger" ? "bg-[#fef2f2] text-red-600" :
                        "bg-[#f6f7f6] text-[#666]"
                      }`}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Reusable Form ─────────────────────────────────────────

interface FormFieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "email" | "select" | "textarea" | "date" | "password";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  className?: string;
  defaultValue?: string;
}

interface ReusableFormProps {
  fields: FormFieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: (values: Record<string, string>) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  columns?: 1 | 2 | 3;
  className?: string;
  loading?: boolean;
}

const formInputClass =
  "h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none transition focus:border-[#0c831f] placeholder:text-[#999]";

const formGridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function ReusableForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  columns = 2,
  className = "",
  loading = false,
}: ReusableFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className={`grid ${formGridCols[columns]} gap-4`}>
        {fields.map((field) => (
          <div key={field.key} className={field.className || ""}>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">
              {field.label}
              {field.required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
                className="w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#0c831f] placeholder:text-[#999]"
              />
            ) : field.type === "select" ? (
              <select
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                required={field.required}
                className={formInputClass}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className={formInputClass}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] transition-colors"
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

// ── Reusable Page Header ──────────────────────────────────

// Standalone ReusablePagination for use outside of ReusableTable
interface ReusablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

const pageSizeOptions = [10, 25, 50, 100];

export function ReusablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  className = "",
}: ReusablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }
    return Array.from({ length: 5 }, (_, i) => page - 2 + i);
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 border-t border-[#e8e8e8] bg-[#f9fafb] px-4 py-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs text-[#666]">
        <span>Show</span>
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-[#e8e8e8] bg-white px-2 py-1 text-xs font-semibold text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        )}
        <span>of {total} items</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              page === pageNum
                ? "bg-[#0c831f] text-white"
                : "text-[#666] hover:bg-[#f0f0f0]"
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f0f0f0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

interface ReusablePageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function ReusablePageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  className = "",
}: ReusablePageHeaderProps) {
  return (
    <div className={`rounded-2xl border border-[#e8e8e8] bg-white p-5 sm:p-6 ${className}`}>
      {breadcrumb && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#0c831f] mb-1">{breadcrumb}</p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1a1a1a]">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-sm text-[#666]">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
