"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { DollarSign, Edit3 } from "lucide-react";
import { toast } from "sonner";

const pricingData = [
  { id: "PRD-001", name: "Organic Basmati Rice", sku: "RICE-BAS-001", price: 499, mrp: 699, cost: 380, margin: 23.8, tax: 5 },
  { id: "PRD-002", name: "Fresh Red Apples", sku: "FRUIT-APL-001", price: 199, mrp: 249, cost: 140, margin: 29.6, tax: 0 },
  { id: "PRD-004", name: "Full Cream Milk 1L", sku: "DAIRY-MLK-001", price: 68, mrp: 75, cost: 48, margin: 29.4, tax: 5 },
  { id: "PRD-005", name: "Greek Yogurt 400g", sku: "DAIRY-YOG-001", price: 129, mrp: 159, cost: 89, margin: 31.0, tax: 5 },
  { id: "PRD-008", name: "Cold Brew Coffee 250ml", sku: "BEV-COF-001", price: 249, mrp: 299, cost: 170, margin: 31.7, tax: 12 },
];

export default function PricingPage() {
  const [search, setSearch] = useState("");
  const filtered = pricingData.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">Pricing Management</h1>
          <p className="mt-2 text-sm text-[#666]">Manage product pricing, MRP, cost, and margins.</p>
        </section>
        <ReusableSearchBar value={search} onChange={(v) => setSearch(v)} placeholder="Search products..." />
        <ReusableTable
          data={filtered}
          keyExtractor={(p) => p.id}
          columns={[
            { key: "name", header: "Product", sortable: true, render: (p) => (<div><span className="font-bold text-[#1a1a1a]">{p.name}</span><span className="block text-[10px] text-[#999]">{p.sku}</span></div>) },
            { key: "price", header: "Selling Price", width: "120px", align: "right", render: (p) => <span className="font-bold">₹{p.price}</span> },
            { key: "mrp", header: "MRP", width: "100px", align: "right", render: (p) => <span className="text-[#999] line-through">₹{p.mrp}</span> },
            { key: "cost", header: "Cost Price", width: "110px", align: "right", hideOnMobile: true, render: (p) => <span className="text-[#666]">₹{p.cost}</span> },
            { key: "margin", header: "Margin", width: "90px", align: "right", render: (p) => <span className="font-bold text-[#0c831f]">{p.margin}%</span> },
            { key: "tax", header: "Tax", width: "70px", align: "right", render: (p) => <span>{p.tax}%</span> },
          ]}
          actions={[{ label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (p) => toast.info(`Editing pricing for ${p.name}`) }]}
        />
      </div>
    </DashboardLayout>
  );
}
