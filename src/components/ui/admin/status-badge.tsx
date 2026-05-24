interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {

  const colors = {
    "In Stock":
      "bg-[#e8f5e9] text-[#0c831f]",

    "Low Stock":
      "bg-[#fff0f6] text-[#ff4f8b]",

    "Out Of Stock":
      "bg-[#ff4f8b]/20 text-[#ff4f8b]",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm ${
        colors[
          status as keyof typeof colors
        ]
      }`}
    >
      {status}
    </span>
  );
}
