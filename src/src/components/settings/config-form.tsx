"use client";

import { useState, useCallback } from "react";import {
  Save, X, Eye, EyeOff, Loader2, Settings, Sliders
} from "lucide-react";
import { toast } from "sonner";
import type { SystemConfig } from "@/types/settings";

interface ConfigFormProps {
  configs: SystemConfig[];
  loading?: boolean;
  error?: string | null;
  onUpdate: (key: string, value: string | number | boolean) => Promise<boolean>;
  categoryFilter?: string;
  onCategoryFilterChange?: (value: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
}

const categoryColors: Record<string, string> = {
  general: "bg-blue-100 text-blue-700",
  security: "bg-red-100 text-red-700",
  performance: "bg-green-100 text-green-700",
  integration: "bg-purple-100 text-purple-700",
  localization: "bg-amber-100 text-amber-700",
};

const categories = [
  { value: "all", label: "All Categories" },
  { value: "general", label: "General" },
  { value: "security", label: "Security" },
  { value: "performance", label: "Performance" },
  { value: "integration", label: "Integration" },
  { value: "localization", label: "Localization" },
];

export default function ConfigForm({
  configs,
  loading,
  error,
  onUpdate,
  categoryFilter = "all",
  onCategoryFilterChange,
  search = "",
  onSearchChange,
}: ConfigFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string | number | boolean>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [showEncrypted, setShowEncrypted] = useState<Record<string, boolean>>({});

  const handleEdit = useCallback((config: SystemConfig) => {
    setEditingId(config.id);
    setEditValues((prev) => ({
      ...prev,
      [config.key]: config.value,
    }));
  }, []);

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setEditValues({});
  }, []);

  const handleSave = useCallback(
    async (config: SystemConfig) => {
      setSavingId(config.id);
      try {
        const success = await onUpdate(config.key, editValues[config.key] ?? config.value);
        if (success) {
          toast.success(`${config.label} updated successfully`);
          setEditingId(null);
        } else {
          toast.error(`Failed to update ${config.label}`);
        }
      } catch {
        toast.error(`Failed to update ${config.label}`);
      } finally {
        setSavingId(null);
      }
    },
    [editValues, onUpdate]
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <Settings className="h-6 w-6 text-red-500" />
        </div>
        <p className="text-sm font-bold text-red-600">Failed to load configurations</p>
        <p className="mt-1 text-xs text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Category Filter Tabs */}
      {onCategoryFilterChange && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryFilterChange(cat.value)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                categoryFilter === cat.value
                  ? "bg-[#0c831f] text-white shadow-sm"
                  : "border border-[#e8e8e8] bg-white text-[#666] hover:bg-[#f6f7f6]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      {onSearchChange && (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search configurations by name, key, or description..."
            className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#1a1a1a]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Config Cards */}
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#0c831f]" />
        </div>
      ) : configs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f7f6]">
            <Sliders className="h-6 w-6 text-[#ccc]" />
          </div>
          <p className="text-sm font-bold text-[#666]">No configurations found</p>
          <p className="mt-1 text-xs text-[#999]">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {configs.map((config) => {
            const isEditing = editingId === config.id;
            const isSaving = savingId === config.id;
            const currentValue = editValues[config.key] ?? config.value;

            return (
              <div
                key={config.id}
                className={`rounded-xl border bg-white p-4 transition-all hover:shadow-sm ${
                  isEditing ? "border-[#0c831f] ring-1 ring-[#0c831f]/20" : "border-[#e8e8e8]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${categoryColors[config.category] || "bg-[#f6f7f6] text-[#666]"}`}>
                        {config.category.replace("_", " ")}
                      </span>
                      {config.isEncrypted && (
                        <span className="rounded bg-[#fef2f2] px-1.5 py-0.5 text-[10px] font-bold text-red-500">
                          Encrypted
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-bold text-[#1a1a1a]">{config.label}</p>
                    <p className="mt-0.5 text-xs text-[#666]">{config.description}</p>
                    <code className="mt-1 block text-[10px] font-mono text-[#999]">{config.key}</code>
                  </div>

                  {!config.isEditable && (
                    <span className="shrink-0 rounded bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-bold text-[#999]">
                      Read-only
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      {config.type === "boolean" ? (
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={!!currentValue}
                            onChange={(e) =>
                              setEditValues((prev) => ({ ...prev, [config.key]: e.target.checked }))
                            }
                            className="peer sr-only"
                          />
                          <div className="h-6 w-11 rounded-full bg-[#e8e8e8] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-[#0c831f] peer-checked:after:translate-x-full" />
                        </label>
                      ) : config.type === "select" ? (
                        <select
                          value={String(currentValue)}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, [config.key]: e.target.value }))
                          }
                          className="h-10 w-full rounded-lg border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
                        >
                          {config.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="relative">
                          <input
                            type={config.isEncrypted && !showEncrypted[config.id] ? "password" : "text"}
                            value={String(currentValue)}
                            onChange={(e) =>
                              setEditValues((prev) => ({ ...prev, [config.key]: e.target.value }))
                            }
                            className="h-10 w-full rounded-lg border border-[#e8e8e8] bg-white px-3 pr-10 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
                          />
                          {config.isEncrypted && (
                            <button
                              onClick={() =>
                                setShowEncrypted((prev) => ({ ...prev, [config.id]: !prev[config.id] }))
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#1a1a1a]"
                            >
                              {showEncrypted[config.id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {config.type === "boolean" ? (
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                            config.value ? "text-[#0c831f]" : "text-[#999]"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${config.value ? "bg-[#0c831f]" : "bg-[#ccc]"}`}
                          />
                          {String(config.value)}
                        </span>
                      ) : (
                        <code className="text-xs font-mono font-semibold text-[#1a1a1a]">
                          {config.isEncrypted
                            ? "••••••••••••••••"
                            : String(config.value)}
                        </code>
                      )}
                      {config.updatedBy && (
                        <span className="text-[10px] text-[#999]">
                          · Updated by {config.updatedBy}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {config.isEditable && (
                  <div className="mt-3 flex justify-end gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f6f7f6]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(config)}
                          disabled={isSaving}
                          className="flex items-center gap-1.5 rounded-lg bg-[#0c831f] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50"
                        >
                          {isSaving ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Save className="h-3 w-3" />
                          )}
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(config)}
                        className="rounded-lg bg-[#f6f7f6] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#e8e8e8]"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

