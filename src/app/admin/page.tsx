import DashboardLayout from "./dashboard-layout";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#fff0f6]">
          <LayoutDashboard className="h-8 w-8 text-[#ff4f8b]" />
        </div>
        <h1 className="text-2xl font-black text-[#1a1a1a]">Welcome to Admin</h1>
        <p className="mt-2 max-w-md text-sm text-[#666]">
          Select a section from the sidebar to get started.
        </p>
        <Link
          href="/admin/not-found"
          className="mt-6 rounded-xl bg-[#0c831f] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0a6a18]"
        >
          Browse Sections
        </Link>
      </div>
    </DashboardLayout>
  );
}
