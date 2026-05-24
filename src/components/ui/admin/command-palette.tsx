"use client";

import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command } from "lucide-react";
import { useState } from "react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-full min-h-32 w-full flex-col justify-between rounded-2xl border border-[#e8e8e8] bg-white p-5 text-left shadow-sm transition hover:border-[#0c831f]"
      >
        <Command className="h-5 w-5 text-[#ff4f8b]" />
        <span>
          <span className="block text-lg font-black text-[#1a1a1a]">
            Command menu
          </span>
          <span className="mt-1 block text-sm text-[#666]">
            Open quick admin actions
          </span>
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search actions..." />
        <CommandList>
          <CommandItem>Open Dashboard</CommandItem>
          <CommandItem>View Orders</CommandItem>
          <CommandItem>Manage Inventory</CommandItem>
        </CommandList>
      </CommandDialog>
    </>
  );
}
