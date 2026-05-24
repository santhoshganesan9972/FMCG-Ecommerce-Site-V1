"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Search,
  MoreVertical,
  HelpCircle,
  Edit3,
  Trash2,
  CalendarClock,
  Globe,
  Copy,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: "Published" | "Draft" | "Scheduled";
  scheduledDate?: string;
  helpful: number;
  notHelpful: number;
  lastEdited: string;
}

const mockFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How does FMCG Commerce work?",
    answer: "FMCG Commerce is an ultra-fast grocery delivery service. Simply browse our catalog, add items to your cart, and checkout. We deliver fresh groceries to your doorstep in under 10 minutes.",
    category: "General",
    order: 1,
    status: "Published",
    helpful: 234,
    notHelpful: 12,
    lastEdited: "1 week ago",
  },
  {
    id: "2",
    question: "What is the delivery fee?",
    answer: "We offer free delivery on orders above ₹199. For orders below ₹199, a delivery fee of ₹29 is applied. Special promotional periods may have different fee structures.",
    category: "Delivery",
    order: 1,
    status: "Published",
    helpful: 189,
    notHelpful: 8,
    lastEdited: "2 weeks ago",
  },
  {
    id: "3",
    question: "How long does delivery take?",
    answer: "We deliver within 10 minutes for most areas in our service zone. During peak hours or inclement weather, delivery may take up to 20 minutes. You can track your order in real-time.",
    category: "Delivery",
    order: 2,
    status: "Published",
    helpful: 312,
    notHelpful: 15,
    lastEdited: "1 week ago",
  },
  {
    id: "4",
    question: "What areas do you serve?",
    answer: "We currently operate in major metro cities including Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, and Pune. We're expanding to 15 more cities by the end of 2026.",
    category: "General",
    order: 2,
    status: "Published",
    helpful: 156,
    notHelpful: 23,
    lastEdited: "3 days ago",
  },
  {
    id: "5",
    question: "Can I modify or cancel my order?",
    answer: "Yes, you can modify or cancel your order within 2 minutes of placing it. After that, the order is processed and dispatched. Please contact support for any changes after this window.",
    category: "Orders",
    order: 1,
    status: "Published",
    helpful: 278,
    notHelpful: 19,
    lastEdited: "5 days ago",
  },
  {
    id: "6",
    question: "What is your return policy?",
    answer: "If any item is damaged, expired, or incorrect, we'll replace it free of cost within 24 hours. Simply file a return request via the app or contact our support team.",
    category: "Returns",
    order: 1,
    status: "Published",
    helpful: 145,
    notHelpful: 11,
    lastEdited: "1 week ago",
  },
  {
    id: "7",
    question: "Do you offer subscription plans?",
    answer: "Yes! We offer subscription plans including Weekly, Monthly, and Annual passes. Subscribers enjoy free delivery on all orders, exclusive discounts, and priority support.",
    category: "Subscription",
    order: 1,
    status: "Scheduled",
    scheduledDate: "Jul 5, 2026",
    helpful: 0,
    notHelpful: 0,
    lastEdited: "Today",
  },
  {
    id: "8",
    question: "How do I apply a coupon code?",
    answer: "You can apply coupon codes during checkout in the 'Apply Coupon' section. Enter your code and the discount will be automatically applied to your order total.",
    category: "Orders",
    order: 2,
    status: "Draft",
    helpful: 0,
    notHelpful: 0,
    lastEdited: "2 days ago",
  },
  {
    id: "9",
    question: "What payment methods do you accept?",
    answer: "We accept UPI (GPay, PhonePe, PayTM), credit/debit cards, net banking, and cash on delivery. We also support payment via Reward Points for loyalty members.",
    category: "Payments",
    order: 1,
    status: "Published",
    helpful: 167,
    notHelpful: 7,
    lastEdited: "1 week ago",
  },
  {
    id: "10",
    question: "Can I schedule a delivery for later?",
    answer: "Currently, we specialize in instant delivery. However, you can place an order in advance and we'll deliver it at your preferred time slot, subject to availability.",
    category: "Delivery",
    order: 3,
    status: "Draft",
    helpful: 0,
    notHelpful: 0,
    lastEdited: "1 day ago",
  },
  {
    id: "11",
    question: "Is there a minimum order value?",
    answer: "There is no minimum order value. However, orders below ₹199 may attract a small delivery fee as mentioned above.",
    category: "General",
    order: 3,
    status: "Published",
    helpful: 198,
    notHelpful: 9,
    lastEdited: "2 weeks ago",
  },
  {
    id: "12",
    question: "How do I contact customer support?",
    answer: "You can reach us via in-app chat, email at support@fmcg.com, or call us at 1800-123-4567. Our support team is available 24/7.",
    category: "Support",
    order: 1,
    status: "Published",
    helpful: 89,
    notHelpful: 4,
    lastEdited: "3 weeks ago",
  },
  {
    id: "13",
    question: "Do you sell organic products?",
    answer: "Yes! We have a dedicated 'Organic' section with a wide range of certified organic fruits, vegetables, dairy, and pantry staples.",
    category: "Products",
    order: 1,
    status: "Published",
    helpful: 123,
    notHelpful: 6,
    lastEdited: "1 week ago",
  },
  {
    id: "14",
    question: "Can I order from multiple stores?",
    answer: "Yes, our platform aggregates from multiple sellers and dark stores. Your order is consolidated and dispatched from the nearest available location for fastest delivery.",
    category: "General",
    order: 4,
    status: "Published",
    helpful: 67,
    notHelpful: 3,
    lastEdited: "5 days ago",
  },
  {
    id: "15",
    question: "How does the loyalty program work?",
    answer: "Earn 1 point for every ₹10 spent. Redeem points for discounts on future purchases. Silver, Gold, and Platinum tiers unlock additional benefits like free delivery and exclusive deals.",
    category: "Subscription",
    order: 2,
    status: "Draft",
    helpful: 0,
    notHelpful: 0,
    lastEdited: "3 days ago",
  },
];

