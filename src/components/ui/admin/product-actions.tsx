import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white text-[#666] transition hover:bg-[#f6f7f6]">
        <Eye className="h-4 w-4" />
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f5e9] text-[#0c831f] transition hover:bg-[#dff1e2]">
        <Pencil className="h-4 w-4" />
      </button>
      <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff0f6] text-[#ff4f8b] transition hover:bg-[#ffe0ed]">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
