"use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  Save,
  X,
  Zap,
  Gift,
  Copy,
  Percent,
  Calendar,
  Tag,
  MapPin,
  DollarSign,
  List,
  AlertCircle,
  Check,
  Clock,
  Loader,
} from "lucide-react";

const promotionTypes = [
  {
    key: "flash-sale",
    label: "Flash Sale",
    icon: <Zap className="h-5 w-5" />,
    desc: "Time-limited discount on multiple products",
    color: "bg-[#fff0f6] text-[#ff4f8b]",
    borderColor: "border-[#ff4f8b]/30",
  },
  {
    key: "bogo",
    label: "BOGO",
    icon: <Gift className="h-5 w-5" />,
    desc: "Buy 1 Get 1 Free or similar variants",
    color: "bg-[#e8f5e9] text-[#0c831f]",
    borderColor: "border-[#0c831f]/30",
  },
  {
    key: "combo",
    label: "Combo Offer",
    icon: <Copy className="h-5 w-5" />,
    desc: "Bundle products at a discounted price",
    color: "bg-[#eff6ff] text-[#2563eb]",
    borderColor: "border-[#2563eb]/30",
  },
  {
    key: "coupon",
    label: "Coupon",
    icon: <Percent className="h-5 w-5" />,
    desc: "Discount code for targeted users",
    color: "bg-[#fffbeb] text-[#d97706]",
    borderColor: "border-[#d97706]/30",
  },
];

function LoaderIcon() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  );
}

