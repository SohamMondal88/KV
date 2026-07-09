import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-muted text-muted-foreground",
  primary:
    "bg-primary/10 text-primary border border-primary/20",
  secondary:
    "bg-secondary/10 text-secondary border border-secondary/20",
  accent:
    "bg-accent/10 text-accent border border-accent/20",
  outline:
    "border border-border text-foreground bg-transparent",
  ghost:
    "bg-transparent text-muted-foreground",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
