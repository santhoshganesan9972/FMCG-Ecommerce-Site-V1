"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Package, Eye, Edit3, TrendingUp } from "lucide-react";

const vendorProducts = [
  { id: "VP-001", vendor: "Fresh Farms Ltd.", product: "Organic Tomatoes", sku: "FF-TOM-001", price: 60, stock: 500, sold: 1200, status: "active", margin: "18%" },
  { id: "VP-002", vendor: "Daily Dairy Co.", product: "Fresh Cow Milk", sku: "DD-MILK-001", price: 56, stock: 800, sold: 3500, status: "active", margin: "22%" },
  { id: "VP-003", vendor: "Fresh Farms Ltd.", product: "Banana - Robusta", sku: "FF-BAN-001", price: 40, stock: 1200, sold: 2800, status: "active", margin: "15%" },
  { id: "VP-004", vendor: "Spice World", product: "Turmeric Powder", sku: "SW-TUR-001", price: 120, stock: 200, sold: 450, status: "inactive", margin: "25%" },
  { id: "VP-005", vendor: "Baker's Delight", product: "Multigrain Bread", sku: "BD-BRD-001", price: 45, stock: 150, sold: 890, status: "active", margin: "20%" },
  { id: "VP-006", vendor: "Organic Harvest", product: "Cold Pressed Coconut Oil", sku: "OH-CCO-001", price: 350, stock: 90, sold: 340, status: "active", margin: "28%" },
];

export default function VendorProductsPage() {
  const [search, setSearch] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");

  const vendors = [...new Set(vendorProducts.map(v => v.vendor))];
  const filtered = vendorProducts.filter(v =>
    (!search || v.product.toLowerCase().includes(search.toLowerCase()) || v.sku.toLowerCase().includes(search.toLowerCase())) &&
    (!vendorFilter || v.vendor === vendorFilter)
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Vendors</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Vendor Products</h1>
          <p className="mt-2 text-sm text-[#666]">View products supplied by each vendor across the platform.</p>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <ReusableSearchBar value={search} onChange={setSearch} placeholder="Search by product name or SKU..." />
          </div>
          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className="rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] outline-none"
          >
            <option value="">All Vendors</option>
            {vendors.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Sold</th>
                <th className="px-4 py-3">Margin</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e8e8]">
              {filtered.map((vp) => (
                <tr key={vp.id} className="text-sm hover:bg-[#f9fafb]">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-[#0c831f]">{vp.sku}</td>
                  <td className="px-4 py-3 font-bold text-[#1a1a1a]">{vp.product}</td>
                  <td className="px-4 py-3 text-[#666]">{vp.vendor}</td>
                  <td className="px-4 py-3 font-bold">₹{vp.price}</td>
                  <td className="px-4 py-3 text-[#666]">{vp.stock}</td>
                  <td className="px-4 py-3">{vp.sold}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-lg bg-[#e8f5e9] px-2 py-1 text-xs font-bold text-[#0c831f]">{vp.margin}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={vp.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8]"><Eye className="h-4 w-4" /></button>
                      <button className="rounded-lg bg-[#f6f7f6] p-1.5 text-[#666] hover:bg-[#e8e8e8]"><Edit3 className="h-4 w-4" /></button>
                      <button className="rounded-lg bg-[#e8f5e9] p-1.5 text-[#0c831f] hover:bg-[#d0edd4]"><TrendingUp className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
