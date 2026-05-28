"use client";

import { useState, useCallback } from "react";
import { ImagePlus, Video, Trash2, Star, StarOff, Upload, Eye, X } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  productId: string;
  productName: string;
  type: "image" | "video" | "document";
  url: string;
  alt: string;
  isPrimary: boolean;
  uploadedAt: string;
}

interface MediaUploaderProps {
  items: MediaItem[];
  onDelete?: (id: string) => void;
  onSetPrimary?: (id: string) => void;
  onUpload?: (files: FileList) => void;
  isLoading?: boolean;
  maxFiles?: number;
}

export default function MediaUploader({
  items,
  onDelete,
  onSetPrimary,
  onUpload,
  isLoading = false,
  maxFiles = 10,
}: MediaUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        onUpload?.(e.dataTransfer.files);
      }
    },
    [onUpload]
  );

  const images = items.filter((m) => m.type === "image");
  const others = items.filter((m) => m.type !== "image");
  const canUpload = items.length < maxFiles;

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {canUpload && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = "image/*,video/*,.pdf";
            input.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files;
              if (files) onUpload?.(files);
            };
            input.click();
          }}
          className={`group cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            dragOver
              ? "border-[#0c831f] bg-[#e8f5e9]"
              : "border-[#d0d0d0] hover:border-[#0c831f]/40"
          } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9] transition-all group-hover:scale-110">
            <Upload className="h-6 w-6 text-[#0c831f]" />
          </div>
          <p className="mt-3 text-sm font-bold text-[#1a1a1a]">
            {dragOver ? "Drop files here" : "Upload Media"}
          </p>
          <p className="mt-1 text-xs text-[#999]">
            Drag & drop or click to browse · JPG, PNG, WebP, MP4, PDF · Max 10MB each
          </p>
          <p className="mt-0.5 text-[10px] text-[#999]">
            {items.length}/{maxFiles} files used
          </p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold text-[#666]">Images ({images.length})</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {images.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-[#e8e8e8] bg-white transition-all hover:shadow-sm"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {item.isPrimary && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#0c831f] px-2 py-0.5 text-[8px] font-bold text-white shadow-sm">
                    Primary
                  </span>
                )}
                {/* Hover overlays */}
                <div className="absolute inset-0 flex items-start justify-end gap-1 bg-black/0 p-2 transition-all group-hover:bg-black/20">
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreviewImage(item.url); }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-[#666] opacity-0 shadow-sm transition-all hover:bg-white hover:text-[#0c831f] group-hover:opacity-100"
                    title="Preview"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  {!item.isPrimary && onSetPrimary && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onSetPrimary(item.id); }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-[#666] opacity-0 shadow-sm transition-all hover:bg-white hover:text-amber-500 group-hover:opacity-100"
                      title="Set as primary"
                    >
                      <Star className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-[#dc2626] opacity-0 shadow-sm transition-all hover:bg-[#fef2f2] group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-[10px] font-medium text-[#666]">
                    {item.alt || item.productName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Files */}
      {others.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold text-[#666]">Videos & Documents ({others.length})</p>
          <div className="space-y-2">
            {others.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-3 rounded-xl border border-[#e8e8e8] bg-white p-3 transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f6f7f6]">
                  {item.type === "video" ? (
                    <Video className="h-5 w-5 text-[#666]" />
                  ) : (
                    <ImagePlus className="h-5 w-5 text-[#666]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-[#1a1a1a]">{item.alt || item.productName}</p>
                  <p className="text-[10px] text-[#999]">{item.type.toUpperCase()} · {item.uploadedAt}</p>
                </div>
                {onDelete && (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] opacity-0 transition-all hover:bg-[#fef2f2] hover:text-[#dc2626] group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && !canUpload && (
        <div className="rounded-xl border border-[#e8e8e8] bg-[#f9fafb] p-8 text-center">
          <p className="text-sm text-[#666]">Maximum {maxFiles} files reached</p>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <button 
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setPreviewImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={previewImage} 
            alt="Preview" 
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
