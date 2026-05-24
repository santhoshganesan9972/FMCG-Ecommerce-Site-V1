"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  RefreshCw,
  Edit3,
  Globe,
  Clock,
  History,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface TermsVersion {
  id: string;
  version: string;
  title: string;
  content: string;
  status: "Current" | "Previous" | "Draft";
  effectiveDate: string;
  publishedAt: string;
  updatedBy: string;
  changes: string;
  sections: { title: string; content: string }[];
}

const mockTerms: TermsVersion[] = [
  {
    id: "1",
    version: "v3.2",
    title: "Terms & Conditions",
    content: "These Terms & Conditions govern your use of FMCG Commerce's platform and services.",
    status: "Current",
    effectiveDate: "Jun 1, 2026",
    publishedAt: "Jun 1, 2026",
    updatedBy: "Legal Team",
    changes: "Updated data processing clauses and user rights per GDPR compliance.",
    sections: [
      { title: "1. Acceptance of Terms", content: "By accessing and using FMCG Commerce, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services." },
      { title: "2. User Registration", content: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials." },
      { title: "3. Order & Delivery", content: "Orders are subject to availability. We reserve the right to cancel orders in case of pricing errors or stock unavailability. Delivery times are estimates and not guaranteed." },
      { title: "4. Pricing & Payments", content: "All prices are in INR and include applicable taxes. Payment must be made at the time of ordering unless COD option is selected." },
      { title: "5. Returns & Refunds", content: "Returns are accepted within 24 hours of delivery for damaged or incorrect items. Refunds will be processed within 5-7 business days." },
      { title: "6. Privacy & Data", content: "We collect and process personal data as outlined in our Privacy Policy. We implement industry-standard security measures to protect your information." },
      { title: "7. Limitation of Liability", content: "FMCG Commerce shall not be liable for indirect, incidental, or consequential damages arising from the use of our services." },
      { title: "8. Modifications", content: "We reserve the right to modify these terms at any time. Users will be notified of material changes via email or platform notification." },
    ],
  },
  {
    id: "2",
    version: "v3.1",
    title: "Terms & Conditions",
    content: "Previous version with standard e-commerce terms.",
    status: "Previous",
    effectiveDate: "Mar 1, 2026",
    publishedAt: "Mar 1, 2026",
    updatedBy: "Legal Team",
    changes: "Standard quarterly review and update.",
    sections: [
      { title: "1. Acceptance of Terms", content: "By accessing and using FMCG Commerce, you agree to be bound by these Terms & Conditions." },
      { title: "2. User Registration", content: "You must provide accurate information when creating an account." },
      { title: "3. Order & Delivery", content: "Orders are subject to availability and delivery times are estimates." },
      { title: "4. Pricing & Payments", content: "All prices are in INR and include applicable taxes." },
      { title: "5. Returns & Refunds", content: "Returns are accepted within 24 hours for damaged items." },
    ],
  },
  {
    id: "3",
    version: "v3.0",
    title: "Terms & Conditions",
    content: "Legacy version with original terms.",
    status: "Previous",
    effectiveDate: "Jan 1, 2026",
    publishedAt: "Jan 1, 2026",
    updatedBy: "Founding Team",
    changes: "Initial public launch version.",
    sections: [
      { title: "1. Acceptance of Terms", content: "By using FMCG Commerce, you agree to these terms." },
      { title: "2. Orders", content: "Orders are subject to availability." },
    ],
  },
];

const legalPages = [
  { title: "Terms & Conditions", slug: "/terms", status: "Current", version: "v3.2", updated: "Jun 1, 2026" },
  { title: "Privacy Policy", slug: "/privacy", status: "Current", version: "v2.4", updated: "Jun 1, 2026" },
  { title: "Cookie Policy", slug: "/cookies", status: "Current", version: "v1.1", updated: "May 15, 2026" },
  { title: "Shipping Policy", slug: "/shipping", status: "Current", version: "v2.0", updated: "Apr 20, 2026" },
  { title: "Return Policy", slug: "/returns", status: "Current", version: "v2.2", updated: "Mar 10, 2026" },
];

export default function TermsPage() {
  const [activeVersion, setActiveVersion] = useState(mockTerms[0].id);

  const current = mockTerms.find(t => t.id === activeVersion)!;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                CMS / Legal
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Terms & Conditions
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage legal documents including Terms & Conditions, Privacy Policy, and other compliance pages. Track versions and publish updates.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Edit3 className="w-4 h-4" />
                Edit Current Version
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Legal Pages Status */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {legalPages.map((page) => (
            <div key={page.title} className="rounded-xl border border-[#e8e8e8] bg-white p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="w-4 h-4 text-[#0c831f]" />
                <span className="text-xs font-bold text-[#1a1a1a] truncate">{page.title}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#0c831f] font-bold">{page.version}</span>
                <span className="bg-[#e8f5e9] text-[#0c831f] px-1.5 py-0.5 rounded-full text-[10px] font-bold">{page.status}</span>
              </div>
              <p className="text-[10px] text-[#999] mt-1">Updated {page.updated}</p>
            </div>
          ))}
        </div>

        {/* Version Selector & Content */}
        <div className="grid gap-4 lg:grid-cols-4">
          {/* Version sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f] mb-3">Version History</p>
              <div className="space-y-2">
                {mockTerms.map((version) => (
                  <button
                    key={version.id}
                    onClick={() => setActiveVersion(version.id)}
                    className={`w-full text-left rounded-xl p-3 transition-all ${
                      activeVersion === version.id
                        ? "bg-[#e8f5e9] border border-[#0c831f]/30"
                        : "bg-[#f9fafb] border border-transparent hover:border-[#e8e8e8]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-black text-sm ${
                        version.status === "Current" ? "text-[#0c831f]" : "text-[#1a1a1a]"
                      }`}>
                        {version.version}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        version.status === "Current" ? "bg-[#e8f5e9] text-[#0c831f]" :
                        version.status === "Draft" ? "bg-[#fef3c7] text-[#d97706]" :
                        "bg-[#f6f7f6] text-[#999]"
                      }`}>
                        {version.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#999]">{version.effectiveDate}</p>
                    <p className="text-[10px] text-[#666] mt-1 line-clamp-2">{version.changes}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
              <div className="border-b border-[#e8e8e8] p-5 bg-[#fafafa]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-black text-[#1a1a1a]">{current.title}</h2>
                      <span className="bg-[#0c831f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{current.version}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#666]">
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" />Effective: {current.effectiveDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Published: {current.publishedAt}</span>
                      <span className="flex items-center gap-1"><History className="w-3 h-3" />By: {current.updatedBy}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-[#0c831f] bg-[#e8f5e9] px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Live
                    </span>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-[#fff0f6] rounded-xl border border-[#ff4f8b]/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#ff4f8b] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#ff4f8b]">What's Changed:</p>
                      <p className="text-xs text-[#666]">{current.changes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-6">
                {current.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-black text-[#1a1a1a] mb-2">{section.title}</h3>
                    <p className="text-sm text-[#666] leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
