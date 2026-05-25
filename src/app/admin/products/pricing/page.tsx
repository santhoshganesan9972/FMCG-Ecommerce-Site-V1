"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusablePageHeader, ReusableSearchBar, ReusableExportButton, ReusableBulkActionToolbar } from "@/components/reusable/reusable-components";
import ReusableTable from "@/components/reusable/reusable-table";
import { mockAdminProducts } from "@/data/admin/products";
import { Edit3, Tag, DollarSign } from "lucide-react";
import { toast } from "sonner";

const pricingColumns = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    render: (p: any) => (
      <div>
        <p className="font-semibold text-[#1a1a1a]">{p.name}</p>
        <p className="text-xs text-[#999]">{p.sku}</p>
      </div>
    ),
  },
  {
    key: "price",
    header: "Selling Price",
    sortable: true,
    align: "right" as const,
    render: (p: any) => <p className="font-semibold text-right">₹{p.price}</p>,
  },
  {
    key: "mrp",
    header: "MRP",
    sortable: true,
    align: "right" as const,
    render: (p: any) => <p className="text-right text-[#999] line-through">₹{p.mrp}</p>,
  },
  {
    key: "costPrice",
    header: "Cost Price",
    sortable: true,
    align: "right" as const,
    render: (p: any) => <p className="text-right text-[#666]">₹{p.costPrice}</p>,
  },
  {
    key: "margin",
    header: "Margin",
    sortable: true,
    align: "right" as const,
    render: (p: any) => {
      const margin = ((p.price - p.costPrice) / p.price * 100).toFixed(1);
      const isGood = parseFloat(margin) > 20;
      return (
        <span className={`font-semibold ${isGood ? "text-[#0c831f]" : "text-amber-500"}`}>
          {margin}%
        </span>
      );
    },
  },
  {
    key: "taxRate",
    header: "Tax",
    align: "right" as const,
    render: (p: any) => <p className="text-right text-[#666]">{p.taxRate}%</p>,
  },
  {
    key: "actions",
    header: "",
    width: "80px",
    align: "right" as const,
    render: (p: any) => (
      <div className="flex justify-end">
        <button onClick={() => toast.info(`Editing pricing for ${p.name}`)} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0] hover:text-[#0c831f] transition-colors">
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

export default function PricingManagementPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = mockAdminProducts.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <ReusablePageHeader
          title="Pricing Management"
          subtitle="Manage and update product pricing across your catalog. View margins and tax rates at a glance."
          breadcrumb="PRODUCT MANAGEMENT"
          actions={
            <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
          }
        />

        <div className="flex items-center gap-3">
          <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search products by name or SKU..." className="flex-1" />
          <button className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] px-4 py-2.5 text-sm font-semibold text-[#0c831f] hover:bg-[#e8f5e9] transition-colors">
            <Tag className="w-4 h-4" />
            Bulk Update
          </button>
        </div>

        <ReusableBulkActionToolbar
          selectedCount={selectedIds.length}
          onClear={() => setSelectedIds([])}
          actions={[
            {
              label: "Update Prices",
              icon: <DollarSign className="w-3.5 h-3.5" />,
              onClick: () => toast.info(`Updating prices for ${selectedIds.length} products`),
            },
            {
              label: "Update Tax",
              icon: <Tag className="w-3.5 h-3.5" />,
              onClick: () => toast.info(`Updating tax for ${selectedIds.length} products`),
            },
          ]}
        />

        <ReusableTable
          data={filtered}
          columns={pricingColumns}
          keyExtractor={(p: any) => p.id}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          emptyMessage="No products found matching your search"
        />
      </div>
    </DashboardLayout>
  );
}
