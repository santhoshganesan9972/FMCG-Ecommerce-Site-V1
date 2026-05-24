"use client";

import dynamic from "next/dynamic";

const PageTransition = dynamic(
  () => import("@/components/ui/page-transition"),
  { ssr: true }
);

const CursorGlow = dynamic(
  () => import("@/components/ui/cursor-glow"),
  { ssr: false }
);

const AuthGate = dynamic(
  () => import("@/components/ui/auth/auth-gate"),
  { ssr: false }
);

const OfflineIndicator = dynamic(
  () => import("@/components/ui/mobile/offline-indicator"),
  { ssr: false }
);

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthGate />
      <OfflineIndicator />
      <PageTransition>
        <CursorGlow />
        {children}
      </PageTransition>
    </>
  );
}
