"use client";
import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import {
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Shield,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Super Admin" | "Admin" | "Manager" | "Support" | "Analyst";
  department: string;
  lastLogin: string;
  status: "Active" | "Suspended" | "Inactive";
  mfaEnabled: boolean;
  failedLogins: number;
  createdAt: string;
  createdBy: string;
  permissions: string[];
  ipWhitelist: string[];
}

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "admin@fmcg.com",
    phone: "+91 98765 43210",
    role: "Super Admin",
    department: "Executive",
    lastLogin: "2 hours ago",
    status: "Active",
    mfaEnabled: true,
    failedLogins: 0,
    createdAt: "Jan 15, 2024",
    createdBy: "System",
    permissions: ["all"],
    ipWhitelist: ["192.168.1.0/24"],
  },
  {
    id: "2",
    name: "John Manager",
    email: "john.manager@fmcg.com",
    phone: "+91 98765 43211",
    role: "Manager",
    department: "Operations",
    lastLogin: "5 hours ago",
    status: "Active",
    mfaEnabled: true,
    failedLogins: 1,
    createdAt: "Feb 20, 2024",
    createdBy: "Super Admin",
    permissions: ["orders", "inventory", "vendors"],
    ipWhitelist: [],
  },
  {
    id: "3",
    name: "Priya Support",
    email: "priya@fmcg.com",
    phone: "+91 98765 43212",
    role: "Support",
    department: "Customer Care",
    lastLogin: "1 day ago",
    status: "Active",
    mfaEnabled: false,
    failedLogins: 3,
    createdAt: "Mar 10, 2024",
    createdBy: "Super Admin",
    permissions: ["customers", "orders"],
    ipWhitelist: [],
  },
  {
    id: "4",
    name: "Rahul Analyst",
    email: "rahul@fmcg.com",
    phone: "+91 98765 43213",
    role: "Analyst",
    department: "Analytics",
    lastLogin: "3 days ago",
    status: "Suspended",
    mfaEnabled: true,
    failedLogins: 5,
    createdAt: "Apr 5, 2024",
    createdBy: "John Manager",
    permissions: ["analytics", "reports"],
    ipWhitelist: [],
  },
];

const roleColors = {
  "Super Admin": "bg-[#ff4f8b] text-white",
  "Admin": "bg-[#0c831f] text-white",
  "Manager": "bg-[#6366f1] text-white",
  "Support": "bg-[#f59e0b] text-white",
  "Analyst": "bg-[#8b5cf6] text-white",
};

const statusConfig = {
  Active: { icon: CheckCircle2, color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  Suspended: { icon: AlertTriangle, color: "text-[#f59e0b]", bg: "bg-[#fef3c7]" },
  Inactive: { icon: XCircle, color: "text-[#666]", bg: "bg-[#f6f7f6]" },
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c831f]">
              Admin User Management
            </p>
            <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">
              Admin Users
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#666]">
              Manage administrative users, roles, permissions, and security settings
            </p>
          </div>
          
          <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
            <Plus className="w-4 h-4" />
            Create Admin
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none"
            >
              <option value="all">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Support">Support</option>
              <option value="Analyst">Analyst</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#f8f9fa]">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f9fafb]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Department</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">MFA</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e8e8]">
              {filteredUsers.map((user) => {
                const StatusIcon = statusConfig[user.status].icon;
                return (
                  <tr key={user.id} className="hover:bg-[#f9fafb]">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-[#1a1a1a]">{user.name}</p>
                        <p className="text-xs text-[#666]">{user.email}</p>
                        <p className="text-xs text-[#999]">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1a1a1a]">{user.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#666]">
                        <Clock className="w-3.5 h-3.5" />
                        {user.lastLogin}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusConfig[user.status].bg} ${statusConfig[user.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.mfaEnabled ? (
                        <ShieldCheck className="w-5 h-5 text-[#0c831f]" />
                      ) : (
                        <Shield className="w-5 h-5 text-[#ff4f8b]" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button className="rounded-lg p-2 hover:bg-[#e8e8e8]">
                          <MoreVertical className="w-4 h-4 text-[#666]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
