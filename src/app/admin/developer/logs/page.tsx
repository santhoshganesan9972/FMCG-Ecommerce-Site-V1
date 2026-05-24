"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Search, Filter, Download, Terminal, AlertTriangle, Info, Bug, XCircle, RefreshCw, Clock, FileText } from "lucide-react";
import { toast } from "sonner";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  service: string;
  message: string;
  source: string;
  traceId: string;
}

const mockLogs: LogEntry[] = Array.from({ length: 50 }, (_, i) => {
  const levels: LogEntry["level"][] = ["info", "info", "info", "warn", "info", "error", "debug", "info", "warn", "info"];
  const services = ["api-gateway", "order-service", "payment-service", "notification-service", "auth-service", "inventory-service", "search-service", "delivery-service"];
  const messages = [
    "Request processed successfully",
    "Database query completed in 45ms",
    "User authentication verified",
    "Payment gateway response received",
    "Cache miss for key: product_1234",
    "Connection pool exhausted - retrying",
    "New order created: ORD-2026-100",
    "Redis connection re-established",
    "Rate limit exceeded for IP 103.xx.xx.45",
    "Webhook delivery failed - timeout",
    "SQS message processed from queue: orders",
    "Invalid request body: missing required field",
    "JWT token expired for user session",
    "Elasticsearch index updated: products_v2",
    "Background job completed: inventory-sync",
    "S3 upload successful: banner-summer.jpg",
  ];

  const date = new Date(2026, 4, 21, 8 + Math.floor(i / 4), (i * 3) % 60, (i * 7) % 60);
  return {
    id: `LOG-${String(i + 1).padStart(4, "0")}`,
    timestamp: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
    level: levels[i % levels.length],
    service: services[i % services.length],
    message: messages[i % messages.length],
    source: `pod-${Math.floor(Math.random() * 5) + 1}-${["us-east", "eu-west", "ap-south"][i % 3]}`,
    traceId: `trace-${Math.random().toString(16).slice(2, 10)}`,
  };
});

const levelIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-3.5 h-3.5 text-[#0369a1]" />,
  warn: <AlertTriangle className="w-3.5 h-3.5 text-[#d97706]" />,
  error: <XCircle className="w-3.5 h-3.5 text-red-500" />,
  debug: <Bug className="w-3.5 h-3.5 text-[#666]" />,
};

const levelColors: Record<string, string> = {
  info: "text-[#0369a1] bg-[#eff7ff]",
  warn: "text-[#d97706] bg-[#fffbeb]",
  error: "text-red-500 bg-[#fef2f2]",
  debug: "text-[#666] bg-[#f6f7f6]",
};

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const filtered = mockLogs.filter((l) => {
    const matchesSearch = l.message.toLowerCase().includes(search.toLowerCase()) || l.service.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" || l.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const errorCount = mockLogs.filter((l) => l.level === "error").length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Developer Tools</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">System Logs</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Real-time system logs from all microservices. Filter by level, search messages, and export logs for debugging.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#fef2f2] px-3 py-1 text-xs font-bold text-red-500 flex items-center gap-1"><XCircle className="w-3 h-3" />{errorCount} errors</span>
              <button onClick={() => toast.success("Logs exported to CSV")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><Download className="w-4 h-4" />Export</button>
              <button onClick={() => toast.success("Logs refreshed")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><RefreshCw className="w-4 h-4" />Refresh</button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input type="text" placeholder="Search logs by message or service..." className="w-full rounded-xl border border-[#e8e8e8] py-2 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1.5">
              {["all", "info", "warn", "error", "debug"].map((l) => (
                <button key={l} onClick={() => setLevelFilter(l)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${levelFilter === l ? "bg-[#0c831f] text-white" : "bg-[#f6f7f6] text-[#666] hover:bg-[#e8e8e8]"}`}>{l.charAt(0).toUpperCase() + l.slice(1)}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="p-3 border-b border-[#e8e8e8] bg-[#1a1a1a] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#0c831f]" />
            <span className="text-sm font-semibold text-white">Log Stream</span>
            <span className="ml-auto text-xs text-[#999]">{filtered.length} entries</span>
          </div>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs">
            <table className="w-full">
              <thead className="sticky top-0 bg-[#f9fafb]">
                <tr className="border-b border-[#e8e8e8]">
                  {["Timestamp", "Level", "Service", "Message", "Source", "Trace ID"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 100).map((log) => (
                  <tr key={log.id} className="border-b border-[#e8e8e8] hover:bg-[#f0f0f0] transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-[#666]">{log.timestamp}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${levelColors[log.level]}`}>
                        {levelIcons[log.level]}{log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#0369a1]">{log.service}</td>
                    <td className="px-3 py-2 text-[#1a1a1a] max-w-[300px] truncate">{log.message}</td>
                    <td className="px-3 py-2 text-[#999]">{log.source}</td>
                    <td className="px-3 py-2 text-[#999] text-[10px]">{log.traceId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
