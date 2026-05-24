import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = 14,
  className = "",
  showValue = false,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25;

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }).map((_, i) => {
        const isFilled = i < fullStars;
        const isHalfFilled = i === fullStars && hasHalf;
        return (
          <Star
            key={i}
            size={size}
            className={`${
              isFilled || isHalfFilled
                ? "fill-yellow-400 text-yellow-400"
                : "text-[#e8e8e8]"
            } ${isHalfFilled ? "opacity-60" : ""}`}
          />
        );
      })}
      {showValue && (
        <span className="ml-1 text-xs font-bold text-[#666]">{rating}</span>
      )}
    </div>
  );
}
