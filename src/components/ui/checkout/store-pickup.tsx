"use client";

import { useState } from "react";
import { Store, MapPin, Clock, CheckCircle2 } from "lucide-react";

const PICKUP_STORES = [
  { id: "andheri", name: "Andheri West Store", address: "Shop 4, Lokhandwala Complex, Andheri West, Mumbai", distance: "1.2 km" },
  { id: "bandra", name: "Bandra Kurla Store", address: "BKC Annex, Bandra East, Mumbai", distance: "2.5 km" },
  { id: "powai", name: "Powai Hiranandani Store", address: "Hiranandani Gardens, Powai, Mumbai", distance: "3.8 km" },
  { id: "worli", name: "Worli Seaface Store", address: "Seaface Road, Worli, Mumbai", distance: "5.1 km" },
];

interface StorePickupProps {
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

export default function StorePickup({ selectedStore, onStoreChange }: StorePickupProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
      <div className="flex items-center gap-2 border-b border-[#e8e8e8] px-4 py-3">
        <Store className="h-4 w-4 text-[#ff4f8b]" />
        <h2 className="text-sm font-black text-[#1a1a1a]">Store Pickup</h2>
        <span className="text-[10px] font-semibold text-[#0c831f] bg-[#e8f5e9] px-1.5 py-0.5 rounded-full">
          Free
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3 rounded-xl bg-[#fff0f6] p-3">
          <Clock className="w-5 h-5 text-[#ff4f8b] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#1a1a1a]">Ready in 30 minutes</p>
            <p className="text-xs text-[#666] mt-0.5">Order online and pick up from your nearest store. No waiting.</p>
          </div>
        </div>

        <div className="space-y-2">
          {PICKUP_STORES.map((store) => (
            <label
              key={store.id}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                selectedStore === store.id
                  ? "border-[#ff4f8b] bg-[#fff0f6]"
                  : "border-[#e8e8e8] hover:border-[#ff4f8b]"
              }`}
              onClick={() => onStoreChange(store.id)}
            >
              <div className="relative flex-shrink-0">
                <input
                  type="radio"
                  name="pickup"
                  checked={selectedStore === store.id}
                  readOnly
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedStore === store.id ? "border-[#ff4f8b]" : "border-[#ccc]"
                  }`}
                >
                  {selectedStore === store.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff4f8b]" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#1a1a1a]">{store.name}</p>
                  <span className="text-[10px] font-medium text-[#999] bg-[#f2f2f2] px-1.5 py-0.5 rounded">
                    {store.distance}
                  </span>
                </div>
                <p className="text-xs text-[#666] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#999]" />
                  {store.address}
                </p>
              </div>
            </label>
          ))}
        </div>

        {selectedStore && (
          <div className="flex items-center gap-2 rounded-lg bg-[#e8f5e9] p-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#0c831f] flex-shrink-0" />
            <p className="text-xs font-semibold text-[#0c831f]">
              Pickup from {PICKUP_STORES.find((s) => s.id === selectedStore)?.name} — Ready in 30 mins
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
