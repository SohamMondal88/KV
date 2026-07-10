"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  y = 40,
  duration = 0.8,
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    });
    return () => ctx.revert();
  }, [y, duration, delay, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({ src, alt, speed = 0.5, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current!.querySelector("img"), {
        yPercent: speed * 30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CounterAnimation({ target, suffix = "", className = "", duration = 2 }: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(obj.val).toString();
          }
        },
        onComplete: () => {
          if (ref.current) {
            ref.current.textContent = target.toLocaleString("en-IN");
          }
        },
      });
    });
    return () => ctx.revert();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  y?: number;
}

export function StaggerList({
  children,
  className = "",
  childClassName = "",
  stagger = 0.1,
  y = 30,
}: StaggerListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const childrenEls = containerRef.current.children;
    if (!childrenEls.length) return;

    const ctx = gsap.context(() => {
      gsap.from(childrenEls, {
        y,
        opacity: 0,
        duration: 0.6,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child) => (
        <div className={childClassName}>{child}</div>
      ))}
    </div>
  );
}
