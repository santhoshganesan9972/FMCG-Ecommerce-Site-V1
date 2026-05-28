const drivers = [
  { name: "Ravi", zone: "Chennai North", status: "Delivering" },
  { name: "Arjun", zone: "Madurai", status: "Available" },
  { name: "Siva", zone: "Coimbatore", status: "Returning" },
];

export default function DeliveryMonitor() {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#0c831f]">
          Logistics
        </p>
        <h2 className="mt-1 text-lg font-black text-[#1a1a1a]">
          Delivery Monitoring
        </h2>
      </div>

      <div className="space-y-3">
        {drivers.map((driver) => (
          <div
            key={driver.name}
            className="flex items-center justify-between rounded-xl border border-[#e8e8e8] bg-[#f6f7f6] p-3 transition-all duration-200 hover:bg-[#f0f1f3] hover:shadow-sm"
          >
            <div>
              <p className="text-sm font-black text-[#1a1a1a]">
                {driver.name}
              </p>
              <p className="text-xs text-[#666]">{driver.zone}</p>
            </div>
            <span className="text-xs font-black text-[#0c831f]">
              {driver.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
