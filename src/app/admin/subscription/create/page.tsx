"use client";

import DashboardLayout from "../../dashboard-layout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CreditCard,
  Plus,
  Calendar,
  DollarSign,
  Activity,
  ArrowLeft,
  Save,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const planTypes = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

export default function CreatePlanPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("monthly");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      toast.success(`Plan "${name}" created successfully`);
      router.push("/admin/subscription");
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 max-w-3xl">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/subscription"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e8e8] text-[#666] hover:bg-[#f8f9fa]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Plans
              </p>
              <h1 className="mt-1 text-xl font-black text-[#1a1a1a]">
                Create Subscription Plan
              </h1>
              <p className="mt-1 text-xs text-[#666]">
                Set up a recurring billing plan with your pricing, cycle, and
                feature bundle.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Plan Name */}
            <div>
              <label className="mb-1.5 block text-sm font-black text-[#1a1a1a]">
                Plan Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Essential Monthly"
                required
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Billing Cycle */}
              <div>
                <label className="mb-1.5 block text-sm font-black text-[#1a1a1a]">
                  Billing Cycle
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-[#e8e8e8] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
                >
                  {planTypes.map((pt) => (
                    <option key={pt.value} value={pt.value}>
                      {pt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-sm font-black text-[#1a1a1a]">
                  Price per Cycle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#999]">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="499"
                    required
                    className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] pl-7 pr-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
                  />
                </div>
              </div>
            </div>

            {/* Billing Cycle Description */}
            <div>
              <label className="mb-1.5 block text-sm font-black text-[#1a1a1a]">
                Cycle Description
              </label>
              <input
                type="text"
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
                placeholder="e.g. 1st of every month"
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-black text-[#1a1a1a]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe what this plan offers to customers..."
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
              />
            </div>

            {/* Features */}
            <div>
              <label className="mb-1.5 block text-sm font-black text-[#1a1a1a]">
                Features <span className="text-[#999] font-semibold">(one per line)</span>
              </label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={4}
                placeholder="10-min delivery&#10;10% bulk discount&#10;Priority support&#10;Free returns"
                className="w-full rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none focus:ring-1 focus:ring-[#0c831f]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e8e8e8]">
              <Link href="/admin/subscription">
                <button
                  type="button"
                  className="rounded-lg border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a6a18] disabled:opacity-60"
              >
                {saving ? (
                  <Activity className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Saving…" : "Create Plan"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
