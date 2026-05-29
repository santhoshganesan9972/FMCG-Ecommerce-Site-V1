"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  FileText,
  CreditCard,
} from "lucide-react";
import { mockRefunds } from "@/data/finance";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  const styles = {
    pending: "bg-[#fffbeb] text-[#d97706]",
    processing: "bg-[#f0f9ff] text-[#0369a1]",
    completed: "bg-[#e8f5e9] text-[#0c831f]",
    rejected: "bg-[#fef2f2] text-[#b91c1c]",
  };
  const icons = {
    pending: <Clock className="w-3 h-3 mr-1" />,
    processing: <RefreshCw className="w-3 h-3 mr-1 animate-spin" />,
    completed: <CheckCircle className="w-3 h-3 mr-1" />,
    rejected: <XCircle className="w-3 h-3 mr-1" />,
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

export default function RefundsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRefunds = mockRefunds.filter((refund) => {
    const matchesSearch =
      refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || refund.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRefundAmount = filteredRefunds.reduce((sum, r) => sum + r.amount, 0);
  const pendingAmount = filteredRefunds
    .filter((r) => r.status === "pending" || r.status === "processing")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Refund Management
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Refunds & Returns
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <FileText className="w-4 h-4" />
              New Refund
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#e8e8e8] p-4 sm:grid-cols-4">
        <div className="rounded-xl bg-[#f0f9ff] p-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#0369a1]" />
            <span className="text-xs font-bold text-[#666]">Total Refunds</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0369a1]">
            {filteredRefunds.length}
          </p>
        </div>
        <div className="rounded-xl bg-[#fffbeb] p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d97706]" />
            <span className="text-xs font-bold text-[#666]">Pending Amount</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#d97706]">
            {formatCurrency(pendingAmount)}
          </p>
        </div>
        <div className="rounded-xl bg-[#e8f5e9] p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#666]">Completed</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0c831f]">
            {filteredRefunds.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="rounded-xl bg-[#fef2f2] p-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-[#b91c1c]" />
            <span className="text-xs font-bold text-[#666]">Rejected</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#b91c1c]">
            {filteredRefunds.filter((r) => r.status === "rejected").length}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Refund ID</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Requested By</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Requested</th>
              <th className="px-4 py-3">Processed</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.map((refund) => (
              <tr
                key={refund.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <span className="font-mono text-xs font-bold">
                    {refund.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-[#666]">
                    {refund.orderId}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{refund.customerName}</p>
                    <p className="text-xs text-[#666]">{refund.customerId}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-[#b91c1c]" />
                    <span className="font-bold text-[#b91c1c]">
                      {formatCurrency(refund.amount)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 max-w-[200px]">
                  <span className="text-xs text-[#666] line-clamp-2">
                    {refund.reason}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs text-[#666]">
                    {refund.requestedBy}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(refund.status)}
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">
                  {refund.requestedAt}
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">
                  {refund.processedAt || "-"}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    {refund.status === "pending" && (
                      <>
                        <button
                          className="flex items-center gap-1 rounded-lg bg-[#0c831f] px-2 py-1 text-xs font-bold text-white hover:bg-[#0a6a18]"
                          title="Approve"
                        >
                          <CheckCircle className="w-3 h-3" />
                        </button>
                        <button
                          className="flex items-center gap-1 rounded-lg bg-[#b91c1c] px-2 py-1 text-xs font-bold text-white hover:bg-[#991b1b]"
                          title="Reject"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </>
                    )}
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-[#666]" />
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
              {filteredRefunds.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredRefunds.length}
            </span>{" "}
            refunds
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
