"use client";

import { BarChart3, Package, Search, ShoppingCart, Users } from "lucide-react";

const results = [
  { icon: Package, title: "Inventory Management", category: "Products" },
  { icon: ShoppingCart, title: "Recent Orders", category: "Orders" },
  { icon: Users, title: "Vendor Ecosystem", category: "Vendors" },
  { icon: BarChart3, title: "Revenue Analytics", category: "Analytics" },
];

export default function GlobalSearch() {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-11 items-center gap-3 rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3">
        <Search className="h-4 w-4 text-[#999]" />
        <input
          type="text"
          placeholder="Search platform modules..."
          className="min-w-0 flex-1 bg-transparent text-sm text-[#1a1a1a] outline-none placeholder:text-[#999]"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {results.map((item) => (
          <button
            key={item.title}
            className="flex w-full items-center gap-3 rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] p-3 text-left transition hover:border-[#0c831f] hover:bg-[#f9fff9]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5e9]">
              <item.icon className="h-4 w-4 text-[#0c831f]" />
            </div>
            <div>
              <p className="text-sm font-black text-[#1a1a1a]">{item.title}</p>
              <p className="text-xs text-[#666]">{item.category}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
