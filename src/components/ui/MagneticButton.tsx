"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type MagneticButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type MagneticButtonSize = "sm" | "md" | "lg";

export interface MagneticButtonProps {
  variant?: MagneticButtonVariant;
  size?: MagneticButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function MagneticButton({
  variant = "primary",
  size = "md",
  icon,
  children,
  href,
  onClick,
  disabled = false,
  className,
  type = "button",
  external = false,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "px-5 py-2 text-xs tracking-wide",
    md: "px-7 py-3 text-sm tracking-wide",
    lg: "px-10 py-4 text-base tracking-wide",
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current || disabled) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      setPosition({ x, y });
    },
    [disabled]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!btnRef.current || disabled) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
      onClick?.(e);
    },
    [disabled, onClick]
  );

  const isLink = !!href;
  const hasGradientBorder = variant === "primary" || variant === "accent";

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-button font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C453] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3D2E]";

  const variantClasses = {
    primary: cn(
      "bg-[#0A1F17] text-[#F8FAFC]",
      "hover:bg-[#0A1F17]/80"
    ),
    secondary: cn(
      "bg-transparent text-[#F8FAFC]",
      "border border-[rgba(255,255,255,0.25)]",
      "hover:border-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.04)]"
    ),
    accent: cn(
      "bg-gradient-to-br from-[#F6C453] to-[#FF8A00] text-[#0A1F17]",
      "hover:brightness-110"
    ),
    ghost: cn(
      "bg-transparent text-[#F8FAFC] px-0 py-1",
      "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0",
      "after:bg-gradient-to-r after:from-[#F6C453] after:to-[#FF8A00]",
      "after:transition-all after:duration-500 after:ease-out",
      "hover:after:w-full"
    ),
  };

  const content = (
    <>
      {/* Gradient border animation (primary + accent only) */}
      {hasGradientBorder && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
          style={{
            padding: "1.5px",
            background:
              "conic-gradient(from 0deg, #F6C453, #FF8A00, #7DD3FC, #F6C453)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            animation: isHovered ? "spinBorder 3s linear infinite" : "none",
          }}
        />
      )}

      {/* White border for secondary variant that rotates on hover */}
      {variant === "secondary" && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
          style={{
            padding: "1.5px",
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0.6), rgba(255,255,255,0.15), rgba(255,255,255,0.6))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            animation: isHovered ? "spinBorder 3s linear infinite" : "none",
          }}
        />
      )}

      {/* Inner sheen */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
          isHovered && variant !== "ghost" && "opacity-100"
        )}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-[rgba(255,255,255,0.25)] animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {(icon || variant !== "ghost") && (
          <motion.span
            animate={{
              x: isHovered ? 4 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="inline-flex items-center"
          >
            {icon || <ArrowRight className="h-4 w-4" />}
          </motion.span>
        )}
      </span>
    </>
  );

  const sharedProps = {
    ref: btnRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    className: cn(base, variantClasses[variant], sizeClasses[size], className),
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
    } as React.CSSProperties,
    "aria-disabled": disabled || undefined,
  };

  if (isLink) {
    if (external) {
      return (
        <a
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className={cn(base, variantClasses[variant], sizeClasses[size], className)}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={cn(base, variantClasses[variant], sizeClasses[size], className)}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      {...sharedProps}
    >
      {content}
    </button>
  );
}
