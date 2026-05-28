"use client";

import type { ReactNode } from "react";
import { CARD, TEXT_PRIMARY, TEXT_MUTED } from "@/lib/shared-classes";

interface ReusableFormSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A bordered form section with title and subtitle.
 *
 * @example
 * <ReusableFormSection title="Business Details" subtitle="Vendor profile information">
 *   <input ... />
 * </ReusableFormSection>
 */
export function ReusableFormSection({
  title,
  subtitle,
  children,
  className = "",
}: ReusableFormSectionProps) {
  return (
    <div className={`${CARD} p-5 ${className}`}>
      <div className="mb-4">
        <h3 className={`text-sm font-black ${TEXT_PRIMARY}`}>{title}</h3>
        {subtitle && <p className={`mt-0.5 text-xs ${TEXT_MUTED}`}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
