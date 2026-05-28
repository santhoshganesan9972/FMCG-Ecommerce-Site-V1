const inventory = [
  { title: "Low Stock", value: "28", tone: "pink" },
  { title: "Out of Stock", value: "12", tone: "pink" },
  { title: "Active Products", value: "1,248", tone: "green" },
];

export default function InventoryOverview() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {inventory.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5"
        >
          <div
            className={`mb-4 h-1.5 w-12 rounded-full ${
              item.tone === "green" ? "bg-[#0c831f]" : "bg-[#ff4f8b]"
            }`}
          />
          <p className="text-xs font-bold uppercase tracking-wide text-[#666]">
            {item.title}
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
