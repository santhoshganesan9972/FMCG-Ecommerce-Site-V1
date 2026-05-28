"use client";

import type { ReactNode } from "react";
import BackButton from "./back-button";

interface PageHeaderProps {
  title: string;
  backHref: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  backHref,
  subtitle,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`bg-white border-b border-[#e8e8e8] px-4 py-3 sticky top-0 z-10 ${className}`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center gap-3">
        <BackButton href={backHref} label={`Back to ${title}`} />
        <div className="flex-1">
          <h1 className="text-lg font-bold text-[#1a1a1a]">{title}</h1>
          {subtitle && (
            <p className="text-xs text-[#666] mt-0.5">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
