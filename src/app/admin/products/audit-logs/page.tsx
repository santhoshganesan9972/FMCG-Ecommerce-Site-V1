"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import { History, Eye } from "lucide-react";
import { toast } from "sonner";

const auditLogs = [
  { id: "AUD-001", action: "Product Created", product: "Organic Basmati Rice", field: "All", oldValue: "—", newValue: "Created new product", performedBy: "Super Admin", timestamp: "2026-05-21 14:30" },
  { id: "AUD-002", action: "Price Updated", product: "Fresh Red Apples", field: "price", oldValue: "₹179", newValue: "₹199", performedBy: "Rohit Sharma", timestamp: "2026-05-21 12:15" },
  { id: "AUD-003", action: "Stock Adjusted", product: "Full Cream Milk 1L", field: "stock", oldValue: "280", newValue: "320", performedBy: "Rohit Sharma", timestamp: "2026-05-21 10:00" },
  { id: "AUD-004", action: "Status Changed", product: "Natural Honey 500g", field: "status", oldValue: "active", newValue: "inactive", performedBy: "Super Admin", timestamp: "2026-05-20 16:45" },
  { id: "AUD-005", action: "Category Changed", product: "Cold Brew Coffee", field: "category", oldValue: "Groceries", newValue: "Beverages", performedBy: "Priya Patel", timestamp: "2026-05-20 14:20" },
  { id: "AUD-006", action: "Product Deleted", product: "Cinnamon Powder 100g", field: "All", oldValue: "—", newValue: "Product removed", performedBy: "Super Admin", timestamp: "2026-05-19 11:30" },
];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = auditLogs.filter(l => !search || l.product.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Products</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">Audit Logs</h1>
          <p className="mt-2 text-sm text-[#666]">Track all product changes including price updates, stock adjustments, and status changes.</p>
        </section>
        <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by product or action..." />
        <ReusableTable
          data={filtered.slice((page - 1) * 10, page * 10)}
          keyExtractor={(l) => l.id}
          page={page}
          pageSize={10}
          total={filtered.length}
          onPageChange={setPage}
          columns={[
            { key: "action", header: "Action", render: (l) => (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f6f7f6]">
                  <History className="h-3.5 w-3.5 text-[#666]" />
                </div>
                <span className="font-bold text-[#1a1a1a]">{l.action}</span>
              </div>
            )},
            { key: "product", header: "Product", sortable: true, render: (l) => <span className="font-medium">{l.product}</span> },
            { key: "field", header: "Field", width: "100px", hideOnMobile: true },
            { key: "oldValue", header: "Old Value", width: "120px", hideOnMobile: true, render: (l) => <span className="text-[#dc2626]">{l.oldValue}</span> },
            { key: "newValue", header: "New Value", width: "120px", render: (l) => <span className="text-[#0c831f]">{l.newValue}</span> },
            { key: "performedBy", header: "By", width: "120px", hideOnMobile: true },
            { key: "timestamp", header: "Timestamp", width: "150px", hideOnMobile: true },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
