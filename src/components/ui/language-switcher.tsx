"use client";

import { useState } from "react";
import { useLanguageStore, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/store/language-store";
import { Check, ChevronDown, Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "settings" | "inline";
}

export default function LanguageSwitcher({ variant = "settings" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === language)!;

  if (variant === "inline") {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 h-10 px-3 rounded-lg border border-[#e8e8e8] text-sm font-semibold text-[#666] hover:border-[#ff4f8b] hover:text-[#ff4f8b] transition-colors"
          aria-label="Select language"
          aria-expanded={open}
        >
          <Globe className="w-4 h-4" />
          <span>{current.nativeName}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute top-full right-0 mt-1 z-20 bg-white rounded-xl border border-[#e8e8e8] shadow-lg min-w-[200px] overflow-hidden">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#fafafa] transition-colors ${
                    language === lang.code ? "bg-[#fff0f6]" : ""
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    language === lang.code ? "border-[#ff4f8b]" : "border-[#ccc]"
                  }`}>
                    {language === lang.code && <div className="w-2.5 h-2.5 rounded-full bg-[#ff4f8b]" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${language === lang.code ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                      {lang.nativeName}
                    </p>
                    <p className="text-[10px] text-[#999]">{lang.name}</p>
                  </div>
                  {language === lang.code && <Check className="w-4 h-4 text-[#ff4f8b] ml-auto" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Settings variant — full list
  return (
    <div className="space-y-1">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
            language === lang.code ? "bg-[#fff0f6] border border-[#ff4f8b]/20" : "hover:bg-[#fafafa] border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
              language === lang.code ? "bg-[#ff4f8b] text-white" : "bg-[#f2f2f2] text-[#666]"
            }`}>
              {lang.code.toUpperCase()}
            </div>
            <div className="text-left">
              <p className={`text-sm font-semibold ${language === lang.code ? "text-[#ff4f8b]" : "text-[#1a1a1a]"}`}>
                {lang.nativeName}
              </p>
              <p className="text-xs text-[#999]">{lang.name}</p>
            </div>
          </div>
          {language === lang.code && <Check className="w-5 h-5 text-[#ff4f8b]" />}
        </button>
      ))}
    </div>
  );
}
