"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (isReducedMotion) return null;

  return (
    <div className="bg-animation-container" aria-hidden="true">
      <div className="bg-orb bg-orb-pink animate-float-1" style={{ width: "500px", height: "500px", top: "-150px", right: "-100px" }} />
      <div className="bg-orb bg-orb-green animate-float-2" style={{ width: "400px", height: "400px", bottom: "-100px", left: "-50px" }} />
      <div className="bg-orb bg-orb-pink animate-float-3" style={{ width: "350px", height: "350px", top: "40%", left: "10%", opacity: 0.08 }} />
      <div className="bg-orb bg-orb-purple animate-float-4" style={{ width: "450px", height: "450px", top: "20%", right: "20%", opacity: 0.06 }} />
      <div className="bg-orb bg-orb-green animate-float-1" style={{ width: "300px", height: "300px", bottom: "30%", right: "5%", opacity: 0.07 }} />
    </div>
  );
}
