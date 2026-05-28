"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  useEffect(() => {
    console.error("[Admin Error Boundary]", error.message, error.digest);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-[#e8e8e8] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f6]">
          <AlertTriangle className="h-8 w-8 text-[#ff4f8b]" />
        </div>

        <h2 className="mt-5 text-xl font-black text-[#1a1a1a]">
          Admin Error
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#666]">
          Something went wrong in the admin panel. Try again or return to the dashboard.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#0c831f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0a6e1a]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-6 py-3 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
