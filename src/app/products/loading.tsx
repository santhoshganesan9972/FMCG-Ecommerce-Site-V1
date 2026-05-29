export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-24">
      {/* Navbar placeholder */}
      <div className="h-16 bg-white border-b border-[#e8e8e8]" />

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Category pills skeleton */}
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-full bg-[#f0f0f0] shrink-0"
            />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-[#e8e8e8] bg-white p-3"
            >
              <div className="mb-3 aspect-square rounded-xl bg-[#f0f0f0]" />
              <div className="space-y-2">
                <div className="h-3 w-3/4 rounded bg-[#f0f0f0]" />
                <div className="h-3 w-1/2 rounded bg-[#f0f0f0]" />
                <div className="h-5 w-1/3 rounded bg-[#f0f0f0]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
