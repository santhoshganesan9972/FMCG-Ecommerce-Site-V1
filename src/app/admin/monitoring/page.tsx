"use client";

import DashboardLayout from "@/app/admin/dashboard-layout";
import { useMonitoringStore } from "@/store/system-monitoring-store";
import { mockCacheMetrics } from "@/data/system-monitoring";
import { useRouter } from "next/navigation";
import {
  Activity,
  Server,
  Database,
  Layers,
  Cpu,
  HardDrive,
  Bell,
  AlertTriangle,
  RefreshCw,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Zap,
  Eye,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function statusPill(status: string) {
  switch (status) {
    case "online":
    case "running":
    case "connected":
    case "operational":
    case "good":
      return "bg-[#e8f5e9] text-[#0c831f]";
    case "offline":
    case "stopped":
    case "disconnected":
      return "bg-[#fef2f2] text-[#b91c1c]";
    case "degraded":
    case "warning":
      return "bg-[#fffbeb] text-[#d97706]";
    default:
      return "bg-[#f6f7f6] text-[#666]";
  }
}

function StatusIcon({ status }: { status: string }) {
  if (status === "online" || status === "running" || status === "connected") return <CheckCircle className="h-3.5 w-3.5" />;
  if (status === "offline" || status === "stopped" || status === "disconnected") return <XCircle className="h-3.5 w-3.5" />;
  return <AlertTriangle className="h-3.5 w-3.5" />;
}

function usageBar(percent: number) {
  if (percent >= 85) return "bg-[#b91c1c]";
  if (percent >= 70) return "bg-[#d97706]";
  return "bg-[#0c831f]";
}

interface MiniCardProps {
  emoji: string;
  label: string;
  children: React.ReactNode;
}

function MiniCard({ emoji, label, children }: MiniCardProps) {
  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span>{emoji}</span>
        <span className="text-[10px] font-semibold text-[#666]">{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function MonitoringPage() {
  const router = useRouter();
  const { apiHealth, servers, databases, queues, alerts, acknowledgedAlerts, acknowledgeAlert, acknowledgeAllAlerts, restartServer, restartQueue } = useMonitoringStore();

  const [autoRefresh, setAutoRefresh] = useState(true);
  const unackCount = alerts.filter((a) => !acknowledgedAlerts.has(a.id)).length;

  const allOnline =
    servers.every((s) => s.status === "online") &&
    databases.every((d) => d.status === "connected") &&
    queues.every((q) => q.status === "running");

  const avgCpu = Math.round(servers.reduce((a, s) => a + s.cpuUsage, 0) / servers.length);
  const avgMemory = Math.round(servers.reduce((a, s) => a + s.memoryUsage, 0) / servers.length);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Infrastructure
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                System Monitoring
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Real-time visibility into API health, servers, databases, queues,
                CPU, memory, and cache. Restart services, inspect logs, and act
                on alerts instantly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => router.refresh()}
                className={`flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] ${autoRefresh ? "text-[#0c831f] border-[#0c831f]/30" : ""}`}
              >
                <RefreshCw className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
                {autoRefresh ? "Auto-refresh ON" : "Auto-refresh"}
              </button>
              <Link href="/admin/monitoring/alerts">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <Bell className="h-4 w-4" />
                  Alerts
                  {unackCount > 0 && (
                    <span className="rounded-full bg-[#ff4f8b] text-white text-[10px] font-black h-5 w-5 flex items-center justify-center">
                      {unackCount}
                    </span>
                  )}
                </button>
              </Link>
              <Link href="/admin/monitoring/logs">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <FileText className="h-4 w-4" />
                  View Logs
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <MiniCard emoji="🌐" label="API Health">
            <div className="flex items-center gap-1.5">
              <StatusIcon status="connected" />
              <span className="text-sm font-black text-[#0c831f]">
                {apiHealth.every((a) => Number(a.status) < 400) ? "Healthy" : "Degraded"}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#999]">
              {apiHealth.length} endpoints tracked
            </p>
          </MiniCard>

          <MiniCard emoji="🖥️" label="Servers">
            <div className="flex items-center gap-1.5">
              <StatusIcon status={servers.every((s) => s.status === "online") ? "online" : "degraded"} />
              <span className="text-sm font-black text-[#1a1a1a]">
                {servers.filter((s) => s.status === "online").length}/{servers.length} online
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#999]">avg {avgCpu}% CPU</p>
          </MiniCard>

          <MiniCard emoji="🗄️" label="Databases">
            <div className="flex items-center gap-1.5">
              <StatusIcon status={databases.every((d) => d.status === "connected") ? "connected" : "degraded"} />
              <span className="text-sm font-black text-[#0c831f]">
                {databases.filter((d) => d.status === "connected").length}/{databases.length} connected
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#999]">{databases[0]?.queryLatency ?? "—"} latency</p>
          </MiniCard>

          <MiniCard emoji="⚡" label="Queues">
            <div className="flex items-center gap-1.5">
              <StatusIcon status={queues.every((q) => q.status === "running") ? "running" : "stopped"} />
              <span className="text-sm font-black text-[#1a1a1a]">
                {queues.filter((q) => q.status === "running").length}/{queues.length} running
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-[#999]">
              {queues.reduce((a, q) => a + q.pendingJobs, 0)} pending jobs
            </p>
          </MiniCard>

          <MiniCard emoji="🧠" label="CPU Usage">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-[#1a1a1a]">{avgCpu}%</span>
              {avgCpu >= 80 ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-[#ff4f8b]" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 text-[#0c831f]" />
              )}
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#f0f0f0]">
              <div className={`h-1.5 rounded-full ${usageBar(avgCpu)}`} style={{ width: `${avgCpu}%` }} />
            </div>
          </MiniCard>

          <MiniCard emoji="💾" label="Memory Usage">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-[#1a1a1a]">{avgMemory}%</span>
              {avgMemory >= 85 ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-[#ff4f8b]" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 text-[#0c831f]" />
              )}
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#f0f0f0]">
              <div className={`h-1.5 rounded-full ${usageBar(avgMemory)}`} style={{ width: `${avgMemory}%` }} />
            </div>
          </MiniCard>
        </div>

        {/* ── CPU · Memory · Cache strip ── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* CPU */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#0c831f]" />
                <h3 className="text-sm font-black text-[#1a1a1a]">CPU Usage</h3>
              </div>
              <span className={`text-xs font-bold ${avgCpu >= 80 ? "text-[#ff4f8b]" : "text-[#0c831f]"}`}>
                {avgCpu}% avg
              </span>
            </div>
            <div className="space-y-3">
              {servers.map((srv) => (
                <div key={srv.hostname}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#666]">{srv.hostname}</span>
                    <span className="text-xs font-black text-[#1a1a1a]">{srv.cpuUsage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#f0f0f0]">
                    <div
                      className={`h-2 rounded-full ${usageBar(srv.cpuUsage)}`}
                      style={{ width: `${srv.cpuUsage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-[#f6f7f6] px-3 py-2">
              <span className="text-[10px] font-semibold text-[#666]">Load avg</span>
              <span className="text-xs font-black text-[#1a1a1a]">{servers[0]?.loadAvg}</span>
            </div>
          </section>

          {/* Memory */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-[#ff4f8b]" />
                <h3 className="text-sm font-black text-[#1a1a1a]">Memory Usage</h3>
              </div>
              <span className={`text-xs font-bold ${avgMemory >= 85 ? "text-[#ff4f8b]" : "text-[#0c831f]"}`}>
                {avgMemory}% avg
              </span>
            </div>
            <div className="space-y-3">
              {servers.map((srv) => (
                <div key={srv.hostname}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#666]">{srv.hostname}</span>
                    <span className="text-xs font-black text-[#1a1a1a]">{srv.memoryUsage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#f0f0f0]">
                    <div
                      className={`h-2 rounded-full ${usageBar(srv.memoryUsage)}`}
                      style={{ width: `${srv.memoryUsage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-[#f6f7f6] px-3 py-2">
              <span className="text-[10px] font-semibold text-[#666]">Peak today</span>
              <span className="text-xs font-black text-[#1a1a1a]">94% @ 14:20</span>
            </div>
          </section>

          {/* Cache */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#d97706]" />
                <h3 className="text-sm font-black text-[#1a1a1a]">Cache Usage</h3>
              </div>
              <span className="rounded-full bg-[#fffbeb] text-[#d97706] text-[10px] font-black px-2 py-0.5">
                ⚠ Degraded
              </span>
            </div>
            <div className="space-y-3">
              {(() => {
                const r = mockCacheMetrics;
                const rows = [
                  { label: "Hit Rate", value: r.hitRate, good: true },
                  { label: "Memory Used", value: r.memoryUsed, good: true },
                  { label: "Memory Peak", value: r.memoryPeak, good: false },
                  { label: "Connected Clients", value: `${r.connectedClients} conn`, good: r.connectedClients < 900 },
                ];
                return rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between rounded-lg bg-[#f6f7f6] px-3 py-2">
                    <span className="text-xs font-semibold text-[#666]">{r.label}</span>
                    <span className="text-xs font-black text-[#1a1a1a]">{r.value}</span>
                  </div>
                ));
              })()}
            </div>
          </section>
        </div>

        {/* ── API Health ── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">API Health</h2>
              <span className="rounded-full bg-[#e8f5e9] text-[#0c831f] text-[10px] font-bold px-2 py-0.5">
                {apiHealth.every((a) => Number(a.status) < 400) ? "All Healthy" : "Degraded"}
              </span>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f6f7f6] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Latency</th>
                  <th className="px-4 py-3">Last Checked</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiHealth.map((ep) => (
                  <tr key={ep.endpoint} className="border-b border-[#f0f0f0] last:border-b-0 text-sm hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#1a1a1a]">{ep.endpoint}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-black text-[#666]">{ep.method}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusPill(Number(ep.status) < 400 ? "connected" : "degraded")}`}>
                        <StatusIcon status={Number(ep.status) < 400 ? "connected" : "degraded"} />
                        {ep.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${Number(ep.latency.replace("ms","")) > 200 ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                        {ep.latency}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#999]">{ep.lastChecked}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => restartServer(ep.endpoint)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#0c831f] hover:bg-[#e8f5e9]"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Restart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Servers ── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Server Status</h2>
              <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 ${servers.every((s) => s.status === "online") ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fffbeb] text-[#d97706]"}`}>
                {servers.filter((s) => s.status === "online").length}/{servers.length} Online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/monitoring/logs?type=server">
                <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                  <FileText className="h-3 w-3" />
                  View Logs
                </button>
              </Link>
              <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#ff4f8b] hover:bg-[#fff0f6]">
                <RotateCcw className="h-3 w-3" />
                Restart All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-[#f6f7f6] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Hostname</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Uptime</th>
                  <th className="px-4 py-3">CPU</th>
                  <th className="px-4 py-3">Memory</th>
                  <th className="px-4 py-3">Disk</th>
                  <th className="px-4 py-3">Load Avg</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3">Last Restarted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((srv) => (
                  <tr key={srv.hostname} className="border-b border-[#f0f0f0] last:border-b-0 text-sm hover:bg-[#f9fafb]">
                    <td className="px-4 py-3">
                      <p className="font-bold text-[#1a1a1a]">{srv.hostname}</p>
                      <p className="text-[10px] text-[#999]">{srv.ip}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusPill(srv.status)}`}>
                        <StatusIcon status={srv.status} />
                        {srv.status.charAt(0).toUpperCase() + srv.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-[#666]">{srv.uptime}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[#f0f0f0]">
                          <div className={`h-1.5 rounded-full ${usageBar(srv.cpuUsage)}`} style={{ width: `${srv.cpuUsage}%` }} />
                        </div>
                        <span className={`text-xs font-bold ${srv.cpuUsage >= 80 ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>{srv.cpuUsage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[#f0f0f0]">
                          <div className={`h-1.5 rounded-full ${usageBar(srv.memoryUsage)}`} style={{ width: `${srv.memoryUsage}%` }} />
                        </div>
                        <span className={`text-xs font-bold ${srv.memoryUsage >= 85 ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>{srv.memoryUsage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[#f0f0f0]">
                          <div className={`h-1.5 rounded-full ${usageBar(srv.diskUsage)}`} style={{ width: `${srv.diskUsage}%` }} />
                        </div>
                        <span className="text-xs font-bold text-[#1a1a1a]">{srv.diskUsage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-[#666]">{srv.loadAvg}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{srv.region}</td>
                    <td className="px-4 py-3 text-xs text-[#999]">{srv.lastRestarted}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/monitoring/logs?server=${srv.hostname}`}>
                          <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                            <Eye className="h-3 w-3" />
                            Logs
                          </button>
                        </Link>
                        <button
                          onClick={() => restartServer(srv.hostname)}
                          className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#ff4f8b] hover:bg-[#fff0f6]"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Restart
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Databases ── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Database Status</h2>
              <span className="rounded-full bg-[#e8f5e9] text-[#0c831f] text-[10px] font-bold px-2 py-0.5">
                {databases.length} connected
              </span>
            </div>
            <Link href="/admin/monitoring/logs?type=database">
              <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                <FileText className="h-3 w-3" />
                Query Logs
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#f6f7f6] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Engine</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Connections</th>
                  <th className="px-4 py-3">Query Latency</th>
                  <th className="px-4 py-3">Storage</th>
                  <th className="px-4 py-3">Slow Queries</th>
                  <th className="px-4 py-3">Last Backup</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {databases.map((db) => (
                  <tr key={db.engine} className="border-b border-[#f0f0f0] last:border-b-0 text-sm hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-bold text-[#1a1a1a]">{db.engine}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusPill(db.status)}`}>
                        <StatusIcon status={db.status} />
                        {db.status.charAt(0).toUpperCase() + db.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="font-bold text-[#1a1a1a]">{db.connections}</span>
                      <span className="text-[#999]"> / {db.maxConnections}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${db.queryLatency.includes("ms") && parseInt(db.queryLatency) > 200 ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                        {db.queryLatency}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[#f0f0f0]">
                          <div className={`h-1.5 rounded-full ${usageBar(db.storagePercent)}`} style={{ width: `${db.storagePercent}%` }} />
                        </div>
                        <span className="text-xs font-medium text-[#666]">
                          {db.storageUsed} / {db.storageTotal}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${db.slowQueries > 0 ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#e8f5e9] text-[#0c831f]"}`}>
                        {db.slowQueries}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{db.lastBackup}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/monitoring/logs?type=database`}>
                          <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                            <FileText className="h-3 w-3" />
                            Logs
                          </button>
                        </Link>
                        <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#0c831f] hover:bg-[#e8f5e9]">
                          <RotateCcw className="h-3 w-3" />
                          Restart
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Queues ── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#d97706]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Queue Status</h2>
              <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 ${queues.every((q) => q.status === "running") ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#fffbeb] text-[#d97706]"}`}>
                {queues.filter((q) => q.status === "running").length}/{queues.length} Running
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/monitoring/logs?type=queue">
                <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                  <FileText className="h-3 w-3" />
                  Queue Logs
                </button>
              </Link>
              <button
                onClick={() => { queues.filter(q => q.status !== "running").forEach(q => restartQueue(q.name)); }}
                className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#ff4f8b] hover:bg-[#fff0f6]"
              >
                <RotateCcw className="h-3 w-3" />
                Restart All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#f6f7f6] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Queue Name</th>
                  <th className="px-4 py-3">Driver</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Pending</th>
                  <th className="px-4 py-3">Processing</th>
                  <th className="px-4 py-3">Failed</th>
                  <th className="px-4 py-3">Completed Today</th>
                  <th className="px-4 py-3">Avg Process Time</th>
                  <th className="px-4 py-3">Workers</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {queues.map((q) => (
                  <tr key={q.name} className="border-b border-[#f0f0f0] last:border-b-0 text-sm hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 font-bold text-[#1a1a1a]">{q.name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-black text-[#666]">{q.driver}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusPill(q.status)}`}>
                        <StatusIcon status={q.status} />
                        {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                        {q.failedJobs > 0 && (
                          <span className="ml-1 rounded-full bg-[#fef2f2] text-[#b91c1c] text-[9px] font-black px-1">
                            {q.failedJobs} failed
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${q.pendingJobs > 100 ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                        {q.pendingJobs}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1a1a1a]">{q.processingJobs}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${q.failedJobs > 0 ? "text-[#b91c1c]" : "text-[#1a1a1a]"}`}>
                        {q.failedJobs}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#666]">{q.completedToday.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{q.avgProcessTime}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-black text-[#666]">{q.workers} workers</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href="/admin/monitoring/logs">
                          <button className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa]">
                            <FileText className="h-3 w-3" />
                            Logs
                          </button>
                        </Link>
                        <button
                          onClick={() => restartQueue(q.name)}
                          className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-2.5 py-1.5 text-xs font-semibold text-[#ff4f8b] hover:bg-[#fff0f6]"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Restart
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Alerts ── */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="border-b border-[#e8e8e8] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">System Alerts</h2>
              {unackCount > 0 && (
                <span className="rounded-full bg-[#ff4f8b] text-white text-[10px] font-black px-2 py-0.5">
                  {unackCount} unacknowledged
                </span>
              )}
            </div>
            {unackCount > 0 && (
              <button
                onClick={acknowledgeAllAlerts}
                className="flex items-center gap-1.5 rounded-lg bg-[#0c831f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a6a18]"
              >
                <CheckCircle className="h-3 w-3" />
                Acknowledge All
              </button>
            )}
          </div>
          <div className="px-4 py-2">
            {alerts.map((alert) => {
              const acked = acknowledgedAlerts.has(alert.id);
              return (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 rounded-xl px-3 py-3 mb-2 last:mb-0 border ${
                    alert.severity === "error"
                      ? "bg-[#fef2f2] border-[#fecaca]"
                      : alert.severity === "warning"
                      ? "bg-[#fffbeb] border-[#fde68a]"
                      : "bg-[#e8f5e9] border-[#bbdbb9]"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {alert.severity === "error" && <XCircle className="h-4 w-4 text-[#b91c1c]" />}
                    {alert.severity === "warning" && <AlertTriangle className="h-4 w-4 text-[#d97706]" />}
                    {alert.severity === "info" && <CheckCircle className="h-4 w-4 text-[#0c831f]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black uppercase rounded-full px-1.5 py-0.5 ${
                        alert.severity === "error"
                          ? "bg-[#fef2f2] text-[#b91c1c]"
                          : alert.severity === "warning"
                          ? "bg-[#fffbeb] text-[#d97706]"
                          : "bg-[#e8f5e9] text-[#0c831f]"
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-[10px] font-semibold text-[#999]">{alert.source}</span>
                      <span className="text-[10px] text-[#999]">·</span>
                      <span className="text-[10px] text-[#999]">{alert.timestamp}</span>
                    </div>
                    <p className={`mt-0.5 text-xs font-semibold leading-relaxed ${acked ? "text-[#999] line-through" : "text-[#1a1a1a]"}`}>
                      {alert.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex gap-1">
                    {!acked && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="flex items-center gap-1 rounded-lg bg-white border border-[#e8e8e8] px-2.5 py-1 text-[10px] font-bold text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f] hover:border-[#0c831f]/30"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Ack
                      </button>
                    )}
                    <Link href="/admin/monitoring/logs">
                      <button className="flex items-center gap-1 rounded-lg bg-white border border-[#e8e8e8] px-2.5 py-1 text-[10px] font-bold text-[#666] hover:bg-[#f8f9fa]">
                        <FileText className="h-3 w-3" />
                        Logs
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
