"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader, ReusableStatusBadge, ReusableConfirmationDialog } from "@/components/reusable/reusable-components";
import { Plus, Edit3, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { categorySections } from "@/data/categories";

const mockCategories = categorySections.map((cs, i) => ({
  id: `CAT-${String(i + 1).padStart(3, "0")}`,
  name: cs.label,
  slug: cs.slug,
  description: `${cs.label} category`,
  parentId: null,
  image: "",
  isActive: true,
  productCount: Math.floor(Math.random() * 200) + 10,
  sortOrder: i + 1,
  createdAt: "2024-01-01",
  updatedAt: "2024-05-01",
}));

const statusColors: Record<string, "success" | "danger"> = {
  active: "success",
  inactive: "danger",
};

export default function ProductCategoriesPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredCategories = mockCategories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="Category Management"
          subtitle="Organize your products into categories and subcategories. Drag to reorder."
          breadcrumb="PRODUCT MANAGEMENT"
          actions={
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          }
        />

        {/* Category Form */}
        {showForm && (
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm animate-in fade-in">
            <h3 className="text-base font-black text-[#1a1a1a] mb-4">New Category</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">Category Name *</label>
                <input placeholder="Enter category name" className="h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">Slug</label>
                <input placeholder="category-slug" className="h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">Parent Category</label>
                <select className="h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="">None (Top Level)</option>
                  {mockCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">Sort Order</label>
                <input type="number" placeholder="0" className="h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#666]">Status</label>
                <select className="h-11 w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Description</label>
              <textarea rows={2} placeholder="Category description" className="w-full rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]" />
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={() => { toast.success("Category created!"); setShowForm(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors">Save Category</button>
              <button onClick={() => setShowForm(false)} className="rounded-xl border border-[#e8e8e8] px-5 py-2.5 text-sm font-semibold text-[#666] hover:bg-[#f8f9fa] transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-[#999] focus:border-[#0c831f] focus:outline-none"
          />
        </div>

        {/* Category Table */}
        <div className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8e8e8] bg-[#f9fafb]">
                  {["Category", "Slug", "Parent", "Products", "Sort Order", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-[#666]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat, i) => (
                  <tr key={cat.id} className={`border-b border-[#e8e8e8] hover:bg-[#f9fafb] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-[#f0f0f0] flex items-center justify-center text-xs font-bold text-[#666]">{cat.name.charAt(0)}</div>
                        <div>
                          <p className="font-semibold text-[#1a1a1a]">{cat.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#999]">{cat.slug}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{cat.parentId || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-sm">{cat.productCount || Math.floor(Math.random() * 100) + 5}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{cat.sortOrder ?? i + 1}</td>
                    <td className="px-4 py-3">
                      <ReusableStatusBadge status={cat.isActive ? "Active" : "Inactive"} variant={cat.isActive ? "success" : "danger"} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toast.info("Editing category")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f] transition-colors"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => { setSelectedCategory(cat.id); setShowDeleteDialog(true); }} className="rounded-lg p-1.5 text-[#666] hover:bg-[#fff0f6] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-[#e8e8e8] bg-[#f9fafb] px-4 py-3">
            <p className="text-xs text-[#666]">Showing {filteredCategories.length} categories</p>
          </div>
        </div>
      </div>

      <ReusableConfirmationDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => { toast.success("Category deleted"); setShowDeleteDialog(false); }}
        title="Delete Category"
        message="Are you sure you want to delete this category? Products in this category will become uncategorized."
        confirmLabel="Delete"
        variant="danger"
      />
    </DashboardLayout>
  );
}
