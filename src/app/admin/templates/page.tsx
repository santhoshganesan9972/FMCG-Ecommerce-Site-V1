"use client";

import { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { mockTemplates } from "@/data/admin/misc";
import { Plus, Mail, MessageSquare, Smartphone, Edit3, Copy, Archive, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function TemplatesPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? mockTemplates : mockTemplates.filter((t) => t.type === filter);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Templates</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">Message Templates</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Manage email, SMS, and WhatsApp templates for order confirmations, OTPs, promotions, and transactional messages.</p>
            </div>
            <button onClick={() => toast.info("Opening create template form")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]"><Plus className="w-4 h-4" />Create Template</button>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {[
              { key: "all", label: "All Templates", count: mockTemplates.length },
              { key: "order", label: "Order", count: mockTemplates.filter(t => t.type === "order").length },
              { key: "otp", label: "OTP", count: mockTemplates.filter(t => t.type === "otp").length },
              { key: "promotional", label: "Promotional", count: mockTemplates.filter(t => t.type === "promotional").length },
            ].map((t) => (
              <button key={t.key} onClick={() => setFilter(t.key)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${filter === t.key ? "bg-[#0c831f] text-white" : "text-[#666] hover:bg-[#f6f7f6]"}`}>{t.label} ({t.count})</button>
            ))}
          </div>
        </section>

        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#f6f7f6] p-2.5">
                    {t.channel === "email" ? <Mail className="w-5 h-5 text-[#6366f1]" /> : t.channel === "whatsapp" ? <MessageSquare className="w-5 h-5 text-[#0c831f]" /> : <Smartphone className="w-5 h-5 text-[#ff4f8b]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#1a1a1a]">{t.name}</h3>
                      <span className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-semibold text-[#666]">{t.channel}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.status === "active" ? "bg-[#e8f5e9] text-[#0c831f]" : t.status === "draft" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#f6f7f6] text-[#999]"}`}>{t.status}</span>
                    </div>
                    <p className="text-sm text-[#666] mt-1">{t.subject}</p>
                    <p className="text-xs text-[#999] mt-1">{t.content}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {t.variables.map((v) => (
                        <span key={v} className="rounded-md bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-mono text-[#0c831f]">{`{{${v}}}`}</span>
                      ))}
                    </div>
                    {t.lastUsed && <p className="text-xs text-[#999] mt-2">Last used: {t.lastUsed}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toast.info("Editing template")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => toast.success("Template duplicated")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Copy className="w-4 h-4" /></button>
                  <button onClick={() => toast.info("Template archived")} className="rounded-lg p-1.5 text-[#666] hover:bg-[#f0f0f0]"><Archive className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
