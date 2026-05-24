"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  ReceiptText,
  Tag,
  CheckCircle,
  Truck,
  Store,
  Calendar,
  Repeat,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/ui/navbar";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore, generateOrderId, buildTrackingSteps } from "@/store/order-store";
import { toast } from "sonner";
import BillRow from "@/components/ui/a11y/bill-row";
import PullToRefresh from "@/components/ui/mobile/pull-to-refresh";
import AutoCoupons from "@/components/ui/checkout/auto-coupons";
import EmiBnpl from "@/components/ui/checkout/emi-bnpl";
import ScheduledDelivery from "@/components/ui/checkout/scheduled-delivery";
import StorePickup from "@/components/ui/checkout/store-pickup";
import SubstitutionSuggestions from "@/components/ui/checkout/substitution-suggestions";
import { useCallback } from "react";

type DeliveryMode = "express" | "scheduled" | "pickup" | "subscription";

const VALID_COUPONS: Record<string, { discount: number; type: "percent" | "fixed"; minAmount: number }> = {
  SAVE20: { discount: 20, type: "percent", minAmount: 0 },
  FIRST50: { discount: 50, type: "fixed", minAmount: 299 },
  WELCOME10: { discount: 10, type: "percent", minAmount: 0 },
  FMCG100: { discount: 100, type: "fixed", minAmount: 499 },
  SUPER15: { discount: 15, type: "percent", minAmount: 199 },
};



