"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Mountain,
  ArrowRight,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationBell } from "@/app/notifications/page";

const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/travel-planner", label: "AI Planner" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const selectLang = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0B3D2E]/80 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
              <path d="M16 4L28 28H4L16 4Z" fill="url(#mountainGrad)"/>
              <circle cx="16" cy="12" r="3" fill="#F6C453"/>
              <defs>
                <linearGradient id="mountainGrad" x1="16" y1="4" x2="16" y2="28">
                  <stop stopColor="#0B3D2E"/>
                  <stop offset="1" stopColor="#14532D"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold tracking-tight font-display">KuboVista</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-[#F6C453]" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#F6C453]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Likes */}
            <Link
              href="/wishlist"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Likes"
            >
              <Heart className="h-4 w-4" />
            </Link>

            {/* Notifications */}
            <NotificationBell />

            {/* Dark Mode */}
            <button
              onClick={() => setDark(!dark)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Sun className="h-4 w-4 text-[#F6C453]" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Language */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden xl:inline">{languages.find((l) => l.code === currentLang)?.native}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-white/10 bg-[#0B3D2E]/95 p-2 shadow-2xl backdrop-blur-xl"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => selectLang(lang.code)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                            currentLang === lang.code
                              ? "bg-white/10 text-[#F6C453]"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span className="text-base">{lang.native}</span>
                          <span className="ml-auto text-xs text-white/40">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Book Now */}
            <Link
              href="/packages"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#F6C453] px-5 py-2.5 text-sm font-semibold text-[#0B3D2E] transition-all hover:shadow-[0_0_30px_rgba(246,196,83,0.3)] hover:scale-105 active:scale-95 md:inline-flex"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
                onClick={() => setSearchOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-x-0 top-20 z-50 mx-auto max-w-2xl px-4"
              >
                <div className="rounded-2xl border border-white/10 bg-[#0B3D2E]/95 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <Search className="h-5 w-5 text-white/50" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search destinations, hotels, packages..."
                      className="flex-1 bg-transparent text-lg text-white placeholder:text-white/40 outline-none"
                    />
                    <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {["Kalimpong", "Pelling", "Sittong", "Weekend Packages", "Homestays"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSearchOpen(false)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-[#F6C453]/50 hover:text-[#F6C453]"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-[#0B3D2E] shadow-2xl lg:hidden"
              >
                <div className="flex items-center justify-between p-6">
                  <span className="text-lg font-bold text-white">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="px-6 pb-6">
                  <ul className="space-y-1">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                            pathname === link.href
                              ? "bg-white/10 text-[#F6C453]"
                              : "text-white/80 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <Link
                      href="/packages"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#F6C453] py-3 text-center font-semibold text-[#0B3D2E]"
                    >
                      Book Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => selectLang(lang.code)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-sm transition-colors",
                          currentLang === lang.code ? "bg-white/10 text-[#F6C453]" : "text-white/50 hover:text-white"
                        )}
                      >
                        {lang.native}
                      </button>
                    ))}
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
