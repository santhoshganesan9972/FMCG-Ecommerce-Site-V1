"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Wallet,
  Plus,
  Minus,
  Eye,
  Edit,
  Gift,
  Activity,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { mockWallets } from "@/data/finance";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-bold text-[#0c831f]">
        <CheckCircle className="w-3 h-3" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#fef2f2] px-2 py-0.5 text-xs font-bold text-[#b91c1c]">
      <XCircle className="w-3 h-3" />
      Suspended
    </span>
  );
};

export default function WalletTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredWallets = mockWallets.filter((wallet) => {
    const matchesSearch =
      wallet.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallet.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || wallet.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBalance = filteredWallets.reduce((sum, w) => sum + w.balance, 0);
  const totalCashback = filteredWallets.reduce((sum, w) => sum + w.cashback, 0);
  const totalSpent = filteredWallets.reduce((sum, w) => sum + w.totalSpent, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Customer Wallets
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Wallet Management
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <Plus className="w-4 h-4" />
              Add Balance
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#e8e8e8] p-4 sm:grid-cols-4">
        <div className="rounded-xl bg-[#e8f5e9] p-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#666]">Total Balance</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0c831f]">
            {formatCurrency(totalBalance)}
          </p>
        </div>
        <div className="rounded-xl bg-[#f0f9ff] p-4">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#0369a1]" />
            <span className="text-xs font-bold text-[#666]">Total Cashback</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0369a1]">
            {formatCurrency(totalCashback)}
          </p>
        </div>
        <div className="rounded-xl bg-[#fffbeb] p-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#d97706]" />
            <span className="text-xs font-bold text-[#666]">Total Spent</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#d97706]">
            {formatCurrency(totalSpent)}
          </p>
        </div>
        <div className="rounded-xl bg-[#f6f7f6] p-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#666]" />
            <span className="text-xs font-bold text-[#666]">Active Wallets</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#1a1a1a]">
            {filteredWallets.filter((w) => w.status === "active").length}
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
              placeholder="Search by Customer ID, Name, Email..."
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
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3 text-right">Wallet Balance</th>
              <th className="px-4 py-3 text-right">Cashback</th>
              <th className="px-4 py-3 text-right">Total Spent</th>
              <th className="px-4 py-3 text-center">Last Transaction</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWallets.map((wallet) => (
              <tr
                key={wallet.customerId}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f5e9]">
                      <span className="text-sm font-black text-[#0c831f]">
                        {wallet.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">{wallet.customerName}</p>
                      <p className="text-xs text-[#666]">{wallet.email}</p>
                      <p className="text-xs font-mono text-[#666]">
                        ID: {wallet.customerId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Wallet className="w-4 h-4 text-[#0c831f]" />
                    <span className="font-bold text-[#0c831f]">
                      {formatCurrency(wallet.balance)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Gift className="w-4 h-4 text-[#0369a1]" />
                    <span className="font-medium text-[#0369a1]">
                      {formatCurrency(wallet.cashback)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-medium text-[#666]">
                    {formatCurrency(wallet.totalSpent)}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-xs text-[#666]">
                    {wallet.lastTransaction}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  {getStatusBadge(wallet.status)}
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
                      title="Add Balance"
                    >
                      <Plus className="w-4 h-4 text-[#0c831f]" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="Deduct Balance"
                    >
                      <Minus className="w-4 h-4 text-[#b91c1c]" />
                    </button>
                    <button
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-[#666]" />
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
              {filteredWallets.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredWallets.length}
            </span>{" "}
            wallets
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
