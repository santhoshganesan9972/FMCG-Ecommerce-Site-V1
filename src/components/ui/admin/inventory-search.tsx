import { Search } from "lucide-react";

export default function InventorySearch() {
  return (
    <div className="flex h-11 w-full max-w-md items-center rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] px-3 transition focus-within:border-[#0c831f]">
      <Search className="h-4 w-4 text-[#999]" />
      <input
        type="text"
        placeholder="Search inventory by SKU, warehouse, or expiry..."
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999]"
      />
    </div>
  );
}
