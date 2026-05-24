"use client";

import { Sun } from "lucide-react";

export default function ThemeSwitcher() {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8e8e8] bg-white text-[#0c831f] transition hover:bg-[#e8f5e9]">
      <Sun className="h-4 w-4" />
    </button>
  );
}
