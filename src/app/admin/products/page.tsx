"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { useProducts, useProductForm } from "@/hooks/use-products";
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Copy,
  RefreshCw,
  Filter,
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
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Product Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
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
              onClick: (p) => toast.info(`Editing ${p.name}`),
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
    </DashboardLayout>
  );
}
