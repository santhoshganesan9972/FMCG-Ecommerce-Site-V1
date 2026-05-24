"use client";

import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  Truck,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  Clock,
  Package,
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";
import { mockReturnRequests } from "@/data/returns";

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
    approved: "bg-[#f0f9ff] text-[#0369a1]",
    rejected: "bg-[#fef2f2] text-[#b91c1c]",
    pickup_scheduled: "bg-[#f0f9ff] text-[#0369a1]",
    in_transit: "bg-[#f0f9ff] text-[#0369a1]",
    completed: "bg-[#e8f5e9] text-[#0c831f]",
    cancelled: "bg-[#fef2f2] text-[#b91c1c]",
  };
  const labels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    pickup_scheduled: "Pickup Scheduled",
    in_transit: "In Transit",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  const icons = {
    pending: <Clock className="w-3 h-3 mr-1" />,
    approved: <CheckCircle className="w-3 h-3 mr-1" />,
    rejected: <XCircle className="w-3 h-3 mr-1" />,
    pickup_scheduled: <Truck className="w-3 h-3 mr-1" />,
    in_transit: <Package className="w-3 h-3 mr-1 animate-pulse" />,
    completed: <CheckCircle className="w-3 h-3 mr-1" />,
    cancelled: <XCircle className="w-3 h-3 mr-1" />,
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${styles[status as keyof typeof styles]}`}
    >
      {icons[status as keyof typeof icons]}
      {labels[status as keyof typeof labels]}
    </span>
  );
};

const getCategoryBadge = (category: string) => {
  const styles = {
    damaged: "bg-[#fef2f2] text-[#b91c1c]",
    wrong_item: "bg-[#fffbeb] text-[#d97706]",
    missing_item: "bg-[#f0f9ff] text-[#0369a1]",
    quality_issue: "bg-[#fef3c7] text-[#92400e]",
    expired: "bg-[#fef2f2] text-[#b91c1c]",
    changed_mind: "bg-[#f3f4f6] text-[#4b5563]",
    other: "bg-[#f3f4f6] text-[#4b5563]",
  };
  const labels = {
    damaged: "Damaged",
    wrong_item: "Wrong Item",
    missing_item: "Missing",
    quality_issue: "Quality",
    expired: "Expired",
    changed_mind: "Changed Mind",
    other: "Other",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${styles[category as keyof typeof styles]}`}
    >
      {labels[category as keyof typeof labels]}
    </span>
  );
};

