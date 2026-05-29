"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface AccountErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AccountError({ error, reset }: AccountErrorProps) {
  useEffect(() => {
    console.error("[Account Error Boundary]", error.message, error.digest);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#ff4f8b] flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-[#1a1a1a] mb-2">Account Error</h1>
        <p className="text-sm text-[#666] mb-8 leading-relaxed">
          Something went wrong while loading this page. Your account data is safe.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0c831f] px-6 text-sm font-black text-white hover:bg-[#0a6e1a] transition-colors w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#e8e8e8] bg-white px-6 text-sm font-black text-[#1a1a1a] hover:bg-[#f6f7f6] transition-colors w-full sm:w-auto"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
