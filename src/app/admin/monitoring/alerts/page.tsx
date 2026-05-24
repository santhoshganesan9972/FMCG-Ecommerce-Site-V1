"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Bell,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Search,
  Filter,
  Download,
  CheckCheck,
  Clock,
  RefreshCw,
} from "lucide-react";

const alertHistory = [
  { id: 1, severity: "error", source: "API Gateway", message: "Rate limit exceeded on /api/orders — 503 responses detected", timestamp: "2026-05-21 14:32:00", acknowledged: false, category: "Performance" },
  { id: 2, severity: "warning", source: "Database", message: "PostgreSQL connection pool at 85% capacity", timestamp: "2026-05-21 14:15:00", acknowledged: false, category: "Infrastructure" },
  { id: 3, severity: "info", source: "Queue", message: "Email queue backlog cleared — 1,240 pending messages processed", timestamp: "2026-05-21 13:45:00", acknowledged: true, category: "System" },
  { id: 4, severity: "error", source: "Cache", message: "Redis cluster node us-east-2c unreachable — failover initiated", timestamp: "2026-05-21 12:20:00", acknowledged: true, category: "Infrastructure" },
  { id: 5, severity: "warning", source: "Server", message: "web-03 CPU usage sustained at 92% for 10 minutes", timestamp: "2026-05-21 11:55:00", acknowledged: false, category: "Performance" },
  { id: 6, severity: "info", source: "Deployment", message: "v3.2.1 rolled out to production — all health checks passing", timestamp: "2026-05-21 10:30:00", acknowledged: true, category: "System" },
  { id: 7, severity: "error", source: "Payment Gateway", message: "Stripe API returned 401 — invalid API key detected", timestamp: "2026-05-21 09:15:00", acknowledged: false, category: "Security" },
  { id: 8, severity: "warning", source: "Storage", message: "S3 bucket usage at 78% — cleanup recommended", timestamp: "2026-05-21 08:40:00", acknowledged: false, category: "Infrastructure" },
  { id: 9, severity: "info", source: "Monitoring", message: "Synthetic check /healthz passed in 42ms", timestamp: "2026-05-21 08:00:00", acknowledged: true, category: "System" },
  { id: 10, severity: "error", source: "Search", message: "Elasticsearch cluster yellow status — 2 unassigned shards", timestamp: "2026-05-20 23:15:00", acknowledged: false, category: "Infrastructure" },
  { id: 11, severity: "warning", source: "CDN", message: "Cloudflare edge cache hit rate dropped to 68%", timestamp: "2026-05-20 22:00:00", acknowledged: true, category: "Performance" },
  { id: 12, severity: "info", source: "Automation", message: "Daily DB backup completed — 4.2 GB, uploaded to S3", timestamp: "2026-05-20 03:00:00", acknowledged: true, category: "System" },
];

