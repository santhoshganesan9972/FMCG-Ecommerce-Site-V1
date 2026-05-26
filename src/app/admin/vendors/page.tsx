"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { ReusableTable } from "@/components/ui/admin/reusable-table";
import ReusableCard from "@/components/ui/admin/reusable-card";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";
import ReusableSearchBar from "@/components/ui/admin/reusable-search";
import ReusableExportButton from "@/components/ui/admin/reusable-export";
import ReusableModal from "@/components/ui/admin/reusable-modal";
import { ReusablePageHeader, ReusableDrawer } from "@/components/reusable/reusable-components";
import { useVendors } from "@/hooks/use-vendors";
import { vendorsService } from "@/services/vendors.service";
import {
  Store, Eye, Edit3, Star, DollarSign, Package, TrendingUp,
  Plus, Phone, RefreshCw, ShieldAlert, CheckCircle, XCircle,
  MapPin, CreditCard, Activity,
} from "lucide-react";
import { toast } from "sonner";
import type { Vendor } from "@/types/vendors";

const CATEGORIES = ["Groceries", "Fruits & Veg", "Dairy", "Snacks", "Health & Wellness", "Spices", "Frozen Foods", "Beverages"];

export default function VendorsPage() {
  const {
    data, loading, error, summary, filters, meta,
    fetchData, updateFilters, goToPage, changePageSize,
  } = useVendors();

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", phone: "", category: "", city: "", state: "", commissionRate: "10", contactPerson: "" });
  const [addLoading, setAddLoading] = useState(false);

  const handleAddVendor = async () => {
    if (!addForm.name || !addForm.email || !addForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    setAddLoading(true);
    try {
      await vendorsService.createVendor({ ...addForm, commissionRate: Number(addForm.commissionRate) });
      toast.success(`${addForm.name} has been onboarded successfully`);
      setShowAddModal(false);
      setAddForm({ name: "", email: "", phone: "", category: "", city: "", state: "", commissionRate: "10", contactPerson: "" });
      fetchData();
    } catch {
      toast.error("Failed to onboard vendor");
    } finally {
      setAddLoading(false);
    }
  };

  const handleStatusChange = async (vendor: Vendor, status: Vendor["status"]) => {
    try {
      await vendorsService.updateVendorStatus(vendor.id, status);
      toast.success(`${vendor.name} status updated to ${status}`);
      fetchData();
    } catch {
      toast.error("Failed to update vendor status");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5 p-2 sm:p-4">
        <ReusablePageHeader
          breadcrumb="Vendors"
          title="Vendor Management"
          subtitle="Onboard, manage, and track vendor performance, products, settlements, and analytics."
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className="flex items-center gap-1.5 rounded-xl border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-bold text-[#666] hover:bg-[#f6f7f6]"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              <ReusableExportButton onExport={(fmt) => toast.success(`Exporting as ${fmt.toUpperCase()}`)} />
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[#0c831f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18]"
              >
                <Plus className="h-4 w-4" /> Add Vendor
              </button>
            </div>
          }
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ReusableCard
            title="Total Vendors"
            value={summary?.totalVendors ?? 0}
            icon={<Store className="h-5 w-5" />}
            color="text-[#0c831f]" bgColor="bg-[#e8f5e9]"
            subtitle={summary ? `${summary.activeVendors} active` : undefined}
          />
          <ReusableCard
            title="Total Products"
            value={summary?.totalProducts.toLocaleString() ?? 0}
            icon={<Package className="h-5 w-5" />}
            color="text-[#2563eb]" bgColor="bg-[#eff6ff]"
          />
          <ReusableCard
            title="Total Sales"
            value={summary ? `₹${(summary.totalSales / 10000000).toFixed(2)}Cr` : "—"}
            icon={<TrendingUp className="h-5 w-5" />}
            color="text-[#9333ea]" bgColor="bg-[#f3e8ff]"
          />
          <ReusableCard
            title="Pending Payouts"
            value={summary ? `₹${(summary.pendingPayouts / 100000).toFixed(1)}L` : "—"}
            icon={<DollarSign className="h-5 w-5" />}
            color="text-[#d97706]" bgColor="bg-[#fffbeb]"
            subtitle={summary ? `${summary.pendingVendors} pending approval` : undefined}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e8e8e8] bg-white p-4">
          <div className="flex-1 min-w-[200px]">
            <ReusableSearchBar
              value={filters.search ?? ""}
              onChange={(v) => updateFilters({ search: v })}
              placeholder="Search vendors by name, email, ID..."
            />
          </div>
          <select
            value={filters.status ?? "all"}
            onChange={(e) => updateFilters({ status: e.target.value })}
            className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filters.category ?? "all"}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filters.performance ?? "all"}
            onChange={(e) => updateFilters({ performance: e.target.value })}
            className="h-10 rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm font-bold text-[#1a1a1a] outline-none"
          >
            <option value="all">All Performance</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        {/* Vendor Table */}
        <ReusableTable
          data={data}
          keyExtractor={(v) => v.id}
          isLoading={loading}
          page={meta.page}
          pageSize={meta.pageSize}
          total={meta.total}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
          enableSelection
          columns={[
            {
              key: "name", header: "Vendor", sortable: true,
              render: (v) => (
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0c831f]/10 text-xs font-black text-[#0c831f]">
                    {v.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-[#1a1a1a]">{v.name}</span>
                    <span className="block text-[10px] text-[#999]">{v.email}</span>
                  </div>
                </div>
              ),
            },
            { key: "category", header: "Category", width: "130px", hideOnMobile: true },
            { key: "status", header: "Status", width: "100px", render: (v) => <StatusBadge status={v.status} /> },
            { key: "totalProducts", header: "Products", width: "80px", align: "right", sortable: true },
            {
              key: "totalSales", header: "Sales", width: "100px", align: "right", sortable: true,
              render: (v) => <span className="font-bold">₹{(v.totalSales / 100000).toFixed(1)}L</span>,
            },
            {
              key: "commissionRate", header: "Commission", width: "100px", align: "right",
              render: (v) => <span className="font-bold text-[#0c831f]">{v.commissionRate}%</span>,
            },
            {
              key: "rating", header: "Rating", width: "80px",
              render: (v) => (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{v.rating}</span>
                </div>
              ),
            },
            { key: "city", header: "City", width: "100px", hideOnMobile: true },
          ]}
          actions={[
            { label: "View", icon: <Eye className="h-3.5 w-3.5" />, onClick: (v) => setSelectedVendor(v) },
            { label: "Call", icon: <Phone className="h-3.5 w-3.5" />, onClick: (v) => toast.success(`Calling ${v.phone}`) },
            {
              label: "Suspend",
              icon: <ShieldAlert className="h-3.5 w-3.5" />,
              onClick: (v) => handleStatusChange(v, "suspended"),
              variant: "danger",
              show: (v) => v.status === "active",
            },
            {
              label: "Activate",
              icon: <CheckCircle className="h-3.5 w-3.5" />,
              onClick: (v) => handleStatusChange(v, "active"),
              variant: "success",
              show: (v) => v.status !== "active",
            },
          ]}
        />
      </div>

      {/* Vendor Detail Drawer */}
      <ReusableDrawer
        open={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
        title={selectedVendor?.name ?? ""}
        subtitle={selectedVendor?.vendorId}
        width="lg"
      >
        {selectedVendor && (
          <div className="space-y-4">
            {/* Status + Performance */}
            <div className="flex items-center gap-2">
              <StatusBadge status={selectedVendor.status} />
              <StatusBadge status={selectedVendor.performance} />
              <div className="flex items-center gap-1 rounded-full bg-[#fffbeb] px-2.5 py-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-600">{selectedVendor.rating}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
              <h4 className="mb-3 text-xs font-black uppercase tracking-wide text-[#666]">Contact Information</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Contact Person", value: selectedVendor.contactPerson },
                  { label: "Phone", value: selectedVendor.phone },
                  { label: "Email", value: selectedVendor.email },
                  { label: "Category", value: selectedVendor.category },
                  { label: "City", value: `${selectedVendor.city}, ${selectedVendor.state}` },
                  { label: "Joined", value: selectedVendor.joinedDate },
                ].map((f) => (
                  <div key={f.label}>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{f.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1a1a1a]">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="rounded-xl border border-[#e8e8e8] p-4">
              <h4 className="mb-3 text-xs font-black uppercase tracking-wide text-[#666]">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Orders", value: selectedVendor.totalOrders.toLocaleString(), color: "text-[#2563eb]" },
                  { label: "Total Sales", value: `₹${(selectedVendor.totalSales / 100000).toFixed(1)}L`, color: "text-[#0c831f]" },
                  { label: "On-Time Delivery", value: `${selectedVendor.onTimeDeliveryRate}%`, color: selectedVendor.onTimeDeliveryRate >= 95 ? "text-[#0c831f]" : "text-[#d97706]" },
                  { label: "Return Rate", value: `${selectedVendor.returnRate}%`, color: selectedVendor.returnRate <= 2 ? "text-[#0c831f]" : "text-[#dc2626]" },
                  { label: "Active Products", value: selectedVendor.activeProducts, color: "text-[#9333ea]" },
                  { label: "Pending Payout", value: `₹${(selectedVendor.pendingPayout / 1000).toFixed(1)}K`, color: "text-[#d97706]" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-[#f9fafb] p-3">
                    <p className="text-[10px] font-bold text-[#666]">{m.label}</p>
                    <p className={`mt-1 text-lg font-black ${m.color}`}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Banking */}
            <div className="rounded-xl border border-[#e8e8e8] p-4">
              <h4 className="mb-3 text-xs font-black uppercase tracking-wide text-[#666]">Banking Details</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Bank", value: selectedVendor.bankName },
                  { label: "Account", value: selectedVendor.bankAccount },
                  { label: "IFSC", value: selectedVendor.ifsc },
                  { label: "GSTIN", value: selectedVendor.gstin },
                ].map((f) => (
                  <div key={f.label}>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#999]">{f.label}</p>
                    <p className="mt-0.5 text-sm font-mono font-bold text-[#1a1a1a]">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {selectedVendor.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedVendor.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#f6f7f6] px-2.5 py-1 text-[10px] font-bold text-[#666]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 border-t border-[#e8e8e8] pt-4">
              {selectedVendor.status === "active" ? (
                <button
                  onClick={() => { handleStatusChange(selectedVendor, "suspended"); setSelectedVendor(null); }}
                  className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                >
                  <XCircle className="h-4 w-4" /> Suspend
                </button>
              ) : (
                <button
                  onClick={() => { handleStatusChange(selectedVendor, "active"); setSelectedVendor(null); }}
                  className="flex items-center gap-1.5 rounded-xl border border-[#0c831f]/20 bg-[#e8f5e9] px-4 py-2 text-sm font-bold text-[#0c831f] hover:bg-[#d0f0d4]"
                >
                  <CheckCircle className="h-4 w-4" /> Activate
                </button>
              )}
              <button
                onClick={() => toast.info(`Editing ${selectedVendor.name}`)}
                className="ml-auto rounded-xl bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]"
              >
                Edit Vendor
              </button>
            </div>
          </div>
        )}
      </ReusableDrawer>

      {/* Add Vendor Modal */}
      <ReusableModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Onboard New Vendor"
        subtitle="Add a new vendor to the platform"
        size="md"
      >
        <div className="space-y-4">
          {[
            { key: "name", label: "Vendor Name *", placeholder: "Enter company name" },
            { key: "email", label: "Email *", placeholder: "vendor@example.com", type: "email" },
            { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
            { key: "contactPerson", label: "Contact Person", placeholder: "Owner / Manager name" },
            { key: "city", label: "City", placeholder: "City" },
            { key: "state", label: "State", placeholder: "State" },
          ].map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block text-xs font-bold text-[#666]">{field.label}</label>
              <input
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                value={addForm[field.key as keyof typeof addForm]}
                onChange={(e) => setAddForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#0c831f]"
              />
            </div>
          ))}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Category *</label>
            <select
              value={addForm.category}
              onChange={(e) => setAddForm((prev) => ({ ...prev, category: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#666]">Commission Rate (%)</label>
            <input
              type="number"
              min="1" max="30"
              value={addForm.commissionRate}
              onChange={(e) => setAddForm((prev) => ({ ...prev, commissionRate: e.target.value }))}
              className="h-10 w-full rounded-xl border border-[#e8e8e8] bg-white px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#0c831f]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#e8e8e8] pt-4">
          <button
            onClick={() => setShowAddModal(false)}
            className="rounded-xl border border-[#e8e8e8] bg-white px-5 py-2.5 text-sm font-bold text-[#666] hover:bg-[#f6f7f6]"
          >
            Cancel
          </button>
          <button
            onClick={handleAddVendor}
            disabled={addLoading}
            className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0a6a18] disabled:opacity-50"
          >
            {addLoading ? "Onboarding..." : "Onboard Vendor"}
          </button>
        </div>
      </ReusableModal>
    </DashboardLayout>
  );
}
