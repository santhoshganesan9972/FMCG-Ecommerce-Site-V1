"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  Cpu,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertTriangle,
  Activity,
  BarChart3,
  Terminal,
  AlertCircle,
  Info,
} from "lucide-react";

interface ModelHealth {
  id: string;
  name: string;
  type: string;
  status: "Healthy" | "Degraded" | "Down" | "Training";
  uptime: string;
  latency: string;
  throughput: string;
  accuracy: number;
  driftDetected: boolean;
  dataFreshness: string;
  lastDeployed: string;
  version: string;
  memoryUsage: string;
  errorRate: string;
}

const mockModels: ModelHealth[] = [
  {
    id: "1",
    name: "Recommendation Engine",
    type: "Deep Learning (Transformer)",
    status: "Healthy",
    uptime: "99.98%",
    latency: "38ms",
    throughput: "12.5K req/s",
    accuracy: 94.2,
    driftDetected: false,
    dataFreshness: "Real-time",
    lastDeployed: "2 days ago",
    version: "v4.2.1",
    memoryUsage: "2.4 GB",
    errorRate: "0.02%",
  },
  {
    id: "2",
    name: "Search Ranking Model",
    type: "Gradient Boosted Trees",
    status: "Healthy",
    uptime: "99.95%",
    latency: "42ms",
    throughput: "8.9K req/s",
    accuracy: 91.8,
    driftDetected: false,
    dataFreshness: "5 min",
    lastDeployed: "5 days ago",
    version: "v3.1.0",
    memoryUsage: "1.8 GB",
    errorRate: "0.05%",
  },
  {
    id: "3",
    name: "Dynamic Pricing Engine",
    type: "Reinforcement Learning",
    status: "Healthy",
    uptime: "99.92%",
    latency: "65ms",
    throughput: "4.2K req/s",
    accuracy: 88.5,
    driftDetected: true,
    dataFreshness: "2 min",
    lastDeployed: "1 week ago",
    version: "v2.5.3",
    memoryUsage: "3.2 GB",
    errorRate: "0.15%",
  },
  {
    id: "4",
    name: "Demand Forecaster",
    type: "Prophet + LSTM Ensemble",
    status: "Healthy",
    uptime: "99.99%",
    latency: "120ms",
    throughput: "1.5K req/s",
    accuracy: 92.1,
    driftDetected: false,
    dataFreshness: "15 min",
    lastDeployed: "3 days ago",
    version: "v5.0.2",
    memoryUsage: "4.1 GB",
    errorRate: "0.01%",
  },
  {
    id: "5",
    name: "Reorder Predictor",
    type: "XGBoost Classifier",
    status: "Healthy",
    uptime: "99.97%",
    latency: "28ms",
    throughput: "6.7K req/s",
    accuracy: 87.3,
    driftDetected: false,
    dataFreshness: "1 hour",
    lastDeployed: "1 week ago",
    version: "v2.3.0",
    memoryUsage: "1.2 GB",
    errorRate: "0.08%",
  },
  {
    id: "6",
    name: "Fraud Detection",
    type: "Graph Neural Network",
    status: "Degraded",
    uptime: "98.45%",
    latency: "152ms",
    throughput: "2.1K req/s",
    accuracy: 95.6,
    driftDetected: true,
    dataFreshness: "10 min",
    lastDeployed: "2 weeks ago",
    version: "v1.8.4",
    memoryUsage: "5.6 GB",
    errorRate: "0.42%",
  },
  {
    id: "7",
    name: "Inventory Optimizer",
    type: "Random Forest Regressor",
    status: "Training",
    uptime: "—",
    latency: "—",
    throughput: "—",
    accuracy: 0,
    driftDetected: false,
    dataFreshness: "30 min",
    lastDeployed: "In progress...",
    version: "v3.0.0-beta",
    memoryUsage: "—",
    errorRate: "—",
  },
];