const categories = ["All", "General", "Delivery", "Orders", "Returns", "Subscription", "Payments", "Support", "Products"];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || faq.category === categoryFilter;
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
                CMS / FAQ
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                FAQ Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage frequently asked questions across categories. Create, reorder, and publish FAQs to help customers find answers quickly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Plus className="w-4 h-4" />
                Add FAQ
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

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#0c831f] uppercase tracking-wide">Total FAQs</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockFAQs.length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#0c831f] uppercase tracking-wide">Published</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockFAQs.filter(f => f.status === "Published").length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#d97706] uppercase tracking-wide">Drafts</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockFAQs.filter(f => f.status === "Draft").length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <p className="text-xs font-bold text-[#ff4f8b] uppercase tracking-wide">Scheduled</p>
            <p className="mt-1 text-2xl font-black text-[#1a1a1a]">{mockFAQs.filter(f => f.status === "Scheduled").length}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input
                type="text"
                placeholder="Search FAQs..."
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

        {/* FAQ List */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
          <div className="divide-y divide-[#e8e8e8]">
            {filteredFAQs.map((faq, idx) => (
              <div key={faq.id} className={`p-5 ${idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#999]">#{faq.order}</span>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${getStatusStyle(faq.status)}`}>
                        {faq.status === "Published" ? <Globe className="w-2.5 h-2.5 mr-0.5" /> :
                         faq.status === "Scheduled" ? <CalendarClock className="w-2.5 h-2.5 mr-0.5" /> :
                         <Copy className="w-2.5 h-2.5 mr-0.5" />}
                        {faq.status}
                      </span>
                      <span className="text-xs font-medium text-[#999] bg-[#f6f7f6] rounded-full px-2 py-0.5">
                        {faq.category}
                      </span>
                      {faq.scheduledDate && (
                        <span className="text-xs text-[#ff4f8b] font-medium">
                          📅 {faq.scheduledDate}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#1a1a1a] flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0c831f] mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#666] ml-6">{faq.answer}</p>
                    <div className="mt-2 ml-6 flex items-center gap-3 text-xs text-[#999]">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{faq.helpful} found helpful</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{faq.notHelpful} not helpful</span>
                      <span>Updated {faq.lastEdited}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="flex flex-col">
                      <button className="p-1 text-[#999] hover:text-[#0c831f]"><ArrowUp className="w-3 h-3" /></button>
                      <button className="p-1 text-[#999] hover:text-[#0c831f]"><ArrowDown className="w-3 h-3" /></button>
                    </div>
                    <button className="rounded-lg p-2 text-[#666] hover:bg-[#eff6ff] hover:text-[#2563eb] transition-colors" title="Edit">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="rounded-lg p-2 text-[#666] hover:bg-[#fffbeb] hover:text-[#d97706] transition-colors" title="Schedule">
                      <CalendarClock className="w-4 h-4" />
                    </button>
                    <button className="rounded-lg p-2 text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
