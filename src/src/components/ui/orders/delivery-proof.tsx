"use client";

import { useState } from "react";
import { Camera, CheckCircle2, X, MapPin, Clock, User, Image as ImageIcon, Shield, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { toast } from "sonner";

interface DeliveryProofProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryPerson: string;
  deliveryAddress: string;
}

type ProofView = "photo" | "signature" | "details";

export default function DeliveryProof({ isOpen, onClose, orderId, deliveryDate, deliveryTime, deliveryPerson, deliveryAddress }: DeliveryProofProps) {
  const [view, setView] = useState<ProofView>("details");
  const [showPhoto, setShowPhoto] = useState(false);

  if (!isOpen) return null;

  const proofPhotos = [
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1607346256330-dee45af38982?w=400&h=300&fit=crop",
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#0c831f]" />
            <h2 className="text-base font-bold text-[#1a1a1a]">Delivery Proof</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f2f2f2] rounded-full transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e8e8e8]">
          {[
            { id: "details" as ProofView, label: "Details", icon: Shield },
            { id: "photo" as ProofView, label: "Photo", icon: ImageIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 h-11 text-xs font-bold border-b-2 transition-colors ${
                view === tab.id ? "border-[#ff4f8b] text-[#ff4f8b]" : "border-transparent text-[#999] hover:text-[#666]"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {view === "details" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-[#e8f5e9] p-4">
                <CheckCircle2 className="w-6 h-6 text-[#0c831f]" />
                <div>
                  <p className="text-sm font-bold text-[#0c831f]">Delivered Successfully</p>
                  <p className="text-xs text-[#666]">Order {orderId}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-[#999] mt-0.5" />
                  <div>
                    <p className="text-[10px] text-[#999]">Delivered by</p>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{deliveryPerson}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#999] mt-0.5" />
                  <div>
                    <p className="text-[10px] text-[#999]">Date & Time</p>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{deliveryDate} at {deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#999] mt-0.5" />
                  <div>
                    <p className="text-[10px] text-[#999]">Delivery Address</p>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{deliveryAddress}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#e8e8e8] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-[#0c831f]" />
                  <p className="text-xs font-bold text-[#1a1a1a]">Delivery Confirmation</p>
                </div>
                <p className="text-[10px] text-[#666] leading-relaxed">
                  This confirms that the order was handed over to the recipient at the provided address. 
                  For security purposes, delivery partner details and proof photos are recorded.
                </p>
              </div>
            </div>
          )}

          {view === "photo" && (
            <div className="space-y-4">
              <p className="text-xs text-[#666]">Photos taken at the time of delivery as proof.</p>
              <div className="grid grid-cols-2 gap-3">
                {proofPhotos.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setShowPhoto(true)}
                    className="relative aspect-square rounded-xl overflow-hidden bg-[#f2f2f2] group"
                  >
                    <SafeImage src={src} alt={`Delivery proof ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[8px] font-semibold px-1.5 py-0.5 rounded">
                      Photo {i + 1}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#999] text-center">Photos are stored securely for verification purposes</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#e8e8e8] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border-2 border-[#e8e8e8] text-xs font-bold text-[#666] hover:border-[#ff4f8b] hover:text-[#ff4f8b] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              const text = `Delivery Proof — Order ${orderId}\nDelivered: ${deliveryDate} at ${deliveryTime}\nBy: ${deliveryPerson}\nAddress: ${deliveryAddress}`;
              navigator.clipboard.writeText(text);
              toast.success("Delivery details copied");
            }}
            className="flex-1 h-11 rounded-xl bg-[#ff4f8b] text-white text-xs font-bold hover:bg-[#e63872] transition-colors"
          >
            Copy Details
          </button>
        </div>
      </div>

      {/* Full-screen photo view */}
      {showPhoto && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center" onClick={() => setShowPhoto(false)}>
          <button onClick={() => setShowPhoto(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={proofPhotos[0]}
            alt="Delivery proof"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
          />
        </div>
      )}

    </>
  );
}
