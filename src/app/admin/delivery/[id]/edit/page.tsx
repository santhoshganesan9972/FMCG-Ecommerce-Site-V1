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
  Bell,
  Activity,
  Truck
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import type { FormEvent } from "react";

// Mock data for delivery partners
const mockDeliveryPartners = [
  {
    id: 1,
    name: "Rahul Singh",
    status: "active",
    earningsToday: "₹840",
    deliveriesToday: 24,
    rating: 4.9,
    lastSeen: "2 min ago",
    phone: "+91 98765 43210",
    email: "rahul.singh@delivery.com",
    vehicle: "Honda Activa 6G",
    license: "MH02 AB 1234",
    joined: "2025-03-15",
    totalDeliveries: 1240,
    avgRating: 4.9,
  },
  {
    id: 2,
    name: "Priya Sharma",
    status: "active",
    earningsToday: "₹720",
    deliveriesToday: 18,
    rating: 4.8,
    lastSeen: "5 min ago",
    phone: "+91 87654 32109",
    email: "priya.sharma@delivery.com",
    vehicle: "Suzuki Access 125",
    license: "MH02 CD 5678",
    joined: "2025-07-22",
    totalDeliveries: 980,
    avgRating: 4.8,
  },
];

export default function DeliveryPartnerEditPage() {
  const { id } = useParams();
  const partnerId = typeof id === "string" ? parseInt(id, 10) : 0;
  const partner = mockDeliveryPartners.find((p) => p.id === partnerId);

  if (!partner) {
    return (
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-5">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <h1 className="text-2xl font-black text-[#1a1a1a] sm:text-3xl">
              Delivery Partner Not Found
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
              The delivery partner with ID {partnerId} does not exist.
            </p>
          </section>
        </div>
      </DashboardLayout>
    );
  }

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: partner.name,
    email: partner.email,
    phone: partner.phone,
    vehicle: partner.vehicle,
    license: partner.license,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Redirect back to partner detail page
    window.location.href = `/admin/delivery/${partnerId}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Edit Delivery Partner
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                {partner.name}
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
              <Link href={`/admin/delivery/${partnerId}`}>
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Partner Information Form */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Partner Information
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Personal & Contact Details
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
                  <label className="block text-xs text-[#666] mb-1">Vehicle</label>
                  <input
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#e8e8e8] rounded-md focus:ring-2 focus:ring-[#0c831f] focus:border-[#0c831f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#666] mb-1">License Number</label>
                  <input
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
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