const insights = [
  "Demand for healthy snacks increased by 28%",
  "AI recommends increasing dairy inventory",
  "Peak order traffic expected at 7 PM",
];

export default function AiInsights() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#0c831f] to-[#ff4f8b] p-5 text-white shadow-sm sm:p-6">
      <p className="text-xs font-black uppercase tracking-wide text-white/70">
        AI Intelligence
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">
        Smart Retail Insights
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        {insights.map((insight) => (
          <div key={insight} className="rounded-xl bg-white/15 p-4 text-sm">
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}
