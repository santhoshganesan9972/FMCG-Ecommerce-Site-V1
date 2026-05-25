"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Download, Eye, Store, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const vendorReports = [
  { id: "VR-001", title: "Vendor Payout Summary - May 2026", period: "May 2026", vendors: 42, totalSales: "₹1.24Cr", commission: "₹12.4L", status: "ready", format: "xlsx", size: "1.2 MB" },
  { id: "VR-002", title: "Vendor Performance Report (Q2)", period: "Apr-Jun 2026", vendors: 38, totalSales: "₹3.45Cr", commission: "₹34.5L", status: "ready", format: "pdf", size: "2.4 MB" },
  { id: "VR-003", title: "New Vendor Onboarding Report", period: "May 2026", vendors: 5, totalSales: "₹45K", commission: "₹4.5K", status: "ready", format: "xlsx", size: "456 KB" },
  { id: "VR-004", title: "Commission Reconciliation", period: "Apr 2026", vendors: 42, totalSales: "₹85L", commission: "₹8.5L", status: "generating", format: "xlsx", size: "—" },
];

export default function VendorReportsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Reports</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Vendor Reports</h1>
          <p className="mt-2 text-sm text-[#666]">Vendor performance, payout summaries, and commission reports.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Reports" value={vendorReports.length} icon={<Store className="h-5 w-5" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Active Vendors" value={42} icon={<Store className="h-5 w-5" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Total Commission" value="₹12.4L" icon={<DollarSign className="h-5 w-5" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Total Sales" value="₹1.24Cr" icon={<TrendingUp className="h-5 w-5" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <ReusableTable
          data={vendorReports.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(r) => r.id}
          page={page}
          pageSize={pageSize}
          total={vendorReports.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "title", header: "Report", sortable: true, render: (r) => <span className="font-bold text-[#1a1a1a]">{r.title}</span> },
            { key: "period", header: "Period", width: "100px" },
            { key: "vendors", header: "Vendors", width: "80px", align: "center" },
            { key: "totalSales", header: "Sales", width: "100px", render: (r) => <span className="font-bold">{r.totalSales}</span> },
            { key: "commission", header: "Commission", width: "100px", render: (r) => <span className="font-bold text-[#0c831f]">{r.commission}</span> },
            { key: "status", header: "Status", width: "100px", render: (r) => <StatusBadge status={r.status} /> },
          ]}
          actions={[
            { label: "Download", icon: <Download className="h-3.5 w-3.5" />, onClick: (r) => toast.success(`Downloading ${r.title}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
