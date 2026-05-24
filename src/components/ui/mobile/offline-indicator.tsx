"use client";

import { useEffect, useState } from "react";
import { useOfflineStore } from "@/store/offline-store";
import { Wifi, WifiOff, RefreshCw, X } from "lucide-react";

export default function OfflineIndicator() {
  const { isOnline, wasOffline } = useOfflineStore();
  const [dismissed, setDismissed] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  // Show "Back online" toast briefly
  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      setDismissed(false);
      const timer = setTimeout(() => setShowReconnected(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // Reset dismissed when going offline
  useEffect(() => {
    if (!isOnline) setDismissed(false);
  }, [isOnline]);

  if (isOnline && !showReconnected) return null;

  return (
    <>
      {/* Offline banner */}
      {!isOnline && !dismissed && (
        <div className="fixed top-0 left-0 right-0 z-[60] animate-slide-down">
          <div className="bg-[#ff4f8b] text-white px-4 py-2.5 flex items-center gap-2.5">
            <div className="relative">
              <WifiOff className="w-4 h-4 flex-shrink-0" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">You&apos;re offline</p>
              <p className="text-[10px] text-white/80">Showing cached content. Some features may be limited.</p>
            </div>
            <button
              onClick={() => {
                setDismissed(true);
                if (navigator.serviceWorker?.controller) {
                  // Attempt to sync pending data
                  navigator.serviceWorker.controller.postMessage({ type: "SYNC" });
                }
              }}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Dismiss offline banner"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Reconnected toast */}
      {showReconnected && isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[60] animate-slide-down">
          <div className="bg-[#0c831f] text-white px-4 py-2.5 flex items-center gap-2.5">
            <div className="relative">
              <Wifi className="w-4 h-4 flex-shrink-0" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4ade80]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">Back online</p>
              <p className="text-[10px] text-white/80">Syncing your latest data...</p>
            </div>
            <RefreshCw className="w-3.5 h-3.5 text-white/80 animate-spin" />
          </div>
        </div>
      )}
    </>
  );
}
