export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-24">
      {/* Profile header skeleton */}
      <div className="bg-gradient-to-br from-[#ff4f8b] via-[#ff4f8b] to-[#ff6b9d] px-5 pt-8 pb-10">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-white/20" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-white/20" />
            <div className="h-4 w-32 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="mx-auto -mt-6 mb-6 max-w-[1400px] px-4">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-[#e8e8e8] bg-white p-4"
            >
              <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-[#f0f0f0]" />
              <div className="mx-auto mb-1 h-6 w-12 rounded bg-[#f0f0f0]" />
              <div className="mx-auto h-3 w-16 rounded bg-[#f0f0f0]" />
            </div>
          ))}
        </div>
      </div>

      {/* Menu groups skeleton */}
      <div className="mx-auto max-w-[1400px] space-y-6 px-4">
        {[1, 2, 3].map((g) => (
          <div key={g}>
            <div className="mb-3 h-5 w-32 animate-pulse rounded bg-[#f0f0f0] px-1" />
            <div className="divide-y divide-[#e8e8e8] rounded-2xl border border-[#e8e8e8] bg-white">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-4">
                  <div className="h-11 w-11 animate-pulse rounded-xl bg-[#f0f0f0]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-36 animate-pulse rounded bg-[#f0f0f0]" />
                    <div className="h-3 w-48 animate-pulse rounded bg-[#f0f0f0]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
