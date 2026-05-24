"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { RefreshCw, Server, Database, Activity, Cpu, Globe, Clock, AlertTriangle, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { toast } from "sonner";

interface HealthCheck {
  id: string;
  name: string;
  type: "api" | "database" | "cache" | "queue" | "service" | "storage";
  status: "healthy" | "degraded" | "down";
  latency: string;
  uptime: string;
  lastChecked: string;
  description: string;
  endpoint?: string;
}

const mockHealthChecks: HealthCheck[] = [
  { id: "HC-001", name: "API Gateway", type: "api", status: "healthy", latency: "45ms", uptime: "99.98%", lastChecked: "30s ago", description: "Main API gateway routing requests to microservices", endpoint: "https://api.fmcgcommerce.com/health" },
  { id: "HC-002", name: "PostgreSQL (Primary)", type: "database", status: "healthy", latency: "12ms", uptime: "99.99%", lastChecked: "30s ago", description: "Primary production database cluster", endpoint: "postgresql://prod-db:5432" },
  { id: "HC-003", name: "Redis Cache", type: "cache", status: "healthy", latency: "3ms", uptime: "99.97%", lastChecked: "30s ago", description: "In-memory cache for sessions and hot data", endpoint: "redis://prod-redis:6379" },
  { id: "HC-004", name: "Order Processing Queue", type: "queue", status: "healthy", latency: "120ms", uptime: "99.95%", lastChecked: "30s ago", description: "SQS queue for order processing pipeline", endpoint: "sqs:orders-queue" },
  { id: "HC-005", name: "Payment Gateway", type: "service", status: "degraded", latency: "890ms", uptime: "98.50%", lastChecked: "30s ago", description: "Third-party payment processing integration", endpoint: "https://payments.fmcg.com/health" },
  { id: "HC-006", name: "S3 Storage", type: "storage", status: "healthy", latency: "65ms", uptime: "99.99%", lastChecked: "30s ago", description: "Object storage for product images and assets", endpoint: "s3://fmcg-assets" },
  { id: "HC-007", name: "Elasticsearch", type: "database", status: "healthy", latency: "28ms", uptime: "99.93%", lastChecked: "30s ago", description: "Search and analytics engine", endpoint: "https://search.fmcg.com:9200" },
  { id: "HC-008", name: "Notification Service", type: "service", status: "healthy", latency: "150ms", uptime: "99.88%", lastChecked: "30s ago", description: "Push notification delivery service", endpoint: "https://notify.fmcg.com/health" },
  { id: "HC-009", name: "Auth Service", type: "service", status: "healthy", latency: "35ms", uptime: "99.99%", lastChecked: "30s ago", description: "Authentication and JWT token service", endpoint: "https://auth.fmcg.com/health" },
  { id: "HC-010", name: "PostgreSQL (Replica)", type: "database", status: "healthy", latency: "15ms", uptime: "99.97%", lastChecked: "30s ago", description: "Read replica for analytics queries", endpoint: "postgresql://replica-db:5432" },
  { id: "HC-011", name: "CDN", type: "service", status: "healthy", latency: "8ms", uptime: "99.99%", lastChecked: "30s ago", description: "Content delivery network for static assets", endpoint: "https://cdn.fmcg.com/health" },
  { id: "HC-012", name: "Email Service", type: "service", status: "degraded", latency: "1200ms", uptime: "97.20%", lastChecked: "30s ago", description: "Transactional email delivery via SendGrid", endpoint: "https://email.fmcg.com/health" },
];

const typeIcons: Record<string, React.ReactNode> = {
  api: <Globe className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  cache: <Activity className="w-4 h-4" />,
  queue: <BarChart3 className="w-4 h-4" />,
  service: <Server className="w-4 h-4" />,
  storage: <Cpu className="w-4 h-4" />,
};

export default function HealthPage() {
  const healthy = mockHealthChecks.filter((h) => h.status === "healthy").length;
  const degraded = mockHealthChecks.filter((h) => h.status === "degraded").length;
  const down = mockHealthChecks.filter((h) => h.status === "down").length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Developer Tools</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Health Checks</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Real-time health monitoring for all microservices, databases, caches, and external integrations.</p>
            </div>
            <button onClick={() => toast.success("All health checks refreshed")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><RefreshCw className="w-4 h-4" />Run All Checks</button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#e8e8e8] bg-[#e8f5e9] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0c831f]">Healthy</p>
              <p className="mt-1 text-3xl font-black text-[#0c831f]">{healthy}</p>
            </div>
            <div className="rounded-xl border border-[#e8e8e8] bg-[#fffbeb] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#d97706]">Degraded</p>
              <p className="mt-1 text-3xl font-black text-[#d97706]">{degraded}</p>
            </div>
            <div className="rounded-xl border border-[#e8e8e8] bg-[#fef2f2] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-red-500">Down</p>
              <p className="mt-1 text-3xl font-black text-red-500">{down}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mockHealthChecks.map((hc) => (
            <div key={hc.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2.5 ${hc.status === "healthy" ? "bg-[#e8f5e9]" : hc.status === "degraded" ? "bg-[#fffbeb]" : "bg-[#fef2f2]"}`}>
                    {typeIcons[hc.type]}
                  </div>
                  <div>
                    <h3 className="font-black text-[#1a1a1a]">{hc.name}</h3>
                    <p className="text-xs text-[#666]">{hc.id}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${hc.status === "healthy" ? "bg-[#e8f5e9] text-[#0c831f]" : hc.status === "degraded" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#fef2f2] text-red-500"}`}>
                  {hc.status === "healthy" ? <CheckCircle2 className="w-3 h-3" /> : hc.status === "degraded" ? <AlertTriangle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {hc.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-[#666]">{hc.description}</p>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[#e8e8e8] pt-3 text-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#666]">Latency</p>
                  <p className="mt-0.5 font-semibold text-[#1a1a1a]">{hc.latency}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#666]">Uptime</p>
                  <p className="mt-0.5 font-semibold text-[#1a1a1a]">{hc.uptime}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#666]">Checked</p>
                  <p className="mt-0.5 font-semibold text-[#1a1a1a]">{hc.lastChecked}</p>
                </div>
              </div>

              {hc.endpoint && (
                <div className="mt-2 rounded-lg bg-[#f6f7f6] px-3 py-1.5">
                  <code className="text-[10px] text-[#666] font-mono">{hc.endpoint}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
