"use client";

import { Component, type ReactNode } from "react";
import { TriangleAlert, RefreshCw, WifiOff } from "lucide-react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode | ((error: Error, retry: () => void) => ReactNode);
  /** Optional callback when an error is caught */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * General-purpose error boundary that catches rendering errors
 * and displays a fallback UI with retry/reload options.
 *
 * Can be used at the route segment or component level.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error.message, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const error = this.state.error!;

      // Allow custom fallback
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback(error, this.handleRetry);
        }
        return this.props.fallback;
      }

      // Default fallback UI
      const errorMsg = error.message ?? "";
      const isSocketError =
        errorMsg.includes("socket") ||
        errorMsg.includes("fetch") ||
        errorMsg.includes("closed") ||
        errorMsg.includes("connection") ||
        errorMsg.includes("network");

      return (
        <div
          className="flex min-h-[300px] w-full items-center justify-center p-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#e8e8e8] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f6]">
              {isSocketError ? (
                <WifiOff className="h-8 w-8 text-[#ff4f8b]" />
              ) : (
                <TriangleAlert className="h-8 w-8 text-[#ff4f8b]" />
              )}
            </div>

            <h2 className="mt-5 text-xl font-black text-[#1a1a1a]">
              {isSocketError ? "Connection Lost" : "Something Went Wrong"}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#666]">
              {isSocketError
                ? "The connection was interrupted. Please check your network and try again."
                : "An unexpected error occurred. Try again or reload the page."}
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
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0c831f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0a6e1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c831f]"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-6 py-3 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#666]"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
