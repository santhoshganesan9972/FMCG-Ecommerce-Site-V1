"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Clock, CheckCircle, Truck, Package, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

const orderTimelines = [
  { id: "ORD-001", customer: "Ravi Kumar", items: 5, total: 1240, status: "preparing", timeline: [
    { time: "2026-05-21 14:30", event: "Order placed", icon: ShoppingCart },
    { time: "2026-05-21 14:32", event: "Payment confirmed (UPI)", icon: CheckCircle },
    { time: "2026-05-21 14:35", event: "Order confirmed", icon: CheckCircle },
    { time: "2026-05-21 14:40", event: "Order is being prepared", icon: Package },
  ]},
  { id: "ORD-002", customer: "Anita Singh", items: 3, total: 680, status: "out_for_delivery", timeline: [
    { time: "2026-05-21 13:00", event: "Order placed", icon: ShoppingCart },
    { time: "2026-05-21 13:02", event: "Payment confirmed (Card)", icon: CheckCircle },
    { time: "2026-05-21 13:10", event: "Order confirmed", icon: CheckCircle },
    { time: "2026-05-21 13:25", event: "Order prepared & packed", icon: Package },
    { time: "2026-05-21 13:50", event: "Out for delivery", icon: Truck },
  ]},
];

export default function TimelinePage() {
  const [search, setSearch] = useState("");
  const filtered = orderTimelines.filter(o => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Orders</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Order Timeline</h1>
          <p className="mt-2 text-sm text-[#666]">View the complete event timeline for each order from placement to delivery.</p>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search by order ID or customer..." />

        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#0c831f]">{order.id}</span>
                  <span className="text-sm font-bold text-[#1a1a1a]">{order.customer}</span>
                  <StatusBadge status={order.status} />
                </div>
                <span className="text-sm font-bold">₹{order.total}</span>
              </div>
              <div className="relative ml-2 space-y-0">
                {order.timeline.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f5e9]">
                        <event.icon className="h-3.5 w-3.5 text-[#0c831f]" />
                      </div>
                      {i < order.timeline.length - 1 && <div className="w-0.5 flex-1 bg-[#e8f5e9]" />}
                    </div>
                    <div className="pb-5">
                      <p className="text-sm font-bold text-[#1a1a1a]">{event.event}</p>
                      <p className="text-xs text-[#999]">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
