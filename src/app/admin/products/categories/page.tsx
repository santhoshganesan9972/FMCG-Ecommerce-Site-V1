"use client";

import { useState } from "react";

import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { useCategories } from "@/hooks/use-products";
import type { Category } from "@/types/products";
import { Tags, Plus, Edit3, Trash2, Eye, RefreshCw, X, Save } from "lucide-react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // -- Edit Drawer ------------------------------------------
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});

  const openEditDrawer = (cat: Category) => {
    setEditCategory(cat);
    setEditForm({ ...cat });
  };

  const closeEditDrawer = () => {
    setEditCategory(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    if (!editCategory) return;
    await updateCategory(editCategory.id, editForm);
    toast.success(`"${editForm.name}" updated successfully`);
    closeEditDrawer();
    fetchCategories();
  };

  // -- Add form state ---------------------------------------
  const [addForm, setAddForm] = useState({
    name: "",
    slug: "",
    description: "",
    sortOrder: 0,
  });

  const handleAddSave = async () => {
    if (!addForm.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    await createCategory({
      name: addForm.name,
      slug: addForm.slug || addForm.name.toLowerCase().replace(/\s+/g, "-"),
      description: addForm.description,
      sortOrder: addForm.sortOrder,
    });
    toast.success(`"${addForm.name}" category created`);
    setAddForm({ name: "", slug: "", description: "", sortOrder: 0 });
    setShowAddModal(false);
    fetchCategories();
  };

  const filtered = categories.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const categoryIcons: Record<string, string> = {
    Groceries: "??",
    Fruits: "??",
    Vegetables: "??",
    Dairy: "??",
    Beverages: "??",
    Snacks: "??",
    Health: "??",
    "Personal Care": "??",
    "Home Care": "??",
    "Baby Care": "??",
    "Packaged Food": "??",
    Organic: "??",
    Imported: "??",
    Seasonal: "??",
  };

  return (
       <>      <div className="space-y-4 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Category Management</h1>
              <p className="mt-1.5 text-xs text-[#666]">
                Organize products into categories and subcategories. {categories.length} categories total.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchCategories}
                className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
              >
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-all"
              >
                <Plus className="h-4 w-4" /> Add Category
              </button>
            </div>
          </div>
        </section>

        <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search categories..." />

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-[#e8e8e8] bg-white p-4 transition-all hover:shadow-sm hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{categoryIcons[cat.name] || "??"}</span>
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
                    <p className="mt-0.5 truncate max-w-[160px] text-[10px] text-[#999]">
                      {cat.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toast.info(`Viewing ${cat.name}`)}
                    className="rounded-lg p-1.5 text-[#666] hover:bg-[#f6f7f6] transition-colors"
                    title="View"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => openEditDrawer(cat)}
                    className="rounded-lg p-1.5 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f] transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      await deleteCategory(cat.id);
                      toast.success(`Deleted ${cat.name}`);
                    }}
                    className="rounded-lg p-1.5 text-[#dc2626] hover:bg-[#fef2f2] transition-colors"
                    title="Delete"
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

      {/* -- Add Category Modal -- */}
      <ReusableModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Category"
        subtitle="Create a new product category"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Category Name *</label>
            <input
              type="text"
              value={addForm.name}
              onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Organic Foods"
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Slug</label>
            <input
              type="text"
              value={addForm.slug}
              onChange={(e) => setAddForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="e.g. organic-foods (auto-generated if empty)"
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Description</label>
            <textarea
              value={addForm.description}
              onChange={(e) => setAddForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this category"
              rows={3}
              className="w-full rounded-xl border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f] resize-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Sort Order</label>
            <input
              type="number"
              value={addForm.sortOrder}
              onChange={(e) => setAddForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
              placeholder="0"
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
          <button
            onClick={() => setShowAddModal(false)}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSave}
            className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]"
          >
            Create Category
          </button>
        </div>
      </ReusableModal>

      {/* -- Edit Category Drawer -- */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${editCategory ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeEditDrawer}
      />

      {/* Slide-in panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${editCategory ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e8e8e8] px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
              Edit Category
            </p>
            <h2 className="mt-0.5 text-base font-black text-[#1a1a1a] truncate max-w-xs">
              {editCategory?.name}
            </h2>
            <p className="text-[10px] text-[#999] mt-0.5">
              {editCategory?.productCount} products � {editCategory?.slug}
            </p>
          </div>
          <button
            onClick={closeEditDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e8e8e8] text-[#666] hover:bg-[#f6f7f6] transition-all"
            aria-label="Close edit panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable fields */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Category Name</label>
            <input
              type="text"
              value={editForm.name ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Slug</label>
            <input
              type="text"
              value={editForm.slug ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Description</label>
            <textarea
              rows={3}
              value={editForm.description ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl border border-[#e8e8e8] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors resize-none"
            />
          </div>

          {/* Sort Order */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Sort Order</label>
            <input
              type="number"
              value={editForm.sortOrder ?? 0}
              onChange={(e) => setEditForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          {/* Product Count (read-only) */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Product Count</label>
            <input
              type="number"
              value={editForm.productCount ?? 0}
              readOnly
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-[#f9fafb] px-3 text-sm text-[#999] outline-none cursor-not-allowed"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Status</label>
            <select
              value={editForm.isActive ? "active" : "inactive"}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, isActive: e.target.value === "active" }))
              }
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Image URL</label>
            <input
              type="text"
              value={editForm.image ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="https://..."
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
            {editForm.image && (
              <img
                src={editForm.image}
                alt="Category preview"
                className="mt-2 h-16 w-16 rounded-lg object-cover border border-[#e8e8e8]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </div>

          {/* Read-only metadata */}
          <div className="rounded-xl bg-[#f9fafb] p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wide text-[#999]">Metadata</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] text-[#999]">ID</p>
                <p className="text-xs font-bold text-[#1a1a1a] truncate">{editCategory?.id}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#999]">Parent ID</p>
                <p className="text-xs font-bold text-[#1a1a1a]">{editCategory?.parentId ?? "None"}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#999]">Created</p>
                <p className="text-xs font-bold text-[#1a1a1a]">{editCategory?.createdAt?.slice(0, 10)}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#999]">Updated</p>
                <p className="text-xs font-bold text-[#1a1a1a]">{editCategory?.updatedAt?.slice(0, 10)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#e8e8e8] bg-white px-6 py-4">
          <button
            onClick={closeEditDrawer}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-all"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </aside>
       </>


  );
}