export default function ReturnsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedReturns, setSelectedReturns] = useState<Set<string>>(new Set());
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  const filteredReturns = mockReturnRequests.filter((ret) => {
    const matchesSearch =
      ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ret.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || ret.returnCategory === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalRefundAmount = filteredReturns.reduce((sum, r) => sum + r.refundAmount, 0);
  const pendingCount = filteredReturns.filter((r) => r.status === "pending").length;
  const approvedCount = filteredReturns.filter((r) => r.status === "approved" || r.status === "pickup_scheduled" || r.status === "in_transit").length;

  const toggleSelectAll = () => {
    if (selectedReturns.size === filteredReturns.length) {
      setSelectedReturns(new Set());
    } else {
      setSelectedReturns(new Set(filteredReturns.map((r) => r.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedReturns);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReturns(newSelected);
  };

  const handleApprove = (id: string) => {
    alert(`Approving return request ${id}`);
    setShowActionsMenu(null);
  };

  const handleReject = (id: string) => {
    alert(`Rejecting return request ${id}`);
    setShowActionsMenu(null);
  };

  const handleSchedulePickup = (id: string) => {
    alert(`Scheduling pickup for return request ${id}`);
    setShowActionsMenu(null);
  };

  const handleProcessRefund = (id: string) => {
    alert(`Processing refund for return request ${id}`);
    setShowActionsMenu(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Return Requests
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              All Returns ({filteredReturns.length})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <RotateCcw className="w-4 h-4" />
              Manual Return
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 gap-3 border-b border-[#e8e8e8] p-4 sm:grid-cols-4">
        <div className="rounded-xl bg-[#fffbeb] p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d97706]" />
            <span className="text-xs font-bold text-[#666]">Pending Review</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#d97706]">
            {pendingCount}
          </p>
        </div>
        <div className="rounded-xl bg-[#f0f9ff] p-4">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#0369a1]" />
            <span className="text-xs font-bold text-[#666]">In Process</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0369a1]">
            {approvedCount}
          </p>
        </div>
        <div className="rounded-xl bg-[#e8f5e9] p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#0c831f]" />
            <span className="text-xs font-bold text-[#666]">Completed</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#0c831f]">
            {filteredReturns.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="rounded-xl bg-[#fef2f2] p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#b91c1c]" />
            <span className="text-xs font-bold text-[#666]">Refund Amount</span>
          </div>
          <p className="mt-1 text-2xl font-black text-[#b91c1c]">
            {formatCurrency(totalRefundAmount)}
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
              <option value="approved">Approved</option>
              <option value="pickup_scheduled">Pickup Scheduled</option>
              <option value="in_transit">In Transit</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="damaged">Damaged</option>
              <option value="wrong_item">Wrong Item</option>
              <option value="missing_item">Missing Item</option>
              <option value="quality_issue">Quality Issue</option>
              <option value="expired">Expired</option>
              <option value="changed_mind">Changed Mind</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedReturns.size === filteredReturns.length && filteredReturns.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-[#e8e8e8] text-[#0c831f] focus:ring-[#0c831f]"
                />
              </th>
              <th className="px-4 py-3">Return ID</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Refund Amount</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Requested</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReturns.map((ret) => (
              <tr
                key={ret.id}
                className={`border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb] ${
                  selectedReturns.has(ret.id) ? "bg-[#f0f9ff]" : ""
                }`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedReturns.has(ret.id)}
                    onChange={() => toggleSelect(ret.id)}
                    className="rounded border-[#e8e8e8] text-[#0c831f] focus:ring-[#0c831f]"
                  />
                </td>
                <td className="px-4 py-4">
                  <span className="font-mono text-xs font-bold text-[#0c831f]">
                    {ret.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-medium text-[#666]">
                    {ret.orderId}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{ret.customerName}</p>
                    <p className="text-xs text-[#666] truncate max-w-[120px]">{ret.customerEmail}</p>
                  </div>
                </td>
                <td className="px-4 py-4 max-w-[200px]">
                  <div className="flex flex-col gap-1">
                    {ret.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <Package className="w-3 h-3 text-[#666]" />
                        <span className="text-xs text-[#666] truncate">
                          {item.productName} x{item.quantity}
                        </span>
                      </div>
                    ))}
                    {ret.items.length > 2 && (
                      <span className="text-xs text-[#0c831f]">+{ret.items.length - 2} more</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-[#b91c1c]">
                    {formatCurrency(ret.refundAmount)}
                  </span>
                </td>
                <td className="px-4 py-4 max-w-[180px]">
                  <span className="text-xs text-[#666] line-clamp-2" title={ret.returnReason}>
                    {ret.returnReason}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {getCategoryBadge(ret.returnCategory)}
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(ret.status)}
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">
                  {ret.requestedAt.split(" ")[0]}
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === ret.id ? null : ret.id)}
                      className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                    >
                      <MoreHorizontal className="w-4 h-4 text-[#666]" />
                    </button>
                    {showActionsMenu === ret.id && (
                      <div className="absolute right-0 top-8 z-10 min-w-[180px] rounded-xl border border-[#e8e8e8] bg-white shadow-lg">
                        <div className="p-1">
                          {ret.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(ret.id)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0c831f] hover:bg-[#e8f5e9]"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve Return
                              </button>
                              <button
                                onClick={() => handleReject(ret.id)}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b91c1c] hover:bg-[#fef2f2]"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject Return
                              </button>
                            </>
                          )}
                          {ret.status === "approved" && (
                            <button
                              onClick={() => handleSchedulePickup(ret.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0369a1] hover:bg-[#f0f9ff]"
                            >
                              <Truck className="w-4 h-4" />
                              Schedule Pickup
                            </button>
                          )}
                          {(ret.status === "pickup_scheduled" || ret.status === "in_transit") && (
                            <button
                              onClick={() => handleProcessRefund(ret.id)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0c831f] hover:bg-[#e8f5e9]"
                            >
                              <CreditCard className="w-4 h-4" />
                              Process Refund
                            </button>
                          )}
                          <button
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#666] hover:bg-[#f6f7f6]"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
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
              {filteredReturns.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1a1a1a]">
              {filteredReturns.length}
            </span>{""}
            returns
            {selectedReturns.size > 0 && (
              <span className="ml-2 text-[#0c831f]">
                ({selectedReturns.size} selected)
              </span>
            )}
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