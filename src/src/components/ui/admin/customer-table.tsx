"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
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

// Mock data for customers
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

export default function CustomerTable() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [customers, setCustomers] = useState(mockCustomers);
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Customer Management
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Customer List
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
            >
              <Loader className="w-4 h-4" />
              Import
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
            >
              <UserPlus className="w-4 h-4" />
              Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3 w-8">
                <span className="sr-only">Select all</span>
              </th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Loyalty Pts</th>
              <th className="px-4 py-3">Returns</th>
              <th className="px-4 py-3">Last Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Addresses</th>
              <th className="px-4 py-3">Fraud Score</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[#e8f5e9] text-[#0c831f] flex items-center justify-center text-xs font-bold">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-bold">{customer.name}</p>
                    <p className="text-xs text-[#666]">ID: {customer.id}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#666]">Email</p>
                    <p className="text-[#1a1a1a]">{customer.email}</p>
                    <p className="text-xs font-medium text-[#666] mt-1">Phone</p>
                    <p className="text-[#1a1a1a]">{customer.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium">{customer.orders}</td>
                <td className="px-4 py-4 font-medium text-[#0c831f]">{customer.loyaltyPoints}</td>
                <td className="px-4 py-4 font-medium text-[#ff4f8b]">{customer.returns}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    customer.paymentStatus === "Paid"
                      ? "bg-[#e8f5e9] text-[#0c831f]"
                      : customer.paymentStatus === "Pending"
                        ? "bg-[#fffbeb] text-[#d97706]"
                        : "bg-[#fef2f2] text-[#b91c1c]"
                  }`}>
                    {customer.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    customer.status === "active"
                      ? "bg-[#e8f5e9] text-[#0c831f]"
                      : customer.status === "suspended"
                        ? "bg-[#fef2f2] text-[#b91c1c]"
                        : "bg-[#f6f7f6] text-[#666]"
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium">{customer.addresses}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-xs font-medium">{customer.fraudScore}/100</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">{customer.joined}</td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === customer.id ? null : customer.id)
                      }
                      className="rounded-lg p-2 hover:bg-[#e8e8e8]"
                    >
                      <Menu className="w-4 h-4 text-[#666]" />
                    </button>
                    {/* Dropdown menu for actions */}
                    {openMenuId === customer.id && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e8e8e8] rounded-md shadow-lg z-10">
                      <div className="py-1">
                         <Link href={`/admin/customers/${customer.id}/edit`}>
                           <button
                             className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                           >
                             <Edit2 className="w-4 h-4 mr-2" />
                             Edit Customer
                           </button>
                         </Link>
                        <button
                          onClick={() => {
                            setCustomers(prev => prev.map(c =>
                              c.id === customer.id
                                ? { ...c, status: c.status === "suspended" ? "active" : "suspended" }
                                : c
                            ));
                            setOpenMenuId(null);
                            toast.success(customer.status === "suspended" ? "Customer activated" : "Customer suspended");
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          {customer.status === "suspended" ? (
                            <>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Activate Customer
                            </>
                          ) : (
                            <>
                              <Minus className="w-4 h-4 mr-2" />
                              Suspend Customer
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toast.info("Opening merge tool for " + customer.name);
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Merge Duplicate
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toast.success("Customer data exported");
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </button>
                        <button
                          onClick={() => {
                            setCustomers(prev => prev.filter(c => c.id !== customer.id));
                            setOpenMenuId(null);
                            toast.success("Customer deleted");
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] text-[#ff4f8b] hover:bg-[#fff0f6]"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Customer
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toast("Showing activity log for " + customer.name);
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          View Activity
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toast.info("Notification sent to " + customer.email);
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Send Notification
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toast("Notes opened for " + customer.name);
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Add Notes
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            toast("Fraud score: " + customer.fraudScore + "/100 — " + (customer.fraudScore < 20 ? "Low risk" : customer.fraudScore < 40 ? "Medium risk" : "High risk"));
                          }}
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          View Fraud Score
                        </button>
                      </div>
                    </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
