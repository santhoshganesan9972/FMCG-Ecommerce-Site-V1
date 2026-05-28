"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, MapPin, Smartphone } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export default function AuthGate() {
  const pathname = usePathname();
  const { isLoggedIn, login } = useAuthStore();
  const [open, setOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Close gate if user is already logged in (handles Zustand rehydration)
  useEffect(() => {
    if (isLoggedIn) {
      setOpen(false);
    }
  }, [isLoggedIn]);

  // Don't show the gate on admin routes — the admin panel has its own auth context.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      login({
        id: "user_" + phoneNumber,
        name: "User",
        email: "user@fmcgcommerce.com",
        role: "user",
        token: "mock_jwt_" + Date.now(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }, phoneNumber);
      setOpen(false);
      toast.success("Welcome to FMCG Commerce! 🎉", {
        description: "Start shopping for fresh groceries!",
        duration: 3000,
        position: "top-center",
        className: "bg-gradient-to-r from-[#0c831f] to-[#10b981] text-white border-none",
      });
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 backdrop-blur-sm sm:items-center">
      <div className="w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-md sm:rounded-3xl">
        <div className="relative bg-gradient-to-br from-[#0c831f] via-[#128f2b] to-[#ff4f8b] px-6 pb-8 pt-7 text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-xs font-black text-white/80 transition hover:text-white"
          >
            SKIP
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <span className="text-xl font-black">F</span>
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight">
            Fresh groceries in minutes
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/85">
            Sign in to see nearby stores, quick delivery slots, and member-only
            offers.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 text-xs font-bold">
            <MapPin className="h-4 w-4" />
            Delivery in 10 minutes near you
          </div>
        </div>

        <div className="px-6 py-6">
          <label className="text-xs font-black uppercase tracking-wide text-[#666]">
            Mobile number
          </label>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] text-sm font-black text-[#1a1a1a]">
              +91
            </div>
            <div className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 focus-within:border-[#0c831f]">
              <Smartphone className="h-4 w-4 flex-shrink-0 text-[#ff4f8b]" />
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#1a1a1a] outline-none placeholder:text-[#999]"
              />
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={phoneNumber.length !== 10}
            className="mt-4 flex h-12 w-full items-center justify-between rounded-xl bg-[#0c831f] px-4 text-sm font-black text-white transition hover:bg-[#0a6e1a] disabled:opacity-50"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>

          <p className="mt-4 text-center text-[10px] leading-5 text-[#999]">
            By continuing, you agree to FMCG Commerce terms and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
