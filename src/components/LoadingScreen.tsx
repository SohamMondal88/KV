"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain } from "lucide-react";

interface LoadingScreenProps {
  children: React.ReactNode;
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tagline, setTagline] = useState("");
  const fullTagline = "Travel For Premium Memories";

  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;
    let taglineInterval: ReturnType<typeof setInterval>;

    // Progress bar animation
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    // Typewriter effect for tagline
    let charIndex = 0;
    taglineInterval = setInterval(() => {
      if (charIndex <= fullTagline.length) {
        setTagline(fullTagline.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(taglineInterval);
      }
    }, 80);

    // Complete loading after ~2.5-3 seconds
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 600);
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(taglineInterval);
      clearTimeout(timer);
    };
  }, []);

  const handleExitComplete = useCallback(() => {
    // Could emit an event here if needed
  }, []);

  return (
    <>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ backgroundColor: "#0B3D2E" }}
          >
            {/* Animated fog / mist background */}
            <div className="pointer-events-none absolute inset-0 z-0">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 80%, rgba(125,211,252,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(246,196,83,0.12) 0%, transparent 60%)",
                  animation: "fogDrift 12s ease-in-out infinite alternate",
                }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 60%, rgba(255,255,255,0.15) 0%, transparent 70%)",
                  animation: "fogDrift 16s ease-in-out infinite alternate-reverse",
                }}
              />
            </div>

            {/* Parallax mountain silhouettes */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-center overflow-hidden">
              {/* Far mountains */}
              <svg
                className="absolute bottom-0 w-[140%] opacity-20"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                style={{ animation: "mountainParallax 20s ease-in-out infinite alternate" }}
              >
                <path
                  fill="rgba(255,255,255,0.08)"
                  d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
              {/* Near mountains */}
              <svg
                className="absolute bottom-0 w-[120%] opacity-10"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                style={{ animation: "mountainParallax 14s ease-in-out infinite alternate-reverse" }}
              >
                <path
                  fill="rgba(255,255,255,0.06)"
                  d="M0,256L60,240C120,224,240,192,360,186.7C480,181,600,203,720,218.7C840,235,960,245,1080,234.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
              </svg>
            </div>

            {/* Logo + Tagline */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Logo Mark */}
              <motion.div
                className="mb-6 flex items-center gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F6C453] to-[#FF8A00] shadow-lg shadow-[#F6C453]/20">
                  <Mountain className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
                  KuboVista
                </span>
              </motion.div>

              {/* Tagline with typewriter cursor */}
              <div className="flex items-center gap-1">
                <span
                  className="text-lg font-medium tracking-wide text-white/80 sm:text-xl"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tagline}
                </span>
                <motion.span
                  className="inline-block h-5 w-0.5 bg-[#F6C453]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Progress bar at bottom */}
            <div className="absolute bottom-12 left-1/2 z-10 w-64 -translate-x-1/2 sm:w-80">
              <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #F6C453, #FF8A00, #F6C453)",
                    backgroundSize: "200% 100%",
                    boxShadow: progress >= 100 ? "0 0 20px rgba(246,196,83,0.5)" : "none",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <motion.p
                className="mt-2 text-center text-xs tracking-widest text-white/40 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading Experience
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content rendered immediately so it can preload behind loader */}
      <div className={isLoading ? "invisible" : "visible"}>{children}</div>
    </>
  );
}
