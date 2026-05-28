interface VendorKpiProps {
  title: string;
  value: React.ReactNode;
  growth?: string;
  icon?: React.ReactNode;
}

export default function VendorKpi({ title, value, growth, icon }: VendorKpiProps) {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm sm:p-5 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-[#666]">
          {title}
        </p>
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f6f7f6]">
            {icon}
          </div>
        )}
      </div>
      <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">{value}</h2>
      {growth && (
        <p className="mt-2 text-xs font-black text-[#0c831f]">
          {growth} vs last month
        </p>
      )}
    </div>
  );
}
