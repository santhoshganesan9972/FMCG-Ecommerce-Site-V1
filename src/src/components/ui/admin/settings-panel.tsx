"use client";

import { useState } from "react";
import { toast } from "sonner";

const initialSettings: Record<string, boolean> = {
  "Enable Notifications": true,
  "AI Forecast Alerts": true,
  "Auto assign riders": true,
};

export default function SettingsPanel() {
  const [settings, setSettings] = useState(initialSettings);

  const toggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(`${key} ${!settings[key] ? "enabled" : "disabled"}`, {
      description: "Setting updated successfully",
      duration: 2000,
      position: "bottom-right",
    });
  };

  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Preferences
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Dashboard Settings
        </h2>
      </div>

      <div className="space-y-3">
        {Object.entries(settings).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] p-3"
          >
            <p className="text-sm font-bold text-[#1a1a1a]">{key}</p>
            <button
              onClick={() => toggle(key)}
              className={`flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
                value ? "bg-[#0c831f] justify-end" : "bg-[#ccc] justify-start"
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-white shadow-sm transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
