"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import VendorKpi from "@/components/ui/admin/vendor-kpi";
import SalesChart from "@/components/ui/admin/sales-chart";
import VendorTable from "@/components/ui/admin/vendor-table";
import ForecastWidget from "@/components/ui/admin/forecast-widget";
import NotificationCenter from "@/components/ui/admin/notification-center";
import ActivityFeed from "@/components/ui/admin/activity-feed";
import { toast } from "sonner";
import { 
  UserPlus,
  RefreshCw,
  Download,
  Filter,
  CalendarDays,
  ChevronRight
} from "lucide-react";

export default function VendorsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Vendor Intelligence
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a]">
                Vendor Ecosystem
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Monitor local stores, partner availability, product coverage, and
                demand forecasts in one quick-commerce partner console.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/vendors/create">
                <button
                  className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Vendor
                </button>
              </Link>
              <button
                onClick={() => toast.success("Vendors refreshed")}
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

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <VendorKpi title="Active Vendors" value="128" growth="+12%" />
          <VendorKpi
            title="Vendor Revenue"
            value={
              <>
                &#8377;8.4L
              </>
            }
            growth="+18%"
          />
          <VendorKpi title="Avg Rating" value="4.8" growth="+4%" />
          <VendorKpi title="Products" value="3,284" growth="+11%" />
        </div>

        <SalesChart />

        <VendorTable />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ForecastWidget />
          <NotificationCenter />
        </div>

        <ActivityFeed />
      </div>
    </DashboardLayout>
  );
}
