import Link from "next/link";
import { Metadata } from "next";

export default function RecommendationSection() {
  return (
    <section
      className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 py-2"
      aria-label="AI powered personalized recommendations"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="rounded-xl bg-gradient-to-r from-[#0c831f] to-[#ff4f8b] p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

        <div>
          <meta itemProp="name" content="AI-Powered Personalized Grocery Recommendations" />
          <span
            className="inline-block text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full mb-2"
            aria-hidden="true"
          >
            AI PICKS
          </span>
          <h2
            className="text-base sm:text-lg md:text-xl font-black text-white leading-tight"
            itemProp="name"
          >
            Personalized For You
          </h2>
          <p
            className="text-xs sm:text-sm text-white/80 mt-1 max-w-md"
            itemProp="description"
          >
            Smart product recommendations powered by AI based on your shopping habits and preferences.
          </p>
        </div>

        <Link
          href="/recommendations"
          className="flex-shrink-0 inline-flex items-center justify-center min-h-[44px] h-9 sm:h-10 px-4 sm:px-5 rounded-lg bg-white text-[#0c831f] font-bold text-xs sm:text-sm hover:bg-pink-light hover:text-pink transition"
          aria-label="View all AI-powered personalized recommendations"
        >
          View All
        </Link>

      </div>

    </section>
  );
}
