"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { CARD_DASHED, TEXT_DISABLED, BORDER } from "@/lib/shared-classes";

interface ReusableImageUploaderProps {
  images: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  maxFiles?: number;
  className?: string;
}

export function ReusableImageUploader({
  images,
  onAdd,
  onRemove,
  maxFiles = 5,
  className = "",
}: ReusableImageUploaderProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-5 gap-3">
        {images.map((img, i) => (
          <div key={i} className={`group relative aspect-square rounded-xl ${BORDER} bg-[#f6f7f6] overflow-hidden`}>
            <SafeImage src={img} alt={`Upload ${i + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => onRemove(i)}
                className="rounded-lg bg-white p-1.5 text-red-500 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {images.length < maxFiles && (
          <button
            onClick={onAdd}
            className={`aspect-square ${CARD_DASHED} flex items-center justify-center hover:border-[#0c831f] transition-colors`}
          >
            <svg className="w-6 h-6 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
      <p className={`mt-2 text-xs ${TEXT_DISABLED}`}>{images.length}/{maxFiles} images uploaded</p>
    </div>
  );
}
