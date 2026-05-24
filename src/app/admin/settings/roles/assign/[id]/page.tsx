"use client";

import { useState } from "react";
import DashboardLayout from "../../../../dashboard-layout";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Search,
  Users,
  Shield,
  Mail,
  Clock,
  UserCheck,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  assigned: boolean;
  lastActive: string;
  avatar: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", department: "Operations", assigned: true, lastActive: "Today, 09:15 AM", avatar: "RK" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", department: "Customer Support", assigned: true, lastActive: "Today, 08:45 AM", avatar: "PS" },
  { id: 3, name: "Amit Patel", email: "amit@example.com", department: "Inventory", assigned: true, lastActive: "Yesterday, 05:30 PM", avatar: "AP" },
  { id: 4, name: "Sneha Singh", email: "sneha@example.com", department: "Finance", assigned: false, lastActive: "Today, 10:00 AM", avatar: "SS" },
  { id: 5, name: "Vikram Mehta", email: "vikram@example.com", department: "Marketing", assigned: false, lastActive: "Yesterday, 03:15 PM", avatar: "VM" },
  { id: 6, name: "Ananya Gupta", email: "ananya@example.com", department: "Sales", assigned: false, lastActive: "May 20, 2026", avatar: "AG" },
  { id: 7, name: "Rohit Verma", email: "rohit@example.com", department: "IT", assigned: false, lastActive: "May 19, 2026", avatar: "RV" },
  { id: 8, name: "Neha Kapoor", email: "neha@example.com", department: "HR", assigned: false, lastActive: "May 18, 2026", avatar: "NK" },
];

const roleInfo = {
  id: "role-123",
  name: "Inventory Manager",
  description: "Manages product catalog, stock levels, and vendor relationships.",
  userCount: 3,
};

export default function AssignRolePage() {
  const params = useParams();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAssign = (id: number) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, assigned: !u.assigned } : u)));
  };

  const assignedCount = users.filter((u) => u.assigned).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <Link
              href="/admin/settings/roles"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa]"
            >
              <ArrowLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Link>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Security Center
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Assign Role
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Assign users to the <span className="font-bold text-[#1a1a1a]">{roleInfo.name}</span> role.
                Users will inherit all permissions associated with this role.
              </p>
            </div>
          </div>
        </section>

        {/* Role Info Card */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-[#f6f7f6] p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#e8f5e9]">
              <Shield className="h-6 w-6 text-[#0c831f]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-[#1a1a1a]">{roleInfo.name}</p>
                  <p className="text-xs text-[#666]">{roleInfo.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#0c831f]">{assignedCount}</p>
                    <p className="text-[10px] font-semibold text-[#666]">Assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#1a1a1a]">{users.length}</p>
                    <p className="text-[10px] font-semibold text-[#666]">Total Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit}>
          {/* Search & User List */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
            <div className="border-b border-[#e8e8e8] px-5 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e8e8] bg-[#f8f9fa] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#0c831f] placeholder:text-[#999]"
                />
              </div>
            </div>

            <div className="divide-y divide-[#e8e8e8]">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f9fafb] ${
                    user.assigned ? "bg-[#fafef9]" : ""
                  }`}
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-black text-sm ${
                    user.assigned
                      ? "bg-[#e8f5e9] text-[#0c831f]"
                      : "bg-[#f6f7f6] text-[#666]"
                  }`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#1a1a1a]">{user.name}</p>
                      {user.assigned && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-[#e8f5e9] text-[#0c831f] text-[9px] font-black px-1.5 py-0.5">
                          <UserCheck className="h-2.5 w-2.5" />
                          Assigned
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-[#666]">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </span>
                      <span className="text-[10px] text-[#ccc]">|</span>
                      <span className="text-xs text-[#666]">{user.department}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-[#999]" />
                      <span className="text-[10px] text-[#999]">Last active: {user.lastActive}</span>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={user.assigned}
                      onChange={() => toggleAssign(user.id)}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full border border-[#e8e8e8] bg-[#f0f0f0] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-[#e8e8e8] after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0c831f] peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-[#999] mb-3" />
                  <p className="text-sm font-bold text-[#1a1a1a]">No users found</p>
                  <p className="text-xs text-[#999] mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            <div className="border-t border-[#e8e8e8] px-5 py-3 flex items-center justify-between bg-[#f9fafb]">
              <span className="text-xs font-semibold text-[#666]">
                Showing {filteredUsers.length} of {users.length} users
              </span>
              <span className="text-xs font-bold text-[#0c831f]">
                {assignedCount} users assigned
              </span>
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/settings/roles"
              className="rounded-xl border border-[#e8e8e8] bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-colors ${
                saving
                  ? "bg-[#ccc] cursor-not-allowed"
                  : "bg-[#0c831f] hover:bg-[#0a6a18]"
              }`}
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Assignments
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
