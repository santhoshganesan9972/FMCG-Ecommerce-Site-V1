"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Percent, Receipt, FileText, MapPin } from "lucide-react";

export default function TaxSettingsPage() {
  const [gst, setGst] = useState("18");
  const [invoicePrefix, setInvoicePrefix] = useState("INV-2026-");

  return (
    <DashboardLayout>
      <SettingsErrorBoundary>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/admin/settings" className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white transition hover:bg-[#f6f7f6]">
            <ChevronLeft className="h-4 w-4 text-[#666]" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Settings</p>
            <h1 className="text-xl font-black text-[#1a1a1a]">Tax Settings</h1>
          </div>
        </div>

        {/* GST Configuration */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Percent className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">GST Configuration</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">GST Rate (%)</label>
              <input type="text" value={gst} onChange={(e) => setGst(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">CGST (%)</label>
              <input type="text" value={Number(gst) / 2} disabled className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#f0f0f0] px-3 text-sm text-[#999]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">SGST (%)</label>
              <input type="text" value={Number(gst) / 2} disabled className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#f0f0f0] px-3 text-sm text-[#999]" />
            </div>
          </div>
        </section>

        {/* Tax Rules */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Tax Rules</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: "Essential Groceries", rate: "0%", desc: "Milk, bread, vegetables — GST exempt" },
              { label: "Packaged Food", rate: "5%", desc: "Biscuits, cereals, packaged snacks" },
              { label: "Beverages", rate: "12%", desc: "Cold drinks, juices, packaged water" },
              { label: "Cosmetics & Toiletries", rate: "18%", desc: "Soap, shampoo, skincare products" },
              { label: "Electronics", rate: "18%", desc: "Small appliances, gadgets" },
            ].map((rule) => (
              <div key={rule.label} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-3">
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">{rule.label}</p>
                  <p className="text-xs text-[#666]">{rule.desc}</p>
                </div>
                <span className="rounded-lg bg-[#fff0f6] px-3 py-1 text-sm font-black text-[#ff4f8b]">{rule.rate}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Invoice Settings */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Invoice Settings</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Invoice Number Prefix</label>
              <input type="text" value={invoicePrefix} onChange={(e) => setInvoicePrefix(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Next Invoice Number</label>
              <input type="text" value="10458" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Regional Tax Setup */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Regional Tax Setup</h2>
          </div>
          <div className="space-y-2">
            {[
              { state: "Karnataka", gst: "18%", code: "29" },
              { state: "Maharashtra", gst: "18%", code: "27" },
              { state: "Tamil Nadu", gst: "18%", code: "33" },
              { state: "Delhi", gst: "18%", code: "07" },
              { state: "Uttar Pradesh", gst: "18%", code: "09" },
            ].map((region) => (
              <div key={region.state} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f5e9] text-xs font-black text-[#0c831f]">{region.code}</span>
                  <span className="text-sm font-bold text-[#1a1a1a]">{region.state}</span>
                </div>
                <span className="text-sm font-bold text-[#666]">{region.gst}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]">Cancel</Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">Save Changes</button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
