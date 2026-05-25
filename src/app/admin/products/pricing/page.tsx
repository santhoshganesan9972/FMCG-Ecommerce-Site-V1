"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import PriceEditor from "@/components/ui/products/admin/price-editor";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import { usePricing } from "@/hooks/use-products";
import { RefreshCw } from "lucide-react";

export default function PricingPage() {
  const { pricingData, loading, error, fetchPricing, updatePricing } = usePricing();
  const [search, setSearch] = useState("");

  const filtered = search
    ? pricingData.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      )
    : pricingData;

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Pricing Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage product pricing, MRP, cost, and margins. {pricingData.length} products with pricing data.
              </p>
            </div>
            <button
              onClick={() => fetchPricing()}
              className="flex items-center gap-2 rounded-xl border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6] transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </section>

        <ReusableSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products by name or SKU..."
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <PriceEditor items={filtered} onUpdate={updatePricing} isLoading={loading} />
      </div>
    </DashboardLayout>
  );
}
