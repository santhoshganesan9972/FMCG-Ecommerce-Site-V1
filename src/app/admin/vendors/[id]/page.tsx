"use client";

import Link from "next/link";
import DashboardLayout from "../../dashboard-layout";
import { useParams } from "next/navigation";
import { 
  Edit2, 
  Trash2, 
  UserPlus, 
  Minus, 
  Loader, 
  Download, 
  AlertTriangle, 
  Bell, 
  MessageCircle, 
  MapPin, 
  Activity, 
  Shield, 
  Menu,
  Check,
  X,
  Clock,
  FileText,
  DollarSign,
  GitMerge,
  List,
  Folder,
  Star
} from "lucide-react";

// Mock data for vendors (same as in vendors.ts for now)
const mockVendors = [
  {
    id: 1,
    name: "Fresh Farms",
    category: "Vegetables",
    revenue: "₹1.2L",
    products: 128,
    rating: 4.8,
    status: "active",
    joined: "2025-03-10",
    documentsVerified: true,
    settlements: 24,
    agreements: 3,
  },
  {
    id: 2,
    name: "Healthy Foods",
    category: "Snacks",
    revenue: "₹84K",
    products: 72,
    rating: 4.6,
    status: "pending",
    joined: "2025-07-22",
    documentsVerified: false,
    settlements: 12,
    agreements: 1,
  },
  {
    id: 3,
    name: "Organic Mart",
    category: "Groceries",
    revenue: "₹2.1L",
    products: 210,
    rating: 4.9,
    status: "suspended",
    joined: "2025-11-05",
    documentsVerified: true,
    settlements: 36,
    agreements: 5,
  },
];

export default function VendorDetailPage() {
  const { id } = useParams();
  const vendorId = typeof id === "string" ? parseInt(id, 10) : 0;
  const vendor = mockVendors.find((v) => v.id === vendorId);

  if (!vendor) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-black text-[#1a1a1a] sm:text-3xl">
              Vendor Not Found
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
              The vendor with ID {vendorId} does not exist.
            </p>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header with vendor info and actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Vendor Profile
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                {vendor.name}
              </h1>
              <p className="mt-2 text-sm text-[#666]">
                {vendor.category} • Joined: {vendor.joined}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/vendors/${vendorId}/edit`}>
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Vendor
                </button>
              </Link>
              <button
                className={`flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] ${
                  vendor.status === "suspended"
                    ? "text-[#0c831f] border-[#0c831f]"
                    : vendor.status === "pending"
                    ? "text-[#d97706] border-[#fef3c7]"
                    : "text-[#b91c1c] border-[#fecaca]"
                }`}
              >
                {vendor.status === "suspended" ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Activate Vendor
                  </>
                ) : vendor.status === "pending" ? (
                  <>
                    <Check className="w-4 h-4" />
                    Approve Vendor
                  </>
                ) : (
                  <>
                    <Minus className="w-4 h-4" />
                    Suspend Vendor
                  </>
                )}
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <X className="w-4 h-4 mr-2" />
                Reject Vendor
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <FileText className="w-4 h-4 mr-2" />
                Verify Documents
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <List className="w-4 h-4 mr-2" />
                View Products
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                View Settlements
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <GitMerge className="w-4 h-4 mr-2" />
                Generate Purchase Order
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Check className="w-4 h-4 mr-2" />
                Assign Products
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Folder className="w-4 h-4 mr-2" />
                View Agreements
              </button>
              <button
                className="flex items-center gap-2 rounded-lg bg-[#ff4f8b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#e63975]"
              >
                <Trash2 className="w-4 h-4" />
                Delete Vendor
              </button>
            </div>
          </div>
        </section>

        {/* Vendor Details Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Vendor Details
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Business Information
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs text-[#666]">Category</p>
                <p className="font-medium text-[#1a1a1a]">{vendor.category}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Revenue</p>
                <p className="font-medium text-[#0c831f]">{vendor.revenue}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Products</p>
                <p className="font-medium text-[#1a1a1a]">{vendor.products}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Rating</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-[#ff4f8b]" />
                  <span className="font-medium text-[#1a1a1a]">{vendor.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#666]">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  vendor.status === "active"
                    ? "bg-[#e8f5e9] text-[#0c831f]"
                    : vendor.status === "suspended"
                    ? "bg-[#fef2f2] text-[#b91c1c]"
                    : "bg-[#fffbeb] text-[#d97706]"
                }`}>
                  {vendor.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#666]">Documents Verified</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  vendor.documentsVerified
                    ? "bg-[#e8f5e9] text-[#0c831f]"
                    : "bg-[#fef2f2] text-[#b91c1c]"
                }`}>
                  {vendor.documentsVerified ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#666]">Settlements</p>
                <p className="font-medium text-[#1a1a1a]">{vendor.settlements}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Agreements</p>
                <p className="font-medium text-[#1a1a1a]">{vendor.agreements}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Products
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Product Catalog
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total Products</span>
                <span className="font-medium">{vendor.products}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Active Products</span>
                <span className="font-medium">102</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Out of Stock</span>
                <span className="font-medium text-[#ff4f8b]">5</span>
              </div>
            </div>
            {/* Products list would go here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Product catalog would be displayed here in a grid or table format.
              </p>
            </div>
          </div>
        </section>

        {/* Settlements Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Settlements
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Payment Settlements
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total Settlements</span>
                <span className="font-medium">{vendor.settlements}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Pending Settlements</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Settlement</span>
                <span className="text-[#666]">2026-05-15</span>
              </div>
            </div>
            {/* Settlements history would go here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Settlement history would be displayed here.
              </p>
            </div>
          </div>
        </section>

        {/* Agreements Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Agreements
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Vendor Agreements
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Active Agreements</span>
                <span className="font-medium">{vendor.agreements}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Expiring Soon</span>
                <span className="font-medium text-[#ff4f8b]">1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Agreement</span>
                <span className="text-[#666]">2026-04-20</span>
              </div>
            </div>
            {/* Agreements list would go here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Vendor agreements would be displayed here.
              </p>
            </div>
          </div>
        </section>

        {/* Activity Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Recent Activity
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Vendor Activity Feed
              </h2>
            </div>
            {/* Activity feed would go here */}
            <div className="space-y-3">
              {/* Mock activity items */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#e8f5e9] text-sm font-black text-[#0c831f]">
                  5/20
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">New product added</p>
                  <p className="text-xs text-[#666]">Organic Tomatoes • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fffbeb] text-sm font-medium text-[#d97706]">
                  5/18
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">Agreement renewed</p>
                  <p className="text-xs text-[#666]">Quarterly supply • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-sm font-medium text-[#b91c1c]">
                  5/15
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">Documents verified</p>
                  <p className="text-xs text-[#666]">All certifications updated • 4 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}