function CreatePromotionForm() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("type") as string) || "flash-sale";
  const [activeType, setActiveType] = useState(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [scheduledMode, setScheduledMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    usageLimit: "",
    budget: "",
    couponCode: "",
    couponType: "public",
    bogoBuyQty: "1",
    bogoFreeQty: "1",
    bogoFreeIsSame: true,
    categories: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);
    window.location.href = "/admin/promotions";
  };

  const activeTypeInfo = promotionTypes.find((t) => t.key === activeType) || promotionTypes[0];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">New Campaign</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Create Promotion
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Select a campaign type and fill in the details below.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] ${
                  isSaving ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isSaving ? (
                  <>
                    <LoaderIcon />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {scheduledMode ? "Schedule Campaign" : "Launch Now"}
                  </>
                )}
              </button>
              <Link href="/admin/promotions">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Promotion Type Selector */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Step 1</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Choose Campaign Type</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {promotionTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setActiveType(type.key)}
                className={`flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all ${
                  activeType === type.key
                    ? `${type.borderColor} bg-[#fafffe]`
                    : "border-[#e8e8e8] hover:border-[#999]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    activeType === type.key ? type.color : "bg-[#f6f7f6] text-[#666]"
                  }`}
                >
                  {type.icon}
                </div>
                <div>
                  <p
                    className={`text-sm font-black ${
                      activeType === type.key ? "text-[#1a1a1a]" : "text-[#666]"
                    }`}
                  >
                    {type.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[#999] leading-relaxed">{type.desc}</p>
                </div>
                {activeType === type.key && (
                  <div className="mt-1 flex items-center gap-1 text-xs font-black text-[#0c831f]">
                    <Check className="h-3.5 w-3.5" />
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Campaign Details Form */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Step 2</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Campaign Details — {activeTypeInfo.label}</h2>
          </div>
          <form onSubmit={handleSave} className="mt-5 space-y-6">
            {/* Name & Description */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">
                  Campaign Name <span className="text-[#ff4f8b]">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Summer Mega Sale 2026"
                  required
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="What's the offer about?"
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm text-[#1a1a1a] placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
            </div>

            {/* Discount Config */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#e8e8e8] p-4 sm:p-5 bg-[#fafffe]">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#ff4f8b]">
                <DollarSign className="h-3.5 w-3.5" /> Discount Configuration
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Type</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  >
                    <option value="percentage">Percentage Off (%)</option>
                    <option value="fixed">Fixed Discount (₹)</option>
                    {activeType === "bogo" && (
                      <option value="bogo">BOGO</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">
                    {formData.discountType === "bogo" ? "Buy Qty" : "Discount Value"}
                  </label>
                  <input
                    name="discountValue"
                    type="text"
                    value={formData.discountValue}
                    onChange={handleChange}
                    placeholder={formData.discountType === "bogo" ? "1" : "e.g. 20"}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Max Discount Cap (₹)</label>
                  <input
                    name="maxDiscount"
                    type="text"
                    value={formData.maxDiscount}
                    onChange={handleChange}
                    placeholder="e.g. 200"
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Min Order Value (₹)</label>
                  <input
                    name="minOrderValue"
                    type="text"
                    value={formData.minOrderValue}
                    onChange={handleChange}
                    placeholder="e.g. 499"
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                {activeType === "coupon" && (
                  <div>
                    <label className="block text-xs font-bold text-[#666] mb-1">
                      Coupon Code <span className="text-[#ff4f8b]">*</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                      <input
                        name="couponCode"
                        value={formData.couponCode}
                        onChange={handleChange}
                        placeholder="e.g. SAVE20"
                        className="w-full pl-9 pr-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm uppercase placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scheduling */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#e8e8e8] p-4 sm:p-5 bg-[#fafffe]">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#2563eb]">
                  <Clock className="h-3.5 w-3.5" /> Scheduling
                </p>
                <label className="flex items-center gap-2 text-xs font-bold text-[#666] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scheduledMode}
                    onChange={(e) => setScheduledMode(e.target.checked)}
                    className="h-4 w-4 accent-[#0c831f]"
                  />
                  Schedule for later
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Start Date <span className="text-[#ff4f8b]">*</span></label>
                  <input
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Start Time</label>
                  <input
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">End Date <span className="text-[#ff4f8b]">*</span></label>
                  <input
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">End Time</label>
                  <input
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
              </div>
            </div>

            {/* Budget & Limits */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Usage Limit</label>
                <input
                  name="usageLimit"
                  type="text"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Promo Budget (₹)</label>
                <input
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 300000"
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Applicable Categories</label>
                <div className="relative">
                  <List className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                  <select
                    multiple
                    className="w-full pl-9 pr-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  >
                    <option>Groceries</option>
                    <option>Dairy & Eggs</option>
                    <option>Beverages</option>
                    <option>Personal Care</option>
                    <option>All Categories</option>
                  </select>
                </div>
                <p className="mt-1 text-[10px] text-[#999]">Hold Ctrl/Cmd to select multiple</p>
              </div>
            </div>

            {/* BOGO specific fields */}
            {activeType === "bogo" && (
              <div className="flex flex-col gap-3 rounded-xl border border-[#e8e8e8] p-4 sm:p-5 bg-[#e8f5e9]/30">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  <Gift className="h-3.5 w-3.5" /> BOGO Configuration
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-[#666] mb-1">Buy Quantity</label>
                    <input
                      name="bogoBuyQty"
                      type="number"
                      value={formData.bogoBuyQty}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#666] mb-1">Free / Get Quantity</label>
                    <input
                      name="bogoFreeQty"
                      type="number"
                      value={formData.bogoFreeQty}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-xs font-bold text-[#666] cursor-pointer">
                      <input
                        type="checkbox"
                        name="bogoFreeIsSame"
                        checked={formData.bogoFreeIsSame}
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#0c831f]"
                      />
                      Free item must be the same product
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Save notice */}
            <div className="flex items-start gap-3 rounded-xl border border-[#eff6ff] bg-[#eff6ff]/40 p-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#2563eb]" />
              <div className="text-xs font-medium text-[#1e3a5f]">
                <p className="font-black">Before publishing</p>
                <p className="mt-0.5 opacity-80">
                  Double-check your discount value, usage limit, and date range. Running a promotion
                  with incorrect settings can cause inventory imbalances. Consider starting with a
                  smaller budget for new campaigns.
                </p>
              </div>
            </div>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default function CreatePromotionPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <LoaderIcon />
            <span className="text-sm text-[#666]">Loading promotion creator...</span>
          </div>
        </div>
      </DashboardLayout>
    }>
      <CreatePromotionForm />
    </Suspense>
  );
}
