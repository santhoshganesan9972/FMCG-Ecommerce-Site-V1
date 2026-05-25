// ── Order Card (Kanban) ─────────────────────────────────
// Reusable card component for the Order Kanban board

"use client";

import { Truck, Clock, ShoppingCart } from "lucide-react";
import StatusBadge from "../../admin/reusable-status-badge";
import type { Order } from "@/types/orders";

interface OrderCardProps {
  order: Order;
  onClick?: (order: Order) => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  return (
    <div
      onClick={() => onClick?.(order)}
      className="cursor-pointer rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-3 transition-all hover:shadow-sm hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#0c831f]">{order.id}</span>
        <span className="text-[10px] text-[#999]">
          {order.createdAt.includes("T")
            ? order.createdAt.split("T")[1]?.split(":").slice(0, 2).join(":")
            : order.createdAt.split(" ")[1]}
        </span>
      </div>
      <p className="mt-1 text-sm font-bold text-[#1a1a1a]">{order.customer}</p>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-[#666]">{order.items.reduce((s, i) => s + i.quantity, 0)} items</span>
        <span className="font-bold text-[#1a1a1a]">₹{order.total}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#999]">
        {order.paymentMethod && <span>{order.paymentMethod}</span>}
        {order.status === "out_for_delivery" && <Truck className="h-3 w-3 ml-1 text-[#0c831f]" />}
        {order.status === "pending" && <Clock className="h-3 w-3 ml-1 text-[#d97706]" />}
        {order.status === "delivered" && <ShoppingCart className="h-3 w-3 ml-1 text-[#0c831f]" />}
      </div>
    </div>
  );
}

// ── Kanban Column ────────────────────────────────────────

interface KanbanColumnProps {
  title: string;
  orders: Order[];
  status: string;
  onOrderClick?: (order: Order) => void;
}

export function KanbanColumn({ title, orders, status, onOrderClick }: KanbanColumnProps) {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      <div className="border-b border-[#e8e8e8] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusBadge status={status} dot={false} />
            <span className="text-sm font-bold text-[#1a1a1a]">{title}</span>
          </div>
          <span className="rounded-full bg-[#f6f7f6] px-2 py-0.5 text-[10px] font-bold text-[#666]">
            {orders.length}
          </span>
        </div>
      </div>
      <div className="space-y-2 p-3 min-h-[200px]">
        {orders.length === 0 ? (
          <p className="py-8 text-center text-xs text-[#999]">No orders</p>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} onClick={onOrderClick} />
          ))
        )}
      </div>
    </div>
  );
}
