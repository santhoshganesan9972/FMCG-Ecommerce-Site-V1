"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  FileText,
  CheckCircle,
  Clock,
  Loader,
  Store,
  IndianRupee,
} from "lucide-react";
import { mockVendorSettlements } from "@/data/finance";

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
    settled: "bg-[#e8f5e9] text-[#0c831f]",
  };
  const icons = {
    pending: <Clock className="w-3 h-3 mr-1" />,
    processing: <Loader className="w-3 h-3 mr-1 animate-spin" />,
    settled: <CheckCircle className="w-3 h-3 mr-1" />,
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

export default function VendorSettlementsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSettlements = mockVendorSettlements.filter((settlement) => {
    const matchesSearch =
      settlement.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      settlement.vendorId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || settlement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalGrossAmount = filteredSettlements.reduce((sum, s) => sum + s.grossAmount, 0);
  const totalCommission = filteredSettlements.reduce((sum, s) => sum + s.commission, 0);
  const totalNetAmount = filteredSettlements.reduce((sum, s) => sum + s.netAmount, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Vendor Finance
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Vendor Settlements
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <FileText className="w-4 h-4" />
              Process Settlements
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#e8e8e8] p-4 sm:grid-cols-4">
        <div className="rounded-xl bg-[#f0f9ff] p-4">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#0369a1]" />
            <span className="text-xs font-bold text-[#666]">Total Settlements</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0369a1]">
            {filteredSettlements.length}
          </p>
        </div>
        <div className="rounded-xl bg-[#fffbeb] p-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#d97706]" />
            <span className="text-xs font-bold text-[#666]">Gross Amount</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#d97706]">
            {formatCurrency(totalGrossAmount)}
          </p>
        </div>
        <div className="rounded-xl bg-[#fef2f2] p-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#b91c1c]" />
            <span className="text-xs font-bold text-[#666]">Total Commission</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#b91c1c]">
            {formatCurrency(totalCommission)}
          </p>
        </div>
        <div className="rounded-xl bg-[#e8f5e9] p-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#666]">Net Payable</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0c831f]">
            {formatCurrency(totalNetAmount)}
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
              placeholder="Search by ID, Vendor name..."
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
              <option value="settled">Settled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Settlement ID</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3 text-center">Orders</th>
              <th className="px-4 py-3 text-right">Gross Amount</th>
              <th className="px-4 py-3 text-right">Commission</th>
              <th className="px-4 py-3 text-right">Tax</th>
              <th className="px-4 py-3 text-right">Net Amount</th>
              <th className="px-4 py-3 text-center">Period</th>
              <th className="px-4 py-3 text-center">Settlement Date</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSettlements.map((settlement) => (
              <tr
                key={settlement.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <span className="font-mono text-xs font-bold">
                    {settlement.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{settlement.vendorName}</p>
                    <p className="text-xs text-[#666]">{settlement.vendorId}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-bold">{settlement.totalOrders}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#666]">
                    {formatCurrency(settlement.grossAmount)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#b91c1c]">
                    -{formatCurrency(settlement.commission)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#b91c1c]">
                    -{formatCurrency(settlement.tax)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-bold text-[#0c831f]">
                    {formatCurrency(settlement.netAmount)}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-xs text-[#666]">
                    {settlement.period}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-xs text-[#666]">
                    {settlement.settlementDate}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  {getStatusBadge(settlement.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-[#666]" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="Download Invoice"
                    >
                      <FileText className="w-4 h-4 text-[#0c831f]" />
                    </button>
                    {settlement.status === "pending" && (
                      <button
                        className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                        title="Process Now"
                      >
                        <CheckCircle className="w-4 h-4 text-[#0c831f]" />
                      </button>
                    )}
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
              {filteredSettlements.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredSettlements.length}
            </span>{" "}
            settlements
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
