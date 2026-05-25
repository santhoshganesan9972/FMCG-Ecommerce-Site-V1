"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import { Store, Eye, Edit3, Star, DollarSign, Package, TrendingUp, Plus, Phone } from "lucide-react";
import { toast } from "sonner";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: string;
  totalProducts: number;
  totalSales: number;
  commission: number;
  rating: number;
  city: string;
  joinedAt: string;
}

const mockVendors: Vendor[] = [
  { id: "VEND-001", name: "Fortune Foods Ltd", email: "fortune@example.com", phone: "+91 22 4123 4567", category: "Groceries", status: "active", totalProducts: 45, totalSales: 1250000, commission: 10, rating: 4.8, city: "Mumbai", joinedAt: "2024-01-01" },
  { id: "VEND-002", name: "Kashmir Fruit Co.", email: "kashmir@example.com", phone: "+91 11 4234 5678", category: "Fruits", status: "active", totalProducts: 28, totalSales: 780000, commission: 12, rating: 4.6, city: "Srinagar", joinedAt: "2024-02-15" },
  { id: "VEND-003", name: "Amul Dairy", email: "amul@example.com", phone: "+91 79 4345 6789", category: "Dairy", status: "active", totalProducts: 56, totalSales: 1890000, commission: 8, rating: 4.9, city: "Anand", joinedAt: "2024-01-01" },
  { id: "VEND-004", name: "Snack World Distributors", email: "snack@example.com", phone: "+91 33 4456 7890", category: "Snacks", status: "pending", totalProducts: 12, totalSales: 456000, commission: 15, rating: 3.8, city: "Kolkata", joinedAt: "2026-05-01" },
  { id: "VEND-005", name: "Happilo International", email: "happilo@example.com", phone: "+91 44 4567 8901", category: "Snacks", status: "active", totalProducts: 35, totalSales: 890000, commission: 11, rating: 4.5, city: "Chennai", joinedAt: "2024-03-01" },
  { id: "VEND-006", name: "Dabur India Ltd", email: "dabur@example.com", phone: "+91 11 4678 9012", category: "Health", status: "active", totalProducts: 42, totalSales: 1560000, commission: 9, rating: 4.7, city: "Delhi", joinedAt: "2024-01-15" },
];

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockVendors.filter((v) => {
    const matchesSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCommission = mockVendors.reduce((s, v) => s + (v.totalSales * v.commission / 100), 0);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Vendors</p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Vendor Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Onboard, manage, and track vendor performance, products, settlements, and analytics.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">
                <Plus className="h-4 w-4" />
                Add Vendor
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard title="Total Vendors" value={mockVendors.length} icon={<Store className="h-4 w-4" />} color="text-[#0c831f]" bgColor="bg-[#e8f5e9]" />
          <ReusableCard title="Total Products" value={mockVendors.reduce((s, v) => s + v.totalProducts, 0)} icon={<Package className="h-4 w-4" />} color="text-[#2563eb]" bgColor="bg-[#eff6ff]" />
          <ReusableCard title="Total Sales" value={`₹${(mockVendors.reduce((s, v) => s + v.totalSales, 0) / 100000).toFixed(1)}L`} icon={<TrendingUp className="h-4 w-4" />} color="text-[#9333ea]" bgColor="bg-[#f3e8ff]" />
          <ReusableCard title="Avg Commission" value={`₹${(totalCommission / mockVendors.length / 1000).toFixed(0)}K`} icon={<DollarSign className="h-4 w-4" />} color="text-[#ff4f8b]" bgColor="bg-[#fff0f6]" />
        </div>

        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <ReusableSearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search vendors by name or email..." />
            </div>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </section>

        <ReusableTable
          data={filtered.slice((page - 1) * pageSize, page * pageSize)}
          keyExtractor={(v) => v.id}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
          columns={[
            { key: "name", header: "Vendor", sortable: true, render: (v) => (
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">{v.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</div>
                <div><span className="font-bold text-[#1a1a1a]">{v.name}</span><span className="block text-[10px] text-[#999]">{v.email}</span></div>
              </div>
            )},
            { key: "category", header: "Category", width: "100px", hideOnMobile: true },
            { key: "status", header: "Status", width: "100px", render: (v) => <StatusBadge status={v.status} /> },
            { key: "totalProducts", header: "Products", width: "80px", align: "right", sortable: true },
            { key: "totalSales", header: "Sales", width: "100px", align: "right", sortable: true, render: (v) => <span className="font-bold">₹{(v.totalSales / 100000).toFixed(1)}L</span> },
            { key: "commission", header: "Commission", width: "100px", align: "right", render: (v) => <span className="font-bold text-[#0c831f]">{v.commission}%</span> },
            { key: "rating", header: "Rating", width: "80px", render: (v) => (
              <div className="flex items-center gap-1"><Star className="h-3 w-3 text-[#d97706] fill-current" /><span className="font-bold">{v.rating}</span></div>
            )},
            { key: "city", header: "City", width: "100px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (v) => toast.info(`Viewing ${v.name}`) },
            { label: "Edit", icon: <Edit3 className="h-3.5 w-3.5" />, onClick: (v) => toast.info(`Editing ${v.name}`) },
            { label: "Call", icon: <Phone className="h-3.5 w-3.5" />, onClick: (v) => toast.success(`Calling ${v.phone}`) },
          ]}
        />
      </div>

      <ReusableModal open={showAddModal} onClose={() => setShowAddModal(false)} title="Onboard Vendor" subtitle="Add a new vendor to the platform" size="md">
        <div className="space-y-4">
          {[
            { label: "Vendor Name", placeholder: "Enter vendor name" },
            { label: "Email", placeholder: "vendor@example.com" },
            { label: "Phone", placeholder: "+91 98765 43210" },
            { label: "Category", type: "select", options: ["Groceries", "Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Health"] },
            { label: "City", placeholder: "City" },
            { label: "Commission (%)", type: "number", placeholder: "10" },
          ].map((field) => (
            <div key={field.label}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              {field.type === "select" ? (
                <select className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]">
                  <option value="">Select {field.label}</option>
                  {(field.options as string[])?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input type={field.type || "text"} placeholder={field.placeholder} className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]">Cancel</button>
          <button onClick={() => { toast.success("Vendor onboarded!"); setShowAddModal(false); }} className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]">Onboard Vendor</button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
