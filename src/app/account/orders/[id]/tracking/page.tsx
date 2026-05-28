"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Truck,
  CheckCircle,
  ShoppingBag,
  Package,
  Home,
  MapPin,
  Phone,
  Clock,
  Star,
} from "lucide-react";
import { useOrderStore } from "@/store/order-store";

const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingBag,
  CheckCircle,
  Package,
  Truck,
  Home,
};

const STATUS_GRADIENT: Record<string, string> = {
  "Out for Delivery": "from-[#1565c0] to-[#1976d2]",
  Processing:         "from-[#e65100] to-[#f57c00]",
  Delivered:          "from-[#0c831f] to-[#2e7d32]",
  Cancelled:          "from-[#c62828] to-[#d32f2f]",
};

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const decodedId = decodeURIComponent(id);
  const order = useOrderStore((s) => s.orders.find((o) => o.id === decodedId));

  if (!order) return notFound();

  const safeItems = Array.isArray(order.items) ? order.items : [];

  const gradient = STATUS_GRADIENT[order.status] ?? "from-[#ff4f8b] to-[#ff6b9d]";
  const completedCount = order.trackingSteps?.filter((s) => s.completed).length ?? 0;
  const totalSteps = order.trackingSteps?.length ?? 6;
  const progressPct = Math.round((completedCount / totalSteps) * 100);

  return (
    <main className="min-h-screen bg-[#f2f2f2] pb-28">

      {/* ── Hero Header ── */}
      <div className={`bg-gradient-to-br ${gradient} text-white pt-12 pb-16 px-4 relative overflow-hidden`}>
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5" />

        <div className="max-w-[900px] mx-auto relative">
          <Link
            href={`/account/orders/${encodeURIComponent(order.id)}`}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Order Details
          </Link>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Live Tracking</p>
              <h1 className="text-2xl font-black">{order.id}</h1>
              <p className="text-white/80 text-sm mt-1">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">ETA</p>
              <p className="text-2xl font-black">{order.estimatedTime}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-white/70 mb-1.5">
              <span>Order Progress</span>
              <span>{progressPct}% complete</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto px-4 -mt-8 space-y-4">

        {/* ── Tracking Steps Card ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-md overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f0f0]">
            <h2 className="text-sm font-black text-[#1a1a1a]">Order Status</h2>
          </div>
          <div className="px-5 py-5">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-[#e8e8e8]" />
              {/* Filled progress line */}
              {completedCount > 1 && (
                <div
                  className="absolute left-[17px] top-4 w-0.5 bg-[#0c831f] transition-all duration-700"
                  style={{
                    height: `calc(${((completedCount - 1) / (totalSteps - 1)) * 100}% - 0px)`,
                  }}
                />
              )}

              <div className="space-y-6">
                {order.trackingSteps?.map((step, index) => {
                  const StepIcon = ICON_MAP[step.icon] ?? CheckCircle;
                  const isCurrent =
                    !step.completed &&
                    index > 0 &&
                    order.trackingSteps[index - 1]?.completed;

                  return (
                    <div key={step.id} className="flex items-start gap-4 relative">
                      {/* Step dot */}
                      <div
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                          ${step.completed
                            ? "bg-[#0c831f] shadow-md shadow-[#0c831f]/30"
                            : isCurrent
                            ? "bg-white border-2 border-[#e65100] shadow-md shadow-[#e65100]/20"
                            : "bg-[#f2f2f2] border-2 border-[#e0e0e0]"
                          }`}
                      >
                        <StepIcon
                          className={`w-4 h-4 ${
                            step.completed
                              ? "text-white"
                              : isCurrent
                              ? "text-[#e65100]"
                              : "text-[#ccc]"
                          }`}
                        />
                        {isCurrent && (
                          <span className="absolute inset-0 rounded-full animate-ping bg-[#e65100]/20" />
                        )}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 min-w-0 pt-1.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3
                            className={`text-sm font-bold ${
                              step.completed
                                ? "text-[#1a1a1a]"
                                : isCurrent
                                ? "text-[#e65100]"
                                : "text-[#bbb]"
                            }`}
                          >
                            {step.label}
                          </h3>
                          <span
                            className={`text-[10px] font-medium flex-shrink-0 ${
                              step.completed ? "text-[#0c831f]" : "text-[#bbb]"
                            }`}
                          >
                            {step.time}
                          </span>
                        </div>
                        {step.completed && (
                          <p className="text-xs text-[#0c831f] mt-0.5 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Done
                          </p>
                        )}
                        {isCurrent && (
                          <p className="text-xs text-[#e65100] mt-0.5 font-medium animate-pulse">
                            In progress…
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Delivery Partner Card ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f0f0]">
            <h2 className="text-sm font-black text-[#1a1a1a]">Delivery Partner</h2>
          </div>
          <div className="px-5 py-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4f8b] to-[#ff6b9d] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#ff4f8b]/20">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1a1a1a]">{order.deliveryPartner}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-[#ddd]"}`} />
                ))}
                <span className="text-[10px] text-[#999] ml-1">4.8 · 500+ deliveries</span>
              </div>
            </div>
            <a
              href="tel:+919999999999"
              className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center hover:bg-[#d0ebd4] transition-colors"
              aria-label="Call delivery partner"
            >
              <Phone className="w-4 h-4 text-[#0c831f]" />
            </a>
          </div>
        </div>

        {/* ── Delivery Address ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f0f0f0]">
            <h2 className="text-sm font-black text-[#1a1a1a]">Delivering To</h2>
          </div>
          <div className="px-5 py-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#fff0f6] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#ff4f8b]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">{order.deliveryAddress.name}</p>
              <p className="text-xs text-[#666] mt-0.5 leading-relaxed">
                {order.deliveryAddress.address}, {order.deliveryAddress.city} — {order.deliveryAddress.pincode}
              </p>
              <p className="text-xs text-[#999] mt-1">{order.deliveryAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f0f0f0]">
            <ShoppingBag className="w-4 h-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">
              Order Summary
              <span className="text-[#999] font-normal ml-1">
                ({safeItems.reduce((s, i) => s + (i.quantity || 0), 0)} items)
              </span>
            </h2>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {safeItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#f9f9f9] border border-[#efefef] overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1a1a1a] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#999]">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-[#1a1a1a]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-[#fafafa] border-t border-[#e8e8e8] flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs text-[#666]">
              <Clock className="w-3.5 h-3.5" />
              {order.deliverySlot}
            </div>
            <span className="text-sm font-black text-[#1a1a1a]">
              ₹{order.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* ── Back CTA ── */}
        <Link
          href="/account/orders"
          className="flex items-center justify-center gap-2 h-12 w-full rounded-xl border-2 border-[#e8e8e8] bg-white text-sm font-bold text-[#666] hover:border-[#ff4f8b] hover:text-[#ff4f8b] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to All Orders
        </Link>

      </div>
    </main>
  );
}
