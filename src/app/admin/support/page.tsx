"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import {
  Ticket,
  PlusCircle,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  History,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  UserCheck,
  ArrowUpCircle,
  XCircle,
  Headphones,
  Filter,
} from "lucide-react";

const supportStats = {
  openTickets: 24,
  pendingTickets: 12,
  resolvedToday: 18,
  avgResponseTime: "4.2 min",
  agentOnline: 8,
  totalAgents: 14,
  satisfaction: "94%",
  escalatedCount: 3,
};

const recentTickets = [
  {
    id: "TKT-2024-0892",
    customer: "Rajesh Kumar",
    subject: "Order not delivered - delayed by 3 days",
    status: "open",
    priority: "high",
    agent: "Priya Sharma",
    time: "2 min ago",
    department: "Delivery",
  },
  {
    id: "TKT-2024-0891",
    customer: "Sneha Patel",
    subject: "Wrong item received in Order #ORD-8921",
    status: "in-progress",
    priority: "urgent",
    agent: "Amit Singh",
    time: "15 min ago",
    department: "Returns",
  },
  {
    id: "TKT-2024-0890",
    customer: "Vikram Mehta",
    subject: "Payment deducted but order failed",
    status: "open",
    priority: "urgent",
    agent: "Unassigned",
    time: "32 min ago",
    department: "Payments",
  },
  {
    id: "TKT-2024-0889",
    customer: "Ananya Gupta",
    subject: "App crashing on checkout page",
    status: "escalated",
    priority: "high",
    agent: "Rahul Verma",
    time: "1 hour ago",
    department: "Technical",
  },
  {
    id: "TKT-2024-0888",
    customer: "Deepak Joshi",
    subject: "Coupon code not applying to cart",
    status: "resolved",
    priority: "medium",
    agent: "Neha Kapoor",
    time: "2 hours ago",
    department: "Technical",
  },
];

