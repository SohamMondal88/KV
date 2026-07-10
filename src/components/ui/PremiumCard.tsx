"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PremiumCardProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  rating?: number;
  price?: string;
  children?: React.ReactNode;
  href?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export function PremiumCard({
  image,
  title,
  subtitle,
  badge,
  rating,
  price,
  children,
  href = "#",
  className,
  aspectRatio = "video",
}: PremiumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -12, y: x * 12 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "portrait"
        ? "aspect-[3/4]"
        : "aspect-video";

  const Wrapper = href ? motion(Link) : motion.div;

  return (
    <Wrapper
      ref={cardRef as any}
      href={href}
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLDivElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{
        perspective: 1000,
      }}
      className={cn(
        "group relative block overflow-hidden",
        "rounded-[28px] p-6",
        "bg-[rgba(255,255,255,0.06)] backdrop-blur-[24px]",
        "border border-[rgba(255,255,255,0.1)]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1)]",
        "transition-shadow duration-500",
        "hover:shadow-[0_32px_64px_rgba(0,0,0,0.35),0_0_40px_rgba(246,196,83,0.08)]",
        className
      )}
    >
      {/* Animated gradient border overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500",
          isHovered && "opacity-100"
        )}
        style={{
          padding: "1px",
          background: "conic-gradient(from 0deg, #F6C453, #FF8A00, #7DD3FC, #F6C453)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          animation: isHovered ? "spinBorder 4s linear infinite" : "none",
        }}
      />

      {/* Inner glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500",
          isHovered && "opacity-100"
        )}
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(246,196,83,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Card inner with 3D tilt */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative flex h-full flex-col"
      >
        {/* Image container */}
        <div
          ref={imageRef}
          className={cn(
            "relative mb-5 overflow-hidden rounded-[20px]",
            aspectClass
          )}
        >
          {/* Clip-path reveal mask */}
          <motion.div
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            animate={
              isInView
                ? { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" }
                : {}
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-[8000ms] ease-out",
                isHovered && "scale-[1.12]"
              )}
              loading="lazy"
            />
          </motion.div>

          {/* Badge */}
          {badge && (
            <div className="absolute left-4 top-4 z-10">
              <span className="inline-flex items-center rounded-full bg-[rgba(255,138,0,0.9)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {badge}
              </span>
            </div>
          )}

          {/* Price tag */}
          {price && (
            <div className="absolute right-4 bottom-4 z-10">
              <span className="inline-flex items-center rounded-full bg-[rgba(11,61,46,0.85)] px-3 py-1.5 text-sm font-semibold text-[#F6C453] backdrop-blur-sm border border-[rgba(255,255,255,0.1)]">
                {price}
              </span>
            </div>
          )}

          {/* Subtle overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-[rgba(11,61,46,0.5)] to-transparent opacity-0 transition-opacity duration-500",
              isHovered && "opacity-100"
            )}
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-heading text-lg font-semibold leading-tight tracking-tight text-[#F8FAFC] group-hover:text-[#F6C453] transition-colors duration-300">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-1 text-sm leading-relaxed text-[#94A3B8]">
                  {subtitle}
                </p>
              )}
            </div>

            {rating !== undefined && (
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-[rgba(255,255,255,0.06)] px-2.5 py-1 border border-[rgba(255,255,255,0.08)]">
                <Star className="h-3.5 w-3.5 fill-[#F6C453] text-[#F6C453]" />
                <span className="text-xs font-semibold text-[#F8FAFC]">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {children && (
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              {children}
            </div>
          )}
        </div>
      </motion.div>
    </Wrapper>
  );
}
