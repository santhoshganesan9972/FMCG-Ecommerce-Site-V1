"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  FileText,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Trash2,
  Terminal,
  RefreshCw,
  Server,
  Database,
  Layers,
  Clock,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";

interface LogEntry {
  id: number;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  source: string;
  type: "server" | "database" | "queue" | "api" | "system";
  message: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  { id: 1, timestamp: "2026-05-21 14:32:18", level: "INFO", source: "api-gateway", type: "api", message: "GET /api/orders/ORD-8921 — 200 OK (42ms)", details: "User: rajesh@example.com | IP: 203.0.113.42" },
  { id: 2, timestamp: "2026-05-21 14:31:55", level: "WARN", source: "web-01", type: "server", message: "CPU usage exceeded 85% threshold", details: "Current: 89% | Process: node (PID 4512)" },
  { id: 3, timestamp: "2026-05-21 14:31:22", level: "INFO", source: "postgres-primary", type: "database", message: "Query completed — SELECT FROM orders WHERE status = 'pending'", details: "Duration: 124ms | Rows: 342" },
  { id: 4, timestamp: "2026-05-21 14:30:45", level: "ERROR", source: "payment-worker", type: "queue", message: "Failed to process payment for ORD-8919", details: "Error: Insufficient funds | Retry: 2/3" },
  { id: 5, timestamp: "2026-05-21 14:30:00", level: "INFO", source: "redis-cache", type: "system", message: "Cache invalidation completed for products:12,34,56", details: "Keys evicted: 1,240 | Duration: 8ms" },
  { id: 6, timestamp: "2026-05-21 14:29:30", level: "DEBUG", source: "search-indexer", type: "system", message: "Reindexing product catalog — batch 4/12", details: "Documents indexed: 8,500/24,000" },
  { id: 7, timestamp: "2026-05-21 14:28:45", level: "WARN", source: "postgres-replica", type: "database", message: "Replication lag detected — 15s behind primary", details: "Threshold: 5s | Last WAL: 0xAB12CD" },
  { id: 8, timestamp: "2026-05-21 14:28:00", level: "INFO", source: "email-queue", type: "queue", message: "Processed 240 emails from queue", details: "Delivered: 238 | Bounced: 2" },
  { id: 9, timestamp: "2026-05-21 14:27:15", level: "ERROR", source: "api-gateway", type: "api", message: "POST /api/payments — 503 Service Unavailable", details: "Upstream timeout: 30s | Client: stripe-webhook" },
  { id: 10, timestamp: "2026-05-21 14:26:30", level: "INFO", source: "web-02", type: "server", message: "Health check passed — /healthz 200", details: "Memory: 62% | CPU: 34% | Disk: 55%" },
  { id: 11, timestamp: "2026-05-21 14:25:00", level: "WARN", source: "cdn-edge", type: "system", message: "Cache hit rate dropped to 72%", details: "Previous: 88% | Origin requests: +22%" },
  { id: 12, timestamp: "2026-05-21 14:24:30", level: "INFO", source: "notification-worker", type: "queue", message: "WhatsApp notification sent to +91-9876543210", details: "Template: order_confirmed | Provider: Twilio" },
  { id: 13, timestamp: "2026-05-21 14:23:45", level: "DEBUG", source: "web-03", type: "server", message: "Request queue depth: 14", details: "Active requests: 8 | Waiting: 6" },
  { id: 14, timestamp: "2026-05-21 14:22:00", level: "INFO", source: "mongodb-primary", type: "database", message: "Slow query detected — db.products.aggregate()", details: "Duration: 2,340ms | Plan: COLLSCAN" },
  { id: 15, timestamp: "2026-05-21 14:20:30", level: "ERROR", source: "stripe-webhook", type: "api", message: "Webhook signature verification failed", details: "Signature: t=1716282030,v1=abc123... | Expected: v1=def456..." },
];

const levelConfig = {
  ERROR: { icon: XCircle, color: "text-[#b91c1c]", bg: "bg-[#fef2f2]" },
  WARN: { icon: AlertTriangle, color: "text-[#d97706]", bg: "bg-[#fffbeb]" },
  INFO: { icon: Info, color: "text-[#2563eb]", bg: "bg-[#eff6ff]" },
  DEBUG: { icon: Terminal, color: "text-[#666]", bg: "bg-[#f6f7f6]" },
};

