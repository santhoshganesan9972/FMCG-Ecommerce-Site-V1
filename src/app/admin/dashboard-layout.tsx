"use client";

import Sidebar from "./sidebar";
import Topbar from "./topbar";
import AdminFooter from "@/components/ui/admin/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f2f2f2] text-[#1a1a1a]">
      <div className="fixed left-0 top-0 bottom-0 z-20 hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      <div className="min-w-0 flex-1 md:ml-64 flex flex-col">
        {/* Fixed/sticky header */}
        <Topbar />

        {/* Spacer for fixed header */}
        <div className="h-14 shrink-0" />

        <main className="flex-1 min-h-0 overflow-y-auto px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5">
          <div className="mx-auto w-full max-w-[1200px]">
            {children}
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
