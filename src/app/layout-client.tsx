"use client";

import { QueryProvider } from "@/lib/query-provider";
import PageTransition from "@/components/ui/page-transition";
import CursorGlow from "@/components/ui/cursor-glow";
import AuthGate from "@/components/ui/auth/auth-gate";
import OfflineIndicator from "@/components/ui/mobile/offline-indicator";
import AnimatedBackground from "@/components/ui/animated-background";
import GlobalComparison from "@/components/ui/products/global-comparison";

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <AnimatedBackground />
      <AuthGate />
      <OfflineIndicator />
      <PageTransition>
        <CursorGlow />
        {children}
        <GlobalComparison />
      </PageTransition>
    </QueryProvider>
  );
}
