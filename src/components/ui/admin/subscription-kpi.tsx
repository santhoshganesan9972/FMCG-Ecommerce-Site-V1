export default function SubscriptionKpi({
  title,
  value,
  growth,
  subtitle,
  icon,
  accent = "text-[#0c831f]",
}: {
  title: string;
  value: string;
  growth?: string;
  subtitle?: string;
  icon: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-[#e8e8e8] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-[#666]">{title}</span>
        <div className={accent}>{icon}</div>
      </div>
      <p className="text-xl font-black text-[#1a1a1a]">{value}</p>
      {(growth || subtitle) && (
        <p className="mt-0.5 text-[10px] font-semibold text-[#0c831f]">
          {growth}
          {subtitle && <span className="text-[#999]"> {subtitle}</span>}
        </p>
      )}
    </div>
  );
}
