"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp, X, Bot, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ─── Left FAB: Ask AI + WhatsApp ─── */
function FloatingActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <>
            <div className="absolute bottom-16 left-0 mb-2 flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/travel-planner"
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0B3D2E]/90 px-4 py-2.5 text-sm text-white shadow-xl backdrop-blur-xl transition-colors hover:border-[#F6C453]/50"
                >
                  <Bot className="h-4 w-4 text-[#F6C453]" />
                  Ask AI
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                <a
                  href="https://chat.whatsapp.com/your-community-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0B3D2E]/90 px-4 py-2.5 text-sm text-white shadow-xl backdrop-blur-xl transition-colors hover:border-[#25D366]/50 hover:text-[#25D366]"
                >
                  <Users className="h-4 w-4" />
                  WhatsApp Community
                </a>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
          open
            ? "bg-white/10 text-white border border-white/20 backdrop-blur-xl"
            : "bg-gradient-to-br from-[#FF8A00] to-[#F6C453] text-[#0B3D2E]"
        )}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

/* ─── Right FAB: Back to Top Mountain ─── */
function MountainBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={scrollTop}
            className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#0B3D2E]/80 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#F6C453]/50 hover:shadow-[0_0_40px_rgba(246,196,83,0.2)]"
            aria-label="Back to top"
          >
            {/* Mountain SVG with animated ascent */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden rounded-full">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative h-12 w-12"
              >
                <svg viewBox="0 0 64 64" className="h-full w-full">
                  <defs>
                    <linearGradient id="peakGrad" x1="32" y1="8" x2="32" y2="56">
                      <stop offset="0%" stopColor="#F6C453"/>
                      <stop offset="100%" stopColor="#0B3D2E"/>
                    </linearGradient>
                  </defs>
                  {/* Mountain base */}
                  <path d="M8 56L28 20L32 12L36 20L56 56Z" fill="url(#peakGrad)" opacity="0.9"/>
                  {/* Snow cap */}
                  <path d="M28 20L32 12L36 20L32 24Z" fill="#FFFFFF" opacity="0.9"/>
                  {/* Sun */}
                  <circle cx="48" cy="16" r="5" fill="#F6C453" opacity="0.6">
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </motion.div>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              <ArrowUp className="h-5 w-5 text-[#F6C453] drop-shadow-lg" />
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Combined Export ─── */
export function FloatingButtons() {
  return (
    <>
      <FloatingActions />
      <MountainBackToTop />
    </>
  );
}
