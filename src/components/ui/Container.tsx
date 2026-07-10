import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
