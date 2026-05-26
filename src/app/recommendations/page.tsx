import type { Metadata } from "next";
import { env } from "@/lib/env";
import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import BottomNav from "@/components/ui/mobile/bottom-nav";
import ProductCard from "@/components/ui/products/product-card";
import { products } from "@/data/products";

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
  alternates: { canonical: `${env.siteUrl}/recommendations` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${env.siteUrl}/recommendations`,
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

function getRecommendedProducts() {
  return [...products]
    .filter((p) => p.stock !== "out_of_stock")
    .sort((a, b) => b.rating - a.rating);
}

const recommendedProducts = getRecommendedProducts();

export default function RecommendationsPage() {

  return (
    <main className="bg-[#f2f2f2] min-h-screen pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Recommendations | FMCG Commerce",
            description: "AI-powered personalized grocery recommendations with 10-minute delivery.",
            url: `${env.siteUrl}/recommendations`,
            numberOfItems: recommendedProducts.length,
          }),
        }}
      />
      <Navbar />

      <div className="pt-16">
        <div className="bg-white border-b border-[#e8e8e8] sticky top-16 z-10">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-3 flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-8 h-8 rounded-full bg-[#f2f2f2] hover:bg-[#fff0f6] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff4f8b]" />
              <div>
                <h1 className="text-base sm:text-lg font-black text-[#1a1a1a] leading-tight">
                  Recommended For You
                </h1>
                <p className="text-[11px] text-[#999]">
                  {recommendedProducts.length} AI-powered picks
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#0c831f] to-[#ff4f8b] p-4 sm:p-6">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-white text-xs sm:text-sm opacity-90">
              Smart product recommendations powered by AI based on your shopping habits, preferences, and top-rated products.
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {recommendedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">✨</span>
              <p className="text-base font-bold text-[#1a1a1a]">No recommendations yet</p>
              <p className="text-sm text-[#999] mt-1">Keep shopping to see personalized picks!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
