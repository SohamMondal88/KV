"use client";

import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Compass,
  Calculator,
  ClipboardList,
  CloudSun,
  Route,
  BookOpen,
  Sparkles,
  ShoppingCart,
  CalendarDays,
  Moon,
  Sun,
  ArrowRight,
  Command,
  MapPin,
  Zap,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaletteItem {
  id: string;
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  section: string;
  action?: () => void;
  thumbnail?: string;
}

/* ─── Destinations data (17) ─── */
const DESTINATIONS: { name: string; slug: string; thumbnail?: string }[] = [
  { name: "Kalimpong", slug: "kalimpong" },
  { name: "Pabong", slug: "pabong" },
  { name: "Lebong", slug: "lebong" },
  { name: "Ramdhura", slug: "ramdhura" },
  { name: "Mirik", slug: "mirik" },
  { name: "Lamahatta", slug: "lamahatta" },
  { name: "Lepchajagat", slug: "lepchajagat" },
  { name: "Chatakpur", slug: "chatakpur" },
  { name: "Samsing", slug: "samsing" },
  { name: "Sittong", slug: "sittong" },
  { name: "Bijanbari", slug: "bijanbari" },
  { name: "Ahaldhara", slug: "ahaldhara" },
  { name: "Kolbong", slug: "kolbong" },
  { name: "Kolakham", slug: "kolakham" },
  { name: "Peshok", slug: "peshok" },
  { name: "Rishikhola", slug: "rishikhola" },
  { name: "Pelling", slug: "pelling" },
];

function useRecentPages(): string[] {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kv-recent-pages") || "[]");
      if (Array.isArray(stored)) setRecent(stored.slice(0, 5));
    } catch {
      /* ignore */
    }
  }, []);

  return recent;
}

function trackPage(path: string) {
  try {
    const stored = JSON.parse(localStorage.getItem("kv-recent-pages") || "[]");
    const updated = [path, ...stored.filter((p: string) => p !== path)].slice(0, 5);
    localStorage.setItem("kv-recent-pages", JSON.stringify(updated));
  } catch {
    /* ignore */
  }
}

