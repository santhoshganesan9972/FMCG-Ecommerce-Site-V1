"use client";

import { useState } from "react";
import { Save, X, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { toast } from "sonner";
import StatusBadge from "@/components/ui/admin/reusable-status-badge";

interface PricingItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  mrp: number;
  cost: number;
  margin: number;
  tax: number;
}

interface PriceEditorProps {
  items: PricingItem[];
  onUpdate?: (id: string, data: { price?: number; mrp?: number; costPrice?: number; taxRate?: number }) => Promise<boolean>;
  isLoading?: boolean;
}

export default function PriceEditor({ items, onUpdate, isLoading }: PriceEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, { price: number; mrp: number; cost: number; tax: number }>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const startEdit = (item: PricingItem) => {
    setEditingId(item.id);
    setEditValues((prev) => ({
      ...prev,
      [item.id]: { price: item.price, mrp: item.mrp, cost: item.cost, tax: item.tax },
    }));
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (item: PricingItem) => {
    const vals = editValues[item.id];
    if (!vals) return;

    setSavingId(item.id);
    try {
      const success = await onUpdate?.(item.id, {
        price: vals.price,
        mrp: vals.mrp,
        costPrice: vals.cost,
        taxRate: vals.tax,
      });
      if (success) {
        toast.success(`Pricing updated for ${item.name}`);
        setEditingId(null);
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleChange = (id: string, field: "price" | "mrp" | "cost" | "tax", value: number) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[#e8e8e8] bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f9fafb] text-left text-[10px] font-black uppercase tracking-wide text-[#666]">
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3 text-right">Selling Price</th>
            <th className="px-4 py-3 text-right">MRP</th>
            <th className="px-4 py-3 text-right">Cost Price</th>
            <th className="px-4 py-3 text-right">Margin</th>
            <th className="px-4 py-3 text-right">Tax</th>
            <th className="w-20 px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e8e8e8]">
          {items.map((item) => {
            const isEditing = editingId === item.id;
            const isSaving = savingId === item.id;
            const vals = editValues[item.id];
            const displayPrice = isEditing && vals ? vals.price : item.price;
            const displayMrp = isEditing && vals ? vals.mrp : item.mrp;
            const displayCost = isEditing && vals ? vals.cost : item.cost;
            const displayTax = isEditing && vals ? vals.tax : item.tax;
            const currentMargin = displayMrp > 0
              ? Math.round(((displayMrp - displayCost) / displayMrp) * 1000) / 10
              : 0;

            const fieldClass =
              "h-8 w-20 rounded-lg border border-[#e8e8e8] bg-white px-2 text-right text-xs outline-none transition focus:border-[#0c831f]";

            return (
              <tr key={item.id} className="text-sm transition hover:bg-[#f9fafb]">
                <td className="px-4 py-3">
                  <p className="font-bold text-[#1a1a1a]">{item.name}</p>
                  <p className="text-[10px] text-[#999]">{item.sku}</p>
                </td>
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <input
                      type="number"
                      value={vals?.price ?? item.price}
                      onChange={(e) => handleChange(item.id, "price", Number(e.target.value))}
                      className={fieldClass}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    <span className="font-bold">₹{item.price}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <input
                      type="number"
                      value={vals?.mrp ?? item.mrp}
                      onChange={(e) => handleChange(item.id, "mrp", Number(e.target.value))}
                      className={fieldClass}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    <span className="text-[#999] line-through">₹{item.mrp}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <input
                      type="number"
                      value={vals?.cost ?? item.cost}
                      onChange={(e) => handleChange(item.id, "cost", Number(e.target.value))}
                      className={fieldClass}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    <span className="text-[#666]">₹{item.cost}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span
                      className={`font-bold ${
                        currentMargin >= 25
                          ? "text-[#0c831f]"
                          : currentMargin >= 10
                          ? "text-[#d97706]"
                          : "text-[#dc2626]"
                      }`}
                    >
                      {currentMargin}%
                    </span>
                    {currentMargin >= 25 ? (
                      <TrendingUp className="h-3 w-3 text-[#0c831f]" />
                    ) : currentMargin < 10 ? (
                      <TrendingDown className="h-3 w-3 text-[#dc2626]" />
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <input
                      type="number"
                      value={vals?.tax ?? item.tax}
                      onChange={(e) => handleChange(item.id, "tax", Number(e.target.value))}
                      className="h-8 w-16 rounded-lg border border-[#e8e8e8] bg-white px-2 text-right text-xs outline-none transition focus:border-[#0c831f]"
                      min="0"
                      max="100"
                    />
                  ) : (
                    <span>{item.tax}%</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {isEditing ? (
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => saveEdit(item)}
                        disabled={isSaving}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#0c831f] transition hover:bg-[#e8f5e9] disabled:opacity-50"
                      >
                        <Save className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#666] transition hover:bg-[#f6f7f6]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold text-[#666] transition hover:bg-[#f6f7f6] hover:text-[#0c831f]"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {items.length === 0 && !isLoading && (
        <div className="p-12 text-center">
          <DollarSign className="mx-auto h-8 w-8 text-[#ccc]" />
          <p className="mt-2 text-sm text-[#666]">No products found</p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="h-8 flex-1 skeleton-shimmer rounded-lg" />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
