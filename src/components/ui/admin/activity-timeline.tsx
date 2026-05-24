const activities = [
  "New order received from Chennai",
  "Inventory updated for Dairy products",
  "AI forecast generated for snacks",
  "Delivery partner assigned",
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Activity
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Live Timeline
        </h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity} className="flex gap-3">
            <div
              className={`mt-1.5 h-3 w-3 rounded-full ${
                index % 2 === 0 ? "bg-[#0c831f]" : "bg-[#ff4f8b]"
              }`}
            />
            <p className="text-sm font-semibold text-[#666]">{activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
