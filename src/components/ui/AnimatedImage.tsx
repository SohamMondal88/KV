"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  parallax?: boolean;
  parallaxSpeed?: number; // 0 = none, 1 = full
  kenBurns?: boolean;
  kenBurnsDirection?: "zoom-in" | "zoom-out" | "pan-left" | "pan-right" | "pan-up" | "pan-down";
  reveal?: "clip-bottom" | "clip-top" | "clip-left" | "clip-right" | "scale" | "fade";
  hoverZoom?: boolean;
  priority?: boolean;
  blurPlaceholder?: boolean;
  overlay?: React.ReactNode;
}

export function AnimatedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  containerClassName,
  parallax = false,
  parallaxSpeed = 0.3,
  kenBurns = false,
  kenBurnsDirection = "zoom-in",
  reveal = "clip-bottom",
  hoverZoom = true,
  priority = false,
  blurPlaceholder = true,
  overlay,
}: AnimatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallaxSpeed * -30}px`, `${parallaxSpeed * 30}px`]
  );

  const parallaxScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 + parallaxSpeed * 0.05, 1, 1 + parallaxSpeed * 0.05]
  );

  const getRevealClipPath = () => {
    switch (reveal) {
      case "clip-bottom":
        return "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
      case "clip-top":
        return "polygon(0 0, 100% 0, 100% 0, 0 0)";
      case "clip-left":
        return "polygon(0 0, 0 0, 0 100%, 0 100%)";
      case "clip-right":
        return "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
      default:
        return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }
  };

  const getFinalClipPath = () => {
    return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  };

  const getKenBurnsAnimate = () => {
    if (!kenBurns) return {};
    switch (kenBurnsDirection) {
      case "zoom-in":
        return { scale: [1, 1.15] };
      case "zoom-out":
        return { scale: [1.15, 1] };
      case "pan-left":
        return { x: [0, "-8%"], scale: [1, 1.1] };
      case "pan-right":
        return { x: [0, "8%"], scale: [1, 1.1] };
      case "pan-up":
        return { y: [0, "-6%"], scale: [1, 1.1] };
      case "pan-down":
        return { y: [0, "6%"], scale: [1, 1.1] };
      default:
        return { scale: [1, 1.15] };
    }
  };

  const kenBurnsDuration = 20; // seconds

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        containerClassName
      )}
      style={{
        clipPath: reveal === "scale" || reveal === "fade" ? undefined : undefined,
      }}
    >
      {/* Blur placeholder layer */}
      {blurPlaceholder && !loaded && (
        <div
          className={cn(
            "absolute inset-0 z-10 bg-[rgba(255,255,255,0.03)]",
            fill ? "h-full w-full" : ""
          )}
          style={{
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Reveal mask wrapper */}
      <motion.div
        className="relative h-full w-full"
        initial={
          reveal === "scale"
            ? { scale: 1.15, opacity: 0 }
            : reveal === "fade"
              ? { opacity: 0 }
              : { clipPath: getRevealClipPath(), opacity: 1 }
        }
        animate={
          isInView
            ? reveal === "scale"
              ? { scale: 1, opacity: 1 }
              : reveal === "fade"
                ? { opacity: 1 }
                : { clipPath: getFinalClipPath(), opacity: 1 }
            : {}
        }
        transition={{
          duration: 1.2,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* Parallax + Ken Burns wrapper */}
        <motion.div
          className="relative h-full w-full"
          style={
            parallax
              ? {
                  y: parallaxY,
                  scale: parallaxScale,
                }
              : {}
          }
          animate={
            kenBurns && isInView
              ? getKenBurnsAnimate()
              : {}
          }
          transition={
            kenBurns
              ? {
                  duration: kenBurnsDuration,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                }
              : {}
          }
        >
          <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              hoverZoom && "hover:scale-105",
              className
            )}
            onLoad={() => setLoaded(true)}
            data-loading={!loaded}
          />
        </motion.div>
      </motion.div>

      {/* Hover zoom overlay */}
      {hoverZoom && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(246,196,83,0.04) 0%, transparent 60%)",
          }}
        />
      )}

      {/* Custom overlay */}
      {overlay && (
        <div className="pointer-events-none absolute inset-0 z-20">{overlay}</div>
      )}
    </motion.div>
  );
}
