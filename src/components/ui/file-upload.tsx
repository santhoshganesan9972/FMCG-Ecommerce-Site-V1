"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  Upload,
  X,
  FileImage,
  FileText,
  FileArchive,
  File,
  Paperclip,
} from "lucide-react";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  type: "image" | "document" | "archive" | "other";
  size: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(file: File): UploadedFile["type"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.includes("pdf") || file.type.includes("word") || file.type.includes("text") || file.type.includes("sheet")) return "document";
  if (file.type.includes("zip") || file.type.includes("rar") || file.type.includes("tar")) return "archive";
  return "other";
}

function getFileIcon(type: UploadedFile["type"]) {
  switch (type) {
    case "image": return FileImage;
    case "document": return FileText;
    case "archive": return FileArchive;
    default: return File;
  }
}

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  variant?: "standalone" | "compact";
  disabled?: boolean;
}

export default function FileUpload({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 10,
  accept = "image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar",
  variant = "standalone",
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = useCallback((fileList: FileList) => {
    setError(null);
    const newFiles: UploadedFile[] = [];
    const remaining = maxFiles - files.length;

    const arr = Array.from(fileList).slice(0, remaining);

    for (const file of arr) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`"${file.name}" exceeds the ${maxSizeMB}MB limit`);
        continue;
      }

      const uploadedFile: UploadedFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        type: getFileType(file),
        size: formatSize(file.size),
      };

      if (file.type.startsWith("image/")) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      newFiles.push(uploadedFile);
    }

    if (newFiles.length === 0) return;
    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
    }

    onFilesChange([...files, ...newFiles]);
  }, [files, maxFiles, maxSizeMB, onFilesChange]);

  const removeFile = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file?.preview) URL.revokeObjectURL(file.preview);
    onFilesChange(files.filter((f) => f.id !== id));
    setError(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [disabled, processFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = "";
  };

  // Compact variant - just a button with file count
  if (variant === "compact") {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
            files.length > 0
              ? "border-[#0c831f] bg-[#e8f5e9] text-[#0c831f]"
              : "border-[#e8e8e8] text-[#666] hover:bg-[#f8f9fa]"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          title={files.length > 0 ? `${files.length} file(s) attached` : "Attach files"}
        >
          <Paperclip className="h-4 w-4" />
          {files.length > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff4f8b] text-[8px] font-black text-white">
              {files.length}
            </span>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Attached files popover */}
        {files.length > 0 && (
          <div className="absolute bottom-full left-0 mb-2 w-64 space-y-1.5">
            {files.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white p-2 shadow-sm"
              >
                {f.preview ? (
                  <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-md border border-[#e8e8e8]">
                    <img src={f.preview} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#f3f4f6]">
                    {React.createElement(getFileIcon(f.type), { className: "h-4 w-4 text-[#666]" })}
                  </div>
                )}
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-[#1a1a1a]">
                  {f.file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded hover:bg-[#fef2f2]"
                >
                  <X className="h-3 w-3 text-[#999] hover:text-[#dc2626]" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-1 text-[10px] text-[#dc2626]">{error}</p>
        )}
      </div>
    );
  }

  // Standalone variant - full drop zone
  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
          isDragging
            ? "border-[#0c831f] bg-[#e8f5e9]"
            : "border-[#d0d0d0] hover:border-[#0c831f]/40 hover:bg-[#f9fafb]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5e9]">
          <Upload className={`h-5 w-5 ${isDragging ? "text-[#0c831f]" : "text-[#0c831f]"}`} />
        </div>
        <p className="mt-3 text-sm font-bold text-[#1a1a1a]">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="mt-1 text-xs text-[#666]">
          or <span className="font-semibold text-[#0c831f]">browse</span> to upload
        </p>
        <p className="mt-1 text-[10px] text-[#999]">
          Supports images, PDFs, documents &bull; Max {maxSizeMB}MB each &bull; Up to {maxFiles} files
        </p>
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-[#dc2626]">
          <X className="h-3 w-3" />
          {error}
        </p>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#666]">
            {files.length} file{files.length > 1 ? "s" : ""} selected
          </p>
          <div className="grid gap-2">
            {files.map((f) => (
              <div
                key={f.id}
                className="group flex items-center gap-3 rounded-xl border border-[#e8e8e8] bg-white p-3 transition-all hover:shadow-sm"
              >
                {/* Preview / Icon */}
                {f.preview ? (
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-[#e8e8e8]">
                    <img src={f.preview} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6]">
                    {React.createElement(getFileIcon(f.type), { className: "h-6 w-6 text-[#666]" })}
                  </div>
                )}

                {/* File Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1a1a1a]">{f.file.name}</p>
                  <p className="text-xs text-[#999]">{f.size}</p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(f.id);
                  }}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] opacity-0 transition-all hover:border-[#dc2626] hover:bg-[#fef2f2] group-hover:opacity-100"
                  title="Remove file"
                >
                  <X className="h-4 w-4 text-[#999] hover:text-[#dc2626]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
