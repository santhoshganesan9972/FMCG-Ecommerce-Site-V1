"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Download,
  Filter,
  Search,
  MoreVertical,
  Image,
  Edit3,
  Trash2,
  CalendarClock,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  position: "Top" | "Middle" | "Bottom";
  status: "Active" | "Inactive" | "Scheduled";
  scheduledDate?: string;
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
  createdBy: string;
  createdAt: string;
}

const mockBanners: Banner[] = [
  {
    id: "1",
    title: "Summer Sale - 30% Off",
    subtitle: "Fresh groceries at unbeatable prices",
    imageUrl: "/images/banners/summer-sale.jpg",
    link: "/offers/summer-sale",
    position: "Top",
    status: "Active",
    startDate: "Jun 1, 2026",
    endDate: "Jun 30, 2026",
    clicks: 12450,
    impressions: 89200,
    createdBy: "Admin",
    createdAt: "May 28, 2026",
  },
  {
    id: "2",
    title: "New Arrivals - Organic Range",
    subtitle: "Farm fresh, directly to your door",
    imageUrl: "/images/banners/organic.jpg",
    link: "/category/organic",
    position: "Middle",
    status: "Active",
    startDate: "Jun 5, 2026",
    endDate: "Jul 5, 2026",
    clicks: 8920,
    impressions: 65400,
    createdBy: "Admin",
    createdAt: "Jun 3, 2026",
  },
  {
    id: "3",
    title: "Free Delivery on ₹199+",
    subtitle: "No minimum order fee",
    imageUrl: "/images/banners/free-delivery.jpg",
    link: "/offers/free-delivery",
    position: "Bottom",
    status: "Scheduled",
    scheduledDate: "Jul 1, 2026",
    startDate: "Jul 1, 2026",
    endDate: "Jul 31, 2026",
    clicks: 0,
    impressions: 0,
    createdBy: "Admin",
    createdAt: "Jun 20, 2026",
  },
  {
    id: "4",
    title: "Monsoon Essentials",
    subtitle: "Stay prepared with our monsoon collection",
    imageUrl: "/images/banners/monsoon.jpg",
    link: "/category/monsoon",
    position: "Top",
    status: "Inactive",
    startDate: "Apr 1, 2026",
    endDate: "May 31, 2026",
    clicks: 18200,
    impressions: 120000,
    createdBy: "Admin",
    createdAt: "Mar 28, 2026",
  },
];

export default function BannersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanners = mockBanners.filter(banner =>
    banner.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active": return "bg-[#e8f5e9] text-[#0c831f]";
      case "Scheduled": return "bg-[#fff0f6] text-[#ff4f8b]";
      default: return "bg-[#f6f7f6] text-[#999]";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                CMS / Banners
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Homepage Banners
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Create and manage promotional banners displayed on the homepage. Drag to reorder, set schedules, and track performance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                Create Banner
              </button>
              <Link href="/admin/cms/schedule">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <CalendarClock className="w-4 h-4" />
                  Schedule
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Search banners by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Positions</option>
                <option>Top</option>
                <option>Middle</option>
                <option>Bottom</option>
              </select>
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Scheduled</option>
              </select>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#f8f9fa]">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Banners Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Banner</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Position</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Schedule</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Performance</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredBanners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-[#fff0f6] to-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                          <Image className="w-5 h-5 text-[#0c831f]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{banner.title}</p>
                          <p className="text-xs text-[#666]">{banner.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-[#1a1a1a]">{banner.position}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusStyle(banner.status)}`}>
                        {banner.status === "Active" ? <ToggleRight className="w-3 h-3" /> :
                         banner.status === "Scheduled" ? <CalendarClock className="w-3 h-3" /> :
                         <ToggleLeft className="w-3 h-3" />}
                        {banner.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <p className="text-[#1a1a1a] font-medium">{banner.startDate}</p>
                        <p className="text-xs text-[#999]">to {banner.endDate}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <p className="text-[#1a1a1a] font-medium">{banner.clicks.toLocaleString("en-US")} clicks</p>
                        <p className="text-xs text-[#999]">{banner.impressions.toLocaleString("en-US")} impressions</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f] transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb] transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#fffbeb] hover:text-[#d97706] transition-colors" title="Schedule">
                          <CalendarClock className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#f6f7f6] transition-colors" title="More">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBanners.length === 0 && (
            <div className="text-center py-12 text-[#999] text-sm">No banners found</div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
