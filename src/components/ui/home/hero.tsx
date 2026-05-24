import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="w-full bg-white pt-16"
      aria-label="Featured promotions"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      <meta itemProp="name" content="FMCG Commerce Featured Deals" />
      <div className="mx-auto max-w-[1400px] px-3 py-3 sm:px-4 sm:py-4 md:px-6">
        {/* Hero / primary banner - Flash Sale */}
        <Link
          href="/search"
          aria-label="Up to 50% OFF — On daily essentials & groceries"
          className="relative block overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(220, 38, 38, 0.9), rgba(249, 115, 22, 0.85)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="hidden" itemProp="description">
            Up to 50% OFF — On daily essentials & groceries
          </span>
          <div className="relative z-10 max-w-lg">
            <span className="mb-3 inline-block rounded-full bg-white/25 px-3 py-1 text-xs font-black text-white uppercase tracking-wider">
              Flash Sale
            </span>
            <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl drop-shadow-sm">
              Up to 50% OFF
            </h1>
            <p className="mt-2 mb-4 text-sm text-white/90 sm:text-base">
              On daily essentials & groceries
            </p>
            <div className="inline-flex min-h-[44px] h-10 items-center rounded-lg bg-white px-5 text-sm font-black text-[#dc2626] transition hover:bg-white/95 sm:h-11 sm:px-6 shadow-lg">
              Shop Now
            </div>
          </div>
        </Link>

        {/* Secondary banners */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {/* Fresh Arrivals - Veggies */}
          <Link
            href="/search?category=Fruits"
            aria-label="Farm Fresh Veggies — Delivered in 10 minutes"
            className="relative overflow-hidden rounded-xl p-4 transition hover:opacity-95 sm:p-6"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(5, 150, 105, 0.92), rgba(16, 185, 129, 0.85)), url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <span className="mb-2 inline-block rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
                Fresh Arrivals
              </span>
              <h3 className="text-base font-black text-white sm:text-lg drop-shadow-sm">
                Farm Fresh Veggies
              </h3>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">
                Delivered in 10 minutes
              </p>
            </div>
          </Link>

          {/* Weekend Special - Snacks */}
          <Link
            href="/search?category=Snacks"
            aria-label="Snacks & Beverages — Stock up for the weekend"
            className="relative overflow-hidden rounded-xl p-4 transition hover:opacity-95 sm:p-6"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.92), rgba(168, 85, 247, 0.85)), url('https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <span className="mb-2 inline-block rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
                Weekend Special
              </span>
              <h3 className="text-base font-black text-white sm:text-lg drop-shadow-sm">
                Snacks & Beverages
              </h3>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">
                Stock up for the weekend
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