const statusConfig = {
  open: { label: "Open", bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  "in-progress": { label: "In Progress", bg: "bg-[#fffbeb]", text: "text-[#d97706]" },
  escalated: { label: "Escalated", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
  resolved: { label: "Resolved", bg: "bg-[#e8f5e9]", text: "text-[#0c831f]" },
  closed: { label: "Closed", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]" },
};

const priorityConfig = {
  low: { label: "Low", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]" },
  medium: { label: "Medium", bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  high: { label: "High", bg: "bg-[#fff0f6]", text: "text-[#ff4f8b]" },
  urgent: { label: "Urgent", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
};

export default function SupportCenterPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Customer Support
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Support Center
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
                Manage support tickets, assign agents, track resolution times, and engage with customers through live chat. Monitor SLA compliance and team performance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/support/tickets/create">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] transition-all">
                  <PlusCircle className="h-4 w-4" />
                  Create Ticket
                </button>
              </Link>
              <Link href="/admin/support/tickets">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                  <Ticket className="h-4 w-4" />
                  All Tickets
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 text-[#2563eb]">
              <Ticket className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Open Tickets</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{supportStats.openTickets}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#dc2626]">
              <ArrowUpRight className="h-3 w-3" />
              <span>+8% from yesterday</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 text-[#d97706]">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Pending</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{supportStats.pendingTickets}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#d97706]">
              <ArrowUpRight className="h-3 w-3" />
              <span>3 overdue SLA</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 text-[#0c831f]">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Resolved Today</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{supportStats.resolvedToday}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#0c831f]">
              <TrendingUp className="h-3 w-3" />
              <span>92% resolution rate</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 text-[#ff4f8b]">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Escalated</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{supportStats.escalatedCount}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#ff4f8b]">
              <ArrowUpCircle className="h-3 w-3" />
              <span>Needs attention</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 text-[#0c831f]">
              <Users className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Agents Online</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">
              {supportStats.agentOnline}
              <span className="text-sm font-bold text-[#666]">/{supportStats.totalAgents}</span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#0c831f]">
              <UserCheck className="h-3 w-3" />
              <span>All zones covered</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 text-[#d97706]">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg Response</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{supportStats.avgResponseTime}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#0c831f]">
              <TrendingUp className="h-3 w-3" />
              <span>{supportStats.satisfaction} satisfaction</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Quick Actions */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Quick Actions</p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Support Operations</h2>
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: <PlusCircle className="h-5 w-5" />,
                  label: "Create Ticket",
                  desc: "Raise a new support ticket",
                  href: "/admin/support/tickets/create",
                  bg: "bg-[#e8f5e9]",
                  text: "text-[#0c831f]",
                },
                {
                  icon: <Ticket className="h-5 w-5" />,
                  label: "All Tickets",
                  desc: "View & manage all tickets",
                  href: "/admin/support/tickets",
                  bg: "bg-[#eff6ff]",
                  text: "text-[#2563eb]",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  label: "Manage Agents",
                  desc: "View agent performance & availability",
                  href: "/admin/support/agents",
                  bg: "bg-[#fffbeb]",
                  text: "text-[#d97706]",
                },
                {
                  icon: <History className="h-5 w-5" />,
                  label: "Ticket History",
                  desc: "Audit log of all support activities",
                  href: "/admin/support/history",
                  bg: "bg-[#fff0f6]",
                  text: "text-[#ff4f8b]",
                },
                {
                  icon: <MessageSquare className="h-5 w-5" />,
                  label: "Live Chat",
                  desc: "Chat with customers in real-time",
                  href: "/admin/support/tickets",
                  bg: "bg-[#f0fdf4]",
                  text: "text-[#16a34a]",
                },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="group cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${action.bg} ${action.text}`}>
                        {action.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[#1a1a1a] group-hover:text-[#0c831f] transition-colors">
                          {action.label}
                        </p>
                        <p className="text-xs font-medium text-[#999]">{action.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#ccc] group-hover:text-[#0c831f] transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Tickets */}
          <section className="lg:col-span-2 rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Live Queue</p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Recent Tickets</h2>
              </div>
              <Link href="/admin/support/tickets">
                <button className="flex items-center gap-1 rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                  View All
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentTickets.map((ticket) => {
                const status = statusConfig[ticket.status as keyof typeof statusConfig];
                const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig];
                return (
                  <Link key={ticket.id} href={`/admin/support/tickets/1`}>
                    <div className="group cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-[#2563eb]">{ticket.id}</span>
                            <div className={`inline-flex items-center rounded px-1.5 py-0.5 ${status.bg} ${status.text}`}>
                              <span className="text-[10px] font-black">{status.label}</span>
                            </div>
                            <div className={`inline-flex items-center rounded px-1.5 py-0.5 ${priority.bg} ${priority.text}`}>
                              <span className="text-[10px] font-black">{priority.label}</span>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#0c831f] transition-colors truncate">
                            {ticket.subject}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#666]">
                            <span className="font-semibold">{ticket.customer}</span>
                            <span className="text-[#ccc]">|</span>
                            <span>{ticket.department}</span>
                            <span className="text-[#ccc]">|</span>
                            <span className={ticket.agent === "Unassigned" ? "text-[#dc2626] font-semibold" : ""}>
                              {ticket.agent}
                            </span>
                            <span className="text-[#999]">{ticket.time}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#ccc] group-hover:text-[#0c831f] transition-all mt-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Ticket Status Summary */}
            <div className="mt-4 grid grid-cols-5 gap-2 pt-4 border-t border-[#e8e8e8]">
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="text-center">
                  <div className={`inline-flex items-center rounded px-2 py-1 ${config.bg} ${config.text}`}>
                    <span className="text-[10px] font-black uppercase">{config.label}</span>
                  </div>
                  <p className="mt-1 text-lg font-black text-[#1a1a1a]">
                    {key === "open" ? "24" : key === "in-progress" ? "12" : key === "escalated" ? "3" : key === "resolved" ? "68" : "156"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SLA / Performance Footer */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5e9]">
                <Headphones className="h-6 w-6 text-[#0c831f]" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1a1a1a]">Support Team Performance</p>
                <p className="text-xs text-[#666]">4.2 min avg response &bull; 94% CSAT &bull; 8 agents online now</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f5e9]">
                  <CheckCircle2 className="h-4 w-4 text-[#0c831f]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#1a1a1a]">92%</p>
                  <p className="text-[10px] text-[#666]">SLA Met</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fef2f2]">
                  <AlertCircle className="h-4 w-4 text-[#dc2626]" />
                </div>
                <div>
                  <p className="text-xs font-black text-[#1a1a1a]">3</p>
                  <p className="text-[10px] text-[#666]">Breached</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
