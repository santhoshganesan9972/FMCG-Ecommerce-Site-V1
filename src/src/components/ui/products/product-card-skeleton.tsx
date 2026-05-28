/**
 * Loading skeleton that mirrors the ProductCard layout.
 * Renders a placeholder while product data is loading.
 */
export default function ProductCardSkeleton() {
  return (
    <div
      className="group bg-white rounded-xl border border-[#e8e8e8] overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="relative bg-[#f2f2f2] aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-[#e8e8e8]" />
        {/* Discount badge placeholder */}
        <div className="absolute top-2 left-2 h-5 w-16 rounded bg-[#e8e8e8]" />
      </div>

      {/* Info placeholder */}
      <div className="p-2.5 sm:p-3 space-y-2">
        {/* Delivery + stock row */}
        <div className="flex items-center justify-between gap-1">
          <div className="h-4 w-16 rounded bg-[#e8e8e8]" />
          <div className="h-3 w-14 rounded bg-[#e8e8e8]" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded bg-[#e8e8e8]" />
          <div className="h-3 w-2/3 rounded bg-[#e8e8e8]" />
        </div>

        {/* Category */}
        <div className="h-2.5 w-20 rounded bg-[#e8e8e8]" />

        {/* Price row */}
        <div className="flex items-center justify-between mt-2">
          <div className="space-y-1">
            <div className="h-4 w-14 rounded bg-[#e8e8e8]" />
            <div className="h-2.5 w-10 rounded bg-[#e8e8e8]" />
          </div>
          <div className="h-8 w-16 rounded-lg bg-[#e8e8e8]" />
        </div>
      </div>
    </div>
  );
}
