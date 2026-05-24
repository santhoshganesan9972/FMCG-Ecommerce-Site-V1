"use client";

import Link from "next/link";
import DashboardLayout from "../../dashboard-layout";
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
  MessageCircle,
  Star
} from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function VendorCreatePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    revenue: "₹0",
    products: 0,
    rating: 0,
    status: "pending",
    documentsVerified: false,
    bankDetails: "",
    taxId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type: targetType } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false;
    setFormData(prev => ({
      ...prev,
      [name]: targetType === "checkbox" ? checked : targetType === "number" ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // In a real app, this would send a POST request to create the vendor
    // For now, we'll just simulate a save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Redirect back to vendors list
    window.location.href = `/admin/vendors`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Add New Vendor
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Create Vendor Profile
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] ${isSaving ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {isSaving ? "Saving..." : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Vendor
                  </>
                )}
              </button>
              <Link href="/admin/vendors">
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
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs text-[#666] mb-1">Vendor Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Category *</label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Contact Person *</label>
                  <input
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Phone *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
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
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs text-[#666] mb-1">Revenue *</label>
                  <input
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Products Count *</label>
                  <input
                    name="products"
                    type="number"
                    value={formData.products}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Rating (out of 5) *</label>
                  <input
                    name="rating"
                    type="number"
                    value={formData.rating}
                    min="0"
                    max="5"
                    step="0.1"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
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
                      name="documentsVerified"
                      type="checkbox"
                      checked={formData.documentsVerified}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#0c831f] focus:ring-[#0c831f]"
                    />
                    <span className="ml-2 text-xs font-medium">Verified</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Bank Details</label>
                  <input
                    name="bankDetails"
                    value={formData.bankDetails}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Tax ID (GSTIN) *</label>
                  <input
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    required
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

