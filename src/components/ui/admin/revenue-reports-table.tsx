"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  FileSpreadsheet,
  Calendar,
} from "lucide-react";
import { mockRevenueData } from "@/data/finance";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function RevenueReportsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("week");

  const filteredData = mockRevenueData.filter((data) => {
    return data.date.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalGrossRevenue = filteredData.reduce((sum, d) => sum + d.grossRevenue, 0);
  const totalNetRevenue = filteredData.reduce((sum, d) => sum + d.netRevenue, 0);
  const totalOrders = filteredData.reduce((sum, d) => sum + d.orders, 0);
  const totalRefunds = filteredData.reduce((sum, d) => sum + d.refunds, 0);
  const totalDiscounts = filteredData.reduce((sum, d) => sum + d.discounts, 0);
  const avgOrderValue = totalOrders > 0 ? totalGrossRevenue / totalOrders : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Revenue Analytics
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Revenue Reports
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <FileSpreadsheet className="w-4 h-4" />
              Export Excel
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#e8e8e8] p-4 sm:grid-cols-5">
        <div className="rounded-xl bg-[#e8f5e9] p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#666]">Gross Revenue</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0c831f]">
            {formatCurrency(totalGrossRevenue)}
          </p>
        </div>
        <div className="rounded-xl bg-[#f0f9ff] p-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#0369a1]" />
            <span className="text-xs font-bold text-[#666]">Net Revenue</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0369a1]">
            {formatCurrency(totalNetRevenue)}
          </p>
        </div>
        <div className="rounded-xl bg-[#fffbeb] p-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#d97706]" />
            <span className="text-xs font-bold text-[#666]">Total Orders</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#d97706]">
            {totalOrders}
          </p>
        </div>
        <div className="rounded-xl bg-[#fef2f2] p-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#b91c1c]" />
            <span className="text-xs font-bold text-[#666]">Refunds</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#b91c1c]">
            {formatCurrency(totalRefunds)}
          </p>
        </div>
        <div className="rounded-xl bg-[#f6f7f6] p-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#666]" />
            <span className="text-xs font-bold text-[#666]">Avg Order Value</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#1a1a1a]">
            {formatCurrency(avgOrderValue)}
          </p>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="border-b border-[#e8e8e8] p-4">
        <h3 className="text-xs font-black uppercase tracking-wide text-[#666] mb-3">
          Revenue Summary (Selected Period)
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-[#e8f5e9] p-3">
            <p className="text-xs font-bold text-[#666]">Gross Revenue</p>
            <p className="text-lg font-black text-[#0c831f]">
              {formatCurrency(totalGrossRevenue)}
            </p>
          </div>
          <div className="rounded-lg bg-[#fef2f2] p-3">
            <p className="text-xs font-bold text-[#666]">Discounts</p>
            <p className="text-lg font-black text-[#b91c1c]">
              -{formatCurrency(totalDiscounts)}
            </p>
          </div>
          <div className="rounded-lg bg-[#fffbeb] p-3">
            <p className="text-xs font-bold text-[#666]">Refunds</p>
            <p className="text-lg font-black text-[#d97706]">
              -{formatCurrency(totalRefunds)}
            </p>
          </div>
          <div className="rounded-lg bg-[#f0f9ff] p-3">
            <p className="text-xs font-bold text-[#666]">Net Revenue</p>
            <p className="text-lg font-black text-[#0369a1]">
              {formatCurrency(totalNetRevenue)}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
            <input
              type="text"
              placeholder="Search by date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] py-2 pl-9 pr-4 text-sm text-[#1a1a1a] placeholder:text-[#666] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#666]" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Gross Revenue</th>
              <th className="px-4 py-3 text-right">Discounts</th>
              <th className="px-4 py-3 text-right">Refunds</th>
              <th className="px-4 py-3 text-right">Net Revenue</th>
              <th className="px-4 py-3 text-center">Orders</th>
              <th className="px-4 py-3 text-right">Avg Order Value</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr
                key={data.date}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <span className="font-bold">{data.date}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#0c831f]">
                    {formatCurrency(data.grossRevenue)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#b91c1c]">
                    -{formatCurrency(data.discounts)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#d97706]">
                    -{formatCurrency(data.refunds)}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-bold text-[#0369a1]">
                    {formatCurrency(data.netRevenue)}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-bold">{data.orders}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#666]">
                    {formatCurrency(data.avgOrderValue)}
                  </span>
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
                      title="Download Report"
                    >
                      <Download className="w-4 h-4 text-[#0c831f]" />
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
              {filteredData.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredData.length}
            </span>{" "}
            records
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