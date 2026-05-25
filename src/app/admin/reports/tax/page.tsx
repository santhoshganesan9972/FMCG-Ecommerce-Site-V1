"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import { Download, Eye, FileText, DollarSign, Landmark } from "lucide-react";
import { toast } from "sonner";

const taxReports = [
  { id: "TR-001", title: "GST Monthly Return - April 2026", period: "Apr 2026", type: "GSTR-1", totalTax: "₹4,56,890", status: "ready", format: "xlsx", size: "3.2 MB", dueDate: "2026-05-11" },
  { id: "TR-002", title: "GST Monthly Return - March 2026", period: "Mar 2026", type: "GSTR-3B", totalTax: "₹3,89,200", status: "ready", format: "xlsx", size: "2.8 MB", dueDate: "2026-04-20" },
  { id: "TR-003", title: "TDS Certificate Summary", period: "FY 2025-26", type: "TDS", totalTax: "₹1,12,450", status: "ready", format: "pdf", size: "1.1 MB", dueDate: "2026-07-31" },
  { id: "TR-004", title: "Input Tax Credit Report", period: "Apr 2026", type: "ITC", totalTax: "₹2,34,560", status: "ready", format: "xlsx", size: "1.5 MB", dueDate: "—" },
  { id: "TR-005", title: "Annual GST Summary - FY 2025-26", period: "FY 2025-26", type: "Annual", totalTax: "₹45,23,890", status: "generating", format: "pdf", size: "—", dueDate: "2026-09-30" },
];

export default function TaxReportsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <DashboardLayout>
      <div className="space-y-4 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Reports</p>
          <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Tax Reports</h1>
          <p className="mt-2 text-sm text-[#666]">GST filings, TDS certificates, and tax compliance reports for regulatory requirements.</p>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Tax Reports" value={taxReports.length} icon={<FileText className="h-5 w-5" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Total GST Collected" value="₹45.2L" icon={<Landmark className="h-5 w-5" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Pending Filings" value={1} icon={<DollarSign className="h-5 w-5" />} color="text-[#d97706]" bgColor="bg-[#fffbeb]" />
          <ReusableCard title="Next Due Date" value="May 11" icon={<FileText className="h-5 w-5" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
        </div>

        <ReusableTable
          data={taxReports.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(r) => r.id}
          page={page}
          pageSize={pageSize}
          total={taxReports.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "title", header: "Report", sortable: true, render: (r) => (
              <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-[#0c831f]" /><span className="font-bold text-[#1a1a1a]">{r.title}</span></div>
            )},
            { key: "type", header: "Type", width: "80px", render: (r) => <span className="font-bold text-[#666]">{r.type}</span> },
            { key: "period", header: "Period", width: "100px" },
            { key: "totalTax", header: "Tax Amount", width: "110px", align: "right", render: (r) => <span className="font-bold">{r.totalTax}</span> },
            { key: "status", header: "Status", width: "100px", render: (r) => <StatusBadge status={r.status} /> },
            { key: "dueDate", header: "Due Date", width: "100px", hideOnMobile: true },
          ]}
          actions={[
            { label: "Download", icon: <Download className="h-3.5 w-3.5" />, onClick: (r) => toast.success(`Downloading ${r.title}`) },
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (r) => toast.info(`Viewing ${r.title}`) },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
