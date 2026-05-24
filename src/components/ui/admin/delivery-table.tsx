"use client";

import { useState } from "react";
import Link from "next/link";
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
  Star,
  UserPlus,
  Minus,
  List
} from "lucide-react";

const mockDeliveryPartners = [
  {
    id: 1,
    name: "Rahul Singh",
    status: "active",
    earningsToday: "₹840",
    deliveriesToday: 24,
    rating: 4.9,
    lastSeen: "2 min ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    status: "active",
    earningsToday: "₹720",
    deliveriesToday: 18,
    rating: 4.8,
    lastSeen: "5 min ago",
  },
  {
    id: 3,
    name: "Amit Kumar",
    status: "offline",
    earningsToday: "₹0",
    deliveriesToday: 0,
    rating: 4.7,
    lastSeen: "2 hours ago",
  },
  {
    id: 4,
    name: "Neha Patel",
    status: "active",
    earningsToday: "₹960",
    deliveriesToday: 28,
    rating: 5.0,
    lastSeen: "1 min ago",
  },
  {
    id: 5,
    name: "Vikram Singh",
    status: "active",
    earningsToday: "₹680",
    deliveriesToday: 16,
    rating: 4.6,
    lastSeen: "3 min ago",
  },
];

export default function DeliveryTable() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Delivery Partners
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Partner Management
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Earnings Today</th>
              <th className="px-4 py-3">Deliveries</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Last Seen</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDeliveryPartners.map((partner) => (
              <tr
                key={partner.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <Link href={`/admin/delivery/${partner.id}`}>
                    <div className="flex items-center">
                      <span className="w-8 h-8 flex-shrink-0 rounded-full bg-[#e8f5e9] text-[#0c831f] flex items-center justify-center text-xs font-bold">
                        {partner.name.charAt(0)}
                      </span>
                      <div className="ml-3">
                        <p className="font-black">{partner.name}</p>
                        <p className="text-xs text-[#666]">ID: {partner.id}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    partner.status === "active"
                      ? "bg-[#e8f5e9] text-[#0c831f]"
                      : partner.status === "offline"
                      ? "bg-[#fef2f2] text-[#666]"
                      : partner.status === "suspended"
                      ? "bg-[#fef2f2] text-[#b91c1c]"
                      : "bg-[#f6f7f6] text-[#666]"
                  }`}>
                    {partner.status === "active" ? "Online" : partner.status === "offline" ? "Offline" : "Suspended"}
                  </span>
                </td>
                <td className="px-4 py-4 font-medium">{partner.earningsToday}</td>
                <td className="px-4 py-4 font-medium">{partner.deliveriesToday}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-[#ff4f8b]" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-[#666]">{partner.lastSeen}</td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === partner.id ? null : partner.id)
                      }
                      className="rounded-lg p-2 hover:bg-[#e8e8e8]"
                    >
                      <Menu className="w-4 h-4 text-[#666]" />
                    </button>
                    {openMenuId === partner.id && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e8e8e8] rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <Link href={`/admin/delivery/${partner.id}`}>
                          <button
                            className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                        </Link>
                        <button
                          className={`flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa] ${
                            partner.status === "suspended"
                              ? "text-[#0c831f] border-[#0c831f]"
                              : "text-[#666] border-[#e8e8e8]"
                          }`}
                        >
                          {partner.status === "suspended" ? (
                            <>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Activate Partner
                            </>
                          ) : (
                            <>
                              <Minus className="w-4 h-4 mr-2" />
                              Suspend Partner
                            </>
                          )}
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Assign Route
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reassign Route
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] text-[#0c831f] hover:bg-[#e8f5e9]"
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Live GPS Tracking
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          View Earnings
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Shift Management
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <List className="w-4 h-4 mr-2" />
                          Route Optimization
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Notify Partner
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] hover:bg-[#f8f9fa]"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Add Notes
                        </button>
                        <button
                          className="flex w-full items-center px-3 py-2 text-sm text-left text-[#666] text-[#ff4f8b] hover:bg-[#fff0f6]"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove Partner
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