"use client";

import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import {
  Image,
  Layout,
  Link2,
  Newspaper,
  HelpCircle,
  FileSpreadsheet,
  ShieldCheck,
  CalendarClock,
  Plus,
  RefreshCw,
  Download,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const cmsSections = [
  {
    icon: Image,
    label: "Homepage Banners",
    desc: "Manage promotional banners on the homepage",
    href: "/admin/cms/banners",
    count: 4,
    bg: "bg-[#fff0f6]",
    text: "text-[#ff4f8b]",
  },
  {
    icon: Image,
    label: "Hero Slider",
    desc: "Hero carousel images and content",
    href: "/admin/cms/hero-slider",
    count: 3,
    bg: "bg-[#e8f5e9]",
    text: "text-[#0c831f]",
  },
  {
    icon: Layout,
    label: "Landing Pages",
    desc: "Custom landing page content",
    href: "/admin/cms/landing-pages",
    count: 5,
    bg: "bg-[#eff6ff]",
    text: "text-[#2563eb]",
  },
  {
    icon: Link2,
    label: "Footer Links",
    desc: "Footer navigation and legal links",
    href: "/admin/cms/footer-links",
    count: 12,
    bg: "bg-[#fffbeb]",
    text: "text-[#d97706]",
  },
  {
    icon: Newspaper,
    label: "Blogs",
    desc: "Blog articles and posts",
    href: "/admin/cms/blogs",
    count: 8,
    bg: "bg-[#f3e8ff]",
    text: "text-[#9333ea]",
  },
  {
    icon: HelpCircle,
    label: "FAQ",
    desc: "Frequently asked questions",
    href: "/admin/cms/faq",
    count: 15,
    bg: "bg-[#fce7f3]",
    text: "text-[#db2777]",
  },
  {
    icon: FileSpreadsheet,
    label: "Terms & Conditions",
    desc: "Terms of service and legal pages",
    href: "/admin/cms/terms",
    count: 1,
    bg: "bg-[#ecfdf5]",
    text: "text-[#059669]",
  },
  {
    icon: ShieldCheck,
    label: "Privacy Policy",
    desc: "Privacy policy and data handling",
    href: "/admin/cms/privacy-policy",
    count: 1,
    bg: "bg-[#e0f2fe]",
    text: "text-[#0284c7]",
  },
];

const cmsStats = [
  { title: "Total Pages", value: "49", growth: "+5", subtitle: "Across all sections", icon: FileSpreadsheet, color: "text-[#0c831f]" },
  { title: "Published", value: "42", growth: "+8", subtitle: "Live on storefront", icon: CheckCircle2, color: "text-[#2563eb]" },
  { title: "Drafts", value: "7", growth: "+2", subtitle: "Pending review", icon: Clock, color: "text-[#d97706]" },
  { title: "Scheduled", value: "3", growth: "+1", subtitle: "Queued for publish", icon: CalendarClock, color: "text-[#ff4f8b]" },
];

const recentUpdates = [
  { section: "Blogs", item: "10 Essential Grocery Tips for Every Home", status: "Published", time: "2 hours ago", user: "Admin" },
  { section: "Homepage Banners", item: "Summer Sale - 30% Off", status: "Scheduled", time: "5 hours ago", user: "Admin" },
  { section: "FAQ", item: "Updated Shipping Policy FAQ", status: "Draft", time: "1 day ago", user: "Admin" },
  { section: "Hero Slider", item: "New Arrivals Banner", status: "Published", time: "2 days ago", user: "Admin" },
  { section: "Privacy Policy", item: "Updated Data Processing Terms", status: "Draft", time: "3 days ago", user: "Admin" },
];

export default function CMSOverviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Content Management
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                CMS Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage all your storefront content — banners, landing pages, blogs, footer links, legal pages, and more. Create, edit, schedule, and publish content across your platform.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/cms/schedule">
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                  <CalendarClock className="w-4 h-4" />
                  Schedule Publish
                </button>
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {cmsStats.map((stat) => (
            <div key={stat.title} className="rounded-xl border border-[#e8e8e8] bg-white p-4">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className={`text-xs font-black uppercase tracking-wide ${stat.color}`}>
                  {stat.title}
                </span>
              </div>
              <p className="mt-2 text-2xl font-black text-[#1a1a1a]">{stat.value}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-bold text-[#0c831f]">{stat.growth}</span>
                <span className="text-xs text-[#999]">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CMS Sections Grid */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 mb-5">
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Content Sections
            </p>
            <h2 className="text-lg font-black text-[#1a1a1a]">All Content Management</h2>
            <p className="text-xs text-[#666]">Click any section to manage its content</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cmsSections.map((section) => (
              <Link key={section.label} href={section.href}>
                <div className="cursor-pointer rounded-xl border border-[#e8e8e8] p-4 transition-all hover:border-[#0c831f]/30 hover:shadow-md hover:-translate-y-0.5 duration-200">
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${section.bg} ${section.text}`}>
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-[#1a1a1a]">{section.label}</p>
                    <span className="text-xs font-bold text-[#0c831f] bg-[#e8f5e9] rounded-full px-2 py-0.5">
                      {section.count}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#999]">{section.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Activity
              </p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Recent Updates</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Section</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Last Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#666]">By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {recentUpdates.map((update, idx) => (
                  <tr key={idx} className="hover:bg-[#f9fafb]">
                    <td className="px-4 py-3 text-sm font-bold text-[#1a1a1a]">{update.section}</td>
                    <td className="px-4 py-3 text-sm text-[#1a1a1a]">{update.item}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        update.status === "Published" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        update.status === "Scheduled" ? "bg-[#fff0f6] text-[#ff4f8b]" :
                        "bg-[#fef3c7] text-[#d97706]"
                      }`}>
                        {update.status === "Published" ? <CheckCircle2 className="w-3 h-3" /> :
                         update.status === "Scheduled" ? <CalendarClock className="w-3 h-3" /> :
                         <Clock className="w-3 h-3" />}
                        {update.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#666]">{update.time}</td>
                    <td className="px-4 py-3 text-sm text-[#666]">{update.user}</td>
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
