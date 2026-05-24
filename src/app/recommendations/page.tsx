import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import RecommendationSection from "@/components/ui/products/recommendation-section";

export const metadata: Metadata = {
  title: "Personalized Recommendations | FMCG Commerce",
  description:
    "Discover AI-powered personalized grocery recommendations at FMCG Commerce. Smart picks based on your preferences, past orders, and trending products. Fresh groceries delivered in 10 minutes.",
  keywords: [
    "personalized grocery recommendations",
    "AI-powered grocery picks",
    "recommended groceries",
    "smart grocery shopping",
    "personalized deals",
    "grocery suggestions India",
    "trending groceries",
    "FMCG recommendations",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://fmcg-commerce.vercel.app/recommendations" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fmcg-commerce.vercel.app/recommendations",
    title: "Personalized Grocery Recommendations | FMCG Commerce",
    description:
      "AI-powered personalized grocery recommendations with 10-minute delivery. Fresh picks just for you.",
    siteName: "FMCG Commerce",
  },
  twitter: {
    card: "summary",
    title: "Personalized Recommendations | FMCG Commerce",
    description: "Smart grocery recommendations delivered in 10 minutes.",
    creator: "@fmcgcommerce",
  },
};

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] pb-20 md:pb-0">
      <Navbar />
      <div className="pt-16 max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-6">
        <section className="rounded-2xl border border-[#e8e8e8] bg-white p-6">
          <h1 className="text-2xl font-black text-[#1a1a1a]">Recommended For You</h1>
          <p className="mt-2 text-sm text-[#666]">Personalized picks and promotions based on your activity.</p>
        </section>

        <div className="mt-6">
          <RecommendationSection />
        </div>
      </div>
    </main>
  );
}