const systemResources = [
  { resource: "GPU Utilization", value: "62%", status: "Normal", change: "+5%", color: "bg-[#0c831f]" },
  { resource: "CPU Utilization", value: "78%", status: "High", change: "+12%", color: "bg-[#d97706]" },
  { resource: "RAM Usage", value: "14.2 GB / 32 GB", status: "Normal", change: "+0.8 GB", color: "bg-[#0c831f]" },
  { resource: "Disk I/O", value: "245 MB/s", status: "Normal", change: "+22 MB/s", color: "bg-[#0c831f]" },
  { resource: "Network Throughput", value: "1.2 Gbps", status: "Normal", change: "+0.3 Gbps", color: "bg-[#0c831f]" },
  { resource: "Model Cache Hit Rate", value: "88.5%", status: "Low", change: "-2.1%", color: "bg-[#ff4f8b]" },
];

export default function ModelHealthPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                AI / Monitoring
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Model Health Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Real-time monitoring of all ML model performance, resource usage, data drift detection, and system health metrics. Proactive alerts for model degradation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <RefreshCw className="w-4 h-4" />
                Refresh All
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Terminal className="w-4 h-4" />
                View Logs
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* Status Summary Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f] mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Healthy</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">5</p>
            <p className="text-xs text-[#0c831f] font-bold">Models operating normally</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Degraded</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">1</p>
            <p className="text-xs text-[#d97706] font-bold">Needs attention</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#ff4f8b] mb-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Down</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">0</p>
            <p className="text-xs text-[#999]">All models operational</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg. Uptime</span>
            </div>
            <p className="text-2xl font-black text-[#1a1a1a]">99.88%</p>
            <p className="text-xs text-[#0c831f] font-bold">30-day rolling average</p>
          </div>
        </div>

        {/* Model Health Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#e8e8e8] p-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Models</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Model Health Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Version</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Uptime</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Latency</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Throughput</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Accuracy</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Drift</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Error Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {mockModels.map((model) => (
                  <tr key={model.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-bold text-[#1a1a1a]">{model.name}</p>
                        <p className="text-xs text-[#666]">{model.type}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded bg-[#f0f0f0] px-2 py-0.5 text-[11px] font-mono font-bold text-[#666]">
                        {model.version}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        model.status === "Healthy" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        model.status === "Degraded" ? "bg-[#fef3c7] text-[#d97706]" :
                        model.status === "Training" ? "bg-[#eff6ff] text-[#2563eb]" :
                        "bg-[#fff0f6] text-[#ff4f8b]"
                      }`}>
                        {model.status === "Healthy" ? <CheckCircle2 className="w-3 h-3" /> :
                         model.status === "Training" ? <RefreshCw className="w-3 h-3 animate-spin" /> :
                         <AlertTriangle className="w-3 h-3" />}
                        {model.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${model.uptime === "—" ? "text-[#999]" : "text-[#1a1a1a]"}`}>
                        {model.uptime}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${
                        model.latency === "—" ? "text-[#999]" :
                        parseInt(model.latency) > 100 ? "text-[#d97706]" : "text-[#1a1a1a]"
                      }`}>
                        {model.latency}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[#1a1a1a]">{model.throughput}</td>
                    <td className="px-4 py-4">
                      {model.accuracy > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#1a1a1a]">{model.accuracy.toFixed(1)}%</span>
                          <div className="h-2 w-12 rounded-full bg-[#f0f0f0]">
                            <div
                              className={`h-2 rounded-full ${
                                model.accuracy >= 92 ? "bg-[#0c831f]" :
                                model.accuracy >= 85 ? "bg-[#d97706]" :
                                "bg-[#ff4f8b]"
                              }`}
                              style={{ width: `${model.accuracy}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-[#999]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {model.driftDetected ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-2 py-0.5 text-xs font-bold text-[#d97706]">
                          <AlertTriangle className="w-3 h-3" />
                          Detected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-bold text-[#0c831f]">
                          <CheckCircle2 className="w-3 h-3" />
                          None
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-bold ${
                        model.errorRate === "—" ? "text-[#999]" :
                        parseFloat(model.errorRate) > 0.3 ? "text-[#ff4f8b]" :
                        parseFloat(model.errorRate) > 0.1 ? "text-[#d97706]" :
                        "text-[#0c831f]"
                      }`}>
                        {model.errorRate}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#2563eb]" title="View Metrics">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f]" title="Redeploy">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* System Resources & Alerts */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* System Resources */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Infrastructure</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">System Resource Usage</h2>
            </div>
            <div className="space-y-3">
              {systemResources.map((res, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] p-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1a1a1a]">{res.resource}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-[#f0f0f0]">
                        <div
                          className={`h-2 rounded-full ${res.color}`}
                          style={{ width: `${res.resource === "RAM Usage" ? 44 : res.resource === "Model Cache Hit Rate" ? 88.5 : parseInt(res.value)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-black text-[#1a1a1a]">{res.value}</p>
                    <span className={`text-[10px] font-bold ${
                      res.status === "Normal" ? "text-[#0c831f]" :
                      res.status === "High" || res.status === "Low" ? "text-[#d97706]" :
                      "text-[#666]"
                    }`}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Alerts */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Alerts</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Recent Alerts & Events</h2>
            </div>
            <div className="space-y-3">
              {[
                { type: "warning", model: "Fraud Detection", message: "Data drift detected — accuracy dropped by 2.3% in last hour", time: "15 min ago" },
                { type: "info", model: "Dynamic Pricing", message: "Model retrained successfully — v2.5.3 deployed", time: "1 hour ago" },
                { type: "success", model: "Recommendation Engine", message: "Latency improved by 12ms after cache optimization", time: "2 hours ago" },
                { type: "info", model: "Inventory Optimizer", message: "New training job started — expected completion: 45 min", time: "3 hours ago" },
                { type: "success", model: "Demand Forecaster", message: "Weekly retrain completed — accuracy improved to 92.1%", time: "5 hours ago" },
                { type: "warning", model: "Fraud Detection", message: "Memory usage exceeded 5.5 GB threshold", time: "6 hours ago" },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg border border-[#e8e8e8] p-3">
                  <div className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${
                    alert.type === "success" ? "bg-[#e8f5e9] text-[#0c831f]" :
                    alert.type === "warning" ? "bg-[#fef3c7] text-[#d97706]" :
                    "bg-[#eff6ff] text-[#2563eb]"
                  }`}>
                    {alert.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                     alert.type === "warning" ? <AlertTriangle className="w-3.5 h-3.5" /> :
                     <Info className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#666]">{alert.model}</p>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{alert.message}</p>
                    <p className="text-[10px] text-[#999] mt-0.5">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Model Deployment History */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Deployments</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Model Deployment History</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e8e8e8]" />
            <div className="space-y-4">
              {[
                { model: "Fraud Detection", version: "v1.8.4", action: "Redeployed", user: "System (Auto)", time: "2 hours ago", status: "Warning" },
                { model: "Recommendation Engine", version: "v4.2.1", action: "Rolling Update", user: "DevOps Team", time: "2 days ago", status: "Success" },
                { model: "Demand Forecaster", version: "v5.0.2", action: "Fresh Deploy", user: "ML Team", time: "3 days ago", status: "Success" },
                { model: "Search Ranking", version: "v3.1.0", action: "A/B Test Promoted", user: "Product Team", time: "5 days ago", status: "Success" },
                { model: "Dynamic Pricing", version: "v2.5.3", action: "Hotfix", user: "ML Team", time: "1 week ago", status: "Success" },
              ].map((dep, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-10">
                  <div className={`absolute left-3 top-1.5 h-3 w-3 rounded-full border-2 border-white ${
                    dep.status === "Success" ? "bg-[#0c831f]" : "bg-[#d97706]"
                  }`} />
                  <div className="flex-1 rounded-lg border border-[#e8e8e8] p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#1a1a1a]">{dep.model}</p>
                        <p className="text-xs text-[#666]">{dep.action} · {dep.version} · by {dep.user}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#999]">{dep.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
