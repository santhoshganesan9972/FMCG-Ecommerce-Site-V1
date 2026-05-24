"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
  label?: string;
  onClick?: () => void;
}

export default function BackButton({
  href,
  label = "Back",
  onClick,
}: BackButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-9 h-9 rounded-full bg-[#f2f2f2] hover:bg-[#e8e8e8] hover:text-[#ff4f8b] transition-colors"
      aria-label={label}
    >
      <ChevronLeft className="w-5 h-5 text-[#1a1a1a]" />
    </Link>
  );
}
