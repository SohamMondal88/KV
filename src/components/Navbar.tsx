"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Search,
  Heart,
  Moon,
  Sun,
  Globe,
  User,
  LogOut,
  LayoutDashboard,
  Bookmark,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  MapPin,
  Package,
  Mountain,
  Tent,
  Camera,
  Users,
  Sparkles,
  Phone,
  ExternalLink,
  X,
  ThermometerSun,
  CloudRain,
  Wind,
  Navigation,
  Mic,
  Compass,
  Landmark,
  Palmtree,
  Clock,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { getThemeBySlug } from "@/lib/destination-themes";
import { destinations } from "@/lib/data";

/* ────────────────────────────────────────────
   Types & Interfaces
   ──────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface PackageCard {
  name: string;
  icon: React.ReactNode;
  href: string;
}

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations", hasDropdown: true },
  { label: "Packages", href: "/packages", hasDropdown: true },
  { label: "Homestays", href: "/homestays" },
  { label: "Hotels", href: "/hotels" },
  { label: "AI Planner", href: "/travel-planner" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const packageTypes: PackageCard[] = [
  { name: "Weekend", icon: <Clock className="h-5 w-5" />, href: "/packages?type=weekend" },
  { name: "Luxury", icon: <Landmark className="h-5 w-5" />, href: "/packages?type=luxury" },
  { name: "Budget", icon: <Package className="h-5 w-5" />, href: "/packages?type=budget" },
  { name: "Family", icon: <Users className="h-5 w-5" />, href: "/packages?type=family" },
  { name: "Adventure", icon: <Compass className="h-5 w-5" />, href: "/packages?type=adventure" },
  { name: "Camping", icon: <Tent className="h-5 w-5" />, href: "/packages?type=camping" },
  { name: "Photography", icon: <Camera className="h-5 w-5" />, href: "/packages?type=photography" },
  { name: "Honeymoon", icon: <Heart className="h-5 w-5" />, href: "/packages?type=honeymoon" },
];

const hiddenGems = [
  { name: "Sittong", tag: "Orange Village", state: "West Bengal" },
  { name: "Kolakham", tag: "Kanchenjunga Views", state: "West Bengal" },
  { name: "Ramdhura", tag: "Cloud Embrace", state: "West Bengal" },
  { name: "Lepchajagat", tag: "Heritage Dawn", state: "West Bengal" },
  { name: "Pabong", tag: "Snow Hamlet", state: "Sikkim" },
];

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ne", label: "Nepali", native: "नेपाली" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

const popularSearches = ["Kalimpong", "Sittong homestays", "Weekend packages", "Mirik lake"];

/* ────────────────────────────────────────────
   Custom Mountain SVG Logo Component
   ──────────────────────────────────────────── */
function KuboVistaLogo({ className, scrolled }: { className?: string; scrolled: boolean }) {
  return (
    <motion.div
      className={cn("relative flex items-center gap-2.5", className)}
      whileHover={{ scale: 1.02 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.3 } }}
    >
      <div className="relative">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
        >
          <defs>
            <linearGradient id="mtnGrad" x1="0" y1="40" x2="40" y2="0">
              <stop offset="0%" stopColor="#0B3D2E" />
              <stop offset="50%" stopColor="#14532D" />
              <stop offset="100%" stopColor="#F6C453" />
            </linearGradient>
            <linearGradient id="mtnGradHover" x1="0" y1="40" x2="40" y2="0">
              <stop offset="0%" stopColor="#F6C453" />
              <stop offset="50%" stopColor="#FF8A00" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
          <path
            d="M4 34L14 18L20 26L28 12L36 34H4Z"
            fill={scrolled ? "url(#mtnGrad)" : "#F8FAFC"}
            className="transition-all duration-500"
          />
          <path
            d="M14 18L20 26L16 34H8L14 18Z"
            fill={scrolled ? "#FF8A00" : "rgba(248,250,252,0.3)"}
            className="transition-all duration-500"
          />
          <path
            d="M28 12L36 34H30L26 22L28 12Z"
            fill={scrolled ? "#F6C453" : "rgba(248,250,252,0.2)"}
            className="transition-all duration-500"
          />
          <circle cx="32" cy="8" r="3" fill={scrolled ? "#FFD700" : "#F8FAFC"} className="transition-colors duration-500" />
        </svg>
        <div
          className={cn(
            "absolute -inset-2 rounded-full transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: "radial-gradient(circle, rgba(246,196,83,0.2) 0%, transparent 70%)",
          }}
        />
      </div>
      <span className="font-display text-lg font-bold tracking-tight text-[#F8FAFC] md:text-xl">
        KuboVista
      </span>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Ripple Effect Hook
   ──────────────────────────────────────────── */
function useRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  return { ripples, addRipple };
}

