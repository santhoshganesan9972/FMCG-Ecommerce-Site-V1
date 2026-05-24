"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  RefreshCw,
  AlertTriangle,
  CreditCard,
  Clock,
  XCircle,
  Eye,
  Mail,
} from "lucide-react";
import { mockFailedPayments } from "@/data/finance";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "UPI":
      return <CreditCard className="w-4 h-4" />;
    case "Credit Card":
    case "Debit Card":
      return <CreditCard className="w-4 h-4" />;
    case "Net Banking":
      return <Clock className="w-4 h-4" />;
    default:
      return <CreditCard className="w-4 h-4" />;
  }
};

const getRetryBadge = (canRetry: boolean, attempts: number) => {
  if (canRetry) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-bold text-[#0c831f]">
        <RefreshCw className="w-3 h-3" />
        Retry Available ({attempts} attempts)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#fef2f2] px-2 py-0.5 text-xs font-bold text-[#b91c1c]">
      <XCircle className="w-3 h-3" />
      Max Attempts ({attempts})
    </span>
  );
};

const getReasonBadge = (reason: string) => {
  const styles: Record<string, string> = {
    "Insufficient funds": "bg-[#fffbeb] text-[#d97706]",
    "Bank timeout": "bg-[#f0f9ff] text-[#0369a1]",
    "Invalid UPI ID": "bg-[#fef2f2] text-[#b91c1c]",
    "Card expired": "bg-[#fef2f2] text-[#b91c1c]",
  };
  return (
    <span className={`rounded px-2 py-1 text-xs font-medium ${styles[reason] || "bg-[#f6f7f6] text-[#666]"}`}>
      {reason}
    </span>
  );
};

export default function FailedPaymentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [retryFilter, setRetryFilter] = useState("all");

  const filteredPayments = mockFailedPayments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRetry =
      retryFilter === "all" ||
      (retryFilter === "retriable" && payment.canRetry) ||
      (retryFilter === "maxed" && !payment.canRetry);
    return matchesSearch && matchesRetry;
  });

  const totalFailedAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Payment Monitoring
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Failed Payments
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#b91c1c] px-3 py-2 text-sm font-semibold text-white hover:bg-[#991b1b]">
              <AlertTriangle className="w-4 h-4" />
              Alert Team
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#e8e8e8] p-4 sm:grid-cols-4">
        <div className="rounded-xl bg-[#fef2f2] p-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-[#b91c1c]" />
            <span className="text-xs font-bold text-[#666]">Total Failed</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#b91c1c]">
            {filteredPayments.length}
          </p>
        </div>
        <div className="rounded-xl bg-[#fffbeb] p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d97706]" />
            <span className="text-xs font-bold text-[#666]">Amount at Risk</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#d97706]">
            {formatCurrency(totalFailedAmount)}
          </p>
        </div>
        <div className="rounded-xl bg-[#e8f5e9] p-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#666]">Retriable</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0c831f]">
            {filteredPayments.filter((p) => p.canRetry).length}
          </p>
        </div>
        <div className="rounded-xl bg-[#f0f9ff] p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#0369a1]" />
            <span className="text-xs font-bold text-[#666]">Max Attempts</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0369a1]">
            {filteredPayments.filter((p) => !p.canRetry).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
            <input
              type="text"
              placeholder="Search by ID, Order, Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] py-2 pl-9 pr-4 text-sm text-[#1a1a1a] placeholder:text-[#666] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#666]" />
            <select
              value={retryFilter}
              onChange={(e) => setRetryFilter(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="all">All Failed</option>
              <option value="retriable">Retriable Only</option>
              <option value="maxed">Max Attempts Reached</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Failed Payment ID</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Failure Reason</th>
              <th className="px-4 py-3">Gateway</th>
              <th className="px-4 py-3">Attempts</th>
              <th className="px-4 py-3">Retry Status</th>
              <th className="px-4 py-3">Failed At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <span className="font-mono text-xs font-bold">
                    {payment.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-[#666]">
                    {payment.orderId}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{payment.customerName}</p>
                    <p className="text-xs text-[#666]">{payment.customerId}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-[#b91c1c]">
                    {formatCurrency(payment.amount)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-[#f6f7f6] p-1.5">
                      {getMethodIcon(payment.paymentMethod)}
                    </div>
                    <span className="text-sm font-medium">
                      {payment.paymentMethod}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {getReasonBadge(payment.failureReason)}
                </td>
                <td className="px-4 py-4 text-sm text-[#666]">
                  {payment.gateway}
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold">{payment.attempts}</span>
                </td>
                <td className="px-4 py-4">
                  {getRetryBadge(payment.canRetry, payment.attempts)}
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">
                  {payment.createdAt}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    {payment.canRetry && (
                      <button
                        className="flex items-center gap-1 rounded-lg bg-[#0c831f] px-2 py-1 text-xs font-bold text-white hover:bg-[#0a6a18]"
                        title="Retry Payment"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </button>
                    )}
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-[#666]" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="Notify Customer"
                    >
                      <Mail className="w-4 h-4 text-[#666]" />
                    </button>
                    <button className="rounded-lg p-2 hover:bg-[#e8e8e8]">
                      <MoreHorizontal className="w-4 h-4 text-[#666]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#e8e8e8] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#666]">
            Showing <span className="font-bold text-[#1a1a1a]">1</span> to{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredPayments.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredPayments.length}
            </span>{" "}
            failed payments
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled
              className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-bold text-[#666] disabled:opacity-50"
            >
              Previous
            </button>
            <button className="rounded-lg bg-[#0c831f] px-3 py-1.5 text-xs font-bold text-white">
              1
            </button>
            <button
              disabled
              className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-bold text-[#666] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}