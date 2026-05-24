"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Truck, Phone, ChevronDown, Smile, Check, CheckCheck } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "rider" | "user";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface ChatWithRiderProps {
  isOpen: boolean;
  onClose: () => void;
  riderName: string;
  riderPhone?: string;
  orderId: string;
}

const AUTO_REPLIES: Record<string, string> = {
  "where": "I'm on my way to your location! Will be there shortly 🚀",
  "time": "Approximately 5-7 minutes, depending on traffic.",
  "late": "So sorry! There's some traffic. I'll be there in about 10 minutes.",
  "location": "I'm near your area now. Look out for the blue FMCG bike!",
  "gate": "Sure, I'll call you when I reach the gate.",
  "instructions": "Leave at door? Please confirm and I'll leave it there.",
  "default": "Let me check and get back to you!",
};

function generateReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("where") || lower.includes("location") || lower.includes("reach")) return AUTO_REPLIES.where;
  if (lower.includes("time") || lower.includes("minute") || lower.includes("long") || lower.includes("eta")) return AUTO_REPLIES.time;
  if (lower.includes("late") || lower.includes("delay") || lower.includes("slow")) return AUTO_REPLIES.late;
  if (lower.includes("near") || lower.includes("close") || lower.includes("here") || lower.includes("spot")) return AUTO_REPLIES.location;
  if (lower.includes("gate") || lower.includes("security") || lower.includes("call when")) return AUTO_REPLIES.gate;
  if (lower.includes("door") || lower.includes("leave") || lower.includes("drop")) return AUTO_REPLIES.instructions;
  return AUTO_REPLIES.default;
}

export default function ChatWithRider({ isOpen, onClose, riderName, riderPhone, orderId }: ChatWithRiderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: `Hey! I'm ${riderName}, your delivery partner for order ${orderId}. I'll be with you soon! 🎉`,
      sender: "rider",
      timestamp: new Date(),
      status: "read",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      const reply = generateReply(text);
      const riderMsg: ChatMessage = {
        id: `rider-${Date.now()}`,
        text: reply,
        sender: "rider",
        timestamp: new Date(),
        status: "delivered",
      };
      setMessages((prev) => [...prev, riderMsg]);
      setIsTyping(false);

      setMessages((prev) =>
        prev.map((m) => (m.id === userMsg.id ? { ...m, status: "read" as const } : m))
      );
    }, 1500 + Math.random() * 1500);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md bg-white rounded-t-2xl shadow-2xl flex flex-col max-h-[80vh] sm:max-h-[70vh] animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e8e8] bg-gradient-to-r from-[#0c831f] to-[#10b981] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{riderName}</p>
              <p className="text-[10px] text-white/80">Delivery Partner</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {riderPhone && (
              <a
                href={`tel:${riderPhone}`}
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label={`Call ${riderName}`}
              >
                <Phone className="w-4 h-4 text-white" />
              </a>
            )}
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronDown className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f8f9fa]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.sender === "user"
                    ? "bg-[#ff4f8b] text-white rounded-br-md"
                    : "bg-white border border-[#e8e8e8] text-[#1a1a1a] rounded-bl-md shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === "user" ? "" : ""}`}>
                  <span className={`text-[9px] ${msg.sender === "user" ? "text-white/70" : "text-[#999]"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {msg.sender === "user" && (
                    msg.status === "read" ? (
                      <CheckCheck className="w-3 h-3 text-white/70" />
                    ) : (
                      <Check className="w-3 h-3 text-white/70" />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#e8e8e8] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#999] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-[#999] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-[#999] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-4 py-2 border-t border-[#e8e8e8] bg-white">
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1">
            {["Where are you?", "How long?", "Leave at door", "Call me"].map((quick) => (
              <button
                key={quick}
                onClick={() => {
                  setInput(quick);
                  inputRef.current?.focus();
                }}
                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#f2f2f2] text-[10px] font-semibold text-[#666] hover:bg-[#fff0f6] hover:text-[#ff4f8b] transition-colors whitespace-nowrap"
              >
                {quick}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-[#e8e8e8] bg-white">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${riderName}...`}
            className="flex-1 h-11 rounded-xl bg-[#f2f2f2] border border-[#e8e8e8] px-4 text-sm outline-none focus:border-[#ff4f8b] transition-colors placeholder:text-[#999]"
            aria-label="Type a message"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="min-w-[44px] min-h-[44px] h-11 w-11 flex items-center justify-center rounded-xl bg-[#ff4f8b] text-white disabled:bg-[#ccc] disabled:cursor-not-allowed hover:bg-[#e63872] transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
