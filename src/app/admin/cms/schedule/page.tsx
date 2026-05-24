"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  CalendarClock,
  Plus,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Globe,
  Clock,
  Image,
  Newspaper,
  HelpCircle,
  FileSpreadsheet,
  ShieldCheck,
  Layout,
  Link2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ScheduledItem {
  id: string;
  title: string;
  section: string;
  sectionIcon: React.ReactNode;
  type: "Publish" | "Unpublish" | "Update";
  scheduledDate: string;
  scheduledTime: string;
  status: "Scheduled" | "Publishing" | "Published" | "Failed";
  createdBy: string;
  createdAt: string;
}

const sectionIcons: Record<string, React.ReactNode> = {
  "Homepage Banners": <Image className="w-4 h-4" />,
  "Hero Slider": <Image className="w-4 h-4" />,
  "Landing Pages": <Layout className="w-4 h-4" />,
  "Footer Links": <Link2 className="w-4 h-4" />,
  "Blogs": <Newspaper className="w-4 h-4" />,
  "FAQ": <HelpCircle className="w-4 h-4" />,
  "Terms & Conditions": <FileSpreadsheet className="w-4 h-4" />,
  "Privacy Policy": <ShieldCheck className="w-4 h-4" />,
};

const mockSchedule: ScheduledItem[] = [
  {
    id: "1",
    title: "Summer Sale Banner",
    section: "Homepage Banners",
    sectionIcon: <Image className="w-4 h-4" />,
    type: "Publish",
    scheduledDate: "Jul 1, 2026",
    scheduledTime: "09:00 AM",
    status: "Scheduled",
    createdBy: "Admin",
    createdAt: "Jun 25, 2026",
  },
  {
    id: "2",
    title: "Monsoon Special Hero Slide",
    section: "Hero Slider",
    sectionIcon: <Image className="w-4 h-4" />,
    type: "Publish",
    scheduledDate: "Jul 1, 2026",
    scheduledTime: "12:00 AM",
    status: "Scheduled",
    createdBy: "Admin",
    createdAt: "Jun 24, 2026",
  },
  {
    id: "3",
    title: "Diwali Mega Sale Landing Page",
    section: "Landing Pages",
    sectionIcon: <Layout className="w-4 h-4" />,
    type: "Publish",
    scheduledDate: "Oct 15, 2026",
    scheduledTime: "06:00 AM",
    status: "Scheduled",
    createdBy: "Admin",
    createdAt: "Jun 20, 2026",
  },
  {
    id: "4",
    title: "Pantry Stocking Blog Post",
    section: "Blogs",
    sectionIcon: <Newspaper className="w-4 h-4" />,
    type: "Publish",
    scheduledDate: "Jul 1, 2026",
    scheduledTime: "10:00 AM",
    status: "Scheduled",
    createdBy: "Admin",
    createdAt: "Jun 22, 2026",
  },
  {
    id: "5",
    title: "FAQ - Subscription Details",
    section: "FAQ",
    sectionIcon: <HelpCircle className="w-4 h-4" />,
    type: "Publish",
    scheduledDate: "Jul 5, 2026",
    scheduledTime: "02:00 PM",
    status: "Scheduled",
    createdBy: "Admin",
    createdAt: "Jun 23, 2026",
  },
  {
    id: "6",
    title: "Old Summer Banner Deactivation",
    section: "Homepage Banners",
    sectionIcon: <Image className="w-4 h-4" />,
    type: "Unpublish",
    scheduledDate: "Jul 1, 2026",
    scheduledTime: "08:55 AM",
    status: "Scheduled",
    createdBy: "Admin",
    createdAt: "Jun 25, 2026",
  },
];

