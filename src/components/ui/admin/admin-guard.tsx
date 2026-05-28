"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * AdminGuard wraps admin pages and ensures the user is authenticated
 * with an admin role before rendering children.
 *
 * Behaviour:
 * - Waits for Zustand persist to rehydrate
 * - If not logged in or not admin → redirect to homepage
 * - If admin → render children
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand persist to finish hydrating from localStorage
  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
    return () => unsub();
  }, []);

  // Once hydrated, check admin status
  useEffect(() => {
    if (!hydrated) return;

    const { isLoggedIn, user } = useAuthStore.getState();
    const isAdmin = isLoggedIn && user?.role === "admin";

    if (!isAdmin) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [hydrated, router]);

  if (!checked) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#0c831f]" />
          <p className="text-sm font-medium text-[#666]">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
