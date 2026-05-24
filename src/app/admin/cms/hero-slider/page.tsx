"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  Image,
  Edit3,
  Trash2,
  CalendarClock,
  Eye,
  ToggleLeft,
  ToggleRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  status: "Active" | "Inactive" | "Scheduled";
  scheduledDate?: string;
  startDate: string;
  endDate: string;
  clicks: number;
  views: number;
  createdBy: string;
  createdAt: string;
}

const mockSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Fresh Produce Delivered in 10 Mins",
    subtitle: "Farm-fresh vegetables & fruits at your doorstep",
    imageUrl: "/images/hero/fresh-produce.jpg",
    ctaText: "Shop Now",
    ctaLink: "/category/fresh-produce",
    order: 1,
    status: "Active",
    startDate: "Jun 1, 2026",
    endDate: "Jul 15, 2026",
    clicks: 28450,
    views: 189200,
    createdBy: "Admin",
    createdAt: "May 30, 2026",
  },
  {
    id: "2",
    title: "BigBasket Prices, Blinkit Speed",
    subtitle: "Best of both worlds — now at your fingertips",
    imageUrl: "/images/hero/best-prices.jpg",
    ctaText: "Explore Deals",
    ctaLink: "/offers",
    order: 2,
    status: "Active",
    startDate: "Jun 10, 2026",
    endDate: "Jul 10, 2026",
    clicks: 19200,
    views: 145600,
    createdBy: "Admin",
    createdAt: "Jun 8, 2026",
  },
  {
    id: "3",
    title: "Monsoon Special: Immunity Boosters",
    subtitle: "Stay healthy this rainy season with 20% off",
    imageUrl: "/images/hero/monsoon.jpg",
    ctaText: "Get 20% Off",
    ctaLink: "/category/immunity",
    order: 3,
    status: "Scheduled",
    scheduledDate: "Jul 1, 2026",
    startDate: "Jul 1, 2026",
    endDate: "Aug 15, 2026",
    clicks: 0,
    views: 0,
    createdBy: "Admin",
    createdAt: "Jun 25, 2026",
  },
];

export default function HeroSliderPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSlides = mockSlides.filter(slide =>
    slide.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                CMS / Hero Slider
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Hero Slider
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage the main hero carousel on the homepage. Add, reorder, and schedule slides with CTAs, images, and timing.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                Add Slide
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

        {/* Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="border-b border-[#e8e8e8] p-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Search slides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Order</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Slide</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Schedule</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Performance</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredSlides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-black text-[#1a1a1a]">#{slide.order}</span>
                        <div className="flex flex-col ml-1">
                          <button className="p-0.5 text-[#999] hover:text-[#0c831f]"><ArrowUp className="w-3 h-3" /></button>
                          <button className="p-0.5 text-[#999] hover:text-[#0c831f]"><ArrowDown className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-12 rounded-lg bg-gradient-to-br from-[#fff0f6] to-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                          <Image className="w-5 h-5 text-[#0c831f]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{slide.title}</p>
                          <p className="text-xs text-[#666]">{slide.subtitle}</p>
                          <p className="text-xs text-[#0c831f] font-semibold mt-0.5">{slide.ctaText} →</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusStyle(slide.status)}`}>
                        {slide.status === "Active" ? <ToggleRight className="w-3 h-3" /> :
                         slide.status === "Scheduled" ? <CalendarClock className="w-3 h-3" /> :
                         <ToggleLeft className="w-3 h-3" />}
                        {slide.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <p className="text-[#1a1a1a] font-medium">{slide.startDate}</p>
                        <p className="text-xs text-[#999]">to {slide.endDate}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <p className="text-[#1a1a1a] font-medium">{slide.clicks.toLocaleString("en-US")} clicks</p>
                        <p className="text-xs text-[#999]">{slide.views.toLocaleString("en-US")} views</p>
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
