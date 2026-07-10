"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DestinationTheme } from "@/lib/destination-themes";

interface AtmosphereEffectsProps {
  theme: DestinationTheme;
}

function GoldenRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-[120%] w-[2px] origin-top"
          style={{
            left: `${15 + i * 14}%`,
            background: `linear-gradient(180deg, rgba(255,215,0,0.15) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function WaterRipple() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-teal-300/10"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 200, height: 80, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );
}

function SnowParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: -10,
              filter: `blur(${size > 2 ? 1 : 0}px)`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.sin(i) * 30, Math.cos(i) * 20, 0],
              opacity: [0, 0.8, 0.6, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

function OrangeBlossoms() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 6;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: -10,
              background: `rgba(255, 140, 0, ${0.3 + Math.random() * 0.3})`,
              filter: "blur(1px)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.sin(i * 0.7) * 40, Math.cos(i * 0.5) * 30],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

function StarSparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 60;
        const duration = Math.random() * 2 + 1.5;
        const delay = Math.random() * 3;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 2,
              height: 2,
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

function FogLayers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-[200%]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${0.03 + i * 0.02}) 30%, transparent 60%)`,
            left: "-50%",
            top: `${20 + i * 25}%`,
          }}
          animate={{
            x: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Fireflies() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 80 + 10;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              left: `${left}%`,
              top: `${top}%`,
              background: "rgba(255, 223, 0, 0.8)",
              boxShadow: "0 0 8px rgba(255,223,0,0.6), 0 0 16px rgba(255,223,0,0.3)",
            }}
            animate={{
              opacity: [0, 1, 0.4, 1, 0],
              x: [0, Math.random() * 60 - 30, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

function DustMotes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/20"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: -5,
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, Math.sin(i) * 20, Math.cos(i) * 15],
              opacity: [0, 0.5, 0.3, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

export function AtmosphereEffects({ theme }: AtmosphereEffectsProps) {
  switch (theme.effects.particleType) {
    case "snow":
      return <SnowParticles />;
    case "fog":
      return <FogLayers />;
    case "blossom":
      return <OrangeBlossoms />;
    case "fireflies":
      return <Fireflies />;
    case "dust":
      return <DustMotes />;
    case "none":
      if (theme.slug === "mirik") return <WaterRipple />;
      return null;
    default:
      return null;
  }
}

// Specific sparkle for Kolakham
export function KolakhamSparkles() {
  return <StarSparkles />;
}

// Specific golden rays for Kalimpong
export function KalimpongGoldenRays() {
  return <GoldenRays />;
}
