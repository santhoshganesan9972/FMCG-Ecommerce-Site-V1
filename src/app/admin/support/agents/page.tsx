"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Users,
  UserPlus,
  UserCheck,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Star,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Award,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Headphones,
} from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Amit Singh",
    email: "amit.singh@fmcg.com",
    phone: "+91 98765 43210",
    role: "Senior Support Agent",
    department: "Returns & Refunds",
    status: "online",
    ticketsAssigned: 8,
    resolvedToday: 5,
    rating: 4.8,
    experience: "3 years",
    avatar: "AS",
    online: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@fmcg.com",
    phone: "+91 98765 43211",
    role: "Support Agent",
    department: "Delivery & Shipping",
    status: "online",
    ticketsAssigned: 6,
    resolvedToday: 4,
    rating: 4.6,
    experience: "2 years",
    avatar: "PS",
    online: true,
  },
  {
    id: 3,
    name: "Neha Kapoor",
    email: "neha.kapoor@fmcg.com",
    phone: "+91 98765 43212",
    role: "Technical Support",
    department: "Technical",
    status: "online",
    ticketsAssigned: 5,
    resolvedToday: 3,
    rating: 4.9,
    experience: "4 years",
    avatar: "NK",
    online: true,
  },
  {
    id: 4,
    name: "Rahul Verma",
    email: "rahul.verma@fmcg.com",
    phone: "+91 98765 43213",
    role: "Senior Support Agent",
    department: "Payments & Billing",
    status: "away",
    ticketsAssigned: 4,
    resolvedToday: 2,
    rating: 4.7,
    experience: "3.5 years",
    avatar: "RV",
    online: false,
  },
  {
    id: 5,
    name: "Suresh Rao",
    email: "suresh.rao@fmcg.com",
    phone: "+91 98765 43214",
    role: "Finance Support",
    department: "Finance",
    status: "online",
    ticketsAssigned: 7,
    resolvedToday: 6,
    rating: 4.5,
    experience: "2.5 years",
    avatar: "SR",
    online: true,
  },
  {
    id: 6,
    name: "Deepika Gupta",
    email: "deepika.gupta@fmcg.com",
    phone: "+91 98765 43215",
    role: "Support Agent",
    department: "Account & Profile",
    status: "offline",
    ticketsAssigned: 3,
    resolvedToday: 0,
    rating: 4.4,
    experience: "1.5 years",
    avatar: "DG",
    online: false,
  },
];

const statusColors: Record<string, string> = {
  online: "bg-[#0c831f]",
  away: "bg-[#d97706]",
  offline: "bg-[#999]",
};

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === "all" || agent.department.toLowerCase().includes(deptFilter.toLowerCase());
    return matchesSearch && matchesDept;
  });

  const onlineCount = agents.filter((a) => a.online).length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Support Center
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Support Agents
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage support agents, view availability, track performance metrics, and assign tickets efficiently across departments.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.info("Opening add agent form")}
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] transition-all"
              >
                <UserPlus className="h-4 w-4" />
                Add Agent
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Agent Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f]">
              <Users className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Total Agents</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{agents.length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f]">
              <UserCheck className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Online</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#0c831f]">{onlineCount}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706]">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg Response</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">4.2 min</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb]">
              <Star className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg Rating</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">4.7 ⭐</p>
          </div>
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search agents by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#666]">Department:</span>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
              >
                <option value="all">All Departments</option>
                <option value="returns">Returns & Refunds</option>
                <option value="delivery">Delivery & Shipping</option>
                <option value="technical">Technical</option>
                <option value="payments">Payments & Billing</option>
                <option value="finance">Finance</option>
                <option value="account">Account & Profile</option>
              </select>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="group rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-[#0c831f]/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0c831f] text-lg font-black text-white">
                      {agent.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white ${statusColors[agent.status]}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1a1a1a]">{agent.name}</p>
                    <p className="text-xs text-[#0c831f] font-semibold">{agent.role}</p>
                    <p className="text-[10px] text-[#999] mt-0.5">{agent.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-[#d97706] fill-[#d97706]" />
                  <span className="text-xs font-black text-[#1a1a1a]">{agent.rating}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-[#f9fafb] p-3">
                <div className="text-center">
                  <p className="text-lg font-black text-[#1a1a1a]">{agent.ticketsAssigned}</p>
                  <p className="text-[10px] text-[#666]">Assigned</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-[#0c831f]">{agent.resolvedToday}</p>
                  <p className="text-[10px] text-[#666]">Resolved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-[#1a1a1a]">{agent.experience}</p>
                  <p className="text-[10px] text-[#666]">Exp.</p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => window.location.href = "mailto:" + agent.email}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e8e8e8] py-2 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </button>
                <button
                  onClick={() => window.location.href = "tel:" + agent.phone.replace(/\s/g, "")}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e8e8e8] py-2 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </button>
                <button
                  onClick={() => toast.info("Opening chat with " + agent.name)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#e8e8e8] py-2 text-xs font-semibold text-[#0c831f] hover:bg-[#e8f5e9] transition-all"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Chat
                </button>
              </div>

              {/* Quick actions */}
              <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toast.info("Opening ticket assignment for " + agent.name)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#e8f5e9] px-3 py-1.5 text-[10px] font-bold text-[#0c831f] hover:bg-[#d0edcf] transition-all"
                >
                  <UserCheck className="h-3 w-3" />
                  Assign Tickets
                </button>
                <button
                  onClick={() => toast("Agent profile: " + agent.name + " — " + agent.role + " (" + agent.experience + ")")}
                  className="flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-[10px] font-bold text-[#666] hover:bg-[#f8f9fa] transition-all"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-10 shadow-sm">
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f9fafb]">
                <Users className="h-8 w-8 text-[#999]" />
              </div>
              <p className="mt-4 text-lg font-black text-[#1a1a1a]">No Agents Found</p>
              <p className="mt-1 text-sm text-[#666]">Try adjusting your search or filter criteria.</p>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
