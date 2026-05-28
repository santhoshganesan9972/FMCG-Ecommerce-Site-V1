"use client";

import { useState, useEffect, type ReactNode } from "react";

interface ChartContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ChartContainer({ children, className }: ChartContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} />;
  }

  return <div className={className}>{children}</div>;
}
