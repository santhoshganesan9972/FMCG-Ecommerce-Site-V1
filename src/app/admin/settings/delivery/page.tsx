"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Truck, MapPin, Clock, Zap, Store } from "lucide-react";

export default function DeliverySettingsPage() {
  const [freeThreshold, setFreeThreshold] = useState("199");
  const [deliveryCharge, setDeliveryCharge] = useState("49");
  const [radius, setRadius] = useState("10");
  const [expressCharge, setExpressCharge] = useState("99");
  const [pickupEnabled, setPickupEnabled] = useState(true);

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Delivery Settings</h1>
          </div>
        </div>

        {/* Delivery Charges */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Delivery Pricing</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-[#666]">Standard Delivery Charge (₹)</label>
              <input type="text" value={deliveryCharge} onChange={(e) => setDeliveryCharge(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Free Delivery Above (₹)</label>
              <input type="text" value={freeThreshold} onChange={(e) => setFreeThreshold(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Express Delivery Charge (₹)</label>
              <input type="text" value={expressCharge} onChange={(e) => setExpressCharge(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Service Area</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Delivery Radius (km)</label>
              <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Coverage Pincodes</label>
              <input type="text" placeholder="560001, 560002, 560038, 560093" className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]" />
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-[#fafafa] border border-[#e8e8e8] p-4">
            <p className="text-xs font-bold text-[#666] mb-2">Coverage Map Preview</p>
            <div className="flex h-40 items-center justify-center rounded-lg bg-[#f6f7f6] border border-[#e8e8e8]">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-[#ff4f8b]" />
                <p className="mt-1 text-xs text-[#999]">Map integration — 10 km radius centered at HQ</p>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Slots */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Delivery Slots</h2>
          </div>
          <div className="space-y-2">
            {[
              { slot: "Morning (7:00 - 9:00 AM)", orders: 45, active: true },
              { slot: "Mid-Morning (9:00 - 11:00 AM)", orders: 89, active: true },
              { slot: "Lunch (11:00 AM - 1:00 PM)", orders: 120, active: true },
              { slot: "Afternoon (1:00 - 4:00 PM)", orders: 78, active: true },
              { slot: "Evening (4:00 - 7:00 PM)", orders: 156, active: true },
              { slot: "Night (7:00 - 10:00 PM)", orders: 92, active: false },
            ].map(({ slot, orders, active }) => (
              <div key={slot} className={`flex items-center justify-between rounded-lg border px-4 py-2.5 ${active ? "border-[#e8e8e8] bg-[#fafafa]" : "border-[#f0f0f0] bg-[#f6f6f6] opacity-60"}`}>
                <div className="flex items-center gap-3">
                  <Clock className={`h-4 w-4 ${active ? "text-[#0c831f]" : "text-[#ccc]"}`} />
                  <span className={`text-sm font-bold ${active ? "text-[#1a1a1a]" : "text-[#999]"}`}>{slot}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#666]">{orders} orders</span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${active ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f0f0f0] text-[#ccc]"}`}>{active ? "Active" : "Inactive"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Express & Pickup */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-[#ff4f8b]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Express Delivery</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-[#e8e8e8] bg-[#fafafa] p-3">
                <span className="text-sm font-bold text-[#1a1a1a]">Enable Express</span>
                <span className="rounded bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-bold text-[#0c831f]">Active</span>
              </div>
              <div>
                <label className="text-xs font-bold text-[#666]">Express Delivery Time (mins)</label>
                <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none"><option>10-15 min</option><option>15-20 min</option><option>20-30 min</option></select>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-4 w-4 text-[#0c831f]" />
              <h2 className="text-sm font-black text-[#1a1a1a]">Pickup Settings</h2>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">Store Pickup</p>
                <p className="text-xs text-[#666]">Customers can pick up orders directly from store</p>
              </div>
              <button onClick={() => setPickupEnabled(!pickupEnabled)} className={`relative h-6 w-11 rounded-full transition-colors ${pickupEnabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${pickupEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
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
