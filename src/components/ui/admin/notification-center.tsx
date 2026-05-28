const notifications = [
  "New vendor onboarded",
  "Low inventory alert triggered",
  "AI forecast updated",
  "Revenue milestone achieved",
];

export default function NotificationCenter() {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Notifications
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          System Alerts
        </h2>
      </div>

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div
            key={item}
            className="rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] p-3 text-sm font-semibold text-[#666] transition-all duration-200 hover:bg-[#f0f1f3] hover:shadow-sm"
          >
            <span
              className={`mr-2 inline-block h-2 w-2 rounded-full ${
                index % 2 === 0 ? "bg-[#0c831f]" : "bg-[#ff4f8b]"
              }`}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
