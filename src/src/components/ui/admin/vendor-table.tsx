import Link from "next/link";
import { Star } from "lucide-react";
import { vendors } from "@/data/vendors";

export default function VendorTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      <div className="border-b border-[#e8e8e8] px-4 py-3 sm:px-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Vendors
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Vendor Management
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Rating</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 table-row-hover hover:bg-[#f9fafb]"
              >
                <td className="px-4 py-4">
                  <Link href={`/admin/vendors/${vendor.id}`}>
                    <span className="font-black">{vendor.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-4 text-[#666]">{vendor.category}</td>
                <td className="px-4 py-4 font-bold">{vendor.revenue}</td>
                <td className="px-4 py-4">{vendor.products}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fff0f6] px-2.5 py-1 text-xs font-black text-[#ff4f8b]">
                    <Star className="h-3 w-3 fill-[#ff4f8b]" />
                    {vendor.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
