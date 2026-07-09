import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  maxRating?: number;
  size?: number;
  showValue?: boolean;
}

export const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    { rating, maxRating = 5, size = 18, showValue = true, className, ...props },
    ref
  ) => {
    const clampedRating = Math.max(0, Math.min(rating, maxRating));

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <div className="relative inline-flex">
          {/* Background stars */}
          <div className="flex">
            {Array.from({ length: maxRating }).map((_, i) => (
              <Star
                key={`bg-${i}`}
                size={size}
                className="text-muted-foreground/30"
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
          {/* Foreground stars */}
          <div
            className="absolute inset-0 flex overflow-hidden"
            style={{ width: `${(clampedRating / maxRating) * 100}%` }}
          >
            {Array.from({ length: maxRating }).map((_, i) => (
              <Star
                key={`fg-${i}`}
                size={size}
                className="text-accent shrink-0"
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
        {showValue && (
          <span className="text-sm font-medium text-foreground">
            {clampedRating.toFixed(1)}
          </span>
        )}
      </div>
    );
  }
);

StarRating.displayName = "StarRating";
