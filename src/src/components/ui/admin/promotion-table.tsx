"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Edit, Trash2, Pause, Play, Copy, Calendar, BarChart3 } from "lucide-react";
import { promotions as initialPromotions } from "@/data/promotions";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-[#e8f5e9] text-[#0c831f]" },
  paused: { label: "Paused", className: "bg-[#fffbeb] text-[#d97706]" },
  scheduled: { label: "Scheduled", className: "bg-[#eff6ff] text-[#2563eb]" },
  expired: { label: "Expired", className: "bg-[#fef2f2] text-[#b91c1c]" },
};

const nextStatus: Record<string, string> = {
  active: "paused",
  paused: "active",
};

const typeConfig: Record<string, { icon: string; color: string }> = {
  "Flash Sale": { icon: "⚡", color: "text-[#ff4f8b]" },
  "BOGO": { icon: "🎁", color: "text-[#0c831f]" },
  "Combo Offer": { icon: "📦", color: "text-[#2563eb]" },
  "Coupon": { icon: "🏷️", color: "text-[#d97706]" },
};

export default function PromotionTable({ filter }: { filter?: string }) {
  const [promotions, setPromotions] = useState(initialPromotions);

  const filtered = filter && filter !== "all"
    ? promotions.filter((p) => {
        const typeMap: Record<string, string> = {
          "flash-sale": "Flash Sale",
          "bogo": "BOGO",
          "combo": "Combo Offer",
          "coupon": "Coupon",
        };
        return p.type === typeMap[filter];
      })
    : promotions;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Campaigns
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              All Promotions & Coupons
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {["active", "paused", "scheduled"].map((s) => {
              const config = statusConfig[s];
              const count = promotions.filter((p) => p.status === s).length;
              return (
                <span
                  key={s}
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ${config.className}`}
                >
                  {config.label}: {count}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Usage</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((promo) => {
              const status = statusConfig[promo.status] || statusConfig.active;
              const type = typeConfig[promo.type] || typeConfig["Flash Sale"];
              const usagePercent = Math.round((promo.usageCount / promo.usageLimit) * 100);
              return (
                <tr
                  key={promo.id}
                  className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#fafffe] transition-colors"
                >
                  <td className="px-4 py-4">
                    <Link href={`/admin/promotions/campaigns/${promo.id}`}>
                      <span className="font-black hover:text-[#0c831f] transition-colors">
                        {promo.name}
                      </span>
                    </Link>
                    <p className="text-xs text-[#999] mt-0.5 truncate max-w-[220px]">
                      {promo.description}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 text-sm font-black ${type.color}`}>
                      <span>{type.icon}</span>
                      {promo.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-lg bg-[#fff0f6] px-2.5 py-1 text-xs font-black text-[#ff4f8b]">
                      {promo.discount}
                    </span>
                  </td>
                  <td className="px-4 py-4 min-w-[130px]">
                    <div className="text-xs font-bold">{promo.usageCount} / {promo.usageLimit}</div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-[#e8e8e8]">
                      <div
                        className={`h-full rounded-full ${
                          usagePercent >= 90
                            ? "bg-[#ff4f8b]"
                            : usagePercent >= 60
                            ? "bg-[#d97706]"
                            : "bg-[#0c831f]"
                        }`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 font-bold">{promo.revenue}</td>
                  <td className="px-4 py-4">
                    <div className="text-xs font-medium text-[#666]">
                      {promo.startDate} → {promo.endDate}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ${status.className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          promo.status === "active"
                            ? "bg-[#0c831f] animate-pulse"
                            : promo.status === "scheduled"
                            ? "bg-[#2563eb] animate-spin"
                            : promo.status === "paused"
                            ? "bg-[#d97706]"
                            : "bg-[#b91c1c]"
                        }`} />
                        {status.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/promotions/campaigns/${promo.id}`}>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="View">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      <Link href={`/admin/promotions/campaigns/${promo.id}/edit`}>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#fff0f6] hover:text-[#ff4f8b]" title="Edit">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      <Link href={`/admin/promotions/campaigns/${promo.id}/duplicate`}>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#eff6ff] hover:text-[#2563eb]" title="Duplicate">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      {promo.status === "active" && (
                        <button
                          onClick={() => {
                            const newStatus = nextStatus[promo.status];
                            setPromotions(prev => prev.map(p => p.id === promo.id ? { ...p, status: newStatus } : p));
                            toast.success(newStatus === "paused" ? "Promotion paused" : "Promotion activated");
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#fffbeb] hover:text-[#d97706]" title="Pause"
                        >
                          <Pause className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {promo.status === "paused" && (
                        <button
                          onClick={() => {
                            setPromotions(prev => prev.map(p => p.id === promo.id ? { ...p, status: "active" } : p));
                            toast.success("Promotion activated");
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#e8f5e9] hover:text-[#0c831f]" title="Activate"
                        >
                          <Play className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setPromotions(prev => prev.filter(p => p.id !== promo.id));
                          toast.error("Promotion deleted");
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#ff4f8b]/70 transition-colors hover:bg-[#fef2f2] hover:text-[#b91c1c]" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
