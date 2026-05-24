"use client";

import { useState, useMemo, useEffect } from "react";
import { Tag, Sparkles, ChevronRight, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Coupon {
  code: string;
  discount: number;
  type: "percent" | "fixed";
  minAmount: number;
  label: string;
  description: string;
  category?: string;
}

const ALL_COUPONS: Coupon[] = [
  { code: "SAVE20", discount: 20, type: "percent", minAmount: 0, label: "20% OFF", description: "Save 20% on your order" },
  { code: "FIRST50", discount: 50, type: "fixed", minAmount: 299, label: "₹50 OFF", description: "₹50 off on first order above ₹299" },
  { code: "WELCOME10", discount: 10, type: "percent", minAmount: 0, label: "10% OFF", description: "10% off for new customers" },
  { code: "FMCG100", discount: 100, type: "fixed", minAmount: 499, label: "₹100 OFF", description: "₹100 off on orders above ₹499" },
  { code: "SUPER15", discount: 15, type: "percent", minAmount: 199, label: "15% OFF", description: "15% off on orders above ₹199" },
  { code: "GROCERY50", discount: 50, type: "fixed", minAmount: 399, label: "₹50 OFF", description: "₹50 off on groceries above ₹399", category: "Groceries" },
  { code: "FREEDEL", discount: 25, type: "fixed", minAmount: 0, label: "Free Delivery", description: "Free delivery on all orders" },
];

interface AutoCouponsProps {
  itemTotal: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export default function AutoCoupons({ itemTotal, appliedCoupon, onApplyCoupon, onRemoveCoupon }: AutoCouponsProps) {
  const [showAll, setShowAll] = useState(false);
  const [bestCouponApplied, setBestCouponApplied] = useState(false);

  const bestCoupons = useMemo(() => {
    return ALL_COUPONS
      .filter((c) => itemTotal >= c.minAmount)
      .map((c) => ({
        ...c,
        discountValue: c.type === "percent" ? Math.round(itemTotal * (c.discount / 100)) : c.discount,
      }))
      .sort((a, b) => b.discountValue - a.discountValue);
  }, [itemTotal]);

  const bestCoupon = bestCoupons[0] || null;
  const otherCoupons = bestCoupons.slice(1, 5);

  useEffect(() => {
    if (bestCoupon && !appliedCoupon && !bestCouponApplied && bestCoupon.discountValue > 0) {
      setBestCouponApplied(true);
    }
  }, [bestCoupon, appliedCoupon, bestCouponApplied]);

  if (bestCoupons.length === 0 && !appliedCoupon) return null;

  return (
    <div>
      {/* Best coupon auto-suggestion banner */}
      {bestCoupon && !appliedCoupon && (
        <button
          onClick={() => {
            onApplyCoupon(bestCoupon.code);
            toast.success(`${bestCoupon.code} applied! Save ₹${bestCoupon.discountValue}`);
          }}
          className="w-full flex items-center gap-3 rounded-xl border-2 border-[#ff4f8b] bg-gradient-to-r from-[#fff0f6] to-white p-4 text-left transition-all hover:shadow-md mb-3"
        >
          <div className="w-10 h-10 rounded-full bg-[#ff4f8b] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#ff4f8b]">Best coupon available</p>
            <p className="text-sm font-bold text-[#1a1a1a]">{bestCoupon.label} — Save ₹{bestCoupon.discountValue}</p>
            <p className="text-[10px] text-[#666]">{bestCoupon.description}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#ff4f8b] flex-shrink-0" />
        </button>
      )}

      {/* Applied coupon badge */}
      {appliedCoupon && (
        <div className="rounded-xl border border-[#0c831f] bg-[#e8f5e9] p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0c831f]" />
              <div>
                <span className="text-sm font-bold text-[#0c831f]">{appliedCoupon}</span>
                <p className="text-[10px] text-[#666]">
                  {ALL_COUPONS.find((c) => c.code === appliedCoupon)?.description || "Coupon applied"}
                </p>
              </div>
            </div>
            <button onClick={onRemoveCoupon} className="p-1 hover:bg-[#0c831f]/10 rounded-full transition-colors">
              <X className="w-4 h-4 text-[#666]" />
            </button>
          </div>
        </div>
      )}

      {/* Other available coupons */}
      {!appliedCoupon && otherCoupons.length > 0 && (
        <div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#ff4f8b] hover:underline mb-2"
          >
            <Tag className="w-3 h-3" />
            {showAll ? "Show fewer coupons" : `${otherCoupons.length} more coupons available`}
          </button>

          {showAll && (
            <div className="space-y-2 animate-fade-down">
              {otherCoupons.map((coupon) => (
                <button
                  key={coupon.code}
                  onClick={() => {
                    onApplyCoupon(coupon.code);
                    toast.success(`${coupon.code} applied! Save ₹${coupon.discountValue}`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-[#e8e8e8] hover:border-[#ff4f8b] hover:bg-[#fff0f6] transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-[#fff0f6] flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-[#ff4f8b]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1a1a1a]">{coupon.label}</p>
                    <p className="text-[10px] text-[#666]">{coupon.description}</p>
                  </div>
                  <span className="text-xs font-bold text-[#0c831f]">Save ₹{coupon.discountValue}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
