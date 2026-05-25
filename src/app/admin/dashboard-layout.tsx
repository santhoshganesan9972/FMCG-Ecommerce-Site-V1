"use client";

import { useState } from "react";
import SidebarEnterprise from "@/components/ui/admin/sidebar-enterprise";
import Topbar from "./topbar";
import AdminFooter from "@/components/ui/admin/footer";

const STORAGE_KEY = "admin_sidebar_collapsed";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lazy initializer — SSR-safe: server returns false, client hydrates with false,
  // then instantly reads localStorage to avoid any flash.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) === "true";
    }
    return false;
  });

  // Persist sidebar state on change
  const handleToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  };

  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#1a1a1a]">
      {/* Enterprise Sidebar (fixed) */}
      <SidebarEnterprise
        collapsed={sidebarCollapsed}
        onToggle={handleToggle}
      />

      <div
        className={`min-w-0 flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {/* Fixed/sticky header */}
        <Topbar collapsed={sidebarCollapsed} />

        {/* Spacer for fixed header */}
        <div className="h-14 shrink-0" />

        <main className="flex-1 min-h-0 p-4 sm:p-6">
          {children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
