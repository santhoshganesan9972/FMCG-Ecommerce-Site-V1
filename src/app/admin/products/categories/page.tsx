"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { Tags, Plus, Edit3, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { id: "CAT-001", name: "Groceries", slug: "groceries", products: 45, status: "active", icon: "🍚" },
  { id: "CAT-002", name: "Fruits", slug: "fruits", products: 28, status: "active", icon: "🍎" },
  { id: "CAT-003", name: "Vegetables", slug: "vegetables", products: 35, status: "active", icon: "🥦" },
  { id: "CAT-004", name: "Dairy", slug: "dairy", products: 56, status: "active", icon: "🥛" },
  { id: "CAT-005", name: "Beverages", slug: "beverages", products: 42, status: "active", icon: "🥤" },
  { id: "CAT-006", name: "Snacks", slug: "snacks", products: 38, status: "active", icon: "🍿" },
  { id: "CAT-007", name: "Health", slug: "health", products: 22, status: "active", icon: "💊" },
  { id: "CAT-008", name: "Personal Care", slug: "personal-care", products: 18, status: "inactive", icon: "🧴" },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = categories.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Category Management</h1>
              <p className="mt-2 text-sm text-[#666]">Organize products into categories and subcategories.</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
              <Plus className="h-4 w-4" /> Add Category
            </button>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search categories..." />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cat) => (
            <div key={cat.id} className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-sm hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{cat.name}</p>
                    <p className="text-[10px] text-[#999]">{cat.slug}</p>
                  </div>
                </div>
                <StatusBadge status={cat.status} />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#e8e8e8] pt-3">
                <span className="text-xs text-[#666]">{cat.products} products</span>
                <div className="flex gap-1">
                  <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#f6f7f6]"><Eye className="h-3.5 w-3.5" /></button>
                  <button className="rounded-lg p-1.5 text-[#666] hover:bg-[#f6f7f6]"><Edit3 className="h-3.5 w-3.5" /></button>
                  <button className="rounded-lg p-1.5 text-[#dc2626] hover:bg-[#fef2f2]"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
