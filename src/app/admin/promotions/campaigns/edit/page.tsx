"use client";

import DashboardLayout from "../../../dashboard-layout";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Save, X, Zap, Gift, Copy as CopyIcon, Percent, DollarSign, Calendar, Loader } from "lucide-react";
import { promotions } from "@/data/promotions";

const typeIcons: Record<string, { bg: string; text: string }> = {
  "Flash Sale": { bg: "bg-[#fff0f6]", text: "text-[#ff4f8b]" },
  "BOGO": { bg: "bg-[#e8f5e9]", text: "text-[#0c831f]" },
  "Combo Offer": { bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  "Coupon": { bg: "bg-[#fffbeb]", text: "text-[#d97706]" },
};

function LoaderIcon() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  );
}

export default function EditPromotionPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string, 10);
  const promo = promotions.find((p) => p.id === id);
  const [isSaving, setIsSaving] = useState(false);

  if (!promo) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-black text-[#1a1a1a] sm:text-3xl">Campaign Not Found</h1>
            <p className="mt-2 text-sm text-[#666]">Campaign ID {id} does not exist.</p>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  const [formData, setFormData] = useState({
    name: promo.name,
    description: promo.description,
    discountValue: promo.discount.replace(/[^0-9.]/g, ""),
    minOrderValue: promo.minOrderValue?.replace(/[^0-9]/g, "") || "",
    maxDiscount: promo.maxDiscount?.replace(/[^0-9]/g, "") || "",
    startDate: promo.startDate,
    endDate: promo.endDate,
    usageLimit: promo.usageLimit.toString(),
    budget: promo.budget.replace(/[^0-9]/g, ""),
    status: promo.status,
    categories: promo.applicableCategories.join(", "),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);
    router.push(`/admin/promotions/campaigns/${id}`);
  };

  const typeStyle = typeIcons[promo.type as string] || typeIcons["Flash Sale"];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">Edit Campaign</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">{promo.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-black ${typeStyle.bg} ${typeStyle.text}`}>
                  {promo.type}
                </span>
                <span className="text-xs text-[#999]">
                  Started {promo.startDate} &middot; Ends {promo.endDate}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/promotions/campaigns/${id}`}>
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </Link>
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
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Edit Form */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">Campaign Info</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Edit Details</h2>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Campaign Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold text-[#666] mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Discount Value</label>
                  <input
                    name="discountValue"
                    type="text"
                    value={formData.discountValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Min Order Value (₹)</label>
                  <input
                    name="minOrderValue"
                    type="text"
                    value={formData.minOrderValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] mb-1">Max Discount Cap (₹)</label>
                  <input
                    name="maxDiscount"
                    type="text"
                    value={formData.maxDiscount}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Date & Budget */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#ff4f8b]">Schedule & Budget</p>
            <h2 className="text-lg font-black text-[#1a1a1a]">Campaign Settings</h2>
          </div>
          <form onSubmit={handleSave} className="mt-5 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Usage Limit</label>
                <input
                  name="usageLimit"
                  type="text"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#666] mb-1">Promo Budget (₹)</label>
                <input
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#666] mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full max-w-xs px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#666] mb-1">Applicable Categories</label>
              <input
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                placeholder="Comma separated: Groceries, Dairy & Eggs"
                className="w-full px-3 py-2.5 border border-[#e8e8e8] rounded-lg text-sm placeholder:text-[#bbb] focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
              />
            </div>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
