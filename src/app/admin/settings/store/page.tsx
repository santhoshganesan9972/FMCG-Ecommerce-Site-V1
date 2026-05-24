"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Store, Phone, Clock, CheckCircle } from "lucide-react";

export default function StoreSettingsPage() {
  const [storeStatus, setStoreStatus] = useState(true);
  const [multiStore, setMultiStore] = useState(false);
  const [storeName, setStoreName] = useState("FMCG Commerce");
  const [storeDesc, setStoreDesc] = useState("Your one-stop shop for fresh groceries, dairy, snacks, and daily essentials — delivered in minutes.");
  const [contact, setContact] = useState("+91 1800-180-1234");
  const [email, setEmail] = useState("store@fmcgcommerce.com");
  const [address, setAddress] = useState("123, MG Road, Indiranagar, Bengaluru, Karnataka 560038");

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Store Settings</h1>
          </div>
        </div>

        {/* Store Profile */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Store Profile</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-[#666]">Store Name</label>
              <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-[#666]">Store Description</label>
              <textarea value={storeDesc} onChange={(e) => setStoreDesc(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-[#666]">Store Address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Contact Information</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Contact Number</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Business Hours</h2>
          </div>
          <div className="space-y-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2">
                <span className="text-sm font-bold text-[#1a1a1a]">{day}</span>
                <div className="flex items-center gap-2">
                  <select className="h-8 rounded-md border border-[#e8e8e8] bg-white px-2 text-xs text-[#666] outline-none">
                    <option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option>
                  </select>
                  <span className="text-xs text-[#999]">to</span>
                  <select className="h-8 rounded-md border border-[#e8e8e8] bg-white px-2 text-xs text-[#666] outline-none">
                    <option>09:00 PM</option><option>10:00 PM</option><option>11:00 PM</option>
                  </select>
                  <span className="ml-2 rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Open</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Store Status & Multi-Store */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Store Status</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Store Active</p>
                <p className="text-xs text-[#666]">When disabled, storefront shows a temporary closure message</p>
              </div>
              <button onClick={() => setStoreStatus(!storeStatus)} className={`relative h-7 w-12 rounded-full transition-colors ${storeStatus ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-6 w-6 rounded-full bg-white shadow transition-transform ${storeStatus ? "translate-x-5.5" : "translate-x-0.5"}`} />
              </button>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Multi-Store</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Multiple Stores</p>
                <p className="text-xs text-[#666]">Manage multiple store locations under one account</p>
              </div>
              <button onClick={() => setMultiStore(!multiStore)} className={`relative h-7 w-12 rounded-full transition-colors ${multiStore ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-6 w-6 rounded-full bg-white shadow transition-transform ${multiStore ? "translate-x-5.5" : "translate-x-0.5"}`} />
              </button>
            </div>
            {multiStore && (
              <div className="mt-3 space-y-2">
                {["Store #1 - Bengaluru HQ", "Store #2 - Mumbai West", "Store #3 - Delhi NCR"].map((s) => (
                  <div key={s} className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm">
                    <span className="font-bold text-[#1a1a1a]">{s}</span>
                    <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Active</span>
                  </div>
                ))}
                <button className="w-full rounded-lg border-2 border-dashed border-[#e8e8e8] py-2 text-sm font-bold text-[#ff4f8b] transition hover:border-[#ff4f8b]">+ Add New Store</button>
              </div>
            )}
          </section>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/settings" className="flex h-10 items-center rounded-lg border border-[#e8e8e8] bg-white px-5 text-sm font-bold text-[#666] transition hover:bg-[#f6f7f6]">Cancel</Link>
          <button className="h-10 rounded-lg bg-[#0c831f] px-5 text-sm font-bold text-white transition hover:bg-[#ff4f8b]">Save Changes</button>
        </div>
      </div>
      </SettingsErrorBoundary>
    </DashboardLayout>
  );
}
