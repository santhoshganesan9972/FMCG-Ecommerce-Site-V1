"use client";

import DashboardLayout from "../../../dashboard-layout";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  UserCheck,
  ArrowUpCircle,
  XCircle,
  MessageSquare,
  History,
  Send,
  Clock,
  AlertCircle,
  ChevronDown,
  Phone,
  Mail,
  MoreHorizontal,
  ThumbsUp,
  FileText,
  Download,
} from "lucide-react";
import FileUpload, { type UploadedFile } from "@/components/ui/file-upload";

const ticket = {
  id: "TKT-2024-0891",
  customer: "Sneha Patel",
  email: "sneha.patel@email.com",
  phone: "+91 98765 43211",
  subject: "Wrong item received in Order #ORD-8921",
  status: "in-progress" as const,
  priority: "urgent" as const,
  department: "Returns & Refunds",
  agent: "Amit Singh",
  channel: "Chat",
  created: "15 Jan 2024, 10:30 AM",
  updated: "15 Jan 2024, 11:45 AM",
  orderRef: "ORD-2024-8921",
  description: "Customer ordered 'Premium Basmati Rice 5kg' but received 'Everyday White Rice 5kg'. Requesting immediate replacement or refund. Customer is frustrated as this was ordered for a family gathering.",
};

const timeline = [
  { id: 1, action: "Ticket Created", agent: "System", time: "10:30 AM", detail: "Ticket raised via Live Chat" },
  { id: 2, action: "Assigned", agent: "Amit Singh", time: "10:32 AM", detail: "Auto-assigned based on department" },
  { id: 3, action: "Customer Contacted", agent: "Amit Singh", time: "10:45 AM", detail: "Sent acknowledgment message" },
  { id: 4, action: "Escalated", agent: "Rahul Verma", time: "11:15 AM", detail: "Escalated to Senior Agent - Requires refund approval" },
  { id: 5, action: "Note Added", agent: "Amit Singh", time: "11:45 AM", detail: "Customer confirmed order details. Processing replacement." },
];

const chatMessages = [
  { id: 1, from: "customer", name: "Sneha Patel", message: "I ordered Basmati rice but received regular white rice instead.", time: "10:30 AM" },
  { id: 2, from: "agent", name: "Amit Singh", message: "Hi Sneha, I'm sorry for the inconvenience. Let me look into this right away.", time: "10:32 AM" },
  { id: 3, from: "customer", name: "Sneha Patel", message: "This was for a family dinner tonight. I need this resolved ASAP.", time: "10:35 AM" },
  { id: 4, from: "agent", name: "Amit Singh", message: "I understand. I've confirmed the order details. Let me initiate a replacement order and a pickup for the wrong item.", time: "10:45 AM" },
  { id: 5, from: "customer", name: "Sneha Patel", message: "Okay, please hurry. When will the replacement arrive?", time: "10:50 AM" },
  { id: 6, from: "agent", name: "Amit Singh", message: "I'm processing the refund approval. The replacement should be dispatched within 2 hours. I'll keep you updated.", time: "11:00 AM" },
];

