"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navColumns = [
  {
    title: "Explore",
    links: [
      { href: "/destinations", label: "Destinations" },
      { href: "/packages", label: "Packages" },
      { href: "/homestays", label: "Homestays" },
      { href: "/hotels", label: "Hotels" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Plan",
    links: [
      { href: "/travel-planner", label: "AI Trip Planner" },
      { href: "/trip-calculator", label: "Budget Calculator" },
      { href: "/packing-list", label: "Packing List" },
      { href: "/weather-suggest", label: "Weather Guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQs" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const socials = [
  { href: "#", label: "Instagram", icon: "camera" },
  { href: "#", label: "Facebook", icon: "globe" },
  { href: "#", label: "YouTube", icon: "video" },
  { href: "#", label: "LinkedIn", icon: "newspaper" },
  { href: "#", label: "WhatsApp", icon: "message" },
];

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

export function Footer() {
  const [dark, setDark] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => { setSubscribed(false); setEmail(""); }, 3000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B3D2E]">
      {/* Subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F6C453]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2.5">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L28 28H4L16 4Z" fill="url(#fMountainGrad)"/>
              <circle cx="16" cy="12" r="3" fill="#F6C453"/>
              <defs>
                <linearGradient id="fMountainGrad" x1="16" y1="4" x2="16" y2="28">
                  <stop stopColor="#0B3D2E"/>
                  <stop offset="1" stopColor="#14532D"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-4xl font-bold text-white font-display">KuboVista</span>
          </div>
          <p className="mt-2 text-lg italic text-[#F6C453]/80">Travel For Premium Memories</p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/50">
            Curating extraordinary journeys to the Himalayas most untouched corners.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {navColumns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-[#F6C453]"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter + Language + Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">Stay Connected</h3>

            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#F6C453]/50"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="rounded-lg bg-gradient-to-r from-[#FF8A00] to-[#F6C453] px-4 py-2 text-sm font-semibold text-[#0B3D2E] transition-all hover:shadow-[0_0_20px_rgba(246,196,83,0.3)]"
                >
                  {subscribed ? <Check className="h-4 w-4" /> : "Join"}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-[#F6C453]">Welcome to the adventure!</p>
              )}
            </form>

            {/* Language */}
            <div className="mb-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-white/40">Language</p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm transition-colors",
                      currentLang === lang.code
                        ? "bg-white/10 text-[#F6C453]"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {lang.native}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Theme</span>
              <button
                onClick={() => setDark(!dark)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {dark ? <Sun className="h-3.5 w-3.5 text-[#F6C453]" /> : <Moon className="h-3.5 w-3.5" />}
                {dark ? "Light" : "Dark"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Social */}
        <div className="mt-12 flex flex-col items-center gap-6 border-t border-white/10 pt-8">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#F6C453]/30 hover:text-[#F6C453] hover:shadow-[0_0_20px_rgba(246,196,83,0.2)]"
              >
                <span className="text-xs font-bold">{s.label[0]}</span>
              </a>
            ))}
          </div>

          <p className="text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} KuboVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
