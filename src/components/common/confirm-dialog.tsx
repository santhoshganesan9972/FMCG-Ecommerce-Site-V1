"use client";

import { TriangleAlert, AlertCircle, Info } from "lucide-react";
import { TEXT_PRIMARY, TEXT_MUTED, BTN_SECONDARY } from "@/lib/shared-classes";

interface ReusableConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

const confirmColors: Record<string, string> = {
  danger: "bg-red-500 hover:bg-red-600",
  warning: "bg-amber-500 hover:bg-amber-600",
  info: "bg-[#0c831f] hover:bg-[#0a6a18]",
};

const iconMap: Record<string, React.ReactNode> = {
  danger: <TriangleAlert className="w-6 h-6 text-red-500" />,
  warning: <AlertCircle className="w-6 h-6 text-amber-500" />,
  info: <Info className="w-6 h-6 text-[#0c831f]" />,
};

const bgMap: Record<string, string> = {
  danger: "bg-red-100",
  warning: "bg-amber-100",
  info: "bg-[#e8f5e9]",
};

/**
 * A modal confirmation dialog with variant styling.
 *
 * @example
 * <ReusableConfirmationDialog
 *   open={showDeleteConfirm}
 *   onClose={() => setShowDeleteConfirm(false)}
 *   onConfirm={handleDelete}
 *   title="Delete vendor?"
 *   message="This action cannot be undone."
 *   variant="danger"
 * />
 */
export function ReusableConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ReusableConfirmationDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <div className="text-center">
          <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${bgMap[variant]}`}>
            {iconMap[variant]}
          </div>
          <h3 className={`text-lg font-black ${TEXT_PRIMARY}`}>{title}</h3>
          <p className={`mt-2 text-sm ${TEXT_MUTED}`}>{message}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={`flex-1 ${BTN_SECONDARY}`}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50 transition-colors ${confirmColors[variant]}`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
