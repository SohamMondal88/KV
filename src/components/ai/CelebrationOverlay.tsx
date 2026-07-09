"use client";

import React from "react";
import { motion } from "framer-motion";

export function CelebrationOverlay() {
  const particles = Array.from({ length: 30 });

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {particles.map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1 + Math.random() * 1.5;
        const size = 6 + Math.random() * 8;
        const colors = ["#0B5D3B", "#FF8A00", "#1D4ED8", "#F59E0B", "#DC2626", "#16A34A"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            initial={{
              x: `${x}vw`,
              y: -20,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              y: "110vh",
              opacity: [1, 1, 0],
              rotate: Math.random() > 0.5 ? 360 : -360,
            }}
            transition={{
              duration,
              delay,
              ease: "easeIn",
            }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: Math.random() > 0.3 ? "50%" : "2px",
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}
