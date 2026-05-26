"use client";

import React from "react";
import { Monitor, Sun, Moon, Type, AlignJustify, Palette, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react";
import type { ThemeSettings } from "@/types/settings";

interface ThemeSelectorProps {
  theme: ThemeSettings | null;
  loading?: boolean;
  saving?: boolean;
  onUpdate?: (data: Partial<ThemeSettings>) => void;
  className?: string;
}

const modeOptions = [
  { value: "light" as const, label: "Light", icon: Sun, description: "Always light mode" },
  { value: "dark" as const, label: "Dark", icon: Moon, description: "Always dark mode" },
  { value: "system" as const, label: "System", icon: Monitor, description: "Follow system preference" },
];

const fontSizeOptions = [
  { value: "small" as const, label: "Small", icon: Type, size: "text-[10px]" },
  { value: "medium" as const, label: "Medium", icon: AlignJustify, size: "text-xs" },
  { value: "large" as const, label: "Large", icon: Maximize2, size: "text-sm" },
];

const borderRadiusOptions = [
  { value: "sm" as const, label: "Small", preview: "rounded-md" },
  { value: "md" as const, label: "Medium", preview: "rounded-xl" },
  { value: "lg" as const, label: "Large", preview: "rounded-2xl" },
];

const fontFamilyOptions = [
  { value: "inter" as const, label: "Inter", style: { fontFamily: "'Inter', sans-serif" } },
  { value: "system" as const, label: "System", style: { fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" } },
  { value: "roboto" as const, label: "Roboto", style: { fontFamily: "'Roboto', sans-serif" } },
];

const colorPresets = ["#0c831f", "#2563eb", "#9333ea", "#dc2626", "#d97706", "#0891b2", "#be185d", "#1a1a1a"];

export function ThemeSelector({
  theme,
  loading = false,
  saving = false,
  onUpdate,
  className = "",
}: ThemeSelectorProps) {
  if (loading || !theme) {
    return (
      <div className={`rounded-2xl border border-[#e8e8e8] bg-white p-6 ${className}`}>
        <div className="space-y-6 animate-pulse">
          <div className="h-5 w-32 rounded bg-[#f0f0f0]" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 flex-1 rounded-xl bg-[#f0f0f0]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Mode Selection */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Monitor className="h-4 w-4 text-[#0c831f]" />
          <h3 className="text-sm font-black text-[#1a1a1a]">Theme Mode</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {modeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = theme.mode === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onUpdate?.({ mode: opt.value })}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  isActive
                    ? "border-[#0c831f] bg-[#f0fdf4]"
                    : "border-[#e8e8e8] hover:border-[#0c831f]/30"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "text-[#0c831f]" : "text-[#666]"}`} />
                <span className={`text-xs font-bold ${isActive ? "text-[#0c831f]" : "text-[#666]"}`}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-[#999]">{opt.description}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Color Selection */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-4 w-4 text-[#0c831f]" />
          <h3 className="text-sm font-black text-[#1a1a1a]">Accent Color</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {colorPresets.map((color) => (
            <button
              key={color}
              onClick={() => onUpdate?.({ primaryColor: color, accentColor: color })}
              className={`relative h-10 w-10 rounded-full transition-all hover:scale-110 ${
                theme.primaryColor === color ? "ring-2 ring-offset-2 ring-[#0c831f] scale-110" : ""
              }`}
              style={{ backgroundColor: color }}
              title={color}
            >
              {theme.primaryColor === color && (
                <CheckIcon className="absolute inset-0 m-auto h-4 w-4 text-white" />
              )}
            </button>
          ))}
          <div className="relative">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => onUpdate?.({ primaryColor: e.target.value, accentColor: e.target.value })}
              className="h-10 w-10 cursor-pointer rounded-full border border-[#e8e8e8]"
              title="Custom color"
            />
          </div>
        </div>
      </section>

      {/* Font Size */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Type className="h-4 w-4 text-[#0c831f]" />
          <h3 className="text-sm font-black text-[#1a1a1a]">Font Size</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {fontSizeOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = theme.fontSize === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onUpdate?.({ fontSize: opt.value })}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  isActive
                    ? "border-[#0c831f] bg-[#f0fdf4]"
                    : "border-[#e8e8e8] hover:border-[#0c831f]/30"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-[#0c831f]" : "text-[#666]"}`} />
                <span className={`text-xs font-bold ${isActive ? "text-[#0c831f]" : "text-[#666]"}`}>
                  {opt.label}
                </span>
                <span className={opt.size}>Aa</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Border Radius */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Maximize2 className="h-4 w-4 text-[#0c831f]" />
          <h3 className="text-sm font-black text-[#1a1a1a]">Border Radius</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {borderRadiusOptions.map((opt) => {
            const isActive = theme.borderRadius === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onUpdate?.({ borderRadius: opt.value })}
                className={`flex flex-col items-center gap-2 border-2 p-4 transition-all ${opt.preview} ${
                  isActive
                    ? "border-[#0c831f] bg-[#f0fdf4]"
                    : "border-[#e8e8e8] hover:border-[#0c831f]/30"
                }`}
              >
                <div className={`h-6 w-12 border-2 ${isActive ? "border-[#0c831f]" : "border-[#ccc]"} ${opt.preview}`} />
                <span className={`text-xs font-bold ${isActive ? "text-[#0c831f]" : "text-[#666]"}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Font Family */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <AlignJustify className="h-4 w-4 text-[#0c831f]" />
          <h3 className="text-sm font-black text-[#1a1a1a]">Font Family</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {fontFamilyOptions.map((opt) => {
            const isActive = theme.fontFamily === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onUpdate?.({ fontFamily: opt.value })}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  isActive
                    ? "border-[#0c831f] bg-[#f0fdf4]"
                    : "border-[#e8e8e8] hover:border-[#0c831f]/30"
                }`}
                style={opt.style}
              >
                <span className={`text-sm font-bold ${isActive ? "text-[#0c831f]" : "text-[#666]"}`}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-[#999]">The quick brown fox</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Toggle Options */}
      <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Eye className="h-4 w-4 text-[#0c831f]" />
          <h3 className="text-sm font-black text-[#1a1a1a]">Display Options</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "sidebarCollapsed" as const, label: "Collapsed Sidebar", desc: "Start with sidebar minimized", icon: Minimize2 },
            { key: "reducedMotion" as const, label: "Reduced Motion", desc: "Minimize animations and transitions", icon: EyeOff },
            { key: "highContrast" as const, label: "High Contrast", desc: "Increase contrast for better readability", icon: Eye },
            { key: "compactMode" as const, label: "Compact Mode", desc: "Reduce spacing for denser layout", icon: Maximize2 },
          ].map((opt) => {
            const Icon = opt.icon;
            const enabled = theme[opt.key] as boolean;
            return (
              <div key={opt.key} className="flex items-center justify-between rounded-xl border border-[#e8e8e8] p-4">
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${enabled ? "text-[#0c831f]" : "text-[#999]"}`} />
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">{opt.label}</p>
                    <p className="text-xs text-[#999]">{opt.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => onUpdate?.({ [opt.key]: !enabled } as Partial<ThemeSettings>)}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-[#e8e8e8] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-[#0c831f] peer-checked:after:translate-x-full" />
                </label>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
