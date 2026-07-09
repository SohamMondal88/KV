"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accentColor?: string;
}

export const SectionHeading = React.forwardRef<
  HTMLDivElement,
  SectionHeadingProps
>(
  (
    {
      title,
      subtitle,
      align = "center",
      accentColor = "bg-accent",
      className,
      ...props
    },
    ref
  ) => {
    const alignClass = align === "center" ? "text-center" : "text-left";
    const flexClass = align === "center" ? "items-center" : "items-start";

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", flexClass, alignClass, className)}
        {...props}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn("h-1 w-16 origin-left rounded-full", accentColor)}
        />
        {subtitle && (
          <p className="max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
