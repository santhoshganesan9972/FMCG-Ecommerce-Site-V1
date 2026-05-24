 "use client";

import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  Gift,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  TrendingUp,
  ShoppingBag,
  Percent,
} from "lucide-react";

// Mock tier data
const initialTiers = [
  {
    id: 1,
    name: "Bronze",
    color: "#cd7f32",
    minPoints: 0,
    maxPoints: 999,
    benefits: [
      "Earn 1 point per ₹100 spent",
      "Birthday bonus: 50 points",
      "Access to member-only sales",
    ],
    multiplier: 1,
    members: 28500,
  },
  {
    id: 2,
    name: "Silver",
    color: "#c0c0c0",
    minPoints: 1000,
    maxPoints: 4999,
    benefits: [
      "Earn 1.5 points per ₹100 spent",
      "Birthday bonus: 100 points",
      "Free delivery on orders above ₹299",
      "Early access to sales",
    ],
    multiplier: 1.5,
    members: 12200,
  },
  {
    id: 3,
    name: "Gold",
    color: "#ffd700",
    minPoints: 5000,
    maxPoints: 19999,
    benefits: [
      "Earn 2 points per ₹100 spent",
      "Birthday bonus: 200 points",
      "Free delivery on all orders",
      "Priority customer support",
      "Exclusive Gold member events",
    ],
    multiplier: 2,
    members: 3800,
  },
  {
    id: 4,
    name: "Platinum",
    color: "#e5e4e2",
    minPoints: 20000,
    maxPoints: null,
    benefits: [
      "Earn 3 points per ₹100 spent",
      "Birthday bonus: 500 points",
      "Free express delivery",
      "Personal shopping assistant",
      "Exclusive Platinum events",
      "Double points on anniversaries",
    ],
    multiplier: 3,
    members: 731,
  },
];

export default function TiersPage() {
  const [tiers, setTiers] = useState(initialTiers);
  const [editingTier, setEditingTier] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    // Simulate saving
    setHasChanges(false);
  };

  const handleEdit = (tier: any) => {
    setEditingTier({ ...tier });
  };

  const handleCancelEdit = () => {
    setEditingTier(null);
  };

  const handleUpdateTier = () => {
    setTiers(tiers.map((t) => (t.id === editingTier.id ? editingTier : t)));
    setEditingTier(null);
    setHasChanges(true);
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
              <p className="text-xs font-black uppercase tracking-wide text-[#2563eb]">
                Loyalty Management
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Loyalty Tiers
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Configure reward tiers and their benefits. Higher tiers offer better 
                earning rates and exclusive perks to incentivize customer loyalty.
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

        {/* Tier Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {tiers.map((tier, index) => (
            <section
              key={tier.id}
              className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${tier.color}20` }}
                  >
                    <Star
                      className="h-6 w-6"
                      style={{ color: tier.color }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1a1a1a]">{tier.name}</h2>
                    <p className="text-xs text-[#666]">
                      {tier.members.toLocaleString("en-US")} members
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(tier)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa]"
                >
                  <Edit className="h-4 w-4 text-[#1a1a1a]" />
                </button>
              </div>

              {/* Points Range */}
              <div className="mb-4 rounded-lg bg-[#f9fafb] p-3">
                <p className="text-xs font-black uppercase tracking-wide text-[#666] mb-1">
                  Points Range
                </p>
                <p className="text-sm font-bold text-[#1a1a1a]">
                  {tier.minPoints.toLocaleString("en-US")} - {tier.maxPoints ? tier.maxPoints.toLocaleString("en-US") : '∞'} points
                </p>
              </div>

              {/* Multiplier */}
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#0c831f]" />
                <span className="text-sm font-bold text-[#1a1a1a]">
                  {tier.multiplier}x points multiplier
                </span>
              </div>

              {/* Benefits */}
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#666] mb-2">
                  Benefits
                </p>
                <ul className="space-y-1.5">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#666]">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tier.color }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* Edit Modal */}
        {editingTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-2xl border border-[#e8e8e8] bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-[#2563eb]">
                    Edit Tier
                  </p>
                  <h2 className="text-xl font-black text-[#1a1a1a]">
                    Edit {editingTier.name} Tier
                  </h2>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa]"
                >
                  <X className="h-4 w-4 text-[#1a1a1a]" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                      Tier Name
                    </label>
                    <input
                      type="text"
                      value={editingTier.name}
                      onChange={(e) =>
                        setEditingTier({ ...editingTier, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                      Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingTier.color}
                        onChange={(e) =>
                          setEditingTier({ ...editingTier, color: e.target.value })
                        }
                        className="h-10 w-10 rounded-lg border border-[#e8e8e8] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={editingTier.color}
                        onChange={(e) =>
                          setEditingTier({ ...editingTier, color: e.target.value })
                        }
                        className="flex-1 rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#2563eb] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                      Minimum Points
                    </label>
                    <input
                      type="number"
                      value={editingTier.minPoints}
                      onChange={(e) =>
                        setEditingTier({
                          ...editingTier,
                          minPoints: parseInt(e.target.value),
                        })
                      }
                      className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                      Maximum Points (leave empty for ∞)
                    </label>
                    <input
                      type="number"
                      value={editingTier.maxPoints || ""}
                      onChange={(e) =>
                        setEditingTier({
                          ...editingTier,
                          maxPoints: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      placeholder="No limit"
                      className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#2563eb] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                    Points Multiplier
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={editingTier.multiplier}
                    onChange={(e) =>
                      setEditingTier({
                        ...editingTier,
                        multiplier: parseFloat(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-[#e8e8e8] px-3 py-2 text-sm focus:border-[#2563eb] focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-[#666]">
                    Example: 2x means earn 2 points per ₹100 spent
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
                    Benefits (one per line)
                  </label>
                  <textarea
                    value={editingTier.benefits.join("\n")}
                    onChange={(e) =>
                      setEditingTier({
                        ...editingTier,
                        benefits: e.target.value.split("\n"),
                      })
                    }
                    rows={5}
                    className="w-full rounded-lg border border-[#e8e8e8] p-3 text-sm focus:border-[#2563eb] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="rounded-lg border border-[#e8e8e8] px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTier}
                  className="flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-[#eff6ff] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/10">
              <Gift className="h-5 w-5 text-[#2563eb]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">
                Tier Progression System
              </p>
              <p className="mt-1 text-sm text-[#666]">
                Customers automatically advance to higher tiers when they accumulate 
                enough points. Tier status is evaluated in real-time and benefits are 
                applied immediately upon tier upgrade.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
