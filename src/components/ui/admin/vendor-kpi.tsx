interface VendorKpiProps {
  title: string;
  value: React.ReactNode;
  growth: string;
}

export default function VendorKpi({ title, value, growth }: VendorKpiProps) {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-[#666]">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">{value}</h2>
      <p className="mt-2 text-xs font-black text-[#0c831f]">
        {growth} vs last month
      </p>
    </div>
  );
}
