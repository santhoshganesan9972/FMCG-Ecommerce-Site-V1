export default function OffersLoading() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-24">
      {/* Header skeleton */}
      <div className="bg-white border-b border-[#e8e8e8] px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-[#f0f0f0]" />
          <div className="h-4 w-72 animate-pulse rounded bg-[#f0f0f0]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Banner skeleton */}
        <div className="h-48 animate-pulse rounded-2xl bg-[#f0f0f0]" />

        {/* Offer cards skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-[#e8e8e8] bg-white p-4"
            >
              <div className="mb-3 h-40 rounded-xl bg-[#f0f0f0]" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-[#f0f0f0]" />
                <div className="h-3 w-1/2 rounded bg-[#f0f0f0]" />
                <div className="h-10 w-full rounded-xl bg-[#f0f0f0]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
