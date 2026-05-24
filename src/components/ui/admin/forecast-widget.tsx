const forecasts = [
  "Rice demand expected to rise by 18%",
  "Weekend traffic spike predicted",
  "Suggested inventory refill for beverages",
];

export default function ForecastWidget() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#0c831f] to-[#ff4f8b] p-5 text-white shadow-sm sm:p-6">
      <p className="text-xs font-black uppercase tracking-wide text-white/70">
        AI Forecast
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">
        Smart Demand Prediction
      </h2>

      <div className="mt-5 space-y-3">
        {forecasts.map((forecast) => (
          <div key={forecast} className="rounded-xl bg-white/15 p-4 text-sm">
            {forecast}
          </div>
        ))}
      </div>
    </div>
  );
}
