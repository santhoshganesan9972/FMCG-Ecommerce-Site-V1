"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { Users, Eye, Mail, AlertTriangle, Star, TrendingUp, Shield } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  segment: string;
  status: string;
  lastOrderDate: string;
  city: string;
  registeredAt: string;
}

const mockCustomers: Customer[] = [
  { id: "CUST001", name: "Ravi Kumar", email: "ravi.k@example.com", phone: "+91 98765 43210", totalOrders: 48, totalSpent: 45600, segment: "regular", status: "active", lastOrderDate: "2026-05-21", city: "Mumbai", registeredAt: "2024-01-15" },
  { id: "CUST002", name: "Anita Singh", email: "anita.s@example.com", phone: "+91 87654 32109", totalOrders: 24, totalSpent: 28900, segment: "regular", status: "active", lastOrderDate: "2026-05-20", city: "Delhi", registeredAt: "2024-03-10" },
  { id: "CUST003", name: "Vikram Patel", email: "vikram.p@example.com", phone: "+91 76543 21098", totalOrders: 156, totalSpent: 125000, segment: "vip", status: "active", lastOrderDate: "2026-05-21", city: "Bangalore", registeredAt: "2023-11-01" },
  { id: "CUST004", name: "Sunita Verma", email: "sunita.v@example.com", phone: "+91 65432 10987", totalOrders: 2, totalSpent: 4500, segment: "new", status: "active", lastOrderDate: "2026-05-20", city: "Pune", registeredAt: "2026-05-15" },
  { id: "CUST005", name: "Deepak Joshi", email: "deepak.j@example.com", phone: "+91 54321 09876", totalOrders: 8, totalSpent: 12400, segment: "regular", status: "inactive", lastOrderDate: "2026-04-15", city: "Hyderabad", registeredAt: "2024-06-01" },
  { id: "CUST006", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91 43210 98765", totalOrders: 92, totalSpent: 78500, segment: "vip", status: "active", lastOrderDate: "2026-05-21", city: "Mumbai", registeredAt: "2024-02-01" },
  { id: "CUST007", name: "Amit Gupta", email: "amit.g@example.com", phone: "+91 32109 87654", totalOrders: 15, totalSpent: 18200, segment: "regular", status: "active", lastOrderDate: "2026-05-18", city: "Delhi", registeredAt: "2024-08-15" },
  { id: "CUST008", name: "Neha Patel", email: "neha.p@example.com", phone: "+91 21098 76543", totalOrders: 1, totalSpent: 1240, segment: "new", status: "active", lastOrderDate: "2026-05-22", city: "Ahmedabad", registeredAt: "2026-05-22" },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = mockCustomers.filter((c) => {
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesSegment = segmentFilter === "all" || c.segment === segmentFilter;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesSegment && matchesStatus;
  });

  const totalRevenue = mockCustomers.reduce((s, c) => s + c.totalSpent, 0);
  const vipCount = mockCustomers.filter(c => c.segment === "vip").length;
  const newCount = mockCustomers.filter(c => c.segment === "new").length;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Customers</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Customer Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                View customer profiles, track spending, manage segments, and review support tickets.
              </p>
            </div>
            <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Customers" value={mockCustomers.length} icon={<Users className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<TrendingUp className="h-4 w-4" />} trend={{ value: "+12.3%", direction: "up", label: "vs last month" }} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="VIP Customers" value={vipCount} icon={<Star className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="New This Month" value={newCount} icon={<Shield className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search customers by name or email..." />
            </div>
            <div className="flex items-center gap-2">
              <select value={segmentFilter} onChange={(e) => { setSegmentFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Segments</option>
                <option value="new">New</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
                <option value="churned">Churned</option>
              </select>
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </section>

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(c) => c.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          enableSelection
          columns={[
            { key: "name", header: "Customer", sortable: true, render: (c) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">{c.name.split(" ").map(n => n[0]).join("")}</div>
                <div><span className="font-bold text-[#1a1a1a]">{c.name}</span><span className="block text-[10px] text-[#999]">{c.email}</span></div>
              </div>
            )},
            { key: "phone", header: "Phone", width: "130px", hideOnMobile: true },
            { key: "segment", header: "Segment", width: "100px", render: (c) => <StatusBadge status={c.segment} /> },
            { key: "status", header: "Status", width: "100px", render: (c) => <StatusBadge status={c.status} /> },
            { key: "totalOrders", header: "Orders", width: "80px", align: "right", sortable: true },
            { key: "totalSpent", header: "Spent", width: "100px", align: "right", sortable: true, render: (c) => <span className="font-bold">₹{c.totalSpent.toLocaleString()}</span> },
            { key: "city", header: "City", width: "100px", hideOnMobile: true },
            { key: "lastOrderDate", header: "Last Order", width: "110px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (c) => toast.info(`Viewing ${c.name}`) },
            { label: "Email", icon: <Mail className="h-3.5 w-3.5" />, onClick: (c) => toast.success(`Emailing ${c.name}`) },
          ]}
        />

        {/* Customer Segments */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Analytics</p>
            <h3 className="text-sm font-black text-[#1a1a1a]">Segmentation Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "VIP", count: vipCount, value: "₹2.03L", pct: 25, color: "bg-[#9333ea]" },
              { label: "Regular", count: mockCustomers.filter(c => c.segment === "regular").length, value: "₹86.9K", pct: 50, color: "bg-[#2563eb]" },
              { label: "New", count: newCount, value: "₹5.74K", pct: 12.5, color: "bg-[#0c831f]" },
              { label: "Inactive/Churned", count: mockCustomers.filter(c => c.status === "inactive").length, value: "₹12.4K", pct: 12.5, color: "bg-[#dc2626]" },
            ].map((seg) => (
              <div key={seg.label} className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#666]">{seg.label}</span>
                  <span className="text-xs font-black text-[#1a1a1a]">{seg.count} users</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
                  <div className={`h-full rounded-full ${seg.color}`} style={{ width: `${seg.pct}%` }} />
                </div>
                <p className="mt-1.5 text-sm font-black text-[#1a1a1a]">{seg.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
