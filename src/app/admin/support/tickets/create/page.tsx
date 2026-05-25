"use client";

import DashboardLayout from "../../../dashboard-layout";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Ticket,
  User,
  Mail,
  Phone,
  ShoppingBag,
  AlertCircle,
  Send,
  Check,
  ChevronDown,
  Image,
} from "lucide-react";
import FileUpload, { type UploadedFile } from "@/components/ui/file-upload";

const departments = [
  { value: "delivery", label: "Delivery & Shipping" },
  { value: "returns", label: "Returns & Refunds" },
  { value: "payments", label: "Payments & Billing" },
  { value: "technical", label: "Technical Support" },
  { value: "account", label: "Account & Profile" },
  { value: "product", label: "Product Inquiry" },
  { value: "other", label: "Other" },
];

const priorities = [
  { value: "low", label: "Low", color: "text-[#6b7280]" },
  { value: "medium", label: "Medium", color: "text-[#2563eb]" },
  { value: "high", label: "High", color: "text-[#ff4f8b]" },
  { value: "urgent", label: "Urgent", color: "text-[#dc2626]" },
];

const channels = [
  { value: "chat", label: "Live Chat" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "portal", label: "Customer Portal" },
];

export default function CreateTicketPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("delivery");
  const [priority, setPriority] = useState("medium");
  const [channel, setChannel] = useState("chat");
  const [orderRef, setOrderRef] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !subject || !description) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const ticketId = `TKT-2024-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setCreatedTicketId(ticketId);
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f5e9]">
              <Check className="h-10 w-10 text-[#0c831f]" />
            </div>
            <h2 className="mt-6 text-2xl font-black text-[#1a1a1a]">Ticket Created Successfully!</h2>
            <p className="mt-2 text-sm text-[#666]">
              Your support ticket has been raised and assigned to the {departments.find(d => d.value === department)?.label} team.
            </p>
            <div className="mt-6 rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#666]">Ticket ID</p>
              <p className="mt-1 text-xl font-black text-[#2563eb]">{createdTicketId}</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href={`/admin/support/tickets/1`}>
                <button className="rounded-lg bg-[#0c831f] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0a6a18] transition-all">
                  View Ticket
                </button>
              </Link>
              <Link href="/admin/support/tickets">
                <button className="rounded-lg border border-[#e8e8e8] px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                  All Tickets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <Link
              href="/admin/support"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa] transition-all"
            >
              <ArrowLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Link>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                Support Center
              </p>
              <h1 className="mt-1 text-2xl font-black text-[#1a1a1a] sm:text-3xl">
                Create Support Ticket
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#666]">
                Raise a new support ticket on behalf of a customer. Fill in the details below and submit to create the ticket.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Main Form */}
          <section className="lg:col-span-2 rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Customer Information */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-[#eff6ff]">
                      <User className="h-3.5 w-3.5 text-[#2563eb]" />
                    </div>
                    <span className="text-sm font-black text-[#1a1a1a]">Customer Information</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">
                        Customer Name <span className="text-[#ff4f8b]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Full name"
                          required
                          className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="customer@email.com"
                          className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#e8e8e8]" />

                {/* Ticket Details */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-[#e8f5e9]">
                      <Ticket className="h-3.5 w-3.5 text-[#0c831f]" />
                    </div>
                    <span className="text-sm font-black text-[#1a1a1a]">Ticket Details</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">
                        Subject <span className="text-[#ff4f8b]">*</span>
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Brief description of the issue"
                        required
                        className="w-full rounded-lg border border-[#e8e8e8] py-2.5 px-3 text-sm focus:border-[#0c831f] focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Department</label>
                        <div className="relative">
                          <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-[#e8e8e8] py-2.5 px-3 text-sm focus:border-[#0c831f] focus:outline-none bg-white"
                          >
                            {departments.map((d) => (
                              <option key={d.value} value={d.value}>{d.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999] pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Priority</label>
                        <div className="flex gap-2">
                          {priorities.map((p) => (
                            <div
                              key={p.value}
                              onClick={() => setPriority(p.value)}
                              className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                                priority === p.value
                                  ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
                                  : "border-[#e8e8e8] text-[#666] hover:border-[#0c831f]/30"
                              }`}
                            >
                              {p.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Contact Channel</label>
                        <div className="relative">
                          <select
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-[#e8e8e8] py-2.5 px-3 text-sm focus:border-[#0c831f] focus:outline-none bg-white"
                          >
                            {channels.map((c) => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999] pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">Order Reference (Optional)</label>
                        <div className="relative">
                          <ShoppingBag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                          <input
                            type="text"
                            value={orderRef}
                            onChange={(e) => setOrderRef(e.target.value)}
                            placeholder="e.g. ORD-2024-XXXX"
                            className="w-full rounded-lg border border-[#e8e8e8] py-2.5 pl-9 pr-3 text-sm focus:border-[#0c831f] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">
                        Description <span className="text-[#ff4f8b]">*</span>
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a detailed description of the issue..."
                        rows={5}
                        required
                        className="w-full rounded-lg border border-[#e8e8e8] p-3 text-sm focus:border-[#0c831f] focus:outline-none resize-vertical"
                      />
                    </div>

                    {/* File Attachments */}
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-[#fff0f6]">
                          <Image className="h-3.5 w-3.5 text-[#ff4f8b]" />
                        </div>
                        <span className="text-sm font-black text-[#1a1a1a]">Attachments</span>
                        {attachments.length > 0 && (
                          <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[10px] font-bold text-[#0c831f]">
                            {attachments.length} file{attachments.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <FileUpload
                        files={attachments}
                        onFilesChange={setAttachments}
                        maxFiles={5}
                        maxSizeMB={10}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#e8e8e8] pt-5">
                <Link href="/admin/support">
                  <button
                    type="button"
                    className="rounded-lg border border-[#e8e8e8] px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={!customerName || !subject || !description || isSubmitting}
                  className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0a6a18] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Create Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Sidebar Info */}
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f] mb-1">Guidelines</p>
                <h3 className="text-sm font-black text-[#1a1a1a]">Before Creating a Ticket</h3>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg bg-[#eff6ff] p-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#2563eb]" />
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">Check Existing Tickets</p>
                    <p className="text-xs text-[#666] mt-0.5">Search for similar tickets to avoid duplicates.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-[#fffbeb] p-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-[#d97706]" />
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">Priority Guidelines</p>
                    <p className="text-xs text-[#666] mt-0.5">Use &ldquo;Urgent&rdquo; only for critical business-impacting issues.</p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-[#e8f5e9] p-3">
                  <Image className="h-5 w-5 flex-shrink-0 text-[#0c831f]" />
                  <div>
                    <p className="text-xs font-bold text-[#1a1a1a]">Attachments Supported</p>
                    <p className="text-xs text-[#666] mt-0.5">Drag & drop images, PDFs, and documents. Up to 10MB per file.</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e8e8e8] pt-4">
                <p className="text-xs font-black uppercase tracking-wide text-[#666] mb-3">Ticket Lifecycle</p>
                <div className="space-y-2.5">
                  {[
                    { step: "1", label: "Open", desc: "Ticket is created and queued" },
                    { step: "2", label: "In Progress", desc: "Agent is working on it" },
                    { step: "3", label: "Resolved", desc: "Solution has been provided" },
                    { step: "4", label: "Closed", desc: "Customer confirmed resolution" },
                  ].map(({ step, label, desc }) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0c831f] text-[10px] font-black text-white">
                        {step}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1a1a1a]">{label}</p>
                        <p className="text-[10px] text-[#999]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
