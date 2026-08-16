"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/* Simple opacity + slight y — no blur/scale to avoid GPU jank */
const EASE = [0.22, 1, 0.36, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
