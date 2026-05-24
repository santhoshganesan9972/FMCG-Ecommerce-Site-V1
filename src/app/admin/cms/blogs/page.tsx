"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Search,
  Newspaper,
  Edit3,
  Trash2,
  CalendarClock,
  Eye,
  Globe,
  Copy,
  Clock,
  Tag,
  User,
  MessageSquare,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: "Published" | "Draft" | "Scheduled";
  scheduledDate?: string;
  publishedAt: string;
  views: number;
  comments: number;
  featured: boolean;
  imageUrl: string;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Essential Grocery Shopping Tips for Every Indian Home",
    slug: "10-essential-grocery-shopping-tips",
    excerpt: "Smart shopping strategies to save money and time on your weekly grocery runs.",
    author: "Priya Sharma",
    category: "Shopping Tips",
    tags: ["budget", "tips", "grocery"],
    status: "Published",
    publishedAt: "Jun 15, 2026",
    views: 12500,
    comments: 48,
    featured: true,
    imageUrl: "/images/blog/grocery-tips.jpg",
  },
  {
    id: "2",
    title: "The Ultimate Guide to Organic Vegetables in India",
    slug: "ultimate-guide-organic-vegetables",
    excerpt: "Everything you need to know about buying and storing organic vegetables.",
    author: "Rajesh Kumar",
    category: "Health & Wellness",
    tags: ["organic", "vegetables", "health"],
    status: "Published",
    publishedAt: "Jun 10, 2026",
    views: 9800,
    comments: 32,
    featured: true,
    imageUrl: "/images/blog/organic-guide.jpg",
  },
  {
    id: "3",
    title: "Monsoon Diet: Foods to Boost Your Immunity",
    slug: "monsoon-diet-immunity-foods",
    excerpt: "Stay healthy this rainy season with these immunity-boosting foods and remedies.",
    author: "Dr. Ananya Patel",
    category: "Health & Wellness",
    tags: ["monsoon", "immunity", "diet", "health"],
    status: "Published",
    publishedAt: "Jun 8, 2026",
    views: 15200,
    comments: 56,
    featured: false,
    imageUrl: "/images/blog/monsoon-diet.jpg",
  },
  {
    id: "4",
    title: "How to Stock Your Pantry for Quick Weeknight Meals",
    slug: "stock-pantry-quick-weeknight-meals",
    excerpt: "Save time and reduce stress with a well-stocked pantry for last-minute dinners.",
    author: "Priya Sharma",
    category: "Cooking Tips",
    tags: ["pantry", "cooking", "tips", "quick-meals"],
    status: "Scheduled",
    scheduledDate: "Jul 1, 2026",
    publishedAt: "-",
    views: 0,
    comments: 0,
    featured: false,
    imageUrl: "/images/blog/pantry-stocking.jpg",
  },
  {
    id: "5",
    title: "Top 10 Snacks for Your Next Movie Night",
    slug: "top-10-snacks-movie-night",
    excerpt: "Curated list of the best snacks to enjoy during your next movie marathon.",
    author: "Amit Singh",
    category: "Lifestyle",
    tags: ["snacks", "movie-night", "entertainment"],
    status: "Draft",
    publishedAt: "-",
    views: 0,
    comments: 0,
    featured: false,
    imageUrl: "/images/blog/movie-snacks.jpg",
  },
  {
    id: "6",
    title: "Festival Special: Diwali Sweets and Snacks Guide",
    slug: "diwali-sweets-snacks-guide",
    excerpt: "Complete guide to traditional Diwali sweets and snacks available for delivery.",
    author: "Rajesh Kumar",
    category: "Festivals",
    tags: ["diwali", "festival", "sweets", "snacks"],
    status: "Draft",
    publishedAt: "-",
    views: 0,
    comments: 0,
    featured: false,
    imageUrl: "/images/blog/diwali-guide.jpg",
  },
  {
    id: "7",
    title: "Zero-Waste Kitchen: A Beginner's Guide",
    slug: "zero-waste-kitchen-beginners-guide",
    excerpt: "Simple steps to reduce kitchen waste and adopt a more sustainable lifestyle.",
    author: "Priya Sharma",
    category: "Sustainability",
    tags: ["sustainability", "zero-waste", "kitchen", "eco-friendly"],
    status: "Draft",
    publishedAt: "-",
    views: 0,
    comments: 0,
    featured: false,
    imageUrl: "/images/blog/zero-waste.jpg",
  },
  {
    id: "8",
    title: "Understanding Food Labels: What to Look For",
    slug: "understanding-food-labels",
    excerpt: "Decode nutrition labels and make informed choices for you and your family.",
    author: "Dr. Ananya Patel",
    category: "Health & Wellness",
    tags: ["food-labels", "nutrition", "health", "education"],
    status: "Draft",
    publishedAt: "-",
    views: 0,
    comments: 0,
    featured: false,
    imageUrl: "/images/blog/food-labels.jpg",
  },
];

