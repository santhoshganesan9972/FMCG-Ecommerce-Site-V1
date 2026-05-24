"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import {
  Award,
  PlusCircle,
  MinusCircle,
  Gift,
  Settings,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Activity,
  RefreshCw,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data for demonstration
const loyaltyStats = {
  totalPointsIssued: "2.45L",
  totalPointsRedeemed: "1.89L",
  activeMembers: "45,231",
  redemptionRate: "77.1%",
  avgPointsPerUser: "54",
  expiryThisMonth: "12,450",
};

const recentActivities = [
  { id: 1, user: "Rajesh Kumar", action: "earned", points: 150, reason: "Order #ORD-2024-0892", time: "2 min ago" },
  { id: 2, user: "Priya Sharma", action: "redeemed", points: 200, reason: "₹200 off on order", time: "15 min ago" },
  { id: 3, user: "Amit Patel", action: "earned", points: 85, reason: "Order #ORD-2024-0891", time: "32 min ago" },
  { id: 4, user: "Sneha Singh", action: "expired", points: 500, reason: "Points expired after 365 days", time: "1 hour ago" },
  { id: 5, user: "Vikram Mehta", action: "adjusted", points: -50, reason: "Manual adjustment - order return", time: "2 hours ago" },
];

const tierDistribution = [
  { tier: "Bronze", count: 28500, percentage: 63, color: "#cd7f32" },
  { tier: "Silver", count: 12200, percentage: 27, color: "#c0c0c0" },
  { tier: "Gold", count: 3800, percentage: 8, color: "#ffd700" },
  { tier: "Platinum", count: 731, percentage: 2, color: "#e5e4e2" },
];

export default function LoyaltyOverviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Customer Engagement
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Loyalty Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage customer loyalty points, reward tiers, and engagement rules. 
                Track redemptions, expirations, and member activity across all channels.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/loyalty/add-points">
                <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                  <PlusCircle className="w-4 h-4" />
                  Add Points
                </button>
              </Link>
              <Link href="/admin/loyalty/deduct-points">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <MinusCircle className="w-4 h-4" />
                  Deduct Points
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f]">
              <Award className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Points Issued</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{loyaltyStats.totalPointsIssued}</p>
            <p className="text-xs text-[#666]">Lifetime total</p>
          </div>
          
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#ff4f8b]">
              <Gift className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Points Redeemed</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{loyaltyStats.totalPointsRedeemed}</p>
            <p className="text-xs text-[#666]">Lifetime total</p>
          </div>
          
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb]">
              <Users className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Active Members</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{loyaltyStats.activeMembers}</p>
            <p className="text-xs text-[#666]">With points balance</p>
          </div>
          
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706]">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Redemption Rate</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{loyaltyStats.redemptionRate}</p>
            <p className="text-xs text-[#666]">Of issued points</p>
          </div>
          
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f]">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Avg Points/User</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{loyaltyStats.avgPointsPerUser}</p>
            <p className="text-xs text-[#666]">Per active member</p>
          </div>
          
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#dc2626]">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-wide">Expiring This Month</span>
            </div>
            <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{loyaltyStats.expiryThisMonth}</p>
            <p className="text-xs text-[#666]">Points expiring</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Quick Actions
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Manage Loyalty Program</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                icon: <PlusCircle className="h-5 w-5" />,
                label: "Add Points",
                desc: "Manually award points",
                href: "/admin/loyalty/add-points",
                bg: "bg-[#e8f5e9]",
                text: "text-[#0c831f]",
              },
              {
                icon: <MinusCircle className="h-5 w-5" />,
                label: "Deduct Points",
                desc: "Remove points manually",
                href: "/admin/loyalty/deduct-points",
                bg: "bg-[#fff0f6]",
                text: "text-[#ff4f8b]",
              },
              {
                icon: <Gift className="h-5 w-5" />,
                label: "Manage Tiers",
                desc: "Configure reward tiers",
                href: "/admin/loyalty/tiers",
                bg: "bg-[#eff6ff]",
                text: "text-[#2563eb]",
              },
              {
                icon: <Settings className="h-5 w-5" />,
                label: "Configure Rules",
                desc: "Set earning & burning rules",
                href: "/admin/loyalty/rules",
                bg: "bg-[#fffbeb]",
                text: "text-[#d97706]",
              },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md">
                  <div
                    className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl ${action.bg} ${action.text}`}
                  >
                    {action.icon}
                  </div>
                  <p className="text-sm font-black text-[#1a1a1a]">{action.label}</p>
                  <p className="mt-0.5 text-xs font-medium text-[#999]">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Tier Distribution */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Member Tiers
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Tier Distribution</h2>
              </div>
              <Link href="/admin/loyalty/tiers">
                <button className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  Manage Tiers
                </button>
              </Link>
            </div>
            
            <div className="mt-4 space-y-3">
              {tierDistribution.map((tier) => (
                <div key={tier.tier} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: tier.color }}
                      />
                      <span className="text-sm font-bold text-[#1a1a1a]">{tier.tier}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-[#1a1a1a]">
                        {tier.count.toLocaleString("en-US")}
                      </span>
                      <span className="text-xs text-[#666] ml-1">({tier.percentage}%)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#f0f0f0]">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${tier.percentage}%`,
                        backgroundColor: tier.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Live Activity
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Recent Transactions</h2>
              </div>
              <Link href="/admin/loyalty/transactions">
                <button className="rounded-lg border border-[#e8e8e8] px-3 py-1.5 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  View All
                </button>
              </Link>
            </div>
            
            <div className="mt-4 space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-lg bg-[#f9fafb] p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.action === 'earned' ? 'bg-[#e8f5e9]' :
                      activity.action === 'redeemed' ? 'bg-[#fff0f6]' :
                      activity.action === 'expired' ? 'bg-[#fef3c7]' :
                      'bg-[#fce7f3]'
                    }`}>
                      {activity.action === 'earned' ? (
                        <ArrowUpRight className="h-4 w-4 text-[#0c831f]" />
                      ) : activity.action === 'redeemed' ? (
                        <ArrowDownRight className="h-4 w-4 text-[#ff4f8b]" />
                      ) : activity.action === 'expired' ? (
                        <Clock className="h-4 w-4 text-[#d97706]" />
                      ) : (
                        <Activity className="h-4 w-4 text-[#2563eb]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1a1a1a]">{activity.user}</p>
                      <p className="text-xs text-[#666]">{activity.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${
                      activity.action === 'earned' ? 'text-[#0c831f]' :
                      activity.action === 'redeemed' ? 'text-[#ff4f8b]' :
                      activity.action === 'expired' ? 'text-[#d97706]' :
                      'text-[#2563eb]'
                    }`}>
                      {activity.action === 'earned' ? '+' : ''}{activity.points} pts
                    </p>
                    <p className="text-xs text-[#999]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
