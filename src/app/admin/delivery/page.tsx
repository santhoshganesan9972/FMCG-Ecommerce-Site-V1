"use client";

import DashboardLayout from "../dashboard-layout";
import DeliveryTable from "@/components/ui/admin/delivery-table";
import { 
  UserPlus,
  RefreshCw,
  Download,
  Filter,
  CalendarDays,
  ChevronRight,
  MapPin,
  Truck,
  Bell,
  MessageCircle,
  DollarSign,
  List,
  Activity,
  Shield
} from "lucide-react";
import { toast } from "sonner";

export default function DeliveryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Delivery Management
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">
                Delivery Partner Console
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage delivery partners, track shipments, optimize routes, and monitor performance in real-time.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.info("Opening add partner form")}
                className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
              >
                <UserPlus className="w-4 h-4" />
                Add Partner
              </button>
              <button
                onClick={() => toast.success("Delivery partners refreshed")}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </section>

        <DeliveryTable />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Live Tracking
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Active Deliveries
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Out for Delivery</span>
                  <span className="font-medium text-[#0c831f]">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Delivered Today</span>
                  <span className="font-medium">128</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Average ETA</span>
                  <span className="font-medium">18 min</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-[#666]">
                  Live GPS tracking of all active delivery partners would be displayed here.
                </p>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Performance Metrics
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">
                Delivery Analytics
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs text-[#666]">On-time Delivery</p>
                  <p className="font-medium text-[#0c831f]">94%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#666]">Avg. Rating</p>
                  <p className="font-medium text-[#ff4f8b]">4.8</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#666]">Earnings Today</p>
                  <p className="font-medium text-[#0c831f]">₹8.4K</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#666]">Completed Shifts</p>
                  <p className="font-medium">156</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
