"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
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

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  warehouse: string;
  createdAt: string;
}

const mockProducts: Product[] = [
  { id: "PRD-001", name: "Organic Basmati Rice", sku: "RICE-BAS-001", category: "Groceries", brand: "Fortune", price: 499, stock: 120, status: "active", warehouse: "Mumbai Hub", createdAt: "2024-01-10" },
  { id: "PRD-002", name: "Fresh Red Apples", sku: "FRUIT-APL-001", category: "Fruits", brand: "Local Farm", price: 199, stock: 85, status: "active", warehouse: "Pune Cold Storage", createdAt: "2024-02-10" },
  { id: "PRD-003", name: "Natural Honey 500g", sku: "HEALTH-HNY-001", category: "Health", brand: "Dabur", price: 349, stock: 0, status: "inactive", warehouse: "Delhi Central", createdAt: "2024-01-05" },
  { id: "PRD-004", name: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", category: "Dairy", brand: "Amul", price: 68, stock: 320, status: "active", warehouse: "Mumbai Hub", createdAt: "2024-01-01" },
  { id: "PRD-005", name: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", category: "Dairy", brand: "Epigamia", price: 129, stock: 56, status: "active", warehouse: "Pune Cold Storage", createdAt: "2024-01-15" },
  { id: "PRD-006", name: "Premium Almonds 250g", sku: "SNK-ALM-001", category: "Snacks", brand: "Happilo", price: 349, stock: 42, status: "draft", warehouse: "Delhi Central", createdAt: "2024-03-01" },
  { id: "PRD-007", name: "Salted Butter 100g", sku: "DAIRY-BUT-001", category: "Dairy", brand: "Amul", price: 55, stock: 5, status: "active", warehouse: "Mumbai Hub", createdAt: "2024-01-10" },
  { id: "PRD-008", name: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", category: "Beverages", brand: "Bru", price: 249, stock: 42, status: "active", warehouse: "Bangalore Cold Room", createdAt: "2024-02-20" },
  { id: "PRD-009", name: "Fresh Orange Juice 1L", sku: "BEV-OJ-001", category: "Beverages", brand: "Real", price: 149, stock: 78, status: "active", warehouse: "Mumbai Hub", createdAt: "2024-01-20" },
  { id: "PRD-010", name: "Green Tea Pack 25 bags", sku: "BEV-GT-001", category: "Beverages", brand: "Tetley", price: 199, stock: 8, status: "active", warehouse: "Delhi Central", createdAt: "2024-02-01" },
];

const statusFilterOptions = ["all", "active", "inactive", "draft", "archived"];
const categoryFilterOptions = ["all", "Groceries", "Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Health"];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

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
                Manage product catalog, categories, pricing, media, and SEO. {total} products total.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
                onChange={(v) => { setSearch(v); setPage(1); }}
                placeholder="Search products by name or SKU..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#999]" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
              >
                {statusFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "all" ? "All Status" : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
              >
                {categoryFilterOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "all" ? "All Categories" : opt}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Table */}
        <ReusableTable
          data={paginated}
          keyExtractor={(p) => p.id}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          enableSelection
          bulkActions={[
            { label: "Delete", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: (ids) => { setProducts(p => p.filter(x => !ids.includes(x.id))); toast.success(`${ids.length} products deleted`); }, variant: "danger" },
          ]}
          columns={[
            { key: "id", header: "ID", width: "100px", hideOnMobile: true },
            { key: "name", header: "Product Name", sortable: true, render: (p) => (
              <div>
                <span className="font-bold text-[#1a1a1a]">{p.name}</span>
                <span className="block text-[10px] text-[#999]">{p.sku}</span>
              </div>
            )},
            { key: "category", header: "Category", width: "120px", hideOnMobile: true, sortable: true },
            { key: "price", header: "Price", width: "100px", align: "right", sortable: true, render: (p) => (
              <span className="font-bold">₹{p.price}</span>
            )},
            { key: "stock", header: "Stock", width: "80px", align: "right", sortable: true, render: (p) => (
              <span className={`font-bold ${p.stock === 0 ? "text-[#dc2626]" : p.stock < 10 ? "text-[#d97706]" : "text-[#0c831f]"}`}>
                {p.stock}
              </span>
            )},
            { key: "status", header: "Status", width: "100px", render: (p) => <StatusBadge status={p.status} /> },
            { key: "warehouse", header: "Warehouse", width: "130px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Viewing ${p.name}`) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Editing ${p.name}`) },
            { label: "Duplicate", icon: <Copy className="h-3.5 w-3.5" />, onClick: (p) => toast.success(`Duplicated ${p.name}`) },
            { label: "Delete", icon: <Trash2 className="h-3.5 w-3.5" />, onClick: (p) => setShowDeleteModal(p.id), variant: "danger" },
          ]}
        />
      </div>

      {/* Add Product Modal */}
      <ReusableModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product" subtitle="Fill in the details to create a new product" size="lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: "Product Name", placeholder: "Enter product name" },
            { label: "SKU", placeholder: "e.g. PROD-SKU-001" },
            { label: "Category", type: "select", options: ["Groceries", "Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Health"] },
            { label: "Brand", placeholder: "Brand name" },
            { label: "Price (₹)", type: "number", placeholder: "0" },
            { label: "MRP (₹)", type: "number", placeholder: "0" },
            { label: "Stock", type: "number", placeholder: "0" },
            { label: "Weight", placeholder: "e.g. 1 kg, 500 ml" },
            { label: "Tax Rate (%)", type: "number", placeholder: "5" },
            { label: "Warehouse", type: "select", options: ["Mumbai Hub", "Delhi Central", "Pune Cold Storage", "Bangalore"] },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
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
          <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={() => { toast.success("Product created successfully"); setShowAddModal(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Create Product</button>
        </div>
      </ReusableModal>

      {/* Delete Confirmation */}
      <ReusableModal open={!!showDeleteModal} onClose={() => setShowDeleteModal(null)} title="Delete Product" subtitle="Are you sure you want to delete this product? This action cannot be undone." size="sm">
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowDeleteModal(null)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={() => { if (showDeleteModal) { setProducts(p => p.filter(x => x.id !== showDeleteModal)); toast.success("Product deleted"); } setShowDeleteModal(null); }} className="rounded-xl bg-[#dc2626] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#b91c1c]">Delete</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
