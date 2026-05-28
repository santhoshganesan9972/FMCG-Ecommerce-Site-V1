"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Truck, Circle } from "lucide-react";

interface LiveTrackingMapProps {
  riderName: string;
  estimatedTime: string;
  status: "preparing" | "out_for_delivery" | "nearby";
  deliveryAddress: string;
  storeAddress?: string;
}

export default function LiveTrackingMap({
  riderName,
  estimatedTime,
  status,
  deliveryAddress,
  storeAddress = "FMCG Commerce Store, Koramangala",
}: LiveTrackingMapProps) {
  const [progress, setProgress] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, status === "nearby" ? 50 : 200);
    return () => clearInterval(interval);
  }, [status]);

  const riderEta =
    progress < 30 ? `${Math.round(10 - (progress / 30) * 8)} min` :
    progress < 60 ? `${Math.round(5 - (progress / 60) * 3)} min` :
    progress < 85 ? `${Math.round(2 - (progress / 85) * 2)} min` :
    "Arriving soon";

  return (
    <div className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden shadow-sm">
      {/* Map Area */}
      <div ref={mapRef} className="relative h-56 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9] overflow-hidden">
        {/* Grid roads */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 250" className="w-full h-full">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={`h${i}`} x1="0" y1={50 + i * 40} x2="400" y2={50 + i * 40} stroke="#333" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={`v${i}`} x1={80 + i * 70} y1="0" x2={80 + i * 70} y2="250" stroke="#333" strokeWidth="1" />
            ))}
          </svg>
        </div>

        {/* Route path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
          <path
            d="M20 220 Q100 200 150 150 Q200 100 250 120 Q300 140 340 80 Q360 50 380 40"
            fill="none"
            stroke="#0c831f"
            strokeWidth="3"
            strokeDasharray="8 4"
            className="opacity-60"
            style={{ strokeDashoffset: -progress * 2 }}
          />
          <circle cx="20" cy="220" r="8" fill="#ff4f8b" className="animate-pulse" />
          <circle cx="380" cy="40" r="8" fill="#0c831f" />
        </svg>

        {/* Status overlay badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
          <Circle className={`w-2 h-2 ${status === "out_for_delivery" ? "text-[#0c831f] animate-pulse" : status === "nearby" ? "text-[#ff4f8b] animate-ping" : "text-[#e65100]"}`} fill="currentColor" />
          <span className="text-xs font-bold text-[#1a1a1a]">
            {status === "preparing" ? "Preparing order" :
             status === "out_for_delivery" ? "On the way" :
             "Nearby — arriving soon"}
          </span>
        </div>

        {/* ETA badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
          <span className="text-xs font-bold text-[#0c831f]">{riderEta}</span>
        </div>

        {/* Store marker */}
        <div className="absolute bottom-8 left-6 flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-[#ff4f8b] flex items-center justify-center shadow-md">
            <MapPin className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[8px] font-semibold text-[#666] mt-1 bg-white/80 px-1 py-0.5 rounded">
            Store
          </span>
        </div>

        {/* Delivery marker */}
        <div className="absolute top-4 right-8 flex flex-col items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${progress >= 90 ? "bg-[#0c831f]" : "bg-[#999]"}`}>
            <Navigation className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[8px] font-semibold text-[#666] mt-1 bg-white/80 px-1 py-0.5 rounded">
            You
          </span>
        </div>

        {/* Moving rider dot */}
        <div
          className="absolute w-9 h-9 flex items-center justify-center transition-all duration-500 ease-linear"
          style={{
            left: `${20 + progress * 0.8}%`,
            top: `${80 - progress * 0.5}%`,
          }}
        >
          <div className="w-9 h-9 rounded-full bg-[#0c831f] flex items-center justify-center shadow-lg animate-bounce">
            <Truck className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50">
          <div
            className="h-full bg-gradient-to-r from-[#0c831f] to-[#10b981] transition-all duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-4 space-y-3">
        {/* Rider info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0c831f]/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#0c831f]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a1a1a]">{riderName}</p>
              <p className="text-[10px] text-[#999]">Your delivery partner</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#0c831f] bg-[#e8f5e9] px-2.5 py-1 rounded-full">
            {riderEta}
          </span>
        </div>

        {/* Delivery details */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e8e8e8]">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#ff4f8b] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-[#999]">From</p>
              <p className="text-[11px] font-semibold text-[#1a1a1a] truncate">{storeAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Navigation className="w-3.5 h-3.5 text-[#0c831f] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-[#999]">To</p>
              <p className="text-[11px] font-semibold text-[#1a1a1a] truncate">{deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
