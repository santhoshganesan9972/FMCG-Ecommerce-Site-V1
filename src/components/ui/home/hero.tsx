import Link from "next/link";
import { Metadata } from "next";

export default function Hero() {
  const banners = [
    {
      bg: "from-[#2C1810] via-[#3D2817] to-[#4E2E20]",
      tag: "Flash Sale",
      title: "Up to 50% OFF",
      subtitle: "On daily essentials & groceries",
      cta: "Shop Now",
      href: "/search",
    },
    {
      bg: "from-[#0f1922] to-[#1a2d3d]",
      tag: "Fresh Arrivals",
      title: "Farm Fresh Veggies",
      subtitle: "Delivered in 10 minutes",
      href: "/search?category=Fruits",
    },
    {
      bg: "from-[#4a1f34] to-[#6a2f4a]",
      tag: "Weekend Special",
      title: "Snacks & Beverages",
      subtitle: "Stock up for the weekend",
      href: "/search?category=Snacks",
    },
  ];

  return (
    <section
      className="w-full bg-white pt-16"
      aria-label="Featured promotions"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      <meta itemProp="name" content="FMCG Commerce Featured Deals" />
      <div className="mx-auto max-w-[1400px] px-3 py-3 sm:px-4 sm:py-4 md:px-6">
        {/* Hero / primary banner */}
        <Link
          href={banners[0].href}
          aria-label={`${banners[0].title} — ${banners[0].subtitle}`}
          className="relative block overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10"
          style={{
            backgroundImage: `linear-gradient(rgba(28, 19, 14, 0.78), rgba(33, 23, 17, 0.78)), url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="hidden" itemProp="description">
            {banners[0].title} — {banners[0].subtitle}
          </span>
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 max-w-lg">
            <span className="mb-3 inline-block rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold text-white">
              {banners[0].tag}
            </span>
            <h1
              className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl"
            >
              {banners[0].title}
            </h1>
            <p className="mt-2 mb-4 text-sm text-white/75 sm:text-base">
              {banners[0].subtitle}
            </p>
            <div
              className="inline-flex min-h-[44px] h-10 items-center rounded-lg bg-white px-5 text-sm font-black text-[#0c831f] transition hover:bg-[#fff0f6] hover-text-pink sm:h-11 sm:px-6"
            >
              {banners[0].cta}
            </div>
          </div>

          <div
            className="absolute right-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 sm:right-10 sm:h-32 sm:w-32 md:h-40 md:w-40"
            aria-hidden="true"
          />
        </Link>

        {/* Secondary banners */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {banners.slice(1).map((banner) => (
            <Link
              key={banner.tag}
              href={banner.href}
              aria-label={`${banner.title} — ${banner.subtitle}`}
              className="relative overflow-hidden rounded-xl p-4 transition hover:opacity-95 sm:p-6"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 25, 34, 0.72), rgba(22, 31, 46, 0.72)), url('https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/25" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span
                    className="mb-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <meta itemProp="name" content={banner.tag} />
                    {banner.tag}
                  </span>
                  <h3
                    className="text-base font-black text-white sm:text-lg"
                    itemProp="name"
                  >
                    {banner.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/75 sm:text-sm" itemProp="description">
                    {banner.subtitle}
                  </p>
                </div>
                <div className="ml-3 h-14 w-14 flex-shrink-0 rounded-full bg-white/15 sm:h-16 sm:w-16" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}