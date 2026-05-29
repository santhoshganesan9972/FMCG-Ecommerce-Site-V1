"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  mockTransactions,
  mockPaymentMethodStats,
} from "@/data/finance";

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

const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  iconBg: string;
}) => (
  <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-[#666]">
          {title}
        </p>
        <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{value}</p>
        <div className="mt-2 flex items-center gap-1">
          {changeType === "positive" ? (
            <ArrowUpRight className="w-3 h-3 text-[#0c831f]" />
          ) : changeType === "negative" ? (
            <ArrowDownRight className="w-3 h-3 text-[#b91c1c]" />
          ) : null}
          <span
            className={`text-xs font-bold ${
              changeType === "positive"
                ? "text-[#0c831f]"
                : changeType === "negative"
                ? "text-[#b91c1c]"
                : "text-[#666]"
            }`}
          >
            {change}
          </span>
          <span className="text-xs text-[#666]">vs last week</span>
        </div>
      </div>
      <div className={`rounded-xl p-3 ${iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default function PaymentOverview() {
  const [activeTab, setActiveTab] = useState("recent");

  const totalRevenue = mockTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const successRate =
    (mockTransactions.filter((t) => t.status === "success").length /
      mockTransactions.length) *
    100;
  const pendingAmount = mockTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);
  const refundedAmount = mockTransactions
    .filter((t) => t.status === "refunded")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change="+12.5%"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-[#e8f5e9]"
        />
        <KPICard
          title="Success Rate"
          value={`${successRate.toFixed(1)}%`}
          change="+2.3%"
          changeType="positive"
          icon={CheckCircle}
          iconBg="bg-[#e8f5e9]"
        />
        <KPICard
          title="Pending Amount"
          value={formatCurrency(pendingAmount)}
          change="-5.2%"
          changeType="positive"
          icon={Clock}
          iconBg="bg-[#fffbeb]"
        />
        <KPICard
          title="Refunded Amount"
          value={formatCurrency(refundedAmount)}
          change="+8.1%"
          changeType="negative"
          icon={RefreshCw}
          iconBg="bg-[#fef2f2]"
        />
      </div>

      {/* Payment Methods Performance */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
            Payment Analytics
          </p>
          <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
            Payment Methods Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8e8e8] text-left text-xs font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3 text-right">Transactions</th>
                <th className="px-4 py-3 text-right">Success Rate</th>
                <th className="px-4 py-3 text-right">Total Amount</th>
                <th className="px-4 py-3 text-right">Avg Value</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentMethodStats.map((stat) => (
                <tr
                  key={stat.method}
                  className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#f6f7f6] p-2">
                        <CreditCard className="w-4 h-4 text-[#0c831f]" />
                      </div>
                      <span className="font-bold">{stat.method}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    {stat.transactions.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-[#e8e8e8] rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            stat.successRate >= 95
                              ? "bg-[#0c831f]"
                              : stat.successRate >= 90
                              ? "bg-[#d97706]"
                              : "bg-[#b91c1c]"
                          }`}
                          style={{ width: `${stat.successRate}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          stat.successRate >= 95
                            ? "text-[#0c831f]"
                            : stat.successRate >= 90
                            ? "text-[#d97706]"
                            : "text-[#b91c1c]"
                        }`}
                      >
                        {stat.successRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    {formatCurrency(stat.totalAmount)}
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-[#666]">
                    {formatCurrency(stat.avgTransactionValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Payment Activity
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Recent Transactions
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/admin/finance/transactions"
              className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
            >
              <Activity className="w-4 h-4" />
              View All
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 border-b border-[#e8e8e8]">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("recent")}
              className={`pb-3 text-sm font-bold transition-colors ${
                activeTab === "recent"
                  ? "text-[#0c831f] border-b-2 border-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab("successful")}
              className={`pb-3 text-sm font-bold transition-colors ${
                activeTab === "successful"
                  ? "text-[#0c831f] border-b-2 border-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              Successful
            </button>
            <button
              onClick={() => setActiveTab("failed")}
              className={`pb-3 text-sm font-bold transition-colors ${
                activeTab === "failed"
                  ? "text-[#0c831f] border-b-2 border-[#0c831f]"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8e8e8] text-left text-xs font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Gateway</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.slice(0, 5).map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-4 py-4 font-mono text-xs">
                    <span className="font-bold">{txn.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium text-[#666]">
                      {txn.orderId}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold">{txn.customerName}</p>
                      <p className="text-xs text-[#666]">{txn.customerId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-bold text-[#1a1a1a]">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded bg-[#f6f7f6] px-2 py-1 text-xs font-bold text-[#666]">
                      {txn.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#666]">
                    {txn.gateway}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(txn.status)}
                  </td>
                  <td className="px-4 py-4 text-xs text-[#666]">
                    {txn.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
