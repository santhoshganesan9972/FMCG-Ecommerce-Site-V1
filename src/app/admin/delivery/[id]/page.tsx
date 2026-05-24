"use client";

import Link from "next/link";
import DashboardLayout from "../../dashboard-layout";
import { useParams } from "next/navigation";
import { 
  MapPin,
  Truck,
  DollarSign,
  Activity,
  Calendar,
  RefreshCw,
  Menu,
  Check,
  X,
  Bell,
  MessageCircle,
  UserPlus,
  Minus,
  Clock,
  List,
  Star,
  Edit2
} from "lucide-react";

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
  {
    id: 3,
    name: "Amit Kumar",
    status: "offline",
    earningsToday: "₹0",
    deliveriesToday: 0,
    rating: 4.7,
    lastSeen: "2 hours ago",
    phone: "+91 76543 21098",
    email: "amit.kumar@delivery.com",
    vehicle: "TVS Jupiter",
    license: "MH02 EF 9012",
    joined: "2025-11-05",
    totalDeliveries: 650,
    avgRating: 4.7,
  },
  {
    id: 4,
    name: "Neha Patel",
    status: "active",
    earningsToday: "₹960",
    deliveriesToday: 28,
    rating: 5.0,
    lastSeen: "1 min ago",
    phone: "+91 65432 10987",
    email: "neha.patel@delivery.com",
    vehicle: "Honda Dio",
    license: "MH02 GH 3456",
    joined: "2026-01-14",
    totalDeliveries: 420,
    avgRating: 5.0,
  },
  {
    id: 5,
    name: "Vikram Singh",
    status: "active",
    earningsToday: "₹680",
    deliveriesToday: 16,
    rating: 4.6,
    lastSeen: "3 min ago",
    phone: "+91 54321 09876",
    email: "vikram.singh@delivery.com",
    vehicle: "Yamaha Fascino",
    license: "MH02 IJ 7890",
    joined: "2026-02-28",
    totalDeliveries: 310,
    avgRating: 4.6,
  },
];

export default function DeliveryDetailPage() {
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

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header with partner info and actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Delivery Partner Profile
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                {partner.name}
              </h1>
              <p className="mt-2 text-sm text-[#666]">
                {partner.vehicle} • {partner.license} • Joined: {partner.joined}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/delivery/${partnerId}/edit`}>
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Partner
                </button>
              </Link>
              <button
                className={`flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] ${
                  partner.status === "offline"
                    ? "text-[#666] border-[#e8e8e8]"
                    : partner.status === "suspended"
                    ? "text-[#b91c1c] border-[#fecaca]"
                    : "text-[#0c831f] border-[#0c831f]"
                }`}
              >
                {partner.status === "offline" ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Activate Partner
                  </>
                ) : partner.status === "suspended" ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Activate Partner
                  </>
                ) : (
                  <>
                    <Minus className="w-4 h-4" />
                    Suspend Partner
                  </>
                )}
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <X className="w-4 h-4 mr-2" />
                Remove Partner
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Activity className="w-4 h-4 mr-2" />
                Assign Route
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reassign Route
              </button>
              <button
                className="flex w-full items-center px-3 py-2 text-sm text-left text-[#0c831f] hover:bg-[#e8f5e9]"
              >
                <Truck className="w-4 h-4 mr-2" />
                Live GPS Tracking
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                View Earnings
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Shift Management
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <List className="w-4 h-4 mr-2" />
                Route Optimization
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Partner
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Add Notes
              </button>
            </div>
          </div>
        </section>

        {/* Partner Details Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Partner Details
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Personal & Contact Information
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs text-[#666]">Phone</p>
                <p className="font-medium text-[#1a1a1a]">{partner.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Email</p>
                <p className="font-medium text-[#1a1a1a]">{partner.email}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Vehicle</p>
                <p className="font-medium text-[#1a1a1a]">{partner.vehicle}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">License</p>
                <p className="font-medium text-[#1a1a1a]">{partner.license}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  partner.status === "active"
                    ? "bg-[#e8f5e9] text-[#0c831f]"
                    : partner.status === "offline"
                    ? "bg-[#f6f7f6] text-[#666]"
                    : partner.status === "suspended"
                    ? "bg-[#fef2f2] text-[#b91c1c]"
                    : "bg-[#f6f7f6] text-[#666]"
                }`}>
                  {partner.status === "active" ? "Online" : partner.status === "offline" ? "Offline" : "Suspended"}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#666]">Last Seen</p>
                <p className="font-medium text-[#666]">{partner.lastSeen}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Joined</p>
                <p className="font-medium text-[#1a1a1a]">{partner.joined}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Performance Metrics
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Delivery Statistics
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs text-[#666]">Today's Earnings</p>
                <p className="font-medium text-[#0c831f]">{partner.earningsToday}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Today's Deliveries</p>
                <p className="font-medium">{partner.deliveriesToday}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Total Deliveries</p>
                <p className="font-medium">{partner.totalDeliveries}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Average Rating</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-[#ff4f8b]" />
                  <span className="font-medium text-[#1a1a1a]">{partner.avgRating}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#666]">On-time Delivery Rate</p>
                <p className="font-medium text-[#0c831f]">96%</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Avg. Delivery Time</p>
                <p className="font-medium">18 min</p>
              </div>
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
                Partner Activity Feed
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
                  <p className="font-medium text-[#1a1a1a]">Completed delivery</p>
                  <p className="text-xs text-[#666]">#ORD-7890 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fffbeb] text-sm font-medium text-[#d97706]">
                  5/18
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">Route optimized</p>
                  <p className="text-xs text-[#666]">Saved 8 minutes • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-sm font-medium text-[#b91c1c]">
                  5/15
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">Status changed</p>
                  <p className="text-xs text-[#666]">Went online • 4 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}