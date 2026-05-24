"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SupportedLanguage = "en" | "hi" | "bn" | "te" | "ta" | "mr" | "gu";

interface LanguageEntry {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageEntry[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
];

// Simple key-value translations for key UI strings
const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    "search.placeholder": "Search for groceries, snacks, beverages...",
    "search.results": "results found",
    "search.noResults": "No results found",
    "cart.empty": "Nothing in your cart yet",
    "cart.title": "My Cart",
    "checkout.title": "Checkout",
    "checkout.placeOrder": "Place Order",
    "account.title": "My Account",
    "delivery.in10mins": "Delivery in 10 minutes",
    "product.addToCart": "Add to Cart",
    "nav.home": "Home",
    "nav.search": "Search",
    "nav.offers": "Offers",
    "nav.cart": "Cart",
    "nav.account": "Account",
    "filter.apply": "Apply Filters",
    "filter.clear": "Clear all",
    "filter.reset": "Reset",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
  },
  hi: {
    "search.placeholder": "किराना, स्नैक्स, पेय पदार्थ खोजें...",
    "search.results": "परिणाम मिले",
    "search.noResults": "कोई परिणाम नहीं मिला",
    "cart.empty": "आपकी टोकरी में अभी कुछ नहीं है",
    "cart.title": "मेरी टोकरी",
    "checkout.title": "चेकआउट",
    "checkout.placeOrder": "ऑर्डर करें",
    "account.title": "मेरा खाता",
    "delivery.in10mins": "10 मिनट में डिलीवरी",
    "product.addToCart": "टोकरी में डालें",
    "nav.home": "होम",
    "nav.search": "खोज",
    "nav.offers": "ऑफ़र",
    "nav.cart": "टोकरी",
    "nav.account": "खाता",
    "filter.apply": "फ़िल्टर लागू करें",
    "filter.clear": "सभी हटाएं",
    "filter.reset": "रीसेट",
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हो गया",
  },
  bn: {
    "search.placeholder": "মুদিখানা, স্ন্যাকস, পানীয় অনুসন্ধান করুন...",
    "search.results": "ফলাফল পাওয়া গেছে",
    "search.noResults": "কোন ফলাফল পাওয়া যায়নি",
    "cart.empty": "আপনার কার্টে এখনও কিছু নেই",
    "cart.title": "আমার কার্ট",
    "checkout.title": "চেকআউট",
    "checkout.placeOrder": "অর্ডার করুন",
    "account.title": "আমার অ্যাকাউন্ট",
    "delivery.in10mins": "১০ মিনিটে ডেলিভারি",
    "product.addToCart": "কার্টে যোগ করুন",
    "nav.home": "হোম",
    "nav.search": "অনুসন্ধান",
    "nav.offers": "অফার",
    "nav.cart": "কার্ট",
    "nav.account": "অ্যাকাউন্ট",
    "filter.apply": "ফিল্টার প্রয়োগ করুন",
    "filter.clear": "সব মুছুন",
    "filter.reset": "রিসেট",
    "common.loading": "লোড হচ্ছে...",
    "common.error": "কিছু ভুল হয়েছে",
  },
  te: {
    "search.placeholder": "కిరాణా, స్నాక్స్, పానీయాలు శోధించండి...",
    "search.results": "ఫలితాలు కనుగొనబడ్డాయి",
    "search.noResults": "ఫలితాలు ఏవీ కనుగొనబడలేదు",
    "cart.empty": "మీ కార్ట్‌లో ఇంకా ఏమీ లేదు",
    "cart.title": "నా కార్ట్",
    "checkout.title": "చెక్అవుట్",
    "checkout.placeOrder": "ఆర్డర్ చేయండి",
    "account.title": "నా ఖాతా",
    "delivery.in10mins": "10 నిమిషాల్లో డెలివరీ",
    "product.addToCart": "కార్ట్‌లో చేర్చండి",
    "nav.home": "హోమ్",
    "nav.search": "శోధన",
    "nav.offers": "ఆఫర్లు",
    "nav.cart": "కార్ట్",
    "nav.account": "ఖాతా",
    "filter.apply": "ఫిల్టర్‌లను వర్తింపజేయండి",
    "filter.clear": "అన్నీ క్లియర్ చేయండి",
    "filter.reset": "రీసెట్",
    "common.loading": "లోడ్ అవుతోంది...",
    "common.error": "ఏదో తప్పు జరిగింది",
  },
  ta: {
    "search.placeholder": "மளிகை, தின்பண்டங்கள், பானங்களைத் தேடுங்கள்...",
    "search.results": "முடிவுகள் கண்டறியப்பட்டன",
    "search.noResults": "முடிவுகள் எதுவும் கிடைக்கவில்லை",
    "cart.empty": "உங்கள் வண்டியில் இன்னும் எதுவும் இல்லை",
    "cart.title": "என் வண்டி",
    "checkout.title": "செக்அவுட்",
    "checkout.placeOrder": "ஆர்டர் செய்யுங்கள்",
    "account.title": "என் கணக்கு",
    "delivery.in10mins": "10 நிமிடங்களில் டெலிவரி",
    "product.addToCart": "வண்டியில் சேர்க்கவும்",
    "nav.home": "முகப்பு",
    "nav.search": "தேடல்",
    "nav.offers": "சலுகைகள்",
    "nav.cart": "வண்டி",
    "nav.account": "கணக்கு",
    "filter.apply": "வடிப்பான்களைப் பயன்படுத்து",
    "filter.clear": "அனைத்தையும் அழி",
    "filter.reset": "மீட்டமை",
    "common.loading": "ஏற்றுகிறது...",
    "common.error": "ஏதோ தவறு ஏற்பட்டது",
  },
  mr: {
    "search.placeholder": "किराणा, स्नॅक्स, पेये शोधा...",
    "search.results": "परिणाम सापडले",
    "search.noResults": "कोणतेही परिणाम सापडले नाहीत",
    "cart.empty": "तुमच्या कार्टमध्ये अजून काहीही नाही",
    "cart.title": "माझी कार्ट",
    "checkout.title": "चेकआउट",
    "checkout.placeOrder": "ऑर्डर द्या",
    "account.title": "माझे खाते",
    "delivery.in10mins": "10 मिनिटांत डिलिव्हरी",
    "product.addToCart": "कार्टमध्ये घाला",
    "nav.home": "होम",
    "nav.search": "शोध",
    "nav.offers": "ऑफर",
    "nav.cart": "कार्ट",
    "nav.account": "खाते",
    "filter.apply": "फिल्टर लागू करा",
    "filter.clear": "सर्व साफ करा",
    "filter.reset": "रीसेट",
    "common.loading": "लोड होत आहे...",
    "common.error": "काहीतरी चुकले",
  },
  gu: {
    "search.placeholder": "કરિયાણા, નાસ્તો, પીણાં શોધો...",
    "search.results": "પરિણામો મળ્યાં",
    "search.noResults": "કોઈ પરિણામ મળ્યું નથી",
    "cart.empty": "તમારા કાર્ટમાં હજી કંઈ નથી",
    "cart.title": "મારું કાર્ટ",
    "checkout.title": "ચેકઆઉટ",
    "checkout.placeOrder": "ઓર્ડર કરો",
    "account.title": "મારું એકાઉન્ટ",
    "delivery.in10mins": "10 મિનિટમાં ડિલિવરી",
    "product.addToCart": "કાર્ટમાં ઉમેરો",
    "nav.home": "હોમ",
    "nav.search": "શોધ",
    "nav.offers": "ઑફર્સ",
    "nav.cart": "કાર્ટ",
    "nav.account": "એકાઉન્ટ",
    "filter.apply": "ફિલ્ટર લાગુ કરો",
    "filter.clear": "બધું સાફ કરો",
    "filter.reset": "રીસેટ",
    "common.loading": "લોડ થઈ રહ્યું છે...",
    "common.error": "કંઈક ખોટું થયું",
  },
};

interface LanguageStore {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      t: (key: string) => {
        const lang = get().language;
        return translations[lang]?.[key] || translations["en"]?.[key] || key;
      },
    }),
    { name: "fmcg-language" }
  )
);
