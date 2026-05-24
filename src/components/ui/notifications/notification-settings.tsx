"use client";

import { useState } from "react";
import { Bell, BellRing, Smartphone, MessageSquare } from "lucide-react";
import { usePushNotificationStore } from "@/store/push-notification-store";
import { toast } from "sonner";

export default function NotificationSettingsPanel() {
  const { isSubscribed, subscribe, unsubscribe, permission } = usePushNotificationStore();
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePushToggle = async () => {
    if (isSubscribed) {
      await unsubscribe();
      toast("Push notifications disabled");
    } else {
      await subscribe();
      if (usePushNotificationStore.getState().isSubscribed) {
        toast.success("Push notifications enabled! 🔔");
      } else {
        toast.error("Could not enable push notifications. Please check your browser settings.");
      }
    }
  };

  const handleWhatsAppOptIn = () => {
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setWhatsappOptIn(true);
    toast.success(`WhatsApp notifications enabled for ${phoneNumber} ✅`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8e8e8] p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#1a1a1a] mb-4">Notification Preferences</h3>

      <div className="space-y-4">
        {/* Push Notifications */}
        <div className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSubscribed ? "bg-[#fff0f6] text-[#ff4f8b]" : "bg-[#f0f0f0] text-[#ccc]"}`}>
              {isSubscribed ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">Push Notifications</p>
              <p className="text-xs text-[#666]">Get notified about orders, offers & reminders</p>
            </div>
          </div>
          <button
            onClick={handlePushToggle}
            className={`relative h-6 w-11 rounded-full transition-colors ${isSubscribed ? "bg-[#0c831f]" : "bg-[#ccc]"}`}
          >
            <span className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${isSubscribed ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Permission status */}
        {permission === "denied" && (
          <div className="rounded-xl bg-[#fff0f6] border border-[#ff4f8b]/20 p-3">
            <p className="text-xs text-[#666]">
              Push notifications are blocked in your browser settings. Enable them in your site settings to receive order updates.
            </p>
          </div>
        )}

        {/* WhatsApp Notifications */}
        <div className="rounded-xl border border-[#e8e8e8] bg-[#fafafa] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${whatsappOptIn ? "bg-[#e8f5e9] text-[#25d366]" : "bg-[#f0f0f0] text-[#ccc]"}`}>
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1a1a]">WhatsApp Notifications</p>
                <p className="text-xs text-[#666]">Receive order updates on WhatsApp</p>
              </div>
            </div>
            {whatsappOptIn && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[10px] font-bold text-[#0c831f]">
                <BellRing className="w-3 h-3" />
                Active
              </span>
            )}
          </div>

          {!whatsappOptIn ? (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#999] font-semibold">+91</span>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full h-10 rounded-xl border border-[#e8e8e8] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#25d366] transition-colors"
                />
              </div>
              <button
                onClick={handleWhatsAppOptIn}
                disabled={phoneNumber.length < 10}
                className="h-10 px-4 rounded-xl bg-[#25d366] text-white text-xs font-bold hover:bg-[#1da954] transition-colors disabled:opacity-50"
              >
                Opt In
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-lg bg-[#e8f5e9] px-3 py-2">
              <span className="text-xs font-semibold text-[#0c831f]">WhatsApp: +91 {phoneNumber}</span>
              <button
                onClick={() => { setWhatsappOptIn(false); setPhoneNumber(""); toast("WhatsApp notifications disabled"); }}
                className="text-[10px] font-semibold text-[#ff4f8b] hover:underline"
              >
                Disable
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
