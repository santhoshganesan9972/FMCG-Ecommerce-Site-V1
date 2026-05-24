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
  Menu 
} from "lucide-react";

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
    fraudScore: 12, // out of 100, lower is better
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
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "+91 65432 10987",
    orders: 18,
    loyaltyPoints: 920,
    returns: 3,
    lastPayment: "2026-05-10",
    paymentStatus: "Paid",
    addresses: 3,
    fraudScore: 25,
    status: "active",
    joined: "2026-01-14",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    phone: "+91 54321 09876",
    orders: 7,
    loyaltyPoints: 380,
    returns: 0,
    lastPayment: "2026-05-05",
    paymentStatus: "Paid",
    addresses: 1,
    fraudScore: 18,
    status: "active",
    joined: "2026-02-28",
  },
];

export default function CustomerDetailPage() {
  const { id } = useParams();
  const customerId = typeof id === "string" ? parseInt(id, 10) : 0;
  const customer = mockCustomers.find((c) => c.id === customerId);

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

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header with customer info and actions */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Customer Profile
              </p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                {customer.name}
              </h1>
              <p className="mt-2 text-sm text-[#666]">
                {customer.email} • {customer.phone}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/customers/${customerId}/edit`}>
                <button
                  className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Customer
                </button>
              </Link>
              <button
                className={`flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] ${
                  customer.status === "suspended"
                    ? "text-[#0c831f] border-[#0c831f]"
                    : "text-[#b91c1c] border-[#fecaca]"
                }`}
              >
                {customer.status === "suspended" ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Activate Customer
                  </>
                ) : (
                  <>
                    <Minus className="w-4 h-4" />
                    Suspend Customer
                  </>
                )}
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Merge Duplicate
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Notification
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Add Notes
              </button>
              <button
                className="flex items-center gap-2 rounded-lg bg-[#ff4f8b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#e63975]"
              >
                <Trash2 className="w-4 h-4" />
                Delete Customer
              </button>
            </div>
          </div>
        </section>

        {/* Customer Details Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Customer Details
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Profile Information
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs text-[#666]">Joined</p>
                <p className="font-medium text-[#1a1a1a]">{customer.joined}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Email</p>
                <p className="font-medium text-[#1a1a1a]">{customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Phone</p>
                <p className="font-medium text-[#1a1a1a]">{customer.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#666]">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  customer.status === "active"
                    ? "bg-[#e8f5e9] text-[#0c831f]"
                    : customer.status === "suspended"
                    ? "bg-[#fef2f2] text-[#b91c1c]"
                    : "bg-[#f6f7f6] text-[#666]"
                }`}>
                  {customer.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#666]">Fraud Score</p>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="font-medium text-[#1a1a1a]">{customer.fraudScore}/100</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#666]">Loyalty Points</p>
                <p className="font-medium text-[#0c831f]">{customer.loyaltyPoints}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Orders
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Order History
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total Orders</span>
                <span className="font-medium">{customer.orders}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Order</span>
                <span className="text-[#666]">2026-05-20</span>
              </div>
            </div>
            {/* In a real app, we would show a table of recent orders here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Recent order history would be displayed here in a table format.
              </p>
            </div>
          </div>
        </section>

        {/* Loyalty Points Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Loyalty Points
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Points Balance & History
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Current Balance</span>
                <span className="font-medium text-[#0c831f]">{customer.loyaltyPoints} pts</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Points Earned This Month</span>
                <span className="font-medium text-[#0c831f]">120 pts</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Points Redeemed This Month</span>
                <span className="font-medium text-[#ff4f8b]">40 pts</span>
              </div>
            </div>
            {/* Loyalty points history would go here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Loyalty points transaction history would be displayed here.
              </p>
            </div>
          </div>
        </section>

        {/* Returns Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Returns
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Return History
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total Returns</span>
                <span className="font-medium text-[#ff4f8b]">{customer.returns}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Last Return</span>
                <span className="text-[#666]">2026-05-10</span>
              </div>
            </div>
            {/* Returns history would go here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Return history details would be displayed here.
              </p>
            </div>
          </div>
        </section>

        {/* Payment History Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Payment History
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Payment Records
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Last Payment</span>
                <span className="font-medium">{customer.lastPayment}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Payment Status</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  customer.paymentStatus === "Paid"
                    ? "bg-[#e8f5e9] text-[#0c831f]"
                    : customer.paymentStatus === "Pending"
                    ? "bg-[#fffbeb] text-[#d97706]"
                    : "bg-[#fef2f2] text-[#b91c1c]"
                }`}>
                  {customer.paymentStatus}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Payment Method</span>
                <span className="text-[#666]">Credit Card ending in 4242</span>
              </div>
            </div>
            {/* Payment history would go here */}
            <div className="mt-4">
              <p className="text-xs text-[#666]">
                Detailed payment history would be displayed here.
              </p>
            </div>
          </div>
        </section>

        {/* Address List Section */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Address List
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Saved Addresses
              </h2>
            </div>
            <p className="text-sm font-medium text-[#1a1a1a]">{customer.addresses} address(es) saved</p>
            {/* Addresses would go here */}
            <div className="mt-4 space-y-3">
              {/* Mock address cards */}
              {[1, 2, 3].slice(0, customer.addresses).map((_, index) => (
                <div key={index} className="rounded-lg border border-[#e8e8e8] bg-[#f6f7f6] p-3">
                  <p className="font-medium text-[#1a1a1a]">Home Address</p>
                  <p className="text-xs text-[#666]">
                    123 Main Street, Apt 4B<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                  <button
                    className="mt-2 flex items-center gap-1 text-xs text-[#0c831f] hover:text-[#0a6a18]"
                  >
                    <MapPin className="w-3 h-3" />
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Section (for View Activity button) */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Recent Activity
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Customer Activity Feed
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
                  <p className="font-medium text-[#1a1a1a]">Order placed</p>
                  <p className="text-xs text-[#666]">#ORD-7890 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fffbeb] text-sm font-medium text-[#d97706]">
                  5/18
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">Loyalty points added</p>
                  <p className="text-xs text-[#666]">+150 pts • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-sm font-medium text-[#b91c1c]">
                  5/15
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-[#1a1a1a]">Address updated</p>
                  <p className="text-xs text-[#666]">New address added • 4 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}