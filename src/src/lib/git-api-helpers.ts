/**
 * Server-side helpers for running Git operations via child_process.
 * Only use in API routes / server components — NOT in client code.
 */
import { execSync } from "child_process";
import path from "path";
import type {
  GitStatus, GitCommit, GitBranch, GitDiff,
  GitCommitParams, GitApiRequest, GitApiResponse,
} from "./git";
import { parsePorcelainStatus, parseLogOutput, parseBranchOutput } from "./git";

/**
 * Determine the repo root directory.
 * Walks up from process.cwd() to find the .git directory.
 */
export function findRepoRoot(startDir?: string): string {
  let dir = startDir || process.cwd();
  // Walk up at most 10 levels
  for (let i = 0; i < 10; i++) {
    try {
      const result = execSync("git rev-parse --show-toplevel", {
        cwd: dir,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      }).trim();
      return result;
    } catch {
      // Walk up one level
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  // Fallback: use startDir
  return startDir || process.cwd();
}

/** Run a git command synchronously and return stdout */
export function runGit(args: string[], cwd?: string): string {
  const repoRoot = findRepoRoot(cwd);
  return execSync(`git ${args.join(" ")}`, {
    cwd: repoRoot,
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
    maxBuffer: 10 * 1024 * 1024, // 10MB
  }).trim();
}

/** Safe wrapper — catches errors and returns a structured result */
export function safeRunGit<T>(
  args: string[],
  parseFn: (stdout: string) => T,
  cwd?: string,
): { success: true; data: T } | { success: false; error: string } {
  try {
    const stdout = runGit(args, cwd);
    const data = parseFn(stdout);
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

/** Parse raw diff output into structured format */
function parseDiffOutput(raw: string, filePath: string, status: string): GitDiff {
  const lines = raw.split("\n");
  let added = 0;
  let removed = 0;
  for (const line of lines) {
    if (line.startsWith("+") && !line.startsWith("+++")) added++;
    if (line.startsWith("-") && !line.startsWith("---")) removed++;
  }
  return {
    path: filePath,
    status: status as GitDiff["status"],
    diff: raw,
    added,
    removed,
  };
}

// ── High-level Git Operations ──

export function getStatus(cwd?: string): GitApiResponse<GitStatus> {
  try {
    const repoRoot = findRepoRoot(cwd);
    const branchLine = runGit(["status", "-b", "--porcelain"], repoRoot);
    const lines = branchLine.split("\n");
    const branch = lines[0] || "";
    const rest = lines.slice(1).join("\n");
    const status = parsePorcelainStatus(rest, repoRoot, branch);
    return { success: true, data: status, cwd: repoRoot };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function getLog(count = 20, cwd?: string): GitApiResponse<GitCommit[]> {
  return safeRunGit(
    [
      "log",
      `--max-count=${count}`,
      '--format=%H|%an|%ae|%ai|%s|%b|%D',
      '--no-color',
    ],
    parseLogOutput,
    cwd,
  );
}

export function getBranches(cwd?: string): GitApiResponse<GitBranch[]> {
  try {
    const stdout = runGit(["branch", "-vv"], cwd);
    const currentBranch = runGit(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
    const data = parseBranchOutput(stdout, currentBranch);
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function getDiff(filePath?: string, staged = false, cwd?: string): GitApiResponse<GitDiff[]> {
  try {
    const args = ["diff"];
    if (staged) args.push("--cached");
    if (filePath) args.push("--", filePath);

    const stdout = runGit(args, cwd);

    // Parse multi-file diffs
    const files: GitDiff[] = [];
    const fileSections = stdout.split("\ndiff --git ");
    for (const section of fileSections) {
      if (!section.trim()) continue;
      const header = section.split("\n")[0];
      const pathMatch = header.match(/ b\/(.+)$/);
      const filePath = pathMatch ? pathMatch[1] : "unknown";
      files.push(parseDiffOutput("diff --git " + section, filePath, "M"));
    }

    return { success: true, data: files, cwd };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function stageFiles(paths: string[], cwd?: string): GitApiResponse<void> {
  try {
    // Use safe quoting for paths
    for (const p of paths) {
      runGit(["add", "--", p], cwd);
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function unstageFiles(paths: string[], cwd?: string): GitApiResponse<void> {
  try {
    for (const p of paths) {
      runGit(["reset", "HEAD", "--", p], cwd);
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function createCommit(params: GitCommitParams, cwd?: string): GitApiResponse<{ hash: string }> {
  try {
    const args = ["commit"];
    if (params.amend) args.push("--amend", "--no-edit");
    else {
      args.push("-m", params.message);
      if (params.description) args.push("-m", params.description);
    }
    if (params.paths && params.paths.length > 0) {
      args.push("--");
      args.push(...params.paths);
    }
    const stdout = runGit(args, cwd);
    const hashMatch = stdout.match(/\[[\w-]+ ([a-f0-9]+)\]/);
    return { success: true, data: { hash: hashMatch ? hashMatch[1] : "unknown" } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function checkoutBranch(branchName: string, createNew = false, cwd?: string): GitApiResponse<void> {
  try {
    const args = ["checkout"];
    if (createNew) args.push("-b");
    args.push(branchName);
    runGit(args, cwd);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function pullBranch(remote = "origin", branch?: string, cwd?: string): GitApiResponse<void> {
  try {
    const args = ["pull", remote];
    if (branch) args.push(branch);
    runGit(args, cwd);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function pushBranch(remote = "origin", branch?: string, setUpstream = false, cwd?: string): GitApiResponse<void> {
  try {
    const args = ["push", remote];
    if (setUpstream) args.push("-u");
    if (branch) args.push(branch);
    runGit(args, cwd);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

export function fetchRemote(remote = "origin", cwd?: string): GitApiResponse<void> {
  try {
    runGit(["fetch", remote], cwd);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message.split("\n")[0] };
  }
}

/**
 * Main dispatcher — routes an API request to the appropriate handler.
 */
export async function handleGitOperation(
  request: GitApiRequest,
  cwd?: string,
): Promise<GitApiResponse> {
  const { operation, params } = request;

  switch (operation) {
    case "status":
      return getStatus(cwd);

    case "log":
      return getLog((params?.count as number) || 20, cwd);

    case "branches":
      return getBranches(cwd);

    case "diff":
      return getDiff(
        params?.filePath as string | undefined,
        params?.staged as boolean | undefined,
        cwd,
      );

    case "stage":
      return stageFiles(params?.paths as string[], cwd);

    case "unstage":
      return unstageFiles(params?.paths as string[], cwd);

    case "commit":
      return createCommit(params as unknown as GitCommitParams, cwd);

    case "checkout":
      return checkoutBranch(
        params?.branch as string,
        params?.createNew as boolean,
        cwd,
      );

    case "pull":
      return pullBranch(
        params?.remote as string | undefined,
        params?.branch as string | undefined,
        cwd,
      );

    case "push":
      return pushBranch(
        params?.remote as string | undefined,
        params?.branch as string | undefined,
        params?.setUpstream as boolean | undefined,
        cwd,
      );

    case "fetch":
      return fetchRemote(params?.remote as string | undefined, cwd);

    default:
      return { success: false, error: `Unknown operation: ${operation}` };
  }
}
