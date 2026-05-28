"use client";

import { useEffect, useState, useCallback } from "react";
import {
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  FileCode,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Circle,
  AlertCircle,
  Loader2,
  ArrowUpFromLine,
  ArrowDownFromLine,
  FilePlus2,
  FileEdit,
  FileX2,
  Upload,
  Download,
  History,
  ChevronRight,
  ChevronDown,
  GitFork,
  SquarePen,
  Ban,
  Search,
} from "lucide-react";
import { useGitStore } from "@/store/git-store";
import {
  statusLabel,
  statusColor,
  type GitFileChange,
  type GitFileStatus,
  type GitCommit,
  type GitBranch as GitBranchType,
} from "@/lib/git";
import { toast } from "sonner";

// ── Status Badge ──
function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold leading-none ${statusColor(status as GitFileStatus)}`}>
      {status}
    </span>
  );
}

// ── Commit Message Formatter ──
function CommitRow({ commit }: { commit: GitCommit }) {
  const date = new Date(commit.date);
  const timeAgo = getTimeAgo(date);

  return (
    <div className="flex items-start gap-3 px-3 py-2.5 hover:bg-[#fafafa] transition-colors border-b border-[#f2f2f2] last:border-0 group">
      <div className="w-6 h-6 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0 mt-0.5">
        <GitCommitHorizontal className="w-3 h-3 text-[#0c831f]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <code className="text-[11px] font-mono font-bold text-[#ff4f8b]">{commit.shortHash}</code>
          {commit.refs.length > 0 && (
            <div className="flex gap-1">
              {commit.refs.slice(0, 3).map((ref, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-[#f2f2f2] text-[9px] font-bold text-[#666] rounded-full">
                  {ref.replace("HEAD -> ", "").replace("origin/", "")}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm font-semibold text-[#1a1a1a] truncate mt-0.5">{commit.message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-[#999]">{commit.author}</span>
          <span className="text-[8px] text-[#ccc]">•</span>
          <span className="text-[10px] text-[#999]">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// ── File List (staged/unstaged/untracked) ──
function FileList({
  files,
  title,
  icon,
  staged,
  onStage,
  onUnstage,
  onSelect,
  selectedPath,
}: {
  files: GitFileChange[];
  title: string;
  icon: React.ReactNode;
  staged?: boolean;
  onStage?: (paths: string[]) => void;
  onUnstage?: (paths: string[]) => void;
  onSelect: (path: string) => void;
  selectedPath: string | null;
}) {
  if (files.length === 0) return null;

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between px-3 py-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#666] uppercase tracking-wide">
          {icon}
          <span>{title}</span>
          <span className="ml-1 px-1.5 py-0.5 bg-[#f2f2f2] rounded-full text-[9px]">{files.length}</span>
        </div>
        {onStage && files.length > 0 && (
          <button
            onClick={() => onStage(files.map((f) => f.path))}
            className="text-[10px] font-semibold text-[#ff4f8b] hover:underline"
          >
            Stage All
          </button>
        )}
        {onUnstage && files.length > 0 && (
          <button
            onClick={() => onUnstage(files.map((f) => f.path))}
            className="text-[10px] font-semibold text-[#ff4f8b] hover:underline"
          >
            Unstage All
          </button>
        )}
      </div>
      <div className="space-y-0.5 px-2">
        {files.map((file) => (
          <button
            key={file.path}
            onClick={() => onSelect(file.path)}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors group ${
              selectedPath === file.path
                ? "bg-[#fff0f6] ring-1 ring-[#ff4f8b]/20"
                : "hover:bg-[#f2f2f2]"
            }`}
          >
            <StatusBadge status={String(file.index !== " " ? file.index : file.workingTree)} />
            <span className="flex-1 min-w-0 truncate font-medium text-[#1a1a1a]">
              {file.path}
            </span>
            {staged ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnstage?.([file.path]);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#fff0f6] rounded transition-opacity"
                title="Unstage"
              >
                <Ban className="w-3 h-3 text-[#999]" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStage?.([file.path]);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#e8f5e9] rounded transition-opacity"
                title="Stage"
              >
                <Plus className="w-3 h-3 text-[#0c831f]" />
              </button>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Diff Viewer ──
function DiffViewer({ diff }: { diff: string }) {
  const lines = diff.split("\n");
  const [collapsed, setCollapsed] = useState(false);

  if (!diff) {
    return (
      <div className="flex items-center justify-center h-32 text-xs text-[#999]">
        Select a file to view its diff
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1 text-[10px] font-bold text-[#666] mb-1 hover:text-[#ff4f8b] transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        Diff ({lines.length} lines)
      </button>
      {!collapsed && (
        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] max-h-[400px] overflow-y-auto">
          <pre className="text-[11px] leading-[1.6] font-mono p-3 overflow-x-auto">
            {lines.map((line, i) => {
              let className = "text-[#ccc]";
              if (line.startsWith("+")) className = "text-[#4caf50] bg-[#1b3d1b]/40";
              if (line.startsWith("-")) className = "text-[#ff4f8b] bg-[#3d1b2b]/40";
              if (line.startsWith("@")) className = "text-[#42a5f5] bg-[#1b2b3d]/40";
              if (line.startsWith("diff --git")) className = "text-[#ff4f8b] font-bold";
              if (line.startsWith("index") || line.startsWith("---") || line.startsWith("+++")) className = "text-[#666]";
              return (
                <div key={i} className={`${className} px-2`}>
                  {line}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Main Git Integration Component ──
export default function GitIntegration() {
  const {
    status,
    commits,
    branches,
    diffs,
    selectedFilePath,
    loading,
    error,
    fetchStatus,
    fetchLog,
    fetchBranches,
    fetchDiff,
    stageFiles,
    unstageFiles,
    commit: doCommit,
    checkoutBranch: doCheckout,
    pull: doPull,
    push: doPush,
    fetch: doFetch,
    refreshAll,
    selectFile,
    clearError,
  } = useGitStore();

  const [activeTab, setActiveTab] = useState<"changes" | "history" | "branches">("changes");
  const [commitMessage, setCommitMessage] = useState("");
  const [commitDesc, setCommitDesc] = useState("");
  const [showCommitForm, setShowCommitForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const handleRefresh = useCallback(() => {
    refreshAll();
    toast.success("Git status refreshed");
  }, [refreshAll]);

  const handleStageFiles = async (paths: string[]) => {
    const ok = await stageFiles(paths);
    if (ok) toast.success(`${paths.length} file(s) staged`);
  };

  const handleUnstageFiles = async (paths: string[]) => {
    const ok = await unstageFiles(paths);
    if (ok) toast.success(`${paths.length} file(s) unstaged`);
  };

  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      toast.error("Commit message cannot be empty — please enter a message");
      return;
    }
    if (!hasStaged) {
      toast.error("No staged files to commit — stage files first");
      return;
    }
    const ok = await doCommit(commitMessage.trim(), commitDesc.trim() || undefined);
    if (ok) {
      toast.success("Commit created! ✅");
      setCommitMessage("");
      setCommitDesc("");
      setShowCommitForm(false);
    }
  };

  const handleBranchCheckout = async (name: string) => {
    const ok = await doCheckout(name);
    if (ok) toast.success(`Switched to branch: ${name}`);
  };

  const handlePull = async () => {
    const ok = await doPull();
    if (ok) toast.success("Pulled latest changes");
  };

  const handlePush = async () => {
    const branch = status?.currentBranch;
    const ok = await doPush("origin", branch);
    if (ok) toast.success(`Pushed to origin/${branch}`);
  };

  // Filter commits by search
  const filteredCommits = commits.filter(
    (c) =>
      !searchQuery ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortHash.includes(searchQuery),
  );

  const hasStaged = status && status.staged.length > 0;
  const hasChanges = status && (status.staged.length > 0 || status.unstaged.length > 0 || status.untracked.length > 0);

  // Extract diff text for selected file
  const selectedDiff = selectedFilePath
    ? diffs.find((d) => d.path === selectedFilePath)?.diff
    : "";

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-white rounded-2xl border border-[#e8e8e8] shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e8e8] bg-[#fafafa]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#fff0f6] flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-[#ff4f8b]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1a1a1a]">Git Integration</h2>
            {status && (
              <p className="text-[10px] text-[#666] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c831f]" />
                {status.currentBranch}
                {status.ahead > 0 && (
                  <span className="text-[#0c831f] font-semibold">↑{status.ahead}</span>
                )}
                {status.behind > 0 && (
                  <span className="text-[#ff4f8b] font-semibold">↓{status.behind}</span>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePull}
            disabled={loading}
            className="p-1.5 rounded-lg hover:bg-[#e8f5e9] transition-colors"
            title="Pull"
          >
            <Download className="w-4 h-4 text-[#0c831f]" />
          </button>
          <button
            onClick={handlePush}
            disabled={loading}
            className="p-1.5 rounded-lg hover:bg-[#fff0f6] transition-colors"
            title="Push"
          >
            <Upload className="w-4 h-4 text-[#ff4f8b]" />
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`p-1.5 rounded-lg hover:bg-[#f2f2f2] transition-colors ${loading ? "animate-spin" : ""}`}
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 text-[#666]" />
          </button>
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="mx-5 mt-3 px-3 py-2 bg-[#fff0f6] border border-[#ff4f8b]/20 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#ff4f8b] flex-shrink-0" />
          <p className="text-xs text-[#ff4f8b] flex-1">{error}</p>
          <button onClick={clearError} className="text-[#ff4f8b] text-xs font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {/* ── Tab Bar ── */}
      <div className="flex border-b border-[#e8e8e8] px-4">
        {[
          { id: "changes", label: "Changes", icon: FileEdit, count: hasChanges ? (status?.staged.length ?? 0) + (status?.unstaged.length ?? 0) + (status?.untracked.length ?? 0) : 0 },
          { id: "history", label: "History", icon: History, count: 0 },
          { id: "branches", label: "Branches", icon: GitFork, count: branches.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#ff4f8b] text-[#ff4f8b]"
                : "border-transparent text-[#999] hover:text-[#666]"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            {tab.count > 0 && (
              <span className="px-1.5 py-0.5 bg-[#f2f2f2] rounded-full text-[9px]">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 overflow-hidden flex">
        {/* ── Changes Tab ── */}
        {activeTab === "changes" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <FileList
                files={status?.staged || []}
                title="Staged"
                icon={<CheckCircle2 className="w-3 h-3 text-[#0c831f]" />}
                staged
                onUnstage={handleUnstageFiles}
                onSelect={selectFile}
                selectedPath={selectedFilePath}
              />
              <FileList
                files={status?.unstaged || []}
                title="Unstaged"
                icon={<FileEdit className="w-3 h-3 text-[#e65100]" />}
                onStage={handleStageFiles}
                onSelect={selectFile}
                selectedPath={selectedFilePath}
              />
              <FileList
                files={status?.untracked || []}
                title="Untracked"
                icon={<FilePlus2 className="w-3 h-3 text-[#999]" />}
                onStage={handleStageFiles}
                onSelect={selectFile}
                selectedPath={selectedFilePath}
              />

              {!hasChanges && !loading && (
                <div className="flex flex-col items-center justify-center h-32 text-xs text-[#999]">
                  <CheckCircle2 className="w-8 h-8 text-[#0c831f] mb-2" />
                  <p className="font-semibold">No changes — working tree clean</p>
                </div>
              )}

              {loading && !status && (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="w-5 h-5 animate-spin text-[#ff4f8b]" />
                </div>
              )}
            </div>

            {/* ── Commit Form ── */}
            <div className="border-t border-[#e8e8e8] p-3 bg-[#fafafa]">
              {showCommitForm ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Commit message"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    className="w-full h-9 rounded-lg border border-[#e8e8e8] px-3 text-sm outline-none focus:border-[#ff4f8b] transition-colors"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) handleCommit();
                    }}
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={commitDesc}
                    onChange={(e) => setCommitDesc(e.target.value)}
                    className="w-full h-16 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm outline-none focus:border-[#ff4f8b] transition-colors resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCommit}
                      disabled={!commitMessage.trim() || loading || !hasStaged}
                      className="flex-1 h-9 rounded-lg bg-[#ff4f8b] text-white text-xs font-bold hover:bg-[#e63872] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      Commit
                    </button>
                    <button
                      onClick={() => setShowCommitForm(false)}
                      className="h-9 px-4 rounded-lg border border-[#e8e8e8] text-xs font-semibold text-[#666] hover:bg-[#f2f2f2] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCommitForm(true)}
                  disabled={!hasStaged}
                  className="w-full h-9 rounded-lg bg-[#ff4f8b] text-white text-xs font-bold hover:bg-[#e63872] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <SquarePen className="w-3.5 h-3.5" />
                  Commit ({status?.staged.length || 0} staged files)
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── History Tab ── */}
        {activeTab === "history" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-3 pt-3 pb-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999]" />
                <input
                  type="text"
                  placeholder="Search commits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 rounded-lg border border-[#e8e8e8] pl-9 pr-3 text-sm outline-none focus:border-[#ff4f8b] transition-colors"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredCommits.map((commit) => (
                <CommitRow key={commit.hash} commit={commit} />
              ))}
              {filteredCommits.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-xs text-[#999]">
                  <History className="w-8 h-8 text-[#ccc] mb-2" />
                  <p>{searchQuery ? "No matching commits" : "No commits yet"}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Branches Tab ── */}
        {activeTab === "branches" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {branches.map((branch) => (
                <div
                  key={branch.name}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                    branch.current
                      ? "bg-[#fff0f6] ring-1 ring-[#ff4f8b]/20"
                      : "hover:bg-[#fafafa]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GitFork className={`w-4 h-4 flex-shrink-0 ${branch.current ? "text-[#ff4f8b]" : "text-[#999]"}`} />
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${branch.current ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                        {branch.name}
                        {branch.current && (
                          <span className="ml-1.5 text-[9px] font-bold text-[#ff4f8b]">(current)</span>
                        )}
                      </p>
                      {branch.upstream && (
                        <p className="text-[10px] text-[#999] truncate">{branch.upstream}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {branch.ahead > 0 && (
                      <span className="text-[10px] text-[#0c831f] font-semibold">↑{branch.ahead}</span>
                    )}
                    {branch.behind > 0 && (
                      <span className="text-[10px] text-[#ff4f8b] font-semibold">↓{branch.behind}</span>
                    )}
                    {!branch.current && (
                      <button
                        onClick={() => handleBranchCheckout(branch.name)}
                        className="px-2.5 py-1 rounded-lg bg-[#f2f2f2] text-[10px] font-bold text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors"
                      >
                        Checkout
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Diff Panel (right sidebar) ── */}
        {activeTab === "changes" && selectedFilePath && (
          <div className="w-[400px] border-l border-[#e8e8e8] bg-white overflow-y-auto p-3 hidden lg:block">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <FileCode className="w-3.5 h-3.5 text-[#ff4f8b] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1a1a1a] truncate">{selectedFilePath}</span>
              </div>
              <button
                onClick={() => selectFile(null)}
                className="p-0.5 hover:bg-[#f2f2f2] rounded transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DiffViewer diff={selectedDiff || ""} />
          </div>
        )}
      </div>

      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-[#e8e8e8] bg-[#fafafa] text-[10px] text-[#999]">
        <div className="flex items-center gap-3">
          {status && (
            <>
              <span className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                {status.currentBranch}
              </span>
              <span>{status.staged.length} staged</span>
              <span>{status.unstaged.length} unstaged</span>
              <span>{status.untracked.length} untracked</span>
              {status.conflicts > 0 && (
                <span className="text-[#ff4f8b] font-bold">{status.conflicts} conflict(s)</span>
              )}
            </>
          )}
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-1 hover:text-[#ff4f8b] transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    </div>
  );
}
