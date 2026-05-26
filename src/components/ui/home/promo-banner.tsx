import { env } from "@/lib/env";
import Link from "next/link";

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
          className="relative flex items-center justify-between rounded-xl p-5 sm:col-span-2 sm:p-6 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 79, 139, 0.95), rgba(230, 56, 114, 0.9)), url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Flash Sale — Up to 50% OFF" />
            <meta itemProp="description" content="On daily essentials and grocery items at FMCG Commerce" />
            <meta itemProp="url" content={`${env.siteUrl}/offers`} />
            <span className="mb-2 inline-block rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
              FLASH SALE
            </span>
            <h2 className="text-lg font-black leading-tight text-white sm:text-xl md:text-2xl drop-shadow-sm" itemProp="name">
              Up to 50% OFF
            </h2>
            <p className="mt-1 text-xs text-white/90 sm:text-sm" itemProp="description">
              On daily essentials
            </p>
          </div>
        </Link>

        {/* Free Delivery Banner */}
        <Link
          href="/offers"
          aria-label="Free Delivery on orders above ₹199 at FMCG Commerce"
          className="relative flex items-center justify-between rounded-xl p-5 sm:p-6 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(12, 131, 31, 0.95), rgba(16, 185, 129, 0.9)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="name" content="Free Delivery on Orders Above ₹199" />
            <meta itemProp="description" content="No minimum on first order at FMCG Commerce" />
            <meta itemProp="url" content={`${env.siteUrl}/offers`} />
            <span className="mb-2 inline-block rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
              FREE DELIVERY
            </span>
            <h2 className="text-lg font-black leading-tight text-white sm:text-xl drop-shadow-sm">
              Orders above &#8377;199
            </h2>
            <p className="mt-1 text-xs text-white/90">
              No minimum on first order
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
