"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Calendar, Users, ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ThreeHero = dynamic(() => import("@/components/ThreeHero").then((m) => m.ThreeHero), {
  ssr: false,
});

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-forest">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=2000&auto=format&fit=crop"
          alt="Himalayan mountains"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* 3D Mountain Scene */}
      <div className="absolute inset-0 z-[1] hidden md:block">
        <ThreeHero />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Glassmorphism Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-4"
      >
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Discover KuboVista
          </motion.h1>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-2 text-xl font-medium tracking-wide text-accent sm:text-2xl md:text-3xl"
          >
            Travel For Premium Memories
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-lg text-white/90 sm:text-xl md:text-2xl"
          >
            Offbeat destinations, authentic homestays, and unforgettable adventures
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex w-full flex-col gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white/90 sm:p-2"
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <MapPin className="h-5 w-5 shrink-0 text-white sm:text-muted-foreground" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none sm:text-foreground sm:placeholder:text-muted-foreground"
                readOnly
              />
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <Calendar className="h-5 w-5 shrink-0 text-white sm:text-muted-foreground" />
              <input
                type="text"
                placeholder="Add dates"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none sm:text-foreground sm:placeholder:text-muted-foreground"
                readOnly
              />
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <Users className="h-5 w-5 shrink-0 text-white sm:text-muted-foreground" />
              <input
                type="text"
                placeholder="Travelers"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/70 focus:outline-none sm:text-foreground sm:placeholder:text-muted-foreground"
                readOnly
              />
            </div>
            <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-orange-600 sm:rounded-full">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest text-white/80 uppercase">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