// Mock uploaded files for sample chat messages
const chatAttachments: Record<number, UploadedFile[]> = {
  4: [
    { id: "att-1", file: new File([], "replacement-order-confirmation.png"), preview: "https://placehold.co/800x600/e8f5e9/0c831f?text=Replacement+Order", type: "image", size: "245 KB" },
    { id: "att-2", file: new File([], "return-pickup-slip.pdf"), type: "document", size: "89 KB" },
  ],
  6: [
    { id: "att-3", file: new File([], "refund-status-update.png"), preview: "https://placehold.co/600x400/fff0f6/ff4f8b?text=Refund+Processing", type: "image", size: "180 KB" },
  ],
};

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  open: { label: "Open", bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  "in-progress": { label: "In Progress", bg: "bg-[#fffbeb]", text: "text-[#d97706]" },
  escalated: { label: "Escalated", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
  resolved: { label: "Resolved", bg: "bg-[#e8f5e9]", text: "text-[#0c831f]" },
  closed: { label: "Closed", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]" },
};

const priorityConfig: Record<string, { label: string; bg: string; text: string }> = {
  low: { label: "Low", bg: "bg-[#f3f4f6]", text: "text-[#6b7280]" },
  medium: { label: "Medium", bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
  high: { label: "High", bg: "bg-[#fff0f6]", text: "text-[#ff4f8b]" },
  urgent: { label: "Urgent", bg: "bg-[#fef2f2]", text: "text-[#dc2626]" },
};

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"chat" | "history">("chat");
  const [newMessage, setNewMessage] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState(ticket.agent);
  const [ticketStatus, setTicketStatus] = useState<"open" | "in-progress" | "escalated" | "resolved" | "closed">(ticket.status);
  const [chatFiles, setChatFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState(chatMessages);
  const [, forceUpdate] = useState(0);
  const attachmentsRef = useRef<Record<number, UploadedFile[]>>(chatAttachments);

  const status = statusConfig[ticketStatus];
  const priority = priorityConfig[ticket.priority];

  const handleAssignAgent = () => {
    setAssignedAgent("Rahul Verma");
    setShowActions(false);
  };

  const handleEscalate = () => {
    setTicketStatus("escalated");
    setShowActions(false);
  };

  const handleCloseTicket = () => {
    setTicketStatus("closed");
    setShowActions(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <Link
              href="/admin/support/tickets"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] hover:bg-[#f8f9fa] transition-all"
            >
              <ArrowLeft className="h-5 w-5 text-[#1a1a1a]" />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
                  Support Center
                </p>
                <span className="text-[#ccc]">/</span>
                <span className="text-xs font-bold text-[#2563eb]">{ticket.id}</span>
                <div className={`inline-flex items-center rounded px-2 py-0.5 ${status.bg} ${status.text}`}>
                  <span className="text-[10px] font-black">{status.label}</span>
                </div>
                <div className={`inline-flex items-center rounded px-2 py-0.5 ${priority.bg} ${priority.text}`}>
                  <span className="text-[10px] font-black">{priority.label}</span>
                </div>
              </div>
              <h1 className="text-xl font-black text-[#1a1a1a] sm:text-2xl">{ticket.subject}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#666]">
                <span className="font-semibold">{ticket.customer}</span>
                <span>{ticket.department}</span>
                <span>Assigned to: <strong className="text-[#1a1a1a]">{assignedAgent}</strong></span>
                <span>Created: {ticket.created}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-4">
          {/* Left: Main Content (Chat / History) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18] transition-all"
                >
                  <UserCheck className="h-4 w-4" />
                  Assign Agent
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {showActions && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-[#e8e8e8] bg-white shadow-lg z-10 overflow-hidden">
                    <button
                      onClick={handleAssignAgent}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all"
                    >
                      <UserCheck className="h-4 w-4 text-[#0c831f]" />
                      Assign to Rahul Verma
                    </button>
                    <button
                      onClick={handleAssignAgent}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all"
                    >
                      <UserCheck className="h-4 w-4 text-[#2563eb]" />
                      Assign to Neha Kapoor
                    </button>
                    <div className="border-t border-[#e8e8e8]" />
                    <button
                      onClick={handleEscalate}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-[#dc2626] hover:bg-[#fef2f2] transition-all"
                    >
                      <ArrowUpCircle className="h-4 w-4" />
                      Escalate Ticket
                    </button>
                    <div className="border-t border-[#e8e8e8]" />
                    <button
                      onClick={handleCloseTicket}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-[#6b7280] hover:bg-[#f3f4f6] transition-all"
                    >
                      <XCircle className="h-4 w-4" />
                      Close Ticket
                    </button>
                  </div>
                )}
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#ff4f8b] hover:bg-[#fff0f6] transition-all">
                <ArrowUpCircle className="h-4 w-4" />
                Escalate
              </button>

              <Link href={`tel:${ticket.phone}`}>
                <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                  <Phone className="h-4 w-4" />
                  Call Customer
                </button>
              </Link>

              <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Ticket Description Card */}
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-[#d97706]" />
                <span className="text-sm font-black text-[#1a1a1a]">Issue Description</span>
              </div>
              <p className="text-sm leading-6 text-[#666]">{ticket.description}</p>
              {ticket.orderRef && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f9fafb] p-3">
                  <span className="text-xs font-bold text-[#666]">Order Reference:</span>
                  <span className="text-xs font-black text-[#2563eb]">{ticket.orderRef}</span>
                </div>
              )}
            </section>

            {/* Tabs: Chat & History */}
            <section className="rounded-2xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
              <div className="flex border-b border-[#e8e8e8]">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-black transition-all ${
                    activeTab === "chat"
                      ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                      : "text-[#666] hover:text-[#1a1a1a]"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat with Customer
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff4f8b] text-[10px] font-black text-white">
                    {messages.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-black transition-all ${
                    activeTab === "history"
                      ? "border-b-2 border-[#0c831f] text-[#0c831f]"
                      : "text-[#666] hover:text-[#1a1a1a]"
                  }`}
                >
                  <History className="h-4 w-4" />
                  View History
                </button>
              </div>

              {/* Chat Tab */}
              {activeTab === "chat" && (
                <div className="flex flex-col h-[450px]">
                  <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}>
                    {messages.map((msg) => {
                      const attachments = attachmentsRef.current[msg.id];
                      return (
                        <div key={msg.id} className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] ${msg.from === "agent" ? "order-1" : ""}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold ${msg.from === "agent" ? "text-[#0c831f]" : "text-[#2563eb]"}`}>
                                {msg.name}
                              </span>
                              <span className="text-[10px] text-[#999]">{msg.time}</span>
                            </div>
                            <div
                              className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                msg.from === "agent"
                                  ? "bg-[#0c831f] text-white rounded-tr-sm"
                                  : "bg-[#f3f4f6] text-[#1a1a1a] rounded-tl-sm"
                              }`}
                            >
                              {msg.message}
                            </div>
                            {/* File Attachments in Message */}
                            {attachments && attachments.length > 0 && (
                              <div className="mt-2 space-y-1.5">
                                {attachments.map((att) => (
                                  <div
                                    key={att.id}
                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border transition-all hover:shadow-sm ${
                                      msg.from === "agent"
                                        ? "border-white/20 bg-white/10 text-white"
                                        : "border-[#e8e8e8] bg-white text-[#1a1a1a]"
                                    }`}
                                  >
                                    {att.preview ? (
                                      <div className="flex items-start gap-2 p-2 w-full">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/20">
                                          <img src={att.preview} alt={att.file.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 py-1">
                                          <p className={`truncate text-xs font-semibold ${msg.from === "agent" ? "text-white/90" : "text-[#1a1a1a]"}`}>
                                            {att.file.name}
                                          </p>
                                          <p className={`text-[10px] ${msg.from === "agent" ? "text-white/60" : "text-[#999]"}`}>{att.size}</p>
                                          <div className={`mt-1 flex items-center gap-1 text-[10px] font-semibold ${msg.from === "agent" ? "text-white/80" : "text-[#2563eb]"}`}>
                                            <Download className="h-3 w-3" />
                                            Preview
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 p-2 w-full">
                                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${msg.from === "agent" ? "bg-white/20" : "bg-[#f3f4f6]"}`}>
                                          <FileText className={`h-5 w-5 ${msg.from === "agent" ? "text-white/80" : "text-[#666]"}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className={`truncate text-xs font-semibold ${msg.from === "agent" ? "text-white/90" : "text-[#1a1a1a]"}`}>
                                            {att.file.name}
                                          </p>
                                          <p className={`text-[10px] ${msg.from === "agent" ? "text-white/60" : "text-[#999]"}`}>{att.size}</p>
                                        </div>
                                        <Download className={`h-4 w-4 flex-shrink-0 ${msg.from === "agent" ? "text-white/60" : "text-[#666]"}`} />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-[#e8e8e8] p-4">
                    {/* Attached files preview above input */}
                    {chatFiles.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {chatFiles.map((f) => (
                          <div
                            key={f.id}
                            className="group relative flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-[#f9fafb] p-2 pr-8"
                          >
                            {f.preview ? (
                              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-md border border-[#e8e8e8]">
                                <img src={f.preview} alt="" className="h-full w-full object-cover" />
                              </div>
                            ) : (
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#f3f4f6]">
                                <FileText className="h-4 w-4 text-[#666]" />
                              </div>
                            )}
                            <div className="min-w-0 max-w-[100px]">
                              <p className="truncate text-xs font-medium text-[#1a1a1a]">{f.file.name}</p>
                              <p className="text-[10px] text-[#999]">{f.size}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setChatFiles(chatFiles.filter((cf) => cf.id !== f.id))}
                              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded hover:bg-[#fef2f2]"
                            >
                              <span className="text-xs text-[#999] hover:text-[#dc2626]">✕</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <FileUpload
                        files={chatFiles}
                        onFilesChange={setChatFiles}
                        maxFiles={5}
                        maxSizeMB={10}
                        variant="compact"
                      />
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="w-full rounded-lg border border-[#e8e8e8] py-2.5 px-4 pr-12 text-sm focus:border-[#0c831f] focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (newMessage.trim() || chatFiles.length > 0)) {
                              const newMsg = {
                                id: messages.length + 1,
                                from: "agent" as const,
                                name: "Amit Singh",
                                message: newMessage.trim() || "Sent attachment(s)",
                                time: "Just now",
                              };
                              const updatedAttachments = { ...attachmentsRef.current, [newMsg.id]: [...chatFiles] };
                              attachmentsRef.current = updatedAttachments;
                              setMessages([...messages, newMsg]);
                              setNewMessage("");
                              setChatFiles([]);
                              forceUpdate(n => n + 1);
                            }
                          }}
                        />
                        <button
                          disabled={!newMessage.trim() && chatFiles.length === 0}
                          onClick={() => {
                            if (newMessage.trim() || chatFiles.length > 0) {
                              const newMsg = {
                                id: messages.length + 1,
                                from: "agent" as const,
                                name: "Amit Singh",
                                message: newMessage.trim() || "Sent attachment(s)",
                                time: "Just now",
                              };
                              const updatedAttachments = { ...attachmentsRef.current, [newMsg.id]: [...chatFiles] };
                              attachmentsRef.current = updatedAttachments;
                              setMessages([...messages, newMsg]);
                              setNewMessage("");
                              setChatFiles([]);
                              forceUpdate(n => n + 1);
                            }
                          }}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#0c831f] text-white hover:bg-[#0a6a18] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <div className="p-5">
                  <div className="relative">
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#e8e8e8]" />
                    <div className="space-y-6">
                      {timeline.map((event) => (
                        <div key={event.id} className="relative flex items-start gap-4">
                          <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white border-2 border-[#0c831f]">
                            <div className="h-2 w-2 rounded-full bg-[#0c831f]" />
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-[#1a1a1a]">{event.action}</p>
                              <span className="text-xs text-[#999]">{event.time}</span>
                            </div>
                            <p className="text-xs text-[#0c831f] font-semibold mt-0.5">{event.agent}</p>
                            <p className="text-xs text-[#666] mt-1">{event.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right: Customer Info & Details */}
          <div className="space-y-4">
            {/* Customer Card */}
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f] mb-3">Customer</p>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white text-lg font-black">
                  {ticket.customer.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#1a1a1a]">{ticket.customer}</p>
                  <p className="text-xs text-[#666] truncate">{ticket.email}</p>
                  <p className="text-xs text-[#666]">{ticket.phone}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button className="flex w-full items-center gap-3 rounded-lg border border-[#e8e8e8] px-3 py-2 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                  <Mail className="h-3.5 w-3.5 text-[#2563eb]" />
                  Send Email
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-[#e8e8e8] px-3 py-2 text-xs font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa] transition-all">
                  <Phone className="h-3.5 w-3.5 text-[#0c831f]" />
                  Call Customer
                </button>
              </div>
            </section>

            {/* Ticket Info */}
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f] mb-3">Details</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[#666]">Department</span>
                  <span className="text-xs font-bold text-[#1a1a1a]">{ticket.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#666]">Channel</span>
                  <span className="text-xs font-bold text-[#1a1a1a]">{ticket.channel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#666]">Agent</span>
                  <span className="text-xs font-bold text-[#1a1a1a]">{assignedAgent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#666]">Priority</span>
                  <div className={`inline-flex items-center rounded px-1.5 py-0.5 ${priority.bg}`}>
                    <span className={`text-[10px] font-black ${priority.text}`}>{priority.label}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#666]">Created</span>
                  <span className="text-xs text-[#1a1a1a]">{ticket.created}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#666]">Last Updated</span>
                  <span className="text-xs text-[#1a1a1a]">{ticket.updated}</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#e8e8e8] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#666]">SLA Status</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#d97706]" />
                    <span className="text-xs font-bold text-[#d97706]">3h 15m remaining</span>
                  </div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#f0f0f0]">
                  <div className="h-2 w-[65%] rounded-full bg-[#d97706]" />
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f] mb-3">Quick Actions</p>
              <div className="space-y-2">
                <button
                  onClick={handleAssignAgent}
                  className="flex w-full items-center gap-3 rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm font-semibold text-[#0c831f] hover:bg-[#e8f5e9] transition-all"
                >
                  <UserCheck className="h-4 w-4" />
                  Assign Agent
                </button>
                <button
                  onClick={handleEscalate}
                  className="flex w-full items-center gap-3 rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm font-semibold text-[#dc2626] hover:bg-[#fef2f2] transition-all"
                >
                  <ArrowUpCircle className="h-4 w-4" />
                  Escalate Ticket
                </button>
                <button
                  onClick={handleCloseTicket}
                  className="flex w-full items-center gap-3 rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm font-semibold text-[#6b7280] hover:bg-[#f3f4f6] transition-all"
                >
                  <XCircle className="h-4 w-4" />
                  Close Ticket
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-[#e8e8e8] px-3 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-[#eff6ff] transition-all">
                  <ThumbsUp className="h-4 w-4" />
                  Mark Resolved
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
