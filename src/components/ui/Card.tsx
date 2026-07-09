"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLMotionProps<"div"> {
  hoverLift?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverLift = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverLift
            ? { y: -6, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)" }
            : undefined
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
