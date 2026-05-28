"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.45,
  once = true,
  distance = 20,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: "-40px" }
    );

    // If the element is already visible on mount, show it immediately
    if (el.getBoundingClientRect().top < window.innerHeight + 40) {
      setIsVisible(true);
      if (once) return;
    }

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0,0,0)";
    switch (direction) {
      case "up":    return `translate3d(0,${distance}px,0)`;
      case "down":  return `translate3d(0,-${distance}px,0)`;
      case "left":  return `translate3d(${distance}px,0,0)`;
      case "right": return `translate3d(-${distance}px,0,0)`;
      case "none":  return "translate3d(0,0,0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s ease-out ${isVisible ? `${delay}ms` : '0s'}, transform ${duration}s ease-out ${isVisible ? `${delay}ms` : '0s'}`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
