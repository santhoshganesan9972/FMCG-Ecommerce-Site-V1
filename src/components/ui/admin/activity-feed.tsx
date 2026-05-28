const feed = [
  "Vendor payout processed",
  "New analytics report generated",
  "Product stock updated",
  "Delivery performance improved",
];

export default function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Activity Feed
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Operational Events
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {feed.map((item, index) => (
          <div key={item} className="flex gap-3 rounded-xl bg-[#f6f7f6] p-3 transition-all duration-200 hover:bg-[#f0f1f3] hover:shadow-sm">
            <div
              className={`mt-1.5 h-3 w-3 rounded-full ${
                index % 2 === 0 ? "bg-[#0c831f]" : "bg-[#ff4f8b]"
              }`}
            />
            <p className="text-sm font-semibold text-[#666]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