/* ────────────────────────────────────────────
   Main Navbar Component
   ──────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();

  /* ── Scroll tracking ── */
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isAtHero, setIsAtHero] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
    setIsAtHero(latest < 100);
    if (latest > lastScrollY && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  /* ── Destination theme detection ── */
  const destSlug = useMemo(() => {
    const match = pathname.match(/^\/destinations\/([^\/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  const theme = useMemo(() => {
    if (!destSlug) return null;
    try {
      return getThemeBySlug(destSlug);
    } catch {
      return null;
    }
  }, [destSlug]);

  const accentColor = theme?.colorPalette.accent || "#F6C453";

  /* ── Dropdown states ── */
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /* ── Search ── */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* ── Mobile ── */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  /* ── User menu ── */
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  /* ── Dark mode ── */
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };

  /* ── Language ── */
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("en");

  /* ── Wishlist count (localStorage mock) ── */
  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kv-wishlist");
      if (raw) {
        const parsed = JSON.parse(raw);
        setWishlistCount(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch { /* ignore */ }
  }, []);

  /* ── Click outside ── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── Escape key ── */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
        setActiveDropdown(null);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* ── Focus search input ── */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  /* ── Lock body on mobile open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Ripple on logo ── */
  const { ripples: logoRipples, addRipple: addLogoRipple } = useRipple();

  /* ── Filtered search results ── */
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const dests = destinations
      .filter((d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q))
      .slice(0, 3);
    return {
      destinations: dests,
      packages: packageTypes.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [searchQuery]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  /* ── Scroll progress style ── */
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* ── Reduced motion ── */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const };

  /* ── Active nav helper ── */
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-[#0B3D2E] focus:px-4 focus:py-2 focus:text-sm focus:text-[#F6C453] focus:outline-none focus:ring-2 focus:ring-[#F6C453]"
      >
        Skip to main content
      </a>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 z-[55] h-[2px]"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #F6C453, #FF8A00)",
        }}
      />

      {/* Navbar Header */}
      <motion.header
        ref={navRef}
        initial={{ y: -100 }}
        animate={{
          y: hidden ? "-100%" : "0%",
        }}
        transition={transition}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || activeDropdown
            ? "border-b border-white/10 bg-[#0B3D2E]/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            : "border-b border-transparent bg-transparent"
        )}
        style={{
          ...(theme && (scrolled || activeDropdown)
            ? { backgroundColor: `${theme.colorPalette.background}99` }
            : {}),
        }}
      >
        {/* Desktop heights: 80px | Laptop: 72px | Tablet: 64px | Mobile: 60px */}
        <nav
          className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[64px] lg:h-[72px] xl:h-[80px] lg:px-8"
          aria-label="Main navigation"
        >
          {/* ─── LOGO (Left) ─── */}
          <Link
            href="/"
            className="relative overflow-hidden rounded-xl"
            onClick={addLogoRipple}
            aria-label="KuboVista Home"
          >
            <motion.div
              animate={scrolled ? { scale: 0.95 } : { scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <KuboVistaLogo scrolled={scrolled || activeDropdown !== null} />
            </motion.div>
            {logoRipples.map((r) => (
              <span
                key={r.id}
                className="pointer-events-none absolute block rounded-full bg-[#F6C453]/20 animate-ripple"
                style={{ left: r.x, top: r.y }}
              />
            ))}
          </Link>

          {/* ─── NAV ITEMS (Center) ─── */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.05 * i,
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                    className={cn(
                      "group relative flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium tracking-wide transition-all duration-300",
                      isActive(item.href)
                        ? "text-[#F8FAFC]"
                        : "text-[#94A3B8] hover:text-[#F8FAFC]"
                    )}
                    style={{
                      fontFamily: "var(--font-sans)",
                    }}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup={item.hasDropdown}
                  >
                    <span className="relative transition-transform duration-300 group-hover:-translate-y-0.5">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    )}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300",
                        isActive(item.href) ? "w-[60%]" : "w-0 group-hover:w-[60%]"
                      )}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accentColor}, #FF8A00, transparent)`,
                      }}
                    />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* ─── RIGHT SIDE ─── */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search icon */}
            <motion.button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50"
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-[18px] w-[18px]" />
            </motion.button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF8A00] px-1 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,138,0,0.4)]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Dark mode toggle */}
            <button
              type="button"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleDarkMode}
              className="relative hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-[18px] w-[18px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-[18px] w-[18px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Language selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                aria-label="Select language"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50"
              >
                <Globe className="h-[18px] w-[18px]" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full z-50 mt-3 w-52 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0B3D2E]/95 p-2 shadow-[0_24px_48px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                          lang === l.code
                            ? "bg-[#F6C453]/10 text-[#F6C453]"
                            : "text-[#F8FAFC] hover:bg-white/5"
                        )}
                      >
                        <span>{l.native}</span>
                        <span className="text-xs text-[#94A3B8]">{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth / User Avatar */}
            {user ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full px-1.5 py-1 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50"
                  aria-expanded={userMenuOpen}
                  aria-haspopup
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F6C453] to-[#FF8A00] text-[11px] font-bold text-[#0A1F17]">
                      {initials || <User className="h-3.5 w-3.5" />}
                    </div>
                  )}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-300",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full z-50 mt-3 w-60 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0B3D2E]/95 p-2 shadow-[0_24px_48px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
                    >
                      <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-[#F8FAFC]">{user.name}</p>
                        <p className="text-xs text-[#94A3B8]">{user.email}</p>
                      </div>
                      <div className="my-1 h-px bg-white/10" />
                      {[
                        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { href: "/my-bookings", label: "My Bookings", icon: Bookmark },
                        { href: "/wishlist", label: "Wishlist", icon: Heart },
                        ...(isAdmin
                          ? [{ href: "/admin", label: "Admin Panel", icon: ShieldCheck }]
                          : []),
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/5"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <item.icon className="h-4 w-4 text-[#94A3B8]" />
                          {item.label}
                        </Link>
                      ))}
                      <div className="my-1 h-px bg-white/10" />
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-400/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className="rounded-full px-3 py-2 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Book Now CTA */}
            <motion.div className="hidden lg:block">
              <Link
                href="/packages"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#F6C453] to-[#FF8A00] px-5 py-2.5 text-sm font-semibold text-[#0A1F17] shadow-[0_0_20px_rgba(246,196,83,0.25)] transition-all hover:shadow-[0_0_30px_rgba(246,196,83,0.4)] focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50"
              >
                <span className="relative z-10">Book Now</span>
                <motion.span
                  className="relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#F6C453]/50 lg:hidden"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <X className="h-4 w-4" />
                    <span>Close</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <span>Menu</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ─── DROPDOWN MEGA MENU: DESTINATIONS ─── */}
        <AnimatePresence>
          {activeDropdown === "Destinations" && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-0 right-0 top-full overflow-hidden border-b border-white/10 bg-[#0B3D2E]/80 backdrop-blur-2xl shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {/* Column 1: Popular */}
                  <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                      Popular Destinations
                    </h4>
                    <div className="space-y-3">
                      {destinations
                        .filter((d) => d.featured)
                        .slice(0, 3)
                        .map((dest, i) => (
                          <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: prefersReducedMotion ? 0 : 0.05 * i,
                              duration: 0.4,
                            }}
                          >
                            <Link
                              href={`/destinations/${dest.slug}`}
                              className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                                <img
                                  src={dest.heroImage}
                                  alt={dest.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-[#F8FAFC]">
                                  {dest.name}
                                </p>
                                <div className="mt-0.5 flex items-center gap-2 text-xs text-[#94A3B8]">
                                  <ThermometerSun className="h-3 w-3" />
                                  <span>{dest.altitude}</span>
                                  <span className="text-white/20">|</span>
                                  <span>{dest.weather}</span>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-[#94A3B8] opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Column 2: Hidden Gems */}
                  <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                      Hidden Gems
                    </h4>
                    <div className="space-y-2">
                      {hiddenGems.map((gem, i) => (
                        <motion.div
                          key={gem.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: prefersReducedMotion ? 0 : 0.05 * (i + 3),
                            duration: 0.4,
                          }}
                        >
                          <Link
                            href={`/destinations/${gem.name.toLowerCase()}`}
                            className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div>
                              <p className="text-sm font-medium text-[#F8FAFC]">
                                {gem.name}
                              </p>
                              <p className="text-xs text-[#94A3B8]">{gem.state}</p>
                            </div>
                            <span className="rounded-full bg-[#F6C453]/10 px-2 py-0.5 text-[10px] font-medium text-[#F6C453]">
                              {gem.tag}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: By State */}
                  <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                      By State
                    </h4>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#F8FAFC]">
                              West Bengal
                            </p>
                            <p className="text-xs text-[#94A3B8]">
                              {destinations.filter((d) => d.state === "West Bengal").length}{" "}
                              destinations
                            </p>
                          </div>
                          <MapPin className="h-5 w-5 text-[#F6C453]" />
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#F8FAFC]">Sikkim</p>
                            <p className="text-xs text-[#94A3B8]">
                              {destinations.filter((d) => d.state === "Sikkim").length}{" "}
                              destinations
                            </p>
                          </div>
                          <Mountain className="h-5 w-5 text-[#FF8A00]" />
                        </div>
                      </div>
                      <Link
                        href="/destinations"
                        className="flex items-center gap-1.5 text-sm font-medium text-[#F6C453] transition-colors hover:text-[#FF8A00]"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View all destinations
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── DROPDOWN: PACKAGES ─── */}
        <AnimatePresence>
          {activeDropdown === "Packages" && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-0 right-0 top-full overflow-hidden border-b border-white/10 bg-[#0B3D2E]/80 backdrop-blur-2xl shadow-[0_24px_48px_rgba(0,0,0,0.3)]"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8">
                  {packageTypes.map((pkg, i) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.04 * i,
                        duration: 0.4,
                      }}
                    >
                      <Link
                        href={pkg.href}
                        className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6C453]/10 text-[#F6C453] transition-colors group-hover:bg-[#F6C453]/20">
                          {pkg.icon}
                        </span>
                        <span className="text-sm font-medium text-[#F8FAFC]">
                          {pkg.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══════════════════════════════════════════
          SEARCH OVERLAY
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="mx-auto mt-24 max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B3D2E]/90 shadow-[0_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                  <Search className="h-5 w-5 shrink-0 text-[#94A3B8]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, hotels, packages..."
                    className="flex-1 bg-transparent text-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Voice search"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#94A3B8] transition-colors hover:bg-white/10"
                  >
                    <Mic className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Coming Soon</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Close search"
                    onClick={() => setSearchOpen(false)}
                    className="rounded-full p-1 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Search Results */}
                {searchResults ? (
                  <div className="max-h-[60vh] overflow-y-auto p-5">
                    {searchResults.destinations.length > 0 && (
                      <div className="mb-6">
                        <h5 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                          Destinations
                        </h5>
                        <div className="space-y-2">
                          {searchResults.destinations.map((d) => (
                            <Link
                              key={d.id}
                              href={`/destinations/${d.slug}`}
                              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              <img
                                src={d.heroImage}
                                alt={d.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium text-[#F8FAFC]">
                                  {d.name}
                                </p>
                                <p className="text-xs text-[#94A3B8]">{d.state}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchResults.packages.length > 0 && (
                      <div>
                        <h5 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                          Packages
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {searchResults.packages.map((p) => (
                            <Link
                              key={p.name}
                              href={p.href}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10"
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              {p.icon}
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5">
                    <h5 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                      Popular Searches
                    </h5>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {popularSearches.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSearchQuery(s)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10"
                        >
                          <Search className="h-3 w-3 text-[#94A3B8]" />
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-[#F6C453]/20 bg-[#F6C453]/5 p-3">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#F6C453]" />
                      <p className="text-sm text-[#F8FAFC]">
                        Try{" "}
                        <span className="font-medium text-[#F6C453]">AI Search</span> —
                        ask things like &quot;best homestays in Sittong&quot;
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          MOBILE NAVIGATION
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[52] bg-black/70 backdrop-blur-xl lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[53] flex w-full max-w-[420px] flex-col overflow-y-auto lg:hidden"
              style={{
                background: `
                  linear-gradient(180deg, rgba(11,61,46,0.97) 0%, rgba(10,30,20,0.98) 100%)
                `,
              }}
            >
              {/* Decorative mountain image overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(40px)",
                }}
              />

              {/* Header */}
              <div className="relative flex items-center justify-between px-6 pt-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <KuboVistaLogo scrolled />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile search */}
              <div className="relative px-6 pt-6">
                <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <Search className="mr-2.5 h-4 w-4 shrink-0 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="flex-1 bg-transparent text-sm text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Auth block */}
              <div className="relative px-6 pt-6">
                {user ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#F6C453] to-[#FF8A00] text-xs font-bold text-[#0A1F17]">
                        {initials || <User className="h-4 w-4" />}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-[#F8FAFC]">{user.name}</p>
                      <p className="text-xs text-[#94A3B8]">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <button
                        type="button"
                        className="w-full rounded-full border border-white/15 bg-transparent px-4 py-3 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-white/5"
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <button
                        type="button"
                        className="w-full rounded-full bg-gradient-to-br from-[#F6C453] to-[#FF8A00] px-4 py-3 text-sm font-semibold text-[#0A1F17] transition-all hover:brightness-110"
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Menu items */}
              <ul className="relative flex flex-col gap-1 px-6 pt-6">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  const expanded = mobileExpanded === item.label;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.04 * i,
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      {item.hasDropdown ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setMobileExpanded((prev) =>
                                prev === item.label ? null : item.label
                              )
                            }
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[28px] font-medium transition-colors",
                              active
                                ? "bg-[#F6C453]/8 text-[#F6C453]"
                                : "text-[#F8FAFC] hover:bg-white/5"
                            )}
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform duration-300",
                                expanded && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                                  {item.label === "Destinations" &&
                                    destinations.slice(0, 6).map((d) => (
                                      <Link
                                        key={d.id}
                                        href={`/destinations/${d.slug}`}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        <MapPin className="h-3.5 w-3.5" />
                                        {d.name}
                                      </Link>
                                    ))}
                                  {item.label === "Packages" &&
                                    packageTypes.map((p) => (
                                      <Link
                                        key={p.name}
                                        href={p.href}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        {p.icon}
                                        {p.name}
                                      </Link>
                                    ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3.5 text-[28px] font-medium transition-colors",
                            active
                              ? "bg-[#F6C453]/8 text-[#F6C453]"
                              : "text-[#F8FAFC] hover:bg-white/5"
                          )}
                          style={{ fontFamily: "var(--font-heading)" }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                          {active && (
                            <motion.div
                              layoutId="mobile-active-dot"
                              className="h-2 w-2 rounded-full bg-[#F6C453]"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}

                {user && (
                  <>
                    <motion.li
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.04 * navItems.length,
                        duration: 0.4,
                      }}
                      className="my-2 h-px bg-white/10"
                    />
                    {[
                      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                      { href: "/my-bookings", label: "My Bookings", icon: Bookmark },
                      { href: "/wishlist", label: "Wishlist", icon: Heart },
                      ...(isAdmin
                        ? [{ href: "/admin", label: "Admin Panel", icon: ShieldCheck }]
                        : []),
                    ].map((item, i) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : 0.04 * (navItems.length + i + 1),
                          duration: 0.4,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.04 * (navItems.length + 5),
                        duration: 0.4,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-red-400 transition-colors hover:bg-red-400/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.li>
                  </>
                )}
              </ul>

              {/* Bottom section */}
              <div className="relative mt-auto px-6 pb-8 pt-8">
                <Link href="/travel-planner" onClick={() => setMobileOpen(false)}>
                  <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[#F6C453]/20 bg-[#F6C453]/5 p-4 transition-colors hover:bg-[#F6C453]/10">
                    <Sparkles className="h-5 w-5 shrink-0 text-[#F6C453]" />
                    <div>
                      <p className="text-sm font-semibold text-[#F8FAFC]">AI Trip Planner</p>
                      <p className="text-xs text-[#94A3B8]">Plan your perfect mountain getaway</p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-[#94A3B8]" />
                  </div>
                </Link>

                <Link href="/packages" onClick={() => setMobileOpen(false)}>
                  <button
                    type="button"
                    className="w-full rounded-full bg-gradient-to-br from-[#F6C453] to-[#FF8A00] px-4 py-3.5 text-sm font-semibold text-[#0A1F17] shadow-[0_0_20px_rgba(246,196,83,0.3)] transition-all hover:brightness-110"
                  >
                    Book Your Journey
                  </button>
                </Link>

                <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Need help? Call +91 98765 43210</span>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  {["Instagram", "Facebook", "Twitter"].map((name, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
                      whileTap={{ scale: 0.95 }}
                      aria-label={name}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
