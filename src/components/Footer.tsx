"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowUp,
  Heart,
  Shield,
  BadgeCheck,
  Headphones,
  Check,
  MessageCircle,
  Globe,
  Video,
  MapPin,
  Camera,
  Newspaper,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Data ─── */
const navColumns = [
  {
    title: "Explore",
    links: [
      { href: "/destinations", label: "Destinations" },
      { href: "/packages", label: "Packages" },
      { href: "/homestays", label: "Homestays" },
      { href: "/hotels", label: "Hotels" },
      { href: "/food-guide", label: "Food Guide" },
      { href: "/blog", label: "Blog" },
      { href: "/attractions", label: "Gallery" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/travel-planner", label: "AI Trip Planner" },
      { href: "/trip-calculator", label: "Budget Calculator" },
      { href: "/packing-list", label: "Packing List" },
      { href: "/weather-suggest", label: "Weather Guide" },
      { href: "/itineraries", label: "Itineraries" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/join", label: "Careers" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Press" },
      { href: "/join", label: "Partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "Help Center" },
      { href: "/faq", label: "FAQs" },
      { href: "/contact", label: "Emergency Contacts" },
      { href: "/terms", label: "Cancellation" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const socials = [
  { href: "#", label: "Instagram", icon: Camera },
  { href: "#", label: "Facebook", icon: Globe },
  { href: "#", label: "YouTube", icon: Video },
  { href: "#", label: "LinkedIn", icon: Newspaper },
  { href: "#", label: "X", icon: MessageCircle },
  { href: "#", label: "Pinterest", icon: MapPin },
  { href: "#", label: "WhatsApp", icon: MessageCircle },
];

const trustBadges = [
  { icon: Shield, label: "Secure Payments" },
  { icon: BadgeCheck, label: "Verified Stays" },
  { icon: Headphones, label: "24/7 Support" },
];

/* ─── Mountain silhouettes (CSS clip-paths) ─── */
function MountainSilhouette() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-full overflow-hidden">
      {/* Far mountains */}
      <div
        className="absolute bottom-0 left-[-10%] h-[35%] w-[120%] opacity-20"
        style={{
          background: "linear-gradient(180deg, #0A2E22 0%, #020617 100%)",
          clipPath:
            "polygon(0% 100%, 0% 55%, 8% 40%, 15% 50%, 22% 35%, 30% 48%, 38% 28%, 45% 42%, 52% 22%, 60% 38%, 68% 18%, 75% 32%, 82% 15%, 90% 28%, 95% 20%, 100% 35%, 100% 100%)",
        }}
      />
      {/* Mid mountains */}
      <div
        className="absolute bottom-0 left-[-5%] h-[25%] w-[110%] opacity-40"
        style={{
          background: "linear-gradient(180deg, #0D4534 0%, #020617 100%)",
          clipPath:
            "polygon(0% 100%, 0% 70%, 12% 50%, 20% 62%, 28% 42%, 38% 58%, 48% 35%, 58% 52%, 68% 38%, 78% 55%, 88% 40%, 95% 50%, 100% 60%, 100% 100%)",
        }}
      />
      {/* Near mountains */}
      <div
        className="absolute bottom-0 left-0 h-[18%] w-full opacity-60"
        style={{
          background: "linear-gradient(180deg, #0B3D2E 0%, #020617 100%)",
          clipPath:
            "polygon(0% 100%, 0% 80%, 10% 60%, 20% 75%, 30% 55%, 42% 70%, 55% 48%, 68% 65%, 80% 45%, 90% 58%, 100% 50%, 100% 100%)",
        }}
      />
    </div>
  );
}

/* ─── Stars ─── */
function Stars() {
  const stars = React.useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      size: Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: 0.4,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Fireflies ─── */
function Fireflies() {
  const flies = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${30 + Math.random() * 50}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      xDist: (Math.random() - 0.5) * 120,
      yDist: (Math.random() - 0.5) * 80,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            background: "#F6C453",
            boxShadow: `0 0 ${f.size * 4}px ${f.size * 2}px rgba(246,196,83,0.3)`,
            opacity: 0,
            animation: `fireflyDrift ${f.duration}s ease-in-out ${f.delay}s infinite`,
            ["--x-dist" as string]: `${f.xDist}px`,
            ["--y-dist" as string]: `${f.yDist}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Fog layers ─── */
function FogLayer({ delay = 0, opacity = 0.15 }: { delay?: number; opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute bottom-0 z-[3] h-[120px] w-[200%]"
      style={{
        left: "-50%",
        background:
          "linear-gradient(to top, rgba(255,255,255,0.08) 0%, transparent 100%)",
        opacity,
        animation: `fogDrift 20s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

/* ─── Back to top ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className={cn(
            "fixed bottom-6 right-6 z-[60]",
            "inline-flex h-12 w-12 items-center justify-center rounded-full",
            "border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl",
            "text-[#F8FAFC] shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
            "transition-all duration-300",
            "hover:scale-110 hover:border-[#F6C453]/40 hover:text-[#F6C453]",
            "hover:shadow-[0_0_30px_rgba(246,196,83,0.25)]"
          )}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Footer ─── */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  return (
    <>
      <footer
        ref={ref}
        className="relative min-h-[600px] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #0B3D2E 0%, #0A2E22 40%, #020617 100%)",
        }}
      >
        {/* Moon glow */}
        <div
          className="pointer-events-none absolute right-[10%] top-[8%] z-0 h-[180px] w-[180px] rounded-full opacity-30 md:h-[240px] md:w-[240px]"
          style={{
            background:
              "radial-gradient(circle, rgba(246,196,83,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <Stars />
        <Fireflies />
        <FogLayer delay={0} opacity={0.12} />
        <FogLayer delay={5} opacity={0.08} />
        <MountainSilhouette />

        {/* Content wrapper */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          {/* ── Brand Epic ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="mb-20 text-center"
          >
            <h2
              className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #F8FAFC 0%, #F6C453 50%, #FF8A00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              KuboVista
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mt-4 font-body text-lg italic tracking-wide text-[#94A3B8]"
            >
              Travel For Premium Memories
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#64748B]"
            >
              Curating extraordinary journeys to the Himalayas&apos; most untouched corners.
            </motion.p>
          </motion.div>

          {/* ── Navigation Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {navColumns.map((col) => (
              <motion.div key={col.title} variants={itemVariants} className="flex flex-col gap-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#F8FAFC]">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[14px] text-[#94A3B8] transition-all duration-300 hover:text-[#F6C453]"
                      >
                        <span className="relative">
                          {l.label}
                          <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-gradient-to-r from-[#F6C453] to-[#FF8A00] transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Newsletter ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-20 max-w-xl text-center"
          >
            <h3 className="font-display text-2xl font-semibold text-[#F8FAFC]">
              Join the Journey
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#94A3B8]">
              Get travel inspiration, hidden gems, and exclusive offers delivered to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="relative flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Your email address"
                    className={cn(
                      "w-full rounded-xl border bg-[rgba(255,255,255,0.04)] px-5 py-3.5 text-sm text-[#F8FAFC] backdrop-blur-md",
                      "placeholder:text-[#64748B]",
                      "focus:border-[#F6C453] focus:outline-none focus:ring-1 focus:ring-[#F6C453]/20",
                      "transition-all duration-500",
                      focused || email
                        ? "border-[rgba(246,196,83,0.4)]"
                        : "border-[rgba(255,255,255,0.1)]"
                    )}
                  />
                  <div
                    className="absolute bottom-0 left-5 right-5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#F6C453] to-[#FF8A00] transition-transform duration-500"
                    style={{
                      transform: focused || email ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "relative overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-[#0A1F17]",
                    "bg-gradient-to-br from-[#F6C453] to-[#FF8A00]",
                    "transition-shadow duration-300",
                    "hover:shadow-[0_0_30px_rgba(246,196,83,0.3)]"
                  )}
                >
                  Subscribe
                </motion.button>
              </div>

              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 12, height: 0 }}
                    className="mt-4 flex items-center justify-center gap-2"
                  >
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-[#F6C453]">
                      Welcome to the adventure!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ── Social + Trust ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-16"
          >
            {/* Social icons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={cn(
                    "group inline-flex h-10 w-10 items-center justify-center rounded-full",
                    "border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[#94A3B8] backdrop-blur-md",
                    "transition-all duration-300",
                    "hover:border-[#F6C453]/40 hover:text-[#F6C453] hover:scale-110",
                    "hover:shadow-[0_0_24px_rgba(246,196,83,0.2)]"
                  )}
                >
                  <s.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-[12px] text-[#64748B]"
                >
                  <badge.icon className="h-4 w-4 text-[#F6C453]" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Payment icons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {["Visa", "Mastercard", "UPI", "Razorpay"].map((pm) => (
                <span
                  key={pm}
                  className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#94A3B8] backdrop-blur-sm"
                >
                  {pm}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(246,196,83,0.3), transparent)",
            }}
          />
        </div>

        {/* ── Bottom Bar ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] tracking-wide text-[#64748B]">
              &copy; {new Date().getFullYear()} KuboVista. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5 text-[12px] tracking-wide text-[#64748B]">
              Made with{" "}
              <Heart className="inline h-3.5 w-3.5 fill-[#EF4444] text-[#EF4444]" />{" "}
              in the Himalayas
            </p>

            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Sitemap"].map((item, i) => {
                const paths: Record<string, string> = {
                  Privacy: "/privacy",
                  Terms: "/terms",
                  Sitemap: "/sitemap",
                };
                return (
                  <React.Fragment key={item}>
                    {i > 0 && (
                      <span className="text-[#64748B]">&middot;</span>
                    )}
                    <Link
                      href={paths[item]}
                      className="text-[12px] tracking-wide text-[#64748B] transition-colors duration-300 hover:text-[#F8FAFC]"
                    >
                      {item}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
