"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  Ticket,
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  UserCheck,
  ArrowUpCircle,
  XCircle,
  MessageSquare,
  History,
  MoreHorizontal,
  ArrowUpDown,
  Download,
} from "lucide-react";

const mockTickets = [
  { id: "TKT-2024-0892", customer: "Rajesh Kumar", subject: "Order not delivered - delayed by 3 days", status: "open", priority: "high", agent: "Priya Sharma", department: "Delivery", created: "2 min ago", channel: "Chat" },
  { id: "TKT-2024-0891", customer: "Sneha Patel", subject: "Wrong item received in Order #ORD-8921", status: "in-progress", priority: "urgent", agent: "Amit Singh", department: "Returns", created: "15 min ago", channel: "Phone" },
  { id: "TKT-2024-0890", customer: "Vikram Mehta", subject: "Payment deducted but order failed", status: "open", priority: "urgent", agent: "—", department: "Payments", created: "32 min ago", channel: "Email" },
  { id: "TKT-2024-0889", customer: "Ananya Gupta", subject: "App crashing on checkout page", status: "escalated", priority: "high", agent: "Rahul Verma", department: "Technical", created: "1 hour ago", channel: "Chat" },
  { id: "TKT-2024-0888", customer: "Deepak Joshi", subject: "Coupon code not applying to cart", status: "resolved", priority: "medium", agent: "Neha Kapoor", department: "Technical", created: "2 hours ago", channel: "Email" },
  { id: "TKT-2024-0887", customer: "Meera Iyer", subject: "Refund not processed for return", status: "in-progress", priority: "high", agent: "Suresh Rao", department: "Finance", created: "3 hours ago", channel: "Chat" },
  { id: "TKT-2024-0886", customer: "Arjun Nair", subject: "Subscription auto-renewed without consent", status: "open", priority: "medium", agent: "—", department: "Billing", created: "4 hours ago", channel: "Email" },
  { id: "TKT-2024-0885", customer: "Kavita Desai", subject: "Product quality complaint - damaged item", status: "closed", priority: "low", agent: "Priya Sharma", department: "Returns", created: "5 hours ago", channel: "Phone" },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  open: { label: "Open", bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  "in-progress": { label: "In Progress", bg: "bg-[#fffbeb]", text: "text-[#d97706]" },
  escalated: { label: "Escalated", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
  resolved: { label: "Resolved", bg: "bg-[#e8f5e9]", text: "text-[#0c831f]" },
  closed: { label: "Closed", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]" },
};

const priorityConfig: Record<string, { label: string; bg: string; text: string }> = {
  low: { label: "Low", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]" },
  medium: { label: "Medium", bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  high: { label: "High", bg: "bg-[#fff0f6]", text: "text-[#ff4f8b]" },
  urgent: { label: "Urgent", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
};

export default function AllTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
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
                All Tickets
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                View, filter, and manage all support tickets. Assign agents, escalate issues, close tickets, and track resolution progress.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/support/tickets/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] transition-all">
                  <PlusCircle className="h-4 w-4" />
                  Create Ticket
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Filters */
      }
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Search and filter toggle */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                <input
                  type="text"
                  placeholder="Search by ticket ID, customer, or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {showFilters ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                </button>
                <div className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm text-[#666]">
                  <span className="font-semibold">{filteredTickets.length}</span>
                  <span>tickets</span>
                </div>
              </div>
            </div>

            {/* Filter dropdowns */}
            {showFilters && (
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#666]">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-sm focus:border-[#0c831f] focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="escalated">Escalated</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#666]">Priority:</span>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-sm focus:border-[#0c831f] focus:outline-none"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#666]">Department:</span>
                  <select className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-sm focus:border-[#0c831f] focus:outline-none">
                    <option>All Departments</option>
                    <option>Delivery</option>
                    <option>Returns</option>
                    <option>Payments</option>
                    <option>Technical</option>
                    <option>Finance</option>
                    <option>Billing</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tickets Table */}
        <section className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#666] cursor-pointer hover:text-[#1a1a1a]">
                      Ticket ID
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#666] cursor-pointer hover:text-[#1a1a1a]">
                      Customer
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Agent
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Channel
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Created
                  </th>
                  <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wide text-[#666]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredTickets.map((ticket) => {
                  const status = statusConfig[ticket.status];
                  const priority = priorityConfig[ticket.priority];
                  return (
                    <tr key={ticket.id} className="group transition-colors hover:bg-[#fafafa]">
                      <td className="px-4 py-3">
                        <Link href={`/admin/support/tickets/1`} className="text-xs font-bold text-[#2563eb] hover:underline">
                          {ticket.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-[#1a1a1a]">{ticket.customer}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[250px]">
                        <p className="truncate text-sm text-[#1a1a1a]" title={ticket.subject}>
                          {ticket.subject}
                        </p>
                        <p className="text-[10px] text-[#999]">{ticket.department}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center rounded px-2 py-0.5 ${status.bg}`}>
                          <span className={`text-[10px] font-black ${status.text}`}>{status.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center rounded px-2 py-0.5 ${priority.bg}`}>
                          <span className={`text-[10px] font-black ${priority.text}`}>{priority.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm ${ticket.agent === "—" ? "text-[#dc2626] font-semibold" : "text-[#666]"}`}>
                          {ticket.agent}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#666]">{ticket.channel}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#999]">{ticket.created}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/support/tickets/1`}>
                            <button className="rounded-lg border border-[#e8e8e8] p-1.5 hover:bg-[#f8f9fa] transition-all" title="View Details">
                              <Ticket className="h-3.5 w-3.5 text-[#666]" />
                            </button>
                          </Link>
                          <button className="rounded-lg border border-[#e8e8e8] p-1.5 hover:bg-[#e8f5e9] transition-all" title="Assign Agent">
                            <UserCheck className="h-3.5 w-3.5 text-[#0c831f]" />
                          </button>
                          <button className="rounded-lg border border-[#e8e8e8] p-1.5 hover:bg-[#fef2f2] transition-all" title="Escalate">
                            <ArrowUpCircle className="h-3.5 w-3.5 text-[#dc2626]" />
                          </button>
                          <button className="rounded-lg border border-[#e8e8e8] p-1.5 hover:bg-[#f8f9fa] transition-all" title="More">
                            <MoreHorizontal className="h-3.5 w-3.5 text-[#666]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#e8e8e8] px-4 py-3">
            <p className="text-xs text-[#666]">
              Showing <span className="font-bold">1</span> to <span className="font-bold">{filteredTickets.length}</span> of{" "}
              <span className="font-bold">24</span> tickets
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
