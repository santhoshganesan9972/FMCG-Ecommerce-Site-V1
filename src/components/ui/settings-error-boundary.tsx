"use client";

import { Component, type ReactNode } from "react";
import { TriangleAlert, RefreshCw, WifiOff } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class SettingsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[SettingsErrorBoundary]", error.message, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message ?? "";
      const isSocketError =
        errorMsg.includes("socket") ||
        errorMsg.includes("fetch") ||
        errorMsg.includes("closed") ||
        errorMsg.includes("connection") ||
        errorMsg.includes("network");

      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-[#e8e8e8] bg-white p-8 text-center shadow-sm">
            {isSocketError ? (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f6]">
                <WifiOff className="h-8 w-8 text-[#ff4f8b]" />
              </div>
            ) : (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f6]">
                <TriangleAlert className="h-8 w-8 text-[#ff4f8b]" />
              </div>
            )}

            <h2 className="mt-5 text-xl font-black text-[#1a1a1a]">
              {isSocketError ? "Connection Lost" : "Something Went Wrong"}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#666]">
              {isSocketError
                ? "The server connection was interrupted. This may happen during development when the dev server restarts or the connection drops."
                : "An unexpected error occurred while loading this page."}
            </p>

            {process.env.NODE_ENV === "development" && errorMsg && (
              <details className="mt-4 rounded-lg bg-[#f6f7f6] p-3 text-left">
                <summary className="cursor-pointer text-xs font-bold text-[#999] hover:text-[#666]">
                  Error details
                </summary>
                <pre className="mt-2 overflow-x-auto text-[10px] leading-relaxed text-[#666] whitespace-pre-wrap">
                  {errorMsg}
                </pre>
              </details>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0c831f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0a6e1a]"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-6 py-3 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </button>
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-[#999]">
              If this persists, try{" "}
              <button
                onClick={this.handleReload}
                className="font-bold text-[#0c831f] underline hover:text-[#ff4f8b]"
              >
                reloading the page
              </button>{" "}
              or restarting the dev server.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