/* ─── Command Palette ─── */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const recentPages = useRecentPages();

  /* Detect dark mode on mount */
  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  /* Toggle open */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  /* Focus input on open */
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  /* Build items */
  const items = useMemo(() => {
    const all: PaletteItem[] = [];

    /* Recent */
    if (recentPages.length > 0 && query.trim() === "") {
      const recentItems: PaletteItem[] = recentPages.map((p, i) => ({
        id: `recent-${i}`,
        name: p === "/" ? "Home" : p.replace(/^\//, "").replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
        href: p,
        icon: ArrowRight,
        section: "Recent",
      }));
      all.push(...recentItems);
    }

    /* Destinations */
    const destMatches = DESTINATIONS.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
    all.push(
      ...destMatches.map(
        (d, i): PaletteItem => ({
          id: `dest-${d.slug}-${i}`,
          name: d.name,
          href: `/destinations/${d.slug}`,
          icon: MapPin,
          section: "Destinations",
        })
      )
    );

    /* Actions */
    const actions: PaletteItem[] = [
      {
        id: "act-book",
        name: "Book Now",
        href: "/packages",
        icon: ShoppingCart,
        section: "Actions",
        shortcut: "B",
      },
      {
        id: "act-planner",
        name: "AI Trip Planner",
        href: "/travel-planner",
        icon: Sparkles,
        section: "Actions",
        shortcut: "P",
      },
      {
        id: "act-bookings",
        name: "My Bookings",
        href: "/my-bookings",
        icon: CalendarDays,
        section: "Actions",
        shortcut: "M",
      },
      {
        id: "act-cart",
        name: "Cart",
        href: "/cart",
        icon: ShoppingCart,
        section: "Actions",
      },
    ];
    all.push(
      ...actions.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    );

    /* Theme */
    all.push({
      id: "theme-toggle",
      name: darkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      icon: darkMode ? Sun : Moon,
      section: "Theme",
      action: () => {
        const html = document.documentElement;
        const next = !html.classList.contains("dark");
        if (next) html.classList.add("dark");
        else html.classList.remove("dark");
        setDarkMode(next);
      },
    });

    /* Quick tools (always available when query empty or matched) */
    const tools: PaletteItem[] = [
      { id: "tool-calc", name: "Budget Calculator", href: "/trip-calculator", icon: Calculator, section: "Actions" },
      { id: "tool-pack", name: "Packing List", href: "/packing-list", icon: ClipboardList, section: "Actions" },
      { id: "tool-weather", name: "Weather Guide", href: "/weather-suggest", icon: CloudSun, section: "Actions" },
      { id: "tool-itin", name: "Itineraries", href: "/itineraries", icon: Route, section: "Actions" },
      { id: "tool-blog", name: "Travel Blog", href: "/blog", icon: BookOpen, section: "Actions" },
      { id: "tool-profile", name: "Profile", href: "/dashboard", icon: User, section: "Actions" },
    ];
    all.push(
      ...tools.filter(
        (t) =>
          query.trim() === "" ||
          t.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    /* Fallback popular when empty */
    if (query.trim() === "" && all.length === 0) {
      all.push(
        { id: "pop-1", name: "Explore Destinations", href: "/destinations", icon: Compass, section: "Popular" },
        { id: "pop-2", name: "Travel Packages", href: "/packages", icon: Zap, section: "Popular" }
      );
    }

    return all;
  }, [query, recentPages, darkMode]);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (items.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % items.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + items.length) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = items[selectedIndex];
        if (selected) {
          if (selected.action) {
            selected.action();
          } else if (selected.href) {
            setOpen(false);
            trackPage(selected.href);
            router.push(selected.href);
          }
        }
      }
    },
    [items, selectedIndex, router]
  );

  /* Scroll selected into view */
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedIndex, open]);

  /* Group items by section */
  const grouped = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    items.forEach((item) => {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    });
    return map;
  }, [items]);

  let flatIndex = -1;

  return (
    <>
      {/* Trigger button in navbar area — added globally via layout, but we expose a hook */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-x-0 top-[15vh] z-[101] mx-auto w-[calc(100%-2rem)] max-w-2xl sm:w-auto"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] shadow-[0_32px_64px_rgba(0,0,0,0.4)]",
                  "bg-[rgba(11,61,46,0.92)] backdrop-blur-[40px]"
                )}
              >
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] px-4 py-4">
                  <Search className="h-5 w-5 shrink-0 text-[#94A3B8]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search destinations, tools, actions..."
                    className="flex-1 bg-transparent text-[15px] text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#94A3B8] transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F8FAFC]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  className="max-h-[50vh] overflow-y-auto px-2 py-2"
                >
                  {items.length === 0 ? (
                    <div className="py-10 text-center text-sm text-[#64748B]">
                      No results found.
                    </div>
                  ) : (
                    Array.from(grouped.entries()).map(([section, sectionItems]) => (
                      <div key={section} className="mb-2">
                        <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                          {section}
                        </p>
                        {sectionItems.map((item) => {
                          flatIndex++;
                          const idx = flatIndex;
                          const active = idx === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onMouseEnter={() => setSelectedIndex(idx)}
                              onClick={() => {
                                if (item.action) {
                                  item.action();
                                } else if (item.href) {
                                  setOpen(false);
                                  trackPage(item.href);
                                  router.push(item.href);
                                }
                              }}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                                active
                                  ? "bg-[rgba(246,196,83,0.12)] text-[#F8FAFC]"
                                  : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#F8FAFC]"
                              )}
                            >
                              <div
                                className={cn(
                                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                  active
                                    ? "bg-[rgba(246,196,83,0.15)] text-[#F6C453]"
                                    : "bg-[rgba(255,255,255,0.04)] text-[#94A3B8]"
                                )}
                              >
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span className="flex-1 text-[14px] font-medium">
                                {item.name}
                              </span>
                              {item.shortcut && (
                                <span className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 text-[11px] text-[#64748B]">
                                  {item.shortcut}
                                </span>
                              )}
                              {active && (
                                <ArrowRight className="h-3.5 w-3.5 text-[#F6C453]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer hint */}
                <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-[11px] text-[#64748B]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="rounded border border-[rgba(255,255,255,0.08)] px-1 py-0.5 text-[10px]">
                        &uarr;
                      </span>
                      <span className="rounded border border-[rgba(255,255,255,0.08)] px-1 py-0.5 text-[10px]">
                        &darr;
                      </span>
                      <span>navigate</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="rounded border border-[rgba(255,255,255,0.08)] px-1 py-0.5 text-[10px]">
                        &crarr;
                      </span>
                      <span>select</span>
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Command className="h-3 w-3" />
                    <span>+ K to toggle</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