const severityConfig = {
  error: { icon: XCircle, color: "text-[#b91c1c]", bg: "bg-[#fef2f2]", border: "border-[#fecaca]", badge: "bg-[#fef2f2] text-[#b91c1c]" },
  warning: { icon: AlertTriangle, color: "text-[#d97706]", bg: "bg-[#fffbeb]", border: "border-[#fde68a]", badge: "bg-[#fffbeb] text-[#d97706]" },
  info: { icon: Info, color: "text-[#2563eb]", bg: "bg-[#eff6ff]", border: "border-[#bfdbfe]", badge: "bg-[#eff6ff] text-[#2563eb]" },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertHistory);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [ackFilter, setAckFilter] = useState<string>("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter !== "all" && alert.severity !== severityFilter) return false;
    if (ackFilter === "acknowledged" && !alert.acknowledged) return false;
    if (ackFilter === "unacknowledged" && alert.acknowledged) return false;
    if (searchQuery && !alert.message.toLowerCase().includes(searchQuery.toLowerCase()) && !alert.source.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleAcknowledge = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a)));
  };

  const acknowledgeAll = () => {
    setAlerts(alerts.map((a) => ({ ...a, acknowledged: true })));
  };

  const unackCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <Link
              href="/admin/monitoring"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa]"
            >
              <ArrowLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Link>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">
                System Monitoring
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Alert History
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                View, filter, and manage all system alerts. Acknowledge resolved
                issues and investigate errors with full context.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {unackCount > 0 && (
                <button
                  onClick={acknowledgeAll}
                  className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
                >
                  <CheckCheck className="w-4 h-4" />
                  Acknowledge All ({unackCount})
                </button>
              )}
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Alerts", value: alerts.length, color: "text-[#1a1a1a]", bg: "bg-[#f6f7f6]" },
            { label: "Unacknowledged", value: unackCount, color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
            { label: "Errors", value: alerts.filter((a) => a.severity === "error").length, color: "text-[#b91c1c]", bg: "bg-[#fef2f2]" },
            { label: "Warnings", value: alerts.filter((a) => a.severity === "warning").length, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <p className="text-[10px] font-semibold text-[#666]">{stat.label}</p>
              <p className={`mt-1 text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search alerts by message or source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] py-2 pl-10 pr-4 text-sm outline-none focus:border-[#ff4f8b] placeholder:text-[#999]"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2">
                <Filter className="h-4 w-4 text-[#666]" />
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="text-sm font-semibold text-[#1a1a1a] outline-none bg-transparent"
                >
                  <option value="all">All Severities</option>
                  <option value="error">Errors</option>
                  <option value="warning">Warnings</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2">
                <CheckCircle className="h-4 w-4 text-[#666]" />
                <select
                  value={ackFilter}
                  onChange={(e) => setAckFilter(e.target.value)}
                  className="text-sm font-semibold text-[#1a1a1a] outline-none bg-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="unacknowledged">Unacknowledged</option>
                  <option value="acknowledged">Acknowledged</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Alert List */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">
                Alerts
                {severityFilter !== "all" && (
                  <span className="ml-2 text-[10px] font-bold text-[#666]">
                    filtered by {severityFilter}
                  </span>
                )}
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#999]">
              {filteredAlerts.length} of {alerts.length} alerts
            </span>
          </div>

          <div className="divide-y divide-[#e8e8e8]">
            {filteredAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="h-12 w-12 text-[#0c831f] mb-3" />
                <p className="text-sm font-bold text-[#1a1a1a]">No alerts match your filters</p>
                <p className="text-xs text-[#999] mt-1">Try adjusting the filter criteria</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const config = severityConfig[alert.severity as keyof typeof severityConfig];
                const Icon = config.icon;
                return (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#f9fafb] ${
                      alert.acknowledged ? "opacity-60" : ""
                    }`}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${config.badge}`}>
                          {alert.severity}
                        </span>
                        <span className="text-xs font-bold text-[#666]">{alert.source}</span>
                        <span className="text-[10px] text-[#999]">·</span>
                        <span className="text-[10px] font-medium text-[#999]">{alert.category}</span>
                        <span className="text-[10px] text-[#999]">·</span>
                        <span className="flex items-center gap-1 text-[10px] text-[#999]">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className={`mt-1 text-sm font-semibold leading-relaxed ${
                        alert.acknowledged ? "text-[#999] line-through" : "text-[#1a1a1a]"
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!alert.acknowledged && (
                        <button
                          onClick={() => toggleAcknowledge(alert.id)}
                          className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#0c831f] hover:bg-[#e8f5e9] hover:border-[#0c831f]/30 transition-colors"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Acknowledge
                        </button>
                      )}
                      <button
                        onClick={() => toggleAcknowledge(alert.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#999] hover:bg-[#f8f9fa] transition-colors"
                        title={alert.acknowledged ? "Mark as unacknowledged" : "Acknowledge"}
                      >
                        {alert.acknowledged ? (
                          <RefreshCw className="h-3.5 w-3.5" />
                        ) : (
                          <CheckCircle className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Info Card */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-[#eff6ff] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/10">
              <Bell className="h-5 w-5 text-[#2563eb]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Alert Management</p>
              <p className="mt-1 text-sm text-[#666]">
                Acknowledged alerts are hidden from the main monitoring dashboard but remain visible here
                for historical reference. Export alert data for compliance and post-mortem analysis.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
