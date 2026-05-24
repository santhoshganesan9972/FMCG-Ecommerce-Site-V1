"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import {
  RefreshCw,
  Edit3,
  Globe,
  Clock,
  History,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
} from "lucide-react";

interface PrivacyVersion {
  id: string;
  version: string;
  title: string;
  status: "Current" | "Previous" | "Draft";
  effectiveDate: string;
  publishedAt: string;
  updatedBy: string;
  changes: string;
  sections: { title: string; content: string }[];
}

const mockVersions: PrivacyVersion[] = [
  {
    id: "1",
    version: "v2.4",
    title: "Privacy Policy",
    status: "Current",
    effectiveDate: "Jun 1, 2026",
    publishedAt: "Jun 1, 2026",
    updatedBy: "Legal Team",
    changes: "Updated data retention policies and user rights under DPDP Act 2023.",
    sections: [
      { title: "1. Information We Collect", content: "We collect information you provide directly, including your name, email address, phone number, delivery address, and payment information. We also automatically collect certain technical information when you use our platform, such as device type, IP address, browsing patterns, and location data to facilitate delivery." },
      { title: "2. How We Use Your Information", content: "Your information is used to process orders, deliver products, improve our services, send relevant offers and updates (with your consent), and comply with legal obligations. We do not sell your personal information to third parties." },
      { title: "3. Data Sharing & Disclosure", content: "We may share your information with delivery partners for order fulfillment, payment processors for transaction processing, and service providers who assist in our operations. All third parties are contractually bound to protect your data." },
      { title: "4. Data Retention", content: "We retain your personal data for as long as your account is active or as needed to provide services. After account closure, data is retained for 6 months for legal compliance, then securely deleted." },
      { title: "5. Your Rights", content: "Under the DPDP Act 2023, you have the right to access, correct, delete, or port your data. You can also withdraw consent at any time. Contact our Data Protection Officer at dpo@fmcg.com to exercise these rights." },
      { title: "6. Data Security", content: "We implement AES-256 encryption, secure socket layer (SSL) technology, and regular security audits to protect your data. Our systems are monitored 24/7 for unauthorized access attempts." },
      { title: "7. Cookies & Tracking", content: "We use essential cookies for platform functionality, analytics cookies to improve our service, and marketing cookies (with consent). You can manage cookie preferences in your browser settings." },
      { title: "8. Contact & Grievances", content: "For privacy-related concerns, contact our Grievance Officer at grievance@fmcg.com or call 1800-123-4567. We respond to all queries within 48 hours." },
    ],
  },
  {
    id: "2",
    version: "v2.3",
    title: "Privacy Policy",
    status: "Previous",
    effectiveDate: "Mar 1, 2026",
    publishedAt: "Mar 1, 2026",
    updatedBy: "Legal Team",
    changes: "Standard quarterly review with minor wording updates.",
    sections: [
      { title: "1. Information We Collect", content: "We collect information you provide directly including your name, email, phone number, and delivery address." },
      { title: "2. How We Use Your Information", content: "Your information is used to process orders, deliver products, improve services, and send offers." },
      { title: "3. Data Sharing", content: "We may share your information with delivery partners and payment processors." },
      { title: "4. Data Security", content: "We implement industry-standard security measures to protect your data." },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeVersion, setActiveVersion] = useState(mockVersions[0].id);
  const current = mockVersions.find(v => v.id === activeVersion)!;

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
                Privacy Policy
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Manage your platform's Privacy Policy document. Track version history, review changes, and publish updates in compliance with data protection regulations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
                <Edit3 className="w-4 h-4" />
                Edit Policy
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Compliance Status */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#0c831f] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wide">DPDP Act 2023</span>
            </div>
            <p className="text-lg font-black text-[#1a1a1a]">Compliant</p>
            <p className="text-xs text-[#999]">Last audited Jun 1, 2026</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#2563eb] mb-2">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wide">GDPR</span>
            </div>
            <p className="text-lg font-black text-[#1a1a1a]">Compliant</p>
            <p className="text-xs text-[#999]">EU data subject rights</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#d97706] mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wide">Next Review</span>
            </div>
            <p className="text-lg font-black text-[#1a1a1a]">Sep 1, 2026</p>
            <p className="text-xs text-[#999]">Quarterly review cycle</p>
          </div>
          <div className="rounded-xl border border-[#e8e8e8] bg-white p-4">
            <div className="flex items-center gap-2 text-[#ff4f8b] mb-2">
              <History className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wide">Total Versions</span>
            </div>
            <p className="text-lg font-black text-[#1a1a1a]">{mockVersions.length}</p>
            <p className="text-xs text-[#999]">Since launch</p>
          </div>
        </div>

        {/* Version & Content */}
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f] mb-3">Version History</p>
              <div className="space-y-2">
                {mockVersions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVersion(v.id)}
                    className={`w-full text-left rounded-xl p-3 transition-all ${
                      activeVersion === v.id
                        ? "bg-[#e8f5e9] border border-[#0c831f]/30"
                        : "bg-[#f9fafb] border border-transparent hover:border-[#e8e8e8]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-black text-sm ${v.status === "Current" ? "text-[#0c831f]" : "text-[#1a1a1a]"}`}>{v.version}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        v.status === "Current" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f6f7f6] text-[#999]"
                      }`}>{v.status}</span>
                    </div>
                    <p className="text-[10px] text-[#999]">{v.effectiveDate}</p>
                    <p className="text-[10px] text-[#666] mt-1 line-clamp-2">{v.changes}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <section className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-sm">
              <div className="border-b border-[#e8e8e8] p-5 bg-[#fafafa]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-black text-[#1a1a1a]">{current.title}</h2>
                      <span className="bg-[#2563eb] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{current.version}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#666]">
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" />Effective: {current.effectiveDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Published: {current.publishedAt}</span>
                      <span className="flex items-center gap-1"><History className="w-3 h-3" />By: {current.updatedBy}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#0c831f] bg-[#e8f5e9] px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Live
                  </span>
                </div>
                <div className="mt-3 p-3 bg-[#eff6ff] rounded-xl border border-[#2563eb]/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#2563eb] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#2563eb]">What's Changed:</p>
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
