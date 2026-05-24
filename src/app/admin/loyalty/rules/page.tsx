"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  Settings,
  ArrowLeft,
  Save,
  RefreshCw,
  Gift,
  Clock,
  ShoppingBag,
  Percent,
  UserPlus,
  Calendar,
  Info,
} from "lucide-react";

export default function RulesPage() {
  const [rules, setRules] = useState({
    // Earning Rules
    pointsPerHundred: 1,
    minOrderAmount: 100,
    maxPointsPerOrder: 500,
    
    // Redemption Rules
    minRedemptionPoints: 100,
    redemptionValue: 0.25, // ₹ value per point
    maxRedemptionPercent: 50, // Max % of order value that can be redeemed
    
    // Expiration Rules
    pointsExpiryMonths: 12,
    expiryNotificationDays: 30,
    
    // Bonus Rules
    referralBonus: 100,
    birthdayBonus: 200,
    firstOrderBonus: 150,
    
    // Restrictions
    excludeCategories: ["Gift Cards", "Vouchers"],
    excludePaymentMethods: ["COD"],
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleRuleChange = (key: string, value: any) => {
    setRules({ ...rules, [key]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving
    setHasChanges(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <Link
              href="/admin/loyalty"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa]"
            >
              <ArrowLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Link>
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-wide text-[#d97706]">
                Loyalty Management
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Loyalty Rules & Configuration
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Configure earning rates, redemption values, expiration policies, 
                and bonus rules for the loyalty program.
              </p>
            </div>
            {hasChanges && (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Earning Rules */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5e9]">
                <Gift className="h-5 w-5 text-[#0c831f]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Earning Rules
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Points Earning</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Points per ₹100 Spent
                </label>
                <input
                  type="number"
                  value={rules.pointsPerHundred}
                  onChange={(e) => handleRuleChange("pointsPerHundred", parseFloat(e.target.value))}
                  min="0.1"
                  step="0.1"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#0c831f] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Base earning rate (can be multiplied by tier)
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Minimum Order Amount (₹)
                </label>
                <input
                  type="number"
                  value={rules.minOrderAmount}
                  onChange={(e) => handleRuleChange("minOrderAmount", parseFloat(e.target.value))}
                  min="0"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#0c831f] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Orders below this amount won't earn points
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Max Points per Order
                </label>
                <input
                  type="number"
                  value={rules.maxPointsPerOrder}
                  onChange={(e) => handleRuleChange("maxPointsPerOrder", parseFloat(e.target.value))}
                  min="0"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#0c831f] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Cap on points earned per transaction (0 = unlimited)
                </p>
              </div>
            </div>
          </section>

          {/* Redemption Rules */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff]">
                <ShoppingBag className="h-5 w-5 text-[#2563eb]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#2563eb]">
                  Redemption Rules
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Points Redemption</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Minimum Redemption Points
                </label>
                <input
                  type="number"
                  value={rules.minRedemptionPoints}
                  onChange={(e) => handleRuleChange("minRedemptionPoints", parseFloat(e.target.value))}
                  min="0"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#2563eb] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Minimum points required to redeem
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Point Value (₹ per point)
                </label>
                <input
                  type="number"
                  value={rules.redemptionValue}
                  onChange={(e) => handleRuleChange("redemptionValue", parseFloat(e.target.value))}
                  min="0.01"
                  step="0.01"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#2563eb] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Monetary value of each point when redeemed
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Max Redemption (% of order)
                </label>
                <input
                  type="number"
                  value={rules.maxRedemptionPercent}
                  onChange={(e) => handleRuleChange("maxRedemptionPercent", parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#2563eb] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Maximum order value that can be paid with points
                </p>
              </div>
            </div>
          </section>

          {/* Expiration Rules */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fef3c7]">
                <Clock className="h-5 w-5 text-[#d97706]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#d97706]">
                  Expiration Rules
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Points Expiry</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Points Expire After (Months)
                </label>
                <input
                  type="number"
                  value={rules.pointsExpiryMonths}
                  onChange={(e) => handleRuleChange("pointsExpiryMonths", parseFloat(e.target.value))}
                  min="1"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#d97706] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Points expire if not used within this period
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Expiry Notification (Days Before)
                </label>
                <input
                  type="number"
                  value={rules.expiryNotificationDays}
                  onChange={(e) => handleRuleChange("expiryNotificationDays", parseFloat(e.target.value))}
                  min="1"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#d97706] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Notify customers this many days before expiry
                </p>
              </div>
            </div>
          </section>

          {/* Bonus Rules */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f6]">
                <Percent className="h-5 w-5 text-[#ff4f8b]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">
                  Bonus Rules
                </p>
                <h2 className="text-lg font-black text-[#1a1a1a]">Special Bonuses</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Referral Bonus (Points)
                </label>
                <input
                  type="number"
                  value={rules.referralBonus}
                  onChange={(e) => handleRuleChange("referralBonus", parseFloat(e.target.value))}
                  min="0"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#ff4f8b] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Points awarded for each successful referral
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  Birthday Bonus (Points)
                </label>
                <input
                  type="number"
                  value={rules.birthdayBonus}
                  onChange={(e) => handleRuleChange("birthdayBonus", parseFloat(e.target.value))}
                  min="0"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#ff4f8b] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Points awarded on customer's birthday
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                  First Order Bonus (Points)
                </label>
                <input
                  type="number"
                  value={rules.firstOrderBonus}
                  onChange={(e) => handleRuleChange("firstOrderBonus", parseFloat(e.target.value))}
                  min="0"
                  className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#ff4f8b] focus:outline-none"
                />
                <p className="mt-1 text-xs text-[#666]">
                  Bonus points for first order after signup
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Exclusions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0f0f0]">
              <Info className="h-5 w-5 text-[#666]" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#666]">
                Restrictions
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Exclusions</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                Exclude Categories (comma-separated)
              </label>
              <input
                type="text"
                value={rules.excludeCategories.join(", ")}
                onChange={(e) => handleRuleChange("excludeCategories", e.target.value.split(",").map(s => s.trim()))}
                className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#0c831f] focus:outline-none"
                placeholder="e.g., Gift Cards, Vouchers"
              />
              <p className="mt-1 text-xs text-[#666]">
                Categories where points won't be earned
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                Exclude Payment Methods (comma-separated)
              </label>
              <input
                type="text"
                value={rules.excludePaymentMethods.join(", ")}
                onChange={(e) => handleRuleChange("excludePaymentMethods", e.target.value.split(",").map(s => s.trim()))}
                className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm focus:border-[#0c831f] focus:outline-none"
                placeholder="e.g., COD, Wallet"
              />
              <p className="mt-1 text-xs text-[#666]">
                Payment methods where points won't be earned
              </p>
            </div>
          </div>
        </section>

        {/* Info Card */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-[#fffbeb] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#d97706]/10">
              <Settings className="h-5 w-5 text-[#d97706]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">
                Rule Changes Take Effect Immediately
              </p>
              <p className="mt-1 text-sm text-[#666]">
                Changes to earning and redemption rules will apply to all new transactions 
                immediately. Existing point balances and pending redemptions are not affected.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
