interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, { color: string; bg: string }> = {
  Delivered: { color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  "Out for Delivery": { color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  Processing: { color: "text-[#e65100]", bg: "bg-[#fff3e0]" },
  Cancelled: { color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
  Active: { color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  Inactive: { color: "text-[#999]", bg: "bg-[#f2f2f2]" },
  InStock: { color: "text-[#0c831f]", bg: "bg-[#e8f5e9]" },
  LowStock: { color: "text-[#e65100]", bg: "bg-[#fff3e0]" },
  OutOfStock: { color: "text-[#ff4f8b]", bg: "bg-[#fff0f6]" },
};

function getStatusStyle(status: string) {
  // Direct match first
  if (statusStyles[status]) return statusStyles[status];
  // Fallback
  return { color: "text-[#666]", bg: "bg-[#f2f2f2]" };
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = getStatusStyle(status);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${style.bg} ${style.color} ${className}`}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
