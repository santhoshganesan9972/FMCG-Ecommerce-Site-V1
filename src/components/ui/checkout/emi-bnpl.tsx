"use client";

import { useState } from "react";
import { BadgeIndianRupee, Building2, CheckCircle2, ChevronDown, ChevronRight, CreditCard } from "lucide-react";

interface EmiBnplProps {
  total: number;
  paymentMode: "full" | "emi" | "bnpl";
  selectedEmi: number;
  selectedBnpl: string;
  onModeChange: (mode: "full" | "emi" | "bnpl") => void;
  onEmiChange: (months: number) => void;
  onBnplChange: (id: string) => void;
}

const EMI_OPTIONS = [
  { months: 3, interest: 0, label: "3 months — No cost EMI" },
  { months: 6, interest: 0, label: "6 months — No cost EMI" },
  { months: 9, interest: 12, label: "9 months — 12% p.a." },
  { months: 12, interest: 15, label: "12 months — 15% p.a." },
];

const BNPL_OPTIONS = [
  { id: "lazypay", name: "LazyPay", description: "Pay in 15 days", logo: "L" },
  { id: "simpl", name: "Simpl", description: "Pay next month", logo: "S" },
  { id: "zip", name: "ZestMoney", description: "Pay in 3 installments", logo: "Z" },
  { id: "postpe", name: "PostPe", description: "Pay later at 0% interest", logo: "P" },
];

export default function EmiBnpl({ total, paymentMode, selectedEmi, selectedBnpl, onModeChange, onEmiChange, onBnplChange }: EmiBnplProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-white">
      <div className="flex items-center gap-2 border-b border-[#e8e8e8] px-4 py-3">
        <CreditCard className="h-4 w-4 text-[#ff4f8b]" />
        <h2 className="text-sm font-black text-[#1a1a1a]">EMI & Buy Now, Pay Later</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* EMI Option */}
        <button
          onClick={() => onModeChange(paymentMode === "emi" ? "full" : "emi")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
            paymentMode === "emi"
              ? "border-[#0c831f] bg-[#e8f5e9]"
              : "border-[#e8e8e8] hover:border-[#ff4f8b] hover:bg-[#fff0f6]"
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            paymentMode === "emi" ? "bg-[#0c831f]" : "bg-[#fff0f6]"
          }`}>
            <BadgeIndianRupee className={`w-5 h-5 ${paymentMode === "emi" ? "text-white" : "text-[#ff4f8b]"}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-bold ${paymentMode === "emi" ? "text-[#0c831f]" : "text-[#1a1a1a]"}`}>
                EMI (Credit/Debit Card)
              </p>
              <span className="text-[9px] font-bold text-white bg-[#ff4f8b] px-1.5 py-0.5 rounded-full">
                From ₹{Math.round(total / 12)}/mo
              </span>
            </div>
            <p className="text-xs text-[#666] mt-0.5">Split payment into easy monthly installments</p>
          </div>
          {paymentMode === "emi" ? (
            <CheckCircle2 className="w-5 h-5 text-[#0c831f]" />
          ) : (
            <ChevronRight className="w-5 h-5 text-[#ccc]" />
          )}
        </button>

        {paymentMode === "emi" && (
          <div className="space-y-2 pl-12 animate-fade-down">
            {EMI_OPTIONS.map((emi) => {
              const monthlyPayment = Math.round(total / emi.months);
              const isSelected = selectedEmi === emi.months;
              return (
                <label
                  key={emi.months}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected ? "border-[#0c831f] bg-[#e8f5e9]" : "border-[#e8e8e8] hover:border-[#0c831f]"
                  }`}
                  onClick={() => onEmiChange(emi.months)}
                >
                  <input type="radio" name="emi" checked={isSelected} readOnly className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "border-[#0c831f]" : "border-[#ccc]"
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#0c831f]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1a1a1a]">{emi.label}</p>
                    <p className="text-xs text-[#666]">
                      ₹{monthlyPayment}/mo • {emi.interest === 0 ? "No interest" : `${emi.interest}% p.a.`}
                    </p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0c831f]" />}
                </label>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-[#e8e8e8]" />
          <span className="text-[10px] font-medium text-[#999] uppercase flex-shrink-0">Or pay later</span>
          <div className="flex-1 h-px bg-[#e8e8e8]" />
        </div>

        {/* BNPL Option */}
        <button
          onClick={() => onModeChange(paymentMode === "bnpl" ? "full" : "bnpl")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
            paymentMode === "bnpl"
              ? "border-[#0c831f] bg-[#e8f5e9]"
              : "border-[#e8e8e8] hover:border-[#ff4f8b] hover:bg-[#fff0f6]"
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            paymentMode === "bnpl" ? "bg-[#0c831f]" : "bg-[#fff0f6]"
          }`}>
            <Building2 className={`w-5 h-5 ${paymentMode === "bnpl" ? "text-white" : "text-[#ff4f8b]"}`} />
          </div>
          <div className="flex-1">
            <p className={`text-sm font-bold ${paymentMode === "bnpl" ? "text-[#0c831f]" : "text-[#1a1a1a]"}`}>
              Buy Now, Pay Later (BNPL)
            </p>
            <p className="text-xs text-[#666] mt-0.5">Pay in 15 days or 3 interest-free installments</p>
          </div>
          {paymentMode === "bnpl" ? (
            <CheckCircle2 className="w-5 h-5 text-[#0c831f]" />
          ) : (
            <ChevronRight className="w-5 h-5 text-[#ccc]" />
          )}
        </button>

        {paymentMode === "bnpl" && (
          <div className="space-y-2 pl-12 animate-fade-down">
            {BNPL_OPTIONS.map((bnpl) => {
              const isSelected = selectedBnpl === bnpl.id;
              return (
                <label
                  key={bnpl.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    isSelected ? "border-[#0c831f] bg-[#e8f5e9]" : "border-[#e8e8e8] hover:border-[#0c831f]"
                  }`}
                  onClick={() => onBnplChange(bnpl.id)}
                >
                  <input type="radio" name="bnpl" checked={isSelected} readOnly className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "border-[#0c831f]" : "border-[#ccc]"
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#0c831f]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1a1a1a]">{bnpl.name}</p>
                    <p className="text-xs text-[#666]">{bnpl.description}</p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0c831f]" />}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
