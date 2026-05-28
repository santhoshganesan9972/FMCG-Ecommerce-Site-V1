"use client";

import { useState, useEffect, Suspense } from "react";
import SidebarEnterprise from "@/components/ui/admin/sidebar-enterprise";
import Topbar from "./topbar";
import AdminFooter from "@/components/ui/admin/footer";
import AdminGuard from "@/components/ui/admin/admin-guard";

const STORAGE_KEY = "admin_sidebar_collapsed";

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setSidebarCollapsed(true);
    }
  }, []);

  const handleToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  };

  // Prevent hydration mismatch by matching server render
  const sidebarMargin = mounted
    ? sidebarCollapsed
      ? "md:ml-16"
      : "md:ml-64"
    : "md:ml-64";

  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#1a1a1a]">
      <SidebarEnterprise
        collapsed={sidebarCollapsed}
        onToggle={handleToggle}
      />

      <div
        className={`min-w-0 flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarMargin}`}
      >
        <Topbar
          collapsed={sidebarCollapsed}
          onToggleSidebar={() => handleToggle(!sidebarCollapsed)}
        />

        <div className="h-14 shrink-0" />

        <main className="flex-1 min-h-0 p-2.5 sm:p-3.5">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
