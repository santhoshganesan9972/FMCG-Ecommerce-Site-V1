"use client";

import { JSX, useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  RefreshCw,
  ExternalLink,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { mockTransactions } from "@/data/finance";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  const styles = {
    success: "bg-[#e8f5e9] text-[#0c831f]",
    failed: "bg-[#fef2f2] text-[#b91c1c]",
    pending: "bg-[#fffbeb] text-[#d97706]",
    refunded: "bg-[#f0f9ff] text-[#0369a1]",
  };
  const icons = {
    success: <CheckCircle className="w-3 h-3 mr-1" />,
    failed: <XCircle className="w-3 h-3 mr-1" />,
    pending: <Clock className="w-3 h-3 mr-1" />,
    refunded: <RefreshCw className="w-3 h-3 mr-1" />,
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${styles[status as keyof typeof styles]}`}
    >
      {icons[status as keyof typeof icons]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "UPI":
      return <ArrowUpRight className="w-4 h-4" />;
    case "Credit Card":
    case "Debit Card":
      return <CreditCard className="w-4 h-4" />;
    case "Net Banking":
      return <ExternalLink className="w-4 h-4" />;
    case "Wallet":
      return <ArrowDownLeft className="w-4 h-4" />;
    default:
      return <CreditCard className="w-4 h-4" />;
  }
};

export default function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || txn.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || txn.paymentMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Transaction Management
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              All Transactions
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#666]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="all">All Methods</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Wallet">Wallet</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#666]">Total:</span>
            <span className="text-sm font-black text-[#1a1a1a]">
              {filteredTransactions.length} transactions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#666]">Amount:</span>
            <span className="text-sm font-black text-[#0c831f]">
              {formatCurrency(totalAmount)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#666]">Success:</span>
            <span className="text-sm font-black text-[#0c831f]">
              {filteredTransactions.filter((t) => t.status === "success").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#666]">Pending:</span>
            <span className="text-sm font-black text-[#d97706]">
              {filteredTransactions.filter((t) => t.status === "pending").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#666]">Failed:</span>
            <span className="text-sm font-black text-[#b91c1c]">
              {filteredTransactions.filter((t) => t.status === "failed").length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Gateway</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <span className="font-mono text-xs font-bold">
                    {txn.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-[#666]">{txn.orderId}</span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{txn.customerName}</p>
                    <p className="text-xs text-[#666]">{txn.customerId}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-[#1a1a1a]">
                    {formatCurrency(txn.amount)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-[#f6f7f6] p-1.5">
                      {getMethodIcon(txn.paymentMethod)}
                    </div>
                    <span className="text-sm font-medium">
                      {txn.paymentMethod}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#666]">
                  {txn.gateway}
                </td>
                <td className="px-4 py-4">
                  <span className="font-mono text-xs text-[#666]">
                    {txn.referenceId.slice(0, 12)}...
                  </span>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(txn.status)}
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">
                  {txn.createdAt}
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">
                  {txn.updatedAt}
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button className="rounded-lg p-2 hover:bg-[#e8e8e8]">
                      <MoreHorizontal className="w-4 h-4 text-[#666]" />
                    </button>
                    {/* Dropdown would go here - simplified for this demo */}
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
              {filteredTransactions.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredTransactions.length}
            </span>{" "}
            results
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
