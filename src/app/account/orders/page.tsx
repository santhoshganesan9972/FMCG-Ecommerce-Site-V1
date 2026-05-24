"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Package, Truck, Search, Filter, ChevronDown, Star, Clock, RotateCcw, ShoppingBag } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import ReturnsWorkflow from "@/components/ui/orders/returns-workflow";
import ReorderFromHistory from "@/components/ui/orders/reorder-from-history";

const filters = ["All", "Delivered", "Processing", "Cancelled"];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [returnOrder, setReturnOrder] = useState<{ id: string; items: { id: number; name: string; image: string; price: number; quantity: number }[] } | null>(null);
  const [reorderData, setReorderData] = useState<{ isOpen: boolean; orderId: string; orderDate: string; items: { id: number; name: string; image: string; price: number; quantity: number }[] }>({ isOpen: false, orderId: "", orderDate: "", items: [] });

  const orders = useOrderStore((state) => state.orders);

  const filteredOrders = activeFilter === "All"
    ? orders
    : orders.filter((o) => o.status === activeFilter);

  return (
    <main className="min-h-screen bg-[#f2f2f2] pb-24">
      {/* ── Sticky Header ── */}
      <div className="bg-white border-b border-[#e8e8e8] px-4 py-3 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3">
          <Link href="/account" className="p-2 hover:bg-[#f2f2f2] rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[#1a1a1a]">Your Orders</h1>
          </div>
          <button className="w-9 h-9 rounded-full bg-[#f2f2f2] flex items-center justify-center hover:bg-[#e8e8e8] transition-colors">
            <Search className="w-4 h-4 text-[#666]" />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#f2f2f2] flex items-center justify-center hover:bg-[#e8e8e8] transition-colors">
            <Filter className="w-4 h-4 text-[#666]" />
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-5">

        {/* ── Filter Chips ── */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-[#ff4f8b] text-white shadow-sm shadow-[#ff4f8b]/20"
                  : "bg-white border border-[#e8e8e8] text-[#666] hover:border-[#ff4f8b] hover:text-[#ff4f8b]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── Orders List ── */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
              const formattedTotal = `₹${order.total.toLocaleString("en-IN")}`;
              const statusConfig: Record<string, { color: string; bg: string }> = {
                Delivered: { color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
                Processing: { color: "text-[#e65100]", bg: "bg-[#fff3e0]" },
                Cancelled: { color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
                "Out for Delivery": { color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
              };
              const sc = statusConfig[order.status] || { color: "text-[#666]", bg: "bg-[#f2f2f2]" };

              return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-[#e8e8e8] overflow-hidden hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#fafafa] border-b border-[#e8e8e8]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#666]" />
                    <span className="font-bold text-sm text-[#1a1a1a]">{order.id}</span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <div className="px-5 py-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Order Date</p>
                      <p className="text-sm font-semibold text-[#1a1a1a]">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Delivery Date</p>
                      <p className="text-sm font-semibold text-[#1a1a1a]">{order.deliveryDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Items</p>
                      <p className="text-sm font-semibold text-[#1a1a1a]">{itemCount} items</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Total</p>
                      <p className="text-sm font-bold text-[#1a1a1a]">{formattedTotal}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#e8e8e8]">
                    {order.status === "Delivered" && (
                      <>
                        <button
                          onClick={() => setReturnOrder({ id: order.id, items: order.items.map((i) => ({ id: Number(i.id), name: i.name, image: i.image, price: i.price, quantity: i.quantity })) })}
                          className="flex-1 h-10 rounded-xl bg-[#ff4f8b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#e63872] transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Return
                        </button>
                        <button className="flex-1 h-10 rounded-xl bg-[#e8f5e9] text-[#0c831f] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#d0ebd4] transition-colors">
                          <Star className="w-3.5 h-3.5" />
                          Rate & Review
                        </button>
                      </>
                    )}
                    {(order.status === "Processing" || order.status === "Out for Delivery") && (
                      <Link
                        href={`/account/orders/${encodeURIComponent(order.id)}/tracking`}
                        className="flex-1 h-10 rounded-xl bg-[#fff3e0] text-[#e65100] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#ffe0b2] transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Track Order
                      </Link>
                    )}
                    {order.status === "Cancelled" && (
                      <button
                        onClick={() => setReorderData({ isOpen: true, orderId: order.id, orderDate: order.date, items: order.items.map((i) => ({ id: Number(i.id), name: i.name, image: i.image, price: i.price, quantity: i.quantity })) })}
                        className="flex-1 h-10 rounded-xl bg-[#fff0f6] text-[#ff4f8b] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#ffe0eb] transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Reorder
                      </button>
                    )}
                    <button className="h-10 px-4 rounded-xl border border-[#e8e8e8] text-xs font-semibold text-[#666] flex items-center gap-1.5 hover:bg-[#fafafa] transition-colors">
                      Details
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-[#f2f2f2] flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-[#ccc]" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">No {activeFilter.toLowerCase()} orders</h3>
            <p className="text-sm text-[#666] mb-6">Looks like you haven&apos;t received any {activeFilter.toLowerCase()} orders yet</p>
            <Link href="/" className="inline-flex h-11 px-6 rounded-xl bg-[#ff4f8b] text-white text-sm font-semibold items-center gap-2 hover:bg-[#e63872] transition-colors">
              <Truck className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        )}
      </div>
      {returnOrder && (
        <ReturnsWorkflow
          isOpen={true}
          onClose={() => setReturnOrder(null)}
          orderId={returnOrder.id}
          items={returnOrder.items}
          onSubmitReturn={(data) => {
            setReturnOrder(null);
          }}
        />
      )}

      <ReorderFromHistory
        isOpen={reorderData.isOpen}
        onClose={() => setReorderData((prev) => ({ ...prev, isOpen: false }))}
        orderId={reorderData.orderId}
        orderDate={reorderData.orderDate}
        items={reorderData.items}
      />
    </main>
  );
}
