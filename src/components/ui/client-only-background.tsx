"use client";

// next/dynamic with ssr:false is only allowed inside Client Components.
// layout.tsx is a Server Component, so we wrap here and import the wrapper.
import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(
  () => import("@/components/ui/animated-background"),
  { ssr: false, loading: () => null }
);

export default function ClientOnlyBackground() {
  return <AnimatedBackground />;
}
