"use client";
import { useState, useMemo } from "react";
import { inventoryProducts } from "@/data/inventory-products";
import { products } from "@/data/products";
import { Search, Plus, Filter, Download, Upload, MoreVertical, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function InventoryTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  // Map inventory productId strings (PRD-001) to products.ts integer IDs for cross-referencing
  const inventoryToProductMap = useMemo(() => {
    const map: Record<string, number> = {};
    inventoryProducts.forEach((inv) => {
      const match = inv.productId.match(/PRD-(\d+)/);
      if (match) {
        map[inv.productId] = parseInt(match[1], 10);
      }
    });
    return map;
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
              Product Catalog
            </p>
            <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
              Product List
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Upload className="w-4 h-4" />
              Import CSV
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#f8f9fa]">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0c831f] px-3 py-2 text-sm font-semibold text-white hover:bg-[#0a6a18]">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#e8e8e8] bg-[#f9fafb] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or barcode..."
              className="w-full rounded-lg border border-[#e8e8e8] bg-white pl-10 pr-4 py-2 text-sm outline-none focus:border-[#0c831f]"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
              <option>All Categories</option>
              <option>Groceries</option>
              <option>Fruits</option>
              <option>Dairy</option>
              <option>Beverages</option>
            </select>
            
            <select className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Archived</option>
            </select>
            
            <button className="flex items-center gap-2 rounded-lg border border-[#e8e8e8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#f8f9fa]">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="border-b border-[#e8e8e8] bg-[#fff0f6] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1a1a1a]">
              {selectedProducts.length} products selected
            </span>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold hover:bg-[#f8f9fa]">
                Bulk Edit
              </button>
              <button className="rounded-lg border border-[#ff4f8b] bg-white px-3 py-1.5 text-xs font-semibold text-[#ff4f8b] hover:bg-[#fff0f6]">
                Bulk Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#f6f7f6] text-left text-xs font-black uppercase tracking-wide text-[#666]">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" className="rounded border-[#e8e8e8]" />
              </th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Warehouse</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Reserved</th>
              <th className="px-4 py-3">Damaged</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryProducts.map((item) => (
              <tr key={item.id} className="border-b border-[#f0f0f0] text-sm text-[#1a1a1a] last:border-b-0 hover:bg-[#f9fafb]">
                <td className="px-4 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-[#e8e8e8]" 
                    checked={selectedProducts.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{item.name}</p>
                      {inventoryToProductMap[item.productId] && (
                        <Link
                          href={`/product/${inventoryToProductMap[item.productId]}`}
                          className="text-[#0c831f] hover:text-[#0a6e1a] transition-colors"
                          target="_blank"
                          title="View product page"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <p className="text-xs text-[#666]">{item.productId}</p>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium">{item.sku}</td>
                <td className="px-4 py-4">{item.warehouse}</td>
                <td className="px-4 py-4 font-bold text-[#0c831f]">{item.stock}</td>
                <td className="px-4 py-4 font-medium text-[#f59e0b]">{item.reserved}</td>
                <td className="px-4 py-4 font-medium text-[#ff4f8b]">{item.damaged}</td>
                <td className="px-4 py-4">{item.expiryDate}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    item.status === "Active" ? "bg-[#e8f5e9] text-[#0c831f]" : "bg-[#f6f7f6] text-[#666]"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button className="rounded-lg p-2 hover:bg-[#e8e8e8]">
                      <MoreVertical className="w-4 h-4 text-[#666]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
