"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { useProducts, useProductForm } from "@/hooks/use-products";
import type { Product, ProductStatus } from "@/types/products";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Copy,
  RefreshCw,
  Filter,
  X,
  Save,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
  const {
    products,
    loading,
    filters,
    pagination,
    activeFilterCount,
    fetchProducts,
    updateFilters,
    clearFilters,
    setPage,
    setPageSize,
  } = useProducts({ sortBy: "createdAt", sortOrder: "desc" });

  const { deleteProduct } = useProductForm();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showViewModal, setShowViewModal] = useState<string | null>(null);

  // ── Edit Drawer ──────────────────────────────────────────
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const openEditDrawer = (p: Product) => {
    setEditProduct(p);
    setEditForm({ ...p });
  };

  const closeEditDrawer = () => {
    setEditProduct(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    toast.success(`"${editForm.name}" updated successfully`);
    closeEditDrawer();
    fetchProducts();
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateFilters({ search: value });
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    updateFilters({ status: value === "all" ? "" : value as never });
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    updateFilters({ category: value === "all" ? "" : value as never });
  };

  const handleDelete = async (id: string) => {
    const success = await deleteProduct(id);
    if (success) {
      toast.success("Product deleted successfully");
      fetchProducts();
    } else {
      toast.error("Failed to delete product");
    }
    setShowDeleteModal(null);
  };

  const selectedProduct = products.find((p) => p.id === showViewModal);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-xl font-bold text-[#1a1a1a] sm:text-2xl">Product Management</h1>
              <p className="mt-1.5 max-w-2xl text-xs text-[#666]">
                Manage product catalog, categories, pricing, media, and SEO. {pagination.total} products total.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={fetchProducts}
                className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-all"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ReusableSearchBar
                value={search}
                onChange={handleSearch}
                placeholder="Search products by name or SKU..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#999]" />
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
              >
                <option value="all">All Categories</option>
                {["Groceries","Fruits","Vegetables","Dairy","Beverages","Snacks","Health","Personal Care","Home Care","Baby Care"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#0c831f] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Table */}
        <ReusableTable
          data={products}
          keyExtractor={(p) => p.id}
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          isLoading={loading}
          enableSelection
          bulkActions={[
            {
              label: "Delete",
              icon: <Trash2 className="h-3.5 w-3.5" />,
              onClick: (ids) => {
                ids.forEach((id) => deleteProduct(id));
                toast.success(`${ids.length} products deleted`);
                fetchProducts();
              },
              variant: "danger",
            },
          ]}
          columns={[
            { key: "id", header: "ID", width: "100px", hideOnMobile: true },
            {
              key: "name",
              header: "Product Name",
              sortable: true,
              render: (p) => (
                <div>
                  <span className="font-bold text-[#1a1a1a]">{p.name}</span>
                  <span className="block text-[10px] text-[#999]">{p.sku}</span>
                </div>
              ),
            },
            { key: "category", header: "Category", width: "120px", hideOnMobile: true, sortable: true },
            {
              key: "price",
              header: "Price",
              width: "100px",
              align: "right",
              sortable: true,
              render: (p) => <span className="font-bold">₹{p.price}</span>,
            },
            {
              key: "stock",
              header: "Stock",
              width: "80px",
              align: "right",
              sortable: true,
              render: (p) => (
                <span
                  className={`font-bold ${
                    p.stock === 0
                      ? "text-[#dc2626]"
                      : p.stock <= p.lowStockThreshold
                      ? "text-[#d97706]"
                      : "text-[#0c831f]"
                  }`}
                >
                  {p.stock}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              width: "100px",
              render: (p) => <StatusBadge status={p.status} />,
            },
            { key: "warehouse", header: "Warehouse", width: "130px", hideOnMobile: true },
          ]}
          actions={[
            {
              label: "View",
              icon: <Eye className="h-3.5 w-3.5" />,
              onClick: (p) => setShowViewModal(p.id),
            },
            {
              label: "Edit",
              icon: <Edit3 className="h-3.5 w-3.5" />,
              onClick: (p) => openEditDrawer(p),
            },
            {
              label: "Duplicate",
              icon: <Copy className="h-3.5 w-3.5" />,
              onClick: (p) => toast.success(`Duplicated ${p.name}`),
            },
            {
              label: "Delete",
              icon: <Trash2 className="h-3.5 w-3.5" />,
              onClick: (p) => setShowDeleteModal(p.id),
              variant: "danger",
            },
          ]}
        />
      </div>

      {/* Add Product Modal */}
      <ReusableModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        subtitle="Fill in the details to create a new product"
        size="lg"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Product Name", placeholder: "Enter product name" },
            { label: "SKU", placeholder: "e.g. PROD-SKU-001" },
            {
              label: "Category",
              type: "select",
              options: ["Groceries","Fruits","Vegetables","Dairy","Beverages","Snacks","Health","Personal Care","Home Care","Baby Care"],
            },
            { label: "Brand", placeholder: "Brand name" },
            { label: "Price (₹)", type: "number", placeholder: "0" },
            { label: "MRP (₹)", type: "number", placeholder: "0" },
            { label: "Stock", type: "number", placeholder: "0" },
            { label: "Weight", placeholder: "e.g. 1 kg, 500 ml" },
            { label: "Tax Rate (%)", type: "number", placeholder: "5" },
            {
              label: "Warehouse",
              type: "select",
              options: ["Mumbai Hub","Delhi Central","Pune Cold Storage","Bangalore Cold Room","Hyderabad Depot"],
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
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
          <button
            onClick={() => setShowAddModal(false)}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.success("Product created successfully");
              setShowAddModal(false);
              fetchProducts();
            }}
            className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]"
          >
            Create Product
          </button>
        </div>
      </ReusableModal>

      {/* View Product Modal */}
      <ReusableModal
        open={!!showViewModal}
        onClose={() => setShowViewModal(null)}
        title={selectedProduct?.name || "Product Details"}
        subtitle={`SKU: ${selectedProduct?.sku || ""} · ${selectedProduct?.category || ""}`}
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Brand", value: selectedProduct.brand },
                { label: "Price", value: `₹${selectedProduct.price}` },
                { label: "MRP", value: `₹${selectedProduct.mrp}` },
                { label: "Cost Price", value: `₹${selectedProduct.costPrice}` },
                { label: "Stock", value: selectedProduct.stock.toString() },
                { label: "Status", value: selectedProduct.status },
                { label: "Warehouse", value: selectedProduct.warehouse },
                { label: "Supplier", value: selectedProduct.supplier },
                { label: "Weight", value: selectedProduct.weight },
                { label: "Tax Rate", value: `${selectedProduct.taxRate}%` },
                { label: "Created", value: selectedProduct.createdAt },
                { label: "Updated", value: selectedProduct.updatedAt },
              ].map((f) => (
                <div key={f.label} className="rounded-lg bg-[#f9fafb] px-3 py-2">
                  <p className="text-[10px] font-bold uppercase text-[#999]">{f.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">{f.value}</p>
                </div>
              ))}
            </div>
            {selectedProduct.description && (
              <div className="rounded-lg bg-[#f9fafb] px-3 py-2">
                <p className="text-[10px] font-bold uppercase text-[#999]">Description</p>
                <p className="mt-0.5 text-sm text-[#666]">{selectedProduct.description}</p>
              </div>
            )}
            {selectedProduct.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#e8f5e9] px-2.5 py-1 text-[10px] font-medium text-[#0c831f]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {selectedProduct.variants.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold text-[#666]">Variants</p>
                <div className="space-y-1">
                  {selectedProduct.variants.map((v) => (
                    <div key={v.id} className="flex items-center justify-between rounded-lg bg-[#f9fafb] px-3 py-1.5">
                      <span className="text-sm font-medium text-[#1a1a1a]">{v.name}</span>
                      <span className="text-xs text-[#666]">₹{v.price} · Stock: {v.stock}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ReusableModal>

      {/* Delete Confirmation */}
      <ReusableModal
        open={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        title="Delete Product"
        subtitle="Are you sure you want to delete this product? This action cannot be undone."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(null)}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Cancel
          </button>
          <button
            onClick={() => showDeleteModal && handleDelete(showDeleteModal)}
            className="rounded-xl bg-[#dc2626] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#b91c1c]"
          >
            Delete
          </button>
        </div>
      </ReusableModal>

      {/* ── Edit Product Drawer ── */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          editProduct ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeEditDrawer}
      />

      {/* Slide-in panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[480px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          editProduct ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e8e8e8] bg-white px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0c831f]">
              Edit Product
            </p>
            <h2 className="mt-0.5 text-base font-black text-[#1a1a1a] truncate max-w-xs">
              {editProduct?.name}
            </h2>
            <p className="text-[10px] text-[#999] mt-0.5">{editProduct?.sku}</p>
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

          {/* Product Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Product Name</label>
            <input
              type="text"
              value={editForm.name ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          {/* SKU & Barcode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">SKU</label>
              <input
                type="text"
                value={editForm.sku ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, sku: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Barcode</label>
              <input
                type="text"
                value={editForm.barcode ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, barcode: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Category</label>
              <select
                value={editForm.category ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              >
                {["Groceries","Fruits","Vegetables","Dairy","Beverages","Snacks","Health","Personal Care","Home Care","Baby Care"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Brand</label>
              <input
                type="text"
                value={editForm.brand ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, brand: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          {/* Price / MRP / Cost Price */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Price (₹)</label>
              <input
                type="number"
                value={editForm.price ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">MRP (₹)</label>
              <input
                type="number"
                value={editForm.mrp ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, mrp: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Cost (₹)</label>
              <input
                type="number"
                value={editForm.costPrice ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, costPrice: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          {/* Stock / Low Stock Threshold */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Stock Qty</label>
              <input
                type="number"
                value={editForm.stock ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Low Stock Alert</label>
              <input
                type="number"
                value={editForm.lowStockThreshold ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, lowStockThreshold: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          {/* Weight / Unit / Tax Rate */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Weight</label>
              <input
                type="text"
                value={editForm.weight ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, weight: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Unit</label>
              <input
                type="text"
                value={editForm.unit ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, unit: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Tax Rate (%)</label>
              <input
                type="number"
                value={editForm.taxRate ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, taxRate: Number(e.target.value) }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Status</label>
            <select
              value={editForm.status ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value as ProductStatus }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Warehouse & Supplier */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Warehouse</label>
              <select
                value={editForm.warehouse ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, warehouse: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              >
                {["Mumbai Hub","Delhi Central","Pune Cold Storage","Bangalore Cold Room","Hyderabad Depot"].map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">Supplier</label>
              <input
                type="text"
                value={editForm.supplier ?? ""}
                onChange={(e) => setEditForm((f) => ({ ...f, supplier: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Short Description</label>
            <input
              type="text"
              value={editForm.shortDescription ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, shortDescription: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Description</label>
            <textarea
              rows={4}
              value={editForm.description ?? ""}
              onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl border border-[#e8e8e8] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Tags (comma separated)</label>
            <input
              type="text"
              value={(editForm.tags ?? []).join(", ")}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                }))
              }
              className="h-10 w-full rounded-xl border border-[#e8e8e8] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f] transition-colors"
            />
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
    </DashboardLayout>
  );
}
