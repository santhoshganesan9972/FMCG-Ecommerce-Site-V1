"use client";

import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader, ReusableTimeline, ReusableSearchBar, ReusableFilterPanel, ReusableExportButton } from "@/components/reusable/reusable-components";
import { mockAdminProducts } from "@/data/admin/products";
import { Plus, BarChart3, Copy, History as HistoryIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const actionIcons: Record<string, React.ReactNode> = {
  created: <Plus className="w-3 h-3 text-white" />,
  price_changed: <BarChart3 className="w-3 h-3 text-white" />,
  stock_updated: <RefreshCw className="w-3 h-3 text-white" />,
  status_changed: <HistoryIcon className="w-3 h-3 text-white" />,
  updated: <RefreshCw className="w-3 h-3 text-white" />,
  deleted: <Plus className="w-3 h-3 text-white" />,
};

const actionVariants: Record<string, "success" | "info" | "warning" | "danger" | "neutral"> = {
  created: "success",
  price_changed: "warning",
  stock_updated: "info",
  status_changed: "danger",
  updated: "info",
  deleted: "danger",
};

const filterGroups = [
  {
    label: "Action Type",
    key: "action",
    type: "select" as const,
    options: [
      { label: "Created", value: "created" },
      { label: "Updated", value: "updated" },
      { label: "Price Changed", value: "price_changed" },
      { label: "Stock Updated", value: "stock_updated" },
      { label: "Status Changed", value: "status_changed" },
      { label: "Deleted", value: "deleted" },
    ],
  },
  {
    label: "Performed By",
    key: "performer",
    type: "text" as const,
    placeholder: "Enter name",
  },
];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const allEvents = mockAdminProducts.flatMap((p) =>
    p.history.map((h) => ({
      ...h,
      productName: p.name,
    }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const filteredEvents = allEvents.filter((e) => {
    if (search && !e.productName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.action && e.action !== filters.action) return false;
    if (filters.performer && !e.performedBy.toLowerCase().includes(filters.performer.toLowerCase())) return false;
    return true;
  });

  const timelineEvents = filteredEvents.map((e) => ({
    id: e.id,
    title: `${e.productName} — ${e.action.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}`,
    description: e.field
      ? `${e.field}: ${e.oldValue} → ${e.newValue}`
      : undefined,
    timestamp: e.timestamp,
    icon: actionIcons[e.action],
    variant: actionVariants[e.action] || ("info" as const),
  }));

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="Audit Logs"
          subtitle="Track all changes made to products including price updates, stock changes, and status modifications."
          breadcrumb="PRODUCT MANAGEMENT"
          actions={
            <ReusableExportButton onExport={(fmt) => toast.success(`Exporting audit logs as ${fmt.toUpperCase()}`)} />
          }
        />

        <div className="flex items-center gap-3">
          <ReusableSearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by product name..."
            className="flex-1 max-w-md"
          />
          <ReusableFilterPanel
            groups={filterGroups}
            values={filters}
            onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
            onClear={() => setFilters({})}
            activeCount={Object.keys(filters).length}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Events", value: allEvents.length, color: "text-[#0c831f]" },
            { label: "Price Changes", value: allEvents.filter((e) => e.action === "price_changed").length, color: "text-amber-500" },
            { label: "Stock Updates", value: allEvents.filter((e) => e.action === "stock_updated").length, color: "text-blue-500" },
            { label: "Status Changes", value: allEvents.filter((e) => e.action === "status_changed").length, color: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
              <p className="text-[10px] font-bold text-[#999] uppercase tracking-wide">{stat.label}</p>
              <p className={`text-xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-black text-[#1a1a1a]">Activity Timeline</h3>
            <p className="text-xs text-[#666] mt-0.5">Showing {timelineEvents.length} of {allEvents.length} events</p>
          </div>
          <div className="max-h-[500px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}>
            <ReusableTimeline
              events={timelineEvents}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
