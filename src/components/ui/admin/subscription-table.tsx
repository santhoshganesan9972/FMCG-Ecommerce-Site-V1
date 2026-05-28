"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  UserPlus,
  Minus,
  RefreshCw,
  X,
  Eye,
  Calendar,
  Activity,
  DollarSign,
  CreditCard,
  FileText,
  Truck,
  CheckCircle,
  RotateCcw,
  Clock,
} from "lucide-react";
import { useSubscriptionStore, SubscriptionStatus } from "@/store/subscription-store";
import { mockSubscriptionPlans } from "@/data/subscription";
import { toast } from "sonner";

type TabType = "all" | "active" | "paused" | "cancelled";

const tabs: { key: TabType; label: string }[] = [
  { key: "all", label: "All Subscriptions" },
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
  { key: "cancelled", label: "Cancelled" },
];

export default function SubscriptionTable() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { subscriptions, openMenuId, toggleMenu, updateStatus } =
    useSubscriptionStore();

  const filtered =
    activeTab === "all"
      ? subscriptions
      : subscriptions.filter((s) => s.status === activeTab);

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const pausedCount = subscriptions.filter((s) => s.status === "paused").length;
  const cancelledCount = subscriptions.filter(
    (s) => s.status === "cancelled"
  ).length;

  const handlePause = (id: string, name: string) => {
    toast.success(`Subscription ${id} for ${name} paused`);
    updateStatus(id, "paused");
    toggleMenu("x");
  };

  const handleResume = (id: string, name: string) => {
    toast.success(`Subscription ${id} for ${name} resumed`);
    updateStatus(id, "active");
    toggleMenu("x");
  };

  const handleCancel = (id: string, name: string) => {
    toast.success(`Subscription ${id} for ${name} cancelled`);
    updateStatus(id, "cancelled");
    toggleMenu("x");
  };

  const getPlanMeta = (planName: string) =>
    mockSubscriptionPlans.find((p) => p.name === planName);

  return (
    <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Tabs + Actions header */}
      <div className="flex flex-col gap-3 border-b border-[#e8e8e8] px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mb-px flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === tab.key
                    ? "text-[#0c831f]"
                    : "text-[#999] hover:text-[#1a1a1a]"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#0c831f]" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/subscription/create">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <CreditCard className="w-4 h-4" />
                Create Plan
              </button>
            </Link>
            <Link href="/admin/subscription/recurring">
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <FileText className="w-4 h-4" />
                Recurring Orders
              </button>
            </Link>
            <button
              onClick={() => toast.success("Subscriptions exported")}
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-[#666] hover:bg-[#f8f9fa]"
            >
              <CreditCard className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Status pill count strip */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="rounded-full bg-[#e8f5e9] text-[#0c831f] px-2.5 py-0.5 text-[10px] font-bold">
            {activeCount} Active
          </span>
          <span className="rounded-full bg-[#fffbeb] text-[#d97706] px-2.5 py-0.5 text-[10px] font-bold">
            {pausedCount} Paused
          </span>
          <span className="rounded-full bg-[#fef2f2] text-[#b91c1c] px-2.5 py-0.5 text-[10px] font-bold">
            {cancelledCount} Cancelled
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1024px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Subscription</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Billing Cycle</th>
              <th className="px-4 py-3">Next Billing</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Total Billed</th>
              <th className="px-4 py-3">Cycles</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sub) => {
              const planMeta = getPlanMeta(sub.planName);
              return (
                <tr
                  key={sub.id}
                  className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
                >
                  <td className="px-4 py-4">
                    <span className="text-xs font-mono font-bold text-[#0c831f]">
                      {sub.id}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold">{sub.customerName}</p>
                      <p className="text-xs text-[#666]">{sub.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-semibold text-[#1a1a1a]">
                        {sub.planName}
                      </p>
                      <p className="mt-0.5 h-4 w-6">
                        {planMeta && (
                          <span className="inline-block rounded border border-[#e8e8e8] px-1.5 py-0 text-[9px] font-bold uppercase text-[#999] bg-[#f6f7f6]">
                            {planMeta.type}
                          </span>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        sub.status === "active"
                          ? "bg-[#e8f5e9] text-[#0c831f]"
                          : sub.status === "paused"
                          ? "bg-[#fffbeb] text-[#d97706]"
                          : "bg-[#fef2f2] text-[#b91c1c]"
                      }`}
                    >
                      {sub.status === "active"
                        ? "Active"
                        : sub.status === "paused"
                        ? "Paused"
                        : "Cancelled"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium text-[#666]">
                      {planMeta ? (
                        planMeta.billingCycle
                      ) : (
                        <span className="capitalize">{sub.planType}</span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs font-medium text-[#1a1a1a]">
                    {sub.nextBillingDate !== "—" ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#0c831f]" />
                        {sub.nextBillingDate}
                      </span>
                    ) : (
                      <span className="text-[#999]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 font-bold text-[#1a1a1a]">
                    {sub.amount}
                  </td>
                  <td className="px-4 py-4 font-medium text-[#666]">
                    {sub.totalBilled}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-lg bg-[#f6f7f6] px-2.5 py-1 text-xs font-bold text-[#666]">
                      <CheckCircle className="w-3 h-3 mr-1 text-[#0c831f]" />
                      {sub.cyclesCompleted}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#e8f5e9] px-2.5 py-1 text-xs font-bold text-[#0c831f]">
                      <CreditCard className="w-3 h-3" />
                      {sub.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="relative flex justify-end">
                      <button
                        onClick={() => toggleMenu(sub.id)}
                        className="rounded-lg p-1.5 hover:bg-[#e8e8e8]"
                      >
                        <MoreHorizontal className="h-4 w-4 text-[#666]" />
                      </button>
                      {openMenuId === sub.id && (
                        <div className="absolute right-0 top-8 z-10 min-w-[210px] rounded-xl border border-[#e8e8e8] bg-white shadow-lg">
                          <div className="p-1">
                            <Link href={`/admin/delivery/${sub.id}`}>
                              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#666] hover:bg-[#f6f7f6]">
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                            </Link>
                            {sub.status === "active" && (
                              <button
                                onClick={() =>
                                  handlePause(sub.id, sub.customerName)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#d97706] hover:bg-[#fffbeb]"
                              >
                                <Minus className="w-4 h-4" />
                                Pause Subscription
                              </button>
                            )}
                            {sub.status === "paused" && (
                              <button
                                onClick={() =>
                                  handleResume(sub.id, sub.customerName)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0c831f] hover:bg-[#e8f5e9]"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Resume Subscription
                              </button>
                            )}
                            {(sub.status === "active" ||
                              sub.status === "paused") && (
                              <button
                                onClick={() =>
                                  handleCancel(sub.id, sub.customerName)
                                }
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#b91c1c] hover:bg-[#fef2f2]"
                              >
                                <X className="w-4 h-4" />
                                Cancel Subscription
                              </button>
                            )}
                            <div className="my-1 border-t border-[#e8e8e8]" />
                            <Link
                              href="/admin/subscription/recurring"
                            >
                              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#666] hover:bg-[#f6f7f6]">
                                <Truck className="w-4 h-4" />
                                View Recurring Orders
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-12 text-center text-sm font-semibold text-[#999]"
                >
                  No subscriptions found for this tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
