"use client";

import Link from "next/link";
import DashboardLayout from "../../../dashboard-layout";
import { useParams } from "next/navigation";
import { 
  Save,
  X,
  Check,
  UserPlus,
  MapPin,
  Calendar,
  DollarSign,
  List,
  Shield,
  Bell,
  MessageCircle
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import type { FormEvent } from "react";

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
    contactPerson: "Rajesh Kumar",
    email: "contact@freshfarms.com",
    phone: "+91 98765 43210",
    address: "123 Farm Road, Nashik, Maharashtra 422001",
    bankDetails: "HDFC Bank • Account: 001234567890",
    taxId: "GSTIN: 27AABCU1234F1Z5",
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
    contactPerson: "Priya Sharma",
    email: "info@healthyfoods.com",
    phone: "+91 87654 32109",
    address: "456 Market Street, Bangalore, Karnataka 560001",
    bankDetails: "ICICI Bank • Account: 009876543210",
    taxId: "GSTIN: 29AABCU1234G2Z6",
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
    contactPerson: "Amit Patel",
    email: "support@organicmart.com",
    phone: "+91 76543 21098",
    address: "789 Organic Lane, Mumbai, Maharashtra 400001",
    bankDetails: "SBI Bank • Account: 004567890123",
    taxId: "GSTIN: 27AABCU1234H3Z7",
  },
];

export default function VendorEditPage() {
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

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // In a real app, this would send a PATCH/PUT request to update the vendor
    // For now, we'll just simulate a save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Redirect back to vendor detail page
    window.location.href = `/admin/vendors/${vendorId}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Edit Vendor
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                {vendor.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] ${isSaving ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {isSaving ? (
                  <>
                    <Loader className="w-4 h-4 mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
              <Link href={`/admin/vendors/${vendorId}`}>
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Vendor Information Form */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Vendor Information
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Basic Details
              </h2>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs text-[#666] mb-1">Vendor Name</label>
                  <input
                    type="text"
                    defaultValue={vendor.name}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Category</label>
                  <input
                    type="text"
                    defaultValue={vendor.category}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Contact Person</label>
                  <input
                    type="text"
                    defaultValue={vendor.contactPerson}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={vendor.email}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue={vendor.phone}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Address</label>
                  <textarea
                    defaultValue={vendor.address}
                    rows={3}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Business Details Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Business Details
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Commercial Information
              </h2>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs text-[#666] mb-1">Revenue</label>
                  <input
                    type="text"
                    defaultValue={vendor.revenue}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Products Count</label>
                  <input
                    type="number"
                    defaultValue={vendor.products}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Rating (out of 5)</label>
                  <input
                    type="number"
                    defaultValue={vendor.rating}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Status</label>
                  <select
                    defaultValue={vendor.status}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending Approval</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Documents Verified</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={vendor.documentsVerified}
                      className="h-4 w-4 text-[#0c831f] focus:ring-[#0c831f]"
                    />
                    <span className="ml-2 text-xs font-medium">Verified</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Bank Details</label>
                  <input
                    type="text"
                    defaultValue={vendor.bankDetails}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Tax ID (GSTIN)</label>
                  <input
                    type="text"
                    defaultValue={vendor.taxId}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

// Loader component for saving state
function Loader({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin -ml-1 mr-3 h-4 w-4 text-white ${className || ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  );
}