export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("10 minutes");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryPincode, setDeliveryPincode] = useState("");

  // New checkout features
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("express");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState("weekly");
  const [pickupStore, setPickupStore] = useState("andheri");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("10:00");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<"full" | "emi" | "bnpl">("full");
  const [selectedEmi, setSelectedEmi] = useState<number>(3);
  const [selectedBnpl, setSelectedBnpl] = useState<string>("lazypay");

  const itemTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const deliveryFee = useMemo(
    () => {
      if (deliveryMode === "pickup") return 0;
      if (deliveryMode === "subscription") return 0;
      return (itemTotal > 499 || itemTotal === 0 ? 0 : 25);
    },
    [itemTotal, deliveryMode]
  );
  const handlingFee = useMemo(() => (itemTotal > 0 ? 5 : 0), [itemTotal]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const coupon = VALID_COUPONS[appliedCoupon];
    if (!coupon || itemTotal < coupon.minAmount) return 0;
    return coupon.type === "percent"
      ? Math.round(itemTotal * (coupon.discount / 100))
      : Math.min(coupon.discount, itemTotal);
  }, [appliedCoupon, itemTotal]);

  const subscriptionDiscount = useMemo(() => {
    if (deliveryMode !== "subscription") return 0;
    return Math.round(itemTotal * 0.1); // 10% off for subscription
  }, [deliveryMode, itemTotal]);

  const totalDiscount = couponDiscount + subscriptionDiscount;
  const total = useMemo(
    () => Math.max(0, itemTotal + deliveryFee + handlingFee - totalDiscount),
    [itemTotal, deliveryFee, handlingFee, totalDiscount]
  );

  // Auto-apply coupon on eligible items
  const handleRefresh = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Checkout refreshed! ✓", { duration: 1500 });
  }, []);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <main className="min-h-screen bg-[#f2f2f2] pb-20 md:pb-0">
      <Navbar />

      <div className="pt-16">
        <div className="border-b border-[#e8e8e8] bg-white px-3 py-2.5 sm:px-4 md:px-6">
          <div className="mx-auto flex max-w-[1400px] items-center gap-1.5 text-xs text-[#999]">
            <Link href="/cart" className="hover-text-pink">
              Cart
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-[#1a1a1a]">Checkout</span>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-3 py-4 sm:px-4 sm:py-6 md:px-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-2">
              {/* Delivery Mode Selector */}
              <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
                <SectionHeader icon={Truck} title="Delivery Mode" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4">
                  {[
                    { id: "express" as const, icon: Clock, label: "Express Delivery", sub: "10-30 mins" },
                    { id: "scheduled" as const, icon: Calendar, label: "Scheduled", sub: "Pick date & time" },
                    { id: "pickup" as const, icon: Store, label: "Store Pickup", sub: "Free pickup" },
                    { id: "subscription" as const, icon: Repeat, label: "Subscribe", sub: "Save 10%" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setDeliveryMode(mode.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-bold transition-all ${
                        deliveryMode === mode.id
                          ? "border-[#ff4f8b] bg-[#fff0f6] text-[#ff4f8b]"
                          : "border-[#e8e8e8] text-[#666] hover:border-[#ff4f8b] hover:bg-[#fff0f6]"
                      }`}
                    >
                      <mode.icon className={`w-5 h-5 ${deliveryMode === mode.id ? "text-[#ff4f8b]" : "text-[#999]"}`} />
                      <span>{mode.label}</span>
                      <span className="text-[9px] text-[#999]">{mode.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Subscription details */}
                {deliveryMode === "subscription" && (
                  <div className="px-4 pb-4 animate-slide-down">
                    <div className="rounded-xl border border-[#0c831f] bg-[#e8f5e9] p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0c831f]" />
                        <span className="text-sm font-bold text-[#0c831f]">Subscription Benefits</span>
                      </div>
                      <p className="text-xs text-[#666]">Save 10% on every order • Free delivery • Flexible skip/cancel</p>
                      <select
                        value={subscriptionFrequency}
                        onChange={(e) => setSubscriptionFrequency(e.target.value)}
                        className="w-full h-10 rounded-lg border border-[#0c831f]/30 px-3 text-sm outline-none focus:border-[#0c831f] bg-white"
                      >
                        <option value="weekly">Every Week — 10% off</option>
                        <option value="biweekly">Every 2 Weeks — 12% off</option>
                        <option value="monthly">Every Month — 15% off</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Scheduled delivery */}
                {deliveryMode === "scheduled" && (
                  <div className="px-4 pb-4 animate-slide-down">
                    <ScheduledDelivery
                      scheduledDate={scheduledDate}
                      scheduledTime={scheduledTime}
                      onDateChange={setScheduledDate}
                      onTimeChange={setScheduledTime}
                    />
                  </div>
                )}

                {/* Store Pickup */}
                {deliveryMode === "pickup" && (
                  <div className="px-4 pb-4 animate-slide-down">
                    <StorePickup
                      selectedStore={pickupStore}
                      onStoreChange={setPickupStore}
                    />
                  </div>
                )}
              </section>

              {/* Delivery Address */}
              <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
                <SectionHeader icon={MapPin} title="Delivery Address" />
                <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
                  <input
                    aria-label="Full Name"
                    aria-required="true"
                    placeholder="Full Name"
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                    className="h-11 rounded-lg border border-[#e8e8e8] bg-[#f9f9f9] px-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#999] focus-border-pink"
                  />
                  <input
                    aria-label="Phone Number"
                    aria-required="true"
                    type="tel"
                    placeholder="Phone Number"
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    className="h-11 rounded-lg border border-[#e8e8e8] bg-[#f9f9f9] px-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#999] focus-border-pink"
                  />
                  <input
                    aria-label="Full Address"
                    aria-required="true"
                    placeholder="Full Address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="h-11 rounded-lg border border-[#e8e8e8] bg-[#f9f9f9] px-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#999] focus-border-pink sm:col-span-2"
                  />
                  <input
                    aria-label="City"
                    aria-required="true"
                    placeholder="City"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="h-11 rounded-lg border border-[#e8e8e8] bg-[#f9f9f9] px-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#999] focus-border-pink"
                  />
                  <input
                    aria-label="Pincode"
                    aria-required="true"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    placeholder="Pincode"
                    value={deliveryPincode}
                    onChange={(e) => setDeliveryPincode(e.target.value)}
                    className="h-11 rounded-lg border border-[#e8e8e8] bg-[#f9f9f9] px-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#999] focus-border-pink"
                  />
                </div>
              </section>

              {/* Delivery Slot (Express only) */}
              {deliveryMode === "express" && (
                <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
                  <SectionHeader icon={Clock} title="Delivery Slot" />
                  <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
                    {["10 minutes", "9 AM - 11 AM", "11 AM - 1 PM", "6 PM - 8 PM"].map(
                      (slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`h-11 rounded-lg border-2 text-xs font-bold transition-all sm:text-sm ${
                            selectedSlot === slot
                              ? "border-[#ff4f8b] bg-[#fff0f6] text-[#ff4f8b]"
                              : "border-[#e8e8e8] text-[#666] hover-border-pink hover-bg-pink-light hover-text-pink"
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    )}
                  </div>
                </section>
              )}

              {/* Substitution Suggestions */}
              <SubstitutionSuggestions
                cartItems={cart}
                onApply={(originalId, suggestedId) => {
                  toast.success(`Substituted item ₹${originalId} with ₹${suggestedId}`, { duration: 2000 });
                }}
              />

              {/* Payment Method */}
              <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
                <SectionHeader icon={CreditCard} title="Payment Method" />
                <div className="p-4 space-y-3">
                  {/* Standard Payment */}
                  <div className="space-y-2">
                    {[
                      { id: "upi", label: "UPI", sub: "Pay via any UPI app" },
                      { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                      { id: "cod", label: "Cash on Delivery", sub: "Pay when delivered" },
                      { id: "wallet", label: "Wallet", sub: "Paytm, PhonePe, Amazon Pay" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => { setSelectedPayment(method.id); setPaymentMode("full"); }}
                        className={`group flex h-14 w-full items-center gap-3 rounded-lg border px-4 text-left transition-all ${
                          selectedPayment === method.id && paymentMode === "full"
                            ? "border-[#0c831f] bg-[#e8f5e9]"
                            : "border-[#e8e8e8] hover-border-pink hover-bg-pink-light"
                        }`}
                      >
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black ${
                          selectedPayment === method.id && paymentMode === "full"
                            ? "bg-[#0c831f] text-white"
                            : "bg-[#fff0f6] text-[#ff4f8b]"
                        }`}>
                          {selectedPayment === method.id && paymentMode === "full" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            "Pay"
                          )}
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm font-bold ${selectedPayment === method.id && paymentMode === "full" ? "text-[#0c831f]" : "text-[#1a1a1a] group-hover-text-pink"}`}>
                            {method.label}
                          </p>
                          <p className="text-[10px] text-[#999]">{method.sub}</p>
                        </div>
                        {selectedPayment === method.id && paymentMode === "full" ? (
                          <CheckCircle className="h-4 w-4 text-[#0c831f]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#ccc] group-hover-text-pink" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* EMI / BNPL */}
                  <EmiBnpl
                    total={total}
                    paymentMode={paymentMode}
                    selectedEmi={selectedEmi}
                    selectedBnpl={selectedBnpl}
                    onModeChange={(mode) => { setPaymentMode(mode); if (mode !== "full") setSelectedPayment(mode); }}
                    onEmiChange={setSelectedEmi}
                    onBnplChange={setSelectedBnpl}
                  />
                </div>
              </section>
            </div>

            {/* Order Summary Sidebar */}
            <aside>
              <div className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-sm lg:sticky lg:top-20">
                <div className="flex items-center gap-2 border-b border-[#e8e8e8] px-4 py-3">
                  <ReceiptText className="h-4 w-4 text-[#0c831f]" />
                  <h2 className="text-sm font-black text-[#1a1a1a]">
                    Order Summary
                  </h2>
                </div>

                <div className="bg-[#fff0f6] px-4 py-2">
                  <p className="text-xs font-black text-[#ff4f8b]">
                    {deliveryMode === "pickup" ? "Ready in 30 minutes" :
                     deliveryMode === "subscription" ? `Saving 10% • ${subscriptionFrequency}` :
                     deliveryMode === "scheduled" ? `Delivery on ${scheduledDate || "selected date"}` :
                     "Delivery in 10 minutes"}
                  </p>
                </div>

                <div className="max-h-64 space-y-3 overflow-y-auto px-4 py-3">
                  {cart.length === 0 ? (
                    <div className="py-6 text-center">
                      <p className="text-sm font-bold text-[#1a1a1a]">
                        No items in cart
                      </p>
                      <Link
                        href="/"
                        className="mt-2 inline-flex text-xs font-black text-[#ff4f8b] hover-text-pink"
                      >
                        Continue shopping
                      </Link>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-[#f2f2f2]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                            loading="lazy"
                            quality={65}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-[#1a1a1a]">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-[#999]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="flex-shrink-0 text-xs font-black text-[#1a1a1a]">
                          &#8377;{item.price * item.quantity}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Coupon Section */}
                <div className="border-t border-[#e8e8e8] px-4 py-3">
                  <AutoCoupons
                    itemTotal={itemTotal}
                    appliedCoupon={appliedCoupon}
                    onApplyCoupon={(code) => { setAppliedCoupon(code); }}
                    onRemoveCoupon={() => { setAppliedCoupon(null); }}
                  />
                </div>

                {/* Bill Summary */}
                <div className="space-y-2 border-t border-[#e8e8e8] px-4 py-3">
                  <BillRow label="Item total" value={<>&#8377;{itemTotal}</>} />
                  <BillRow
                    label="Delivery fee"
                    value={deliveryFee === 0 ? "FREE" : <>&#8377;{deliveryFee}</>}
                    valueClassName={deliveryFee === 0 ? "text-[#ff4f8b]" : undefined}
                  />
                  <BillRow
                    label="Handling fee"
                    value={<>&#8377;{handlingFee}</>}
                  />
                  {subscriptionDiscount > 0 && (
                    <BillRow
                      label="Subscription (10%)"
                      value={<>&minus;&#8377;{subscriptionDiscount}</>}
                      valueClassName="text-[#0c831f]"
                    />
                  )}
                  {couponDiscount > 0 && (
                    <BillRow
                      label="Coupon discount"
                      value={<>&minus;&#8377;{couponDiscount}</>}
                      valueClassName="text-[#0c831f]"
                    />
                  )}
                  <div className="flex justify-between border-t border-[#e8e8e8] pt-2 text-sm font-black text-[#1a1a1a]">
                    <span>To pay</span>
                    <span>&#8377;{total}</span>
                  </div>
                </div>

                {/* Place Order */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => {
                      if (!selectedPayment) {
                        toast.error("Please select a payment method");
                        return;
                      }
                      setIsPlacingOrder(true);

                      const orderId = generateOrderId();
                      const estimatedTime = deliveryMode === "express"
                        ? selectedSlot === "10 minutes" ? "10 mins" : "2 hrs"
                        : deliveryMode === "pickup" ? "30 mins" : "1 day";
                      const now = new Date();
                      const deliveryDate = now.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

                      let status: "Delivered" | "Processing" | "Cancelled" | "Out for Delivery" = "Processing";
                      if (deliveryMode === "express") {
                        status = selectedSlot === "10 minutes" ? "Out for Delivery" : "Processing";
                      } else if (deliveryMode === "pickup") {
                        status = "Processing";
                      } else {
                        status = "Processing";
                      }

                      addOrder({
                        id: orderId,
                        date: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                        items: cart.map((item) => ({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          quantity: item.quantity,
                        })),
                        total,
                        status,
                        paymentMethod: `${selectedPayment!}${paymentMode === "emi" ? ` (EMI ${selectedEmi}m)` : ""}${paymentMode === "bnpl" ? ` (${selectedBnpl})` : ""}`,
                        deliveryAddress: {
                          name: deliveryName || "You",
                          phone: deliveryPhone || "+91XXXXXXXXXX",
                          address: deliveryAddress || "123 Main Street",
                          city: deliveryCity || "Mumbai",
                          pincode: deliveryPincode || "400058",
                        },
                        deliverySlot: deliveryMode === "express" ? selectedSlot :
                          deliveryMode === "scheduled" ? `${scheduledDate || "Today"} ${scheduledTime}` :
                          deliveryMode === "pickup" ? `Pickup at ${{ andheri: "Andheri West Store", bandra: "Bandra Kurla Store", powai: "Powai Hiranandani Store", worli: "Worli Seaface Store" }[pickupStore] || pickupStore}` :
                          `${subscriptionFrequency} subscription`,
                        deliveryDate,
                        estimatedTime,
                        deliveryPartner: deliveryMode === "express"
                          ? "Rahul (FMCG Partner)"
                          : deliveryMode === "pickup" ? "Store Pickup" : "FMCG Logistics",
                        trackingSteps: buildTrackingSteps(status, estimatedTime),
                      });

                      setTimeout(() => {
                        clearCart();
                        setIsPlacingOrder(false);
                        toast.success("Order placed successfully! 🎉", {
                          description: `Order ${orderId} • ₹${total} • ${selectedPayment!.toUpperCase()} • ${deliveryMode}`,
                          duration: 4000,
                          position: "top-center",
                          className: "bg-gradient-to-r from-[#0c831f] to-[#10b981] text-white border-none",
                        });
                        router.push(`/account/orders`);
                      }, 1500);
                    }}
                    className="flex h-12 w-full items-center justify-between rounded-xl bg-[#ff4f8b] px-4 text-sm font-black text-white transition hover:bg-[#e63872] disabled:cursor-not-allowed disabled:bg-[#cccccc]"
                    disabled={cart.length === 0 || isPlacingOrder}
                  >
                    <span>{isPlacingOrder ? "Placing Order..." : "Place Order"}</span>
                    <span>
                      {cart.length > 0 ? (
                        isPlacingOrder ? (
                          <span className="flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          </span>
                        ) : (
                          <>&#8377;{total}</>
                        )
                      ) : (
                        "Add items"
                      )}
                    </span>
                  </button>
                  {!selectedPayment && cart.length > 0 && (
                    <p className="text-[10px] text-[#ff4f8b] mt-1.5 text-center font-medium">
                      Select a payment method to continue
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
    </PullToRefresh>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-[#e8e8e8] px-4 py-3">
      <Icon className="h-4 w-4 text-[#ff4f8b]" />
      <h2 className="text-sm font-black text-[#1a1a1a]">{title}</h2>
    </div>
  );
}
