"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Search,
  MoreVertical,
  Layout,
  Edit3,
  Trash2,
  CalendarClock,
  Eye,
  Globe,
  Copy,
} from "lucide-react";

interface LandingPage {
  id: string;
  title: string;
  slug: string;
  description: string;
  template: string;
  status: "Published" | "Draft" | "Scheduled";
  scheduledDate?: string;
  lastEdited: string;
  views: number;
  conversions: number;
  createdBy: string;
  createdAt: string;
}

const mockPages: LandingPage[] = [
  {
    id: "1",
    title: "Summer Sale 2026",
    slug: "summer-sale-2026",
    description: "Seasonal promotional landing page with all summer deals",
    template: "Campaign",
    status: "Published",
    lastEdited: "2 hours ago",
    views: 45200,
    conversions: 3840,
    createdBy: "Admin",
    createdAt: "May 25, 2026",
  },
  {
    id: "2",
    title: "New User Welcome",
    slug: "welcome-new-users",
    description: "First-time buyer offers and onboarding flow",
    template: "Onboarding",
    status: "Published",
    lastEdited: "1 day ago",
    views: 89200,
    conversions: 12400,
    createdBy: "Admin",
    createdAt: "Apr 15, 2026",
  },
  {
    id: "3",
    title: "Diwali Mega Sale",
    slug: "diwali-mega-sale",
    description: "Festival season mega campaign with special bundles",
    template: "Campaign",
    status: "Scheduled",
    scheduledDate: "Oct 15, 2026",
    lastEdited: "3 days ago",
    views: 0,
    conversions: 0,
    createdBy: "Admin",
    createdAt: "Jun 20, 2026",
  },
  {
    id: "4",
    title: "Organic Store Launch",
    slug: "organic-store-launch",
    description: "New organic product line introduction page",
    template: "Product Launch",
    status: "Draft",
    lastEdited: "1 week ago",
    views: 0,
    conversions: 0,
    createdBy: "Admin",
    createdAt: "Jun 10, 2026",
  },
  {
    id: "5",
    title: "Refer & Earn",
    slug: "refer-and-earn",
    description: "Customer referral program landing page",
    template: "Utility",
    status: "Draft",
    lastEdited: "2 weeks ago",
    views: 0,
    conversions: 0,
    createdBy: "Admin",
    createdAt: "May 30, 2026",
  },
];

export default function LandingPagesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPages = mockPages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Published": return "bg-[#e8f5e9] text-[#0c831f]";
      case "Scheduled": return "bg-[#fff0f6] text-[#ff4f8b]";
      default: return "bg-[#fef3c7] text-[#d97706]";
    }
  };

  const getTemplateColor = (template: string) => {
    switch (template) {
      case "Campaign": return "bg-[#fff0f6] text-[#ff4f8b]";
      case "Onboarding": return "bg-[#e8f5e9] text-[#0c831f]";
      case "Product Launch": return "bg-[#eff6ff] text-[#2563eb]";
      default: return "bg-[#f3e8ff] text-[#9333ea]";
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
                CMS / Landing Pages
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Landing Pages
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Create and manage custom landing pages for campaigns, product launches, seasonal events, and more.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                Create Page
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
                placeholder="Search pages by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Templates</option>
                <option>Campaign</option>
                <option>Onboarding</option>
                <option>Product Launch</option>
                <option>Utility</option>
              </select>
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Status</option>
                <option>Published</option>
                <option>Draft</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Page</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Template</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Last Edited</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Performance</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eff6ff] to-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                          <Layout className="w-5 h-5 text-[#2563eb]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{page.title}</p>
                          <p className="text-xs text-[#666]">/{page.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${getTemplateColor(page.template)}`}>
                        {page.template}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusStyle(page.status)}`}>
                        {page.status === "Published" ? <Globe className="w-3 h-3" /> :
                         page.status === "Scheduled" ? <CalendarClock className="w-3 h-3" /> :
                         <Copy className="w-3 h-3" />}
                        {page.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#666]">{page.lastEdited}</td>
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <p className="text-[#1a1a1a] font-medium">{page.views.toLocaleString("en-US")} views</p>
                        <p className="text-xs text-[#999]">{page.conversions.toLocaleString("en-US")} conversions</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f] transition-colors" title="Preview">
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