export default function SchedulePublishPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredItems = mockSchedule.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.section.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-[#fff0f6] text-[#ff4f8b]";
      case "Publishing": return "bg-[#eff6ff] text-[#2563eb]";
      case "Published": return "bg-[#e8f5e9] text-[#0c831f]";
      case "Failed": return "bg-[#fef3c7] text-[#dc2626]";
      default: return "bg-[#f6f7f6] text-[#999]";
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "Publish": return "text-[#0c831f]";
      case "Unpublish": return "text-[#dc2626]";
      default: return "text-[#2563eb]";
    }
  };

  const upcomingItems = mockSchedule.filter(i => i.status === "Scheduled");
  const lastSync = "2 minutes ago";

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                CMS / Publishing
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Schedule Publish
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Plan and schedule content publishing across all CMS sections. Set precise dates and times for content to go live or expire automatically.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                New Schedule
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#ff4f8b] uppercase tracking-wide">Scheduled</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{upcomingItems.filter(i => i.status === "Scheduled").length}</p>
            <p className="text-xs text-[#999]">Pending publish</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#2563eb] uppercase tracking-wide">Publishing Now</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{upcomingItems.filter(i => i.status === "Publishing").length}</p>
            <p className="text-xs text-[#999]">In progress</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#0c831f] uppercase tracking-wide">Published Today</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{upcomingItems.filter(i => i.status === "Published").length}</p>
            <p className="text-xs text-[#999]">Last sync: {lastSync}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#dc2626] uppercase tracking-wide">Failed</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{upcomingItems.filter(i => i.status === "Failed").length}</p>
            <p className="text-xs text-[#999]">Needs attention</p>
          </div>
        </div>

        {/* Upcoming Schedule Timeline */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Timeline</p>
              <h2 className="text-lg font-black text-[#1a1a1a]">Upcoming Schedule</h2>
            </div>
          </div>
          <div className="space-y-0">
            {upcomingItems.slice(0, 4).map((item, idx) => (
              <div key={item.id} className="flex gap-4 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    item.status === "Scheduled" ? "border-[#ff4f8b] bg-[#fff0f6]" :
                    item.status === "Publishing" ? "border-[#2563eb] bg-[#eff6ff]" :
                    "border-[#0c831f] bg-[#e8f5e9]"
                  }`} />
                  {idx < upcomingItems.slice(0, 4).length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#e8e8e8] my-1" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-[#1a1a1a]">{item.title}</p>
                        <span className={`text-xs font-bold ${getTypeStyle(item.type)}`}>
                          [{item.type}]
                        </span>
                      </div>
                      <p className="text-xs text-[#666]">{item.section}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1a1a1a]">{item.scheduledDate}</p>
                      <p className="text-xs text-[#ff4f8b] font-semibold">{item.scheduledTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search & Filter */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Search scheduled items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none"
              >
                <option value="all">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Publishing">Publishing</option>
                <option value="Published">Published</option>
                <option value="Failed">Failed</option>
              </select>
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Sections</option>
                <option>Homepage Banners</option>
                <option>Hero Slider</option>
                <option>Landing Pages</option>
                <option>Footer Links</option>
                <option>Blogs</option>
                <option>FAQ</option>
                <option>Terms & Conditions</option>
                <option>Privacy Policy</option>
              </select>
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Types</option>
                <option>Publish</option>
                <option>Unpublish</option>
                <option>Update</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Item</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Section</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Type</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Scheduled For</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f6f7f6] flex items-center justify-center">
                          {item.sectionIcon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1a1a1a]">{item.title}</p>
                          <p className="text-xs text-[#999]">Created {item.createdAt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#666]">{item.section}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold ${getTypeStyle(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="w-3.5 h-3.5 text-[#ff4f8b]" />
                        <div>
                          <p className="text-sm font-medium text-[#1a1a1a]">{item.scheduledDate}</p>
                          <p className="text-xs text-[#ff4f8b] font-semibold">{item.scheduledTime}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${getStatusStyle(item.status)}`}>
                        {item.status === "Scheduled" ? <Clock className="w-3 h-3" /> :
                         item.status === "Publishing" ? <CalendarClock className="w-3 h-3" /> :
                         item.status === "Published" ? <CheckCircle2 className="w-3 h-3" /> :
                         <XCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb] transition-colors" title="Edit Schedule">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors" title="Cancel">
                          <Trash2 className="w-4 h-4" />
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
        </section>
      </div>
    </DashboardLayout>
  );
}
