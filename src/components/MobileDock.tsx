"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  Search,
  Sparkles,
  CalendarDays,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dockItems = [
  { label: "Home", href: "/", icon: Compass },
  { label: "Search", action: "command-palette", icon: Search },
  { label: "AI Planner", href: "/travel-planner", icon: Sparkles },
  { label: "Bookings", href: "/my-bookings", icon: CalendarDays },
  { label: "Profile", href: "/dashboard", icon: User },
];

interface MobileDockProps {
  onSearchClick?: () => void;
}

export function MobileDock({ onSearchClick }: MobileDockProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  let lastWindowHeight = 0;

  /* Hide dock when virtual keyboard appears (height shrinks > 150px) */
  useEffect(() => {
    const onResize = () => {
      const diff = lastWindowHeight - window.innerHeight;
      lastWindowHeight = window.innerHeight;
      if (diff > 150) {
        setHidden(true);
      } else if (diff < -100) {
        setHidden(false);
      }
    };
    lastWindowHeight = window.innerHeight;
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: hidden ? 120 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed inset-x-0 bottom-4 z-[70] flex justify-center md:hidden"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center gap-1 rounded-full px-3",
          "border border-[rgba(255,255,255,0.12)] bg-[rgba(11,61,46,0.75)] backdrop-blur-[28px]",
          "shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        )}
      >
        {dockItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          if (item.action === "command-palette") {
            return (
              <button
                key={item.label}
                type="button"
                onClick={onSearchClick}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-2xl px-3.5 py-2 transition-all duration-300",
                  "hover:bg-[rgba(255,255,255,0.06)]"
                )}
              >
                <Icon className="h-[22px] w-[22px] text-[#94A3B8] transition-all duration-300 group-hover:text-[#F6C453] group-hover:scale-110" />
                <span className="mt-0.5 text-[9px] font-medium tracking-wide text-[#94A3B8] transition-colors group-hover:text-[#F6C453]">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href || "/"}
              className={cn(
                "group relative flex flex-col items-center justify-center rounded-2xl px-3.5 py-2 transition-all duration-300",
                active
                  ? "bg-[rgba(246,196,83,0.12)]"
                  : "hover:bg-[rgba(255,255,255,0.06)]"
              )}
            >
              <Icon
                className={cn(
                  "h-[22px] w-[22px] transition-all duration-300 group-hover:scale-110",
                  active ? "text-[#F6C453]" : "text-[#94A3B8] group-hover:text-[#F6C453]"
                )}
              />
              <span
                className={cn(
                  "mt-0.5 text-[9px] font-medium tracking-wide transition-colors",
                  active ? "text-[#F6C453]" : "text-[#94A3B8] group-hover:text-[#F6C453]"
                )}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute -bottom-0.5 h-[3px] w-5 rounded-full bg-gradient-to-r from-[#F6C453] to-[#FF8A00]" />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
