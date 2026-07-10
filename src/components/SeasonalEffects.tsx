"use client";

import React, { useMemo } from "react";

function getSeason(): "winter" | "spring" | "summer" | "autumn" {
  const month = new Date().getMonth() + 1; // 1-12
  if (month <= 2 || month === 12) return "winter";
  if (month <= 5) return "spring";
  if (month <= 8) return "summer";
  return "autumn";
}

/* ─── Winter: Snowflakes ─── */
function Snowflakes() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            top: `-10px`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `snowFall ${p.duration}s linear ${p.delay}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </>
  );
}

/* ─── Spring: Cherry blossom petals ─── */
function CherryPetals() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.15,
      hue: 300 + Math.random() * 40, // pink/magenta range
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: `-20px`,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue} 70% 80%)`,
            opacity: p.opacity,
            borderRadius: `${30 + Math.random() * 40}% ${60 + Math.random() * 20}%`,
            animation: `petalFall ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: "blur(0.8px)",
          }}
        />
      ))}
    </>
  );
}

/* ─── Summer: Dust motes / Fireflies ─── */
function SummerParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 10,
      opacity: 0.08 + Math.random() * 0.15,
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "#F6C453",
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(246,196,83,0.15)`,
            animation: `floatUp ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </>
  );
}

/* ─── Autumn: Falling leaves ─── */
function AutumnLeaves() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 5 + Math.random() * 10,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 10,
      opacity: 0.12 + Math.random() * 0.15,
      color: ["#FF8A00", "#F6C453", "#D97706", "#C2410C"][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: `-20px`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            animation: `leafFall ${p.duration}s ease-in-out ${p.delay}s infinite`,
            filter: "blur(0.6px)",
          }}
        />
      ))}
    </>
  );
}

/* ─── Seasonal Effects ─── */
export function SeasonalEffects() {
  const season = getSeason();

  /* Respect reduced-motion */
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {season === "winter" && <Snowflakes />}
      {season === "spring" && <CherryPetals />}
      {season === "summer" && <SummerParticles />}
      {season === "autumn" && <AutumnLeaves />}
    </div>
  );
}
