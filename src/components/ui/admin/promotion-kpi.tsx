interface PromotionKpiProps {
  title: string;
  value: React.ReactNode;
  growth?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function PromotionKpi({ title, value, growth, subtitle, icon }: PromotionKpiProps) {
  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-sm hover:shadow-md transition-shadow sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-[#666]">{title}</p>
        {icon && <div className="text-[#ff4f8b]">{icon}</div>}
      </div>
      <h2 className="mt-2 text-3xl font-black text-[#1a1a1a]">{value}</h2>
      <div className="mt-2 flex items-center gap-1">
        {growth !== undefined && growth !== "-" && (
          <span
            className={`text-xs font-black ${growth.startsWith("-") ? "text-[#ff4f8b]" : "text-[#0c831f]"}`}
          >
            {growth}
          </span>
        )}
        {subtitle && <span className="text-xs font-bold text-[#999]">{subtitle}</span>}
      </div>
    </div>
  );
}
