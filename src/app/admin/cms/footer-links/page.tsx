"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Search,
  Link2,
  Edit3,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface FooterLink {
  id: string;
  label: string;
  url: string;
  group: "Company" | "Support" | "Legal" | "Social" | "Categories";
  order: number;
  status: "Active" | "Inactive";
  opensInNewTab: boolean;
  lastEdited: string;
  createdBy: string;
}

const mockLinks: FooterLink[] = [
  { id: "1", label: "About Us", url: "/about", group: "Company", order: 1, status: "Active", opensInNewTab: false, lastEdited: "1 day ago", createdBy: "Admin" },
  { id: "2", label: "Careers", url: "/careers", group: "Company", order: 2, status: "Active", opensInNewTab: false, lastEdited: "3 days ago", createdBy: "Admin" },
  { id: "3", label: "Press & Media", url: "/press", group: "Company", order: 3, status: "Active", opensInNewTab: false, lastEdited: "1 week ago", createdBy: "Admin" },
  { id: "4", label: "Help Center", url: "/help", group: "Support", order: 1, status: "Active", opensInNewTab: false, lastEdited: "2 days ago", createdBy: "Admin" },
  { id: "5", label: "Contact Us", url: "/contact", group: "Support", order: 2, status: "Active", opensInNewTab: false, lastEdited: "5 days ago", createdBy: "Admin" },
  { id: "6", label: "Shipping Information", url: "/shipping", group: "Support", order: 3, status: "Active", opensInNewTab: false, lastEdited: "1 week ago", createdBy: "Admin" },
  { id: "7", label: "Return Policy", url: "/returns", group: "Support", order: 4, status: "Active", opensInNewTab: false, lastEdited: "2 weeks ago", createdBy: "Admin" },
  { id: "8", label: "Terms of Service", url: "/terms", group: "Legal", order: 1, status: "Active", opensInNewTab: false, lastEdited: "1 month ago", createdBy: "Admin" },
  { id: "9", label: "Privacy Policy", url: "/privacy", group: "Legal", order: 2, status: "Active", opensInNewTab: false, lastEdited: "1 month ago", createdBy: "Admin" },
  { id: "10", label: "Cookie Policy", url: "/cookies", group: "Legal", order: 3, status: "Active", opensInNewTab: false, lastEdited: "1 month ago", createdBy: "Admin" },
  { id: "11", label: "Facebook", url: "https://facebook.com/fmcg", group: "Social", order: 1, status: "Active", opensInNewTab: true, lastEdited: "1 week ago", createdBy: "Admin" },
  { id: "12", label: "Instagram", url: "https://instagram.com/fmcg", group: "Social", order: 2, status: "Inactive", opensInNewTab: true, lastEdited: "2 weeks ago", createdBy: "Admin" },
];

const groupColors: Record<string, string> = {
  Company: "bg-[#e8f5e9] text-[#0c831f]",
  Support: "bg-[#eff6ff] text-[#2563eb]",
  Legal: "bg-[#fff0f6] text-[#ff4f8b]",
  Social: "bg-[#f3e8ff] text-[#9333ea]",
  Categories: "bg-[#fffbeb] text-[#d97706]",
};

export default function FooterLinksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");

  const filteredLinks = mockLinks.filter(link => {
    const matchesSearch = link.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = groupFilter === "all" || link.group === groupFilter;
    return matchesSearch && matchesGroup;
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                CMS / Footer Links
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Footer Links
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage all links displayed in the footer section — company info, support pages, legal documents, and social media links.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                Add Link
              </button>
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
                placeholder="Search links by label or URL..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none"
              >
                <option value="all">All Groups</option>
                <option value="Company">Company</option>
                <option value="Support">Support</option>
                <option value="Legal">Legal</option>
                <option value="Social">Social</option>
                <option value="Categories">Categories</option>
              </select>
              <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
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
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">#</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Label</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">URL</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Group</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Status</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#666]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e8e8]">
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-[#f9fafb] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-[#666]">{link.order}</span>
                        <div className="flex flex-col ml-0.5">
                          <button className="p-0.5 text-[#999] hover:text-[#0c831f]"><ArrowUp className="w-2.5 h-2.5" /></button>
                          <button className="p-0.5 text-[#999] hover:text-[#0c831f]"><ArrowDown className="w-2.5 h-2.5" /></button>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-[#0c831f]" />
                        <span className="text-sm font-bold text-[#1a1a1a]">{link.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#2563eb] font-medium flex items-center gap-1">
                        {link.url}
                        {link.opensInNewTab && <ExternalLink className="w-3 h-3" />}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${groupColors[link.group]}`}>
                        {link.group}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        link.status === "Active" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f6f7f6] text-[#999]"
                      }`}>
                        {link.status === "Active" ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
                        {link.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb] transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="rounded-lg p-2 text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
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