const typeIcons: Record<string, typeof Server> = {
  server: Server,
  database: Database,
  queue: Layers,
  api: Terminal,
  system: FileText,
};

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState(false);

  const filteredLogs = mockLogs.filter((log) => {
    if (levelFilter !== "all" && log.level !== levelFilter) return false;
    if (typeFilter !== "all" && log.type !== typeFilter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase()) && !log.source.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
                System Logs
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Centralized log viewer for all system components. Filter by log level,
                source type, and search across messages to quickly diagnose issues.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                  autoRefresh
                    ? "bg-[#0c831f] text-white border-[#0c831f]"
                    : "bg-white text-[#1a1a1a] border-[#e8e8e8] hover:bg-[#f8f9fa]"
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? "animate-spin" : ""}`} />
                {autoRefresh ? "Live" : "Auto-refresh"}
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#b91c1c] hover:bg-[#fef2f2]">
                <Trash2 className="w-4 h-4" />
                Clear Logs
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search logs by message or source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] py-2 pl-10 pr-4 text-sm outline-none focus:border-[#ff4f8b] placeholder:text-[#999]"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2">
                <Filter className="h-4 w-4 text-[#666]" />
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="text-sm font-semibold text-[#1a1a1a] outline-none bg-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="ERROR">ERROR</option>
                  <option value="WARN">WARN</option>
                  <option value="INFO">INFO</option>
                  <option value="DEBUG">DEBUG</option>
                </select>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2">
                <Server className="h-4 w-4 text-[#666]" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="text-sm font-semibold text-[#1a1a1a] outline-none bg-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="server">Server</option>
                  <option value="database">Database</option>
                  <option value="queue">Queue</option>
                  <option value="api">API</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Log Counts */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["ERROR", "WARN", "INFO", "DEBUG"] as const).map((level) => {
            const count = filteredLogs.filter((l) => l.level === level).length;
            const config = levelConfig[level];
            return (
              <div key={level} className="rounded-xl border border-[#e8e8e8] bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <config.icon className={`h-4 w-4 ${config.color}`} />
                  <span className={`text-xs font-black uppercase ${config.color}`}>{level}</span>
                </div>
                <p className="mt-1 text-xl font-black text-[#1a1a1a]">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Log Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Log Entries</h2>
              <span className="rounded-full bg-[#f6f7f6] text-[#666] text-[10px] font-bold px-2 py-0.5">
                {filteredLogs.length} entries
              </span>
            </div>
            <span className="text-[10px] text-[#999] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: just now
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f6f7f6] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  const config = levelConfig[log.level];
                  const Icon = config.icon;
                  const TypeIcon = typeIcons[log.type];
                  return (
                    <tr key={log.id} className="border-b border-[#f0f0f0] last:border-b-0 text-sm hover:bg-[#f9fafb] transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-mono text-[#999]">{log.timestamp}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${config.bg} ${config.color}`}>
                          <Icon className="h-3 w-3" />
                          {log.level}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs text-[#666]">
                          <TypeIcon className="h-3.5 w-3.5" />
                          {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold text-[#1a1a1a]">{log.source}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${
                            log.level === "ERROR" ? "text-[#b91c1c]" :
                            log.level === "WARN" ? "text-[#d97706]" :
                            "text-[#1a1a1a]"
                          }`}>
                            {log.message}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {log.details && (
                          <span className="text-[10px] text-[#999] italic">{log.details}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredLogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Terminal className="h-12 w-12 text-[#999] mb-3" />
              <p className="text-sm font-bold text-[#1a1a1a]">No log entries match your filters</p>
              <p className="text-xs text-[#999] mt-1">Try adjusting the filter criteria</p>
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-[#f9fafb] p-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-black uppercase tracking-wide text-[#666]">Quick filters:</span>
            <button onClick={() => { setLevelFilter("ERROR"); setTypeFilter("all"); setSearchQuery(""); }} className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#b91c1c] hover:bg-[#fef2f2] transition-colors">
              <XCircle className="h-3 w-3 inline mr-1" />
              Errors only
            </button>
            <button onClick={() => { setLevelFilter("WARN"); setTypeFilter("all"); setSearchQuery(""); }} className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#d97706] hover:bg-[#fffbeb] transition-colors">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              Warnings only
            </button>
            <button onClick={() => { setLevelFilter("all"); setTypeFilter("database"); setSearchQuery(""); }} className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#2563eb] hover:bg-[#eff6ff] transition-colors">
              <Database className="h-3 w-3 inline mr-1" />
              Database logs
            </button>
            <button onClick={() => { setLevelFilter("all"); setTypeFilter("all"); setSearchQuery(""); }} className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f6f7f6] transition-colors">
              <RefreshCw className="h-3 w-3 inline mr-1" />
              Reset filters
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
