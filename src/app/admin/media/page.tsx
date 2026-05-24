"use client";

import DashboardLayout from "../dashboard-layout";
import { mockMediaFiles } from "@/data/admin/misc";
import { Image, Video, FileText, Upload, Trash2, Download, Search, FolderOpen } from "lucide-react";
import { toast } from "sonner";

export default function MediaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">Media Management</p>
              <h1 className="mt-2 text-2xl font-black text-[#1a1a1a] sm:text-3xl">File & Media Library</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">Upload, organize, and manage product images, videos, and documents in one centralized library.</p>
            </div>
            <button onClick={() => toast.info("Upload dialog opened")} className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-4 py-2 text-sm font-bold text-white hover:bg-[#0a6a18]"><Upload className="w-4 h-4" />Upload Files</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Total Files", value: mockMediaFiles.length.toString(), icon: <FolderOpen className="w-5 h-5" />, accent: "bg-[#e8f5e9]" },
              { label: "Images", value: mockMediaFiles.filter(f => f.type === "image").length.toString(), icon: <Image className="w-5 h-5" />, accent: "bg-[#eff7ff]" },
              { label: "Videos", value: mockMediaFiles.filter(f => f.type === "video").length.toString(), icon: <Video className="w-5 h-5" />, accent: "bg-[#f5f0ff]" },
              { label: "Documents", value: mockMediaFiles.filter(f => f.type === "document").length.toString(), icon: <FileText className="w-5 h-5" />, accent: "bg-[#fffbeb]" },
            ].map((s) => (
              <div key={s.label} className={`${s.accent} rounded-3xl p-4 flex items-center gap-3`}>
                <div className="text-[#0c831f]">{s.icon}</div>
                <div>
                  <p className="text-2xl font-black text-[#1a1a1a]">{s.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#0c831f]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input type="text" placeholder="Search files..." className="w-full rounded-xl border border-[#e8e8e8] py-2.5 pl-10 pr-4 text-sm focus:border-[#0c831f] focus:outline-none" />
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockMediaFiles.map((f) => (
            <div key={f.id} className="group relative rounded-xl border border-[#e8e8e8] bg-white overflow-hidden">
              <div className="aspect-square bg-[#f6f7f6] flex items-center justify-center">
                {f.type === "image" ? <Image className="w-10 h-10 text-[#ccc]" /> : f.type === "video" ? <Video className="w-10 h-10 text-[#ccc]" /> : <FileText className="w-10 h-10 text-[#ccc]" />}
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => toast.info("Downloading file")} className="rounded-lg bg-white p-2"><Download className="w-4 h-4 text-[#1a1a1a]" /></button>
                <button onClick={() => toast.success("File deleted")} className="rounded-lg bg-white p-2"><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-[#1a1a1a] truncate">{f.name}</p>
                <p className="text-[10px] text-[#999]">{f.size} · {f.format}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
