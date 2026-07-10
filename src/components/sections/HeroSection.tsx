"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Play,
  Compass,
  Mountain,
} from "lucide-react";
import Image from "next/image";

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    const count = Math.min(Math.floor((w * h) / 12000), 80);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: Math.random() * -0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const fogY1 = useTransform(scrollY, [0, 800], [0, 120]);
  const fogY2 = useTransform(scrollY, [0, 800], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);

  const [searchWhere, setSearchWhere] = useState("");
  const [searchWhen, setSearchWhen] = useState("");
  const [searchTravelers, setSearchTravelers] = useState("");

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* z-0: Background image with Ken Burns + parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-5%] z-0 h-[110%] w-[110%]"
      >
        <Image
          src="https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=2400&auto=format&fit=crop"
          alt="Himalayan mountains"
          fill
          priority
          className="object-cover"
          style={{
            animation: "kenBurns 20s ease-in-out infinite alternate",
          }}
          sizes="100vw"
        />
      </motion.div>

      {/* z-1: Atmospheric fog overlays (multiple speeds) */}
      <motion.div
        style={{ y: fogY1 }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 30% 90%, rgba(11,61,46,0.7) 0%, transparent 60%), radial-gradient(ellipse at 70% 10%, rgba(125,211,252,0.15) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: fogY2 }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            animation: "fogDrift 10s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* z-2: Floating particles */}
      <FloatingParticles />

      {/* Dark cinematic vignette overlay */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(2,6,23,0.55) 100%), linear-gradient(180deg, rgba(2,6,23,0.25) 0%, rgba(11,61,46,0.35) 60%, rgba(2,6,23,0.7) 100%)",
        }}
      />

      {/* z-3: Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-[4] flex h-full flex-col items-center justify-center px-4"
      >
        <div className="mx-auto w-full max-w-5xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#F6C453] uppercase sm:text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Discover the Unseen Himalayas
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[clamp(4rem,7vw,7.5rem)]"
          >
            <span className="text-gradient">Where Every Journey</span>
            <br />
            <span className="text-gradient">Becomes a Legend</span>
          </motion.h1>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-4 text-lg font-medium tracking-wide text-white/80 sm:text-xl md:text-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Travel For Premium Memories
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#destinations"
              className="magnetic-button group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#F6C453] to-[#FF8A00] px-7 text-sm font-semibold text-white shadow-lg shadow-[#F6C453]/20 transition-all hover:shadow-[#F6C453]/40"
            >
              <Compass className="h-4 w-4 transition-transform group-hover:rotate-45" />
              Plan Your Adventure
            </a>
            <a
              href="#destinations"
              className="magnetic-button inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" />
              Explore Destinations
            </a>
            <button
              type="button"
              className="magnetic-button group inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white/90 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              </span>
              Watch Film
            </button>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 w-full"
          >
            <div className="glass-strong mx-auto flex w-full max-w-3xl flex-col items-stretch gap-2 rounded-3xl p-3 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2"
            >
              <div className="flex flex-1 items-center gap-3 px-4 py-2">
                <MapPin className="h-5 w-5 shrink-0 text-white/60" />
                <input
                  type="text"
                  value={searchWhere}
                  onChange={(e) => setSearchWhere(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block" />
              <div className="flex flex-1 items-center gap-3 px-4 py-2">
                <Calendar className="h-5 w-5 shrink-0 text-white/60" />
                <input
                  type="text"
                  value={searchWhen}
                  onChange={(e) => setSearchWhen(e.target.value)}
                  placeholder="When?"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block" />
              <div className="flex flex-1 items-center gap-3 px-4 py-2">
                <Users className="h-5 w-5 shrink-0 text-white/60" />
                <input
                  type="text"
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                  placeholder="Travelers"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F6C453] to-[#FF8A00] px-6 text-sm font-semibold text-white shadow-lg shadow-[#F6C453]/20 transition-all hover:shadow-[#F6C453]/40 sm:rounded-full"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator — elegant thin line with traveling dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase"
        >
          Scroll to explore
        </span>
        <div className="relative h-12 w-px overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="absolute left-0 h-3 w-full rounded-full bg-[#F6C453]"
            animate={{ top: ["-12px", "48px"] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Bottom gradient transition into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, #0B3D2E 100%)",
        }}
      />
    </section>
  );
}
