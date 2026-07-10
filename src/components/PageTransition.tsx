"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const fogWipeVariants = {
  initial: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(6px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Fog wipe overlay during transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={fogWipeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
