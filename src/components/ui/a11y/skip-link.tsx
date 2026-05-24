"use client";

export default function SkipLink({
  label = "Skip to main content",
  href = "#main-content",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:inline-flex focus:items-center focus:gap-2 focus:px-4 focus:py-2.5 focus:bg-[#ff4f8b] focus:text-white focus:text-sm focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#ff4f8b]"
    >
      {label}
    </a>
  );
}
