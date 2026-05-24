"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Search, Eye, EyeOff, Edit3, RefreshCw, Shield, Globe, Database, Key, Server, Lock } from "lucide-react";
import { toast } from "sonner";

interface EnvVariable {
  key: string;
  value: string;
  type: "api" | "database" | "service" | "config" | "secret";
  environment: "production" | "staging" | "development";
  lastUpdated: string;
  updatedBy: string;
}

const mockEnvVariables: EnvVariable[] = [
  { key: "NEXT_PUBLIC_API_URL", value: "https://api.fmcgcommerce.com/v1", type: "api", environment: "production", lastUpdated: "2026-05-01", updatedBy: "Admin" },
  { key: "DATABASE_URL", value: "postgresql://****:****@prod-db.fmcg.com:5432/fmcg_db", type: "database", environment: "production", lastUpdated: "2026-04-15", updatedBy: "DevOps" },
  { key: "REDIS_URL", value: "redis://****:****@prod-redis.fmcg.com:6379", type: "database", environment: "production", lastUpdated: "2026-04-15", updatedBy: "DevOps" },
  { key: "STRIPE_SECRET_KEY", value: "sk_live_****", type: "secret", environment: "production", lastUpdated: "2026-03-01", updatedBy: "Admin" },
  { key: "AWS_ACCESS_KEY_ID", value: "AKIA****WXYZ", type: "api", environment: "production", lastUpdated: "2026-02-10", updatedBy: "DevOps" },
  { key: "AWS_SECRET_ACCESS_KEY", value: "****", type: "secret", environment: "production", lastUpdated: "2026-02-10", updatedBy: "DevOps" },
  { key: "SENTRY_DSN", value: "https://****@sentry.fmcg.com/1", type: "service", environment: "production", lastUpdated: "2026-01-20", updatedBy: "Admin" },
  { key: "SMTP_HOST", value: "smtp.sendgrid.net", type: "service", environment: "production", lastUpdated: "2026-04-01", updatedBy: "Admin" },
  { key: "SMTP_USERNAME", value: "apikey", type: "api", environment: "production", lastUpdated: "2026-04-01", updatedBy: "Admin" },
  { key: "SMTP_PASSWORD", value: "****", type: "secret", environment: "production", lastUpdated: "2026-04-01", updatedBy: "Admin" },
  { key: "GOOGLE_MAPS_API_KEY", value: "AIza****", type: "api", environment: "production", lastUpdated: "2026-03-15", updatedBy: "Admin" },
  { key: "JWT_SECRET", value: "****", type: "secret", environment: "production", lastUpdated: "2026-01-01", updatedBy: "System" },
  { key: "NEXT_PUBLIC_APP_URL", value: "https://fmcgcommerce.com", type: "config", environment: "production", lastUpdated: "2026-05-01", updatedBy: "Admin" },
  { key: "ELASTIC_SEARCH_URL", value: "https://search.fmcg.com:9200", type: "service", environment: "production", lastUpdated: "2026-03-20", updatedBy: "DevOps" },
  { key: "TWILIO_ACCOUNT_SID", value: "AC****", type: "api", environment: "production", lastUpdated: "2026-04-10", updatedBy: "Admin" },
];

const typeIcons: Record<string, React.ReactNode> = {
  api: <Key className="w-3.5 h-3.5" />,
  database: <Database className="w-3.5 h-3.5" />,
  service: <Server className="w-3.5 h-3.5" />,
  config: <Globe className="w-3.5 h-3.5" />,
  secret: <Lock className="w-3.5 h-3.5" />,
};

export default function EnvPage() {
  const [search, setSearch] = useState("");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const filtered = mockEnvVariables.filter((v) =>
    v.key.toLowerCase().includes(search.toLowerCase())
  );

  const toggleReveal = (key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const maskValue = (value: string, key: string) => {
    if (revealed.has(key)) return value;
    if (value.includes("****")) return value;
    if (value.length > 8) return value.slice(0, 4) + "****" + value.slice(-4);
    return "****";
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Developer Tools</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Environment Variables</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage environment configuration across production, staging, and development environments.</p>
            </div>
            <button onClick={() => toast.success("Environment refreshed from server")} className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"><RefreshCw className="w-4 h-4" />Refresh</button>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search environment variables..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </section>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["Variable", "Value", "Type", "Environment", "Last Updated", "By", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.key} className="border-b border-[#e8e8e8] hover:bg-[#f9fafb] transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-[#1a1a1a] text-xs">{v.key}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs bg-[#f6f7f6] rounded px-2 py-1 text-[#666]">{maskValue(v.value, v.key)}</code>
                        <button onClick={() => toggleReveal(v.key)} className="rounded-lg p-1 text-[#666] hover:bg-[#f0f0f0]">
                          {revealed.has(v.key) ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f0f0f0] px-2.5 py-0.5 text-xs text-[#666]">
                        {typeIcons[v.type]}{v.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${v.environment === "production" ? "bg-[#fef2f2] text-red-500" : v.environment === "staging" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff7ff] text-[#0369a1]"}`}>{v.environment}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{v.lastUpdated}</td>
                    <td className="px-4 py-3 text-xs text-[#666]">{v.updatedBy}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toast.info(`Editing ${v.key}`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" /></button>
                    </td>
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
