"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { useCategories } from "@/hooks/use-products";
import { Tags, Plus, Edit3, Trash2, Eye, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const { categories, loading, error, fetchCategories, createCategory, deleteCategory } = useCategories();
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = categories.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const categoryIcons: Record<string, string> = {
    Groceries: "🍚",
    Fruits: "🍎",
    Vegetables: "🥦",
    Dairy: "🥛",
    Beverages: "🥤",
    Snacks: "🍿",
    Health: "💊",
    "Personal Care": "🧴",
    "Home Care": "🧹",
    "Baby Care": "👶",
    "Packaged Food": "📦",
    Organic: "🌱",
    Imported: "🌍",
    Seasonal: "🌸",
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Category Management</h1>
              <p className="mt-2 text-sm text-[#666]">Organize products into categories and subcategories. {categories.length} categories total.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchCategories}
                className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]"
              >
                <Plus className="h-4 w-4" /> Add Category
              </button>
            </div>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search categories..." />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-sm hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{categoryIcons[cat.name] || "📁"}</span>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{cat.name}</p>
                    <p className="text-[10px] text-[#999]">{cat.slug}</p>
                  </div>
                </div>
                <StatusBadge status={cat.isActive ? "active" : "inactive"} />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#e8e8e8] pt-3">
                <div>
                  <span className="text-xs text-[#666]">{cat.productCount} products</span>
                  {cat.description && (
                    <p className="mt-0.5 text-[10px] text-[#999] truncate max-w-[180px]">{cat.description}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toast.info(`Viewing ${cat.name}`)}
                    className="rounded-lg p-1.5 text-[#666] hover:bg-[#f6f7f6]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => toast.info(`Editing ${cat.name}`)}
                    className="rounded-lg p-1.5 text-[#666] hover:bg-[#f6f7f6]"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      await deleteCategory(cat.id);
                      toast.success(`Deleted ${cat.name}`);
                    }}
                    className="rounded-lg p-1.5 text-[#dc2626] hover:bg-[#fef2f2]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 rounded-xl border border-[#e8e8e8] bg-white p-4">
                <div className="skeleton-shimmer h-4 w-24 rounded-lg" />
                <div className="skeleton-shimmer mt-3 h-3 w-32 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      <ReusableModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Category" subtitle="Create a new product category" size="md">
        <div className="space-y-4">
          {[
            { label: "Category Name", placeholder: "e.g. Organic Foods" },
            { label: "Slug", placeholder: "e.g. organic-foods" },
            { label: "Description", type: "textarea", placeholder: "Brief description of this category" },
            { label: "Sort Order", type: "number", placeholder: "0" },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  placeholder={field.placeholder}
                  className="h-20 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
          <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={async () => {
            await createCategory({ name: "New Category", slug: "new-category", description: "" });
            toast.success("Category created");
            setShowAddModal(false);
          }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Create Category</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
