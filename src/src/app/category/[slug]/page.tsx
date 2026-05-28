import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { env } from "@/lib/env";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import { categorySections } from "@/data/categories";
import Navbar from "@/components/ui/navbar";
import BottomNav from "@/components/ui/mobile/bottom-nav";
import CategoryClient from "@/components/ui/category/category-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categorySections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = categorySections.find((s) => s.slug === slug);
  if (!section) return {};
  
  return {
    title: `Buy ${section.label} Online | FMCG Commerce — Ultra-fast Delivery`,
    description: `Shop fresh ${section.label.toLowerCase()} online at FMCG Commerce. Wide selection of ${section.label.toLowerCase()} with 10-minute delivery. Free delivery above ₹199. Best prices guaranteed.`,
    keywords: [`${section.label.toLowerCase()} online`, `buy ${section.label.toLowerCase()}`, `${section.label.toLowerCase()} delivery`, `fresh ${section.label.toLowerCase()}`, `FMCG ${section.label.toLowerCase()}`, `grocery ${section.label.toLowerCase()} India`],
    robots: { index: true, follow: true },
    alternates: { canonical: `${env.siteUrl}/category/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${env.siteUrl}/category/${slug}`,
      title: `Buy ${section.label} Online | FMCG Commerce`,
      description: `Shop fresh ${section.label.toLowerCase()} online with 10-minute delivery. Best prices & free delivery above ₹199.`,
      siteName: "FMCG Commerce",
    },
    twitter: {
      card: "summary",
      title: `Buy ${section.label} Online | FMCG Commerce`,
      description: `Fresh ${section.label.toLowerCase()} delivered in 10 minutes. Order now!`,
      creator: "@fmcgcommerce",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const section = categorySections.find((s) => s.slug === slug);
  if (!section) notFound();

  const items = products.filter((p) => section.filter(p.category));

  return (
    <main className="bg-[#f2f2f2] min-h-screen pb-20 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${section.label} | FMCG Commerce`,
            description: `Shop fresh ${section.label.toLowerCase()} online with 10-minute delivery.`,
            url: `${env.siteUrl}/category/${slug}`,
            numberOfItems: items.length,
          }),
        }}
      />
      <Navbar />

      <div className="pt-[72px] sm:pt-20">
        {/* Page header */}
        <div className="bg-white border-b border-[#e8e8e8] sticky top-[72px] sm:top-20 z-10">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-3 flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-8 h-8 rounded-full bg-[#f2f2f2] hover-bg-pink-light transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none">{section.emoji}</span>
              <div>
                <h1 className="text-base sm:text-lg font-black text-[#1a1a1a] font-royal leading-tight">
                  {section.label}
                </h1>
                <p className="text-[11px] text-[#999]">{items.length} products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product grid with sorting & pagination */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <CategoryClient
            items={items}
            categoryEmoji={section.emoji}
            categoryLabel={section.label}
          />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
