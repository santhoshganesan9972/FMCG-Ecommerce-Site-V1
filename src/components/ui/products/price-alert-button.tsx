"use client";

import { useState } from "react";
import { BellRing, BellOff } from "lucide-react";
import { usePriceAlertStore } from "@/store/price-alert-store";
import { toast } from "sonner";

interface PriceAlertButtonProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

export default function PriceAlertButton({ product }: PriceAlertButtonProps) {
  const { alerts, addAlert, removeAlert } = usePriceAlertStore();
  const [showInput, setShowInput] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");

  const existingAlert = alerts.find((a) => a.productId === product.id && !a.triggered);
  const isAlertSet = !!existingAlert;

  const handleSetAlert = () => {
    const price = parseInt(targetPrice);
    if (!price || price <= 0 || price >= product.price) {
      toast.error(`Set a price lower than ₹${product.price}`);
      return;
    }
    addAlert({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      currentPrice: product.price,
      targetPrice: price,
    });
    setShowInput(false);
    setTargetPrice("");
    toast.success(`Alert set! We'll notify you when price drops to ₹${price}`);
  };

  const handleRemoveAlert = () => {
    if (existingAlert) {
      removeAlert(existingAlert.id);
      toast("Price alert removed");
    }
  };

  return (
    <div className="relative">
      {isAlertSet ? (
        <button
          onClick={handleRemoveAlert}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0c831f] hover:bg-[#e8f5e9] px-2 py-1.5 rounded-lg transition-colors"
          aria-label="Remove price alert"
        >
          <BellRing className="w-3.5 h-3.5" />
          Alert at ₹{existingAlert!.targetPrice}
        </button>
      ) : showInput ? (
        <div className="flex gap-1.5 items-center">
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#666]">₹</span>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Target price"
              className="w-20 h-7 rounded-md border border-[#e8e8e8] px-2 text-xs outline-none focus:border-[#ff4f8b]"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSetAlert();
                if (e.key === "Escape") setShowInput(false);
              }}
            />
          </div>
          <button
            onClick={handleSetAlert}
            disabled={!targetPrice}
            className="text-xs font-semibold text-white bg-[#ff4f8b] px-2 py-1 rounded-md hover:bg-[#e63872] disabled:opacity-50"
          >
            Set
          </button>
          <button onClick={() => setShowInput(false)} className="text-xs text-[#999] hover:text-[#666]">
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#999] hover:text-[#ff4f8b] hover:bg-[#fff0f6] px-2 py-1.5 rounded-lg transition-colors"
          aria-label="Set price alert"
        >
          <BellOff className="w-3.5 h-3.5" />
          Notify me
        </button>
      )}
    </div>
  );
}
