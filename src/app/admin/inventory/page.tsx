"use client";

import DashboardLayout from "../dashboard-layout";
import InventorySearch from "@/components/ui/admin/inventory-search";
import ProductForm from "@/components/ui/admin/product-form";
import InventoryTable from "@/components/ui/admin/inventory-table";
import { toast } from "sonner";

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Inventory Intelligence
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Inventory Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
                Track warehouse balances, available stock, reserved stock,
                damaged goods, expiry dates and reorder forecasts in one
                centralized control panel.
              </p>
            </div>
            <InventorySearch />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "SKUs", value: "5", accent: "bg-[#e8f5e9]", text: "Total active items" },
              { label: "Available", value: "285", accent: "bg-[#f5f9e9]", text: "Sellable stock" },
              { label: "Reserved", value: "37", accent: "bg-[#fff4f6]", text: "Held for orders" },
              { label: "Damaged", value: "8", accent: "bg-[#fff0f6]", text: "Needs review" },
              { label: "Expiry alerts", value: "3", accent: "bg-[#eff7ff]", text: "Near expiry" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.accent} rounded-3xl p-4`}> 
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-black text-[#1a1a1a]">{stat.value}</p>
                <p className="mt-2 text-sm text-[#666]">{stat.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Stock Controls
                </p>
                <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
                  Warehouse Stock Actions
                </h2>
              </div>
              <p className="max-w-xl text-sm text-[#666] sm:text-right">
                Use the listed actions to keep inventory balanced across warehouses and
                avoid stockouts or overages.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Add stock",
                "Remove stock",
                "Transfer stock",
                "Reserve stock",
                "Release stock",
                "Stock adjustment",
                "Mark damaged",
                "Write off expired stock",
                "Auto reorder setup",
                "Forecast stock",
              ].map((action) => (
                <button
                  key={action}
                  onClick={() => toast.info(action + " — feature coming soon")}
                  className="rounded-2xl border border-[#e8e8e8] bg-[#f9fafb] px-4 py-3 text-left text-sm font-semibold text-[#1a1a1a] transition hover:border-[#0c831f] hover:bg-white"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-[#f6f7f6] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Stock controls quick reference
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#666]">
                <li>SKU, warehouse, available stock, reserved stock, damaged stock and expiry date are all tracked.</li>
                <li>Reserve stock for pending orders and release it automatically when orders are cancelled.</li>
                <li>Mark damaged inventory and write off expired stock to keep availability accurate.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Warehouse Overview
                </p>
                <h3 className="mt-1 text-xl font-black text-[#1a1a1a]">
                  Stock by location
                </h3>
              </div>
              <span className="inline-flex rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-black text-[#0c831f]">
                4 warehouses
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {[
                { label: "Mumbai Hub", value: "120 available", caption: "Reserved 14, damaged 2" },
                { label: "Pune Cold Storage", value: "18 available", caption: "Reserved 6, damaged 1" },
                { label: "Bangalore Cold Room", value: "85 available", caption: "Reserved 9, damaged 4" },
                { label: "Hyderabad Depot", value: "42 available", caption: "Reserved 8, damaged 1" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-[#e8e8e8] bg-white px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-[#1a1a1a]">{item.label}</p>
                    <span className="text-sm font-semibold text-[#0c831f]">{item.value}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#666]">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProductForm />

        <InventoryTable />
      </div>
    </DashboardLayout>
  );
}
