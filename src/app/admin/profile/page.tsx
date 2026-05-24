"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export default function AdminProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const displayName = user?.name || "Super Admin";
  const displayEmail = user?.email || "admin@fmcg.com";
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1) + " — Admin"
    : "Operations Lead — Admin";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const handleSignOut = () => {
    logout();
    toast.success("Signed out successfully", {
      duration: 2000,
      position: "top-center",
    });
    router.push("/admin");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Admin profile
            </p>
            <h1 className="text-2xl font-black text-[#1a1a1a]">Profile</h1>
            <p className="text-sm text-[#666]">
              Manage your admin account details and access quick profile actions.
            </p>
          </div>

          {/* Avatar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0c831f] text-2xl font-black text-white shadow-sm">
              {avatarInitial}
            </div>
            <div>
              <p className="text-lg font-black text-[#1a1a1a]">{displayName}</p>
              <p className="text-sm text-[#666]">{displayRole}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e8e8e8] bg-[#f6f7f6] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#666]">
                Name
              </p>
              <p className="mt-2 text-lg font-black text-[#1a1a1a]">{displayName}</p>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] bg-[#f6f7f6] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#666]">
                Role
              </p>
              <p className="mt-2 text-lg font-black text-[#1a1a1a]">{displayRole}</p>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] bg-[#f6f7f6] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#666]">
                Email
              </p>
              <p className="mt-2 text-lg font-black text-[#1a1a1a]">{displayEmail}</p>
            </div>
            <div className="rounded-2xl border border-[#e8e8e8] bg-[#f6f7f6] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#666]">
                Last login
              </p>
              <p className="mt-2 text-lg font-black text-[#1a1a1a]">Today, 08:42 AM</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#ff4f8b] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e63872] btn-press">
              Edit profile
            </button>
            <button
              onClick={handleSignOut}
              className="rounded-full border border-[#e8e8e8] bg-white px-5 py-3 text-sm font-black text-[#1a1a1a] transition hover:bg-[#f6f7f6] btn-press"
            >
              Sign out
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

