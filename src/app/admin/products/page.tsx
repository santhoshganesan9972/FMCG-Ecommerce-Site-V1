"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../dashboard-layout";
import { mockAdminProducts, mockBulkUploadHistory } from "@/data/admin/products";
import {
  ReusablePageHeader,
  ReusableSearchBar,
  ReusableFilterPanel,
  ReusableExportButton,
  ReusableBulkActionToolbar,
  ReusableStatusBadge,
  ReusableDrawer,
  ReusableConfirmationDialog,
  ReusableAnalyticsCard,
  ReusableFormSection,
} from "@/components/reusable/reusable-components";
import ReusableTable from "@/components/reusable/reusable-table";
import {
  Plus,
  Upload,
  Download,
  Copy,
  Archive,
  Edit3,
  Eye,
  BarChart3,
  Package,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const productColumns = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    render: (p: any) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
          {p.media?.[0]?.url ? (
            <img src={p.media[0].url} alt={p.name} className="h-full w-full object-cover" />
          ) : (
            <Package className="w-5 h-5 text-[#ccc]" />
          )}
        </div>
        <div>
          <p className="font-semibold text-[#1a1a1a]">{p.name}</p>
          <p className="text-xs text-[#999] font-mono">{p.sku}</p>
        </div>
      </div>
    ),
  },
  {
    key: "category",
    header: "Category",
    sortable: true,
    render: (p: any) => (
      <span className="inline-flex rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#0c831f]">
        {p.category}
      </span>
    ),
  },
  {
    key: "price",
    header: "Price",
    sortable: true,
    align: "right" as const,
    render: (p: any) => (
      <div className="text-right">
        <p className="font-semibold text-[#1a1a1a]">₹{p.price}</p>
        <p className="text-xs text-[#999] line-through">₹{p.mrp}</p>
      </div>
    ),
  },
  {
    key: "stock",
    header: "Stock",
    sortable: true,
    align: "right" as const,
    render: (p: any) => (
      <span
        className={`font-semibold ${
          p.stock === 0
            ? "text-red-500"
            : p.stock <= p.lowStockThreshold
            ? "text-amber-500"
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
    hideOnMobile: true,
    render: (p: any) => <ReusableStatusBadge status={p.status} />,
  },
  {
    key: "actions",
    header: "",
    width: "120px",
    align: "right" as const,
    render: (p: any) => (
      <div className="flex items-center justify-end gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); toast.info(`Viewing ${p.name}`); }}
          className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f] transition-colors"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toast.info(`Editing ${p.name}`); }}
          className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f] transition-colors"
          title="Edit"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toast.success(`Cloned ${p.name}`); }}
          className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#ff4f8b] transition-colors"
          title="Clone"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toast.info(`${p.name} archived`); }}
          className="rounded-lg p-1.5 text-[#666] hover:bg-[#fff0f6] hover:text-red-500 transition-colors"
          title="Archive"
        >
          <Archive className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const filterGroups = [
  {
    label: "Category",
    key: "category",
    type: "select" as const,
    options: [
      { label: "Groceries", value: "Groceries" },
      { label: "Fruits", value: "Fruits" },
      { label: "Dairy", value: "Dairy" },
      { label: "Beverages", value: "Beverages" },
      { label: "Snacks", value: "Snacks" },
      { label: "Health", value: "Health" },
    ],
  },
  {
    label: "Status",
    key: "status",
    type: "select" as const,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Draft", value: "draft" },
      { label: "Archived", value: "archived" },
    ],
  },
  {
    label: "Stock Status",
    key: "stockStatus",
    type: "select" as const,
    options: [
      { label: "In Stock", value: "in_stock" },
      { label: "Low Stock", value: "low_stock" },
      { label: "Out of Stock", value: "out_of_stock" },
    ],
  },
  {
    label: "Brand",
    key: "brand",
    type: "text" as const,
    placeholder: "Enter brand name",
  },
  {
    label: "Min Price",
    key: "minPrice",
    type: "number" as const,
    placeholder: "₹0",
  },
  {
    label: "Max Price",
    key: "maxPrice",
    type: "number" as const,
    placeholder: "₹10,000",
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredProducts = useMemo(() => {
    let result = [...mockAdminProducts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.stockStatus) {
      if (filters.stockStatus === "in_stock") result = result.filter((p) => p.stock > p.lowStockThreshold);
      else if (filters.stockStatus === "low_stock") result = result.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold);
      else if (filters.stockStatus === "out_of_stock") result = result.filter((p) => p.stock === 0);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }
    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));

    // Sort
    result.sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];
      if (typeof aVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [search, filters, sortKey, sortOrder]);

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v !== "").length,
    [filters]
  );

  const handleSort = useCallback((key: string, order: "asc" | "desc") => {
    setSortKey(key);
    setSortOrder(order);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ReusableAnalyticsCard
            title="Total Products"
            value={mockAdminProducts.length}
            change="+24 this month"
            trend="up"
            icon={<Package className="w-4 h-4" />}
          />
          <ReusableAnalyticsCard
            title="Active Products"
            value={mockAdminProducts.filter((p) => p.status === "active").length}
            change="68% of total"
            trend="up"
            icon={<BarChart3 className="w-4 h-4" />}
          />
          <ReusableAnalyticsCard
            title="Low Stock Items"
            value={mockAdminProducts.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length}
            change="Needs reorder"
            trend="down"
            icon={<AlertTriangle className="w-4 h-4" />}
          />
          <ReusableAnalyticsCard
            title="Out of Stock"
            value={mockAdminProducts.filter((p) => p.stock === 0).length}
            change="Requires attention"
            trend="down"
            icon={<AlertTriangle className="w-4 h-4" />}
          />
        </div>

        <ReusablePageHeader
          title="Product Catalog"
          subtitle="Manage your entire product catalog — create, edit, clone, archive products, and bulk upload via CSV."
          breadcrumb="PRODUCT MANAGEMENT"
          actions={
            <>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button
                onClick={() => router.push("/admin/products/new")}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </>
          }
        />

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <ReusableSearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search products by name, SKU, or barcode..."
            className="flex-1 min-w-[250px]"
          />
          <ReusableFilterPanel
            groups={filterGroups}
            values={filters}
            onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
            onClear={() => setFilters({})}
            activeCount={activeFilterCount}
          />
        </div>

        {/* Bulk Actions */}
        <ReusableBulkActionToolbar
          selectedCount={selectedIds.length}
          onClear={() => setSelectedIds([])}
          actions={[
            {
              label: "Archive",
              icon: <Archive className="w-3.5 h-3.5" />,
              onClick: () => toast.success(`${selectedIds.length} products archived`),
            },
            {
              label: "Update Price",
              icon: <DollarSign className="w-3.5 h-3.5" />,
              onClick: () => toast.info(`Updating prices for ${selectedIds.length} products`),
            },
            {
              label: "Delete",
              icon: <Archive className="w-3.5 h-3.5" />,
              onClick: () => setShowDeleteDialog(true),
              variant: "danger" as const,
            },
          ]}
        />

        {/* Product Table */}
        <ReusableTable
          data={filteredProducts}
          columns={productColumns}
          keyExtractor={(p: any) => p.id}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
          emptyMessage="No products found matching your filters"
        />
      </div>

      <ReusableConfirmationDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => { toast.success(`${selectedIds.length} products deleted`); setShowDeleteDialog(false); setSelectedIds([]); }}
        title="Delete Products"
        message={`Are you sure you want to delete ${selectedIds.length} products? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </DashboardLayout>
  );
}
