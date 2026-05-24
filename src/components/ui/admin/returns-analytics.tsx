"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react";
import { mockReturnAnalytics, mockReturnReasons } from "@/data/returns";

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-IN").format(num);
};

const getTrendIcon = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up":
      return <ArrowUpRight className="w-3 h-3" />;
    case "down":
      return <ArrowDownRight className="w-3 h-3" />;
    case "stable":
      return <Minus className="w-3 h-3" />;
  }
};

const getTrendColor = (trend: "up" | "down" | "stable", isNegative?: boolean) => {
  if (trend === "stable") return "text-[#666] bg-[#f3f4f6]";
  if (isNegative) {
    // For negative metrics, up is bad, down is good
    return trend === "up" ? "text-[#b91c1c] bg-[#fef2f2]" : "text-[#0c831f] bg-[#e8f5e9]";
  }
  // For positive metrics, up is good, down is bad
  return trend === "up" ? "text-[#0c831f] bg-[#e8f5e9]" : "text-[#b91c1c] bg-[#fef2f2]";
};

export default function ReturnsAnalytics() {
  const analytics = mockReturnAnalytics;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-[#666]">Total Returns</p>
              <p className="mt-2 text-3xl font-black text-[#1a1a1a]">
                {formatNumber(analytics.totalReturns)}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-bold text-[#0c831f]">
                  +12.5%
                </span>
                <span className="text-xs text-[#666]">vs last month</span>
              </div>
            </div>
            <div className="rounded-xl bg-[#f0f9ff] p-3">
              <Package className="w-5 h-5 text-[#0369a1]" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-[#666]">Pending Returns</p>
              <p className="mt-2 text-3xl font-black text-[#1a1a1a]">
                {formatNumber(analytics.pendingReturns)}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="rounded-full bg-[#fffbeb] px-2 py-0.5 text-xs font-bold text-[#d97706]">
                  {Math.round((analytics.pendingReturns / analytics.totalReturns) * 100)}%
                </span>
                <span className="text-xs text-[#666]">of total</span>
              </div>
            </div>
            <div className="rounded-xl bg-[#fffbeb] p-3">
              <Clock className="w-5 h-5 text-[#d97706]" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-[#666]">Avg Processing Time</p>
              <p className="mt-2 text-3xl font-black text-[#1a1a1a]">
                {analytics.avgProcessingTime}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-bold text-[#0c831f]">
                  -2.5 hrs
                </span>
                <span className="text-xs text-[#666]">improved</span>
              </div>
            </div>
            <div className="rounded-xl bg-[#e8f5e9] p-3">
              <CheckCircle className="w-5 h-5 text-[#0c831f]" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-[#666]">Return Rate</p>
              <p className="mt-2 text-3xl font-black text-[#1a1a1a]">
                {analytics.returnRate}%
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="rounded-full bg-[#fef2f2] px-2 py-0.5 text-xs font-bold text-[#b91c1c]">
                  +0.3%
                </span>
                <span className="text-xs text-[#666]">vs last month</span>
              </div>
            </div>
            <div className="rounded-xl bg-[#fef2f2] p-3">
              <AlertTriangle className="w-5 h-5 text-[#b91c1c]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Daily Returns Chart */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Trend Analysis
              </p>
              <h3 className="mt-1 text-lg font-black text-[#1a1a1a]">Daily Returns (Last 7 Days)</h3>
            </div>
            <div className="rounded-lg bg-[#f6f7f6] p-2">
              <BarChart3 className="w-5 h-5 text-[#666]" />
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {analytics.dailyReturns.map((day, idx) => {
              const maxCount = Math.max(...analytics.dailyReturns.map((d) => d.count));
              const height = (day.count / maxCount) * 100;
              return (
                <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-lg bg-[#0c831f] transition-all hover:bg-[#ff4f8b]"
                      style={{ height: `${height * 1.5}px`, minHeight: "20px" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-[#1a1a1a]">{day.count}</p>
                    <p className="text-[10px] text-[#666]">
                      {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Return Reasons Distribution */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Insights
              </p>
              <h3 className="mt-1 text-lg font-black text-[#1a1a1a]">Return Reasons Distribution</h3>
            </div>
            <div className="rounded-lg bg-[#f6f7f6] p-2">
              <PieChart className="w-5 h-5 text-[#666]" />
            </div>
          </div>
          <div className="space-y-3">
            {mockReturnReasons.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-24 text-xs font-bold text-[#666] truncate">
                  {reason.reason}
                </div>
                <div className="flex-1 h-6 rounded-full bg-[#f6f7f6] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0
                        ? "bg-[#ff4f8b]"
                        : idx === 1
                        ? "bg-[#0c831f]"
                        : idx === 2
                        ? "bg-[#0369a1]"
                        : idx === 3
                        ? "bg-[#d97706]"
                        : idx === 4
                        ? "bg-[#b91c1c]"
                        : "bg-[#666]"
                    }`}
                    style={{ width: `${reason.percentage}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 w-24 justify-end">
                  <span className="text-xs font-black text-[#1a1a1a] w-10 text-right">
                    {reason.percentage}%
                  </span>
                  <span
                    className={`flex items-center justify-center rounded px-1 py-0.5 ${getTrendColor(
                      reason.trend,
                      reason.category === "damaged" || reason.category === "expired"
                    )}`}
                  >
                    {getTrendIcon(reason.trend)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Reasons Table */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Detailed Breakdown
            </p>
            <h3 className="mt-1 text-lg font-black text-[#1a1a1a]">Return Reasons Analytics</h3>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Count</th>
                <th className="px-4 py-3 text-center">Percentage</th>
                <th className="px-4 py-3 text-center">Trend</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockReturnReasons.map((reason, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          idx === 0
                            ? "bg-[#ff4f8b]"
                            : idx === 1
                            ? "bg-[#0c831f]"
                            : idx === 2
                            ? "bg-[#0369a1]"
                            : idx === 3
                            ? "bg-[#d97706]"
                            : idx === 4
                            ? "bg-[#b91c1c]"
                            : "bg-[#666]"
                        }`}
                      />
                      <span className="font-bold">{reason.reason}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[#f6f7f6] px-2 py-1 text-xs font-bold text-[#666]">
                      {reason.category.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-black text-[#1a1a1a]">{formatNumber(reason.count)}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-black text-[#1a1a1a]">{reason.percentage}%</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-bold ${getTrendColor(
                          reason.trend,
                          reason.category === "damaged" || reason.category === "expired"
                        )}`}
                      >
                        {getTrendIcon(reason.trend)}
                        {reason.trend === "up" ? "↑" : reason.trend === "down" ? "↓" : "→"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="rounded-lg px-3 py-1.5 text-xs font-bold text-[#0c831f] hover:bg-[#e8f5e9]">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
            Smart Insights
          </p>
          <h3 className="mt-1 text-lg font-black text-[#1a1a1a]">AI-Powered Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[#fef2f2] bg-[#fef2f2]/30 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#fef2f2] p-2">
                <AlertTriangle className="w-4 h-4 text-[#b91c1c]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">High Damage Rate</p>
                <p className="mt-1 text-xs text-[#666]">
                  Damaged products account for 28.5% of returns. Consider improving packaging for fragile items.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#fffbeb] bg-[#fffbeb]/30 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#fffbeb] p-2">
                <TrendingUp className="w-4 h-4 text-[#d97706]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Wrong Item Trend</p>
                <p className="mt-1 text-xs text-[#666]">
                  Wrong item deliveries are trending down. Current picking accuracy: 97.2%.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#e8f5e9] bg-[#e8f5e9]/30 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-[#e8f5e9] p-2">
                <CheckCircle className="w-4 h-4 text-[#0c831f]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Processing Time Improved</p>
                <p className="mt-1 text-xs text-[#666]">
                  Average return processing time reduced by 2.5 hours. Target: under 16 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}