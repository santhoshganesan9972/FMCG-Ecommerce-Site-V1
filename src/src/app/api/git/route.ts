/**
 * Git Integration API Route
 * Provides a secure interface for Git operations from the admin panel.
 * Only accessible in development environments for safety.
 */
import { NextRequest, NextResponse } from "next/server";
import { handleGitOperation } from "@/lib/git-api-helpers";
import type { GitApiRequest } from "@/lib/git";

export async function POST(request: NextRequest) {
  // Safety: Only allow Git operations in development or when explicitly enabled
  if (process.env.NODE_ENV !== "development" && process.env.ALLOW_GIT_API !== "true") {
    return NextResponse.json(
      {
        success: false,
        error: "Git API is only available in development mode. Set ALLOW_GIT_API=true to override.",
      },
      { status: 403 },
    );
  }

  try {
    const body: GitApiRequest = await request.json();

    if (!body.operation) {
      return NextResponse.json(
        { success: false, error: "Missing 'operation' field" },
        { status: 400 },
      );
    }

    // List of allowed operations
    const allowedOps = [
      "status", "log", "branches", "diff",
      "stage", "unstage", "commit", "checkout",
      "pull", "push", "fetch",
    ];

    if (!allowedOps.includes(body.operation)) {
      return NextResponse.json(
        { success: false, error: `Operation '${body.operation}' is not allowed` },
        { status: 400 },
      );
    }

    // Block destructive operations from the API for safety
    if (["push"].includes(body.operation)) {
      // Push requires explicit confirmation via ALLOW_GIT_PUSH env var
      if (process.env.ALLOW_GIT_PUSH !== "true") {
        return NextResponse.json(
          {
            success: false,
            error: "Push operations are disabled. Set ALLOW_GIT_PUSH=true to enable.",
          },
          { status: 403 },
        );
      }
    }

    const result = await handleGitOperation(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: `API error: ${message.split("\n")[0]}` },
      { status: 500 },
    );
  }
}

/** Health check endpoint */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      status: "Git Integration API",
      environment: process.env.NODE_ENV || "unknown",
      gitAvailable: true,
    },
  });
}
