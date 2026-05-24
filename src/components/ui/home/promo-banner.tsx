import Link from "next/link";
import { Metadata } from "next";

export default function PromoBanner() {
  return (
    <section
      className="mx-auto max-w-[1400px] px-3 py-4 sm:px-4 sm:py-5 md:px-6"
      aria-label="Promotional banners"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        {/* Flash Sale Banner */}
        <Link
          href="/offers"
          aria-label="Flash Sale — Up to 50% off on daily essentials at FMCG Commerce"
          className="relative flex items-center justify-between rounded-xl p-5 sm:col-span-2 sm:p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(44, 24, 16, 0.78), rgba(61, 40, 23, 0.78)), url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Flash Sale — Up to 50% OFF" />
            <meta itemProp="description" content="On daily essentials and grocery items at FMCG Commerce" />
            <meta itemProp="url" content="https://fmcg-commerce.vercel.app/offers" />
            <span className="mb-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white">
              FLASH SALE
            </span>
            <h2 className="text-lg font-black leading-tight text-white sm:text-xl md:text-2xl" itemProp="name">
              Up to 50% OFF
            </h2>
            <p className="mt-1 text-xs text-white/75 sm:text-sm" itemProp="description">
              On daily essentials
            </p>
          </div>
          <div className="relative z-10 h-14 w-14 rounded-full bg-white/15 sm:h-16 sm:w-16" aria-hidden="true" />
        </Link>

        {/* Free Delivery Banner */}
        <Link
          href="/offers"
          aria-label="Free Delivery on orders above ₹199 at FMCG Commerce"
          className="relative flex items-center justify-between rounded-xl p-5 sm:p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 25, 34, 0.78), rgba(26, 45, 61, 0.78)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Free Delivery on Orders Above ₹199" />
            <meta itemProp="description" content="No minimum on first order at FMCG Commerce" />
            <meta itemProp="url" content="https://fmcg-commerce.vercel.app/offers" />
            <span className="mb-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold text-white">
              FREE DELIVERY
            </span>
            <h2 className="text-lg font-black leading-tight text-white sm:text-xl">
              Orders above &#8377;199
            </h2>
            <p className="mt-1 text-xs text-white/75">
              No minimum on first order
            </p>
          </div>
          <div className="relative z-10 h-14 w-14 rounded-full bg-white/15 sm:h-16 sm:w-16" aria-hidden="true" />
        </Link>

      </div>
    </section>
  );
}

