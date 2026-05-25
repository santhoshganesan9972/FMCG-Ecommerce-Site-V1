"use client";

import { useState } from "react";
import SidebarEnterprise from "@/components/ui/admin/sidebar-enterprise";
import Topbar from "./topbar";
import AdminFooter from "@/components/ui/admin/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#1a1a1a]">
      {/* Enterprise Sidebar (fixed) */}
      <SidebarEnterprise
        collapsed={sidebarCollapsed}
        onToggle={setSidebarCollapsed}
      />

      <div
        className={`min-w-0 flex-1 flex flex-col transition-all duration-200 ${
          sidebarCollapsed ? "" : "md:ml-64"
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
