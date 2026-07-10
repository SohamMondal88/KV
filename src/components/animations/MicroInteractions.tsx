"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ───────────────────────────────────────────────
   A. HoverGlow — Wrap any element, adds glow on hover
─────────────────────────────────────────────── */
interface HoverGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  intensity?: number;
}

export function HoverGlow({
  children,
  className,
  glowColor = "rgba(246,196,83,0.25)",
  glowSize = 120,
  intensity = 1,
}: HoverGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          left: position.x,
          top: position.y,
          width: glowSize,
          height: glowSize,
          background: glowColor,
        }}
        animate={{ opacity: isHovered ? intensity : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────
   B. MagneticWrapper — Element follows cursor slightly
─────────────────────────────────────────────── */
interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticWrapper({
  children,
  className,
  strength = 0.3,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = (e.clientX - centerX) * strength;
      const distY = (e.clientY - centerY) * strength;
      x.set(distX);
      y.set(distY);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   C. TextReveal — Words reveal one by one on scroll
─────────────────────────────────────────────── */
interface TextRevealProps {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className,
  tag: Tag = "span",
  stagger = 0.04,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const words = children.split(" ");

  return (
    <div ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: i * stagger,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Tag className={className}>{word}</Tag>
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   D. ParallaxLayer — Layered parallax for sections
─────────────────────────────────────────────── */
interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  direction?: "vertical" | "horizontal";
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.3,
  direction = "vertical",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      setOffset((progress - 0.5) * speed * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const transform =
    direction === "vertical"
      ? `translateY(${offset}px)`
      : `translateX(${offset}px)`;

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <div style={{ transform }}>{children}</div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   E. FloatingElement — Gentle floating animation
─────────────────────────────────────────────── */
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 8,
  duration = 4,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("inline-block", className)}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   F. GradientBorder — Animated rotating gradient border
─────────────────────────────────────────────── */
interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  colors?: string[];
  duration?: number;
}

export function GradientBorder({
  children,
  className,
  borderWidth = 2,
  borderRadius = "1.5rem",
  colors = ["#FF8A00", "#F6C453", "#7DD3FC", "#FF8A00"],
  duration = 3,
}: GradientBorderProps) {
  const gradient = `conic-gradient(${colors.join(", ")})`;

  return (
    <div className={cn("relative p-[2px] overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          borderRadius: borderRadius,
          animation: `spin ${duration}s linear infinite`,
        }}
      />
      <div
        className="relative z-10 h-full w-full overflow-hidden"
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   G. TiltCard — 3D tilt on hover (for packages)
─────────────────────────────────────────────── */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setRotateX((0.5 - y) * maxTilt * 2);
      setRotateY((x - 0.5) * maxTilt * 2);
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("perspective-[1000px]", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   H. CountUp — Animated number counter
─────────────────────────────────────────────── */
interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ───────────────────────────────────────────────
   I. RippleButton — Liquid ripple on click
─────────────────────────────────────────────── */
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.3)",
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    props.onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      {...props}
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute animate-ripple rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
          }}
        />
      ))}
    </button>
  );
}

/* ───────────────────────────────────────────────
   J. IconMorph — Icon morph on hover
─────────────────────────────────────────────── */
interface IconMorphProps {
  icon: React.ReactNode;
  hoverIcon: React.ReactNode;
  className?: string;
}

export function IconMorph({ icon, hoverIcon, className }: IconMorphProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        {icon}
      </motion.div>
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {hoverIcon}
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   K. StaggerGrid — For card grids with stagger
─────────────────────────────────────────────── */
interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGrid({ children, className, staggerDelay = 0.08 }: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   L. FadeInSection — Simple fade in on scroll
─────────────────────────────────────────────── */
interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function FadeInSection({
  children,
  className,
  direction = "up",
  delay = 0,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
