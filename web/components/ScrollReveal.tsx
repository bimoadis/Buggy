"use client";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({ children, delay = 0, y = 60, className, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealGroup({
  children,
  stagger = 0.12,
  className,
  style,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
