"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Truck,
  Filter,
  FileText,
  ArrowLeft,
  Timer,
  CheckCircle,
  XCircle,
  Circle,
  Clock,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { mockRecurringOrders } from "@/data/subscription";

type StatusFilter = "all" | "completed" | "upcoming" | "failed";

const statusBadge: Record<
  string,
  { label: string; className: string; icon: React.ReactNode }
> = {
  completed: {
    label: "Completed",
    className:
      "bg-[#e8f5e9] text-[#0c831f]",
    icon: <CheckCircle className="w-3 h-3" />,
  },
  upcoming: {
    label: "Upcoming",
    className:
      "bg-[#fffbeb] text-[#d97706]",
    icon: <Clock className="w-3 h-3" />,
  },
  failed: {
    label: "Failed",
    className:
      "bg-[#fef2f2] text-[#b91c1c]",
    icon: <XCircle className="w-3 h-3" />,
  },
  in_transit: {
    label: "In Transit",
    className:
      "bg-[#f0f9ff] text-[#0369a1]",
    icon: <Truck className="w-3 h-3" />,
  },
};

export default function RecurringOrdersPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filtered =
    filter === "all"
      ? mockRecurringOrders
      : mockRecurringOrders.filter((o) => o.status === filter);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/subscription"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] hover:bg-[#f8f9fa]"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Subscription
                </p>
                <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                  Recurring Orders
                </h1>
                <p className="mt-1 text-xs text-[#666]">
                  View and manage recurring subscription orders across all billing
                  cycles.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/subscription">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Subscriptions
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <FileText className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(
            [
              ["all", "All"],
              ["completed", "Completed"],
              ["upcoming", "Upcoming"],
            ] as [StatusFilter, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                filter === key
                  ? "bg-[#0c831f] text-white"
                  : "border border-[#e8e8e8] bg-white text-[#666] hover:bg-[#f8f9fa]"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="-mb-1.5 flex items-center gap-2 ml-2">
            <Filter className="w-3.5 h-3.5 text-[#999]" />
            <span className="text-[10px] font-semibold text-[#999] whitespace-nowrap">
              {filtered.length} orders
            </span>
          </div>
        </div>

        {/* Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Subscription</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Cycle Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Delivery</th>
                  <th className="px-4 py-3">Items</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const badge = statusBadge[order.status] || statusBadge.completed;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
                    >
                      <td className="px-4 py-4">
                        <span className="text-xs font-mono font-bold text-[#0c831f]">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-mono text-[#666]">
                          {order.subscriptionId}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-bold">{order.customerName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium text-[#666]">
                          {order.planName}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium">
                          <Calendar className="w-3 h-3 text-[#999]" />
                          {order.cycleDate}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-bold text-[#1a1a1a]">
                        {order.amount}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.className}`}
                        >
                          {badge.icon}
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            order.deliveryStatus === "delivered"
                              ? "bg-[#e8f5e9] text-[#0c831f]"
                              : order.deliveryStatus === "in_transit"
                              ? "bg-[#f0f9ff] text-[#0369a1]"
                              : "bg-[#f6f7f6] text-[#999]"
                          }`}
                        >
                          {order.deliveryStatus === "delivered" && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          {order.deliveryStatus === "in_transit" && (
                            <Truck className="w-3 h-3" />
                          )}
                          {order.deliveryStatus === "pending" && (
                            <Timer className="w-3 h-3" />
                          )}
                          <span className="capitalize">
                            {order.deliveryStatus.replace("_", " ")}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#f6f7f6] text-xs font-bold text-[#666]">
                          {order.itemsCount || "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-12 text-center text-sm font-semibold text-[#999]"
                    >
                      No recurring orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
