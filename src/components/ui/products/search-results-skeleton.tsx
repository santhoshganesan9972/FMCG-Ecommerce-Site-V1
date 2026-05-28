import ProductCardSkeleton from "./product-card-skeleton";

interface SearchResultsSkeletonProps {
  /** Number of skeleton cards to show */
  count?: number;
  /** Grid columns class (default: responsive 2-6 cols) */
  gridClass?: string;
}

/**
 * Loading skeleton grid for search results.
 * Renders a set of ProductCardSkeleton placeholders in a grid layout.
 */
export default function SearchResultsSkeleton({
  count = 6,
  gridClass = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3",
}: SearchResultsSkeletonProps) {
  return (
    <div aria-busy="true" aria-label="Loading results">
      {/* Results count placeholder */}
      <div className="h-4 w-24 rounded bg-[#e8e8e8] animate-pulse mb-3" />

      <div className={gridClass}>
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
