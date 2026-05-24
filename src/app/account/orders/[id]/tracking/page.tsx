"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Package, Truck, CheckCircle, Clock, MapPin, Home, ShoppingBag, AlertCircle, MessageCircle, Camera } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import LiveTrackingMap from "@/components/ui/orders/live-tracking-map";
import ChatWithRider from "@/components/ui/orders/chat-with-rider";
import DeliveryProof from "@/components/ui/orders/delivery-proof";

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag, CheckCircle, Package, Truck, Home,
};

export default function TrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const order = getOrderById(orderId);

  const [showChat, setShowChat] = useState(false);
  const [showDeliveryProof, setShowDeliveryProof] = useState(false);

  if (!order) {
    return (
      <main className="min-h-screen bg-[#f2f2f2] pb-24 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="w-20 h-20 rounded-full bg-[#fff0f6] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-[#ff4f8b]" />
          </div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Order not found</h2>
          <p className="text-sm text-[#666] mb-6">We couldn&apos;t find order {orderId}. It may have been placed in a different session.</p>
          <button
            onClick={() => router.push("/account/orders")}
            className="inline-flex h-11 px-6 rounded-xl bg-[#ff4f8b] text-white text-sm font-semibold items-center gap-2 hover:bg-[#e63872] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            View Your Orders
          </button>
        </div>
      </main>
    );
  }

  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const addressStr = `${order.deliveryAddress.address}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}`;

  return (
    <main className="min-h-screen bg-[#f2f2f2] pb-24">
      {/* ── Sticky Header ── */}
      <div className="bg-white border-b border-[#e8e8e8] px-4 py-3 sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto flex items-center gap-3">
          <Link href="/account/orders" className="p-2 hover:bg-[#f2f2f2] rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-[#1a1a1a]">Track Order</h1>
          </div>
          <span className="text-xs font-semibold text-[#666]">Order {order.id}</span>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-6 space-y-4">
        {/* ── Live Status Card ── */}
        <div className={`rounded-2xl p-5 text-white shadow-lg ${order.status === "Cancelled" || order.status === "Delivered" ? "bg-gradient-to-r from-[#1a1a1a] to-[#444]" : "bg-gradient-to-r from-[#0c831f] to-[#10b981]"}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/80 text-sm font-medium">Order {order.id}</span>
            <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold">{order.status}</span>
          </div>
          <h2 className="text-2xl font-bold mt-2">
            {order.status === "Delivered" ? "Delivered successfully!" :
             order.status === "Cancelled" ? "This order was cancelled" :
             "Your order is on the way!"}
          </h2>
          {order.status !== "Cancelled" && order.status !== "Delivered" && (
            <div className="flex items-center gap-2 mt-3">
              <Clock className="w-5 h-5 text-white/80" />
              <span className="text-lg font-semibold">Estimated delivery by {order.estimatedTime}</span>
            </div>
          )}
          {order.deliveryPartner && order.status !== "Cancelled" && order.status !== "Delivered" && (
            <div className="mt-4 flex items-center gap-2 bg-white/15 rounded-xl px-4 py-3">
              <Truck className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">{order.deliveryPartner}</p>
                <p className="text-xs text-white/70">Your delivery partner is on the way</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Delivery Address ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#ff4f8b]" />
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Delivery Address</p>
              <p className="text-xs text-[#666] mt-0.5">{addressStr}</p>
            </div>
          </div>
        </div>

        {/* ── Live Map ── */}
        <LiveTrackingMap
          riderName={order.deliveryPartner || "Delivery Partner"}
          estimatedTime={order.estimatedTime || "10 mins"}
          status={order.status === "Out for Delivery" ? "out_for_delivery" : order.status === "Processing" ? "preparing" : "nearby"}
          deliveryAddress={addressStr}
        />

        {/* ── Chat with Rider / Delivery Proof ── */}
        {(order.status === "Out for Delivery" || order.status === "Processing") && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowChat(true)}
              className="flex-1 h-12 rounded-xl bg-[#ff4f8b] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e63872] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with {order.deliveryPartner?.split(" ")[0] || "Rider"}
            </button>
            <button
              onClick={() => setShowDeliveryProof(true)}
              className="flex-1 h-12 rounded-xl border-2 border-[#e8e8e8] text-sm font-bold text-[#666] flex items-center justify-center gap-2 hover:border-[#ff4f8b] hover:text-[#ff4f8b] transition-colors"
            >
              <Camera className="w-4 h-4" />
              Delivery Proof
            </button>
          </div>
        )}

        {/* ── Order Summary ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="w-4 h-4 text-[#0c831f]" />
            <h3 className="text-sm font-bold text-[#1a1a1a]">Order Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Date</p>
              <p className="text-sm font-semibold text-[#1a1a1a]">{order.date}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Items</p>
              <p className="text-sm font-semibold text-[#1a1a1a]">{itemCount} items</p>
            </div>
            <div>
              <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Total</p>
              <p className="text-sm font-bold text-[#1a1a1a]">₹{order.total.toLocaleString("en-IN")}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#999] font-medium uppercase tracking-wide">Payment</p>
              <p className="text-sm font-semibold text-[#0c831f]">{order.paymentMethod.toUpperCase()}</p>
            </div>
          </div>

          {/* ── Order Items ── */}
          <div className="mt-3 pt-3 border-t border-[#e8e8e8] space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-[#f2f2f2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1a1a1a] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#999]">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-bold text-[#1a1a1a]">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tracking Timeline ── */}
        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#1a1a1a] mb-5">Tracking Timeline</h3>
          <div className="space-y-0">
            {order.trackingSteps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Package;
              return (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? "bg-[#0c831f]" : "bg-[#e8e8e8]"
                  }`}>
                    <IconComponent className={`w-4 h-4 ${step.completed ? "text-white" : "text-[#999]"}`} />
                  </div>
                  {index < order.trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-12 ${step.completed ? "bg-[#0c831f]" : "bg-[#e8e8e8]"}`} />
                  )}
                </div>
                <div className={`pb-8 ${index === order.trackingSteps.length - 1 ? "pb-0" : ""}`}>
                  <p className={`text-sm font-bold ${step.completed ? "text-[#1a1a1a]" : "text-[#999]"}`}>
                    {step.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${step.completed ? "text-[#0c831f]" : "text-[#999]"}`}>
                    {step.time}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* ── Need Help? ── */}
        <Link
          href="/account/help"
          className="block bg-white rounded-2xl border border-[#e8e8e8] p-4 shadow-sm text-center hover:bg-[#fafafa] transition-colors"
        >
          <p className="text-sm font-bold text-[#ff4f8b]">Need help with this order?</p>
          <p className="text-xs text-[#666] mt-1">Contact support or view FAQs</p>
        </Link>
      </div>

      <ChatWithRider
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        riderName={order.deliveryPartner || "Delivery Partner"}
        orderId={order.id}
      />

      <DeliveryProof
        isOpen={showDeliveryProof}
        onClose={() => setShowDeliveryProof(false)}
        orderId={order.id}
        deliveryDate={order.deliveryDate}
        deliveryTime={order.estimatedTime || "10 mins"}
        deliveryPerson={order.deliveryPartner || "Delivery Partner"}
        deliveryAddress={addressStr}
      />
    </main>
  );
}
