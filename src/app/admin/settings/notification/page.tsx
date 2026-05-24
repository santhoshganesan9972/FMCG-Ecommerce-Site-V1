"use client";

import { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import SettingsErrorBoundary from "@/components/ui/settings-error-boundary";
import Link from "next/link";
import { ChevronLeft, Bell, ShoppingBag, Megaphone, AlarmClock, Clock } from "lucide-react";

export default function NotificationSettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [orderNotif, setOrderNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);
  const [reminderNotif, setReminderNotif] = useState(true);

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
            <h1 className="text-xl font-black text-[#1a1a1a]">Notification Settings</h1>
          </div>
        </div>

        {/* Notification Channels */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-[#ff4f8b]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Notification Channels</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: "push", label: "Push Notifications", desc: "Browser & mobile push alerts", icon: Bell, enabled: pushEnabled, set: setPushEnabled },
              { id: "order", label: "Order Notifications", desc: "Order confirmations, updates & delivery alerts", icon: ShoppingBag, enabled: orderNotif, set: setOrderNotif },
              { id: "promo", label: "Promotion Notifications", desc: "Deals, offers & flash sale alerts", icon: Megaphone, enabled: promoNotif, set: setPromoNotif },
              { id: "reminder", label: "Reminder Notifications", desc: "Abandoned cart, restock & bill reminders", icon: AlarmClock, enabled: reminderNotif, set: setReminderNotif },
            ].map(({ id, label, desc, icon: Icon, enabled, set }) => (
              <div key={id} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${enabled ? "bg-[#fff0f6] text-[#ff4f8b]" : "bg-[#f0f0f0] text-[#ccc]"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{label}</p>
                    <p className="text-xs text-[#666]">{desc}</p>
                  </div>
                </div>
                <button onClick={() => set(!enabled)} className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-[#0c831f]" : "bg-[#ccc]"}`}>
                  <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Scheduling */}
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-[#0c831f]" />
            <h2 className="text-sm font-black text-[#1a1a1a]">Quiet Hours & Scheduling</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-[#666]">Do Not Disturb Start</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>10:00 PM</option>
                <option>11:00 PM</option>
                <option>12:00 AM</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Do Not Disturb End</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>6:00 AM</option>
                <option>7:00 AM</option>
                <option>8:00 AM</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Max Notifications Per Day</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>2 per day</option>
                <option selected>3 per day</option>
                <option>5 per day</option>
                <option>Unlimited</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#666]">Notification Throttle</label>
              <select className="mt-1 h-10 w-full rounded-lg border border-[#e8e8e8] bg-[#fafafa] px-3 text-sm text-[#1a1a1a] outline-none focus:border-[#ff4f8b]">
                <option>1 min gap</option>
                <option selected>5 min gap</option>
                <option>15 min gap</option>
              </select>
            </div>
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
