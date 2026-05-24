"use client";

import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import GitIntegration from "@/components/ui/admin/git-integration";
import Link from "next/link";
import { ChevronLeft, Terminal, AlertTriangle } from "lucide-react";

export default function GitIntegrationPage() {
  return (
    <DashboardLayout>
      <SettingsErrorBoundary>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Developer Tools</p>
            <h1 className="text-xl font-black text-[#1a1a1a]">Git Integration</h1>
          </div>
        </div>

        {/* Environment Warning */}
        {process.env.NODE_ENV === "production" && (
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl border border-yellow-200 bg-yellow-50">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-yellow-800">Production Environment</p>
              <p className="text-xs text-yellow-700 mt-1">
                Git operations are restricted in production. Set <code className="bg-yellow-100 px-1.5 py-0.5 rounded text-[11px] font-mono">ALLOW_GIT_API=true</code> in your environment variables to enable.
              </p>
            </div>
          </div>
        )}

        {/* Git Integration Component */}
        <GitIntegration />

        {/* Info Card */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fff0f6] flex items-center justify-center flex-shrink-0">
              <Terminal className="w-5 h-5 text-[#ff4f8b]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-1">About the Git Integration</h3>
              <p className="text-xs text-[#666] leading-relaxed">
                This Git integration provides a visual interface for common Git operations directly from the admin panel.
                It mirrors the VS Code Git extension API surface and supports staging, committing, branching,
                viewing diffs, pull/push, and browsing commit history.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "Status", desc: "View staged, unstaged, untracked files" },
                  { label: "Diff", desc: "Side-by-side file diff viewer" },
                  { label: "History", desc: "Browse commit history" },
                  { label: "Branches", desc: "Switch & manage branches" },
                ].map(({ label, desc }) => (
                  <div key={label} className="rounded-lg bg-[#fafafa] border border-[#f2f2f2] p-2.5">
                    <p className="text-xs font-bold text-[#ff4f8b]">{label}</p>
                    <p className="text-[10px] text-[#999] mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
