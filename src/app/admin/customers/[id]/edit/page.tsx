"use client";

import Link from "next/link";
import DashboardLayout from "../../../dashboard-layout";
import { useParams } from "next/navigation";
import { 
  Save,
  X,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  MessageCircle,
  AlertTriangle,
  Bell
} from "lucide-react";
import { ChangeEvent, useState } from "react";

// Mock data for customers (same as in customer-table.tsx for now)
const mockCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    orders: 24,
    loyaltyPoints: 1250,
    returns: 2,
    lastPayment: "2026-05-15",
    paymentStatus: "Paid",
    addresses: 2,
    fraudScore: 12,
    status: "active",
    joined: "2025-03-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 87654 32109",
    orders: 12,
    loyaltyPoints: 650,
    returns: 0,
    lastPayment: "2026-05-18",
    paymentStatus: "Paid",
    addresses: 1,
    fraudScore: 8,
    status: "active",
    joined: "2025-07-22",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+91 76543 21098",
    orders: 3,
    loyaltyPoints: 150,
    returns: 1,
    lastPayment: "2026-05-20",
    paymentStatus: "Pending",
    addresses: 1,
    fraudScore: 45,
    status: "suspended",
    joined: "2025-11-05",
  },
];

export default function CustomerEditPage() {
  const { id } = useParams();
  const customerId = typeof id === "string" ? parseInt(id, 10) : NaN;
  const customer = mockCustomers.find((c) => c.id === customerId);
  
  // Hoisted useState declarations with safe defaults
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    status: customer?.status || "active",
  });

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-black text-[#1a1a1a] sm:text-3xl">
              Customer Not Found
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
              The customer with ID {customerId} does not exist.
            </p>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Redirect back to customer detail page
    window.location.href = `/admin/customers/${customerId}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Edit Customer
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                {customer.name}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] ${isSaving ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <Link href={`/admin/customers/${customerId}`}>
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Information Form */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Customer Information
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Basic Details
              </h2>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-xs text-[#666] mb-1">Full Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Email Address *</label>
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
                  <label className="block text-xs text-[#666] mb-1">Phone Number *</label>
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
                  <label className="block text-xs text-[#666] mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Joined Date</label>
                  <input
                    type="text"
                    value={customer.joined}
                    disabled
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">Loyalty Points</label>
                  <input
                    type="text"
                    value={customer.loyaltyPoints}
                    disabled
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md bg-gray-50"
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