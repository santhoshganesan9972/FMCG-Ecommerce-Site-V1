/**
 * Git integration types — mirrors the VS Code Git extension API surface.
 * Used across API routes, stores, and UI components for type safety.
 */

/** Possible file statuses from `git status --porcelain` */
export type GitFileStatus =
  | " "   // No changes in index (XY pair space)
  | "M"   // Modified
  | "A"   // Added
  | "D"   // Deleted
  | "R"   // Renamed
  | "C"   // Copied
  | "U"   // Updated but unmerged
  | "?"   // Untracked
  | "!"   // Ignored
  | "AM"  // Added (staged) + Modified (working tree)
  | "MM"  // Modified (staged) + Modified (working tree)
  | "??"  // Untracked (alias for ?)
  | "!!"  // Ignored (alias for !)
  | "AA"  // Added (index) + Added (working tree) = conflict
  | "DD"  // Deleted (index) + Deleted (working tree) = conflict
  | "AU"  // Added (index) + Unmerged (working tree)
  | "UA"  // Unmerged (index) + Added (working tree)
  | "UD"  // Unmerged (index) + Deleted (working tree)
  | "DU"  // Deleted (index) + Unmerged (working tree)
  ;

/** A single changed file entry */
export interface GitFileChange {
  /** Working tree status (first char in porcelain) */
  workingTree: GitFileStatus;
  /** Index/staging status (second char in porcelain) */
  index: GitFileStatus;
  /** File path relative to repo root */
  path: string;
  /** Original path (for renames) */
  originalPath?: string;
}

/** Staged/unstaged/untracked groupings */
export interface GitStatus {
  /** Repo root absolute path */
  repoRoot: string;
  /** Current branch name */
  currentBranch: string;
  /** Ahead/behind counts */
  ahead: number;
  behind: number;
  /** Staged changes */
  staged: GitFileChange[];
  /** Unstaged changes */
  unstaged: GitFileChange[];
  /** Untracked files */
  untracked: GitFileChange[];
  /** Merge/rebase conflict count */
  conflicts: number;
}

/** A single commit entry */
export interface GitCommit {
  hash: string;
  shortHash: string;
  author: string;
  email: string;
  date: string;
  message: string;
  body: string;
  refs: string[];
}

/** Branch info */
export interface GitBranch {
  name: string;
  current: boolean;
  upstream?: string;
  ahead: number;
  behind: number;
}

/** Unified diff output for a single file */
export interface GitDiff {
  path: string;
  originalPath?: string;
  status: GitFileStatus;
  diff: string;
  added: number;
  removed: number;
}

/** Result of a Git operation */
export interface GitResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Params for creating a commit */
export interface GitCommitParams {
  message: string;
  description?: string;
  /** Paths to include (if empty, commits all staged) */
  paths?: string[];
  /** Whether to amend the previous commit */
  amend?: boolean;
}

/** Params for staging/unstaging */
export interface GitStageParams {
  paths: string[];
  /** If true, unstage instead of stage */
  unstage?: boolean;
}

/** API endpoint names for Git operations */
export type GitOperation =
  | "status"
  | "log"
  | "branches"
  | "branch"
  | "diff"
  | "commit"
  | "stage"
  | "unstage"
  | "checkout"
  | "pull"
  | "push"
  | "fetch"
  | "init"
  | "add-remote"
  ;

/** Request body sent to the Git API */
export interface GitApiRequest {
  operation: GitOperation;
  params?: Record<string, unknown>;
}

/** Response from the Git API */
export interface GitApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  /** Current working directory used */
  cwd?: string;
}

// ── Helpers ──