const categories = ["All", "Shopping Tips", "Health & Wellness", "Cooking Tips", "Lifestyle", "Festivals", "Sustainability"];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Published": return "bg-[#e8f5e9] text-[#0c831f]";
      case "Scheduled": return "bg-[#fff0f6] text-[#ff4f8b]";
      default: return "bg-[#fef3c7] text-[#d97706]";
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
                CMS / Blogs
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Blog Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Create, edit, and manage blog posts. Schedule publications, track performance, and engage with readers through comments.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                New Post
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

        {/* Stats Strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#0c831f] uppercase tracking-wide">Total Posts</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockPosts.length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#0c831f] uppercase tracking-wide">Published</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockPosts.filter(p => p.status === "Published").length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#d97706] uppercase tracking-wide">Drafts</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockPosts.filter(p => p.status === "Draft").length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#ff4f8b] uppercase tracking-wide">Scheduled</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockPosts.filter(p => p.status === "Scheduled").length}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Search posts by title or excerpt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    categoryFilter === cat
                      ? "bg-[#0c831f] text-white"
                      : "bg-[#f6f7f6] text-[#666] hover:bg-[#e8f5e9] hover:text-[#0c831f]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <div key={post.id} className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              <div className="h-40 bg-gradient-to-br from-[#fff0f6] to-[#e8f5e9] flex items-center justify-center relative">
                <Newspaper className="w-12 h-12 text-[#0c831f]/30" />
                {post.featured && (
                  <span className="absolute top-2 left-2 bg-[#ff4f8b] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                )}
                <span className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${getStatusStyle(post.status)}`}>
                  {post.status === "Published" ? <Globe className="w-2.5 h-2.5" /> :
                   post.status === "Scheduled" ? <CalendarClock className="w-2.5 h-2.5" /> :
                   <Copy className="w-2.5 h-2.5" />}
                  {post.status}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-[#666] mb-2">
                  <Tag className="w-3 h-3" />
                  <span>{post.category}</span>
                  <span className="text-[#ddd]">|</span>
                  <Clock className="w-3 h-3" />
                  <span>{post.status === "Published" ? post.publishedAt : post.scheduledDate || "—"}</span>
                </div>
                <h3 className="text-sm font-black text-[#1a1a1a] line-clamp-2">{post.title}</h3>
                <p className="mt-1 text-xs text-[#666] line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#999]">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#999]">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString("en-US")}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{post.comments}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#e8e8e8] flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[#e8e8e8] py-1.5 text-xs font-bold text-[#2563eb] hover:bg-[#eff6ff] transition-colors">
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </button>
                  <button className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e8e8e8] py-1.5 px-3 text-xs font-bold text-[#d97706] hover:bg-[#fffbeb] transition-colors">
                    <CalendarClock className="w-3 h-3" />
                    Schedule
                  </button>
                  <button className="flex items-center justify-center gap-1.5 rounded-lg border border-[#e8e8e8] py-1.5 px-3 text-xs font-bold text-[#ff4f8b] hover:bg-[#fff0f6] transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
