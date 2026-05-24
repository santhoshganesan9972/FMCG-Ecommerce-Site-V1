"use client";

import { useEffect, useRef } from "react";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";

interface RecentlyViewedTrackerProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
  };
}

export default function RecentlyViewedTracker({ product }: RecentlyViewedTrackerProps) {
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.addRecentlyViewed);
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      addRecentlyViewed({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
      });
    }
  }, [product, addRecentlyViewed]);

  return null;
}
