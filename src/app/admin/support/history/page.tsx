"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  History,
  Search,
  Filter,
  Download,
  UserCheck,
  ArrowUpCircle,
  XCircle,
  MessageSquare,
  PlusCircle,
  ArrowUpDown,
} from "lucide-react";

const historyLogs = [
  { id: 1, ticketId: "TKT-2024-0892", action: "Ticket Created", agent: "System", customer: "Rajesh Kumar", detail: "Ticket raised via Live Chat - Delivery issue", time: "2 min ago", type: "created" },
  { id: 2, ticketId: "TKT-2024-0891", action: "Assigned", agent: "Amit Singh", customer: "Sneha Patel", detail: "Auto-assigned to Returns & Refunds team", time: "15 min ago", type: "assigned" },
  { id: 3, ticketId: "TKT-2024-0891", action: "Customer Contacted", agent: "Amit Singh", customer: "Sneha Patel", detail: "Sent acknowledgment message via live chat", time: "25 min ago", type: "message" },
  { id: 4, ticketId: "TKT-2024-0890", action: "Escalated", agent: "Rahul Verma", customer: "Vikram Mehta", detail: "Escalated to Senior Agent - Payment issue requires refund approval", time: "32 min ago", type: "escalated" },
  { id: 5, ticketId: "TKT-2024-0889", action: "Priority Changed", agent: "Neha Kapoor", customer: "Ananya Gupta", detail: "Priority changed from Medium to High - App crash affecting checkout", time: "45 min ago", type: "updated" },
  { id: 6, ticketId: "TKT-2024-0888", action: "Resolved", agent: "Neha Kapoor", customer: "Deepak Joshi", detail: "Issue resolved - Coupon code applied manually. Customer notified.", time: "1 hour ago", type: "resolved" },
  { id: 7, ticketId: "TKT-2024-0887", action: "Note Added", agent: "Suresh Rao", customer: "Meera Iyer", detail: "Added internal note: Awaiting finance team approval for refund", time: "1.5 hours ago", type: "note" },
  { id: 8, ticketId: "TKT-2024-0886", action: "Closed", agent: "Priya Sharma", customer: "Arjun Nair", detail: "Customer confirmed resolution. Ticket closed.", time: "2 hours ago", type: "closed" },
  { id: 9, ticketId: "TKT-2024-0885", action: "Reopened", agent: "Amit Singh", customer: "Kavita Desai", detail: "Customer reported issue not fully resolved. Ticket reopened.", time: "3 hours ago", type: "reopened" },
  { id: 10, ticketId: "TKT-2024-0884", action: "Transferred", agent: "Priya Sharma", customer: "Rohan Kapoor", detail: "Transferred from Delivery to Returns department", time: "4 hours ago", type: "transferred" },
];

const actionConfig: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  created: { label: "Created", bg: "bg-[#eff6ff]", text: "text-[#2563eb]", icon: <PlusCircle className="h-3.5 w-3.5" /> },
  assigned: { label: "Assigned", bg: "bg-[#e8f5e9]", text: "text-[#0c831f]", icon: <UserCheck className="h-3.5 w-3.5" /> },
  escalated: { label: "Escalated", bg: "bg-[#fef2f2]", text: "text-[#dc2626]", icon: <ArrowUpCircle className="h-3.5 w-3.5" /> },
  resolved: { label: "Resolved", bg: "bg-[#e8f5e9]", text: "text-[#0c831f]", icon: <XCircle className="h-3.5 w-3.5" /> },
  closed: { label: "Closed", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]", icon: <XCircle className="h-3.5 w-3.5" /> },
  message: { label: "Message", bg: "bg-[#fffbeb]", text: "text-[#d97706]", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  note: { label: "Note", bg: "bg-[#f0fdf4]", text: "text-[#16a34a]", icon: <MessageSquare className="h-3.5 w-3.5" /> },
  reopened: { label: "Reopened", bg: "bg-[#fff0f6]", text: "text-[#ff4f8b]", icon: <History className="h-3.5 w-3.5" /> },
  transferred: { label: "Transferred", bg: "bg-[#eff6ff]", text: "text-[#2563eb]", icon: <ArrowUpCircle className="h-3.5 w-3.5" /> },
  updated: { label: "Updated", bg: "bg-[#fffbeb]", text: "text-[#d97706]", icon: <History className="h-3.5 w-3.5" /> },
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLogs = historyLogs.filter((log) => {
    const matchesSearch =
      log.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

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
                Ticket History
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Complete audit trail of all support ticket activities — creations, assignments, escalations, resolutions, and more.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Search by ticket ID, customer, agent, or action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#666]">Action:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#0c831f] focus:outline-none"
              >
                <option value="all">All Actions</option>
                <option value="created">Created</option>
                <option value="assigned">Assigned</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="reopened">Reopened</option>
                <option value="transferred">Transferred</option>
                <option value="message">Messages</option>
                <option value="note">Notes</option>
                <option value="updated">Updated</option>
              </select>
              <div className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm text-[#666]">
                <span className="font-semibold">{filteredLogs.length}</span>
                <span>entries</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline / Activity Feed */}
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#666] cursor-pointer hover:text-[#1a1a1a]">
                      Ticket
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Agent
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Detail
                  </th>
                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredLogs.map((log) => {
                  const action = actionConfig[log.type] || actionConfig.created;
                  return (
                    <tr key={log.id} className="group transition-colors hover:bg-[#fafafa]">
                      <td className="px-4 py-3">
                        <Link href={`/admin/support/tickets/1`} className="text-xs font-bold text-[#2563eb] hover:underline">
                          {log.ticketId}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${action.bg} ${action.text}`}>
                          {action.icon}
                          <span className="text-[10px] font-black">{action.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-[#1a1a1a]">{log.agent}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#666]">{log.customer}</span>
                      </td>
                      <td className="px-4 py-3 max-w-[250px]">
                        <p className="truncate text-sm text-[#666]" title={log.detail}>
                          {log.detail}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm text-[#999]">{log.time}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex items-center justify-between border-t border-[#e8e8e8] px-4 py-3">
            <p className="text-xs text-[#666]">
              Showing <span className="font-bold">1</span> to <span className="font-bold">{filteredLogs.length}</span> of{" "}
              <span className="font-bold">156</span> total entries
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa] transition-all disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="rounded-lg bg-[#0c831f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0a6a18] transition-all">
                1
              </button>
              <button className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa] transition-all">
                2
              </button>
              <button className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa] transition-all">
                3
              </button>
              <button className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#666] hover:bg-[#f8f9fa] transition-all">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