/** Parse `git status --porcelain -b` output into structured GitStatus */
export function parsePorcelainStatus(raw: string, repoRoot: string, branchLine: string): GitStatus {
  const staged: GitFileChange[] = [];
  const unstaged: GitFileChange[] = [];
  const untracked: GitFileChange[] = [];
  let conflicts = 0;

  const lines = raw.split("\n").filter((l) => l.trim());

  for (const line of lines) {
    if (line.length < 3) continue;
    const idx = line[0] as GitFileStatus;
    const wt = line[1] as GitFileStatus;
    const pathPart = line.substring(3).trim();

    // Handle renames: "R  file.txt -> newfile.txt"
    const path = pathPart.includes(" -> ") ? pathPart.split(" -> ")[1].trim() : pathPart;
    const originalPath = pathPart.includes(" -> ") ? pathPart.split(" -> ")[0].trim() : undefined;

    const change: GitFileChange = { workingTree: wt, index: idx, path, originalPath };

    if (idx === "?" && wt === "?") {
      untracked.push(change);
    } else if (idx !== " " && idx !== "?") {
      staged.push(change);
    }

    if (wt !== " " && wt !== "?") {
      unstaged.push(change);
    }

    if (idx === "U" || wt === "U" || idx === "DD" || wt === "DD" || idx === "AA" || wt === "AA") {
      conflicts++;
    }
  }

  // Parse branch line from -b output
  let currentBranch = "HEAD";
  let ahead = 0;
  let behind = 0;

  const branchMatch = branchLine.match(/## (.+?)(?:\.\.\.|$)/);
  if (branchMatch) {
    currentBranch = branchMatch[1].replace("HEAD (no branch)", "detached HEAD");
  }

  const aheadMatch = branchLine.match(/ahead (\d+)/);
  if (aheadMatch) ahead = parseInt(aheadMatch[1], 10);

  const behindMatch = branchLine.match(/behind (\d+)/);
  if (behindMatch) behind = parseInt(behindMatch[1], 10);

  return {
    repoRoot,
    currentBranch,
    ahead,
    behind,
    staged,
    unstaged,
    untracked,
    conflicts,
  };
}

/** Parse `git log --format=...` output into GitCommit array */
export function parseLogOutput(raw: string): GitCommit[] {
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      // FORMAT: HASH|AUTHOR|EMAIL|DATE|MSG|BODY|REFS
      const parts = line.split("|");
      return {
        hash: parts[0] || "",
        shortHash: (parts[0] || "").substring(0, 7),
        author: parts[1] || "",
        email: parts[2] || "",
        date: parts[3] || "",
        message: parts[4] || "",
        body: parts[5] || "",
        refs: parts[6] ? parts[6].split(", ") : [],
      };
    });
}

/** Parse `git branch -vv` output into GitBranch array */
export function parseBranchOutput(raw: string, current: string): GitBranch[] {
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const isCurrent = line.startsWith("* ");
      const clean = line.replace(/^[* ] /, "").trim();
      const parts = clean.split(/\s+/);
      const name = parts[0] || "";
      const upstreamPart = clean.match(/\[([^\]]+)\]/);
      const upstream = upstreamPart ? upstreamPart[1] : undefined;
      const aheadMatch = clean.match(/ahead (\d+)/);
      const behindMatch = clean.match(/behind (\d+)/);
      return {
        name,
        current: isCurrent || name === current,
        upstream,
        ahead: aheadMatch ? parseInt(aheadMatch[1], 10) : 0,
        behind: behindMatch ? parseInt(behindMatch[1], 10) : 0,
      };
    });
}

/** Human-readable label for a file status */
export function statusLabel(status: GitFileStatus): string {
  const labels: Record<string, string> = {
    M: "Modified",
    A: "Added",
    D: "Deleted",
    R: "Renamed",
    C: "Copied",
    U: "Unmerged",
    "?": "Untracked",
    "!": "Ignored",
    MM: "Modified (staged+unstaged)",
    AM: "Added (staged+modified)",
    "??": "Untracked",
    "!!": "Ignored",
  };
  return labels[status] || status;
}

/** Color for a file status badge */
export function statusColor(status: GitFileStatus): string {
  const colors: Record<string, string> = {
    M: "bg-yellow-100 text-yellow-800",
    A: "bg-green-100 text-green-800",
    D: "bg-red-100 text-red-800",
    R: "bg-blue-100 text-blue-800",
    C: "bg-purple-100 text-purple-800",
    U: "bg-orange-100 text-orange-800",
    "?": "bg-gray-100 text-gray-800",
    "!!": "bg-gray-100 text-gray-500",
    MM: "bg-yellow-100 text-yellow-800",
    AM: "bg-yellow-100 text-yellow-800",
    "??": "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-600";
}
